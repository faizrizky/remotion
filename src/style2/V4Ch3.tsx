// Video 04, Chapter 3 "Rolled Over" (Style 2), timed to ch3.wav (57.2 s).
import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Cam, Chip2, Count, INK, Key, LetterBounce, Pill2, Sfx, Src2} from './s2kit';
import {FloorShadow, StandLeo, Bg, buildChapter, C, CardBg, ChapterShell, Label, lt, PopIn, Prop, QLines, RoadBands, SceneFn, Stamp} from './v4common';

// 1. question card with the $7,107 callback
const Q: SceneFn = ({s0}) => {
  const f = useCurrentFrame();
  const t = lt(s0);
  const fly = interpolate(f, [t(0.2), t(0.2) + 16], [0, 1], C);
  return (
    <AbsoluteFill>
      <Cam keys={[{t: 0, x: 960, y: 540, z: 1.06}]} drift={0.03}>
        <CardBg color="green" />
        <QLines lines={['WHERE DOES', 'THE GAP GO?']} at={t(0.1)} size={124} y={470} />
        <div style={{position: 'absolute', left: 960 + (1 - fly) * 1100, top: 840, transform: `rotate(${(1 - fly) * 30}deg)`}}>
          <Pill2 text="$7,107" at={t(0.2)} x={0} y={0} size={64} bg="#E5484D" color="#FFFFFF" />
        </div>
      </Cam>
      <Sfx name="whoosh" at={t(0.2)} /><Sfx name="pop" at={t(0.1)} />
    </AbsoluteFill>
  );
};

// 2. showroom: it goes into the next loan; trade in the car you owe $7,000 on
const Showroom: SceneFn = ({s0}) => {
  const f = useCurrentFrame();
  const t = lt(s0);
  const walk = interpolate(f, [0, 26], [-420, 0], C);
  const bob = walk < 0 ? Math.abs(Math.sin(f / 3)) * -14 : 0;
  const keys: Key[] = [{t: 0, x: 900, y: 540, z: 1.0}, {t: 120, x: 1020, y: 540, z: 1.04, dur: 120}];
  return (
    <AbsoluteFill>
      <Cam keys={keys} drift={0.01}>
        <Bg src="showroom.jpg" blur={6} dim={0.06} />
        <StandLeo x={260 + walk} y={420 + bob} h={560} pose={f < t(5.6) ? 'happy' : 'suspicious'} />
        {f >= t(2.8) && <FloorShadow x={1270} y={600 + 900 * 0.4156 - 10} w={840} h={60} o={0.38} />}<PopIn at={t(2.8)} x={820} y={600} id="newcar" origin="50% 100%"><Prop name="obj_car_new_side" w={900} /></PopIn>
        <Pill2 text="into the next loan" at={t(3.2)} x={960} y={180} size={56} />
        <Pill2 text="old car: owe $7,000 more" at={t(5.8)} x={720} y={330} size={50} bg="#E5484D" color="#FFFFFF" />
        <Pill2 text="dealer pays off old loan" at={t(8.6)} x={1300} y={490} size={46} bg="#2E9E5B" color="#FFFFFF" />
      </Cam>
      <Sfx name="pop" at={t(2.8)} /><Sfx name="pop" at={t(3.2)} /><Sfx name="pop" at={t(5.8)} /><Sfx name="ding" at={t(8.6)} />
    </AbsoluteFill>
  );
};

