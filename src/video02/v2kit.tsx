// Video 02 helpers on top of src/style/style_kit.tsx.
// Everything that depends on a file in public/ is "missing-safe": if the file is not there yet,
// a dashed placeholder (or silence) is rendered instead of crashing the render.
import React from 'react';
import {ExitOut, PaperTexture} from './fx';
import {AbsoluteFill, getStaticFiles, Html5Audio, Img, interpolate, Sequence, staticFile, useCurrentFrame} from 'remotion';
import timing from './timing.json';
import {CountUp, DiagonalWipe, InkReveal, PopIn, SANS, HAND, WhipIn, ZoomThrough, CrossDissolve} from '../style/style_kit';

export const FPS = timing.fps;
export const W = 1920;
export const H = 1080;
export const INK = '#191411';

// ---------- timing ----------
export type ChapterId = 'cold' | 'ch1' | 'ch2' | 'ch3' | 'ch4' | 'ch5' | 'ch6' | 'outro';
export type Chapter = {id: string; title: string; audio: string; pre: number; audioDur: number; post: number; beats: Record<string, number>};
export const CHAPTERS = timing.chapters as unknown as Chapter[];
export const sec = (s: number) => Math.round(s * FPS);
export const getChapter = (id: ChapterId): Chapter => {
  const c = CHAPTERS.find((x) => x.id === id);
  if (!c) throw new Error(`timing.json has no chapter "${id}"`);
  return c;
};
export const chapterFrames = (c: Chapter) => sec(c.pre) + sec(c.audioDur) + sec(c.post);
/** Frame (relative to the start of the chapter's voice) of a named beat. Throws early if the beat is missing. */
export const beatOf = (c: Chapter) => (key: string): number => {
  const v = c.beats[key];
  if (v === undefined) throw new Error(`timing.json chapter "${c.id}" has no beat "${key}"`);
  return sec(v);
};

// ---------- public/ files ----------
let cache: Set<string> | null = null;
/** True if public/<name> exists. If the file list is unavailable, assume it exists. */
export const hasFile = (name: string): boolean => {
  if (!cache) {
    const list = getStaticFiles();
    if (!list || list.length === 0) return true;
    cache = new Set(list.map((f) => f.name));
  }
  return cache.has(name);
};

export const SFX = {pop: 'sfx/pop.wav', whoosh: 'sfx/whoosh.wav', kaching: 'sfx/kaching.wav', card_tap: 'sfx/card_tap.wav', ding: 'sfx/ding.wav', boom: 'sfx/boom.wav', notify: 'sfx/notify.wav'} as const;
export const SFX_VOL = {pop: 0.32, whoosh: 0.3, kaching: 0.5, card_tap: 0.5, ding: 0.4, boom: 0.45, notify: 0.4} as const;
export type SfxName = keyof typeof SFX;

export const Sfx: React.FC<{name: SfxName; at: number}> = ({name, at}) => {
  const file = SFX[name];
  if (!hasFile(file)) return null;
  return (
    <Sequence from={Math.max(0, at)} durationInFrames={sec(2)} layout="none">
      <Html5Audio src={staticFile(file)} volume={SFX_VOL[name]} />
    </Sequence>
  );
};

export const Voice: React.FC<{c: Chapter}> = ({c}) => {
  if (!hasFile(c.audio)) return null;
  return (
    <Sequence from={sec(c.pre)} layout="none">
      <Html5Audio src={staticFile(c.audio)} />
    </Sequence>
  );
};

/** Transparent PNG prop. Give either `h` (height) or `w` (width) so wide buildings never get too big. */
export const Prop: React.FC<{name: string; h?: number; w?: number; flip?: boolean; style?: React.CSSProperties}> = ({name, h, w, flip, style}) => {
  if (!hasFile(name)) {
    const ph = h ?? Math.round((w ?? 300) * 0.6);
    return (
      <div style={{height: ph, width: w ?? Math.round(ph * 0.9), border: '6px dashed rgba(0,0,0,0.45)', borderRadius: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontFamily: SANS, fontWeight: 700, fontSize: 22, color: 'rgba(0,0,0,0.6)', background: 'rgba(255,255,255,0.35)', padding: 10, boxSizing: 'border-box', ...style}}>
        missing: {name}
      </div>
    );
  }
  const size: React.CSSProperties = w !== undefined ? {width: w, height: 'auto'} : {height: h ?? 300, width: 'auto'};
  return <Img src={staticFile(name)} style={{...size, display: 'block', transform: flip ? 'scaleX(-1)' : undefined, ...style}} />;
};

