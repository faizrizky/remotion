import React from 'react';
import {Composition, Folder} from 'remotion';
import {StyleKitDemo, DEMO_FRAMES} from './style/StyleKitDemo';
import {Video01Compositions} from './video01/Video01';
import {Video02Compositions} from './video02/Video02';
import {Video03Compositions} from './video03/Video03';
import {ShortCompositions} from './shorts/Shorts';
import {HookTest, HOOK_TEST_LEN} from './style2/HookTest';
import {StingOpenerTest, STING2S_LEN} from './style2/StingOpener';
import {V4Q, V4Q_LEN} from './style2/V4Q';
import {HookSplit, HOOK_SPLIT_LEN} from './style2/HookSplit';
import {V4Ch1, V4_CH1_LEN} from './style2/V4Ch1';
import {V4Full, V4_FULL_LEN} from './style2/V4Full';
import {V4Outro, V4_OUTRO_LEN} from './style2/V4Outro';
import {ShortA, ShortB, SHORT_A_LEN, SHORT_B_LEN} from './style2/Shorts';
import {V4Ch6, V4_CH6_LEN} from './style2/V4Ch6';
import {V4Ch5, V4_CH5_LEN} from './style2/V4Ch5';
import {V4Ch4, V4_CH4_LEN} from './style2/V4Ch4';
import {V4Ch3, V4_CH3_LEN} from './style2/V4Ch3';
import {V4Ch2, V4_CH2_LEN} from './style2/V4Ch2';
import {KitDemo} from './kitdemo/KitDemo';
import {S1P1, S1P1_LEN} from './rulezero/S1P1';
import {S1P2, S1P2_LEN} from './rulezero/S1P2';

export const RemotionRoot: React.FC = () => (
  <>
    <Video01Compositions />
    <Video02Compositions />
    <Video03Compositions />
    <ShortCompositions />
    <Folder name="Style2">
      <Composition id="V4Q" component={V4Q} defaultProps={{check: false}} durationInFrames={V4Q_LEN} fps={24} width={1920} height={1080} />
      <Composition id="S2-StingOpener2s" component={StingOpenerTest} durationInFrames={STING2S_LEN + 6} fps={24} width={1920} height={1080} />
      <Composition id="S2-HookTest" component={HookTest} defaultProps={{check: false}} durationInFrames={HOOK_TEST_LEN} fps={24} width={1920} height={1080} />
      <Composition id="V4-Ch2" component={V4Ch2} defaultProps={{check: false}} durationInFrames={V4_CH2_LEN} fps={24} width={1920} height={1080} />
      <Composition id="V4-Ch3" component={V4Ch3} defaultProps={{check: false}} durationInFrames={V4_CH3_LEN} fps={24} width={1920} height={1080} />
      <Composition id="V4-Ch4" component={V4Ch4} defaultProps={{check: false}} durationInFrames={V4_CH4_LEN} fps={24} width={1920} height={1080} />
      <Composition id="V4-Ch5" component={V4Ch5} defaultProps={{check: false}} durationInFrames={V4_CH5_LEN} fps={24} width={1920} height={1080} />
      <Composition id="V4-Ch6" component={V4Ch6} defaultProps={{check: false}} durationInFrames={V4_CH6_LEN} fps={24} width={1920} height={1080} />
      <Composition id="V4-Outro" component={V4Outro} defaultProps={{check: false}} durationInFrames={V4_OUTRO_LEN} fps={24} width={1920} height={1080} />
      <Composition id="S-V4-A" component={ShortA} defaultProps={{check: false}} durationInFrames={SHORT_A_LEN} fps={24} width={1080} height={1920} />
      <Composition id="S-V4-B" component={ShortB} defaultProps={{check: false}} durationInFrames={SHORT_B_LEN} fps={24} width={1080} height={1920} />
      <Composition id="V4-Full" component={V4Full} defaultProps={{check: false}} durationInFrames={V4_FULL_LEN} fps={24} width={1920} height={1080} />
      <Composition id="V4-Ch1" component={V4Ch1} defaultProps={{check: false}} durationInFrames={V4_CH1_LEN} fps={24} width={1920} height={1080} />
      <Composition id="S2-HookSplit" component={HookSplit} defaultProps={{check: false}} durationInFrames={HOOK_SPLIT_LEN} fps={24} width={1920} height={1080} />
    </Folder>
    <Folder name="RuleZero">
      <Composition id="RZ-S1P1" component={S1P1} durationInFrames={S1P1_LEN} fps={24} width={1080} height={1920} />
      <Composition id="RZ-S1P2" component={S1P2} durationInFrames={S1P2_LEN} fps={24} width={1080} height={1920} />
    </Folder>
    <KitDemo.Compositions />
    <Folder name="StyleKit">
      <Composition id="StyleKitDemo" component={StyleKitDemo} durationInFrames={DEMO_FRAMES} fps={24} width={1920} height={1080} />
    </Folder>
  </>
);
