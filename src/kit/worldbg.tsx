// "Polos hidup" background for a World: soft palette gradient along the world + low-contrast paper decor
// on parallax layers + optional paper ground. Text always stays the most visible thing.
import React from 'react';
import {PALETTES} from '../style/style_kit';
import {rand} from './core';
import {Depth, useCam} from './camera';

export type BgStop = {x: number; c: string}; // c = palette name (sky, mint...) or a hex colour
const col = (c: string, k: 'bg' | 'bg2' = 'bg') => (PALETTES[c] ? PALETTES[c][k] : c);

export const WorldBg: React.FC<{stops: BgStop[]; decor?: 'paper' | 'dots' | 'none'; ground?: number; seed?: string; amount?: number}> = ({stops, decor = 'paper', ground, seed = 'bg', amount = 1}) => {
  const {w, h} = useCam();
  const M = 3000;
  const total = w + 2 * M;
  const s = [...stops].sort((a, b) => a.x - b.x);
  const grad = s.map((p) => `${col(p.c)} ${(((p.x + M) / total) * 100).toFixed(2)}%`).join(', ');
  const tintAt = (x: number) => {
    let best = s[0];
    for (const p of s) if (p.x <= x) best = p;
    return col(best.c, 'bg2');
  };
  const n = Math.round((w / 420) * amount);
  return (
    <>
      <div style={{position: 'absolute', left: -M, top: -M, width: total, height: h + 2 * M, background: `linear-gradient(90deg, ${grad})`}} />
      <div style={{position: 'absolute', left: -M, top: -M, width: total, height: h + 2 * M, background: `linear-gradient(180deg, rgba(255,255,255,0.35) ${M}px, rgba(255,255,255,0) ${M + h * 0.6}px)`}} />
      {decor === 'paper' && (
        <Depth d={0.55}>
          {Array.from({length: n}).map((_, i) => {
            const x = rand(`${seed}x${i}`) * (w + 1200) - 600;
            const y = rand(`${seed}y${i}`) * (h + 400) - 200;
            const size = 220 + rand(`${seed}s${i}`) * 420;
            const r = [0, 1, 2, 3].map((j) => 30 + Math.round(rand(`${seed}r${i}${j}`) * 50));
            return <div key={i} style={{position: 'absolute', left: x, top: y, width: size, height: size * (0.55 + rand(`${seed}h${i}`) * 0.5), borderRadius: `${r[0]}% ${r[1]}% ${r[2]}% ${r[3]}%`, background: tintAt(x), opacity: 0.16, transform: `rotate(${rand(`${seed}a${i}`) * 40 - 20}deg)`, boxShadow: '0 6px 0 rgba(60,35,10,0.06)'}} />;
          })}
        </Depth>
      )}
      {decor === 'dots' && (
        <Depth d={0.8}>
          <div style={{position: 'absolute', left: -600, top: -400, width: w + 1200, height: h + 800, opacity: 0.13, backgroundImage: 'radial-gradient(circle, rgba(25,20,17,0.9) 3px, transparent 3.5px)', backgroundSize: '56px 56px'}} />
        </Depth>
      )}
      {ground !== undefined && (
        <svg width={w + 2000} height={h - ground + 1400} style={{position: 'absolute', left: -1000, top: ground - 60, overflow: 'visible'}}>
          <path d={hills(w + 2000, seed)} fill={tintAt(w / 2)} opacity={0.42} />
          <path d={hills(w + 2000, seed + 'b', 30)} fill="#FFFFFF" opacity={0.18} />
        </svg>
      )}
    </>
  );
};

const hills = (len: number, seed: string, lift = 0) => {
  let d = `M0 ${80 - lift}`;
  for (let x = 0; x <= len; x += 160) d += ` Q${x + 80} ${40 - lift + rand(`${seed}${x}`) * 70} ${x + 160} ${70 - lift + rand(`${seed}q${x}`) * 30}`;
  return d + ` L${len} 2000 L0 2000 Z`;
};
