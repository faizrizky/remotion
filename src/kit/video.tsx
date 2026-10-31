// One call builds a whole video: compositions for every chapter + the full video with music.
import React from 'react';
import {AbsoluteFill, Composition, Folder, Html5Audio, interpolate, Sequence, staticFile} from 'remotion';
import {PopSpeed} from '../style/style_kit';
import {PennySting} from './sting';
import {hasFile, Voice, Watermark} from '../video02/v2kit';
import {Chapter, chapterFrames, clamp, H, layoutVideo, STING_FRAMES, Timing, W} from './core';
import {ChapterSpec, SpecChapter} from './spec';
import {Enter, EnterKind} from './transitions';
import {IntroSpec, QuestionIntro} from './intro';

export const TEMPO = 0.62;

/** "Penny Logics" brand sting in a chapter tail (no dive). The in-chapter version (stingIn) dives into the next scene. */
export const BrandSting: React.FC = () => <PennySting dur={STING_FRAMES} />;

/** Chapter frame: no title card (rule), voice, watermark, slower tempo, optional sting in the tail. */
export const ChapterShellK: React.FC<{c: Chapter; fps: number; enter?: EnterKind; cx?: number; cy?: number; sting?: boolean; stingIn?: boolean; stingQuiet?: boolean; intro?: IntroSpec; children: React.ReactNode}> = ({c, fps, enter = 'none', cx, cy, sting, stingIn, stingQuiet, intro, children}) => {
  const pre = Math.round(c.pre * fps);
  const voiceEnd = pre + Math.round(c.audioDur * fps);
  return (
    <PopSpeed.Provider value={TEMPO}>
      <Enter kind={enter} cx={cx} cy={cy} seed={c.id}>
        <AbsoluteFill>
          {/* with stingIn the previous chapter stays visible under the burst circles for the first frames */}
          <Sequence from={stingIn ? 10 : 0}><AbsoluteFill style={{background: '#FFF4E0'}} /></Sequence>
          <Sequence from={pre}>{children}</Sequence>
          {stingIn && pre > 0 && <Sequence durationInFrames={pre + 10}><PennySting dur={pre + 10} reveal quiet={stingQuiet} /></Sequence>}
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
  /** background music: one flat level under the whole video (rule 16), silent only while the opening plays */
  music?: {file: string; vol?: number};
  /** opening music played over the PennySting (rule 17): starts with the burst, background music crossfades back after */
  intro?: {file: string; vol?: number};
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
      <ChapterShellK c={c} fps={fps} enter={enter} cx={d.spec.enter?.cx} cy={d.spec.enter?.cy} sting={d.spec.sting} stingIn={d.spec.stingIn} stingQuiet={!!v.intro} intro={d.spec.intro}>
        <SpecChapter spec={d.spec} chapter={c} fps={fps} />
      </ChapterShellK>
    );
  };
  // where each sting starts and how long it covers (frames)
  const stings = parts.flatMap((p, i) => {
    if (!('spec' in p.d)) return [];
    if (p.d.spec.stingIn) return [{at: starts[i], len: Math.round(p.c.pre * fps) + 10}];
    if (p.d.spec.sting) return [{at: starts[i] + Math.round((p.c.pre + p.c.audioDur) * fps) + 2, len: STING_FRAMES}];
    return [];
  });
  const vol = v.music?.vol ?? 0.08;
  const introOn = !!v.intro && hasFile(v.intro.file);
  const musicVolume = (f: number) => {
    let m = vol;
    // flat everywhere; with an opening track it gets out of the way (fast) and comes back with a slow fade-in
    // that overlaps the opening's tail, so the join is a crossfade instead of a cut
    if (introOn) for (const s of stings) if (f >= s.at - 6 && f < s.at + s.len + 36) m = Math.min(m, interpolate(f, [s.at - 6, s.at + 4, s.at + s.len - 10, s.at + s.len + 36], [vol, 0, 0, vol], clamp));
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
      {introOn && stings.map((s) => (
        <Sequence key={s.at} from={s.at} durationInFrames={s.len + 24}>
          <Html5Audio src={staticFile(v.intro!.file)} volume={v.intro!.vol ?? 0.7} />
        </Sequence>
      ))}
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
