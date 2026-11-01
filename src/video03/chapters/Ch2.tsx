import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {Bubble, KeyTag, Pill, PopIn} from '../../style/style_kit';
import {Chip} from '../../video02/paper';
import {ChapterShell} from '../ChapterShell';
import {CH1_TAG} from './Ch1';
import {Centered, CheckRow, HBars, InfoCard, NetWt, P, Person, PriceTag, Sfx, Shots, ShrinkProp, Src, TagNode, WordSwipe} from '../v3kit';

const SRC_STUDY = 'Cakir & Balagtas (2014), Journal of Retailing 90(1): Chicago ice cream market';
const TAG = {x: 860, y: 430};
/** Where the net-weight label sits in the last shot; Ch3 catches it (carry, pan left). */
export const CH2_NET = {x: 470, y: 760};

/** Three shoppers; from `leave` on, the first two walk out of frame. */
const Crowd: React.FC<{at: number; x: number; y: number; leave?: number}> = ({at, x, y, leave}) => {
  const f = useCurrentFrame();
  const go = (i: number) => (leave === undefined || i === 2 ? 0 : interpolate(f, [leave + i * 5, leave + i * 5 + 30], [0, -520], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}));
  const fade = (i: number) => (leave === undefined || i === 2 ? 1 : interpolate(f, [leave + i * 5 + 14, leave + i * 5 + 30], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}));
  return (
    <>
      {[0, 1, 2].map((i) => (
        <PopIn key={i} at={at + i * 4} style={{left: x + i * 150, top: y}}>
          <div style={{transform: `translateX(${go(i)}px)`, opacity: fade(i)}}><Person h={220} color={['#2E86AB', '#FF9F43', '#7B3FE4'][i]} /></div>
        </PopIn>
      ))}
    </>
  );
};

