// Scene/chapter entrances that keep the flow going (no hard cuts): torn paper, iris, slide-over, whip.
import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {HAND, SANS} from '../style/style_kit';
import {clamp, easeInOut, ENTER_LEN, H, INK, rand, W} from './core';

export type EnterKind = 'rip' | 'iris' | 'slide' | 'whip' | 'none';
export const ENTER_FRAMES = ENTER_LEN as Record<EnterKind, number>;

const jag = (seed: string, n = 28) => Array.from({length: n + 1}).map((_, i) => (rand(`${seed}${i}`) - 0.5) * 46 + Math.sin(i * 1.7) * 10);

/** Torn paper: the new scene is revealed behind a fibrous tear that runs right -> left. */
export const RipReveal: React.FC<{dur?: number; seed?: string; children: React.ReactNode}> = ({dur = 18, seed = 'rip', children}) => {
  const f = useCurrentFrame();
  const t = easeInOut(interpolate(f, [0, dur], [0, 1], clamp));
  if (t >= 1) return <AbsoluteFill>{children}</AbsoluteFill>;
  const edge = W + 120 - t * (W + 300);
  const J = jag(seed);
  const n = J.length - 1;
  const poly = (off: number) => [`${W + 400}px 0px`, ...J.map((j, i) => `${edge + j + off}px ${(i / n) * H}px`), `${W + 400}px ${H}px`].join(', ');
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{clipPath: `polygon(${poly(-16)})`, background: '#FBF6EC', filter: 'drop-shadow(-6px 0 8px rgba(40,25,10,0.35))'}} />
      <AbsoluteFill style={{clipPath: `polygon(${poly(0)})`}}>{children}</AbsoluteFill>
    </AbsoluteFill>
  );
};

/** Circle grows from a point (use the point where the carried object sits). */
export const IrisReveal: React.FC<{dur?: number; cx?: number; cy?: number; children: React.ReactNode}> = ({dur = 16, cx = W / 2, cy = H / 2, children}) => {
  const f = useCurrentFrame();
  const t = easeInOut(interpolate(f, [0, dur], [0, 1], clamp));
  const r = t * Math.hypot(Math.max(cx, W - cx), Math.max(cy, H - cy)) * 1.05;
  return (
    <AbsoluteFill>
      {t < 1 && <div style={{position: 'absolute', left: cx - r - 10, top: cy - r - 10, width: 2 * r + 20, height: 2 * r + 20, borderRadius: '50%', border: `10px solid ${INK}`}} />}
      <AbsoluteFill style={{clipPath: t >= 1 ? undefined : `circle(${r}px at ${cx}px ${cy}px)`}}>{children}</AbsoluteFill>
    </AbsoluteFill>
  );
};

/** New paper sheet slides over the old one from the right with a soft shadow. */
export const SlideOver: React.FC<{dur?: number; children: React.ReactNode}> = ({dur = 14, children}) => {
  const f = useCurrentFrame();
  const t = easeInOut(interpolate(f, [0, dur], [0, 1], clamp));
  return <AbsoluteFill style={{transform: `translateX(${(1 - t) * W}px)`, boxShadow: t < 1 ? '-24px 0 40px rgba(40,25,10,0.3)' : undefined}}>{children}</AbsoluteFill>;
};

export const WhipEnter: React.FC<{dur?: number; children: React.ReactNode}> = ({dur = 9, children}) => {
  const f = useCurrentFrame();
  const t = 1 - Math.min(1, f / dur);
  return <AbsoluteFill style={{transform: `translateX(${t * 300}px) scaleX(${1 + t * 1.4})`, filter: t > 0 ? `blur(${t * 24}px)` : undefined}}>{children}</AbsoluteFill>;
};

export const Enter: React.FC<{kind: EnterKind; cx?: number; cy?: number; seed?: string; children: React.ReactNode}> = ({kind, cx, cy, seed, children}) =>
  kind === 'rip' ? <RipReveal seed={seed}>{children}</RipReveal>
  : kind === 'iris' ? <IrisReveal cx={cx} cy={cy}>{children}</IrisReveal>
  : kind === 'slide' ? <SlideOver>{children}</SlideOver>
  : kind === 'whip' ? <WhipEnter>{children}</WhipEnter>
  : <AbsoluteFill>{children}</AbsoluteFill>;

/** Text A becomes text B mid-move (blur + scale cross), e.g. "$5" -> "$4.85". */
export const TextMatchCut: React.FC<{a: string; b: string; at: number; dur?: number; size?: number; color?: string; hand?: boolean}> = ({a, b, at, dur = 10, size = 120, color = INK, hand}) => {
  const f = useCurrentFrame();
  const t = easeInOut(interpolate(f, [at, at + dur], [0, 1], clamp));
  const st: React.CSSProperties = {position: 'absolute', left: 0, top: 0, fontFamily: hand ? HAND : SANS, fontWeight: 900, fontSize: size, color, whiteSpace: 'nowrap', lineHeight: 1};
  return (
    <div style={{position: 'relative'}}>
      <div style={{...st, position: 'relative', opacity: 1 - t, filter: `blur(${t * 10}px)`, transform: `scale(${1 + t * 0.2})`}}>{a}</div>
      <div style={{...st, opacity: t, filter: `blur(${(1 - t) * 10}px)`, transform: `scale(${1.2 - t * 0.2})`}}>{b}</div>
    </div>
  );
};
