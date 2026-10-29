import React from 'react';
import {useCurrentFrame} from 'remotion';
import {IsoBlock, NameTag, Pill, PopIn, SANS, Scene, Spotlight} from '../../style/style_kit';
import {ChapterShell} from '../ChapterShell';
import {INK, PayCircle, Person, Phone, Prop, Punch, sec, Sfx, Shot, Src, StatCard, Bg, Char} from '../v2kit';

const LoanScreen: React.FC<{n: number; amt: string; color: string}> = ({n, amt, color}) => (
  <div style={{height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, background: color}}>
    <div style={{fontWeight: 800, fontSize: 24, color: INK}}>Loan {n}</div>
    <div style={{fontWeight: 900, fontSize: 52, color: INK}}>{amt}</div>
    <div style={{fontWeight: 700, fontSize: 18, color: INK}}>next payment</div>
  </div>
);

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
const Warning: React.FC<{at: number}> = ({at}) => {
  const f = useCurrentFrame();
  const glow = f >= at ? 0.5 + 0.5 * Math.abs(Math.sin((f - at) / 8)) : 0;
  return (
    <PopIn at={at} origin="50% 50%" style={{left: 760, top: 300}}>
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
      return (
        <>
          {/* A: one is easy... now open five */}
          <Shot from={0} to={b('cfpb')}>
            <Scene palette="night" dur={b('cfpb')} stars>
              <Bg name="v2/bg_bedroom.jpg" dim={0.4} />
              {LOANS.map((l, i) => (
                <Phone key={i} at={i === 0 ? 0 : b('openFive') + i * 4} x={150 + i * 340} y={250} h={460} tilt={(i - 2) * 3}>
                  <LoanScreen n={i + 1} amt={l.amt} color={l.color} />
                </Phone>
              ))}
            </Scene>
            <Sfx name="pop" at={0} />
            {[1, 2, 3, 4].map((i) => <Sfx key={i} name="pop" at={b('openFive') + i * 4} />)}
          </Shot>

          {/* B: CFPB 63%, 1 in 3 */}
          <Shot from={b('cfpb')} to={b('ownLoans')} trans="ink" seed="c4b">
            <Scene palette="teal" dur={r('ownLoans', 'cfpb')}>
              <PopIn at={0} style={{left: 120, top: 330}}><Prop name="bld_cfpb_transparent.png" w={700} /></PopIn>
              <StatCard to={63} label="had 2+ loans at the same time" at={r('s63', 'cfpb')} x={880} y={170} w={760} />
              {[0, 1, 2].map((i) => (
                <PopIn key={i} at={r('oneInThree', 'cfpb') + i * 4} style={{left: 960 + i * 170, top: 600}}><Person color={i === 1 ? '#E4572E' : '#4FB7C0'} h={240} dim={i !== 1} /></PopIn>
              ))}
              <PopIn at={r('oneInThree', 'cfpb') + 14} style={{left: 1460, top: 700}}><Pill text="1 in 3: 2+ companies" bg="#E4572E" size={38} /></PopIn>
            </Scene>
            <Src text="CFPB, Consumer Use of Buy Now, Pay Later and Other Unsecured Debt (Jan 2025)" at={r('s63', 'cfpb')} />
            <Sfx name="whoosh" at={0} /><Sfx name="pop" at={r('s63', 'cfpb')} /><Sfx name="pop" at={r('oneInThree', 'cfpb')} /><Sfx name="pop" at={r('oneInThree', 'cfpb') + 14} />
          </Shot>

          {/* C: each app only sees its own loans; you see the pile */}
          <Shot from={b('ownLoans')} to={b('fico')} trans="whip">
            <Scene palette="space" dur={r('fico', 'ownLoans')} stars>
              {[0, 1, 2].map((i) => (
                <Phone key={i} at={i * 4} x={120 + i * 270} y={300} h={420}>
                  <LoanScreen n={i + 1} amt={LOANS[i].amt} color={LOANS[i].color} />
                </Phone>
              ))}
              <PopIn at={10} style={{left: 160, top: 760}}><Pill text="each app sees only its own" bg="#5B4FFF" size={38} /></PopIn>
              <Spotlight x={1400} opacity={0.45} />
              <Char name="v2/char_shopper_worried.png" at={r('wholePile', 'ownLoans')} x={1330} y={580} h={360} />
              {LOANS.map((l, i) => (
                <PayCircle key={i} amount={l.amt} label="" at={r('wholePile', 'ownLoans') + 6 + i * 4} x={1410 + (i % 2) * 30 - 15} y={520 - i * 75} size={110} color={l.color} />
              ))}
            </Scene>
            <Sfx name="whoosh" at={0} /><Sfx name="pop" at={10} /><Sfx name="pop" at={r('wholePile', 'ownLoans')} />
          </Shot>

          {/* D: FICO BNPL scores */}
          <Shot from={b('fico')} to={b('groceries')} trans="wipe">
            <Scene palette="indigo" dur={r('groceries', 'fico')}>
              <CreditReport at={0} />
              <NameTag name="FICO Score 10 BNPL" role="announced June 2025" at={8} style={{left: 900, top: 420}} />
            </Scene>
            <Src text="FICO press release, June 23, 2025" at={8} />
            <Sfx name="whoosh" at={0} /><Sfx name="pop" at={0} /><Sfx name="pop" at={8} />
          </Shot>

          {/* E: groceries 14% -> 29% */}
          <Shot from={b('groceries')} to={b('warning')} trans="ink" seed="c4e">
            <Scene palette="sunrise" dur={r('warning', 'groceries')}>
              <PopIn at={0} style={{left: 150, top: 300}}><Prop name="v2/obj_grocery_bag.png" h={460} /></PopIn>
              <IsoBlock h={168} at={r('s14', 'groceries')} label="14%" style={{left: 820, bottom: 330}} top="#FFD9A0" left="#FFB26B" right="#E4572E" />
              <IsoBlock h={348} at={r('s29', 'groceries')} label="29%" style={{left: 1220, bottom: 330}} top="#FFB26B" left="#E4572E" right="#B5401F" />
              <PopIn at={r('s14', 'groceries')} style={{left: 830, top: 775}}><Pill text="2 years earlier" bg="#3B1F1A" size={34} /></PopIn>
              <PopIn at={r('s29', 'groceries')} style={{left: 1290, top: 775}}><Pill text="now" bg="#3B1F1A" size={34} /></PopIn>
              <PopIn at={r('food', 'groceries')} style={{left: 640, top: 150}}><Pill text="your food, in 4 payments" bg="#E4572E" size={44} /></PopIn>
            </Scene>
            <Src text="LendingTree BNPL survey, 2026 (share of BNPL users who used it for groceries)" at={r('s29', 'groceries')} />
            <Sfx name="whoosh" at={0} /><Sfx name="pop" at={r('s29', 'groceries')} /><Sfx name="pop" at={r('s14', 'groceries')} /><Sfx name="pop" at={r('food', 'groceries')} />
          </Shot>

          {/* F: that's a warning light */}
          <Shot from={b('warning')} to={len} trans="whip">
            <Scene palette="night" dur={len - b('warning')}>
              <Warning at={2} />
              <Punch text="That's a warning light." at={sec(0.6)} y={720} size={100} />
            </Scene>
            <Sfx name="whoosh" at={0} /><Sfx name="pop" at={2} />
          </Shot>
        </>
      );
    }}
  </ChapterShell>
);
