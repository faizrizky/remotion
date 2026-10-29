// Penny Logics - Video 02 STYLE KIT (Remotion). Original code, written from observed techniques:
// "Antidote" (dark starfield + vivid accents, ink-splat reveal, handwritten titles, split panels,
// layered diagrams, corner subscribe) and "Kok Bisa?" (cream speech bubbles, diagonal wipe,
// bokeh backdrops, tri-panel montage, sticker lower-thirds, vignette flashbacks).
// No characters/logos/assets from either channel are copied. Drop into src/style_kit.tsx.
// Needs: npm i @remotion/google-fonts   (Caveat + Poppins)
import React from 'react';
import {AbsoluteFill, interpolate, random, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {loadFont as loadCaveat} from '@remotion/google-fonts/Caveat';
import {loadFont as loadPoppins} from '@remotion/google-fonts/Poppins';

export const HAND = loadCaveat().fontFamily;
export const SANS = loadPoppins().fontFamily;

// ---------- 1. PALETTES (vary every scene; never reuse the previous scene's palette) ----------
export type Palette = {bg: string; bg2: string; ink: string; accent: string; accent2: string; paper: string};
export const PALETTES: Record<string, Palette> = {
  space:   {bg: '#0E0B1F', bg2: '#2A1646', ink: '#FFFFFF', accent: '#FF5C8A', accent2: '#FFD23F', paper: '#FFF4E0'},
  teal:    {bg: '#7FD6D9', bg2: '#4FB7C0', ink: '#102A43', accent: '#FF7A59', accent2: '#FFD23F', paper: '#FFFFFF'},
  rose:    {bg: '#F08A8F', bg2: '#E06A78', ink: '#2B1230', accent: '#FFD23F', accent2: '#5B4FFF', paper: '#FFF4E0'},
  indigo:  {bg: '#2B2F77', bg2: '#4B3F9E', ink: '#FFFFFF', accent: '#FFB703', accent2: '#FF6B6B', paper: '#FFF4E0'},
  mint:    {bg: '#BDEBD3', bg2: '#8FD8B5', ink: '#12352B', accent: '#FF6B6B', accent2: '#FFB703', paper: '#FFFFFF'},
  sunrise: {bg: '#FFD9A0', bg2: '#FFB26B', ink: '#3B1F1A', accent: '#E4572E', accent2: '#2E86AB', paper: '#FFFFFF'},
  night:   {bg: '#10223E', bg2: '#1B3A66', ink: '#FFFFFF', accent: '#FFD23F', accent2: '#FF7A59', paper: '#FFF4E0'},
};

// ---------- 2. MOTION PRIMITIVES ----------
/** Bouncy pop-in (every object appears with this). */
export const usePop = (at: number, stiff = 180, damping = 11) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  return spring({frame: f - at, fps, config: {damping, stiffness: stiff, mass: 0.7}});
};
export const PopIn: React.FC<{at?: number; style?: React.CSSProperties; children: React.ReactNode; origin?: string}> = ({at = 0, style, children, origin = '50% 100%'}) => {
  const p = usePop(at);
  const f = useCurrentFrame();
  return (
    <div style={{position: 'absolute', transformOrigin: origin, opacity: f < at ? 0 : 1, transform: `scale(${p})`, ...style}}>
      {children}
    </div>
  );
};
/** Slide in from a side with overshoot. */
export const SlideIn: React.FC<{at?: number; from?: 'left' | 'right' | 'top' | 'bottom'; dist?: number; style?: React.CSSProperties; children: React.ReactNode}> = ({at = 0, from = 'left', dist = 600, style, children}) => {
  const p = usePop(at, 120, 14);
  const f = useCurrentFrame();
  const d = (1 - p) * dist;
  const t = from === 'left' ? `translateX(${-d}px)` : from === 'right' ? `translateX(${d}px)` : from === 'top' ? `translateY(${-d}px)` : `translateY(${d}px)`;
  return <div style={{position: 'absolute', opacity: f < at ? 0 : 1, transform: t, ...style}}>{children}</div>;
};
/** Idle life: gentle bob + sway so nothing is ever frozen. */
export const Idle: React.FC<{amp?: number; speed?: number; children: React.ReactNode; style?: React.CSSProperties}> = ({amp = 6, speed = 0.06, children, style}) => {
  const f = useCurrentFrame();
  return <div style={{transform: `translateY(${Math.sin(f * speed) * amp}px) rotate(${Math.sin(f * speed * 0.7) * 1.2}deg)`, ...style}}>{children}</div>;
};
/** Slow camera push/pan on the whole scene (always on, 1.00 -> 1.06). */
export const Camera: React.FC<{dur: number; z0?: number; z1?: number; panX?: number; children: React.ReactNode}> = ({dur, z0 = 1, z1 = 1.06, panX = 0, children}) => {
  const f = useCurrentFrame();
  const t = Math.min(1, f / dur);
  return <AbsoluteFill style={{transform: `scale(${interpolate(t, [0, 1], [z0, z1])}) translateX(${interpolate(t, [0, 1], [0, panX])}px)`}}>{children}</AbsoluteFill>;
};

