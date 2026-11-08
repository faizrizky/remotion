// Video 04 opening (Style 2): split-screen hook "same car, two prices", timed to COLD OPEN.wav (25.7 s).
import React from 'react';
import {AbsoluteFill, Html5Audio, Img, interpolate, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {PennySting} from '../kit/sting';
import {Cam, Car, Chip2, Count, Enter, H, Join, Key, LayoutProbe, LetterBounce, PatternCard, Pill2, Popped, SceneDef, Sfx, Src2, Timeline, timelineLength, W} from './s2kit';

const C = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const STING = 96;
const Watermark = () => (
  <Img src={staticFile('profile_pic.png')} style={{position: 'absolute', left: 28, bottom: 28, width: 72, height: 72, borderRadius: 36, boxShadow: '0 2px 8px rgba(0,0,0,0.3)'}} />
);

// ---- scene 1: split screen. left = dealer value, right = loan. divider slides, gap drops in, crate lands on the car ----
const Split: React.FC = () => {
  const f = useCurrentFrame();
  const div = 960 + interpolate(f, [190, 212], [0, 70], C) - interpolate(f, [212, 226], [0, 70], C);
  const bgKeys: Key[] = [{t: 0, x: 960, y: 560, z: 1.1}];
  const panel = (side: 'l' | 'r') => {
    const cx = side === 'l' ? 480 : 1440;
    return (
      <AbsoluteFill style={{clipPath: side === 'l' ? `inset(0 ${W - div}px 0 0)` : `inset(0 0 0 ${div}px)`}}>
        <Cam keys={bgKeys} drift={0.015}>
          <div style={{position: 'absolute', width: W, height: H}}>
            <Img src={staticFile(side === 'l' ? 'v4/bg/suburb_sun.jpg' : 'v4/bg/suburb_grey.jpg')} style={{position: 'absolute', left: -240, top: -150, width: 2400, height: 1340}} />
            <Img src={staticFile('v4/obj_car_leo_side.png')} style={{position: 'absolute', left: cx - 320, top: 699, width: 640}} />
          </div>
        </Cam>
      </AbsoluteFill>
    );
  };
  return (
    <AbsoluteFill style={{background: '#9ED3F2'}}>
      {panel('l')}{panel('r')}
      <div style={{position: 'absolute', left: div - 7, top: 0, width: 14, height: H, background: '#FFFFFF', boxShadow: '0 0 18px rgba(0,0,0,0.3)'}} />
      <Chip2 label="LOCATION:" value="United States" icon="pin" at={20} />
      <Chip2 label="DATE:" value="Q3 2026" icon="cal" at={28} y={186} />
      <Pill2 text="VALUE $15,000" at={112} x={480} y={370} size={56} />
      <Pill2 text="LOAN $22,000" at={187} x={1440} y={370} size={56} bg="#E5484D" color="#FFFFFF" />
      <Enter kind="drop" at={214} x={960 - 190} y={600} id="gap" dist={600}>
        <div style={{background: '#FFE066', color: '#1B2230', fontFamily: 'sans-serif', fontWeight: 900, fontSize: 96, padding: '14px 40px', borderRadius: 26, border: '6px solid #1B2230', boxShadow: '0 12px 0 rgba(0,0,0,0.25)', whiteSpace: 'nowrap'}}>$7,000</div>
      </Enter>
      <Enter kind="drop" at={238} x={1440 - 150} y={480} id="crate" dist={800}>
        <Img src={staticFile('v4/obj_debt_box.png')} style={{width: 300, display: 'block'}} />
      </Enter>
      <Sfx name="whoosh" at={4} /><Sfx name="pop" at={20} /><Sfx name="pop" at={28} /><Sfx name="pop" at={112} />
      <Sfx name="pop" at={187} /><Sfx name="whoosh" at={192} /><Sfx name="boom" at={218} /><Sfx name="boom" at={242} />
    </AbsoluteFill>
  );
};

// ---- scene 2: navy card, 3 in 10, $7,107 ----
const NAVY_KEYS: Key[] = [{t: 0, x: 960, y: 540, z: 1.12}, {t: 200, x: 960, y: 700, z: 1.32, dur: 30}];
const Navy: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <PatternCard base="#0E2244" light="#14305C" />
      <Cam keys={NAVY_KEYS} drift={0.03}>
        <div style={{position: 'absolute', left: 0, top: 0, width: W, height: H}}>
          {Array.from({length: 10}, (_, i) => {
            const red = (i === 2 && f >= 36) || (i === 5 && f >= 42) || (i === 8 && f >= 48);
            return <Popped key={i} at={6 + i * 4} x={190 + i * 158} y={300}><Car color={red ? '#E5484D' : '#C9CED6'} w={150} /></Popped>;
          })}
          <Pill2 text="29.1% owe more than the car is worth" at={90} x={960} y={600} size={54} />
          <Pill2 text={<>average gap <span style={{color: '#E5484D'}}><Count to={7107} at={188} dur={22} prefix="$" /></span></>} at={184} x={960} y={760} size={64} />
        </div>
      </Cam>
      <Src2 text="edmunds.com, Q3 2026" at={90} />
      {[6, 10, 14, 18, 22].map((a) => <Sfx key={a} name="pop" at={a} />)}
      <Sfx name="ding" at={36} /><Sfx name="ding" at={42} /><Sfx name="ding" at={48} /><Sfx name="pop" at={90} /><Sfx name="ding" at={210} /><Sfx name="whoosh" at={266} />
    </AbsoluteFill>
  );
};

