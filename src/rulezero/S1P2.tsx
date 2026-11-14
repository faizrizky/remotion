// Rule Zero - Series 1 "Level 3" - Part 2 "Dale's Round" (final part). Vertical 1080x1920, 24 fps.
// Script/shots: rule_zero_part2_script.md v3. Voice timing: s1p2_voice.json (Whisper word timing, built by build_p2.py).
import React from 'react';
import {AbsoluteFill, Html5Audio, interpolate, random, Sequence, staticFile, useCurrentFrame} from 'remotion';
import VO from './s1p2_voice.json';
import {Bracket, Ring, C, Captions, Cctv, clamp, clockStr, CutFlash, FPS, Glow, HAND, HEAVY, Hud, MONO, Plate, sf, TYPE, useT, Word} from './rzkit';
import {ANGLE, cellPos, ForkChip} from './cards';

const WORDS = VO.words as Word[];
const cl = (x: string) => x.toLowerCase().replace(/[^a-z0-9'-]/g, '');
const phrase = (p: string, after = -1) => {
  const s = p.split(' ').map(cl);
  for (let i = 0; i + s.length <= WORDS.length; i++) {
    if (WORDS[i].s < after) continue;
    if (s.every((x, k) => cl(WORDS[i + k].w) === x)) return {s: WORDS[i].s, e: WORDS[i + s.length - 1].e};
  }
  throw new Error('phrase not found: ' + p);
};

const I1 = (n: string) => `rz1/img/${n}.jpg`;
const I2 = (n: string) => `rz2/img/${n}.jpg`;
const L = (x: number, a: number) => x - a;

/* ---------------- anchors (global seconds) ---------------- */
const CHOICES = phrase('You have two choices.');
const RUN = phrase('You tell him to run.');
const GETOUT = phrase('Get out of there.');
const DOESNT = phrase("Dale doesn't ask.");
const BEHIND = phrase('Behind him, something steps');
const LIGHTS = phrase('The lights go out.');
const ROW = phrase('One row at a time.');
const HEY = phrase('Hey.');
const TURNS = phrase('He turns.');
const TWO = phrase('Two small lights,');
const NO1 = phrase('No. No, no, no...');
const RHITS = phrase('The radio hits the floor.');
const LAST = phrase('The last thing Dale sees');
const REW = phrase('You rewind.');
const OPENIT = phrase('You tell him to open it.');
const PUSHES = phrase('Dale pushes.');
const SWINGS = phrase('The door swings in.');
const TALL = phrase('You see the tall one,');
const CLOSES = phrase('The door closes behind him.');
const CAM = phrase('On camera three-A,');
const KEYS = phrase("Sedan's unlocked.");
const DONT = phrase("Don't touch it.");
const JUST = phrase('Just turning off the lights.');
const SHUTS = phrase('The door shuts.');
const HEADL = phrase('The headlights go out.');
const DIFF = phrase('A different face.');
const BACKS = phrase('The sedan backs out');
const BAY12 = phrase('Back to bay twelve.');
const GLASS = phrase('Behind the glass,');
const SIX = phrase('Six a.m.');
const BAYS = phrase('Bay thirty-one to bay twelve.');
const UNDER = phrase('Under the monitor,');
const RULE3 = phrase('Rule three.', UNDER.s);
const WHOEVER = phrase('Whoever goes up');
const CAR = phrase('logged as a car.');
const LINE = phrase('The line below');
const FILLED = phrase('already filled in.');
const BOOTH = phrase('In the booth door,');
const R1 = phrase('Rule one, followed.');
const R2 = phrase('Rule two, broken.');
const R3B = phrase('Rule three.', R2.e);
const KNOW = phrase('Now you know.');

const END_AT = KNOW.e + 1.4;
const END_LEN = 6.0;
export const S1P2_TOTAL = END_AT + END_LEN;
export const S1P2_LEN = sf(S1P2_TOTAL);

/* ---------------- scenes ---------------- */
const EYES_GLASS = [
  {x: 0.5645, y: 0.2755},
  {x: 0.5925, y: 0.2755},
];
const POV_EYES = [
  {x: 0.4515, y: 0.3837},
  {x: 0.5617, y: 0.3818},
];
const POV_C = {x: 0.506, y: 0.383};

// 1. Carry-over: last frame of Part 1, fork chips again, chip 2 chosen at "You tell him to run".
const DoorHold: React.FC<{a: number; b: number; pick: 1 | 2; chipsAt: number}> = ({a, b, pick, chipsAt}) => {
  const t = useT();
  const eyes = 0.5 + 0.3 * Math.sin(t * 3);
  const blink = Math.abs(t - 2.2) < 0.08 ? 0 : 1;
  const pickAt = pick === 2 ? L(RUN.s, a) : L(OPENIT.s, a);
  const dim = (n: number) => (t > pickAt && n !== pick ? 0.25 : 1);
  return (
    <AbsoluteFill>
      <Plate src={I1('driver_stairwell_glass_dale')} from={{x: 0.5, y: 0.45, z: 1.0}} to={{x: 0.53, y: 0.4, z: 1.2}} dur={b - a}>
        {EYES_GLASS.map((e, i) => (
          <Glow key={i} x={e.x} y={e.y} r={0.008} o={eyes * blink} />
        ))}
        <div style={{opacity: dim(1)}}>
          <ForkChip n="1" label="OPEN" x={0.27} y={0.3} tx={0.4} ty={0.41} at={chipsAt + 0.2} />
        </div>
        <div style={{opacity: dim(2)}}>
          <ForkChip n="2" label="WALK AWAY" x={0.66} y={0.13} tx={0.67} ty={0.31} at={chipsAt + 0.55} yellow />
        </div>
      </Plate>
      <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.55) 100%)'}} />
    </AbsoluteFill>
  );
};

