"""Build full-Leo reference images (closed chin + neck + hoodie) for Gemini/thumbnails.
The head PNGs are cropped flat at the chin (they sit on leo_body.png in the video), so we redraw a closed jaw."""
from PIL import Image, ImageDraw
import numpy as np, sys
from scipy.interpolate import CubicSpline
body=Image.open('/home/claude/remotion/public/v1/leo_body.png').convert('RGBA')
SK=(247,166,111,255); LN=(27,0,0,255); CX=367.5
# jaw continues the head outline: half-width w -> y (head outline is w~54 at y=350, slope ~1.2px/row inward)
JP=[(0,382),(8,381),(20,378),(32,372),(41,365),(47,358)]
cs=CubicSpline([p[0] for p in JP],[p[1] for p in JP])
CUT=358
def chin_layer():
    S=4; W,H=body.size
    L=Image.new('RGBA',(W*S,H*S),(0,0,0,0)); d=ImageDraw.Draw(L)
    d.rectangle([(CX-43)*S,352*S,(CX+43)*S,362*S],fill=SK)
    ws=np.linspace(47,0,120)
    left=[((CX-w)*S,float(cs(w))*S) for w in ws]; right=[((CX+w)*S,float(cs(w))*S) for w in ws[::-1]]
    d.polygon(left+right,fill=SK)
    d.line(left+right,fill=LN,width=int(5.5*S),joint='curve')
    return L.resize((W,H),Image.LANCZOS)
def build(name,crop=(60,0,730,760),bg=(255,255,255,255)):
    head=Image.open(f'/home/claude/remotion/public/head_{name}.png').convert('RGBA')
    a=np.array(head); a[CUT:,:,3]=0; head=Image.fromarray(a)
    c=Image.new('RGBA',body.size,(0,0,0,0)); c.alpha_composite(body); c.alpha_composite(head); c.alpha_composite(chin_layer())
    return c
if __name__=='__main__':
    for n in ['shocked','suspicious','proud','happy','thinking','calm']:
        try: c=build(n)
        except FileNotFoundError: continue
        c.save(f'/home/claude/gref/leofull_{n}.png')   # transparent, full canvas
        bg=Image.new('RGBA',c.size,(255,255,255,255)); bg.alpha_composite(c)
        bg.crop((60,0,730,760)).convert('RGB').save(f'/home/claude/gref/leo3_{n}.png')
