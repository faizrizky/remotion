// Style 2 test clip for Video 04 (hook + first beats of Ch1/Ch2). Motion test only:
// no narration yet, backgrounds are code-drawn placeholders until the Gemini art exists.
import React from 'react';
import {AbsoluteFill, Html5Audio, Img, interpolate, Sequence, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {PennySting} from '../kit/sting';
import {SANS} from '../style/style_kit';
import {Cam, camAt, Car, Chip2, Cloud, Count, H, INK, Leo, LetterBounce, Parallax, PatternCard, Pill2, Popped, SceneDef, Sfx, Src2, Timeline, timelineLength, W, Join, Key} from './s2kit';

const C = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const Watermark = () => (
  <Img src={staticFile('profile_pic.png')} style={{position: 'absolute', left: 28, bottom: 28, width: 72, height: 72, borderRadius: 36, boxShadow: '0 2px 8px rgba(0,0,0,0.3)'}} />
);

// ---------- scene 1: sky -> trade-in lot -> push in on Leo's car ----------
const LOT_KEYS: Key[] = [
  {t: 0, x: 1600, y: 560, z: 1.05},
  {t: 34, x: 1600, y: 1560, z: 1.12, dur: 30},
  {t: 128, x: 1840, y: 1700, z: 1.55, dur: 30},
];
const Lot: React.FC = () => {
  const f = useCurrentFrame();
  const cars = ['#4FB7C0', '#EA6E5C', '#BDEBD3', '#9AA5B8', '#F5C842'];
  const leoPose = f < 150 ? 'calm' : 'shocked';
  return (
    <AbsoluteFill>
      <Cam keys={LOT_KEYS} drift={0.03} bg="#9ED3F2">
        <div style={{position: 'absolute', left: -600, top: -400, width: 4400, height: 3000}}>
          <svg width={4400} height={3000} style={{position: 'absolute'}}>
            <defs>
              <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#7EC4EE" /><stop offset="0.55" stopColor="#B9DDF3" /><stop offset="0.8" stopColor="#F2D5E6" /><stop offset="1" stopColor="#F7E7D8" /></linearGradient>
              <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#B7C79A" /><stop offset="1" stopColor="#8FA77A" /></linearGradient>
            </defs>
            <rect width={4400} height={3000} fill="url(#sky)" />
            <Cloud x={900} y={700} s={1.2} /><Cloud x={2300} y={520} s={1.5} /><Cloud x={3500} y={900} s={1} /><Cloud x={1600} y={1250} s={0.8} />
            <path d="M0 1880 Q700 1720 1400 1850 T2800 1820 T4400 1860 L4400 3000 L0 3000Z" fill="#B9C8DA" />
            <path d="M0 1920 Q900 1820 1800 1930 T4400 1900 L4400 3000 L0 3000Z" fill="#9FBF8E" />
            <rect y={1960} width={4400} height={1040} fill="url(#ground)" />
            <rect y={2130} width={4400} height={260} fill="#C9C3B8" />
            {Array.from({length: 18}, (_, i) => <rect key={i} x={i * 260 + 40} y={2250} width={120} height={14} rx={7} fill="#E9E4DA" />)}
            <path d="M200 1990 Q1200 2050 2200 1990 T4200 1990" stroke="#5B4B3A" strokeWidth={4} fill="none" />
            {Array.from({length: 26}, (_, i) => <path key={i} d={`M${260 + i * 150} ${1995 + Math.sin(i) * 6} l24 46 l24 -46z`} fill={['#EA6E5C', '#F5C842', '#4FB7C0'][i % 3]} />)}
          </svg>
          {/* parked cars, Leo's car is the mustard one with the space around it */}
          {[0, 1, 2].map((i) => <div key={i} style={{position: 'absolute', left: 300 + i * 560, top: 2240}}><Car color={cars[i]} w={500} tag="x" /></div>)}
          <div style={{position: 'absolute', left: 2060, top: 2196}}><Car color="#E8A520" w={600} /></div>
          {[3, 4].map((i) => <div key={i} style={{position: 'absolute', left: 2900 + (i - 3) * 560, top: 2240}}><Car color={cars[i]} w={500} tag="x" /></div>)}
          <div style={{position: 'absolute', left: 2650, top: 1830}}><Leo pose={leoPose} h={560} flip /></div>
          {/* labels hang over the car */}
          <Popped at={112} x={2190} y={2050} origin="50% 100%"><Tag text="VALUE $15,000" bg="#FFFFFF" color={INK} /></Popped>
          <Popped at={146} x={2190} y={2132} origin="50% 100%"><Tag text="LOAN $22,000" bg="#E5484D" color="#FFFFFF" /></Popped>
          <Popped at={162} x={2560} y={2075} origin="0% 50%"><div style={{fontFamily: SANS, fontWeight: 600, fontSize: 26, color: '#555', background: '#FFFFFFCC', padding: '2px 10px', borderRadius: 6}}>Example</div></Popped>
        </div>
      </Cam>
      <Chip2 label="LOCATION:" value="United States" icon="pin" at={22} />
      <Chip2 label="DATE:" value="Q3 2026" icon="cal" at={30} y={128} />
      <Sfx name="whoosh" at={4} /><Sfx name="pop" at={22} /><Sfx name="pop" at={30} /><Sfx name="pop" at={112} /><Sfx name="boom" at={146} />
    </AbsoluteFill>
  );
};
const Tag: React.FC<{text: string; bg: string; color: string}> = ({text, bg, color}) => (
  <div style={{background: bg, color, fontFamily: SANS, fontWeight: 800, fontSize: 40, padding: '8px 22px', borderRadius: 12, border: `5px solid ${INK}`, whiteSpace: 'nowrap', boxShadow: '0 6px 0 rgba(0,0,0,0.2)'}}>{text}</div>
);

// ---------- scene 2: navy card, 3 in 10, $7,107 ----------
const NAVY_KEYS: Key[] = [{t: 0, x: 960, y: 540, z: 1.12}, {t: 132, x: 960, y: 700, z: 1.32, dur: 22}];
const Navy: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <PatternCard base="#0E2244" light="#14305C" />
      <Cam keys={NAVY_KEYS} drift={0.03}>
        <div style={{position: 'absolute', left: 0, top: 0, width: W, height: H}}>
          {Array.from({length: 10}, (_, i) => {
            const red = (i === 2 && f >= 70) || (i === 5 && f >= 76) || (i === 8 && f >= 82);
            return <Popped key={i} at={6 + i * 4} x={190 + i * 158} y={300}><Car color={red ? '#E5484D' : '#C9CED6'} w={150} /></Popped>;
          })}
          <Pill2 text="29.1% owe more than the car is worth" at={96} x={960} y={600} size={54} />
          <Pill2 text={<>average gap <span style={{color: '#E5484D'}}><Count to={7107} at={134} dur={22} prefix="$" /></span></>} at={130} x={960} y={760} size={64} />
        </div>
      </Cam>
      <Src2 text="edmunds.com, Q3 2026" at={96} />
      {[6, 10, 14, 18, 22].map((a) => <Sfx key={a} name="pop" at={a} />)}
      <Sfx name="ding" at={76} /><Sfx name="pop" at={96} /><Sfx name="ding" at={156} /><Sfx name="whoosh" at={176} />
    </AbsoluteFill>
  );
};