// Operator on the radio (booth close-up).
const OperatorRadio: React.FC<{a: number; b: number}> = ({a, b}) => (
  <Plate src={I1('operator_booth_shocked_closeup')} from={{x: 0.55, y: 0.5, z: 1.15}} to={{x: 0.62, y: 0.56, z: 1.5}} dur={b - a} />
);

// Lights go out one row at a time (CCTV, Level 3), then two amber dots in the dark.
const LightsOut: React.FC<{a: number; b: number}> = ({a, b}) => {
  const t = useT();
  const s0 = L(LIGHTS.s, a);
  const steps = [0, 1, 2, 3].map((k) => s0 + 0.3 + k * ((L(ROW.e, a) + 0.3 - s0) / 4));
  let level = 0;
  steps.forEach((st) => {
    if (t >= st) level++;
  });
  const frame = useCurrentFrame();
  const flick = steps.some((st) => t > st - 0.25 && t < st) && random(`lf${frame}`) > 0.5 ? 0.15 : 0;
  const dark = [0, 0.35, 0.6, 0.78, 0.9][level] + flick;
  const eyes = interpolate(t, [L(HEY.s, a) + 0.4, L(HEY.s, a) + 1.4], [0, 0.85], clamp);
  const cam = {from: {x: 0.45, y: 0.42, z: 1.15}, to: {x: 0.5, y: 0.44, z: 1.35}, dur: b - a};
  return (
    <AbsoluteFill>
      <Cctv cam="CAM 3-B  LEVEL 3" clock={clockStr(23 * 60 + 5, 10 + t)}>
        <Plate src={I1('level3_wide_empty')} {...cam} />
        <AbsoluteFill style={{background: `linear-gradient(180deg, rgba(0,0,0,${Math.min(1, dark + 0.08)}) 0%, rgba(0,0,0,${dark}) 60%, rgba(0,0,0,${dark * 0.85}) 100%)`}} />
      </Cctv>
      <Plate src={I1('level3_wide_empty')} {...cam} noImg>
        <Glow x={0.495} y={0.335} r={0.006} o={eyes} />
        <Glow x={0.507} y={0.335} r={0.006} o={eyes} />
      </Plate>
    </AbsoluteFill>
  );
};

// POV in the dark: only the two dots, then the radio drops.
const PovDark: React.FC<{a: number; b: number}> = ({a, b}) => {
  const t = useT();
  const eyes = interpolate(t, [L(TWO.s, a) - 0.2, L(TWO.s, a) + 0.5], [0.15, 1], clamp);
  const lit = interpolate(t, [L(TWO.s, a), L(TWO.e, a) + 0.6], [0.05, 0.22], clamp);
  const shaking = t > L(NO1.s, a) ? 7 : 0;
  return (
    <AbsoluteFill>
      <Plate src={I2('dale_pov_driver_leans_over')} from={{x: 0.5, y: 0.42, z: 1.15}} to={{x: POV_C.x, y: POV_C.y, z: 1.45}} dur={b - a} filter={`brightness(${lit}) saturate(0.7)`} shake={shaking}>
        {POV_EYES.map((e, i) => (
          <Glow key={i} x={e.x} y={e.y} r={0.012} o={eyes} />
        ))}
      </Plate>
    </AbsoluteFill>
  );
};

const StaticScreen: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#050706'}}>
      <svg width="100%" height="100%" style={{position: 'absolute', inset: 0}}>
        <filter id="tvnoise">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed={frame % 50} />
          <feColorMatrix values="0 0 0 0 0.85  0 0 0 0 0.95  0 0 0 0 0.9  0 0 0 0.6 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#tvnoise)" />
      </svg>
      <AbsoluteFill style={{background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.35) 0px, rgba(0,0,0,0.35) 2px, rgba(0,0,0,0) 2px, rgba(0,0,0,0) 5px)'}} />
      <div style={{position: 'absolute', left: 54, top: 250, fontFamily: MONO, color: C.fluor, fontSize: 46, letterSpacing: 2}}>CH 2  DALE</div>
      <div style={{position: 'absolute', width: '100%', top: 880, textAlign: 'center', fontFamily: MONO, color: C.fluor, fontSize: 70, letterSpacing: 8, opacity: Math.floor(frame / 8) % 2 ? 1 : 0.35}}>NO SIGNAL</div>
    </AbsoluteFill>
  );
};

