// Video 04 Shorts (vertical 1080x1920, 15-20 s, REMIX with new voice). Short A = "the one number", Short B = "$16,610".
// Cues are aligned to public/v4/voice/short_a.wav and short_b.wav by their pauses (silencedetect).
import React from 'react';
import {AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame} from 'remotion';
import {Cam, CalendarX, Count, Enter, INK, LetterBounce, MoneyPile, Pill2, setDims, Sfx} from './s2kit';
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


/** Original short_a.wav times -> times in short_a_loop.wav (silence holds inserted at 5.33 s (+0.5) and 7.15 s (+1.5)). */
const sa = (x: number) => (x < 5.33 ? x : x < 7.15 ? x + 0.5 : x + 2.0);
/** Pill that sweeps in from a side with overshoot and a small wobble. */
const SlidePill: React.FC<{text: React.ReactNode; at: number; x: number; y: number; size?: number; bg?: string; color?: string; from?: 'left' | 'right' | 'top'}> = ({text, at, x, y, size = 62, bg = '#FFFFFF', color = INK, from = 'left'}) => {
  const f = useCurrentFrame();
  if (f < at) return null;
  const k = f - at;
  const s = spring({frame: k, fps: 24, config: {damping: 10, stiffness: 150, mass: 0.7}});
  const off = (1 - s) * (from === 'left' ? -1100 : from === 'right' ? 1100 : 0);
  const offY = from === 'top' ? (1 - s) * -700 : 0;
  const rot = (1 - s) * (from === 'left' ? -14 : from === 'right' ? 14 : 0) + Math.sin(k * 0.9) * 2.2 * Math.max(0, 1 - k / 22);
  return (
    <div data-fg="pill" style={{position: 'absolute', left: x, top: y, transform: `translate(calc(-50% + ${off}px), calc(-50% + ${offY}px)) rotate(${rot}deg)`, background: bg, color, fontFamily: 'Poppins, sans-serif', fontVariantNumeric: 'tabular-nums', fontWeight: 800, fontSize: size, padding: `${size * 0.22}px ${size * 0.5}px`, borderRadius: size * 0.28, whiteSpace: 'nowrap', boxShadow: '0 10px 24px rgba(0,0,0,0.28)', textTransform: 'uppercase', letterSpacing: 0.5}}>{text}</div>
  );
};

/** Yellow plate that pops in behind the bouncing "$7,000 GAP" letters (keeps contrast on any background). */
const GapPlate: React.FC<{at: number}> = ({at}) => {
  const f = useCurrentFrame();
  if (f < at) return null;
  const k = spring({frame: f - at, fps: 24, config: {damping: 9, stiffness: 170, mass: 0.7}});
  return <div style={{position: 'absolute', left: VW / 2, top: 760, width: 880, height: 190, transform: `translate(-50%, -50%) scale(${k})`, background: '#FFE066', borderRadius: 44, boxShadow: '0 12px 28px rgba(0,0,0,0.3)'}} />;
};

