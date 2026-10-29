# Video 02 - Asset List (props, voice, SFX, music, thumbnail)

Run `npm run v2:check` at any time: it lists every file that is still missing. Until a prop exists, the video renders a dashed "missing: <name>" box in its place (nothing crashes).

## 1. Already in the repo (reused from Video 01)
`public/`: bld_cfpb_transparent.png, bld_fed_g19_transparent.png, obj_bank_transparent.png, obj_coinstack_transparent.png, head_happy.png, head_proud.png, head_suspicious.png, head_thinking.png. Fonts in `public/fonts/` (Poppins + Caveat, SIL OFL).

Code-drawn (no image needed, numbers are always exact): phones and checkout screen, $ circles, price tags, dot grids, stat cards, gauge, credit report, warning sign, receipt, fee and plan cards, people icons, coins, arrows.

## 2. New props to make in Gemini (10) -> save as `public/v2/<name>.png`
Process (same as Video 01): generate on a plain white background, remove the background (transparent PNG), trim to the visible object, at least 1000 px on the long side, then copy the master to `Channel/Objects/` and to `remotion/public/v2/`.

Shared style line (paste at the start of every prompt):
> Flat 2D cartoon prop for an animated finance YouTube channel. Thick clean dark outline #191411, flat colors with one soft cel-shade tone, no gradients, no text, no letters, no numbers, no logos, no brand marks. Single object, centered, front 3/4 view, plain pure white background, generous empty margin. Palette: mustard #E8A520, coral #EA6E5C, navy #293253, teal #4FB7C0, cream #F2EDE9, gold #F5C842, mint #BDEBD3.

| File | Used in | Prompt (after the shared style line) |
|---|---|---|
| `v2/obj_sneakers_box.png` | Cold open | An open shoebox with a pair of chunky sneakers inside, coral sneakers with cream soles, mustard box with navy lid leaning on the side. |
| `v2/obj_store.png` | Cold open, Part 2 | A small friendly storefront building, teal awning with cream stripes, big shop window, navy door, mustard sign board left blank. |
| `v2/obj_cart_full.png` | Part 2 | A shopping cart overflowing with shopping bags and boxes (coral, mustard, teal), a hoodie sleeve hanging out, navy cart frame. |
| `v2/obj_cart_empty.png` | Part 3 | The same style shopping cart, navy frame, completely empty, slightly angled. |
| `v2/obj_hoodie.png` | Part 3 | A folded mustard hoodie with a small price tag string (tag blank), cream drawstrings. |
| `v2/obj_cap.png` | Part 3 | A coral baseball cap matching a hoodie, cream button on top, slight 3/4 angle. |
| `v2/obj_lunch.png` | Part 3 | A simple lunch: a sandwich and a paper cup of soda on a small tray, cream tray, coral cup. |
| `v2/obj_scale_decision.png` | Part 3 | A classic balance scale, gold metal, one pan heavier with a stack of gold coins, the other pan with a single small shopping bag. |
| `v2/obj_research_paper.png` | Part 3 | A stapled research paper with a small line chart drawing on the cover and a magnifying glass resting on it, cream paper, navy lines (no readable text). |
| `v2/obj_grocery_bag.png` | Part 4 | A brown paper grocery bag full of food: baguette, leafy greens, apples, a milk carton (blank label). |

Size check after making them (the code sets the height): cart 480-520 px tall, store 340-400 px, others 240-460 px. Keep the object filling its canvas (trim transparent edges), otherwise it will look smaller than planned.

## 3. Voice (8 files) -> `public/v2/audio/`
Same narrator voice, model and settings as Video 01. Export WAV 48 kHz, mono or stereo, one file per chapter, 0.2 s of silence at the start and end. Text = `01_script.md` exactly (do not read the [S#] markers or stage notes).
- v2_00_cold.wav - Cold open
- v2_01_free.wav - Chapter 1
- v2_02_who.wav - Chapter 2
- v2_03_illusion.wav - Chapter 3
- v2_04_stack.wav - Chapter 4
- v2_05_bites.wav - Chapter 5
- v2_06_rules.wav - Chapter 6
- v2_07_outro.wav - Outro (fill in the next-video line first, and set `NEXT_TOPIC` in `src/video02/chapters/Outro.tsx` to match)

## 4. SFX (4 files) -> `public/sfx/`
`pop.wav`, `whoosh.wav`, `kaching.wav`, `card_tap.wav` (copy the ones used in Video 01, same names). Volumes are fixed in code: pop 0.32, whoosh 0.3, kaching 0.5, card_tap 0.5.
Licence note: the Video 01 MyInstants clips include sounds taken from commercial products (an Apple Pay tap, a game coin). For a monetized channel, replacing those two with clips from a source that states a free commercial licence (for example Pixabay sound effects) is the safer choice. Keep the same file names and nothing in the code changes.
The SFX folder is git-ignored (the repo is public), so copy it on each computer.

## 5. Music -> `public/v2/audio/music.mp3`
FreeToUse "Monday Routine" (or another track you have a licence for). It is only played in `V2-Full`, at 0.07 with dips at chapter cards. Paste FreeToUse's exact credit line into the description. Audio files are git-ignored.

## 6. Thumbnail (make in Gemini, then add text yourself)
> Flat 2D cartoon YouTube thumbnail, 16:9, bold and simple. Left: a large smartphone showing a checkout screen with four big round coins in a row. Right edge: a young man with messy brown hair (#4A2E1A), skin #F7A770, mustard hoodie #E8A520, peeking in with a suspicious side-eye. Background: coral #EA6E5C to rose gradient, light rays. Thick dark outline #191411. No text, no logos, no brand names. Leave the top-left third empty for a big headline.
Then add in Canva/Figma: "$30" on each coin and the headline "NOT FREE" (white, heavy sans, black outline, red stamp look). Use your own Leo reference image in Gemini so the face matches.
