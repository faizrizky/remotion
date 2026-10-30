import React from 'react';
import {Composition, Folder} from 'remotion';
import {StyleKitDemo, DEMO_FRAMES} from './style/StyleKitDemo';
import {Video01Compositions} from './video01/Video01';
import {Video02Compositions} from './video02/Video02';
import {KitDemo} from './kitdemo/KitDemo';

export const RemotionRoot: React.FC = () => (
  <>
    <Video01Compositions />
    <Video02Compositions />
    <KitDemo.Compositions />
    <Folder name="StyleKit">
      <Composition id="StyleKitDemo" component={StyleKitDemo} durationInFrames={DEMO_FRAMES} fps={24} width={1920} height={1080} />
    </Folder>
  </>
);
