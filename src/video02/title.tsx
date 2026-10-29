import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {loadFont} from '@remotion/fonts';
import {staticFile} from 'remotion';
import {usePop} from '../style/style_kit';
import {INK, LeoBadge, Sfx} from './v2kit';

export const ROUND = 'Fredoka';
loadFont({family: ROUND, url: staticFile('fonts/fredoka-latin-700-normal.woff2'), weight: '700'});

export const TITLE_WIPE = 16;

/** One word of the title: pops from small and overshoots, white fill with a blue glow outline (reference: Instagram "Tau gak sih"). */
const TitleWord: React.FC<{text: string; at: number; size: number; i: number}> = ({text, at, size, i}) => {
  const p = usePop(at, 160, 10);
  const f = useCurrentFrame();
  const start = 0.25 + 0.75 * p;
  return (
    <div style={{opacity: f < at ? 0 : 1, transform: `translateY(${(i % 2 ? 1 : -1) * 5}px) rotate(${(i % 2 ? 1 : -1) * 1.5}deg) scale(${start})`, transformOrigin: '50% 80%', fontFamily: ROUND, fontWeight: 700, fontSize: size, lineHeight: 1, color: '#fff', WebkitTextStroke: '10px #4E7BEF', paintOrder: 'stroke fill', textShadow: '0 0 18px rgba(110,160,255,0.85), 0 0 4px rgba(110,160,255,0.9)', whiteSpace: 'nowrap'}}>{text}</div>
  );
};

/**
 * Chapter title card, copied from the Instagram reference: dark warm background, words pop in one at a time
 * low-left, Leo pops in at the end like the "?" mascot, then a white bar wipes right-to-left over the card
 * revealing the next scene. `wipeAt` = frame where the wipe starts (card must run TITLE_WIPE frames longer).
 */
export const TitleCard: React.FC<{part: number; title: string; head: string; wipeAt: number; color?: string}> = ({part, title, head, wipeAt, color = '#4E7BEF'}) => {
  const f = useCurrentFrame();
  const words = title.split(' ');
  const gap = 9;
  const first = 8;
  const leoAt = first + words.length * gap + 4;
  const t = interpolate(f, [wipeAt, wipeAt + TITLE_WIPE], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const edge = 1920 * (1 - t); // bar position (moves right -> left)
  const size = words.length > 4 ? 128 : 150;
  const wob = f >= leoAt ? Math.sin((f - leoAt) * 0.35) * 5 * Math.exp(-(f - leoAt) / 36) : 0;
  return (
    <AbsoluteFill style={{background: INK}}>
      <AbsoluteFill style={{clipPath: `inset(0 ${1920 - edge}px 0 0)`}}>
        <AbsoluteFill style={{background: 'radial-gradient(ellipse at 40% 70%, #2A1D22 0%, #150F12 70%)'}} />
        <div style={{position: 'absolute', left: 140, top: 330, fontFamily: ROUND, fontWeight: 700, fontSize: 54, color: '#FFD23F', letterSpacing: 6, opacity: f >= 2 ? 1 : 0}}>PART {part}</div>
        <div style={{position: 'absolute', left: 140, top: 620, display: 'flex', alignItems: 'flex-end', gap: size * 0.22}}>
          {words.map((w, i) => <TitleWord key={i} text={w} at={first + i * gap} size={size} i={i} />)}
        </div>
        <div style={{position: 'absolute', left: 0, top: 0, transform: `rotate(${wob}deg)`}}>
          <LeoBadge head={head} at={leoAt} x={1500} y={560} size={260} ring={color} />
        </div>
        {words.map((_, i) => <Sfx key={i} name="pop" at={first + i * gap} />)}
        <Sfx name="pop" at={leoAt} />
      </AbsoluteFill>
      <div style={{position: 'absolute', top: 0, bottom: 0, left: edge - 14, width: 60, background: '#fff', opacity: t > 0 && t < 1 ? 0.95 : 0, boxShadow: '0 0 40px rgba(255,255,255,0.8)'}} />
    </AbsoluteFill>
  );
};
