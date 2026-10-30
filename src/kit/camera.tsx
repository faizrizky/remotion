// One continuous camera over a big "world" canvas (no cuts). Scenes are stations at world coordinates;
// the camera glides between them on beats. Idea from onetake (re-implemented here, no code taken).
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {easeInOut, extendedEase, H, lerp, W} from './core';

import type {CamKey} from './core';
export type {CamKey};
export type Shake = {at: number; amp?: number; dur?: number};
export type CamState = {x: number; y: number; z: number; rot: number};

/** Camera state at frame f. Each key is an arrival: the move starts ~35% of its duration before `at`. */
export const camAt = (f: number, keys: CamKey[], shakes: Shake[] = [], drift = true): CamState => {
  if (!keys.length) return {x: W / 2, y: H / 2, z: 1, rot: 0};
  let cur: CamState = {x: keys[0].x, y: keys[0].y, z: keys[0].z ?? 1, rot: keys[0].rot ?? 0};
  for (let i = 1; i < keys.length; i++) {
    const k = keys[i];
    const from = cur;
    const dist = Math.hypot(k.x - from.x, k.y - from.y);
    const dur = k.dur ?? Math.round(Math.min(48, Math.max(20, 18 + dist / 45)));
    const start = k.at - Math.round(dur * 0.35);
    if (f < start) break;
    const t = Math.min(1, (f - start) / dur);
    const e = (k.ease === 'ext' ? extendedEase : easeInOut)(t);
    const z1 = k.z ?? from.z;
    // long pans lift the camera a little (zoom out mid-move) so travel reads as travel
    const hop = dist > 700 ? 1 - Math.min(0.14, dist / 9000) * Math.sin(Math.PI * t) : 1;
    cur = {x: lerp(from.x, k.x, e), y: lerp(from.y, k.y, e), z: Math.exp(lerp(Math.log(from.z), Math.log(z1), e)) * hop, rot: lerp(from.rot, k.rot ?? from.rot, e)};
    if (t < 1) break;
    cur = {x: k.x, y: k.y, z: z1, rot: k.rot ?? from.rot};
  }
  let {x, y, z, rot} = cur;
  if (drift) {
    x += Math.sin(f / 70) * 6;
    y += Math.cos(f / 90) * 4;
    z *= 1 + 0.006 * Math.sin(f / 110);
  }
  for (const s of shakes) {
    const d = s.dur ?? 12;
    if (f >= s.at && f < s.at + d) {
      const a = (s.amp ?? 14) * (1 - (f - s.at) / d);
      x += Math.sin(f * 2.3) * a;
      y += Math.cos(f * 3.1) * a * 0.6;
      rot += Math.sin(f * 1.7) * a * 0.04;
    }
  }
  return {x, y, z, rot};
};

export const CamCtx = React.createContext<{cam: CamState; w: number; h: number}>({cam: {x: W / 2, y: H / 2, z: 1, rot: 0}, w: W, h: H});
export const useCam = () => React.useContext(CamCtx);

/** The world. Children use world coordinates (px). `bg` is drawn inside the world (use <WorldBg/>). */
export const World: React.FC<{keys: CamKey[]; shakes?: Shake[]; w?: number; h?: number; bg?: React.ReactNode; base?: string; drift?: boolean; children: React.ReactNode}> = ({keys, shakes, w = W, h = H, bg, base = '#FFF4E0', drift = true, children}) => {
  const f = useCurrentFrame();
  const cam = camAt(f, keys, shakes, drift);
  return (
    <CamCtx.Provider value={{cam, w, h}}>
      <AbsoluteFill style={{overflow: 'hidden', background: base}}>
        <AbsoluteFill style={{transform: `rotate(${cam.rot}deg)`, transformOrigin: '50% 50%'}}>
          <div style={{position: 'absolute', left: 0, top: 0, width: w, height: h, transformOrigin: '0 0', transform: `translate(${W / 2 - cam.x * cam.z}px, ${H / 2 - cam.y * cam.z}px) scale(${cam.z})`}}>
            {bg}
            {children}
          </div>
        </AbsoluteFill>
      </AbsoluteFill>
    </CamCtx.Provider>
  );
};

/** Layer inside a World that moves `depth` times as much as the camera (0.5 = far away, 1 = normal). */
export const Depth: React.FC<{d: number; children: React.ReactNode}> = ({d, children}) => {
  const {cam} = useCam();
  return <div style={{position: 'absolute', left: 0, top: 0, transform: `translate(${cam.x * (1 - d)}px, ${cam.y * (1 - d)}px)`}}>{children}</div>;
};

export {diveKey, frameKey} from './core';
