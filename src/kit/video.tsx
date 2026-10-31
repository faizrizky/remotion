// One call builds a whole video: compositions for every chapter + the full video with music.
import React from 'react';
import {AbsoluteFill, Composition, Folder, Html5Audio, interpolate, Sequence, staticFile} from 'remotion';
import {CircleBurstWipe, PopSpeed, StrokeLogo} from '../style/style_kit';
import {hasFile, Sfx, Voice, Watermark} from '../video02/v2kit';
import {Chapter, chapterFrames, clamp, H, layoutVideo, STING_FRAMES, Timing, W} from './core';
import {ChapterSpec, SpecChapter} from './spec';
import {Enter, EnterKind} from './transitions';
import {IntroSpec, QuestionIntro} from './intro';

export const TEMPO = 0.62;

/** "Penny Logics" brand sting (same as Video 02): gold circles burst, logo draws on. */
export const BrandSting: React.FC = () => (
  <AbsoluteFill>
    <CircleBurstWipe color="#E8A520" dur={12} seed="sting" />
    <Sequence from={8}><StrokeLogo text="Penny Logics" color="#191411" size={170} drawFrames={18} fillFrames={8} /></Sequence>
    <Sfx name="whoosh" at={0} />
  </AbsoluteFill>
);

/** Chapter frame: no title card (rule), voice, watermark, slower tempo, optional sting in the tail. */
export const ChapterShellK: React.FC<{c: Chapter; fps: number; enter?: EnterKind; cx?: number; cy?: number; sting?: boolean; intro?: IntroSpec; children: React.ReactNode}> = ({c, fps, enter = 'none', cx, cy, sting, intro, children}) => {
  const pre = Math.round(c.pre * fps);
  const voiceEnd = pre + Math.round(c.audioDur * fps);
  return (
    <PopSpeed.Provider value={TEMPO}>
      <Enter kind={enter} cx={cx} cy={cy} seed={c.id}>
        <AbsoluteFill style={{background: '#FFF4E0'}}>
          <Sequence from={pre}>{children}</Sequence>
          {intro && pre > 0 && <Sequence durationInFrames={pre + 8}><QuestionIntro intro={intro} dur={pre + 8} /></Sequence>}
          {sting && <Sequence from={voiceEnd + 2} durationInFrames={Math.max(STING_FRAMES, chapterFrames(c, fps) - voiceEnd)}><BrandSting /></Sequence>}
          <Watermark />
        </AbsoluteFill>
      </Enter>
      <Voice c={c} />
    </PopSpeed.Provider>
  );
};

export type VideoDef = {
  /** composition id prefix, e.g. 'V1' -> V1-Full, V1-00-Hook ... */
  prefix: string;
  /** the imported timing.json */
  timing: unknown;
  /** one spec per chapter, same order as timing.chapters (or a custom component) */
  chapters: ({spec: ChapterSpec; name: string} | {comp: React.FC; name: string; enter?: EnterKind})[];
  music?: {file: string; vol?: number; duck?: number};
};

export const makeVideo = (v: VideoDef) => {
  const timing = v.timing as Timing;
  const fps = timing.fps;
  const parts = timing.chapters.map((c, i) => {
    const d = v.chapters[i];
    if (!d) throw new Error(`${v.prefix}: no chapter definition for timing chapter "${c.id}"`);
    const enter: EnterKind = 'spec' in d ? d.spec.enter?.kind ?? 'whip' : d.enter ?? 'whip';
    return {c, d, enter: i === 0 ? ('none' as EnterKind) : enter, name: `${v.prefix}-${String(i).padStart(2, '0')}-${d.name}`};
  });
  const {starts, total} = layoutVideo(timing, parts.map((p) => p.enter));
  const Chap: React.FC<{i: number}> = ({i}) => {
    const {c, d, enter} = parts[i];
    if ('comp' in d) return <ChapterShellK c={c} fps={fps} enter={enter}><d.comp /></ChapterShellK>;
    return (
      <ChapterShellK c={c} fps={fps} enter={enter} cx={d.spec.enter?.cx} cy={d.spec.enter?.cy} sting={d.spec.sting} intro={d.spec.intro}>
        <SpecChapter spec={d.spec} chapter={c} fps={fps} />
      </ChapterShellK>
    );
  };
  const stingAt = parts.map((p, i) => ('spec' in p.d && p.d.spec.sting ? starts[i] + Math.round((p.c.pre + p.c.audioDur) * fps) : -1)).filter((x) => x >= 0);
  const vol = v.music?.vol ?? 0.07;
  const duck = v.music?.duck ?? 0.015;
  const musicVolume = (f: number) => {
    let m = vol;
    for (const s of stingAt) if (f >= s - 6 && f < s + STING_FRAMES + 12) m = Math.min(m, interpolate(f, [s - 6, s, s + STING_FRAMES, s + STING_FRAMES + 12], [vol, duck, duck, vol], clamp));
    return m * interpolate(f, [total - fps * 3, total - 1], [1, 0], clamp);
  };
  const chapComps: React.FC[] = parts.map((_, i) => {
    const C: React.FC = () => <Chap i={i} />;
    C.displayName = `Chapter${i}`;
    return C;
  });
  const Full: React.FC = () => (
    <>
      {parts.map((p, i) => (
        <Sequence key={p.c.id} from={starts[i]} durationInFrames={chapterFrames(p.c, fps)}>
          <Chap i={i} />
        </Sequence>
      ))}
      {v.music && hasFile(v.music.file) && <Html5Audio src={staticFile(v.music.file)} loop volume={musicVolume} />}
    </>
  );
  const Compositions: React.FC = () => (
    <Folder name={`Video-${v.prefix}`}>
      <Composition id={`${v.prefix}-Full`} component={Full} durationInFrames={total} fps={fps} width={W} height={H} />
      {parts.map((p, i) => <Composition key={p.c.id} id={p.name} component={chapComps[i]} durationInFrames={chapterFrames(p.c, fps)} fps={fps} width={W} height={H} />)}
    </Folder>
  );
  return {Full, Compositions, total, starts};
};
