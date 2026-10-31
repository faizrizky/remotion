// Video 01 built with the reusable kit: timing.json + captions.json + specs.tsx (one camera, no title cards).
import React from 'react';
import timing from './timing.json';
import {makeVideo} from '../kit';
import {NAMES, SPECS} from './specs';

/** Free-to-use music: Aventure - "Monday Routine" (freetouse.com). Credit goes in the video description. */
export const Video01 = makeVideo({
  prefix: 'V1',
  timing,
  chapters: SPECS.map((spec, i) => ({spec, name: NAMES[i]})),
  music: {file: 'music/monday_routine.mp3', vol: 0.07, duck: 0.015},
});

export const Video01Compositions: React.FC = () => <Video01.Compositions />;
