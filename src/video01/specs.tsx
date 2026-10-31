// Video 01 (How Credit Card Companies Make Money Off You) as data for the kit.
// One camera per chapter over a panorama (public/v1/bg), no title cards, Penny Logics sting after the hook.
// The credit card ('card') is the object carried through every camera move and every chapter entrance.
// Import only types + helpers from ../kit/core here (scripts/video.mjs bundles this file).
import type {ChapterSpec, Item} from '../kit/spec';
import type {Pose} from '../kit/core';
import {diveCam} from '../kit/core';

// ---------------------------------------------------------------- layout helpers
/** Stations sit 2200 px apart; every station has its own 2520 px backdrop image (overlap 320 px, edges blend). */
const ST = 2200;
const L = (k: number) => k * ST;
const CX = (k: number) => L(k) + 960;
const bg = (names: (string | null)[], stops: {x: number; c: string}[] = [{x: 0, c: 'sunrise'}]) => ({
  stops,
  images: names.flatMap((n, i) => (n ? [{src: `v1/bg/${n}.jpg`, x: i * ST - 300, w: 2520}] : [])),
});
/** Where the card waits while a station talks: top-right corner, small. */
const PARK = (k: number): [number, number, number, number] => [L(k) + 1580, 50, 0.7, 8];
/** Card travels with the camera: leaves 20 frames before the camera arrives, lands 6 after. */
const hop = (at: string, from: [number, number, number?, number?], k: number): Pose[] => [[`${at}-20`, ...from], [`${at}+6`, ...PARK(k)]];
const cardItem = (at: string | number, x: number, y: number, move: Pose[], extra: Partial<Item> = {}): Item => ({t: 'prop', id: 'card', src: 'v1/card.png', h: 170, at, x, y, move, trail: 2, z: 5, sfx: false, ...extra} as Item);
const cam = (at: string | number, k: number, z = 1, dx = 0): [string | number, number, number, number] => [at, CX(k) + dx, 540, z];
const label = (text: string, size = 44, w = 480): Item => ({t: 'text', text, size, w, align: 'center', x: 0, y: 0});

// ---------------------------------------------------------------- HOOK
const hook: ChapterSpec = {
  id: 'hook',
  sting: true,
  world: {w: 2 * ST + 1920, h: 1080},
  bg: bg(['hook_a', 'hook_b']),
  cam: [cam(0, 0), cam('twoSec', 1), cam('opening', 1), diveCam('machine', {x: L(1) + 760, y: 260, w: 534, h: 440}, 0.9)],
  sfx: [['tap', 'card_tap'], ['paid1', 'kaching'], ['paid2', 'kaching'], ['paid3', 'kaching'], ['ontime', 'card_tap']],
  items: [
    // S0: $5 coffee, tap, points
    {t: 'shadow', x: 110, y: 950, w: 360},
    {t: 'leo', at: 0, x: 90, y: 200, heads: [[0, 'head_happy.png'], ['smart', 'head_proud.png']]},
    {t: 'prop', at: 'coffee', x: 1280, y: 560, src: 'v1/coffee.png', h: 330},
    {t: 'chip', at: 'coffee', x: 1520, y: 600, text: '$5 coffee', kind: 'label', size: 48},
    {t: 'prop', at: 'coffee+4', x: 860, y: 560, src: 'v1/terminal.png', h: 340},
    cardItem('tap-14', 520, 650, [['tap', 900, 600, 1, -12], ...hop('twoSec', [900, 600, 1, -12], 1), ['machine-10', ...PARK(1)], ['machine+8', L(1) + 930, 520, 0.6, 0]]),
    {t: 'ripple', at: 'tap', x: 1030, y: 690},
    {t: 'tag', at: 'points', x: 860, y: 440, text: '+ points', bg: '#FFD23F', rot: -4},
    {t: 'bubble', at: 'smart', x: 520, y: 130, text: 'Nice. Smart move.', tail: 'left', size: 54},
    // S1: three companies get paid
    {t: 'punch', at: 'twoSec', out: 'strange', y: 50, text: '2 seconds. 3 companies paid.', size: 96},
    ...[
      {x: 150, at: 'p1', src: 'obj_bank_transparent.png', t: 'The bank', done: 'paid1', rot: -1.2},
      {x: 720, at: 'p2', src: 'v1/card_blue.png', t: 'The card network', done: 'paid2', rot: 1},
      {x: 1290, at: 'p3', src: 'v1/terminal.png', t: 'The processor', done: 'paid3', rot: -1.2},
    ].map((c): Item => ({t: 'card', at: c.at, out: 'strange', x: L(1) + c.x, y: 250, w: 480, h: 600, rot: c.rot, kids: [
      {t: 'prop', at: c.at, x: 80, y: 50, src: c.src, w: 320, sfx: false},
      {...label(c.t), at: c.at, y: 520},
      {t: 'prop', at: c.done, x: 340, y: -40, src: 'v1/icon_check.png', h: 130, sfx: false},
    ]})),
    {t: 'pill', at: 'companies', out: 'strange', x: L(1) + 600, y: 900, text: 'all from one $5 tap', bg: '#FF6B6B', size: 44},
    // S2: they profit either way, then into the machine
    {t: 'shadow', at: 'strange', x: L(1) + 110, y: 950, w: 360},
    {t: 'leo', at: 'strange', x: L(1) + 90, y: 200, enter: 'left', heads: [['strange', 'head_suspicious.png'], ['check', 'head_shocked.png']]},
    {t: 'pill', at: 'strange+4', x: L(1) + 600, y: 70, text: 'They profit either way', bg: '#2B2F77', size: 64},
    {t: 'card', at: 'ontime', out: 'opening', x: L(1) + 640, y: 290, w: 500, h: 460, rot: -1.5, kids: [
      {...label('Pays on time', 48, 500), at: 'ontime', y: 40},
      {t: 'prop', at: 'ontime', x: 95, y: 140, src: 'v1/card_mustard.png', h: 200, sfx: false},
      {t: 'prop', at: 'check', x: 350, y: 290, src: 'v1/icon_check.png', h: 150},
    ]},
    {t: 'card', at: 'ontime+8', out: 'opening', x: L(1) + 1230, y: 290, w: 500, h: 460, rot: 1.5, kids: [
      {...label('Pays late', 48, 500), at: 'ontime+8', y: 40},
      {t: 'prop', at: 'ontime+8', x: 120, y: 140, src: 'v1/calendar_due.png', h: 200, sfx: false},
      {t: 'prop', at: 'cross', x: 350, y: 290, src: 'v1/icon_cross.png', h: 150},
    ]},
    {t: 'prop', at: 'opening', x: L(1) + 760, y: 250, src: 'v1/terminal.png', h: 460, enter: 'right', sfx: 'whoosh'},
    {t: 'tag', at: 'opening+6', x: L(1) + 780, y: 770, text: 'Inside the machine…', bg: '#FFD23F', size: 56},
  ],
};

