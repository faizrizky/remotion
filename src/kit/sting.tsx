// Penny Logics brand sting, modelled on the Kok Bisa channel sting (re-drawn, no assets taken):
// circles burst over the scene -> construction dots + bracket guides appear -> letter outlines draw ->
// letters fill (translucent, then solid) -> guides fly off -> slow push-in -> the camera dives through
// the hole of the "o" in "logics" and the next scene is already playing inside it.
// Letter advances come from Poppins Black (fontTools), so every glyph sits exactly where the browser draws it.
import React from 'react';
import {AbsoluteFill, interpolate, Sequence, useCurrentFrame} from 'remotion';
import {CircleBurstWipe, SANS} from '../style/style_kit';
import {Sfx} from '../video02/v2kit';
import {clamp, easeInOut, rand} from './core';

/** Poppins 900: advance width + glyph bounds [xMin, yMin, xMax, yMax], units per em = 1000. */
const GLYPH: Record<string, [number, number, number, number, number]> = {
  p: [680, 50, -270, 660, 571], e: [616, 20, -7, 596, 571], n: [697, 50, 0, 651, 568], y: [677, -10, -270, 687, 564],
  '-': [576, 20, 250, 486, 433], l: [322, 50, 0, 272, 740], o: [636, 20, -7, 616, 571], g: [680, 20, -277, 630, 571],
  i: [322, 34, 0, 289, 829], c: [609, 20, -7, 589, 571], s: [579, 21, -7, 542, 571], '?': [538, 18, -8, 518, 773],
};
/** inner contour (counter) of "o": x 245..391, y 185..379 */
const O_HOLE = {cx: 318, cy: 282, rx: 73, ry: 97};

export const STING_COLOR = '#1E8C86';

type Glyph = {ch: string; x: number; base: number; b: [number, number, number, number]; i: number};

const layout = (lines: string[], size: number, gap: number, cx: number, cy: number) => {
  const k = size / 1000;
  const widths = lines.map((l) => [...l].reduce((s, ch) => s + (GLYPH[ch]?.[0] ?? 600), 0) * k);
  const x0 = cx - Math.max(...widths) / 2;
  const top = cy - ((lines.length - 1) * gap) / 2 + size * 0.2;
  const glyphs: Glyph[] = [];
  let i = 0;
  lines.forEach((l, li) => {
    let x = x0;
    const base = top + li * gap;
    for (const ch of l) {
      const g = GLYPH[ch] ?? [600, 0, 0, 600, 700];
      glyphs.push({ch, x, base, b: [x + g[1] * k, base - g[4] * k, x + g[3] * k, base - g[2] * k], i: i++});
      x += g[0] * k;
    }
  });
  return {glyphs, k};
};

/** Bracket / arc guides hugging a glyph, each with dots on its ends (the "technical drawing" look). */
const guidesFor = (g: Glyph, seed: string) => {
  const [x0, y0, x1, y1] = g.b;
  const out: {d: string; ends: [number, number][]}[] = [];
  const r = (n: string) => rand(`${seed}${g.i}${n}`);
  const pad = 14 + r('p') * 16;
  const kind = Math.floor(r('k') * 4);
  if (kind === 0) out.push({d: `M${x0 - pad} ${y0 + 20} V${y0 - pad} H${x0 + (x1 - x0) * 0.6}`, ends: [[x0 - pad, y0 + 20], [x0 + (x1 - x0) * 0.6, y0 - pad]]});
  if (kind === 1) out.push({d: `M${x1 + pad} ${y1 - 30} V${y1 + pad} H${x1 - (x1 - x0) * 0.5}`, ends: [[x1 + pad, y1 - 30], [x1 - (x1 - x0) * 0.5, y1 + pad]]});
  if (kind === 2) {
    const cxm = (x0 + x1) / 2, rr = (x1 - x0) / 2 + pad;
    out.push({d: `M${cxm - rr} ${y0 + 10} A${rr} ${rr} 0 0 1 ${cxm + rr * 0.3} ${y0 - pad}`, ends: [[cxm - rr, y0 + 10], [cxm + rr * 0.3, y0 - pad]]});
  }
  if (kind === 3) out.push({d: `M${x0 + 4} ${y1 + pad} H${x1 + pad} V${y1 - 40}`, ends: [[x0 + 4, y1 + pad], [x1 + pad, y1 - 40]]});
  if (r('s') > 0.55) out.push({d: `M${x1 + pad * 0.6} ${y0 - pad * 1.6} H${x1 + pad * 3}`, ends: [[x1 + pad * 0.6, y0 - pad * 1.6], [x1 + pad * 3, y0 - pad * 1.6]]});
  return out;
};

/**
 * The sting. `dur` = frames it covers. With `reveal`, the last 10 frames dive into the "o" and
 * whatever is rendered underneath (the next chapter) shows through the hole.
 */
