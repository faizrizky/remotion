import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';

/** Reusable motion/texture effects for Video 02. No imports from v2kit (avoids a cycle). */
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

/** Paper fibre texture + soft edge shade over a whole scene (multiply). Added to every Shot automatically. */
export const PaperTexture: React.FC<{opacity?: number}> = ({opacity = 0.2}) => (
  <AbsoluteFill style={{pointerEvents: 'none', mixBlendMode: 'multiply', opacity}}>
    <svg width="100%" height="100%" preserveAspectRatio="none">
      <filter id="paperfiber" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.9 0.035" numOctaves="3" seed="7" />
        <feColorMatrix type="matrix" values="0 0 0 0 0.45  0 0 0 0 0.36  0 0 0 0 0.25  0 0 0 0.9 -0.18" />
      </filter>
      <rect width="100%" height="100%" filter="url(#paperfiber)" />
    </svg>
    <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0) 62%, rgba(60,35,10,0.35) 100%)'}} />
  </AbsoluteFill>
);

/** Content leaves before the next scene arrives: shrinks, drops a little and fades. */
export const ExitOut: React.FC<{start: number; dur?: number; children: React.ReactNode}> = ({start, dur = 16, children}) => {
  const f = useCurrentFrame();
  const t = interpolate(f, [start, start + dur], [0, 1], clamp);
  const e = t * t;
  return (
    <AbsoluteFill style={{transform: `translateY(${e * 36}px) scale(${1 - e * 0.05})`, opacity: 1 - e * 0.75, transformOrigin: '50% 60%'}}>
      {children}
    </AbsoluteFill>
  );
};

/** Layer that drifts sideways by `depth` (0 = fixed, 1 = full drift) so stacked layers separate (parallax). */
export const ParallaxLayer: React.FC<{depth: number; px?: number; dur?: number; dir?: 1 | -1; children: React.ReactNode}> = ({depth, px = 90, dur = 240, dir = 1, children}) => {
  const f = useCurrentFrame();
  const t = Math.min(1, f / dur);
  return <AbsoluteFill style={{transform: `translateX(${dir * depth * px * t}px)`}}>{children}</AbsoluteFill>;
};

/** Before/after swap: crossfade with a short shake burst at `swapAt`. */
export const BeforeAfter: React.FC<{swapAt: number; dur?: number; shake?: number; before: React.ReactNode; after: React.ReactNode}> = ({swapAt, dur = 14, shake = 10, before, after}) => {
  const f = useCurrentFrame();
  const t = interpolate(f, [swapAt, swapAt + dur], [0, 1], clamp);
  const burst = f >= swapAt && f <= swapAt + dur + 8 ? 1 - (f - swapAt) / (dur + 8) : 0;
  const sx = Math.sin(f * 2.3) * shake * burst;
  const sy = Math.cos(f * 3.1) * shake * 0.6 * burst;
  const rot = Math.sin(f * 1.7) * 1.2 * burst;
  return (
    <AbsoluteFill style={{transform: `translate(${sx}px, ${sy}px) rotate(${rot}deg)`}}>
      <AbsoluteFill style={{opacity: 1 - t}}>{before}</AbsoluteFill>
      <AbsoluteFill style={{opacity: t}}>{after}</AbsoluteFill>
    </AbsoluteFill>
  );
};
