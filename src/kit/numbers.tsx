// Numbers & charts: odometer wheel, line chart, bar chart. Values are exact (code-drawn).
import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {SANS, usePop} from '../style/style_kit';
import {clamp, easeInOut, easeOut, INK} from './core';

/** Odometer: digits roll from `from` to `to`. Thousands separators kept in place. */
export const NumberWheel: React.FC<{to: number; from?: number; at?: number; dur?: number; prefix?: string; suffix?: string; size?: number; color?: string; commas?: boolean}> = ({to, from = 0, at = 0, dur = 30, prefix = '', suffix = '', size = 140, color = INK, commas = true}) => {
  const f = useCurrentFrame();
  const v = from + (to - from) * easeInOut(interpolate(f, [at, at + dur], [0, 1], clamp));
  const digits = Math.max(String(Math.round(Math.abs(to))).length, String(Math.round(Math.abs(from))).length);
  const lh = size * 1.05;
  const cols: React.ReactNode[] = [];
  for (let k = digits - 1; k >= 0; k--) {
    const p = Math.pow(10, k);
    const base = Math.floor(v / p) % 10;
    const t = k === 0 ? v % 1 : Math.min(1, Math.max(0, (v % p) - (p - 1)));
    const off = base + t;
    cols.push(
      <div key={k} style={{height: lh, overflow: 'hidden', width: size * 0.62, opacity: k === 0 || v >= p - 0.001 ? 1 : 0.12}}>
        <div style={{transform: `translateY(${-off * lh}px)`}}>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((d, i) => <div key={i} style={{height: lh, lineHeight: `${lh}px`, textAlign: 'center'}}>{d}</div>)}
        </div>
      </div>,
    );
    if (commas && k % 3 === 0 && k > 0) cols.push(<div key={`c${k}`} style={{height: lh, lineHeight: `${lh}px`}}>,</div>);
  }
  return (
    <div style={{display: 'flex', fontFamily: SANS, fontWeight: 900, fontSize: size, color, lineHeight: 1, opacity: f < at ? 0 : 1}}>
      {prefix && <div style={{height: lh, lineHeight: `${lh}px`}}>{prefix}</div>}
      {cols}
      {suffix && <div style={{height: lh, lineHeight: `${lh}px`}}>{suffix}</div>}
    </div>
  );
};

/** Line chart that draws on; dots pop at each point; last value labelled. series = arrays of values. */
export const LineChart: React.FC<{series: number[][]; labels?: string[]; w?: number; h?: number; at?: number; dur?: number; colors?: string[]; max?: number; min?: number; fmt?: (v: number) => string; showAll?: boolean}> = ({series, labels = [], w = 900, h = 480, at = 0, dur = 40, colors = ['#E5484D', '#2E86AB'], max, min = 0, fmt = (v) => String(v), showAll}) => {
  const f = useCurrentFrame();
  const t = easeOut(interpolate(f, [at, at + dur], [0, 1], clamp));
  const all = series.flat();
  const hi = max ?? Math.max(...all) * 1.12;
  const n = Math.max(...series.map((s) => s.length));
  const X = (i: number) => (n === 1 ? w / 2 : (i / (n - 1)) * w);
  const Y = (v: number) => h - ((v - min) / (hi - min)) * h;
  return (
    <div style={{position: 'absolute', left: 0, top: 0, width: w, height: h + 60, opacity: f < at ? 0 : 1}}>
      <svg width={w} height={h} style={{overflow: 'visible', position: 'absolute', left: 0, top: 0}}>
        <line x1={0} y1={h} x2={w * Math.min(1, t * 1.5)} y2={h} stroke={INK} strokeWidth={6} strokeLinecap="round" />
        {series.map((s, si) => {
          const pts = s.map((v, i) => [X(i), Y(v)]);
          let len = 0;
          for (let i = 1; i < pts.length; i++) len += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
          return (
            <g key={si}>
              <polyline points={pts.map((p) => p.join(',')).join(' ')} fill="none" stroke={colors[si % colors.length]} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={len} strokeDashoffset={len * (1 - t)} />
              {pts.map((p, i) => {
                const show = t >= (n === 1 ? 0 : i / (n - 1)) - 0.001;
                return show ? <circle key={i} cx={p[0]} cy={p[1]} r={14} fill="#fff" stroke={colors[si % colors.length]} strokeWidth={7} /> : null;
              })}
            </g>
          );
        })}
      </svg>
      {series.map((s, si) =>
        s.map((v, i) => {
          const last = i === s.length - 1;
          if (!(showAll || last) || t < (n === 1 ? 0 : i / (n - 1))) return null;
          return <div key={`${si}-${i}`} style={{position: 'absolute', left: X(i) - 120, top: Y(v) - 86, width: 240, textAlign: 'center', fontFamily: SANS, fontWeight: 900, fontSize: 48, color: colors[si % colors.length], textShadow: '0 3px 0 #fff'}}>{fmt(v)}</div>;
        }),
      )}
      {labels.map((l, i) => <div key={i} style={{position: 'absolute', left: X(i) - 100, top: h + 14, width: 200, textAlign: 'center', fontFamily: SANS, fontWeight: 700, fontSize: 32, color: INK, opacity: t >= (n === 1 ? 0 : i / (n - 1)) ? 1 : 0}}>{l}</div>)}
    </div>
  );
};

export type BarDatum = {label: string; value: number; color?: string; text?: string};
/** Bars grow one after another from a baseline (heights proportional to the real values). */
export const BarChart: React.FC<{data: BarDatum[]; w?: number; h?: number; at?: number; gap?: number; stagger?: number; max?: number; fmt?: (v: number) => string}> = ({data, w = 900, h = 480, at = 0, gap = 50, stagger = 8, max, fmt = (v) => String(v)}) => {
  const f = useCurrentFrame();
  const hi = max ?? Math.max(...data.map((d) => d.value));
  const bw = (w - gap * (data.length - 1)) / data.length;
  return (
    <div style={{position: 'absolute', left: 0, top: 0, width: w, height: h}}>
      <div style={{position: 'absolute', left: -20, right: -20, top: h, height: 6, background: INK, borderRadius: 3}} />
      {data.map((d, i) => <BarOne key={i} d={d} at={at + i * stagger} x={i * (bw + gap)} w={bw} h={(d.value / hi) * (h - 90)} base={h} fmt={fmt} f={f} />)}
    </div>
  );
};
const BarOne: React.FC<{d: BarDatum; at: number; x: number; w: number; h: number; base: number; fmt: (v: number) => string; f: number}> = ({d, at, x, w, h, base, fmt, f}) => {
  const p = usePop(at, 120, 14);
  const e = Math.min(1.04, p);
  if (f < at) return null;
  return (
    <div style={{position: 'absolute', left: x, top: base - h * e, width: w, height: h * e, background: d.color ?? '#FFD23F', border: `7px solid ${INK}`, borderBottom: 'none', borderRadius: '22px 22px 0 0', boxSizing: 'border-box'}}>
      <div style={{position: 'absolute', left: -40, right: -40, top: -78, textAlign: 'center', fontFamily: SANS, fontWeight: 900, fontSize: 58, color: INK}}>{d.text ?? fmt(d.value)}</div>
      <div style={{position: 'absolute', left: -40, right: -40, top: h * e + 14, textAlign: 'center', fontFamily: SANS, fontWeight: 800, fontSize: 36, color: INK}}>{d.label}</div>
    </div>
  );
};
