import React from 'react';
import {useCurrentFrame} from 'remotion';
import {KeyTag, Pill, PopIn, SANS, Scene} from '../../style/style_kit';
import {ChapterShell} from '../ChapterShell';
import {DashArrow, Gauge, INK, Phone, Sfx, Shot, Src, StatCard, Bg} from '../v2kit';

/** Phone screen that switches from "Autopay" to "Payment failed" at frame `failAt`. */
const AutopayScreen: React.FC<{failAt: number}> = ({failAt}) => {
  const f = useCurrentFrame();
  const failed = f >= failAt;
  return (
    <div style={{height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, background: failed ? '#FF3B30' : '#FFFFFF', color: failed ? '#fff' : INK, fontFamily: SANS}}>
      <div style={{fontWeight: 800, fontSize: 26}}>{failed ? 'Payment failed' : 'Autopay today'}</div>
      <div style={{fontWeight: 900, fontSize: 60}}>$30.00</div>
      <div style={{fontWeight: 700, fontSize: 20}}>{failed ? 'Not enough funds' : 'Installment 2 of 4'}</div>
    </div>
  );
};

/** Code-drawn bank balance card. */
const Balance: React.FC<{at: number}> = ({at}) => (
  <PopIn at={at} style={{left: 180, top: 360}}>
    <div style={{width: 520, background: '#102A43', color: '#fff', border: `7px solid ${INK}`, borderRadius: 30, padding: 34, boxSizing: 'border-box', fontFamily: SANS, boxShadow: '0 12px 0 rgba(0,0,0,0.2)'}}>
      <div style={{fontWeight: 700, fontSize: 30, opacity: 0.8}}>Checking account</div>
      <div style={{fontWeight: 900, fontSize: 96}}>$12.40</div>
    </div>
  </PopIn>
);

/** Big fee card for "Klarna up to $7" style facts. */
const FeeCard: React.FC<{who: string; fee: string; note?: string; at: number; x: number; color: string}> = ({who, fee, note, at, x, color}) => (
  <PopIn at={at} origin="50% 50%" style={{left: x, top: 250}}>
    <div style={{width: 640, background: color, border: `7px solid ${INK}`, borderRadius: 34, padding: '30px 34px', boxSizing: 'border-box', fontFamily: SANS, color: INK, textAlign: 'center', boxShadow: '0 12px 0 rgba(0,0,0,0.2)'}}>
      <div style={{fontWeight: 800, fontSize: 40}}>{who} late fee</div>
      <div style={{fontWeight: 900, fontSize: 130, lineHeight: 1.1}}>{fee}</div>
      {note && <div style={{fontWeight: 700, fontSize: 28}}>{note}</div>}
    </div>
  </PopIn>
);

/** Plan comparison card. */
const PlanCard: React.FC<{title: string; rate: string; at: number; x: number; color: string}> = ({title, rate, at, x, color}) => (
  <PopIn at={at} origin="50% 50%" style={{left: x, top: 260}}>
    <div style={{width: 700, height: 460, background: color, border: `7px solid ${INK}`, borderRadius: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: SANS, color: INK, boxShadow: '0 12px 0 rgba(0,0,0,0.2)'}}>
      <div style={{fontWeight: 800, fontSize: 56}}>{title}</div>
      <div style={{fontWeight: 900, fontSize: 110}}>{rate}</div>
    </div>
  </PopIn>
);