// ---------------------------------------------------------------- TRICK 1: the swipe
const t1: ChapterSpec = {
  id: 't1',
  enter: {kind: 'whip', carry: 'card'},
  world: {w: 3 * ST + 1920, h: 1080},
  bg: bg(['t1_a', 't1_b', 't1_c', 'hook_a']),
  cam: [cam(0, 0), cam('fee', 1), cam('pct', 2), cam('b198', 2, 1.04), cam('b66', 2), cam('pct11', 2, 1.04), cam('who', 3)],
  sfx: [['tap', 'card_tap']],
  items: [
    // k0: follow the $5
    {t: 'prop', at: 0, x: 150, y: 520, src: 'v1/coffee.png', h: 330},
    {t: 'price', at: 4, x: 120, y: 380, text: '$5.00', color: '#FFD23F', size: 96},
    {t: 'punch', at: 4, out: 'fee', y: 60, text: "Let's follow that $5", size: 90},
    {t: 'prop', at: 'tap-10', x: 790, y: 520, src: 'v1/terminal.png', h: 360},
    cardItem(0, 470, 760, [['tap', 860, 640, 1, -14], ...hop('fee', [860, 640, 1, -14], 1), ['pct-20', ...PARK(1)], ['pct+6', L(2) + 120, 300, 1.2, 0], ['multiply', L(2) + 120, 300, 1.2, 0], ['multiply+10', ...PARK(2)], ...hop('who', PARK(2), 3), ['who+30', ...PARK(3)], ['who+44', L(3) + 430, 600, 0.6, -10]]),
    {t: 'ripple', at: 'tap', x: 980, y: 700},
    {t: 'arrow', at: 'notFive', x: 1200, y: 700, x2: 1480, y2: 700},
    {t: 'prop', at: 'notFive', x: 1500, y: 560, src: 'v1/bill.png', w: 320},
    {t: 'price', at: 'little', x: 1480, y: 360, text: '$4.85', color: '#8FE3A8', size: 96, rot: 5},
    // k1: swipe fee -> interchange -> issuing bank
    {t: 'prop', at: 'fee', x: L(1) + 160, y: 480, src: 'v1/terminal.png', h: 380},
    {t: 'chip', at: 'swipe', x: L(1) + 420, y: 150, text: 'SWIPE FEE', kind: 'warn', size: 80, rot: -3},
    {t: 'chip', at: 'interchange', x: L(1) + 660, y: 290, text: 'INTERCHANGE', kind: 'label', size: 80, rot: 2},
    {t: 'arrow', at: 'issuer', x: L(1) + 620, y: 660, x2: L(1) + 1260, y2: 660},
    {t: 'prop', at: 'issuer', x: L(1) + 1280, y: 440, src: 'obj_bank_transparent.png', h: 380},
    {t: 'coins', at: 'issuer+8', x: L(1) + 620, y: 660, x2: L(1) + 1260, y2: 660, n: 2, gap: 12, label: '¢'},
    {t: 'tag', at: 'bank', x: L(1) + 1000, y: 900, text: 'The bank that issued your card', size: 40},
    // k2: 2-3% of every purchase
    {t: 'price', at: 'two', out: 'multiply', x: L(2) + 470, y: 260, text: '2–3%', color: '#FF6B6B', size: 170},
    {t: 'prop', at: 'coffee', out: 'multiply', x: L(2) + 250, y: 600, src: 'v1/coffee.png', h: 300},
    {t: 'arrow', at: 'coffee+4', out: 'multiply', x: L(2) + 520, y: 760, x2: L(2) + 820, y2: 760},
    {t: 'price', at: 'cents', out: 'multiply', x: L(2) + 850, y: 640, text: '10–15¢', color: '#FFD23F', size: 140, rot: 3},
    {t: 'bubble', at: 'tiny', out: 'multiply', x: L(2) + 1150, y: 130, text: 'Tiny, right?', tail: 'right', size: 60},
    {t: 'badge', at: 'tiny', out: 'multiply', x: L(2) + 1400, y: 420, head: 'head_suspicious.png', size: 340},
    // k2: multiply it
    {t: 'punch', at: 'multiply', out: 'b198', y: 50, text: 'Now multiply it', size: 80},
    {t: 'text', at: 'everyCard', out: 'b198', x: L(2) + 300, y: 220, text: '× every card', size: 110},
    {t: 'text', at: 'everyBuy', out: 'b198', x: L(2) + 300, y: 370, text: '× every purchase', size: 110},
    {t: 'text', at: 'everyDay', out: 'b198', x: L(2) + 300, y: 520, text: '× every day', size: 110},
    {t: 'prop', at: 'everyCard', out: 'b198', x: L(2) + 300, y: 740, src: 'v1/coin.png', h: 160},
    {t: 'prop', at: 'everyBuy', out: 'b198', x: L(2) + 600, y: 700, src: 'v1/coin_dollar.png', h: 220},
    {t: 'prop', at: 'everyDay', out: 'b198', x: L(2) + 1420, y: 520, src: 'v1/coinstack_giant.png', h: 470, sfx: 'kaching'},
    // k2: $198B, $66B, 11%
    {t: 'stat', at: 'n198-20', out: 'b66', x: L(2) + 170, y: 300, prefix: '$', to: 198, suffix: 'B', label: 'card swipe fees, 2025', w: 640, bg: '#FFF4E0', sfx: 'kaching'},
    {t: 'prop', at: 'b198', out: 'b66', x: L(2) + 1200, y: 150, src: 'v1/bld_nilson.png', h: 620},
    {t: 'chip', at: 'n198+10', out: 'b66', x: L(2) + 290, y: 680, text: 'a record', kind: 'warn', size: 64},
    {t: 'src', at: 'nilson', out: 'b66', text: 'Nilson Report'},
    {t: 'stat', at: 'n66-20', out: 'pct11', x: L(2) + 170, y: 300, prefix: '$', to: 66, suffix: 'B', label: 'interchange kept by US banks', w: 700, bg: '#FFF4E0', sfx: 'kaching'},
    {t: 'prop', at: 'b66', out: 'pct11', x: L(2) + 1010, y: 330, src: 'v1/bld_stlouisfed.png', w: 720},
    {t: 'src', at: 'fed', out: 'pct11', text: 'Federal Reserve Bank of St. Louis'},
    {t: 'stat', at: 'pct11+4', out: 'who', x: L(2) + 170, y: 300, to: 11, suffix: '%', label: "of banks' non-interest income", w: 640, bg: '#FFF4E0'},
    {t: 'pct', at: 'pct11+10', out: 'who', x: L(2) + 980, y: 300, n: 11, dot: 44, gap: 16},
    {t: 'text', at: 'pct11+40', out: 'who', x: L(2) + 170, y: 640, text: 'from tiny fees', size: 80},
    // k3: back at the cafe - who really pays?
    {t: 'shadow', x: L(3) + 110, y: 950, w: 360},
    {t: 'leo', at: 'who-10', x: L(3) + 90, y: 200, heads: [['who-10', 'head_thinking.png'], ['cash', 'head_suspicious.png']]},
    {t: 'bubble', at: 'who+4', x: L(3) + 520, y: 140, text: 'Who really pays?', tail: 'left', size: 56},
    {t: 'prop', at: 'builds', x: L(3) + 1020, y: 560, src: 'v1/coffee.png', h: 300},
    {t: 'price', at: 'tag1', x: L(3) + 960, y: 430, text: '$5.00', color: '#FFD23F', size: 80},
    {t: 'price', at: 'tag2', x: L(3) + 1260, y: 430, text: '$5.15', color: '#FFB347', size: 80, rot: 4},
    {t: 'price', at: 'tag3', x: L(3) + 1560, y: 430, text: '$5.30', color: '#FF8A5C', size: 80, rot: -4},
    {t: 'prop', at: 'cash', x: L(3) + 1330, y: 620, src: 'v1/bill.png', w: 420, sfx: 'kaching'},
    {t: 'tag', at: 'cashTag', x: L(3) + 1160, y: 860, text: 'even cash pays for it', bg: '#FFFFFF', size: 44},
  ],
};

