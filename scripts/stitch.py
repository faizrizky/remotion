#!/usr/bin/env python3
"""Stitch two Gemini 16:9 pieces into one wide world (Video 02 backgrounds).

usage: stitch.py A.png B.png OUT.jpg [shift_x dy]
  A = left piece, B = continuation to the right. If shift_x/dy are omitted they are found by template matching
  (shift_x = x in A where B's left edge starts).
Steps: align B (dy) -> dense flow in the overlap (lines coincide) -> per-channel colour match ->
wide smooth blend; the ceiling band (lamps etc.) uses a hard cut inside a column gap free of dark lines.
Output height is 1080.
"""
import sys, cv2, numpy as np

def load(p, h=None):
    im = cv2.imread(p)
    if h and im.shape[0] != h:
        s = h / im.shape[0]
        im = cv2.resize(im, (round(im.shape[1] * s), h), interpolation=cv2.INTER_CUBIC)
    return im

def find_shift(A, B):
    h, w = A.shape[:2]
    out = []
    for sw in (250, 400):
        tpl = A[int(h * .45):int(h * .95), w - sw:w]
        res = cv2.matchTemplate(B[:, :int(B.shape[1] * .6)], tpl, cv2.TM_CCOEFF_NORMED)
        _, mx, _, loc = cv2.minMaxLoc(res)
        out.append(((w - sw) - loc[0], loc[1] - int(h * .45), mx))
    print('match', out)
    return out[1][0], out[1][1]

def stitch(A, B, sh, dy, top=0.30, clean=None):
    h, w = A.shape[:2]
    B = cv2.resize(B, (w, h)) if B.shape[:2] != (h, w) else B
    ov = w - sh
    B = cv2.warpAffine(B, np.float32([[1, 0, 0], [0, 1, -dy]]), (w, h), borderMode=cv2.BORDER_REPLICATE)
    Ao, Bo = A[:, sh:w], B[:, :ov]
    ga, gb = cv2.cvtColor(Ao, cv2.COLOR_BGR2GRAY), cv2.cvtColor(Bo, cv2.COLOR_BGR2GRAY)
    flow = cv2.calcOpticalFlowFarneback(ga, gb, None, 0.5, 5, 41, 5, 7, 1.5, 0)
    flow = cv2.GaussianBlur(flow, (0, 0), 20)
    flow = (flow * np.linspace(1, 0, ov)[None, :, None]).astype(np.float32)
    yy, xx = np.mgrid[0:h, 0:ov].astype(np.float32)
    Bw = cv2.remap(Bo, (xx + flow[..., 0]).astype(np.float32), (yy + flow[..., 1]).astype(np.float32),
                   cv2.INTER_CUBIC, borderMode=cv2.BORDER_REPLICATE).astype(np.float32)
    Af, Bf = Ao.astype(np.float32), Bo.astype(np.float32)
    gain = np.clip([Af[..., c].mean() / Bw[..., c].mean() for c in range(3)], 0.92, 1.08)
    print('gain', gain)
    Bg = np.clip(B.astype(np.float32) * gain, 0, 255)
    Bw = np.clip(Bw * gain, 0, 255); Bf = np.clip(Bf * gain, 0, 255)
    a = np.linspace(0, 1, ov); a = (a * a * (3 - 2 * a))[None, :, None]
    wide = Af * (1 - a) + Bw * a
    # lamp-safe hard cut for the top band: longest run of columns with no dark lines in either piece
    band = slice(0, int(h * top))
    def prof(I): return (cv2.cvtColor(I[band, :], cv2.COLOR_BGR2GRAY) < 200).mean(axis=0)
    busy = (prof(Ao) > 0.002) | (prof(Bo) > 0.002)
    best, s = (0, 0), None
    for i, v in enumerate(list(busy) + [True]):
        if not v and s is None: s = i
        if v and s is not None:
            if i - s > best[1] - best[0]: best = (s, i)
            s = None
    if clean:   # clean=(cut, erase_to, src_col): no lamp-free gap -> A up to cut, then plain wall (B's wall column) up to erase_to
        c, e, src = clean
        f = 14
        wall = np.repeat(Bg[:, src:src + 1], ov, axis=1)
        Bt = Bf.copy(); Bt[:, :e] = wall[:, :e]
        ah = np.zeros(ov, np.float32); ah[c + f:] = 1; ah[c - f:c + f] = np.linspace(0, 1, 2 * f); ah = ah[None, :, None]
        hard = Af * (1 - ah) + Bt * ah
    else:
        c = (best[0] + best[1]) // 2; f = max(4, min(14, (best[1] - best[0]) // 2 - 2))
        print('top-band gap', best, 'cut', c)
        ah = np.zeros(ov, np.float32); ah[c + f:] = 1; ah[c - f:c + f] = np.linspace(0, 1, 2 * f); ah = ah[None, :, None]
        hard = Af * (1 - ah) + Bf * ah
    vy = np.clip((np.arange(h) - (top - 0.03) * h) / (0.06 * h), 0, 1)[:, None, None]
    mix = hard * (1 - vy) + wide * vy
    import os
    if os.environ.get('PATCH'):   # y0,y1,c0 (fractions of h for y, column in overlap): use B only there (kills ghosts of objects only A has)
        y0, y1, c0 = os.environ['PATCH'].split(','); y0, y1, c0 = int(float(y0) * h), int(float(y1) * h), int(c0)
        m = np.zeros((h, ov, 1), np.float32); m[y0:y1, c0:] = 1; m = cv2.GaussianBlur(m, (0, 0), 6)[..., None]
        mix = mix * (1 - m) + Bf * m
    Wd = sh + w
    P = np.zeros((h, Wd, 3), np.float32)
    P[:, :sh] = A[:, :sh]; P[:, w:] = Bg[:, ov:]; P[:, sh:w] = mix
    return P.clip(0, 255).astype(np.uint8)

if __name__ == '__main__':
    a, b, out = sys.argv[1:4]
    A = load(a); B = load(b, A.shape[0])
    sh, dy = (int(sys.argv[4]), int(sys.argv[5])) if len(sys.argv) > 5 else find_shift(A, B)
    clean = tuple(int(x) for x in sys.argv[6:9]) if len(sys.argv) > 8 else None
    P = stitch(A, B, sh, dy, clean=clean)
    o = cv2.resize(P, (round(P.shape[1] * 1080 / P.shape[0]), 1080), interpolation=cv2.INTER_AREA)
    cv2.imwrite(out, o, [cv2.IMWRITE_JPEG_QUALITY, 93])
    print('wrote', out, o.shape)
