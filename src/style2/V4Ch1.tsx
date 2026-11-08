// Video 04, Chapter 1 "The Gap" (Style 2), timed to ch1.wav (53.8 s).
import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {Cam, Enter, INK, Key, LetterBounce, Pill2, Sfx, Src2} from './s2kit';
import {FloorShadow, StandLeo, Bg, Board, buildChapter, C, CardBg, ChapterShell, GapChart, GrowBar, Label, lt, PopIn, Prop, RoadBands, SceneFn, Stamp} from './v4common';
import {SANS} from '../style/style_kit';

// 1. pull back from Leo's face: "It has a name: negative equity... upside down or underwater."
const Name: SceneFn = ({s0}) => {
  const f = useCurrentFrame();
  const t = lt(s0);
  const keys: Key[] = [{t: 0, x: 1575, y: 560, z: 2.4}, {t: 40, x: 960, y: 560, z: 1.0, dur: 36}];
  const flip = interpolate(f, [t(3.6), t(3.6) + 14], [0, 180], C);
  const water = interpolate(f, [t(4.6), t(4.6) + 18], [0, 1], C);
  return (
    <AbsoluteFill>
      <Cam keys={keys} drift={0.02} bg="#E9D9BE">
        <Bg src="paper_hall_clean.jpg" blur={5} />
        <Board x={520} y={300} w={780} h={480}>
          <div style={{position: 'absolute', left: 245, top: 120, transform: `rotate(${flip}deg)`, transformOrigin: '130px 60px'}}><Prop name="obj_car_leo_side" w={260} /></div>
          <div style={{position: 'absolute', left: 0, bottom: 0, width: '100%', height: 210 * water, background: '#5FB4E6B0'}} />
          {f >= t(3.6) && <Label size={40} color="#E5484D" style={{position: 'absolute', left: 30, top: 24}}>UPSIDE DOWN</Label>}
          {f >= t(4.7) && <Label size={40} color="#FFFFFF" style={{position: 'absolute', right: 30, bottom: 24}}>UNDERWATER</Label>}
        </Board>
        <StandLeo x={1420} y={400} h={600} pose={f < t(3.6) ? 'calm' : 'thinking'} flip />
        <Pill2 text="negative equity" at={t(1.3)} x={910} y={196} size={56} />
      </Cam>
      <Sfx name="pop" at={t(1.3)} /><Sfx name="whoosh" at={t(3.6)} /><Sfx name="pop" at={t(4.7)} />
    </AbsoluteFill>
  );
};

// 2. the car drives off the lot, its value drops fast
const Drive: SceneFn = ({s0}) => {
  const f = useCurrentFrame();
  const t = lt(s0);
  const bob = Math.sin(f / 2.2) * 3;
  const drop = 1 - Math.exp(-Math.max(0, f - t(7.8)) / 40);
  return (
    <AbsoluteFill>
      <RoadBands camX={f * 26} />
      <FloorShadow x={680} y={690 + 760 * 0.3761 - 8} w={700} h={50} o={0.4} /><div style={{position: 'absolute', left: 300, top: 690 + bob}}><Prop name="obj_car_leo_side" w={760} flip /></div>
      <PopIn at={t(7.8)} x={380} y={420} id="value" origin="50% 100%">
        <div style={{background: '#FFFFFF', borderRadius: 18, padding: '14px 34px', boxShadow: '0 10px 24px rgba(0,0,0,0.22)', width: 532, boxSizing: 'border-box'}}>
          <Label size={30} color="#555">CAR VALUE (example)</Label>
          <Label size={84} color={drop > 0.3 ? '#E5484D' : INK}>${Math.round(40000 - 9000 * drop).toLocaleString('en-US')}</Label>
        </div>
      </PopIn>
      <Pill2 text="fastest in the first years" at={t(11.7)} x={1340} y={250} size={50} bg="#E5484D" color="#FFFFFF" />
      <Sfx name="pop" at={t(7.8)} /><Sfx name="ding" at={t(11.7)} />
    </AbsoluteFill>
  );
};

