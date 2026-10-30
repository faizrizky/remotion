# Penny Logics - Remotion

Animated finance videos (1920x1080, 24 fps) built with Remotion.

## Setup (macOS or Windows)

Requirements: Node 20.19+ / 22.13+ / 24+, ffmpeg on PATH.

```console
git clone https://github.com/faizrizky/remotion.git
cd remotion
npm install
npm run dev        # Remotion Studio
npm run typecheck  # must pass before every commit
```

## Layout

- `src/style/style_kit.tsx` - reusable components (palettes, pop-ins, transitions, diagrams, titles). Fonts load from `public/fonts` (no internet needed).
- `src/video02/` - Video 02 (BNPL): `timing.json` (all timings), `v2kit.tsx` (helpers), `chapters/` (one file per chapter), `Video02.tsx` (compositions + music).
- `docs/video02/` - script, publish pack, scene brief, asset list, and the step-by-step guide for assembling and rendering.
- `scripts/video.mjs` - one tool for every video: `node scripts/video.mjs check|carry|srt <dir>` and `stills <prefix> [seconds]` (`npm run v2:check` = check video02).
- `src/kit/` - reusable kit (one camera World, specs, transitions, charts, annotations). See `docs/PENNY_LOGICS_RULES.md`.
- `public/` - image props and fonts. Narration, SFX and music are not tracked (keep them locally or in Drive).

## Video 02 quick start

1. Read `docs/video02/05_antigravity_steps.md`.
2. Add voice, SFX, music and props, then `npm run v2:check` until it says "All good."
3. `npm run v2:stills`, check `out/qa/`, then `npm run v2:render`.

## Conventions

- One scene = one palette; every object enters with `PopIn`; no static elements.
- Alignment within 2 px, gaps of at least 24 px, subtitles bottom-center, at most 2 lines.
- Run `npx remotion still src/index.ts <CompositionId> out.png --frame=N` to check a scene before a full render.
- Renders go to `out/` or `review/video/` (git-ignored).