// ---------------------------------------------------------------- TRICK 2: the interest machine
const t2: ChapterSpec = {
  id: 't2',
  enter: {kind: 'whip', carry: 'card'},
  world: {w: 2 * ST + 1920, h: 1080},
  bg: bg(['t2_a', 't2_b', 't2_c']),
  cam: [cam(0, 0), cam('carry', 1), cam('leo', 2), cam('zoom', 2, 1.05)],
  items: [
    // k0: quiet money vs loud money, then card -> due date -> interest -> bank
    cardItem(0, 300, 640, [['full', 130, 470, 1.4, 0], ...hop('carry', [130, 470, 1.4, 0], 1), ...hop('leo', PARK(1), 2)]),
    {t: 'punch', at: 'quiet', out: 'full', y: 130, text: 'Swipe fees = the quiet money', size: 92},
    {t: 'text', at: 'loud', out: 'full', x: 300, y: 380, text: 'Interest = the LOUD money', size: 110, color: '#D9304E'},
    {t: 'embers', at: 'loud', out: 'full', n: 26, color: '#FF7A3D'},
    {t: 'prop', at: 'loud', out: 'full', x: 820, y: 620, src: 'v1/coin_pipe.png', h: 300, sfx: 'kaching'},
    {t: 'chip', at: 'due-24', x: 110, y: 330, text: 'not paid in full', kind: 'warn', size: 46},
    {t: 'arrow', at: 'due-14', x: 500, y: 570, x2: 640, y2: 570},
    {t: 'prop', at: 'due-10', x: 660, y: 410, src: 'v1/calendar_due.png', h: 290},
    {t: 'arrow', at: 'interest-10', x: 1040, y: 570, x2: 1130, y2: 570},
    {t: 'prop', at: 'interest', x: 1150, y: 380, src: 'v1/coin_pipe.png', h: 320},
    {t: 'prop', at: 'interest+6', x: 1500, y: 410, src: 'obj_bank_transparent.png', h: 300},
    {t: 'chip', at: 'interest', x: 1000, y: 250, text: "interest on what's left", kind: 'label', size: 50},
    {t: 'coins', at: 'interest+12', x: 1250, y: 560, x2: 1580, y2: 560, n: 1, label: '$'},
    // k1: 22% APR, store cards
    {t: 'stat', at: 'apr22-20', out: 'store', x: L(1) + 150, y: 260, to: 22, suffix: '%', label: 'average yearly interest (APR) when you carry a balance', w: 700, bg: '#FFF4E0', sfx: 'kaching'},
    {t: 'prop', at: 'fed', out: 'store', x: L(1) + 960, y: 330, src: 'bld_fed_g19_transparent.png', w: 800},
    {t: 'src', at: 'fed', out: 'store', text: 'Federal Reserve (G.19)'},
    {t: 'prop', at: 'store', x: L(1) + 250, y: 330, src: 'v1/card_bag.png', h: 420},
    {t: 'sticker', at: 'store+6', x: L(1) + 820, y: 400, top: 'Store cards', main: 'often even higher', palette: 'rose'},
    // k2: Leo's $5,000 - the dripping tap
    {t: 'shadow', at: 'leo', out: 'zoom', x: L(2) + 110, y: 950, w: 360},
    {t: 'leo', at: 'leo-10', out: 'zoom', x: L(2) + 90, y: 200, heads: [['leo-10', 'head_tired.png'], ['nothing', 'head_shocked.png']]},
    {t: 'prop', at: 'leo+6', out: 'zoom', x: L(2) + 650, y: 540, src: 'obj_coinstack_transparent.png', h: 340},
    {t: 'tag', at: 'leo+8', out: 'zoom', x: L(2) + 600, y: 440, text: '$5,000 balance', bg: '#FFD23F', size: 44},
    {t: 'tag', at: 'allYear', out: 'zoom', x: L(2) + 600, y: 900, text: 'all year at 22%', size: 40},
    {t: 'prop', at: 's1100', out: 'zoom', x: L(2) + 1080, y: 380, src: 'v1/faucet.png', h: 360},
    {t: 'money', at: 's1100', out: 'zoom', x: L(2) + 1160, y: 760, to: 1100, prefix: '$', suffix: '+', size: 110, color: '#D9304E', sfx: 'kaching'},
    {t: 'chip', at: 'nothing', out: 'zoom', x: L(2) + 1060, y: 250, text: 'buys absolutely nothing', kind: 'warn', size: 54},
    {t: 'coins', at: 's1100+8', out: 'zoom', x: L(2) + 1250, y: 650, x2: L(2) + 1250, y2: 900, n: 1, label: '$', sfx: false},
    // k2: $105B -> $160B, the engine
    {t: 'prop', at: 'zoom', x: L(2) + 130, y: 360, src: 'v1/flag_us.png', h: 240},
    {t: 'chip', at: 'y2024-10', x: L(2) + 110, y: 200, text: 'interest charged in the US', kind: 'label', size: 44},
    {t: 'bar', at: 'b160', x: L(2) + 940, y: 880 - 460, h: 460, color: '#FF6B6B', label: '2024', value: '$160B', sfx: 'kaching'},
    {t: 'bar', at: 'b105', x: L(2) + 560, y: 880 - 302, h: 302, color: '#FFD23F', label: '2022', value: '$105B', sfx: 'kaching'},
    {t: 'prop', at: 'engine', x: L(2) + 1400, y: 380, src: 'v1/gears.png', h: 400},
    {t: 'punch', at: 'engine', y: 50, text: "That's the engine.", size: 100},
    {t: 'src', at: 'y2024', text: 'Federal Reserve data'},
  ],
};

