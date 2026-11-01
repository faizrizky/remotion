// Wide illustrated "world" behind a scene, shared by every shot of one "scene" so the background never jumps.
// The camera position is absolute (chapter frames): x0 at frame a -> x1 at frame b, so shots that swap content
// on the same world, and the two sides of a one-camera pan, always draw the world at exactly the same place.
// Drift is slow and only for long scenes (viewers get dizzy otherwise); short scenes stay still.
import React, {createContext, useContext} from 'react';
import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame} from 'remotion';

/** src = world image; x0/x1 = camera left edge in scaled px (0 .. slack) at chapter frames a/b. */
export type WorldPick = {src: string; x0: number; x1?: number; a?: number; b?: number};
/** What a Shot provides: the pick + the shot's start frame (chapter frames), so the world can use absolute time. */
export type WorldCtxValue = WorldPick & {from: number};
export const WorldCtx = createContext<WorldCtxValue | null>(null);

/** Pixel size of every wide world (height 1080). */
export const WORLD_W: Record<string, number> = {
  'v2/world_street.jpg': 2915, 'v2/world_bank.jpg': 3493, 'v2/world_clothes.jpg': 3342, 'v2/world_kitchen.jpg': 3742,
  'v2/world_bakery.jpg': 3735, 'v2/world_mall.jpg': 3658, 'v2/world_living.jpg': 3678, 'v2/world_desk.jpg': 3238,
  'v3/world_grocery.jpg': 3821, 'v3/world_pantry.jpg': 3789, 'v3/world_freezer.jpg': 3654, 'v3/world_household.jpg': 3692,
  'v3/world_library.jpg': 3644, 'v3/world_hypermarket.jpg': 3515, 'v3/world_checkout.jpg': 3547, 'v3/world_apartment.jpg': 4602,
};
const VW = 1920, VH = 1080, FPS = 24;
export const WORLD_ZOOM = 1.16; // drawn 16% larger than the screen
/** Horizontal room for the camera (scaled px). */
export const worldSlack = (src: string) => ((WORLD_W[src] ?? 3400) / 1080) * VH * WORLD_ZOOM - VW;
/** Scenes shorter than this stay still; longer ones drift at most MAX_DRIFT px per second. */
const MIN_DRIFT_SEC = 6;
const MAX_DRIFT = 15;

export const worldX = (w: WorldPick, g: number) => {
  const slack = worldSlack(w.src);
  const a = w.a ?? 0, b = w.b ?? a;
  let x1 = w.x1 ?? w.x0;
  const secs = (b - a) / FPS;
  if (secs < MIN_DRIFT_SEC) x1 = w.x0;
  else x1 = w.x0 + Math.sign(x1 - w.x0) * Math.min(Math.abs(x1 - w.x0), MAX_DRIFT * secs);
  const t = b > a ? interpolate(g, [a, b], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}) : 0;
  const e = t * t * (3 - 2 * t);
  return Math.max(0, Math.min(slack, w.x0 + (x1 - w.x0) * e));
};

export const WorldPan: React.FC<{world: WorldCtxValue; wash?: number}> = ({world, wash = 0.34}) => {
  const f = useCurrentFrame();
  const natW = WORLD_W[world.src] ?? 3400;
  const h = VH * WORLD_ZOOM;
  const w = (natW / 1080) * h;
  const x = -worldX(world, world.from + f);
  const y = -(h - VH) * 0.5;
  return (
    <AbsoluteFill>
      <Img src={staticFile(world.src)} style={{position: 'absolute', left: x, top: y, width: w, height: h, filter: 'saturate(0.92) blur(1.2px)'}} />
      {/* wash covers the whole image (not just the screen box) so a pan reveals washed pixels too */}
      <div style={{position: 'absolute', left: x, top: y, width: w, height: h, background: `rgba(255,248,235,${wash})`}} />
    </AbsoluteFill>
  );
};

export const useWorld = () => useContext(WorldCtx);

/** Opacity of the world layer and of the content layer of a shot (set by pan / swap transitions; nested values multiply). */
export type Fade = {world: number; content: number};
export const FadeCtx = createContext<Fade>({world: 1, content: 1});
export const useFade = () => useContext(FadeCtx);
/** Multiplies the surrounding fade by (world, content). */
export const FadeLayer: React.FC<{world?: number; content?: number; children: React.ReactNode}> = ({world = 1, content = 1, children}) => {
  const p = useContext(FadeCtx);
  return <FadeCtx.Provider value={{world: p.world * world, content: p.content * content}}>{children}</FadeCtx.Provider>;
};
