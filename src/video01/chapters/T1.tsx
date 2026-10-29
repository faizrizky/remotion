import React from 'react';
import {Bubble, PopIn, Scene} from '../../style/style_kit';
import {Bg, CoinFly, DashArrow, LeoBadge, PercentGrid, PriceTag, Prop, Punch, Src, Sfx, Shot, StatCard} from '../../video02/v2kit';
import {Chip} from '../../video02/paper';
import {ChapterShell1, Fly, LeoFull, Ripple, Shadow, Tag} from '../v1kit';

export const T1: React.FC = () => (
  <ChapterShell1 id="t1">
    {(b, len) => {
      const rel = (s: string) => (k: string) => b(k) - b(s);
      const a2 = rel('fee'), a3 = rel('pct'), a4 = rel('multiply'), s1 = rel('b198'), s2 = rel('b66'), s3 = rel('pct11'), c = rel('who');
      return (
        <>
          {/* A1: follow the $5 */}
          <Shot from={0} to={b('fee')}>
            <Scene palette="sky" dur={b('fee')}>
              <Bg name="v1/bg_street.jpg" wash={0.25} />
              <PopIn at={0} style={{left: 150, top: 520}}><Prop name="v1/coffee.png" h={330} /></PopIn>
              <PriceTag text="$5.00" at={4} x={120} y={380} color="#FFD23F" size={96} />
              <PopIn at={b('tap') - 10} style={{left: 790, top: 520}}><Prop name="v1/terminal.png" h={360} /></PopIn>
              <Fly at={b('tap') - 14} x0={470} y0={740} x1={960} y1={650} dur={14} arc={80} spin={-18} hold={false}><Prop name="v1/card.png" h={170} /></Fly>
              <Ripple at={b('tap')} x={960} y={650} />
              <DashArrow x0={1180} y0={700} x1={1480} y1={700} at={b('notFive')} />
              <PopIn at={b('notFive')} style={{left: 1500, top: 520}}><Prop name="v1/bill.png" w={320} /></PopIn>
              <PriceTag text="$4.85" at={b('little')} x={1480} y={380} color="#8FE3A8" size={96} rot={5} />
              <Punch text="Let's follow that $5" at={4} y={60} size={90} />
            </Scene>
            <Sfx name="pop" at={0} /><Sfx name="card_tap" at={b('tap')} /><Sfx name="pop" at={b('notFive')} /><Sfx name="pop" at={b('little')} />
          </Shot>

          {/* A2: swipe fee + interchange */}
          <Shot from={b('fee')} to={b('pct')} trans="ink" seed="t1a">
            <Scene palette="mint" dur={b('pct') - b('fee')}>
              <PopIn at={0} style={{left: 160, top: 480}}><Prop name="v1/terminal.png" h={380} /></PopIn>
              <PopIn at={a2('issuer')} style={{left: 1280, top: 440}}><Prop name="obj_bank_transparent.png" h={380} /></PopIn>
              <Chip text="SWIPE FEE" kind="warn" at={a2('swipe')} x={420} y={150} size={80} rot={-3} />
              <Chip text="INTERCHANGE" kind="label" at={a2('interchange')} x={660} y={290} size={80} rot={2} />
              <DashArrow x0={620} y0={660} x1={1260} y1={660} at={a2('issuer')} />
              <CoinFly at={a2('issuer') + 8} x0={620} y0={660} x1={1260} y1={660} label="¢" />
              <CoinFly at={a2('issuer') + 20} x0={620} y0={660} x1={1260} y1={660} label="¢" />
              <Tag text="The bank that issued your card" at={a2('bank')} x={1030} y={900} size={40} />
            </Scene>
            <Sfx name="whoosh" at={0} /><Sfx name="pop" at={a2('swipe')} /><Sfx name="pop" at={a2('interchange')} /><Sfx name="kaching" at={a2('issuer') + 10} />
          </Shot>

          {/* A3: 2-3% = 10-15 cents */}
          <Shot from={b('pct')} to={b('multiply')} trans="whip">
            <Scene palette="sunrise" dur={b('multiply') - b('pct')}>
              <PopIn at={0} style={{left: 170, top: 300}}><Prop name="v1/card_coral.png" h={260} /></PopIn>
              <PriceTag text="2–3%" at={a3('two') } x={520} y={260} color="#FF6B6B" size={170} />
              <PopIn at={a3('ofPurchase')} style={{left: 870, top: 330}}><Prop name="v1/badge_percent.png" h={170} /></PopIn>
              <PopIn at={a3('coffee')} style={{left: 250, top: 600}}><Prop name="v1/coffee.png" h={300} /></PopIn>
              <DashArrow x0={520} y0={760} x1={820} y1={760} at={a3('coffee') + 4} />
              <PriceTag text="10–15¢" at={a3('cents')} x={850} y={640} color="#FFD23F" size={140} rot={3} />
              <Bubble text="Tiny, right?" at={a3('tiny')} tail="right" style={{left: 1180, top: 130}} size={60} />
              <LeoBadge head="head_suspicious.png" at={a3('tiny')} x={1400} y={420} size={340} />
            </Scene>
            <Sfx name="whoosh" at={0} /><Sfx name="pop" at={a3('two')} /><Sfx name="pop" at={a3('cents')} /><Sfx name="pop" at={a3('tiny')} />
          </Shot>

          {/* A4: multiply it */}
          <Shot from={b('multiply')} to={b('b198')} trans="wipe">
            <Scene palette="teal" dur={b('b198') - b('multiply')}>
              <Punch text="Now multiply it" at={0} y={50} size={80} />
              <Punch text="× every card" at={a4('everyCard')} y={200} size={110} />
              <Punch text="× every purchase" at={a4('everyBuy')} y={350} size={110} />
              <Punch text="× every day" at={a4('everyDay')} y={500} size={110} />
              <PopIn at={a4('everyCard')} style={{left: 160, top: 740}}><Prop name="v1/coin.png" h={160} /></PopIn>
              <PopIn at={a4('everyBuy')} style={{left: 560, top: 680}}><Prop name="v1/coin_dollar.png" h={220} /></PopIn>
              <PopIn at={a4('everyDay')} style={{left: 1100, top: 520}}><Prop name="v1/coinstack_giant.png" h={470} /></PopIn>
            </Scene>
            <Sfx name="pop" at={a4('everyCard')} /><Sfx name="pop" at={a4('everyBuy')} /><Sfx name="kaching" at={a4('everyDay')} />
          </Shot>

          {/* B1: $198B */}
          <Shot from={b('b198')} to={b('b66')} trans="ink" seed="t1b">
            <Scene palette="peri" dur={b('b66') - b('b198')}>
              <StatCard prefix="$" to={198} suffix="B" label="card swipe fees, 2025" at={s1('n198') - 20} x={170} y={300} w={640} bg="#FFF4E0" />
              <PopIn at={0} style={{left: 1200, top: 150}}><Prop name="v1/bld_nilson.png" h={620} /></PopIn>
              <Chip text="a record" kind="warn" at={s1('n198') + 10} x={290} y={680} size={64} />
              <Src text="Nilson Report" at={s1('nilson')} />
            </Scene>
            <Sfx name="whoosh" at={0} /><Sfx name="kaching" at={s1('n198') - 20} />
          </Shot>

          {/* B2: $66B */}
          <Shot from={b('b66')} to={b('pct11')} trans="whip">
            <Scene palette="sky" dur={b('pct11') - b('b66')}>
              <StatCard prefix="$" to={66} suffix="B" label="interchange kept by US banks" at={s2('n66') - 20} x={170} y={300} w={700} bg="#FFF4E0" />
              <PopIn at={0} style={{left: 1010, top: 330}}><Prop name="v1/bld_stlouisfed.png" w={720} /></PopIn>
              <Src text="Federal Reserve Bank of St. Louis" at={s2('fed')} />
            </Scene>
            <Sfx name="whoosh" at={0} /><Sfx name="kaching" at={s2('n66') - 20} />
          </Shot>

          {/* B3: 11% */}
          <Shot from={b('pct11')} to={b('who')} trans="wipe">
            <Scene palette="lilac" dur={b('who') - b('pct11')}>
              <StatCard to={11} label="of banks' non-interest income" at={4} x={170} y={300} w={640} bg="#FFF4E0" />
              <PercentGrid n={11} at={10} x={980} y={300} dot={44} gap={16} />
              <Punch text="from tiny fees" at={s3('pct11') + 40} y={760} size={90} />
            </Scene>
            <Sfx name="whoosh" at={0} /><Sfx name="pop" at={4} />
          </Shot>

          {/* C: who pays? cash customers too */}
          <Shot from={b('who')} to={len} trans="zoom">
            <Scene palette="sunrise" dur={len - b('who')}>
              <Bg name="v1/bg_cafe.jpg" wash={0.25} />
              <Shadow cx={290} y={960} w={360} />
              <LeoFull heads={[{at: 0, head: 'head_thinking.png'}, {at: c('cash'), head: 'head_suspicious.png'}]} x={90} y={200} h={760} />
              <Bubble text="Who really pays?" at={4} tail="left" style={{left: 520, top: 140}} size={56} />
              <PopIn at={c('builds')} style={{left: 1020, top: 560}}><Prop name="v1/coffee.png" h={300} /></PopIn>
              <PriceTag text="$5.00" at={c('tag1')} x={1000} y={450} color="#FFD23F" size={80} />
              <PriceTag text="$5.15" at={c('tag2')} x={1220} y={450} color="#FFB347" size={80} rot={4} />
              <PriceTag text="$5.30" at={c('tag3')} x={1440} y={450} color="#FF8A5C" size={80} rot={-4} />
              <PopIn at={c('cash')} style={{left: 1300, top: 620}}><Prop name="v1/bill.png" w={420} /></PopIn>
              <Tag text="even cash pays for it" at={c('cashTag')} x={1160} y={800} bg="#FFFFFF" size={44} />
            </Scene>
            <Sfx name="whoosh" at={0} /><Sfx name="pop" at={c('builds')} /><Sfx name="pop" at={c('tag1')} /><Sfx name="pop" at={c('tag2')} /><Sfx name="pop" at={c('tag3')} /><Sfx name="kaching" at={c('cash')} /><Sfx name="pop" at={c('cashTag')} />
          </Shot>
        </>
      );
    }}
  </ChapterShell1>
);