// ---------------------------------------------------------------- TRICK 3: points aren't free
const t3: ChapterSpec = {
  id: 't3',
  enter: {kind: 'whip', carry: 'card'},
  world: {w: ST + 1920, h: 1080},
  bg: bg(['t3_a', 't3_b']),
  cam: [cam(0, 0), cam('cfpb', 1), cam('split', 1, 1.03), cam('full', 1), cam('other', 1, 1.03)],
  items: [
    cardItem(0, PARK(0)[0], PARK(0)[1], [[0, ...PARK(0)], ...hop('cfpb', PARK(0), 1)]),
    // k0: is the bank giving money back?
    {t: 'prop', at: 'cashback', x: 140, y: 420, src: 'v1/icon_cashback.png', h: 230},
    {t: 'prop', at: 'cashback+8', x: 450, y: 440, src: 'v1/icon_star.png', h: 200},
    {t: 'prop', at: 'cashback+16', x: 720, y: 430, src: 'v1/icon_plane.png', h: 210},
    {t: 'prop', at: 'cashback+24', x: 160, y: 700, src: 'v1/boarding_pass.png', h: 190},
    {t: 'bubble', at: 'giving', x: 980, y: 190, w: 620, text: "Isn't the bank giving money back?", tail: 'right', size: 52},
    {t: 'badge', at: 'giving', x: 1300, y: 470, head: 'head_thinking.png', size: 380},
    {t: 'chip', at: 'interesting', x: 110, y: 200, text: 'this is where it gets interesting', kind: 'label', size: 46},
    // k1: CFPB looked at who earns the rewards
    {t: 'prop', at: 'cfpb', out: 'split', x: L(1) + 190, y: 270, src: 'v1/clipboard.png', h: 560},
    {t: 'prop', at: 'cfpb+6', out: 'split', x: L(1) + 740, y: 400, src: 'bld_cfpb_transparent.png', w: 900},
    {t: 'chip', at: 'cfpb+12', out: 'split', x: L(1) + 640, y: 240, text: 'Consumer Financial Protection Bureau', kind: 'label', size: 44},
    {t: 'src', at: 'looked', out: 'other', text: 'CFPB'},
    // carries a balance
    {t: 'prop', at: 'split', out: 'full', x: L(1) + 110, y: 380, src: 'v1/wallet_red.png', h: 380},
    {t: 'chip', at: 'carried-6', out: 'full', x: L(1) + 90, y: 270, text: 'carries a balance', kind: 'warn', size: 52},
    {t: 'stat', at: 'p94-20', out: 'full', x: L(1) + 640, y: 300, to: 94, suffix: '%', label: 'of interest & fees paid', w: 520, bg: '#FFD6D6', sfx: 'kaching'},
    {t: 'stat', at: 'r27-20', out: 'full', x: L(1) + 1230, y: 300, to: 27, suffix: '%', label: 'of the rewards earned', w: 520, bg: '#FFF4E0', sfx: 'kaching'},
    // pays in full
    {t: 'prop', at: 'full', out: 'other', x: L(1) + 110, y: 380, src: 'v1/wallet_gold.png', h: 380},
    {t: 'chip', at: 'full+6', out: 'other', x: L(1) + 110, y: 270, text: 'pays in full', kind: 'label', size: 52},
    {t: 'stat', at: 'p6-20', out: 'other', x: L(1) + 640, y: 300, to: 6, suffix: '%', label: 'of interest & fees paid', w: 520, bg: '#FFF4E0', sfx: 'kaching'},
    {t: 'stat', at: 'r73-20', out: 'other', x: L(1) + 1230, y: 300, to: 73, suffix: '%', label: 'of the rewards earned', w: 520, bg: '#D8F5DC', sfx: 'kaching'},
    // one wallet pays for the other
    {t: 'prop', at: 'other', x: L(1) + 150, y: 420, src: 'v1/wallet_red.png', h: 320},
    {t: 'prop', at: 'other', x: L(1) + 1400, y: 420, src: 'v1/wallet_gold.png', h: 320, sfx: false},
    {t: 'arrow', at: 'funded-12', x: L(1) + 560, y: 580, x2: L(1) + 1340, y2: 580},
    {t: 'coins', at: 'funded', x: L(1) + 560, y: 580, x2: L(1) + 1340, y2: 580, n: 4, gap: 14, label: '$'},
    {t: 'chip', at: 'funded', x: L(1) + 640, y: 240, text: 'swipe fees', kind: 'label', size: 46},
    {t: 'chip', at: 'struggling', x: L(1) + 640, y: 340, text: 'people who struggle', kind: 'warn', size: 46},
    {t: 'sticker', at: 'wallet', x: L(1) + 420, y: 720, top: 'Free points in one wallet', main: 'paid by interest in another', palette: 'lilac'},
  ],
};

