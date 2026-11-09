// V4Q: 60-second version of Video 04 ("$188 less a month? It'll cost you $3,759."), 1920x1080, Style 2.
// Voice: public/v4/voice/v4q.wav = Hook / PROBLEM / PAYOFF / WHY / ACTION / CLOSE (Versi 2) placed at fixed offsets:
// hook 0, [2 s sting 7.5-9.5], problem 9.5, payoff 21.8, why 36.07, action 47.53, close 55.25 (cues below were matched with silencedetect).
// Example numbers: $40,000 at 8.1% APR (amortization formula, labelled "example"); 91.2% = Edmunds Q3 2026.
import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {Cam, CalendarX, Pill2, Sfx} from './s2kit';
import {Bg, buildChapter, C, ChapterShell, FloorShadow, Label, lt, PopIn, SceneFn, StandLeo} from './v4common';
import {Sting2s} from './StingOpener';

const G = '#2E9E5B';
const R = '#E5484D';
const GOLD = '#F5C842';
const CAM = [{t: 0, x: 960, y: 540, z: 1.0}];

// 1. hook
const Hook: SceneFn = ({s0}) => {
  const f = useCurrentFrame();
  const t = lt(s0);
  return (
    <AbsoluteFill>
      <Cam keys={CAM} drift={0.012}>
        <Bg src="road_full.jpg" />
        <StandLeo x={200} y={440} h={560} pose={f < t(3.9) ? 'suspicious' : 'shocked'} />
      </Cam>
      <Pill2 text="-$188 / MONTH" at={t(0.3)} x={1250} y={270} size={80} bg={G} color="#FFFFFF" />
      <Pill2 text="+$3,759" at={t(3.9)} x={1250} y={560} size={150} bg={R} color="#FFFFFF" />
      <Pill2 text="HERE'S THE MATH" at={t(6.6)} x={1250} y={810} size={64} />
      <Sfx name="pop" at={t(0.3)} /><Sfx name="boom" at={t(3.9)} /><Sfx name="pop" at={t(3.9)} /><Sfx name="ding" at={t(6.6)} />
    </AbsoluteFill>
  );
};

// 2. 2-second sting, the desk of the next scene shows through the "o"
const StingScene: SceneFn = () => (
  <AbsoluteFill>
    <Bg src="desk_top.jpg" blur={2} />
    <Sting2s reveal />
  </AbsoluteFill>
);

// 3. problem: $40,000 at 8.1%, 60 vs 84 months
const Show: React.FC<{at: number; children: React.ReactNode; style?: React.CSSProperties}> = ({at, children, style}) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [at, at + 8], [0, 1], C);
  return <div style={{opacity: p, transform: `translateY(${(1 - p) * 20}px)`, ...style}}>{children}</div>;
};
const Problem: SceneFn = ({s0}) => {
  const t = lt(s0);
  return (
    <AbsoluteFill>
      <Cam keys={CAM} drift={0.012}>
        <Bg src="desk_top.jpg" blur={2} />
        <PopIn at={t(9.7)} x={310} y={200} id="panel">
          <div style={{width: 1300, height: 680, boxSizing: 'border-box', background: '#FFFFFF', borderRadius: 30, border: '6px solid #1B2230', boxShadow: '0 18px 40px rgba(0,0,0,0.3)', position: 'relative'}}>
            <Show at={t(9.8)} style={{position: 'absolute', left: 60, top: 40}}><Label size={46} color="#777">EXAMPLE LOAN</Label></Show>
            <Show at={t(9.8)} style={{position: 'absolute', left: 60, top: 110}}><Label size={96}>$40,000 · 8.1%</Label></Show>
            <div style={{position: 'absolute', left: 60, right: 60, top: 270, height: 5, background: '#1B2230', opacity: 0.15}} />
            <Show at={t(14.37)} style={{position: 'absolute', left: 60, top: 330}}><Label size={80}>60 MONTHS</Label></Show>
            <Show at={t(16.4)} style={{position: 'absolute', right: 60, top: 330}}><Label size={80} color="#1B2230">$813 / mo</Label></Show>
            <Show at={t(17.94)} style={{position: 'absolute', left: 60, top: 500}}><Label size={80}>84 MONTHS</Label></Show>
            <Show at={t(20.0)} style={{position: 'absolute', right: 60, top: 500}}><Label size={80} color={G}>$625 / mo</Label></Show>
          </div>
        </PopIn>
      </Cam>
      <Sfx name="pop" at={t(9.7)} /><Sfx name="typing" at={t(14.37)} /><Sfx name="ding" at={t(16.4)} /><Sfx name="typing" at={t(17.94)} /><Sfx name="ding" at={t(20.0)} />
    </AbsoluteFill>
  );
};

