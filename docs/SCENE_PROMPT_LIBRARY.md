# Scene Prompt Library (reusable, parametric)

Source studied: ultra-skills.com "Claude Code Animation Prompts: The Full Set" (30 prompts, Nov 5 2026).
This is NOT a copy of their text. It is our own structured extraction: what each scene does, its beat structure, and which parts are variable slots. Their originals are 1080x1920 / 30 fps; ours are Remotion 4 at 24 fps (Shorts 1080x1920, long videos 1920x1080 Style 2), so every frame number below is expressed as a share of the clip (0.0 = start, 1.0 = end) and converted with `f = round(share * durationFrames)`.

---

## 1. What every one of those prompts has in common (the real "model")

A prompt only works well when it fixes ALL of these. Our reusable Scene Spec (section 2) is exactly this list.

1. **Stack**: library plus renderer, named explicitly. Only `useCurrentFrame`, `interpolate`, `spring`; no `Math.random` / `Date`; seeded PRNG (mulberry32) for any randomness, so every render is identical.
2. **Look**: one sentence of mood plus concrete objects.
3. **Palette**: named hex tokens by role (ground, ink, secondary ink, accent, shadow), nothing else.
4. **Beats**: numbered frame ranges; each beat = one thing happening, with its easing named (out-cubic, spring damping/stiffness, bezier).
5. **Camera**: ONE continuous move on one progress value (no velocity break between phases), plus a tiny drift on the last frames so the clip is never static.
6. **Text rules**: font, min size, safe zone (text above y 1536 on 1080x1920), every number must say what it measures, demo data is labelled as demo.
7. **Hard "never" list**: no flash, no strobe, no whole-frame hit unless budgeted, no fade where a motion would do.
8. **Output contract**: preview first, then render to a named file and report the command.
9. **Placeholders in [brackets]** for copy, numbers, labels. This is what makes a scene reusable.

Iteration trick from their guide: because beats are numbered, a change request is precise ("move the route start to beat 2, make the river wider").

---

## 2. Reusable Scene Spec (template to fill per scene)

```
SCENE_ID:        <PascalCase composition id>
FORMAT:          1080x1920 | 1920x1080, 24 fps, DURATION=<frames>
STACK:           Remotion 4 + <SVG/CSS | CSS 3D | @remotion/three R3F | roughjs | p5.brush | @remotion/paths | @remotion/noise>
DETERMINISM:     frame-driven only, mulberry32(seed=<n>)
LOOK:            <1-2 sentences, objects + mood>
PALETTE:         ground #.. | ink #.. | ink2 #.. | accent #.. | accent2 #.. | shadow #..
SLOTS:           [TITLE] [VALUE_START] [VALUE_END] [LABEL_1..n] [UNIT] [CALLOUT] [DEMO_TAG]
BEATS:           b1 0.00-0.10 <what> <easing>
                 b2 0.10-0.45 <what> <easing>
                 ...
                 hold 0.85-1.00 <live idle: drift/pulse>
CAMERA:          one move, start->end scale/angle, ease, + idle drift
TEXT RULES:      font, min px, safe zone, "every number names its unit"
SFX HOOKS:       pop (each appear) | whoosh (move/transition) | kaching (money landing)   <- only these three
NEVER:           flash, strobe, overlap of elements, fade on shape change, dark ground (Style 1)
OUTPUT:          preview -> render out/<id>.mp4
```

**Variation axes** (change one per round, keep the rest):
`copy` / `palette` / `timing scale (x0.8 .. x1.3)` / `camera move` / `seed` / `data values` / `format (9:16 <-> 16:9)` / `swap object (e.g. barber pole -> credit card)`.

**Reuse as code, not as prompts**: build each scene as a Remotion component with props = SLOTS + palette + seed + `speed`. Then variants are only prop sets (a JSON per use), and the registry below tells us which one a video used.

---

## 3. Catalog: 30 scenes as parametric patterns

Legend: **Fit** = how well it matches Penny Logics (finance, flat cartoon, bright/cheerful in Style 1, Gemini-illustrated backgrounds). `A` = use now (2D, drops straight into Remotion), `B` = adapt (needs restyle), `C` = needs WebGL / off-style, only if we really want it.