// ---- scene 3: question card ----
const QCard: React.FC = () => {
  const out = interpolate(useCurrentFrame(), [84, 110], [0, 1], C);
  return (
    <AbsoluteFill>
      <PatternCard base="#12301C" light="#1A4228" />
      <Cam keys={[{t: 0, x: 960, y: 540, z: 1.08}]} drift={0.035}>
        <div style={{position: 'absolute', width: W, height: H}}>
          <LetterBounce text="WHERE DOES" at={6} x={960} y={395} size={120} />
          <LetterBounce text="THE GAP GO?" at={24} x={960} y={655} size={120} />
        </div>
      </Cam>
      <div data-fg-exit={out > 0 ? '1' : '0'} style={{position: 'absolute', left: 1460 + out * out * 800, top: 870, transform: `rotate(${out * 25}deg)`}}>
        <Pill2 text="$7,107" at={40} x={0} y={0} size={56} bg="#E5484D" color="#FFFFFF" />
      </div>
      <Sfx name="pop" at={6} /><Sfx name="pop" at={24} /><Sfx name="pop" at={40} /><Sfx name="whoosh" at={88} /><Sfx name="pop" at={64} />
    </AbsoluteFill>
  );
};

const StingScene: React.FC = () => <PennySting dur={STING} reveal />;
const SCENES: SceneDef[] = [
  {len: 262, node: <Split />},
  {len: 292, node: <Navy />},
  {len: 112, node: <QCard />},
  {len: STING, node: <StingScene />},
];
const JOINS: Join[] = [
  {kind: 'splat', dur: 16, cx: 960, cy: 540},
  {kind: 'swirl', dur: 24, cx: 960, cy: 760, color: '#0B1A12'},
  {kind: 'cut', dur: 0},
];
export const HOOK_SPLIT_LEN = timelineLength(SCENES, JOINS);
const STING_START = 262 + 292 + 112 - 16 - 24;

export const HookSplit: React.FC<{check?: boolean}> = ({check = false}) => (
  <AbsoluteFill style={{background: '#000'}}>
    <Timeline scenes={SCENES} joins={JOINS} />
    <Watermark />
    <LayoutProbe check={check} />
    <Html5Audio src={staticFile('v4/voice/cold_open.wav')} />
    <Html5Audio src={staticFile('music/monday_routine.mp3')} loop volume={(f) => (f < STING_START ? 0.07 : 0)} />
    <Sequence from={STING_START} layout="none"><Html5Audio src={staticFile('music/funky_intro_sting.mp3')} volume={0.7} /></Sequence>
  </AbsoluteFill>
);