// ---------- 3. BACKDROPS ----------
export const Starfield: React.FC<{n?: number; color?: string}> = ({n = 90, color = '#fff'}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      {Array.from({length: n}).map((_, i) => {
        const x = random(`x${i}`) * 1920, y = random(`y${i}`) * 1080, s = 1 + random(`s${i}`) * 3;
        const tw = 0.35 + 0.65 * Math.abs(Math.sin(f * 0.04 + i));
        return <div key={i} style={{position: 'absolute', left: x, top: ((y - f * 0.15 * s) % 1080 + 1080) % 1080, width: s, height: s, borderRadius: '50%', background: color, opacity: tw}} />;
      })}
    </AbsoluteFill>
  );
};
/** Soft out-of-focus lights (Kok Bisa night-market feel). */
export const Bokeh: React.FC<{n?: number; color?: string}> = ({n = 9, color = '#FFE08A'}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{filter: 'blur(18px)'}}>
      {Array.from({length: n}).map((_, i) => (
        <div key={i} style={{position: 'absolute', left: random(`bx${i}`) * 1800, top: random(`by${i}`) * 500 + Math.sin(f * 0.02 + i) * 10, width: 120 + random(`bs${i}`) * 120, height: 120 + random(`bs${i}`) * 120, borderRadius: '50%', background: color, opacity: 0.55}} />
      ))}
    </AbsoluteFill>
  );
};
export const Backdrop: React.FC<{p: Palette; stars?: boolean; bokeh?: boolean}> = ({p, stars, bokeh}) => (
  <AbsoluteFill style={{background: `radial-gradient(circle at 50% 40%, ${p.bg2} 0%, ${p.bg} 75%)`}}>
    {stars && <Starfield />}
    {bokeh && <Bokeh />}
  </AbsoluteFill>
);
/** Film grain + vignette on top of every scene (cohesive, "hand-made" look). */
export const Finish: React.FC<{vignette?: number}> = ({vignette = 0.35}) => (
  <AbsoluteFill style={{pointerEvents: 'none'}}>
    <svg width="100%" height="100%" style={{position: 'absolute', opacity: 0.08, mixBlendMode: 'overlay'}}>
      <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" /></filter>
      <rect width="100%" height="100%" filter="url(#grain)" />
    </svg>
    <div style={{position: 'absolute', inset: 0, background: `radial-gradient(circle, transparent 55%, rgba(0,0,0,${vignette}) 100%)`}} />
  </AbsoluteFill>
);

// ---------- 4. TEXT / LABELS ----------
/** Hand-written scene title with a draw-on underline (Antidote). */
export const HandTitle: React.FC<{text: string; at?: number; color?: string; underline?: string; size?: number; style?: React.CSSProperties}> = ({text, at = 0, color = '#fff', underline = '#FF5C8A', size = 84, style}) => {
  const p = usePop(at, 140, 12);
  const f = useCurrentFrame();
  const line = interpolate(f, [at + 6, at + 22], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: 90, textAlign: 'center', opacity: f < at ? 0 : 1, transform: `scale(${0.8 + 0.2 * p})`, ...style}}>
      <div style={{fontFamily: HAND, fontSize: size, color, fontWeight: 700}}>{text}</div>
      <div style={{margin: '0 auto', height: 8, width: `${line * 60}%`, background: underline, borderRadius: 8}} />
    </div>
  );
};
/** Cream speech bubble with tail (Kok Bisa). tail: 'left' | 'right'. */
export const Bubble: React.FC<{text: string; at?: number; tail?: 'left' | 'right'; style?: React.CSSProperties; size?: number}> = ({text, at = 0, tail = 'left', style, size = 54}) => (
  <PopIn at={at} origin={tail === 'left' ? '10% 100%' : '90% 100%'} style={style}>
    <div style={{position: 'relative', background: '#F7EFE2', color: '#2A2A2A', fontFamily: SANS, fontWeight: 800, fontSize: size, padding: '26px 40px', borderRadius: 60, textAlign: 'center', boxShadow: '0 8px 0 rgba(0,0,0,0.12)', maxWidth: 640}}>
      {text}
      <div style={{position: 'absolute', bottom: -34, [tail]: 70, width: 0, height: 0, borderLeft: '22px solid transparent', borderRight: '22px solid transparent', borderTop: '40px solid #F7EFE2', transform: tail === 'left' ? 'rotate(12deg)' : 'rotate(-12deg)'} as React.CSSProperties} />
    </div>
  </PopIn>
);
/** Two-tone sticker lower-third: small label on top, bold keyword below (Kok Bisa "Lagi cari / GINJAL"). */
export const Sticker: React.FC<{top: string; main: string; sub?: string; at?: number; p: Palette; style?: React.CSSProperties}> = ({top, main, sub, at = 0, p, style}) => (
  <SlideIn at={at} from="left" dist={500} style={style}>
    <div style={{transform: 'rotate(-3deg)', fontFamily: SANS, boxShadow: '0 10px 0 rgba(0,0,0,0.18)', borderRadius: 18, overflow: 'hidden', minWidth: 460}}>
      <div style={{background: p.accent2, color: '#3B2A00', padding: '10px 28px', fontSize: 38, fontWeight: 600}}>{top}</div>
      <div style={{background: p.accent, color: '#fff', padding: '8px 28px 12px', fontSize: 66, fontWeight: 900, letterSpacing: 1}}>{main}{sub && <div style={{fontSize: 28, fontWeight: 500}}>{sub}</div>}</div>
    </div>
  </SlideIn>
);
export const Pill: React.FC<{text: string; bg: string; color?: string; size?: number}> = ({text, bg, color = '#fff', size = 40}) => (
  <div style={{display: 'inline-block', background: bg, color, fontFamily: SANS, fontWeight: 800, fontSize: size, padding: '10px 30px', borderRadius: 999, border: '5px solid rgba(0,0,0,0.85)', boxShadow: '0 6px 0 rgba(0,0,0,0.2)', whiteSpace: 'nowrap'}}>{text}</div>
);
/** Subtitle bar, fixed bottom-center, max 2 lines. */
export const Subtitle: React.FC<{text: string}> = ({text}) => (
  <div style={{position: 'absolute', left: 0, right: 0, bottom: 45, textAlign: 'center'}}>
    <span style={{display: 'inline-block', maxWidth: 1300, background: 'rgba(0,0,0,0.55)', color: '#fff', fontFamily: SANS, fontWeight: 600, fontSize: 40, lineHeight: 1.25, padding: '10px 28px', borderRadius: 16}}>{text}</span>
  </div>
);
/** Animated corner call-to-action (pulses every 5 s). */
export const CornerCTA: React.FC<{text?: string; color?: string}> = ({text = 'SUBSCRIBE', color = '#FFD23F'}) => {
  const f = useCurrentFrame();
  const s = 1 + 0.08 * Math.max(0, Math.sin((f % 120) / 120 * Math.PI * 2));
  return <div style={{position: 'absolute', right: 40, bottom: 120, fontFamily: HAND, fontWeight: 700, fontSize: 52, color, transform: `rotate(-8deg) scale(${s})`, textShadow: '0 3px 0 rgba(0,0,0,0.35)'}}>{text}</div>;
};

