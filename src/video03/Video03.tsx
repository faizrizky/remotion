import React from 'react';
import {Composition, Folder, Html5Audio, interpolate, Sequence, staticFile} from 'remotion';
import {STING_IN} from './ChapterShell';
import {Cold} from './chapters/Cold';
import {Ch1} from './chapters/Ch1';
import {Ch2} from './chapters/Ch2';
import {Ch3} from './chapters/Ch3';
import {Ch4} from './chapters/Ch4';
import {Ch5} from './chapters/Ch5';
import {Ch6} from './chapters/Ch6';
import {Outro} from './chapters/Outro';
import {chapterFrames, ChapterId, FPS, getChapter, H, hasFile, sec, W} from './v3kit';

const PARTS: {id: ChapterId; comp: React.FC; name: string}[] = [
  {id: 'cold', comp: Cold, name: 'V3-00-Cold'},
  {id: 'ch1', comp: Ch1, name: 'V3-01-Hike'},
  {id: 'ch2', comp: Ch2, name: 'V3-02-Brain'},
  {id: 'ch3', comp: Ch3, name: 'V3-03-Hides'},
  {id: 'ch4', comp: Ch4, name: 'V3-04-Matter'},
  {id: 'ch5', comp: Ch5, name: 'V3-05-Fight'},
  {id: 'ch6', comp: Ch6, name: 'V3-06-Number'},
  {id: 'outro', comp: Outro, name: 'V3-07-Outro'},
];

const frames = (id: ChapterId) => chapterFrames(getChapter(id));
/** Chapter start frames: each chapter starts `overlapFrames` early (sting burst / carry pan over the previous one). */
export const STARTS: number[] = [];
{
  let cur = 0;
  for (const p of PARTS) {
    cur -= getChapter(p.id).overlapFrames ?? 0;
    STARTS.push(cur);
    cur += frames(p.id);
  }
}
export const V3_TOTAL = STARTS[STARTS.length - 1] + frames(PARTS[PARTS.length - 1].id);

/** Same music as Video 02: FreeToUse "Monday Routine" flat 0.08; opening track over the sting; 3 s fade-out. */
export const MUSIC_FILE = 'music/monday_routine.mp3';
export const MUSIC_VOL = 0.08;
export const INTRO_FILE = 'music/funky_intro_sting.mp3';
export const INTRO_VOL = 0.7;
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const STINGS = PARTS.flatMap((p, i) => (STING_IN.includes(p.id) ? [{at: STARTS[i], len: sec(getChapter(p.id).pre) + 10}] : []));
const musicVolume = (f: number) => {
  let m = MUSIC_VOL;
  if (hasFile(INTRO_FILE)) for (const s of STINGS) if (f >= s.at - 6 && f < s.at + s.len + 36) m = Math.min(m, interpolate(f, [s.at - 6, s.at + 4, s.at + s.len - 10, s.at + s.len + 36], [MUSIC_VOL, 0, 0, MUSIC_VOL], clamp));
  return m * interpolate(f, [V3_TOTAL - FPS * 3, V3_TOTAL - 1], [1, 0], clamp);
};

/** Whole video. Subtitles are NOT burned in (out/video03.srt). */
export const Video03Full: React.FC = () => (
  <>
    {PARTS.map((p, i) => (
      <Sequence key={p.id} from={STARTS[i]} durationInFrames={frames(p.id)}>
        <p.comp />
      </Sequence>
    ))}
    {hasFile(MUSIC_FILE) && <Html5Audio src={staticFile(MUSIC_FILE)} loop loopVolumeCurveBehavior="extend" volume={musicVolume} />}
    {hasFile(INTRO_FILE) && STINGS.map((s) => (
      <Sequence key={s.at} from={s.at} durationInFrames={s.len + 24}>
        <Html5Audio src={staticFile(INTRO_FILE)} volume={INTRO_VOL} />
      </Sequence>
    ))}
  </>
);

export const Video03Compositions: React.FC = () => (
  <Folder name="Video03">
    <Composition id="V3-Full" component={Video03Full} durationInFrames={V3_TOTAL} fps={FPS} width={W} height={H} />
    {PARTS.map((p) => (
      <Composition key={p.id} id={p.name} component={p.comp} durationInFrames={frames(p.id)} fps={FPS} width={W} height={H} />
    ))}
  </Folder>
);
