// Video 04, Chapter 5 "The Honest Part" (Style 2), timed to ch5.wav (33.2 s).
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Cam, INK, Key, Leo, Pill2, Sfx, Src2} from './s2kit';
import {Bg, Board, buildChapter, CardBg, ChapterShell, Label, lt, Pie, PopIn, Prop, QLines, SceneFn, StrikeSwap} from './v4common';

const Q: SceneFn = ({s0}) => {
  const t = lt(s0);
  return (
    <AbsoluteFill>
      <Cam keys={[{t: 0, x: 960, y: 540, z: 1.06}]} drift={0.03}>
        <CardBg color="green" />
        <QLines lines={['IS THIS', 'A CRISIS?']} at={t(0.1)} size={140} y={470} gapY={230} />
        <PopIn at={t(1.8)} x={960} y={860} id="sub"><div style={{transform: 'translate(-50%, -50%)'}}><Label size={46} color="#CFE8D8">let's keep it in proportion</Label></div></PopIn>
      </Cam>
      <Sfx name="pop" at={t(0.1)} /><Sfx name="pop" at={t(1.8)} />
    </AbsoluteFill>
  );
};

// most keep paying; 71% of trade-ins are not underwater
const Most: SceneFn = ({s0}) => {
  const t = lt(s0);
  return (
    <AbsoluteFill>
      <Cam keys={[{t: 0, x: 960, y: 540, z: 1.03}]} drift={0.015} bg="#E9D9BE">
        <Bg src="paper_hall.jpg" blur={6} />
        <Board x={260} y={170} w={1400} h={720}>
          <div style={{position: 'absolute', left: 80, top: 130}}><Pie r={220} part={0.29} at={t(5.9)} /></div>
          <PopIn at={t(3.6)} x={620} y={90} id="l1" origin="0% 50%"><Label size={38}>✓ Most keep paying on time</Label></PopIn>
          <PopIn at={t(5.9)} x={620} y={170} id="l2" origin="0% 50%"><Label size={38}>✓ Most trade-ins: not underwater</Label></PopIn>
          <PopIn at={t(8.2)} x={620} y={290} id="l3" origin="0% 50%">
            <Label size={150} color="#2F80ED">71%</Label>
            <Label size={46} style={{marginTop: -10}}>are NOT underwater</Label>
          </PopIn>
        </Board>
      </Cam>
      <Src2 text="Edmunds, Q3 2026" at={t(8.2)} />
      <Sfx name="pop" at={t(3.6)} /><Sfx name="pop" at={t(5.9)} /><Sfx name="ding" at={t(8.2)} />
    </AbsoluteFill>
  );
};

// headline: CRASH COMING? -> ELEVATED, NOT A COLLAPSE
const News: SceneFn = ({s0}) => {
  const t = lt(s0);
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Cam keys={[{t: 0, x: 960, y: 540, z: 1.05}]} drift={0.02}>
        <Bg src="news_collage.jpg" blur={4} dim={0.18} />
        <PopIn at={2} x={410} y={200} id="headline" rot={f < 14 ? (14 - f) * -2 : 0}>
          <div style={{width: 1100, height: 400, background: '#FFFFFF', boxShadow: '0 18px 40px rgba(0,0,0,0.3)', padding: '36px 46px', boxSizing: 'border-box', fontFamily: 'Georgia, serif', color: INK}}>
            <div style={{fontSize: 38, fontWeight: 700, borderBottom: `4px solid ${INK}`, paddingBottom: 10}}>THE DAILY HEADLINE</div>
            <Label size={28} color="#777" style={{marginTop: 18}}>AUTO LOANS</Label>
            <Label size={70} style={{marginTop: 30}}><StrikeSwap from="CRASH COMING?" to="ELEVATED, NOT A COLLAPSE" at={t(12.6)} /></Label>
            {f >= t(14.2) && <Label size={34} color="#555" style={{marginTop: 34}}>No source in this video says a collapse is coming.</Label>}
          </div>
        </PopIn>
        <Pill2 text="exact predictions = guessing" at={t(16.6)} x={960} y={850} size={54} bg="#F5C842" />
      </Cam>
      <Sfx name="whoosh" at={2} /><Sfx name="paper_rip" at={t(12.6)} /><Sfx name="pop" at={t(14.2)} /><Sfx name="pop" at={t(16.6)} />
    </AbsoluteFill>
  );
};

// what the numbers do show
const Show: SceneFn = ({s0}) => {
  const f = useCurrentFrame();
  const t = lt(s0);
  const len = t(29.4);
  const keys: Key[] = [{t: 0, x: 860, y: 560, z: 1.06}, {t: len, x: 1100, y: 560, z: 1.06, dur: len}];
  return (
    <AbsoluteFill>
      <Cam keys={keys} drift={0}>
        <Bg src="suburb_sun.jpg" />
        <div style={{position: 'absolute', left: 150 + f * 5.5, top: 838}}><Prop name="obj_car_leo_side" w={460} flip /></div>
      </Cam>
      <Pill2 text="what the numbers show" at={t(20.0)} x={960} y={130} size={50} />
      <Pill2 text="cars cost more" at={t(22.5)} x={600} y={260} size={58} bg="#E5484D" color="#FFFFFF" />
      <Pill2 text="loans are longer" at={t(23.8)} x={1300} y={420} size={58} bg="#E5484D" color="#FFFFFF" />
      <Pill2 text="old debt rolls into new loans" at={t(25.2)} x={900} y={590} size={58} bg="#E5484D" color="#FFFFFF" />
      <Sfx name="pop" at={t(20.0)} /><Sfx name="pop" at={t(22.5)} /><Sfx name="pop" at={t(23.8)} /><Sfx name="pop" at={t(25.2)} />
    </AbsoluteFill>
  );
};

// you can see it coming, so you can avoid it
const Sky: SceneFn = ({s0}) => {
  const f = useCurrentFrame();
  const t = lt(s0);
  const keys: Key[] = [{t: 0, x: 960, y: 700, z: 1.1}, {t: 40, x: 960, y: 540, z: 1.0, dur: 40}];
  return (
    <AbsoluteFill>
      <Cam keys={keys} drift={0.01}>
        <Bg src="sky_strip.jpg" />
        <div style={{position: 'absolute', left: 806, top: 410}}><Leo pose={f < t(31.5) ? 'calm' : 'proud'} h={600} /></div>
      </Cam>
      <Pill2 text="you can see it coming" at={t(29.4)} x={960} y={190} size={58} />
      <Pill2 text="so you can avoid it" at={t(31.5)} x={960} y={320} size={58} bg="#2E9E5B" color="#FFFFFF" />
      <Sfx name="whoosh" at={2} /><Sfx name="pop" at={t(29.4)} /><Sfx name="ding" at={t(31.5)} />
    </AbsoluteFill>
  );
};

const BUILT = buildChapter([0, 3.3, 9.9, 19.8, 29.1], 33.8, [Q, Most, News, Show, Sky], [
  {kind: 'swirl', dur: 22, cx: 960, cy: 540, color: '#0B1A12'},
  {kind: 'splat', dur: 16, cx: 960, cy: 560},
  {kind: 'shatter', dur: 16},
  {kind: 'puff', dur: 14},
]);
export const V4_CH5_LEN = BUILT.len;
export const V4Ch5: React.FC<{check?: boolean; bare?: boolean}> = ({check = false, bare = false}) => <ChapterShell built={BUILT} voice="ch5.wav" check={check} bare={bare} />;
