// Carry check (pure TS): every camera move must keep at least one element on screen from before to after,
// and every chapter entrance with `carry` must name an item that exists at the end of the previous chapter
// and at the start of this one. Run with: node scripts/video.mjs carry <videoDir>
import {At, Chapter, H, makeAt, poseAtPure, resolveCamPure, W} from './core';
import type {ChapterSpec, Item} from './spec';

const NOT_CARRY = new Set(['src', 'disclaimer', 'punch', 'embers', 'shadow']);

const inView = (x: number, y: number, k: {x: number; y: number; z?: number}) => {
  const z = k.z ?? 1;
  return Math.abs(x - k.x) <= W / 2 / z - 30 && Math.abs(y - k.y) <= H / 2 / z - 30;
};

export const flatItems = (items: Item[], px = 0, py = 0): (Item & {ax: number; ay: number})[] =>
  items.flatMap((it) => [{...it, ax: px, ay: py}, ...(it.kids ? flatItems(it.kids, px + (it.x ?? 0), py + (it.y ?? 0)) : [])]);

export const checkCarry = (spec: ChapterSpec, c: Chapter, fps: number): string[] => {
  const A = makeAt(c, fps);
  const end = A('end');
  const keys = resolveCamPure(spec.cam, A);
  const items = flatItems(spec.items).filter((i) => !NOT_CARRY.has(i.t));
  const problems: string[] = [];
  for (let i = 1; i < keys.length; i++) {
    const before = keys[i - 1], after = keys[i];
    const t0 = Math.max(A(spec.cam[i - 1][0] as At), after.at - 20);
    const t1 = after.at + 6;
    const ok = items.some((it) => {
      const a = A(it.at), o = A(it.out, end + 1);
      if (a > t0 || o < t1) return false;
      if (it.screen) return true;
      const p0 = poseAtPure(it, t0, A), p1 = poseAtPure(it, t1, A);
      return inView(p0.x + it.ax + 40, p0.y + it.ay + 40, before) && inView(p1.x + it.ax + 40, p1.y + it.ay + 40, after);
    });
    if (!ok) problems.push(`${c.id}: camera move to [${after.x},${after.y}] at ${(after.at / fps).toFixed(2)}s carries nothing (no item visible both before and after)`);
  }
  return problems;
};

export const checkHandoff = (prev: ChapterSpec, prevC: Chapter, cur: ChapterSpec, curC: Chapter, fps: number): string[] => {
  const id = cur.enter?.carry;
  if (!id) return cur.enter?.kind === 'none' ? [] : [`${curC.id}: entrance has no carry id (which object continues from ${prevC.id}?)`];
  const Ap = makeAt(prevC, fps), Ac = makeAt(curC, fps);
  const p = flatItems(prev.items).find((i) => i.id === id);
  const q = flatItems(cur.items).find((i) => i.id === id);
  const out: string[] = [];
  if (!p || Ap(p.out, Ap('end') + 1) < Ap('end')) out.push(`${curC.id}: carry "${id}" is not on screen at the end of ${prevC.id}`);
  if (!q || Ac(q.at) > 6) out.push(`${curC.id}: carry "${id}" must be there from the first frames of ${curC.id}`);
  return out;
};
