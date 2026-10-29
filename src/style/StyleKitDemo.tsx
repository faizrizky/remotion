import React from 'react';
import {Sequence} from 'remotion';
import {Bubble, CountUp, HandTitle, InkReveal, KeyTag, Pill, SANS, Scene, Sticker, PALETTES} from './style_kit';

const A = 96;
const B = 96;
export const DEMO_FRAMES = A + B - 18;

/** Smoke test for the style kit: two scenes, an ink-reveal transition, pop-ins, a CountUp. */
const SceneA: React.FC = () => (
  <Scene palette="space" dur={A} stars subtitle="Pay in four sounds free.">
    <HandTitle text="Pay in 4?" at={4} />
    <Bubble text="It's free, right?" at={24} tail="left" style={{left: 760, top: 420}} />
  </Scene>
);
const SceneB: React.FC = () => (
  <Scene palette="teal" dur={B} subtitle="Late fees add up.">
    <HandTitle text="The catch" at={4} color="#102A43" underline="#FF7A59" />
    <Sticker top="Late fee" main="$34" p={PALETTES.teal} at={14} style={{left: 200, top: 420}} />
    <div style={{position: 'absolute', left: 1000, top: 440, fontFamily: SANS, fontWeight: 900, fontSize: 160, color: '#102A43'}}>
      <CountUp to={34} at={20} dur={30} suffix="%" />
    </div>
    <KeyTag text="read the terms" at={30} style={{position: 'absolute', left: 1000, top: 700}} />
    <div style={{position: 'absolute', left: 200, top: 720}}><Pill text="demo only" bg="#FF7A59" /></div>
  </Scene>
);

export const StyleKitDemo: React.FC = () => (
  <>
    <Sequence  durationInFrames={A}><SceneA /></Sequence>
    <Sequence from={A - 18} durationInFrames={B}>
      <InkReveal dur={18} seed="demo"><SceneB /></InkReveal>
    </Sequence>
  </>
);
