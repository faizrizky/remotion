// Wide illustrated "world" behind a scene: the camera drifts across it in any direction (right, left, up, down).
// A Shot provides the world through WorldCtx, Scene renders it instead of the plain palette backdrop.
import React, {createContext, useContext} from 'react';
import {AbsoluteFill, Img, staticFile, useCurrentFrame} from 'remotion';

export type WorldDir = 'r' | 'l' | 'u' | 'd';
export type WorldPick = {src: string; dir: WorldDir; at?: number}; // at = where the drift starts along the world (0..1)
export const WorldCtx = createContext<WorldPick | null>(null);

/** Pixel size of every wide world (height 1080). */
export const WORLD_W: Record<string, number> = {
  'v2/world_street.jpg': 2915, 'v2/world_bank.jpg': 3493, 'v2/world_clothes.jpg': 3342, 'v2/world_kitchen.jpg': 3742,
  'v2/world_bakery.jpg': 3735, 'v2/world_mall.jpg': 3658, 'v2/world_living.jpg': 3678, 'v2/world_desk.jpg': 3238,
};
const VW = 1920, VH = 1080;
const ZOOM = 1.16; // the world is drawn 16% larger than the screen, so there is room to move up and down too

export const WorldPan: React.FC<{world: WorldPick; dur: number; wash?: number}> = ({world, dur, wash = 0.34}) => {
  const f = useCurrentFrame();
  const natW = WORLD_W[world.src] ?? 3400;
  const h = VH * ZOOM;
  const w = (natW / 1080) * h;
  const slackX = w - VW, slackY = h - VH;
  const t = Math.min(1, f / Math.max(1, dur + 20));
  const e = t * t * (3 - 2 * t) * 0.6 + t * 0.4; // gentle ease, mostly linear
  const at = world.at ?? 0.5;
  const travelX = Math.min(slackX * 0.5, 760);
  let x = -(slackX * at), y = -slackY * 0.5;
  if (world.dir === 'r') x = -(slackX * at) - (e - 0.5) * travelX;          // camera moves right
  else if (world.dir === 'l') x = -(slackX * at) + (e - 0.5) * travelX;     // camera moves left
  else if (world.dir === 'u') { y = -slackY * (1 - e * 0.9); x = -(slackX * at) - e * 90; } // camera moves up
  else { y = -slackY * (e * 0.9 + 0.05); x = -(slackX * at) + e * 90; }      // camera moves down
  x = Math.max(-slackX, Math.min(0, x));
  return (
    <AbsoluteFill>
      <Img src={staticFile(world.src)} style={{position: 'absolute', left: x, top: y, width: w, height: h, filter: 'saturate(0.92) blur(1.2px)'}} />
      <AbsoluteFill style={{background: `rgba(255,248,235,${wash})`}} />
    </AbsoluteFill>
  );
};

export const useWorld = () => useContext(WorldCtx);
