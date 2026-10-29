import React from 'react';
import {PopIn, SANS, Scene} from '../../style/style_kit';
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
        {/* A: is it evil? no. */}
        <Shot from={0} to={b('rule1')}>
          <Scene palette="sunrise" dur={b('rule1')}>
            <LeoBadge head="head_thinking.png" at={0} x={760} y={140} size={380} />
            <Punch text="Is it evil?" at={4} color={INK} y={560} size={110} />
            <WordPop words={['No.', 'Use', 'it', 'on', 'purpose.']} at={b('onPurpose')} gap={5} x={330} y={720} size={84} highlight={[4]} />
          </Scene>
          <Sfx name="pop" at={0} /><Sfx name="pop" at={b('onPurpose')} />
        </Shot>

        {/* B: four rules */}
        <Shot from={b('rule1')} to={len} trans="ink" seed="c6b">
          <Scene palette="mint" dur={len - b('rule1')}>
            <LeoBadge head="head_proud.png" at={0} x={160} y={300} size={420} ring="#FFD23F" />
            {RULES.map((rule, i) => (
              <RuleRow key={rule.beat} n={i + 1} text={rule.text} at={b(rule.beat) - b('rule1')} y={170 + i * 175} />
            ))}
          </Scene>
          <Disclaimer />
          <Sfx name="whoosh" at={0} />
          {RULES.map((rule) => <Sfx key={rule.beat} name="pop" at={b(rule.beat) - b('rule1')} />)}
        </Shot>
      </>
    )}
  </ChapterShell>
);
