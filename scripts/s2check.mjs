// Style 2 layout check (rule 1.43): renders stills with {check: true}, reads the boxes of every
// foreground element (data-fg) and reports overlaps, gaps under 40 px, and anything outside the
// safe area (x 130-1790, y 60-1020) or off the frame. Elements shown over a DimPill are exempt.
// usage: node scripts/s2check.mjs <CompositionId> [step=4]
import path from 'node:path';
const [id = 'S2-HookTest', stepArg = '4'] = process.argv.slice(2);
const step = Number(stepArg);
const {bundle} = await import('@remotion/bundler');
const {selectComposition, renderStill} = await import('@remotion/renderer');
const browserExecutable = process.env.BROWSER || '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome';
const serveUrl = await bundle({entryPoint: path.resolve('src/index.ts')});
const inputProps = {check: true};
const comp = await selectComposition({serveUrl, id, inputProps, browserExecutable});
const SAFE = {x0: 130, x1: 1790, y0: 60, y1: 1020};
const problems = [];
for (let f = 0; f < comp.durationInFrames; f += step) {
  let boxes = null;
  await renderStill({serveUrl, composition: comp, frame: f, output: '/tmp/s2check.png', inputProps, browserExecutable, scale: 0.25,
    onBrowserLog: (l) => { if (l.text.startsWith('S2BOX ')) boxes = JSON.parse(l.text.slice(6)); }});
  if (!boxes) continue;
  if (boxes.wipe) continue; // a wipe covers both scenes on purpose
  const els = boxes.els.filter((e) => !e.exit); // exits leave the frame on purpose
  const dimOn = els.some((e) => e.dim);
  for (const e of els) {
    if (boxes.cam) break; // camera moving: things enter/leave the frame through the camera move
    if (e.x < 0 || e.y < 0 || e.x + e.w > 1920 || e.y + e.h > 1080) problems.push(`f${f} OFF-FRAME ${e.id} [${e.x},${e.y},${e.w}x${e.h}]`);
    else if (e.x < SAFE.x0 || e.y < SAFE.y0 || e.x + e.w > SAFE.x1 || e.y + e.h > SAFE.y1) problems.push(`f${f} OUTSIDE-SAFE ${e.id} [${e.x},${e.y},${e.w}x${e.h}]`);
  }
  for (let i = 0; i < els.length; i++) for (let j = i + 1; j < els.length; j++) {
    const a = els[i], b = els[j];
    if (dimOn && (a.dim || b.dim)) continue;
    const gx = Math.max(a.x, b.x) - Math.min(a.x + a.w, b.x + b.w);
    const gy = Math.max(a.y, b.y) - Math.min(a.y + a.h, b.y + b.h);
    if (gx < 0 && gy < 0) problems.push(`f${f} OVERLAP ${a.id} x ${b.id}`);
    else if (Math.max(gx, gy) < 40) problems.push(`f${f} GAP<40 ${a.id} x ${b.id} (${Math.max(gx, gy)} px)`);
  }
}
// keep only problems that last at least 2 samples in a row (entrance overshoots are short)
const key = (p) => p.replace(/^f\d+ /, '').replace(/ \[.*$/, '').replace(/ \(.*$/, '');
const byKey = new Map();
for (const p of problems) { const f = Number(p.match(/^f(\d+)/)[1]); const k = key(p); if (!byKey.has(k)) byKey.set(k, []); byKey.get(k).push([f, p]); }
const out = [];
for (const [k, list] of byKey) for (let i = 1; i < list.length; i++) if (list[i][0] - list[i - 1][0] === step) { out.push(list[i][1]); }
console.log(out.length ? out.join('\n') : 'OK: no lasting overlaps, gaps >= 40 px, everything inside the safe area when the camera is still');
