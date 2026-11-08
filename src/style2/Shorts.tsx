// Video 04 Shorts (vertical 1080x1920, 15-20 s, REMIX with new voice). Short A = "the one number", Short B = "$16,610".
// Cues are aligned to public/v4/voice/short_a.wav and short_b.wav by their pauses (silencedetect).
import React from 'react';
import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {Cam, Count, Enter, INK, LetterBounce, Pill2, setDims, Sfx} from './s2kit';
import {buildChapter, C, ChapterShell, FloorShadow, GroundProp, Label, lt, PopIn, Prop, SceneFn, StandLeo} from './v4common';

const VW = 1080, VH = 1920;

/** Landscape Gemini background used as a tall cover: the ground line (fraction of image height) lands at groundY. */
const VBg: React.FC<{src: string; groundFrac: number; groundY: number; blur?: number; fx?: number}> = ({src, groundFrac, groundY, blur = 0, fx = 0.5}) => {
  const h = Math.max(2300, (VH + 160 - groundY) / (1 - groundFrac));
  const w = (h * 16) / 9;
  return <Img src={staticFile(`v4/bg/${src}`)} style={{position: 'absolute', left: VW / 2 - w * fx, top: groundY - groundFrac * h, width: w, height: h, filter: blur ? `blur(${blur}px)` : undefined}} />;
};
const VCard: React.FC<{color: 'navy' | 'maroon' | 'green' | 'purple'}> = ({color}) => (
  <Img src={staticFile(`v4/bg/card_${color}.jpg`)} style={{position: 'absolute', left: -140, top: -220, width: VW + 280, height: VH + 440, objectFit: 'cover'}} />
);
const CAM = [{t: 0, x: VW / 2, y: VH / 2, z: 1.0}];
const SrcPill: React.FC<{at: number; y: number; text?: string}> = ({at, y, text = 'SOURCE: EDMUNDS, Q3 2026'}) => <Pill2 text={text} at={at} x={VW / 2} y={y} size={30} />;