// ---------- 5. LAYOUTS ----------
/** 2 or 3 vertical panels that slide in staggered (Hook/Trick split + Kok Bisa tri-panel montage). */
const Panel: React.FC<{i: number; stagger: number; color?: string; children: React.ReactNode}> = ({i, stagger, color, children}) => {
  const p = usePop(i * stagger, 110, 15);
  return (
    <div style={{flex: 1, borderRadius: 36, overflow: 'hidden', position: 'relative', background: color || 'rgba(255,255,255,0.08)', transform: `translateY(${(1 - p) * (i % 2 ? 700 : -700)}px)`, border: '6px solid rgba(0,0,0,0.85)'}}>{children}</div>
  );
};
export const Panels: React.FC<{items: React.ReactNode[]; gap?: number; stagger?: number; colors?: string[]}> = ({items, gap = 16, stagger = 8, colors = []}) => (
  <AbsoluteFill style={{flexDirection: 'row', display: 'flex', gap, padding: 28}}>
    {items.map((it, i) => <Panel key={i} i={i} stagger={stagger} color={colors[i]}>{it}</Panel>)}
  </AbsoluteFill>
);
/** Layered "cake" diagram (Antidote iceberg/goal-vs-system): labelled layers stack up from the bottom. */
export const LayerCake: React.FC<{layers: {label: string; color: string}[]; at?: number; w?: number}> = ({layers, at = 0, w = 640}) => (
  <div style={{position: 'relative', width: w, height: layers.length * 120 + 60}}>
    {layers.map((l, i) => {
      const idx = layers.length - 1 - i;
      return (
        <PopIn key={i} at={at + idx * 10} style={{left: 0, bottom: idx * 120, width: w}} origin="50% 100%">
          <div style={{height: 100, borderRadius: '50%/40%', background: l.color, border: '6px solid rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: SANS, fontWeight: 800, fontSize: 36, color: '#fff'}}>{l.label}</div>
        </PopIn>
      );
    })}
  </div>
);
/** Sparse line/curve chart that draws itself (Antidote "plateau of latent potential"). */
export const DrawCurve: React.FC<{d: string; at?: number; dur?: number; color?: string; w?: number; h?: number; len?: number}> = ({d, at = 0, dur = 36, color = '#FFD23F', w = 900, h = 520, len = 1400}) => {
  const f = useCurrentFrame();
  const t = interpolate(f, [at, at + dur], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{position: 'absolute'}}>
      <path d={d} fill="none" stroke={color} strokeWidth={10} strokeLinecap="round" strokeDasharray={len} strokeDashoffset={len * (1 - t)} />
    </svg>
  );
};
/** Count-up that ends EXACTLY on `to` and then holds. */
export const CountUp: React.FC<{to: number; from?: number; at: number; dur: number; suffix?: string; style?: React.CSSProperties}> = ({to, from = 0, at, dur, suffix = '%', style}) => {
  const f = useCurrentFrame();
  const v = Math.round(interpolate(f, [at, at + dur], [from, to], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}));
  return <span style={style}>{v}{suffix}</span>;
};