export const Ch2: React.FC = () => (
  <ChapterShell id="ch2">
    {(b, len, c) => (
      <Shots b={b} len={len} c={c} src="v3/world_freezer.jpg" x0={260} exitPan="l" list={[
        // 1: why does option two work? You check prices, not weights.  (catches the "$4" tag from Ch1)
        {trans: 'join', pan: 'r', carry: {from: [CH1_TAG.x, CH1_TAG.y], to: [TAG.x, TAG.y], node: <TagNode text="$4" />, handoff: true}, body: (r) => (
          <>
            <ShrinkProp name="v3/obj_icecream_tub.png" h={480} x={240} y={400} at={8} />
            <Centered x={TAG.x} y={TAG.y}><TagNode text="$4" /></Centered>
            <Bubble text="why does it work?" at={r('why') + 26} tail="left" style={{left: 1150, top: 250}} size={52} />
            <CheckRow text="you check prices" at={r('checkPrices')} x={720} y={620} />
            <CheckRow text="you don't check weights" ok={false} at={r('notWeights')} x={720} y={760} />
            <Sfx name="whoosh" at={0} /><Sfx name="pop" at={8} /><Sfx name="pop" at={r('checkPrices')} /><Sfx name="pop" at={r('notWeights')} />
          </>
        )},
        // 2: researchers studied years of ice cream sales in Chicago
        {body: (r) => (
          <>
            <P name="v3/obj_icecream_tub.png" x={240} y={400} h={480} />
            <InfoCard title="Chicago ice cream study" sub="years of real sales data" at={r('study')} x={780} y={300} w={860} size={56} />
            <PopIn at={r('chicago')} style={{left: 800, top: 560}}><Pill text="Chicago, USA" bg="#2E86AB" size={52} /></PopIn>
            <Src text={SRC_STUDY} at={r('study')} />
            <Sfx name="pop" at={r('study')} /><Sfx name="pop" at={r('chicago')} />
          </>
        )},
        // 3: about 4x more reaction to a price change than to the same size change
        {body: (r) => (
          <>
            <HBars x={190} y={290} w={1100} max={4} rows={[
              {label: 'Reaction to a price change', value: 4, show: '4x', color: '#E5484D', at: r('fourX')},
              {label: 'Reaction to the same change in size', value: 1, show: '1x', color: '#7BD389', at: r('sizeWord')},
            ]} />
            <WordSwipe text="four times." at={r('four2')} x={1260} y={760} size={110} />
            <Src text={SRC_STUDY} />
            <Sfx name="ding" at={r('fourX') + 20} /><Sfx name="pop" at={r('sizeWord')} /><Sfx name="ding" at={r('four2')} />
          </>
        )},
        // 4 (ink): the bug in your brain -> the choice is easy
        {trans: 'ink', body: (r) => (
          <>
            <P name="v3/obj_brain_bug.png" x={200} y={330} h={540} at={4} />
            <PopIn at={10} style={{left: 980, top: 320}}><Pill text="the bug in your brain" bg="#2B1230" size={56} /></PopIn>
            <KeyTag text="for a company: an easy choice" at={20} style={{left: 980, top: 520}} size={64} />
            <Sfx name="pop" at={4} /><Sfx name="pop" at={10} /><Sfx name="pop" at={20} />
          </>
        )},
        // 5: raise the price -> some walk away. Shrink the package -> most never notice.
        {body: (r) => (
          <>
            <InfoCard title="Raise the price" at={0} x={150} y={250} w={640} size={50} />
            <PriceTag text="$4.50" at={6} x={200} y={400} size={100} />
            <Crowd at={8} x={180} y={640} leave={r('walk')} />
            <Chip text="some walk away" kind="warn" at={r('walk') + 10} x={260} y={880} size={40} />
            <InfoCard title="Shrink the package" at={r('shrinkPkg')} x={1000} y={250} w={700} size={50} />
            <ShrinkProp name="v3/obj_icecream_tub.png" h={300} x={1060} y={420} at={r('shrinkPkg')} shrinkAt={r('shrinkPkg') + 14} to={0.8} />
            <Crowd at={r('shrinkPkg') + 6} x={1300} y={500} />
            <Chip text="most never notice" at={r('never')} x={1240} y={790} size={44} />
            <Sfx name="pop" at={0} /><Sfx name="pop" at={r('walk')} /><Sfx name="pop" at={r('shrinkPkg')} /><Sfx name="shrink" at={r('shrinkPkg') + 14} /><Sfx name="pop" at={r('never')} />
          </>
        )},
        // 6: the package is built to help: same colours, same logo, same size on the shelf
        {body: (r) => (
          <>
            <Chip text="built to help" at={0} x={170} y={250} size={50} />
            <P name="v3/obj_icecream_tub.png" x={170} y={430} h={420} at={6} />
            <P name="v3/obj_icecream_tub.png" x={560} y={430} h={420} at={12} />
            <Chip text="before" at={6} x={250} y={360} size={36} />
            <Chip text="after" at={12} x={650} y={360} size={36} />
            <CheckRow text="same colors" at={r('colors')} x={1080} y={330} />
            <CheckRow text="same logo" at={r('logo')} x={1080} y={480} />
            <CheckRow text="same size on the shelf" at={r('shelf')} x={1080} y={630} />
            <Sfx name="pop" at={6} /><Sfx name="pop" at={12} /><Sfx name="pop" at={r('colors')} /><Sfx name="pop" at={r('logo')} /><Sfx name="pop" at={r('shelf')} />
          </>
        )},
        // 7: often the only change is one small number: the net weight (it rides on to Ch3)
        {body: (r) => (
          <>
            <P name="v3/obj_icecream_tub.png" x={230} y={330} h={560} />
            <PopIn at={r('only')} style={{left: 900, top: 300}}><Pill text="one small number on the front" bg="#2B1230" size={50} /></PopIn>
            <Centered at={r('only') + 10} x={CH2_NET.x} y={CH2_NET.y}><NetWt text="?? oz" hot /></Centered>
            <Centered at={r('netWt')} x={CH2_NET.x} y={CH2_NET.y}><div style={{width: 380, height: 150, borderRadius: '50%', border: '8px solid #E5484D'}} /></Centered>
            <WordSwipe text="the net weight" at={r('netWt')} x={920} y={480} size={120} />
            <Sfx name="pop" at={r('only')} /><Sfx name="pop" at={r('only') + 10} /><Sfx name="ding" at={r('netWt')} />
          </>
        )},
      ]} />
    )}
  </ChapterShell>
);
