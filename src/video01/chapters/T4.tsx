import React from 'react';
import {Pill, PopIn, Scene, Sticker, PALETTES} from '../../style/style_kit';
import {CoinFly, DashArrow, PercentGrid, Prop, Punch, Src, Sfx, Shot, StatCard} from '../../video02/v2kit';
import {Chip, HighlightSwipe, PaperCard} from '../../video02/paper';
import {ChapterShell1} from '../v1kit';

export const T4: React.FC = () => (
  <ChapterShell1 id="t4">
    {(b, len) => {
      const rel = (s: string) => (k: string) => b(k) - b(s);
      const a = rel('accident'), m = rel('minimum'), c = rel('cfpb'), f = rel('fees');
      return (
        <>
          {/* A: not an accident / the statement */}
          <Shot from={0} to={b('minimum')}>
            <Scene palette="sky" dur={b('minimum')}>
              <Punch text="None of this is an accident." at={a('accident')} y={80} size={90} />
              <PopIn at={a('look')} style={{left: 560, top: 250}}><Prop name="v1/statement_min.png" h={640} /></PopIn>
              <Chip text="Look at your statement" kind="label" at={a('look')} x={120} y={420} size={48} />
              <Chip text="the biggest, friendliest number" kind="warn" at={a('biggest')} x={1250} y={420} size={42} rot={2} />
            </Scene>
            <Sfx name="pop" at={a('accident')} /><Sfx name="pop" at={a('look')} /><Sfx name="pop" at={a('biggest')} />
          </Shot>

          {/* B: minimum keeps the balance alive */}
          <Shot from={b('minimum')} to={b('cfpb')} trans="ink" seed="t4b">
            <Scene palette="peri" dur={b('cfpb') - b('minimum')}>
              <PopIn at={0} style={{left: 140, top: 330}}><Prop name="v1/statement_min.png" h={420} /></PopIn>
              <HighlightSwipe at={m('minimum') + 4} x={180} y={640} w={380} h={60} />
              <PopIn at={m('manage')} style={{left: 700, top: 400}}><Prop name="v1/treadmill.png" h={340} /></PopIn>
              <Chip text="balance stays alive" kind="warn" at={m('alive')} x={640} y={290} size={50} />
              <DashArrow x0={1100} y0={560} x1={1380} y1={560} at={m('earning')} />
              <PopIn at={m('earning')} style={{left: 1400, top: 420}}><Prop name="obj_bank_transparent.png" h={300} /></PopIn>
              {[0, 14, 28].map((o) => <CoinFly key={o} at={m('forBank') + o} x0={1100} y0={560} x1={1420} y1={560} label="$" />)}
              <Chip text="more interest for the bank" kind="label" at={m('forBank')} x={1060} y={250} size={44} />
            </Scene>
            <Sfx name="whoosh" at={0} /><Sfx name="pop" at={m('manage')} /><Sfx name="pop" at={m('alive')} /><Sfx name="kaching" at={m('forBank') + 6} />
          </Shot>

          {/* C: 15% */}
          <Shot from={b('cfpb')} to={b('fees')} trans="whip">
            <Scene palette="mint" dur={b('fees') - b('cfpb')}>
              <StatCard to={15} label="paid only the minimum, 2024" at={c('fifteen') - 20} x={150} y={280} w={620} bg="#FFF4E0" />
              <PercentGrid n={15} at={c('fifteen')} x={900} y={280} dot={44} gap={16} />
              <PopIn at={c('cfpb')} style={{left: 900, top: 620}}><Prop name="bld_cfpb_transparent.png" w={700} /></PopIn>
              <Chip text="the highest in at least a decade" kind="warn" at={c('decade')} x={150} y={640} size={46} />
              <Src text="CFPB" at={0} />
            </Scene>
            <Sfx name="whoosh" at={0} /><Sfx name="kaching" at={c('fifteen') - 20} /><Sfx name="pop" at={c('decade')} />
          </Shot>

          {/* D: the fees */}
          <Shot from={b('fees')} to={len} trans="wipe">
            <Scene palette="sunrise" dur={len - b('fees')}>
              {[
                {x: 120, at: f('late'), n: 'v1/icon_late.png', t: 'Late fee'},
                {x: 520, at: f('cash'), n: 'v1/atm.png', t: 'Cash advance'},
                {x: 920, at: f('transfer'), n: 'v1/transfer_cards.png', t: 'Balance transfer'},
                {x: 1320, at: f('annual'), n: 'v1/ticket_annual.png', t: 'Annual fee'},
              ].map((p) => (
                <PaperCard key={p.t} at={p.at} x={p.x} y={180} w={360} h={440} rot={p.x % 800 === 120 ? -1.5 : 1.2}>
                  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', height: '100%', padding: '30px 0 24px'}}>
                    <Prop name={p.n} h={250} />
                    <div style={{fontFamily: 'Poppins', fontWeight: 800, fontSize: 38, color: '#191411'}}>{p.t}</div>
                  </div>
                </PaperCard>
              ))}
              <PopIn at={f('small')} style={{left: 140, top: 700}}><Pill text="each one is small" bg="#2B2F77" size={44} /></PopIn>
              <PopIn at={f('together')} style={{left: 1120, top: 660}}><Prop name="v1/coinstack_giant.png" h={330} /></PopIn>
              <Sticker top="Together" main="tens of billions a year" at={f('tens')} p={PALETTES.sunrise} style={{left: 560, top: 700}} />
            </Scene>
            <Sfx name="whoosh" at={0} /><Sfx name="pop" at={f('late')} /><Sfx name="pop" at={f('cash')} /><Sfx name="pop" at={f('transfer')} /><Sfx name="pop" at={f('annual')} /><Sfx name="kaching" at={f('together')} /><Sfx name="pop" at={f('tens')} />
          </Shot>
        </>
      );
    }}
  </ChapterShell1>
);