// POV full: the tall one kneeling over the camera, flashlight flicker.
const PovFull: React.FC<{a: number; b: number}> = ({a, b}) => {
  const t = useT();
  const frame = useCurrentFrame();
  const fl = random(`pf${Math.floor(frame / 2)}`) > 0.86 ? 0.55 : 1;
  const desat = interpolate(t, [L(phrase('You told him to run.').s, a), L(phrase('You told him to run.').s, a) + 1.5], [1, 0.45], clamp);
  return (
    <Plate src={I2('dale_pov_driver_leans_over')} from={{x: 0.5, y: 0.46, z: 1.0}} to={{x: POV_C.x, y: POV_C.y + 0.02, z: 1.3}} dur={b - a} filter={`brightness(${fl}) saturate(${desat})`}>
      {POV_EYES.map((e, i) => (
        <Glow key={i} x={e.x} y={e.y} r={0.01} o={0.9} />
      ))}
    </Plate>
  );
};

// "You rewind": the RUN branch plays backwards on the monitor, landing on the door again.
const REW_SEQ = [I2('dale_pov_driver_leans_over'), I1('level3_wide_empty'), I2('stair_handle_turns_inside'), I2('dale_runs_from_door'), I1('operator_booth_shocked_closeup'), I1('driver_stairwell_glass_dale')];
const Rewind: React.FC<{a: number; b: number}> = ({a, b}) => {
  const t = useT();
  const dur = Math.min(1.8, b - a);
  const i = Math.min(REW_SEQ.length - 1, Math.floor((t / dur) * REW_SEQ.length));
  const done = t >= dur;
  const mins = 23 * 60 + 6 - 2 * Math.min(1, t / dur);
  return (
    <Cctv cam="CAM 3-S  STAIRWELL" clock={clockStr(mins, (1 - Math.min(1, t / dur)) * 50)} rew={!done}>
      <Plate src={REW_SEQ[i]} from={{x: 0.5, y: 0.45, z: 1.05}} dur={1} />
      {!done ? <AbsoluteFill style={{background: `repeating-linear-gradient(0deg, rgba(217,242,230,0) 0px, rgba(217,242,230,0) ${40 + (t * 900) % 60}px, rgba(217,242,230,0.14) ${42 + (t * 900) % 60}px, rgba(217,242,230,0) ${48 + (t * 900) % 60}px)`}} /> : null}
    </Cctv>
  );
};

// Swap beat: dark cabin, then two amber dots inside the cap shadow.
const SwapBeat: React.FC<{a: number; b: number}> = ({a, b}) => {
  const t = useT();
  const black = interpolate(t, [0, 0.15, 0.7, 2.2], [0, 1, 1, 0.25], clamp);
  const eyes = interpolate(t, [L(DIFF.s, a) - 0.2, L(DIFF.s, a) + 0.5], [0, 1], clamp);
  const blink = Math.abs(t - (L(DIFF.e, a) + 0.4)) < 0.07 ? 0 : 1;
  return (
    <AbsoluteFill>
      <Plate src={I2('dale_in_dark_driver_face_a')} from={{x: 0.55, y: 0.52, z: 1.6}} to={{x: 0.59, y: 0.54, z: 2.4}} dur={b - a} shake={1.5}>
        <div style={{position: 'absolute', inset: 0, background: `rgba(0,0,0,${black * 0.85})`}} />
        <Glow x={0.581} y={0.539} r={0.0045} o={eyes * blink} />
        <Glow x={0.599} y={0.539} r={0.0045} o={eyes * blink} />
      </Plate>
      <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 48%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.7) 100%)'}} />
    </AbsoluteFill>
  );
};

const Waving: React.FC<{a: number; b: number}> = ({a, b}) => {
  const t = useT();
  const glow = 0.75 + 0.25 * Math.sin(t * 4);
  return (
    <AbsoluteFill>
      <Plate src={I2('dale_in_sedan_driver_face')} from={{x: 0.56, y: 0.54, z: 1.8}} to={{x: 0.598, y: 0.545, z: 2.9}} dur={b - a} shake={1}>
        <Glow x={0.587} y={0.546} r={0.004} o={glow} />
        <Glow x={0.609} y={0.546} r={0.004} o={glow} />
      </Plate>
      <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 48%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.6) 100%)'}} />
    </AbsoluteFill>
  );
};

