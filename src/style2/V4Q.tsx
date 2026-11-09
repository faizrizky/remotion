// V4Q: 60-second version of Video 04 ("$188 less a month? It'll cost you $3,759."), 1920x1080, Style 2.
// Voice: public/v4/voice/v4q.wav = Versi 2 files at fixed offsets (D = 0.75 s pan from the clouds before the voice):
// hook D, [2 s sting], problem P0, payoff O0, why Y0, action A0, close C0. Local cues were matched with silencedetect.
// Draft 2 (9 Nov): sky pan hook, V4 statement card, V4 maroon bars, BigPicture pull-back (rule 47), V4 headline card.
import React from 'react';
import {AbsoluteFill, Img, staticFile, useCurrentFrame} from 'remotion';
import {Cam, Chip2, Enter, INK, Key, LetterBounce, Pill2, Sfx, Src2} from './s2kit';
import {Bg, buildChapter, CardBg, ChapterShell, GrowBar, Label, lt, PopIn, SceneFn, StandLeo, Stamp, StrikeSwap} from './v4common';
import {SANS} from '../style/style_kit';
import {Sting2s} from './StingOpener';

const D = 0.75;
const H0 = D, P0 = 9.5 + D, O0 = 21.8 + D, Y0 = 36.07 + D, A0 = 47.53 + D, C0 = 55.25 + D;
const G = '#2E9E5B';
const R = '#E5484D';
const GOLD = '#F5C842';

// 1. hook: start in the clouds, whip down to Leo on the road (whoosh), then the voice
const Hook: SceneFn = ({s0}) => {
  const f = useCurrentFrame();
  const t = lt(s0);
  const keys: Key[] = [{t: 0, x: 960, y: -440, z: 1.0}, {t: 18, x: 960, y: 540, z: 1.0, dur: 14}];
  return (
    <AbsoluteFill>
      <Cam keys={keys} drift={0.012}>
        <Bg src="road_full.jpg" />
        <Img src={staticFile('v4/bg/sky_strip.jpg')} style={{position: 'absolute', left: -240, top: -985, width: 2400, height: 1350, objectFit: 'cover', WebkitMaskImage: 'linear-gradient(to bottom, #000 64%, transparent 95%)', maskImage: 'linear-gradient(to bottom, #000 64%, transparent 95%)'}} />
        <StandLeo x={200} y={440} h={560} pose={f < t(H0 + 3.9) ? 'suspicious' : 'shocked'} />
      </Cam>
      <Pill2 text="-$188 / MONTH" at={t(H0 + 0.3)} x={1250} y={270} size={80} bg={G} color="#FFFFFF" />
      <Pill2 text="+$3,759" at={t(H0 + 3.9)} x={1250} y={560} size={150} bg={R} color="#FFFFFF" />
      <Pill2 text="HERE'S THE MATH" at={t(H0 + 6.6)} x={1250} y={810} size={64} />
      <Sfx name="whoosh" at={1} />
      <Sfx name="pop" at={t(H0 + 0.3)} /><Sfx name="boom" at={t(H0 + 3.9)} /><Sfx name="pop" at={t(H0 + 3.9)} /><Sfx name="ding" at={t(H0 + 6.6)} />
    </AbsoluteFill>
  );
};

// 2. 2-second sting; the desk of the next scene shows through the "o"
const StingScene: SceneFn = () => (
  <AbsoluteFill>
    <Bg src="desk_top.jpg" blur={2} />
    <Sting2s reveal />
  </AbsoluteFill>
);

// 3. problem: V4 statement card on the desk (example offer, 60 vs 84 months)
const Row: React.FC<{at: number; label: string; value: string; color?: string; atValue: number}> = ({at, label, value, color = INK, atValue}) => {
  const f = useCurrentFrame();
  if (f < at) return null;
  return (
    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 22}}>
      <Label size={52}>{label}</Label>
      {f >= atValue && <Label size={64} color={color}>{value}</Label>}
    </div>
  );
};
const Problem: SceneFn = ({s0}) => {
  const t = lt(s0);
  return (
    <AbsoluteFill>
      <Cam keys={[{t: 0, x: 960, y: 540, z: 1.06}]} drift={0.02}>
        <Bg src="desk_top.jpg" blur={2} />
        <Enter kind="rise" at={4} x={520} y={150} id="offer">
          <div style={{position: 'relative', width: 880, height: 770, background: '#FFFDF7', borderRadius: 10, boxShadow: '12px 16px 0 rgba(0,0,0,0.18)', transform: 'rotate(-1.5deg)', padding: '40px 56px', boxSizing: 'border-box', fontFamily: SANS, color: INK}}>
            <Label size={46}>CAR LOAN OFFER</Label>
            <div style={{height: 6, background: INK, margin: '16px 0 26px'}} />
            <Label size={30} color="#666">EXAMPLE LOAN</Label>
            <Label size={88}>$40,000 · 8.1%</Label>
            <div style={{height: 3, background: INK, opacity: 0.15, margin: '20px 0 6px'}} />
            <Row at={t(P0 + 4.87)} atValue={t(P0 + 6.9)} label="60 MONTHS" value="$813/mo" />
            <Row at={t(P0 + 8.44)} atValue={t(P0 + 10.5)} label="84 MONTHS" value="$625/mo" color={G} />
            <Stamp text="LOWER PAYMENT" at={t(P0 + 10.6)} x={420} y={690} size={46} color={G} id="lower" />
          </div>
        </Enter>
      </Cam>
      <Sfx name="pop" at={4} /><Sfx name="typing" at={t(P0 + 4.87)} /><Sfx name="pop" at={t(P0 + 6.9)} /><Sfx name="typing" at={t(P0 + 8.44)} /><Sfx name="pop" at={t(P0 + 10.5)} /><Sfx name="boom" at={t(P0 + 10.6)} />
    </AbsoluteFill>
  );
};

