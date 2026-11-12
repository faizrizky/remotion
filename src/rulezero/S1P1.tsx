// Rule Zero - Series 1 "Level 3" - Part 1 "Space 31". Vertical 1080x1920, 24 fps.
// Shot list: docs/rule-zero/RULE_ZERO_SERIES_BIBLE.md section 5. Timing: s1p1_timeline.json (built from the voice takes).
import React from 'react';
import {AbsoluteFill, Html5Audio, interpolate, Sequence, staticFile} from 'remotion';
import TL from './s1p1_timeline.json';
import {Bracket, C, Cctv, clamp, clockStr, CutFlash, Glow, Hud, Plate, sf, useT, Word, Captions, FPS} from './rzkit';
import {ForkChip, LogEntries, MonitorWall, PinnedSheet, RuleSheetCard, TitleCard} from './cards';

const A = TL.anchors as Record<string, number>;
const WORDS = TL.words as Word[];
export const S1P1_LEN = TL.frames;

const cl = (x: string) => x.toLowerCase().replace(/[^a-z0-9'-]/g, '');
/** Find a phrase in the words; returns start of first word and end of last word (seconds). */
const phrase = (p: string, clip?: string) => {
  const s = p.split(' ').map(cl);
  for (let i = 0; i + s.length <= WORDS.length; i++) {
    if (clip && WORDS[i].clip !== clip) continue;
    if (s.every((x, k) => cl(WORDS[i + k].w) === x)) return {s: WORDS[i].s, e: WORDS[i + s.length - 1].e};
  }
  throw new Error('phrase not found: ' + p);
};

const IMG = (n: string) => `rz1/img/${n}.jpg`;

/* ---------------- scene table (global seconds) ---------------- */
const GUARD = phrase('guard who walks').s;
const R1END = phrase("Don't touch it.").e;
const R2END = phrase('never send security to Level three.', 'aturan').e;
const R3 = phrase('Rule three?');
const PAPER = phrase('Pen pressed through the paper.');
const BAY31 = phrase('Bay thirty-one.');
const BAY12 = phrase('bay twelve.');
const FOLLOWED = phrase('Rule one, followed.');
const DALE_END = phrase('Want me to force it?', 'dale').e;

type Scene = {a: number; b: number; el: React.ReactNode; captions?: boolean; hud?: HudState | null};
type HudState = {clock: string; nerve: number; log: number; chip?: string; chipRed?: boolean; nerveFrom?: number; logFrom?: number};

const L = (x: number, a: number) => x - a; // global -> local seconds

/* ---------------- scenes ---------------- */
const S1: React.FC<{a: number; b: number}> = ({a, b}) => (
  <Plate src={IMG('operator_booth_seated')} from={{x: 0.5, y: 0.5, z: 1.0}} to={{x: 0.46, y: 0.42, z: 1.3}} dur={b - a} />
);

// Every camera has its own view (CR-1). Only CAM 3-A may show the car. CAM 3-S is the CLOSED door (same as the finale).
const FEEDS = [
  {src: IMG('level3_wide_empty'), x: 0.31, y: 0.40, z: 1.6, cam: 'CAM 1-A'},
  {src: IMG('stairwell_door'), x: 0.5, y: 0.5, z: 1.0, cam: 'CAM 1-S'},
  {src: IMG('level3_wide_empty'), x: 0.36, y: 0.55, z: 1.4, cam: 'CAM 2-A', flip: true},
  {src: IMG('level3_wide_empty'), x: 0.74, y: 0.52, z: 2.0, cam: 'CAM 2-B'},
  {src: IMG('level3_wide_car'), x: 0.55, y: 0.52, z: 1.5, cam: 'CAM 3-A'},
  {src: IMG('level3_wide_empty'), x: 0.7, y: 0.5, z: 1.5, cam: 'CAM 3-B', flip: true},
  {src: IMG('driver_stairwell_glass_dale'), x: 0.27, y: 0.3, z: 1.9, cam: 'CAM 3-S'},
  {src: IMG('level3_wide_empty'), x: 0.62, y: 0.36, z: 1.7, cam: 'CAM 4-A'},
];

const SheetPush: React.FC<{a: number; b: number}> = ({a, b}) => <Plate src={IMG('booth_clean')} from={{x: 0.5, y: 0.5, z: 1.0}} to={{x: 0.5, y: 0.495, z: 2.9}} dur={b - a}><PinnedSheet /></Plate>;

const RULE_LINES = (a: number) => [
  {n: '1.', text: 'At the top of every hour, check Level 3. One car will have moved. Log it. Do not touch it.', start: L(A.r1, a) + 0.1, end: L(R1END, a)},
  {n: '2.', text: 'Never send security to Level 3.', start: L(A.r2, a) + 0.1, end: L(R2END, a)},
  {n: '3.', text: 'The log must nev', start: L(R3.s, a) + 0.2, end: L(R3.e, a) + 0.2, scratchAt: L(A.scratched, a)},
  {n: '4.', text: 'Camera 3-C has no recording. If it shows you, look away.', start: 0, end: 0, blur: true},
  {n: '5.', text: 'If the elevator calls itself, do not watch it arrive.', start: 0, end: 0, blur: true},
];

// Same plate, same camera, same parking spot as the BAY 31 shot (CR-4/CR-5): the car does not move, only its lights come on.
const NOSE = {x: 0.789, y: 0.545}; // front end of the sedan in level3_wide_car (nose points right, away from the stairs)
const Headlights: React.FC<{a: number}> = ({a}) => {
  const t = useT();
  const on = interpolate(t, [0.3, 2.0], [0.15, 1], clamp);
  const flare = interpolate(t, [L(A.aimed, a), L(A.aimed, a) + 0.25, L(A.aimed, a) + 1.4], [0, 1, 0.55], clamp);
  const cam = {from: {x: 0.6, y: 0.55, z: 1.55}, to: {x: 0.68, y: 0.55, z: 2.0}, dur: 4.8};
  const src = IMG('level3_wide_car');
  return (
    <AbsoluteFill>
      <Cctv cam="CAM 3-A  LEVEL 3" clock={clockStr(23 * 60 + 2, 14 + t)}>
        <Plate src={src} {...cam} />
      </Cctv>
      <Plate src={src} {...cam} noImg>
        {/* beam on the floor and the pillar ahead of the nose, lens glow only at the lamp itself */}
        <div style={{position: 'absolute', left: `${(NOSE.x - 0.01) * 100}%`, top: '50.5%', width: '24%', height: '12%', background: `radial-gradient(ellipse at 6% 50%, rgba(255,230,180,${0.75 * on}) 0%, rgba(242,163,58,${0.32 * on * (0.8 + flare)}) 35%, rgba(242,163,58,0) 72%)`, filter: 'blur(10px)', mixBlendMode: 'screen', WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, #000 22%, #000 100%)', maskImage: 'linear-gradient(90deg, transparent 0%, #000 22%, #000 100%)'}} />
        <div style={{position: 'absolute', left: '84%', top: '57.5%', width: '17%', height: '3.2%', borderRadius: '50%', transform: 'translateX(-10%)', background: `radial-gradient(ellipse, rgba(255,214,150,${0.5 * on * (0.7 + flare)}) 0%, rgba(242,163,58,0) 70%)`, mixBlendMode: 'screen'}} />
        <Glow x={NOSE.x} y={NOSE.y} r={0.014 + 0.012 * flare} o={on * (0.9 + 0.3 * flare)} />
      </Plate>
    </AbsoluteFill>
  );
};

const DaleCam: React.FC<{a: number; b: number}> = ({a, b}) => {
  const t = useT();
  const rattle = L(A.door, a);
  const shake = t > rattle && t < rattle + 0.6 ? 5 : 0;
  const broken = L(A.broken, a);
  const stamp = interpolate(t, [broken - 0.6, broken - 0.48], [1.7, 1], clamp);
  const so = interpolate(t, [broken - 0.6, broken - 0.54], [0, 1], clamp);
  return (
    <AbsoluteFill>
      <Cctv cam="CAM 3-S  STAIRWELL" clock={clockStr(23 * 60 + 3, 2 + t)}>
        <Plate src={IMG('driver_stairwell_glass_dale')} from={{x: 0.5, y: 0.47, z: 1.02}} to={{x: 0.55, y: 0.4, z: 1.18}} dur={b - a} shake={shake} />
      </Cctv>
      {so > 0 ? (
        <div style={{position: 'absolute', left: '50%', top: 1080, transform: `translate(-50%, -50%) rotate(-8deg) scale(${stamp})`, opacity: so, border: `8px solid ${C.red}`, color: C.red, fontFamily: 'Oswald', fontWeight: 700, fontSize: 92, padding: '4px 30px', letterSpacing: 4, background: 'rgba(12,19,17,0.55)'}}>
          RULE 2: BROKEN
        </div>
      ) : null}
    </AbsoluteFill>
  );
};

const EYES = [
  {x: 0.5645, y: 0.2755},
  {x: 0.5925, y: 0.2755},
];
const WindowPush: React.FC<{a: number; b: number}> = ({a, b}) => {
  const t = useT();
  const eyes = interpolate(t, [0.4, 1.5, L(A.lights, a), L(A.lights, a) + 0.4], [0.3, 0.45, 0.45, 1], clamp);
  const blink = Math.abs(t - (L(A.lights, a) + 1.6)) < 0.08 ? 0 : 1;
  const cam = {from: {x: 0.55, y: 0.38, z: 1.25}, to: {x: 0.578, y: 0.285, z: 3.6}, dur: b - a};
  const src = IMG('driver_stairwell_glass_dale');
  return (
    <AbsoluteFill>
      <Cctv cam="CAM 3-S  ZOOM 4X" clock={clockStr(23 * 60 + 3, 14 + t)}>
        <Plate src={src} {...cam} />
      </Cctv>
      <Plate src={src} {...cam} noImg>
        {EYES.map((e, i) => (
          <Glow key={i} x={e.x} y={e.y} r={0.009} o={eyes * blink} />
        ))}
      </Plate>
    </AbsoluteFill>
  );
};

const Shocked: React.FC<{a: number; b: number; radio?: boolean}> = ({a, b, radio}) => {
  const t = useT();
  const dots = (Math.floor(t * 1.2) % 4 === 3 ? 0.2 : 1) * interpolate(t, [0.2, 0.8], [0, 1], clamp);
  return (
    <Plate src={IMG('operator_booth_shocked_closeup')} from={radio ? {x: 0.55, y: 0.5, z: 1.15} : {x: 0.5, y: 0.45, z: 1.0}} to={radio ? {x: 0.62, y: 0.56, z: 1.55} : {x: 0.5, y: 0.42, z: 1.12}} dur={b - a}>
      {/* stairwell feed on the small monitor behind his head */}
      <div style={{position: 'absolute', left: '51.5%', top: '28.6%', width: '14%', height: '6.4%', background: 'rgba(30,60,48,0.85)', borderRadius: 8, mixBlendMode: 'screen', opacity: 0.9}} />
      <Glow x={0.575} y={0.315} r={0.008} o={dots} />
      <Glow x={0.592} y={0.315} r={0.008} o={dots} />
    </Plate>
  );
};

const Fork: React.FC<{a: number; b: number}> = ({a, b}) => {
  const t = useT();
  const ch = L(A.choices, a);
  const eyes = 0.55 + 0.25 * Math.sin(t * 3);
  return (
    <AbsoluteFill>
      <Plate src={IMG('driver_stairwell_glass_dale')} from={{x: 0.5, y: 0.45, z: 1.0}} to={{x: 0.52, y: 0.42, z: 1.12}} dur={b - a} filter="brightness(0.92) contrast(1.05)">
        {EYES.map((e, i) => (
          <Glow key={i} x={e.x} y={e.y} r={0.008} o={eyes} />
        ))}
        <ForkChip n="1" label="OPEN" x={0.27} y={0.17} tx={0.4} ty={0.41} at={ch + 0.35} />
        <ForkChip n="2" label="WALK AWAY" x={0.66} y={0.13} tx={0.67} ty={0.31} at={ch + 0.75} yellow />
      </Plate>
      <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.55) 100%)'}} />
    </AbsoluteFill>
  );
};

/* ---------------- master scene list ---------------- */
const H0 = {clock: '10:58 PM', nerve: 100, log: 0};
const SCENES: Scene[] = [
  {a: 0, b: A.eight, el: <S1 a={0} b={A.eight} />, hud: H0},
  {a: A.eight, b: A.onerule, el: <MonitorWall feeds={FEEDS} clock="10:58:41 PM" />, hud: H0},
  {a: A.onerule, b: A.titlecard, el: <MonitorWall feeds={FEEDS} clock="10:58:44 PM" focus={4} focusAt={0.15} />, hud: H0},
  {a: A.titlecard, b: A.aturanStart, el: <TitleCard series="SERIES 1 · LEVEL 3" part="Part 1: Space 31" />, captions: false, hud: null},
  {a: A.aturanStart, b: GUARD - 0.1, el: <Plate src={IMG('booth_clean')} from={{x: 0.5, y: 0.5, z: 1.0}} to={{x: 0.55, y: 0.6, z: 1.25}} dur={GUARD - A.aturanStart} />, hud: {...H0, clock: '10:59 PM', chip: 'PROBLEM 1'}},
  {a: GUARD - 0.1, b: A.before, el: <Cctv cam="CAM 1-A  LOT" clock="10:59:20 PM"><Plate src={IMG('level3_wide_empty')} from={{x: 0.5, y: 0.5, z: 1.05}} to={{x: 0.45, y: 0.45, z: 1.2}} dur={A.before - GUARD} flip /></Cctv>, hud: {...H0, clock: '10:59 PM', chip: 'PROBLEM 1'}},
  {a: A.before, b: A.r1 - 0.15, el: <SheetPush a={A.before} b={A.r1} />, hud: {...H0, clock: '10:59 PM'}},
  {a: A.r1 - 0.15, b: A.smile - 0.05, el: <RuleSheetCard lines={RULE_LINES(A.r1 - 0.15)} rectAt={L(R1END, A.r1 - 0.15) + 0.1} />, captions: false, hud: null},
  {a: A.smile - 0.05, b: A.r2 - 0.15, el: <Plate src={IMG('operator_booth_suspicious_v2')} from={{x: 0.55, y: 0.45, z: 1.15}} to={{x: 0.62, y: 0.42, z: 1.5}} dur={A.r2 - A.smile} />, hud: {...H0, clock: '10:59 PM'}},
  {a: A.r2 - 0.15, b: A.p2, el: <RuleSheetCard lines={RULE_LINES(A.r2 - 0.15).map((l, i) => (i === 0 ? {...l, start: -2, end: -1} : l))} rectAt={-5} zoomTo={{at: L(PAPER.s, A.r2 - 0.15) - 0.3, y: 120, z: 1.35}} />, captions: false, hud: null},
  {a: A.p2, b: A.sedan, el: <Plate src={IMG('operator_booth_seated')} from={{x: 0.47, y: 0.38, z: 1.45}} to={{x: 0.47, y: 0.36, z: 1.75}} dur={A.sedan - A.p2} />, hud: {clock: '11:00 PM', nerve: 100, log: 0, chip: 'PROBLEM 2'}},
  {a: A.sedan, b: A.rewind, el: <Cctv cam="CAM 3-A  LEVEL 3" clock="11:00:06 PM"><Plate src={IMG('level3_wide_car')} from={{x: 0.55, y: 0.52, z: 1.25}} to={{x: 0.6, y: 0.54, z: 1.55}} dur={A.rewind - A.sedan}><Bracket x={0.6} y={0.545} w={0.5} h={0.14} start={L(BAY31.s, A.sedan)} label="BAY 31" /></Plate></Cctv>, hud: {clock: '11:00 PM', nerve: 90, log: 0, nerveFrom: 100}},
  {a: A.rewind, b: A.nobrake, el: <Rewind a={A.rewind} b={A.nobrake} />, hud: {clock: '11:00 PM', nerve: 90, log: 0}},
  {a: A.nobrake, b: A.logit, el: <Cctv cam="CAM 3-A  ZOOM" clock="11:00:40 PM"><Plate src={IMG('level3_wide_car')} from={{x: 0.56, y: 0.55, z: 2.0}} to={{x: 0.48, y: 0.55, z: 2.7}} dur={A.logit - A.nobrake} /></Cctv>, hud: {clock: '11:00 PM', nerve: 85, log: 0, nerveFrom: 90}},
  {a: A.logit, b: A.headlights, el: <Plate src={IMG('logbook_blank')} from={{x: 0.48, y: 0.36, z: 1.3}} to={{x: 0.48, y: 0.34, z: 1.4}} dur={A.headlights - A.logit}><LogEntries writeAt={0.25} writeDur={1.5} stampAt={L(FOLLOWED.e, A.logit) - 0.15} /></Plate>, captions: false, hud: {clock: '11:01 PM', nerve: 85, log: 1, logFrom: 0}},
  {a: A.headlights, b: A.other, el: <Headlights a={A.headlights} />, hud: {clock: '11:02 PM', nerve: 71, log: 1, nerveFrom: 85}},
  {a: A.other, b: A.window, el: <DaleCam a={A.other} b={A.window} />, hud: {clock: '11:03 PM', nerve: 71, log: 1, chip: 'RULE 2', chipRed: true}},
  {a: A.window, b: A.glass, el: <WindowPush a={A.window} b={A.glass} />, hud: {clock: '11:03 PM', nerve: 55, log: 1, nerveFrom: 71}},
  {a: A.glass, b: A.radio, el: <Shocked a={A.glass} b={A.radio} />, hud: {clock: '11:03 PM', nerve: 40, log: 1, nerveFrom: 55}},
  {a: A.radio, b: A.choices, el: <Shocked a={A.radio} b={A.choices} radio />, hud: {clock: '11:04 PM', nerve: 40, log: 1}},
  {a: A.choices, b: TL.total, el: <Fork a={A.choices} b={TL.total} />, hud: null},
];

// Rewind: the same camera runs the clock back. The sedan sits at Bay 31 while the tape runs, then the tape stops at 10:00 and the
// sedan is already parked at Bay 12 (same heading, same depth). Nothing rolls backwards on screen (CR-7).
function Rewind({a, b}: {a: number; b: number}) {
  const t = useT();
  const swap = Math.max(1.2, L(BAY12.s, a) - 0.35);
  const back = Math.min(1, t / swap);
  const mins = 23 * 60 - 60 * back;
  const cam = {from: {x: 0.45, y: 0.55, z: 1.2}, to: {x: 0.4, y: 0.55, z: 1.25}, dur: b - a};
  const done = t >= swap;
  return (
    <Cctv cam="CAM 3-A  LEVEL 3" clock={clockStr(mins, (1 - back) * 6)} rew={!done}>
      {done ? (
        <Plate src={IMG('level3_wide_car_bay12')} {...cam}>
          <Bracket x={0.275} y={0.545} w={0.46} h={0.13} start={L(BAY12.s, a)} label="BAY 12" />
        </Plate>
      ) : (
        <Plate src={IMG('level3_wide_car')} {...cam} />
      )}
      <AbsoluteFill style={{background: `repeating-linear-gradient(0deg, rgba(217,242,230,0) 0px, rgba(217,242,230,0) ${40 + (t * 900) % 60}px, rgba(217,242,230,0.12) ${42 + (t * 900) % 60}px, rgba(217,242,230,0) ${48 + (t * 900) % 60}px)`, opacity: !done ? 1 : Math.max(0, 1 - (t - swap) * 6)}} />
    </Cctv>
  );
}

/* ---------------- HUD driver ---------------- */
const HudLayer: React.FC = () => {
  const t = useT();
  const sc = SCENES.find((s) => t >= s.a && t < s.b);
  if (!sc || !sc.hud) return null;
  const h = sc.hud;
  const k = interpolate(t - sc.a, [0.1, 0.7], [0, 1], clamp);
  const nerve = h.nerveFrom !== undefined ? h.nerveFrom + (h.nerve - h.nerveFrom) * k : h.nerve;
  const nerveFlash = h.nerveFrom !== undefined ? interpolate(t - sc.a, [0, 0.15, 0.9], [0, 1, 0], clamp) : 0;
  const logFlash = h.logFrom !== undefined ? interpolate(t - sc.a, [L(FOLLOWED.s, sc.a), L(FOLLOWED.s, sc.a) + 0.15, L(FOLLOWED.s, sc.a) + 0.9], [0, 1, 0], clamp) : 0;
  const log = h.logFrom !== undefined && t < FOLLOWED.s ? h.logFrom : h.log;
  return <Hud clock={h.clock} nerve={nerve} log={log} chip={h.chip} chipRed={h.chipRed} nerveFlash={nerveFlash} logFlash={logFlash} />;
};

/* ---------------- audio ---------------- */
type Sfx = {at: number; file: string; vol: number; dur?: number};
const SFX: Sfx[] = [
  {at: 0.0, file: 'beep', vol: 0.25},
  {at: A.eight - 0.05, file: 'beep', vol: 0.35},
  {at: A.onerule + 0.1, file: 'whoosh', vol: 0.35},
  {at: A.titlecard - 0.8, file: 'sting_hit', vol: 0.9},
  {at: GUARD - 0.1, file: 'beep', vol: 0.3},
  {at: A.r1 - 0.15, file: 'whoosh', vol: 0.3},
  {at: A.r1 + 0.1, file: 'typing', vol: 0.35, dur: R1END - A.r1 - 0.1},
  {at: A.r2 + 0.1, file: 'typing', vol: 0.35, dur: R2END - A.r2 - 0.1},
  {at: R3.s + 0.2, file: 'typing', vol: 0.35, dur: R3.e - R3.s},
  {at: A.scratched, file: 'rip', vol: 0.8},
  {at: A.sedan, file: 'beep', vol: 0.3},
  {at: A.rewind, file: 'rewind', vol: 0.45},
  {at: FOLLOWED.e - 0.15, file: 'stamp', vol: 0.7},
  {at: A.headlights + 0.4, file: 'headlights', vol: 0.55},
  {at: A.aimed, file: 'drone_hit', vol: 0.55},
  {at: A.other, file: 'beep', vol: 0.3},
  {at: A.broken - 0.6, file: 'stamp', vol: 0.6},
  {at: A.door, file: 'door_rattle', vol: 0.7},
  {at: A.window, file: 'drone_hit', vol: 0.75},
  {at: A.radio + 0.75, file: 'radio_click', vol: 0.7},
  {at: DALE_END + 0.05, file: 'radio_click', vol: 0.5},
  {at: A.choices + 0.35, file: 'pop', vol: 0.6},
  {at: A.choices + 0.75, file: 'pop', vol: 0.6},
  {at: A.choices - 1.0, file: 'riser', vol: 0.4},
];

const bedVol = (f: number) => {
  const t = f / FPS;
  const base = 0.11;
  const fadeIn = interpolate(t, [0, 1.5], [0.3, 1], clamp);
  const duckTitle = interpolate(t, [A.titlecard - 0.6, A.titlecard, A.aturanStart - 0.3, A.aturanStart + 0.3], [1, 0.35, 0.35, 1], clamp);
  const lift = interpolate(t, [A.window - 1, A.window + 1], [1, 1.35], clamp);
  const out = interpolate(t, [TL.total - 1.2, TL.total], [1, 0], clamp);
  return base * fadeIn * duckTitle * lift * out;
};

const Audio: React.FC = () => (
  <>
    <Html5Audio src={staticFile('rz1/audio/bed.wav')} volume={bedVol} />
    {TL.pieces.map((p, i) => (
      <Sequence key={i} from={sf(p.at)} durationInFrames={sf(p.dur) + 2} layout="none">
        <Html5Audio src={staticFile(p.file)} trimBefore={sf(p.src)} volume={1} />
      </Sequence>
    ))}
    {SFX.filter((s) => s.vol > 0).map((s, i) => (
      <Sequence key={`s${i}`} from={Math.max(0, sf(s.at))} durationInFrames={s.dur ? sf(s.dur) : sf(4)} layout="none">
        <Html5Audio src={staticFile(`rz1/audio/sfx/${s.file}.wav`)} volume={s.vol} />
      </Sequence>
    ))}
  </>
);

/* ---------------- composition ---------------- */
export const S1P1: React.FC = () => {
  const capHidden = (t: number) => {
    const sc = SCENES.find((s) => t >= s.a && t < s.b);
    return !!sc && sc.captions === false;
  };
  return (
    <AbsoluteFill style={{background: C.ink}}>
      {SCENES.map((s, i) => (
        <Sequence key={i} from={sf(s.a)} durationInFrames={Math.max(1, sf(s.b) - sf(s.a))}>
          {s.el}
          {i > 0 ? <CutFlash len={0.08} /> : null}
        </Sequence>
      ))}
      <HudLayer />
      <Captions words={WORDS} hidden={capHidden} />
      <Audio />
    </AbsoluteFill>
  );
};
