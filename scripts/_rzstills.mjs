import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition} from '@remotion/renderer';
import path from 'path';
const times = process.argv.slice(3).map(Number);
const outDir = process.argv[2];
const browserExecutable = process.env.BROWSER || '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome';
const serveUrl = await bundle({entryPoint: path.resolve('src/index.ts')});
const comp = await selectComposition({serveUrl, id: 'RZ-S1P1', browserExecutable});
for (const t of times) {
  const frame = Math.min(comp.durationInFrames - 1, Math.round(t * 24));
  await renderStill({serveUrl, composition: comp, frame, output: `${outDir}/s_${String(t).padStart(6, '0')}.jpg`, browserExecutable, imageFormat: 'jpeg', jpegQuality: 70, scale: 0.4});
}
console.log('ok');
