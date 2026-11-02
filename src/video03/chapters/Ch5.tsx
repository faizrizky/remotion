import React from 'react';
import {Bubble, KeyTag, Pill, PopIn} from '../../style/style_kit';
import {Chip} from '../../video02/paper';
import {ChapterShell} from '../ChapterShell';
import {CH4_CEREAL} from './Ch4';
import {Centered, CheckRow, Flag, InfoCard, Magnifier, P, Prop, Sfx, ShrankSticker, Shots, Src, Stamp, Keep} from '../v3kit';

const FR = 'Euronews (July 3, 2024); service-public.gouv.fr';
const KR = 'KFTC 2024 rules (FoodNavigator, Aug 2024; Korea JoongAng Daily)';
const BOX = {x: 1520, y: 690};
/** Shelf sticker in the last shot; Ch6 catches it (carry, pan right). */
export const CH5_STICKER = {x: 1500, y: 760};

export const Ch5: React.FC = () => (
  <ChapterShell id="ch5">
    {(b, len, c) => (
      <Shots b={b} len={len} c={c} src="v3/world_hypermarket.jpg" x0={300} exitPan="r" list={[
        // 1: some governments: shoppers shouldn't have to play detective  (cereal box lands on the shelf)
        {trans: 'join', pan: 'l', carry: {from: [CH4_CEREAL.x, CH4_CEREAL.y], to: [BOX.x, BOX.y], src: 'v3/obj_cereal_box.png', h: CH4_CEREAL.h, handoff: true}, body: (r) => (
          <>
            <P name="v3/obj_gov_building.png" x={150} y={360} h={460} at={6} />
            <Centered carried x={BOX.x} y={BOX.y}><Prop name="v3/obj_cereal_box.png" h={CH4_CEREAL.h} /></Centered>
            <PopIn at={r('detective', -4)} style={{left: 860, top: 330}}><Magnifier size={300} /></PopIn>
            <Chip text="no more detective work" kind="warn" at={r('detective')} x={800} y={700} size={50} />
            <Sfx name="whoosh" at={0} /><Sfx name="pop" at={6} /><Sfx name="pop" at={r('detective')} />
          </>
        )},
        // 2: France, since July 2024: large supermarkets must put a notice...
        {body: (r) => (
          <>
            <PopIn at={4} style={{left: 170, top: 300}}><Flag kind="fr" h={220} /></PopIn>
            <PopIn at={r('july')} style={{left: 160, top: 600}}><Pill text="France · since July 2024" bg="#1F4E9E" size={48} /></PopIn>
            <InfoCard title="Large supermarkets must put up a notice" at={r('notice', -10)} x={780} y={270} w={940} size={50} />
            <PopIn at={r('notice')} style={{left: 900, top: 520}}><ShrankSticker size={240} /></PopIn>
            <Keep x={1260} y={470} s={400} handoff><P name="v3/obj_cereal_box.png" x={1260} y={470} h={400} at={r('notice', 6)} /></Keep>
            <Src text={FR} at={r('july')} />
            <Sfx name="pop" at={4} /><Sfx name="pop" at={r('july')} /><Sfx name="pop" at={r('notice', -10)} /><Sfx name="pop" at={r('notice')} />
          </>
        )},
        // 3: ...on products that shrank while the price per unit went up
        {body: (r) => (
          <>
            <Keep x={200} y={400} s={470} from={{x: 1260, y: 470, s: 400}}><P name="v3/obj_cereal_box.png" x={200} y={400} h={470} /></Keep>
            <PopIn at={r('shrank')} style={{left: 360, top: 300}}><ShrankSticker size={210} /></PopIn>
            <CheckRow text="the product shrank" at={r('shrank')} x={860} y={340} />
            <CheckRow text="price per unit went up" at={r('unit')} x={860} y={490} />
            <Chip text="both -> a notice on the shelf" at={r('unit', 16)} x={870} y={650} size={46} />
            <Src text={FR} />
            <Sfx name="pop" at={r('shrank')} /><Sfx name="pop" at={r('unit')} /><Sfx name="pop" at={r('unit', 16)} />
          </>
        )},
        // 4: break the rule -> fined up to EUR 15,000
        {body: (r) => (
          <>
            <InfoCard title="Companies that break the rule..." at={4} x={170} y={280} w={900} size={52} />
            <Stamp text="FINE: up to €15,000" at={r('eur')} x={300} y={530} size={92} rot={-6} />
            <Src text={FR} />
            <Sfx name="pop" at={4} /><Sfx name="stamp" at={r('eur')} />
          </>
        )},
        // 5 (wipe): South Korea: disclose it on the package, in the store, or online
        {trans: 'wipe', body: (r) => (
          <>
            <PopIn at={4} style={{left: 170, top: 300}}><Flag kind="kr" h={220} /></PopIn>
            <PopIn at={10} style={{left: 160, top: 600}}><Pill text="South Korea" bg="#D62E3B" size={52} /></PopIn>
            <Chip text="companies must disclose it:" at={r('korea', 20)} x={860} y={250} size={46} />
            <CheckRow text="on the package" at={r('pkg')} x={860} y={360} />
            <CheckRow text="in the store" at={r('store')} x={860} y={500} />
            <CheckRow text="or online" at={r('online')} x={860} y={640} />
            <Src text={KR} at={10} />
            <Sfx name="pop" at={4} /><Sfx name="pop" at={10} /><Sfx name="pop" at={r('pkg')} /><Sfx name="pop" at={r('store')} /><Sfx name="pop" at={r('online')} />
          </>
        )},
        // 6: the US: no national rule
        {body: (r) => (
          <>
            <P name="v3/obj_gov_building.png" x={150} y={360} h={460} at={4} />
            <PopIn at={6} style={{left: 860, top: 300}}><Pill text="United States" bg="#2B1230" size={56} /></PopIn>
            <CheckRow text="no national rule like that" ok={false} at={r('noRule')} x={860} y={470} />
            <Sfx name="pop" at={6} /><Sfx name="pop" at={r('noRule')} />
          </>
        )},
        // 7: bills proposed, none passed. On your own... almost. (the shelf sticker rides on to Ch6)
        {body: (r) => (
          <>
            <InfoCard title="Shrinkflation Prevention Act of 2024" sub="S.3819 / H.R.7825: introduced, never passed" at={4} x={160} y={270} w={860} size={46} rot={-2} />
            <Stamp text="NOT PASSED" at={r('nonePassed')} x={260} y={520} size={96} />
            <Bubble text="you're on your own..." at={r('own')} tail="left" style={{left: 1080, top: 280}} size={52} />
            <KeyTag text="...almost." at={r('almost')} style={{left: 1150, top: 470}} size={80} />
            <Centered carried at={r('almost', 8)} x={CH5_STICKER.x} y={CH5_STICKER.y}><ShrankSticker size={200} /></Centered>
            <Src text="Congress.gov, 118th Congress (S.3819)" at={r('nonePassed')} />
            <Sfx name="pop" at={4} /><Sfx name="stamp" at={r('nonePassed')} /><Sfx name="pop" at={r('own')} /><Sfx name="pop" at={r('almost')} />
          </>
        )},
      ]} />
    )}
  </ChapterShell>
);