// Sedan backs out with no brake lights: bay 31 -> bay 12 (swap on "Back to bay twelve").
const Reverse: React.FC<{a: number; b: number}> = ({a, b}) => {
  const t = useT();
  const swap = L(BAY12.s, a) - 0.1;
  const cam = {from: {x: 0.55, y: 0.53, z: 1.3}, to: {x: 0.45, y: 0.54, z: 1.3}, dur: b - a};
  return (
    <Cctv cam="CAM 3-A  LEVEL 3" clock={clockStr(23 * 60 + 11, 20 + t)}>
      {t < swap ? (
        <Plate src={I1('level3_wide_car')} {...cam}>
          <Bracket x={0.79} y={0.545} w={0.3} h={0.12} start={0.3} label="BAY 31" />
        </Plate>
      ) : (
        <Plate src={I1('level3_wide_car_bay12')} {...cam}>
          <Bracket x={0.275} y={0.545} w={0.46} h={0.13} start={swap + 0.1} label="BAY 12" />
        </Plate>
      )}
    </Cctv>
  );
};

/* ---------------- logbook (rows 3 and 4) ---------------- */
const LogCell: React.FC<{txt: string; col: number; row: number; reveal?: number; color?: string; size?: number; font?: string; dx?: number}> = ({txt, col, row, reveal = 1, color = '#15130f', size = 62, font = HAND, dx = 0}) => {
  const p = cellPos(col, row);
  return (
    <div style={{position: 'absolute', left: `${(p.x + dx) * 100}%`, top: `${(p.y + dx * Math.tan((ANGLE * Math.PI) / 180) * (1350 / 2418)) * 100}%`, transform: `translate(-50%, -52%) rotate(${ANGLE}deg)`, fontFamily: font, fontSize: size, color, whiteSpace: 'nowrap', clipPath: `inset(-20% ${(1 - reveal) * 100}% -20% 0)`}}>
      {txt}
    </div>
  );
};
const Logbook: React.FC<{a: number; b: number; mode: 'dale' | 'you'}> = ({a, b, mode}) => {
  const t = useT();
  const w = (i: number, s: number, d: number) => interpolate(t, [s + d * i, s + d * (i + 1)], [0, 1], clamp);
  const ws = mode === 'dale' ? L(SIX.s, a) + 0.4 : -10;
  const wd = mode === 'dale' ? (L(BAYS.e, a) + 0.6 - ws) / 4 : 0.1;
  const you = mode === 'you';
  const cam = you ? {from: {x: 0.52, y: 0.38, z: 1.22}, to: {x: 0.55, y: 0.4, z: 1.38}} : {from: {x: 0.48, y: 0.36, z: 1.3}, to: {x: 0.48, y: 0.38, z: 1.42}};
  const r4 = cellPos(2, 4);
  return (
    <Plate src={I1('logbook_blank')} {...cam} dur={b - a}>
      {['TIME', 'FROM', 'TO'].map((h, i) => (
        <LogCell key={h} txt={h} col={i} row={0} font={TYPE} size={44} color="#3b3226" />
      ))}
      <LogCell txt="10:00 PM" col={0} row={1} color="rgba(40,52,90,0.7)" size={58} />
      <LogCell txt="Bay 7" col={1} row={1} color="rgba(40,52,90,0.7)" size={58} />
      <LogCell txt="Bay 12" col={2} row={1} color="rgba(40,52,90,0.7)" size={58} />
      <LogCell txt="11:00 PM" col={0} row={2} />
      <LogCell txt="Bay 12" col={1} row={2} />
      <LogCell txt="Bay 31" col={2} row={2} />
      <LogCell txt="6:00 AM" col={0} row={3} reveal={w(0, ws, wd)} />
      <LogCell txt="Bay 31" col={1} row={3} reveal={w(1, ws, wd)} />
      <LogCell txt="Bay 12 - Dale" col={2} row={3} dx={0.03} reveal={interpolate(t, [ws + wd * 2, ws + wd * 4], [0, 1], clamp)} />
      {you ? (
        <>
          <LogCell txt="6:01 AM" col={0} row={4} />
          <LogCell txt="Booth" col={1} row={4} />
          <LogCell txt="Level 3 - You" col={2} row={4} dx={0.03} />
          <Ring x={r4.x + 0.03} y={r4.y} w={0.3} h={0.055} start={L(FILLED.s, a)} color={C.red} />
        </>
      ) : null}
    </Plate>
  );
};

// Torn strip under the monitors: Rule 3 written in pen.
const Strip: React.FC<{a: number; b: number}> = ({a, b}) => {
  const t = useT();
  const n = interpolate(t, [L(RULE3.s, a), L(RULE3.e, a)], [0, 1], clamp);
  const body = 'Whoever goes up is logged as a car.';
  const p = interpolate(t, [L(WHOEVER.s, a), L(CAR.e, a)], [0, 1], clamp);
  return (
    <Plate src={I2('rule3_torn_strip')} from={{x: 0.5, y: 0.5, z: 1.45}} to={{x: 0.5, y: 0.53, z: 1.7}} dur={b - a}>
      <div style={{position: 'absolute', left: '36%', width: '28%', top: '40%', fontFamily: HAND, fontWeight: 700, color: '#1b1d1c', transform: 'rotate(-1.5deg)'}}>
        <div style={{fontSize: 120, lineHeight: 1, clipPath: `inset(-10% ${(1 - n) * 100}% -10% 0)`}}>3.</div>
        <div style={{fontSize: 70, lineHeight: 1.05, marginTop: 14}}>{body.slice(0, Math.round(body.length * p))}</div>
      </div>
    </Plate>
  );
};

