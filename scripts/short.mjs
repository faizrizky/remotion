// Vertical Shorts from a finished long video.
//   node scripts/short.mjs prep <id>      cut clip + shifted srt into public/shorts_src/ (ffmpeg)
//   node scripts/short.mjs render <id>    render out/<id>.mp4 (1080x1920)
//   node scripts/short.mjs all <id>       both
// Specs live in src/shorts/shorts.json: {id, long, srt, from, to, title, boxH?, focusX?, accent?, bg?}
import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const [cmd, id] = process.argv.slice(2);
const spec = JSON.parse(fs.readFileSync(path.join(root, 'src/shorts/shorts.json'), 'utf8')).find((s) => s.id === id);
if (!spec) { console.error('unknown id', id); process.exit(1); }

const toSec = (t) => { const [h, m, r] = t.split(':'); const [s, ms] = r.split(','); return +h * 3600 + +m * 60 + +s + +ms / 1000; };
const fmt = (x) => { x = Math.max(0, x); const h = Math.floor(x / 3600), m = Math.floor((x % 3600) / 60), s = Math.floor(x % 60), ms = Math.round((x % 1) * 1000);
  const p = (n, w = 2) => String(n).padStart(w, '0'); return `${p(h)}:${p(m)}:${p(s)},${p(ms, 3)}`; };

function prep() {
  const outDir = path.join(root, 'public/shorts_src'); fs.mkdirSync(outDir, {recursive: true});
  const clip = path.join(outDir, `${id}.mp4`);
  execFileSync('ffmpeg', ['-y', '-ss', String(spec.from), '-to', String(spec.to), '-i', path.join(root, spec.long),
    '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '20', '-c:a', 'aac', '-b:a', '192k', '-r', '24', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', clip], {stdio: 'inherit'});
  const blocks = fs.readFileSync(path.join(root, spec.srt), 'utf8').replace(/\r/g, '').trim().split(/\n\s*\n/);
  const out = []; let n = 1;
  for (const b of blocks) {
    const l = b.split('\n'); const i = l.findIndex((x) => x.includes('-->')); if (i < 0) continue;
    const [a, z] = l[i].split('-->').map((s) => toSec(s.trim()));
    if (z <= spec.from || a >= spec.to) continue;
    out.push(`${n++}\n${fmt(a - spec.from)} --> ${fmt(Math.min(z, spec.to) - spec.from)}\n${l.slice(i + 1).join('\n')}\n`);
  }
  fs.writeFileSync(path.join(outDir, `${id}.srt`), out.join('\n'));
  console.log('prepared', clip, out.length, 'captions');
}

async function render() {
  const {bundle} = await import(path.join(root, 'node_modules/@remotion/bundler/dist/index.js'));
  const {selectComposition, renderMedia} = await import(path.join(root, 'node_modules/@remotion/renderer/dist/index.js'));
  const browserExecutable = process.env.BROWSER;
  const serveUrl = await bundle({entryPoint: path.join(root, 'src', 'index.ts')});
  const composition = await selectComposition({serveUrl, id, browserExecutable});
  const outputLocation = path.join(root, 'out', `${id}.mp4`);
  await renderMedia({serveUrl, composition, codec: 'h264', outputLocation, browserExecutable, concurrency: 2, imageFormat: 'jpeg', jpegQuality: 88});
  console.log('done', outputLocation);
}

if (cmd === 'prep' || cmd === 'all') prep();
if (cmd === 'render' || cmd === 'all') await render();
