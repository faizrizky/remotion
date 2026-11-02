import React from 'react';
import {KeyTag, Pill, PopIn} from '../../style/style_kit';
import {Chip} from '../../video02/paper';
import {ChapterShell} from '../ChapterShell';
import {CH5_STICKER} from './Ch5';
import {CalcScreen, Centered, CheckRow, Disclaimer, FromTo, HabitCard, Phone, Prop, Sfx, ShelfTag, ShrankSticker, Shots, ShrinkProp, Src, WordSwipe} from '../v3kit';

const STICKER = {x: 1460, y: 420};
/** Basket in the last shot; the outro catches it (carry, pan left). */
export const CH6_BASKET = {x: 1600, y: 380, h: 220};
const H1 = 'Compare unit prices, not shelf prices.';
const H2 = 'New design? Check the net weight.';
const H3 = 'Count what you use: sheets, scoops, pieces.';

export const Ch6: React.FC = () => (
  <ChapterShell id="ch6">
    {(b, len, c) => (
      <Shots b={b} len={len} c={c} src="v3/world_checkout.jpg" x0={320} exitPan="l" list={[
        // 1: the one number on the shelf tag: the unit price  (the sticker lands next to the tag)
        {trans: 'join', pan: 'r', carry: {from: [CH5_STICKER.x, CH5_STICKER.y], to: [STICKER.x, STICKER.y], node: <ShrankSticker size={200} />, handoff: true}, body: (r) => (
          <>
            <ShelfTag price="$4.00" unit="$0.29" at={8} x={250} y={330} scale={1.25} hiAt={r('unitPrice')} />
            <Centered carried x={STICKER.x} y={STICKER.y}><ShrankSticker size={200} /></Centered>
            <WordSwipe text="the unit price" at={r('unitPrice')} x={1020} y={700} size={110} />
            <Disclaimer />
            <Sfx name="whoosh" at={0} /><Sfx name="pop" at={8} /><Sfx name="scan_beep" at={r('unitPrice')} />
          </>
        )},
        // 2: what you pay per ounce, per sheet, or per 100 grams
        {body: (r) => (
          <>
            <ShelfTag price="$4.00" unit="$0.29" at={-30} x={170} y={330} scale={0.95} hiAt={-30} />
            <Chip text="the small print" at={4} x={180} y={250} size={48} />
            <PopIn at={r('oz')} style={{left: 960, top: 300}}><Pill text="per ounce" bg="#2E86AB" size={60} /></PopIn>
            <PopIn at={r('sheet')} style={{left: 960, top: 450}}><Pill text="per sheet" bg="#2E9E8F" size={60} /></PopIn>
            <PopIn at={r('grams')} style={{left: 960, top: 600}}><Pill text="per 100 grams" bg="#7B3FE4" size={60} /></PopIn>
            <Disclaimer />
            <Sfx name="pop" at={4} /><Sfx name="pop" at={r('oz')} /><Sfx name="pop" at={r('sheet')} /><Sfx name="pop" at={r('grams')} />
          </>
        )},
        // 3: the big price can stay frozen for years; the unit price can't hide
        {body: (r) => (
          <>
            <ShelfTag price="$4.00" unit="$0.29" at={4} x={200} y={330} scale={1.2} frozen hiAt={r('cantHide')} />
            <Chip text="frozen for years" kind="time" at={10} x={1140} y={330} size={52} />
            <KeyTag text="the unit price can't hide" at={r('cantHide')} style={{left: 1100, top: 520}} size={64} />
            <Disclaimer />
            <Sfx name="pop" at={4} /><Sfx name="pop" at={10} /><Sfx name="scan_beep" at={r('cantHide')} />
          </>
        )},
        // 4: package shrinks -> unit price jumps. Only 9 states + DC require it; most don't.
        {body: (r) => (
          <>
            <ShrinkProp name="v3/obj_cereal_box.png" h={400} x={170} y={440} at={4} shrinkAt={16} to={0.82} />
            <FromTo from="$0.25" to="$0.29" unit="per oz (example)" at={10} swapAt={r('jumps')} x={480} y={290} size={80} />
            <PopIn at={r('nineStates')} style={{left: 1290, top: 300}}><Pill text="9 states + D.C." bg="#2E86AB" size={56} /></PopIn>
            <Chip text="require stores to show it" at={r('dc')} x={1290} y={420} size={44} />
            <CheckRow text="most states: not required" ok={false} at={r('notReq')} x={560} y={650} size={50} />
            <Src text="NIST, unit pricing laws by state" at={r('nineStates')} />
            <Disclaimer />
            <Sfx name="shrink" at={16} /><Sfx name="pop" at={10} /><Sfx name="ding" at={r('jumps')} /><Sfx name="pop" at={r('nineStates')} /><Sfx name="pop" at={r('dc')} /><Sfx name="pop" at={r('notReq')} />
          </>
        )},
        // 5: if it's there, read it; if not, do the math on your phone
        {body: (r) => (
          <>
            <CheckRow text="on the tag? read it" at={r('read')} x={170} y={330} />
            <CheckRow text="not there? do the math" at={r('math')} x={170} y={480} />
            <Phone at={r('math', 6)} x={1150} y={270} h={620}><CalcScreen at={r('math', 16)} /></Phone>
            <Disclaimer />
            <Sfx name="pop" at={r('read')} /><Sfx name="pop" at={r('math')} /><Sfx name="pop" at={r('math', 6)} />
          </>
        )},
        // 6: three habits. One: compare unit prices
        {body: (r) => (
          <>
            <PopIn at={0} style={{left: 160, top: 250}}><Pill text="3 habits" bg="#2B1230" size={56} /></PopIn>
            <HabitCard n={1} text={H1} at={r('h1')} x={160} y={380} />
            <Disclaimer />
            <Sfx name="pop" at={0} /><Sfx name="pop" at={r('h1')} />
          </>
        )},
        // 7: two: new design -> check the net weight
        {body: (r) => (
          <>
            <PopIn at={-30} style={{left: 160, top: 250}}><Pill text="3 habits" bg="#2B1230" size={56} /></PopIn>
            <HabitCard n={1} text={H1} at={-30} x={160} y={380} />
            <HabitCard n={2} text={H2} at={4} x={160} y={560} color="#FF9F43" />
            <Disclaimer />
            <Sfx name="pop" at={4} />
          </>
        )},
        // 8: three: count what you use  (the basket rides on to the outro)
        {body: (r) => (
          <>
            <PopIn at={-30} style={{left: 160, top: 250}}><Pill text="3 habits" bg="#2B1230" size={56} /></PopIn>
            <HabitCard n={1} text={H1} at={-30} x={160} y={380} />
            <HabitCard n={2} text={H2} at={-30} x={160} y={560} color="#FF9F43" />
            <HabitCard n={3} text={H3} at={4} x={160} y={740} color="#E5484D" />
            <Centered carried at={r('boxes')} x={CH6_BASKET.x} y={CH6_BASKET.y}><Prop name="v3/obj_basket.png" h={CH6_BASKET.h} /></Centered>
            <Disclaimer />
            <Sfx name="pop" at={4} /><Sfx name="pop" at={r('boxes')} />
          </>
        )},
      ]} />
    )}
  </ChapterShell>
);
