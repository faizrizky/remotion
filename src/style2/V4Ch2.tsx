// Video 04, Chapter 2 "The Long Loan" (Style 2), timed to ch2.wav (81.4 s).
import React from 'react';
import {AbsoluteFill, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Cam, Count, INK, Key, Leo, LetterBounce, Pill2, Sfx, Src2} from './s2kit';
import {Bg, Board, buildChapter, CardBg, ChapterShell, GapChart, Label, lt, Pie, PopIn, Prop, RoadBands, RowPanel, SceneFn, StrikeSwap} from './v4common';

// 1. question card
const Q: SceneFn = ({s0}) => {
  const t = lt(s0);
  return (
    <AbsoluteFill>
      <Cam keys={[{t: 0, x: 960, y: 540, z: 1.06}]} drift={0.03}>
        <CardBg color="purple" />
        <LetterBounce text="WHAT MAKES THE GAP BIGGER?" at={t(0.3)} x={960} y={330} size={80} />
        <LetterBounce text="HOW LONG?" at={t(2.8)} x={960} y={610} size={160} />
      </Cam>
      <Sfx name="pop" at={t(0.3)} /><Sfx name="pop" at={t(2.8)} />
    </AbsoluteFill>
  );
};

// 2. bank: prices go up, the payment stays the same -> stretch the loan
const Stretch: SceneFn = ({s0}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = lt(s0);
  const keys: Key[] = [{t: 0, x: 960, y: 520, z: 1.0}, {t: 40, x: 960, y: 560, z: 1.12, dur: 40}];
  const st = f >= t(11.1) ? spring({frame: f - t(11.1), fps, config: {damping: 6, stiffness: 120, mass: 0.7}}) : 0;
  const months = Math.round(60 + 24 * Math.min(1, st));
  return (
    <AbsoluteFill>
      <Cam keys={keys} drift={0.01}>
        <Bg src="bank_hall.jpg" blur={4} />
        <div style={{position: 'absolute', left: 580, top: 560}}><Prop name="obj_banker_desk" w={760} /></div>
        <div data-fg="contract" style={{position: 'absolute', left: 960, top: 380, transform: `translateX(-50%) scaleX(${1 + 1.0 * st})`, transformOrigin: '50% 50%', width: 520, height: 120, background: '#FFFDF7', border: `5px solid ${INK}`, borderRadius: 12, boxShadow: '0 8px 0 rgba(0,0,0,0.15)'}} />
        <div style={{position: 'absolute', left: 960, top: 380, width: 0, height: 120}}>
          <Label size={48} style={{position: 'absolute', left: 0, top: 30, transform: 'translateX(-50%)'}}>LOAN: {months} MONTHS</Label>
        </div>
        {f < t(11.0) && <Pill2 text="car price ↑" at={t(5.4)} x={620} y={240} size={54} bg="#E5484D" color="#FFFFFF" />}
        {f < t(11.0) && <Pill2 text="payment: same" at={t(8.6)} x={1300} y={240} size={54} bg="#2E9E5B" color="#FFFFFF" />}
        {f >= t(11.1) && <Pill2 text="stretch the loan" at={t(11.1)} x={960} y={240} size={60} />}
      </Cam>
      <Sfx name="pop" at={t(5.4)} /><Sfx name="pop" at={t(8.6)} /><Sfx name="whoosh" at={t(11.1)} /><Sfx name="pop" at={t(11.2)} />
    </AbsoluteFill>
  );
};

// 3. driving: $40,000 at 8.1%, 60 vs 84 months
const Road: SceneFn = ({s0}) => {
  const f = useCurrentFrame();
  const t = lt(s0);
  const bob = Math.sin(f / 2.2) * 3;
  return (
    <AbsoluteFill>
      <RoadBands camX={f * 24} />
      <div style={{position: 'absolute', left: 120, top: 700 + bob}}><Prop name="obj_car_leo_side" w={700} flip /></div>
      <RowPanel x={1000} y={150} w={760} at={t(12.8)} size={50} rows={[
        {at: t(12.8), node: '$40,000 LOAN'},
        {at: t(14.6), node: '8.1% APR'},
        {at: t(20.0), node: <><StrikeSwap from="60" to="84" at={t(24.9)} /> MONTHS → <StrikeSwap from="$813" to="$625" at={t(26.6)} />/MO</>},
      ]} />
      <Pill2 text="-$188 a month" at={t(29.5)} x={1350} y={700} size={60} bg="#2E9E5B" color="#FFFFFF" />
      <Pill2 text="feels like a win" at={t(33.3)} x={1350} y={860} size={50} />
      <Src2 text="rate: Edmunds Q3 2026 · payments computed for this video" at={t(16.5)} />
      <Sfx name="whoosh" at={2} /><Sfx name="pop" at={t(12.8)} /><Sfx name="pop" at={t(14.6)} /><Sfx name="ding" at={t(21.6)} />
      <Sfx name="paper_rip" at={t(24.9)} /><Sfx name="paper_rip" at={t(26.6)} /><Sfx name="ding" at={t(29.5)} /><Sfx name="pop" at={t(33.3)} />
    </AbsoluteFill>
  );
};

