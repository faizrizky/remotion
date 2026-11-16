import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition} from '@remotion/renderer';
import path from 'path';
const B='/opt/pw-browsers/chromium-1243/chrome-linux64/chrome';
const times=process.argv.slice(2).map(Number);
const serveUrl=await bundle({entryPoint:path.resolve('src/index.ts'),rspack:true});
const comp=await selectComposition({serveUrl,id:'RZ-S2P1',browserExecutable:B,chromeMode:'chrome-for-testing'});
for(const t of times){
  await renderStill({composition:comp,serveUrl,output:`out/s2p1/f_${t}.jpg`,frame:Math.round(t*24),imageFormat:'jpeg',jpegQuality:80,browserExecutable:B,chromeMode:'chrome-for-testing'});
  console.log('ok',t);
}