// ---------- shots ----------
export type Trans = 'none' | 'ink' | 'whip' | 'wipe' | 'zoom' | 'dissolve';
export const TRANS_FRAMES: Record<Trans, number> = {none: 0, ink: 30, whip: 10, wipe: 22, zoom: 24, dissolve: 22};
/** A shot from `from` to `to` (frames). It stays on screen for the length of the NEXT shot's transition so there is never a gap. */
export const Shot: React.FC<{from: number; to: number; trans?: Trans; tail?: number; seed?: string; exit?: boolean; children: React.ReactNode}> = ({from, to, trans = 'none', tail = 34, seed = 's', exit = true, children}) => {
  const dur = Math.max(1, to - from + tail);
  const d = TRANS_FRAMES[trans];
  const body =
    trans === 'ink' ? <InkReveal dur={d} seed={seed}>{children}</InkReveal>
    : trans === 'whip' ? <WhipIn dur={d}>{children}</WhipIn>
    : trans === 'wipe' ? <DiagonalWipe dur={d}>{children}</DiagonalWipe>
    : trans === 'zoom' ? <ZoomThrough dur={d}>{children}</ZoomThrough>
    : trans === 'dissolve' ? <CrossDissolve dur={d}>{children}</CrossDissolve>
    : <AbsoluteFill>{children}</AbsoluteFill>;
  const inner = exit ? <ExitOut start={to - from - 10} dur={16}>{body}</ExitOut> : body;
  return <Sequence from={from} durationInFrames={dur}>{inner}<PaperTexture /></Sequence>;
};