// 4. total interest: $8,778 vs $12,537
const Interest: SceneFn = ({s0}) => {
  const t = lt(s0);
  return (
    <AbsoluteFill>
      <Cam keys={[{t: 0, x: 960, y: 540, z: 1.0}]} drift={0.006}>
        <CardBg color="navy" />
        <LetterBounce text="TOTAL INTEREST" at={t(35.0)} x={960} y={150} size={90} />
        <PopIn at={t(35.6)} x={300} y={290} id="stack60" origin="50% 100%"><Prop name="obj_cash_stack_s" w={420} /></PopIn>
        <PopIn at={t(38.0)} x={1040} y={230} id="stack84" origin="50% 100%"><Prop name="obj_cash_stack_l" w={600} /></PopIn>
        <PopIn at={t(35.6)} x={510} y={660} id="lbl60" origin="50% 0%"><div style={{transform: 'translateX(-50%)', textAlign: 'center'}}><Label size={40} color="#C9D3E6">60 MONTHS</Label><Label size={76} color="#FFFFFF"><Count to={8778} at={t(36.0)} prefix="$" /></Label></div></PopIn>
        <PopIn at={t(38.0)} x={1340} y={660} id="lbl84" origin="50% 0%"><div style={{transform: 'translateX(-50%)', textAlign: 'center'}}><Label size={40} color="#C9D3E6">84 MONTHS</Label><Label size={76} color="#FF8A80"><Count to={12537} at={t(38.4)} prefix="$" /></Label></div></PopIn>
        <Pill2 text="+$3,759 for the same car" at={t(41.2)} x={960} y={920} size={56} bg="#E5484D" color="#FFFFFF" />
      </Cam>
      <Src2 text="computed for this video: $40,000 at 8.1% APR" at={t(36.0)} />
      <Sfx name="pop" at={t(35.0)} /><Sfx name="kaching" at={t(36.0)} /><Sfx name="kaching" at={t(38.4)} /><Sfx name="boom" at={t(41.2)} />
    </AbsoluteFill>
  );
};

// 5. chart callback: longer loan, flatter balance line, gap lasts longer
const ChartAgain: SceneFn = ({s0}) => {
  const f = useCurrentFrame();
  const t = lt(s0);
  return (
    <AbsoluteFill>
      <Cam keys={[{t: 0, x: 960, y: 540, z: 1.0}]} drift={0.015} bg="#E9D9BE">
        <Bg src="paper_hall.jpg" blur={6} />
        <Board x={260} y={150} w={1400} h={760}>
          <GapChart w={1368} h={728} atAxes={0} atCar={t(44.9)} atLoan={t(45.6)} atArea={t(47.0)} loanFlat={0.3} dur={22} />
          {f >= t(47.2) && <Label size={52} color="#B42318" style={{position: 'absolute', left: 760, top: 110, opacity: Math.min(1, (f - t(47.2)) / 5)}}>GAP LASTS LONGER</Label>}
        </Board>
      </Cam>
      <Sfx name="whoosh" at={t(45.6)} /><Sfx name="pop" at={t(47.2)} />
    </AbsoluteFill>
  );
};

// 6. it's common: more than 91% of roll-over buyers chose terms over six years
const Common: SceneFn = ({s0}) => {
  const t = lt(s0);
  return (
    <AbsoluteFill>
      <Cam keys={[{t: 0, x: 960, y: 540, z: 1.04}]} drift={0.02}>
        <Bg src="chart_grid.jpg" />
        <LetterBounce text="IT'S COMMON" at={t(50.2)} x={960} y={170} size={96} />
        <div data-fg="pie" style={{position: 'absolute', left: 300, top: 330}}><Pie r={230} part={0.912} at={t(54.3)} /></div>
        <PopIn at={t(51.4)} x={880} y={360} id="pieText" origin="0% 50%">
          <Label size={36} color="#BFE3CF">BUYERS WHO ROLLED OLD DEBT INTO A NEW LOAN</Label>
          <Label size={100} color="#FFFFFF" style={{marginTop: 30, opacity: 1}}>MORE THAN 91%</Label>
          <Label size={44} color="#FFFFFF" style={{marginTop: 10}}>chose loans longer than 6 years</Label>
        </PopIn>
      </Cam>
      <Src2 text="Edmunds, Q3 2026" at={t(54.3)} />
      <Sfx name="pop" at={t(50.2)} /><Sfx name="pop" at={t(51.4)} /><Sfx name="ding" at={t(55.4)} />
    </AbsoluteFill>
  );
};

