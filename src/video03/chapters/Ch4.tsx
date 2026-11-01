import React from 'react';
import {Bubble, KeyTag, Pill, PopIn} from '../../style/style_kit';
import {Chip} from '../../video02/paper';
import {ChapterShell} from '../ChapterShell';
import {CH3_TOWELS} from './Ch3';
import {BigNum, Centered, CheckRow, DashArrow, HBars, InfoCard, LeoBadge, P, Prop, Sfx, Shots, Src, WordSwipe} from '../v3kit';

const GAO = 'U.S. GAO, GAO-25-107451 (July 31, 2025)';
/** Cereal box in the last shot; Ch5 catches it (carry, pan left). */
export const CH4_CEREAL = {x: 1130, y: 700, h: 340};

export const Ch4: React.FC = () => (
  <ChapterShell id="ch4">
    {(b, len, c) => (
      <Shots b={b} len={len} c={c} src="v3/world_library.jpg" x0={260} exitPan="l" list={[
        // 1: the honest part: for the economy, shrinkflation is tiny  (paper towels land on the table)
        {trans: 'join', pan: 'r', carry: {from: [CH3_TOWELS.x, CH3_TOWELS.y], to: [CH3_TOWELS.x, CH3_TOWELS.y], src: 'v3/obj_paper_towels.png', h: CH3_TOWELS.h, handoff: true}, body: (r) => (
          <>
            <Centered x={CH3_TOWELS.x} y={CH3_TOWELS.y}><Prop name="v3/obj_paper_towels.png" h={CH3_TOWELS.h} /></Centered>
            <PopIn at={r('honest') + 20} style={{left: 170, top: 250}}><Pill text="here's the honest part" bg="#2B1230" size={56} /></PopIn>
            <InfoCard title="For the economy as a whole..." at={r('economy')} x={170} y={400} w={900} size={54} />
            <WordSwipe text="it's tiny." at={r('tiny')} x={240} y={600} size={150} />
            <Sfx name="whoosh" at={0} /><Sfx name="pop" at={r('honest') + 20} /><Sfx name="pop" at={r('economy')} /><Sfx name="pop" at={r('tiny')} />
          </>
        )},
        // 2: in 2025 the GAO looked at prices from 2019 to 2024
        {body: (r) => (
          <>
            <P name="v3/obj_gov_building.png" x={150} y={360} h={470} at={4} />
            <InfoCard title="U.S. Government Accountability Office" sub="report, July 2025" at={r('gao')} x={860} y={280} w={880} size={48} />
            <Chip text="2019" kind="time" at={r('years')} x={880} y={590} size={64} />
            <DashArrow x0={1080} y0={630} x1={1380} y1={630} at={r('years') + 6} />
            <Chip text="2024" kind="time" at={r('years') + 14} x={1410} y={590} size={64} />
            <Src text={GAO} at={r('gao')} />
            <Sfx name="pop" at={4} /><Sfx name="pop" at={r('gao')} /><Sfx name="pop" at={r('years')} /><Sfx name="pop" at={r('years') + 14} />
          </>
        )},
        // 3: prices rose about 34.5%
        {body: (r) => (
          <>
            <HBars x={190} y={330} w={1150} max={34.5} barH={120} rows={[
              {label: 'All prices, 2019 to 2024', value: 34.5, show: '+34.5%', color: '#FF9F43', at: r('p345') - 10},
            ]} />
            <Src text={GAO} />
            <Sfx name="pop" at={r('p345') - 10} /><Sfx name="ding" at={r('p345') + 10} />
          </>
        )},
        // 4: shrinking packages added less than a tenth of one percentage point
        {body: (r) => (
          <>
            <HBars x={190} y={300} w={1150} max={34.5} barH={110} rows={[
              {label: 'All prices, 2019 to 2024', value: 34.5, show: '+34.5%', color: '#FF9F43', at: -40},
              {label: 'Part caused by shrinking packages', value: 0.1, show: '< 0.1 point', color: '#7BD389', at: r('tenth') - 8},
            ]} />
            <Src text={GAO} />
            <Sfx name="ding" at={r('tenth') + 8} />
          </>
        )},
        // 5: so no, it's not why everything feels expensive
        {body: (r) => (
          <>
            <LeoBadge head="head_calm.png" at={4} x={170} y={330} size={380} />
            <Chip text="so no..." at={4} x={680} y={270} size={52} />
            <Bubble text="it's not why everything feels expensive" at={r('feels') - 6} tail="left" style={{left: 680, top: 400}} size={58} />
            <Sfx name="pop" at={4} /><Sfx name="pop" at={r('feels') - 6} />
          </>
        )},
        // 6 (ink): but zoom in on your cart: a different story
        {trans: 'ink', body: (r) => (
          <>
            <P name="v2/obj_cart_full.png" x={170} y={360} h={520} at={6} />
            <WordSwipe text="zoom in on your cart" at={10} x={820} y={320} size={110} />
            <PopIn at={r('story')} style={{left: 840, top: 560}}><Pill text="a different story" bg="#E5484D" size={60} /></PopIn>
            <Sfx name="pop" at={6} /><Sfx name="pop" at={10} /><Sfx name="pop" at={r('story')} />
          </>
        )},
        // 7: household paper products (paper towels): +3.0 percentage points
        {body: (r) => (
          <>
            <P name="v3/obj_paper_towels.png" x={170} y={430} h={430} at={4} />
            <InfoCard title="Household paper products" sub="like paper towels" at={r('paper')} x={760} y={250} w={880} size={52} />
            <HBars x={760} y={480} w={700} max={3} rows={[
              {label: 'Inflation added by shrinking packages', value: 3, show: '+3.0 pts', color: '#E5484D', at: r('three')},
            ]} />
            <Src text={GAO} />
            <Sfx name="pop" at={4} /><Sfx name="pop" at={r('paper')} /><Sfx name="ding" at={r('three') + 14} />
          </>
        )},
        // 8: cereal +1.6; and only about 1% of cereal products shrank
        {body: (r) => (
          <>
            <P name="v3/obj_cereal_box.png" x={190} y={400} h={470} at={4} />
            <HBars x={760} y={260} w={700} max={3} gap={46} rows={[
              {label: 'Household paper products', value: 3, show: '+3.0 pts', color: '#E5484D', at: -40},
              {label: 'Cereal', value: 1.6, show: '+1.6 pts', color: '#FF9F43', at: r('c16') - 6},
            ]} />
            <Chip text="in cereal, only about 1% of products shrank" at={r('onePct')} x={760} y={770} size={44} />
            <Src text={GAO} />
            <Sfx name="pop" at={4} /><Sfx name="ding" at={r('c16') + 10} /><Sfx name="pop" at={r('onePct')} />
          </>
        )},
        // 9: 1.1% of items = 8.6% of sales
        {body: (r) => (
          <>
            <BigNum text="1.1%" label="of cereal products shrank" at={-30} x={170} y={300} w={720} />
            <BigNum text="8.6%" label="of cereal sales" at={r('nine') - 6} x={1000} y={300} w={720} color="#E5484D" />
            <KeyTag text="few products, lots of sales" at={r('nine') + 16} style={{left: 600, top: 680}} size={64} />
            <Src text={`${GAO}; cereal, 2021-2023`} />
            <Sfx name="ding" at={r('nine')} /><Sfx name="pop" at={r('nine') + 16} />
          </>
        )},
        // 10: not random items: the things people buy the most  (the cereal box rides on to Ch5)
        {body: (r) => (
          <>
            <CheckRow text="random items" ok={false} at={r('random')} x={170} y={250} />
            <KeyTag text="the things people buy the most" at={r('most')} style={{left: 170, top: 390}} size={66} />
            <P name="v3/obj_toilet_paper_pack.png" x={220} y={560} h={300} at={r('most') + 6} />
            <P name="v3/obj_paper_towels.png" x={600} y={560} h={300} at={r('most') + 11} />
            <Centered at={r('most') + 16} x={CH4_CEREAL.x} y={CH4_CEREAL.y}><Prop name="v3/obj_cereal_box.png" h={CH4_CEREAL.h} /></Centered>
            <Sfx name="pop" at={r('random')} /><Sfx name="pop" at={r('most')} />{[6, 11, 16].map((k) => <Sfx key={k} name="pop" at={r('most') + k} />)}
          </>
        )},
      ]} />
    )}
  </ChapterShell>
);