// 4. payoff: $188 less a month, but the interest bars grow
const BASE = 940;
const Bar: React.FC<{x: number; w: number; max: number; at: number; color: string; id: string}> = ({x, w, max, at, color, id}) => {
  const f = useCurrentFrame();
  const h = max * interpolate(f, [at, at + 22], [0, 1], C);
  if (h <= 0) return null;
  return <div data-fg={id} style={{position: 'absolute', left: x, top: BASE - h, width: w, height: h, background: color, borderRadius: '16px 16px 0 0', border: '5px solid #1B2230', borderBottom: 'none', boxShadow: '0 10px 0 rgba(0,0,0,0.12)'}} />;
};
const Payoff: SceneFn = ({s0}) => {
  const f = useCurrentFrame();
  const t = lt(s0);
  return (
    <AbsoluteFill>
      <Cam keys={CAM} drift={0.012}>
        <Bg src="desk_top.jpg" blur={3} dim={0.15} />
        <FloorShadow x={650} y={BASE + 14} w={1000} h={30} o={0.35} />
        <Bar x={200} w={260} max={263} at={t(28.07)} color={G} id="bar1" />
        <Bar x={830} w={260} max={376} at={t(31.0)} color={R} id="bar2" />
      </Cam>
      <Pill2 text="-$188 / MONTH" at={t(22.1)} x={960} y={130} size={64} bg={G} color="#FFFFFF" />
      {f >= t(25.55) && f < t(26.98) && <Pill2 text="FEELS LIKE A WIN" at={t(25.55)} x={960} y={300} size={56} />}
      <Pill2 text="BUT LOOK AT THE INTEREST" at={t(26.98)} x={960} y={300} size={56} bg={GOLD} />
      <Pill2 text="60 MO · $8,778" at={t(29.0)} x={330} y={BASE - 263 - 115} size={46} />
      <Pill2 text="84 MO · $12,537" at={t(31.8)} x={960} y={BASE - 376 - 90} size={46} />
      <Pill2 text="SAME CAR" at={t(33.07)} x={1530} y={480} size={56} />
      <Pill2 text="+$3,759" at={t(34.13)} x={1530} y={680} size={100} bg={R} color="#FFFFFF" />
      <Sfx name="pop" at={t(22.1)} /><Sfx name="pop" at={t(25.55)} /><Sfx name="pop" at={t(26.98)} /><Sfx name="kaching" at={t(29.0)} /><Sfx name="kaching" at={t(31.8)} /><Sfx name="pop" at={t(33.07)} /><Sfx name="boom" at={t(34.13)} />
    </AbsoluteFill>
  );
};

