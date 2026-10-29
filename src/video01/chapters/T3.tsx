import React from 'react';
import {Bubble, PopIn, Scene, Sticker, PALETTES} from '../../style/style_kit';
import {CoinFly, DashArrow, LeoBadge, Prop, Src, Sfx, Shot, StatCard} from '../../video02/v2kit';
import {Chip} from '../../video02/paper';
import {ChapterShell1} from '../v1kit';

export const T3: React.FC = () => (
  <ChapterShell1 id="t3">
    {(b, len) => {
      const rel = (s: string) => (k: string) => b(k) - b(s);
      const a = rel('cashback'), bb = rel('cfpb'), cc = rel('split'), d = rel('full'), e = rel('other');
      return (
        <>
          {/* A: is the bank giving money back? */}
          <Shot from={0} to={b('cfpb')}>
            <Scene palette="rose" dur={b('cfpb')}>
              <PopIn at={a('cashback')} style={{left: 140, top: 420}}><Prop name="v1/icon_cashback.png" h={230} /></PopIn>
              <PopIn at={a('cashback') + 8} style={{left: 450, top: 440}}><Prop name="v1/icon_star.png" h={200} /></PopIn>
              <PopIn at={a('cashback') + 16} style={{left: 720, top: 430}}><Prop name="v1/icon_plane.png" h={210} /></PopIn>
              <PopIn at={a('cashback') + 24} style={{left: 140, top: 700}}><Prop name="v1/boarding_pass.png" h={190} /></PopIn>
              <Bubble text="Isn't the bank giving money back?" at={a('giving')} tail="right" style={{left: 1000, top: 150}} size={52} />
              <LeoBadge head="head_thinking.png" at={a('giving')} x={1300} y={470} size={380} />
              <Chip text="this is where it gets interesting" kind="label" at={a('interesting')} x={110} y={200} size={46} />
            </Scene>
            <Sfx name="pop" at={a('cashback')} /><Sfx name="pop" at={a('cashback') + 8} /><Sfx name="pop" at={a('cashback') + 16} /><Sfx name="pop" at={a('giving')} /><Sfx name="pop" at={a('interesting')} />
          </Shot>

          {/* B: CFPB */}
          <Shot from={b('cfpb')} to={b('split')} trans="ink" seed="t3b">
            <Scene palette="sky" dur={b('split') - b('cfpb')}>
              <PopIn at={0} style={{left: 190, top: 270}}><Prop name="v1/clipboard.png" h={560} /></PopIn>
              <PopIn at={6} style={{left: 740, top: 400}}><Prop name="bld_cfpb_transparent.png" w={900} /></PopIn>
              <Chip text="Consumer Financial Protection Bureau" kind="label" at={12} x={640} y={240} size={44} />
              <Src text="CFPB" at={bb('looked')} />
            </Scene>
            <Sfx name="whoosh" at={0} /><Sfx name="pop" at={6} /><Sfx name="pop" at={12} />
          </Shot>

          {/* C: carries a balance */}
          <Shot from={b('split')} to={b('full')} trans="whip">
            <Scene palette="rose" dur={b('full') - b('split')}>
              <PopIn at={0} style={{left: 110, top: 380}}><Prop name="v1/wallet_red.png" h={380} /></PopIn>
              <Chip text="carries a balance" kind="warn" at={cc('carried') - 6} x={90} y={270} size={52} />
              <StatCard to={94} label="of interest & fees paid" at={cc('p94') - 20} x={640} y={300} w={520} bg="#FFD6D6" />
              <StatCard to={27} label="of the rewards earned" at={cc('r27') - 20} x={1230} y={300} w={520} bg="#FFF4E0" />
              <Src text="CFPB" at={0} />
            </Scene>
            <Sfx name="whoosh" at={0} /><Sfx name="pop" at={cc('carried') - 6} /><Sfx name="kaching" at={cc('p94') - 20} /><Sfx name="kaching" at={cc('r27') - 20} />
          </Shot>

          {/* D: pays in full */}
          <Shot from={b('full')} to={b('other')} trans="wipe">
            <Scene palette="sunrise" dur={b('other') - b('full')}>
              <PopIn at={0} style={{left: 110, top: 380}}><Prop name="v1/wallet_gold.png" h={380} /></PopIn>
              <Chip text="pays in full" kind="label" at={6} x={110} y={270} size={52} />
              <StatCard to={6} label="of interest & fees paid" at={d('p6') - 20} x={640} y={300} w={520} bg="#FFF4E0" />
              <StatCard to={73} label="of the rewards earned" at={d('r73') - 20} x={1230} y={300} w={520} bg="#D8F5DC" />
              <Src text="CFPB" at={0} />
            </Scene>
            <Sfx name="whoosh" at={0} /><Sfx name="pop" at={6} /><Sfx name="kaching" at={d('p6') - 20} /><Sfx name="kaching" at={d('r73') - 20} />
          </Shot>

          {/* E: one wallet pays for the other */}
          <Shot from={b('other')} to={len} trans="ink" seed="t3e">
            <Scene palette="lilac" dur={len - b('other')}>
              <PopIn at={0} style={{left: 150, top: 420}}><Prop name="v1/wallet_red.png" h={320} /></PopIn>
              <PopIn at={0} style={{left: 1400, top: 420}}><Prop name="v1/wallet_gold.png" h={320} /></PopIn>
              <DashArrow x0={560} y0={580} x1={1340} y1={580} at={e('funded') - 12} />
              {[0, 14, 28, 42].map((o) => <CoinFly key={o} at={e('funded') + o} x0={560} y0={580} x1={1340} y1={580} label="$" />)}
              <Chip text="swipe fees" kind="label" at={e('funded')} x={640} y={240} size={46} />
              <Chip text="people who struggle" kind="warn" at={e('struggling')} x={640} y={340} size={46} />
              <Sticker top="Free points in one wallet" main="paid by interest in another" at={e('wallet')} p={PALETTES.lilac} style={{left: 380, top: 740}} />
            </Scene>
            <Sfx name="whoosh" at={0} /><Sfx name="pop" at={e('funded')} /><Sfx name="kaching" at={e('funded') + 14} /><Sfx name="pop" at={e('struggling')} /><Sfx name="pop" at={e('wallet')} />
          </Shot>
        </>
      );
    }}
  </ChapterShell1>
);
