// 2-second Penny Logics opener sting: the animation is the long sting sped up to fit public/music/sting_opener_2s.wav
// (impact at ~0.25 s, body until ~1.65 s). Use <Sting2s /> inside a Sequence of STING2S_LEN frames; with `reveal`
// the camera dives through the "o" and whatever is rendered underneath shows through the hole.
import React from 'react';
import {AbsoluteFill, Html5Audio, Img, staticFile} from 'remotion';
import {PennySting} from '../kit/sting';

export const STING2S_LEN = 48;
export const STING2S_RATE = 2.4;
export const Sting2s: React.FC<{reveal?: boolean; volume?: number}> = ({reveal = true, volume = 0.9}) => (
  <AbsoluteFill>
    <PennySting dur={STING2S_LEN} rate={STING2S_RATE} reveal={reveal} quiet />
    <Html5Audio src={staticFile('music/sting_opener_2s.wav')} volume={volume} />
  </AbsoluteFill>
);

/** Preview: sting over a placeholder next scene. */
export const StingOpenerTest: React.FC = () => (
  <AbsoluteFill style={{background: '#000'}}>
    <AbsoluteFill><Img src={staticFile('v4/bg/road_full.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover'}} /></AbsoluteFill>
    <Sting2s />
  </AbsoluteFill>
);
