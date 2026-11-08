// Video 04, Chapter 6 "What You Can Do" (Style 2), timed to ch6.wav (44.4 s).
import React from 'react';
import {AbsoluteFill, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Cam, INK, LetterBounce, Pill2, Sfx} from './s2kit';
import {Bg, buildChapter, CardBg, ChapterShell, Label, lt, PopIn, SceneFn} from './v4common';

// the one number: owe vs value
const OneNumber: SceneFn = ({s0}) => {
  const t = lt(s0);
  return (
    <AbsoluteFill>
      <Cam keys={[{t: 0, x: 960, y: 540, z: 1.06}]} drift={0.03}>
        <CardBg color="navy" />
        <LetterBounce text="THE ONE NUMBER TO CHECK" at={t(0.5)} x={960} y={330} size={76} />
        <LetterBounce text="OWE vs VALUE" at={t(3.2)} x={960} y={600} size={140} color="#F5C842" />
      </Cam>
      <Sfx name="whoosh" at={t(0.5)} /><Sfx name="pop" at={t(3.2)} />
    </AbsoluteFill>
  );
};

// payoff from the lender, value from a valuation tool, subtract
const Row: React.FC<{at: number; label: string; sub: string; value: string; color?: string}> = ({at, label, sub, value, color = INK}) => {
  const f = useCurrentFrame();
  if (f < at) return null;
  const k = Math.min(1, (f - at) / 8);
  return (
    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 0', borderBottom: '3px solid #E3E6EC', transform: `translateX(${(1 - k) * 40}px)`, opacity: k}}>
      <div><Label size={42}>{label}</Label><Label size={26} color="#777">{sub}</Label></div>
      <Label size={68} color={color}>{value}</Label>
    </div>
  );
};
const Check: SceneFn = ({s0}) => {
  const f = useCurrentFrame();
  const t = lt(s0);
  const pos = f >= t(11.8) && f < t(13.9);
  return (
    <AbsoluteFill>
      <Cam keys={[{t: 0, x: 960, y: 540, z: 1.05}]} drift={0.02}>
        <Bg src="desk_top.jpg" blur={2} />
        <PopIn at={2} x={380} y={250} id="window" origin="50% 100%">
          <div style={{width: 1160, height: 560, background: '#FFFFFF', borderRadius: 22, boxShadow: '0 20px 44px rgba(0,0,0,0.3)', overflow: 'hidden', border: `5px solid ${INK}`}}>
            <div style={{height: 54, background: '#E3E6EC', display: 'flex', alignItems: 'center', gap: 12, padding: '0 22px', borderBottom: `4px solid ${INK}`}}>
              {['#E5484D', '#F5C842', '#2E9E5B'].map((c) => <div key={c} style={{width: 20, height: 20, borderRadius: 10, background: c}} />)}
              <Label size={24} color="#555" style={{marginLeft: 20}}>your numbers (example)</Label>
            </div>
            <div style={{padding: '10px 50px'}}>
              <Row at={t(5.9)} label="ESTIMATED VALUE" sub="from a valuation tool" value="$15,000" />
              <Row at={t(5.9) + 30} label="PAYOFF AMOUNT" sub="from your lender" value="−$22,000" />
              {f >= t(10.5) && (
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 26}}>
                  <Label size={44}>VALUE − OWED =</Label>
                  <div style={{background: pos ? '#2E9E5B' : '#E5484D', borderRadius: 16, padding: '6px 26px', border: `5px solid ${INK}`}}>
                    <Label size={72} color="#FFFFFF">{pos ? '+ = EQUITY' : f >= t(13.9) ? '−$7,000 = GAP' : '−$7,000'}</Label>
                  </div>
                </div>
              )}
            </div>
          </div>
        </PopIn>
      </Cam>
      <Sfx name="pop" at={2} /><Sfx name="pop" at={t(5.9)} /><Sfx name="pop" at={t(5.9) + 30} /><Sfx name="ding" at={t(10.5)} /><Sfx name="ding" at={t(11.8)} /><Sfx name="boom" at={t(13.9)} />
    </AbsoluteFill>
  );
};

