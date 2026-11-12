// Rule Zero - cards drawn in Remotion (title, rule sheet, log book, CCTV wall, fork chips).
import React from 'react';
import {AbsoluteFill, Img, interpolate, random, staticFile, useCurrentFrame} from 'remotion';
import {C, clamp, HAND, HEAVY, MONO, TYPE, useT, W, H} from './rzkit';

/* ---------------- Title card ---------------- */
export const TitleCard: React.FC<{series: string; part: string}> = ({series, part}) => {
  const t = useT();
  const frame = useCurrentFrame();
  const punch = interpolate(t, [0, 0.18], [1.18, 1], clamp);
  const fl = random(`tf${Math.floor(frame / 2)}`) > 0.93 ? 0.55 : 1;
  const sub = interpolate(t, [0.25, 0.45], [0, 1], clamp);
  const part1 = interpolate(t, [0.55, 0.75], [0, 1], clamp);
  return (
    <AbsoluteFill style={{background: `radial-gradient(ellipse at 50% 45%, #18241f 0%, ${C.ink} 70%)`, alignItems: 'center', justifyContent: 'center'}}>
      <AbsoluteFill style={{background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.25) 0px, rgba(0,0,0,0.25) 2px, rgba(0,0,0,0) 2px, rgba(0,0,0,0) 5px)'}} />
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 26, transform: `scale(${punch})`, opacity: fl}}>
        <div style={{fontFamily: MONO, fontSize: 40, color: C.grey, letterSpacing: 10}}>RULE</div>
        <div style={{fontFamily: HEAVY, fontWeight: 700, fontSize: 230, lineHeight: 0.9, color: C.fluor, letterSpacing: 6, textShadow: `0 0 40px rgba(217,242,230,0.25)`}}>ZERO</div>
        <div style={{width: 560, height: 6, background: C.yellow, transform: `scaleX(${sub})`}} />
        <div style={{fontFamily: MONO, fontSize: 48, color: C.yellow, letterSpacing: 6, opacity: sub}}>{series}</div>
        <div style={{fontFamily: TYPE, fontSize: 64, color: C.fluor, opacity: part1, marginTop: 10}}>{part}</div>
      </div>
    </AbsoluteFill>
  );
};

/* ---------------- Pinned sheet (image space of the booth plates) ---------------- */
// Free wall space under the monitors, right of the two old notes (CR-3: never cover what is already on the wall).
export const PinnedSheet: React.FC = () => (
  <div style={{position: 'absolute', left: '51.5%', top: '47.2%', width: '8.4%', aspectRatio: '0.74', transform: 'rotate(2.2deg)', background: '#e4e9dc', borderRadius: 2, boxShadow: '0 5px 10px rgba(0,0,0,0.45)', border: '2px solid rgba(20,26,22,0.8)'}}>
    <div style={{position: 'absolute', left: '12%', right: '12%', top: '10%', height: '7%', background: 'rgba(29,36,33,0.75)'}} />
    {[0, 1, 2, 3, 4].map((i) => (
      <div key={i} style={{position: 'absolute', left: '12%', width: `${i === 4 ? 40 : 76}%`, top: `${27 + i * 13}%`, height: '3.5%', background: 'rgba(29,36,33,0.45)'}} />
    ))}
    <div style={{position: 'absolute', left: '-14%', top: '-5%', width: '38%', height: '9%', background: 'rgba(255,210,63,0.8)', transform: 'rotate(-30deg)'}} />
    <div style={{position: 'absolute', right: '-14%', top: '-5%', width: '38%', height: '9%', background: 'rgba(255,210,63,0.8)', transform: 'rotate(30deg)'}} />
  </div>
);

/* ---------------- Rule sheet card ---------------- */
export type TypedLine = {n: string; text: string; start: number; end: number; scratchAt?: number; blur?: boolean};

