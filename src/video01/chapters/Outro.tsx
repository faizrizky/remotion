import React from 'react';
import {Pill, PopIn, Scene} from '../../style/style_kit';
import {Bg, Disclaimer, PayCircle, Prop, Punch, Sfx, Shot} from '../../video02/v2kit';
import {Chip} from '../../video02/paper';
import {ChapterShell1, Fly, LeoFull, Ripple, Shadow} from '../v1kit';

/** Change this once the next video's title is final. */
export const NEXT_V1 = 'Next: Buy Now, Pay Later';

export const Outro1: React.FC = () => (
  <ChapterShell1 id="outro">
    {(b, len) => {
      const t = (k: string) => b(k) - b('ifWant');
      return (
        <>
          {/* A: it's a whole machine */}
          <Shot from={0} to={b('ifWant')}>
            <Scene palette="sunrise" dur={b('ifWant')}>
              <Bg name="v1/bg_cafe.jpg" wash={0.25} />
              <Shadow cx={290} y={960} w={360} />
              <LeoFull heads={[{at: 0, head: 'head_happy.png'}, {at: b('know'), head: 'head_proud.png'}]} x={90} y={200} h={760} />
              <PopIn at={0} style={{left: 820, top: 560}}><Prop name="v1/terminal.png" h={340} /></PopIn>
              <Fly at={b('tap') - 12} x0={520} y0={640} x1={960} y1={640} dur={12} arc={80} spin={-18} hold={false}><Prop name="v1/card.png" h={160} /></Fly>
              <Ripple at={b('tap')} x={960} y={640} />
              <Chip text="not a 2-second purchase" kind="warn" at={b('notTwo')} x={700} y={160} size={56} />
              <PopIn at={b('machine')} style={{left: 1300, top: 480}}><Prop name="v1/gears.png" h={400} /></PopIn>
              <Punch text="a whole machine" at={b('machine')} y={880} size={90} />
            </Scene>
            <Sfx name="card_tap" at={b('tap')} /><Sfx name="pop" at={b('notTwo')} /><Sfx name="pop" at={b('machine')} />
          </Shot>

          {/* B: next video teaser. Keep x 1100-1790, y 230-930 EMPTY for the end screen. */}
          <Shot from={b('ifWant')} to={len} trans="whip">
            <Scene palette="peri" dur={len - b('ifWant')}>
              <PopIn at={0} style={{left: 160, top: 250}}><Prop name="v1/phone_pay.png" h={520} /></PopIn>
              <PayCircle amount="$30" label="Today" at={t('bnpl')} x={690} y={400} size={150} />
              <PayCircle amount="$30" label="2 wks" at={t('bnpl') + 8} x={860} y={400} size={150} />
              <PayCircle amount="$30" label="4 wks" at={t('bnpl') + 16} x={1030} y={400} size={150} />
              <PopIn at={t('next')} style={{left: 130, top: 800}}><Pill text={NEXT_V1} bg="#FF6B6B" size={46} /></PopIn>
              <PopIn at={t('see')} style={{left: 130, top: 900}}><Pill text="Subscribe. See you there!" bg="#FFD23F" color="#191411" size={40} /></PopIn>
            </Scene>
            <Disclaimer />
            <Sfx name="whoosh" at={0} /><Sfx name="pop" at={t('bnpl')} /><Sfx name="pop" at={t('bnpl') + 8} /><Sfx name="pop" at={t('bnpl') + 16} /><Sfx name="pop" at={t('next')} /><Sfx name="pop" at={t('see')} />
          </Shot>
        </>
      );
    }}
  </ChapterShell1>
);
