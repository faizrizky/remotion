import React from 'react';
import {CountUp, KeyTag, Pill, PopIn, SANS, Scene} from '../../style/style_kit';
import {ChapterShell} from '../ChapterShell';
import {Disclaimer, INK, LeoBadge, Punch, Sfx, Shot} from '../v2kit';

/** Must match the narration: "Next time, the price trick that doesn't change the price at all." */
export const NEXT_TOPIC = "the price trick that doesn't change the price at all.";

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
          <Shot world={{src: 'v2/world_street.jpg', dir: 'r', at: 0.2}} from={0} to={b('sysStart')}>
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
          <Shot world={{src: 'v2/world_clothes.jpg', dir: 'l', at: 0.3}} from={b('sysStart')} to={b('next')} trans="wipe">
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
          <Shot world={{src: 'v2/world_mall.jpg', dir: 'l', at: 0.7}} from={b('next')} to={len} trans="whip">
            <Scene palette="peri" dur={len - b('next')}>
              <LeoBadge head="head_happy.png" at={0} x={240} y={230} size={420} />
              <PopIn at={r('nextPill', 'next')} style={{left: 120, top: 700}}><Pill text="Next time:" bg="#FF6B6B" size={44} /></PopIn>
              <PopIn at={r('nextPill', 'next') + 10} style={{left: 120, top: 790}}><Pill text={NEXT_TOPIC} bg="#FF6B6B" size={34} /></PopIn>
              <PopIn at={r('subscribe', 'next')} style={{left: 120, top: 900}}><Pill text="Subscribe so you don't miss it." bg="#FFD23F" color="#191411" size={36} /></PopIn>
            </Scene>
            <Disclaimer />
            <Sfx name="whoosh" at={0} /><Sfx name="pop" at={r('nextPill', 'next')} /><Sfx name="pop" at={r('subscribe', 'next')} />
          </Shot>
        </>
      );
    }}
  </ChapterShell>
);
