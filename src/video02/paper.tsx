import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {HAND, PopIn, SANS, usePop} from '../style/style_kit';
import {INK, LeoBadge} from './v2kit';

/**
 * Paper-cutout layer for Video 02 (inspired by explainer reels with diorama-paper scenes).
 * Combines with the Kok Bisa grade: flat shapes, thin soft shadows, chips, rulers, word pops.
 */
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

export const PAPER_SHADOW = '0 3px 0 rgba(60,35,10,0.28), 0 14px 22px rgba(30,15,0,0.22)';

/** Label chip. time = yellow-orange, warn = red, label = cream. */
export const Chip: React.FC<{text: string; kind?: 'time' | 'warn' | 'label'; at?: number; x: number; y: number; size?: number; rot?: number}> = ({text, kind = 'label', at = 0, x, y, size = 40, rot = -2}) => {
  const bg = kind === 'time' ? '#FFC53D' : kind === 'warn' ? '#E5484D' : '#FBF3E4';
  const color = kind === 'warn' ? '#fff' : INK;
  return (
    <PopIn at={at} origin="50% 100%" style={{left: x, top: y}}>
      <div style={{background: bg, color, fontFamily: SANS, fontWeight: 800, fontSize: size, padding: '6px 20px', borderRadius: 8, boxShadow: PAPER_SHADOW, transform: `rotate(${rot}deg)`, whiteSpace: 'nowrap'}}>{text}</div>
    </PopIn>
  );
};

/** Cream paper panel with tilt and soft shadow. */
export const PaperCard: React.FC<{at?: number; x: number; y: number; w: number; h: number; rot?: number; color?: string; children?: React.ReactNode}> = ({at = 0, x, y, w, h, rot = -1.2, color = '#F4EBDA', children}) => (
  <PopIn at={at} origin="50% 50%" style={{left: x, top: y}}>
    <div style={{width: w, height: h, background: color, borderRadius: 14, boxShadow: PAPER_SHADOW, transform: `rotate(${rot}deg)`, position: 'relative', overflow: 'hidden'}}>
      <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.45), rgba(0,0,0,0.05))'}} />
      <div style={{position: 'relative', width: '100%', height: '100%'}}>{children}</div>
    </div>
  </PopIn>
);

/** Kinetic type: words pop one by one as paper chips; last word can be highlighted and enlarged. */
export const WordPop: React.FC<{words: string[]; at: number; gap?: number; x: number; y: number; size?: number; highlight?: number[]; color?: string}> = ({words, at, gap = 6, x, y, size = 96, highlight = [], color = INK}) => (
  <div style={{position: 'absolute', left: x, top: y, display: 'flex', gap: size * 0.22, alignItems: 'center'}}>
    {words.map((w, i) => (
      <WordChip key={i} text={w} at={at + i * gap} size={size} hl={highlight.includes(i)} color={color} rot={(i % 2 ? 1 : -1) * 1.5} />
    ))}
  </div>
);
const WordChip: React.FC<{text: string; at: number; size: number; hl: boolean; color: string; rot: number}> = ({text, at, size, hl, color, rot}) => {
  const p = usePop(at);
  const f = useCurrentFrame();
  return (
    <div style={{opacity: f < at ? 0 : 1, transform: `scale(${0.8 + 0.2 * p}) rotate(${rot * (1 - p * 0.6)}deg)`, background: hl ? '#FFC53D' : '#FBF3E4', color, fontFamily: SANS, fontWeight: 900, fontSize: hl ? size * 1.12 : size, padding: '4px 22px', borderRadius: 8, boxShadow: PAPER_SHADOW, whiteSpace: 'nowrap'}}>{text}</div>
  );
};

