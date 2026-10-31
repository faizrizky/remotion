// Question intro (Karhutla reel idea, flat cartoon look): words pop in one by one as chips, then a big
// bouncing "?" lands; a thinking mascot sits in the corner; small "?" float around. Plays in the silent `pre`
// of a chapter (ChapterSpec.intro) and fades into the chapter's world.
import React from 'react';
import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {HAND, SANS, usePop} from '../style/style_kit';
import {hasFile, LeoBadge, Sfx} from '../video02/v2kit';
import {clamp, INK, rand} from './core';

export type IntroSpec = {
  /** words of the question (the "?" is added by the component) */
  words: string[];
  /** indexes of words drawn in the highlight colour */
  highlight?: number[];
  /** mascot head in the corner (default head_thinking.png) */
  head?: string;
  /** backdrop image (strongly washed + blurred), e.g. the chapter's first panorama */
  image?: string;
  /** frames between words (default 5) */
  gap?: number;
};

const Word: React.FC<{text: string; at: number; hl: boolean; i: number}> = ({text, at, hl, i}) => {
  const f = useCurrentFrame();
  const p = usePop(at);
  const shown = f >= at;
  const rot = (i % 2 ? 1 : -1) * 2 * (1 - p * 0.5);
  return (
    <span style={{display: 'inline-block', opacity: shown ? 1 : 0, transform: `translateY(${(1 - p) * 40}px) scale(${0.7 + 0.3 * p}) rotate(${rot}deg)`, background: hl ? '#FFC53D' : '#FFF8EC', color: INK, fontFamily: SANS, fontWeight: 900, fontSize: hl ? 116 : 104, lineHeight: 1.15, padding: '6px 26px', borderRadius: 14, border: `5px solid ${INK}`, boxShadow: `0 8px 0 ${INK}`}}>
      {text}
    </span>
  );
};

export const QuestionIntro: React.FC<{intro: IntroSpec; dur: number}> = ({intro, dur}) => {
  const f = useCurrentFrame();
  const gap = intro.gap ?? 5;
  const qAt = 6 + intro.words.length * gap + 3;
  const q = usePop(qAt);
  const out = interpolate(f, [dur - 8, dur], [1, 0], clamp);
  const bob = Math.sin((f - qAt) / 5) * 8 * Math.min(1, Math.max(0, (f - qAt) / 6));
  return (
    <AbsoluteFill style={{opacity: out, transform: `scale(${1 + (1 - out) * 0.08})`}}>
      <AbsoluteFill style={{background: '#FFF4E0'}} />
      {intro.image && hasFile(intro.image) && (
        <AbsoluteFill>
          <Img src={staticFile(intro.image)} style={{width: '100%', height: '100%', objectFit: 'cover', filter: 'blur(7px) saturate(0.85)', transform: `scale(${1.08 + f * 0.0006})`}} />
          <AbsoluteFill style={{background: 'rgba(255,246,230,0.62)'}} />
        </AbsoluteFill>
      )}
      {/* floating small question marks */}
      {Array.from({length: 7}).map((_, i) => {
        const x = 120 + rand(`qx${i}`) * 1680;
        const y = 90 + rand(`qy${i}`) * 820;
        const a = 8 + i * 3;
        return <div key={i} style={{position: 'absolute', left: x, top: y + Math.sin((f + i * 13) / 14) * 14, fontFamily: HAND, fontWeight: 700, fontSize: 70 + rand(`qs${i}`) * 50, color: i % 2 ? '#E8A520' : '#7A6CFF', opacity: interpolate(f, [a, a + 8], [0, 0.35], clamp), transform: `rotate(${(rand(`qr${i}`) - 0.5) * 40}deg)`}}>?</div>;
      })}
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', padding: '0 140px'}}>
        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '26px 22px', maxWidth: 1560}}>
          {intro.words.map((w, i) => <Word key={i} text={w} at={6 + i * gap} hl={(intro.highlight ?? []).includes(i)} i={i} />)}
          <span style={{display: 'inline-block', fontFamily: SANS, fontWeight: 900, fontSize: 230, lineHeight: 0.9, color: '#E8A520', WebkitTextStroke: `8px ${INK}`, paintOrder: 'stroke fill', textShadow: `0 10px 0 ${INK}`, opacity: f < qAt ? 0 : 1, transform: `translateY(${bob}px) scale(${q}) rotate(${(1 - q) * -30 + Math.sin(f / 9) * 4}deg)`, marginLeft: 6}}>?</span>
        </div>
      </AbsoluteFill>
      {/* the asking mascot in the corner */}
      <div style={{position: 'absolute', left: 0, top: 0, transform: `rotate(${Math.sin(f / 12) * 3}deg)`, transformOrigin: '1720px 900px'}}>
        <LeoBadge head={intro.head ?? 'head_thinking.png'} at={10} x={1600} y={780} size={240} />
      </div>
      <Sfx name="whoosh" at={0} />
      <Sfx name="pop" at={6} />
      <Sfx name="pop" at={qAt} />
    </AbsoluteFill>
  );
};