// ---------------------------------------------------------------- TRICK 4: built to keep you paying
const t4: ChapterSpec = {
  id: 't4',
  enter: {kind: 'whip', carry: 'card'},
  world: {w: 2 * ST + 1920, h: 1080},
  bg: bg(['t4_a', 't4_b', 't4_c']),
  cam: [cam(0, 0), cam('minimum', 1), cam('cfpb', 1, 1.04), cam('fees', 2)],
  items: [
    cardItem(0, PARK(0)[0], PARK(0)[1], [[0, ...PARK(0)], ...hop('minimum', PARK(0), 1), ...hop('fees', PARK(1), 2)]),
    // k0: not an accident - your statement
    {t: 'punch', at: 'accident', out: 'minimum', y: 80, text: 'None of this is an accident.', size: 90},
    // the statement is carried to the next station
    {t: 'prop', id: 'stmt', at: 'look', out: 'cfpb', x: 560, y: 250, src: 'v1/statement_min.png', h: 640, move: [['minimum-20', 560, 250, 1], ['minimum+6', L(1) + 140, 330, 0.66]], trail: 2},
    {t: 'chip', at: 'look', x: 120, y: 420, text: 'Look at your statement', kind: 'label', size: 48},
    {t: 'chip', at: 'biggest', x: 1250, y: 420, text: 'the biggest, friendliest number', kind: 'warn', size: 42, rot: 2},
    // k1: the minimum keeps the balance alive
    {t: 'mark', at: 'minimum+8', out: 'cfpb', x: L(1) + 150, y: 560, kind: 'circle', w: 310, h: 130},
    {t: 'prop', at: 'manage', out: 'cfpb', x: L(1) + 700, y: 400, src: 'v1/treadmill.png', h: 340},
    {t: 'chip', at: 'alive', out: 'cfpb', x: L(1) + 640, y: 290, text: 'balance stays alive', kind: 'warn', size: 50},
    {t: 'arrow', at: 'earning', out: 'cfpb', x: L(1) + 1100, y: 560, x2: L(1) + 1380, y2: 560},
    {t: 'prop', at: 'earning', out: 'cfpb', x: L(1) + 1400, y: 420, src: 'obj_bank_transparent.png', h: 300},
    {t: 'coins', at: 'forBank', out: 'cfpb', x: L(1) + 1100, y: 560, x2: L(1) + 1420, y2: 560, n: 3, gap: 14, label: '$'},
    {t: 'chip', at: 'forBank', out: 'cfpb', x: L(1) + 1100, y: 340, text: 'more interest for the bank', kind: 'label', size: 44},
    // k1: 15% paid only the minimum
    {t: 'stat', at: 'fifteen-20', out: 'fees', x: L(1) + 150, y: 280, to: 15, suffix: '%', label: 'paid only the minimum, 2024', w: 620, bg: '#FFF4E0', sfx: 'kaching'},
    {t: 'pct', at: 'fifteen', out: 'fees', x: L(1) + 980, y: 280, n: 15, dot: 44, gap: 16},
    {t: 'chip', at: 'decade', out: 'fees', x: L(1) + 150, y: 660, text: 'the highest in at least a decade', kind: 'warn', size: 46},
    {t: 'src', at: 'cfpb', out: 'fees', text: 'CFPB'},
    // k2: the fees
    ...[
      {x: 120, at: 'late', src: 'v1/icon_late.png', t: 'Late fee', rot: -1.5},
      {x: 520, at: 'cash', src: 'v1/atm.png', t: 'Cash advance', rot: 1.2},
      {x: 920, at: 'transfer', src: 'v1/transfer_cards.png', t: 'Balance transfer', rot: -1.2},
      {x: 1320, at: 'annual', src: 'v1/ticket_annual.png', t: 'Annual fee', rot: 1.5},
    ].map((c): Item => ({t: 'card', at: c.at, x: L(2) + c.x, y: 180, w: 360, h: 440, rot: c.rot, kids: [
      {t: 'prop', at: c.at, x: 55, y: 30, src: c.src, w: 250, sfx: false},
      {...label(c.t, 38, 360), at: c.at, y: 370},
    ]})),
    {t: 'pill', at: 'small', x: L(2) + 140, y: 700, text: 'each one is small', bg: '#2B2F77', size: 44},
    {t: 'prop', at: 'together', x: L(2) + 1500, y: 640, src: 'v1/coinstack_giant.png', h: 330, sfx: 'kaching'},
    {t: 'sticker', at: 'tens', x: L(2) + 620, y: 690, top: 'Together', main: 'tens of billions a year', palette: 'sunrise'},
  ],
};