// 5. why: more months = more interest, slower equity, Edmunds 91.2% over 6 years
const Why: SceneFn = ({s0}) => {
  const t = lt(s0);
  return (
    <AbsoluteFill>
      <Cam keys={CAM} drift={0.012}>
        <Bg src="desk_top.jpg" blur={2} />
        <CalendarX at={t(36.2)} x={170} y={200} marks={14} every={5} w={830} />
      </Cam>
      <Pill2 text="MORE MONTHS" at={t(36.35)} x={1470} y={205} size={56} />
      <Pill2 text="SLOWER EQUITY" at={t(38.9)} x={1470} y={358} size={56} bg={GOLD} />
      <Pill2 text="EDMUNDS, Q3 2026" at={t(40.2)} x={1470} y={751} size={36} />
      <Pill2 text="91.2%" at={t(41.2)} x={1470} y={565} size={110} bg={R} color="#FFFFFF" />
      <Pill2 text="CHOSE 6+ YEARS" at={t(45.15)} x={1470} y={877} size={48} />
      <Sfx name="pop" at={t(36.35)} /><Sfx name="card_tap" at={t(36.8)} /><Sfx name="card_tap" at={t(37.4)} /><Sfx name="card_tap" at={t(38.0)} /><Sfx name="pop" at={t(38.9)} /><Sfx name="pop" at={t(40.2)} /><Sfx name="boom" at={t(41.2)} /><Sfx name="ding" at={t(45.15)} />
    </AbsoluteFill>
  );
};

// 6. action
const Action: SceneFn = ({s0}) => {
  const f = useCurrentFrame();
  const t = lt(s0);
  return (
    <AbsoluteFill>
      <Cam keys={CAM} drift={0.012}>
        <Bg src="road_full.jpg" />
        <StandLeo x={160} y={440} h={560} pose={f < t(52.3) ? 'thinking' : 'proud'} />
      </Cam>
      <Pill2 text="BEFORE YOU SIGN" at={t(47.6)} x={1300} y={250} size={56} />
      <Pill2 text="ASK: TOTAL INTEREST" at={t(48.86)} x={1300} y={420} size={72} bg={G} color="#FFFFFF" />
      <Pill2 text="NOT JUST THE PAYMENT" at={t(50.33)} x={1300} y={590} size={56} />
      <Pill2 text="6 YEARS OR LESS" at={t(52.3)} x={1300} y={760} size={64} bg={GOLD} />
      <Sfx name="pop" at={t(47.6)} /><Sfx name="ding" at={t(48.86)} /><Sfx name="pop" at={t(50.33)} /><Sfx name="ding" at={t(52.3)} />
    </AbsoluteFill>
  );
};

// 7. close: education only, subscribe, see you next time
const Close: SceneFn = ({s0}) => {
  const t = lt(s0);
  return (
    <AbsoluteFill>
      <Cam keys={CAM} drift={0.012}>
        <Bg src="suburb_sun.jpg" blur={1} />
        <StandLeo x={160} y={440} h={560} pose="proud" />
      </Cam>
      <Pill2 text="EDUCATION ONLY" at={t(55.25)} x={560} y={260} size={60} anchor="left" />
      <Pill2 text="NOT FINANCIAL ADVICE" at={t(56.65)} x={560} y={420} size={48} anchor="left" />
      <Pill2 text="SUBSCRIBE" at={t(58.15)} x={560} y={600} size={80} anchor="left" bg={R} color="#FFFFFF" />
      <Pill2 text="see you next time" at={t(60.35)} x={560} y={780} size={52} anchor="left" />
      <Sfx name="pop" at={t(55.25)} /><Sfx name="pop" at={t(56.65)} /><Sfx name="ding" at={t(58.15)} /><Sfx name="pop" at={t(60.35)} />
    </AbsoluteFill>
  );
};

export const BUILT_V4Q = buildChapter([0, 7.5, 9.5, 21.675, 35.946, 47.409, 55.125], 61.7, [Hook, StingScene, Problem, Payoff, Why, Action, Close], [
  {kind: 'cut', dur: 0},
  {kind: 'cut', dur: 0},
  {kind: 'splat', dur: 10, cx: 960, cy: 540},
  {kind: 'puff', dur: 10},
  {kind: 'shatter', dur: 10},
  {kind: 'puff', dur: 10},
]);
export const V4Q_LEN = BUILT_V4Q.len;
export const V4Q: React.FC<{check?: boolean}> = ({check = false}) => <ChapterShell built={BUILT_V4Q} voice="v4q.wav" check={check} />;
