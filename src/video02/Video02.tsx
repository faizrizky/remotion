import React from 'react';
import {Composition, Folder, Html5Audio, interpolate, Series, staticFile} from 'remotion';
import {Cold} from './chapters/Cold';
import {Ch1} from './chapters/Ch1';
import {Ch2} from './chapters/Ch2';
import {Ch3} from './chapters/Ch3';
import {Ch4} from './chapters/Ch4';
import {Ch5} from './chapters/Ch5';
import {Ch6} from './chapters/Ch6';
import {Outro} from './chapters/Outro';
import {chapterFrames, ChapterId, FPS, getChapter, H, hasFile, W} from './v2kit';

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
export const V2_TOTAL = PARTS.reduce((s, p) => s + frames(p.id), 0);

/** Background music (optional): put the file at public/v2/audio/music.mp3. */
export const MUSIC_FILE = 'v2/audio/music.mp3';
export const MUSIC_VOL = 0.07;
const DUCK_VOL = 0.015;
const CHAPTER_STARTS = PARTS.map((_, i) => PARTS.slice(0, i).reduce((s, p) => s + frames(p.id), 0));

/** Music dips sharply for the first second of every chapter (chapter card), then comes back; fades out at the end. */
const musicVolume = (f: number) => {
  let v = MUSIC_VOL;
  for (const start of CHAPTER_STARTS.slice(1)) {
    if (f >= start - 6 && f < start + FPS * 1.5) {
      v = Math.min(v, interpolate(f, [start - 6, start, start + FPS, start + FPS * 1.5], [MUSIC_VOL, DUCK_VOL, DUCK_VOL, MUSIC_VOL], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}));
    }
  }
  const fadeOut = interpolate(f, [V2_TOTAL - FPS * 3, V2_TOTAL - 1], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return v * fadeOut;
};

/** Whole video: all chapters back to back (+ music if present). */
export const Video02Full: React.FC = () => (
  <>
    <Series>
      {PARTS.map((p) => (
        <Series.Sequence key={p.id} durationInFrames={frames(p.id)}>
          <p.comp />
        </Series.Sequence>
      ))}
    </Series>
    {hasFile(MUSIC_FILE) && <Html5Audio src={staticFile(MUSIC_FILE)} loop volume={musicVolume} />}
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