// Booth door: the tall one in the glass behind you.
const BoothDoor: React.FC<{a: number; b: number}> = ({a, b}) => {
  const t = useT();
  const eyes = interpolate(t, [0.3, 1.0], [0.3, 1], clamp);
  return (
    <AbsoluteFill>
      <Plate src={I2('booth_door_driver_glass')} from={{x: 0.55, y: 0.5, z: 1.05}} to={{x: 0.8, y: 0.42, z: 1.9}} dur={b - a}>
        <Glow x={0.856} y={0.372} r={0.006} o={eyes} />
        <Glow x={0.897} y={0.371} r={0.006} o={eyes} />
      </Plate>
      <AbsoluteFill style={{background: 'radial-gradient(ellipse at 60% 45%, rgba(0,0,0,0) 45%, rgba(0,0,0,0.6) 100%)'}} />
    </AbsoluteFill>
  );
};

// Rules recap: three lines pop in with the voice.
const Recap: React.FC<{a: number; b: number}> = ({a, b}) => {
  const t = useT();
  const rows = [
    {n: 'RULE 1', v: 'FOLLOWED', col: '#3fbf6b', at: L(R1.s, a)},
    {n: 'RULE 2', v: 'BROKEN', col: C.red, at: L(R2.s, a)},
    {n: 'RULE 3', v: 'NOW YOU KNOW', col: C.yellow, at: L(R3B.s, a)},
  ];
  const eyes = interpolate(t, [0, 1], [0.4, 0.9], clamp);
  return (
    <AbsoluteFill>
      <Plate src={I2('booth_door_driver_glass')} from={{x: 0.8, y: 0.42, z: 1.9}} to={{x: 0.84, y: 0.4, z: 2.2}} dur={b - a} filter="brightness(0.35) blur(3px)">
        <Glow x={0.856} y={0.372} r={0.006} o={eyes} />
        <Glow x={0.897} y={0.371} r={0.006} o={eyes} />
      </Plate>
      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'flex-start', paddingLeft: 90, gap: 46}}>
        {rows.map((r, i) => {
          const p = interpolate(t, [r.at, r.at + 0.15], [0, 1], clamp);
          const s = interpolate(t, [r.at, r.at + 0.15], [1.4, 1], clamp);
          return (
            <div key={i} style={{opacity: p, transform: `scale(${s})`, transformOrigin: 'left center', display: 'flex', alignItems: 'baseline', gap: 30}}>
              <span style={{fontFamily: MONO, fontSize: 64, color: C.fluor, letterSpacing: 4}}>{r.n}</span>
              <span style={{fontFamily: HEAVY, fontWeight: 700, fontSize: 104, color: r.col, letterSpacing: 2}}>{r.v}</span>
            </div>
          );
        })}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// THE END: full-screen black, typed letter by letter.
const END_TXT = 'THE END';
const END_T0 = 0.8;
const endTimes = (() => {
  const out: number[] = [];
  let x = END_T0;
  for (let i = 0; i < END_TXT.length; i++) {
    out.push(x);
    x += 0.14 + random(`et${i}`) * 0.1;
  }
  return out;
})();
const TheEnd: React.FC = () => {
  const t = useT();
  const n = endTimes.filter((x) => t >= x).length;
  const last = endTimes[endTimes.length - 1];
  const cursorOn = t < last + 1.2 ? Math.floor(t * 3) % 2 === 0 : false;
  return (
    <AbsoluteFill style={{background: '#000', alignItems: 'center', justifyContent: 'center'}}>
      <div style={{fontFamily: TYPE, fontSize: 230, color: C.laminate, letterSpacing: 14, whiteSpace: 'pre', position: 'relative'}}>
        <span>{END_TXT.slice(0, n)}</span>
        <span style={{opacity: cursorOn ? 1 : 0}}>|</span>
        <span style={{opacity: 0}}>{END_TXT.slice(n)}</span>
      </div>
    </AbsoluteFill>
  );
};

