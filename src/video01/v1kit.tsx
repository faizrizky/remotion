// Video 01 helpers. Presentational parts come from the Video 02 kit (same reusable components); only timing and a few
// Penny-specific pieces (Leo full body, flying props, ripples) live here.
import React from 'react';
import {AbsoluteFill, Html5Audio, Sequence, staticFile} from 'remotion';
import {PopSpeed} from '../style/style_kit';
import {TitleCard, TITLE_WIPE} from '../video02/title';
import {V2_TEMPO} from '../video02/ChapterShell';
import {beatOf, Chapter, chapterFrames, hasFile, sec, Sfx, Voice, Watermark} from '../video02/v2kit';
import timing from './timing.json';

export const CHAPTERS1 = timing.chapters as unknown as (Chapter & {titleAudio: string})[];
export type V1Id = 'hook' | 't1' | 't2' | 't3' | 't4' | 'cust' | 'mean' | 'outro';
export const getChapter1 = (id: V1Id) => {
  const c = CHAPTERS1.find((x) => x.id === id);
  if (!c) throw new Error(`video01/timing.json has no chapter "${id}"`);
  return c;
};
export const frames1 = (id: V1Id) => chapterFrames(getChapter1(id));


const CARD: Record<string, {label: string; head: string; color: string}> = {
  t1: {label: 'TRICK 1', head: 'head_happy.png', color: '#2E9E8F'},
  t2: {label: 'TRICK 2', head: 'head_suspicious.png', color: '#7A6CFF'},
  t3: {label: 'TRICK 3', head: 'head_thinking.png', color: '#D9506E'},
  t4: {label: 'TRICK 4', head: 'head_shocked.png', color: '#4E7BEF'},
  cust: {label: '', head: 'head_calm.png', color: '#E4572E'},
  mean: {label: '', head: 'head_thinking.png', color: '#3A8D5C'},
};

/** One chapter of Video 01: optional title card (title clip plays inside it) + narration + content + logo watermark. */
export const ChapterShell1: React.FC<{id: V1Id; children: (b: (k: string) => number, len: number) => React.ReactNode}> = ({id, children}) => {
  const c = getChapter1(id);
  const pre = sec(c.pre);
  const len = chapterFrames(c) - pre;
  const b = beatOf(c);
  const card = CARD[id];
  return (
    <PopSpeed.Provider value={V2_TEMPO}>
      <AbsoluteFill style={{background: '#000'}}>
        <Sequence from={pre} durationInFrames={len}>{children(b, len)}</Sequence>
        {pre > 0 && card && (
          <Sequence durationInFrames={pre + TITLE_WIPE}>
            <TitleCard part={0} label={card.label} title={c.title} head={card.head} wipeAt={pre} color={card.color} />
            <Sfx name="whoosh" at={pre} />
          </Sequence>
        )}
        {c.titleAudio && hasFile(c.titleAudio) && (
          <Sequence from={4} layout="none"><Html5Audio src={staticFile(c.titleAudio)} /></Sequence>
        )}
        <Watermark />
        <Voice c={c} />
      </AbsoluteFill>
    </PopSpeed.Provider>
  );
};

export {Win, LeoFull, Fly, Ripple, Shadow, CountMoney, Tag, Bar} from '../kit/pieces';
