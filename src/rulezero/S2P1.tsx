// Rule Zero - Series 2 "Headcount" - Part 1. Vertical 1080x1920, 24 fps.
// Voice timing: s2p1_voice.json (built by build_s2p1.py). Script: claude/rule_zero_s2p1_headcount_script.md v4.
import React from 'react';
import {AbsoluteFill, Html5Audio, interpolate, random, Sequence, staticFile, useCurrentFrame} from 'remotion';
import VO from './s2p1_voice.json';
import {C, Captions, clamp, CutFlash, FPS, HAND, HEAVY, MONO, Plate, sf, useT, W, Word} from './rzkit';
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
const PB = VO.pieces[1].at, PC = VO.pieces[2].at, PD = VO.pieces[3].at;

/* ---------------- anchors ---------------- */
const NOSMOKE = phrase("There's no smoke.");
const NOBODY = phrase('Nobody wakes you.');
const SILENCE = phrase('The silence wakes you.');
const STOPPED = phrase('The alarm just stopped.');
const THROUGH = phrase('Through the glass wall,');
const LOOKING = phrase('Looking up at your floor.');
const TITLE_AT = LOOKING.e + 0.2;
const FAR = phrase('At the far end,');
const PHONE = phrase('Your phone says');
const SAYING = phrase("It's been saying that.");
const FLOORN = phrase('The floor number above');
const SIX = phrase('Six.', FLOORN.s);
const SEVEN = phrase('Seven.', FLOORN.s);
const CLIMB = phrase('Someone is climbing.');
const EIGHT = phrase('Eight.', CLIMB.e);
const BREATH = phrase('Your breath fogs the glass');
const RULE1 = phrase('It only counts in the dark.');
const RULE2 = phrase('Stay under the green exit light.');
const RULE3 = phrase("If he says your name, it isn't you.");
const THREE = phrase('Three.', RULE3.e);
const NINE = phrase('Nine.', THREE.e);
const CLICKS = phrase('The stairwell door clicks.');
const CHALK = phrase('Chalk dust under');
const BELOW = phrase('Below the rules,');
const FOUR1 = phrase('four tally marks.', BELOW.s);
const FOUR2 = phrase('Four headcounts.');
const TWO = phrase('Two.', PD);
const TEN = phrase('Ten.', PD);
const DIE = phrase('The lights die.');
const LASTL = phrase('The last light');
const OPENS = phrase('The door opens.');
const HEADC = phrase('Headcount.', OPENS.e);
const SIXTY = phrase('Sixty-one names');
const YOURS = phrase('None of them yours.');
const RTWO = phrase('Rule two says');
const RTHREE = phrase('Rule three says');
const BOTH = phrase('You wrote both.');
const NAMEQ = phrase('Name?', BOTH.e);
const SODO = phrase('So do you answer,');
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
    <div style={{position: 'absolute', left: '5%', width: '90%', top: `${y * 100}%`, textAlign: 'center', transform: 'rotate(-2.2deg)', clipPath: `inset(-20% ${(1 - p) * 100}% -60% 0)`}}>
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

const FIRST = ['Mara', 'Dennis', 'Priya', 'Tom', 'Elena', 'Gabe', 'Hana', 'Luis', 'Nora', 'Omar', 'Quinn', 'Rita', 'Sam', 'Vera', 'Wade', 'Yuki', 'Zoe', 'Ben', 'Cora', 'Dale', 'Finn', 'Gwen', 'Ivan', 'Jada', 'Kai'];
const LAST = ['Boyd', 'Ortiz', 'Shah', 'Lowry', 'Park', 'Hines', 'Cole', 'Reyes', 'Webb', 'Nash', 'Frey', 'Okafor', 'Lind', 'Moss'];
const NAMES = Array.from({length: 61}, (_, i) => `${String(i + 1).padStart(2, '0')} ${FIRST[(i * 7) % FIRST.length]} ${LAST[(i * 5 + 3) % LAST.length]}`);

