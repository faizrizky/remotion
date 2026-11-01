import React from 'react';
import {KeyTag, Pill, PopIn, Scene, StickyNote} from '../../style/style_kit';
import {ChapterShell} from '../ChapterShell';
import {BeforeAfter, Chip, Embers} from '../paper';
import {RulerTimeline} from '../paper';
import {sec, DashArrow, PayCircle, PercentGrid, PriceTag, Prop, Sfx, Shot, Src, StatCard, Char, PAN_FRAMES} from '../v2kit';

export const Ch1: React.FC = () => (
  <ChapterShell id="ch1">
    {(b, len) => (
      <>
        {/* A: how it works */}
        <Shot exitPan="l" world={{src: 'v2/world_clothes.jpg', dir: 'r', at: 0.2}} from={0} to={b('plan')}>
          <Scene palette="mint" dur={b('plan')}>
            <BeforeAfter swapAt={b('split') + 6} before={<PriceTag text="$120" at={0} x={120} y={330} />} after={<PriceTag text="4 x $30" at={-60} x={120} y={330} color="#2E9E8F" />} />
            <DashArrow x0={620} y0={420} x1={790} y1={420} at={b('split')} />
            <PayCircle amount="$30" label="Today" at={b('split') + 4} x={920} y={420} paid={false} />
            <PayCircle amount="$30" label="2 wks" at={b('every2wk')} x={1150} y={420} />
            <PayCircle amount="$30" label="4 wks" at={b('every2wk') + 5} x={1380} y={420} />
            <PayCircle amount="$30" label="6 wks" at={b('every2wk') + 10} x={1610} y={420} />
            <RulerTimeline x={880} y={745} w={900} at={b('split') + 4} arrow marks={[
              {x: 105, at: b('split') + 4}, {x: 335, at: b('every2wk')}, {x: 565, at: b('every2wk') + 5}, {x: 795, at: b('every2wk') + 10, tall: true},
            ]} />
            <KeyTag text="due today" at={b('dueToday')} style={{position: 'absolute', left: 840, top: 600}} size={48} />
          </Scene>
          <Sfx name="pop" at={b('split') + 4} /><Sfx name="pop" at={b('every2wk')} /><Sfx name="pop" at={b('every2wk') + 5} /><Sfx name="pop" at={b('every2wk') + 10} />
          <Sfx name="notify" at={b('dueToday')} />
        </Shot>

        {/* A2: no interest, and it's everywhere */}
        <Shot world={{src: 'v2/world_kitchen.jpg', dir: 'l', at: 0.6}} from={b('plan')} to={b('fedStart')} trans="carry" pan="l" carry={{from: [920, 420], to: [1500, 560]}}>
          <Scene palette="sunrise" dur={b('fedStart') - b('plan')}>
            <Char name="v2/char_shopper_happy.png" at={0} x={110} y={400} h={520} />
            <Chip text="the classic pay-in-full plan" kind="label" at={sec(0.4)} x={640} y={230} size={46} />
            <PopIn at={b('noInterest') - b('plan')} style={{left: 700, top: 400}}><Pill text="0% interest" bg="#2E9E8F" size={96} /></PopIn>
            {[0, 1, 2].map((i) => (
              <PopIn key={i} at={b('everywhere') - b('plan') + i * 7} style={{left: 760 + i * 330, top: 640}}><Prop name="v2/obj_store.png" h={260} /></PopIn>
            ))}
            <PopIn at={b('everywhere') - b('plan')} style={{left: 700, top: 905}}><Pill text="...and it's everywhere" bg="#FF6B9A" size={48} /></PopIn>
          </Scene>
          <Sfx name="whoosh" at={0} /><Sfx name="pop" at={b('noInterest') - b('plan')} />
          {[0, 1, 2].map((i) => <Sfx key={i} name="pop" at={b('everywhere') - b('plan') + i * 7} />)}
        </Shot>

        {/* B: Fed 16% */}
        <Shot world={{src: 'v2/world_bank.jpg', dir: 'l', at: 0.7}} from={b('fedStart')} to={b('survey47')} trans="ink" seed="c1b">
          <Scene palette="teal" dur={b('survey47') - b('fedStart')}>
            <PopIn at={0} style={{left: 150, top: 400}}><Prop name="bld_fed_g19_transparent.png" w={740} /></PopIn>
            <PopIn at={sec(0.3)} style={{left: 980, top: 180}}><Pill text="In 2025..." bg="#2B1230" size={56} /></PopIn>
            <StatCard to={16} label="of US adults used it in 2025" at={b('fed16') - b('fedStart')} x={980} y={300} w={640} />
          </Scene>
          <Src text="Federal Reserve, Economic Well-Being of U.S. Households (2025 data)" at={b('fedSrc') - b('fedStart')} />
          <Sfx name="whoosh" at={0} /><Sfx name="ding" at={b('fed16') - b('fedStart')} />
        </Shot>

        {/* C: 47% tried it */}
        <Shot exitPan="d" world={{src: 'v2/world_mall.jpg', dir: 'u', at: 0.45}} from={b('survey47')} to={b('popular')} trans="wipe">
          <Scene palette="peri" dur={b('popular') - b('survey47')}>
            <Embers n={16} color="#FFB703" seed={4} />
            <PopIn at={sec(0.4)} style={{left: 980, top: 150}}><Pill text="A March 2026 survey..." bg="#2B1230" size={50} /></PopIn>
            <PercentGrid n={47} at={b('s47') - b('survey47') + 6} x={250} y={290} on="#FFB703" />
            <StatCard to={47} label="have tried it at least once" at={b('s47') - b('survey47')} x={980} y={300} w={640} />
          </Scene>
          <Src text="LendingTree survey, March 2026" at={b('s47') - b('survey47')} />
          <Sfx name="whoosh" at={0} /><Sfx name="ding" at={b('s47') - b('survey47')} />
        </Shot>

        {/* D: popular, free, smart... hold that thought */}
        <Shot exitPan="r" world={{src: 'v2/world_street.jpg', dir: 'd', at: 0.8}} from={b('popular')} to={len - PAN_FRAMES} trans="carry" pan="d" carry={{from: [1300, 420], to: [1150, 330], label: '47%'}}>
          <Scene palette="sunrise" dur={len - b('popular')}>
            <Char name="v2/char_shopper_thinking.png" at={sec(0.6)} x={1560} y={330} h={600} />
            <PopIn at={b('pPopular') - b('popular')} style={{left: 300, top: 260}}><Pill text="Popular" bg="#2E86AB" size={64} /></PopIn>
            <PopIn at={b('pFree') - b('popular')} style={{left: 300, top: 420}}><Pill text="Free" bg="#E4572E" size={64} /></PopIn>
            <PopIn at={b('pSmart') - b('popular')} style={{left: 300, top: 580}}><Pill text="Smart?" bg="#3A8D5C" size={64} /></PopIn>
            <StickyNote text="Hold that thought..." at={b('hold') - b('popular')} style={{left: 700, top: 420}} size={60} />
          </Scene>
          <Sfx name="whoosh" at={0} /><Sfx name="pop" at={b('pPopular') - b('popular')} /><Sfx name="pop" at={b('pFree') - b('popular')} /><Sfx name="pop" at={b('pSmart') - b('popular')} /><Sfx name="pop" at={b('hold') - b('popular')} />
        </Shot>
      </>
    )}
  </ChapterShell>
);