### A. 3D scenes (React Three Fiber, `--gl=angle`, 14 prompts)

| # | Scene | Core idea (parametric) | Slots | Fit |
|---|-------|------------------------|-------|-----|
| 1 | Map route | Clay-model city, glowing route ribbon draws along a path with 2 corners and a river crossing; camera tilts then pulls back to show whole district; origin pin pulses, destination pin drops with ring. | street name, destination, distance chip, route color | B (restyle clay -> flat illustrated map; keeps the "route draws itself" beat) |
| 2 | Teardown | Particle cloud assembles an object, then its layers separate vertically with spring stagger; leader lines draw to numbered labels. | object, 5 layer names | B (good for "what's inside your bill / loan": layers = fees) |
| 3 | Git city | Flat grid -> extrusion wave -> skyline at night, camera orbits. Heights from data. | metric name, dataset | C (dark) |
| 4 | Globe arcs | Globe, arcs from one origin land on 24 cities, counter rolls +1 per landing, camera pushes in. | origin, shop name, count | B (swap globe for flat world map for finance "money flows") |
| 5 | Hologram | Scan plane assembles a wireframe object in a light cone; lock-on brackets slam on two parts with tags. | object, 2 part labels | C |
| 6 | Deep time | Star torn into a black hole; odometer on a time-remap curve that brakes. | end number, unit | C (the *time-remap brake* trick is reusable for any counter) |
| 7 | Contour map | Flat map lifts into terrain; side tape/ruler scrolls and brakes on a milestone; flag drops. | unit, milestone | B (milestone-counter pattern) |
| 8 | Neon silhouette | Dusk window, silhouette at desk, flip clock goes 23:59 -> 00:00, one window turns off. | label | C (dark) |
| 9 | Laptop reveal | Lid opens, screen wakes, headline lands word by word, camera pushes into the screen until only the site fills the frame. | brand, 2 headline words, button, caption | A/B ("push into a screen" = our zoom-into-phone transition) |
| 10 | Isometric flow | Isometric board, objects pop in, van follows curved road painting the route, 3 pins land in order, last gets tick. | heading, 3 step labels | A/B (nice for "journey of your money/order") |
| 11 | Turntable | Product rotates constantly, 3 spec callouts draw out one by one, rim light sweeps once, wordmark sets. | product, 3 specs | B (credit card / phone as product) |
| 12 | Money stack | 10 bricks of cash drop faster and faster onto a pallet; counter steps on each landing; last one hits hardest + floor ring. | headline, total, caption | **A (finance-native, bright; do first)** |
| 13 | Receipt | Printer feeds a receipt line by line in steps, tear, lift, tilt toward camera with the total sharp. | store, items, prices that sum to total | **A (hidden fees / subscriptions)** |
| 14 | Iceberg | Camera sinks below waterline, light turns blue, huge mass below; labels pop as passed. | tip label, 3 layer labels | **A/B (hidden costs below the surface)** |

### B. Ink and paper (SVG/CSS, 7 prompts)

Our rule: **no paper / paper-cutout look** (keep the flat cartoon style). So these are used for their *motion structure*, restyled flat.

| # | Scene | Core idea | Slots | Fit |
|---|-------|-----------|-------|-----|
| 15 | Headline | Newspaper page sets itself: masthead stamps, headline words land, body fills line by line, marker sweeps the pull sentence, light band. | paper name, headline, 2 sentences, pull line | B (news-style hook) |
| 16 | Swiss grid | Grid draws; colored blocks slide on rails; big words cut between cells without tween; everything settles into a rigid stack. | 3 words | C (off-style) |
| 17 | Blueprint draw | One continuous line draws a house with a pen tip; thickens on close; windows light; dimension lines tick in; slow push. | width, height, pitch, title | B (house = mortgage/rent scenes) |
| 18 | Paper desk | Items land in "stop motion" (3-frame holds), then a smooth red marker circles the key point and scrawls words. | note title, axes, drop label, advice, slip text, marker words | B (**stop-motion hold -> smooth marker** is a strong emphasis device) |
| 19 | Ink doodle | Everything redrawn on twos with line boil; storm of crumpled sheets; one sheet slaps to camera showing a mistake crossed out. | sign lines, mistyped word | B |
| 20 | Ink wash | Layered mountains bleed in with masks; sun; slow parallax slide; birds; vertical title + seal. | title | C |
| 21 | Doodle collapse | Cartoon character does nothing while towers of calendar pages/cups stack on stuttering threes; then smooth physics collapse; single blink. | title, item labels | **A (burnout / bills piling up; fits flat cartoon)** |