// ================= SHORT A =================
// A1 hook: owe $22,000 on a $15,000 car? that's a $7,000 gap
const A1: SceneFn = ({s0}) => {
  const f = useCurrentFrame();
  const t = lt(s0);
  const kk = f - (t(4.5) + 8);
  const shk = kk >= 0 && kk < 12 ? Math.sin(kk * 2.6) * 14 * (1 - kk / 12) : 0;
  return (
    <AbsoluteFill style={{transform: `translateY(${shk}px)`}}>
      <Cam keys={CAM} drift={0.012}>
        <VBg src="suburb_sun.jpg" groundFrac={0.813} groundY={1500} />
        <GroundProp name="obj_car_leo_side" x={90} y={1500 - 640 * 0.3761} w={640} ratio={0.3761} id="car" />
        <Enter kind="drop" at={t(4.5)} x={740} y={1500 - 200 * 0.8247} id="crate" dist={900}><Prop name="obj_debt_box" w={200} /></Enter>
        {f >= t(4.5) + 8 && <FloorShadow x={840} y={1498} w={200} h={24} o={0.4} />}
      </Cam>
      <SlidePill text={<>LOAN <Count to={22000} at={t(0.15)} dur={20} prefix="$" /></>} at={t(0.15)} x={540} y={330} size={62} bg="#E5484D" color="#FFFFFF" from="left" />
      <SlidePill text={<>VALUE <Count to={15000} at={t(1.55)} dur={20} prefix="$" /></>} at={t(1.55)} x={540} y={520} size={62} from="right" />
      <GapPlate at={t(3.4)} />
      <LetterBounce text="$7,000 GAP" at={t(3.4) + 4} x={VW / 2} y={760} size={112} color={INK} />
      <Sfx name="whoosh" at={t(0.15)} /><Sfx name="whoosh" at={t(1.55)} /><Sfx name="pop" at={t(0.15) + 8} /><Sfx name="pop" at={t(1.55) + 8} /><Sfx name="ding" at={t(3.4) + 10} /><Sfx name="boom" at={t(4.7)} />
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
        <LetterBounce text="THE ONE" at={t(sa(5.65))} x={VW / 2} y={640} size={150} />
        <LetterBounce text="NUMBER" at={t(sa(5.9))} x={VW / 2} y={930} size={150} />
        <LetterBounce text="TO CHECK" at={t(sa(6.4))} x={VW / 2} y={1200} size={110} color="#F5C842" />
      </Cam>
      <Sfx name="pop" at={t(sa(5.65))} /><Sfx name="pop" at={t(sa(5.9))} /><Sfx name="ding" at={t(sa(6.4))} />
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
    const neg = f >= t(sa(13.46));
  return (
    <AbsoluteFill>
      <Cam keys={CAM} drift={0.008}>
        <VBg src="desk_top.jpg" groundFrac={0.5} groundY={960} blur={2} />
        <PopIn at={t(sa(7.2))} x={90} y={470} id="panel" origin="50% 100%">
          <div style={{position: 'relative', width: 900, height: 800, background: '#FFFFFF', borderRadius: 28, border: `5px solid ${INK}`, boxShadow: '0 20px 44px rgba(0,0,0,0.3)', boxSizing: 'border-box'}}>
            <div style={{position: 'absolute', left: 40, top: 30}}><Label size={34} color="#777">your numbers (example)</Label></div>
            <MathRow at={t(sa(7.5))} top={110} label="WORTH" value="$15,000" />
            <MathRow at={t(sa(9.1))} top={310} label="OWE" value="−$22,000" color="#E5484D" />
            {f >= t(sa(10.6)) && (() => {
              const lk = Math.min(1, (f - t(sa(10.6))) / 8);
              const popAt = neg ? t(sa(13.46)) : t(sa(10.75));
              const pk = Math.max(0, f - popAt);
              const bs = pk < 12 ? interpolate(pk, [0, 5, 9, 12], [0.4, 1.18, 0.95, 1], C) : 1;
              const bo = Math.min(1, pk / 4);
              const shake = neg && pk < 10 ? Math.sin(pk * 2.4) * 8 * (1 - pk / 10) : 0;
              return (
                <>
                  <div style={{position: 'absolute', left: 40, top: 520, opacity: lk, transform: `translateX(${(1 - lk) * 40}px)`}}><Label size={50}>WORTH − OWE =</Label></div>
                  {f >= t(sa(10.75)) && (
                    <div style={{position: 'absolute', left: 40, top: 640, background: neg ? '#E5484D' : '#2E9E5B', borderRadius: 18, padding: '8px 30px', border: `5px solid ${INK}`, opacity: bo, transform: `translateX(${shake}px) scale(${bs})`, transformOrigin: '0% 50%'}}>
                      <Label size={neg ? 72 : 80} color="#FFFFFF">{neg ? '−$7,000 = GAP' : '+ = EQUITY'}</Label>
                    </div>
                  )}
                </>
              );
            })()}
          </div>
        </PopIn>
      </Cam>
      <Sfx name="pop" at={t(sa(7.2))} /><Sfx name="pop" at={t(sa(7.5))} /><Sfx name="pop" at={t(sa(9.1))} /><Sfx name="ding" at={t(sa(10.75))} /><Sfx name="boom" at={t(sa(13.46))} />
    </AbsoluteFill>
  );
};
// A4: check yours this week + full video
const A4: SceneFn = ({s0}) => {
    const t = lt(s0);
  return (
    <AbsoluteFill>
      <Cam keys={CAM} drift={0.01}>
        <VBg src="road_full.jpg" groundFrac={0.848} groundY={1500} />
        <StandLeo x={350} y={760} h={740} pose="calm" />
      </Cam>
      <Pill2 text="CHECK YOURS" at={t(sa(15.7))} x={540} y={290} size={64} />
      <Pill2 text="THIS WEEK" at={t(sa(16.2))} x={540} y={465} size={64} bg="#F5C842" />
      <Sfx name="pop" at={t(sa(15.7))} /><Sfx name="pop" at={t(sa(16.2))} />
    </AbsoluteFill>
  );
};
// AEnd: same picture as the first frame of A1 so the Short loops
const AEnd: SceneFn = () => (
  <AbsoluteFill>
    <Cam keys={CAM} drift={0.012}>
      <VBg src="suburb_sun.jpg" groundFrac={0.813} groundY={1500} />
      <GroundProp name="obj_car_leo_side" x={90} y={1500 - 640 * 0.3761} w={640} ratio={0.3761} id="car" />
    </Cam>
  </AbsoluteFill>
);
const BUILT_A = buildChapter([0, sa(5.33), sa(7.18), sa(15.4), sa(17.6)], sa(18.0), [A1, A2, A3, A4, AEnd], [
  {kind: 'splat', dur: 12, cx: 540, cy: 960},
  {kind: 'swirl', dur: 12, cx: 540, cy: 960, color: '#0B1730'},
  {kind: 'shatter', dur: 10},
  {kind: 'puff', dur: 8},
]);
export const SHORT_A_LEN = BUILT_A.len;
export const ShortA: React.FC<{check?: boolean}> = ({check = false}) => {
  setDims(VW, VH);
  return <ChapterShell built={BUILT_A} voice="short_a_loop.wav" check={check} />;
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
        <PopIn at={t(3.9)} x={90} y={400} id="big"><div style={{width: 900, textAlign: 'center'}}><Label size={170} color="#FFFFFF" style={{textShadow: '0 8px 0 rgba(0,0,0,0.35)'}}><Count to={16610} at={t(4.0)} dur={50} prefix="$" /></Label></div></PopIn>
      </Cam>
      <Pill2 text="ESTIMATED" at={t(3.6)} x={540} y={290} size={56} bg="#F5C842" />
      <Pill2 text="INTEREST OVER THE LOAN" at={t(7.2)} x={540} y={770} size={50} />
      <SrcPill at={t(7.4)} y={900} />
      <Sfx name="pop" at={t(3.6)} /><Sfx name="boom" at={t(3.5) + 10} /><Sfx name="kaching" at={t(4.0)} /><Sfx name="pop" at={t(7.2)} />
    </AbsoluteFill>
  );
};
const sh = (x: number) => x < 12.4 ? x : x < 13.9 ? x + 0.5 : x < 15.45 ? x + 0.95 : x + 1.25;
// B3: the average loan: title, the car rolls through, then the cash pile and $57,235 borrowed (one scene)
const B3: SceneFn = ({s0}) => {
  const t = lt(s0);
  return (
    <AbsoluteFill>
      <Cam keys={CAM} drift={0.012}>
        <VBg src="road_full.jpg" groundFrac={0.848} groundY={1500} />
        <FloorShadow x={540} y={1470} w={880} h={60} o={0.42} />
        <MoneyPile at={t(sh(10.5))} x={540} y={1440} rows={5} w={200} stagger={2} />
        <PopIn at={t(sh(10.5))} x={90} y={660} id="sum">
          <div style={{width: 900, boxSizing: 'border-box', background: '#FFFFFF', borderRadius: 26, border: `5px solid ${INK}`, boxShadow: '0 16px 36px rgba(0,0,0,0.3)', textAlign: 'center', padding: '10px 0 22px'}}>
            <Label size={150} style={{display: 'inline-block'}}><Count to={57235} at={t(sh(10.55))} dur={40} prefix="$" /></Label>
            <Label size={58} color="#E5484D" style={{display: 'block', marginTop: -6}}>BORROWED</Label>
          </div>
        </PopIn>
      </Cam>
      <LetterBounce text="THE AVERAGE LOAN" at={t(9.3)} x={VW / 2} y={340} size={76} />
      <Pill2 text="ROLLED-OVER BUYERS" at={t(9.9)} x={540} y={490} size={46} bg="#F5C842" />
      <Sfx name="pop" at={t(9.3)} /><Sfx name="pop" at={t(9.9)} />
      <Sfx name="pop" at={t(sh(10.5))} /><Sfx name="kaching" at={t(sh(10.65))} /><Sfx name="ding" at={t(sh(12.3))} />
    </AbsoluteFill>
  );
};
// B3c: $952 a month: the calendar fills with payments
const B3c: SceneFn = ({s0}) => {
  const t = lt(s0);
  return (
    <AbsoluteFill>
      <Cam keys={CAM} drift={0.01}>
        <VBg src="desk_top.jpg" groundFrac={0.5} groundY={960} blur={2} />
        <CalendarX at={t(sh(12.55))} x={140} y={800} marks={12} every={3} w={800} />
      </Cam>
      <Pill2 text="$952" at={t(sh(12.6))} x={540} y={420} size={110} bg="#FFE066" />
      <Pill2 text="EVERY MONTH" at={t(sh(13.0))} x={540} y={620} size={54} />
      <Sfx name="pop" at={t(sh(12.6))} /><Sfx name="card_tap" at={t(sh(12.9))} /><Sfx name="card_tap" at={t(sh(13.2))} /><Sfx name="card_tap" at={t(sh(13.5))} /><Sfx name="pop" at={t(sh(13.0))} />
    </AbsoluteFill>
  );
};
// B3d: 8.1% interest: the debt box swells
const B3d: SceneFn = ({s0}) => {
  const f = useCurrentFrame();
  const t = lt(s0);
  const grow = interpolate(f, [t(sh(14.3)), t(sh(14.3)) + 30], [0, 1], C);
  const w = 300 + 220 * grow;
  return (
    <AbsoluteFill>
      <Cam keys={CAM} drift={0.012}>
        <VCard color="maroon" />
        <FloorShadow x={540} y={1420} w={w * 1.05} h={44} o={0.5} />
        <div data-fg="box" style={{position: 'absolute', left: 540 - w / 2, top: 1420 - w * 0.8247}}><Prop name="obj_debt_box" w={w} /></div>
        <LetterBounce text="8.1%" at={t(sh(14.25))} x={VW / 2} y={450} size={230} color="#F5C842" />
      </Cam>
      <Pill2 text="INTEREST RATE" at={t(sh(14.5))} x={540} y={790} size={56} />
      <SrcPill at={t(sh(14.9))} y={940} />
      <Sfx name="boom" at={t(sh(14.25))} /><Sfx name="pop" at={t(sh(14.5))} />
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
        <StandLeo x={350} y={760} h={740} pose={f < t(sh(17.3)) ? 'suspicious' : 'proud'} />
      </Cam>
      <Pill2 text="BEFORE YOU TRADE IN" at={t(sh(16.0))} x={540} y={290} size={56} />
      <Pill2 text="KNOW YOUR GAP" at={t(sh(17.3))} x={540} y={465} size={60} bg="#2E9E5B" color="#FFFFFF" />
      <Sfx name="pop" at={t(sh(16.0))} /><Sfx name="ding" at={t(sh(17.3))} />
    </AbsoluteFill>
  );
};
// BEnd: same picture as the first frame of B1 so the Short loops
const BEnd: SceneFn = () => (
  <AbsoluteFill>
    <Cam keys={CAM} drift={0.012}>
      <VBg src="desk_top.jpg" groundFrac={0.5} groundY={960} blur={2} />
    </Cam>
  </AbsoluteFill>
);
const BUILT_B = buildChapter([0, 3.4, 9.0, sh(12.49), sh(14.05), sh(15.7), 19.95], 20.3, [B1, B2, B3, B3c, B3d, B4, BEnd], [
  {kind: 'splat', dur: 10, cx: 540, cy: 960},
  {kind: 'shatter', dur: 12},
  {kind: 'cut', dur: 0},
  {kind: 'splat', dur: 8, cx: 540, cy: 960},
  {kind: 'puff', dur: 12},
  {kind: 'puff', dur: 8},
]);
export const SHORT_B_LEN = BUILT_B.len;
export const ShortB: React.FC<{check?: boolean}> = ({check = false}) => {
  setDims(VW, VH);
  return <ChapterShell built={BUILT_B} voice="short_b_loop.wav" check={check} />;
};
