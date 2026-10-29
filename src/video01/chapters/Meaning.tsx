import React from 'react';
import {Bubble, PopIn, Scene} from '../../style/style_kit';
import {Disclaimer, LeoBadge, Prop, Sfx, Shot} from '../../video02/v2kit';
import {Chip, MascotCorner} from '../../video02/paper';
import {ChapterShell1} from '../v1kit';

export const Meaning: React.FC = () => (
  <ChapterShell1 id="mean">
    {(b, len) => {
      const a = (k: string) => b(k);
      const d = (k: string) => b(k) - b('decide');
      return (
        <>
          {/* A: neither good nor bad, a tool */}
          <Shot from={0} to={b('decide')}>
            <Scene palette="mint" dur={b('decide')}>
              <LeoBadge head="head_thinking.png" at={a('good')} x={150} y={330} size={400} />
              <Bubble text="Good or bad?" at={a('good')} tail="left" style={{left: 640, top: 200}} size={64} />
              <Chip text="Neither." kind="label" at={a('neither')} x={640} y={400} size={90} />
              <PopIn at={a('tool')} style={{left: 980, top: 380}}><Prop name="v1/toolbox.png" h={380} /></PopIn>
              <PopIn at={a('tool') + 8} style={{left: 1520, top: 500}}><Prop name="v1/card_coral.png" h={200} /></PopIn>
              <Chip text="a tool, designed by people who understand money" kind="warn" at={a('designed')} x={400} y={840} size={44} />
            </Scene>
            <Sfx name="pop" at={a('good')} /><Sfx name="pop" at={a('neither')} /><Sfx name="pop" at={a('tool')} /><Sfx name="pop" at={a('designed')} />
          </Shot>

          {/* B: choose your door */}
          <Shot from={b('decide')} to={len} trans="ink" seed="mn2">
            <Scene palette="sunrise" dur={len - b('decide')}>
              <PopIn at={0} style={{left: 180, top: 260}}><Prop name="v1/signpost.png" h={520} /></PopIn>
              <PopIn at={d('door')} style={{left: 640, top: 350}}><Prop name="v1/doors.png" w={760} /></PopIn>
              <Chip text="you decide which door" kind="label" at={d('door')} x={640} y={190} size={52} />
              <Chip text="everyone's situation is different" kind="label" at={d('everyone')} x={640} y={760} size={46} />
              <PopIn at={d('licensed')} style={{left: 1500, top: 300}}><Prop name="v1/icon_advisor.png" h={300} /></PopIn>
              <Chip text="talk to a licensed professional" kind="warn" at={d('licensed')} x={1100} y={640} size={42} />
              <MascotCorner head="head_proud.png" at={d('big')} x={1640} y={800} size={190} />
            </Scene>
            <Disclaimer />
            <Sfx name="whoosh" at={0} /><Sfx name="pop" at={d('door')} /><Sfx name="pop" at={d('everyone')} /><Sfx name="pop" at={d('licensed')} />
          </Shot>
        </>
      );
    }}
  </ChapterShell1>
);
