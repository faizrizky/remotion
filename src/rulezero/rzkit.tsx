// Rule Zero - shared kit (vertical 1080x1920, 24 fps).
// Original code. Palette and fonts follow docs/rule-zero/RULE_ZERO_SERIES_BIBLE.md section 2.
import React from 'react';
import {AbsoluteFill, Img, interpolate, random, staticFile, useCurrentFrame, useVideoConfig, Easing} from 'remotion';
import {loadFont} from '@remotion/fonts';

export const W = 1080;
export const H = 1920;
export const FPS = 24;

export const C = {
  ink: '#0C1311',
  fluor: '#D9F2E6',
  laminate: '#E8EEEA',
  yellow: '#FFD23F',
  red: '#E5484D',
  amber: '#F2A33A',
  grey: '#9AA7A1',
};

export const HEAVY = 'Oswald';
export const TYPE = 'Special Elite';
export const MONO = 'Share Tech Mono';
export const HAND = 'Caveat';
loadFont({family: HEAVY, url: staticFile('fonts/oswald-latin-700-normal.woff2'), weight: '700'});
loadFont({family: HEAVY, url: staticFile('fonts/oswald-latin-400-normal.woff2'), weight: '400'});
loadFont({family: TYPE, url: staticFile('fonts/special-elite-latin-400-normal.woff2'), weight: '400'});
loadFont({family: MONO, url: staticFile('fonts/share-tech-mono-latin-400-normal.woff2'), weight: '400'});
loadFont({family: HAND, url: staticFile('fonts/caveat-latin-700-normal.woff2'), weight: '700'});

export const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
export const ease = Easing.bezier(0.45, 0, 0.25, 1);

/** Seconds -> frames */
export const sf = (s: number) => Math.round(s * FPS);

/** Current time in seconds inside the current Sequence */
export const useT = () => useCurrentFrame() / useVideoConfig().fps;

export type Cam = {x: number; y: number; z: number};

/**
 * Painted plate with a camera move. x/y = focus point in the image (0..1), z = zoom (1 = image width fills frame).
 * The focus is kept inside the image so the frame never shows an edge.
 */
export const Plate: React.FC<{
  src: string;
  from: Cam;
  to?: Cam;
  dur: number; // seconds for the move
  ar?: number; // image height / width
  flip?: boolean;
  filter?: string;
  shake?: number; // px amplitude
  noImg?: boolean; // draw only the overlays (used to keep glows outside the CCTV colour filter)
  children?: React.ReactNode; // overlays positioned in IMAGE space (percent units)
}> = ({src, from, to, dur, ar = 2419 / 1350, flip, filter, shake = 0, noImg, children}) => {
  const t = useT();
  const p = to ? ease(Math.min(1, Math.max(0, t / dur))) : 0;
  const tt = to ?? from;
  const z = from.z + (tt.z - from.z) * p;
  const iw = W * z;
  const ih = iw * ar;
  let x = from.x + (tt.x - from.x) * p;
  let y = from.y + (tt.y - from.y) * p;
  // keep inside
  const hx = W / 2 / iw;
  const hy = H / 2 / ih;
  x = Math.min(1 - hx, Math.max(hx, x));
  y = Math.min(1 - hy, Math.max(hy, y));
  const frame = useCurrentFrame();
  const sx = shake ? (random(`sx${frame}`) - 0.5) * 2 * shake : 0;
  const sy = shake ? (random(`sy${frame}`) - 0.5) * 2 * shake : 0;
  return (
    <AbsoluteFill style={{overflow: 'hidden', background: noImg ? undefined : C.ink}}>
      <div
        style={{
          position: 'absolute',
          width: iw,
          height: ih,
          left: W / 2 - x * iw + sx,
          top: H / 2 - y * ih + sy,
          transform: flip ? 'scaleX(-1)' : undefined,
        }}
      >
        {noImg ? null : <Img src={staticFile(src)} style={{width: '100%', height: '100%', filter}} />}
        {children ? <div style={{position: 'absolute', inset: 0, transform: flip ? 'scaleX(-1)' : undefined}}>{children}</div> : null}
      </div>
    </AbsoluteFill>
  );
};