// ---------------------------------------------------------------- THE THREE CUSTOMERS
// One hallway; the doors themselves are carried: the one being talked about slides to the left,
// the others step out of frame and come back, and all three end up on the seesaw.
const DOOR_L: [number, number, number] = [130, 270, 0.97];
const cust: ChapterSpec = {
  id: 'cust',
  enter: {kind: 'whip', carry: 'card'},
  world: {w: 1920, h: 1080},
  bg: bg(['cust_a']),
  cam: [cam(0, 0), cam('first', 0, 1.03), cam('second', 0), cam('third', 0, 1.03), cam('balance', 0)],
  sfx: [['stop', 'card_tap']],
  items: [
    cardItem(0, PARK(0)[0], PARK(0)[1], [[0, ...PARK(0)]]),
    {t: 'punch', at: 'three', out: 'first', y: 70, text: 'Three kinds of customers', size: 96},
    {t: 'prop', id: 'd1', at: 'three+6', x: 360, y: 260, src: 'v1/door_blue.png', h: 620, move: [['first-8', 360, 260, 1], ['first+8', ...DOOR_L], ['second-8', ...DOOR_L], ['second+8', -900, 270, 0.97], ['balance-8', -900, 270, 0.97], ['balance+10', 560, 340, 0.39]]},
    {t: 'prop', id: 'd2', at: 'three+14', x: 820, y: 260, src: 'v1/door_yellow.png', h: 620, move: [['first-8', 820, 260, 1], ['first+8', 2300, 260, 1], ['second-8', 2300, 260, 1], ['second+8', ...DOOR_L], ['third-8', ...DOOR_L], ['third+8', -900, 270, 0.97], ['balance-8', -900, 270, 0.97], ['balance+10', 880, 300, 0.39]]},
    {t: 'prop', id: 'd3', at: 'three+22', x: 1280, y: 260, src: 'v1/door_coral_open.png', h: 620, move: [['first-8', 1280, 260, 1], ['first+8', 2300, 260, 1], ['third-8', 2300, 260, 1], ['third+8', ...DOOR_L], ['balance-8', ...DOOR_L], ['balance+10', 1180, 370, 0.39]]},
    // door 1: pays in full
    {t: 'person', at: 'first+6', out: 'second', x: 600, y: 440, color: '#2E86AB', h: 300},
    {t: 'pill', at: 'full-6', out: 'second', x: 560, y: 150, text: 'Pays in full', bg: '#2E86AB', size: 56},
    {t: 'chip', at: 'swipe', out: 'second', x: 950, y: 300, text: 'bank earns swipe fees', kind: 'label', size: 44},
    {t: 'chip', at: 'rewards', out: 'second', x: 950, y: 400, text: 'but pays out rewards', kind: 'warn', size: 44},
    {t: 'prop', at: 'insiders', out: 'second', x: 1100, y: 540, src: 'v1/label_deadbeats.png', w: 560},
    {t: 'chip', at: 'noInt', out: 'second', x: 1050, y: 880, text: 'no interest paid', kind: 'label', size: 44},
    // door 2: pays steadily
    {t: 'person', at: 'second+6', out: 'third', x: 600, y: 440, color: '#E8A33D', h: 300},
    {t: 'pill', at: 'steady-4', out: 'third', x: 560, y: 150, text: 'Pays steadily', bg: '#C07A10', size: 56},
    {t: 'prop', at: 'profit', out: 'third', x: 980, y: 220, src: 'v1/icon_star.png', h: 240, sfx: 'kaching'},
    {t: 'chip', at: 'profit', out: 'third', x: 950, y: 500, text: 'most profitable customer', kind: 'warn', size: 50},
    {t: 'prop', at: 'monthly', out: 'third', x: 1300, y: 600, src: 'v1/calendar_loop.png', h: 280},
    {t: 'chip', at: 'years', out: 'third', x: 900, y: 900, text: 'interest every month, for years', kind: 'label', size: 44},
    // door 3: falling behind
    {t: 'person', at: 'third+6', out: 'balance', x: 640, y: 440, color: '#D9506E', h: 300},
    {t: 'pill', at: 'third+4', out: 'balance', x: 600, y: 150, text: 'Falling behind', bg: '#B93A56', size: 56},
    {t: 'chip', at: 'fees', out: 'balance', x: 1050, y: 260, text: 'pays the most in fees', kind: 'warn', size: 46},
    {t: 'chip', at: 'risky', out: 'balance', x: 1050, y: 370, text: 'but the riskiest', kind: 'label', size: 46},
    {t: 'prop', at: 'stop', out: 'balance', x: 1150, y: 480, src: 'v1/chain_broken.png', h: 340, sfx: false},
    {t: 'chip', at: 'stop', out: 'balance', x: 900, y: 880, text: 'if they stop paying, the bank loses', kind: 'warn', size: 42},
    // balancing act
    {t: 'prop', at: 'balance', x: 510, y: 480, src: 'v1/seesaw.png', w: 900},
    {t: 'punch', at: 'act', y: 790, text: 'a balancing act', size: 100},
    {t: 'tag', at: 'doors', x: 820, y: 950, text: 'three doors', bg: '#FFD23F', size: 44},
  ],
};

