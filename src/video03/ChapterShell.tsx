import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {Finish, PopSpeed} from '../style/style_kit';
import {PennySting} from '../kit/sting';
import {beatOf, Chapter, chapterFrames, ChapterId, getChapter, sec, Voice, Watermark} from './v3kit';

/** Same tempo as Video 02 (slow, soft pops). */
export const V3_TEMPO = 0.62;
/** Chapters that open with the Penny Logics sting (right after the cold open). Their `pre` = sting length. */
export const STING_IN: string[] = ['ch1'];

/** One chapter = voice + content. `children(b, len, c)`: b('beat') = frame from the start of the voice; len = voice + tail frames. */
export const ChapterShell: React.FC<{id: ChapterId; children: (b: (k: string) => number, len: number, c: Chapter) => React.ReactNode}> = ({id, children}) => {
  const c = getChapter(id);
  const pre = sec(c.pre);
  const len = chapterFrames(c) - pre;
  const b = beatOf(c);
  const stingIn = STING_IN.includes(id) && pre > 0;
  const overlap = c.overlapFrames ?? 0;
  return (
    <PopSpeed.Provider value={V3_TEMPO}>
      <AbsoluteFill>
        <Sequence from={overlap}><AbsoluteFill style={{background: '#FFF4E0'}} /></Sequence>
        <Sequence from={pre} durationInFrames={len}>{children(b, len, c)}</Sequence>
        <Sequence from={overlap}><Finish /></Sequence>
        {stingIn && <Sequence durationInFrames={pre + 10}><PennySting dur={pre + 10} reveal quiet /></Sequence>}
        <Watermark />
        <Voice c={c} />
      </AbsoluteFill>
    </PopSpeed.Provider>
  );
};