// ---------- small graphics (code-drawn, so numbers are always exact) ----------
/** "$30" installment circle with a small date label underneath. */
export const PayCircle: React.FC<{amount: string; label: string; at: number; color?: string; x: number; y: number; size?: number; paid?: boolean}> = ({amount, label, at, color = '#FFD23F', x, y, size = 170, paid}) => (
  <PopIn at={at} origin="50% 50%" style={{left: x - size / 2, top: y - size / 2}}>
    <div style={{width: size, height: size, borderRadius: '50%', background: paid ? '#7BD389' : color, border: `7px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: SANS, fontWeight: 900, fontSize: size * 0.3, color: INK, boxShadow: '0 8px 0 rgba(0,0,0,0.2)'}}>{amount}</div>
    <div style={{marginTop: 14, textAlign: 'center', fontFamily: SANS, fontWeight: 700, fontSize: 30, color: INK, width: size}}>{label}</div>
  </PopIn>
);

/** Price tag with a hole, rotated slightly. */
export const PriceTag: React.FC<{text: string; at: number; x: number; y: number; color?: string; size?: number; rot?: number}> = ({text, at, x, y, color = '#FF6B6B', size = 120, rot = -6}) => (
  <PopIn at={at} origin="50% 50%" style={{left: x, top: y}}>
    <div style={{transform: `rotate(${rot}deg)`, display: 'flex', alignItems: 'center', background: color, border: `7px solid ${INK}`, borderRadius: '24px 70px 70px 24px', padding: `${size * 0.12}px ${size * 0.4}px ${size * 0.12}px ${size * 0.25}px`, fontFamily: SANS, fontWeight: 900, fontSize: size, color: '#fff', boxShadow: '0 10px 0 rgba(0,0,0,0.2)', whiteSpace: 'nowrap'}}>
      <div style={{width: size * 0.22, height: size * 0.22, borderRadius: '50%', background: '#fff', border: `5px solid ${INK}`, marginRight: size * 0.2}} />
      {text}
    </div>
  </PopIn>
);

/** 10x10 grid of dots, `n` of them highlighted one after another (exact percentages). */
export const PercentGrid: React.FC<{n: number; at: number; x: number; y: number; on?: string; off?: string; dot?: number; gap?: number}> = ({n, at, x, y, on = '#FF6B6B', off = 'rgba(30,20,60,0.16)', dot = 34, gap = 12}) => {
  const f = useCurrentFrame();
  const lit = Math.round(interpolate(f, [at, at + 30], [0, n], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}));
  return (
    <PopIn at={at - 6} origin="50% 50%" style={{left: x, top: y}}>
      <div style={{display: 'grid', gridTemplateColumns: `repeat(10, ${dot}px)`, gap}}>
        {Array.from({length: 100}).map((_, i) => (
          <div key={i} style={{width: dot, height: dot, borderRadius: '50%', background: i < lit ? on : off, border: `3px solid ${INK}`}} />
        ))}
      </div>
    </PopIn>
  );
};

/** Half-circle gauge, needle sweeps to `value` of `max`. */
export const Gauge: React.FC<{value: number; max: number; at: number; x: number; y: number; label: string; r?: number}> = ({value, max, at, x, y, label, r = 260}) => {
  const f = useCurrentFrame();
  const v = interpolate(f, [at, at + 30], [0, value], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const a = Math.PI * (1 - v / max);
  const nx = r + Math.cos(a) * (r - 40);
  const ny = r - Math.sin(a) * (r - 40);
  return (
    <PopIn at={at - 6} origin="50% 100%" style={{left: x - r, top: y - r}}>
      <svg width={r * 2} height={r + 20} viewBox={`0 0 ${r * 2} ${r + 20}`}>
        <path d={`M 20 ${r} A ${r - 20} ${r - 20} 0 0 1 ${r * 2 - 20} ${r}`} fill="none" stroke="#7BD389" strokeWidth={34} />
        <path d={`M ${r} 20 A ${r - 20} ${r - 20} 0 0 1 ${r * 2 - 20} ${r}`} fill="none" stroke="#FF6B6B" strokeWidth={34} />
        <line x1={r} y1={r} x2={nx} y2={ny} stroke={INK} strokeWidth={14} strokeLinecap="round" />
        <circle cx={r} cy={r} r={22} fill={INK} />
      </svg>
      <div style={{textAlign: 'center', fontFamily: SANS, fontWeight: 900, fontSize: 64, color: INK, marginTop: 6}}>
        up to <CountUp to={value} from={0} at={at} dur={30} suffix="%" />
      </div>
      <div style={{textAlign: 'center', fontFamily: SANS, fontWeight: 700, fontSize: 32, color: INK}}>{label}</div>
    </PopIn>
  );
};

/** Generic flat person icon (no character). */
export const Person: React.FC<{color?: string; h?: number; dim?: boolean}> = ({color = '#2E86AB', h = 220, dim}) => (
  <div style={{width: h * 0.55, height: h, position: 'relative', opacity: dim ? 0.35 : 1}}>
    <div style={{position: 'absolute', left: h * 0.12, top: 0, width: h * 0.31, height: h * 0.31, borderRadius: '50%', background: '#F2C29B', border: `5px solid ${INK}`}} />
    <div style={{position: 'absolute', left: 0, top: h * 0.34, width: h * 0.55, height: h * 0.66, borderRadius: `${h * 0.25}px ${h * 0.25}px ${h * 0.06}px ${h * 0.06}px`, background: color, border: `5px solid ${INK}`, boxSizing: 'border-box'}} />
  </div>
);

/** Coin flying from (x0,y0) to (x1,y1) on an arc. */
export const CoinFly: React.FC<{at: number; x0: number; y0: number; x1: number; y1: number; dur?: number; size?: number; label?: string}> = ({at, x0, y0, x1, y1, dur = 18, size = 70, label}) => {
  const f = useCurrentFrame();
  if (f < at || f > at + dur + 4) return null;
  const t = Math.min(1, (f - at) / dur);
  const x = x0 + (x1 - x0) * t;
  const y = y0 + (y1 - y0) * t - Math.sin(t * Math.PI) * 120;
  return (
    <div style={{position: 'absolute', left: x - size / 2, top: y - size / 2, width: size, height: size, borderRadius: '50%', background: '#F5C842', border: `5px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: SANS, fontWeight: 900, fontSize: size * 0.32, color: INK}}>{label ?? '$'}</div>
  );
};

/** Dashed arrow that draws itself. */
export const DashArrow: React.FC<{x0: number; y0: number; x1: number; y1: number; at: number; color?: string; dur?: number}> = ({x0, y0, x1, y1, at, color = INK, dur = 14}) => {
  const f = useCurrentFrame();
  const t = interpolate(f, [at, at + dur], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  if (t <= 0) return null;
  const len = Math.hypot(x1 - x0, y1 - y0);
  const ang = (Math.atan2(y1 - y0, x1 - x0) * 180) / Math.PI;
  return (
    <div style={{position: 'absolute', left: x0, top: y0 - 9, width: len * t, height: 18, transformOrigin: '0 50%', transform: `rotate(${ang}deg)`}}>
      <div style={{position: 'absolute', left: 0, right: 30, top: 6, height: 6, backgroundImage: `repeating-linear-gradient(90deg, ${color} 0 26px, transparent 26px 44px)`}} />
      {t > 0.95 && <div style={{position: 'absolute', right: 0, top: -9, width: 0, height: 0, borderTop: '18px solid transparent', borderBottom: '18px solid transparent', borderLeft: `34px solid ${color}`}} />}
    </div>
  );
};

/** Big stat card: count-up number + label. */
export const StatCard: React.FC<{to: number; suffix?: string; prefix?: string; label: string; at: number; x: number; y: number; w?: number; bg?: string; ink?: string}> = ({to, suffix = '%', prefix = '', label, at, x, y, w = 520, bg = '#FFF4E0', ink = INK}) => (
  <PopIn at={at} origin="50% 50%" style={{left: x, top: y}}>
    <div style={{width: w, background: bg, border: `7px solid ${INK}`, borderRadius: 34, padding: '26px 30px', boxSizing: 'border-box', textAlign: 'center', boxShadow: '0 12px 0 rgba(0,0,0,0.2)'}}>
      <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 150, lineHeight: 1, color: ink}}>{prefix}<CountUp to={to} from={0} at={at} dur={24} suffix={suffix} /></div>
      <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 36, color: ink, marginTop: 10}}>{label}</div>
    </div>
  </PopIn>
);