// ---------------------------------------------------------------- WHAT THIS MEANS
const mean: ChapterSpec = {
  id: 'mean',
  enter: {kind: 'whip', carry: 'card'},
  world: {w: ST + 1920, h: 1080},
  bg: bg(['mean_a', 'mean_b']),
  cam: [cam(0, 0), cam('decide', 1)],
  items: [
    cardItem(0, PARK(0)[0], PARK(0)[1], [[0, ...PARK(0)], ['tool+2', ...PARK(0)], ['tool+14', 1520, 520, 1.2, 0], ...hop('decide', [1520, 520, 1.2, 0], 1)]),
    {t: 'badge', at: 'good', x: 150, y: 330, head: 'head_thinking.png', size: 400},
    {t: 'bubble', at: 'good', x: 640, y: 200, text: 'Good or bad?', tail: 'left', size: 64},
    {t: 'chip', at: 'neither', x: 640, y: 400, text: 'Neither.', kind: 'label', size: 90},
    {t: 'prop', at: 'tool', x: 1100, y: 380, src: 'v1/toolbox.png', h: 380},
    {t: 'chip', at: 'designed', x: 400, y: 840, text: 'a tool, designed by people who understand money', kind: 'warn', size: 44},
    // k1: choose your door
    {t: 'prop', at: 'decide', x: L(1) + 180, y: 260, src: 'v1/signpost.png', h: 520},
    {t: 'chip', at: 'door', x: L(1) + 640, y: 190, text: 'you decide which door', kind: 'label', size: 52},
    {t: 'prop', at: 'door', x: L(1) + 640, y: 330, src: 'v1/doors.png', w: 760},
    {t: 'chip', at: 'everyone', x: L(1) + 640, y: 760, text: "everyone's situation is different", kind: 'label', size: 46},
    {t: 'prop', at: 'licensed', x: L(1) + 1500, y: 300, src: 'v1/icon_advisor.png', h: 280},
    {t: 'chip', at: 'licensed', x: L(1) + 1080, y: 640, text: 'talk to a licensed professional', kind: 'warn', size: 42},
    {t: 'badge', at: 'big', x: L(1) + 1640, y: 790, head: 'head_proud.png', size: 190},
    {t: 'disclaimer', at: 'decide'},
  ],
};