### C. Data and counters (SVG/CSS, 3 prompts)

| # | Scene | Core idea | Slots | Fit |
|---|-------|-----------|-------|-----|
| 22 | Stat chart | Rolling-digit counter locked to a line's progress; line runs flat then kicks up through the plot top while axis rescales; end point pulses. | company, metric, start, end, event | **A (core finance scene)** |
| 23 | Agent swarm | One node splits into 20 dots on bezier paths to a grid, labels rise, tick green one by one, all return along curves and snap into a finished page. | 4 role names, page title, caption | A/B (money splitting into buckets, returning as one result) |
| 24 | Day counter | Desk calendar; ticks stamp days with accelerating rhythm (`frame = 2 + 34*((n-1)/28)^0.55`); big stamp on the last day; counter locks. | caps line, caption, N days | **A (30-day challenge / compounding)** |

### D. UI and type (CSS 3D, 6 prompts)

| # | Scene | Core idea | Slots | Fit |
|---|-------|-----------|-------|-----|
| 25 | Split-flap | Departure board; rows flip left to right through random glyphs then land on text; last row flips amber -> green with lamp. | 4 lines (<=13 chars), final line | A/B (bright board variant) |
| 26 | Before/after | Handle pulls back then flings across a browser window; same layout old -> new; hero object lands last. | 2 headline lines, old/new copy, address, disclaimer | **A (price/plan/fee comparison: old vs new)** |
| 27 | Lock-screen notifications | Order notifications rise and stack, pile pushed up each landing; pill with running total rolls; cards run off the top. | pill label, 9 amounts, shop name | **A (income notifications / subscriptions charging)** |
| 28 | Type slam | 3 words slam in; negative-flash + shake budget on 3 hits only; 3rd word fills frame; color rises through letters. | 3 words | B (only with flash budget; conflicts with our "no flash" unless disabled) |
| 29 | Particle word | 10k seeded points swirl, tighten, snap into a word, shimmer. | word | C |
| 30 | Terminal bloom | Typed command; letters scatter and become page "bones"; text tumbles in; page locks. | command, headline, buttons, cards | B (tech-style hook) |

---

## 4. Reusable motion primitives extracted (use these as components)

These are the actual reusable building blocks hiding inside the prompts. Each should become one Remotion component with props.

| Primitive | What it does | Parameters | Seen in |
|-----------|--------------|-----------|---------|
| `RollingCounter` | Per-digit roll, blur on fast digits, locked to a driver value (not to time), final pop + ring | from, to, driver curve, unit/prefix fixed, landing frame | 4, 6, 12, 22, 24, 27 |
| `AcceleratingStamps` | Events at `t_n = a + b*((n-1)/(N-1))^p`, slow start then blur | N, a, b, p | 12, 24, 27 |
| `LineDrawRescale` | Line draws near-flat, kicks up, axis ticks rescale while old part compresses | points, kick frame, headroom | 22 |
| `StepPrint` | Move in steps (advance 3 frames, hold 2) while a line prints each step | line height, step/hold | 13 |
| `OutAndReturnSwarm` | N dots leave on seeded bezier curves, arrive at a grid, tick, return along their own curve shrinking | N, grid, jitter, stagger | 23 |
| `StackShove` | New card lands, pile rises one slot + presses 6 px and rebounds | slot height, landing frames | 27 |
| `OnTwos/OnThrees` | `q = floor(f/k)*k` drives all poses; seeded boil variants swapped per held drawing | k, variants | 18, 19, 21 |
| `StopMotionToSmooth` | Switch from held steps to raw frame at one beat for emphasis | switch frame | 18, 21 |
| `HandleReveal` | Slider with pull-back, fling, rebound, pause, sweep; clip edge follows knob exactly | positions %, timings | 26 |
| `PenDrawPath` | Single path with dashoffset, pen tip nib, thickens on close | path, stroke, tip | 17 |
| `CameraOneMove` | One progress value drives scale + angle + position, bezier ease, then idle drift | from, to, bezier, drift | all |
| `LeaderLabel` | Hairline draws with pen head, label rises 8 px and settles | anchor, label, side | 2, 7, 11, 14 |
| `PinDrop` | Pin falls, squash on contact, ring, label plate | height, squash | 1, 10 |
| `FlipCell` | 2-half fold with hinge shading, random-glyph steps then final flip | glyph list, steps | 8, 25 |
| `TimeRemap` | Clock slope 3 -> 0.35 -> 1 so a counter visibly brakes | slopes, switch frames | 6, 7 |
| `WaterlineSink` | Camera crosses a meniscus line, palette shifts cool | line frame, tints | 14 |
| `BoilStroke` | Re-seed rough strokes every k frames so lines wobble in place | k, seeds | 19, 21 |

