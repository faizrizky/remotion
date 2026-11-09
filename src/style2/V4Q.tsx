// V4Q: 60-second version of Video 04 ("$188 less a month? It'll cost you $3,759."), 1920x1080, Style 2.
// Voice: public/v4/voice/v4q.wav = Versi 2 files at fixed offsets (D = 0.75 s pan from the clouds before the voice):
// hook D, [2 s sting], problem P0, payoff O0, why Y0, action A0, close C0. Local cues were matched with silencedetect.
// Draft 2 (9 Nov): sky pan hook, V4 statement card, V4 maroon bars, BigPicture pull-back (rule 47), V4 headline card.
import React from 'react';
import {AbsoluteFill, Html5Audio, Img, interpolate, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {Cam, Chip2, Enter, INK, Key, LetterBounce, MoneyPile, Pill2, Sfx, Src2} from './s2kit';
import {Bg, buildChapter, C, CardBg, ChapterShell, FloorShadow, GrowBar, Label, lt, PopIn, Prop, SceneFn, StandLeo, Stamp} from './v4common';
import {SANS} from '../style/style_kit';
import {Sting2s} from './StingOpener';

const D = 0.75;
const H0 = D, P0 = 9.5 + D, O0 = 21.8 + D, Y0 = 36.07 + D, A0 = 47.53 + D, C0 = 55.25 + D;
const G = '#2E9E5B';
const R = '#E5484D';
const GOLD = '#F5C842';

// 1. hook: start in the clouds, whip down to the road (whoosh); the car rolls in, then the voice.
// No Leo (owner 9 Nov): the car = the lower payment, the cash pile = the extra interest.
const CAR_W = 700;
const Hook: SceneFn = ({s0}) => {
  const f = useCurrentFrame();
  const t = lt(s0);
  const keys: Key[] = [{t: 0, x: 960, y: -440, z: 1.0}, {t: 18, x: 960, y: 540, z: 1.0, dur: 14}];
  const drive = interpolate(f, [16, 34], [0, 1], C);
  const carX = -820 + (120 + 820) * (1 - (1 - drive) ** 3);
  const bob = drive > 0 && drive < 1 ? Math.sin(f / 1.8) * 3 : 0;
  return (
    <AbsoluteFill>
      <Cam keys={keys} drift={0.012}>
        <Bg src="road_full.jpg" />
        <Img src={staticFile('v4/bg/sky_strip.jpg')} style={{position: 'absolute', left: -240, top: -985, width: 2400, height: 1350, objectFit: 'cover', WebkitMaskImage: 'linear-gradient(to bottom, #000 64%, transparent 95%)', maskImage: 'linear-gradient(to bottom, #000 64%, transparent 95%)'}} />
        <FloorShadow x={carX + CAR_W / 2} y={640 + CAR_W * 0.4156 - 8} w={CAR_W * 0.92} h={48} o={0.4} />
        <div data-fg="car" style={{position: 'absolute', left: carX, top: 640 + bob}}><Prop name="obj_car_new_side" w={CAR_W} /></div>
        {f >= t(H0 + 4.1) && <FloorShadow x={1350} y={940} w={700} h={44} o={0.4} />}
        <MoneyPile at={t(H0 + 4.1)} x={1350} y={930} rows={4} w={150} stagger={2} />
      </Cam>
      <Pill2 text="-$188 / MONTH" at={t(H0 + 0.3)} x={470} y={470} size={72} bg={G} color="#FFFFFF" />
      <Pill2 text="+$3,759" at={t(H0 + 4.1)} x={1350} y={470} size={130} bg={R} color="#FFFFFF" />
      <Pill2 text="HERE'S THE MATH" at={t(H0 + 6.6)} x={960} y={200} size={64} />
      <Sfx name="whoosh" at={1} /><Sfx name="whoosh" at={16} vol={0.25} />
      <Sfx name="pop" at={t(H0 + 0.3)} /><Sfx name="boom" at={t(H0 + 4.1)} /><Sfx name="kaching" at={t(H0 + 4.3)} /><Sfx name="ding" at={t(H0 + 6.6)} />
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

// 3. problem: V4 statement card on the desk; every number is typed while the typing sound plays
const TypeSfx: React.FC<{at: number; frames: number}> = ({at, frames}) => (
  <Sequence from={Math.round(at)} durationInFrames={Math.max(4, Math.round(frames))} layout="none"><Html5Audio src={staticFile('sfx/keyboard_typing.wav')} volume={0.5} /></Sequence>
);
const CPF = 0.8; // characters per frame
const Typed: React.FC<{text: string; at: number; size: number; color?: string}> = ({text, at, size, color = INK}) => {
  const f = useCurrentFrame();
  if (f < at) return null;
  const n = Math.min(text.length, Math.floor((f - at) * CPF) + 1);
  const caret = n < text.length && Math.floor(f / 3) % 2 === 0;
  return <Label size={size} color={color} style={{whiteSpace: 'nowrap'}}>{text.slice(0, n)}<span style={{opacity: 0}}>{text.slice(n)}</span>{caret ? <span style={{position: 'absolute'}}>|</span> : null}</Label>;
};
const typeLen = (text: string) => text.length / CPF;
const Row: React.FC<{at: number; label: string; value: string; color?: string; atValue: number}> = ({at, label, value, color = INK, atValue}) => {
  const f = useCurrentFrame();
  if (f < at) return null;
  return (
    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 22}}>
      <Typed text={label} at={at} size={52} />
      <Typed text={value} at={atValue} size={64} color={color} />
    </div>
  );
};
const Problem: SceneFn = ({s0}) => {
  const t = lt(s0);
  const items: [number, string][] = [[t(P0 + 1.3), '$40,000'], [t(P0 + 3.0), ' · 8.1%'], [t(P0 + 4.87), '60 MONTHS'], [t(P0 + 6.9), '$813/mo'], [t(P0 + 8.44), '84 MONTHS'], [t(P0 + 11.0), '$625/mo']];
  return (
    <AbsoluteFill>
      <Cam keys={[{t: 0, x: 960, y: 540, z: 1.06}]} drift={0.02}>
        <Bg src="desk_top.jpg" blur={2} />
        <Enter kind="rise" at={4} x={520} y={150} id="offer">
          <div style={{position: 'relative', width: 880, height: 770, background: '#FFFDF7', borderRadius: 10, boxShadow: '12px 16px 0 rgba(0,0,0,0.18)', transform: 'rotate(-1.5deg)', padding: '40px 56px', boxSizing: 'border-box', fontFamily: SANS, color: INK}}>
            <Label size={46}>CAR LOAN OFFER</Label>
            <div style={{height: 6, background: INK, margin: '16px 0 26px'}} />
            <Label size={30} color="#666">EXAMPLE LOAN</Label>
            <div style={{display: 'flex', height: 106}}><Typed text="$40,000" at={t(P0 + 1.3)} size={88} /><Typed text=" · 8.1%" at={t(P0 + 3.0)} size={88} /></div>
            <div style={{height: 3, background: INK, opacity: 0.15, margin: '20px 0 6px'}} />
            <Row at={t(P0 + 4.87)} atValue={t(P0 + 6.9)} label="60 MONTHS" value="$813/mo" />
            <Row at={t(P0 + 8.44)} atValue={t(P0 + 11.0)} label="84 MONTHS" value="$625/mo" color={G} />
            <Stamp text="LOWER PAYMENT" at={t(P0 + 11.4)} x={420} y={690} size={46} color={G} id="lower" />
          </div>
        </Enter>
      </Cam>
      <Sfx name="pop" at={4} />
      {items.map(([at, text], i) => <TypeSfx key={i} at={at} frames={typeLen(text) + 3} />)}
      <Sfx name="boom" at={t(P0 + 11.4)} />
    </AbsoluteFill>
  );
};

// 4. payoff: V4 maroon card; -$188 feels like a win, then the interest bars
const Payoff: SceneFn = ({s0}) => {
  const f = useCurrentFrame();
  const t = lt(s0);
  const interest = f >= t(O0 + 3.75);
  return (
    <AbsoluteFill>
      <Cam keys={[{t: 0, x: 960, y: 540, z: 1.05}]} drift={0.02}>
        <CardBg color="maroon" />
        {!interest && <LetterBounce text="-$188 / MONTH" at={t(O0 + 0.3)} x={960} y={420} size={140} color="#8FE3AE" />}
        {!interest && <Pill2 text="FEELS LIKE A WIN" at={t(O0 + 2.3)} x={960} y={660} size={60} bg={G} color="#FFFFFF" />}
        {interest && <LetterBounce text="THE INTEREST" at={t(O0 + 3.75)} x={960} y={180} size={90} />}
        <GrowBar id="bar1" x={420} base={860} w={220} h={300} at={t(O0 + 5.18)} color="#F3B3A8" top="$8,778" label="60 MONTHS" />
        <GrowBar id="bar2" x={820} base={860} w={220} h={430} at={t(O0 + 7.98)} color={R} top="$12,537" label="84 MONTHS" />
      </Cam>
      <Pill2 text="SAME CAR" at={t(O0 + 11.27)} x={1460} y={400} size={56} />
      <Pill2 text="+$3,759" at={t(O0 + 12.33)} x={1460} y={600} size={100} bg={R} color="#FFFFFF" />
      <Src2 text="Example: $40,000 at 8.1% APR, total interest (amortization)" at={t(O0 + 5.18)} />
      <Sfx name="pop" at={t(O0 + 0.3)} /><Sfx name="pop" at={t(O0 + 2.3)} /><Sfx name="ding" at={t(O0 + 3.75)} /><Sfx name="pop" at={t(O0 + 5.18)} /><Sfx name="pop" at={t(O0 + 7.98)} /><Sfx name="pop" at={t(O0 + 11.27)} /><Sfx name="boom" at={t(O0 + 12.33)} />
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
          {!big && <>{line(Y0 + 1.0, 'MORE MONTHS')}{line(Y0 + 1.7, 'MORE INTEREST', '#B42318')}{line(Y0 + 2.6, 'SLOWER EQUITY', '#B42318')}</>}
          {big && <div style={{transform: `scale(${Math.min(1, 0.4 + (f - t(Y0 + 5.3)) / 8)})`, textAlign: 'center'}}><Label size={104} color="#B42318">91.2%</Label><Label size={40} color="#B42318" style={{marginTop: -6}}>OVER 6 YEARS</Label></div>}
        </div>
      </Cam>
      <Pill2 text="of buyers who rolled over old debt" at={t(Y0 + 6.4)} x={960} y={235} size={56} />
      <Pill2 text="chose loans longer than 6 years" at={t(Y0 + 9.1)} x={960} y={385} size={56} bg={GOLD} />
      <Chip2 label="DATE:" value="Q3 2026" icon="cal" at={t(Y0 + 6.6)} />
      <Src2 text="Edmunds, Q3 2026" at={t(Y0 + 4.1)} />
      <Sfx name="pop" at={t(Y0 + 1.0)} /><Sfx name="pop" at={t(Y0 + 1.7)} /><Sfx name="pop" at={t(Y0 + 2.6)} /><Sfx name="whoosh" at={t(Y0 + 4.0)} /><Sfx name="ding" at={t(Y0 + 5.3)} /><Sfx name="pop" at={t(Y0 + 6.4)} /><Sfx name="pop" at={t(Y0 + 6.6)} /><Sfx name="ding" at={t(Y0 + 9.1)} />
    </AbsoluteFill>
  );
};

// 6. action: V4 headline card. MONTHLY PAYMENT? gets struck (stays visible), TOTAL INTEREST? appears below
const Strike: React.FC<{text: string; at: number}> = ({text, at}) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [at, at + 6], [0, 1], C);
  return <span style={{position: 'relative', color: f >= at + 6 ? '#8A8F9C' : INK}}>{text}{p > 0 && <span style={{position: 'absolute', left: -6, top: '50%', height: 9, width: `calc(${p * 100}% + 12px)`, background: R, borderRadius: 4}} />}</span>;
};
const Action: SceneFn = ({s0}) => {
  const f = useCurrentFrame();
  const t = lt(s0);
  const inT = interpolate(f, [t(A0 + 1.45), t(A0 + 1.45) + 8], [0, 1], C);
  return (
    <AbsoluteFill>
      <Cam keys={[{t: 0, x: 960, y: 540, z: 1.05}]} drift={0.02}>
        <Bg src="news_collage.jpg" blur={4} dim={0.18} />
        <PopIn at={2} x={410} y={170} id="headline" rot={f < 14 ? (14 - f) * -2 : 0}>
          <div style={{width: 1100, height: 520, background: '#FFFFFF', boxShadow: '0 18px 40px rgba(0,0,0,0.3)', padding: '36px 46px', boxSizing: 'border-box', fontFamily: 'Georgia, serif', color: INK}}>
            <div style={{fontSize: 38, fontWeight: 700, borderBottom: `4px solid ${INK}`, paddingBottom: 10}}>THE DAILY HEADLINE</div>
            <Label size={28} color="#777" style={{marginTop: 18}}>CAR LOANS · BEFORE YOU SIGN, ASK:</Label>
            <Label size={84} style={{marginTop: 22}}><Strike text="MONTHLY PAYMENT?" at={t(A0 + 1.33)} /></Label>
            {inT > 0 && <Label size={84} color={G} style={{marginTop: 8, opacity: inT, transform: `translateY(${(1 - inT) * 24}px)`}}>TOTAL INTEREST?</Label>}
          </div>
        </PopIn>
        <Pill2 text="6 years or less = a good ceiling" at={t(A0 + 4.77)} x={960} y={850} size={58} bg={GOLD} />
      </Cam>
      <Sfx name="pop" at={2} /><Sfx name="paper_rip" at={t(A0 + 1.33)} /><Sfx name="ding" at={t(A0 + 1.45)} /><Sfx name="ding" at={t(A0 + 4.77)} />
    </AbsoluteFill>
  );
};