/** Code-drawn phone (no brand logos). Screen content is passed as children. */
export const Phone: React.FC<{at: number; x: number; y: number; h?: number; children?: React.ReactNode; tilt?: number}> = ({at, x, y, h = 640, children, tilt = 0}) => (
  <PopIn at={at} origin="50% 100%" style={{left: x, top: y}}>
    <div style={{transform: `rotate(${tilt}deg)`, width: h * 0.5, height: h, background: '#22223A', border: `8px solid ${INK}`, borderRadius: h * 0.08, padding: h * 0.035, boxSizing: 'border-box', boxShadow: '0 14px 0 rgba(0,0,0,0.22)'}}>
      <div style={{width: '100%', height: '100%', background: '#FFFFFF', borderRadius: h * 0.05, overflow: 'hidden', position: 'relative', fontFamily: SANS, color: INK}}>{children}</div>
    </div>
  </PopIn>
);

/** Generic checkout screen with a "Pay in 4" button (used inside <Phone>). */
export const CheckoutScreen: React.FC<{total?: string; pulseAt?: number}> = ({total = '$120.00', pulseAt = 0}) => {
  const f = useCurrentFrame();
  const s = f > pulseAt ? 1 + 0.06 * Math.max(0, Math.sin(((f - pulseAt) / 18) * Math.PI)) : 1;
  return (
    <div style={{padding: 22, display: 'flex', flexDirection: 'column', gap: 16, height: '100%', boxSizing: 'border-box'}}>
      <div style={{fontWeight: 800, fontSize: 26}}>Checkout</div>
      <div style={{height: 120, borderRadius: 16, background: '#EDE7DD'}} />
      <div style={{display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: 26}}><span>Total</span><span>{total}</span></div>
      <div style={{marginTop: 'auto', background: '#FF6B9A', color: '#fff', fontWeight: 900, fontSize: 30, textAlign: 'center', padding: '16px 0', borderRadius: 14, border: `4px solid ${INK}`, transform: `scale(${s})`}}>Pay in 4</div>
      <div style={{fontSize: 20, textAlign: 'center', opacity: 0.7}}>4 x $30.00 · 0% interest</div>
    </div>
  );
};

/** Leo head canvases are 790x1539 with the head inside this box (measured from the PNGs). */
const HEAD_CANVAS = {w: 790, h: 1539};
const HEAD_BOX = {x0: 207, x1: 527, y0: 0, y1: 361};
/** Leo reaction badge: his head in a circle that pops in (no body, so no alignment issues). */
export const LeoBadge: React.FC<{head: string; at: number; x: number; y: number; size?: number; ring?: string}> = ({head, at, x, y, size = 300, ring = '#FFD23F'}) => {
  const k = (size * 0.78) / (HEAD_BOX.y1 - HEAD_BOX.y0);
  const cx = (HEAD_BOX.x0 + HEAD_BOX.x1) / 2;
  return (
    <PopIn at={at} origin="50% 50%" style={{left: x, top: y}}>
      <div style={{width: size, height: size, borderRadius: '50%', background: ring, border: `8px solid ${INK}`, overflow: 'hidden', position: 'relative', boxShadow: '0 12px 0 rgba(0,0,0,0.2)'}}>
        {hasFile(head) ? (
          <Img src={staticFile(head)} style={{position: 'absolute', width: HEAD_CANVAS.w * k, height: HEAD_CANVAS.h * k, left: size / 2 - cx * k, top: size * 0.9 - HEAD_BOX.y1 * k}} />
        ) : (
          <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: SANS, fontWeight: 700, fontSize: 20, textAlign: 'center'}}>missing: {head}</div>
        )}
      </div>
    </PopIn>
  );
};

