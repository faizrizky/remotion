// Video 04, Chapter 4 "When Payments Stop" (Style 2), timed to ch4.wav (57.1 s).
import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Cam, Chip2, INK, Key, LetterBounce, Pill2, Sfx, Src2} from './s2kit';
import {FloorShadow, Bg, Board, buildChapter, C, CardBg, ChapterShell, GrowBar, Label, lt, Pie, PopIn, Prop, QLines, SceneFn} from './v4common';

// 1. question card
const Q: SceneFn = ({s0}) => {
  const t = lt(s0);
  return (
    <AbsoluteFill>
      <Cam keys={[{t: 0, x: 960, y: 540, z: 1.06}]} drift={0.03}>
        <CardBg color="maroon" />
        <QLines lines={['WHAT IF YOU', "CAN'T KEEP UP?"]} at={t(0.1)} size={124} />
      </Cam>
      <Sfx name="pop" at={t(0.1)} /><Sfx name="pop" at={t(0.6)} />
    </AbsoluteFill>
  );
};

// 2. the big picture: $1.7 trillion (long pull-back through the paper hall)
const BigPicture: SceneFn = ({s0}) => {
  const t = lt(s0);
  const f = useCurrentFrame();
  const keys: Key[] = [{t: 0, x: 962, y: 680, z: 3.4}, {t: t(11.8), x: 960, y: 560, z: 0.98, dur: t(11.8) - t(4.6)}];
  const big = f >= t(6.8);
  return (
    <AbsoluteFill>
      <Cam keys={keys} drift={0} bg="#E9D9BE">
        <Bg src="paper_hall.jpg" />
        <div style={{position: 'absolute', left: 780, top: 565, width: 365, height: 230, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          {!big && f >= 4 && <><Label size={50} color="#33384A">THE BIG</Label><Label size={50} color="#33384A">PICTURE</Label></>}
          {big && <div style={{transform: `scale(${Math.min(1, 0.4 + (f - t(6.8)) / 8)})`, textAlign: 'center'}}><Label size={112} color="#B42318">$1.7</Label><Label size={52} color="#B42318" style={{marginTop: -10}}>TRILLION</Label></div>}
        </div>
      </Cam>
      <Pill2 text="owed on auto loans" at={t(8.0)} x={960} y={220} size={60} />
      <Chip2 label="DATE:" value="Q2 2026" icon="cal" at={t(8.2)} />
      <Src2 text="New York Fed, Household Debt and Credit, Q2 2026" at={t(9.4)} />
      <Sfx name="pop" at={4} /><Sfx name="whoosh" at={t(4.6)} /><Sfx name="ding" at={t(6.8)} /><Sfx name="pop" at={t(8.0)} /><Sfx name="pop" at={t(8.2)} />
    </AbsoluteFill>
  );
};

// 3. about 3% moved into serious delinquency (90+ days)
const Three: SceneFn = ({s0}) => {
  const t = lt(s0);
  return (
    <AbsoluteFill>
      <Cam keys={[{t: 0, x: 960, y: 540, z: 1.03}]} drift={0.015} bg="#E9D9BE">
        <Bg src="paper_hall_clean.jpg" blur={6} />
        <Board x={260} y={170} w={1400} h={720}>
          <div style={{position: 'absolute', left: 90, top: 150}}><Pie r={200} part={0.03} at={t(12.8)} rest="#9AA5B8" /></div>
          <PopIn at={t(13.0)} x={600} y={150} id="t3" origin="0% 50%">
            <Label size={90} color="#B42318">ABOUT 3%</Label>
            <Label size={40} style={{marginTop: 8}}>of the balance moved into</Label>
            <Label size={40}>serious delinquency (past year)</Label>
          </PopIn>
          <PopIn at={t(15.9)} x={600} y={470} id="t90" origin="0% 50%">
            <div style={{background: '#E5484D', borderRadius: 16, padding: '10px 28px', border: `5px solid ${INK}`}}><Label size={50} color="#FFFFFF">90+ DAYS BEHIND</Label></div>
          </PopIn>
        </Board>
      </Cam>
      <Src2 text="New York Fed, Q2 2026" at={t(13.0)} />
      <Sfx name="pop" at={t(12.8)} /><Sfx name="ding" at={t(13.6)} /><Sfx name="boom" at={t(15.9)} />
    </AbsoluteFill>
  );
};

// 4. the New York Fed's own words, typed
const QUOTE = '“New delinquencies for auto loans remain at elevated levels.”';
const Quote: SceneFn = ({s0}) => {
  const f = useCurrentFrame();
  const t = lt(s0);
  const n = Math.floor(interpolate(f, [t(20.6), t(24.0)], [0, QUOTE.length], C));
  return (
    <AbsoluteFill>
      <Cam keys={[{t: 0, x: 960, y: 540, z: 1.06}]} drift={0.02}>
        <Bg src="desk_typewriter.jpg" blur={1} />
        <PopIn at={2} x={470} y={250} id="paper" origin="50% 100%">
          <div style={{width: 820, height: 520, background: '#FFFDF7', borderRadius: 8, boxShadow: '10px 14px 0 rgba(0,0,0,0.18)', padding: '44px 56px', boxSizing: 'border-box', transform: 'rotate(-1deg)'}}>
            <Label size={30} color="#777">IN THEIR OWN WORDS</Label>
            <div style={{fontFamily: 'Courier New, monospace', fontWeight: 700, fontSize: 52, color: INK, lineHeight: 1.3, marginTop: 26, whiteSpace: 'normal', minHeight: 270}}>{QUOTE.slice(0, n)}<span style={{opacity: f % 12 < 6 ? 1 : 0}}>|</span></div>
            <Label size={30} color="#444">— New York Fed, Q2 2026 report</Label>
          </div>
        </PopIn>
      </Cam>
      <Sfx name="typing" at={t(20.6)} />
    </AbsoluteFill>
  );
};

// 5. the riskier end: subprime pools ~7% 60+ days behind, roughly double Sep 2019
const Riskier: SceneFn = ({s0}) => {
  const t = lt(s0);
  return (
    <AbsoluteFill>
      <Cam keys={[{t: 0, x: 960, y: 540, z: 1.04}]} drift={0.01}>
        <Bg src="chart_grid.jpg" />
        <LetterBounce text="THE RISKIER END" at={t(25.0)} x={960} y={150} size={90} />
        <PopIn at={t(29.6)} x={510} y={272} id="sub"><div style={{width: 900, textAlign: 'center'}}><Label size={40} color="#BFE3CF">subprime car-loan pools · 60+ days behind</Label></div></PopIn>
        <GrowBar id="b2026" x={1020} base={860} w={240} h={400} at={t(34.3)} color="#E5484D" top="≈7%" label="SEP 2026" />
        <GrowBar id="b2019" x={640} base={860} w={240} h={200} at={t(30.2)} color="#9AA5B8" label="SEP 2019" />
        <Pill2 text="roughly 2x" at={t(38.0)} x={1530} y={520} size={60} bg="#F5C842" />
      </Cam>
      <Src2 text="LoanTape via 24/7 Wall St., Sep 2026" at={t(34.3)} />
      <Sfx name="pop" at={t(25.0)} /><Sfx name="pop" at={t(29.6)} /><Sfx name="ding" at={t(34.3)} /><Sfx name="pop" at={t(30.2)} /><Sfx name="boom" at={t(38.0)} />
    </AbsoluteFill>
  );
};

// 6. taken back: you can still owe the difference
const Tow: SceneFn = ({s0}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = lt(s0);
  const s = spring({frame: f - 2, fps, config: {damping: 16, stiffness: 60, mass: 1}});
  const x = -1500 + 1680 * s;
  const bob = Math.sin(f / 2.4) * 2;
  return (
    <AbsoluteFill>
      <Cam keys={[{t: 0, x: 960, y: 560, z: 1.03}]} drift={0.015}>
        <Bg src="suburb_grey.jpg" blur={3} />
        <div data-fg="tow" style={{position: 'absolute', left: x, top: 480 + bob, width: 1440, height: 480}}>
          <div style={{position: 'absolute', left: 0, top: 170, transform: 'rotate(-7deg)', transformOrigin: '100% 100%'}}><Prop name="obj_car_leo_side" w={600} flip /></div>
          <FloorShadow x={1010} y={860 * 0.5577 - 10} w={820} h={56} o={0.4} /><FloorShadow x={300} y={474} w={540} h={40} o={0.3} /><div style={{position: 'absolute', left: 580, top: 0}}><Prop name="obj_tow_truck" w={860} /></div>
        </div>
        <Pill2 text="the story may not end there" at={t(42.8)} x={960} y={210} size={54} />
        <Pill2 text="many states: you can still owe the difference" at={t(47.0)} x={960} y={368} size={46} bg="#E5484D" color="#FFFFFF" />
      </Cam>
      <Sfx name="pop" at={t(42.8)} /><Sfx name="boom" at={t(47.0)} />
    </AbsoluteFill>
  );
};

// 7. a repossession can stay on a credit report for seven years
const Report: SceneFn = ({s0}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = lt(s0);
  return (
    <AbsoluteFill>
      <Cam keys={[{t: 0, x: 960, y: 560, z: 1.05}]} drift={0.02}>
        <Bg src="closeup_soft.jpg" />
        <PopIn at={2} x={300} y={440} origin="50% 100%"><Prop name="obj_phone_hand" w={520} /></PopIn>
        <PopIn at={t(50.9)} x={880} y={300} id="notif" origin="0% 50%">
          <div style={{width: 820, background: '#FFFFFF', borderRadius: 26, padding: '24px 34px', boxSizing: 'border-box', boxShadow: '0 14px 30px rgba(0,0,0,0.2)', borderLeft: '16px solid #E5484D'}}>
            <Label size={30} color="#777">CREDIT REPORT</Label>
            <Label size={46}>Repossession on file</Label>
            <Label size={34} color="#B42318">can stay up to 7 years</Label>
          </div>
        </PopIn>
        <div data-fg="years" style={{position: 'absolute', left: 880, top: 600, display: f >= t(52.0) ? 'flex' : 'none', gap: 14}}>
          {Array.from({length: 7}, (_, i) => {
            const a = t(52.0) + i * 6;
            const k = f >= a ? spring({frame: f - a, fps, config: {damping: 10, stiffness: 220, mass: 0.6}}) : 0;
            return (
              <div key={i} style={{width: 106, height: 110, background: '#FFFFFF', borderRadius: 14, border: `5px solid ${INK}`, boxSizing: 'border-box', position: 'relative', transform: `scale(${k})`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Label size={26} color="#555">YR {i + 1}</Label>
                {f >= a + 4 && <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', fontWeight: 900, fontSize: 80, color: '#E5484D'}}>✕</div>}
              </div>
            );
          })}
        </div>
        <Pill2 text="from the first missed payment" at={t(54.8)} x={1330} y={880} size={44} bg="#F5C842" />
      </Cam>
      <Sfx name="notify" at={t(50.9)} />{Array.from({length: 7}, (_, i) => <Sfx key={i} name="pop" at={t(52.0) + i * 6 + 4} />)}<Sfx name="ding" at={t(54.8)} />
    </AbsoluteFill>
  );
};

const BUILT = buildChapter([0, 3.0, 12.4, 19.1, 24.6, 39.9, 50.4], 57.7, [Q, BigPicture, Three, Quote, Riskier, Tow, Report], [
  {kind: 'splat', dur: 16, cx: 960, cy: 560},
  {kind: 'cut', dur: 0},
  {kind: 'puff', dur: 14},
  {kind: 'puff', dur: 14},
  {kind: 'shatter', dur: 16},
  {kind: 'splat', dur: 16, cx: 1000, cy: 600},
]);
export const V4_CH4_LEN = BUILT.len;
export const V4Ch4: React.FC<{check?: boolean; bare?: boolean; mute?: boolean}> = ({check = false, bare = false, mute = false}) => <ChapterShell built={BUILT} voice="ch4.wav" check={check} bare={bare} mute={mute} />;