---

## 5. Conflicts with our Penny Logics rules (check before using)

- **Dark scenes** (3, 5, 6, 8, 29, 30...): Style 1 = bright/cheerful only; Style 2 may be dark if the reference does. Re-palette to bright.
- **No paper / paper-cutout look**: 15, 18, 19, 20 must be re-skinned flat cartoon.
- **No fading on shape change / position change**: use move/shrink/grow; their "fade out" beats need replacing.
- **Animation must finish and be readable before a transition starts**: their clips end with a live hold (drift/pulse). Keep that hold, and make sure our narration leaves a beat.
- **No flash / no whole-frame inversion**: prompt 28 relies on it. Skip unless budgeted.
- **Elements never overlap or cover each other**; Penny Logics logo watermark bottom-left on every video; text must contrast clearly.
- **Every scene gets an illustrated background** (Gemini, gshinpact account, one chat column), never a plain ground. So their flat gradient stages become our illustrated backdrops; keep their safe zone logic (text above y 1536 on 9:16).
- **SFX**: only pop, whoosh, kaching. Map: each appearing object -> pop; fling/slide/stack-shove -> whoosh; money landing / total locking -> kaching.
- **Shorts 15-20 s**, no audio fade-out at the end, opening must not start mid-pop or mid-transition.

---

## 6. Suggested first build order (finance-native, 2D, brightest fit)

1. `RollingCounter` + `LineDrawRescale` (scene 22) - used in almost every finance explainer.
2. `AcceleratingStamps` + calendar (scene 24) - 30-day / compounding.
3. Money stack (12) - kaching beat, very on-niche.
4. Receipt (13) - hidden fees, subscriptions.
5. Before/after slider (26) - plan/fee comparison.
6. Lock-screen notifications (27) - income / charges piling up.
7. Iceberg (14) - hidden costs.
8. Doodle collapse (21) - bills pile up, "nothing reacts then crash".

Each as: `src/scenes/<Id>.tsx` (component), `src/scenes/<Id>.props.json` (slot variants), plus one row in the video registry (which video used which scene + which variant).

---

## 7. Master prompt skeleton (paste into Claude Code / Antigravity, fill brackets)

```
Create a Remotion 4 composition "<SceneId>" (TypeScript, <W>x<H>, 24 fps, <N> frames) inside the existing Penny Logics project.
Use only useCurrentFrame, interpolate, spring. Seeded mulberry32(<seed>); never Math.random/Date.

LOOK: <objects + mood, flat cartoon, bright>. Illustrated background: <bg asset path>.
PALETTE: ground <#>, ink <#>, ink2 <#>, accent <#>, shadow <#>.
SLOTS: title="[...]", labels=["[...]"], value from [..] to [..] unit "[..]", demo tag "[...]".

BEATS (share of clip -> frames):
 1) 0.00-0.10 <event> <easing>
 2) ...
 hold) last 15%: live idle (drift 1%, pulse), nothing static.

CAMERA: one continuous move <from> -> <to> on bezier(<..>), no velocity break, then 1% drift.
TEXT: <font>, min <px>, keep all text above y <safe>, every number names what it measures.
SFX hooks: pop on each appearing object, whoosh on slides, kaching on money landing.
NEVER: flash, strobe, fading on shape change, overlapping elements, text blending into background.
Preview first, then render out/<scene>.mp4 and report the command.
```