/* ---------------- master scene list ---------------- */
type HudState = {clock: string; nerve: number; log: number; chip?: string; chipRed?: boolean; nerveFrom?: number; logFrom?: number};
type Scene = {a: number; b: number; el: React.ReactNode; captions?: boolean; hud?: HudState | null; flash?: boolean};
const S = (a: number, b: number, el: React.ReactNode, hud: HudState | null, captions = true): Scene => ({a, b, el, hud, captions});
const E1 = 'ENDING 1';
const E2 = 'ENDING 2';
const SCENES: Scene[] = [
  S(0, GETOUT.s - 0.1, <DoorHold a={0} b={GETOUT.s} pick={2} chipsAt={CHOICES.s} />, {clock: '11:04 PM', nerve: 40, log: 1}),
  S(GETOUT.s - 0.1, DOESNT.s - 0.1, <OperatorRadio a={GETOUT.s} b={DOESNT.s} />, {clock: '11:04 PM', nerve: 32, log: 1, nerveFrom: 40, chip: E1}),
  S(DOESNT.s - 0.1, BEHIND.s - 0.1, <Plate src={I2('dale_runs_from_door')} from={{x: 0.5, y: 0.35, z: 1.25}} to={{x: 0.48, y: 0.42, z: 1.6}} dur={BEHIND.s - DOESNT.s} shake={3} />, {clock: '11:05 PM', nerve: 32, log: 1, chip: E1}),
  S(BEHIND.s - 0.1, LIGHTS.s - 0.1, <Plate src={I2('stair_handle_turns_inside')} from={{x: 0.5, y: 0.45, z: 1.05}} to={{x: 0.6, y: 0.32, z: 1.7}} dur={LIGHTS.s - BEHIND.s} />, {clock: '11:05 PM', nerve: 25, log: 1, nerveFrom: 32, chip: E1}),
  S(LIGHTS.s - 0.1, TURNS.s - 0.1, <LightsOut a={LIGHTS.s - 0.1} b={TURNS.s} />, {clock: '11:05 PM', nerve: 15, log: 1, nerveFrom: 25, chip: E1}),
  S(TURNS.s - 0.1, RHITS.s - 0.1, <PovDark a={TURNS.s - 0.1} b={RHITS.s} />, null),
  S(RHITS.s - 0.1, LAST.s - 0.1, <StaticScreen />, {clock: '11:06 PM', nerve: 0, log: 1, nerveFrom: 15, chip: E1, chipRed: true}),
  S(LAST.s - 0.1, REW.s, <PovFull a={LAST.s - 0.1} b={REW.s} />, null),
  S(REW.s, OPENIT.s - 0.1, <Rewind a={REW.s} b={OPENIT.s} />, {clock: '11:04 PM', nerve: 40, log: 1, nerveFrom: 0}),
  S(OPENIT.s - 0.1, PUSHES.s - 0.1, <DoorHold a={OPENIT.s - 0.1} b={PUSHES.s} pick={1} chipsAt={-10} />, {clock: '11:04 PM', nerve: 40, log: 1, chip: E2}),
  S(PUSHES.s - 0.1, CAM.s - 0.1, <Plate src={I2('driver_stairwell_open_door_dale')} from={{x: 0.55, y: 0.45, z: 1.05}} to={{x: 0.43, y: 0.27, z: 2.0}} dur={CAM.s - PUSHES.s}><Glow x={0.4126} y={0.261} r={0.005} o={0.7} /><Glow x={0.446} y={0.261} r={0.005} o={0.7} /></Plate>, {clock: '11:05 PM', nerve: 30, log: 1, nerveFrom: 40, chip: E2}),
  S(CAM.s - 0.1, KEYS.s - 0.1, <Cctv cam="CAM 3-A  LEVEL 3" clock="11:07:12 PM"><Plate src={I1('level3_wide_car')} from={{x: 0.55, y: 0.5, z: 1.2}} to={{x: 0.7, y: 0.53, z: 1.6}} dur={KEYS.s - CAM.s}><Bracket x={0.79} y={0.545} w={0.3} h={0.12} start={1.2} label="BAY 31" /></Plate></Cctv>, {clock: '11:07 PM', nerve: 30, log: 1, chip: E2}),
  S(KEYS.s - 0.1, DONT.s - 0.1, <Plate src={I2('sedan_door_open_keys')} from={{x: 0.42, y: 0.55, z: 1.5}} to={{x: 0.4, y: 0.56, z: 1.75}} dur={DONT.s - KEYS.s} />, {clock: '11:08 PM', nerve: 30, log: 1, chip: E2}),
  S(DONT.s - 0.1, JUST.s - 0.1, <Plate src={I1('operator_booth_seated')} from={{x: 0.47, y: 0.38, z: 1.45}} to={{x: 0.47, y: 0.36, z: 1.75}} dur={JUST.s - DONT.s} />, {clock: '11:08 PM', nerve: 24, log: 1, nerveFrom: 30, chip: E2}),
  S(JUST.s - 0.1, HEADL.s - 0.1, <Plate src={I2('sedan_door_open_keys')} from={{x: 0.4, y: 0.56, z: 1.75}} to={{x: 0.45, y: 0.55, z: 2.2}} dur={HEADL.s - JUST.s} />, {clock: '11:08 PM', nerve: 24, log: 1, chip: E2}),
  S(HEADL.s - 0.1, BACKS.s - 0.1, <SwapBeat a={HEADL.s - 0.1} b={BACKS.s} />, {clock: '11:09 PM', nerve: 12, log: 1, nerveFrom: 24, chip: E2}),
  S(BACKS.s - 0.1, GLASS.s - 0.1, <Reverse a={BACKS.s - 0.1} b={GLASS.s} />, {clock: '11:11 PM', nerve: 12, log: 1, chip: E2}),
  S(GLASS.s - 0.1, SIX.s - 0.1, <Waving a={GLASS.s - 0.1} b={SIX.s} />, null),
  S(SIX.s - 0.1, UNDER.s - 0.1, <Logbook a={SIX.s - 0.1} b={UNDER.s} mode="dale" />, {clock: '6:00 AM', nerve: 12, log: 2, logFrom: 1}, false),
  S(UNDER.s - 0.1, LINE.s - 0.1, <Strip a={UNDER.s - 0.1} b={LINE.s} />, {clock: '6:00 AM', nerve: 10, log: 2, nerveFrom: 12, chip: 'RULE 3'}),
  S(LINE.s - 0.1, BOOTH.s - 0.1, <Logbook a={LINE.s - 0.1} b={BOOTH.s} mode="you" />, {clock: '6:01 AM', nerve: 10, log: 3, logFrom: 2}, false),
  S(BOOTH.s - 0.1, R1.s - 0.1, <BoothDoor a={BOOTH.s - 0.1} b={R1.s} />, {clock: '6:01 AM', nerve: 3, log: 3, nerveFrom: 10, chip: 'RULE 3', chipRed: true}),
  S(R1.s - 0.1, END_AT, <Recap a={R1.s - 0.1} b={END_AT} />, null, false),
  S(END_AT, S1P2_TOTAL, <TheEnd />, null, false),
];

