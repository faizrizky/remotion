import React from 'react';
import {useCurrentFrame} from 'remotion';
import {KeyTag, Pill, PopIn, SANS, Scene} from '../../style/style_kit';
import {ChapterShell} from '../ChapterShell';
import {BranchFork, Chip, Embers, LensZoom, MascotCorner} from '../paper';
import {DashArrow, Gauge, INK, PayCircle, Phone, Prop, Punch, sec, Sfx, Shot, Src, StatCard, PAN_FRAMES} from '../v2kit';

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
          <Shot world={{src: 'v2/world_mall.jpg', dir: 'l', at: 0.2}} trans="carry" pan="u" carry={{from: [1520, 400], to: [850, 700]}} from={0} to={b('lateFee')}>
            <Scene palette="teal" dur={b('lateFee')}>
              <Balance at={b('intro')} />
              <PopIn at={b('intro')} style={{left: 180, top: 200}}><Pill text="What if a payment fails?" bg="#2B1230" size={48} /></PopIn>
              <DashArrow x0={740} y0={480} x1={1120} y1={480} at={b('autoPull')} />
              <Phone at={b('phone')} x={1180} y={200} h={620}><AutopayScreen failAt={b('notThere')} /></Phone>
              <LensZoom cx={440} cy={850} at={b('notThere')} r={200}><div style={{position: 'absolute', left: 240, top: 730, width: 400, height: 240, background: '#E5484D', color: '#fff', fontFamily: SANS, fontWeight: 900, fontSize: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>$12.40 &lt; $30</div></LensZoom>
              <Embers n={14} color="#FF3B30" seed={2} />
            </Scene>
            <Sfx name="pop" at={b('intro')} /><Sfx name="notify" at={b('phone')} /><Sfx name="card_tap" at={b('autoPull')} /><Sfx name="boom" at={b('notThere')} />
          </Shot>

          {/* B: hit twice */}
          <Shot world={{src: 'v2/world_kitchen.jpg', dir: 'd', at: 0.7}} from={b('lateFee')} to={b('klarnaStart')} trans="wipe">
            <Scene palette="sunrise" dur={r('klarnaStart', 'lateFee')}>
              <Chip text="Late fee  (lender)" kind="warn" at={r('lateW', 'lateFee')} x={250} y={380} size={66} />
              <Chip text="Overdraft fee  (bank)" kind="warn" at={r('overdraft', 'lateFee')} x={1000} y={380} size={66} rot={2} />
              <KeyTag text="hit twice" at={r('hitTwice', 'lateFee')} style={{position: 'absolute', left: 820, top: 620}} size={80} />
            </Scene>
            <Sfx name="whoosh" at={0} /><Sfx name="pop" at={r('lateW', 'lateFee')} /><Sfx name="pop" at={r('overdraft', 'lateFee')} /><Sfx name="pop" at={r('hitTwice', 'lateFee')} />
          </Shot>

          {/* C: Klarna up to $7, Afterpay up to $8 */}
          <Shot exitPan="u" world={{src: 'v2/world_bank.jpg', dir: 'r', at: 0.45}} from={b('klarnaStart')} to={b('small')} trans="ink" seed="c5c">
            <Scene palette="rose" dur={r('small', 'klarnaStart')}>
              <FeeCard who="Klarna (US)" fee="up to $7" at={r('klarna7', 'klarnaStart')} x={240} color="#FFD23F" />
              <FeeCard who="Afterpay (US)" fee="up to $8" note="max 25% of the order" at={r('afterpay8', 'klarnaStart')} x={1040} color="#BDEBD3" />
            </Scene>
            <Src text="Klarna fees via NerdWallet (Nov 2025); Afterpay Help Center (US)" at={r('klarna7', 'klarnaStart')} />
            <Sfx name="whoosh" at={0} /><Sfx name="pop" at={r('klarna7', 'klarnaStart')} /><Sfx name="pop" at={r('afterpay8', 'klarnaStart')} />
          </Shot>

          {/* C2: sounds small... on a $30 payment it isn't, and it happens a lot */}
          <Shot world={{src: 'v2/world_desk.jpg', dir: 'u', at: 0.8}} from={b('small')} to={b('s47Start')} trans="carry" pan="u" carry={{from: [560, 400], to: [800, 520], label: '$7'}}>
            <Scene palette="peri" dur={r('s47Start', 'small')}>
              <PopIn at={r('smallW', 'small')} style={{left: 130, top: 190}}><Pill text="Sounds small." bg="#2B1230" size={64} /></PopIn>
              <PayCircle amount="$30" label="payment" at={r('onThirty', 'small')} x={460} y={560} size={200} />
              <Chip text="+ up to $7 late fee" kind="warn" at={r('feeW', 'small')} x={760} y={500} size={60} />
              <Punch text="...and it happens a lot." at={r('aLot', 'small')} y={780} size={96} />
            </Scene>
            <Sfx name="whoosh" at={0} /><Sfx name="pop" at={r('smallW', 'small')} /><Sfx name="pop" at={r('onThirty', 'small')} /><Sfx name="pop" at={r('feeW', 'small')} /><Sfx name="pop" at={r('aLot', 'small')} />
          </Shot>

          {/* D: 47% paid late */}
          <Shot world={{src: 'v2/world_clothes.jpg', dir: 'l', at: 0.6}} from={b('s47Start')} to={b('fedStart')} trans="wipe">
            <Scene palette="sky" dur={r('fedStart', 's47Start')}>
              <MascotCorner head="head_shocked.png" at={r('s47', 's47Start') + sec(0.8)} x={1620} y={780} size={210} />
              <StatCard to={47} label="of users paid late at least once in the past year" at={r('s47', 's47Start')} x={600} y={250} w={720} />
            </Scene>
            <Src text="LendingTree late-payment survey (Mar 2026)" at={r('s47', 's47Start')} />
            <Sfx name="whoosh" at={0} /><Sfx name="ding" at={r('s47', 's47Start')} />
          </Shot>

          {/* D2: Federal Reserve: 21% */}
          <Shot exitPan="r" world={{src: 'v2/world_living.jpg', dir: 'r', at: 0.4}} from={b('fedStart')} to={b('grocStart')} trans="ink" seed="c5d">
            <Scene palette="mint" dur={r('grocStart', 'fedStart')}>
              <PopIn at={r('fedW', 'fedStart')} style={{left: 100, top: 330}}><Prop name="bld_fed_g19_transparent.png" w={640} /></PopIn>
              <StatCard to={21} label="paid a late fee or got hit with an overdraft fee" at={r('fed21', 'fedStart')} x={800} y={170} w={860} bg="#FFD23F" />
              <Chip text="late fee" kind="warn" at={r('lateChip', 'fedStart')} x={850} y={620} size={52} />
              <Chip text="overdraft fee" kind="warn" at={r('overChip', 'fedStart')} x={1150} y={620} size={52} rot={2} />
            </Scene>
            <Src text="Federal Reserve (2025 data)" at={r('fed21', 'fedStart')} />
            <Sfx name="whoosh" at={0} /><Sfx name="pop" at={r('fedW', 'fedStart')} /><Sfx name="ding" at={r('fed21', 'fedStart')} /><Sfx name="pop" at={r('lateChip', 'fedStart')} /><Sfx name="pop" at={r('overChip', 'fedStart')} />
          </Shot>

          {/* D3: grocery users 43% */}
          <Shot exitPan="u" world={{src: 'v2/world_bakery.jpg', dir: 'u', at: 0.3}} from={b('grocStart')} to={b('notFree')} trans="carry" pan="r" carry={{from: [1230, 330], to: [1200, 450], label: '21%'}}>
            <Scene palette="rose" dur={r('notFree', 'grocStart')}>
              <PopIn at={r('bag', 'grocStart')} style={{left: 150, top: 320}}><Prop name="v2/obj_grocery_bag.png" h={440} /></PopIn>
              <StatCard to={43} label="of grocery users paid a late or overdraft fee" at={r('grocery43', 'grocStart')} x={760} y={250} w={820} bg="#FF9F9F" />
            </Scene>
            <Src text="LendingTree late-payment survey (Mar 2026); Federal Reserve (2025 data)" at={r('grocery43', 'grocStart')} />
            <Sfx name="whoosh" at={0} /><Sfx name="pop" at={r('bag', 'grocStart')} /><Sfx name="ding" at={r('grocery43', 'grocStart')} />
          </Shot>

          {/* E: not every plan is interest-free */}
          <Shot world={{src: 'v2/world_street.jpg', dir: 'l', at: 0.5}} from={b('notFree')} to={b('aprStart')} trans="carry" pan="u" carry={{from: [1170, 420], to: [1500, 700], label: '43%'}}>
            <Scene palette="sunrise" dur={r('aprStart', 'notFree')}>
              <Punch text="One more thing..." at={r('oneMore', 'notFree')} y={250} size={120} />
              <Chip text="not every plan is interest-free" kind="warn" at={r('interestFree', 'notFree') - 18} x={560} y={560} size={60} />
            </Scene>
            <Sfx name="whoosh" at={0} /><Sfx name="pop" at={r('oneMore', 'notFree')} /><Sfx name="pop" at={r('interestFree', 'notFree') - 18} />
          </Shot>

          {/* F: APR up to about 36% */}
          <Shot exitPan="d" world={{src: 'v2/world_kitchen.jpg', dir: 'r', at: 0.2}} from={b('aprStart')} to={b('sameApp')} trans="ink" seed="c5f">
            <Scene palette="mint" dur={r('sameApp', 'aprStart')}>
              <Gauge value={36} max={40} at={r('apr36', 'aprStart')} x={960} y={600} label={'APR on longer "pay monthly" plans'} />
            </Scene>
            <Src text="Affirm terms (0-36% APR); Klarna financing 0-35.99% APR (NerdWallet)" at={r('aprSrc', 'aprStart')} />
            <Sfx name="whoosh" at={0} /><Sfx name="pop" at={r('apr36', 'aprStart')} />
          </Shot>

          {/* G: same app, very different deal */}
          <Shot exitPan="l" world={{src: 'v2/world_mall.jpg', dir: 'd', at: 0.6}} from={b('sameApp')} to={len - PAN_FRAMES} trans="carry" pan="d" carry={{from: [960, 460], to: [1400, 560], label: '36%'}}>
            <Scene palette="peri" dur={len - b('sameApp')}>
              <Chip text="same app" kind="label" at={r('sameW', 'sameApp')} x={830} y={120} size={64} />
              <BranchFork at={r('sameW', 'sameApp') + 4} x0={960} y0={215} x1={520} x2={1400} y1={255} />
              <PlanCard title="Pay in 4" rate="0%" at={r('sameW', 'sameApp') + 8} x={170} color="#7BD389" />
              <PlanCard title="Pay monthly" rate="up to ~36%" at={r('monthly', 'sameApp')} x={1050} color="#FF6B6B" />
              <MascotCorner head="head_suspicious.png" at={r('monthly', 'sameApp')} x={860} y={800} size={190} />
            </Scene>
            <Sfx name="whoosh" at={0} /><Sfx name="pop" at={r('sameW', 'sameApp')} /><Sfx name="pop" at={r('sameW', 'sameApp') + 8} /><Sfx name="pop" at={r('monthly', 'sameApp')} />
          </Shot>
        </>
      );
    }}
  </ChapterShell>
);