// 3. loan statement: balance goes down slowly, early payments are mostly interest
const Statement: SceneFn = ({s0}) => {
  const f = useCurrentFrame();
  const t = lt(s0);
  const bal = 40000 - Math.round(interpolate(f, [t(15), t(21.5)], [0, 340], C));
  const split = interpolate(f, [t(19.4), t(19.4) + 16], [0, 1], C);
  return (
    <AbsoluteFill>
      <Cam keys={[{t: 0, x: 960, y: 540, z: 1.06}]} drift={0.02}>
        <Bg src="desk_top.jpg" blur={2} />
        <Enter kind="rise" at={4} x={560} y={230} id="statement">
          <div style={{position: 'relative', width: 800, height: 600, background: '#FFFDF7', borderRadius: 10, boxShadow: '12px 16px 0 rgba(0,0,0,0.18)', transform: 'rotate(-1.5deg)', padding: '40px 56px', boxSizing: 'border-box', fontFamily: SANS, color: INK}}>
            <Label size={46}>LOAN STATEMENT</Label>
            <div style={{height: 6, background: INK, margin: '16px 0 30px'}} />
            <Label size={30} color="#666">BALANCE</Label>
            <Label size={92}>${bal.toLocaleString('en-US')}</Label>
            <Stamp text="SLOW" at={t(17.1)} x={590} y={225} size={64} id="slow" />
            {f >= t(19.4) && (
              <div style={{marginTop: 44}}>
                <Label size={30} color="#666">EACH EARLY PAYMENT (example)</Label>
                <div style={{display: 'flex', height: 96, marginTop: 14, border: `5px solid ${INK}`, borderRadius: 14, overflow: 'hidden'}}>
                  <div style={{width: `${30 + 32 * split}%`, background: '#E5484D', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Label size={34} color="#FFF">INTEREST</Label></div>
                  <div style={{flex: 1, background: '#2E9E5B', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Label size={30} color="#FFF">PRINCIPAL</Label></div>
                </div>
              </div>
            )}
          </div>
        </Enter>
      </Cam>
      <Sfx name="pop" at={4} /><Sfx name="boom" at={t(17.1)} /><Sfx name="pop" at={t(19.4)} />
    </AbsoluteFill>
  );
};

// 4. two lines on a chart, the gap between them is negative equity
const Chart: SceneFn = ({s0}) => {
  const f = useCurrentFrame();
  const t = lt(s0);
  const keys: Key[] = [{t: 0, x: 960, y: 560, z: 0.96}, {t: 30, x: 960, y: 540, z: 1.0, dur: 30}];
  return (
    <AbsoluteFill>
      <Cam keys={keys} drift={0.012} bg="#E9D9BE">
        <Bg src="paper_hall_clean.jpg" blur={6} />
        <Board x={260} y={150} w={1400} h={760}>
          <GapChart w={1368} h={728} atAxes={t(22.8)} atCar={t(28.3)} atLoan={t(30.2)} atArea={t(32.6)} />
          {f >= t(35.1) && (
            <div style={{position: 'absolute', left: 0, top: 0, opacity: Math.min(1, (f - t(35.1)) / 5)}}>
              <svg width={1368} height={728} style={{position: 'absolute'}}><path d="M800 150 Q640 160 520 250" stroke="#B42318" strokeWidth={8} fill="none" strokeLinecap="round" /><path d="M520 250 l34 -6 M520 250 l10 -32" stroke="#B42318" strokeWidth={8} strokeLinecap="round" /></svg>
              <Label size={52} color="#B42318" style={{position: 'absolute', left: 820, top: 112}}>NEGATIVE EQUITY</Label>
            </div>
          )}
        </Board>
      </Cam>
      <Sfx name="pop" at={t(22.8)} /><Sfx name="whoosh" at={t(28.3)} /><Sfx name="whoosh" at={t(30.2)} /><Sfx name="ding" at={t(35.1)} />
    </AbsoluteFill>
  );
};

// 5. keep the car and it's fine; the gap matters when you sell, trade in, or the car is totaled/taken back
const Moment: SceneFn = ({s0}) => {
  const f = useCurrentFrame();
  const t = lt(s0);
  return (
    <AbsoluteFill>
      <Cam keys={[{t: 0, x: 960, y: 540, z: 1.04}]} drift={0.015}>
        <Bg src="living_room.jpg" blur={5} dim={0.12} />
        <StandLeo x={200} y={350} h={640} pose={f < t(41.1) ? 'happy' : 'thinking'} />
        {f < t(41.0) && <Pill2 text="keep paying = no problem" at={t(37.6)} x={1240} y={300} size={54} bg="#2E9E5B" color="#FFFFFF" />}
        {f >= t(41.1) && <Pill2 text="the gap matters when you..." at={t(41.1)} x={1260} y={300} size={54} />}
        <Enter kind="drop" at={t(43.4)} x={835} y={441} ><Pill2 text="sell" at={t(43.4)} x={125} y={39} size={54} bg="#F5C842" /></Enter>
        <Enter kind="rise" at={t(44.2)} x={1260} y={581} ><Pill2 text="trade in" at={t(44.2)} x={190} y={39} size={54} bg="#F5C842" /></Enter>
        <Enter kind="drop" at={t(45.5)} x={870} y={761} ><Pill2 text="totaled or taken back" at={t(45.5)} x={380} y={39} size={54} bg="#E5484D" color="#FFFFFF" /></Enter>
      </Cam>
      <Sfx name="pop" at={t(37.6)} /><Sfx name="pop" at={t(41.1)} /><Sfx name="pop" at={t(43.4)} /><Sfx name="pop" at={t(44.2)} /><Sfx name="boom" at={t(45.5)} />
    </AbsoluteFill>
  );
};

// 6. rising four years in a row (Edmunds)
const Rising: SceneFn = ({s0}) => {
  const t = lt(s0);
  const hs = [200, 250, 310, 370, 440];
  return (
    <AbsoluteFill>
      <Cam keys={[{t: 0, x: 960, y: 540, z: 1.05}]} drift={0.02}>
        <CardBg color="maroon" />
        <LetterBounce text="4 YEARS IN A ROW" at={t(51.0)} x={960} y={200} size={90} />
        {hs.map((h, i) => (
          <GrowBar key={i} id={`bar${i}`} x={420 + i * 230} base={860} w={160} h={h} at={t(48.6) + i * 12} color={i === 4 ? '#E5484D' : '#F3B3A8'} top={i === 4 ? '29.1%' : undefined} label={i === 4 ? 'Q3 2026' : undefined} />
        ))}
      </Cam>
      <Src2 text="Edmunds, Q3 2026 (bars not to scale)" at={t(50.9)} />
      {hs.map((_, i) => <Sfx key={i} name="pop" at={t(48.6) + i * 12} />)}<Sfx name="ding" at={t(51.0)} />
    </AbsoluteFill>
  );
};

const BUILT = buildChapter([0, 7.4, 14.5, 22.4, 37.0, 48.2], 54.4, [Name, Drive, Statement, Chart, Moment, Rising], [
  {kind: 'puff', dur: 14},
  {kind: 'splat', dur: 16, cx: 960, cy: 600},
  {kind: 'swirl', dur: 22, cx: 960, cy: 540, color: '#3B2A1A'},
  {kind: 'shatter', dur: 16},
  {kind: 'puff', dur: 14},
]);
export const V4_CH1_LEN = BUILT.len;
export const V4Ch1: React.FC<{check?: boolean; bare?: boolean; mute?: boolean}> = ({check = false, bare = false, mute = false}) => <ChapterShell built={BUILT} voice="ch1.wav" check={check} bare={bare} mute={mute} />;
