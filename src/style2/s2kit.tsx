// Style 2 kit (rule 1.43): camera, transitions, text and backgrounds modelled on the reference video
// ("How Are Americans Buying $80,000 Trucks on a $70,000 Salary?", see docs video04_animation_teardown.md).
// Only the techniques are taken; every drawing here is our own. Characters/props stay Penny Logics style.
import React from 'react';
import {AbsoluteFill, Html5Audio, Img, interpolate, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {SANS} from '../style/style_kit';

export const W = 1920;
export const H = 1080;
export const INK = '#191411';
const C = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
export const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

// ---------- SFX (same set as Style 1) ----------
const SFX = {pop: 'sfx/pop.wav', whoosh: 'sfx/whoosh.wav', kaching: 'sfx/kaching.wav', ding: 'sfx/ding.wav', boom: 'sfx/boom.wav', notify: 'sfx/notify.wav', paper_rip: 'sfx/paper_rip.wav', card_tap: 'sfx/card_tap.wav'} as const;
const SFX_VOL: Record<keyof typeof SFX, number> = {pop: 0.32, whoosh: 0.3, kaching: 0.5, ding: 0.4, boom: 0.45, notify: 0.4, paper_rip: 0.4, card_tap: 0.4};
export type SfxName = keyof typeof SFX;
export const Sfx: React.FC<{name: SfxName; at: number}> = ({name, at}) => (
  <Sequence from={Math.max(0, Math.round(at))} durationInFrames={48} layout="none">
    <Html5Audio src={staticFile(SFX[name])} volume={SFX_VOL[name]} />
  </Sequence>
);

// ---------- camera ----------
/** A camera key: at local frame `t` the camera looks at world point (x, y) with zoom z. */
export type Key = {t: number; x: number; y: number; z: number; dur?: number};
/**
 * Camera state at frame f. Moves between keys with ease in-out (`dur` frames, ending at `t`).
 * `drift` = continuous zoom-out per second (Style 2 base move). It never resets inside a scene.
 */
export const camAt = (f: number, keys: Key[], fps: number, drift = 0.04) => {
  let s = {x: keys[0].x, y: keys[0].y, z: keys[0].z};
  for (let i = 1; i < keys.length; i++) {
    const k = keys[i];
    const d = k.dur ?? 24;
    const st = k.t - d;
    if (f <= st) break;
    const e = ease(Math.min(1, (f - st) / d));
    s = {x: lerp(s.x, k.x, e), y: lerp(s.y, k.y, e), z: Math.exp(lerp(Math.log(s.z), Math.log(k.z), e))};
    if (f < k.t) break;
  }
  return {...s, z: s.z * Math.exp(-drift * (f / fps))};
};
/** Renders a world (any size) through the camera. Children use world coordinates. */
export const Cam: React.FC<{keys: Key[]; drift?: number; children: React.ReactNode; bg?: string}> = ({keys, drift = 0.04, children, bg}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const c = camAt(f, keys, fps, drift);
  return (
    <AbsoluteFill style={{background: bg, overflow: 'hidden'}}>
      <div style={{position: 'absolute', left: 0, top: 0, transformOrigin: '0 0', transform: `translate(${W / 2 - c.x * c.z}px, ${H / 2 - c.y * c.z}px) scale(${c.z})`}}>{children}</div>
    </AbsoluteFill>
  );
};
/** Parallax layer inside a Cam: moves at `k` times the camera (k<1 = far away). Uses the same keys. */
export const Parallax: React.FC<{keys: Key[]; k: number; drift?: number; children: React.ReactNode}> = ({keys, k, drift = 0.04, children}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const c = camAt(f, keys, fps, drift);
  return <div style={{position: 'absolute', left: 0, top: 0, transform: `translate(${c.x * (1 - k)}px, 0px)`}}>{children}</div>;
};

// ---------- transitions (A -> B, no fades: rule 1.29) ----------
export type WipeKind = 'splat' | 'swirl' | 'shatter' | 'puff';
/** One wipe frame: t = 0..1 progress, a = outgoing scene, b = incoming scene (both already timed). */
export const WipeFx: React.FC<{kind: WipeKind; t: number; a: React.ReactNode; b: React.ReactNode; cx?: number; cy?: number; color?: string; id: string}> = ({kind, t, a, b, cx = W / 2, cy = H / 2, color = '#FFFFFF', id}) => {
  const A = a;
  const B = b;
  if (kind === 'splat') {
    // irregular paint blobs grow from the point until they cover the frame; B shows inside them
    const blobs = Array.from({length: 14}, (_, i) => {
      const ang = (i / 14) * Math.PI * 2 + (i % 3) * 0.4;
      const dist = (i % 2 ? 220 : 120) + (i % 5) * 40;
      const r = (90 + (i % 4) * 50) * Math.pow(ease(t), 0.8) * 9;
      return {x: cx + Math.cos(ang) * dist * ease(t) * 2, y: cy + Math.sin(ang) * dist * ease(t) * 2, r};
    });
    const drops = Array.from({length: 18}, (_, i) => ({x: cx + Math.cos(i * 2.4) * (300 + i * 40) * ease(t), y: cy + Math.sin(i * 2.4) * (200 + i * 30) * ease(t), r: (10 + (i % 4) * 8) * (1 + 3 * t)}));
    return (
      <AbsoluteFill>
        {A}
        <svg width={W} height={H} style={{position: 'absolute'}}><defs><clipPath id={id}>{[...blobs, ...drops].map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={p.r} />)}<circle cx={cx} cy={cy} r={2400 * Math.max(0, t - 0.55) * 2.2} /></clipPath></defs></svg>
        <AbsoluteFill style={{clipPath: `url(#${id})`}}>{B}</AbsoluteFill>
      </AbsoluteFill>
    );
  }
  if (kind === 'swirl') {
    // A spins into a vortex and shrinks; B spins out of the centre; swirl strokes ride on top
    const e = ease(t);
    const sA = interpolate(t, [0, 0.55], [1, 0.05], C);
    const rA = interpolate(t, [0, 0.55], [0, 260], C);
    const sB = interpolate(t, [0.35, 1], [0.05, 1], C);
    const rB = interpolate(t, [0.35, 1], [-260, 0], C);
    const arms = [0, 120, 240];
    return (
      <AbsoluteFill style={{background: color}}>
        {t < 0.55 && <AbsoluteFill style={{transform: `rotate(${rA}deg) scale(${sA})`, transformOrigin: `${cx}px ${cy}px`, borderRadius: `${50 * Math.min(1, t * 3)}%`, overflow: 'hidden'}}>{A}</AbsoluteFill>}
        {t >= 0.35 && <AbsoluteFill style={{transform: `rotate(${rB}deg) scale(${sB})`, transformOrigin: `${cx}px ${cy}px`, borderRadius: `${50 * (1 - Math.min(1, (t - 0.35) * 2))}%`, overflow: 'hidden'}}>{B}</AbsoluteFill>}
        <svg width={W} height={H} style={{position: 'absolute', opacity: Math.sin(Math.PI * t)}}>
          {arms.map((a0, i) => {
            const pts = Array.from({length: 40}, (_, j) => {
              const u = j / 39;
              const ang = ((a0 + e * 540 + u * 300) * Math.PI) / 180;
              const rr = 40 + u * 1300 * Math.sin(Math.PI * t);
              return `${cx + Math.cos(ang) * rr},${cy + Math.sin(ang) * rr}`;
            });
            return <polyline key={i} points={pts.join(' ')} fill="none" stroke={i === 1 ? INK : '#ffffff'} strokeOpacity={i === 1 ? 0.35 : 0.85} strokeWidth={70 - i * 18} strokeLinecap="round" />;
          })}
        </svg>
      </AbsoluteFill>
    );
  }
  if (kind === 'shatter') {
    // A cracks into shards that fly off and fall; B is underneath
    const shards = shardPolys(cx, cy);
    return (
      <AbsoluteFill>
        {B}
        {shards.map((poly, i) => {
          const c0 = centroid(poly);
          const dx = (c0[0] - cx) / 6, dy = (c0[1] - cy) / 6;
          const tt = Math.max(0, t - (i % 4) * 0.04) / 0.84;
          const e = Math.min(1, tt);
          const tx = dx * e * 3, ty = dy * e * 3 + 900 * e * e;
          const rot = (i % 2 ? 1 : -1) * 70 * e;
          return (
            <AbsoluteFill key={i} style={{clipPath: `polygon(${poly.map((p) => `${p[0]}px ${p[1]}px`).join(',')})`, transform: `translate(${tx}px, ${ty}px) rotate(${rot}deg)`, transformOrigin: `${c0[0]}px ${c0[1]}px`}}>
              {A}
              <svg width={W} height={H} style={{position: 'absolute'}}><polygon points={poly.map((p) => p.join(',')).join(' ')} fill="none" stroke="#ffffff" strokeOpacity={0.8} strokeWidth={6} /></svg>
            </AbsoluteFill>
          );
        })}
      </AbsoluteFill>
    );
  }
  // puff: cloud balls burst to cover the frame, then pop away to show B
  const grow = t < 0.5 ? ease(t * 2) : 1 - ease((t - 0.5) * 2);
  const balls = Array.from({length: 16}, (_, i) => ({x: cx + Math.cos(i * 1.7) * (160 + (i % 3) * 140), y: cy + Math.sin(i * 1.7) * (110 + (i % 4) * 90), r: (260 + (i % 5) * 60) * grow * 2.3}));
  return (
    <AbsoluteFill>
      {t < 0.5 ? A : B}
      <svg width={W} height={H} style={{position: 'absolute'}}>
        {balls.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={p.r + 14} fill="#BFE3F5" />)}
        {balls.map((p, i) => <circle key={`w${i}`} cx={p.x} cy={p.y} r={p.r} fill="#FFFFFF" />)}
      </svg>
    </AbsoluteFill>
  );
};
const centroid = (p: number[][]) => [p.reduce((s, q) => s + q[0], 0) / p.length, p.reduce((s, q) => s + q[1], 0) / p.length];
const shardPolys = (cx: number, cy: number) => {
  // rays from the impact point to the frame border make triangle-ish shards
  const border: number[][] = [];
  const n = 14;
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + 0.2 * Math.sin(i * 3.1);
    const dx = Math.cos(a), dy = Math.sin(a);
    const k = Math.min(dx > 0 ? (W + 40 - cx) / dx : dx < 0 ? (-40 - cx) / dx : 1e9, dy > 0 ? (H + 40 - cy) / dy : dy < 0 ? (-40 - cy) / dy : 1e9);
    border.push([cx + dx * k, cy + dy * k]);
  }
  const polys: number[][][] = [];
  for (let i = 0; i < n; i++) {
    const p1 = border[i], p2 = border[(i + 1) % n];
    const mid1 = [lerp(cx, p1[0], 0.42), lerp(cy, p1[1], 0.42)], mid2 = [lerp(cx, p2[0], 0.42), lerp(cy, p2[1], 0.42)];
    polys.push([[cx, cy], mid1, mid2]);
    // outer piece: include the frame corner between p1 and p2 if needed
    const out = [mid1, p1];
    const corners = [[-40, -40], [W + 40, -40], [W + 40, H + 40], [-40, H + 40]];
    const a1 = Math.atan2(p1[1] - cy, p1[0] - cx), a2 = Math.atan2(p2[1] - cy, p2[0] - cx);
    const inArc = (a: number) => {
      let d = a - a1; while (d < 0) d += Math.PI * 2;
      let span = a2 - a1; while (span < 0) span += Math.PI * 2;
      return d > 0 && d < span;
    };
    corners.forEach((q) => { if (inArc(Math.atan2(q[1] - cy, q[0] - cx))) out.push(q); });
    out.push(p2, mid2);
    polys.push(out);
  }
  return polys;
};

