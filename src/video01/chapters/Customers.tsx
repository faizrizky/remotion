import React from 'react';
import {Pill, PopIn, Scene} from '../../style/style_kit';
import {INK, Person, Prop, Punch, Sfx, Shot} from '../../video02/v2kit';
import {Chip} from '../../video02/paper';
import {ChapterShell1, Shadow, Tag} from '../v1kit';

export const Customers: React.FC = () => (
  <ChapterShell1 id="cust">
    {(b, len) => {
      const rel = (s: string) => (k: string) => b(k) - b(s);
      const a = rel('three'), f = rel('first'), s = rel('second'), t = rel('third'), z = rel('balance');
      return (
        <>
          {/* A: three doors */}
          <Shot from={0} to={b('first')}>
            <Scene palette="sky" dur={b('first')}>
              <Punch text="Three kinds of customers" at={a('three')} y={70} size={96} />
              <PopIn at={a('three') + 6} style={{left: 360, top: 260}}><Prop name="v1/door_blue.png" h={620} /></PopIn>
              <PopIn at={a('three') + 14} style={{left: 820, top: 260}}><Prop name="v1/door_yellow.png" h={620} /></PopIn>
              <PopIn at={a('three') + 22} style={{left: 1280, top: 260}}><Prop name="v1/door_coral_open.png" h={620} /></PopIn>
              <Shadow cx={544} y={880} w={380} at={a('three') + 6} /><Shadow cx={1010} y={880} w={380} at={a('three') + 14} /><Shadow cx={1530} y={880} w={460} at={a('three') + 22} />
            </Scene>
            <Sfx name="pop" at={a('three')} /><Sfx name="pop" at={a('three') + 6} /><Sfx name="pop" at={a('three') + 14} /><Sfx name="pop" at={a('three') + 22} />
          </Shot>

          {/* B: door 1 - pays in full */}
          <Shot from={b('first')} to={b('second')} trans="whip">
            <Scene palette="mint" dur={b('second') - b('first')}>
              <PopIn at={0} style={{left: 130, top: 270}}><Prop name="v1/door_blue.png" h={600} /></PopIn>
              <PopIn at={6} style={{left: 560, top: 440}}><Person color="#2E86AB" h={300} /></PopIn>
              <PopIn at={f('full') - 6} style={{left: 560, top: 150}}><Pill text="Pays in full" bg="#2E86AB" size={56} /></PopIn>
              <Chip text="bank earns swipe fees" kind="label" at={f('swipe')} x={900} y={300} size={44} />
              <Chip text="but pays out rewards" kind="warn" at={f('rewards')} x={900} y={400} size={44} />
              <PopIn at={f('insiders')} style={{left: 1100, top: 520}}><Prop name="v1/label_deadbeats.png" w={560} /></PopIn>
              <Chip text="no interest paid" kind="label" at={f('noInt')} x={1000} y={900} size={44} />
              <Shadow cx={314} y={870} w={380} />
            </Scene>
            <Sfx name="whoosh" at={0} /><Sfx name="pop" at={f('full') - 6} /><Sfx name="pop" at={f('swipe')} /><Sfx name="pop" at={f('rewards')} /><Sfx name="pop" at={f('insiders')} /><Sfx name="pop" at={f('noInt')} />
          </Shot>

          {/* C: door 2 - steady, most profitable */}
          <Shot from={b('second')} to={b('third')} trans="ink" seed="cu2">
            <Scene palette="sunrise" dur={b('third') - b('second')}>
              <PopIn at={0} style={{left: 130, top: 270}}><Prop name="v1/door_yellow.png" h={600} /></PopIn>
              <PopIn at={6} style={{left: 560, top: 440}}><Person color="#E8A33D" h={300} /></PopIn>
              <PopIn at={s('steady') - 4} style={{left: 560, top: 150}}><Pill text="Pays steadily" bg="#C07A10" size={56} /></PopIn>
              <PopIn at={s('profit')} style={{left: 960, top: 220}}><Prop name="v1/icon_star.png" h={240} /></PopIn>
              <Chip text="most profitable customer" kind="warn" at={s('profit')} x={900} y={500} size={50} />
              <PopIn at={s('monthly')} style={{left: 1200, top: 620}}><Prop name="v1/calendar_loop.png" h={300} /></PopIn>
              <Chip text="interest every month, for years" kind="label" at={s('years')} x={850} y={930} size={44} />
              <Shadow cx={314} y={870} w={380} />
            </Scene>
            <Sfx name="whoosh" at={0} /><Sfx name="pop" at={s('steady') - 4} /><Sfx name="kaching" at={s('profit')} /><Sfx name="pop" at={s('monthly')} /><Sfx name="pop" at={s('years')} />
          </Shot>

          {/* D: door 3 - falling behind */}
          <Shot from={b('third')} to={b('balance')} trans="wipe">
            <Scene palette="rose" dur={b('balance') - b('third')}>
              <PopIn at={0} style={{left: 130, top: 270}}><Prop name="v1/door_coral_open.png" h={600} /></PopIn>
              <PopIn at={6} style={{left: 700, top: 440}}><Person color="#D9506E" h={300} /></PopIn>
              <PopIn at={4} style={{left: 700, top: 150}}><Pill text="Falling behind" bg="#B93A56" size={56} /></PopIn>
              <Chip text="pays the most in fees" kind="warn" at={t('fees')} x={1000} y={260} size={46} />
              <Chip text="but the riskiest" kind="label" at={t('risky')} x={1000} y={370} size={46} />
              <PopIn at={t('stop')} style={{left: 1100, top: 480}}><Prop name="v1/chain_broken.png" h={380} /></PopIn>
              <Chip text="if they stop paying, the bank loses" kind="warn" at={t('stop')} x={900} y={900} size={42} />
              <Shadow cx={384} y={870} w={460} />
            </Scene>
            <Sfx name="whoosh" at={0} /><Sfx name="pop" at={4} /><Sfx name="pop" at={t('fees')} /><Sfx name="pop" at={t('risky')} /><Sfx name="card_tap" at={t('stop')} />
          </Shot>

          {/* E: balancing act */}
          <Shot from={b('balance')} to={len} trans="zoom">
            <Scene palette="lilac" dur={len - b('balance')}>
              <PopIn at={0} style={{left: 520, top: 480}}><Prop name="v1/seesaw.png" w={900} /></PopIn>
              <PopIn at={4} style={{left: 360, top: 280}}><Prop name="v1/door_blue.png" h={240} /></PopIn>
              <PopIn at={10} style={{left: 880, top: 230}}><Prop name="v1/door_yellow.png" h={240} /></PopIn>
              <PopIn at={16} style={{left: 1280, top: 280}}><Prop name="v1/door_coral_open.png" h={240} /></PopIn>
              <Punch text="a balancing act" at={z('act')} y={780} size={100} />
              <Tag text="three doors" at={z('doors')} x={800} y={940} size={44} bg="#FFD23F" color={INK} />
            </Scene>
            <Sfx name="whoosh" at={0} /><Sfx name="pop" at={4} /><Sfx name="pop" at={10} /><Sfx name="pop" at={16} /><Sfx name="pop" at={z('act')} />
          </Shot>
        </>
      );
    }}
  </ChapterShell1>
);