// ---------- 6. SCENE TRANSITIONS (wrap the INCOMING scene; place it in a <Sequence> that starts `dur` frames before the old scene ends) ----------
const ease = (t: number) => 1 - Math.pow(1 - t, 3);
/** Ink-splat reveal: many circles grow from seeded points until the incoming scene fills the frame. */
export const InkReveal: React.FC<{dur?: number; blobs?: number; seed?: string; children: React.ReactNode}> = ({dur = 18, blobs = 14, seed = 'ink', children}) => {
  const f = useCurrentFrame();
  const t = ease(Math.min(1, f / dur));
  const id = `ink-${seed}`;
  if (f >= dur) return <AbsoluteFill>{children}</AbsoluteFill>;
  return (
    <AbsoluteFill>
      <svg width={0} height={0} style={{position: 'absolute'}}>
        <clipPath id={id}>
          {Array.from({length: blobs}).map((_, i) => {
            const cx = random(`${seed}cx${i}`) * 1920, cy = random(`${seed}cy${i}`) * 1080;
            const delay = random(`${seed}d${i}`) * 0.35;
            const r = Math.max(0, (t - delay) / (1 - delay)) * (700 + random(`${seed}r${i}`) * 500);
            return <circle key={i} cx={cx} cy={cy} r={r} />;
          })}
        </clipPath>
      </svg>
      <AbsoluteFill style={{clipPath: `url(#${id})`}}>{children}</AbsoluteFill>
    </AbsoluteFill>
  );
};
/** Diagonal wipe (Kok Bisa). */
export const DiagonalWipe: React.FC<{dur?: number; children: React.ReactNode}> = ({dur = 12, children}) => {
  const f = useCurrentFrame();
  const t = ease(Math.min(1, f / dur));
  const x = interpolate(t, [0, 1], [-30, 130]);
  return <AbsoluteFill style={{clipPath: `polygon(${x - 30}% 0, 130% 0, 130% 100%, ${x}% 100%)`}}>{children}</AbsoluteFill>;
};
/** Zoom-through: old scene is scaled up, new one pops from small (use for "dive into the object"). */
export const ZoomThrough: React.FC<{dur?: number; children: React.ReactNode}> = ({dur = 14, children}) => {
  const f = useCurrentFrame();
  const t = ease(Math.min(1, f / dur));
  return <AbsoluteFill style={{opacity: t, transform: `scale(${interpolate(t, [0, 1], [0.7, 1])})`}}>{children}</AbsoluteFill>;
};
/** Flashback dim (dark vignette + desaturate) for "remember when" / memory beats. */
export const Flashback: React.FC<{children: React.ReactNode}> = ({children}) => (
  <AbsoluteFill style={{filter: 'saturate(0.55) brightness(0.8) blur(0.6px)'}}>{children}<Finish vignette={0.7} /></AbsoluteFill>
);

// ---------- 7. SCENE SHELL ----------
/** Standard scene: backdrop + camera + content + grain/vignette + CTA + subtitle. */
export const Scene: React.FC<{palette: keyof typeof PALETTES; dur: number; stars?: boolean; bokeh?: boolean; subtitle?: string; cta?: boolean; children: React.ReactNode}> = ({palette, dur, stars, bokeh, subtitle, cta, children}) => {
  const p = PALETTES[palette];
  return (
    <AbsoluteFill>
      <Camera dur={dur}>
        <Backdrop p={p} stars={stars} bokeh={bokeh} />
        {children}
      </Camera>
      <Finish />
      {cta && <CornerCTA />}
      {subtitle && <Subtitle text={subtitle} />}
    </AbsoluteFill>
  );
};

// ======================================================================
// ADDITIONS (round 2, from denser frame sweep of both channels)
// ======================================================================

/** Chapter card (Antidote "ACT 2"): dip to black ~0.3s, then a solid-colour card with a big number/title,
 *  a hand-drawn subtitle with underline strokes, and progress dots top-right. */
