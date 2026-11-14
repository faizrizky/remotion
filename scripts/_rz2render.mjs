import {bundle} from '@remotion/bundler';
import {renderMedia, selectComposition} from '@remotion/renderer';
import path from 'path';
const browserExecutable = '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome';
const serveUrl = await bundle({entryPoint: path.resolve('src/index.ts')});
const comp = await selectComposition({serveUrl, id: 'RZ-S1P2', browserExecutable});
let last = -1;
await renderMedia({serveUrl, composition: comp, codec: 'h264', crf: 20, x264Preset: 'veryfast', outputLocation: process.argv[2], browserExecutable, concurrency: 1,
  onProgress: ({progress}) => { const p = Math.floor(progress * 20); if (p !== last) { last = p; console.log('progress', p * 5); } }});
console.log('done');
