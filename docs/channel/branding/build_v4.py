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

NAVY="linear-gradient(135deg,#0E1B3D 0%,#1B2F66 55%,#27428A 100%)"
SPARK=''.join(f'<div class="a" style="left:{x}px;top:{y}px;font:900 {s}px Pop;color:rgba(255,255,255,.55)">&#10022;</div>' for x,y,s in [(60,640,34),(560,300,28),(1210,60,40),(1180,640,30),(640,640,24)])
def pill(txt,x,y,bg,fg,size,rot=0):
    return f'<div class="a" style="left:{x}px;top:{y}px;background:{bg};border:8px solid #fff;border-radius:18px;padding:4px 26px;transform:rotate({rot}deg);box-shadow:0 10px 0 rgba(0,0,0,.3)"><div class="t" style="font-size:{size}px;color:{fg}">{txt}</div></div>'
A=f"""<html><style>{FONT}</style><body style="width:1280px;height:720px;background:{NAVY};position:relative">
<div class="a" style="inset:0;background:radial-gradient(circle at 70% 70%,rgba(120,170,255,.28),transparent 55%)"></div>{SPARK}
<div class="a t out" style="left:44px;top:22px;font-size:112px;color:#fff">$188 LESS</div>
<div class="a t out" style="left:44px;top:132px;font-size:112px;color:#FFE27A">A MONTH?</div>
<img class="sh" src="{P}v4/obj_car_new_side.png" style="left:30px;top:330px;width:640px">
{pill('+$3,759',110,560,'#D7263D','#fff',120,-5)}
<img class="sh" src="{P}v4/obj_cash_stack_l.png" style="left:640px;top:330px;width:330px">
{leo('head_shocked.png',905,250,330,True,470)}
</body></html>"""
B=f"""<html><style>{FONT}</style><body style="width:1280px;height:720px;background:{NAVY};position:relative">
<div class="a" style="inset:0;background:radial-gradient(circle at 25% 65%,rgba(120,170,255,.3),transparent 55%)"></div>{SPARK}
<div class="a t out" style="left:44px;top:22px;font-size:100px;color:#fff">CHEAPER PAYMENT.</div>
<div class="a t out" style="left:44px;top:126px;font-size:122px;color:#FFE27A">COSTS MORE.</div>
<img class="sh" src="{P}v4/obj_car_new_side.png" style="left:40px;top:340px;width:600px">
<img class="sh" src="{P}v4/obj_debt_box.png" style="left:590px;top:310px;width:300px">
{pill('+$3,759',140,560,'#D7263D','#fff',108,-6)}
{leo('head_suspicious.png',905,250,330,True,470)}
</body></html>"""
C=f"""<html><style>{FONT}</style><body style="width:1280px;height:720px;background:{NAVY};position:relative">
<div class="a" style="inset:0;background:radial-gradient(circle at 50% 60%,rgba(120,170,255,.25),transparent 55%)"></div>{SPARK}
<div class="a t out" style="left:44px;top:20px;font-size:118px;color:#fff">SAME CAR.</div>
<div class="a" style="left:44px;top:200px;width:430px;background:#fff;border:10px solid #14213D;border-radius:22px;padding:14px 26px;transform:rotate(-3deg);box-shadow:0 12px 0 rgba(0,0,0,.35)"><div class="t" style="font-size:44px;color:#14213D">60 MONTHS</div><div class="t" style="font-size:112px;color:#14213D">$813</div></div>
<div class="a" style="left:500px;top:230px;width:430px;background:#fff;border:10px solid #14213D;border-radius:22px;padding:14px 26px;transform:rotate(3deg);box-shadow:0 12px 0 rgba(0,0,0,.35)"><div class="t" style="font-size:44px;color:#14213D">84 MONTHS</div><div class="t" style="font-size:112px;color:#1FA060">$625</div></div>
{pill('PAYS $3,759 MORE',44,500,'#D7263D','#fff',84,-3)}
<img class="sh" src="{P}v4/obj_car_new_side.png" style="left:60px;top:560px;width:300px">
{leo('head_shocked.png',950,250,330,True,470)}
</body></html>"""
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(); pg=await b.new_page(viewport={'width':1280,'height':720})
        for n,h in [('thumb_v4_a',A),('thumb_v4_b',B),('thumb_v4_c',C)]:
            open('/tmp/t4.html','w').write(h); await pg.goto('file:///tmp/t4.html'); await pg.wait_for_timeout(900); await pg.screenshot(path=f'/home/claude/remotion/docs/channel/branding/{n}.png')
        await b.close()
asyncio.run(main())
