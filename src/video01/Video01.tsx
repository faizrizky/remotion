import React from 'react';
import {Composition, Folder, Html5Audio, interpolate, Series, staticFile} from 'remotion';
import {Hook} from './chapters/Hook';
import {T1} from './chapters/T1';
import {T2} from './chapters/T2';
import {T3} from './chapters/T3';
import {T4} from './chapters/T4';
import {Customers} from './chapters/Customers';
import {Meaning} from './chapters/Meaning';
import {Outro1} from './chapters/Outro';
import {FPS, H, hasFile, W} from '../video02/v2kit';
import {frames1, V1Id} from './v1kit';

const PARTS: {id: V1Id; comp: React.FC; name: string}[] = [
  {id: 'hook', comp: Hook, name: 'V1-00-Hook'},
  {id: 't1', comp: T1, name: 'V1-01-Swipe'},
  {id: 't2', comp: T2, name: 'V1-02-Interest'},
  {id: 't3', comp: T3, name: 'V1-03-Rewards'},
  {id: 't4', comp: T4, name: 'V1-04-KeepPaying'},
  {id: 'cust', comp: Customers, name: 'V1-05-ThreeCustomers'},
  {id: 'mean', comp: Meaning, name: 'V1-06-WhatItMeans'},
  {id: 'outro', comp: Outro1, name: 'V1-07-Outro'},
];

export const V1_TOTAL = PARTS.reduce((s, p) => s + frames1(p.id), 0);

/** Free-to-use music: Aventure - "Monday Routine" (freetouse.com). Put credit in the video description. */
export const MUSIC_FILE_1 = 'music/monday_routine.mp3';
export const MUSIC_VOL = 0.07;
const DUCK_VOL = 0.015;
const STARTS = PARTS.map((_, i) => PARTS.slice(0, i).reduce((s, p) => s + frames1(p.id), 0));

/** Music dips for the first 1.5 s of each chapter (title card), then returns; fades out over the last 3 s. */
const musicVolume = (f: number) => {
  let v = MUSIC_VOL;
  for (const start of STARTS.slice(1)) {
    if (f >= start - 6 && f < start + FPS * 1.5) {
      v = Math.min(v, interpolate(f, [start - 6, start, start + FPS, start + FPS * 1.5], [MUSIC_VOL, DUCK_VOL, DUCK_VOL, MUSIC_VOL], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}));
    }
  }
  return v * interpolate(f, [V1_TOTAL - FPS * 3, V1_TOTAL - 1], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
};

export const Video01Full: React.FC = () => (
  <>
    <Series>
      {PARTS.map((p) => (
        <Series.Sequence key={p.id} durationInFrames={frames1(p.id)}>
          <p.comp />
        </Series.Sequence>
      ))}
    </Series>
    {hasFile(MUSIC_FILE_1) && <Html5Audio src={staticFile(MUSIC_FILE_1)} loop volume={musicVolume} />}
  </>
);

export const Video01Compositions: React.FC = () => (
  <Folder name="Video01">
    <Composition id="V1-Full" component={Video01Full} durationInFrames={V1_TOTAL} fps={FPS} width={W} height={H} />
    {PARTS.map((p) => (
      <Composition key={p.id} id={p.name} component={p.comp} durationInFrames={frames1(p.id)} fps={FPS} width={W} height={H} />
    ))}
  </Folder>
);
