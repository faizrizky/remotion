// One tool for every video (replaces the per-video v1-/v2- scripts).
//   node scripts/video.mjs check  <dir>          timing sanity, WAV length vs timing, missing files, chapter times
//   node scripts/video.mjs carry  <dir>          one-camera rule: every camera move and chapter entrance carries an object
//   node scripts/video.mjs srt    <dir>          out/<dir>.srt from captions.json (subtitles are NOT burned in)
//   node scripts/video.mjs stills <prefix|compId> [seconds...]   QA stills into out/qa (needs a Chrome: BROWSER=<path>)
// <dir> = folder under src/ with timing.json (e.g. video01). Specs: src/<dir>/specs.ts(x) exporting SPECS (import only from ../kit/core there).
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {pathToFileURL} from 'node:url';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..');
const [cmd, arg, ...rest] = process.argv.slice(2);
const pub = (p) => path.join(root, 'public', p);
let problems = 0;
const bad = (m) => { problems++; console.log('  X ' + m); };
const done = () => { console.log(problems ? `\n${problems} problem(s).` : '\nAll good.'); process.exit(problems ? 1 : 0); };

const loadTiming = (dir) => JSON.parse(fs.readFileSync(path.join(root, 'src', dir, 'timing.json'), 'utf8'));

/** Bundle the video's specs + kit/check (everything else stubbed) and import it. */
const loadSpecs = async (dir) => {
  const specFile = ['specs.tsx', 'specs.ts'].map((f) => path.join(root, 'src', dir, f)).find((f) => fs.existsSync(f));
  if (!specFile) return null;
  const esbuild = await import('esbuild');
  const kitCore = path.join(root, 'src/kit/core.ts');
  const kitCheck = path.join(root, 'src/kit/check.ts');
  const entry = `export {SPECS} from ${JSON.stringify(specFile)}; export * from ${JSON.stringify(kitCheck)}; export * from ${JSON.stringify(kitCore)};`;
  const out = path.join(os.tmpdir(), `pl-specs-${process.pid}.mjs`);
  await esbuild.build({
    stdin: {contents: entry, resolveDir: root, loader: 'ts'},
    bundle: true, format: 'esm', platform: 'node', outfile: out, jsx: 'automatic', logLevel: 'error',
    plugins: [{name: 'stub', setup(b) {
      b.onResolve({filter: /.*/}, (a) => {
        if (a.kind === 'entry-point' || a.path.endsWith('.json')) return undefined;
        const full = a.path.startsWith('.') ? path.resolve(a.resolveDir, a.path) : a.path;
        const ok = [specFile, kitCore, kitCheck].some((f) => f.replace(/\.tsx?$/, '') === full.replace(/\.tsx?$/, ''));
        return ok ? undefined : {path: a.path, namespace: 'stub'};
      });
      b.onLoad({filter: /.*/, namespace: 'stub'}, () => ({contents: 'const p = new Proxy(function(){return null}, {get: (_, k) => k === "__esModule" ? false : p}); module.exports = p;', loader: 'js'}));
    }}],
  });
  const mod = await import(pathToFileURL(out).href);
  fs.rmSync(out, {force: true});
  return mod;
};

