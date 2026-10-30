// Hand-drawn marker annotations (circle, underline, strike, box, arrow) + strike-and-replace text.
import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {SANS, usePop} from '../style/style_kit';
import {clamp, easeOut, INK, rand} from './core';

export type MarkKind = 'circle' | 'underline' | 'strike' | 'box' | 'arrow';
type Pt = [number, number];

const wobblePts = (kind: MarkKind, w: number, h: number, seed: string, dx = 0, dy = 0): Pt[] => {
  const j = (k: string, a: number) => (rand(seed + k) - 0.5) * a;
  const pts: Pt[] = [];
  if (kind === 'circle') {
    const n = 64;
    const turns = 1.12;
    const a0 = -2.2 + j('a0', 0.4);
    for (let i = 0; i <= n; i++) {
      const a = a0 + (i / n) * Math.PI * 2 * turns;
      const r = 1 + Math.sin(i / 6 + rand(seed) * 6) * 0.035 + (i / n) * 0.06;
      pts.push([w / 2 + Math.cos(a) * (w / 2) * r, h / 2 + Math.sin(a) * (h / 2) * r]);
    }
  } else if (kind === 'underline') {
    const n = 24;
    for (let i = 0; i <= n; i++) pts.push([(i / n) * w, h / 2 + Math.sin(i * 1.4 + rand(seed) * 3) * h * 0.18 + j('u' + i, 3)]);
  } else if (kind === 'strike') {
    pts.push([-6, h * 0.55], [w + 6, h * 0.42 + j('s1', 6)], [w * 0.15, h * 0.62 + j('s2', 6)]);
  } else if (kind === 'box') {
    const c: Pt[] = [[0, 0], [w, j('b1', 8)], [w + j('b2', 8), h], [j('b3', 8), h + j('b4', 6)], [j('b5', 6), -8]];
    for (let i = 0; i < c.length - 1; i++) for (let k = 0; k < 8; k++) pts.push([c[i][0] + ((c[i + 1][0] - c[i][0]) * k) / 8 + j(`bx${i}${k}`, 2), c[i][1] + ((c[i + 1][1] - c[i][1]) * k) / 8 + j(`by${i}${k}`, 2)]);
  } else {
    const n = 20;
    const bend = 0.22 * Math.hypot(dx, dy);
    const nx = -dy / (Math.hypot(dx, dy) || 1), ny = dx / (Math.hypot(dx, dy) || 1);
    for (let i = 0; i <= n; i++) {
      const t = i / n;
      const b = Math.sin(Math.PI * t) * bend;
      pts.push([dx * t + nx * b, dy * t + ny * b]);
    }
  }
  return pts;
};
const plen = (p: Pt[]) => p.reduce((s, q, i) => (i ? s + Math.hypot(q[0] - p[i - 1][0], q[1] - p[i - 1][1]) : 0), 0);

/** Marker stroke that draws itself. For 'arrow' give dx, dy (end point relative to start). */
export const HandMark: React.FC<{kind: MarkKind; w?: number; h?: number; dx?: number; dy?: number; at?: number; dur?: number; color?: string; width?: number; seed?: string}> = ({kind, w = 300, h = 120, dx = 200, dy = 0, at = 0, dur = 14, color = '#E5484D', width = 9, seed = 'm'}) => {
  const f = useCurrentFrame();
  const t = easeOut(interpolate(f, [at, at + dur], [0, 1], clamp));
  if (t <= 0) return null;
  const pts = wobblePts(kind, w, h, seed, dx, dy);
  const len = plen(pts);
  const d = pts.map((p) => p.join(',')).join(' ');
  let head: React.ReactNode = null;
  if (kind === 'arrow' && t > 0.85) {
    const a = pts[pts.length - 1], b = pts[pts.length - 3];
    const ang = Math.atan2(a[1] - b[1], a[0] - b[0]);
    const hl = 34 * interpolate(t, [0.85, 1], [0, 1], clamp);
    const p1 = [a[0] - Math.cos(ang - 0.5) * hl, a[1] - Math.sin(ang - 0.5) * hl];
    const p2 = [a[0] - Math.cos(ang + 0.5) * hl, a[1] - Math.sin(ang + 0.5) * hl];
    head = <polyline points={`${p1.join(',')} ${a.join(',')} ${p2.join(',')}`} fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" />;
  }
  return (
    <svg width={Math.max(1, w)} height={Math.max(1, h)} style={{position: 'absolute', left: 0, top: 0, overflow: 'visible', pointerEvents: 'none'}}>
      <polyline points={d} fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={len} strokeDashoffset={len * (1 - t)} opacity={0.92} />
      {head}
    </svg>
  );
};

/** Old value gets struck through, new value pops in next to it (e.g. $5.00 -> $4.85). */
export const StrikeReplace: React.FC<{from: string; to: string; at?: number; swapAt?: number; size?: number; color?: string; newColor?: string; below?: boolean}> = ({from, to, at = 0, swapAt = 18, size = 110, color = INK, newColor = '#2E9E5B', below}) => {
  const f = useCurrentFrame();
  const p = usePop(at + swapAt);
  const dim = interpolate(f, [at + swapAt - 14, at + swapAt], [1, 0.45], clamp);
  const w = from.length * size * 0.6;
  return (
    <div style={{position: 'absolute', left: 0, top: 0, display: 'flex', flexDirection: below ? 'column' : 'row', alignItems: below ? 'flex-start' : 'center', gap: size * 0.35, fontFamily: SANS, fontWeight: 900, fontSize: size, lineHeight: 1, whiteSpace: 'nowrap'}}>
      <div style={{position: 'relative', color, opacity: dim}}>
        {from}
        <HandMark kind="strike" w={w} h={size} at={at + swapAt - 14} dur={12} width={size * 0.09} />
      </div>
      <div style={{color: newColor, opacity: f < at + swapAt ? 0 : 1, transform: `scale(${p})`, transformOrigin: '0% 60%'}}>{to}</div>
    </div>
  );
};
