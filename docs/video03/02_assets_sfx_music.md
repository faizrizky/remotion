# Video 03 - Requirements: voice, backgrounds, props, SFX, music, thumbnail
Topic: shrinkflation ("Same Price, Less Stuff"). Script: `01_script.md` (8 files, ~5:15). Written 1 Nov 2026. **No video code has been written yet**; this is the shopping list.

Rules that apply (from `PENNY_LOGICS_RULES.md`): bright backgrounds, every scene has an illustrated background, no title cards, Penny sting after the cold open, few and slow pans (rule 1.18), no rushed scene changes (1.19), Shorts from the body (1.20), no burned-in subtitles in the long video but always an .srt.

**Brand rule for this video (important):** the narration names real brands as reported by NPR (Cottonelle, Kleenex, Gatorade, Folgers, Domino's, Toblerone). The pictures must be GENERIC products: no logos, no brand colours or packaging that copies the real one, no text on packaging. Each brand-named shot gets an on-screen caption "Reported by NPR, 2022" (or the right source). The description carries "Penny Logics is not affiliated with any brand mentioned."

## 1. Voice (8 files) -> `Assets/Voice/Video 3/` (copy to `public/v3/audio/`)
Same narrator, model and settings as Video 01 and 02. WAV 48 kHz, one file per chapter, 0.2 s silence at start and end. Text = `01_script.md` exactly. Do NOT read the [S#] markers or the italic stage notes. Pause 0.3 s before every number.
- `v3_00_cold.wav` (cold open, ends before the sting)
- `v3_01_hike.wav`, `v3_02_brain.wav`, `v3_03_hides.wav`, `v3_04_matter.wav`, `v3_05_fight.wav`, `v3_06_number.wav`
- `v3_07_outro.wav` (subscribe + "See you next time"; no next-topic teaser)
Reading notes: Chapter 3 is a rapid list of sizes ("three hundred forty... to three hundred twelve"), give each pair a small beat so the picture can change. Chapter 4 has the honest twist ("For the economy it's tiny... but zoom in on your cart"), a slight lift on "but".
After you generate them, send me the transcript with timestamps like for Video 2 (or just the WAVs; I can align them) and I will retime every shot to the real voice.

## 2. Backgrounds (worlds): 4 new + 4 reused
Wide panoramas like the Video 02 worlds (about 3,400-3,800 x 1080 px; if Gemini only gives 21:9 pieces, make two and I blend them). Use the usual style paragraph (flat cartoon, outline #191411, bright pastel, no people, no text, empty lower 25%, edges fade to cream) and attach `public/v1/bg_cafe.jpg` as the style reference.
| Scene | World | Status | What it shows (add to the prompt) |
|---|---|---|---|
| Cold open | `world_grocery.jpg` | NEW | A supermarket snack and cereal aisle: tall shelves full of plain colourful boxes and bags (no labels, no text), wide polished floor, bright ceiling lights. |
| Ch1 Invisible price hike | `world_kitchen.jpg` | reuse (V2) | home pantry/kitchen |
| Ch2 Why your brain misses it | `world_freezer.jpg` | NEW | A supermarket frozen-food aisle: glass freezer doors on both sides with plain tubs and boxes (no labels), cool mint-white light, clean floor. |
| Ch3 Where it hides | `world_household.jpg` | NEW | A supermarket household aisle: shelves of toilet paper packs, tissue boxes, coffee cans and bottles as plain colourful shapes (no labels), bright and tidy. |
| Ch4 Does it really matter? | `world_desk.jpg` | reuse (V2) | analyst desk (GAO report) |
| Ch5 Some countries fight back | `world_mall.jpg` | reuse (V2) | large supermarket/mall interior |
| Ch6 The number that catches it | `world_checkout.jpg` | NEW | A supermarket shelf edge with a row of empty shelf-tag strips along the front and a checkout lane in the distance; calm, large clean surface in the middle for tag close-ups. |
| Outro | `world_living.jpg` | reuse (V2) | living room, Leo with phone |

## 3. Props to make in Gemini (16 new) -> `public/v3/<name>.png`
Process as before: Gemini **Images** option, model **Argon High**, ALWAYS attach a reference image (use `public/v2/obj_cart_full.png` as the style reference), generate on a plain white background, remove background (transparent PNG), trim, at least 1000 px on the long side. Copy masters to `Channel/Objects/`.
Shared style line (paste at the start of every prompt):
> Flat 2D cartoon prop for an animated finance YouTube channel. Thick clean dark outline #191411, flat colors with one soft cel-shade tone, no gradients, NO text, NO letters, NO numbers, NO logos, NO brand marks, no real-product packaging. Single object, plain white background.

| File | Used in | Prompt (after the shared style line) |
|---|---|---|
| `v3/obj_cereal_box.png` | Cold open, Ch1, Ch4, Ch6 | A generic cereal box standing upright, front view, coral and cream design with a simple bowl-and-spoon picture, blank label panel. |
| `v3/obj_cereal_box_open.png` | Cold open | The same cereal box opened at the top, flaps up, showing the inside only half full of cereal puffs (cut-away view). |
| `v3/obj_choc_peaks_full.png` | Ch1 | A generic chocolate bar shaped like a row of seven closely packed triangular peaks, brown with a plain gold wrapper strip (no mountain logo, no text). |
| `v3/obj_choc_peaks_gappy.png` | Ch1 | The same triangular-peaks chocolate bar but only five peaks with wide empty gaps between them, same wrapper strip. |
| `v3/obj_icecream_tub.png` | Ch2 | A round ice-cream tub with a pastel pink lid and a simple scoop picture, blank label band. |
| `v3/obj_brain_bug.png` | Ch2 | A friendly cartoon brain in coral, with a tiny green bug sitting on top and one gear showing through a crack. |
| `v3/obj_toilet_paper_pack.png` | Ch3 | A large plastic-wrapped pack of toilet paper rolls (6 visible), pale blue wrap, no print. |
| `v3/obj_tissue_box.png` | Ch3 | A rectangular tissue box with a white tissue sticking out, mint box with a simple leaf pattern. |
| `v3/obj_sports_bottle.png` | Ch3 | A plastic sports drink bottle with a sport cap, orange liquid, blank wrap label. |
| `v3/obj_coffee_can.png` | Ch3 | A coffee canister with a red lid and a plain tan body with a coffee-bean picture, blank label. |
| `v3/obj_wings_box.png` | Ch3 | An open takeaway box with chicken wings, cream box with a simple chicken picture, blank. |
| `v3/obj_breakfast_tray.png` | Ch3 (skimpflation) | A small hotel breakfast tray: one tiny croissant and a small coffee cup, a lot of empty tray space. |
| `v3/obj_paper_towels.png` | Ch4 | A pack of two paper towel rolls in clear wrap, one roll slightly out, plain cream. |
| `v3/obj_snack_bag.png` | Ch4 | A chips bag, mustard yellow, crinkled top, simple potato-chip picture, blank. |
| `v3/obj_gov_building.png` | Ch4, Ch5 | A generic government building with columns and a small dome, cream stone, flag-less, no seal. |
| `v3/obj_basket.png` | Ch6, Outro | A red supermarket hand basket with two handles, containing a loaf of bread and an apple. |

Size check after making them (the code sets the height): boxes and bottles 240-460 px tall, packs 300-420 px, building 400-460 px, basket 300 px.
**Optional characters** (same size as `char_shopper_*`, 560x1400, only if you want more acting; otherwise I reuse the V2 shoppers): `v3/char_shopper_compare.png` (a shopper holding one box in each hand, frowning at both), `v3/char_stocker.png` (a supermarket worker in a mustard apron stocking a shelf, mischievous smile).
Leo heads already available: calm, happy, proud, shocked, suspicious, thinking, tired. Enough for this video: shocked (cold open + Ch1 reveal), thinking (Ch2), suspicious (Ch3), proud (Ch6), happy (outro).

## 4. Drawn by code (no image needed, numbers are always exact)
Price tags and shelf tags, unit-price strip ("$0.41/oz"), phone with calculator, the "net weight" number on the front of boxes, bar comparison "price vs size = 4x" (Chapter 2), bars for the GAO numbers (34.5%, under 0.1 point, 3.0 and 1.6 points, 1.1% of items = 8.6% of sales), flags of France and South Korea (simple stripe/disc shapes), "this product shrank" shelf sticker, fine banner "up to EUR 15,000", US map pill "9 states + DC", stamp "NOT PASSED", stat cards, Disclaimer ("Education only. Not financial advice."), source captions for every number, brand-not-affiliated line.

## 5. Sound effects
Existing (keep, same volumes): pop 0.32, whoosh 0.3, kaching 0.5, card_tap 0.5, ding 0.4, boom 0.45, notify 0.4.
**New, 3 files** -> `public/sfx/` (WAV, normalised to -18 LUFS like the others). Source them from a clip site that states a free COMMERCIAL licence (Pixabay Sound Effects, Freesound with CC0 only). Do not use MyInstants clips (they can include commercial recordings).
| File | Where | What it sounds like |
|---|---|---|
| `shrink.wav` | Packages shrinking (Ch1 Toblerone-style bar, Ch2 tub, Ch3 size list: about 10 times) | A short cartoon "deflate/squeeze" sound, pitched down, 0.4-0.6 s |
| `scan_beep.wav` | Ch6 unit-price tags, the "number that catches it" reveal | A single supermarket barcode scanner beep, 0.2 s |
| `stamp.wav` | Ch5 "NOT PASSED" stamp and the France/Korea fine banners | A soft rubber stamp thud, 0.3 s |
Cue plan: pop on every object that appears; whoosh on each carried-object pan; shrink on every size change; ding on the key numbers (4x, 0.1, 3.0, 8.6%); boom once at "shrinkflation" (cold open reveal); kaching only if a price is mentioned going up; scan_beep in Ch6; stamp in Ch5; notify for the challenge in the outro.
Licence reminder from Video 02: `card_tap` and `kaching` come from MyInstants and may contain commercial recordings. Replace them with commercially safe versions before monetization. Not needed for this video unless card_tap is used (it is not).

## 6. Music
Same as before: "Monday Routine" (FreeToUse), flat 0.08, intro `funky_intro_sting.mp3` at 0.7 over the Penny sting, 3 s fade at the end. Put the exact FreeToUse credit line in the description.

## 7. Thumbnail (3 variants for Test & Compare)
Generate in Gemini with a Leo reference, then add text. 1280x720 PNG under 2 MB, 3-4 words max, bright background, nothing in the bottom-right corner.
- A: two identical cereal boxes side by side, the right one cut open and half empty; Leo `head_shocked` on the left. Text: "SAME PRICE. LESS."
- B: a price tag "$4" over a box that is clearly smaller than its shelf slot (empty space around it); text "WHERE DID IT GO?"
- C: a giant ruler measuring a chocolate bar with wide gaps; text "THEY SHRANK IT".
Titles (A/B test): "Same Price, Less Stuff: The Price Trick You Never See" / "They Didn't Raise the Price. They Did Something Worse." / "Why Your Snacks Keep Getting Smaller".

## 8. Checklist before I start the video code
1. 8 voice WAVs (+ transcript with timestamps, optional).
2. 4 new worlds + 16 props (chat them to me as files or place them in `Assets/`).
3. 3 new SFX.
4. [S8] check: confirm on Congress.gov that no federal shrinkflation law passed since Oct 2026.
Until then the video builds with dashed "missing: name" placeholders and nothing crashes (same behaviour as Video 02).