/** Small banner that reads "Education only. Not financial advice." */
export const Disclaimer: React.FC = () => (
  <div style={{position: 'absolute', top: 30, left: 40, fontFamily: SANS, fontWeight: 700, fontSize: 24, color: '#fff', background: 'rgba(0,0,0,0.55)', padding: '8px 18px', borderRadius: 12}}>Education only. Not financial advice.</div>
);

/** Centered big headline in handwriting (used for short punchlines). */
export const Punch: React.FC<{text: string; at: number; color?: string; y?: number; size?: number}> = ({text, at, color = INK, y = 430, size = 120}) => (
  <PopIn at={at} origin="50% 50%" style={{left: 0, right: 0, top: y, textAlign: 'center'}}>
    <div style={{fontFamily: HAND, fontWeight: 700, fontSize: size, color, textShadow: '0 4px 0 rgba(255,255,255,0.55)'}}>{text}</div>
  </PopIn>
);

/** Source line, bottom-left, readable on any background. Show it whenever a number is on screen. */
export const Src: React.FC<{text: string; at?: number}> = ({text, at = 0}) => {
  const f = useCurrentFrame();
  if (f < at) return null;
  return <div style={{position: 'absolute', left: 124, bottom: 36, fontFamily: SANS, fontWeight: 600, fontSize: 24, color: '#fff', background: 'rgba(0,0,0,0.55)', padding: '6px 16px', borderRadius: 10}}>Source: {text}</div>;
};

/** Story-beat background in the Kok Bisa look: soft desaturated scene, slight depth blur, one warm light leak,
 *  heavy vignette and film grain. Explainer (Antidote-style) scenes should NOT use it; they use the plain palette backdrop. */
/** Penny Logics channel watermark: 72 px circle, bottom-left, margin 28. REQUIRED in every video (ChapterShell adds it to all chapters). */
export const Watermark: React.FC = () => (
  hasFile('profile_pic.png') ? (
    <div style={{position: 'absolute', left: 28, bottom: 28, width: 72, height: 72, borderRadius: '50%', overflow: 'hidden', border: `4px solid ${INK}`, boxShadow: '0 4px 10px rgba(0,0,0,0.2)', pointerEvents: 'none'}}>
      <Img src={staticFile('profile_pic.png')} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
    </div>
  ) : null
);
export const Bg: React.FC<{name: string; dim?: number; drift?: number; leak?: boolean; wash?: number; brighten?: number}> = ({name, dim = 0, drift = 40, leak = true, wash = 0.12, brighten = 1.15}) => {
  const f = useCurrentFrame();
  const x = Math.sin(f / 90) * drift;
  const leakX = ((f * 5) % 3200) - 700;
  if (!hasFile(name)) return null;
  return (
    <AbsoluteFill>
      <Img src={staticFile(name)} style={{position: 'absolute', left: -60, top: -34, width: W + 120, height: H + 68, transform: `translateX(${x}px) scale(1.03)`, filter: `saturate(0.8) blur(2.5px) brightness(${brighten})`}} />
      <AbsoluteFill style={{background: `rgba(255,248,235,${wash})`}} />
      <AbsoluteFill style={{background: `rgba(20,16,30,${dim})`}} />
      {leak ? <AbsoluteFill style={{background: `linear-gradient(105deg, transparent ${leakX - 260}px, rgba(255,196,120,0.22) ${leakX}px, transparent ${leakX + 260}px)`, mixBlendMode: 'screen'}} /> : null}
      <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 48%, rgba(0,0,0,0) 45%, rgba(60,40,20,0.22) 100%)'}} />
      <svg width={W} height={H} style={{position: 'absolute', left: 0, top: 0, opacity: 0.16, mixBlendMode: 'overlay'}}>
        <filter id={`grain-${f % 3}`}><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} seed={f % 3} /><feColorMatrix type="saturate" values="0" /></filter>
        <rect width={W} height={H} filter={`url(#grain-${f % 3})`} />
      </svg>
    </AbsoluteFill>
  );
};

/** Illustrated character (transparent PNG, full body). `h` is the height; it pops in and breathes gently. */
export const Char: React.FC<{name: string; at?: number; x: number; y: number; h?: number; flip?: boolean}> = ({name, at = 0, x, y, h = 560, flip}) => {
  const f = useCurrentFrame();
  const bob = Math.sin((f + x) / 14) * 5;
  return (
    <PopIn at={at} style={{left: x, top: y}}>
      <div style={{transform: `translate(${-f * 0.14}px, ${bob}px)`}}>
        <Prop name={name} h={h} flip={flip} />
      </div>
    </PopIn>
  );
};