// Static list on the clipboard: rows sit on the ruled lines of P2 (lines slope 12.8 deg, pitch 0.0252 of image height).
const CLIP_Z = 1.04;
const NameList: React.FC<{dur: number}> = ({dur}) => {
  const t = useT();
  const iw = W * CLIP_Z;
  const ih = iw * AR;
  const rows = NAMES.slice(45); // entries 46..61 fill the page
  return (
    <>
      {rows.map((n, i) => {
        const on = interpolate(t, [0.1 + (i / rows.length) * (dur * 0.7), 0.1 + (i / rows.length) * (dur * 0.7) + 0.12], [0, 1], clamp);
        const yLine = (0.335 + 0.0127 + 0.0252 * i) * ih; // line y at x = 0.30
        const fs = 0.032 * iw;
        return (
          <div key={i} style={{position: 'absolute', left: 0.30 * iw, top: yLine - fs * 1.05, height: fs * 1.05, transformOrigin: '0 100%', transform: 'rotate(12.8deg)', fontFamily: MONO, fontSize: fs, lineHeight: 1, color: '#1d2421', opacity: on, whiteSpace: 'nowrap'}}>{n}</div>
        );
      })}
    </>
  );
};

const RedDoor: React.FC<{from: number}> = ({from}) => {
  const t = useT();
  const p = interpolate(t, [from, from + 1.4], [0, 1], clamp);
  return <AbsoluteFill style={{background: `radial-gradient(ellipse at 50% 48%, rgba(255,25,25,${0.55 * p}) 0%, rgba(160,0,0,${0.3 * p}) 35%, rgba(0,0,0,0) 70%)`, mixBlendMode: 'screen'}} />;
};