// ================= SHORT A =================
// A1 hook: owe $22,000 on a $15,000 car? that's a $7,000 gap
const A1: SceneFn = ({s0}) => {
  const f = useCurrentFrame();
  const t = lt(s0);
  return (
    <AbsoluteFill>
      <Cam keys={CAM} drift={0.012}>
        <VBg src="suburb_sun.jpg" groundFrac={0.813} groundY={1500} />
        <GroundProp name="obj_car_leo_side" x={90} y={1500 - 640 * 0.3761} w={640} ratio={0.3761} id="car" />
        <Enter kind="drop" at={t(4.5)} x={740} y={1500 - 200 * 0.8247} id="crate" dist={900}><Prop name="obj_debt_box" w={200} /></Enter>
        {f >= t(4.5) + 8 && <FloorShadow x={840} y={1498} w={200} h={24} o={0.4} />}
      </Cam>
      <Pill2 text="LOAN $22,000" at={t(0.15)} x={540} y={330} size={62} bg="#E5484D" color="#FFFFFF" />
      <Pill2 text="VALUE $15,000" at={t(1.55)} x={540} y={520} size={62} />
      <Pill2 text="$7,000 GAP" at={t(3.4)} x={540} y={760} size={88} bg="#FFE066" />
      <Sfx name="pop" at={t(0.15)} /><Sfx name="pop" at={t(1.55)} /><Sfx name="pop" at={t(3.4)} /><Sfx name="boom" at={t(4.7)} />
    </AbsoluteFill>
  );
};
// A2: here's the one number to check
const A2: SceneFn = ({s0}) => {
  const t = lt(s0);
  return (
    <AbsoluteFill>
      <Cam keys={CAM} drift={0.02}>
        <VCard color="navy" />
        <LetterBounce text="THE ONE" at={t(5.65)} x={VW / 2} y={650} size={150} />
        <LetterBounce text="NUMBER" at={t(5.9)} x={VW / 2} y={930} size={150} />
        <LetterBounce text="TO CHECK" at={t(6.4)} x={VW / 2} y={1160} size={110} color="#F5C842" />
      </Cam>
      <Sfx name="pop" at={t(5.65)} /><Sfx name="pop" at={t(5.9)} /><Sfx name="ding" at={t(6.4)} />
    </AbsoluteFill>
  );
};
const MathRow: React.FC<{at: number; top: number; label: string; value: string; color?: string}> = ({at, top, label, value, color = INK}) => {
  const f = useCurrentFrame();
  if (f < at) return null;
  const k = Math.min(1, (f - at) / 8);
  return (
    <div style={{position: 'absolute', left: 40, right: 40, top, display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: k, transform: `translateX(${(1 - k) * 40}px)`, borderBottom: '3px solid #E3E6EC', paddingBottom: 18}}>
      <Label size={54}>{label}</Label>
      <Label size={80} color={color}>{value}</Label>
    </div>
  );
};
// A3: worth minus owe, equity vs gap
const A3: SceneFn = ({s0}) => {
  const f = useCurrentFrame();
  const t = lt(s0);
  const pos = f >= t(10.75) && f < t(13.46);
  const neg = f >= t(13.46);
  return (
    <AbsoluteFill>
      <Cam keys={CAM} drift={0.008}>
        <VBg src="desk_top.jpg" groundFrac={0.5} groundY={960} blur={2} />
        <PopIn at={t(7.2)} x={90} y={470} id="panel" origin="50% 100%">
          <div style={{position: 'relative', width: 900, height: 800, background: '#FFFFFF', borderRadius: 28, border: `5px solid ${INK}`, boxShadow: '0 20px 44px rgba(0,0,0,0.3)', boxSizing: 'border-box'}}>
            <div style={{position: 'absolute', left: 40, top: 30}}><Label size={34} color="#777">your numbers (example)</Label></div>
            <MathRow at={t(7.5)} top={110} label="WORTH" value="$15,000" />
            <MathRow at={t(9.1)} top={310} label="OWE" value="−$22,000" color="#E5484D" />
            {f >= t(10.6) && (
              <>
                <div style={{position: 'absolute', left: 40, top: 520}}><Label size={50}>WORTH − OWE =</Label></div>
                <div style={{position: 'absolute', left: 40, top: 640, background: neg ? '#E5484D' : '#2E9E5B', borderRadius: 18, padding: '8px 30px', border: `5px solid ${INK}`}}>
                  <Label size={neg ? 72 : 80} color="#FFFFFF">{neg ? '−$7,000 = GAP' : pos ? '+ = EQUITY' : ''}</Label>
                </div>
              </>
            )}
          </div>
        </PopIn>
      </Cam>
      <Sfx name="pop" at={t(7.2)} /><Sfx name="pop" at={t(7.5)} /><Sfx name="pop" at={t(9.1)} /><Sfx name="ding" at={t(10.75)} /><Sfx name="boom" at={t(13.46)} />
    </AbsoluteFill>
  );
};
// A4: check yours this week + full video
const A4: SceneFn = ({s0}) => {
  const f = useCurrentFrame();
  const t = lt(s0);
  return (
    <AbsoluteFill>
      <Cam keys={CAM} drift={0.01}>
        <VBg src="road_full.jpg" groundFrac={0.848} groundY={1500} />
        <StandLeo x={350} y={760} h={740} pose={f < t(17.1) ? 'calm' : 'proud'} />
      </Cam>
      <Pill2 text="CHECK YOURS" at={t(15.7)} x={540} y={290} size={64} />
      <Pill2 text="THIS WEEK" at={t(16.2)} x={540} y={440} size={64} bg="#F5C842" />
      <Pill2 text="FULL VIDEO ON THE CHANNEL" at={t(17.15)} x={540} y={590} size={44} bg="#2E9E5B" color="#FFFFFF" />
      <Sfx name="pop" at={t(15.7)} /><Sfx name="pop" at={t(16.2)} /><Sfx name="ding" at={t(17.15)} />
    </AbsoluteFill>
  );
};
const BUILT_A = buildChapter([0, 5.33, 7.18, 15.4], 18.75, [A1, A2, A3, A4], [
  {kind: 'splat', dur: 12, cx: 540, cy: 960},
  {kind: 'swirl', dur: 12, cx: 540, cy: 960, color: '#0B1730'},
  {kind: 'shatter', dur: 10},
]);
export const SHORT_A_LEN = BUILT_A.len;
export const ShortA: React.FC<{check?: boolean}> = ({check = false}) => {
  setDims(VW, VH);
  return <ChapterShell built={BUILT_A} voice="short_a.wav" check={check} />;
};

