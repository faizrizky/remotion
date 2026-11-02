"""Banner = Gemini decoration-only background (public/banner_bg_empty.png) + logo/title/tagline placed inside the YouTube safe area (x507-2053, y508-931 of 2560x1440)."""
import asyncio, pathlib
from playwright.async_api import async_playwright
P='file:///home/claude/remotion/public/'
H=f"""<html><style>
@font-face{{font-family:Pop;src:url({P}fonts/poppins-latin-900-normal.woff2);font-weight:900}}
@font-face{{font-family:Pop;src:url({P}fonts/poppins-latin-800-normal.woff2);font-weight:800}}
*{{margin:0;padding:0}} body{{width:2560px;height:1440px;overflow:hidden;position:relative}}
.a{{position:absolute}}
</style><body>
<img class="a" src="{P}banner_bg_empty.png" style="left:0;top:0;width:2560px;height:1440px">
<div class="a" style="left:545px;top:552px;width:336px;height:336px;border-radius:50%;background:#fff;box-shadow:0 10px 0 rgba(20,33,61,.3)"></div>
<div class="a" style="left:561px;top:568px;width:304px;height:304px;border-radius:50%;overflow:hidden"><img class="a" src="{P}profile_pic.png" style="left:0;top:0;width:304px"></div>
<div class="a" style="left:935px;top:560px;font:900 128px Pop;color:#fff;-webkit-text-stroke:16px #14213D;paint-order:stroke fill;letter-spacing:-2px;white-space:nowrap;line-height:1.1">PENNY LOGICS</div>
<div class="a" style="left:945px;top:746px;font:800 46px Pop;color:#14213D;white-space:nowrap">The money tricks hiding in plain sight.</div>
</body></html>"""
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--allow-file-access-from-files'])
        pg=await b.new_page(viewport={'width':2560,'height':1440})
        f=pathlib.Path('/tmp/th/banner_gem.html'); f.write_text(H)
        await pg.goto('file://'+str(f)); await pg.wait_for_timeout(800)
        await pg.screenshot(path='/home/claude/remotion/docs/channel/branding/channel_banner_gemini.png')
        await b.close()
asyncio.run(main())
