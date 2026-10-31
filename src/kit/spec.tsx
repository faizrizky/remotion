// Declarative chapters: a chapter is DATA (camera keys + items), not hand-written JSX.
// A new video = timing.json + captions.json + a list of ChapterSpec. This keeps every new video short to write.
import React from 'react';
import {AbsoluteFill, Sequence, useCurrentFrame, interpolate} from 'remotion';
import {Bubble, HAND, Pill, PopIn, PALETTES, SANS, SlideIn, Sticker, StickyNote} from '../style/style_kit';
import {CoinFly, DashArrow, Disclaimer, Gauge, LeoBadge, PayCircle, PercentGrid, Person, Phone, PriceTag, Prop, Punch, Sfx, SfxName, Src, StatCard} from '../video02/v2kit';
import {Chip, Embers, PaperCard, RulerTimeline, WordPop} from '../video02/paper';
import {PaperTexture} from '../video02/fx';
import {At, Cam, Chapter, clamp, H, INK, makeAt, Pose, poseAtPure, resolveCamPure, W} from './core';
export type {Cam, Pose};
import {World} from './camera';
import {BgImage, BgStop, WorldBg} from './worldbg';
import {HandMark, MarkKind, StrikeReplace} from './annotate';
import {BarChart, BarDatum, LineChart, NumberWheel} from './numbers';
import {NotifStack} from './ui';
import {Boil, Hang, PathTraveler, StopMotion} from './motion';
import {TextMatchCut, EnterKind} from './transitions';
import type {IntroSpec} from './intro';
import {CountMoney, LeoFull, Ripple, Shadow, Tag, Bar} from './pieces';

// ---------------------------------------------------------------- types

type ItemProps = {
  prop: {src: string; h?: number; w?: number; flip?: boolean};
  leo: {heads: [At, string][]; h?: number; flip?: boolean};
  badge: {head: string; size?: number; ring?: string};
  person: {color?: string; h?: number};
  text: {text: string; size?: number; hand?: boolean; color?: string; w?: number; align?: 'left' | 'center' | 'right'; weight?: number};
  chip: {text: string; kind?: 'time' | 'warn' | 'label'; size?: number; rot?: number};
  pill: {text: string; bg?: string; color?: string; size?: number};
  tag: {text: string; bg?: string; color?: string; size?: number; rot?: number};
  bubble: {text: string; tail?: 'left' | 'right'; size?: number; w?: number};
  sticker: {top: string; main: string; sub?: string; palette?: string; w?: number};
  note: {text: string; color?: string; size?: number; rot?: number};
  stat: {to: number; prefix?: string; suffix?: string; label: string; w?: number; bg?: string};
  pct: {n: number; dot?: number; gap?: number; on?: string};
  price: {text: string; color?: string; size?: number; rot?: number};
  pay: {amount: string; label: string; size?: number; color?: string; paid?: boolean};
  gauge: {value: number; max: number; label: string; r?: number};
  bar: {h: number; w?: number; color: string; label: string; value: string};
  bars: {data: BarDatum[]; w?: number; h?: number; max?: number; prefix?: string; suffix?: string; stagger?: number};
  line: {series: number[][]; labels?: string[]; w?: number; h?: number; dur?: number; colors?: string[]; max?: number; prefix?: string; suffix?: string; showAll?: boolean};
  wheel: {to: number; from?: number; dur?: number; prefix?: string; suffix?: string; size?: number; color?: string};
  money: {to: number; dur?: number; prefix?: string; suffix?: string; size?: number; color?: string};
  strike: {from: string; to: string; swap?: At; size?: number; color?: string; newColor?: string; below?: boolean};
  mark: {kind: MarkKind; w?: number; h?: number; dx?: number; dy?: number; dur?: number; color?: string; width?: number};
  match: {a: string; b: string; swap: At; dur?: number; size?: number; color?: string; hand?: boolean};
  arrow: {x2: number; y2: number; color?: string; dur?: number};
  coins: {x2: number; y2: number; n?: number; gap?: number; label?: string; size?: number; dur?: number};
  ripple: {size?: number; color?: string};
  shadow: {w: number};
  card: {w: number; h: number; rot?: number; color?: string};
  phone: {h?: number; tilt?: number};
  notif: {items: {title: string; body?: string; at: At; color?: string; icon?: string}[]; w?: number; size?: number};
  ruler: {w: number; marks: {x: number; label?: string; at: At; tall?: boolean}[]};
  words: {words: string[]; gap?: number; size?: number; highlight?: number[]};
  path: {pts: [number, number][]; dur?: number; rotate?: boolean; trail?: number; src: string; h?: number};
  embers: {n?: number; color?: string};
  src: {text: string};
  disclaimer: {_?: never};
  punch: {text: string; size?: number; color?: string};
  custom: {render: (rel: (a: At) => number) => React.ReactNode};
};