/** CCTV treatment: tint, scanlines, vignette, flicker, labels. Wrap a Plate. */
export const Cctv: React.FC<{cam: string; clock: string; children: React.ReactNode; rew?: boolean; small?: boolean; rec?: boolean}> = ({cam, clock, children, rew, small, rec = true}) => {
  const frame = useCurrentFrame();
  const fl = 0.92 + random(`fl${Math.floor(frame / 2)}`) * 0.08;
  const s = small ? 0.42 : 1;
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{filter: `grayscale(0.55) sepia(0.35) hue-rotate(65deg) saturate(0.9) contrast(1.12) brightness(${0.92 * fl})`}}>{children}</AbsoluteFill>
      <AbsoluteFill style={{background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.22) 0px, rgba(0,0,0,0.22) 2px, rgba(0,0,0,0) 2px, rgba(0,0,0,0) 5px)', mixBlendMode: 'multiply'}} />
      <AbsoluteFill style={{background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(0,0,0,0.65) 100%)'}} />
      <AbsoluteFill style={{background: `rgba(217,242,230,${0.04 + random(`n${frame}`) * 0.03})`}} />
      <div style={{position: 'absolute', left: 54 * s, top: 250 * s + (small ? 0 : 0), fontFamily: MONO, color: C.fluor, fontSize: 46 * s, letterSpacing: 2 * s, textShadow: '0 0 6px rgba(0,0,0,0.9)'}}>
        {cam}
      </div>
      {rec ? (
        <div style={{position: 'absolute', right: 54 * s, top: 250 * s, display: 'flex', alignItems: 'center', gap: 12 * s, fontFamily: MONO, color: C.fluor, fontSize: 42 * s}}>
          <div style={{width: 26 * s, height: 26 * s, borderRadius: 99, background: C.red, opacity: Math.floor(frame / 12) % 2 ? 1 : 0.25}} />
          {rew ? '◀◀ REW' : 'REC'}
        </div>
      ) : null}
      <div style={{position: 'absolute', right: 54 * s, bottom: (small ? 40 : 560) * s, fontFamily: MONO, color: C.fluor, fontSize: 44 * s, textShadow: '0 0 6px rgba(0,0,0,0.9)'}}>{clock}</div>
    </AbsoluteFill>
  );
};