// 7a. warning: "This is education, not financial advice." (hazard card instead of plain pills)
const STRIPES = `repeating-linear-gradient(-45deg, ${INK} 0 50px, ${GOLD} 50px 100px)`;
const Warn: SceneFn = ({s0}) => {
  const f = useCurrentFrame();
  const t = lt(s0);
  const shake = f < 10 ? Math.sin(f * 2.4) * (10 - f) * 1.2 : 0;
  return (
    <AbsoluteFill style={{background: '#F7D44C', transform: `translateX(${shake}px)`}}>
      <div style={{position: 'absolute', left: -40, right: -40, top: 0, height: 90, background: STRIPES}} />
      <div style={{position: 'absolute', left: -40, right: -40, bottom: 0, height: 90, background: STRIPES}} />
      <PopIn at={t(C0)} x={810} y={130} id="warn">
        <svg width={300} height={262} viewBox="0 0 300 262">
          <path d="M150 12 L288 250 L12 250 Z" fill={R} stroke={INK} strokeWidth={14} strokeLinejoin="round" />
          <rect x={137} y={88} width={26} height={100} rx={12} fill="#FFFFFF" />
          <circle cx={150} cy={218} r={15} fill="#FFFFFF" />
        </svg>
      </PopIn>
      <LetterBounce text="EDUCATION ONLY" at={t(C0 + 0.1)} x={960} y={540} size={120} color={INK} />
      <Pill2 text="NOT FINANCIAL ADVICE" at={t(C0 + 1.4)} x={960} y={780} size={64} bg={INK} color="#FFFFFF" />
      <Sfx name="boom" at={t(C0)} /><Sfx name="notify" at={t(C0 + 0.1)} /><Sfx name="pop" at={t(C0 + 1.4)} />
    </AbsoluteFill>
  );
};

