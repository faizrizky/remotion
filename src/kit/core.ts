// Penny Logics kit: shared types + helpers. Pure TS (no React) so scripts can import it too.
export const W = 1920;
export const H = 1080;
export const INK = '#191411';
export const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

export type Chapter = {id: string; title: string; audio: string; pre: number; audioDur: number; post: number; beats: Record<string, number>; titleAudio?: string};
export type Timing = {fps: number; chapters: Chapter[]};

/** Frames of a chapter: pre + voice + post. */
export const chapterFrames = (c: Chapter, fps: number) => Math.round(c.pre * fps) + Math.round(c.audioDur * fps) + Math.round(c.post * fps);

/**
 * A time reference. Everything in a spec uses these, so scenes follow the voice:
 *  - number            frames from the start of the voice
 *  - 'tap'             a beat from timing.json
 *  - 'tap+6' / 'tap-4' a beat plus/minus frames
 *  - '2.5s'            seconds from the start of the voice
 *  - 'end' / 'end-12'  end of the chapter (voice + post)
 */
export type At = number | string;

export const makeAt = (c: Chapter, fps: number) => {
  const end = Math.round(c.audioDur * fps) + Math.round(c.post * fps);
  return (a: At | undefined, dflt = 0): number => {
    if (a === undefined) return dflt;
    if (typeof a === 'number') return a;
    const m = /^([A-Za-z0-9_]+|\d+(?:\.\d+)?s)\s*([+-]\s*\d+(?:\.\d+)?s?)?$/.exec(a.trim());
    if (!m) throw new Error(`Bad time "${a}" in chapter ${c.id}`);
    const base = m[1];
    let f: number;
    if (base === 'end') f = end;
    else if (/^\d/.test(base)) f = Math.round(parseFloat(base) * fps);
    else {
      const v = c.beats[base];
      if (v === undefined) throw new Error(`Chapter "${c.id}" has no beat "${base}"`);
      f = Math.round(v * fps);
    }
    if (m[2]) {
      const off = m[2].replace(/\s/g, '');
      f += off.endsWith('s') ? Math.round(parseFloat(off) * fps) : parseInt(off, 10);
    }
    return f;
  };
};

// ---------- easing ----------
export const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
export const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
/** "Never fully lands": covers ~85% of the move fast, then settles slowly (HyperFrames extended-keyframe idea). */
export const extendedEase = (t: number) => (t < 0.35 ? 0.85 * easeOut(t / 0.35) : 0.85 + 0.15 * easeOut((t - 0.35) / 0.65));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Deterministic pseudo-random 0..1 from a string seed. */
export const rand = (seed: string) => {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  h ^= h >>> 13;
  h = Math.imul(h, 0x5bd1e995);
  return ((h ^ (h >>> 15)) >>> 0) / 4294967295;
};

// ---------- camera keys (pure, usable from specs and scripts) ----------
export type CamKey = {at: number; x: number; y: number; z?: number; rot?: number; dur?: number; ease?: 'inout' | 'ext'};
type Box = {x: number; y: number; w: number; h: number};
/** Zoom until the box fills the frame (dive into a phone screen, a door, a card). */
export const diveKey = (at: number, b: Box, fill = 1): CamKey => ({at, x: b.x + b.w / 2, y: b.y + b.h / 2, z: Math.min(W / b.w, H / b.h) * fill, ease: 'ext'});
/** Frame a box with some margin (focus zoom). */
export const frameKey = (at: number, b: Box, margin = 1.25): CamKey => ({at, x: b.x + b.w / 2, y: b.y + b.h / 2, z: Math.min(W / (b.w * margin), H / (b.h * margin))});

// ---------- video layout (chapters overlap by their entrance so there is never a hard cut) ----------
export const ENTER_LEN: Record<string, number> = {rip: 18, iris: 16, slide: 14, whip: 9, none: 0};
/** Start frame of every chapter in the full video + total length. Overlap = entrance length, capped by the previous chapter's tail (post). */
export const layoutVideo = (t: Timing, enters: (string | undefined)[]) => {
  const starts: number[] = [];
  const overlaps: number[] = [];
  let cursor = 0;
  t.chapters.forEach((c, i) => {
    const prev = t.chapters[i - 1];
    const ov = i === 0 ? 0 : Math.min(ENTER_LEN[enters[i] ?? 'whip'] ?? 0, Math.round(prev.post * t.fps));
    cursor -= ov;
    starts.push(cursor);
    overlaps.push(ov);
    cursor += chapterFrames(c, t.fps);
  });
  return {starts, overlaps, total: cursor};
};
/** Brand sting length (CircleBurstWipe + StrokeLogo), frames at 24 fps. */
export const STING_FRAMES = 66;

// ---------- spec math (pure; used by the renderer and by scripts/video.mjs) ----------
/** Pose for a carried/moving item: [time, x, y, scale?, rotation?] in world (or screen) px. */
export type Pose = [At, number, number, number?, number?];
/** Camera key: [time, x, y, zoom?, {dur, ease, rot}?] — x,y = world point at the centre of the screen. */
export type Cam = [At, number, number, number?, {dur?: number; ease?: 'inout' | 'ext'; rot?: number}?];
type AtFn = (a: At | undefined, d?: number) => number;

export const resolveCamPure = (cam: Cam[], A: AtFn): CamKey[] => cam.map(([a, x, y, z, o]) => ({at: A(a), x, y, z, dur: o?.dur, ease: o?.ease, rot: o?.rot}));

/** Position of an item at chapter frame f (moves arc slightly, ease in-out). */
export const poseAtPure = (it: {x?: number; y?: number; at?: At; move?: Pose[]}, f: number, A: AtFn) => {
  const x0 = it.x ?? 0, y0 = it.y ?? 0;
  if (!it.move?.length) return {x: x0, y: y0, s: 1, r: 0};
  let cur = {x: x0, y: y0, s: 1, r: 0};
  let prevF = A(it.at);
  for (const [a, x, y, s, r] of it.move) {
    const kf = A(a);
    const k = {x, y, s: s ?? 1, r: r ?? 0};
    if (f <= prevF) break;
    const t = Math.min(1, (f - prevF) / Math.max(1, kf - prevF));
    const e = easeInOut(t);
    const arc = Math.sin(Math.PI * t) * Math.min(160, Math.hypot(k.x - cur.x, k.y - cur.y) * 0.18);
    if (t < 1) return {x: cur.x + (k.x - cur.x) * e, y: cur.y + (k.y - cur.y) * e - arc, s: cur.s + (k.s - cur.s) * e, r: cur.r + (k.r - cur.r) * e};
    cur = k;
    prevF = kf;
  }
  return cur;
};
/** Spec camera key that dives into a box (fills the frame). */
export const diveCam = (at: At, b: Box, fill = 1): Cam => [at, b.x + b.w / 2, b.y + b.h / 2, Math.min(W / b.w, H / b.h) * fill, {ease: 'ext'}];
/** Spec camera key that frames a box with margin. */
export const frameCam = (at: At, b: Box, margin = 1.25): Cam => [at, b.x + b.w / 2, b.y + b.h / 2, Math.min(W / (b.w * margin), H / (b.h * margin))];
