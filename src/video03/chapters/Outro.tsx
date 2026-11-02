import React from 'react';
import {Bubble, KeyTag, Pill, PopIn} from '../../style/style_kit';
import {Chip} from '../../video02/paper';
import {ChapterShell} from '../ChapterShell';
import {CH6_BASKET} from './Ch6';
import {Centered, Disclaimer, InfoCard, LeoBadge, PriceTag, Prop, Sfx, ShelfTag, Shots, WordSwipe} from '../v3kit';

/** The basket lands next to Leo. Everything in the outro stays LEFT of x 1060: x 1100-1790, y 230-930 is the end-screen area. */
const BASKET = {x: 880, y: 760};

export const Outro: React.FC = () => (
  <ChapterShell id="outro">
    {(b, len, c) => (
      <Shots b={b} len={len} c={c} src="v3/world_apartment.jpg" x0={900} list={[
        // 1: you're watching the wrong number: the price on the front is the one they want you to see
        {trans: 'join', pan: 'l', carry: {from: [CH6_BASKET.x, CH6_BASKET.y], to: [BASKET.x, BASKET.y], src: 'v3/obj_basket.png', h: CH6_BASKET.h, handoff: true}, body: (r) => (
          <>
            <LeoBadge head="head_thinking.png" at={8} x={150} y={300} size={360} />
            <Centered carried x={BASKET.x} y={BASKET.y}><Prop name="v3/obj_basket.png" h={CH6_BASKET.h} /></Centered>
            <PriceTag text="$4" at={r('wrongNum')} x={600} y={300} />
            <Chip text="the wrong number" kind="warn" at={r('wrongNum', 6)} x={600} y={500} size={44} />
            <Chip text="the one they want you to see" at={r('want')} x={150} y={860} size={40} />
            <Disclaimer />
            <Sfx name="whoosh" at={0} /><Sfx name="pop" at={8} /><Sfx name="pop" at={r('wrongNum')} /><Sfx name="pop" at={r('want')} />
          </>
        )},
        // 2: the unit price tells the truth
        {body: (r) => (
          <>
            <ShelfTag price="$4.00" unit="$0.29" at={4} x={150} y={300} scale={1.15} hiAt={14} />
            <KeyTag text="the one that tells the truth" at={18} style={{left: 160, top: 690}} size={64} />
            <Disclaimer />
            <Sfx name="pop" at={4} /><Sfx name="scan_beep" at={14} /><Sfx name="pop" at={18} />
          </>
        )},
        // 3: your challenge: next time you shop, check one thing you buy every week
        {body: (r) => (
          <>
            <PopIn at={2} style={{left: 150, top: 250}}><Pill text="YOUR CHALLENGE" bg="#E5484D" size={56} /></PopIn>
            <InfoCard title="Next time you shop:" sub="check ONE thing you buy every week" at={r('nextShop')} x={150} y={390} w={880} size={56} />
            <Centered at={r('weekly')} x={BASKET.x - 200} y={BASKET.y}><Prop name="v3/obj_basket.png" h={200} /></Centered>
            <Disclaimer />
            <Sfx name="notify" at={2} /><Sfx name="pop" at={r('nextShop')} /><Sfx name="pop" at={r('weekly')} />
          </>
        )},
        // 4: tell me in the comments: did it shrink?
        {body: (r) => (
          <>
            <Chip text="tell me in the comments" at={2} x={150} y={260} size={48} />
            <Bubble text="did it shrink?" at={r('shrink')} tail="left" style={{left: 150, top: 400}} size={80} />
            <LeoBadge head="head_suspicious.png" at={6} x={700} y={560} size={300} />
            <Disclaimer />
            <Sfx name="pop" at={2} /><Sfx name="pop" at={6} /><Sfx name="pop" at={r('shrink')} />
          </>
        )},
        // 5: subscribe + see you next time (end screen on the right)
        {body: (r) => (
          <>
            <LeoBadge head="head_happy.png" at={4} x={158} y={250} size={380} />
            <PopIn at={r('subscribe')} style={{left: 160, top: 680}}><Pill text="Subscribe" bg="#FFD23F" color="#191411" size={60} /></PopIn>
            <WordSwipe text="See you next time!" at={r('seeYou')} x={170} y={800} size={86} />
            <Disclaimer />
            <Sfx name="pop" at={4} /><Sfx name="pop" at={r('subscribe')} /><Sfx name="pop" at={r('seeYou')} />
          </>
        )},
      ]} />
    )}
  </ChapterShell>
);
