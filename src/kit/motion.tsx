// Motion helpers: stop-motion cadence, hand-drawn boil, hanging sign, path travel, echo trail.
import React from 'react';
import {Freeze, interpolate, useCurrentFrame} from 'remotion';
import {clamp, easeInOut, lerp} from './core';

/** Steps time for its children (2 = animate on twos), the cut-paper "stop-motion" feel. */
export const StopMotion: React.FC<{step?: number; children: React.ReactNode}> = ({step = 2, children}) => {
  const f = useCurrentFrame();
  return <Freeze frame={Math.floor(f / step) * step}>{children}</Freeze>;
};

/** Hand-drawn "boil": outlines wobble slightly, re-posing every `every` frames. */
export const Boil: React.FC<{amount?: number; every?: number; id?: string; children: React.ReactNode}> = ({amount = 2.2, every = 4, id = 'b', children}) => {
  const f = useCurrentFrame();
  const seed = Math.floor(f / every) % 4;
  const fid = `boil-${id}-${seed}`;
  return (
    <div style={{filter: `url(#${fid})`}}>
      <svg width={0} height={0} style={{position: 'absolute'}}>
        <filter id={fid}>
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves={2} seed={seed + 1} />
          <feDisplacementMap in="SourceGraphic" scale={amount * 2} />
        </filter>
      </svg>
      {children}
    </div>
  );
};

/** Hangs from a pin at its top centre and swings to rest (damped pendulum), with a tiny idle sway. */
export const Hang: React.FC<{at?: number; amp?: number; string?: number; children: React.ReactNode}> = ({at = 0, amp = 16, string = 70, children}) => {
  const f = useCurrentFrame();
  const t = Math.max(0, f - at);
  const a = amp * Math.exp(-t / 26) * Math.cos(t / 4.2) + Math.sin(f / 30) * 1.2;
  return (
    <div style={{transformOrigin: '50% 0', transform: `rotate(${a}deg)`, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <div style={{width: 14, height: 14, borderRadius: '50%', background: '#191411'}} />
      <div style={{width: 4, height: string, background: '#191411'}} />
      <div style={{position: 'relative', alignSelf: 'stretch'}}>{children}</div>
    </div>
  );
};

/** Point on a smooth curve through `pts` (Catmull-Rom), t in 0..1 by arc length. Returns x, y, angle (deg). */
export const pathAt = (pts: [number, number][], t: number) => {
  const seg = (p0: number[], p1: number[], p2: number[], p3: number[], u: number) =>
    [0, 1].map((k) => 0.5 * (2 * p1[k] + (-p0[k] + p2[k]) * u + (2 * p0[k] - 5 * p1[k] + 4 * p2[k] - p3[k]) * u * u + (-p0[k] + 3 * p1[k] - 3 * p2[k] + p3[k]) * u * u * u));
  const P = [pts[0], ...pts, pts[pts.length - 1]];
  const samples: number[][] = [];
  for (let i = 0; i < pts.length - 1; i++) for (let j = 0; j < 16; j++) samples.push(seg(P[i], P[i + 1], P[i + 2], P[i + 3], j / 16));
  samples.push(pts[pts.length - 1]);
  const len = [0];
  for (let i = 1; i < samples.length; i++) len.push(len[i - 1] + Math.hypot(samples[i][0] - samples[i - 1][0], samples[i][1] - samples[i - 1][1]));
  const target = Math.min(1, Math.max(0, t)) * len[len.length - 1];
  let i = 1;
  while (i < len.length - 1 && len[i] < target) i++;
  const u = (target - len[i - 1]) / Math.max(1e-6, len[i] - len[i - 1]);
  const x = lerp(samples[i - 1][0], samples[i][0], u);
  const y = lerp(samples[i - 1][1], samples[i][1], u);
  const ang = (Math.atan2(samples[i][1] - samples[i - 1][1], samples[i][0] - samples[i - 1][0]) * 180) / Math.PI;
  return {x, y, ang};
};

/** Moves its children along a curve (centre-anchored). `rotate` turns it along the path. `trail` adds ghost copies. */
export const PathTraveler: React.FC<{pts: [number, number][]; at: number; dur: number; rotate?: boolean; trail?: number; hold?: boolean; children: React.ReactNode}> = ({pts, at, dur, rotate, trail = 0, hold = true, children}) => {
  const f = useCurrentFrame();
  if (f < at || (!hold && f > at + dur)) return null;
  const pose = (fr: number) => pathAt(pts, easeInOut(interpolate(fr, [at, at + dur], [0, 1], clamp)));
  return (
    <>
      {Array.from({length: trail}).map((_, k) => {
        const p = pose(f - (k + 1) * 2);
        return <div key={k} style={{position: 'absolute', left: p.x, top: p.y, transform: `translate(-50%,-50%) rotate(${rotate ? p.ang : 0}deg)`, opacity: 0.28 / (k + 1)}}>{children}</div>;
      })}
      {(() => {
        const p = pose(f);
        return <div style={{position: 'absolute', left: p.x, top: p.y, transform: `translate(-50%,-50%) rotate(${rotate ? p.ang : 0}deg)`}}>{children}</div>;
      })()}
    </>
  );
};