export type RulerMark = {x: number; label?: string; at: number; tall?: boolean};
/** Paper ruler timeline: bar draws on, poles pop at each mark, yellow arrow sweeps along. */
export const RulerTimeline: React.FC<{x: number; y: number; w: number; at?: number; marks: RulerMark[]; arrow?: boolean}> = ({x, y, w, at = 0, marks, arrow = true}) => {
  const f = useCurrentFrame();
  const draw = interpolate(f, [at, at + 14], [0, 1], clamp);
  const lastAt = marks.length ? marks[marks.length - 1].at : at;
  const ax = interpolate(f, [at, lastAt + 6], [0, w], clamp);
  return (
    <div style={{position: 'absolute', left: x, top: y, width: w, height: 160}}>
      <div style={{position: 'absolute', left: 0, top: 70, height: 34, width: w * draw, background: '#EBDDB8', borderRadius: 6, boxShadow: PAPER_SHADOW, backgroundImage: 'repeating-linear-gradient(90deg, rgba(60,35,10,0.45) 0 2px, transparent 2px 22px)', backgroundSize: '22px 14px', backgroundRepeat: 'repeat-x', backgroundPosition: 'left bottom'}} />
      {marks.map((m, i) => (
        <PopIn key={i} at={m.at} origin="50% 100%" style={{left: m.x - 14, top: m.tall ? -10 : 10}}>
          <div style={{width: 28, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            {m.label ? <div style={{background: '#FFC53D', color: INK, fontFamily: SANS, fontWeight: 800, fontSize: 30, padding: '2px 14px', borderRadius: 6, boxShadow: PAPER_SHADOW, whiteSpace: 'nowrap', marginBottom: 6}}>{m.label}</div> : null}
            <div style={{width: 6, height: m.tall ? 90 : 60, background: INK, borderRadius: 3}} />
            <div style={{width: 20, height: 20, borderRadius: '50%', background: '#E5484D', border: `4px solid ${INK}`, marginTop: -4}} />
          </div>
        </PopIn>
      ))}
      {arrow ? (
        <div style={{position: 'absolute', left: ax - 16, top: 112, opacity: f < at ? 0 : 1, fontFamily: HAND, fontSize: 64, color: '#FFC53D', textShadow: '0 3px 0 rgba(0,0,0,0.35)', transform: 'translateY(' + Math.sin(f * 0.3) * 4 + 'px)'}}>➤</div>
      ) : null}
    </div>
  );
};

/** Circular lens that opens from a point and reveals its children (zoom into a detail). */
export const LensZoom: React.FC<{cx: number; cy: number; at: number; r?: number; ring?: string; children: React.ReactNode}> = ({cx, cy, at, r = 420, ring = '#FBF3E4', children}) => {
  const p = usePop(at, 110, 14);
  const f = useCurrentFrame();
  if (f < at) return null;
  const rr = r * Math.min(p, 1.04);
  return (
    <div style={{position: 'absolute', left: cx - rr, top: cy - rr, width: rr * 2, height: rr * 2, borderRadius: '50%', overflow: 'hidden', border: `10px solid ${ring}`, boxShadow: PAPER_SHADOW}}>
      <div style={{position: 'absolute', left: -(cx - rr), top: -(cy - rr), width: 1920, height: 1080}}>{children}</div>
    </div>
  );
};

/** Money wipe transition: a sweep of coins crosses the screen (replaces the smoke wipe). */
export const CoinWipe: React.FC<{at?: number; dur?: number; rows?: number}> = ({at = 0, dur = 16, rows = 6}) => {
  const f = useCurrentFrame();
  if (f < at || f > at + dur + 8) return null;
  const t = interpolate(f, [at, at + dur], [0, 1], clamp);
  return (
    <div style={{position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none'}}>
      {Array.from({length: rows * 9}).map((_, i) => {
        const row = i % rows;
        const col = Math.floor(i / rows);
        const delay = col * 0.05 + (row % 2) * 0.03;
        const px = interpolate(t, [delay, delay + 0.5], [-200, 2100], clamp);
        const s = 160 + ((i * 37) % 60);
        return (
          <div key={i} style={{position: 'absolute', left: px - col * 260 + 900 - 900, top: (row / rows) * 1080 + 10 - (i % 3) * 8, width: s, height: s, borderRadius: '50%', background: 'radial-gradient(circle at 35% 30%, #FFE27A, #E8A520 70%)', border: '6px solid #B77A0B', boxShadow: PAPER_SHADOW, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: SANS, fontWeight: 900, fontSize: s * 0.5, color: '#B77A0B', transform: `rotate(${t * 360 * (row % 2 ? 1 : -1)}deg)`}}>$</div>
        );
      })}
    </div>
  );
};

/** Small Leo "asker" in the corner (the reel's question-mark mascot role): bobs and swaps expression per beat. */
export const MascotCorner: React.FC<{head: string; at?: number; x?: number; y?: number; size?: number}> = ({head, at = 0, x = 1640, y = 790, size = 210}) => {
  const f = useCurrentFrame();
  return (
    <div style={{position: 'absolute', left: 0, top: 0, transform: `translateY(${Math.sin(f * 0.09) * 6}px) rotate(${Math.sin(f * 0.06) * 2}deg)`}}>
      <LeoBadge head={head} at={at} x={x} y={y} size={size} />
    </div>
  );
};

/** Floating embers / confetti particles that rise and flicker (ambient life). */
export const Embers: React.FC<{n?: number; color?: string; seed?: number; rise?: boolean}> = ({n = 28, color = '#FF7A3D', seed = 1, rise = true}) => {
  const f = useCurrentFrame();
  return (
    <div style={{position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none'}}>
      {Array.from({length: n}).map((_, i) => {
        const a = ((i * 9301 + seed * 49297) % 233280) / 233280;
        const b = ((i * 4973 + seed * 1237) % 233280) / 233280;
        const speed = 0.6 + a * 1.6;
        const y = rise ? 1080 - ((f * speed * 2 + b * 1400) % 1180) : (f * speed * 2 + b * 1400) % 1180 - 100;
        const x = a * 1920 + Math.sin(f * 0.05 + i) * 24;
        const o = 0.35 + 0.65 * Math.abs(Math.sin(f * 0.12 + i * 1.7));
        const sz = 5 + b * 10;
        return <div key={i} style={{position: 'absolute', left: x, top: y, width: sz, height: sz, borderRadius: '50%', background: color, opacity: o, boxShadow: `0 0 ${sz * 2}px ${color}`}} />;
      })}
    </div>
  );
};

/** Marker-style highlight that sweeps across a phrase. */
export const HighlightSwipe: React.FC<{at: number; x: number; y: number; w: number; h?: number; color?: string}> = ({at, x, y, w, h = 70, color = '#FFC53D'}) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [at, at + 10], [0, 1], clamp);
  return <div style={{position: 'absolute', left: x, top: y, width: w * p, height: h, background: color, opacity: 0.75, borderRadius: 6, transform: 'rotate(-1deg)', mixBlendMode: 'multiply'}} />;
};

/** Camera that glides vertically through a tall scene (the soil cutaway move). dy>0 moves content down (camera rises). */
export const CutawayPan: React.FC<{at?: number; dur: number; dy: number; children: React.ReactNode}> = ({at = 0, dur, dy, children}) => {
  const f = useCurrentFrame();
  const t = interpolate(f, [at, at + dur], [0, 1], clamp);
  const e = t * t * (3 - 2 * t);
  return <div style={{position: 'absolute', inset: 0, transform: `translateY(${dy * e}px)`}}>{children}</div>;
};

/** Branching lines from a top node to two outcomes (scenario fork). */
export const BranchFork: React.FC<{at: number; x0: number; y0: number; x1: number; x2: number; y1: number; color?: string}> = ({at, x0, y0, x1, x2, y1, color = INK}) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [at, at + 14], [0, 1], clamp);
  const d = (xe: number) => `M ${x0} ${y0} C ${x0} ${(y0 + y1) / 2}, ${xe} ${(y0 + y1) / 2}, ${xe} ${y1}`;
  return (
    <svg width={1920} height={1080} style={{position: 'absolute', left: 0, top: 0, pointerEvents: 'none'}}>
      {[x1, x2].map((xe, i) => <path key={i} d={d(xe)} fill="none" stroke={color} strokeWidth={8} strokeLinecap="round" strokeDasharray={1200} strokeDashoffset={1200 * (1 - p)} />)}
    </svg>
  );
};

export {BeforeAfter, ExitOut, PaperTexture, ParallaxLayer} from './fx';