const Tape: React.FC<{x: number; y: number; r: number}> = ({x, y, r}) => (
  <div style={{position: 'absolute', left: x, top: y, width: 190, height: 58, background: 'rgba(255,210,63,0.78)', transform: `rotate(${r}deg)`, boxShadow: '0 3px 6px rgba(0,0,0,0.25)', clipPath: 'polygon(3% 0, 97% 4%, 100% 50%, 96% 100%, 2% 96%, 0 52%)'}} />
);

export const RuleSheetCard: React.FC<{lines: TypedLine[]; rectAt?: number; zoomTo?: {at: number; y: number; z: number}}> = ({lines, rectAt, zoomTo}) => {
  const t = useT();
  const enter = interpolate(t, [0, 0.25], [0, 1], clamp);
  const zp = zoomTo ? interpolate(t, [zoomTo.at, zoomTo.at + 1.2], [0, 1], {...clamp, easing: (x) => 1 - Math.pow(1 - x, 3)}) : 0;
  const z = 1 + (zoomTo ? (zoomTo.z - 1) * zp : 0);
  const oy = zoomTo ? -zoomTo.y * zp : 0;
  const cardW = 900;
  const cardH = 1240;
  const rectP = rectAt !== undefined ? interpolate(t, [rectAt, rectAt + 0.6], [0, 1], clamp) : 0;
  return (
    <AbsoluteFill style={{background: C.ink, overflow: 'hidden'}}>
      <Img src={staticFile('rz1/img/booth_clean.jpg')} style={{position: 'absolute', width: W * 1.6, left: -W * 0.05, top: -H * 0.35, filter: 'blur(14px) brightness(0.45)'}} />
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
        <div style={{transform: `translateY(${(1 - enter) * 120 + oy}px) scale(${(0.94 + 0.06 * enter) * z}) rotate(-1.2deg)`, opacity: enter, position: 'relative', width: cardW, height: cardH, marginTop: 40}}>
          {/* paper */}
          <div style={{position: 'absolute', inset: 0, background: C.laminate, borderRadius: 6, boxShadow: '0 30px 60px rgba(0,0,0,0.55)', overflow: 'hidden'}}>
            <svg width="100%" height="100%" style={{position: 'absolute', inset: 0, opacity: 0.35}}>
              <filter id="paperNoise">
                <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4" />
                <feColorMatrix values="0 0 0 0 0.35  0 0 0 0 0.38  0 0 0 0 0.33  0 0 0 0.55 0" />
              </filter>
              <rect width="100%" height="100%" filter="url(#paperNoise)" />
            </svg>
            <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 80%, rgba(140,120,80,0.18) 0%, rgba(0,0,0,0) 45%)'}} />
            <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(118deg, rgba(255,255,255,0) 30%, rgba(255,255,255,0.45) 38%, rgba(255,255,255,0) 46%)'}} />
          </div>
          <Tape x={-60} y={-10} r={-32} />
          <Tape x={cardW - 130} y={-14} r={30} />
          <Tape x={-62} y={cardH - 50} r={30} />
          <Tape x={cardW - 128} y={cardH - 46} r={-28} />
          {/* text */}
          <div style={{position: 'absolute', left: 70, right: 70, top: 80, fontFamily: TYPE, color: '#1d2421'}}>
            <div style={{fontSize: 66, letterSpacing: 2, textAlign: 'center'}}>OPERATOR RULES</div>
            <div style={{fontSize: 30, textAlign: 'center', marginTop: 4, color: '#4a524e'}}>READ BEFORE YOUR ROUND</div>
            <div style={{height: 3, background: '#1d2421', margin: '26px 0 34px', opacity: 0.7}} />
            {lines.map((l, i) => {
              const p = l.blur ? 1 : interpolate(t, [l.start, Math.max(l.start + 0.01, l.end)], [0, 1], clamp);
              const shown = l.blur ? l.text : l.text.slice(0, Math.round(l.text.length * p));
              const visible = l.blur ? 1 : p > 0 ? 1 : 0;
              const sp = l.scratchAt !== undefined ? interpolate(t, [l.scratchAt, l.scratchAt + 0.45], [0, 1], clamp) : 0;
              return (
                <div key={i} style={{position: 'relative', display: 'flex', gap: 18, fontSize: 44, lineHeight: 1.32, marginBottom: 26, opacity: visible * (l.blur ? 0.5 : 1), filter: l.blur ? 'blur(6px)' : undefined}}>
                  <span>{l.n}</span>
                  <span>
                    {shown}
                    {!l.blur && p > 0 && p < 1 && Math.floor(t * 4) % 2 === 0 ? '▌' : ''}
                  </span>
                  {i === 0 && rectP > 0 ? (
                    <svg style={{position: 'absolute', left: -22, top: -14, width: 'calc(100% + 44px)', height: 'calc(100% + 24px)', overflow: 'visible'}} viewBox="0 0 100 100" preserveAspectRatio="none">
                      <path d="M2 6 L98 2 L99 95 L1 97 Z" fill="none" stroke={C.yellow} strokeWidth={7} vectorEffect="non-scaling-stroke" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - rectP} style={{strokeWidth: 9}} />
                    </svg>
                  ) : null}
                  {sp > 0 ? (
                    <svg style={{position: 'absolute', left: -6, top: -6, width: 'calc(100% + 12px)', height: 'calc(100% + 12px)', overflow: 'visible', clipPath: `inset(-20% ${(1 - sp) * 100}% -20% -2%)`}} viewBox="0 0 100 40" preserveAspectRatio="none">
                      <polyline points="0,10 5,34 9,4 14,36 18,6 23,35 27,4 32,36 36,6 41,34 45,4 50,36 54,6 59,35 63,4 68,36 72,6 77,34 81,4 86,36 90,6 95,34 100,10" fill="none" stroke="#0d0f0e" strokeWidth={9} strokeLinejoin="round" />
                      <polyline points="0,24 4,6 8,34 13,8 17,36 22,6 26,32 31,8 35,36 40,5 44,33 49,7 53,36 58,6 62,33 67,8 71,36 76,6 80,33 85,8 89,35 94,6 100,26" fill="none" stroke="#0d0f0e" strokeWidth={8} strokeLinejoin="round" />
                    </svg>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* ---------------- Log book (overlay in image space of logbook_blank) ---------------- */
// The ruled page in logbook_blank is rotated about -4.2 deg (rows rise to the right, columns lean right going down),
// so every cell is placed on that grid and every string is rotated with it (CR-6: overlays follow the plate's own perspective).
const PW = 1350;
const PH = 2418;
const SLOPE = -0.0735; // dy/dx of the row lines
const ANGLE = (Math.atan(SLOPE) * 180) / Math.PI;
const ROW_B = [742, 810, 887, 965, 1041, 1119]; // row boundary y at plate x=300 (row 0 = header row)
const COL_L = [{x: 205, y: 750}, {x: 487, y: 740}, {x: 768, y: 715}, {x: 1045, y: 685}]; // column lines, plate px
const DXDY = 0.07; // columns lean right going down
const colX = (c: number, y: number) => {
  const l = COL_L[c];
  const r = COL_L[c + 1];
  return (l.x + DXDY * (y - l.y) + (r.x + DXDY * (y - r.y))) / 2;
};
const cellPos = (col: number, row: number) => {
  let x = colX(col, (ROW_B[row] + ROW_B[row + 1]) / 2);
  let y = 0;
  for (let k = 0; k < 3; k++) {
    y = (ROW_B[row] + ROW_B[row + 1]) / 2 + SLOPE * (x - 300);
    x = colX(col, y);
  }
  return {x: x / PW, y: y / PH};
};
export const LogEntries: React.FC<{writeAt: number; writeDur: number; stampAt: number}> = ({writeAt, writeDur, stampAt}) => {
  const t = useT();
  const cell = (txt: string, col: number, row: number, font: string, size: number, color: string, reveal = 1) => {
    const p = cellPos(col, row);
    return (
      <div style={{position: 'absolute', left: `${p.x * 100}%`, top: `${p.y * 100}%`, transform: `translate(-50%, -52%) rotate(${ANGLE}deg)`, fontFamily: font, fontSize: size, color, whiteSpace: 'nowrap', clipPath: `inset(-20% ${(1 - reveal) * 100}% -20% 0)`}}>
        {txt}
      </div>
    );
  };
  const p = (i: number) => interpolate(t, [writeAt + (writeDur / 3) * i, writeAt + (writeDur / 3) * (i + 1)], [0, 1], clamp);
  const sp = interpolate(t, [stampAt, stampAt + 0.12], [1.6, 1], clamp);
  const so = interpolate(t, [stampAt, stampAt + 0.06], [0, 1], clamp);
  const sPos = cellPos(2, 2);
  return (
    <>
      {['TIME', 'FROM', 'TO'].map((h, i) => cell(h, i, 0, TYPE, 44, '#3b3226'))}
      {/* the previous operator's last entry (her handwriting, faded) */}
      {cell('10:00 PM', 0, 1, HAND, 58, 'rgba(40,52,90,0.7)')}
      {cell('Bay 7', 1, 1, HAND, 58, 'rgba(40,52,90,0.7)')}
      {cell('Bay 12', 2, 1, HAND, 58, 'rgba(40,52,90,0.7)')}
      {/* tonight */}
      {cell('11:00 PM', 0, 2, HAND, 62, '#15130f', p(0))}
      {cell('Bay 12', 1, 2, HAND, 62, '#15130f', p(1))}
      {cell('Bay 31', 2, 2, HAND, 62, '#15130f', p(2))}
      {so > 0 ? (
        <div style={{position: 'absolute', left: `${(sPos.x + 0.13) * 100}%`, top: `${sPos.y * 100}%`, transform: `translate(-50%, -50%) scale(${sp}) rotate(-12deg)`, opacity: so, width: 100, height: 100, borderRadius: 99, border: '8px solid #2f8f4e', color: '#2f8f4e', fontFamily: HEAVY, fontWeight: 700, fontSize: 72, display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1}}>
          ✓
        </div>
      ) : null}
    </>
  );
};

/* ---------------- CCTV monitor wall ---------------- */
export type Feed = {src: string; x: number; y: number; z: number; cam: string; flip?: boolean};
export const MonitorWall: React.FC<{feeds: Feed[]; clock: string; focus?: number; focusAt?: number}> = ({feeds, clock, focus, focusAt = 99}) => {
  const t = useT();
  const frame = useCurrentFrame();
  const tw = 470;
  const th = 330;
  const gap = 26;
  const gx = (W - (tw * 2 + gap)) / 2;
  const gy = 470;
  const fp = focus !== undefined ? interpolate(t, [focusAt, focusAt + 0.9], [0, 1], {...clamp, easing: (x) => x * x * (3 - 2 * x)}) : 0;
  let cxp = W / 2;
  let cyp = H / 2;
  let sc = 1;
  if (focus !== undefined) {
    const col = focus % 2;
    const row = Math.floor(focus / 2);
    const cx = gx + col * (tw + gap) + tw / 2;
    const cy = gy + row * (th + gap) + th / 2;
    const target = Math.max(W / (tw - 20), H / (th - 20));
    sc = Math.pow(target, fp);
    cxp = W / 2 + (cx - W / 2) * fp;
    cyp = H / 2 + (cy - H / 2) * fp;
  }
  return (
    <AbsoluteFill style={{background: '#070b0a', overflow: 'hidden'}}>
      <div style={{position: 'absolute', inset: 0, transform: `translate(${W / 2}px, ${H / 2}px) scale(${sc}) translate(${-cxp}px, ${-cyp}px)`, transformOrigin: '0 0'}}>
        {feeds.map((f, i) => {
          const col = i % 2;
          const row = Math.floor(i / 2);
          const fl = 0.85 + random(`mw${i}-${Math.floor(frame / 3)}`) * 0.15;
          return (
            <div key={i} style={{position: 'absolute', left: gx + col * (tw + gap), top: gy + row * (th + gap), width: tw, height: th, borderRadius: 18, overflow: 'hidden', border: '10px solid #2a302d', boxShadow: '0 0 0 3px #111, inset 0 0 40px rgba(0,0,0,0.8)'}}>
              <Img src={staticFile(f.src)} style={{position: 'absolute', width: tw * f.z, left: tw / 2 - f.x * tw * f.z, top: th / 2 - f.y * tw * f.z * 1.792, transform: f.flip ? 'scaleX(-1)' : undefined, filter: `grayscale(0.6) sepia(0.35) hue-rotate(65deg) contrast(1.15) brightness(${0.85 * fl})`}} />
              <div style={{position: 'absolute', inset: 0, background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.25) 0px, rgba(0,0,0,0.25) 2px, rgba(0,0,0,0) 2px, rgba(0,0,0,0) 4px)'}} />
              <div style={{position: 'absolute', left: 14, top: 10, fontFamily: MONO, fontSize: 26, color: C.fluor, opacity: 1 - fp}}>{f.cam}</div>
              <div style={{position: 'absolute', right: 14, top: 14, width: 14, height: 14, borderRadius: 99, background: C.red, opacity: (Math.floor(frame / 12 + i) % 2 ? 1 : 0.2) * (1 - fp)}} />
              <div style={{position: 'absolute', right: 14, bottom: 10, fontFamily: MONO, fontSize: 22, color: C.fluor, opacity: 1 - fp}}>{clock}</div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

/* ---------------- Fork chips (image space) ---------------- */
export const ForkChip: React.FC<{n: string; label: string; x: number; y: number; tx: number; ty: number; at: number; yellow?: boolean}> = ({n, label, x, y, tx, ty, at, yellow}) => {
  const t = useT();
  const p = interpolate(t, [at, at + 0.18], [0, 1], clamp);
  const over = p < 1 ? 0.6 + p * 0.55 : 1 + Math.max(0, 0.08 - (t - at - 0.18) * 0.4);
  const lp = interpolate(t, [at + 0.12, at + 0.45], [0, 1], clamp);
  if (p <= 0) return null;
  return (
    <>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible'}}>
        <line x1={x * 100} y1={y * 100} x2={x * 100 + (tx - x) * 100 * lp} y2={y * 100 + (ty - y) * 100 * lp} stroke={yellow ? C.yellow : C.laminate} strokeWidth={5} vectorEffect="non-scaling-stroke" style={{strokeWidth: 5}} />
      </svg>
      {lp >= 1 ? <div style={{position: 'absolute', left: `${tx * 100}%`, top: `${ty * 100}%`, width: 26, height: 26, borderRadius: 99, background: yellow ? C.yellow : C.laminate, transform: 'translate(-50%,-50%)', boxShadow: '0 0 0 6px rgba(0,0,0,0.35)'}} /> : null}
      <div style={{position: 'absolute', left: `${x * 100}%`, top: `${y * 100}%`, transform: `translate(-50%, -50%) scale(${over})`, display: 'flex', alignItems: 'center', gap: 16, background: yellow ? C.yellow : C.laminate, color: C.ink, borderRadius: 999, padding: '14px 34px 14px 16px', boxShadow: '0 10px 30px rgba(0,0,0,0.6)', whiteSpace: 'nowrap'}}>
        <div style={{width: 62, height: 62, borderRadius: 99, background: C.ink, color: yellow ? C.yellow : C.laminate, fontFamily: HEAVY, fontWeight: 700, fontSize: 44, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{n}</div>
        <div style={{fontFamily: HEAVY, fontWeight: 700, fontSize: 60, letterSpacing: 2}}>{label}</div>
      </div>
    </>
  );
};
