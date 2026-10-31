#!/usr/bin/env python3
"""Plain wall-gap join (no overlap between pieces): A up to cut_a, B from cut_b, feathered; optional ceiling band painted on A.
usage: butt.py A B OUT cut_a cut_b dy [ceil_h]   (px at the pieces' native size; ceil_h = ceiling band height to copy from B's top onto A)"""
import sys, cv2, numpy as np
a, b, out = sys.argv[1:4]; ca, cb, dy = map(int, sys.argv[4:7]); ch = int(sys.argv[7]) if len(sys.argv) > 7 else 0
A = cv2.imread(a); B = cv2.imread(b); h = A.shape[0]
B = cv2.warpAffine(B, np.float32([[1, 0, 0], [0, 1, -dy]]), (B.shape[1], h), borderMode=cv2.BORDER_REPLICATE)
Af, Bf = A.astype(np.float32), B.astype(np.float32)
# colour match on plain wall patches (just beside the cut), mid-height
import os
ga = [int(v) for v in os.environ.get('GAINBOX', '').split(',')] if os.environ.get('GAINBOX') else None  # ax0,ax1,ay0,ay1,bx0,bx1,by0,by1: plain wall patches
gain = np.clip(Af[ga[2]:ga[3], ga[0]:ga[1]].mean((0, 1)) / Bf[ga[6]:ga[7], ga[4]:ga[5]].mean((0, 1)), .85, 1.15) if ga else np.ones(3); print('gain', gain)
Bf = np.clip(Bf * gain, 0, 255)
if ch:  # ceiling band from B's top onto A
    band = Bf[:ch + 6, 700:701].repeat(A.shape[1], 1); Af[:ch + 6] = band
f = 16
Bs = Bf[:, cb:]; n = Bs.shape[1]
P = np.concatenate([Af[:, :ca], Bs], axis=1)
# feather over [ca-f, ca+f]
seg_a = Af[:, ca - f:ca + f]; seg_b = np.concatenate([Af[:, ca - f:ca], Bf[:, cb:cb + f]], 1)
t = np.linspace(0, 1, 2 * f)[None, :, None]
P[:, ca - f:ca + f] = seg_a * (1 - t) + np.concatenate([Bf[:, cb - f:cb], Bf[:, cb:cb + f]], 1) * t
o = P.clip(0, 255).astype(np.uint8)
o = cv2.resize(o, (round(o.shape[1] * 1080 / h), 1080), interpolation=cv2.INTER_AREA)
cv2.imwrite(out, o, [cv2.IMWRITE_JPEG_QUALITY, 93]); print(o.shape)
