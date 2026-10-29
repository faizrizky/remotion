// Pre-render check for Video 02: timing.json sanity, audio length vs timing, missing public/ files.
// Usage: node scripts/v2-check.mjs      (needs ffprobe on PATH for the audio check)
import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..');
const pub = (p) => path.join(root, 'public', p);
const timing = JSON.parse(fs.readFileSync(path.join(root, 'src/video02/timing.json'), 'utf8'));
let problems = 0;
const bad = (m) => { problems++; console.log('  X ' + m); };

console.log('1) timing.json');
for (const c of timing.chapters) {
  const vals = Object.entries(c.beats);
  vals.forEach(([k, v], i) => {
    if (typeof v !== 'number') bad(`${c.id}.${k} is not a number`);
    if (v < 0 || v >= c.audioDur) bad(`${c.id}.${k}=${v}s is outside the voice (0-${c.audioDur}s)`);
    if (i > 0 && v < vals[i - 1][1]) bad(`${c.id}.${k} comes before ${vals[i - 1][0]} (beats must be in order)`);
  });
}

console.log('2) voice files vs audioDur');
for (const c of timing.chapters) {
  if (!fs.existsSync(pub(c.audio))) { bad(`missing voice ${c.audio}`); continue; }
  try {
    const d = Number(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', pub(c.audio)]).toString().trim());
    const diff = Math.abs(d - c.audioDur);
    console.log(`  ${c.id}: wav ${d.toFixed(2)}s, timing ${c.audioDur}s` + (diff > 0.05 ? '  <- set audioDur to ' + d.toFixed(2) : ''));
    if (diff > 0.05) problems++;
  } catch { console.log('  (ffprobe not found, skipped length check)'); break; }
}

console.log('3) images / sfx referenced in src/video02');
const src = fs.readdirSync(path.join(root, 'src/video02'), {recursive: true}).filter((f) => String(f).endsWith('.tsx')).map((f) => fs.readFileSync(path.join(root, 'src/video02', String(f)), 'utf8')).join('\n');
const names = new Set([...src.matchAll(/(?:name|head)="([^"]+\.(?:png|jpg|webp))"/g)].map((m) => m[1]));
for (const s of ['sfx/pop.wav', 'sfx/whoosh.wav', 'sfx/kaching.wav', 'sfx/card_tap.wav']) names.add(s);
for (const n of [...names].sort()) if (!fs.existsSync(pub(n))) bad(`missing public/${n}`);

console.log('4) chapter start times in V2-Full (YouTube chapters + .srt offsets)');
let t = 0;
const fr = (x) => Math.round(x * timing.fps);
for (const c of timing.chapters) {
  const voiceAt = (t + fr(c.pre)) / timing.fps;
  const mm = Math.floor(t / timing.fps / 60), ss = Math.floor((t / timing.fps) % 60);
  console.log(`  ${c.id.padEnd(6)} starts ${mm}:${String(ss).padStart(2, '0')}  (voice offset ${voiceAt.toFixed(2)} s)`);
  t += fr(c.pre) + fr(c.audioDur) + fr(c.post);
}
console.log(`  total ${(t / timing.fps / 60).toFixed(2)} min`);

console.log(problems ? `\n${problems} problem(s). Fix them before the final render.` : '\nAll good.');
process.exit(problems ? 1 : 0);
