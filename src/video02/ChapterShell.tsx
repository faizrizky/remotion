import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {PopSpeed} from '../style/style_kit';
import {PennySting} from '../kit/sting';
import {beatOf, chapterFrames, ChapterId, getChapter, sec, Voice, Watermark} from './v2kit';

/** Global tempo for Video 02: slower, softer pops than Video 01 (reference reels breathe more). */
export const V2_TEMPO = 0.62;
/** Chapters that open with the Penny Logics sting (rule 1.3: right after the cold open). Their `pre` = sting length. */
export const STING_IN: string[] = ['ch1'];
/** Frames a sting chapter starts before the previous chapter ends, so the burst circles cover the cold open's last frame. */
export const STING_OVERLAP = 10;

/**
 * One chapter = voice + content (no title cards). A sting chapter plays the PennySting during `pre`
 * and dives through the "o" into the first scene.
 * `children(b, len)`: b('beat') is the frame of a beat relative to the start of the voice; len = frames of voice + tail.
 */
export const ChapterShell: React.FC<{id: ChapterId; children: (b: (k: string) => number, len: number) => React.ReactNode}> = ({id, children}) => {
  const c = getChapter(id);
  const pre = sec(c.pre);
  const len = chapterFrames(c) - pre;
  const b = beatOf(c);
  const stingIn = STING_IN.includes(id) && pre > 0;
  return (
    <PopSpeed.Provider value={V2_TEMPO}>
      <AbsoluteFill>
        {/* with the sting, the previous chapter stays visible under the burst circles for the first frames */}
        <Sequence from={stingIn ? STING_OVERLAP : 0}><AbsoluteFill style={{background: '#FFF4E0'}} /></Sequence>
        <Sequence from={pre} durationInFrames={len}>
          {children(b, len)}
        </Sequence>
        {stingIn && <Sequence durationInFrames={pre + 10}><PennySting dur={pre + 10} reveal quiet /></Sequence>}
        <Watermark />
        <Voice c={c} />
      </AbsoluteFill>
    </PopSpeed.Provider>
  );
};