// 7b. subscribe: a cursor clicks the button, the bell rings, "see you next time"
const Sub: SceneFn = ({s0}) => {
  const f = useCurrentFrame();
  const t = lt(s0);
  const click = t(C0 + 3.9);
  const mv = interpolate(f, [t(C0 + 3.3), click - 2], [0, 1], C);
  const e = 1 - (1 - mv) ** 3;
  const cx = 1560 + (1120 - 1560) * e, cy = 960 + (440 - 960) * e;
  const press = f >= click && f < click + 5 ? 0.92 : 1;
  const done = f >= click + 3;
  const swing = done ? Math.sin((f - click) / 2) * 18 * Math.exp(-(f - click) / 14) : 0;
  return (
    <AbsoluteFill>
      <Cam keys={[{t: 0, x: 960, y: 540, z: 1.0}]} drift={0.012}>
        <Bg src="suburb_sun.jpg" blur={1} />
        <StandLeo x={160} y={440} h={560} pose="proud" />
      </Cam>
      <PopIn at={t(C0 + 2.9)} x={700} y={330} id="subbtn">
        <div style={{width: 620, height: 150, borderRadius: 30, background: done ? '#5B6170' : R, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 12px 0 rgba(0,0,0,0.25)', transform: `scale(${press})`}}>
          <Label size={72} color="#FFFFFF">{done ? 'SUBSCRIBED' : 'SUBSCRIBE'}</Label>
        </div>
      </PopIn>
      {f >= click && (
        <PopIn at={click} x={1380} y={340} id="bell">
          <svg width={130} height={130} viewBox="0 0 130 130" style={{transform: `rotate(${swing}deg)`, transformOrigin: '50% 10%'}}>
            <path d="M65 14 C40 14 30 36 30 58 L30 82 L18 98 L112 98 L100 82 L100 58 C100 36 90 14 65 14 Z" fill={GOLD} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
            <circle cx={65} cy={110} r={11} fill={INK} />
          </svg>
        </PopIn>
      )}
      {f >= t(C0 + 3.3) && f < click + 20 && (
        <svg width={70} height={90} viewBox="0 0 70 90" style={{position: 'absolute', left: cx, top: cy, transform: `scale(${f >= click && f < click + 4 ? 0.85 : 1})`}}>
          <path d="M4 4 L4 70 L22 54 L34 84 L46 78 L34 50 L60 50 Z" fill="#FFFFFF" stroke={INK} strokeWidth={5} strokeLinejoin="round" />
        </svg>
      )}
      <LetterBounce text="see you next time" at={t(C0 + 5.07)} x={1010} y={700} size={80} />
      <Sfx name="pop" at={t(C0 + 2.9)} /><Sfx name="card_tap" at={click} /><Sfx name="notify" at={click + 2} /><Sfx name="ding" at={t(C0 + 5.07)} />
    </AbsoluteFill>
  );
};

export const BUILT_V4Q = buildChapter([0, 7.5 + D, 9.5 + D, 21.675 + D, 35.946 + D, 47.409 + D, 55.125 + D, C0 + 2.73], 63.3, [Hook, StingScene, Problem, Payoff, Why, Action, Warn, Sub], [
  {kind: 'cut', dur: 0},
  {kind: 'cut', dur: 0},
  {kind: 'splat', dur: 10, cx: 960, cy: 540},
  {kind: 'puff', dur: 10},
  {kind: 'shatter', dur: 10},
  {kind: 'puff', dur: 10},
  {kind: 'shatter', dur: 8},
]);
export const V4Q_LEN = BUILT_V4Q.len;
export const V4Q: React.FC<{check?: boolean}> = ({check = false}) => <ChapterShell built={BUILT_V4Q} voice="v4q.wav" check={check} />;