export type ItemBase = {
  /** id: needed when the item is carried into the next chapter (enter.carry). */
  id?: string;
  at?: At;
  /** removed at this time (default: stays until the chapter ends; the camera simply moves away) */
  out?: At;
  x?: number;
  y?: number;
  /** carry / move keys: [time, x, y, scale?, rot?] */
  move?: Pose[];
  /** transform origin for move scale/rot, px from the item's top-left */
  ox?: number;
  oy?: number;
  z?: number;
  /** screen-space (does not move with the camera) */
  screen?: boolean;
  /** sound when it appears ('pop' by default for most types); false = silent */
  sfx?: SfxName | false;
  blur?: [At, number][];
  kids?: Item[];
  enter?: 'pop' | 'fade' | 'left' | 'right' | 'up' | 'none';
  exit?: 'fade' | 'toss' | 'drop' | 'none';
  boil?: boolean;
  /** ghost copies while moving */
  trail?: number;
  /** hangs from a pin and swings */
  hang?: boolean;
  /** stop-motion step (2 = on twos) */
  stop?: number;
  opacity?: number;
};
export type Item = {[K in keyof ItemProps]: ItemBase & {t: K} & ItemProps[K]}[keyof ItemProps];


export type ChapterSpec = {
  id: string;
  world?: {w: number; h: number};
  /** images = illustrated paper-diorama backdrop pieces (rule: every scene has one); stops = colour under/around them */
  bg?: {stops: BgStop[]; images?: BgImage[]; wash?: number; blur?: number; decor?: 'paper' | 'dots' | 'none'; ground?: number};
  cam: Cam[];
  shakes?: [At, number?, number?][];
  items: Item[];
  sfx?: [At, SfxName][];
  /** how this chapter arrives over the previous one (no hard cut). carry = id of the item that continues. */
  enter?: {kind: EnterKind; carry?: string; cx?: number; cy?: number};
  /** question intro scene played in the chapter's silent `pre` (Karhutla-style words + big "?") */
  intro?: IntroSpec;
  /** brand sting "Penny Logics" in this chapter's tail (after the hook) */
  sting?: boolean;
  /** paper texture overlay (off by default: the channel uses the flat cartoon look, not paper) */
  paper?: boolean;
  autoPop?: boolean;
  autoWhoosh?: boolean;
};

// ---------------------------------------------------------------- helpers
const SELF_ANIM = new Set<Item['t']>(['leo', 'badge', 'chip', 'tag', 'bubble', 'sticker', 'note', 'stat', 'pct', 'price', 'pay', 'gauge', 'bar', 'bars', 'line', 'strike', 'mark', 'match', 'arrow', 'coins', 'ripple', 'card', 'phone', 'notif', 'ruler', 'words', 'path', 'embers', 'custom', 'src', 'disclaimer', 'punch']);
const QUIET = new Set<Item['t']>(['shadow', 'arrow', 'mark', 'embers', 'ruler', 'src', 'disclaimer', 'custom', 'path', 'ripple', 'coins', 'words', 'notif']);
const SCREEN = new Set<Item['t']>(['src', 'disclaimer', 'punch', 'embers']);

export const resolveCam = resolveCamPure;
export const poseAt = poseAtPure as (it: Item, f: number, A: (a: At | undefined, d?: number) => number) => {x: number; y: number; s: number; r: number};

const lin = (f: number, keys: [number, number][]) => {
  if (!keys.length) return 0;
  if (f <= keys[0][0]) return keys[0][1];
  for (let i = 1; i < keys.length; i++) if (f <= keys[i][0]) return interpolate(f, [keys[i - 1][0], keys[i][0]], [keys[i - 1][1], keys[i][1]], clamp);
  return keys[keys.length - 1][1];
};

