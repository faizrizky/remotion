import React from 'react';
import {Bubble, Pill, PopIn, SANS, Scene, SlideIn} from '../../style/style_kit';
import {Shot, Bg, Prop, Punch, Sfx, INK} from '../../video02/v2kit';
import {Chip, PaperCard} from '../../video02/paper';
import {ChapterShell1, Fly, LeoFull, Ripple, Shadow, Tag, Win} from '../v1kit';

const Label: React.FC<{text: string; size?: number}> = ({text, size = 40}) => (
  <div style={{fontFamily: SANS, fontWeight: 800, fontSize: size, color: INK, textAlign: 'center'}}>{text}</div>
);

export const Hook: React.FC = () => (
  <ChapterShell1 id="hook">
    {(b, len) => {
      const s3 = (k: string) => b(k) - b('strange');
      return (
        <>
          {/* S1: $5 coffee, tap, points */}
          <Shot from={0} to={b('twoSec')}>
            <Scene palette="sunrise" dur={b('twoSec')}>
              <Bg name="v1/bg_cafe.jpg" wash={0.2} />
              <Shadow cx={290} y={960} w={360} />
              <LeoFull heads={[{at: 0, head: 'head_happy.png'}, {at: b('smart'), head: 'head_proud.png'}]} x={90} y={200} h={760} />
              <PopIn at={b('coffee')} style={{left: 1280, top: 560}}><Prop name="v1/coffee.png" h={330} /></PopIn>
              <PopIn at={b('coffee')} style={{left: 1500, top: 600}}><Chip text="$5 coffee" kind="label" x={0} y={0} size={48} /></PopIn>
              <PopIn at={b('coffee') + 4} style={{left: 860, top: 560}}><Prop name="v1/terminal.png" h={340} /></PopIn>
              <Fly at={b('tap') - 12} x0={560} y0={620} x1={1010} y1={640} dur={12} arc={90} spin={-20} hold={false}><Prop name="v1/card.png" h={170} /></Fly>
              <Ripple at={b('tap')} x={1010} y={640} />
              <Tag text="+ points" at={b('points')} x={860} y={440} bg="#FFD23F" rot={-4} />
              <Bubble text="Nice. Smart move." at={b('smart')} tail="left" style={{left: 520, top: 130}} size={54} />
            </Scene>
            <Sfx name="pop" at={b('coffee')} /><Sfx name="card_tap" at={b('tap')} /><Sfx name="pop" at={b('points')} /><Sfx name="pop" at={b('smart')} />
          </Shot>

          {/* S2: three companies get paid */}
          <Shot from={b('twoSec')} to={b('strange')} trans="whip">
            <Scene palette="sky" dur={b('strange') - b('twoSec')}>
              <Punch text="2 seconds. 3 companies paid." at={0} y={50} size={96} />
              {[
                {x: 150, at: b('p1'), n: 'obj_bank_transparent.png', t: 'The bank', done: b('paid1')},
                {x: 720, at: b('p2'), n: 'v1/card_blue.png', t: 'The card network', done: b('paid2')},
                {x: 1290, at: b('p3'), n: 'v1/terminal.png', t: 'The processor', done: b('paid3')},
              ].map((p) => (
                <PaperCard key={p.t} at={p.at - b('twoSec')} x={p.x} y={250} w={480} h={600} rot={p.x === 720 ? 1 : -1.2}>
                  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', height: '100%', padding: '36px 0 30px'}}>
                    <Prop name={p.n} h={320} />
                    <Label text={p.t} size={44} />
                  </div>
                  <PopIn at={p.done - b('twoSec')} origin="50% 50%" style={{left: 340, top: -40}}><Prop name="v1/icon_check.png" h={130} /></PopIn>
                </PaperCard>
              ))}
              <PopIn at={b('companies') - b('twoSec')} style={{left: 460, top: 900}}><Pill text="all from one $5 tap" bg="#FF6B6B" size={44} /></PopIn>
            </Scene>
            <Sfx name="whoosh" at={0} /><Sfx name="kaching" at={b('paid1') - b('twoSec')} /><Sfx name="kaching" at={b('paid2') - b('twoSec')} /><Sfx name="kaching" at={b('paid3') - b('twoSec')} />
          </Shot>

          {/* S3: they profit either way */}
          <Shot from={b('strange')} to={len} trans="wipe">
            <Scene palette="lilac" dur={len - b('strange')}>
              <Shadow cx={290} y={960} w={360} />
              <LeoFull heads={[{at: 0, head: 'head_suspicious.png'}, {at: s3('check'), head: 'head_shocked.png'}]} x={90} y={200} h={760} />
              <PopIn at={0} style={{left: 560, top: 70}}><Pill text="They profit either way" bg="#2B2F77" size={64} /></PopIn>
              <Win from={s3('ontime')} to={s3('opening')}>
                <PaperCard at={s3('ontime')} x={640} y={290} w={500} h={460} rot={-1.5}>
                  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, padding: '34px 0'}}><Label text="Pays on time" size={48} /><Prop name="v1/card_mustard.png" h={200} /></div>
                  <PopIn at={s3('check') - s3('ontime')} origin="50% 50%" style={{left: 350, top: 290}}><Prop name="v1/icon_check.png" h={150} /></PopIn>
                </PaperCard>
                <PaperCard at={s3('ontime') + 8} x={1230} y={290} w={500} h={460} rot={1.5}>
                  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, padding: '34px 0'}}><Label text="Pays late" size={48} /><Prop name="v1/calendar_due.png" h={200} /></div>
                  <PopIn at={s3('cross') - s3('ontime')} origin="50% 50%" style={{left: 350, top: 290}}><Prop name="v1/icon_cross.png" h={150} /></PopIn>
                </PaperCard>
              </Win>
              <SlideIn at={s3('opening')} from="right" dist={500} style={{left: 760, top: 250}}><Prop name="v1/terminal.png" h={460} /></SlideIn>
              <Tag text="Inside the machine…" at={s3('opening') + 6} x={760} y={800} bg="#FFD23F" size={56} />
            </Scene>
            <Sfx name="pop" at={0} /><Sfx name="card_tap" at={s3('ontime')} /><Sfx name="pop" at={s3('check')} /><Sfx name="pop" at={s3('cross')} /><Sfx name="whoosh" at={s3('opening')} /><Sfx name="pop" at={s3('machine')} />
          </Shot>
        </>
      );
    }}
  </ChapterShell1>
);