// 4. payoff: V4 maroon card; -$188 feels like a win, then the interest bars
const Payoff: SceneFn = ({s0}) => {
  const f = useCurrentFrame();
  const t = lt(s0);
  const interest = f >= t(O0 + 5.18);
  return (
    <AbsoluteFill>
      <Cam keys={[{t: 0, x: 960, y: 540, z: 1.05}]} drift={0.02}>
        <CardBg color="maroon" />
        {!interest && <LetterBounce text="-$188 / MONTH" at={t(O0 + 0.3)} x={960} y={420} size={140} color="#8FE3AE" />}
        {!interest && <Pill2 text="FEELS LIKE A WIN" at={t(O0 + 3.75)} x={960} y={660} size={60} bg={G} color="#FFFFFF" />}
        {interest && <LetterBounce text="THE INTEREST" at={t(O0 + 5.18)} x={960} y={180} size={90} />}
        <GrowBar id="bar1" x={420} base={860} w={220} h={300} at={t(O0 + 6.27)} color="#F3B3A8" top="$8,778" label="60 MONTHS" />
        <GrowBar id="bar2" x={820} base={860} w={220} h={430} at={t(O0 + 9.18)} color={R} top="$12,537" label="84 MONTHS" />
      </Cam>
      <Pill2 text="SAME CAR" at={t(O0 + 11.27)} x={1460} y={400} size={56} />
      <Pill2 text="+$3,759" at={t(O0 + 12.33)} x={1460} y={580} size={100} bg={R} color="#FFFFFF" />
      <Src2 text="Example: $40,000 at 8.1% APR, total interest (amortization)" at={t(O0 + 6.27)} />
      <Sfx name="pop" at={t(O0 + 0.3)} /><Sfx name="pop" at={t(O0 + 3.75)} /><Sfx name="ding" at={t(O0 + 5.18)} /><Sfx name="pop" at={t(O0 + 6.27)} /><Sfx name="pop" at={t(O0 + 9.18)} /><Sfx name="pop" at={t(O0 + 11.27)} /><Sfx name="boom" at={t(O0 + 12.33)} />
    </AbsoluteFill>
  );
};

// 5. why: BigPicture pull-back (rule 47). Board: more months / more interest / slower equity -> 91.2%
const Why: SceneFn = ({s0}) => {
  const f = useCurrentFrame();
  const t = lt(s0);
  const keys: Key[] = [{t: 0, x: 962, y: 680, z: 3.4}, {t: t(Y0 + 9.4), x: 960, y: 560, z: 0.98, dur: t(Y0 + 9.4) - t(Y0 + 4.0)}];
  const big = f >= t(Y0 + 5.3);
  const line = (at: number, text: string, color = '#33384A') => (f >= t(at) ? <Label size={40} color={color} style={{opacity: Math.min(1, (f - t(at)) / 5)}}>{text}</Label> : null);
  return (
    <AbsoluteFill>
      <Cam keys={keys} drift={0} bg="#E9D9BE">
        <Bg src="paper_hall.jpg" />
        <div style={{position: 'absolute', left: 780, top: 565, width: 365, height: 230, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6}}>
          {!big && <>{line(Y0 + 0.3, 'MORE MONTHS')}{line(Y0 + 1.6, 'MORE INTEREST', '#B42318')}{line(Y0 + 2.9, 'SLOWER EQUITY', '#B42318')}</>}
          {big && <div style={{transform: `scale(${Math.min(1, 0.4 + (f - t(Y0 + 5.3)) / 8)})`, textAlign: 'center'}}><Label size={104} color="#B42318">91.2%</Label><Label size={40} color="#B42318" style={{marginTop: -6}}>OVER 6 YEARS</Label></div>}
        </div>
      </Cam>
      <Pill2 text="of buyers who rolled over old debt" at={t(Y0 + 6.4)} x={960} y={190} size={56} />
      <Pill2 text="chose loans longer than 6 years" at={t(Y0 + 9.1)} x={960} y={340} size={56} bg={GOLD} />
      <Chip2 label="DATE:" value="Q3 2026" icon="cal" at={t(Y0 + 6.6)} />
      <Src2 text="Edmunds, Q3 2026" at={t(Y0 + 4.1)} />
      <Sfx name="pop" at={t(Y0 + 0.3)} /><Sfx name="pop" at={t(Y0 + 1.6)} /><Sfx name="pop" at={t(Y0 + 2.9)} /><Sfx name="whoosh" at={t(Y0 + 4.0)} /><Sfx name="ding" at={t(Y0 + 5.3)} /><Sfx name="pop" at={t(Y0 + 6.4)} /><Sfx name="pop" at={t(Y0 + 6.6)} /><Sfx name="ding" at={t(Y0 + 9.1)} />
    </AbsoluteFill>
  );
};

