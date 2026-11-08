// Video 04 outro (Style 2), timed to the Transcribe.txt outro segment (28.2 s). Voice file not recorded yet:
// set OUTRO_VOICE to 'outro.wav' (public/v4/voice/outro.wav) once it exists and re-check the cues below.
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Cam, Enter, LetterBounce, Pill2, Sfx} from './s2kit';
import {Bg, buildChapter, CardBg, ChapterShell, FloorShadow, GroundProp, Label, lt, PopIn, Prop, SceneFn, StandLeo} from './v4common';

export const OUTRO_VOICE = 'outro.wav';

// 1. back to the trade-in: $15,000 car, $22,000 loan, the gap crate
const Callback: SceneFn = ({s0}) => {
  const t = lt(s0);
  return (
    <AbsoluteFill>
      <Cam keys={[{t: 0, x: 960, y: 540, z: 1.04}]} drift={0.015}>
        <Bg src="suburb_sun.jpg" blur={2} />
        <GroundProp name="obj_car_leo_side" x={260} y={600} w={760} ratio={0.3761} id="car" />
        <Pill2 text="VALUE $15,000" at={t(1.6)} x={640} y={240} size={56} />
        <Pill2 text="LOAN $22,000" at={t(3.6)} x={1360} y={240} size={56} bg="#E5484D" color="#FFFFFF" />
        <Enter kind="drop" at={t(5.4)} x={1330} y={520} id="gap" dist={500}>
          <div style={{background: '#FFE066', color: '#1B2230', fontFamily: 'sans-serif', fontWeight: 900, fontSize: 96, padding: '14px 40px', borderRadius: 26, border: '6px solid #1B2230', boxShadow: '0 12px 0 rgba(0,0,0,0.25)', whiteSpace: 'nowrap'}}>$7,000</div>
        </Enter>
      </Cam>
      <Sfx name="pop" at={t(1.6)} /><Sfx name="pop" at={t(3.6)} /><Sfx name="boom" at={t(5.4) + 12} />
    </AbsoluteFill>
  );
};

// 2. the next car drives away, the old debt stays behind; a loan is not a trap by itself
const Leave: SceneFn = ({s0}) => {
  const f = useCurrentFrame();
  const t = lt(s0);
  const go = Math.max(0, f - t(8.0));
  const x = 700 + go * go * 0.9;
  return (
    <AbsoluteFill>
      <Cam keys={[{t: 0, x: 960, y: 540, z: 1.0}]} drift={0.01}>
        <Bg src="road_full.jpg" />
        <FloorShadow x={x + 380} y={600 + 760 * 0.4156 - 8} w={700} h={50} o={0.4} />
        <div style={{position: 'absolute', left: x, top: 600}}><Prop name="obj_car_new_side" w={760} /></div>
        <FloorShadow x={400} y={820} w={300} h={34} o={0.4} />
        <PopIn at={2} x={250} y={620} id="crate"><Prop name="obj_debt_box" w={300} /></PopIn>
      </Cam>
      <Pill2 text="don't let it follow you" at={t(7.4)} x={960} y={140} size={56} />
      <Pill2 text="a car loan is not a trap by itself" at={t(10.05)} x={960} y={300} size={56} bg="#2E9E5B" color="#FFFFFF" />
      <Sfx name="pop" at={t(7.4)} /><Sfx name="whoosh" at={t(8.0)} /><Sfx name="ding" at={t(10.05)} />
    </AbsoluteFill>
  );
};

// 3. it becomes one when the loan outlives the car's value
const Outlives: SceneFn = ({s0}) => {
  const t = lt(s0);
  return (
    <AbsoluteFill>
      <Cam keys={[{t: 0, x: 960, y: 540, z: 1.05}]} drift={0.02}>
        <CardBg color="navy" />
        <LetterBounce text="IT BECOMES ONE WHEN" at={t(12.6)} x={960} y={330} size={84} />
        <LetterBounce text="THE LOAN OUTLIVES" at={t(13.6)} x={960} y={560} size={110} color="#F5C842" />
        <LetterBounce text="THE CAR'S VALUE" at={t(15.45)} x={960} y={780} size={110} color="#F5C842" />
      </Cam>
      <Sfx name="pop" at={t(12.6)} /><Sfx name="pop" at={t(13.6)} /><Sfx name="boom" at={t(15.45)} />
    </AbsoluteFill>
  );
};

// 4. challenge: check payoff and value this week, then comment above or below the line
const Challenge: SceneFn = ({s0}) => {
  const t = lt(s0);
  return (
    <AbsoluteFill>
      <Cam keys={[{t: 0, x: 960, y: 540, z: 1.04}]} drift={0.02}>
        <CardBg color="green" />
        <LetterBounce text="YOUR CHALLENGE" at={t(17.45)} x={960} y={230} size={110} />
        <Pill2 text="check your payoff" at={t(18.2)} x={600} y={420} size={56} />
        <Pill2 text="check your car's value" at={t(19.4)} x={1260} y={580} size={56} />
        <Pill2 text="this week" at={t(19.95)} x={960} y={740} size={56} bg="#F5C842" />
        <PopIn at={t(23.1)} x={960} y={915} id="ask"><div style={{transform: 'translate(-50%, -50%)'}}><Label size={50} color="#FFFFFF">comment: above or below the line?</Label></div></PopIn>
      </Cam>
      <Sfx name="pop" at={t(17.45)} /><Sfx name="pop" at={t(18.2)} /><Sfx name="pop" at={t(19.4)} /><Sfx name="pop" at={t(19.95)} /><Sfx name="ding" at={t(23.1)} />
    </AbsoluteFill>
  );
};

// 5. subscribe + see you; the right side stays empty for the end screen
const Bye: SceneFn = ({s0}) => {
  const f = useCurrentFrame();
  const t = lt(s0);
  return (
    <AbsoluteFill>
      <Cam keys={[{t: 0, x: 960, y: 540, z: 1.0}]} drift={0.008}>
        <Bg src="road_full.jpg" />
        <StandLeo x={140} y={440} h={560} pose={f < t(27.55) ? 'happy' : 'proud'} />
      </Cam>
      <Pill2 text="SUBSCRIBE" at={t(25.45)} x={500} y={300} size={70} bg="#E5484D" color="#FFFFFF" anchor="left" />
      <Pill2 text="see you next time" at={t(27.55)} x={500} y={520} size={48} anchor="left" />
      <Sfx name="pop" at={t(25.45)} /><Sfx name="ding" at={t(26.0)} /><Sfx name="pop" at={t(27.55)} />
    </AbsoluteFill>
  );
};

const BUILT = buildChapter([0, 7.2, 12.3, 17.2, 25.2], 28.9, [Callback, Leave, Outlives, Challenge, Bye], [
  {kind: 'swirl', dur: 20, cx: 960, cy: 560, color: '#E9D9BE'},
  {kind: 'splat', dur: 16, cx: 960, cy: 540},
  {kind: 'shatter', dur: 16},
  {kind: 'puff', dur: 14},
]);
export const V4_OUTRO_LEN = BUILT.len;
export const V4Outro: React.FC<{check?: boolean; bare?: boolean; mute?: boolean}> = ({check = false, bare = false, mute = false}) => <ChapterShell built={BUILT} voice={OUTRO_VOICE} check={check} bare={bare} mute={mute} />;
