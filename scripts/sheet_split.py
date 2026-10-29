"""Split a Gemini sprite sheet by connected components (not by a fixed grid), cut out the white
background, and upscale. Usage: split2.py sheet.png outdir name1 name2 ...  (names in reading order)"""
import sys, os
import numpy as np
from collections import deque
from PIL import Image, ImageFilter

def flood_bg(near):
    h, w = near.shape
    seen = np.zeros((h, w), bool); q = deque()
    for x in range(w):
        for y in (0, h - 1):
            if near[y, x] and not seen[y, x]: seen[y, x] = True; q.append((y, x))
    for y in range(h):
        for x in (0, w - 1):
            if near[y, x] and not seen[y, x]: seen[y, x] = True; q.append((y, x))
    while q:
        y, x = q.popleft()
        for dy, dx in ((1,0),(-1,0),(0,1),(0,-1)):
            ny, nx = y + dy, x + dx
            if 0 <= ny < h and 0 <= nx < w and not seen[ny, nx] and near[ny, nx]:
                seen[ny, nx] = True; q.append((ny, nx))
    return seen

def components(mask):
    h, w = mask.shape
    lab = np.zeros((h, w), int); n = 0
    for y in range(h):
        for x in range(w):
            if mask[y, x] and not lab[y, x]:
                n += 1; q = deque([(y, x)]); lab[y, x] = n
                while q:
                    cy, cx = q.popleft()
                    for dy, dx in ((1,0),(-1,0),(0,1),(0,-1)):
                        ny, nx = cy + dy, cx + dx
                        if 0 <= ny < h and 0 <= nx < w and mask[ny, nx] and not lab[ny, nx]:
                            lab[ny, nx] = n; q.append((ny, nx))
    return lab, n

def main(path, outdir, names, scale=3, tol=30, grow=8, minarea=0.002):
    os.makedirs(outdir, exist_ok=True)
    im = Image.open(path).convert('RGBA'); a = np.array(im); h, w = a.shape[:2]
    rgb = a[..., :3].astype(int)
    near = rgb.min(axis=2) >= 255 - tol
    bg = flood_bg(near)
    # enclosed pure-white holes (cart mesh, scale pans): also transparent if large enough
    holes = near & ~bg & (rgb.min(axis=2) >= 250)
    lab_h, nh = components(holes[::2, ::2])
    for i in range(1, nh + 1):
        m = lab_h == i
        if m.sum() > 25:
            mm = np.kron(m, np.ones((2, 2), bool))[:h, :w]
            bg |= mm & holes
    # any remaining pure-white pixel (mesh gaps, pan triangles) is background too
    bg |= (rgb.min(axis=2) >= 244) & ((rgb.max(axis=2) - rgb.min(axis=2)) < 10)
    fg = ~bg
    lab0, n0 = components(fg[::2, ::2])
    sizes = np.bincount(lab0.ravel(), minlength=n0 + 1)
    keep = np.zeros(n0 + 1, bool); keep[1:] = sizes[1:] >= 400
    fg = np.kron(keep[lab0], np.ones((2, 2), bool))[:h, :w] & fg
    # group pixels into objects: dilate a downsampled mask
    small = Image.fromarray((fg * 255).astype(np.uint8)).resize((w // 4, h // 4), Image.BOX)
    small = small.point(lambda v: 255 if v > 30 else 0).filter(ImageFilter.MaxFilter(2 * (grow // 4) + 1))
    lab, n = components(np.array(small) > 0)
    objs = []
    for i in range(1, n + 1):
        ys, xs = np.where(lab == i)
        if len(ys) < minarea * lab.size: continue
        objs.append((xs.min() * 4, ys.min() * 4, (xs.max() + 1) * 4, (ys.max() + 1) * 4))
    print('objects found:', len(objs), 'expected:', len(names))
    # reading order: cluster into rows by center y
    objs.sort(key=lambda b: (b[1] + b[3]) / 2)
    rows = []; 
    for b in objs:
        cy = (b[1] + b[3]) / 2
        if rows and abs(cy - np.mean([(r[1] + r[3]) / 2 for r in rows[-1]])) < h * 0.12: rows[-1].append(b)
        else: rows.append([b])
    ordered = [b for r in rows for b in sorted(r, key=lambda b: b[0])]
    alpha_full = np.where(fg, 255, 0).astype(np.uint8)
    for b, name in zip(ordered, names):
        x0, y0, x1, y1 = max(0, b[0] - 6), max(0, b[1] - 6), min(w, b[2] + 6), min(h, b[3] + 6)
        crop = a[y0:y1, x0:x1].copy()
        crop[..., 3] = alpha_full[y0:y1, x0:x1]
        o = Image.fromarray(crop)
        o = o.resize((o.width * scale, o.height * scale), Image.LANCZOS)
        al = o.getchannel('A').filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(1.2))
        o.putalpha(al)
        bb = o.getchannel('A').point(lambda v: 255 if v > 24 else 0).getbbox()
        o = o.crop(bb)
        o.save(os.path.join(outdir, name + '.png'))
        print(name, o.size)

if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2], sys.argv[3:])