/* ---------------- HUD driver ---------------- */
const HudLayer: React.FC = () => {
  const t = useT();
  const sc = SCENES.find((s) => t >= s.a && t < s.b);
  if (!sc || !sc.hud) return null;
  const h = sc.hud;
  const k = interpolate(t - sc.a, [0.1, 0.7], [0, 1], clamp);
  const nerve = h.nerveFrom !== undefined ? h.nerveFrom + (h.nerve - h.nerveFrom) * k : h.nerve;
  const nerveFlash = h.nerveFrom !== undefined ? interpolate(t - sc.a, [0, 0.15, 0.9], [0, 1, 0], clamp) : 0;
  const logAt = 1.2;
  const logFlash = h.logFrom !== undefined ? interpolate(t - sc.a, [logAt, logAt + 0.15, logAt + 0.9], [0, 1, 0], clamp) : 0;
  const log = h.logFrom !== undefined && t - sc.a < logAt ? h.logFrom : h.log;
  return <Hud clock={h.clock} nerve={nerve} log={log} chip={h.chip} chipRed={h.chipRed} nerveFlash={nerveFlash} logFlash={logFlash} />;
};

/* ---------------- audio ---------------- */
type Sfx = {at: number; file: string; vol: number; dur?: number};
const X = (f: string) => `rz2/audio/sfx/${f}.wav`;
const radioLines = (VO.pieces as {at: number; dur: number; role: string}[]).filter((p) => p.role !== 'nar');
const SFX: Sfx[] = [
  {at: 0.6, file: X('sfx_knock'), vol: 0.22},
  {at: CHOICES.s + 0.2, file: 'rz1/audio/sfx/pop.wav', vol: 0.5},
  {at: CHOICES.s + 0.55, file: 'rz1/audio/sfx/pop.wav', vol: 0.5},
  ...radioLines.map((p) => ({at: p.at - 0.18, file: X('sfx_radio_click'), vol: 0.35})),
  ...radioLines.filter((p) => p.role === 'dale').map((p) => ({at: p.at, file: X('sfx_radio_static'), vol: 0.12, dur: p.dur})),
  {at: DOESNT.s + 0.6, file: X('sfx_footsteps_run'), vol: 0.32},
  {at: BEHIND.s + 0.3, file: X('sfx_door_handle'), vol: 0.3},
  {at: TURNS.s - 0.1, file: 'rz1/audio/sfx/drone_hit.wav', vol: 0.5},
  {at: TWO.s, file: X('sfx_heartbeat_loop'), vol: 0.25},
  {at: RHITS.s + 0.6, file: X('sfx_radio_static_long'), vol: 0.32},
  {at: LAST.s - 0.1, file: X('sfx_stinger'), vol: 0.55},
  {at: REW.s, file: X('sfx_rewind'), vol: 0.4},
  {at: OPENIT.s - 0.1, file: 'rz1/audio/sfx/pop.wav', vol: 0.4},
  {at: SWINGS.s - 0.1, file: X('sfx_door_creak_open'), vol: 0.35},
  {at: TALL.s, file: 'rz1/audio/sfx/drone_hit.wav', vol: 0.45},
  {at: CLOSES.s + 0.3, file: X('sfx_door_close'), vol: 0.3},
  {at: CAM.s - 0.1, file: 'rz1/audio/sfx/beep.wav', vol: 0.3},
  {at: SHUTS.s, file: X('sfx_car_door_close'), vol: 0.4},
  {at: HEADL.s + 0.3, file: X('sfx_light_clunk'), vol: 0.35},
  {at: BACKS.s + 0.3, file: X('sfx_reverse_beep'), vol: 0.18},
  {at: UNDER.s - 0.05, file: X('sfx_paper_tear'), vol: 0.3},
  {at: FILLED.s, file: 'rz1/audio/sfx/drone_hit.wav', vol: 0.45},
  {at: BOOTH.s - 0.1, file: X('sfx_stinger'), vol: 0.5},
  {at: R1.s, file: 'rz1/audio/sfx/stamp.wav', vol: 0.45},
  {at: R2.s, file: 'rz1/audio/sfx/stamp.wav', vol: 0.45},
  {at: R3B.s, file: 'rz1/audio/sfx/stamp.wav', vol: 0.45},
  ...endTimes.filter((_, i) => END_TXT[i] !== ' ').map((x, i) => ({at: END_AT + x, file: X(`sfx_typewriter_key_${(i % 3) + 1}`), vol: 0.45})),
  {at: END_AT + endTimes[endTimes.length - 1] + 0.25, file: X('sfx_typewriter_tail'), vol: 0.35},
  {at: END_AT + endTimes[endTimes.length - 1] + 1.2, file: X('sfx_power_down'), vol: 0.3},
];
// Light rows going out (4 clunks) and the last power down.
const lightSteps = [0, 1, 2, 3].map((k) => LIGHTS.s + 0.3 + k * ((ROW.e + 0.3 - LIGHTS.s) / 4));
lightSteps.forEach((x, i) => SFX.push({at: x, file: X(i === 3 ? 'sfx_power_down' : 'sfx_light_clunk'), vol: 0.3}));

