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
import {chapterFrames, ChapterId, FPS, getChapter, H, hasFile, sec, W} from './v2kit';

const PARTS: {id: ChapterId; comp: React.FC; name: string}[] = [
  {id: 'cold', comp: Cold, name: 'V2-00-Cold'},
  {id: 'ch1', comp: Ch1, name: 'V2-01-FreeLunch'},
  {id: 'ch2', comp: Ch2, name: 'V2-02-WhoPays'},
  {id: 'ch3', comp: Ch3, name: 'V2-03-Illusion'},
  {id: 'ch4', comp: Ch4, name: 'V2-04-Stack'},
  {id: 'ch5', comp: Ch5, name: 'V2-05-Bites'},
  {id: 'ch6', comp: Ch6, name: 'V2-06-Rules'},
  {id: 'outro', comp: Outro, name: 'V2-07-Outro'},
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
export const V2_TOTAL = STARTS[STARTS.length - 1] + frames(PARTS[PARTS.length - 1].id);

/** Background music (rule 16): FreeToUse "Monday Routine", one flat level. Opening track over the sting (rule 17). */
export const MUSIC_FILE = 'music/monday_routine.mp3';
export const MUSIC_VOL = 0.08;
export const INTRO_FILE = 'music/funky_intro_sting.mp3';
export const INTRO_VOL = 0.7;
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const STINGS = PARTS.flatMap((p, i) => (STING_IN.includes(p.id) ? [{at: STARTS[i], len: sec(getChapter(p.id).pre) + 10}] : []));

/** Flat 0.08; gets out of the way for the opening track and crossfades back after the sting; 3 s fade-out at the end. */
const musicVolume = (f: number) => {
  let m = MUSIC_VOL;
  if (hasFile(INTRO_FILE)) for (const s of STINGS) if (f >= s.at - 6 && f < s.at + s.len + 36) m = Math.min(m, interpolate(f, [s.at - 6, s.at + 4, s.at + s.len - 10, s.at + s.len + 36], [MUSIC_VOL, 0, 0, MUSIC_VOL], clamp));
  return m * interpolate(f, [V2_TOTAL - FPS * 3, V2_TOTAL - 1], [1, 0], clamp);
};

/** Whole video: all chapters (+ music, + opening track over the sting). Subtitles are NOT burned in (out/video02.srt). */
export const Video02Full: React.FC = () => (
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

export const Video02Compositions: React.FC = () => (
  <Folder name="Video02">
    <Composition id="V2-Full" component={Video02Full} durationInFrames={V2_TOTAL} fps={FPS} width={W} height={H} />
    {PARTS.map((p) => (
      <Composition key={p.id} id={p.name} component={p.comp} durationInFrames={frames(p.id)} fps={FPS} width={W} height={H} />
    ))}
  </Folder>
);