/** Format a clock time from minutes after midnight-offset (e.g. 22*60+58). */
export const clockStr = (mins: number, secs = 0) => {
  let h = Math.floor(mins / 60) % 24;
  const m = Math.floor(mins % 60);
  const ap = h >= 12 ? 'PM' : 'AM';
  h = h % 12 === 0 ? 12 : h % 12;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(Math.floor(secs) % 60).padStart(2, '0')} ${ap}`;
};

/** Pill in the HUD */
const Pill: React.FC<{label: string; value: string; hot?: boolean; flash?: number; alert?: boolean}> = ({label, value, hot, flash = 0, alert}) => (
  <div style={{display: 'flex', alignItems: 'center', gap: 14, background: alert ? C.yellow : 'rgba(12,19,17,0.78)', border: `2px solid ${alert ? C.yellow : hot ? C.yellow : 'rgba(217,242,230,0.35)'}`, borderRadius: 999, padding: '10px 24px', transform: `scale(${1 + flash * 0.12})`, boxShadow: alert ? '0 0 22px rgba(255,210,63,0.35)' : undefined}}>
    <span style={{fontFamily: MONO, fontSize: 30, color: alert ? 'rgba(12,19,17,0.7)' : C.grey, letterSpacing: 2}}>{label}</span>
    <span style={{fontFamily: MONO, fontSize: 36, fontWeight: 700, color: alert ? C.ink : hot ? C.yellow : C.fluor}}>{value}</span>
  </div>
);

export const Hud: React.FC<{clock: string; nerve: number; log: number; chip?: string; chipRed?: boolean; nerveFlash?: number; logFlash?: number}> = ({clock, nerve, log, chip, chipRed, nerveFlash = 0, logFlash = 0}) => (
  <div style={{position: 'absolute', left: 48, top: 330, display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'flex-start'}}>
    <div style={{display: 'flex', gap: 12, flexWrap: 'wrap', width: 980}}>
      <Pill label="CLOCK" value={clock} />
      <Pill label="NERVE" value={`${Math.round(nerve)}%`} hot={nerveFlash > 0} flash={nerveFlash} />
      <Pill label="LOG" value={String(log)} hot={logFlash > 0} flash={logFlash} />
    </div>
    {chip ? (
      <Pill label={chip.split(' ').slice(0, -1).join(' ') || chip} value={chip.split(' ').slice(-1)[0] || ''} alert />
    ) : null}
  </div>
);

export type Word = {w: string; s: number; e: number; clip: string};

/** Group words into caption lines */
export const groupLines = (words: Word[]) => {
  const lines: Word[][] = [];
  let cur: Word[] = [];
  for (let i = 0; i < words.length; i++) {
    const w = words[i];
    const prev = cur[cur.length - 1];
    const newLine = cur.length > 0 && (w.s - prev.e > 0.32 || cur.length >= 4 || /[.?!]$/.test(prev.w) || w.clip !== prev.clip);
    if (newLine) {
      lines.push(cur);
      cur = [];
    }
    cur.push(w);
  }
  if (cur.length) lines.push(cur);
  return lines;
};

const EMPH = new Set(['alone', 'level', 'three', 'moved', 'driver', 'camera', 'broken', 'tall', 'can', 'open', 'walk', 'away', 'sedan', 'thirty-one', 'twelve', 'scratched']);

/** Karaoke caption at 73% height. hidden(t) decides when captions are off (cards). */
export const Captions: React.FC<{words: Word[]; hidden: (t: number) => boolean}> = ({words, hidden}) => {
  const t = useT();
  const lines = React.useMemo(() => groupLines(words), [words]);
  if (hidden(t)) return null;
  let idx = -1;
  for (let i = 0; i < lines.length; i++) {
    const a = lines[i][0].s - 0.08;
    const nextA = i + 1 < lines.length ? lines[i + 1][0].s - 0.08 : Infinity;
    const b = Math.min(lines[i][lines[i].length - 1].e + 0.45, nextA);
    if (t >= a && t < b) idx = i;
  }
  if (idx < 0) return null;
  const line = lines[idx];
  const radio = line[0].clip === 'dale' || line[0].clip === 'you';
  const you = line[0].clip === 'you';
  const pop = interpolate(t - (line[0].s - 0.08), [0, 0.12], [0.9, 1], clamp);
  return (
    <div style={{position: 'absolute', left: 60, right: 60, top: H * 0.73 - 70, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10}}>
      {radio ? (
        <div style={{fontFamily: MONO, fontSize: 34, color: you ? C.fluor : C.amber, letterSpacing: 4, background: 'rgba(12,19,17,0.8)', padding: '4px 16px', borderRadius: 8}}>{you ? 'YOU · RADIO' : 'DALE · RADIO'}</div>
      ) : null}
      <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0 22px', transform: `scale(${pop})`}}>
        {line.map((w, i) => {
          const on = t >= w.s - 0.03;
          const key = w.w.toLowerCase().replace(/[^a-z'-]/g, '');
          const em = EMPH.has(key);
          const col = you ? (on ? C.fluor : 'rgba(217,242,230,0.4)') : radio ? (on ? C.amber : 'rgba(242,163,58,0.45)') : on ? (em ? C.yellow : '#FFFFFF') : 'rgba(217,242,230,0.42)';
          return (
            <span key={i} style={{fontFamily: radio ? MONO : HEAVY, fontWeight: 700, fontSize: radio ? 70 : 86, lineHeight: 1.12, color: col, WebkitTextStroke: radio ? '6px rgba(0,0,0,0.9)' : '3px rgba(0,0,0,0.85)', paintOrder: 'stroke fill', textShadow: '0 6px 18px rgba(0,0,0,0.75)'}}>
              {w.w}
            </span>
          );
        })}
      </div>
    </div>
  );
};

/** Ring that draws itself around a point (image-space percent) */
export const Ring: React.FC<{x: number; y: number; w: number; h: number; start: number; color?: string; label?: string; dur?: number}> = ({x, y, w, h, start, color = C.yellow, label, dur = 0.5}) => {
  const t = useT();
  const p = interpolate(t, [start, start + dur], [0, 1], clamp);
  if (p <= 0) return null;
  const W = w * 1350;
  const H = h * 2419;
  return (
    <div style={{position: 'absolute', left: `${(x - w / 2) * 100}%`, top: `${(y - h / 2) * 100}%`, width: `${w * 100}%`, height: `${h * 100}%`}}>
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{width: '100%', height: '100%', overflow: 'visible'}}>
        <ellipse cx={W / 2} cy={H / 2} rx={W / 2 - 6} ry={H / 2 - 6} fill="none" stroke={color} strokeWidth={7} strokeLinecap="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - p} />
      </svg>
      {label ? (
        <div style={{position: 'absolute', left: '50%', bottom: '108%', transform: `translateX(-50%) scale(${interpolate(t, [start + dur * 0.6, start + dur * 0.6 + 0.15], [0.6, 1], clamp)})`, opacity: interpolate(t, [start + dur * 0.6, start + dur * 0.6 + 0.1], [0, 1], clamp), background: color, color: C.ink, fontFamily: HEAVY, fontWeight: 700, fontSize: 44, padding: '2px 14px', borderRadius: 8, whiteSpace: 'nowrap'}}>
          {label}
        </div>
      ) : null}
    </div>
  );
};


/** Axis-aligned target brackets around a thing (never tilted, never flipped). Centre x,y and size w,h in image fractions. */
export const Bracket: React.FC<{x: number; y: number; w: number; h: number; start: number; color?: string; label?: string; dur?: number}> = ({x, y, w, h, start, color = C.yellow, label, dur = 0.35}) => {
  const t = useT();
  const p = interpolate(t, [start, start + dur], [0, 1], clamp);
  if (p <= 0) return null;
  const grow = 1.18 - 0.18 * p;
  const corner = (cx: number, cy: number, sx: number, sy: number) => (
    <path d={`M ${cx} ${cy + sy * 30} L ${cx} ${cy} L ${cx + sx * 16} ${cy}`} fill="none" stroke={color} strokeWidth={9} strokeLinecap="square" vectorEffect="non-scaling-stroke" style={{strokeWidth: 9}} />
  );
  return (
    <div style={{position: 'absolute', left: `${(x - (w * grow) / 2) * 100}%`, top: `${(y - (h * grow) / 2) * 100}%`, width: `${w * grow * 100}%`, height: `${h * grow * 100}%`, opacity: p}}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{width: '100%', height: '100%', overflow: 'visible'}}>
        {corner(0, 0, 1, 1)}
        {corner(100, 0, -1, 1)}
        {corner(0, 100, 1, -1)}
        {corner(100, 100, -1, -1)}
      </svg>
      {label ? (
        <div style={{position: 'absolute', left: '50%', bottom: '106%', transform: 'translateX(-50%)', background: color, color: C.ink, fontFamily: HEAVY, fontWeight: 700, fontSize: 44, padding: '2px 14px', borderRadius: 8, whiteSpace: 'nowrap'}}>
          {label}
        </div>
      ) : null}
    </div>
  );
};

/** Amber glow (headlights, eyes) in image space */
export const Glow: React.FC<{x: number; y: number; r: number; o: number; color?: string}> = ({x, y, r, o, color = C.amber}) => (
  <div style={{position: 'absolute', left: `${x * 100}%`, top: `${y * 100}%`, width: `${r * 200}%`, aspectRatio: '1', transform: 'translate(-50%, -50%)', borderRadius: '50%', background: `radial-gradient(circle, rgba(255,244,214,${Math.min(1, o)}) 0%, ${hexA(color, o * 0.85)} 20%, ${hexA(color, o * 0.32)} 45%, rgba(0,0,0,0) 70%)`, mixBlendMode: 'screen'}} />
);

export const hexA = (hex: string, a: number) => {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${Math.max(0, Math.min(1, a))})`;
};

/** Hard-cut flash helper: white/black dip at scene start */
export const CutFlash: React.FC<{color?: string; len?: number}> = ({color = '#000', len = 0.12}) => {
  const t = useT();
  const o = interpolate(t, [0, len], [1, 0], clamp);
  return o > 0 ? <AbsoluteFill style={{background: color, opacity: o * 0.8}} /> : null;
};