// ---------- scene 3: question card ----------
const QCard: React.FC = () => {
  const f = useCurrentFrame();
  const out = interpolate(f, [62, 90], [0, 1], C);
  return (
    <AbsoluteFill>
      <PatternCard base="#12301C" light="#1A4228" />
      <Cam keys={[{t: 0, x: 960, y: 540, z: 1.08}]} drift={0.035}>
        <div style={{position: 'absolute', width: W, height: H}}>
          <LetterBounce text="WHERE DOES" at={6} x={960} y={450} size={130} />
          <LetterBounce text="THE GAP GO?" at={24} x={960} y={600} size={130} />
        </div>
      </Cam>
      {f >= 40 && (
        <div style={{position: 'absolute', left: 1460 + out * out * 800, top: 820, transform: `rotate(${out * 25}deg)`}}>
          <Pill2 text="$7,107" at={40} x={0} y={0} size={56} bg="#E5484D" color="#FFFFFF" />
        </div>
      )}
      <Sfx name="pop" at={6} /><Sfx name="pop" at={24} /><Sfx name="whoosh" at={64} />
    </AbsoluteFill>
  );
};

// ---------- scene 5 (after the sting): pull back from Leo's face to the whiteboard in the paper hall ----------
const HALL_KEYS: Key[] = [{t: 0, x: 1488, y: 452, z: 3.1}, {t: 58, x: 960, y: 560, z: 1.06, dur: 52}];
const PaperHall: React.FC = () => {
  const f = useCurrentFrame();
  const flip = interpolate(f, [92, 108], [0, 180], C);
  const water = interpolate(f, [104, 124], [0, 1], C);
  return (
    <AbsoluteFill>
      <Cam keys={HALL_KEYS} drift={0.025} bg="#E9D9BE">
        <div style={{position: 'absolute', left: -200, top: -200, width: 2320, height: 1480}}>
          <svg width={2320} height={1480} style={{position: 'absolute'}}>
            <defs><linearGradient id="wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#E8D5B5" /><stop offset="1" stopColor="#D9C29C" /></linearGradient></defs>
            <rect width={2320} height={1480} fill="url(#wall)" />
            {[0, 1, 2].map((r) => <rect key={r} x={300 + r * 120} y={120 + r * 70} width={1720 - r * 240} height={22} rx={11} fill="#F6EBD6" />)}
            {Array.from({length: 7}, (_, i) => <ellipse key={i} cx={420 + i * 250} cy={190 + Math.abs(3 - i) * 8} rx={70} ry={18} fill="#FFF6E2" />)}
            <polygon points="0,1480 2320,1480 1500,820 820,820" fill="#CDB38D" />
            {Array.from({length: 22}, (_, i) => {
              const side = i % 2 ? 1 : -1, row = Math.floor(i / 2);
              const x = 1160 + side * (520 + row * 70) - 60, y = 800 + row * 52, h = 140 + (row % 3) * 60 + row * 10;
              return (
                <g key={i}>
                  <rect x={x} y={y - h} width={120 + row * 8} height={h} fill="#FBF7EE" />
                  {Array.from({length: 6}, (_, k) => <rect key={k} x={x + (k % 2 ? 90 : 10)} y={y - h + 14 + k * (h / 6)} width={18} height={8} fill={['#EA6E5C', '#4FB7C0', '#F5C842'][k % 3]} />)}
                  <rect x={x - 6} y={y} width={132 + row * 8} height={54} fill="#E2A65C" />
                </g>
              );
            })}
          </svg>
          {/* whiteboard */}
          <div style={{position: 'absolute', left: 860, top: 420, width: 640, height: 420, background: '#FFFFFF', border: '14px solid #8C6B4A', borderRadius: 10}}>
            <div style={{position: 'absolute', left: 230, top: 150, transform: `rotate(${flip}deg)`, transformOrigin: '90px 40px'}}><Car color="#E8A520" w={180} /></div>
            <div style={{position: 'absolute', left: 0, bottom: 0, width: '100%', height: 190 * water, background: '#5FB4E6AA'}} />
          </div>
          <div style={{position: 'absolute', left: 940, top: 840, width: 14, height: 300, background: '#8C6B4A'}} /><div style={{position: 'absolute', left: 1400, top: 840, width: 14, height: 300, background: '#8C6B4A'}} />
          <div style={{position: 'absolute', left: 1580, top: 520}}><Leo pose={f < 92 ? 'calm' : 'thinking'} h={780} flip /></div>
          <Pill2 text="negative equity" at={66} x={1180} y={360} size={56} />
        </div>
      </Cam>
      <Sfx name="pop" at={66} /><Sfx name="whoosh" at={92} />
    </AbsoluteFill>
  );
};