const Chip: React.FC<{label: string; at: number; color: string; y: number; textColor?: string}> = ({label, at, color, y, textColor = C.ink}) => {
  const t = useT();
  const p = interpolate(t, [at, at + 0.22], [0, 1], clamp);
  if (p <= 0) return null;
  const sc = p < 1 ? 0.6 + 0.5 * p : 1 + Math.max(0, 0.08 - (t - at - 0.22) * 0.4);
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: y, display: 'flex', justifyContent: 'center'}}>
      <div style={{transform: `scale(${sc})`, background: color, color: textColor, fontFamily: HEAVY, fontWeight: 700, fontSize: 96, letterSpacing: 4, padding: '18px 60px', borderRadius: 999, boxShadow: '0 12px 36px rgba(0,0,0,0.6)', whiteSpace: 'nowrap'}}>{label}</div>
    </div>
  );
};
const Fork: React.FC<{at: number}> = ({at}) => {
  const t = useT();
  const endAt = L(VO.voiceEnd, NAMEQ.s);
  const when = Math.max(at + 0.6, endAt - 3.0);
  return (
    <>
      <Chip label="ANSWER" at={when} color={C.yellow} y={1030} />
      <Chip label="SCRATCH LINE 5" at={when + 0.45} color={C.red} y={1195} textColor="#fff" />
      <div style={{position: 'absolute', left: 0, right: 0, top: 230, textAlign: 'center', fontFamily: MONO, fontSize: 34, letterSpacing: 3, color: C.fluor, opacity: interpolate(t, [when + 1.2, when + 1.6], [0, 0.85], clamp)}}>COMMENT · THE MAJORITY WRITES PART 2</div>
    </>
  );
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
type Scene = {a: number; b: number; el: React.ReactNode; captions?: boolean};
const SCENES: Scene[] = [];
const add = (a: number, b: number, el: React.ReactNode, captions = true) => SCENES.push({a, b, el, captions});

// A: hook
add(0, NOSMOKE.s, (
  <AbsoluteFill>
    <Plate src={IMG('C2')} ar={AR} from={{x: 0.5, y: 0.5, z: 1.0}} to={{x: 0.5, y: 0.55, z: 1.14}} dur={NOSMOKE.s} shake={7} />
    <RedPulse />
  </AbsoluteFill>
));
add(NOSMOKE.s, NOBODY.s, (
  <AbsoluteFill>
    <Plate src={IMG('C1')} ar={AR} from={{x: 0.5, y: 0.5, z: 1.0}} to={{x: 0.58, y: 0.6, z: 1.15}} dur={NOBODY.s - NOSMOKE.s} />
    <RedPulse until={L(STOPPED.s, NOSMOKE.s)} base={0.3} />
  </AbsoluteFill>
));
// the Warden bends over the sleeper, ticks the clipboard, then is gone
add(NOBODY.s, SILENCE.s + 0.1, (
  <AbsoluteFill>
    <Plate src={IMG('C11')} ar={AR} from={{x: 0.5, y: 0.5, z: 1.0}} to={{x: 0.52, y: 0.4, z: 1.2}} dur={SILENCE.s + 0.1 - NOBODY.s} shake={1.5} />
    <RedPulse base={0.3} />
    <Flicker amt={0.35} from={L(SILENCE.s, NOBODY.s) - 0.5} />
  </AbsoluteFill>
));
add(SILENCE.s + 0.1, THROUGH.s, (
  <AbsoluteFill>
    <Plate src={IMG('C1')} ar={AR} from={{x: 0.6, y: 0.62, z: 1.25}} to={{x: 0.55, y: 0.55, z: 1.1}} dur={THROUGH.s - SILENCE.s}>
      {null}
    </Plate>
    <RedPulse until={L(STOPPED.s, SILENCE.s + 0.1)} base={0.3} />
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

// B
add(PB - 0.1, FAR.s, (
  <AbsoluteFill>
    <Plate src={IMG('C4')} ar={AR} from={{x: 0.5, y: 0.5, z: 1.0}} to={{x: 0.5, y: 0.5, z: 1.2}} dur={FAR.s - PB} />
    <Flicker from={0.1} to={4.5} />
  </AbsoluteFill>
));
add(FAR.s, PHONE.s, (
  <AbsoluteFill>
    <Plate src={IMG('C5')} ar={AR} from={{x: 0.5, y: 0.5, z: 1.0}} to={{x: 0.5, y: 0.45, z: 1.22}} dur={PHONE.s - FAR.s} />
    <Flicker amt={0.35} />
  </AbsoluteFill>
));
add(PHONE.s, SAYING.e + 0.25, (
  <AbsoluteFill>
    <Plate src={IMG('P1')} ar={AR} from={{x: 0.5, y: 0.5, z: 1.0}} to={{x: 0.52, y: 0.46, z: 1.1}} dur={SAYING.e + 0.25 - PHONE.s}>
      <div style={{position: 'absolute', left: '36%', top: '27%', width: '38%', height: '34%', transform: 'rotate(8deg)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 6}}>
        <div style={{fontFamily: MONO, fontSize: 150, color: '#0c1311', fontWeight: 700, letterSpacing: 2}}>3:00</div>
        <div style={{fontFamily: MONO, fontSize: 40, color: '#4a524e', letterSpacing: 6}}>AM</div>
      </div>
    </Plate>
  </AbsoluteFill>
));
add(SAYING.e + 0.25, PC, (
  <AbsoluteFill>
    <Plate src={IMG('C6')} ar={AR} from={{x: 0.5, y: 0.45, z: 1.0}} to={{x: 0.5, y: 0.32, z: 1.3}} dur={PC - SAYING.e}>
      <FloorPlate vals={[{at: 0, n: '5'}, {at: L(SIX.s, SAYING.e + 0.25), n: '6'}, {at: L(SEVEN.s, SAYING.e + 0.25), n: '7'}, {at: L(EIGHT.s, SAYING.e + 0.25), n: '8'}]} />
    </Plate>
    <Flicker amt={0.5} from={L(CLIMB.s, SAYING.e + 0.25)} to={L(CLIMB.e, SAYING.e + 0.25) + 0.6} />
  </AbsoluteFill>
));

// C
add(PC, THREE.s, (
  <AbsoluteFill>
    <Plate src={IMG('C7')} ar={AR} from={{x: 0.5, y: 0.5, z: 1.0}} to={{x: 0.5, y: 0.42, z: 1.12}} dur={THREE.s - PC}>
      <Fog s={L(BREATH.s, PC)} e={L(BREATH.e, PC)} />
      <Scratch n="1." text="It only counts in the dark." s={L(RULE1.s, PC)} e={L(RULE1.e, PC)} y={0.20} />
      <Scratch n="2." text="Stay under the green exit light." s={L(RULE2.s, PC)} e={L(RULE2.e, PC)} y={0.30} />
      <Scratch n="3." text="If he says your name, it isn't you." s={L(RULE3.s, PC)} e={L(RULE3.e, PC)} y={0.40} />
    </Plate>
    <FogFade />
  </AbsoluteFill>
));
add(THREE.s, CHALK.s, (
  <AbsoluteFill>
    <Plate src={IMG('C6')} ar={AR} from={{x: 0.5, y: 0.34, z: 1.3}} to={{x: 0.5, y: 0.4, z: 1.2}} dur={CHALK.s - THREE.s}>
      <FloorPlate vals={[{at: 0, n: '3'}, {at: L(NINE.s, THREE.s), n: '9'}]} />
    </Plate>
    <Flicker amt={0.4} from={L(CLICKS.s, THREE.s)} to={L(CLICKS.e, THREE.s) + 0.3} />
  </AbsoluteFill>
));
add(CHALK.s, PD, (
  <AbsoluteFill>
    <Plate src={IMG('C8')} ar={AR} from={{x: 0.5, y: 0.5, z: 1.0}} to={{x: 0.5, y: 0.5, z: 1.1}} dur={PD - CHALK.s}>
      <Tally x={0.33} y={0.80} times={[L(FOUR1.s, CHALK.s), L(FOUR1.s + (FOUR1.e - FOUR1.s) * 0.5, CHALK.s), L(FOUR1.e, CHALK.s), L(FOUR2.s, CHALK.s)]} />
    </Plate>
  </AbsoluteFill>
));

// D
add(PD, DIE.s, (
  <AbsoluteFill>
    <Plate src={IMG('C6')} ar={AR} from={{x: 0.5, y: 0.34, z: 1.25}} to={{x: 0.5, y: 0.3, z: 1.4}} dur={DIE.s - PD}>
      <FloorPlate vals={[{at: 0, n: '2'}, {at: L(TEN.s, PD), n: '10'}]} />
    </Plate>
    <Flicker amt={0.6} from={L(DIE.s, PD) - 0.6} />
  </AbsoluteFill>
));
add(DIE.s, HEADC.s, (
  <AbsoluteFill style={{background: '#000'}}>
    <FadeIn a={L(LASTL.s, DIE.s) + 0.5} b={L(LASTL.s, DIE.s) + 1.9}>
      <Plate src={IMG('C9')} ar={AR} from={{x: 0.5, y: 0.45, z: 1.0}} to={{x: 0.5, y: 0.42, z: 1.3}} dur={HEADC.s - DIE.s} />
    </FadeIn>
    <RedDoor from={L(OPENS.s, DIE.s)} />
  </AbsoluteFill>
));
add(HEADC.s, SIXTY.s, (
  <AbsoluteFill>
    <Plate src={IMG('C10')} ar={AR} from={{x: 0.5, y: 0.55, z: 1.0}} to={{x: 0.52, y: 0.4, z: 1.45}} dur={SIXTY.s - HEADC.s} />
    <Flicker amt={0.25} />
  </AbsoluteFill>
));
add(SIXTY.s, YOURS.e + 0.3, (
  <AbsoluteFill>
    <Plate src={IMG('P2')} ar={AR} from={{x: 0.5, y: 0.5, z: CLIP_Z}} dur={1}>
      <NameList dur={YOURS.e - SIXTY.s - 0.2} />
    </Plate>
  </AbsoluteFill>
));
add(YOURS.e + 0.3, NAMEQ.s, (
  <AbsoluteFill>
    <Plate src={IMG('C7')} ar={AR} from={{x: 0.5, y: 0.42, z: 1.12}} to={{x: 0.5, y: 0.4, z: 1.2}} dur={NAMEQ.s - YOURS.e - 0.3}>
      <Fog s={-1} e={-0.5} />
      <Scratch n="1." text="It only counts in the dark." s={0} e={0.01} y={0.20} />
      <Scratch n="2." text="Stay under the green exit light." s={0} e={0.01} y={0.30} hot={L(RTWO.s, YOURS.e + 0.3)} />
      <Scratch n="3." text="If he says your name, it isn't you." s={0} e={0.01} y={0.40} hot={L(RTHREE.s, YOURS.e + 0.3)} red={L(BOTH.s, YOURS.e + 0.3)} />
    </Plate>
  </AbsoluteFill>
));
add(NAMEQ.s, S2P1_TOTAL, (
  <AbsoluteFill>
    <Plate src={IMG('C12')} ar={AR} from={{x: 0.5, y: 0.5, z: 1.0}} to={{x: 0.5, y: 0.4, z: 1.2}} dur={VO.voiceEnd - NAMEQ.s + 1} shake={2}>
      {null}
    </Plate>
    <Fork at={L(SODO.s, NAMEQ.s)} />
    <Flicker amt={0.2} />
  </AbsoluteFill>
));

/* ---------------- audio ---------------- */
const X = (n: string) => `rz3/audio/sfx/${n}.wav`;
type Sfx = {at: number; file: string; vol: number; dur?: number};
const SFX: Sfx[] = [
  {at: 0.0, file: X('crowd-panic-sound-effect-mp3cut_WCIalhC'), vol: 0.5, dur: 6},
  {at: THROUGH.s - 0.3, file: X('heavy-rain'), vol: 0.28, dur: TITLE_AT + 2.5 - THROUGH.s},
  {at: PB, file: X('light-flicker'), vol: 0.38, dur: 5},
  {at: SIX.s, file: X('elevator-ding'), vol: 0.22, dur: 2.6},
  {at: SEVEN.s, file: X('elevator-ding'), vol: 0.22, dur: 2.6},
  {at: EIGHT.s, file: X('elevator-ding'), vol: 0.24, dur: 2.6},
  {at: RULE1.s - 0.1, file: X('pen-scratch'), vol: 0.4, dur: 2.1},
  {at: RULE2.s - 0.1, file: X('pen-scratch'), vol: 0.4, dur: 2.1},
  {at: RULE3.s - 0.1, file: X('pen-scratch'), vol: 0.4, dur: 2.1},
  {at: THREE.s, file: X('elevator-ding'), vol: 0.2, dur: 2.6},
  {at: NINE.s, file: X('elevator-ding'), vol: 0.2, dur: 2.6},
  {at: CLICKS.s + 0.6, file: X('knock-3d'), vol: 0.5, dur: 1.2},
  {at: TWO.s, file: X('elevator-ding'), vol: 0.2, dur: 2.6},
  {at: TEN.s, file: X('elevator-ding'), vol: 0.2, dur: 2.6},
  {at: DIE.s - 0.1, file: X('generator-power-down'), vol: 0.55, dur: 6},
  {at: OPENS.s - 0.5, file: X('heart-beat-speeds-up'), vol: 0.4, dur: 20},
  {at: FOUR1.s, file: X('pen-scratch'), vol: 0.3, dur: 0.7},
  {at: FOUR1.s + (FOUR1.e - FOUR1.s) * 0.5, file: X('pen-scratch'), vol: 0.3, dur: 0.7},
  {at: FOUR1.e, file: X('pen-scratch'), vol: 0.3, dur: 0.7},
  {at: FOUR2.s, file: X('pen-scratch'), vol: 0.3, dur: 0.7},
];
// smoke alarm loops until the alarm stops
for (let k = 0; k * 2.9 < STOPPED.s - 0.2; k++) SFX.push({at: 0.3 + k * 2.9, file: X('smoke-alarm'), vol: 0.22, dur: Math.min(2.9, STOPPED.s - 0.3 - k * 2.9)});

const bedVol = (f: number) => {
  const t = f / FPS;
  return 0.16 * interpolate(t, [0, 1.5], [0.4, 1], clamp) * interpolate(t, [S2P1_TOTAL - 3, S2P1_TOTAL], [1, 0.3], clamp) * interpolate(t, [OPENS.s - 1, OPENS.s + 1], [1, 1.5], clamp);
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
          {i > 0 ? <CutFlash len={0.08} /> : null}
        </Sequence>
      ))}
      <Captions words={WORDS} hidden={capHidden} />
      <Audio />
    </AbsoluteFill>
  );
};
