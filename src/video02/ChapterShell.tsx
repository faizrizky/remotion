import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {PopSpeed} from '../style/style_kit';
import {TitleCard, TITLE_WIPE} from './title';
import {beatOf, chapterFrames, ChapterId, getChapter, sec, Sfx, Voice} from './v2kit';

const CARD_COLORS: Record<string, string> = {ch1: '#2E9E8F', ch2: '#7A6CFF', ch3: '#D9506E', ch4: '#4E7BEF', ch5: '#E4572E', ch6: '#3A8D5C'};
const CARD_HEADS: Record<string, string> = {ch1: 'head_happy.png', ch2: 'head_suspicious.png', ch3: 'head_thinking.png', ch4: 'head_suspicious.png', ch5: 'head_thinking.png', ch6: 'head_proud.png'};
/** Global tempo for Video 02: slower, softer pops than Video 01 (reference reels breathe more). */
export const V2_TEMPO = 0.62;
const CARD_INDEX: Record<string, number> = {ch1: 1, ch2: 2, ch3: 3, ch4: 4, ch5: 5, ch6: 6};

/**
 * One chapter = optional chapter card (c.pre seconds) + voice + content.
 * `children(b, len)`: b('beat') is the frame of a beat relative to the start of the voice; len = frames of voice + tail.
 */
export const ChapterShell: React.FC<{id: ChapterId; children: (b: (k: string) => number, len: number) => React.ReactNode}> = ({id, children}) => {
  const c = getChapter(id);
  const pre = sec(c.pre);
  const len = chapterFrames(c) - pre;
  const b = beatOf(c);
  return (
    <PopSpeed.Provider value={V2_TEMPO}>
    <AbsoluteFill style={{background: '#000'}}>
      <Sequence from={pre} durationInFrames={len}>
        {children(b, len)}
      </Sequence>
      {pre > 0 && (
        <Sequence durationInFrames={pre + TITLE_WIPE}>
          <TitleCard part={CARD_INDEX[id] ?? 0} title={c.title} head={CARD_HEADS[id] ?? 'head_happy.png'} wipeAt={pre} color={CARD_COLORS[id]} />
          <Sfx name="whoosh" at={pre} />
        </Sequence>
      )}
      <Voice c={c} />
    </AbsoluteFill>
    </PopSpeed.Provider>
  );
};
