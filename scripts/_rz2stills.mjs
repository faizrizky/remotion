import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition} from '@remotion/renderer';
import path from 'path';
const browserExecutable = '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome';
const serveUrl = await bundle({entryPoint: path.resolve('src/index.ts')});
const comp = await selectComposition({serveUrl, id: 'RZ-S1P2', browserExecutable});
console.log('frames', comp.durationInFrames);
for (const s of process.argv.slice(2)) {
  const f = Math.round(parseFloat(s) * 24);
  await renderStill({serveUrl, composition: comp, frame: f, output: `/tmp/claude-0/st_${s}.jpg`, imageFormat: 'jpeg', jpegQuality: 70, browserExecutable, scale: 0.4});
  console.log('ok', s);
}
