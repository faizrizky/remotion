import React from 'react';
import {Embers, MascotCorner, Chip} from '../paper';
import {useCurrentFrame} from 'remotion';
import {IsoBlock, NameTag, Pill, PopIn, SANS, Scene} from '../../style/style_kit';
import {ChapterShell} from '../ChapterShell';
import {INK, PayCircle, Person, Phone, Prop, Punch, sec, Sfx, Shot, Src, StatCard, Char, PAN_FRAMES, CARRY_LAND} from '../v2kit';

const LoanScreen: React.FC<{n: number; amt: string; color: string}> = ({n, amt, color}) => (
  <div style={{height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, background: color}}>
    <div style={{fontWeight: 800, fontSize: 24, color: INK}}>Loan {n}</div>
    <div style={{fontWeight: 900, fontSize: 52, color: INK}}>{amt}</div>
    <div style={{fontWeight: 700, fontSize: 18, color: INK}}>next payment</div>
  </div>
);

/** Renders its children only from frame `at` on (IsoBlock draws a ghost base from frame 0). */
const After: React.FC<{at: number; children: React.ReactNode}> = ({at, children}) => (useCurrentFrame() >= at ? <>{children}</> : null);
/** Renders its children only BEFORE frame `at` (the object leaves with the carried copy). */
const Before: React.FC<{at: number; children: React.ReactNode}> = ({at, children}) => (useCurrentFrame() < at ? <>{children}</> : null);

const LOANS = [
  {amt: '$30', color: '#FFD23F'},
  {amt: '$45', color: '#FF9F1C'},
  {amt: '$25', color: '#7BD389'},
  {amt: '$60', color: '#FF6B9A'},
  {amt: '$38', color: '#80B7E0'},
];

/** Code-drawn credit report sheet. */
const CreditReport: React.FC<{at: number}> = ({at}) => (
  <PopIn at={at} style={{left: 200, top: 210}}>
    <div style={{width: 520, height: 640, background: '#FFFFFF', border: `7px solid ${INK}`, borderRadius: 20, padding: 34, boxSizing: 'border-box', fontFamily: SANS, color: INK, boxShadow: '0 12px 0 rgba(0,0,0,0.2)', transform: 'rotate(-3deg)'}}>
      <div style={{fontWeight: 900, fontSize: 40}}>Credit report</div>
      {['Credit card', 'Car loan', 'Student loan', 'Pay in 4  (new)'].map((t, i) => (
        <div key={t} style={{marginTop: 26, display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 28, padding: '10px 14px', borderRadius: 10, background: i === 3 ? '#FFD23F' : '#F2EDE9'}}>
          <span>{t}</span><span>{i === 3 ? '!' : 'OK'}</span>
        </div>
      ))}
    </div>
  </PopIn>
);

/** Pulsing warning triangle (code-drawn). */
const Warning: React.FC<{at: number; left?: number; top?: number}> = ({at, left = 760, top = 300}) => {
  const f = useCurrentFrame();
  const glow = f >= at ? 0.5 + 0.5 * Math.abs(Math.sin((f - at) / 8)) : 0;
  return (
    <PopIn at={at} origin="50% 50%" style={{left, top}}>
      <svg width={400} height={360} viewBox="0 0 400 360" style={{filter: `drop-shadow(0 0 ${40 * glow}px #FF3B30)`}}>
        <path d="M200 20 L385 340 L15 340 Z" fill="#FF3B30" stroke={INK} strokeWidth={14} strokeLinejoin="round" />
        <rect x={186} y={110} width={28} height={140} rx={12} fill="#fff" />
        <circle cx={200} cy={295} r={18} fill="#fff" />
      </svg>
    </PopIn>
  );
};

