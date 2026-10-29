// QA: render still frames of Video 02 into out/qa/ with ONE bundle (fast).
// Usage: node scripts/v2-stills.mjs                -> 3 frames per chapter (25%, 50%, 85%)
//        node scripts/v2-stills.mjs V2-03-Illusion 12.5 30   -> that composition at those seconds
// Optional: BROWSER=<path to chrome> node scripts/v2-stills.mjs
import path from 'node:path';
import fs from 'node:fs';
import {bundle} from '@remotion/bundler';
import {getCompositions, renderStill} from '@remotion/renderer';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..');
const outDir = path.join(root, 'out', 'qa');
fs.mkdirSync(outDir, {recursive: true});
const browserExecutable = process.env.BROWSER || null;

const serveUrl = await bundle({entryPoint: path.join(root, 'src', 'index.ts')});
const comps = (await getCompositions(serveUrl, {browserExecutable})).filter((c) => c.id.startsWith('V2-') && c.id !== 'V2-Full');

const [onlyId, ...secs] = process.argv.slice(2);
const jobs = [];
for (const c of comps) {
  if (onlyId && c.id !== onlyId) continue;
  const frames = secs.length ? secs.map((s) => Math.round(Number(s) * c.fps)) : [0.25, 0.5, 0.85].map((p) => Math.floor(c.durationInFrames * p));
  for (const frame of frames) jobs.push({c, frame: Math.min(frame, c.durationInFrames - 1)});
}
for (const {c, frame} of jobs) {
  const output = path.join(outDir, `${c.id}_f${String(frame).padStart(5, '0')}.png`);
  await renderStill({serveUrl, composition: c, frame, output, browserExecutable, scale: 0.5});
  console.log('ok', path.relative(root, output));
}
