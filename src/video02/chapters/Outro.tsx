import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {CountUp, HAND, KeyTag, Pill, PopIn, SANS, Scene} from '../../style/style_kit';
import {ChapterShell} from '../ChapterShell';
import {Disclaimer, INK, LeoBadge, Punch, Sfx, Shot} from '../v2kit';

/** Must match the narration: "Next time, the price trick that doesn't change the price at all." */
export const NEXT_TOPIC = "the price trick that doesn't change the price at all.";

/** "Next time" teaser card: cream paper card with a coral tab, topic in handwriting, key phrase highlighted. Stays left of x 1100 (end screen). */
const NextCard: React.FC<{at: number}> = ({at}) => {
  const f = useCurrentFrame();
  const swipe = interpolate(f, [at + 18, at + 34], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <PopIn at={at} origin="0% 50%" style={{left: 110, top: 690}}>
      <div style={{position: 'relative', width: 930, transform: 'rotate(-1.5deg)'}}>
        <div style={{background: '#FFF8EC', border: `7px solid ${INK}`, borderRadius: 26, padding: '58px 40px 30px', boxShadow: '0 12px 0 rgba(0,0,0,0.22)'}}>
          <div style={{fontFamily: HAND, fontWeight: 700, fontSize: 60, lineHeight: 1.12, color: INK}}>
            the price trick that{' '}
            <span style={{position: 'relative', display: 'inline-block'}}>
              <span style={{position: 'absolute', left: -6, right: -6, bottom: 6, height: 26, background: '#FFD23F', borderRadius: 8, transform: `scaleX(${swipe})`, transformOrigin: '0 50%', zIndex: 0}} />
              <span style={{position: 'relative'}}>doesn't change the price</span>
            </span>{' '}at all.
          </div>
        </div>
        <div style={{position: 'absolute', left: 34, top: -30, background: '#FF6B6B', color: '#fff', border: `6px solid ${INK}`, borderRadius: 14, padding: '6px 22px', fontFamily: SANS, fontWeight: 900, fontSize: 36, letterSpacing: 2, transform: 'rotate(-3deg)', boxShadow: '0 6px 0 rgba(0,0,0,0.2)'}}>NEXT TIME</div>
      </div>
    </PopIn>
  );
};

const ITEMS = [
  {name: 'Sneakers', amt: 30},
  {name: 'Hoodie', amt: 45},
  {name: 'Cap', amt: 25},
  {name: 'Headphones', amt: 60},
  {name: 'Groceries', amt: 38},
];
const TOTAL = ITEMS.reduce((s, i) => s + i.amt, 0);

/** Code-drawn receipt that lists installments and sums them. */
const Tally: React.FC<{at: number; totalAt: number}> = ({at, totalAt}) => (
  <PopIn at={at} style={{left: 560, top: 180}}>
    <div style={{width: 800, background: '#FFFFFF', border: `7px solid ${INK}`, borderRadius: 30, padding: '30px 44px', boxSizing: 'border-box', fontFamily: SANS, color: INK, boxShadow: '0 12px 0 rgba(0,0,0,0.25)'}}>
      <div style={{fontWeight: 900, fontSize: 40, marginBottom: 12}}>Due in the next 6 weeks</div>
      {ITEMS.map((it, i) => (
        <PopIn key={it.name} at={at + 8 + i * 6} origin="0% 50%" style={{position: 'relative'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 38, padding: '8px 0', borderBottom: '3px dashed rgba(0,0,0,0.2)', width: 700}}>
            <span>{it.name}</span><span>${it.amt}</span>
          </div>
        </PopIn>
      ))}
      <div style={{display: 'flex', justifyContent: 'space-between', fontWeight: 900, fontSize: 64, marginTop: 14}}>
        <span>Total</span>
        <CountUp to={TOTAL} from={0} at={totalAt} dur={20} suffix="" style={{}} />
      </div>
    </div>
  </PopIn>
);

export const Outro: React.FC = () => (
  <ChapterShell id="outro">
    {(b, len) => {
      const r = (k: string, from: string) => b(k) - b(from);
      return (
        <>
          {/* A: the one number */}
          <Shot world={{src: 'v2/world_bakery.jpg', x0: 351, x1: 489, a: 0, b: b('sysStart')}} from={0} to={b('sysStart')} trans="carry" pan="l" carry={{from: [1260, 540], to: [960, 500]}}>
            <Scene palette="lilac" dur={b('sysStart')}>
              <Punch text="The ONE number" at={b('oneWord')} y={40} size={90} />
              <Tally at={b('hereItIs')} totalAt={b('sum')} />
              <PopIn at={b('realBill')} style={{left: 1400, top: 640}}><Pill text="your real bill" bg="#FF6B6B" size={44} /></PopIn>
              <KeyTag text="add it up today" at={b('addUp')} style={{position: 'absolute', left: 120, top: 820}} size={64} />
            </Scene>
            <Disclaimer />
            <Sfx name="pop" at={b('oneWord')} /><Sfx name="pop" at={b('hereItIs')} /><Sfx name="kaching" at={b('sum') + 20} /><Sfx name="pop" at={b('realBill')} /><Sfx name="pop" at={b('addUp')} />
          </Shot>

          {/* A2: if it surprises you, the system is working, just not for you */}
          <Shot exitPan="r" world={{src: 'v2/world_clothes.jpg', x0: 600, x1: 600, a: b('sysStart'), b: b('next')}} from={b('sysStart')} to={b('next')} trans="wipe">
            <Scene palette="rose" dur={r('next', 'sysStart')}>
              <LeoBadge head="head_suspicious.png" at={0} x={160} y={260} size={420} />
              <PopIn at={r('surprise', 'sysStart')} style={{left: 700, top: 260}}><Pill text="if it surprises you..." bg="#5B4FFF" size={56} /></PopIn>
              <PopIn at={r('system', 'sysStart')} style={{left: 700, top: 440}}><Pill text="the system is working" bg="#2B1230" size={56} /></PopIn>
              <PopIn at={r('notYou', 'sysStart')} style={{left: 700, top: 620}}><Pill text="...just not for you." bg="#FF6B6B" size={56} /></PopIn>
            </Scene>
            <Disclaimer />
            <Sfx name="whoosh" at={0} /><Sfx name="pop" at={0} /><Sfx name="pop" at={r('surprise', 'sysStart')} /><Sfx name="pop" at={r('system', 'sysStart')} /><Sfx name="pop" at={r('notYou', 'sysStart')} />
          </Shot>

          {/* B: next video + subscribe. Keep x 1100-1790, y 230-930 EMPTY for the end screen. */}
          <Shot world={{src: 'v2/world_clothes.jpg', x0: 1600, x1: 1639, a: b('next'), b: len}} from={b('next')} to={len} trans="carry" pan="r" carry={{from: [370, 470], to: [800, 500]}}>
            <Scene palette="peri" dur={len - b('next')}>
              <LeoBadge head="head_happy.png" at={0} x={240} y={230} size={420} />
              <NextCard at={r('nextPill', 'next')} />
              <PopIn at={r('subscribe', 'next')} style={{left: 120, top: 950}}><Pill text="Subscribe so you don't miss it." bg="#FFD23F" color="#191411" size={36} /></PopIn>
            </Scene>
            <Disclaimer />
            <Sfx name="whoosh" at={0} /><Sfx name="pop" at={r('nextPill', 'next')} /><Sfx name="pop" at={r('subscribe', 'next')} />
          </Shot>
        </>
      );
    }}
  </ChapterShell>
);