export const ChapterCard: React.FC<{label: string; title: string; index: number; total: number; color?: string; ink?: string; dip?: number}> = ({label, title, index, total, color = '#D9506E', ink = '#FFF4E0', dip = 7}) => {
  const f = useCurrentFrame();
  const black = interpolate(f, [0, dip], [1, 0], {extrapolateRight: 'clamp'});
  const p = usePop(dip - 2, 150, 13);
  return (
    <AbsoluteFill style={{background: color}}>
      <div style={{position: 'absolute', top: 40, right: 60, display: 'flex', gap: 14}}>
        {Array.from({length: total}).map((_, i) => <div key={i} style={{width: 26, height: 26, borderRadius: '50%', border: `4px solid ${ink}`, background: i < index ? ink : 'transparent'}} />)}
      </div>
      <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: `scale(${0.85 + 0.15 * p})`, opacity: p}}>
        <div style={{fontFamily: HAND, fontWeight: 700, fontSize: 190, color: ink, lineHeight: 1}}>{label}</div>
        <div style={{fontFamily: HAND, fontWeight: 700, fontSize: 84, color: ink, textAlign: 'center', maxWidth: 1200, marginTop: 10}}>{title}</div>
      </div>
      <AbsoluteFill style={{background: '#000', opacity: black}} />
    </AbsoluteFill>
  );
};
/** Kok Bisa whip/smear. MEASURED at 30 fps: ~5 frames old scene smears left + blurs, ~6 frames new scene de-blurs from the right (total ~0.37 s = 4+5 frames at 24 fps). Wrap old scene in WhipOut(start=its last 4 frames), new scene in WhipIn. */
export const WhipOut: React.FC<{start: number; dur?: number; children: React.ReactNode}> = ({start, dur = 4, children}) => {
  const f = useCurrentFrame();
  const t = interpolate(f, [start, start + dur], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return <AbsoluteFill style={{transform: `translateX(${-t * 260}px) scaleX(${1 + t * 1.6})`, filter: `blur(${t * 26}px)`, opacity: 1 - t * 0.25}}>{children}</AbsoluteFill>;
};
export const WhipIn: React.FC<{dur?: number; children: React.ReactNode}> = ({dur = 5, children}) => {
  const f = useCurrentFrame();
  const t = 1 - Math.min(1, f / dur);
  return <AbsoluteFill style={{transform: `translateX(${t * 260}px) scaleX(${1 + t * 1.6})`, filter: `blur(${t * 26}px)`}}>{children}</AbsoluteFill>;
};
/** Warm light-leak flash used as an opener / soft cut. */
export const LightLeak: React.FC<{at: number; dur?: number}> = ({at, dur = 14}) => {
  const f = useCurrentFrame();
  const o = interpolate(f, [at, at + dur * 0.35, at + dur], [0, 0.85, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return <AbsoluteFill style={{background: 'radial-gradient(circle at 80% 30%, #FFE9B0 0%, rgba(255,200,120,0.4) 45%, transparent 75%)', opacity: o, mixBlendMode: 'screen'}} />;
};
/** Dissolve between two scenes (both children visible; use in an overlap Sequence). */
export const CrossDissolve: React.FC<{dur?: number; children: React.ReactNode}> = ({dur = 12, children}) => {
  const f = useCurrentFrame();
  return <AbsoluteFill style={{opacity: Math.min(1, f / dur)}}>{children}</AbsoluteFill>;
};
/** Cinematic spotlight cone from the top on a dark scene (Kok Bisa interior). */
export const Spotlight: React.FC<{x?: number; w?: number; opacity?: number}> = ({x = 960, w = 900, opacity = 0.35}) => (
  <AbsoluteFill style={{pointerEvents: 'none', background: `conic-gradient(from 180deg at ${x}px -10%, transparent ${180 - w / 40}deg, rgba(255,240,200,${opacity}) 180deg, transparent ${180 + w / 40}deg)`, mixBlendMode: 'screen'}} />
);
/** Letterbox bars for cinematic beats. */
export const Letterbox: React.FC<{h?: number}> = ({h = 70}) => (
  <AbsoluteFill style={{pointerEvents: 'none'}}>
    <div style={{position: 'absolute', top: 0, left: 0, right: 0, height: h, background: '#000'}} />
    <div style={{position: 'absolute', bottom: 0, left: 0, right: 0, height: h, background: '#000'}} />
  </AbsoluteFill>
);
/** Collectible "trading card" (Kok Bisa black-market items floating around a globe). Ring of cards orbit slowly. */
export const TradingCard: React.FC<{title: string; children?: React.ReactNode; color?: string; w?: number; h?: number}> = ({title, children, color = '#E9605F', w = 190, h = 250}) => (
  <div style={{width: w, height: h, background: color, borderRadius: 18, border: '4px solid rgba(0,0,0,0.5)', padding: 12, boxSizing: 'border-box', fontFamily: SANS, color: '#fff'}}>
    <div style={{fontSize: 16, fontWeight: 700, opacity: 0.9}}>{title}</div>
    <div style={{marginTop: 8, height: h - 90, background: 'rgba(255,255,255,0.18)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{children}</div>
  </div>
);
export const OrbitCards: React.FC<{cards: React.ReactNode[]; radius?: number; cx?: number; cy?: number; at?: number}> = ({cards, radius = 520, cx = 960, cy = 620, at = 0}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      {cards.map((c, i) => {
        const a = (i / cards.length) * Math.PI * 2 + f * 0.004 - Math.PI / 2;
        return <PopIn key={i} at={at + i * 5} style={{left: cx + Math.cos(a) * radius * 1.3 - 95, top: cy + Math.sin(a) * radius * 0.55 - 125, transform: `rotate(${Math.sin(a) * 8}deg)`}}>{c}</PopIn>;
      })}
    </AbsoluteFill>
  );
};
/** Real-photo/illustration cutout with thick white outline (Antidote author portrait on purple). */
export const OutlinedCutout: React.FC<{src: string; h?: number; at?: number; style?: React.CSSProperties}> = ({src, h = 700, at = 0, style}) => (
  <PopIn at={at} style={style}>
    <img src={src} style={{height: h, filter: 'drop-shadow(0 0 0 #fff) drop-shadow(8px 0 0 #fff) drop-shadow(-8px 0 0 #fff) drop-shadow(0 8px 0 #fff) drop-shadow(0 -8px 0 #fff)'}} />
  </PopIn>
);
/** Rounded step card with checkmark rows ("When something is visible, it gets done."). */
export const CheckCard: React.FC<{lines: string[]; at?: number; color?: string; ink?: string; w?: number; style?: React.CSSProperties}> = ({lines, at = 0, color = '#6C2BD9', ink = '#fff', w = 520, style}) => (
  <div style={{display: 'flex', flexDirection: 'column', gap: 22, ...style}}>
    {lines.map((l, i) => (
      <PopIn key={i} at={at + i * 12} style={{position: 'relative'}}>
        <div style={{width: w, background: color, color: ink, fontFamily: SANS, fontWeight: 700, fontSize: 38, padding: '22px 30px 22px 76px', borderRadius: 26, border: '4px solid rgba(255,255,255,0.35)', position: 'relative'}}>
          <span style={{position: 'absolute', left: 24, top: 18, color: '#7CFF9A', fontSize: 40}}>✔</span>{l}
        </div>
      </PopIn>
    ))}
  </div>
);
/** Numbered step with arrows (Cue 1 -> Craving -> ...). */
export const StepFlow: React.FC<{steps: {title: string; node: React.ReactNode}[]; at?: number; gap?: number}> = ({steps, at = 0, gap = 90}) => (
  <div style={{display: 'flex', alignItems: 'center', gap}}>
    {steps.map((s, i) => (
      <React.Fragment key={i}>
        <PopIn at={at + i * 14} style={{position: 'relative'}}>
          <div style={{textAlign: 'center', fontFamily: SANS, fontWeight: 800, color: '#fff'}}><div style={{fontSize: 30, marginBottom: 8}}>{s.title}</div>{s.node}</div>
        </PopIn>
        {i < steps.length - 1 && <PopIn at={at + i * 14 + 7} style={{position: 'relative'}}><div style={{fontSize: 64, color: '#FFD23F'}}>➜</div></PopIn>}
      </React.Fragment>
    ))}
  </div>
);
/** Pink/colour ellipse stage under characters (Antidote). */
export const Stage: React.FC<{color?: string; w?: number; at?: number; style?: React.CSSProperties}> = ({color = '#EE5F8E', w = 1100, at = 0, style}) => (
  <PopIn at={at} origin="50% 50%" style={style}><div style={{width: w, height: w * 0.22, borderRadius: '50%', background: color, border: '6px solid rgba(0,0,0,0.5)'}} /></PopIn>
);
/** Word-by-word subtitle (Kok Bisa types in as spoken). words[i] appears at wordFrames[i]. */
export const TypeSubtitle: React.FC<{words: string[]; wordFrames: number[]}> = ({words, wordFrames}) => {
  const f = useCurrentFrame();
  const shown = words.filter((_, i) => f >= wordFrames[i]).join(' ');
  return shown ? <Subtitle text={shown} /> : null;
};
/** Small source/citation line under the subtitle (Kok Bisa cites WHO/UNODC on screen). */
export const SourceLine: React.FC<{text: string; at?: number}> = ({text, at = 0}) => {
  const f = useCurrentFrame();
  return <div style={{position: 'absolute', left: 80, right: 80, bottom: 12, textAlign: 'center', fontFamily: SANS, fontSize: 22, color: 'rgba(255,255,255,0.7)', opacity: f >= at ? 1 : 0}}>{text}</div>;
};
/** Crowd/row of identical silhouettes with one highlighted (Kok Bisa "1 of 10"). */
export const CrowdRow: React.FC<{n?: number; hi?: number; at?: number; base?: string; hiColor?: string}> = ({n = 11, hi = 6, at = 0, base = '#5B2A2A', hiColor = '#121212'}) => (
  <div style={{display: 'flex', gap: 28, justifyContent: 'center'}}>
    {Array.from({length: n}).map((_, i) => (
      <PopIn key={i} at={at + i * 3} style={{position: 'relative'}}>
        <div style={{width: 70, height: 150, borderRadius: '40px 40px 14px 14px', background: i === hi ? hiColor : base}} />
      </PopIn>
    ))}
  </div>
);

// ======================================================================
// ADDITIONS (round 3, from frame-accurate analysis of the 5 reference videos)
// ======================================================================
export const BRAND = {kbRed: '#FC4045', anPink: '#B73058', anInk: '#101010', anPlum: '#160032', anCream: '#EBD8C8', anYellow: '#F5C842', anTeal: '#50D0D0', moneyGreen: '#2FB432', moneyDark: '#0F2A2D'};

/** Kok Bisa logo sting: brand-colour circles burst from random points and flood the frame in ~14 frames (24 fps), then logo draws as outline -> fills. Put at section starts or after the cold open. */
export const CircleBurstWipe: React.FC<{color?: string; dur?: number; n?: number; seed?: string}> = ({color = BRAND.kbRed, dur = 14, n = 7, seed = 'burst'}) => {
  const f = useCurrentFrame();
  const t = Math.min(1, f / dur);
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {Array.from({length: n}).map((_, i) => {
        const cx = random(`${seed}x${i}`) * 1920, cy = random(`${seed}y${i}`) * 1080;
        const delay = random(`${seed}d${i}`) * 0.45;
        const r = Math.max(0, (t - delay) / (1 - delay)) * (900 + random(`${seed}r${i}`) * 700);
        return <div key={i} style={{position: 'absolute', left: cx - r, top: cy - r, width: r * 2, height: r * 2, borderRadius: '50%', background: color}} />;
      })}
    </AbsoluteFill>
  );
};
/** Logo text that draws as an outline over ~1.2 s and then fills (Kok Bisa sting). */
export const StrokeLogo: React.FC<{text: string; at?: number; color?: string; size?: number; drawFrames?: number; fillFrames?: number}> = ({text, at = 0, color = '#fff', size = 220, drawFrames = 28, fillFrames = 14}) => {
  const f = useCurrentFrame();
  const draw = interpolate(f, [at, at + drawFrames], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const fill = interpolate(f, [at + drawFrames, at + drawFrames + fillFrames], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
      <svg width={1200} height={400} viewBox="0 0 1200 400">
        <text x="600" y="250" textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={size} fill={color} fillOpacity={fill} stroke={color} strokeWidth={4} strokeDasharray={2400} strokeDashoffset={2400 * (1 - draw)}>{text}</text>
      </svg>
    </AbsoluteFill>
  );
};
/** Slow 2.5D pull-back reveal: a framed object shrinks while the room around it (gallery wall of copies) is revealed. */
export const PullBackReveal: React.FC<{dur?: number; wall: React.ReactNode; children: React.ReactNode}> = ({dur = 60, wall, children}) => {
  const f = useCurrentFrame();
  const t = ease(Math.min(1, f / dur));
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{transform: `scale(${interpolate(t, [0, 1], [1.6, 1])})`, opacity: interpolate(t, [0, 0.4, 1], [0, 0.6, 1])}}>{wall}</AbsoluteFill>
      <AbsoluteFill style={{transform: `scale(${interpolate(t, [0, 1], [2.2, 0.55])}) translate(${interpolate(t, [0, 1], [0, -260])}px, ${interpolate(t, [0, 1], [0, -120])}px)`, alignItems: 'center', justifyContent: 'center', display: 'flex'}}>{children}</AbsoluteFill>
    </AbsoluteFill>
  );
};
/** Crowd build-up: rows of small icons fade/pop in from the bottom row up, background tinting warmer as the count grows (Kok Bisa coffee cups). */
export const CrowdBuildUp: React.FC<{rows?: number; cols?: number; at?: number; stepFrames?: number; icon: React.ReactNode; tint?: string}> = ({rows = 5, cols = 16, at = 0, stepFrames = 8, icon, tint = 'rgba(160,60,40,0.35)'}) => {
  const f = useCurrentFrame();
  const shown = Math.max(0, Math.floor((f - at) / stepFrames) + 1);
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <AbsoluteFill style={{background: tint, opacity: Math.min(1, shown / rows)}} />
      {Array.from({length: rows}).map((_, r) => (
        <div key={r} style={{position: 'absolute', left: 0, right: 0, bottom: 10 + r * 70, display: 'flex', justifyContent: 'center', gap: 26, opacity: r < shown ? 0.55 - r * 0.06 : 0, transform: `scale(${r < shown ? 1 : 0.6})`}}>
          {Array.from({length: cols - r}).map((_, c) => <div key={c}>{icon}</div>)}
        </div>
      ))}
    </AbsoluteFill>
  );
};
/** Radial sunburst behind a hero object (Kok Bisa adenosine/impact beats). */
export const Sunburst: React.FC<{c1?: string; c2?: string; rays?: number; spin?: number}> = ({c1 = '#FF8F7A', c2 = '#FF6B5E', rays = 24, spin = 0.15}) => {
  const f = useCurrentFrame();
  const step = 360 / rays;
  const grad = Array.from({length: rays}).map((_, i) => `${i % 2 ? c1 : c2} ${i * step}deg ${(i + 1) * step}deg`).join(',');
  return <AbsoluteFill style={{background: `conic-gradient(from ${f * spin}deg at 50% 50%, ${grad})`}} />;
};
/** Picture-in-picture rounded frame holding an inset scene + progress meter below (Kok Bisa "METER ADENOSIN"). */
export const PipMeter: React.FC<{label: string; value: number; at?: number; w?: number; h?: number; children?: React.ReactNode; color?: string}> = ({label, value, at = 0, w = 760, h = 420, children, color = '#7B3FE4'}) => {
  const f = useCurrentFrame();
  const v = interpolate(f, [at + 8, at + 40], [0, value], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <PopIn at={at} style={{left: 960 - w / 2, top: 180}}>
      <div style={{width: w, background: '#fff', borderRadius: 26, padding: 14, boxShadow: '0 12px 0 rgba(0,0,0,0.18)'}}>
        <div style={{height: h, borderRadius: 16, overflow: 'hidden', position: 'relative'}}>{children}</div>
        <div style={{marginTop: 12, fontFamily: SANS, fontWeight: 800, fontSize: 28, color: '#fff', background: '#E84B5A', display: 'inline-block', padding: '4px 18px', borderRadius: 6}}>{label}</div>
        <div style={{height: 22, borderRadius: 11, background: '#ddd', marginTop: 10, overflow: 'hidden'}}><div style={{width: `${v}%`, height: '100%', background: color}} /></div>
      </div>
    </PopIn>
  );
};
/** Person/name tag: red name + black sublabel (Kok Bisa interview-style lower-third). */
export const NameTag: React.FC<{name: string; role: string; at?: number; style?: React.CSSProperties}> = ({name, role, at = 0, style}) => (
  <SlideIn at={at} from="left" dist={400} style={style}>
    <div style={{fontFamily: SANS}}>
      <div style={{background: '#E84B5A', color: '#fff', fontWeight: 800, fontSize: 44, padding: '8px 26px', borderRadius: 8, display: 'inline-block'}}>{name}</div>
      <div style={{background: '#111', color: '#fff', fontWeight: 500, fontSize: 24, padding: '4px 20px', borderRadius: 6, marginLeft: 22, marginTop: 4, display: 'inline-block'}}>{role}</div>
    </div>
  </SlideIn>
);
/** Yellow sticky note with handwritten line(s) (Antidote "I am a writer"). */
export const StickyNote: React.FC<{text: string; at?: number; rot?: number; color?: string; size?: number; style?: React.CSSProperties}> = ({text, at = 0, rot = -4, color = '#FFE08A', size = 54, style}) => (
  <PopIn at={at} style={{...style}}>
    <div style={{transform: `rotate(${rot}deg)`, background: color, color: '#2A1A00', fontFamily: HAND, fontWeight: 700, fontSize: size, padding: '22px 34px', boxShadow: '8px 10px 0 rgba(0,0,0,0.25)', maxWidth: 520}}>{text}</div>
  </PopIn>
);
/** Highlight tag: handwritten keyword on yellow strip (Antidote keyword emphasis). */
export const KeyTag: React.FC<{text: string; at?: number; bg?: string; color?: string; size?: number; style?: React.CSSProperties}> = ({text, at = 0, bg = '#F5C842', color = '#2A1A00', size = 54, style}) => (
  <PopIn at={at} origin="0% 50%" style={style}><div style={{background: bg, color, fontFamily: HAND, fontWeight: 700, fontSize: size, padding: '4px 22px', display: 'inline-block'}}>{text}</div></PopIn>
);
/** 2x2 quadrant diagram with cross lines drawn on and 4 labelled cells (Antidote cue/craving/response/reward). */
export const Quadrant: React.FC<{cells: {label: string; node?: React.ReactNode}[]; at?: number; w?: number; h?: number}> = ({cells, at = 0, w = 1100, h = 760}) => {
  const f = useCurrentFrame();
  const l = interpolate(f, [at, at + 14], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const pos = [{left: 0, top: 0}, {left: w / 2, top: 0}, {left: 0, top: h / 2}, {left: w / 2, top: h / 2}];
  return (
    <div style={{position: 'relative', width: w, height: h}}>
      <div style={{position: 'absolute', left: w / 2 - 2, top: 0, width: 4, height: h * l, background: '#fff'}} />
      <div style={{position: 'absolute', top: h / 2 - 2, left: 0, height: 4, width: w * l, background: '#fff'}} />
      {cells.slice(0, 4).map((c, i) => (
        <PopIn key={i} at={at + 14 + i * 10} style={{...pos[i], width: w / 2, height: h / 2}}>
          <div style={{width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: HAND, fontSize: 54, fontWeight: 700}}>{c.label}{c.node}</div>
        </PopIn>
      ))}
    </div>
  );
};
/** Balance scale where two labelled pans tip (Antidote choice vs identity). tilt: -1..1 */
export const Scale: React.FC<{left: string; right: string; tilt?: number; at?: number}> = ({left, right, tilt = 0.5, at = 0}) => {
  const f = useCurrentFrame();
  const a = interpolate(f, [at, at + 24], [0, tilt * 14], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <PopIn at={at} origin="50% 100%" style={{left: 560, top: 260}}>
      <div style={{width: 800, height: 520, position: 'relative', fontFamily: HAND, fontWeight: 700, fontSize: 56, color: '#fff'}}>
        <div style={{position: 'absolute', left: 390, top: 120, width: 20, height: 400, background: '#7B3FE4', borderRadius: 10}} />
        <div style={{position: 'absolute', left: 0, top: 90, width: 800, height: 12, background: '#E8E8E8', transform: `rotate(${a}deg)`, transformOrigin: '50% 50%', borderRadius: 6}}>
          <div style={{position: 'absolute', left: -10, top: 18, width: 220, textAlign: 'center', transform: `rotate(${-a}deg)`}}>{left}</div>
          <div style={{position: 'absolute', right: -10, top: 18, width: 220, textAlign: 'center', transform: `rotate(${-a}deg)`}}>{right}</div>
        </div>
      </div>
    </PopIn>
  );
};
/** Isometric extruded block for scale comparisons (Kok Bisa $1B stack vs $100M). Height animates up. */
export const IsoBlock: React.FC<{w?: number; d?: number; h: number; at?: number; dur?: number; top?: string; left?: string; right?: string; label?: string; style?: React.CSSProperties}> = ({w = 160, d = 160, h, at = 0, dur = 24, top = '#9BF05A', left = '#4FCB2B', right = '#2FB432', label, style}) => {
  const f = useCurrentFrame();
  const cur = h * ease(interpolate(f, [at, at + dur], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}));
  return (
    <div style={{position: 'absolute', ...style}}>
      <div style={{position: 'relative', width: w + d, height: cur + d / 2 + 20}}>
        <div style={{position: 'absolute', left: 0, bottom: 0, width: w, height: cur, background: left, transform: 'skewY(30deg)', transformOrigin: 'bottom left'}} />
        <div style={{position: 'absolute', left: w, bottom: 0, width: d, height: cur, background: right, transform: 'skewY(-30deg)', transformOrigin: 'bottom left'}} />
        <div style={{position: 'absolute', left: 0, bottom: cur, width: w, height: d, background: top, transform: 'skewX(-60deg) scaleY(0.5)', transformOrigin: 'bottom left'}} />
        {label && <div style={{position: 'absolute', left: 0, right: 0, top: -50, textAlign: 'center', fontFamily: SANS, fontWeight: 800, fontSize: 40, color: '#fff'}}>{label}</div>}
      </div>
    </div>
  );
};
/** Medal grid: round portrait badges with name + sub-label (Kok Bisa top-8 richest). */
export const MedalGrid: React.FC<{items: {name: string; sub: string}[]; cols?: number; at?: number; ring?: string}> = ({items, cols = 4, at = 0, ring = '#E9B93A'}) => (
  <div style={{display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 40, justifyItems: 'center'}}>
    {items.map((it, i) => (
      <PopIn key={i} at={at + i * 6} style={{position: 'relative'}}>
        <div style={{textAlign: 'center', fontFamily: SANS, color: '#fff', width: 300}}>
          <div style={{width: 150, height: 150, borderRadius: '50%', border: `8px solid ${ring}`, background: '#6B4E12', margin: '0 auto'}} />
          <div style={{fontWeight: 800, fontSize: 26, marginTop: 10}}>{it.name.toUpperCase()}</div>
          <div style={{fontSize: 20, opacity: 0.8}}>{it.sub}</div>
        </div>
      </PopIn>
    ))}
  </div>
);
/** Source caption bottom-left, small (Kok Bisa "Sumber: ..."). */
export const SourceCaption: React.FC<{text: string; at?: number}> = ({text, at = 0}) => {
  const f = useCurrentFrame();
  return <div style={{position: 'absolute', left: 40, bottom: 28, fontFamily: SANS, fontSize: 22, color: 'rgba(255,255,255,0.85)', opacity: f >= at ? 1 : 0}}>Source: {text}</div>;
};