const bedVol = (f: number) => {
  const t = f / FPS;
  const base = 0.1;
  const fadeIn = interpolate(t, [0, 1.0], [0.5, 1], clamp);
  const lift = interpolate(t, [TURNS.s - 1, TURNS.s, REW.s, REW.s + 1], [1, 1.35, 1.35, 1], clamp);
  const lift2 = interpolate(t, [BOOTH.s - 1, BOOTH.s], [1, 1.3], clamp);
  const out = interpolate(t, [S1P2_TOTAL - 3, S1P2_TOTAL], [1, 0], clamp);
  return base * fadeIn * lift * lift2 * out;
};
const whisperVol = (f: number) => {
  const t = f / FPS;
  return 0.05 * interpolate(t, [0, 2], [0, 1], clamp);
};

const Audio: React.FC = () => (
  <>
    <Html5Audio src={staticFile('rz2/audio/bed.wav')} volume={bedVol} />
    <Sequence from={sf(LIGHTS.s)} durationInFrames={sf(REW.s - LIGHTS.s)} layout="none">
      <Html5Audio src={staticFile('rz2/audio/sfx/bed_whispers.wav')} volume={whisperVol} />
    </Sequence>
    <Sequence from={sf(SIX.s)} durationInFrames={sf(END_AT - SIX.s)} layout="none">
      <Html5Audio src={staticFile('rz2/audio/sfx/bed_whispers.wav')} volume={whisperVol} />
    </Sequence>
    <Sequence from={sf(HEADL.s)} durationInFrames={sf(SIX.s - HEADL.s)} layout="none">
      <Html5Audio src={staticFile('rz2/audio/sfx/heartbeat_14s.wav')} volume={(f) => 0.12 + 0.18 * Math.min(1, f / (FPS * 6))} />
    </Sequence>
    {(VO.pieces as {file: string; src: number; at: number; dur: number}[]).map((p, i) => (
      <Sequence key={i} from={sf(p.at)} durationInFrames={sf(p.dur) + 2} layout="none">
        <Html5Audio src={staticFile(p.file)} trimBefore={sf(p.src)} volume={1} />
      </Sequence>
    ))}
    {SFX.map((s, i) => (
      <Sequence key={`s${i}`} from={Math.max(0, sf(s.at))} durationInFrames={s.dur ? sf(s.dur) : sf(6)} layout="none">
        <Html5Audio src={staticFile(s.file)} volume={s.vol} />
      </Sequence>
    ))}
  </>
);

/* ---------------- composition ---------------- */
export const S1P2: React.FC = () => {
  const capHidden = (t: number) => {
    const sc = SCENES.find((s) => t >= s.a && t < s.b);
    return !sc || sc.captions === false;
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
