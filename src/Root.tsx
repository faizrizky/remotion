import React from 'react';
import {Composition, Folder} from 'remotion';
import {StyleKitDemo, DEMO_FRAMES} from './style/StyleKitDemo';
import {Video01Compositions} from './video01/Video01';
import {Video02Compositions} from './video02/Video02';
import {Video03Compositions} from './video03/Video03';
import {ShortCompositions} from './shorts/Shorts';
import {HookTest, HOOK_TEST_LEN} from './style2/HookTest';
import {KitDemo} from './kitdemo/KitDemo';

export const RemotionRoot: React.FC = () => (
  <>
    <Video01Compositions />
    <Video02Compositions />
    <Video03Compositions />
    <ShortCompositions />
    <Folder name="Style2">
      <Composition id="S2-HookTest" component={HookTest} defaultProps={{check: false}} durationInFrames={HOOK_TEST_LEN} fps={24} width={1920} height={1080} />
    </Folder>
    <KitDemo.Compositions />
    <Folder name="StyleKit">
      <Composition id="StyleKitDemo" component={StyleKitDemo} durationInFrames={DEMO_FRAMES} fps={24} width={1920} height={1080} />
    </Folder>
  </>
);
