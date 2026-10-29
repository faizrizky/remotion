import React from 'react';
import {CountUp, KeyTag, Pill, PopIn, SANS, Scene} from '../../style/style_kit';
import {ChapterShell} from '../ChapterShell';
import {Disclaimer, INK, LeoBadge, Punch, Sfx, Shot} from '../v2kit';

/** Change this once the next topic is decided (must match the narration). */
export const NEXT_TOPIC = 'Next video: coming soon';

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
    {(b, len) => (
      <>
        {/* A: the one number */}
        <Shot from={0} to={b('next')}>
          <Scene palette="space" dur={b('next')} stars>
            <Punch text="The ONE number" at={0} y={40} size={90} />
            <Tally at={b('hereItIs')} totalAt={b('realBill')} />
            <PopIn at={b('realBill')} style={{left: 1400, top: 640}}><Pill text="your real bill" bg="#FF6B6B" size={44} /></PopIn>
            <KeyTag text="add it up today" at={b('addUp')} style={{position: 'absolute', left: 120, top: 820}} size={64} />
            <LeoBadge head="head_suspicious.png" at={b('system')} x={120} y={300} size={340} />
          </Scene>
          <Disclaimer />
          <Sfx name="pop" at={0} /><Sfx name="pop" at={b('hereItIs')} /><Sfx name="kaching" at={b('realBill') + 20} /><Sfx name="pop" at={b('addUp')} /><Sfx name="pop" at={b('system')} />
        </Shot>

        {/* B: next video + subscribe. Keep x 1100-1790, y 230-930 EMPTY for the end screen. */}
        <Shot from={b('next')} to={len} trans="whip">
          <Scene palette="indigo" dur={len - b('next')}>
            <LeoBadge head="head_happy.png" at={0} x={240} y={230} size={420} />
            <PopIn at={6} style={{left: 120, top: 720}}><Pill text={NEXT_TOPIC} bg="#FF6B6B" size={40} /></PopIn>
            <PopIn at={b('subscribe') - b('next')} style={{left: 120, top: 840}}><Pill text="Subscribe. See you there!" bg="#FFD23F" color="#191411" size={40} /></PopIn>
          </Scene>
          <Sfx name="whoosh" at={0} /><Sfx name="pop" at={6} />
        </Shot>
      </>
    )}
  </ChapterShell>
);