// ---------------------------------------------------------------- render one item
/** Full-frame box for screen-space pieces that position themselves (punch, source line, disclaimer, embers). */
const Frame: React.FC<{children: React.ReactNode}> = ({children}) => <div style={{position: 'absolute', left: 0, top: 0, width: W, height: H}}>{children}</div>;
const renderBody = (it: Item, rel: (a: At) => number, kids: React.ReactNode): React.ReactNode => {
  switch (it.t) {
    case 'prop': return <Prop name={it.src} h={it.w ? undefined : it.h ?? 300} w={it.w} flip={it.flip} />;
    case 'leo': return <LeoFull heads={it.heads.map(([a, head]) => ({at: rel(a), head}))} x={0} y={0} h={it.h ?? 760} flip={it.flip} />;
    case 'badge': return <LeoBadge head={it.head} at={0} x={0} y={0} size={it.size} ring={it.ring} />;
    case 'person': return <Person color={it.color} h={it.h} />;
    case 'text': return <div style={{width: it.w, textAlign: it.align ?? 'left', fontFamily: it.hand ? HAND : SANS, fontWeight: it.weight ?? (it.hand ? 700 : 800), fontSize: it.size ?? 64, color: it.color ?? INK, lineHeight: 1.1, whiteSpace: it.w ? 'normal' : 'nowrap', textShadow: '0 3px 0 rgba(255,255,255,0.6)'}}>{it.text}</div>;
    case 'chip': return <Chip text={it.text} kind={it.kind} x={0} y={0} size={it.size} rot={it.rot} />;
    case 'pill': return <Pill text={it.text} bg={it.bg ?? '#2B2F77'} color={it.color} size={it.size} />;
    case 'tag': return <Tag text={it.text} at={0} x={0} y={0} size={it.size} bg={it.bg} color={it.color} rot={it.rot} />;
    case 'bubble': return <div style={{position: 'relative', width: it.w ?? 760}}><Bubble text={it.text} tail={it.tail} size={it.size} style={{left: 0, top: 0}} /></div>;
    case 'sticker': return <div style={{position: 'relative', width: it.w ?? 900}}><Sticker top={it.top} main={it.main} sub={it.sub} p={PALETTES[it.palette ?? 'sunrise']} style={{left: 0, top: 0}} /></div>;
    case 'note': return <StickyNote text={it.text} color={it.color} size={it.size} rot={it.rot} style={{position: 'absolute', left: 0, top: 0}} />;
    case 'stat': return <StatCard to={it.to} prefix={it.prefix} suffix={it.suffix} label={it.label} at={0} x={0} y={0} w={it.w} bg={it.bg} />;
    case 'pct': return <PercentGrid n={it.n} at={6} x={0} y={0} dot={it.dot} gap={it.gap} on={it.on} />;
    case 'price': return <PriceTag text={it.text} at={0} x={0} y={0} color={it.color} size={it.size} rot={it.rot} />;
    case 'pay': return <PayCircle amount={it.amount} label={it.label} at={0} x={(it.size ?? 170) / 2} y={(it.size ?? 170) / 2} size={it.size} color={it.color} paid={it.paid} />;
    case 'gauge': return <Gauge value={it.value} max={it.max} label={it.label} at={0} x={0} y={0} r={it.r} />;
    case 'bar': return <Bar at={0} x={0} base={it.h} w={it.w} h={it.h} color={it.color} label={it.label} value={it.value} />;
    case 'bars': return <BarChart data={it.data} w={it.w} h={it.h} max={it.max} stagger={it.stagger} fmt={(v) => `${it.prefix ?? ''}${v.toLocaleString('en-US')}${it.suffix ?? ''}`} />;
    case 'line': return <LineChart series={it.series} labels={it.labels} w={it.w} h={it.h} dur={it.dur} colors={it.colors} max={it.max} showAll={it.showAll} fmt={(v) => `${it.prefix ?? ''}${v.toLocaleString('en-US')}${it.suffix ?? ''}`} />;
    case 'wheel': return <NumberWheel to={it.to} from={it.from} dur={it.dur} prefix={it.prefix} suffix={it.suffix} size={it.size} color={it.color} />;
    case 'money': return <div style={{fontFamily: SANS, fontWeight: 900, fontSize: it.size ?? 110, color: it.color ?? INK, whiteSpace: 'nowrap', textShadow: '0 4px 0 #fff'}}><CountMoney to={it.to} at={0} dur={it.dur} prefix={it.prefix} suffix={it.suffix} /></div>;
    case 'strike': return <StrikeReplace from={it.from} to={it.to} swapAt={it.swap !== undefined ? rel(it.swap) : 18} size={it.size} color={it.color} newColor={it.newColor} below={it.below} />;
    case 'mark': return <HandMark kind={it.kind} w={it.w} h={it.h} dx={it.dx} dy={it.dy} dur={it.dur} color={it.color} width={it.width} seed={`${it.kind}${it.x}${it.y}`} />;
    case 'match': return <TextMatchCut a={it.a} b={it.b} at={rel(it.swap)} dur={it.dur} size={it.size} color={it.color} hand={it.hand} />;
    case 'arrow': return <DashArrow x0={0} y0={0} x1={it.x2 - (it.x ?? 0)} y1={it.y2 - (it.y ?? 0)} at={0} color={it.color} dur={it.dur} />;
    case 'coins': return <>{Array.from({length: it.n ?? 3}).map((_, i) => <CoinFly key={i} at={i * (it.gap ?? 10)} x0={0} y0={0} x1={it.x2 - (it.x ?? 0)} y1={it.y2 - (it.y ?? 0)} dur={it.dur} size={it.size} label={it.label ?? '$'} />)}</>;
    case 'ripple': return <Ripple at={0} x={0} y={0} size={it.size} color={it.color} />;
    case 'shadow': return <Shadow cx={it.w / 2} y={0} w={it.w} />;
    case 'card': return <PaperCard x={0} y={0} w={it.w} h={it.h} rot={it.rot} color={it.color}>{kids}</PaperCard>;
    case 'phone': return <Phone at={0} x={0} y={0} h={it.h} tilt={it.tilt}>{kids}</Phone>;
    case 'notif': return <NotifStack items={it.items.map((n) => ({...n, at: rel(n.at)}))} w={it.w} size={it.size} />;
    case 'ruler': return <RulerTimeline x={0} y={0} w={it.w} marks={it.marks.map((m) => ({...m, at: rel(m.at)}))} />;
    case 'words': return <WordPop words={it.words} at={0} gap={it.gap} x={0} y={0} size={it.size} highlight={it.highlight} />;
    case 'path': return <PathTraveler pts={it.pts} at={0} dur={it.dur ?? 30} rotate={it.rotate} trail={it.trail}><Prop name={it.src} h={it.h ?? 160} /></PathTraveler>;
    case 'embers': return <Frame><Embers n={it.n} color={it.color} /></Frame>;
    case 'src': return <Frame><Src text={it.text} /></Frame>;
    case 'disclaimer': return <Frame><Disclaimer /></Frame>;
    case 'punch': return <Frame><Punch text={it.text} at={0} y={0} size={it.size} color={it.color} /></Frame>;
    case 'custom': return it.render(rel);
    default: return null;
  }
};