export const PennySting: React.FC<{dur: number; reveal?: boolean; color?: string; lines?: string[]}> = ({dur, reveal = false, color = STING_COLOR, lines = ['penny-', 'logics']}) => {
  const f = useCurrentFrame();
  const size = 250;
  const {glyphs, k} = layout(lines, size, 292, 960, 540);
  const n = glyphs.length;
  const oG = glyphs.find((g) => g.ch === 'o');
  const hole = oG ? {x: oG.x + O_HOLE.cx * k, y: oG.base - O_HOLE.cy * k, rx: O_HOLE.rx * k * 0.88, ry: O_HOLE.ry * k * 0.88} : {x: 960, y: 540, rx: 20, ry: 26};
  // timeline (frames)
  const T = {dots: 8, guides: 12, outline: 14, semi: 30, solid: 36, fly: 46, hold: 50, dive: dur - 10};
  const hold = interpolate(f, [T.hold, T.dive], [1, 1.1], clamp);
  const diveT = reveal ? interpolate(f, [T.dive, dur], [0, 1], clamp) : 0;
  const zoom = hold * Math.pow(90, easeInOut(diveT) ** 1.6);
  const ox = reveal ? hole.x : 960, oy = reveal ? hole.y : 540;
  const fly = interpolate(f, [T.fly, T.fly + 12], [0, 1], clamp);
  const flyE = fly * fly;
  const tail = reveal ? 1 : interpolate(f, [dur - 8, dur], [1, 0], clamp);
  const allGuides = glyphs.flatMap((g) => guidesFor(g, 'pl').map((gd) => ({...gd, g})));
  const dots = Array.from({length: 46}).map((_, i) => ({x: 300 + rand(`d${i}x`) * 1320, y: 250 + rand(`d${i}y`) * 600, at: T.dots + rand(`d${i}a`) * 10}));
  return (
    <AbsoluteFill style={{opacity: tail}}>
      {/* teal field with the hole of the "o" cut out (only during the dive) */}
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0, opacity: f >= 9 ? 1 : 0}}>
        <defs>
          <mask id="pl-hole">
            <rect x={0} y={0} width={1920} height={1080} fill="#fff" />
            {reveal && diveT > 0 && <ellipse cx={ox + (hole.x - ox) * zoom} cy={oy + (hole.y - oy) * zoom} rx={hole.rx * zoom} ry={hole.ry * zoom} fill="#000" />}
          </mask>
        </defs>
        <rect x={0} y={0} width={1920} height={1080} fill={color} mask="url(#pl-hole)" />
      </svg>
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0, overflow: 'visible', opacity: f >= 9 ? 1 : 0}}>
        <g transform={`translate(${ox} ${oy}) scale(${zoom}) translate(${-ox} ${-oy})`}>
          {/* construction dots */}
          {dots.map((d, i) => <circle key={i} cx={d.x} cy={d.y} r={3.5} fill="#fff" opacity={interpolate(f, [d.at, d.at + 3, T.fly, T.fly + 6], [0, 0.9, 0.9, 0], clamp)} />)}
          {/* bracket guides: draw on, then fly outwards */}
          {allGuides.map((gd, i) => {
            const at = T.guides + (i % 14) * 1.2;
            const draw = interpolate(f, [at, at + 10], [0, 1], clamp);
            const [gx, gy] = [(gd.g.b[0] + gd.g.b[2]) / 2 - 960, (gd.g.b[1] + gd.g.b[3]) / 2 - 540];
            const len = Math.hypot(gx, gy) || 1;
            const dist = 700 + rand(`f${i}`) * 500;
            const tx = (gx / len) * dist * flyE, ty = (gy / len) * dist * flyE;
            return (
              <g key={i} transform={`translate(${tx} ${ty})`} opacity={(1 - fly) * (draw > 0 ? 1 : 0)}>
                <path d={gd.d} fill="none" stroke="#fff" strokeWidth={2.5} pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - draw} />
                {gd.ends.map(([x, y], j) => <circle key={j} cx={x} cy={y} r={5} fill="#fff" opacity={draw > 0.15 * (j + 1) ? 1 : 0} />)}
              </g>
            );
          })}
          {/* letters: outline draws, then translucent fill sweeps, then solid fill sweeps */}
          {glyphs.map((g) => {
            const st = g.i * 1.6;
            const drawT = interpolate(f, [T.outline + st, T.outline + st + 14], [0, 1], clamp);
            const semi = interpolate(f, [T.semi + st * 0.7, T.semi + st * 0.7 + 8], [0, 1], clamp);
            const solid = interpolate(f, [T.solid + st * 0.7, T.solid + st * 0.7 + 8], [0, 1], clamp);
            const w = g.b[2] - g.b[0] + 20;
            const text = (fill: string, op: number, clip?: string) => (
              <text x={g.x} y={g.base} fontFamily={SANS} fontWeight={900} fontSize={size} fill={fill} fillOpacity={op} clipPath={clip}>{g.ch}</text>
            );
            return (
              <g key={g.i}>
                <defs>
                  <clipPath id={`pls${g.i}`}><rect x={g.b[0] - 10} y={g.b[1] - 20} width={w * semi} height={g.b[3] - g.b[1] + 40} /></clipPath>
                  <clipPath id={`plf${g.i}`}><rect x={g.b[0] - 10} y={g.b[1] - 20} width={w * solid} height={g.b[3] - g.b[1] + 40} /></clipPath>
                </defs>
                {solid < 1 && <text x={g.x} y={g.base} fontFamily={SANS} fontWeight={900} fontSize={size} fill="none" stroke="#fff" strokeWidth={3} strokeDasharray="1400" strokeDashoffset={1400 * (1 - drawT)} opacity={drawT > 0 ? 1 : 0}>{g.ch}</text>}
                {semi > 0 && solid < 1 && text('#fff', 0.5, `url(#pls${g.i})`)}
                {solid > 0 && text('#fff', 1, `url(#plf${g.i})`)}
              </g>
            );
          })}
        </g>
      </svg>
      <Sequence durationInFrames={13}><CircleBurstWipe color={color} dur={12} seed="pl-sting" n={8} /></Sequence>
      <Sfx name="whoosh" at={0} />
      <Sfx name="pop" at={T.solid + n} />
      {reveal && <Sfx name="whoosh" at={T.dive - 2} />}
    </AbsoluteFill>
  );
};
