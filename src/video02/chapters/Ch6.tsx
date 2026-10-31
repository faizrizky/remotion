import React from 'react';
import {Pill, PopIn, SANS, Scene} from '../../style/style_kit';
import {ChapterShell} from '../ChapterShell';
import {WordPop} from '../paper';
import {Disclaimer, INK, LeoBadge, Punch, Sfx, Shot} from '../v2kit';

const RULES = [
  {beat: 'rule1', text: 'Only if you could pay in full today'},
  {beat: 'rule2', text: 'One plan at a time. No stacking.'},
  {beat: 'rule3', text: 'Never for groceries, bills, subscriptions'},
  {beat: 'rule4', text: 'Due dates in your calendar, money set aside first'},
];

const RuleRow: React.FC<{n: number; text: string; at: number; y: number}> = ({n, text, at, y}) => (
  <PopIn at={at} origin="0% 50%" style={{left: 720, top: y}}>
    <div style={{width: 1080, display: 'flex', alignItems: 'center', gap: 24, background: '#FFFFFF', border: `6px solid ${INK}`, borderRadius: 28, padding: '18px 26px', boxSizing: 'border-box', fontFamily: SANS, color: INK, boxShadow: '0 10px 0 rgba(0,0,0,0.18)'}}>
      <div style={{width: 76, height: 76, flex: '0 0 76px', borderRadius: '50%', background: '#3A8D5C', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 44}}>{n}</div>
      <div style={{fontWeight: 800, fontSize: 40, lineHeight: 1.15}}>{text}</div>
    </div>
  </PopIn>
);

export const Ch6: React.FC = () => (
  <ChapterShell id="ch6">
    {(b, len) => (
      <>
        {/* A: is it evil? no. Used on purpose... the trick is YOU use it */}
        <Shot world={{src: 'v2/world_living.jpg', dir: 'r', at: 0.2}} from={0} to={b('ruleStart')}>
          <Scene palette="sunrise" dur={b('ruleStart')}>
            <LeoBadge head="head_thinking.png" at={0} x={760} y={120} size={380} />
            <Punch text="Is it evil?" at={b('evil')} color={INK} y={520} size={110} />
            <Punch text="No." at={b('no')} color={INK} y={640} size={140} />
            <WordPop words={['Used', 'on', 'purpose:', 'a', 'free', 'short', 'loan.']} at={b('onPurpose')} gap={5} x={230} y={830} size={56} highlight={[4, 5, 6]} />
            <PopIn at={b('trick')} style={{left: 120, top: 180}}><Pill text="the trick: YOU use it" bg="#5B4FFF" size={52} /></PopIn>
          </Scene>
          <Disclaimer />
          <Sfx name="pop" at={0} /><Sfx name="pop" at={b('evil')} /><Sfx name="pop" at={b('no')} /><Sfx name="pop" at={b('onPurpose')} /><Sfx name="pop" at={b('trick')} />
        </Shot>

        {/* B: four rules */}
        <Shot world={{src: 'v2/world_bakery.jpg', dir: 'l', at: 0.7}} from={b('ruleStart')} to={len} trans="ink" seed="c6b">
          <Scene palette="mint" dur={len - b('ruleStart')}>
            <LeoBadge head="head_proud.png" at={0} x={160} y={300} size={420} ring="#FFD23F" />
            {RULES.map((rule, i) => (
              <RuleRow key={rule.beat} n={i + 1} text={rule.text} at={b(rule.beat) - b('ruleStart')} y={170 + i * 175} />
            ))}
          </Scene>
          <Disclaimer />
          <Sfx name="whoosh" at={0} />
          {RULES.map((rule) => <Sfx key={rule.beat} name="pop" at={b(rule.beat) - b('ruleStart')} />)}
        </Shot>
      </>
    )}
  </ChapterShell>
);
