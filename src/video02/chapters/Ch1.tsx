import React from 'react';
import {KeyTag, Pill, PopIn, Scene, StickyNote} from '../../style/style_kit';
import {ChapterShell} from '../ChapterShell';
import {MascotCorner, Embers} from '../paper';
import {RulerTimeline} from '../paper';
import {sec, DashArrow, PayCircle, PercentGrid, PriceTag, Prop, Sfx, Shot, Src, StatCard, Bg, Char} from '../v2kit';

export const Ch1: React.FC = () => (
  <ChapterShell id="ch1">
    {(b, len) => (
      <>
        {/* A: how it works */}
        <Shot from={0} to={b('everywhere')}>
          <Scene palette="mint" dur={b('everywhere')}>
            <PriceTag text="$120" at={0} x={120} y={330} />
            <DashArrow x0={620} y0={420} x1={790} y1={420} at={b('split')} />
            <PayCircle amount="$30" label="Today" at={b('split') + 4} x={920} y={420} paid={false} />
            <PayCircle amount="$30" label="2 wks" at={b('every2wk')} x={1150} y={420} />
            <PayCircle amount="$30" label="4 wks" at={b('every2wk') + 5} x={1380} y={420} />
            <PayCircle amount="$30" label="6 wks" at={b('every2wk') + 10} x={1610} y={420} />
            <RulerTimeline x={880} y={745} w={900} at={b('split') + 4} arrow marks={[
              {x: 105, at: b('split') + 4}, {x: 335, at: b('every2wk')}, {x: 565, at: b('every2wk') + 5}, {x: 795, at: b('every2wk') + 10, tall: true},
            ]} />
            <MascotCorner head="head_happy.png" at={b('noInterest')} x={120} y={680} size={200} />
            <KeyTag text="due today" at={b('dueToday')} style={{position: 'absolute', left: 840, top: 600}} size={48} />
            <PopIn at={b('noInterest')} style={{left: 1130, top: 640}}><Pill text="0% interest" bg="#2E9E8F" size={56} /></PopIn>
          </Scene>
          <Sfx name="pop" at={b('split') + 4} /><Sfx name="pop" at={b('every2wk')} /><Sfx name="pop" at={b('every2wk') + 5} /><Sfx name="pop" at={b('every2wk') + 10} />
          <Sfx name="pop" at={b('dueToday')} /><Sfx name="pop" at={b('noInterest')} />
        </Shot>

        {/* B: Fed 16% */}
        <Shot from={b('everywhere')} to={b('survey47')} trans="ink" seed="c1b">
          <Scene palette="teal" dur={b('survey47') - b('everywhere')}>
            <PopIn at={0} style={{left: 150, top: 400}}><Prop name="bld_fed_g19_transparent.png" w={740} /></PopIn>
            <StatCard to={16} label="of US adults used it in 2025" at={b('fed16') - b('everywhere')} x={980} y={300} w={640} />
          </Scene>
          <Src text="Federal Reserve, Economic Well-Being of U.S. Households (2025 data)" at={b('fed16') - b('everywhere')} />
          <Sfx name="whoosh" at={0} /><Sfx name="pop" at={b('fed16') - b('everywhere')} />
        </Shot>

        {/* C: 47% tried it */}
        <Shot from={b('survey47')} to={b('popular')} trans="wipe">
          <Scene palette="indigo" dur={b('popular') - b('survey47')}>
            <Embers n={16} color="#FFB703" seed={4} />
            <PercentGrid n={47} at={6} x={250} y={290} on="#FFB703" />
            <StatCard to={47} label="have tried it at least once" at={4} x={980} y={300} w={640} />
          </Scene>
          <Src text="LendingTree survey of 2,049 US adults, March 2026" at={4} />
          <Sfx name="whoosh" at={0} /><Sfx name="pop" at={4} />
        </Shot>

        {/* D: popular, free, smart... hold that thought */}
        <Shot from={b('popular')} to={len} trans="whip">
          <Scene palette="sunrise" dur={len - b('popular')}>
            <Bg name="v2/bg_street.jpg" dim={0.15} />
            <Char name="v2/char_shopper_thinking.png" at={sec(0.6)} x={1560} y={330} h={600} />
            <PopIn at={0} style={{left: 300, top: 260}}><Pill text="Popular" bg="#2E86AB" size={64} /></PopIn>
            <PopIn at={sec(1.2)} style={{left: 300, top: 420}}><Pill text="Free" bg="#E4572E" size={64} /></PopIn>
            <PopIn at={sec(2.4)} style={{left: 300, top: 580}}><Pill text="Smart?" bg="#3A8D5C" size={64} /></PopIn>
            <StickyNote text="Hold that thought..." at={b('hold') - b('popular')} style={{left: 1100, top: 420}} size={64} />
          </Scene>
          <Sfx name="whoosh" at={0} /><Sfx name="pop" at={0} /><Sfx name="pop" at={sec(1.2)} /><Sfx name="pop" at={sec(2.4)} /><Sfx name="pop" at={b('hold') - b('popular')} />
        </Shot>
      </>
    )}
  </ChapterShell>
);
