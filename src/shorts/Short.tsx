// Reusable vertical Short (1080x1920) cut from any finished long video.
// Input = the rendered long MP4 + its .srt (both in public/shorts_src/), a time range, and a hook title.
// Layout keeps everything inside the Shorts safe area (top ~200 px and bottom ~420 px are covered by the
// YouTube UI, the right ~140 px by the like/comment buttons):
//   title (y 230-560) -> video window (y 600-) -> burned captions -> small brand line.
import React, {useEffect, useMemo, useState} from 'react';
import {AbsoluteFill, Img, OffthreadVideo, continueRender, delayRender, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {HAND, SANS} from '../style/style_kit';

export type ShortSpec = {
  id: string;
  /** Long video file inside public/ (e.g. shorts_src/Video01.mp4). */
  src: string;
  /** Its subtitle file inside public/ (e.g. shorts_src/video01.srt). */
  srt: string;
  /** Range in seconds of the long video. */
  from: number;
  to: number;
  /** Hook title. Wrap words in *stars* to colour them. */
  title: string;
  /** Height of the video window (608 = whole 16:9 frame; larger = zoomed in and cropped left/right). */
  boxH?: number;
  /** 0 = keep the left edge, 0.5 = centre, 1 = right edge (only matters when boxH > 608). */
  focusX?: number;
  /** Background colour behind everything. */
  bg?: string;
  accent?: string;
};

export const SHORT_W = 1080, SHORT_H = 1920, SHORT_FPS = 24;
const INK = '#1F1B2E';

type Cue = {start: number; end: number; text: string};
const toSec = (t: string) => {
  const [h, m, rest] = t.split(':');
  const [s, ms] = rest.split(',');
  return +h * 3600 + +m * 60 + +s + +ms / 1000;
};
export const parseSrt = (txt: string): Cue[] =>
  txt.replace(/\r/g, '').trim().split(/\n\s*\n/).map((b) => {
    const lines = b.split('\n');
    const i = lines.findIndex((l) => l.includes('-->'));
    if (i < 0) return null;
    const [a, z] = lines[i].split('-->').map((s) => toSec(s.trim()));
    return {start: a, end: z, text: lines.slice(i + 1).join(' ').trim()};
  }).filter(Boolean) as Cue[];

/** Splits every cue into short phrases (max ~5 words, breaking after punctuation), timed by character count. */
export const phrases = (cues: Cue[]): Cue[] => {
  const out: Cue[] = [];
  for (const c of cues) {
    const words = c.text.split(/\s+/).filter(Boolean);
    const groups: string[][] = [];
    let g: string[] = [];
    for (const w of words) {
      g.push(w);
      const punct = /[.,!?;:]$/.test(w) && !/^\$?\d+[.,]$/.test(w);
      if (g.length >= 7 || (punct && g.length >= 3)) { groups.push(g); g = []; }
    }
    if (g.length) {
      if (g.length === 1 && groups.length) groups[groups.length - 1].push(...g);
      else groups.push(g);
    }
    const total = groups.reduce((n, x) => n + x.join(' ').length, 0) || 1;
    let t = c.start;
    for (const x of groups) {
      const d = ((c.end - c.start) * x.join(' ').length) / total;
      out.push({start: t, end: t + d, text: x.join(' ')});
      t += d;
    }
  }
  return out;
};

const Title: React.FC<{text: string; accent: string}> = ({text, accent}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: f, fps, config: {damping: 13, stiffness: 140}});
  const parts = text.split(/(\*[^*]+\*)/).filter(Boolean);
  return (
    <div style={{position: 'absolute', left: 90, right: 90, top: 300, height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <div style={{transform: `scale(${0.85 + 0.15 * s}) rotate(-1.5deg)`, opacity: s, textAlign: 'center', fontFamily: SANS, fontWeight: 900, fontSize: 72, lineHeight: 1.12, color: INK, letterSpacing: -1}}>
        {parts.map((p, i) => p.startsWith('*')
          ? <span key={i} style={{color: '#fff', background: accent, padding: '0 14px', borderRadius: 14, whiteSpace: 'nowrap', boxDecorationBreak: 'clone', WebkitBoxDecorationBreak: 'clone'}}>{p.slice(1, -1)}</span>
          : <span key={i}>{p}</span>)}
      </div>
    </div>
  );
};

const Caption: React.FC<{cue: Cue | null; local: number; accent: string; y: number}> = ({cue, local, accent, y}) => {
  const {fps} = useVideoConfig();
  if (!cue) return null;
  const age = local - cue.start;
  const s = spring({frame: Math.max(0, age * fps), fps, config: {damping: 14, stiffness: 220}});
  const words = cue.text.split(' ');
  return (
    <div style={{position: 'absolute', left: 120, width: 840, top: y, height: 210, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <div style={{transform: `translateY(${(1 - s) * 18}px) scale(${0.92 + 0.08 * s})`, opacity: Math.min(1, s * 1.4), textAlign: 'center', fontFamily: SANS, fontWeight: 800, fontSize: 66, lineHeight: 1.15, color: INK}}>
        {words.map((w, i) => {
          const num = /[\d$%]/.test(w);
          return <span key={i} style={num ? {color: accent} : undefined}>{w}{i < words.length - 1 ? ' ' : ''}</span>;
        })}
      </div>
    </div>
  );
};

export const Short: React.FC<ShortSpec> = ({src, srt, from, to, title, boxH = 700, focusX = 0.5, bg = '#F7EFE2', accent = '#E4572E'}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const [cues, setCues] = useState<Cue[] | null>(null);
  const [handle] = useState(() => delayRender('srt'));
  useEffect(() => {
    fetch(staticFile(srt)).then((r) => r.text()).then((t) => { setCues(phrases(parseSrt(t))); continueRender(handle); });
  }, [srt, handle]);

  const t = from + f / fps;
  const cue = useMemo(() => (cues ?? []).find((c) => t >= c.start && t < c.end) ?? null, [cues, t]);

  // video window: cover a 1080 x boxH box, crop horizontally by focusX
  const vh = boxH, vw = (vh * 16) / 9;
  const left = -(vw - SHORT_W) * focusX;
  const top = 630;
  // No audio fade in or out (rule 1.34): the cut points sit in real voice pauses (scripts/short_pick.py), so a fade only makes the voice sound chopped.

  return (
    <AbsoluteFill style={{background: bg}}>
      {/* soft paper dots so the bg is not flat */}
      <AbsoluteFill style={{backgroundImage: 'radial-gradient(rgba(31,27,46,0.07) 2px, transparent 2.5px)', backgroundSize: '34px 34px'}} />
      <Title text={title} accent={accent} />
      <div style={{position: 'absolute', left: 0, top, width: SHORT_W, height: vh, overflow: 'hidden', borderTop: `8px solid ${INK}`, borderBottom: `8px solid ${INK}`, background: '#000'}}>
        <OffthreadVideo src={staticFile(src)} startFrom={Math.round(from * fps)} endAt={Math.round(to * fps)} volume={1}
          style={{position: 'absolute', left, top: 0, width: vw, height: vh}} />
      </div>
      <Caption cue={cue} local={t} accent={accent} y={top + boxH + 20} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 210, display: 'flex', justifyContent: 'center'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 16, background: '#fff', border: `5px solid ${INK}`, borderRadius: 999, padding: '6px 26px 6px 8px', boxShadow: '0 6px 0 rgba(0,0,0,0.15)'}}>
          <Img src={staticFile('profile_pic.png')} style={{width: 50, height: 50, borderRadius: 999}} />
          <span style={{fontFamily: SANS, fontWeight: 800, fontSize: 30, color: INK}}>Penny Logics</span>
          <span style={{fontFamily: HAND, fontWeight: 700, fontSize: 36, color: accent}}>full video on the channel</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
