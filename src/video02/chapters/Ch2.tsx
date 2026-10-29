import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {Bubble, KeyTag, Pill, PopIn, Scene} from '../../style/style_kit';
import {ChapterShell} from '../ChapterShell';
import {CoinFly, DashArrow, INK, Person, Prop, Punch, sec, Sfx, Shot, Src, StatCard} from '../v2kit';

/** Shopping cart that grows as the scene goes on (the "bigger cart"). */
const GrowingCart: React.FC<{at: number}> = ({at}) => {
  const f = useCurrentFrame();
  const s = interpolate(f, [at, at + sec(4)], [0.75, 1.15], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <PopIn at={at} style={{left: 640, top: 250}}>
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
          <Shot from={0} to={b('why')}>
            <Scene palette="indigo" dur={b('why')}>
              <PopIn at={0} style={{left: 110, top: 420}}><Person color="#E8A520" h={300} /></PopIn>
              <PopIn at={6} style={{left: 520, top: 340}}><Prop name="v2/obj_store.png" h={360} /></PopIn>
              <PopIn at={12} style={{left: 1400, top: 340}}><Prop name="obj_bank_transparent.png" h={360} /></PopIn>
              <DashArrow x0={940} y0={520} x1={1380} y1={520} at={b('storePays')} color="#FFF4E0" />
              <CoinFly at={b('storePays') + 10} x0={940} y0={520} x1={1380} y1={520} label="%" />
              <CoinFly at={b('storePays') + 30} x0={940} y0={520} x1={1380} y1={520} label="%" />
              <PopIn at={b('cfpb')} style={{left: 990, top: 300}}><Pill text="2-4% fee" bg="#FF6B6B" size={56} /></PopIn>
            </Scene>
            <Src text="CFPB, Buy Now, Pay Later: Market Trends and Consumer Impacts (2022)" at={b('cfpb')} />
            <Sfx name="pop" at={6} /><Sfx name="pop" at={12} /><Sfx name="kaching" at={b('storePays') + 28} /><Sfx name="pop" at={b('cfpb')} />
          </Shot>

          {/* B: why would a store pay that? */}
          <Shot from={b('why')} to={b('klarna')} trans="whip">
            <Scene palette="rose" dur={r('klarna', 'why')}>
              <PopIn at={0} style={{left: 260, top: 330}}><Prop name="v2/obj_store.png" h={400} /></PopIn>
              <Bubble text="Why pay a fee?" at={6} tail="left" style={{left: 860, top: 360}} size={72} />
            </Scene>
            <Sfx name="whoosh" at={0} /><Sfx name="pop" at={6} />
          </Shot>

          {/* C: Klarna's own numbers */}
          <Shot from={b('klarna')} to={b('readAgain')} trans="ink" seed="c2c">
            <Scene palette="space" dur={r('readAgain', 'klarna')} stars>
              <StatCard to={20} prefix="+" label="more sales completed" at={r('s20', 'klarna')} x={110} y={250} w={540} />
              <StatCard to={40} prefix="+" label="bigger orders" at={r('s40', 'klarna')} x={690} y={250} w={540} bg="#FFD23F" />
              <StatCard to={46} prefix="+" label="more repeat buys" at={r('s46', 'klarna')} x={1270} y={250} w={540} />
              <PopIn at={r('vary', 'klarna')} style={{left: 520, top: 690}}><Pill text="Klarna's own numbers. Results vary." bg="#5B4FFF" size={42} /></PopIn>
            </Scene>
            <Src text="Klarna partner messaging toolkit (merchant averages)" at={r('s20', 'klarna')} />
            <Sfx name="whoosh" at={0} /><Sfx name="pop" at={r('s20', 'klarna')} /><Sfx name="pop" at={r('s40', 'klarna')} /><Sfx name="pop" at={r('s46', 'klarna')} /><Sfx name="pop" at={r('vary', 'klarna')} />
          </Shot>

          {/* D: read that again. 40%. Not a button, a bigger cart. */}
          <Shot from={b('readAgain')} to={b('cart')} trans="zoom">
            <Scene palette="sunrise" dur={r('cart', 'readAgain')}>
              <Punch text="+40% bigger orders" at={0} color={INK} y={170} size={150} />
              <PopIn at={r('notButton', 'readAgain')} style={{left: 360, top: 520}}>
                <div style={{position: 'relative'}}>
                  <Pill text="a payment button" bg="#FF6B9A" size={56} />
                  <div style={{position: 'absolute', left: -10, right: -10, top: '50%', height: 10, background: INK, transform: 'rotate(-6deg)'}} />
                </div>
              </PopIn>
              <KeyTag text="a BIGGER cart" at={r('notButton', 'readAgain') + sec(1.2)} style={{position: 'absolute', left: 1080, top: 515}} size={72} />
            </Scene>
            <Sfx name="whoosh" at={0} /><Sfx name="pop" at={r('notButton', 'readAgain')} /><Sfx name="pop" at={r('notButton', 'readAgain') + sec(1.2)} />
          </Shot>

          {/* E: the bigger cart is yours */}
          <Shot from={b('cart')} to={len} trans="whip">
            <Scene palette="mint" dur={len - b('cart')}>
              <GrowingCart at={0} />
              <DashArrow x0={1220} y0={560} x1={1480} y1={560} at={r('yours', 'cart')} />
              <PopIn at={r('yours', 'cart') + 6} style={{left: 1520, top: 420}}><Person color="#E8A520" h={320} /></PopIn>
              <Punch text="...is yours." at={r('yours', 'cart') + 10} color={INK} y={110} size={110} />
            </Scene>
            <Sfx name="whoosh" at={0} /><Sfx name="pop" at={r('yours', 'cart') + 6} />
          </Shot>
        </>
      );
    }}
  </ChapterShell>
);
