import React from 'react';
import {DrawCurve, KeyTag, Pill, PopIn, Scene, StickyNote} from '../../style/style_kit';
import {ChapterShell} from '../ChapterShell';
import {Chip, CutawayPan, Embers, HighlightSwipe, MascotCorner} from '../paper';
import {INK, PayCircle, PercentGrid, PriceTag, Prop, Punch, sec, Sfx, Shot, Src, StatCard, PAN_FRAMES} from '../v2kit';

export const Ch3: React.FC = () => (
  <ChapterShell id="ch3">
    {(b, len) => {
      const r = (k: string, from: string) => b(k) - b(from);
      return (
        <>
          {/* A: your brain sees $120... it sees $30 */}
          <Shot world={{src: 'v2/world_living.jpg', x0: 1395, x1: 1471, a: 0, b: b('lunch')}} from={0} to={b('lunch')} trans="carry" pan="r" carry={{from: [900, 600], to: [1450, 470]}}>
            <Scene palette="rose" dur={b('lunch')}>
              <MascotCorner head="head_thinking.png" at={b('brain')} x={850} y={620} size={230} />
              <PopIn at={b('brain')} style={{left: 660, top: 440}}><Pill text="your brain doesn't see..." bg="#2B1230" size={44} /></PopIn>
              <PriceTag text="$120" at={b('hundred')} x={170} y={380} size={150} color="#5B4FFF" />
              <PriceTag text="$30" at={b('sees30')} x={1400} y={380} size={170} color="#2FB432" rot={5} />
            </Scene>
            <Sfx name="pop" at={b('brain')} /><Sfx name="pop" at={b('hundred')} /><Sfx name="pop" at={b('sees30')} />
          </Shot>

          {/* B: lunch vs decision */}
          <Shot exitPan="r" world={{src: 'v2/world_clothes.jpg', x0: 700, x1: 700, a: b('lunch'), b: b('hoodie')}} from={b('lunch')} to={b('hoodie')} trans="wipe">
            <Scene palette="teal" dur={r('hoodie', 'lunch')}>
              <PopIn at={0} style={{left: 250, top: 250}}><Prop name="v2/obj_lunch.png" h={380} /></PopIn>
              <KeyTag text="$30 = lunch" at={r('lunchTag', 'lunch')} style={{position: 'absolute', left: 230, top: 690}} size={72} />
              <PopIn at={r('decision', 'lunch')} style={{left: 1150, top: 250}}><Prop name="v2/obj_scale_decision.png" h={380} /></PopIn>
              <KeyTag text="$120 = a decision" at={r('decTag', 'lunch')} style={{position: 'absolute', left: 1060, top: 690}} size={72} />
            </Scene>
            <Sfx name="whoosh" at={0} /><Sfx name="pop" at={0} /><Sfx name="pop" at={r('decision', 'lunch')} />
          </Shot>

          {/* C: the cart fills up, $30 at a time */}
          <Shot world={{src: 'v2/world_clothes.jpg', x0: 1700, x1: 1780, a: b('hoodie'), b: b('notFeel')}} from={b('hoodie')} to={b('notFeel')} trans="carry" pan="r" carry={{from: [1350, 450], to: [900, 480]}}>
            <Scene palette="mint" dur={r('notFeel', 'hoodie')}>
              <PopIn at={0} style={{left: 700, top: 300}}><Prop name="v2/obj_cart_empty.png" h={480} /></PopIn>
              <PopIn at={r('hoodieW', 'hoodie')} style={{left: 160, top: 300}}><Prop name="v2/obj_hoodie.png" h={300} /></PopIn>
              <Chip text="+ $30 / 2 wks" kind="time" at={r('hoodieChip', 'hoodie')} x={200} y={640} size={44} />
              <PopIn at={r('cap', 'hoodie')} style={{left: 1400, top: 320}}><Prop name="v2/obj_cap.png" h={240} /></PopIn>
              <Chip text="+ $15 / 2 wks" kind="time" at={r('capChip', 'hoodie')} x={1400} y={640} size={44} />
              <Punch text="just another small payment" at={r('smallPay', 'hoodie')} color={INK} y={110} size={84} />
            </Scene>
            <Sfx name="whoosh" at={0} /><Sfx name="pop" at={r('hoodieW', 'hoodie')} /><Sfx name="pop" at={r('cap', 'hoodie')} /><Sfx name="pop" at={r('smallPay', 'hoodie')} />
          </Shot>

          {/* D1: not just a feeling: Harvard researchers */}
          <Shot world={{src: 'v2/world_bank.jpg', x0: 300, x1: 396, a: b('notFeel'), b: b('research')}} from={b('notFeel')} to={b('research')} trans="ink" seed="c3d">
            <Scene palette="sky" dur={r('research', 'notFeel')}>
              <Punch text="Not just a feeling." at={sec(0.3)} color={INK} y={110} size={110} />
              <PopIn at={r('harvard', 'notFeel')} style={{left: 700, top: 280}}><Prop name="v2/obj_research_paper.png" h={560} /></PopIn>
              <PopIn at={r('harvard', 'notFeel')} style={{left: 1180, top: 420}}><Pill text="Harvard researchers" bg="#A51C30" size={52} /></PopIn>
            </Scene>
            <Src text="Di Maggio, Katz & Williams, NBER Working Paper 30508 (2022)" at={r('harvard', 'notFeel') + 30} />
            <Sfx name="whoosh" at={0} /><Sfx name="pop" at={sec(0.3)} /><Sfx name="pop" at={r('harvard', 'notFeel')} />
          </Shot>

          {/* D2: total spending goes up */}
          <Shot world={{src: 'v2/world_kitchen.jpg', x0: 600, x1: 699, a: b('research'), b: b('survey68')}} from={b('research')} to={b('survey68')} trans="wipe">
            <Scene palette="sky" dur={r('survey68', 'research')}>
              <PopIn at={0} style={{left: 160, top: 260}}><Prop name="v2/obj_research_paper.png" h={480} /></PopIn>
              <div style={{position: 'absolute', left: 820, top: 230, width: 960, height: 520}}>
                <div style={{position: 'absolute', left: 0, bottom: 0, width: 960, height: 8, background: '#FFF4E0'}} />
                <div style={{position: 'absolute', left: 0, top: 0, width: 8, height: 520, background: '#FFF4E0'}} />
                <DrawCurve d="M 20 480 C 300 470, 480 420, 600 300 S 820 80, 940 40" at={r('curve', 'research')} dur={40} w={960} h={520} />
              </div>
              <KeyTag text="total spending goes UP" at={r('spend', 'research')} style={{position: 'absolute', left: 900, top: 790}} size={60} />
              <HighlightSwipe at={r('spend', 'research') + 10} x={910} y={805} w={780} h={78} />
              <PopIn at={r('upNotMove', 'research')} style={{left: 160, top: 790}}><Pill text="it doesn't just move around" bg="#2B1230" size={44} /></PopIn>
            </Scene>
            <Sfx name="whoosh" at={0} /><Sfx name="pop" at={0} /><Sfx name="pop" at={r('spend', 'research')} /><Sfx name="pop" at={r('upNotMove', 'research')} />
          </Shot>

          {/* E: 68% overspend */}
          <Shot exitSwap world={{src: 'v2/world_mall.jpg', x0: 1200, x1: 1329, a: b('survey68'), b: b('notTrap')}} from={b('survey68')} to={b('half')} trans="ink" seed="c3e">
            <Scene palette="peri" dur={r('half', 'survey68')}>
              <PopIn at={r('survey2026', 'survey68')} style={{left: 980, top: 130}}><Pill text="2026 survey" bg="#5B4FFF" size={44} /></PopIn>
              <PercentGrid n={68} at={r('s68', 'survey68') + 6} x={230} y={260} on="#FF6B6B" />
              <StatCard to={68} label="say it makes them overspend" at={r('s68', 'survey68')} x={980} y={220} w={680} />
            </Scene>
            <Src text="LendingTree BNPL survey, 2026" at={r('s68', 'survey68')} />
            <Sfx name="whoosh" at={0} /><Sfx name="pop" at={r('survey2026', 'survey68')} /><Sfx name="ding" at={r('s68', 'survey68')} />
          </Shot>

          {/* E2: more than half regretted */}
          <Shot world={{src: 'v2/world_mall.jpg', x0: 1200, x1: 1329, a: b('survey68'), b: b('notTrap')}} from={b('half')} to={b('notTrap')} trans="swap">
            <Scene palette="rose" dur={r('notTrap', 'half')}>
              <PercentGrid n={54} at={sec(0.3)} x={230} y={260} on="#FF9F1C" />
              <StickyNote text="54% regretted a purchase" at={r('regret', 'half')} style={{left: 1060, top: 400}} size={64} />
            </Scene>
            <Src text="LendingTree BNPL survey, 2026" at={sec(0.3)} />
            <Sfx name="whoosh" at={0} /><Sfx name="pop" at={sec(0.3)} /><Sfx name="pop" at={r('regret', 'half')} />
          </Shot>

          {/* F: overspending once isn't the trap */}
          <Shot exitSwap world={{src: 'v2/world_street.jpg', x0: 200, x1: 310, a: b('notTrap'), b: len - PAN_FRAMES}} from={b('notTrap')} to={b('stackStart')} trans="wipe">
            <Scene palette="sunrise" dur={r('stackStart', 'notTrap')}>
              <Punch text="Overspending once?" at={sec(0.2)} y={330} size={130} />
              <PopIn at={r('notTrapTag', 'notTrap')} style={{left: 560, top: 560}}><Pill text="isn't the real trap" bg="#2B1230" size={64} /></PopIn>
            </Scene>
            <Sfx name="whoosh" at={0} /><Sfx name="pop" at={sec(0.2)} /><Sfx name="pop" at={r('notTrapTag', 'notTrap')} />
          </Shot>

          {/* G: the real trap: stacking */}
          <Shot exitPan="r" world={{src: 'v2/world_street.jpg', x0: 200, x1: 310, a: b('notTrap'), b: len - PAN_FRAMES}} from={b('stackStart')} to={len - PAN_FRAMES} trans="swap" seed="c3g">
            <Scene palette="lilac" dur={len - b('stackStart')}>
              <Punch text="The real trap?" at={sec(0.2)} y={110} size={110} />
              <CutawayPan at={r('stack1', 'stackStart')} dur={sec(3)} dy={110}>
              <PayCircle amount="$30" label="" at={r('stack1', 'stackStart')} x={960} y={820} size={150} />
              <PayCircle amount="$45" label="" at={r('stack2', 'stackStart')} x={990} y={690} size={150} color="#FF9F1C" />
              <PayCircle amount="$25" label="" at={r('stack3', 'stackStart')} x={940} y={560} size={150} color="#FF6B6B" />
              <PayCircle amount="$60" label="" at={r('stack4', 'stackStart')} x={975} y={430} size={150} color="#5B4FFF" />
              </CutawayPan>
              <Embers n={18} color="#FF6B6B" seed={5} />
            </Scene>
            <Sfx name="whoosh" at={0} /><Sfx name="pop" at={sec(0.2)} /><Sfx name="pop" at={r('stack1', 'stackStart')} /><Sfx name="pop" at={r('stack2', 'stackStart')} /><Sfx name="pop" at={r('stack3', 'stackStart')} /><Sfx name="pop" at={r('stack4', 'stackStart')} />
          </Shot>
        </>
      );
    }}
  </ChapterShell>
);