// three habits on a clipboard
const Item: React.FC<{n: number; at: number; check: number; text: string; sub?: string; subAt?: number}> = ({n, at, check, text, sub, subAt = 0}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  if (f < at) return null;
  const k = Math.min(1, (f - at) / 8);
  const c = f >= check ? spring({frame: f - check, fps, config: {damping: 9, stiffness: 240, mass: 0.5}}) : 0;
  return (
    <div style={{display: 'flex', gap: 26, alignItems: 'flex-start', marginBottom: 28, opacity: k, transform: `translateX(${(1 - k) * 40}px)`}}>
      <div style={{flex: '0 0 74px', height: 74, borderRadius: 12, border: `6px solid ${INK}`, boxSizing: 'border-box', position: 'relative', background: '#FFF'}}>
        <div style={{position: 'absolute', left: 4, top: -18, fontFamily: 'sans-serif', fontWeight: 900, fontSize: 80, color: '#2E9E5B', transform: `scale(${c})`}}>✓</div>
      </div>
      <div style={{whiteSpace: 'normal'}}>
        <div style={{fontFamily: 'inherit'}}><Label size={42} style={{whiteSpace: 'normal'}}>{n}. {text}</Label></div>
        {sub && f >= subAt && <Label size={32} color="#2E7D4F" style={{whiteSpace: 'normal', marginTop: 6}}>{sub}</Label>}
      </div>
    </div>
  );
};
const Habits: SceneFn = ({s0}) => {
  const t = lt(s0);
  return (
    <AbsoluteFill>
      <Cam keys={[{t: 0, x: 960, y: 540, z: 1.0}]} drift={0.008}>
        <Bg src="desk_top.jpg" blur={2} />
        <PopIn at={2} x={360} y={90} id="clipboard" origin="50% 100%">
          <div style={{position: 'relative', width: 1200, height: 900, background: '#D9A441', borderRadius: 28, border: `6px solid ${INK}`, boxSizing: 'border-box', padding: 36, boxShadow: '14px 18px 0 rgba(0,0,0,0.18)'}}>
            <div style={{position: 'absolute', left: 470, top: -28, width: 260, height: 70, background: '#9AA5B8', borderRadius: 14, border: `6px solid ${INK}`}} />
            <div style={{width: '100%', height: '100%', background: '#FFFDF7', borderRadius: 12, padding: '48px 56px', boxSizing: 'border-box'}}>
              <Label size={54} style={{marginBottom: 26}}>3 HABITS</Label>
              <Item n={1} at={t(16.4)} check={t(19.4)} text="Shorten the loan, if you can afford the payment" sub="6 years or less is a good ceiling to consider" subAt={t(21.9)} />
              <Item n={2} at={t(24.9)} check={t(26.6)} text="Don't roll the gap into a new loan" sub="even a small extra payment shrinks the old loan" subAt={t(28.8)} />
              <Item n={3} at={t(32.7)} check={t(35.6)} text="Stuck? Keeping the car and paying it down can beat trading in at a loss" />
            </div>
          </div>
        </PopIn>
      </Cam>
      <Sfx name="pop" at={2} /><Sfx name="pop" at={t(16.4)} /><Sfx name="card_tap" at={t(19.4)} /><Sfx name="pop" at={t(21.9)} />
      <Sfx name="pop" at={t(24.9)} /><Sfx name="card_tap" at={t(26.6)} /><Sfx name="pop" at={t(28.8)} /><Sfx name="pop" at={t(32.7)} /><Sfx name="card_tap" at={t(35.6)} />
    </AbsoluteFill>
  );
};

// disclaimer
const Disclaimer: SceneFn = ({s0}) => {
  const t = lt(s0);
  return (
    <AbsoluteFill>
      <Cam keys={[{t: 0, x: 960, y: 540, z: 1.05}]} drift={0.02}>
        <CardBg color="green" />
        <LetterBounce text="EDUCATION ONLY" at={t(39.4)} x={960} y={400} size={120} />
        <Pill2 text="your numbers are different from the average" at={t(41.9)} x={960} y={640} size={50} />
        <PopIn at={t(42.6)} x={960} y={790} id="nfa"><div style={{transform: 'translate(-50%, -50%)'}}><Label size={40} color="#CFE8D8">not financial advice</Label></div></PopIn>
      </Cam>
      <Sfx name="pop" at={t(39.4)} /><Sfx name="pop" at={t(41.9)} />
    </AbsoluteFill>
  );
};

const BUILT = buildChapter([0, 5.6, 16.1, 39.2], 45.0, [OneNumber, Check, Habits, Disclaimer], [
  {kind: 'splat', dur: 16, cx: 960, cy: 600},
  {kind: 'puff', dur: 14},
  {kind: 'swirl', dur: 22, cx: 960, cy: 540, color: '#0B1A12'},
]);
export const V4_CH6_LEN = BUILT.len;
export const V4Ch6: React.FC<{check?: boolean; bare?: boolean}> = ({check = false, bare = false}) => <ChapterShell built={BUILT} voice="ch6.wav" check={check} bare={bare} />;