// ---------------------------------------------------------------- OUTRO
/** Change this once the next video's title is final. */
export const NEXT_V1 = 'Next: Buy Now, Pay Later';
const outro: ChapterSpec = {
  id: 'outro',
  enter: {kind: 'whip', carry: 'card'},
  world: {w: ST + 1920, h: 1080},
  // the end screen area (right of the teaser station) stays a plain bright wall
  bg: bg(['hook_a', null], [{x: 0, c: 'sunrise'}, {x: ST + 400, c: 'peri'}]),
  cam: [cam(0, 0), cam('ifWant', 1)],
  sfx: [['tap', 'card_tap']],
  items: [
    {t: 'shadow', x: 110, y: 950, w: 360},
    {t: 'leo', at: 0, x: 90, y: 200, heads: [[0, 'head_happy.png'], ['know', 'head_proud.png']]},
    {t: 'prop', at: 0, x: 820, y: 560, src: 'v1/terminal.png', h: 340, sfx: false},
    cardItem(0, 520, 650, [['tap+4', 900, 600, 1, -14], ['ifWant-20', 900, 600, 1, -14], ['ifWant+6', L(1) + 330, 560, 0.6, -6]]),
    {t: 'ripple', at: 'tap+4', x: 1030, y: 690},
    {t: 'chip', at: 'notTwo', x: 700, y: 160, text: 'not a 2-second purchase', kind: 'warn', size: 56},
    {t: 'prop', at: 'machine', x: 1300, y: 480, src: 'v1/gears.png', h: 400},
    {t: 'punch', at: 'machine', out: 'ifWant', y: 880, text: 'a whole machine', size: 90},
    // k1: next video teaser. Keep screen x 1100-1790, y 230-930 EMPTY for the YouTube end screen.
    {t: 'prop', at: 'ifWant', x: L(1) + 160, y: 250, src: 'v1/phone_pay.png', h: 520},
    {t: 'pay', at: 'bnpl', x: L(1) + 600, y: 330, amount: '$30', label: 'Today', size: 150},
    {t: 'pay', at: 'bnpl+8', x: L(1) + 760, y: 330, amount: '$30', label: '2 wks', size: 150},
    {t: 'pay', at: 'bnpl+16', x: L(1) + 920, y: 330, amount: '$30', label: '4 wks', size: 150},
    {t: 'pill', at: 'next', x: L(1) + 130, y: 800, text: NEXT_V1, bg: '#FF6B6B', size: 46},
    {t: 'pill', at: 'see', x: L(1) + 130, y: 890, text: 'Subscribe. See you there!', bg: '#FFD23F', color: '#191411', size: 40},
    {t: 'disclaimer', at: 'ifWant'},
  ],
};

export const SPECS: ChapterSpec[] = [hook, t1, t2, t3, t4, cust, mean, outro];
export const NAMES = ['Hook', 'Swipe', 'Interest', 'Rewards', 'KeepPaying', 'ThreeCustomers', 'WhatItMeans', 'Outro'];
