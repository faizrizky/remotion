import React from 'react';
import {PopIn, Scene, Sticker, PALETTES} from '../../style/style_kit';
import {Bg, CoinFly, DashArrow, Prop, Punch, Src, Sfx, Shot, StatCard} from '../../video02/v2kit';
import {Chip, Embers} from '../../video02/paper';
import {Bar, ChapterShell1, CountMoney, LeoFull, Shadow, Tag} from '../v1kit';

export const T2: React.FC = () => (
  <ChapterShell1 id="t2">
    {(b, len) => {
      const rel = (s: string) => (k: string) => b(k) - b(s);
      const a1 = rel('quiet'), a2 = rel('full'), bb = rel('carry'), d = rel('leo'), e = rel('zoom');
      return (
        <>
          {/* A1: quiet vs loud */}
          <Shot from={0} to={b('full')}>
            <Scene palette="lilac" dur={b('full')}>
              <Punch text="Swipe fees = the quiet money" at={a1('quiet')} y={130} size={92} />
              <Punch text="Interest = the LOUD money" at={a1('loud')} y={400} size={120} color="#D9304E" />
              <Embers n={26} color="#FF7A3D" seed={5} />
              <PopIn at={a1('loud')} style={{left: 760, top: 650}}><Prop name="v1/coin_pipe.png" h={300} /></PopIn>
            </Scene>
            <Sfx name="pop" at={a1('quiet')} /><Sfx name="kaching" at={a1('loud')} />
          </Shot>

          {/* A2: card -> due date -> interest -> bank */}
          <Shot from={b('full')} to={b('carry')} trans="whip">
            <Scene palette="sky" dur={b('carry') - b('full')}>
              <PopIn at={0} style={{left: 130, top: 440}}><Prop name="v1/card_blue.png" h={250} /></PopIn>
              <Chip text="not paid in full" kind="warn" at={a2('due') - 24} x={110} y={330} size={46} />
              <DashArrow x0={470} y0={570} x1={640} y1={570} at={a2('due') - 14} />
              <PopIn at={a2('due') - 10} style={{left: 660, top: 410}}><Prop name="v1/calendar_due.png" h={290} /></PopIn>
              <DashArrow x0={1040} y0={570} x1={1130} y1={570} at={a2('interest') - 10} />
              <PopIn at={a2('interest')} style={{left: 1150, top: 380}}><Prop name="v1/coin_pipe.png" h={320} /></PopIn>
              <PopIn at={a2('interest') + 6} style={{left: 1500, top: 410}}><Prop name="obj_bank_transparent.png" h={300} /></PopIn>
              <Chip text="interest on what's left" kind="label" at={a2('interest')} x={1000} y={250} size={50} />
              <CoinFly at={a2('interest') + 12} x0={1250} y0={560} x1={1580} y1={560} label="$" />
            </Scene>
            <Sfx name="whoosh" at={0} /><Sfx name="pop" at={a2('due') - 24} /><Sfx name="pop" at={a2('due') - 10} /><Sfx name="kaching" at={a2('interest') + 12} />
          </Shot>

          {/* B: 22% */}
          <Shot from={b('carry')} to={b('store')} trans="ink" seed="t2b">
            <Scene palette="peri" dur={b('store') - b('carry')}>
              <StatCard to={22} suffix="%" label="average yearly interest (APR) when you carry a balance" at={bb('apr22') - 20} x={150} y={260} w={700} bg="#FFF4E0" />
              <PopIn at={bb('fed')} style={{left: 960, top: 330}}><Prop name="bld_fed_g19_transparent.png" w={800} /></PopIn>
              <Src text="Federal Reserve (G.19)" at={bb('fed')} />
            </Scene>
            <Sfx name="whoosh" at={0} /><Sfx name="kaching" at={bb('apr22') - 20} /><Sfx name="pop" at={bb('fed')} />
          </Shot>

          {/* C: store cards */}
          <Shot from={b('store')} to={b('leo')} trans="wipe">
            <Scene palette="rose" dur={b('leo') - b('store')}>
              <PopIn at={0} style={{left: 250, top: 330}}><Prop name="v1/card_bag.png" h={420} /></PopIn>
              <Sticker top="Store cards" main="often even higher" at={6} p={PALETTES.rose} style={{left: 820, top: 400}} />
            </Scene>
            <Sfx name="whoosh" at={0} /><Sfx name="pop" at={6} />
          </Shot>

          {/* D: Leo's $5,000 */}
          <Shot from={b('leo')} to={b('zoom')} trans="whip">
            <Scene palette="mint" dur={b('zoom') - b('leo')}>
              <Bg name="v1/bg_cafe.jpg" wash={0.35} />
              <Shadow cx={290} y={960} w={360} />
              <LeoFull heads={[{at: 0, head: 'head_tired.png'}, {at: d('nothing'), head: 'head_shocked.png'}]} x={90} y={200} h={760} />
              <PopIn at={6} style={{left: 650, top: 540}}><Prop name="obj_coinstack_transparent.png" h={340} /></PopIn>
              <Tag text="$5,000 balance" at={8} x={600} y={440} bg="#FFD23F" size={44} />
              <Tag text="all year at 22%" at={d('allYear')} x={600} y={900} size={40} />
              <PopIn at={d('s1100')} style={{left: 1080, top: 380}}><Prop name="v1/faucet.png" h={360} /></PopIn>
              <PopIn at={d('s1100')} style={{left: 1160, top: 760}}><div style={{fontFamily: 'Poppins', fontWeight: 900, fontSize: 110, color: '#D9304E', textShadow: '0 4px 0 #fff', whiteSpace: 'nowrap'}}><CountMoney to={1100} at={d('s1100')} prefix="$" suffix="+" /></div></PopIn>
              <Chip text="buys absolutely nothing" kind="warn" at={d('nothing')} x={1060} y={250} size={54} />
              <CoinFly at={d('s1100') + 8} x0={1250} y0={650} x1={1250} y1={900} label="$" />
            </Scene>
            <Sfx name="whoosh" at={0} /><Sfx name="pop" at={8} /><Sfx name="pop" at={d('allYear')} /><Sfx name="kaching" at={d('s1100')} /><Sfx name="pop" at={d('nothing')} />
          </Shot>

          {/* E: $105B -> $160B, the engine */}
          <Shot from={b('zoom')} to={len} trans="ink" seed="t2e">
            <Scene palette="teal" dur={len - b('zoom')}>
              <PopIn at={0} style={{left: 130, top: 360}}><Prop name="v1/flag_us.png" h={240} /></PopIn>
              <Chip text="interest charged in the US" kind="label" at={e('y2024') - 10} x={110} y={200} size={44} />
              <Bar at={e('b160')} x={940} base={880} h={460} color="#FF6B6B" label="2024" value="$160B" />
              <Bar at={e('b105')} x={560} base={880} h={302} color="#FFD23F" label="2022" value="$105B" />
              <PopIn at={e('engine')} style={{left: 1440, top: 330}}><Prop name="v1/gears.png" h={400} /></PopIn>
              <Punch text="That's the engine." at={e('engine')} y={50} size={100} />
              <Src text="Federal Reserve data" at={e('y2024')} />
            </Scene>
            <Sfx name="whoosh" at={0} /><Sfx name="pop" at={e('y2024')} /><Sfx name="kaching" at={e('b160')} /><Sfx name="kaching" at={e('b105')} /><Sfx name="pop" at={e('engine')} />
          </Shot>
        </>
      );
    }}
  </ChapterShell1>
);