// ================= SHORT B =================
// B1: rolled old car debt into a new loan? on average,
const B1: SceneFn = ({s0}) => {
  const f = useCurrentFrame();
  const t = lt(s0);
  const slide = interpolate(f, [t(0.35), t(0.35) + 14], [0, 1], C);
  return (
    <AbsoluteFill>
      <Cam keys={CAM} drift={0.012}>
        <VBg src="desk_top.jpg" groundFrac={0.5} groundY={960} blur={2} />
        <PopIn at={2} x={90} y={560} id="contract" origin="50% 100%">
          <div style={{position: 'relative', width: 900, height: 600, background: '#FFFDF7', borderRadius: 10, boxShadow: '12px 16px 0 rgba(0,0,0,0.18)', boxSizing: 'border-box', padding: '40px 50px'}}>
            <Label size={52}>NEW CAR LOAN</Label>
            <Label size={30} color="#777">example</Label>
            <div style={{height: 6, background: INK, margin: '16px 0 40px'}} />
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 100}}>
              <Label size={50} color="#B42318" style={{opacity: slide}}>Old debt</Label>
              <div style={{transform: `translateX(${(1 - slide) * -700}px)`, background: '#E5484D', borderRadius: 14, padding: '6px 22px', border: `5px solid ${INK}`}}><Label size={64} color="#FFFFFF">+$7,107</Label></div>
            </div>
            <Label size={28} color="#777" style={{marginTop: 18}}>average gap on trade-ins (Edmunds, Q3 2026)</Label>
            {f >= t(1.3) && <div style={{position: 'absolute', left: 450, top: 480, transform: `translate(-50%, -50%) rotate(-8deg) scale(${Math.max(1, 2.2 - 1.2 * Math.min(1, (f - t(1.3)) / 6))})`, border: '10px solid #E5484D', color: '#E5484D', fontFamily: 'sans-serif', fontWeight: 900, fontSize: 72, padding: '6px 26px', borderRadius: 10, whiteSpace: 'nowrap'}}>ROLLED OVER</div>}
          </div>
        </PopIn>
      </Cam>
      <Sfx name="pop" at={2} /><Sfx name="whoosh" at={t(0.35)} /><Sfx name="kaching" at={t(0.55)} /><Sfx name="boom" at={t(1.3)} />
    </AbsoluteFill>
  );
};
// B2: that's an estimated $16,610 in interest over the loan
const B2: SceneFn = ({s0}) => {
  const t = lt(s0);
  return (
    <AbsoluteFill>
      <Cam keys={CAM} drift={0.012}>
        <VBg src="stage_spot.jpg" groundFrac={0.8} groundY={1450} />
        <FloorShadow x={540} y={1440} w={640} h={60} o={0.45} />
        <Enter kind="drop" at={t(3.5)} x={190} y={1450 - 700 * 0.6692} id="cash" dist={900}><Prop name="obj_cash_stack_l" w={700} /></Enter>
        <PopIn at={t(3.9)} x={540} y={520} id="big"><div style={{transform: 'translate(-50%, -50%)'}}><Label size={170} color="#FFFFFF" style={{textShadow: '0 8px 0 rgba(0,0,0,0.35)'}}><Count to={16610} at={t(4.0)} dur={50} prefix="$" /></Label></div></PopIn>
      </Cam>
      <Pill2 text="ESTIMATED" at={t(3.6)} x={540} y={320} size={56} bg="#F5C842" />
      <Pill2 text="INTEREST OVER THE LOAN" at={t(7.2)} x={540} y={770} size={50} />
      <SrcPill at={t(7.4)} y={890} />
      <Sfx name="pop" at={t(3.6)} /><Sfx name="boom" at={t(3.5) + 10} /><Sfx name="kaching" at={t(4.0)} /><Sfx name="pop" at={t(7.2)} />
    </AbsoluteFill>
  );
};
// B3: the average loan: $57,235 borrowed, $952 a month, 8.1%
const B3: SceneFn = ({s0}) => {
  const t = lt(s0);
  return (
    <AbsoluteFill>
      <Cam keys={CAM} drift={0.008}>
        <VCard color="maroon" />
        <LetterBounce text="THE AVERAGE LOAN" at={t(9.3)} x={VW / 2} y={340} size={76} />
      </Cam>
      <Pill2 text="$57,235 BORROWED" at={t(10.7)} x={540} y={620} size={58} />
      <Pill2 text="$952 / MONTH" at={t(12.6)} x={540} y={820} size={58} />
      <Pill2 text="8.1% INTEREST RATE" at={t(14.25)} x={540} y={1020} size={58} bg="#F5C842" />
      <SrcPill at={t(14.4)} y={1200} />
      <Sfx name="pop" at={t(9.3)} /><Sfx name="ding" at={t(10.7)} /><Sfx name="ding" at={t(12.6)} /><Sfx name="ding" at={t(14.25)} />
    </AbsoluteFill>
  );
};
// B4: before you trade in, know your gap. full video
const B4: SceneFn = ({s0}) => {
  const f = useCurrentFrame();
  const t = lt(s0);
  return (
    <AbsoluteFill>
      <Cam keys={CAM} drift={0.01}>
        <VBg src="road_full.jpg" groundFrac={0.848} groundY={1500} />
        <StandLeo x={350} y={760} h={740} pose={f < t(17.3) ? 'suspicious' : 'proud'} />
      </Cam>
      <Pill2 text="BEFORE YOU TRADE IN" at={t(16.0)} x={540} y={290} size={56} />
      <Pill2 text="KNOW YOUR GAP" at={t(17.3)} x={540} y={440} size={60} bg="#2E9E5B" color="#FFFFFF" />
      <Pill2 text="FULL VIDEO ON THE CHANNEL" at={t(18.65)} x={540} y={590} size={44} />
      <Sfx name="pop" at={t(16.0)} /><Sfx name="ding" at={t(17.3)} /><Sfx name="pop" at={t(18.65)} />
    </AbsoluteFill>
  );
};
const BUILT_B = buildChapter([0, 3.4, 9.0, 15.7], 20.45, [B1, B2, B3, B4], [
  {kind: 'splat', dur: 10, cx: 540, cy: 960},
  {kind: 'shatter', dur: 12},
  {kind: 'puff', dur: 12},
]);
export const SHORT_B_LEN = BUILT_B.len;
export const ShortB: React.FC<{check?: boolean}> = ({check = false}) => {
  setDims(VW, VH);
  return <ChapterShell built={BUILT_B} voice="short_b.wav" check={check} />;
};
