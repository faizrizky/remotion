import React from 'react';
import {KeyTag, Pill, PopIn, StickyNote} from '../../style/style_kit';
import {Chip} from '../../video02/paper';
import {ChapterShell} from '../ChapterShell';
import {CH2_NET} from './Ch2';
import {Centered, CheckRow, FromTo, LeoBadge, NetWt, P, PriceTag, Prop, Sfx, Shots, Src, WordSwipe} from '../v3kit';

const NPR = 'NPR, "Shrinkflation accelerates globally..." (June 8, 2022)';
/** Brand-named shots: generic products + "reported by NPR" caption (brand rule in 02_assets_sfx_music.md). */
const Brand: React.FC<{name: string}> = ({name}) => <Chip text={`${name} · as reported by NPR, 2022`} at={6} x={820} y={866} size={34} rot={0} />;
const NET_ON_PACK = {x: 760, y: 560};
/** Paper towel pack in the last shot; Ch4 catches it (carry, pan right). */
export const CH3_TOWELS = {x: 1630, y: 720, h: 260};

export const Ch3: React.FC = () => (
  <ChapterShell id="ch3">
    {(b, len, c) => (
      <Shots b={b} len={len} c={c} src="v3/world_household.jpg" x0={300} exitPan="r" list={[
        // 1: once you start looking... everywhere. NPR, 2022. (the net-weight label lands on the first pack)
        {trans: 'join', pan: 'l', carry: {from: [CH2_NET.x, CH2_NET.y], to: [NET_ON_PACK.x, NET_ON_PACK.y], node: <NetWt text="?? oz" hot />, handoff: true}, body: (r) => (
          <>
            <LeoBadge head="head_suspicious.png" at={10} x={150} y={330} size={360} />
            <P name="v3/obj_toilet_paper_pack.png" x={640} y={420} h={270} at={4} />
            <Centered x={NET_ON_PACK.x} y={NET_ON_PACK.y}><NetWt text="?? oz" hot /></Centered>
            <P name="v3/obj_tissue_box.png" x={960} y={500} h={190} at={r('everywhere')} />
            <P name="v3/obj_sports_bottle.png" x={1200} y={430} h={260} at={r('everywhere') + 5} />
            <P name="v3/obj_coffee_can.png" x={1330} y={450} h={240} at={r('everywhere') + 10} />
            <P name="v3/obj_wings_box.png" x={1530} y={480} h={210} at={r('everywhere') + 15} />
            <PopIn at={r('y2022')} style={{left: 640, top: 250}}><Pill text="2022: NPR documented a wave of it" bg="#2B1230" size={50} /></PopIn>
            <Chip text="Penny Logics is not affiliated with any brand mentioned." at={r('npr')} x={640} y={760} size={30} rot={0} />
            <Src text={NPR} at={r('npr')} />
            <Sfx name="whoosh" at={0} /><Sfx name="pop" at={10} />{[0, 5, 10, 15].map((k) => <Sfx key={k} name="pop" at={r('everywhere') + k} />)}<Sfx name="pop" at={r('y2022')} />
          </>
        )},
        // 2: toilet paper: 340 -> 312 sheets per roll
        {body: (r) => (
          <>
            <P name="v3/obj_toilet_paper_pack.png" x={180} y={360} h={520} at={4} />
            <FromTo from="340" to="312" unit="sheets per roll" at={r('sh340')} swapAt={r('sh312')} x={860} y={320} size={140} />
            <Brand name="Cottonelle" />
            <Src text={NPR} />
            <Sfx name="pop" at={4} /><Sfx name="pop" at={r('sh340')} /><Sfx name="shrink" at={r('sh312')} />
          </>
        )},
        // 3: tissues: 65 -> 60 per box
        {body: (r) => (
          <>
            <P name="v3/obj_tissue_box.png" x={170} y={430} h={420} at={4} />
            <FromTo from="65" to="60" unit="tissues per box" at={r('t65')} swapAt={r('t60')} x={860} y={320} size={140} />
            <Brand name="Kleenex" />
            <Src text={NPR} />
            <Sfx name="pop" at={4} /><Sfx name="pop" at={r('t65')} /><Sfx name="shrink" at={r('t60')} />
          </>
        )},
        // 4: sports drink: 32 oz -> 28 oz bottles
        {body: (r) => (
          <>
            <P name="v3/obj_sports_bottle.png" x={330} y={320} h={560} at={4} />
            <FromTo from="32 oz" to="28 oz" unit="per bottle" at={r('oz32')} swapAt={r('oz28')} x={860} y={320} size={130} />
            <Brand name="Gatorade" />
            <Src text={NPR} />
            <Sfx name="pop" at={4} /><Sfx name="pop" at={r('oz32')} /><Sfx name="shrink" at={r('oz28')} />
          </>
        )},
        // 5: coffee: 51 oz -> 43.5 oz, the can still says "up to 400 cups"
        {body: (r) => (
          <>
            <P name="v3/obj_coffee_can.png" x={230} y={330} h={540} at={4} />
            <FromTo from="51 oz" to="43.5 oz" unit="per can" at={r('oz51')} swapAt={r('oz435')} x={820} y={260} size={120} />
            <StickyNote text={'the can still says: "up to 400 cups"'} at={r('cups')} style={{left: 840, top: 560}} size={50} />
            <KeyTag text="really?" at={r('cups400') + 6} style={{left: 1440, top: 640}} size={70} />
            <Brand name="Folgers" />
            <Src text={NPR} />
            <Sfx name="pop" at={4} /><Sfx name="pop" at={r('oz51')} /><Sfx name="shrink" at={r('oz435')} /><Sfx name="pop" at={r('cups')} /><Sfx name="pop" at={r('cups400') + 6} />
          </>
        )},
        // 6: wings: 10 -> 8 pieces, same $7.99
        {body: (r) => (
          <>
            <P name="v3/obj_wings_box.png" x={170} y={400} h={450} at={4} />
            <FromTo from="10" to="8" unit="wings per order" at={r('w10')} swapAt={r('w8')} x={820} y={260} size={140} />
            <PriceTag text="$7.99" at={r('p799')} x={840} y={610} size={100} />
            <CheckRow text="same price" at={r('p799') + 10} x={1280} y={640} />
            <Brand name="Domino's" />
            <Src text={NPR} />
            <Sfx name="pop" at={4} /><Sfx name="pop" at={r('w10')} /><Sfx name="shrink" at={r('w8')} /><Sfx name="kaching" at={r('p799')} />
          </>
        )},
        // 7: its quieter cousin: SKIMPFLATION. Same size...
        {body: (r) => (
          <>
            <P name="v3/obj_breakfast_tray.png" x={150} y={440} w={560} at={4} />
            <Chip text="a quieter cousin" at={r('cousin')} x={780} y={260} size={50} />
            <WordSwipe text="skimpflation" at={r('skimp')} x={780} y={360} size={140} color="#9FD2F7" />
            <CheckRow text="same size" at={r('sameSize')} x={790} y={640} />
            <Src text="NPR Planet Money (Oct 2021), via Wikipedia: Shrinkflation" at={r('skimp')} />
            <Sfx name="pop" at={4} /><Sfx name="pop" at={r('cousin')} /><Sfx name="boom" at={r('skimp')} /><Sfx name="pop" at={r('sameSize')} />
          </>
        )},
        // 8: same price, but cheaper ingredients or less service; not on the label. (paper towels ride on to Ch4)
        {body: (r) => (
          <>
            <P name="v3/obj_breakfast_tray.png" x={150} y={440} w={560} />
            <CheckRow text="same size" at={-30} x={790} y={250} />
            <CheckRow text="same price" at={4} x={790} y={370} />
            <CheckRow text="cheaper ingredients" ok={false} at={r('cheaper')} x={790} y={490} />
            <CheckRow text="less service" ok={false} at={r('service')} x={790} y={610} />
            <KeyTag text="not even on the label" at={r('label')} style={{left: 790, top: 760}} size={64} />
            <Centered at={r('label') + 18} x={CH3_TOWELS.x} y={CH3_TOWELS.y}><Prop name="v3/obj_paper_towels.png" h={CH3_TOWELS.h} /></Centered>
            <Sfx name="pop" at={4} /><Sfx name="pop" at={r('cheaper')} /><Sfx name="pop" at={r('service')} /><Sfx name="pop" at={r('label')} /><Sfx name="pop" at={r('label') + 18} />
          </>
        )},
      ]} />
    )}
  </ChapterShell>
);