export const Ch5: React.FC = () => (
  <ChapterShell id="ch5">
    {(b, len) => {
      const r = (k: string, from: string) => b(k) - b(from);
      return (
        <>
          {/* A: autopay pulls, money isn't there */}
          <Shot from={0} to={b('lateFee')}>
            <Scene palette="teal" dur={b('lateFee')}>
              <Bg name="v2/bg_checkout.jpg" dim={0.12} />
              <Balance at={0} />
              <DashArrow x0={740} y0={480} x1={1120} y1={480} at={b('autoPull')} />
              <Phone at={4} x={1180} y={200} h={620}><AutopayScreen failAt={b('notThere')} /></Phone>
            </Scene>
            <Sfx name="pop" at={0} /><Sfx name="pop" at={4} /><Sfx name="card_tap" at={b('autoPull')} /><Sfx name="pop" at={b('notThere')} />
          </Shot>

          {/* B: hit twice */}
          <Shot from={b('lateFee')} to={b('klarna7')} trans="wipe">
            <Scene palette="sunrise" dur={r('klarna7', 'lateFee')}>
              <PopIn at={0} style={{left: 250, top: 380}}><Pill text="Late fee  (lender)" bg="#E4572E" size={60} /></PopIn>
              <PopIn at={r('overdraft', 'lateFee')} style={{left: 1000, top: 380}}><Pill text="Overdraft fee  (bank)" bg="#5B4FFF" size={60} /></PopIn>
              <KeyTag text="hit twice" at={r('overdraft', 'lateFee') + 8} style={{position: 'absolute', left: 820, top: 620}} size={80} />
            </Scene>
            <Sfx name="whoosh" at={0} /><Sfx name="pop" at={0} /><Sfx name="pop" at={r('overdraft', 'lateFee')} />
          </Shot>

          {/* C: Klarna up to $7, Afterpay up to $8 */}
          <Shot from={b('klarna7')} to={b('aLot')} trans="ink" seed="c5c">
            <Scene palette="rose" dur={r('aLot', 'klarna7')}>
              <FeeCard who="Klarna (US)" fee="up to $7" at={0} x={240} color="#FFD23F" />
              <FeeCard who="Afterpay (US)" fee="up to $8" note="max 25% of the order" at={r('afterpay8', 'klarna7')} x={1040} color="#BDEBD3" />
              <PopIn at={r('small', 'klarna7')} style={{left: 640, top: 780}}><Pill text="...on a $30 payment" bg="#2B1230" size={48} /></PopIn>
            </Scene>
            <Src text="Klarna fees via NerdWallet (Nov 2025); Afterpay Help Center (US)" at={0} />
            <Sfx name="whoosh" at={0} /><Sfx name="pop" at={0} /><Sfx name="pop" at={r('afterpay8', 'klarna7')} /><Sfx name="pop" at={r('small', 'klarna7')} />
          </Shot>

          {/* D: it happens a lot */}
          <Shot from={b('aLot')} to={b('notFree')} trans="whip">
            <Scene palette="night" dur={r('notFree', 'aLot')} stars>
              <StatCard to={47} label="paid late in the past year" at={r('s47', 'aLot')} x={90} y={260} w={560} />
              <StatCard to={21} label="paid a late or overdraft fee" at={r('fed21', 'aLot')} x={680} y={260} w={560} bg="#FFD23F" />
              <StatCard to={43} label="...of grocery users" at={r('grocery43', 'aLot')} x={1270} y={260} w={560} bg="#FF9F9F" />
            </Scene>
            <Src text="LendingTree late-payment survey (Mar 2026); Federal Reserve (2025 data)" at={r('s47', 'aLot')} />
            <Sfx name="whoosh" at={0} /><Sfx name="pop" at={r('s47', 'aLot')} /><Sfx name="pop" at={r('fed21', 'aLot')} /><Sfx name="pop" at={r('grocery43', 'aLot')} />
          </Shot>

          {/* E: not every plan is interest-free */}
          <Shot from={b('notFree')} to={b('sameApp')} trans="wipe">
            <Scene palette="mint" dur={r('sameApp', 'notFree')}>
              <Gauge value={36} max={40} at={r('apr36', 'notFree')} x={960} y={560} label={'APR on longer "pay monthly" plans'} />
            </Scene>
            <Src text="Affirm terms (0-36% APR); Klarna financing 0-35.99% APR (NerdWallet)" at={r('apr36', 'notFree')} />
            <Sfx name="whoosh" at={0} /><Sfx name="pop" at={r('apr36', 'notFree')} />
          </Shot>

          {/* F: same app, very different deal */}
          <Shot from={b('sameApp')} to={len} trans="whip">
            <Scene palette="indigo" dur={len - b('sameApp')}>
              <PlanCard title="Pay in 4" rate="0%" at={0} x={170} color="#7BD389" />
              <PlanCard title="Pay monthly" rate="up to ~36%" at={PLAN_GAP} x={1050} color="#FF6B6B" />
            </Scene>
            <Sfx name="whoosh" at={0} /><Sfx name="pop" at={0} /><Sfx name="pop" at={PLAN_GAP} />
          </Shot>
        </>
      );
    }}
  </ChapterShell>
);

const PLAN_GAP = 12;
