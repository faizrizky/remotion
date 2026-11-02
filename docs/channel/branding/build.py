from PIL import Image
import asyncio, pathlib
from playwright.async_api import async_playwright
P='file:///home/claude/remotion/public/'
FONT=f"""
@font-face{{font-family:Pop;src:url({P}fonts/poppins-latin-900-normal.woff2);font-weight:900}}
@font-face{{font-family:Pop;src:url({P}fonts/poppins-latin-800-normal.woff2);font-weight:800}}
@font-face{{font-family:Pop;src:url({P}fonts/poppins-latin-600-normal.woff2);font-weight:600}}
@font-face{{font-family:Fre;src:url({P}fonts/fredoka-latin-700-normal.woff2);font-weight:700}}
*{{margin:0;padding:0;box-sizing:border-box}} body{{overflow:hidden}}
.a{{position:absolute}} img{{position:absolute;display:block}}
.t{{font-family:Pop;font-weight:900;line-height:.95;letter-spacing:-1px;text-transform:uppercase;white-space:nowrap}}
.out{{-webkit-text-stroke:14px #14213D;paint-order:stroke fill;}}
.sh{{filter:drop-shadow(0 10px 0 rgba(20,33,61,.28))}}
"""
def head(name,x,y,h,flip=False,rot=0):
    w=h*320/361
    return f'<div class="a" style="left:{x}px;top:{y}px;width:{w}px;height:{h}px;transform:rotate({rot}deg) scaleX({-1 if flip else 1});filter:drop-shadow(0 8px 0 rgba(20,33,61,.3))"><div style="width:100%;height:100%;background:url({P}{name}) -{207*h/361}px 0/{790*h/361}px {1539*h/361}px no-repeat"></div></div>'
HF={'shocked':.5,'suspicious':.49,'proud':.6,'happy':.6,'calm':.6,'tired':.6}
def leo(name,x,y,h,flip=False,vis=None):
    e=name.replace('head_','').replace('.png','')
    im=Image.open(f'/home/claude/remotion/public/leogem/leo_{e}.png'); H=h/HF[e]; w=H*im.width/im.height; vh=(vis if vis else H)
    return f'<div class="a" style="left:{x}px;top:{y}px;width:{w}px;height:{vh}px;overflow:hidden;transform:scaleX({-1 if flip else 1});filter:drop-shadow(0 8px 0 rgba(20,33,61,.3))"><img src="{P}leogem/leo_{e}.png" style="position:absolute;left:0;top:0;width:{w}px;height:{H}px"></div>'
def coin(x,y,d,txt='$',rot=0):
    return f'<div class="a" style="left:{x}px;top:{y}px;width:{d}px;height:{d}px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#FFE27A,#F5B700 70%);border:{d*.07}px solid #14213D;display:flex;align-items:center;justify-content:center;font:900 {d*.38}px Pop;color:#14213D;transform:rotate({rot}deg);box-shadow:0 8px 0 rgba(20,33,61,.28)">{txt}</div>'
