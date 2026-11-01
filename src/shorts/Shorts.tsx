import React from 'react';
import {Composition} from 'remotion';
import {Short, SHORT_FPS, SHORT_H, SHORT_W, type ShortSpec} from './Short';
import specs from './shorts.json';

type Entry = Omit<ShortSpec, 'src' | 'srt' | 'from' | 'to'> & {long: string; srt: string; from: number; to: number};

/** One composition per entry in shorts.json. `node scripts/short.mjs prep <id>` cuts the clip + shifted srt into public/shorts_src/. */
export const ShortCompositions: React.FC = () => (
  <>
    {(specs as Entry[]).map((e) => {
      const dur = Math.round((e.to - e.from) * SHORT_FPS);
      const props: ShortSpec = {id: e.id, src: `shorts_src/${e.id}.mp4`, srt: `shorts_src/${e.id}.srt`, from: 0, to: e.to - e.from,
        title: e.title, boxH: e.boxH, focusX: e.focusX, bg: e.bg, accent: e.accent};
      return <Composition key={e.id} id={e.id} component={Short} durationInFrames={dur} fps={SHORT_FPS} width={SHORT_W} height={SHORT_H} defaultProps={props} />;
    })}
  </>
);
