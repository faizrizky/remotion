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

- `src/style/style_kit.tsx` - reusable components (palettes, pop-ins, transitions, diagrams, titles).
- `src/style/StyleKitDemo.tsx` - small demo composition that exercises the kit.
- `docs/video02_style_guide.md` - style rules and usage notes.
- `public/` - image props and fonts (narration audio, SFX and music are not tracked; keep them locally or in Drive).

## Conventions

- One scene = one palette; every object enters with `PopIn`; no static elements.
- Alignment within 2 px, gaps of at least 24 px, subtitles bottom-center, at most 2 lines.
- Run `npx remotion still src/index.ts <CompositionId> out.png --frame=N` to check a scene before a full render.
- Renders go to `out/` or `review/video/` (git-ignored).