const ItemView: React.FC<{it: Item; A: (a: At | undefined, d?: number) => number; base: number; end: number}> = ({it, A, base, end}) => {
  const f = useCurrentFrame() + base;
  const at = A(it.at);
  const out = A(it.out, end + 1);
  if (f < at || f >= out) return null;
  const rel = (a: At) => A(a) - at;
  const p = poseAt(it, f, A);
  const x0 = it.x ?? 0, y0 = it.y ?? 0;
  // exit
  const ex = it.exit ?? (it.out !== undefined ? 'fade' : 'none');
  const te = ex === 'none' ? 0 : interpolate(f, [out - 10, out], [0, 1], clamp);
  const exT = ex === 'toss' ? `translate(${te * 260}px, ${-te * 220}px) rotate(${te * 35}deg)` : ex === 'drop' ? `translate(0px, ${te * te * 400}px)` : `translate(0px, ${te * 24}px)`;
  const blur = it.blur ? lin(f, it.blur.map(([a, v]) => [A(a), v])) : 0;
  const kidNodes = it.kids?.map((k, i) => <ItemView key={i} it={k} A={A} base={at} end={end} />);
  let body: React.ReactNode = renderBody(it, rel, it.t === 'card' || it.t === 'phone' ? kidNodes : null);
  const enter = it.enter ?? (SELF_ANIM.has(it.t) ? 'none' : 'pop');
  if (enter === 'pop') body = <PopIn at={0} style={{left: 0, top: 0}}>{body}</PopIn>;
  else if (enter === 'left' || enter === 'right' || enter === 'up') body = <SlideIn at={0} from={enter === 'up' ? 'bottom' : enter} dist={500} style={{left: 0, top: 0}}>{body}</SlideIn>;
  else if (enter === 'fade') body = <div style={{opacity: interpolate(f - at, [0, 10], [0, 1], clamp)}}>{body}</div>;
  if (it.hang) body = <Hang>{body}</Hang>;
  if (it.boil) body = <Boil id={`${it.t}${x0}${y0}`}>{body}</Boil>;
  if (it.stop) body = <StopMotion step={it.stop}>{body}</StopMotion>;
  const tf = (q: {x: number; y: number; s: number; r: number}) => `translate(${q.x - x0}px, ${q.y - y0}px) scale(${q.s}) rotate(${q.r}deg)`;
  const ghosts = it.trail && it.move ? Array.from({length: it.trail}).map((_, k) => {
    const q = poseAt(it, f - (k + 1) * 2, A);
    if (Math.hypot(q.x - p.x, q.y - p.y) < 2) return null;
    return <div key={k} style={{position: 'absolute', left: x0, top: y0, transformOrigin: `${it.ox ?? 0}px ${it.oy ?? 0}px`, transform: tf(q), opacity: 0.3 / (k + 1)}}><Sequence from={at - base} layout="none">{renderBody(it, rel, null)}</Sequence></div>;
  }) : null;
  return (
    <>
      {ghosts}
      <div style={{position: 'absolute', left: x0, top: y0, zIndex: it.z, transformOrigin: `${it.ox ?? 0}px ${it.oy ?? 0}px`, transform: `${tf(p)} ${exT}`, opacity: (it.opacity ?? 1) * (1 - te * (ex === 'fade' ? 1 : 0.6)), filter: blur > 0.2 ? `blur(${blur}px)` : undefined}}>
        <Sequence from={at - base} layout="none">
          {body}
          {it.t !== 'card' && it.t !== 'phone' ? kidNodes : null}
        </Sequence>
      </div>
    </>
  );
};