// 3. the new contract: the old debt slides into the amount financed -> ROLLED OVER
const Contract: SceneFn = ({s0}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = lt(s0);
  const slide = f >= t(10.4) ? spring({frame: f - t(10.4), fps, config: {damping: 13, stiffness: 120, mass: 0.8}}) : 0;
  const keys: Key[] = [{t: 0, x: 960, y: 540, z: 1.0}, {t: t(15.0), x: 960, y: 600, z: 1.18, dur: 40}];
  return (
    <AbsoluteFill>
      <Cam keys={keys} drift={0.01}>
        <Bg src="desk_top.jpg" blur={2} />
        <PopIn at={2} x={560} y={170} id="contract" origin="50% 100%">
          <div style={{position: 'relative', width: 800, height: 740, background: '#FFFDF7', borderRadius: 10, boxShadow: '12px 16px 0 rgba(0,0,0,0.18)', padding: '40px 56px', boxSizing: 'border-box'}}>
            <Label size={46}>NEW CAR LOAN</Label>
            <Label size={26} color="#777">example</Label>
            <div style={{height: 6, background: INK, margin: '14px 0 26px'}} />
            <div style={{display: 'flex', justifyContent: 'space-between'}}><Label size={44}>New car</Label><Label size={44}>$40,000</Label></div>
            <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 24, height: 72}}>
              <Label size={44} color="#B42318" style={{opacity: slide}}>Old debt</Label>
              <div style={{transform: `translateX(${(1 - slide) * -900}px)`, background: '#E5484D', color: '#FFF', borderRadius: 12, padding: '4px 18px', border: `4px solid ${INK}`}}><Label size={44} color="#FFFFFF">+$7,000</Label></div>
            </div>
            <div style={{height: 5, background: '#BBB', margin: '26px 0'}} />
            <Label size={30} color="#666">AMOUNT FINANCED</Label>
            <Label size={96}>${(40000 + Math.round(7000 * Math.min(1, slide))).toLocaleString('en-US')}</Label>
            <Stamp text="ROLLED OVER" at={t(12.7)} x={480} y={640} size={60} id="rolled" />
          </div>
        </PopIn>
      </Cam>
      <Sfx name="card_tap" at={2} /><Sfx name="whoosh" at={t(10.4)} /><Sfx name="kaching" at={t(11.0)} /><Sfx name="boom" at={t(12.7)} />
    </AbsoluteFill>
  );
};

// 4. the average rolled-over loan: $57,235, $952 a month, 8.1%
const BigLoan: SceneFn = ({s0}) => {
  const t = lt(s0);
  return (
    <AbsoluteFill>
      <Cam keys={[{t: 0, x: 960, y: 540, z: 1.0}]} drift={0.006}>
        <CardBg color="maroon" />
        <LetterBounce text="AVERAGE ROLLED-OVER LOAN" at={t(18.4)} x={960} y={240} size={66} />
        <PopIn at={t(21.4)} x={960} y={410} id="big"><div style={{transform: 'translate(-50%, -50%)'}}><Label size={180} color="#FFFFFF" style={{textShadow: '0 8px 0 rgba(0,0,0,0.3)'}}><Count to={57235} at={t(21.5)} dur={30} prefix="$" /></Label></div></PopIn>
        <Pill2 text="$952 / month" at={t(25.8)} x={700} y={810} size={60} />
        <Pill2 text="8.1% interest" at={t(27.9)} x={1300} y={810} size={60} bg="#F5C842" />
      </Cam>
      <Chip2 label="DATE:" value="Q3 2026" icon="cal" at={t(18.3)} />
      <Src2 text="Edmunds, Q3 2026" at={t(21.5)} />
      <Sfx name="pop" at={t(18.3)} /><Sfx name="pop" at={t(18.4)} /><Sfx name="kaching" at={t(21.5)} /><Sfx name="ding" at={t(25.8)} /><Sfx name="ding" at={t(27.9)} />
    </AbsoluteFill>
  );
};

// 5. stage: interest alone $16,610
const Stage: SceneFn = ({s0}) => {
  const t = lt(s0);
  return (
    <AbsoluteFill>
      <Cam keys={[{t: 0, x: 960, y: 560, z: 1.06}]} drift={0.02}>
        <Bg src="stage_spot.jpg" />
        <FloorShadow x={960} y={470 + 760 * 0.6692 - 30} w={720} h={70} o={0.45} /><PopIn at={t(30.0)} x={580} y={470} id="cash" origin="50% 100%"><Prop name="obj_cash_stack_l" w={760} /></PopIn>
        <Pill2 text={<>interest alone: <Count to={16610} at={t(34.0)} dur={18} prefix="$" /></>} at={t(32.9)} x={960} y={300} size={64} />
      </Cam>
      <Src2 text="Edmunds, Q3 2026" at={t(32.9)} />
      <Sfx name="boom" at={t(30.0)} /><Sfx name="pop" at={t(32.9)} /><Sfx name="kaching" at={t(34.0)} />
    </AbsoluteFill>
  );
};

