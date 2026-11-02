import React from 'react';
import {Pill, PopIn} from '../../style/style_kit';
import {BeforeAfter, Chip} from '../../video02/paper';
import {ChapterShell} from '../ChapterShell';
import {CheckRow, InfoCard, LeoBadge, P, PriceTag, Sfx, ShelfTag, Shots, ShrinkProp, WordSwipe} from '../v3kit';

export const Cold: React.FC = () => (
  <ChapterShell id="cold">
    {(b, len, c) => (
      <Shots b={b} len={len} c={c} src="v3/world_grocery.jpg" x0={420} list={[
        // 1: same box, same price, same spot... open it: less inside
        {body: (r) => (
          <>
            <BeforeAfter swapAt={r('openIt')}
              before={<P name="v3/obj_cereal_box.png" x={250} y={330} h={560} at={0} />}
              after={<P name="v3/obj_cereal_box_open.png" x={230} y={330} h={560} at={r('openIt')} />} />
            <PriceTag text="$4" at={r('samePrice')} x={820} y={290} />
            <Chip text="same spot on the shelf" at={r('sameSpot')} x={820} y={520} size={52} />
            <PopIn at={r('less')} style={{left: 820, top: 690}}><Pill text="...less inside" bg="#E5484D" size={64} /></PopIn>
            <Sfx name="pop" at={0} /><Sfx name="pop" at={r('samePrice')} /><Sfx name="pop" at={r('sameSpot')} /><Sfx name="pop" at={r('openIt')} /><Sfx name="shrink" at={r('less')} />
          </>
        )},
        // 2: nobody raised the price, no memo, the bag got lighter
        {body: (r) => (
          <>
            <PriceTag text="$4" at={0} x={200} y={290} />
            <CheckRow text="price: same" at={r('nobody', 4)} x={170} y={520} />
            <CheckRow text="no memo" ok={false} at={r('memo')} x={170} y={660} />
            <ShrinkProp name="v3/obj_snack_bag.png" h={560} x={1100} y={330} at={6} shrinkAt={r('lighter', 6)} to={0.78} />
            <Chip text="...lighter" kind="warn" at={r('lighter', 10)} x={1420} y={300} size={52} />
            <Sfx name="pop" at={6} /><Sfx name="pop" at={r('memo')} /><Sfx name="shrink" at={r('lighter', 6)} />
          </>
        )},
        // 3: it's called SHRINKFLATION + a tiny bug in your brain
        {body: (r) => (
          <>
            <WordSwipe text="shrinkflation" at={4} x={170} y={240} size={150} />
            <LeoBadge head="head_shocked.png" at={10} x={200} y={500} size={360} />
            <P name="v3/obj_brain_bug.png" x={1040} y={360} h={500} at={r('bug')} />
            <Chip text="a tiny bug" kind="warn" at={r('bug', 8)} x={1150} y={270} size={52} />
            <Sfx name="boom" at={4} /><Sfx name="pop" at={10} /><Sfx name="pop" at={r('bug')} />
          </>
        )},
        // 4: where it hides / why it works / the ONE number (holds into the sting)
        {body: (r) => (
          <>
            <P name="v3/obj_toilet_paper_pack.png" x={220} y={300} h={240} at={r('where', -4)} />
            <InfoCard title="Where it hides" at={r('where')} x={140} y={580} w={470} size={46} />
            <P name="v3/obj_brain_bug.png" x={760} y={320} h={220} at={r('why', -4)} />
            <InfoCard title="Why it works" at={r('why')} x={720} y={580} w={470} size={46} />
            <ShelfTag price="$4" unit="??" at={r('oneNumber', -4)} x={1310} y={330} scale={0.62} />
            <InfoCard title="The ONE number" sub="that catches it every time" at={r('oneNumber')} x={1300} y={580} w={480} size={46} bg="#FFE08A" />
            <Sfx name="pop" at={r('where')} /><Sfx name="pop" at={r('why')} /><Sfx name="pop" at={r('oneNumber')} /><Sfx name="scan_beep" at={r('catches')} />
          </>
        )},
      ]} />
    )}
  </ChapterShell>
);
