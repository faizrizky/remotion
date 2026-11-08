// Renders stills at given seconds into one contact sheet. usage: node scripts/sheet.mjs <Comp> out.png s1 s2 ...
import path from 'node:path';
import fs from 'node:fs';
process.on('exit', () => { try { if (globalThis.__su) fs.rmSync(globalThis.__su, {recursive: true, force: true}); } catch {} });
import {execSync} from 'node:child_process';
const [id, out, ...secs] = process.argv.slice(2);
const {bundle} = await import('@remotion/bundler');
const {selectComposition, renderStill} = await import('@remotion/renderer');
const browserExecutable = '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome';
const serveUrl = await bundle({entryPoint: path.resolve('src/index.ts')});
globalThis.__su = serveUrl;
const comp = await selectComposition({serveUrl, id, inputProps: {}, browserExecutable});
const files = [];
for (const s of secs) {
  const f = Math.min(comp.durationInFrames - 1, Math.round(Number(s) * 24));
  const o = `/tmp/sheet_${id}_${s}.png`;
  await renderStill({serveUrl, composition: comp, frame: f, output: o, browserExecutable, scale: 0.25});
  files.push(o);
}
execSync(`python3 -c "
import sys
from PIL import Image, ImageDraw
fs=sys.argv[2:]; n=len(fs); cols=4; rows=(n+cols-1)//cols
im=Image.new('RGB',(480*cols,270*rows),(0,0,0)); d=ImageDraw.Draw(im)
for i,f in enumerate(fs):
    x,y=(i%cols)*480,(i//cols)*270; im.paste(Image.open(f).convert('RGB').resize((480,270)),(x,y)); d.text((x+6,y+256),f.split('_')[-1][:-4]+'s',fill=(255,255,0))
im.save(sys.argv[1])" ${out} ${files.join(' ')}`);
console.log('sheet', out);