// ---------- text ----------
const pop = (f: number, at: number, fps: number) => spring({frame: f - at, fps, config: {damping: 11, stiffness: 160, mass: 0.7}});
/** White pill, black bold caps (reference style). */
export const Pill2: React.FC<{text: React.ReactNode; at: number; x: number; y: number; size?: number; bg?: string; color?: string; anchor?: 'center' | 'left'}> = ({text, at, x, y, size = 58, bg = '#FFFFFF', color = INK, anchor = 'center'}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  if (f < at) return null;
  const s = pop(f, at, fps);
  return (
    <div style={{position: 'absolute', left: x, top: y, transform: `translate(${anchor === 'center' ? '-50%' : '0'}, -50%) scale(${s})`, transformOrigin: anchor === 'center' ? '50% 50%' : '0% 50%', background: bg, color, fontFamily: SANS, fontWeight: 800, fontSize: size, padding: `${size * 0.22}px ${size * 0.5}px`, borderRadius: size * 0.28, whiteSpace: 'nowrap', boxShadow: '0 10px 24px rgba(0,0,0,0.28)', textTransform: 'uppercase', letterSpacing: 0.5}}>{text}</div>
  );
};
/** Letters drop in one by one and bounce (reference 2:13). */
export const LetterBounce: React.FC<{text: string; at: number; x: number; y: number; size?: number; color?: string; gap?: number}> = ({text, at, x, y, size = 120, color = '#FFFFFF', gap = 2}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const chars = text.split('');
  return (
    <div style={{position: 'absolute', left: x, top: y, transform: 'translate(-50%, -50%)', fontFamily: SANS, fontWeight: 900, fontSize: size, color, whiteSpace: 'nowrap', textShadow: '0 8px 0 rgba(0,0,0,0.35)', display: 'flex'}}>
      {chars.map((ch, i) => {
        const t0 = at + i * gap;
        if (f < t0) return <span key={i} style={{opacity: 0}}>{ch === ' ' ? ' ' : ch}</span>;
        const s = spring({frame: f - t0, fps, config: {damping: 9, stiffness: 220, mass: 0.6}});
        return <span key={i} style={{display: 'inline-block', transform: `translateY(${(1 - s) * -90}px) rotate(${(1 - s) * (i % 2 ? 18 : -18)}deg) scale(${0.6 + 0.4 * s})`}}>{ch === ' ' ? ' ' : ch}</span>;
      })}
    </div>
  );
};
/** Context chip top-left ("LOCATION: Texas", "DATE: 2024"). */
export const Chip2: React.FC<{label: string; value: string; icon: 'pin' | 'cal'; at: number; x?: number; y?: number}> = ({label, value, icon, at, x = 40, y = 40}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  if (f < at) return null;
  const s = pop(f, at, fps);
  return (
    <div style={{position: 'absolute', left: x, top: y, transform: `translateX(${(1 - s) * -60}px)`, background: '#FFFFFF', borderRadius: 12, padding: '10px 22px 10px 14px', display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 6px 16px rgba(0,0,0,0.22)', fontFamily: SANS}}>
      {icon === 'pin' ? (
        <svg width={40} height={46} viewBox="0 0 40 46"><path d="M20 44 C20 44 4 26 4 16 A16 16 0 0 1 36 16 C36 26 20 44 20 44Z" fill="#E5484D" /><circle cx={20} cy={16} r={6} fill="#fff" /></svg>
      ) : (
        <svg width={42} height={42} viewBox="0 0 42 42"><rect x={3} y={7} width={36} height={32} rx={5} fill="#F5A524" /><rect x={3} y={7} width={36} height={10} rx={4} fill="#E08A00" /><rect x={10} y={2} width={4} height={10} rx={2} fill={INK} /><rect x={28} y={2} width={4} height={10} rx={2} fill={INK} /></svg>
      )}
      <div style={{lineHeight: 1.05}}>
        <div style={{fontSize: 20, fontWeight: 600, color: '#555'}}>{label}</div>
        <div style={{fontSize: 34, fontWeight: 700, color: INK}}>{value}</div>
      </div>
    </div>
  );
};
/** Source tag at the bottom centre (rule 1.10). */
export const Src2: React.FC<{text: string; at: number}> = ({text, at}) => {
  const f = useCurrentFrame();
  if (f < at) return null;
  return (
    <div style={{position: 'absolute', left: W / 2, bottom: 34, transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: 10, fontFamily: SANS, fontSize: 18}}>
      <span style={{color: '#fff', fontWeight: 800, textShadow: '0 2px 4px rgba(0,0,0,0.6)'}}>FACT SOURCE:</span>
      <span style={{background: '#fff', color: INK, fontWeight: 600, padding: '3px 12px', borderRadius: 4}}>{text}</span>
    </div>
  );
};
/** Number that counts up. */
export const Count: React.FC<{to: number; at: number; dur?: number; prefix?: string; suffix?: string; decimals?: number}> = ({to, at, dur = 24, prefix = '', suffix = '', decimals = 0}) => {
  const f = useCurrentFrame();
  const v = to * ease(interpolate(f, [at, at + dur], [0, 1], C));
  return <>{prefix}{v.toLocaleString('en-US', {minimumFractionDigits: decimals, maximumFractionDigits: decimals})}{suffix}</>;
};
export const Popped: React.FC<{at: number; x: number; y: number; children: React.ReactNode; origin?: string}> = ({at, x, y, children, origin = '50% 100%'}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  if (f < at) return null;
  return <div style={{position: 'absolute', left: x, top: y, transform: `scale(${pop(f, at, fps)})`, transformOrigin: origin}}>{children}</div>;
};

// ---------- backgrounds (Style 2: flat, soft gradients, no outlines; placeholders until Gemini art) ----------
export const PatternCard: React.FC<{base: string; light: string}> = ({base, light}) => (
  <AbsoluteFill style={{background: base}}>
    <svg width={W} height={H} style={{position: 'absolute'}}>
      {[-600, 0, 600, 1200, 1800].map((x0, i) => (
        <rect key={i} x={x0} y={-400} width={380} height={2200} rx={190} fill={light} transform={`rotate(32 ${x0} 0)`} />
      ))}
    </svg>
  </AbsoluteFill>
);
export const Cloud: React.FC<{x: number; y: number; s?: number}> = ({x, y, s = 1}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={40} rx={210} ry={60} fill="#F3E9F4" />
    <circle cx={-90} cy={10} r={80} fill="#FFFFFF" /><circle cx={10} cy={-30} r={110} fill="#FFFFFF" /><circle cx={120} cy={15} r={75} fill="#FFFFFF" />
    <ellipse cx={20} cy={50} rx={220} ry={45} fill="#FFFFFF" />
  </g>
);

// ---------- Penny-style props drawn in code (outline #191411) ----------
export const Car: React.FC<{color: string; w?: number; tag?: string; tagColor?: string; flip?: boolean}> = ({color, w = 520, tag, tagColor = '#FFFFFF', flip}) => {
  const h = w * 0.42;
  return (
    <svg width={w} height={h} viewBox="0 0 520 220" style={{overflow: 'visible', transform: flip ? 'scaleX(-1)' : undefined}}>
      <ellipse cx={260} cy={206} rx={240} ry={12} fill="rgba(0,0,0,0.18)" />
      <path d="M40 150 Q36 112 70 104 L150 96 Q190 44 250 40 L360 40 Q410 44 448 96 L486 104 Q508 110 506 150 L506 172 Q506 182 494 182 L52 182 Q40 182 40 170Z" fill={color} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      <path d="M170 98 Q200 58 250 56 L300 56 L300 98Z" fill="#CFE8F5" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      <path d="M318 56 L358 56 Q396 60 424 98 L318 98Z" fill="#CFE8F5" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      <rect x={478} y={116} width={24} height={14} rx={5} fill="#FFE08A" stroke={INK} strokeWidth={4} />
      {[132, 404].map((cx) => (
        <g key={cx}><circle cx={cx} cy={180} r={36} fill="#2A2A33" stroke={INK} strokeWidth={6} /><circle cx={cx} cy={180} r={15} fill="#E9E4DE" stroke={INK} strokeWidth={4} /></g>
      ))}
      {tag && (
        <g transform="translate(330 62)"><rect width={84} height={30} rx={5} fill={tagColor} stroke={INK} strokeWidth={4} /></g>
      )}
    </svg>
  );
};
/** Leo full body (existing art). */
export const Leo: React.FC<{pose: 'calm' | 'shocked' | 'happy' | 'thinking' | 'proud' | 'suspicious'; h: number; flip?: boolean}> = ({pose, h, flip}) => (
  <Img src={staticFile(`leofull/leofull_${pose}.png`)} style={{height: h, transform: flip ? 'scaleX(-1)' : undefined}} />
);

// ---------- timeline: scenes joined by wipes or straight camera joins ----------
export type Join = {kind: WipeKind | 'cut'; dur: number; cx?: number; cy?: number; color?: string};
export type SceneDef = {len: number; node: React.ReactNode};
/** Scenes play back to back; join i covers the last `dur` frames of scene i and the first `dur` of scene i+1. */
export const Timeline: React.FC<{scenes: SceneDef[]; joins: Join[]}> = ({scenes, joins}) => {
  const f = useCurrentFrame();
  const starts: number[] = [];
  let acc = 0;
  scenes.forEach((s, i) => { starts.push(acc); acc += s.len - (i < joins.length && joins[i].kind !== 'cut' ? joins[i].dur : 0); });
  const at = (i: number) => <Sequence from={starts[i]} layout="none">{scenes[i].node}</Sequence>;
  for (let i = 0; i < scenes.length; i++) {
    const end = starts[i] + scenes[i].len;
    const j = joins[i];
    if (j && j.kind !== 'cut' && f >= end - j.dur && f < end) {
      const t = (f - (end - j.dur)) / j.dur;
      return <WipeFx id={`j${i}`} kind={j.kind} t={t} a={at(i)} b={at(i + 1)} cx={j.cx} cy={j.cy} color={j.color} />;
    }
    if (f < end || i === scenes.length - 1) {
      if (f >= starts[i]) return <AbsoluteFill>{at(i)}</AbsoluteFill>;
    }
  }
  return null;
};
export const timelineLength = (scenes: SceneDef[], joins: Join[]) => scenes.reduce((s, x) => s + x.len, 0) - joins.reduce((s, j) => s + (j.kind === 'cut' ? 0 : j.dur), 0);