// 7. a 7-year loan vs warranty length
const YearRow: React.FC<{label: string; at: number; green: number; note?: string; blockAt: number; red?: boolean}> = ({label, at, green, note, blockAt, red}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  if (f < at) return null;
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: 30}}>
      <Label size={40} color="#FFFFFF" style={{width: 360, textAlign: 'right'}}>{label}</Label>
      <div style={{position: 'relative', display: 'flex', gap: 18}}>
        {Array.from({length: 7}, (_, i) => {
          const a = blockAt + i * 4;
          const s = f >= a ? spring({frame: f - a, fps, config: {damping: 11, stiffness: 200, mass: 0.6}}) : 0;
          const bg = red ? '#FFFFFF' : i < green ? '#2E9E5B' : 'transparent';
          return <div key={i} style={{width: 150, height: 110, borderRadius: 14, background: bg, border: `5px ${i < green || red ? 'solid' : 'dashed'} ${red ? INK : i < green ? INK : '#E58C8C'}`, boxSizing: 'border-box', transform: `scale(${s})`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            {red && <Label size={40} color={INK}>{i + 1}</Label>}
          </div>;
        })}
        {note && f >= blockAt + 10 && <Label size={30} color="#FFFFFF" style={{position: 'absolute', left: 0, top: 118}}>{note}</Label>}
      </div>
    </div>
  );
};
const Warranty: SceneFn = ({s0}) => {
  const t = lt(s0);
  return (
    <AbsoluteFill>
      <Cam keys={[{t: 0, x: 960, y: 540, z: 1.0}]} drift={0.006}>
        <CardBg color="purple" />
        <LetterBounce text="ANOTHER CATCH" at={t(58.9)} x={960} y={150} size={90} />
        <div data-fg="rows" style={{position: 'absolute', left: 175, top: 260, display: 'flex', flexDirection: 'column', gap: 70}}>
          <YearRow label="7-YEAR LOAN" at={t(60.4)} blockAt={t(60.6)} green={0} red note="years of payments" />
          <YearRow label="FORD BASIC" at={t(63.4)} blockAt={t(63.6)} green={3} note="3 years or 36,000 miles" />
          <YearRow label="HYUNDAI BASIC" at={t(69.2)} blockAt={t(69.4)} green={5} note="5 years" />
        </div>
        <Pill2 text="some: engine + transmission up to 10 yrs, not every part" at={t(71.6)} x={960} y={900} size={40} />
      </Cam>
      <Src2 text="Ford & Hyundai basic warranty terms" at={t(63.6)} />
      <Sfx name="pop" at={t(58.9)} />{[60.6, 63.6, 69.4].map((s) => <Sfx key={s} name="pop" at={t(s)} />)}<Sfx name="ding" at={t(71.6)} />
    </AbsoluteFill>
  );
};

// 8. payments continue after coverage ends
const Smoke: SceneFn = ({s0}) => {
  const t = lt(s0);
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Cam keys={[{t: 0, x: 960, y: 560, z: 1.05}]} drift={0.02}>
        <Bg src="suburb_grey.jpg" blur={3} />
        <div data-fg="car" style={{position: 'absolute', left: 420, top: 640}}><Prop name="obj_car_smoke" w={800} /></div>
        <div style={{position: 'absolute', left: 1380, top: 420}}><Leo pose={f < t(79.3) ? 'shocked' : 'suspicious'} h={560} flip /></div>
        <Pill2 text="still making payments" at={t(76.9)} x={860} y={250} size={54} bg="#E5484D" color="#FFFFFF" />
        <Pill2 text="repair coverage: ended" at={t(79.3)} x={820} y={420} size={50} bg="#33384A" color="#FFFFFF" />
      </Cam>
      <Sfx name="notify" at={t(76.9)} /><Sfx name="boom" at={t(79.3)} />
    </AbsoluteFill>
  );
};

const BUILT = buildChapter([0, 4.6, 12.3, 34.7, 44.6, 49.7, 58.6, 76.6], 82.0, [Q, Stretch, Road, Interest, ChartAgain, Common, Warranty, Smoke], [
  {kind: 'splat', dur: 16, cx: 960, cy: 600},
  {kind: 'puff', dur: 14},
  {kind: 'shatter', dur: 16},
  {kind: 'swirl', dur: 22, cx: 960, cy: 540, color: '#3B2A1A'},
  {kind: 'puff', dur: 14},
  {kind: 'swirl', dur: 22, cx: 960, cy: 540, color: '#1E1436'},
  {kind: 'splat', dur: 16, cx: 960, cy: 520},
]);
export const V4_CH2_LEN = BUILT.len;
export const V4Ch2: React.FC<{check?: boolean; bare?: boolean}> = ({check = false, bare = false}) => <ChapterShell built={BUILT} voice="ch2.wav" check={check} bare={bare} />;
