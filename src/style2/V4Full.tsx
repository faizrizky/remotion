// Video 04 full cut (Style 2): split-screen hook + sting, then chapters 1-6.
// Outro is included without voice until the outro recording exists (see V4Outro.OUTRO_VOICE).
import React from 'react';
import {AbsoluteFill, Freeze, Html5Audio, interpolate, Sequence, staticFile} from 'remotion';
import {Join, LayoutProbe, SceneDef, Timeline, timelineLength} from './s2kit';
import {HookSplit, HOOK_SPLIT_LEN} from './HookSplit';
import {V4Ch1, V4_CH1_LEN} from './V4Ch1';
import {V4Ch2, V4_CH2_LEN} from './V4Ch2';
import {V4Ch3, V4_CH3_LEN} from './V4Ch3';
import {V4Ch4, V4_CH4_LEN} from './V4Ch4';
import {V4Ch5, V4_CH5_LEN} from './V4Ch5';
import {V4Ch6, V4_CH6_LEN} from './V4Ch6';
import {V4Outro, V4_OUTRO_LEN} from './V4Outro';
import {JoinSfx, Watermark} from './v4common';

const SCENES: SceneDef[] = [
  {len: HOOK_SPLIT_LEN, node: <HookSplit bare />},
  {len: V4_CH1_LEN, node: <V4Ch1 bare />},
  {len: V4_CH2_LEN, node: <V4Ch2 bare />},
  {len: V4_CH3_LEN, node: <V4Ch3 bare />},
  {len: V4_CH4_LEN, node: <V4Ch4 bare />},
  {len: V4_CH5_LEN, node: <V4Ch5 bare />},
  {len: V4_CH6_LEN, node: <V4Ch6 bare />},
  {len: V4_OUTRO_LEN, node: <V4Outro bare />},
];
const JOINS: Join[] = [
  {kind: 'cut', dur: 0},
  {kind: 'shatter', dur: 12},
  {kind: 'splat', dur: 12, cx: 960, cy: 560},
  {kind: 'puff', dur: 12},
  {kind: 'shatter', dur: 12},
  {kind: 'splat', dur: 12, cx: 960, cy: 560},
  {kind: 'swirl', dur: 14, cx: 960, cy: 540, color: '#0B1A12'},
];
export const V4_FULL_LEN = timelineLength(SCENES, JOINS);
const BED_FROM = HOOK_SPLIT_LEN - 20;
export const V4Full: React.FC<{check?: boolean}> = ({check = false}) => (
  <AbsoluteFill style={{background: '#000'}}>
    {/* the sting dives into the "o": the first frame of Chapter 1 shows through the hole */}
    <Sequence from={HOOK_SPLIT_LEN - 14} durationInFrames={14} layout="none"><Freeze frame={0}><V4Ch1 bare mute /></Freeze></Sequence>
    <Timeline scenes={SCENES} joins={JOINS} />
    <JoinSfx scenes={SCENES} joins={JOINS} />
    <Watermark />
    <LayoutProbe check={check} />
    <Html5Audio src={staticFile('music/monday_routine.mp3')} loop loopVolumeCurveBehavior="extend" volume={(f) => (f < BED_FROM ? 0 : interpolate(f, [BED_FROM, BED_FROM + 48, V4_FULL_LEN - 48, V4_FULL_LEN], [0, 0.06, 0.06, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}))} />
  </AbsoluteFill>
);