T1=f"""<html><style>{FONT}</style><body style="width:1280px;height:720px;background:linear-gradient(120deg,#FFC93C 0%,#FFB347 45%,#F2674A 100%);position:relative">
<div class="a" style="inset:0;background:radial-gradient(circle at 78% 55%,rgba(255,255,255,.45),transparent 45%)"></div>
<div class="a t out" style="left:44px;top:26px;font-size:128px;color:#fff">PAY IN FULL?</div>
<div class="a" style="left:40px;top:175px;background:#14213D;border-radius:22px;padding:12px 34px;transform:rotate(-3deg);box-shadow:0 10px 0 rgba(20,33,61,.3)"><div class="t" style="font-size:84px;color:#FFE27A">THEY STILL WIN</div></div>
{leo('head_shocked.png',20,330,300,False,390)}
<img class="sh" src="{P}v1/card_blue.png" style="left:400px;top:480px;width:300px;transform:rotate(-10deg)">
{coin(720,470,70,'$',-12)}{coin(770,390,64,'$',10)}{coin(715,310,60,'$',-8)}
<img class="sh" src="{P}obj_bank_transparent.png" style="left:790px;top:60px;width:470px">
{coin(1010,500,86,'$',14)}
</body></html>"""
T2=f"""<html><style>{FONT}</style><body style="width:1280px;height:720px;background:linear-gradient(135deg,#EA6E5C 0%,#F08A7A 50%,#E0507A 100%);position:relative">
<div class="a" style="inset:0;background:radial-gradient(circle at 30% 60%,rgba(255,255,255,.35),transparent 50%)"></div>
<div class="a t out" style="left:44px;top:30px;font-size:118px;color:#fff">PAY IN 4</div>
<img class="sh" src="{P}v2/obj_cart_full.png" style="left:40px;top:190px;width:470px">
{coin(540,230,150,'$30',-8)}{coin(700,330,150,'$30',6)}{coin(540,420,150,'$30',8)}{coin(700,520,150,'$30',-6)}
<div class="a" style="left:290px;top:330px;background:#D7263D;border:12px solid #fff;border-radius:18px;padding:6px 36px;transform:rotate(-9deg);box-shadow:0 12px 0 rgba(20,33,61,.35)"><div class="t" style="font-size:112px;color:#fff;letter-spacing:2px">NOT FREE</div></div>
{leo('head_suspicious.png',885,250,330,False,470)}
</body></html>"""
T3=f"""<html><style>{FONT}</style><body style="width:1280px;height:720px;background:linear-gradient(135deg,#BDEBD3 0%,#8FD9C0 55%,#6CC5D9 100%);position:relative">
<div class="a" style="inset:0;background:radial-gradient(circle at 50% 70%,rgba(255,255,255,.5),transparent 55%)"></div>
<div class="a t out" style="left:44px;top:24px;font-size:118px;color:#fff">SAME PRICE.</div>
<div class="a t out" style="left:44px;top:140px;font-size:118px;color:#FFE27A">LESS STUFF.</div>
<img class="sh" src="{P}v3/obj_cereal_box.png" style="left:70px;top:300px;width:330px">
<img class="sh" src="{P}v3/obj_cereal_box.png" style="left:470px;top:430px;width:215px">
<div class="a t" style="left:405px;top:480px;font-size:110px;color:#14213D">=</div>
<div class="a" style="left:130px;top:620px;background:#fff;border:8px solid #14213D;border-radius:14px;padding:2px 20px;transform:rotate(-4deg)"><div class="t" style="font-size:60px;color:#14213D">$4.99</div></div>
<div class="a" style="left:470px;top:630px;background:#fff;border:8px solid #14213D;border-radius:14px;padding:2px 20px;transform:rotate(3deg)"><div class="t" style="font-size:60px;color:#14213D">$4.99</div></div>
{leo('head_shocked.png',840,250,330,True,470)}
</body></html>"""
BN=f"""<html><style>{FONT}</style><body style="width:2560px;height:1440px;background:linear-gradient(135deg,#1F9E92 0%,#2BB3A3 50%,#FFC93C 130%);position:relative">
<div class="a" style="inset:0;background:radial-gradient(circle at 50% 50%,rgba(255,255,255,.28),transparent 55%)"></div>
<!-- safe area 1546x423 at x507..2053 y508..931 -->
<div class="a" style="left:520px;top:520px;width:400px;height:400px;border-radius:50%;overflow:hidden;border:14px solid #fff;box-shadow:0 14px 0 rgba(20,33,61,.3)"><img src="{P}profile_pic.png" style="left:0;top:0;width:100%"></div>
<div class="a t" style="left:965px;top:560px;font-size:132px;color:#fff;-webkit-text-stroke:0;text-shadow:0 10px 0 #14213D;letter-spacing:-3px">PENNY LOGICS</div>
<div class="a" style="left:970px;top:720px;font:800 46px Pop;color:#14213D;white-space:nowrap">The money tricks hiding in plain sight.</div>
<div class="a" style="left:970px;top:800px;font:600 36px Pop;color:#fff;white-space:nowrap;opacity:.95">Animated money lessons, new videos every other day</div>
<!-- side props (outside safe area) -->
<img class="sh" src="{P}v2/obj_cart_full.png" style="left:60px;top:560px;width:380px">
<img class="sh" src="{P}v3/obj_cereal_box.png" style="left:290px;top:140px;width:220px;transform:rotate(-8deg)">
<img class="sh" src="{P}v1/card_blue.png" style="left:90px;top:130px;width:230px;transform:rotate(-14deg)">
<img class="sh" src="{P}obj_bank_transparent.png" style="left:2150px;top:560px;width:390px">
<img class="sh" src="{P}v1/coinstack_giant.png" style="left:2250px;top:100px;width:200px">
{leo('head_proud.png',2060,110,300,False,420)}
{coin(1850,1050,110,'$',10)}{coin(700,1090,90,'$',-8)}{coin(2000,1160,80,'$',6)}{coin(480,1000,70,'$',-12)}
</body></html>"""
WM=f"""<html><style>{FONT}</style><body style="width:300px;height:300px;background:transparent;position:relative">
<div class="a" style="left:0;top:0;width:300px;height:300px;border-radius:50%;overflow:hidden"><img src="{P}profile_pic.png" style="left:0;top:0;width:100%"></div></body></html>"""
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--allow-file-access-from-files'])
        for name,html,w,h,tr in [('thumb_v1',T1,1280,720,False),('thumb_v2',T2,1280,720,False),('thumb_v3',T3,1280,720,False),('channel_banner',BN,2560,1440,False),('watermark',WM,300,300,True)]:
            pg=await b.new_page(viewport={'width':w,'height':h})
            f=pathlib.Path(f'/tmp/th/{name}.html'); f.write_text(html)
            await pg.goto('file://'+str(f)); await pg.wait_for_timeout(800)
            await pg.screenshot(path=f'/home/claude/remotion/docs/channel/branding/{name}.png',omit_background=tr)
        await b.close()
asyncio.run(main())
