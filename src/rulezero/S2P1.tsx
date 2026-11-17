// Rule Zero - Series 2 "Headcount" - Part 1 (v5: intercom / building-speaker structure). Vertical 1080x1920, 24 fps.
// Voice timing: s2p1_voice.json (built by build_s2p1.py). Script: Narration/rule_zero_s2p1_headcount_narration_v5.md
import React from 'react';
import {AbsoluteFill, Html5Audio, interpolate, random, Sequence, staticFile, useCurrentFrame} from 'remotion';
import VO from './s2p1_voice.json';
import {C, Captions, clamp, CutFlash, FPS, HAND, HEAVY, MONO, Plate, sf, useT, Word} from './rzkit';
import {TitleCard} from './cards';

const WORDS = VO.words as Word[];
const AR = 2752 / 1536;
const cl = (x: string) => x.toLowerCase().replace(/[^a-z0-9'-]/g, '');
const phrase = (p: string, after = -1) => {
  const s = p.split(' ').map(cl);
  for (let i = 0; i + s.length <= WORDS.length; i++) {
    if (WORDS[i].s < after) continue;
    if (s.every((x, k) => cl(WORDS[i + k].w) === x)) return {s: WORDS[i].s, e: WORDS[i + s.length - 1].e};
  }
  throw new Error('phrase not found: ' + p);
};
const IMG = (n: string) => `rz3/img/${n}.jpg`;
const P = (id: string) => VO.pieces.find((p) => p.id === id)!;
const PB = P('B1').at, PW1 = P('W1').at, PC = P('C').at, PW2 = P('W2').at;
const W1END = PW1 + P('W1').dur, W2END = PW2 + P('W2').dur;

/* ---------------- anchors ---------------- */
const ASLEEP = phrase("You're still asleep.");
const STOPPING = phrase('The alarm stopping');
const THROUGH = phrase('Through the glass wall,');
const LOOKING = phrase('Looking up at your floor.');
const TITLE_AT = LOOKING.e + 0.2;
const FAR = phrase('At the far end,');
const PRESS = phrase('You press the intercom.');
const PICKS = phrase('It picks up.');
const SIX = phrase('Floor six is lit.');
const NEVER = phrase('You never saw it move.');
const BREATH = phrase('Your breath fogs the glass');
const RULE1 = phrase('It only counts in the dark.');
const RULE2 = phrase('Stay under the green exit light.');
const RULE3 = phrase("If it says it's yours, it isn't.");
const EIGHT = phrase('Eight.', RULE3.e);
const CHALK = phrase('Chalk dust under');
const BELOW = phrase('Below the rules,');
const TALLY = phrase('four tally marks.', BELOW.s);
const COUNTED = phrase("You've been counted four times.");
const THATS = phrase("That's your hand scratching.");
const REMEMBER = phrase("You don't remember any of them.");
const NINE = phrase('Nine.');
const CLICKS = phrase('The stairwell door clicks.');
const TEN = phrase('Ten.');
const DARK = phrase("This time the lights don't come back.");
const LASTL = phrase('One light left.');
const ELEVEN = phrase('Eleven.');
const RTWO = phrase('Rule two says');
const RTHREE = phrase('Rule three says');
const BOTH = phrase('You wrote both.');
const SODO = phrase('So do you step out');
const STEPW = phrase('step out');
const STAYW = phrase('stay in the light?');
export const S2P1_TOTAL = VO.voiceEnd + 4.0;
export const S2P1_LEN = sf(S2P1_TOTAL);
const L = (x: number, a: number) => x - a;

/* ---------------- overlays ---------------- */
const Rain: React.FC<{o?: number}> = ({o = 0.5}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{opacity: o, overflow: 'hidden', pointerEvents: 'none'}}>
      {Array.from({length: 70}).map((_, i) => {
        const x = random(`rx${i}`) * 1200 - 60;
        const len = 80 + random(`rl${i}`) * 140;
        const sp = 38 + random(`rs${i}`) * 30;
        const y = ((random(`ry${i}`) * 2200 + frame * sp) % 2300) - 200;
        return <div key={i} style={{position: 'absolute', left: x, top: y, width: 3, height: len, background: 'linear-gradient(180deg, rgba(200,215,225,0), rgba(200,215,225,0.55))', transform: 'rotate(8deg)'}} />;
      })}
    </AbsoluteFill>
  );
};

