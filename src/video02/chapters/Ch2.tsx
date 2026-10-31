import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {Bubble, KeyTag, Pill, PopIn, Scene, Sunburst} from '../../style/style_kit';
import {ChapterShell} from '../ChapterShell';
import {CoinWipe, HighlightSwipe, Chip} from '../paper';
import {CoinFly, DashArrow, INK, LeoBadge, Prop, Punch, sec, Sfx, Shot, Src, StatCard, Char} from '../v2kit';

/** Shopping cart that grows as the scene goes on (the "bigger cart"). */
const GrowingCart: React.FC<{at: number}> = ({at}) => {
  const f = useCurrentFrame();
  const s = interpolate(f, [at, at + sec(4)], [0.75, 1.0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <PopIn at={at} style={{left: 640, top: 340}}>
      <div style={{transform: `scale(${s})`, transformOrigin: '50% 100%'}}><Prop name="v2/obj_cart_full.png" h={520} /></div>
    </PopIn>
  );
};

export const Ch2: React.FC = () => (
  <ChapterShell id="ch2">
    {(b, len) => {
      const r = (k: string, from: string) => b(k) - b(from);
      return (
        <>
          {/* A: the store pays the lender */}
          <Shot world={{src: 'v2/world_mall.jpg', dir: 'r', at: 0.2}} from={0} to={b('cfpbStart')}>
            <Scene palette="peri" dur={b('cfpbStart')}>
              <Char name="v2/char_shopper_happy.png" at={0} x={110} y={440} h={480} />
              <PopIn at={sec(0.2)} style={{left: 440, top: 150}}><Pill text="the part most people never see" bg="#2B1230" size={50} /></PopIn>
              <PopIn at={b('payIn4')} style={{left: 440, top: 230}}><Pill text="Pay in 4" bg="#5B4FFF" size={56} /></PopIn>
              <PopIn at={b('storeW')} style={{left: 620, top: 340}}><Prop name="v2/obj_store.png" h={360} /></PopIn>
              <PopIn at={b('lenderW')} style={{left: 1400, top: 340}}><Prop name="obj_bank_transparent.png" h={360} /></PopIn>
              <DashArrow x0={1000} y0={520} x1={1380} y1={520} at={b('lenderW') + 6} color={INK} />
              <CoinFly at={b('coin1')} x0={1000} y0={520} x1={1380} y1={520} label="%" />
              <CoinFly at={b('coin2')} x0={1000} y0={520} x1={1380} y1={520} label="%" />
            </Scene>
            <Sfx name="pop" at={b('payIn4')} /><Sfx name="pop" at={b('storeW')} /><Sfx name="pop" at={b('lenderW')} /><Sfx name="kaching" at={b('coin2') + 24} />
          </Shot>

          {/* A2: CFPB: 2-4% */}
          <Shot world={{src: 'v2/world_clothes.jpg', dir: 'l', at: 0.4}} from={b('cfpbStart')} to={b('why')} trans="wipe">
            <Scene palette="teal" dur={r('why', 'cfpbStart')}>
              <PopIn at={0} style={{left: 130, top: 330}}><Prop name="bld_cfpb_transparent.png" w={700} /></PopIn>
              <Chip text="2-4% fee" kind="warn" at={r('twoFour', 'cfpbStart')} x={960} y={330} size={96} />
              <PopIn at={r('twoFour', 'cfpbStart') + 14} style={{left: 960, top: 560}}><Pill text="of the purchase, typically" bg="#2B1230" size={48} /></PopIn>
            </Scene>
            <Src text="CFPB, Buy Now, Pay Later: Market Trends and Consumer Impacts (2022)" at={sec(0.3)} />
            <Sfx name="whoosh" at={0} /><Sfx name="pop" at={0} /><Sfx name="pop" at={r('twoFour', 'cfpbStart')} />
          </Shot>

          {/* B: why would a store pay that? */}
          <Shot world={{src: 'v2/world_street.jpg', dir: 'l', at: 0.7}} from={b('why')} to={b('klarna')} trans="whip">
            <Scene palette="rose" dur={r('klarna', 'why')}>
              <Char name="v2/char_cashier_wave.png" at={4} x={690} y={380} h={560} />
              <PopIn at={0} style={{left: 260, top: 330}}><Prop name="v2/obj_store.png" h={400} /></PopIn>
              <Bubble text="Why pay a fee?" at={6} tail="left" style={{left: 1000, top: 300}} size={72} />
              <PopIn at={r('because', 'why')} style={{left: 1000, top: 620}}><Pill text="...because of what comes next" bg="#E4572E" size={46} /></PopIn>
            </Scene>
            <Sfx name="whoosh" at={0} /><Sfx name="pop" at={6} /><Sfx name="pop" at={r('because', 'why')} />
          </Shot>

          {/* C1: Klarna's pitch */}
          <Shot world={{src: 'v2/world_bank.jpg', dir: 'd', at: 0.45}} from={b('klarna')} to={b('s20Start')} trans="ink" seed="c2c">
            <Scene palette="lilac" dur={r('s20Start', 'klarna')}>
              <Char name="v2/char_lender_smug.png" at={sec(0.3)} x={130} y={380} h={560} />
              <PopIn at={r('klarnaW', 'klarna')} style={{left: 700, top: 250}}><Pill text="Klarna's pitch to stores" bg="#5B4FFF" size={52} /></PopIn>
              <DashArrow x0={700} y0={560} x1={1180} y1={560} at={r('klarnaW', 'klarna') + 10} color={INK} />
              <PopIn at={r('klarnaW', 'klarna') + 14} style={{left: 1250, top: 340}}><Prop name="v2/obj_store.png" h={380} /></PopIn>
              <PopIn at={sec(1.6)} style={{left: 640, top: 680}}><Pill text="merchants who add it see, on average..." bg="#2B1230" size={40} /></PopIn>
            </Scene>
            <Sfx name="whoosh" at={0} /><Sfx name="pop" at={r('klarnaW', 'klarna')} /><Sfx name="pop" at={r('klarnaW', 'klarna') + 14} /><Sfx name="pop" at={sec(1.6)} />
          </Shot>

          {/* C2: the three numbers */}
          <Shot world={{src: 'v2/world_desk.jpg', dir: 'r', at: 0.3}} from={b('s20Start')} to={b('vary')} trans="wipe">
            <Scene palette="peri" dur={r('vary', 's20Start')}>
              <StatCard to={20} prefix="+" label="more sales completed" at={r('s20', 's20Start')} x={110} y={250} w={540} />
              <StatCard to={40} prefix="+" label="bigger orders" at={r('s40', 's20Start')} x={690} y={250} w={540} bg="#FFD23F" />
              <StatCard to={46} prefix="+" label="more repeat buys" at={r('s46', 's20Start')} x={1270} y={250} w={540} />
            </Scene>
            <Src text="Klarna partner messaging toolkit (merchant averages)" at={r('s20', 's20Start')} />
            <CoinWipe at={0} /><Sfx name="whoosh" at={0} /><Sfx name="ding" at={r('s20', 's20Start')} /><Sfx name="ding" at={r('s40', 's20Start')} /><Sfx name="ding" at={r('s46', 's20Start')} />
          </Shot>

          {/* C3: Klarna's own numbers, results vary */}
          <Shot world={{src: 'v2/world_kitchen.jpg', dir: 'u', at: 0.5}} from={b('vary')} to={b('readAgain')} trans="whip">
            <Scene palette="lilac" dur={r('readAgain', 'vary')}>
              <LeoBadge head="head_suspicious.png" at={0} x={200} y={300} size={400} />
              <PopIn at={r('varyW', 'vary')} style={{left: 700, top: 330}}><Pill text="Klarna's own numbers" bg="#5B4FFF" size={68} /></PopIn>
              <PopIn at={sec(2.05)} style={{left: 700, top: 520}}><Pill text="...and results vary." bg="#2B1230" size={56} /></PopIn>
            </Scene>
            <Sfx name="whoosh" at={0} /><Sfx name="pop" at={0} /><Sfx name="pop" at={r('varyW', 'vary')} /><Sfx name="pop" at={sec(2.05)} />
          </Shot>

          {/* D: read that again. 40% bigger orders */}
          <Shot world={{src: 'v2/world_clothes.jpg', dir: 'u', at: 0.8}} from={b('readAgain')} to={b('notButton')} trans="ink" seed="c2d">
            <Scene palette="sunrise" dur={r('notButton', 'readAgain')}>
              <Sunburst c1="#FFB36B" c2="#FF8F5E" />
              <PopIn at={r('readW', 'readAgain')} style={{left: 600, top: 520}}><Pill text="But read that again." bg="#2B1230" size={64} /></PopIn>
              <Punch text="+40% bigger orders" at={r('forty', 'readAgain')} color={INK} y={170} size={150} />
            </Scene>
            <Sfx name="whoosh" at={0} /><Sfx name="pop" at={r('readW', 'readAgain')} /><Sfx name="ding" at={r('forty', 'readAgain')} />
          </Shot>

          {/* E: not a payment button, a bigger cart */}
          <Shot world={{src: 'v2/world_living.jpg', dir: 'r', at: 0.3}} from={b('notButton')} to={b('cart')} trans="wipe">
            <Scene palette="mint" dur={r('cart', 'notButton')}>
              <PopIn at={sec(0.2)} style={{left: 360, top: 200}}><Pill text="The store isn't paying for..." bg="#2B1230" size={56} /></PopIn>
              <PopIn at={r('btnW', 'notButton')} style={{left: 360, top: 380}}>
                <div style={{position: 'relative'}}>
                  <Pill text="a payment button" bg="#FF6B9A" size={56} />
                  <div style={{position: 'absolute', left: -10, right: -10, top: '50%', height: 10, background: INK, transform: 'rotate(-6deg)'}} />
                </div>
              </PopIn>
              <HighlightSwipe at={r('bigW', 'notButton') + 8} x={1090} y={535} w={560} h={78} />
              <KeyTag text="a BIGGER cart" at={r('bigW', 'notButton')} style={{position: 'absolute', left: 1080, top: 515}} size={72} />
            </Scene>
            <Sfx name="whoosh" at={0} /><Sfx name="pop" at={r('btnW', 'notButton')} /><Sfx name="pop" at={r('bigW', 'notButton')} />
          </Shot>

          {/* F: the bigger cart is yours */}
          <Shot world={{src: 'v2/world_bakery.jpg', dir: 'r', at: 0.1}} from={b('cart')} to={len} trans="whip">
            <Scene palette="sunrise" dur={len - b('cart')}>
              <GrowingCart at={0} />
              <DashArrow x0={1220} y0={560} x1={1480} y1={560} at={r('yours', 'cart') - 6} />
              <Char name="v2/char_shopper_worried.png" at={r('yours', 'cart')} x={1520} y={400} h={540} />
              <Punch text="...is yours." at={r('yours', 'cart')} color={INK} y={60} size={110} />
            </Scene>
            <Sfx name="whoosh" at={0} /><Sfx name="pop" at={r('yours', 'cart')} />
          </Shot>
        </>
      );
    }}
  </ChapterShell>
);
