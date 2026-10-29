import React from 'react';
import {Sequence} from 'remotion';
import {Bubble, CircleBurstWipe, KeyTag, Pill, PopIn, Scene, Sticker, StickyNote, StrokeLogo, PALETTES} from '../../style/style_kit';
import {ChapterShell} from '../ChapterShell';
import {Embers, MascotCorner, Chip} from '../paper';
import {Shot, CheckoutScreen, CoinFly, DashArrow, getChapter, LeoBadge, PayCircle, Phone, Prop, Punch, sec, Sfx, Bg, Char} from '../v2kit';

export const Cold: React.FC = () => {
  const c = getChapter('cold');
  const end = sec(c.audioDur);
  return (
    <ChapterShell id="cold">
      {(b) => (
        <>
          {/* S1: four payments of $30 */}
          <Shot from={0} to={b('billions')}>
            <Scene palette="sunrise" dur={b('billions')}>
              <Bg name="v2/bg_bedroom.jpg" wash={0.18} />
              <Phone at={0} x={200} y={190} h={660}><CheckoutScreen pulseAt={b('tap')} /></Phone>
              <KeyTag text="0% interest. No fees." at={b('noInterest')} style={{position: 'absolute', left: 820, top: 170}} size={64} />
              <PayCircle amount="$30" label="Today" at={b('p1')} x={900} y={430} />
              <PayCircle amount="$30" label="2 wks" at={b('p2')} x={1130} y={430} />
              <PayCircle amount="$30" label="4 wks" at={b('p3')} x={1360} y={430} />
              <PayCircle amount="$30" label="6 wks" at={b('p4')} x={1590} y={430} />
              <PopIn at={b('ship')} style={{left: 830, top: 640}}><Prop name="v2/obj_sneakers_box.png" h={240} /></PopIn>
              <Sticker top="You paid" main="$30" at={b('thirty')} p={PALETTES.sunrise} style={{left: 1270, top: 650}} />
            </Scene>
            <Sfx name="pop" at={b('p1')} /><Sfx name="pop" at={b('p2')} /><Sfx name="pop" at={b('p3')} /><Sfx name="pop" at={b('p4')} />
            <Sfx name="card_tap" at={b('tap')} /><Sfx name="pop" at={b('ship')} /><Sfx name="pop" at={b('thirty')} />
          </Shot>

          {/* S2: worth billions */}
          <Shot from={b('billions')} to={b('whoPays')} trans="whip">
            <Scene palette="sky" dur={b('whoPays') - b('billions')}>
              <PopIn at={0} style={{left: 260, top: 300}}><Prop name="obj_coinstack_transparent.png" h={460} /></PopIn>
              <Embers n={22} color="#FFD23F" seed={3} />
              <Sticker top="Companies worth" main="BILLIONS" at={6} p={PALETTES.sky} style={{left: 1000, top: 400}} />
            </Scene>
            <Sfx name="whoosh" at={0} /><Sfx name="kaching" at={6} />
          </Shot>

          {/* S3: so who pays? */}
          <Shot from={b('whoPays')} to={b('stores')} trans="wipe">
            <Scene palette="peri" dur={b('stores') - b('whoPays')}>
              <Bg name="v2/bg_street.jpg" />
              <LeoBadge head="head_suspicious.png" at={0} x={330} y={330} size={400} />
              <MascotCorner head="head_thinking.png" at={20} x={1640} y={800} size={190} />
              <Bubble text="So... who pays?" at={8} tail="left" style={{left: 900, top: 380}} size={72} />
            </Scene>
            <Sfx name="pop" at={0} /><Sfx name="pop" at={8} />
          </Shot>

          {/* S4: stores hand over a cut */}
          <Shot from={b('stores')} to={b('knowWhat')} trans="ink" seed="c4">
            <Scene palette="mint" dur={b('knowWhat') - b('stores')}>
              <PopIn at={0} style={{left: 150, top: 330}}><Prop name="v2/obj_store.png" h={340} /></PopIn>
              <PopIn at={4} style={{left: 1400, top: 330}}><Prop name="obj_bank_transparent.png" h={340} /></PopIn>
              <Chip text="a cut of every sale" kind="warn" at={8} x={760} y={290} size={56} />
              <DashArrow x0={560} y0={520} x1={1360} y1={520} at={10} />
              <CoinFly at={16} x0={560} y0={520} x1={1360} y1={520} label="%" />
              <CoinFly at={34} x0={560} y0={520} x1={1360} y1={520} label="%" />
              <CoinFly at={52} x0={560} y0={520} x1={1360} y1={520} label="%" />
              <PopIn at={b('button') - b('stores')} style={{left: 720, top: 640}}><Pill text={'just to show "Pay in 4"'} bg="#FF6B9A" size={44} /></PopIn>
            </Scene>
            <Sfx name="whoosh" at={0} /><Sfx name="pop" at={8} /><Sfx name="pop" at={b('button') - b('stores')} />
          </Shot>

          {/* S5: they are buying... you */}
          <Shot from={b('knowWhat')} to={end} trans="whip">
            <Scene palette="lilac" dur={end - b('knowWhat')}>
              <Char name="v2/char_shopper_worried.png" at={0} x={820} y={340} h={600} />
              <Punch text="It's you." at={b('itsYou') - b('knowWhat')} y={140} />
              <StickyNote text="the ONE number: ???" at={b('oneNumber') - b('knowWhat')} style={{left: 1250, top: 470}} />
            </Scene>
            <Sfx name="whoosh" at={0} /><Sfx name="pop" at={b('itsYou') - b('knowWhat')} /><Sfx name="pop" at={b('oneNumber') - b('knowWhat')} />
          </Shot>

          {/* Brand sting (silent tail) */}
          <Sequence from={end} durationInFrames={sec(c.post)}>
            <CircleBurstWipe color="#E8A520" dur={12} seed="v2sting" />
            <Sequence from={8}><StrokeLogo text="Penny Logics" color="#191411" size={170} drawFrames={18} fillFrames={8} /></Sequence>
            <Sfx name="whoosh" at={0} />
          </Sequence>
        </>
      )}
    </ChapterShell>
  );
};
