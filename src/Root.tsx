import React from 'react';
import {Composition, Folder} from 'remotion';
import {StyleKitDemo, DEMO_FRAMES} from './style/StyleKitDemo';
import {Video02Compositions} from './video02/Video02';

export const RemotionRoot: React.FC = () => (
  <>
    <Video02Compositions />
    <Folder name="StyleKit">
      <Composition id="StyleKitDemo" component={StyleKitDemo} durationInFrames={DEMO_FRAMES} fps={24} width={1920} height={1080} />
    </Folder>
  </>
);
