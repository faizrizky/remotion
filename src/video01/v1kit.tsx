// Video 01 helpers. Presentational parts come from the Video 02 kit (same reusable components); only timing and a few
// Penny-specific pieces (Leo full body, flying props, ripples) live here.
import React from 'react';
import {AbsoluteFill, Html5Audio, Img, interpolate, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {PopSpeed, PopIn} from '../style/style_kit';
import {TitleCard, TITLE_WIPE} from '../video02/title';
import {V2_TEMPO} from '../video02/ChapterShell';
import {beatOf, Chapter, chapterFrames, hasFile, INK, Prop, sec, Sfx, Voice, Watermark} from '../video02/v2kit';
import timing from './timing.json';

export const CHAPTERS1 = timing.chapters as unknown as (Chapter & {titleAudio: string})[];
export type V1Id = 'hook' | 't1' | 't2' | 't3' | 't4' | 'cust' | 'mean' | 'outro';
export const getChapter1 = (id: V1Id) => {
  const c = CHAPTERS1.find((x) => x.id === id);
  if (!c) throw new Error(`video01/timing.json has no chapter "${id}"`);
  return c;
};
export const frames1 = (id: V1Id) => chapterFrames(getChapter1(id));

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

const CARD: Record<string, {label: string; head: string; color: string}> = {
  t1: {label: 'TRICK 1', head: 'head_happy.png', color: '#2E9E8F'},
  t2: {label: 'TRICK 2', head: 'head_suspicious.png', color: '#7A6CFF'},
  t3: {label: 'TRICK 3', head: 'head_thinking.png', color: '#D9506E'},
  t4: {label: 'TRICK 4', head: 'head_shocked.png', color: '#4E7BEF'},
  cust: {label: '', head: 'head_calm.png', color: '#E4572E'},
  mean: {label: '', head: 'head_thinking.png', color: '#3A8D5C'},
};

/** One chapter of Video 01: optional title card (title clip plays inside it) + narration + content + logo watermark. */
export const ChapterShell1: React.FC<{id: V1Id; children: (b: (k: string) => number, len: number) => React.ReactNode}> = ({id, children}) => {
  const c = getChapter1(id);
  const pre = sec(c.pre);
  const len = chapterFrames(c) - pre;
  const b = beatOf(c);
  const card = CARD[id];
  return (
    <PopSpeed.Provider value={V2_TEMPO}>
      <AbsoluteFill style={{background: '#000'}}>
        <Sequence from={pre} durationInFrames={len}>{children(b, len)}</Sequence>
        {pre > 0 && card && (
          <Sequence durationInFrames={pre + TITLE_WIPE}>
            <TitleCard part={0} label={card.label} title={c.title} head={card.head} wipeAt={pre} color={card.color} />
            <Sfx name="whoosh" at={pre} />
          </Sequence>
        )}
        {c.titleAudio && hasFile(c.titleAudio) && (
          <Sequence from={4} layout="none"><Html5Audio src={staticFile(c.titleAudio)} /></Sequence>
        )}
        <Watermark />
        <Voice c={c} />
      </AbsoluteFill>
    </PopSpeed.Provider>
  );
};

/** Show children only between two frames (absolute frames of the current shot), with a short fade-out. */
export const Win: React.FC<{from: number; to: number; fade?: number; children: React.ReactNode}> = ({from, to, fade = 6, children}) => {
  const f = useCurrentFrame();
  if (f < from || f >= to) return null;
  return <AbsoluteFill style={{opacity: interpolate(f, [to - fade, to], [1, 0], clamp)}}>{children}</AbsoluteFill>;
};

/** Leo, full body (790x1539 canvases: body + one head file). `heads` = expression changes over time. */
export const LeoFull: React.FC<{heads: {at: number; head: string}[]; at?: number; x: number; y: number; h?: number; flip?: boolean}> = ({heads, at = 0, x, y, h = 760, flip}) => {
  const f = useCurrentFrame();
  const cur = [...heads].reverse().find((e) => f >= e.at) ?? heads[0];
  const since = f - cur.at;
  const pop = cur !== heads[0] ? interpolate(since, [0, 8], [0.93, 1], clamp) : 1;
  const w = (h * 790) / 1539;
  const breathe = 1 + Math.sin(f / 22) * 0.008;
  const rot = Math.sin(f / 30) * 1.6;
  if (!hasFile('v1/leo_body.png')) return <PopIn at={at} style={{left: x, top: y}}><Prop name="v1/leo_body.png" h={h} /></PopIn>;
  return (
    <PopIn at={at} style={{left: x, top: y}}>
      <div style={{width: w, height: h, position: 'relative', transform: `scaleX(${flip ? -1 : 1}) scaleY(${breathe})`, transformOrigin: '50% 100%'}}>
        <Img src={staticFile('v1/leo_body.png')} style={{position: 'absolute', inset: 0, width: w, height: h}} />
        {hasFile(cur.head) && <Img src={staticFile(cur.head)} style={{position: 'absolute', inset: 0, width: w, height: h, transform: `rotate(${rot}deg) scale(${pop})`, transformOrigin: '50% 25%'}} />}
      </div>
    </PopIn>
  );
};

/** Anything flying from (x0,y0) to (x1,y1) on an arc; stays at the end point (hold) or disappears. Centre-anchored. */
export const Fly: React.FC<{at: number; x0: number; y0: number; x1: number; y1: number; dur?: number; arc?: number; spin?: number; hold?: boolean; children: React.ReactNode}> = ({at, x0, y0, x1, y1, dur = 18, arc = 120, spin = 0, hold = true, children}) => {
  const f = useCurrentFrame();
  if (f < at || (!hold && f > at + dur)) return null;
  const t = Math.min(1, (f - at) / dur);
  const e = 1 - Math.pow(1 - t, 2);
  const x = x0 + (x1 - x0) * e;
  const y = y0 + (y1 - y0) * e - Math.sin(e * Math.PI) * arc;
  return <div style={{position: 'absolute', left: x, top: y, transform: `translate(-50%, -50%) rotate(${spin * (1 - t)}deg)`}}>{children}</div>;
};

/** Three expanding rings (a "tap" ripple). */
export const Ripple: React.FC<{at: number; x: number; y: number; color?: string; size?: number}> = ({at, x, y, color = '#FFC53D', size = 360}) => {
  const f = useCurrentFrame();
  return (
    <>
      {[0, 6, 12].map((d) => {
        const t = interpolate(f, [at + d, at + d + 22], [0, 1], clamp);
        if (t <= 0 || t >= 1) return null;
        return <div key={d} style={{position: 'absolute', left: x - (size * t) / 2, top: y - (size * t) / 2, width: size * t, height: size * t, borderRadius: '50%', border: `8px solid ${color}`, opacity: 1 - t}} />;
      })}
    </>
  );
};

/** Soft contact shadow so objects stand on the ground (rule: everything stands on something). */
export const Shadow: React.FC<{cx: number; y: number; w: number; at?: number}> = ({cx, y, w, at = 0}) => {
  const f = useCurrentFrame();
  return <div style={{position: 'absolute', left: cx - w / 2, top: y - 14, width: w, height: 28, borderRadius: '50%', background: 'rgba(30,20,10,0.22)', filter: 'blur(8px)', opacity: f < at ? 0 : 1}} />;
};

/** Count-up with thousands separators: prefix + number + suffix. */
export const CountMoney: React.FC<{to: number; at: number; dur?: number; prefix?: string; suffix?: string; style?: React.CSSProperties}> = ({to, at, dur = 24, prefix = '', suffix = '', style}) => {
  const f = useCurrentFrame();
  const v = Math.round(interpolate(f, [at, at + dur], [0, to], clamp));
  return <span style={style}>{prefix}{v.toLocaleString('en-US')}{suffix}</span>;
};

/** Flat label under/over a thing: paper-white rounded pill in ink. */
export const Tag: React.FC<{text: string; at: number; x: number; y: number; size?: number; bg?: string; color?: string; rot?: number}> = ({text, at, x, y, size = 40, bg = '#FFFFFF', color = INK, rot = 0}) => (
  <PopIn at={at} origin="50% 100%" style={{left: x, top: y}}>
    <div style={{transform: `rotate(${rot}deg)`, background: bg, color, border: `6px solid ${INK}`, borderRadius: 999, padding: '6px 28px', fontFamily: 'Poppins', fontWeight: 800, fontSize: size, whiteSpace: 'nowrap', boxShadow: '0 7px 0 rgba(0,0,0,0.2)'}}>{text}</div>
  </PopIn>
);

/** Vertical bar that grows from the baseline. `h` in px (keep proportional to the real numbers). */
export const Bar: React.FC<{at: number; x: number; base: number; w?: number; h: number; color: string; label: string; value: string}> = ({at, x, base, w = 280, h, color, label, value}) => {
  const f = useCurrentFrame();
  const t = interpolate(f, [at, at + 22], [0, 1], clamp);
  const e = 1 - Math.pow(1 - t, 3);
  if (f < at) return null;
  return (
    <div style={{position: 'absolute', left: x, top: base - h * e, width: w, height: h * e, background: color, border: `7px solid ${INK}`, borderRadius: '24px 24px 0 0', boxSizing: 'border-box', boxShadow: '0 8px 0 rgba(0,0,0,0.2)'}}>
      <div style={{position: 'absolute', left: -20, right: -20, top: -84, textAlign: 'center', fontFamily: 'Poppins', fontWeight: 900, fontSize: 64, color: INK, opacity: t}}>{value}</div>
      <div style={{position: 'absolute', left: -20, right: -20, bottom: -70, textAlign: 'center', fontFamily: 'Poppins', fontWeight: 800, fontSize: 40, color: INK}}>{label}</div>
    </div>
  );
};
