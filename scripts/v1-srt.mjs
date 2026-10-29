// Builds out/video01.srt (captions are NOT burned in) from src/video01/captions.json + timing.json.
// Usage: node scripts/v1-srt.mjs
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..');
const timing = JSON.parse(fs.readFileSync(path.join(root, 'src/video01/timing.json'), 'utf8'));
const caps = JSON.parse(fs.readFileSync(path.join(root, 'src/video01/captions.json'), 'utf8'));
const fr = (x) => Math.round(x * timing.fps);
const ts = (s) => {
  const ms = Math.round(s * 1000);
  const p = (n, w = 2) => String(n).padStart(w, '0');
  return `${p(Math.floor(ms / 3600000))}:${p(Math.floor((ms / 60000) % 60))}:${p(Math.floor((ms / 1000) % 60))},${p(ms % 1000, 3)}`;
};
let t = 0, n = 1, out = '';
for (const c of timing.chapters) {
  const off = (t + fr(c.pre)) / timing.fps;
  for (const [a, b, text] of caps[c.id] ?? []) out += `${n++}\n${ts(off + a)} --> ${ts(off + b)}\n${text}\n\n`;
  t += fr(c.pre) + fr(c.audioDur) + fr(c.post);
}
fs.mkdirSync(path.join(root, 'out'), {recursive: true});
fs.writeFileSync(path.join(root, 'out/video01.srt'), out);
console.log(`wrote out/video01.srt (${n - 1} captions, ${(t / timing.fps / 60).toFixed(2)} min)`);