export const Ch4: React.FC = () => (
  <ChapterShell id="ch4">
    {(b, len) => {
      const r = (k: string, from: string) => b(k) - b(from);
      const phoneAt = ['ph2', 'ph3', 'ph4', 'ph5'];
      return (
        <>
          {/* A: one is easy... now open five */}
          <Shot exitSwap world={{src: 'v2/world_street.jpg', x0: 1310, x1: 1310, a: 0, b: b('ownLoans')}} from={0} to={b('cfpbStart')} trans="carry" pan="r" carry={{from: [975, 500], to: [265, 820]}}>
            <Scene palette="sky" dur={b('cfpbStart')}>
              <MascotCorner head="head_suspicious.png" at={b('ph2')} x={1640} y={820} size={200} />
              {LOANS.map((l, i) => (
                <Phone key={i} at={i === 0 ? 0 : b(phoneAt[i - 1])} x={150 + i * 340} y={250} h={460} tilt={(i - 2) * 3}>
                  <LoanScreen n={i + 1} amt={l.amt} color={l.color} />
                </Phone>
              ))}
            </Scene>
            <Sfx name="pop" at={0} />
            {phoneAt.map((k) => <Sfx key={k} name="pop" at={b(k)} />)}
          </Shot>

          {/* B: CFPB 63% */}
          <Shot exitSwap world={{src: 'v2/world_street.jpg', x0: 1310, x1: 1310, a: 0, b: b('ownLoans')}} from={b('cfpbStart')} to={b('one3')} trans="swap" seed="c4b">
            <Scene palette="teal" dur={r('one3', 'cfpbStart')}>
              <PopIn at={r('cfpbW', 'cfpbStart')} style={{left: 120, top: 330}}><Prop name="bld_cfpb_transparent.png" w={700} /></PopIn>
              <StatCard to={63} label="had 2+ loans at the same time" at={r('s63', 'cfpbStart')} x={880} y={250} w={760} />
            </Scene>
            <Src text="CFPB, Consumer Use of Buy Now, Pay Later and Other Unsecured Debt (Jan 2025)" at={r('s63', 'cfpbStart')} />
            <Sfx name="whoosh" at={0} /><Sfx name="pop" at={r('cfpbW', 'cfpbStart')} /><Sfx name="ding" at={r('s63', 'cfpbStart')} />
          </Shot>

          {/* B2: about one in three: more than one company */}
          <Shot exitPan="l" world={{src: 'v2/world_street.jpg', x0: 1310, x1: 1310, a: 0, b: b('ownLoans')}} from={b('one3')} to={b('ownLoans')} trans="swap">
            <Scene palette="peri" dur={r('ownLoans', 'one3')}>
              {[0, 1, 2].map((i) => (
                <PopIn key={i} at={r('one3W', 'one3') + i * 5} style={{left: 300 + i * 220, top: 330}}><Person color={i === 1 ? '#E4572E' : '#4FB7C0'} h={380} dim={i !== 1} /></PopIn>
              ))}
              <Chip text="1 in 3: loans with 2+ companies" kind="warn" at={r('one3W', 'one3') + sec(1.6)} x={1000} y={450} size={54} />
            </Scene>
            <Sfx name="whoosh" at={0} /><Sfx name="pop" at={r('one3W', 'one3')} /><Sfx name="pop" at={r('one3W', 'one3') + 5} /><Sfx name="pop" at={r('one3W', 'one3') + 10} /><Sfx name="pop" at={r('one3W', 'one3') + sec(1.6)} />
          </Shot>

          {/* C: each app only sees its own loans; you see the pile */}
          <Shot world={{src: 'v2/world_street.jpg', x0: 310, x1: 396, a: b('ownLoans'), b: b('fico')}} from={b('ownLoans')} to={b('fico')} trans="carry" pan="l" carry={{from: [1400, 600], to: [480, 220]}}>
            <Scene palette="lilac" dur={r('fico', 'ownLoans')}>
              {[0, 1, 2].map((i) => (
                <Phone key={i} at={r('eachApp', 'ownLoans') + i * 10} x={120 + i * 270} y={300} h={420}>
                  <LoanScreen n={i + 1} amt={LOANS[i].amt} color={LOANS[i].color} />
                </Phone>
              ))}
              <PopIn at={r('eachApp', 'ownLoans') + 4} style={{left: 160, top: 760}}><Pill text="each app sees only its own" bg="#5B4FFF" size={38} /></PopIn>
              <Char name="v2/char_shopper_worried.png" at={r('wholePile', 'ownLoans')} x={1330} y={580} h={360} />
              {LOANS.map((l, i) => (
                <PayCircle key={i} amount={l.amt} label="" at={r('wholePile', 'ownLoans') + sec(1.4) + i * 5} x={1410 + (i % 2) * 30 - 15} y={520 - i * 75} size={110} color={l.color} />
              ))}
            </Scene>
            <Sfx name="whoosh" at={0} /><Sfx name="pop" at={r('eachApp', 'ownLoans') + 4} /><Sfx name="pop" at={r('wholePile', 'ownLoans')} />
          </Shot>

          {/* D: FICO BNPL scores */}
          <Shot world={{src: 'v2/world_bakery.jpg', x0: 1500, x1: 1619, a: b('fico'), b: b('groceries')}} from={b('fico')} to={b('groceries')} trans="wipe">
            <Scene palette="peri" dur={r('groceries', 'fico')}>
              <PopIn at={r('changePill', 'fico')} style={{left: 820, top: 180}}><Pill text="starting to change..." bg="#5B4FFF" size={54} /></PopIn>
              <CreditReport at={r('changePill', 'fico')} />
              <NameTag name="FICO Score 10 BNPL" role="announced June 2025" at={r('ficoW', 'fico')} style={{left: 900, top: 420}} />
              <Chip text="now includes BNPL data" kind="label" at={r('bnplData', 'fico')} x={900} y={640} size={50} />
            </Scene>
            <Src text="FICO press release, June 23, 2025" at={r('ficoW', 'fico')} />
            <Sfx name="whoosh" at={0} /><Sfx name="pop" at={r('changePill', 'fico')} /><Sfx name="pop" at={r('ficoW', 'fico')} /><Sfx name="pop" at={r('bnplData', 'fico')} />
          </Shot>

          {/* E: groceries 14% -> 29% */}
          <Shot exitPan="r" world={{src: 'v2/world_living.jpg', x0: 250, x1: 366, a: b('groceries'), b: b('food')}} from={b('groceries')} to={b('food')} trans="ink" seed="c4e">
            <Scene palette="sunrise" dur={r('food', 'groceries')}>
              <Before at={r('food', 'groceries')}><PopIn at={sec(0.2)} style={{left: 150, top: 330}}><Prop name="v2/obj_grocery_bag.png" h={380} /></PopIn></Before>
              <PopIn at={r('sneakers', 'groceries')} style={{left: 520, top: 150}}><Pill text="not just sneakers anymore" bg="#2B1230" size={44} /></PopIn>
              <After at={r('s29', 'groceries')}><IsoBlock h={348} at={r('s29', 'groceries')} label="29%" style={{left: 1220, bottom: 330}} top="#FFB26B" left="#E4572E" right="#B5401F" /></After>
              <PopIn at={r('s29', 'groceries')} style={{left: 1290, top: 775}}><Pill text="now" bg="#3B1F1A" size={34} /></PopIn>
              <PopIn at={r('two', 'groceries')} style={{left: 810, top: 775}}><Pill text="2 years earlier" bg="#3B1F1A" size={34} /></PopIn>
              <After at={r('s14', 'groceries')}><IsoBlock h={168} at={r('s14', 'groceries')} label="14%" style={{left: 820, bottom: 330}} top="#FFD9A0" left="#FFB26B" right="#E4572E" /></After>
            </Scene>
            <Src text="LendingTree BNPL survey, 2026 (share of BNPL users who used it for groceries)" at={r('s29', 'groceries')} />
            <Sfx name="whoosh" at={0} /><Sfx name="pop" at={r('sneakers', 'groceries')} /><Sfx name="pop" at={r('s29', 'groceries')} /><Sfx name="pop" at={r('s14', 'groceries')} />
          </Shot>

          {/* F: food in four payments = a warning light */}
          <Shot exitPan="l" world={{src: 'v2/world_living.jpg', x0: 1366, x1: 1458, a: b('food'), b: len - PAN_FRAMES}} from={b('food')} to={len - PAN_FRAMES} trans="carry" pan="r" carry={{from: [274, 520], to: [254, 490], src: 'v2/obj_grocery_bag.png', h: 380, handoff: true}}>
            <Scene palette="sky" dur={len - b('food')}>
              <Embers n={24} color="#FF3B30" seed={7} />
              <After at={CARRY_LAND}><div style={{position: 'absolute', left: 130, top: 300}}><Prop name="v2/obj_grocery_bag.png" h={380} /></div></After>
              <PopIn at={r('foodW', 'food')} style={{left: 130, top: 150}}><Pill text="your food, in 4 payments" bg="#E4572E" size={44} /></PopIn>
              {[0, 1, 2, 3].map((i) => (
                <PayCircle key={i} amount="1/4" label="" at={r('fourPay', 'food') + i * 5} x={650 + i * 170} y={400} size={130} color={LOANS[i].color} />
              ))}
              <PopIn at={r('hack', 'food')} style={{left: 130, top: 900}}><Pill text="not a shopping hack anymore" bg="#2B1230" size={44} /></PopIn>
              <Warning at={r('warning', 'food')} left={1320} top={220} />
              <Punch text="That's a warning light." at={r('punch', 'food')} y={680} size={96} />
            </Scene>
            <Sfx name="whoosh" at={0} /><Sfx name="pop" at={r('foodW', 'food')} /><Sfx name="pop" at={r('fourPay', 'food')} /><Sfx name="pop" at={r('hack', 'food')} /><Sfx name="boom" at={r('warning', 'food')} />
          </Shot>
        </>
      );
    }}
  </ChapterShell>
);