// ---------- scene 6: tracking the car on the road (parallax) + the numbers ----------
const ROAD_KEYS: Key[] = [{t: 0, x: 1100, y: 600, z: 1.0}, {t: 150, x: 2900, y: 600, z: 1.0, dur: 150}];
const Road: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const carX = camAt(f, ROAD_KEYS, fps, 0).x - 640;
  const bob = Math.sin(f / 2.2) * 3;
  const rows: [string, number][] = [['$40,000 LOAN', 16], ['8.1% APR', 28]];
  const swap = f >= 96;
  return (
    <AbsoluteFill>
      <Cam keys={ROAD_KEYS} drift={0} bg="#BFE0F2">
        <Parallax keys={ROAD_KEYS} k={0.2} drift={0}>
          <svg width={7000} height={1080} style={{position: 'absolute', left: -1000}}>
            <rect width={7000} height={1080} fill="#BFE0F2" />
            {Array.from({length: 14}, (_, i) => <path key={i} d={`M${i * 520} 640 l260 -230 l260 230z`} fill="#AFC4DA" />)}
          </svg>
        </Parallax>
        <Parallax keys={ROAD_KEYS} k={0.55} drift={0}>
          <svg width={7000} height={1080} style={{position: 'absolute', left: -1000}}>
            {Array.from({length: 18}, (_, i) => <ellipse key={i} cx={i * 420} cy={720} rx={330} ry={150} fill={i % 2 ? '#C9D46A' : '#B4C85A'} />)}
            {Array.from({length: 12}, (_, i) => <g key={`p${i}`}><rect x={200 + i * 600} y={420} width={10} height={300} fill="#6B5A48" /><rect x={170 + i * 600} y={430} width={70} height={8} fill="#6B5A48" /></g>)}
            {Array.from({length: 6}, (_, i) => <g key={`h${i}`}><rect x={500 + i * 1100} y={600} width={90} height={70} fill="#F2EDE9" /><polygon points={`${490 + i * 1100},600 ${545 + i * 1100},560 ${600 + i * 1100},600`} fill="#C8504A" /></g>)}
          </svg>
        </Parallax>
        <svg width={7000} height={1080} style={{position: 'absolute', left: -1000}}>
          <rect y={760} width={7000} height={60} fill="#7FA05A" />
          <rect y={800} width={7000} height={300} fill="#55565E" />
          {Array.from({length: 40}, (_, i) => <rect key={i} x={i * 220} y={930} width={110} height={12} rx={6} fill="#E9E4DA" />)}
        </svg>
        <div style={{position: 'absolute', left: carX, top: 640 + bob}}><Car color="#E8A520" w={560} /></div>
      </Cam>
      {/* numbers ride on the right like the reference */}
      <div style={{position: 'absolute', left: 1120, top: 150, fontFamily: SANS, color: INK, background: '#FFFFFFE6', padding: '18px 34px', borderRadius: 18, boxShadow: '0 8px 20px rgba(0,0,0,0.2)', opacity: f >= 16 ? 1 : 0}}>
        {rows.map(([t, a], i) => f >= a && <div key={i} style={{fontSize: 64, fontWeight: 800, transform: `translateX(${(1 - Math.min(1, (f - a) / 8)) * 40}px)`}}>{t}</div>)}
        {f >= 56 && (
          <div style={{fontSize: 64, fontWeight: 800, marginTop: 10}}>
            <Strike on={swap} f={f} from="60" to="84" /> MONTHS → <Strike on={swap} f={f} from="$813" to="$625" />/MO
          </div>
        )}
      </div>
      <Pill2 text="-$188 a month" at={122} x={1460} y={560} size={60} bg="#2E9E5B" color="#FFFFFF" />
      <Src2 text="computed for this video" at={56} />
      <Sfx name="pop" at={16} /><Sfx name="pop" at={28} /><Sfx name="ding" at={56} /><Sfx name="paper_rip" at={90} /><Sfx name="ding" at={124} />
    </AbsoluteFill>
  );
};
const Strike: React.FC<{on: boolean; f: number; from: string; to: string}> = ({on, f, from, to}) => {
  const p = interpolate(f, [90, 96], [0, 1], C);
  if (on) return <span style={{color: '#2E9E5B'}}>{to}</span>;
  return (
    <span style={{position: 'relative'}}>{from}{p > 0 && <span style={{position: 'absolute', left: -6, top: '52%', height: 8, width: `calc(${p * 100}% + 12px)`, background: '#E5484D', borderRadius: 4}} />}</span>
  );
};