if (cmd === 'check') {
  const t = loadTiming(arg);
  console.log('1) timing.json');
  for (const c of t.chapters) {
    const vals = Object.entries(c.beats);
    vals.forEach(([k, v], i) => {
      if (typeof v !== 'number') bad(`${c.id}.${k} is not a number`);
      if (v < 0 || v >= c.audioDur) bad(`${c.id}.${k}=${v}s is outside the voice (0-${c.audioDur}s)`);
      if (i > 0 && v < vals[i - 1][1]) bad(`${c.id}.${k} comes before ${vals[i - 1][0]} (beats must be in order)`);
    });
  }
  console.log('2) voice files vs audioDur');
  for (const c of t.chapters) {
    if (!fs.existsSync(pub(c.audio))) { bad(`missing voice public/${c.audio}`); continue; }
    try {
      const d = Number(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', pub(c.audio)]).toString().trim());
      const diff = Math.abs(d - c.audioDur);
      console.log(`  ${c.id}: wav ${d.toFixed(2)}s, timing ${c.audioDur}s` + (diff > 0.05 ? '  <- set audioDur to ' + d.toFixed(2) : ''));
      if (diff > 0.05) problems++;
    } catch { console.log('  (ffprobe not found, skipped length check)'); break; }
  }
  console.log('3) images / sfx / music referenced');
  const srcDir = path.join(root, 'src', arg);
  const src = fs.readdirSync(srcDir, {recursive: true}).filter((f) => /\.tsx?$/.test(String(f))).map((f) => fs.readFileSync(path.join(srcDir, String(f)), 'utf8')).join('\n');
  const names = new Set([...src.matchAll(/(?:name|head|src|file)\s*[=:]\s*["'`]([^"'`]+\.(?:png|jpg|webp|mp3|wav))["'`]/g)].map((m) => m[1]));
  for (const m of src.matchAll(/\[\s*[^\],]+,\s*["']([^"']+\.png)["']\s*\]/g)) names.add(m[1]);
  for (const s of ['sfx/pop.wav', 'sfx/whoosh.wav', 'sfx/kaching.wav', 'sfx/card_tap.wav', 'profile_pic.png']) names.add(s);
  const mod = await loadSpecs(arg).catch((e) => { bad('specs failed to load: ' + e.message); return null; });
  if (mod) for (const s of mod.SPECS) for (const im of s.bg?.images ?? []) names.add(im.src);
  for (const n of [...names].sort()) if (!n.includes('${') && !fs.existsSync(pub(n))) bad(`missing public/${n}`);
  const L = mod ? mod.layoutVideo(t, mod.SPECS.map((s, i) => (i === 0 ? 'none' : s.enter?.kind ?? 'whip'))) : null;
  if (mod) mod.SPECS.forEach((s, i) => { if (s.sting && t.chapters[i].post * t.fps < mod.STING_FRAMES + 2) bad(`${t.chapters[i].id}: sting needs post >= ${((mod.STING_FRAMES + 2) / t.fps).toFixed(1)} s (now ${t.chapters[i].post})`);
    if (s.intro && t.chapters[i].pre < 2) bad(`${t.chapters[i].id}: intro needs pre >= 2 s`);
    if (s.stingIn && t.chapters[i].pre < 3.5) bad(`${t.chapters[i].id}: stingIn needs pre >= 3.5 s (4.35 s recommended)`);
    if (s.stingIn && i > 0 && t.chapters[i - 1].post < 0.5) bad(`${t.chapters[i - 1].id}: post must be >= 0.5 s so the sting's circles burst over it`); });
  console.log('4) chapter start times (YouTube chapters)');
  let acc = 0;
  t.chapters.forEach((c, i) => {
    const st = L ? L.starts[i] : acc;
    acc += Math.round(c.pre * t.fps) + Math.round(c.audioDur * t.fps) + Math.round(c.post * t.fps);
    const s = st / t.fps;
    console.log(`  ${String(Math.floor(s / 60))}:${String(Math.floor(s % 60)).padStart(2, '0')}  ${c.id.padEnd(8)} ${c.title ?? ''}`);
  });
  const total = (L ? L.total : acc) / t.fps;
  console.log(`  total ${Math.floor(total / 60)}:${String(Math.round(total % 60)).padStart(2, '0')}`);
  done();
} else if (cmd === 'carry') {
  const t = loadTiming(arg);
  const mod = await loadSpecs(arg);
  if (!mod) { console.log(`no src/${arg}/specs.ts(x): nothing to check`); process.exit(0); }
  mod.SPECS.forEach((s, i) => {
    const c = t.chapters[i];
    for (const p of mod.checkCarry(s, c, t.fps)) bad(p);
    if (i > 0) for (const p of mod.checkHandoff(mod.SPECS[i - 1], t.chapters[i - 1], s, c, t.fps)) bad(p);
  });
  done();
} else if (cmd === 'srt') {
  const t = loadTiming(arg);
  const caps = JSON.parse(fs.readFileSync(path.join(root, 'src', arg, 'captions.json'), 'utf8'));
  const mod = await loadSpecs(arg).catch(() => null);
  const L = mod ? mod.layoutVideo(t, mod.SPECS.map((s, i) => (i === 0 ? 'none' : s.enter?.kind ?? 'whip'))) : null;
  const ts = (s) => { const ms = Math.round(s * 1000); const p = (n, w = 2) => String(n).padStart(w, '0'); return `${p(Math.floor(ms / 3600000))}:${p(Math.floor((ms / 60000) % 60))}:${p(Math.floor((ms / 1000) % 60))},${p(ms % 1000, 3)}`; };
  let acc = 0, n = 1, out = '';
  t.chapters.forEach((c, i) => {
    const start = L ? L.starts[i] : acc;
    const off = (start + Math.round(c.pre * t.fps)) / t.fps;
    for (const [a, b, text] of caps[c.id] ?? []) out += `${n++}\n${ts(off + a)} --> ${ts(off + b)}\n${text}\n\n`;
    acc += Math.round(c.pre * t.fps) + Math.round(c.audioDur * t.fps) + Math.round(c.post * t.fps);
  });
  fs.mkdirSync(path.join(root, 'out'), {recursive: true});
  fs.writeFileSync(path.join(root, 'out', `${arg}.srt`), out);
  console.log(`wrote out/${arg}.srt (${n - 1} captions)`);
} else if (cmd === 'stills') {
  const {bundle} = await import('@remotion/bundler');
  const {getCompositions, renderStill} = await import('@remotion/renderer');
  const browserExecutable = process.env.BROWSER || null;
  const outDir = path.join(root, 'out', 'qa');
  fs.mkdirSync(outDir, {recursive: true});
  const serveUrl = await bundle({entryPoint: path.join(root, 'src', 'index.ts')});
  const comps = (await getCompositions(serveUrl, {browserExecutable})).filter((c) => (c.id === arg || (c.id.startsWith(arg + '-') && !c.id.endsWith('-Full'))));
  for (const c of comps) {
    const frames = rest.length ? rest.map((s) => Math.round(Number(s) * c.fps)) : [0.2, 0.45, 0.7, 0.92].map((p) => Math.floor(c.durationInFrames * p));
    for (const fr of frames) {
      const frame = Math.min(fr, c.durationInFrames - 1);
      const output = path.join(outDir, `${c.id}_f${String(frame).padStart(5, '0')}.png`);
      await renderStill({serveUrl, composition: c, frame, output, browserExecutable, scale: 0.5});
      console.log('ok', path.relative(root, output));
    }
  }
} else {
  console.log('usage: node scripts/video.mjs check|carry|srt <dir>   |   stills <prefix|compId> [seconds...]');
}