const RedPulse: React.FC<{until?: number; base?: number}> = ({until = 999, base = 0.28}) => {
  const t = useT();
  if (t > until) return null;
  const k = base * (0.55 + 0.45 * Math.sin(t * 9));
  return <AbsoluteFill style={{background: `radial-gradient(ellipse at 25% 15%, rgba(255,30,30,${k * 1.6}) 0%, rgba(229,72,77,${k * 0.5}) 45%, rgba(0,0,0,0) 80%)`, mixBlendMode: 'screen'}} />;
};

const Flicker: React.FC<{from?: number; to?: number; amt?: number}> = ({from = 0, to = 999, amt = 0.55}) => {
  const t = useT();
  const frame = useCurrentFrame();
  if (t < from || t > to) return null;
  const on = random(`fk${Math.floor(frame / 2)}`) > 0.62;
  return <AbsoluteFill style={{background: '#000', opacity: on ? amt : 0}} />;
};

const FloorPlate: React.FC<{vals: {at: number; n: string}[]; x?: number; y?: number; w?: number; h?: number}> = ({vals, x = 0.31, y = 0.17, w = 0.34, h = 0.06}) => {
  const t = useT();
  let cur = vals[0];
  vals.forEach((v) => {
    if (t >= v.at) cur = v;
  });
  const p = interpolate(t, [cur.at, cur.at + 0.16], [0, 1], clamp);
  return (
    <div style={{position: 'absolute', left: `${x * 100}%`, top: `${y * 100}%`, width: `${w * 100}%`, height: `${h * 100}%`, overflow: 'hidden', background: '#1b221f', border: '3px solid #0b0f0d', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <div style={{fontFamily: MONO, fontSize: 108, fontWeight: 700, color: C.amber, textShadow: '0 0 18px rgba(242,163,58,0.55)', transform: `translateY(${(1 - p) * 90}px)`, opacity: 0.3 + 0.7 * p, lineHeight: 1}}>{cur.n}</div>
    </div>
  );
};

const Fog: React.FC<{s: number; e: number}> = ({s, e}) => {
  const t = useT();
  const p = interpolate(t, [s, e], [0, 1], clamp);
  if (p <= 0) return null;
  return (
    <div style={{position: 'absolute', inset: 0, opacity: 0.7 * p, background: `radial-gradient(ellipse at 50% 38%, rgba(214,226,222,${0.55 * p}) 0%, rgba(190,205,200,${0.5 * p}) ${30 + 55 * p}%, rgba(170,185,180,0) ${40 + 60 * p}%)`, filter: 'blur(6px)', mixBlendMode: 'screen'}} />
  );
};

// A rule wiped through the fog: clear glass strokes with a bright wet edge, plus a couple of drips.
const Scratch: React.FC<{n: string; text: string; s: number; e: number; y: number; hot?: number; red?: number}> = ({n, text, s, e, y, hot, red}) => {
  const t = useT();
  const p = interpolate(t, [s, Math.max(s + 0.3, e)], [0, 1], clamp);
  if (p <= 0) return null;
  const isHot = hot !== undefined && t >= hot;
  const isRed = red !== undefined && t >= red;
  const tint = isRed ? 'rgba(229,72,77,0.95)' : isHot ? 'rgba(255,210,63,0.95)' : 'rgba(6,10,10,0.9)';
  const edge = isRed ? 'rgba(255,150,150,0.9)' : isHot ? 'rgba(255,235,150,0.9)' : 'rgba(235,245,240,0.85)';
  const drip = interpolate(t, [s + 0.4, s + 2.5], [0, 1], clamp);
  return (
    <div style={{position: 'absolute', left: '5%', width: '90%', top: `${y * 100}%`, textAlign: 'center', clipPath: `inset(-20% ${(1 - p) * 100}% -60% 0)`}}>
      <div style={{fontFamily: HAND, fontWeight: 700, fontSize: 78, lineHeight: 1.05, color: tint, textShadow: `0 1.5px 0 ${edge}, 0 -1px 0 ${edge}, 0 0 8px ${edge}`, filter: 'blur(0.5px)', whiteSpace: 'nowrap'}}>
        {n} {text}
      </div>
      <div style={{position: 'absolute', left: '22%', top: '88%', width: 3, height: 70 * drip, background: edge, opacity: 0.5, borderRadius: 3}} />
      <div style={{position: 'absolute', left: '61%', top: '88%', width: 3, height: 44 * drip, background: edge, opacity: 0.45, borderRadius: 3}} />
    </div>
  );
};

const Tally: React.FC<{times: number[]; x: number; y: number}> = ({times, x, y}) => {
  const t = useT();
  return (
    <div style={{position: 'absolute', left: `${x * 100}%`, top: `${y * 100}%`, width: '34%', height: '9%'}}>
      <svg viewBox="0 0 200 100" style={{width: '100%', height: '100%', overflow: 'visible'}}>
        {times.map((ts, i) => {
          const p = interpolate(t, [ts, ts + 0.25], [0, 1], clamp);
          const x0 = 18 + i * 48;
          return p > 0 ? <line key={i} x1={x0} y1={8} x2={x0 + (i % 2 ? 3 : -2)} y2={8 + 86 * p} stroke="rgba(238,247,242,0.95)" strokeWidth={9} strokeLinecap="round" style={{filter: 'drop-shadow(0 0 5px rgba(220,235,230,0.6))'}} /> : null;
        })}
      </svg>
    </div>
  );
};

const RedDoor: React.FC<{from: number}> = ({from}) => {
  const t = useT();
  const p = interpolate(t, [from, from + 1.4], [0, 1], clamp);
  return <AbsoluteFill style={{background: `radial-gradient(ellipse at 50% 48%, rgba(255,25,25,${0.55 * p}) 0%, rgba(160,0,0,${0.3 * p}) 35%, rgba(0,0,0,0) 70%)`, mixBlendMode: 'screen'}} />;
};


// Ending: camera follows the choice. "step out" pushes toward the red door, "stay in the light" tilts up to the green exit sign.
// Chips live in image space so they ride with the camera: STEP OUT under the door, STAY above the sign.
const ImgChip: React.FC<{label: string; at: number; color: string; x: number; y: number; up?: boolean; textColor?: string}> = ({label, at, color, x, y, up, textColor = C.ink}) => {
  const t = useT();
  const p = interpolate(t, [at, at + 0.22], [0, 1], clamp);
  if (p <= 0) return null;
  const sc = p < 1 ? 0.6 + 0.5 * p : 1 + Math.max(0, 0.08 - (t - at - 0.22) * 0.4);
  return (
    <div style={{position: 'absolute', left: `${x * 100}%`, top: `${y * 100}%`, transform: `translate(-50%, -50%) scale(${sc})`, display: 'flex', flexDirection: up ? 'column' : 'column-reverse', alignItems: 'center'}}>
      <div style={{background: color, color: textColor, fontFamily: HEAVY, fontWeight: 700, fontSize: 72, letterSpacing: 3, padding: '12px 40px', borderRadius: 999, boxShadow: '0 10px 30px rgba(0,0,0,0.6)', whiteSpace: 'nowrap'}}>{label}</div>
      <div style={{width: 7, height: 70, background: color, borderRadius: 4}} />
      <div style={{width: 22, height: 22, borderRadius: 11, background: color, marginTop: up ? -4 : 0, marginBottom: up ? 0 : -4}} />
    </div>
  );
};
const ForkNote: React.FC<{at: number}> = ({at}) => {
  const t = useT();
  return <div style={{position: 'absolute', left: 0, right: 0, top: 1640, textAlign: 'center', fontFamily: MONO, fontSize: 34, letterSpacing: 3, color: C.fluor, opacity: interpolate(t, [at, at + 0.4], [0, 0.85], clamp)}}>COMMENT · THE MAJORITY WRITES PART 2</div>;
};

const Speaker: React.FC<{s: number; e: number}> = ({s, e}) => {
  const t = useT();
  const on = t >= s && t <= e;
  const k = on ? 0.5 + 0.5 * Math.abs(Math.sin(t * 40)) : 0;
  return <AbsoluteFill style={{background: `radial-gradient(ellipse at 50% 45%, rgba(255,40,40,${0.12 * k}) 0%, rgba(0,0,0,0) 65%)`, mixBlendMode: 'screen'}} />;
};

const FadeIn: React.FC<{a: number; b: number; children: React.ReactNode}> = ({a, b, children}) => {
  const t = useT();
  return <AbsoluteFill style={{opacity: interpolate(t, [a, b], [0, 1], clamp)}}>{children}</AbsoluteFill>;
};
const FogFade: React.FC = () => {
  const t = useT();
  return <AbsoluteFill style={{background: `rgba(220,235,230,${interpolate(t, [0, 3.5], [0.28, 0], clamp)})`}} />;
};

/* ---------------- scenes ---------------- */
type Scene = {a: number; b: number; el: React.ReactNode; captions?: boolean; flash?: boolean};
const SCENES: Scene[] = [];
const add = (a: number, b: number, el: React.ReactNode, captions = true, flash = true) => SCENES.push({a, b, el, captions, flash});

// A: hook
add(0, ASLEEP.s, (
  <AbsoluteFill>
    <Plate src={IMG('C2')} ar={AR} from={{x: 0.5, y: 0.5, z: 1.0}} to={{x: 0.5, y: 0.55, z: 1.14}} dur={ASLEEP.s} shake={7} />
    <RedPulse />
  </AbsoluteFill>
));
add(ASLEEP.s, THROUGH.s, (
  <AbsoluteFill>
    <Plate src={IMG('C1')} ar={AR} from={{x: 0.5, y: 0.5, z: 1.0}} to={{x: 0.58, y: 0.6, z: 1.2}} dur={THROUGH.s - ASLEEP.s} />
    <RedPulse until={L(STOPPING.e, ASLEEP.s)} base={0.3} />
    <Flicker amt={0.3} from={L(STOPPING.s, ASLEEP.s)} to={L(STOPPING.e, ASLEEP.s) + 0.4} />
  </AbsoluteFill>
));
add(THROUGH.s, TITLE_AT, (
  <AbsoluteFill>
    <Plate src={IMG('C3')} ar={AR} from={{x: 0.5, y: 0.45, z: 1.0}} to={{x: 0.5, y: 0.6, z: 1.18}} dur={TITLE_AT - THROUGH.s} />
    <Rain o={0.45} />
    <AbsoluteFill style={{background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(0,0,0,0.6) 100%)'}} />
  </AbsoluteFill>
));
add(TITLE_AT, PB - 0.1, <TitleCard series="SERIES 2" part="PART 1: HEADCOUNT" />, false);

// B: intercom
add(PB - 0.1, FAR.s, (
  <AbsoluteFill>
    <Plate src={IMG('C4')} ar={AR} from={{x: 0.5, y: 0.5, z: 1.0}} to={{x: 0.5, y: 0.5, z: 1.2}} dur={FAR.s - PB} />
    <Flicker from={0.1} to={4.5} />
  </AbsoluteFill>
));
add(FAR.s, PRESS.s, (
  <AbsoluteFill>
    <Plate src={IMG('C5')} ar={AR} from={{x: 0.5, y: 0.5, z: 1.0}} to={{x: 0.5, y: 0.45, z: 1.22}} dur={PRESS.s - FAR.s} />
    <Flicker amt={0.35} />
  </AbsoluteFill>
));
add(PRESS.s, PW1 - 0.1, (
  <AbsoluteFill>
    <Plate src={IMG('C13')} ar={AR} from={{x: 0.5, y: 0.5, z: 1.0}} to={{x: 0.5, y: 0.46, z: 1.12}} dur={PW1 - PRESS.s} />
    <Flicker amt={0.3} from={L(PICKS.s, PRESS.s)} />
  </AbsoluteFill>
));
add(PW1 - 0.1, W1END + 0.3, (
  <AbsoluteFill>
    <Plate src={IMG('C5')} ar={AR} from={{x: 0.5, y: 0.45, z: 1.22}} to={{x: 0.5, y: 0.4, z: 1.45}} dur={W1END + 0.4 - PW1} />
    <RedPulse base={0.35} />
    <Speaker s={0.1} e={W1END - PW1 + 0.1} />
  </AbsoluteFill>
));
add(W1END + 0.3, SIX.s, (
  <AbsoluteFill>
    <Plate src={IMG('C14')} ar={AR} from={{x: 0.5, y: 0.5, z: 1.0}} to={{x: 0.5, y: 0.55, z: 1.15}} dur={SIX.s - W1END} />
    <Flicker amt={0.45} />
  </AbsoluteFill>
));
add(SIX.s, PC, (
  <AbsoluteFill>
    <Plate src={IMG('C6')} ar={AR} from={{x: 0.5, y: 0.45, z: 1.0}} to={{x: 0.5, y: 0.32, z: 1.3}} dur={PC - SIX.s}>
      <FloorPlate vals={[{at: 0, n: '6'}]} />
    </Plate>
    <Flicker amt={0.5} from={L(NEVER.s, SIX.s)} to={L(NEVER.e, SIX.s) + 0.6} />
  </AbsoluteFill>
));

// C: rules in the glass
add(PC, EIGHT.s, (
  <AbsoluteFill>
    <Plate src={IMG('C15')} ar={AR} from={{x: 0.5, y: 0.5, z: 1.0}} to={{x: 0.5, y: 0.42, z: 1.12}} dur={EIGHT.s - PC}>
      <Fog s={L(BREATH.s, PC)} e={L(BREATH.e, PC)} />
      <Scratch n="1." text="It only counts in the dark." s={L(RULE1.s, PC)} e={L(RULE1.e, PC)} y={0.20} />
      <Scratch n="2." text="Stay under the green exit light." s={L(RULE2.s, PC)} e={L(RULE2.e, PC)} y={0.30} />
      <Scratch n="3." text="If it says it's yours, it isn't." s={L(RULE3.s, PC)} e={L(RULE3.e, PC)} y={0.40} />
    </Plate>
    <FogFade />
  </AbsoluteFill>
));
add(EIGHT.s, CHALK.s, (
  <AbsoluteFill>
    <Plate src={IMG('C17')} ar={AR} from={{x: 0.5, y: 0.5, z: 1.0}} to={{x: 0.5, y: 0.36, z: 1.3}} dur={CHALK.s - EIGHT.s} />
    <Flicker amt={0.3} from={0.2} to={0.9} />
  </AbsoluteFill>
));
add(CHALK.s, THATS.s, (
  <AbsoluteFill>
    <Plate src={IMG('C20')} ar={AR} from={{x: 0.5, y: 0.5, z: 1.0}} to={{x: 0.55, y: 0.36, z: 1.3}} dur={THATS.s - CHALK.s} />
    <Flicker amt={0.25} from={0.3} to={1.2} />
  </AbsoluteFill>
));
add(THATS.s, BELOW.s, (
  <AbsoluteFill>
    <Plate src={IMG('C19')} ar={AR} from={{x: 0.55, y: 0.3, z: 1.15}} to={{x: 0.5, y: 0.62, z: 1.2}} dur={BELOW.s - THATS.s} />
  </AbsoluteFill>
));
add(BELOW.s, REMEMBER.s, (
  <AbsoluteFill>
    <Plate src={IMG('C8')} ar={AR} from={{x: 0.5, y: 0.5, z: 1.0}} to={{x: 0.5, y: 0.5, z: 1.08}} dur={REMEMBER.s - BELOW.s}>
      <Tally x={0.33} y={0.80} times={[L(TALLY.s, BELOW.s), L(TALLY.s + (TALLY.e - TALLY.s) * 0.5, BELOW.s), L(TALLY.e, BELOW.s), L(COUNTED.s + 0.3, BELOW.s)]} />
    </Plate>
  </AbsoluteFill>
));
add(REMEMBER.s, NINE.s, (
  <AbsoluteFill>
    <Plate src={IMG('C20')} ar={AR} from={{x: 0.5, y: 0.4, z: 1.15}} to={{x: 0.5, y: 0.26, z: 1.6}} dur={NINE.s - REMEMBER.s} />
    <Flicker amt={0.3} from={0.2} to={1.5} />
  </AbsoluteFill>
));
add(NINE.s, TEN.s, (
  <AbsoluteFill>
    <Plate src={IMG('C6')} ar={AR} from={{x: 0.5, y: 0.34, z: 1.3}} to={{x: 0.5, y: 0.38, z: 1.22}} dur={TEN.s - NINE.s}>
      <FloorPlate vals={[{at: 0, n: '9'}]} />
    </Plate>
    <Flicker amt={0.4} from={L(CLICKS.s, NINE.s)} to={L(CLICKS.e, NINE.s) + 0.3} />
  </AbsoluteFill>
));
add(TEN.s, LASTL.s, (
  <AbsoluteFill>
    <Plate src={IMG('C6')} ar={AR} from={{x: 0.5, y: 0.34, z: 1.25}} to={{x: 0.5, y: 0.3, z: 1.4}} dur={LASTL.s - TEN.s}>
      <FloorPlate vals={[{at: 0, n: '10'}]} />
    </Plate>
    <Flicker amt={0.6} from={L(DARK.s, TEN.s) - 0.3} />
  </AbsoluteFill>
));
add(LASTL.s, ELEVEN.s, (
  <AbsoluteFill style={{background: '#000'}}>
    <FadeIn a={0.3} b={1.4}>
      <Plate src={IMG('C9')} ar={AR} from={{x: 0.5, y: 0.45, z: 1.0}} to={{x: 0.5, y: 0.42, z: 1.3}} dur={ELEVEN.s - LASTL.s} />
    </FadeIn>
    <RedDoor from={L(ELEVEN.s, LASTL.s) - 1.0} />
  </AbsoluteFill>
));

// D: the warden answers, the fork
add(ELEVEN.s, PW2 - 0.1, (
  <AbsoluteFill>
    <Plate src={IMG('C10')} ar={AR} from={{x: 0.5, y: 0.55, z: 1.0}} to={{x: 0.52, y: 0.45, z: 1.3}} dur={PW2 - ELEVEN.s} />
    <Flicker amt={0.25} />
  </AbsoluteFill>
));
add(PW2 - 0.1, W2END + 0.3, (
  <AbsoluteFill>
    <Plate src={IMG('C16')} ar={AR} from={{x: 0.5, y: 0.5, z: 1.0}} to={{x: 0.5, y: 0.47, z: 1.08}} dur={W2END + 0.4 - PW2} shake={1.5} />
    <RedPulse base={0.35} />
    <Speaker s={0.1} e={W2END - PW2 + 0.1} />
  </AbsoluteFill>
));
add(W2END + 0.3, SODO.s, (
  <AbsoluteFill>
    <Plate src={IMG('C15')} ar={AR} from={{x: 0.5, y: 0.42, z: 1.12}} to={{x: 0.5, y: 0.4, z: 1.2}} dur={SODO.s - W2END - 0.3}>
      <Fog s={-1} e={-0.5} />
      <Scratch n="1." text="It only counts in the dark." s={0} e={0.01} y={0.20} />
      <Scratch n="2." text="Stay under the green exit light." s={0} e={0.01} y={0.30} hot={L(RTWO.s, W2END + 0.3)} />
      <Scratch n="3." text="If it says it's yours, it isn't." s={0} e={0.01} y={0.40} hot={L(RTHREE.s, W2END + 0.3)} red={L(BOTH.s, W2END + 0.3)} />
    </Plate>
  </AbsoluteFill>
));
const E2 = STEPW.s - 0.1, E3 = STAYW.s - 0.1, E4 = VO.voiceEnd + 0.4;
const STEP_CHIP = <ImgChip label="STEP OUT" at={0.1} color={C.red} x={0.5} y={0.47} textColor="#fff" />;
const STEP_CHIP_ON = <ImgChip label="STEP OUT" at={-1} color={C.red} x={0.5} y={0.47} textColor="#fff" />;
const STAY_CHIP_ON = <ImgChip label="STAY" at={-1} color={C.yellow} x={0.5} y={0.32} up />;
add(SODO.s, E2, (
  <AbsoluteFill>
    <Plate src={IMG('C21')} ar={AR} from={{x: 0.5, y: 0.5, z: 1.0}} to={{x: 0.5, y: 0.5, z: 1.04}} dur={E2 - SODO.s} />
    <Flicker amt={0.2} />
  </AbsoluteFill>
));
// "step out": push toward the red door
add(E2, E3, (
  <AbsoluteFill>
    <Plate src={IMG('C21')} ar={AR} from={{x: 0.5, y: 0.5, z: 1.04}} to={{x: 0.5, y: 0.43, z: 1.45}} dur={E3 - E2}>
      {STEP_CHIP}
    </Plate>
  </AbsoluteFill>
), true, false);
// "stay in the light": tilt up to the green exit sign
add(E3, E4, (
  <AbsoluteFill>
    <Plate src={IMG('C21')} ar={AR} from={{x: 0.5, y: 0.43, z: 1.45}} to={{x: 0.5, y: 0.3, z: 1.25}} dur={E4 - E3}>
      {STEP_CHIP_ON}
      <ImgChip label="STAY" at={0.1} color={C.yellow} x={0.5} y={0.32} up />
    </Plate>
  </AbsoluteFill>
), true, false);
// pull back: both choices in frame
add(E4, S2P1_TOTAL, (
  <AbsoluteFill>
    <Plate src={IMG('C21')} ar={AR} from={{x: 0.5, y: 0.3, z: 1.25}} to={{x: 0.5, y: 0.5, z: 1.0}} dur={1.6}>
      {STEP_CHIP_ON}
      {STAY_CHIP_ON}
    </Plate>
    <ForkNote at={1.4} />
  </AbsoluteFill>
), true, false);

/* ---------------- audio ---------------- */
const X = (n: string) => `rz3/audio/sfx/${n}.wav`;
type Sfx = {at: number; file: string; vol: number; dur?: number};
const SFX: Sfx[] = [
  {at: 0.0, file: X('crowd-panic-sound-effect-mp3cut_WCIalhC'), vol: 0.5, dur: 6},
  {at: THROUGH.s - 0.3, file: X('heavy-rain'), vol: 0.28, dur: TITLE_AT + 2.5 - THROUGH.s},
  {at: PB, file: X('light-flicker'), vol: 0.38, dur: 5},
  {at: PRESS.e - 0.15, file: X('intercom-press'), vol: 0.6, dur: 0.6},
  {at: PW1 - 0.45, file: X('speaker-open'), vol: 0.55, dur: 0.8},
  {at: W1END + 0.05, file: X('speaker-close'), vol: 0.5, dur: 0.5},
  {at: RULE1.s - 0.1, file: X('pen-scratch'), vol: 0.4, dur: 2.1},
  {at: RULE2.s - 0.1, file: X('pen-scratch'), vol: 0.4, dur: 2.1},
  {at: RULE3.s - 0.1, file: X('pen-scratch'), vol: 0.4, dur: 2.1},
  {at: CLICKS.s + 0.6, file: X('knock-3d'), vol: 0.5, dur: 1.2},
  {at: DARK.s - 0.1, file: X('generator-power-down'), vol: 0.55, dur: 6},
  {at: LASTL.s, file: X('heart-beat-speeds-up'), vol: 0.4, dur: 20},
  {at: PW2 - 0.45, file: X('speaker-open'), vol: 0.55, dur: 0.8},
  {at: W2END + 0.05, file: X('speaker-close'), vol: 0.5, dur: 0.5},
  {at: TALLY.s, file: X('pen-scratch'), vol: 0.3, dur: 0.7},
  {at: TALLY.s + (TALLY.e - TALLY.s) * 0.5, file: X('pen-scratch'), vol: 0.3, dur: 0.7},
  {at: TALLY.e, file: X('pen-scratch'), vol: 0.3, dur: 0.7},
  {at: COUNTED.s + 0.3, file: X('pen-scratch'), vol: 0.3, dur: 0.7},
  {at: THATS.s + 0.35, file: X('pen-scratch'), vol: 0.35, dur: 1.4},
];
// smoke alarm loops until the alarm stops
for (let k = 0; k * 2.9 < STOPPING.s - 0.2; k++) SFX.push({at: 0.3 + k * 2.9, file: X('smoke-alarm'), vol: 0.22, dur: Math.min(2.9, STOPPING.s - 0.3 - k * 2.9)});

const bedVol = (f: number) => {
  const t = f / FPS;
  return 0.22 * interpolate(t, [0, 1.5], [0.4, 1], clamp) * interpolate(t, [S2P1_TOTAL - 3, S2P1_TOTAL], [1, 0.3], clamp) * interpolate(t, [LASTL.s - 1, LASTL.s + 1], [1, 1.5], clamp);
};

const Audio: React.FC = () => (
  <>
    <Html5Audio src={staticFile('rz3/audio/bed_drone.wav')} volume={bedVol} />
    <Html5Audio src={staticFile('rz3/audio/voice_track.wav')} volume={0.9} />
    {SFX.map((s, i) => (
      <Sequence key={i} from={Math.max(0, sf(s.at))} durationInFrames={Math.max(2, sf(s.dur ?? 3))} layout="none">
        <Html5Audio src={staticFile(s.file)} volume={(f) => s.vol * Math.min(1, f / 3) * Math.min(1, Math.max(0, (sf(s.dur ?? 3) - f) / 10))} />
      </Sequence>
    ))}
  </>
);

/* ---------------- composition ---------------- */
export const S2P1: React.FC = () => {
  const capHidden = (t: number) => {
    const sc = SCENES.find((s) => t >= s.a && t < s.b);
    return !sc || sc.captions === false;
  };
  return (
    <AbsoluteFill style={{background: C.ink}}>
      {SCENES.map((s, i) => (
        <Sequence key={i} from={sf(s.a)} durationInFrames={Math.max(1, sf(s.b) - sf(s.a))}>
          {s.el}
          {i > 0 && s.flash !== false ? <CutFlash len={0.08} /> : null}
        </Sequence>
      ))}
      <Captions words={WORDS} hidden={capHidden} />
      <Audio />
    </AbsoluteFill>
  );
};
