import React from 'react';
import {Composition, Folder} from 'remotion';
import {StyleKitDemo, DEMO_FRAMES} from './style/StyleKitDemo';

export const FPS = 24;

export const RemotionRoot: React.FC = () => (
  <Folder name="StyleKit">
    <Composition id="StyleKitDemo" component={StyleKitDemo} durationInFrames={DEMO_FRAMES} fps={FPS} width={1920} height={1080} />
  </Folder>
);