// 6. action: V4 headline card. MONTHLY PAYMENT? -> TOTAL INTEREST?, then 6 years or less
const Action: SceneFn = ({s0}) => {
  const f = useCurrentFrame();
  const t = lt(s0);
  return (
    <AbsoluteFill>
      <Cam keys={[{t: 0, x: 960, y: 540, z: 1.05}]} drift={0.02}>
        <Bg src="news_collage.jpg" blur={4} dim={0.18} />
        <PopIn at={2} x={410} y={190} id="headline" rot={f < 14 ? (14 - f) * -2 : 0}>
          <div style={{width: 1100, height: 430, background: '#FFFFFF', boxShadow: '0 18px 40px rgba(0,0,0,0.3)', padding: '36px 46px', boxSizing: 'border-box', fontFamily: 'Georgia, serif', color: INK}}>
            <div style={{fontSize: 38, fontWeight: 700, borderBottom: `4px solid ${INK}`, paddingBottom: 10}}>THE DAILY HEADLINE</div>
            <Label size={28} color="#777" style={{marginTop: 18}}>CAR LOANS · BEFORE YOU SIGN, ASK:</Label>
            <Label size={84} style={{marginTop: 26}}><StrikeSwap from="MONTHLY PAYMENT?" to="TOTAL INTEREST?" at={t(A0 + 1.33)} /></Label>
            {f >= t(A0 + 2.8) && <Label size={34} color="#555" style={{marginTop: 30}}>Not just the monthly payment.</Label>}
          </div>
        </PopIn>
        <Pill2 text="6 years or less = a good ceiling" at={t(A0 + 4.77)} x={960} y={850} size={58} bg={GOLD} />
      </Cam>
      <Sfx name="pop" at={2} /><Sfx name="paper_rip" at={t(A0 + 1.33)} /><Sfx name="pop" at={t(A0 + 2.8)} /><Sfx name="ding" at={t(A0 + 4.77)} />
    </AbsoluteFill>
  );
};

// 7. close: education only, subscribe, see you next time
const Close: SceneFn = ({s0}) => {
  const t = lt(s0);
  return (
    <AbsoluteFill>
      <Cam keys={[{t: 0, x: 960, y: 540, z: 1.0}]} drift={0.012}>
        <Bg src="suburb_sun.jpg" blur={1} />
        <StandLeo x={160} y={440} h={560} pose="proud" />
      </Cam>
      <Pill2 text="EDUCATION ONLY" at={t(C0)} x={560} y={260} size={60} anchor="left" />
      <Pill2 text="NOT FINANCIAL ADVICE" at={t(C0 + 1.4)} x={560} y={420} size={48} anchor="left" />
      <Pill2 text="SUBSCRIBE" at={t(C0 + 2.9)} x={560} y={600} size={80} anchor="left" bg={R} color="#FFFFFF" />
      <Pill2 text="see you next time" at={t(C0 + 5.1)} x={560} y={780} size={52} anchor="left" />
      <Sfx name="pop" at={t(C0)} /><Sfx name="pop" at={t(C0 + 1.4)} /><Sfx name="ding" at={t(C0 + 2.9)} /><Sfx name="pop" at={t(C0 + 5.1)} />
    </AbsoluteFill>
  );
};

export const BUILT_V4Q = buildChapter([0, 7.5 + D, 9.5 + D, 21.675 + D, 35.946 + D, 47.409 + D, 55.125 + D], 61.7 + D, [Hook, StingScene, Problem, Payoff, Why, Action, Close], [
  {kind: 'cut', dur: 0},
  {kind: 'cut', dur: 0},
  {kind: 'splat', dur: 10, cx: 960, cy: 540},
  {kind: 'puff', dur: 10},
  {kind: 'shatter', dur: 10},
  {kind: 'puff', dur: 10},
]);
export const V4Q_LEN = BUILT_V4Q.len;
export const V4Q: React.FC<{check?: boolean}> = ({check = false}) => <ChapterShell built={BUILT_V4Q} voice="v4q.wav" check={check} />;
