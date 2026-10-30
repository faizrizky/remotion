// Demo of the reusable kit (no voice). Specs import ONLY types + helpers from ../kit/core.
import type {ChapterSpec} from '../kit/spec';
import {diveCam} from '../kit/core';

const PHONE = {x: 4900, y: 260, w: 280, h: 560};

const A: ChapterSpec = {
  id: 'a',
  sting: true,
  world: {w: 5600, h: 1080},
  bg: {stops: [{x: 0, c: 'sunrise'}, {x: 2200, c: 'sky'}, {x: 4200, c: 'mint'}], images: [{src: 'v1/bg_cafe.jpg', x: 0, w: 2000}, {src: 'v1/bg_street.jpg', x: 1900, w: 2000}]},
  cam: [
    [0, 960, 540, 1],
    ['s2', 2900, 540, 1],
    ['circle', 2700, 520, 1.25],
    ['wheel', 2900, 540, 1],
    ['s3', 4400, 540, 1],
    ['phone', 5000, 540, 1.1],
    diveCam('dive', PHONE),
  ],
  items: [
    {t: 'shadow', x: 230, y: 900, w: 380},
    {t: 'leo', at: 0, x: 120, y: 160, h: 740, heads: [[0, 'head_happy.png'], ['tap', 'head_proud.png']]},
    {t: 'prop', at: 'coffee', x: 1150, y: 560, src: 'v1/coffee.png', h: 330},
    {t: 'prop', at: 'coffee+4', x: 720, y: 560, src: 'v1/terminal.png', h: 340},
    {t: 'ripple', at: 'tap', x: 900, y: 690},
    // the carried card: tapped at the terminal, then rides the camera to station 2
    {t: 'prop', id: 'card', at: 'tap-14', x: 470, y: 640, src: 'v1/card.png', h: 170, trail: 3, move: [['tap', 820, 620, 1, -12], ['s2+6', 2350, 300, 1.4, 0], ['s3-20', 2350, 300, 1.4, 0], ['s3+6', 3560, 110, 0.9, 0], ['phone-20', 3560, 110, 0.9, 0], ['phone+6', 4930, 130, 0.6, 8]]},
    {t: 'price', at: 'price', x: 2350, y: 560, text: '$5.00', color: '#FFD23F', size: 90},
    {t: 'strike', at: 'price+10', x: 2950, y: 300, from: '$5.00', to: '$4.85', swap: 'swap', size: 120},
    {t: 'mark', at: 'circle', x: 3330, y: 270, kind: 'circle', w: 360, h: 190},
    {t: 'chip', at: 'circle+6', x: 3330, y: 500, text: 'the swipe fee', kind: 'warn', size: 52},
    {t: 'wheel', at: 'wheel', x: 2550, y: 760, to: 198000000000, prefix: '$', size: 90, dur: 40},
    {t: 'line', at: 'line', x: 3800, y: 200, series: [[105, 130, 160]], labels: ['2022', '2023', '2024'], w: 620, h: 320, prefix: '$', suffix: 'B'},
    {t: 'bars', at: 'bars', x: 3800, y: 640, data: [{label: 'paid in full', value: 6, color: '#7BD389'}, {label: 'carry a balance', value: 94, color: '#FF6B6B'}], w: 620, h: 280, suffix: '%'},
    {t: 'phone', at: 'phone', x: PHONE.x - 20, y: PHONE.y - 20, h: 600, kids: [
      {t: 'notif', at: 'phone', x: 10, y: 24, w: 222, size: 17, items: [{title: 'Payment due', body: 'Minimum $35', at: 'n1', icon: '$'}, {title: 'Late fee', body: '$32 charged', at: 'n2', color: '#E5484D'}]},
      {t: 'prop', id: 'coin', at: 'dive-6', x: 90, y: 330, src: 'v1/coin.png', h: 90},
    ]},
    {t: 'src', at: 'line', text: 'Demo numbers only'},
  ],
};

const B: ChapterSpec = {
  id: 'b',
  enter: {kind: 'whip', carry: 'coin'},
  world: {w: 3800, h: 1080},
  bg: {stops: [{x: 0, c: 'lilac'}, {x: 2400, c: 'peri'}]},
  cam: [[0, 960, 540, 1], ['s2', 2700, 540, 1]],
  shakes: [['arrow', 10, 10]],
  items: [
    {t: 'prop', id: 'coin', at: 0, x: 860, y: 420, src: 'v1/coin.png', h: 160, move: [['s2-24', 860, 420], ['s2+4', 2550, 380, 1.2]], trail: 2},
    {t: 'price', at: 'hang', x: 200, y: 160, text: 'APR 22%', color: '#FF6B6B', size: 80, hang: true, enter: 'none'},
    {t: 'path', at: 'path', x: 0, y: 0, src: 'v1/coin_dollar.png', h: 120, pts: [[300, 800], [700, 600], [1100, 820], [1500, 640]], dur: 40, rotate: true, trail: 3},
    {t: 'mark', at: 'arrow', x: 1300, y: 300, kind: 'arrow', dx: 380, dy: 140},
    {t: 'text', at: 'arrow', x: 1250, y: 200, text: 'boil + stop-motion', hand: true, size: 72, boil: true, stop: 2},
    {t: 'match', at: 'match-10', x: 2300, y: 650, a: '$5,000', b: '$1,100 a year', swap: 'match', size: 100},
    {t: 'mark', at: 'underline', x: 2300, y: 770, kind: 'underline', w: 640, h: 50},
    {t: 'badge', at: 'fin', x: 3050, y: 250, head: 'head_shocked.png', size: 300},
  ],
};

export const SPECS: ChapterSpec[] = [A, B];
