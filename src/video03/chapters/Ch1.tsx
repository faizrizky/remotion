import React from 'react';
import {Bubble, KeyTag, Pill, PopIn} from '../../style/style_kit';
import {BeforeAfter, Chip} from '../../video02/paper';
import {ChapterShell} from '../ChapterShell';
import {Centered, CheckRow, FromTo, InfoCard, P, PriceTag, Sfx, Shots, ShrinkProp, Src, TagNode, WordSwipe, Keep} from '../v3kit';

const SRC_TOB = 'BBC coverage of Mondelez, Nov 2016 (via Wikipedia: Shrinkflation)';
/** Where the "$4" tag sits in the last shot; Ch2 catches it (carry, pan right). */
export const CH1_TAG = {x: 1400, y: 520};

export const Ch1: React.FC = () => (
  <ChapterShell id="ch1">
    {(b, len, c) => (
      <Shots b={b} len={len} c={c} src="v3/world_pantry.jpg" x0={380} exitPan="r" list={[
        // 1: costs go up -> two options -> option one: $4 becomes $4.50, and you notice
        {body: (r) => (
          <>
            <Chip text="costs go up" kind="warn" at={r('costs')} x={170} y={250} size={52} />
            <Keep x={220} y={400} handoff><P name="v3/obj_cereal_box.png" x={220} y={400} h={480} at={r('box4', -6)} /></Keep>
            <PopIn at={r('twoOpt')} style={{left: 780, top: 250}}><Pill text="two options" bg="#2B1230" size={52} /></PopIn>
            <InfoCard title="Option 1: raise the price" at={r('opt1')} x={780} y={380} w={820} size={52} />
            <FromTo from="$4" to="$4.50" at={r('box4')} swapAt={r('b450')} x={800} y={560} size={110} />
            <Chip text="...and you notice" at={r('notice')} x={1340} y={820} size={46} />
            <Sfx name="pop" at={r('costs')} /><Sfx name="pop" at={r('twoOpt')} /><Sfx name="pop" at={r('opt1')} /><Sfx name="pop" at={r('box4')} />
          </>
        )},
        // 2: option two: keep $4, put less inside. Same price, less product = still a price increase
        {body: (r) => (
          <>
            <InfoCard title="Option 2: keep the price, put less inside" at={0} x={780} y={250} w={960} size={50} />
            <Keep x={220} y={400} handoff><ShrinkProp name="v3/obj_cereal_box.png" h={480} x={220} y={400} at={-30} shrinkAt={r('lessIn')} to={0.78} /></Keep>
            <PriceTag text="$4" at={r('keep4')} x={800} y={430} />
            <PopIn at={r('samePrice')} style={{left: 800, top: 650}}><Pill text="Same price. Less product." bg="#E5484D" size={52} /></PopIn>
            <KeyTag text="= still a price increase" at={r('stillHike')} style={{left: 810, top: 790}} size={64} />
            <Sfx name="pop" at={r('keep4')} /><Sfx name="shrink" at={r('lessIn')} /><Sfx name="pop" at={r('samePrice')} /><Sfx name="pop" at={r('stillHike')} />
          </>
        )},
        // 3: you can't see it. Economists call it shrinkflation: shrink + inflation. Not new.
        {body: (r) => (
          <>
            <div style={{position: 'absolute', left: 220, top: 400, width: 350, height: 480, border: '6px dashed rgba(25,20,17,0.55)', borderRadius: 18}} />
            <Keep x={220} y={400}><ShrinkProp name="v3/obj_cereal_box.png" h={480} x={220} y={400} at={-30} shrinkAt={-30} to={0.78} /></Keep>
            <Bubble text="you just can't see it" at={4} tail="left" style={{left: 700, top: 250}} size={54} />
            <WordSwipe text="shrinkflation" at={r('econ')} x={720} y={450} size={130} />
            <PopIn at={r('shrinkPlus')} style={{left: 730, top: 650}}><Pill text="shrink + inflation" bg="#2E86AB" size={56} /></PopIn>
            <Chip text="...and it's not new" at={r('notNew')} x={740} y={800} size={46} />
            <Sfx name="pop" at={4} /><Sfx name="pop" at={r('econ')} /><Sfx name="pop" at={r('shrinkPlus')} /><Sfx name="pop" at={r('notNew')} />
          </>
        )},
        // 4: UK 2016: a famous triangle bar widened the gaps
        {body: (r) => (
          <>
            <PopIn at={r('y2016')} style={{left: 170, top: 250}}><Pill text="UK, 2016" bg="#2B1230" size={56} /></PopIn>
            <Keep x={260} y={500} s={900} handoff>
              <BeforeAfter swapAt={r('gaps')}
                before={<P name="v3/obj_choc_peaks_full.png" x={260} y={440} w={900} at={r('toblerone')} />}
                after={<P name="v3/obj_choc_peaks_gappy.png" x={260} y={500} w={900} at={r('gaps')} />} />
            </Keep>
            <KeyTag text="wider gaps" at={r('gaps', 8)} style={{left: 1260, top: 330}} size={70} />
            <Src text={SRC_TOB} at={r('toblerone')} />
            <Sfx name="pop" at={r('y2016')} /><Sfx name="pop" at={r('toblerone')} /><Sfx name="shrink" at={r('gaps')} /><Sfx name="pop" at={r('gaps', 8)} />
          </>
        )},
        // 5: the big bar: 400 g -> 360 g
        {body: (r) => (
          <>
            <Keep x={150} y={600} s={760} from={{x: 260, y: 500, s: 900}} handoff><P name="v3/obj_choc_peaks_gappy.png" x={150} y={600} w={760} at={-30} /></Keep>
            <FromTo from="400 g" to="360 g" label="the big bar" at={4} swapAt={r('g360')} x={980} y={300} size={120} />
            <Src text={SRC_TOB} />
            <Sfx name="pop" at={4} />
          </>
        )},
        // 6: the shape stayed, the chocolate didn't. The "$4" tag rides on to the next chapter.
        {body: (r) => (
          <>
            <Keep x={170} y={290} s={900} from={{x: 150, y: 600, s: 760}}><P name="v3/obj_choc_peaks_gappy.png" x={170} y={290} w={900} at={-30} /></Keep>
            <CheckRow text="shape: same" at={6} x={260} y={600} />
            <CheckRow text="chocolate: less" ok={false} at={r('choco')} x={260} y={740} />
            <Centered carried at={r('choco', 14)} x={CH1_TAG.x} y={CH1_TAG.y}><TagNode text="$4" /></Centered>
            <Sfx name="pop" at={6} /><Sfx name="pop" at={r('choco')} /><Sfx name="pop" at={r('choco', 14)} />
          </>
        )},
      ]} />
    )}
  </ChapterShell>
);
