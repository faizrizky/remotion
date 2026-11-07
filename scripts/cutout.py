import sys, numpy as np
from PIL import Image
from scipy import ndimage as ndi
src, dst = sys.argv[1], sys.argv[2]
flags = set(sys.argv[3:])  # 'largest' = keep biggest blob; 'holes' = clear enclosed white holes
im = Image.open(src).convert('RGB'); a = np.asarray(im).astype(np.int16)
white = (a.min(axis=2) >= 235)
lab, n = ndi.label(white)
edge = set(np.unique(np.concatenate([lab[0], lab[-1], lab[:,0], lab[:,-1]]))) - {0}
bg = np.isin(lab, list(edge))
bg = ndi.binary_dilation(bg, iterations=1) & (a.min(axis=2) >= 200)  # soften halo
if 'holes' in flags:
    hw = (a.min(axis=2) >= 244); hl, hn = ndi.label(hw)
    for i in range(1, hn+1):
        m = hl == i
        if m.sum() > 3000: bg |= m
alpha = np.where(bg, 0, 255).astype(np.uint8)
if 'largest' in flags:
    l2, n2 = ndi.label(alpha > 0)
    sizes = ndi.sum(np.ones_like(l2), l2, range(1, n2+1))
    alpha = np.where(l2 == (1 + int(np.argmax(sizes))), alpha, 0).astype(np.uint8)
alpha = ndi.gaussian_filter(alpha.astype(float), 0.8).astype(np.uint8)
out = np.dstack([np.asarray(im), alpha]); o = Image.fromarray(out, 'RGBA')
bbox = o.getchannel('A').point(lambda v: 255 if v > 20 else 0).getbbox()
o = o.crop(bbox); o.save(dst, optimize=True); print(dst, o.size)