// ---------- sting with the next scene showing through the "o" ----------
const STING = 114;
const StingScene: React.FC = () => (
  <AbsoluteFill>
    <Sequence from={-100} durationInFrames={130} layout="none"><QCard /></Sequence>
    <Sequence from={STING - 10} layout="none"><PaperHall /></Sequence>
    <PennySting dur={STING} reveal />
  </AbsoluteFill>
);
const PaperHallAfterSting: React.FC = () => <Sequence from={-10} layout="none"><PaperHall /></Sequence>;

const SCENES: SceneDef[] = [
  {len: 208, node: <Lot />},
  {len: 200, node: <Navy />},
  {len: 100, node: <QCard />},
  {len: STING, node: <StingScene />},
  {len: 130, node: <PaperHallAfterSting />},
  {len: 150, node: <Road />},
];
const JOINS: Join[] = [
  {kind: 'splat', dur: 16, cx: 960, cy: 620},
  {kind: 'swirl', dur: 24, cx: 960, cy: 760, color: '#0B1A12'},
  {kind: 'cut', dur: 0},
  {kind: 'cut', dur: 0},
  {kind: 'puff', dur: 14},
];
export const HOOK_TEST_LEN = timelineLength(SCENES, JOINS);
const STING_START = 208 + 200 + 100 - 16 - 24;

export const HookTest: React.FC = () => {
  const music = (f: number) => {
    if (f < STING_START - 10) return 0.08;
    if (f < STING_START) return interpolate(f, [STING_START - 10, STING_START], [0.08, 0], C);
    if (f < STING_START + STING - 10) return 0;
    return interpolate(f, [STING_START + STING - 10, STING_START + STING + 36], [0, 0.08], C);
  };
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <Timeline scenes={SCENES} joins={JOINS} />
      <Watermark />
      <Html5Audio src={staticFile('music/monday_routine.mp3')} loop loopVolumeCurveBehavior="extend" volume={music} />
      <Sequence from={STING_START} layout="none"><Html5Audio src={staticFile('music/funky_intro_sting.mp3')} volume={0.7} /></Sequence>
      <Sfx name="whoosh" at={192} /><Sfx name="whoosh" at={368} /><Sfx name="whoosh" at={698} />
    </AbsoluteFill>
  );
};