/** All sounds of a chapter: explicit sfx, item pops (autoPop), whooshes on long camera moves (autoWhoosh). */
export const collectSfx = (spec: ChapterSpec, A: (a: At | undefined, d?: number) => number): [number, SfxName][] => {
  const out: [number, SfxName][] = (spec.sfx ?? []).map(([a, n]) => [A(a), n]);
  const walk = (items: Item[]) => {
    for (const it of items) {
      const s = it.sfx ?? (it.t === 'coins' ? 'kaching' : spec.autoPop === false || QUIET.has(it.t) ? false : 'pop');
      if (s) out.push([A(it.at) + (it.t === 'coins' ? (it.dur ?? 18) : 0), s]);
      if (it.kids) walk(it.kids);
    }
  };
  walk(spec.items);
  if (spec.autoWhoosh !== false) {
    const keys = resolveCam(spec.cam, A);
    for (let i = 1; i < keys.length; i++) if (Math.hypot(keys[i].x - keys[i - 1].x, keys[i].y - keys[i - 1].y) > 700 || Math.abs((keys[i].z ?? 1) / (keys[i - 1].z ?? 1) - 1) > 0.6) out.push([keys[i].at - 10, 'whoosh']);
  }
  // never stack the same sound within 3 frames
  out.sort((a, b) => a[0] - b[0]);
  return out.filter((s, i) => !out.slice(0, i).some((p) => p[1] === s[1] && Math.abs(p[0] - s[0]) < 3));
};

/** Renders a ChapterSpec (inside a chapter shell: frame 0 = start of the voice). */
export const SpecChapter: React.FC<{spec: ChapterSpec; chapter: Chapter; fps: number}> = ({spec, chapter, fps}) => {
  const A = makeAt(chapter, fps);
  const end = A('end');
  const keys = resolveCam(spec.cam, A);
  const shakes = (spec.shakes ?? []).map(([a, amp, dur]) => ({at: A(a), amp, dur}));
  const world = spec.items.filter((i) => !(i.screen ?? SCREEN.has(i.t)));
  const screen = spec.items.filter((i) => i.screen ?? SCREEN.has(i.t));
  const bg = spec.bg ?? {stops: [{x: 0, c: 'sky'}]};
  return (
    <AbsoluteFill>
      <World keys={keys} shakes={shakes} w={spec.world?.w} h={spec.world?.h} bg={<WorldBg stops={bg.stops} images={bg.images} wash={bg.wash} blur={bg.blur} decor={bg.decor ?? 'none'} ground={bg.ground} seed={spec.id} />}>
        {world.map((it, i) => <ItemView key={i} it={it} A={A} base={0} end={end} />)}
      </World>
      {spec.paper && <PaperTexture />}
      {/* soft cinematic vignette (Kok Bisa grade) */}
      <AbsoluteFill style={{pointerEvents: 'none', background: 'radial-gradient(ellipse at 50% 48%, rgba(0,0,0,0) 55%, rgba(60,40,20,0.16) 100%)'}} />
      {screen.map((it, i) => <ItemView key={i} it={it} A={A} base={0} end={end} />)}
      {collectSfx(spec, A).map(([at, n], i) => <Sfx key={i} name={n} at={at} />)}
    </AbsoluteFill>
  );
};
