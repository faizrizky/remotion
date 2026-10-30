// Generic phone UI pieces (no brand look-alikes).
import React from 'react';
import {useCurrentFrame} from 'remotion';
import {SANS, usePop} from '../style/style_kit';
import {INK} from './core';

export type Notif = {title: string; body?: string; at: number; color?: string; icon?: string};
/** Notifications drop in from the top one by one; older ones get pushed down. `at` values are frames. */
export const NotifStack: React.FC<{items: Notif[]; w?: number; size?: number}> = ({items, w = 640, size = 30}) => {
  const f = useCurrentFrame();
  const shown = items.filter((n) => f >= n.at);
  const ch = size * 3.4;
  return (
    <div style={{position: 'absolute', left: 0, top: 0, width: w}}>
      {items.map((n, i) => {
        const idx = shown.length - 1 - shown.indexOf(n);
        return <NotifCard key={i} n={n} w={w} size={size} y={idx < 0 ? 0 : idx * (ch + 16)} visible={f >= n.at} />;
      })}
    </div>
  );
};
const NotifCard: React.FC<{n: Notif; w: number; size: number; y: number; visible: boolean}> = ({n, w, size, y, visible}) => {
  const p = usePop(n.at, 150, 13);
  if (!visible) return null;
  return (
    <div style={{position: 'absolute', left: 0, top: y - (1 - p) * 120, width: w, opacity: Math.min(1, p * 1.4), display: 'flex', gap: 18, alignItems: 'center', background: '#FFFFFF', border: `5px solid ${INK}`, borderRadius: 26, padding: '14px 20px', boxSizing: 'border-box', boxShadow: '0 8px 0 rgba(0,0,0,0.18)', fontFamily: SANS, color: INK}}>
      <div style={{width: size * 1.8, height: size * 1.8, borderRadius: 14, background: n.color ?? '#FF6B6B', border: `4px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: size * 1.1, fontWeight: 900, color: '#fff', flexShrink: 0}}>{n.icon ?? '!'}</div>
      <div style={{minWidth: 0}}>
        <div style={{fontWeight: 800, fontSize: size}}>{n.title}</div>
        {n.body && <div style={{fontWeight: 600, fontSize: size * 0.8, opacity: 0.75}}>{n.body}</div>}
      </div>
    </div>
  );
};