// 6. compared with the average new-car buyer
const Compare: SceneFn = ({s0}) => {
  const t = lt(s0);
  return (
    <AbsoluteFill>
      <Cam keys={[{t: 0, x: 960, y: 540, z: 1.0}]} drift={0.006}>
        <CardBg color="navy" />
        <LetterBounce text="VS. THE AVERAGE NEW-CAR BUYER" at={t(35.6)} x={960} y={180} size={70} />
        <Pill2 text="+$12,600 borrowed" at={t(39.8)} x={760} y={400} size={70} bg="#E5484D" color="#FFFFFF" />
        <Pill2 text="+$165 a month" at={t(42.4)} x={1160} y={610} size={70} bg="#E5484D" color="#FFFFFF" />
        <Pill2 text="+$6,700 in interest" at={t(46.8)} x={900} y={820} size={70} bg="#E5484D" color="#FFFFFF" />
      </Cam>
      <Src2 text="Edmunds, Q3 2026" at={t(39.8)} />
      <Sfx name="pop" at={t(35.6)} /><Sfx name="ding" at={t(39.8)} /><Sfx name="ding" at={t(42.4)} /><Sfx name="boom" at={t(46.8)} />
    </AbsoluteFill>
  );
};

// 7. the twist: the new loan starts upside down, the gap rides along to the next car
const Twist: SceneFn = ({s0}) => {
  const f = useCurrentFrame();
  const t = lt(s0);
  const bob = Math.sin(f / 2.2) * 3;
  return (
    <AbsoluteFill>
      <RoadBands camX={f * 26} />
      <div style={{position: 'absolute', left: 200, top: 0, transform: `translateY(${bob}px)`}}>
        <FloorShadow x={380} y={650 + 760 * 0.4156 - 8} w={700} h={48} o={0.4} /><div style={{position: 'absolute', left: 0, top: 650}}><Prop name="obj_car_new_side" w={760} flip /></div>
        <div data-fg="crate" style={{position: 'absolute', left: 250, top: 488}}>
          <Prop name="obj_debt_box" w={240} />
          <div style={{position: 'absolute', left: 120, top: 70, transform: 'translateX(-50%) rotate(-4deg)', background: '#FFFFFF', border: `4px solid ${INK}`, borderRadius: 10, padding: '2px 12px'}}><Label size={30}>OLD DEBT</Label></div>
        </div>
      </div>
      <Pill2 text="upside down from day one" at={t(51.4)} x={1260} y={240} size={54} bg="#E5484D" color="#FFFFFF" />
      <Pill2 text="it travels to the next car" at={t(55.8)} x={1240} y={420} size={54} />
      <Sfx name="boom" at={t(51.4)} /><Sfx name="pop" at={t(55.8)} />
    </AbsoluteFill>
  );
};

const BUILT = buildChapter([0, 2.5, 10.0, 17.8, 29.3, 35.4, 48.7], 57.9, [Q, Showroom, Contract, BigLoan, Stage, Compare, Twist], [
  {kind: 'puff', dur: 14},
  {kind: 'splat', dur: 16, cx: 960, cy: 560},
  {kind: 'shatter', dur: 16},
  {kind: 'puff', dur: 14},
  {kind: 'swirl', dur: 22, cx: 960, cy: 540, color: '#0B1730'},
  {kind: 'splat', dur: 16, cx: 900, cy: 600},
]);
export const V4_CH3_LEN = BUILT.len;
export const V4Ch3: React.FC<{check?: boolean; bare?: boolean; mute?: boolean}> = ({check = false, bare = false, mute = false}) => <ChapterShell built={BUILT} voice="ch3.wav" check={check} bare={bare} mute={mute} />;
