import React from 'react';
import {DrawCurve, KeyTag, Pill, PopIn, Scene, StickyNote} from '../../style/style_kit';
import {ChapterShell} from '../ChapterShell';
import {Chip, CutawayPan, Embers, HighlightSwipe, MascotCorner} from '../paper';
import {INK, PayCircle, PercentGrid, PriceTag, Prop, Punch, sec, Sfx, Shot, Src, StatCard} from '../v2kit';

export const Ch3: React.FC = () => (
  <ChapterShell id="ch3">
    {(b, len) => {
      const r = (k: string, from: string) => b(k) - b(from);
      return (
        <>
          {/* A: $120 vs $30 */}
          <Shot from={0} to={b('lunch')}>
            <Scene palette="rose" dur={b('lunch')}>
              <PriceTag text="$120" at={0} x={170} y={380} size={150} color="#5B4FFF" />
              <MascotCorner head="head_thinking.png" at={b('brain')} x={850} y={620} size={230} />
              <PopIn at={b('brain')} style={{left: 860, top: 420}}><Pill text="your brain sees" bg="#2B1230" size={44} /></PopIn>
              <PriceTag text="$30" at={b('sees30')} x={1300} y={380} size={170} color="#2FB432" rot={5} />
            </Scene>
            <Sfx name="pop" at={0} /><Sfx name="pop" at={b('brain')} /><Sfx name="pop" at={b('sees30')} />
          </Shot>

          {/* B: lunch vs decision */}
          <Shot from={b('lunch')} to={b('hoodie')} trans="wipe">
            <Scene palette="teal" dur={r('hoodie', 'lunch')}>
              <PopIn at={0} style={{left: 250, top: 250}}><Prop name="v2/obj_lunch.png" h={380} /></PopIn>
              <KeyTag text="$30 = lunch" at={4} style={{position: 'absolute', left: 230, top: 690}} size={72} />
              <PopIn at={r('decision', 'lunch')} style={{left: 1150, top: 250}}><Prop name="v2/obj_scale_decision.png" h={380} /></PopIn>
              <KeyTag text="$120 = a decision" at={r('decision', 'lunch') + 4} style={{position: 'absolute', left: 1060, top: 690}} size={72} />
            </Scene>
            <Sfx name="whoosh" at={0} /><Sfx name="pop" at={0} /><Sfx name="pop" at={r('decision', 'lunch')} />
          </Shot>

          {/* C: the cart fills up, $30 at a time */}
          <Shot from={b('hoodie')} to={b('research')} trans="whip">
            <Scene palette="mint" dur={r('research', 'hoodie')}>
              <PopIn at={0} style={{left: 700, top: 300}}><Prop name="v2/obj_cart_empty.png" h={480} /></PopIn>
              <PopIn at={4} style={{left: 160, top: 300}}><Prop name="v2/obj_hoodie.png" h={300} /></PopIn>
              <Chip text="+ $30 / 2 wks" kind="time" at={10} x={200} y={640} size={44} />
              <PopIn at={r('cap', 'hoodie')} style={{left: 1400, top: 320}}><Prop name="v2/obj_cap.png" h={240} /></PopIn>
              <Chip text="+ $15 / 2 wks" kind="time" at={r('cap', 'hoodie') + 6} x={1400} y={640} size={44} />
              <Punch text="just another small payment" at={r('smallPay', 'hoodie')} color={INK} y={110} size={84} />
            </Scene>
            <Sfx name="whoosh" at={0} /><Sfx name="pop" at={4} /><Sfx name="pop" at={r('cap', 'hoodie')} /><Sfx name="pop" at={r('smallPay', 'hoodie')} />
          </Shot>

          {/* D: research: total spending goes up */}
          <Shot from={b('research')} to={b('survey68')} trans="ink" seed="c3d">
            <Scene palette="sky" dur={r('survey68', 'research')}>
              <PopIn at={0} style={{left: 160, top: 260}}><Prop name="v2/obj_research_paper.png" h={480} /></PopIn>
              <div style={{position: 'absolute', left: 820, top: 230, width: 960, height: 520}}>
                <div style={{position: 'absolute', left: 0, bottom: 0, width: 960, height: 8, background: '#FFF4E0'}} />
                <div style={{position: 'absolute', left: 0, top: 0, width: 8, height: 520, background: '#FFF4E0'}} />
                <DrawCurve d="M 20 480 C 300 470, 480 420, 600 300 S 820 80, 940 40" at={sec(1)} dur={40} w={960} h={520} />
              </div>
              <HighlightSwipe at={r('upNotMove', 'research') + 10} x={910} y={805} w={780} h={78} />
              <KeyTag text="total spending goes UP" at={r('upNotMove', 'research')} style={{position: 'absolute', left: 900, top: 790}} size={60} />
            </Scene>
            <Src text="Di Maggio, Katz & Williams, NBER Working Paper 30508 (2022)" at={0} />
            <Sfx name="whoosh" at={0} /><Sfx name="pop" at={0} /><Sfx name="pop" at={r('upNotMove', 'research')} />
          </Shot>

          {/* E: 68% overspend, 54% regret */}
          <Shot from={b('survey68')} to={b('notTrap')} trans="wipe">
            <Scene palette="peri" dur={r('notTrap', 'survey68')}>
              <PercentGrid n={68} at={6} x={230} y={260} on="#FF6B6B" />
              <StatCard to={68} label="say it makes them overspend" at={4} x={980} y={200} w={680} />
              <StickyNote text="54% regretted a purchase" at={r('regret', 'survey68')} style={{left: 1060, top: 640}} size={58} />
            </Scene>
            <Src text="LendingTree BNPL survey, 2026" at={4} />
            <Sfx name="whoosh" at={0} /><Sfx name="pop" at={4} /><Sfx name="pop" at={r('regret', 'survey68')} />
          </Shot>

          {/* F: the real trap: stacking */}
          <Shot from={b('notTrap')} to={len} trans="whip">
            <Scene palette="lilac" dur={len - b('notTrap')}>
              <Punch text="The real trap?" at={0} y={110} size={110} />
              <CutawayPan at={r('stacking', 'notTrap')} dur={sec(3)} dy={110}>
              <PayCircle amount="$30" label="" at={r('stacking', 'notTrap')} x={960} y={820} size={150} />
              <PayCircle amount="$45" label="" at={r('stacking', 'notTrap') + 5} x={990} y={690} size={150} color="#FF9F1C" />
              <PayCircle amount="$25" label="" at={r('stacking', 'notTrap') + 10} x={940} y={560} size={150} color="#FF6B6B" />
              <PayCircle amount="$60" label="" at={r('stacking', 'notTrap') + 15} x={975} y={430} size={150} color="#5B4FFF" />
              </CutawayPan>
              <Embers n={18} color="#FF6B6B" seed={5} />
            </Scene>
            <Sfx name="whoosh" at={0} /><Sfx name="pop" at={r('stacking', 'notTrap')} /><Sfx name="pop" at={r('stacking', 'notTrap') + 5} /><Sfx name="pop" at={r('stacking', 'notTrap') + 10} /><Sfx name="pop" at={r('stacking', 'notTrap') + 15} />
          </Shot>
        </>
      );
    }}
  </ChapterShell>
);
