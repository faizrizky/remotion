// Shared pieces for the Video 04 chapters (Style 2). Timings are written in seconds of the
// chapter's voice file; each scene gets s0 (its first frame inside the chapter) and converts.
import React from 'react';
import {AbsoluteFill, Html5Audio, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {SANS} from '../style/style_kit';
import {ease, H, INK, Join, LayoutProbe, LetterBounce, SceneDef, Timeline, W} from './s2kit';

export const C = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
export const FPS = 24;
export const fr = (s: number) => Math.round(s * FPS);
export type SceneFn = React.FC<{s0: number}>;
/** local frame of audio second s inside a scene that starts at frame s0 */
export const lt = (s0: number) => (s: number) => fr(s) - s0;

/**
 * Builds Timeline scenes so that the middle of each join lands on its cue (seconds).
 * cues[0] must be 0. `end` = chapter length in seconds. Join durations must be even.
 */
export const buildChapter = (cues: number[], end: number, scenes: SceneFn[], joins: Join[]): {scenes: SceneDef[]; joins: Join[]; len: number} => {
  const d = (i: number) => (i >= 0 && i < joins.length && joins[i].kind !== 'cut' ? joins[i].dur : 0);
  const out: SceneDef[] = scenes.map((S, i) => {
    const start = fr(cues[i]) - d(i - 1) / 2;
    const stop = i < scenes.length - 1 ? fr(cues[i + 1]) + d(i) / 2 : fr(end);
    return {len: stop - start, node: <S s0={start} />};
  });
  return {scenes: out, joins, len: fr(end)};
};

/** Gemini background image placed in world space (covers the frame for zooms down to ~0.85). */
export const Bg: React.FC<{src: string; blur?: number; dim?: number; x?: number; y?: number; w?: number}> = ({src, blur = 0, dim = 0, x = -240, y = -135, w = 2400}) => (
  <>
    <Img src={staticFile(`v4/bg/${src}`)} style={{position: 'absolute', left: x, top: y, width: w, height: w * 9 / 16, objectFit: 'cover', filter: blur ? `blur(${blur}px)` : undefined}} />
    {dim > 0 && <div style={{position: 'absolute', left: x, top: y, width: w, height: w * 9 / 16, background: `rgba(10,14,24,${dim})`}} />}
  </>
);
/** Prop image from public/v4 */
export const Prop: React.FC<{name: string; w: number; flip?: boolean; style?: React.CSSProperties}> = ({name, w, flip, style}) => (
  <Img src={staticFile(`v4/${name}.png`)} style={{width: w, display: 'block', transform: flip ? 'scaleX(-1)' : undefined, ...style}} />
);

const springIn = (f: number, at: number, fps: number, stiff = 140) => spring({frame: f - at, fps, config: {damping: 12, stiffness: stiff, mass: 0.8}});

/** Whiteboard on legs. Children use board-local coordinates (inside the white area). */
export const Board: React.FC<{x: number; y: number; w: number; h: number; at?: number; legs?: boolean; children?: React.ReactNode; id?: string}> = ({x, y, w, h, at = 0, legs = true, children, id = 'board'}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  if (f < at) return null;
  const s = at > 0 ? springIn(f, at, fps) : 1;
  return (
    <div style={{position: 'absolute', left: x, top: y, width: w, height: h, transform: `translateY(${(1 - s) * 900}px)`}}>
      {legs && <><div style={{position: 'absolute', left: w * 0.12, top: h - 10, width: 18, height: 320, background: '#7A5A3C'}} /><div style={{position: 'absolute', left: w * 0.88 - 18, top: h - 10, width: 18, height: 320, background: '#7A5A3C'}} /></>}
      <div data-fg={id} style={{position: 'absolute', inset: 0, background: '#FFFFFF', border: '16px solid #8C6B4A', borderRadius: 12, boxShadow: '0 18px 40px rgba(0,0,0,0.25)', overflow: 'hidden'}}>
        {children}
      </div>
    </div>
  );
};

/** Card background (code-made pattern cards from public/v4/bg). */
export const CardBg: React.FC<{color: 'navy' | 'maroon' | 'green' | 'purple'}> = ({color}) => (
  <Img src={staticFile(`v4/bg/card_${color}.jpg`)} style={{position: 'absolute', left: -W * 0.15, top: -H * 0.15, width: W * 1.3, height: H * 1.3}} />
);

/** Two lines on a chart: car value (blue, fast drop) and loan balance (red, slow drop). */
export const GapChart: React.FC<{w: number; h: number; atAxes: number; atCar: number; atLoan: number; atArea: number; loanFlat?: number; dur?: number}> = ({w, h, atAxes, atCar, atLoan, atArea, loanFlat = 0, dur = 30}) => {
  const f = useCurrentFrame();
  const pad = 70, x0 = pad + 20, y0 = h - pad, x1 = w - pad, y1 = pad;
  const N = 40;
  const car = (t: number) => 1 - 0.62 * (1 - Math.exp(-t * 2.6)) - 0.18 * t; // fast early drop
  const loan = (t: number) => 1.04 - (0.98 - loanFlat) * Math.pow(t, 1.55); // slow early drop
  const pt = (t: number, v: number) => [x0 + (x1 - x0) * t, y0 - (y0 - y1) * v * 0.9] as const;
  const path = (fn: (t: number) => number, p: number) => Array.from({length: Math.max(2, Math.round(N * p))}, (_, i) => {
    const t = (i / (N - 1));
    const [x, y] = pt(t, fn(t));
    return `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(' ');
  const pc = ease(interpolate(f, [atCar, atCar + dur], [0, 1], C));
  const pl = ease(interpolate(f, [atLoan, atLoan + dur], [0, 1], C));
  const pa = interpolate(f, [atArea, atArea + 12], [0, 1], C);
  const ax = interpolate(f, [atAxes, atAxes + 10], [0, 1], C);
  // shaded area where loan > car
  const ts = Array.from({length: N}, (_, i) => i / (N - 1)).filter((t) => loan(t) > car(t));
  const area = ts.length > 1 ? [...ts.map((t, i) => `${i ? 'L' : 'M'}${pt(t, loan(t)).join(' ')}`), ...ts.slice().reverse().map((t) => `L${pt(t, car(t)).join(' ')}`), 'Z'].join(' ') : '';
  return (
    <svg width={w} height={h} style={{position: 'absolute', left: 0, top: 0}}>
      <g opacity={ax}>
        <line x1={x0} y1={y0} x2={x1} y2={y0} stroke={INK} strokeWidth={6} strokeLinecap="round" />
        <line x1={x0} y1={y0} x2={x0} y2={y1 - 10} stroke={INK} strokeWidth={6} strokeLinecap="round" />
        <text x={(x0 + x1) / 2} y={y0 + 50} textAnchor="middle" fontFamily={SANS} fontWeight={700} fontSize={30} fill="#555">years</text>
        <text x={x0 - 30} y={y1 - 20} fontFamily={SANS} fontWeight={700} fontSize={30} fill="#555">$</text>
      </g>
      {area && <path d={area} fill="#E5484D" opacity={0.28 * pa} />}
      {pc > 0 && <path d={path(car, pc)} stroke="#2F80ED" strokeWidth={12} fill="none" strokeLinecap="round" strokeLinejoin="round" />}
      {pl > 0 && <path d={path(loan, pl)} stroke="#E5484D" strokeWidth={12} fill="none" strokeLinecap="round" strokeLinejoin="round" />}
      {pc > 0.9 && <text x={pt(0.5, car(0.5))[0]} y={pt(0.5, car(0.5))[1] + 62} textAnchor="start" fontFamily={SANS} fontWeight={800} fontSize={34} fill="#2F80ED">CAR VALUE</text>}
      {pl > 0.9 && <text x={pt(0.1, loan(0.1))[0] + 10} y={pt(0.1, loan(0.1))[1] - 24} fontFamily={SANS} fontWeight={800} fontSize={34} fill="#E5484D">LOAN BALANCE</text>}
    </svg>
  );
};

/** Pie that sweeps open. part = 0..1 (red slice by default). */
export const Pie: React.FC<{r: number; part: number; at: number; dur?: number; color?: string; rest?: string}> = ({r, part, at, dur = 26, color = '#E5484D', rest = '#2F80ED'}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  if (f < at) return null;
  const s = spring({frame: f - at, fps, config: {damping: 12, stiffness: 150, mass: 0.7}});
  const p = ease(interpolate(f, [at + 6, at + 6 + dur], [0, 1], C)) * part;
  const a = p * Math.PI * 2;
  const x = r + r * Math.sin(a), y = r - r * Math.cos(a);
  return (
    <svg width={r * 2} height={r * 2} style={{transform: `scale(${s})`, overflow: 'visible'}}>
      <circle cx={r} cy={r} r={r} fill={rest} stroke={INK} strokeWidth={8} />
      {p > 0.001 && (p >= 0.999 ? <circle cx={r} cy={r} r={r} fill={color} /> : <path d={`M${r} ${r} L${r} 0 A${r} ${r} 0 ${a > Math.PI ? 1 : 0} 1 ${x} ${y} Z`} fill={color} stroke={INK} strokeWidth={6} strokeLinejoin="round" />)}
      <circle cx={r} cy={r} r={r} fill="none" stroke={INK} strokeWidth={8} />
    </svg>
  );
};

/** Question card scene body: letters bounce in on a pattern card. */
export const QLines: React.FC<{lines: string[]; at: number; size?: number; gapY?: number; y?: number}> = ({lines, at, size = 124, gapY = 250, y = 540}) => (
  <>
    {lines.map((l, i) => <LetterBounce key={i} text={l} at={at + i * 14} x={W / 2} y={y - ((lines.length - 1) * gapY) / 2 + i * gapY} size={size} />)}
  </>
);

/** Text that gets struck through and replaced. */
export const StrikeSwap: React.FC<{from: string; to: string; at: number; toColor?: string}> = ({from, to, at, toColor = '#2E9E5B'}) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [at, at + 6], [0, 1], C);
  if (f >= at + 8) return <span style={{color: toColor}}>{to}</span>;
  return <span style={{position: 'relative'}}>{from}{p > 0 && <span style={{position: 'absolute', left: -6, top: '50%', height: 8, width: `calc(${p * 100}% + 12px)`, background: '#E5484D', borderRadius: 4}} />}</span>;
};

/** White rounded panel with rows that slide in (reference: numbers riding next to the subject). */
export const RowPanel: React.FC<{x: number; y: number; w: number; at: number; rows: {at: number; node: React.ReactNode}[]; size?: number; id?: string}> = ({x, y, w, at, rows, size = 54, id = 'panel'}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  if (f < at) return null;
  const s = springIn(f, at, fps, 170);
  return (
    <div data-fg={id} style={{position: 'absolute', left: x, top: y, width: w, boxSizing: 'border-box', fontFamily: SANS, color: INK, background: '#FFFFFFF0', padding: '18px 34px', borderRadius: 20, boxShadow: '0 10px 24px rgba(0,0,0,0.22)', transform: `scale(${s})`, transformOrigin: '50% 0%'}}>
      {rows.map((r, i) => f >= r.at && <div key={i} style={{fontSize: size, fontWeight: 800, lineHeight: 1.25, whiteSpace: 'nowrap', transform: `translateX(${(1 - Math.min(1, (f - r.at) / 8)) * 40}px)`, opacity: Math.min(1, (f - r.at) / 4)}}>{r.node}</div>)}
    </div>
  );
};

/** Bar that grows up from a baseline. */
export const GrowBar: React.FC<{x: number; base: number; w: number; h: number; at: number; color: string; label?: string; top?: string; id?: string}> = ({x, base, w, h, at, color, label, top, id}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  if (f < at) return null;
  const s = spring({frame: f - at, fps, config: {damping: 13, stiffness: 120, mass: 0.8}});
  const hh = h * s;
  return (
    <div data-fg={id} style={{position: 'absolute', left: x, top: base - hh - (top ? 70 : 0), width: w, height: hh + (top ? 70 : 0)}}>
      {top && <div style={{position: 'absolute', left: '50%', top: 0, transform: 'translateX(-50%)', fontFamily: SANS, fontWeight: 900, fontSize: 44, color: '#FFFFFF', whiteSpace: 'nowrap'}}>{top}</div>}
      <div style={{position: 'absolute', left: 0, bottom: 0, width: w, height: hh, background: color, borderRadius: '14px 14px 0 0', border: `5px solid ${INK}`, borderBottom: 'none', boxSizing: 'border-box'}} />
      {label && <div style={{position: 'absolute', left: '50%', top: hh + (top ? 70 : 0) + 14, transform: 'translateX(-50%)', fontFamily: SANS, fontWeight: 800, fontSize: 32, color: '#FFFFFF', whiteSpace: 'nowrap'}}>{label}</div>}
    </div>
  );
};

/** Pop-in wrapper with spring scale (keeps data-fg on the outer box). */
export const PopIn: React.FC<{at: number; x: number; y: number; id?: string; origin?: string; children: React.ReactNode; rot?: number}> = ({at, x, y, id, origin = '50% 50%', children, rot = 0}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  if (f < at) return null;
  const s = spring({frame: f - at, fps, config: {damping: 11, stiffness: 170, mass: 0.7}});
  return <div data-fg={id} style={{position: 'absolute', left: x, top: y, transform: `scale(${s}) rotate(${rot}deg)`, transformOrigin: origin}}>{children}</div>;
};

/** Big label used in boards and cards. */
export const Label: React.FC<{children: React.ReactNode; size?: number; color?: string; weight?: number; style?: React.CSSProperties}> = ({children, size = 44, color = INK, weight = 800, style}) => (
  <div style={{fontFamily: SANS, fontWeight: weight, fontSize: size, color, whiteSpace: 'nowrap', ...style}}>{children}</div>
);

/** Rubber stamp that slams in. */
export const Stamp: React.FC<{text: string; at: number; x: number; y: number; color?: string; size?: number; rot?: number; id?: string}> = ({text, at, x, y, color = '#E5484D', size = 80, rot = -8, id = 'stamp'}) => {
  const f = useCurrentFrame();
  if (f < at) return null;
  const t = interpolate(f, [at, at + 6], [0, 1], C);
  const s = 2.2 - 1.2 * ease(t);
  return (
    <div data-fg={id} style={{position: 'absolute', left: x, top: y, transform: `translate(-50%, -50%) rotate(${rot}deg) scale(${s})`, opacity: Math.min(1, t * 2), border: `10px solid ${color}`, color, fontFamily: SANS, fontWeight: 900, fontSize: size, padding: '6px 30px', borderRadius: 16, whiteSpace: 'nowrap', background: 'rgba(255,255,255,0.85)', letterSpacing: 2}}>{text}</div>
  );
};

/** Watermark (profile picture, bottom-left) used on every V4 section. */
export const Watermark: React.FC = () => (
  <Img src={staticFile('profile_pic.png')} style={{position: 'absolute', left: 28, bottom: 28, width: 72, height: 72, borderRadius: 36, boxShadow: '0 2px 8px rgba(0,0,0,0.3)'}} />
);

/** Road with parallax bands cut from road_full.jpg (sky / fields / road), tiled with mirrored copies. */
export const RoadBands: React.FC<{camX: number; z?: number}> = ({camX}) => {
  const IW = 2400, IH = 1350; // image drawn at this size, top at -135
  const band = (k: number, top: number, bottom: number) => {
    const off = -((camX * k) % (IW * 2));
    return (
      <div style={{position: 'absolute', left: 0, top: 0, width: W, height: H, clipPath: `inset(${top}px 0 ${H - bottom}px 0)`}}>
        {[-1, 0, 1, 2].map((i) => (
          <Img key={i} src={staticFile('v4/bg/road_full.jpg')} style={{position: 'absolute', left: off + i * IW - 240, top: -135, width: IW, height: IH, transform: i % 2 ? 'scaleX(-1)' : undefined}} />
        ))}
      </div>
    );
  };
  return (
    <AbsoluteFill style={{background: '#BFE0F2'}}>
      {band(0.08, 0, 440)}
      {band(0.35, 440, 760)}
      {band(1, 760, H)}
    </AbsoluteFill>
  );
};

/** A chapter: scenes on a Timeline + its voice file + quiet music bed. */
export const ChapterShell: React.FC<{built: {scenes: SceneDef[]; joins: Join[]}; voice: string; check?: boolean; music?: boolean; bare?: boolean}> = ({built, voice, check = false, music = true, bare = false}) => (
  <AbsoluteFill style={{background: '#000'}}>
    <Timeline scenes={built.scenes} joins={built.joins} />
    {!bare && <Watermark />}
    {!bare && <LayoutProbe check={check} />}
    <Html5Audio src={staticFile(`v4/voice/${voice}`)} />
    {music && !bare && <Html5Audio src={staticFile('music/monday_routine.mp3')} loop volume={0.06} />}
  </AbsoluteFill>
);
