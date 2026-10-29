import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {ChapterCard} from '../style/style_kit';
import {beatOf, chapterFrames, ChapterId, getChapter, sec, Sfx, Voice} from './v2kit';

const CARD_COLORS: Record<string, string> = {ch1: '#2E9E8F', ch2: '#4B3F9E', ch3: '#D9506E', ch4: '#1B3A66', ch5: '#E4572E', ch6: '#3A8D5C'};
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
    <AbsoluteFill style={{background: '#000'}}>
      {pre > 0 && (
        <Sequence  durationInFrames={pre + 2}>
          <ChapterCard label={`PART ${CARD_INDEX[id] ?? ''}`} title={c.title} index={CARD_INDEX[id] ?? 0} total={6} color={CARD_COLORS[id]} />
          <Sfx name="whoosh" at={0} />
        </Sequence>
      )}
      <Sequence from={pre} durationInFrames={len}>
        {children(b, len)}
      </Sequence>
      <Voice c={c} />
    </AbsoluteFill>
  );
};
