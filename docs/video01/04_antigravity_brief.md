# BRIEF — Video 01 "How Credit Card Companies Make Money Off You (Even If You Pay in Full)"
Channel: Penny Logics (animated finance, characters Leo and Mira). Tool: **Remotion** (React). You are the editor; a reviewer (Claude) will inspect your stills/video and write corrections to `REVIEW.md`. Read this whole file before writing code.

## 0. Deliverables (in this order — do NOT skip the stills stage)
1. **Stage A – storyboard stills.** For every beat in section 6, render ONE PNG at the beat's key moment into `review/stills/` (name `hook_01.png`, `t1_05.png`, ...). Also write `review/overlap_report.txt` (see section 5). **Stop and wait.** The reviewer approves or sends `REVIEW.md`.
2. **Stage B – videos** (only after stills approved): `review/video/Hook_v1.mp4` (1920x1080, 24 fps, 23.32 s, narration `Audio/Andy/Hook.wav` muxed) and `review/video/Trick1_v1.mp4` (58.83 s = 2.2 s title card + `Audio/Andy/Trick 1.wav` 56.63 s).
3. On every later round: read `REVIEW.md`, fix exactly what it says, re-render only the affected stills/video, bump version (`_v2`).

## 1. Style = "Kok Bisa"-type collage motion graphics (reference: https://www.youtube.com/watch?v=mfjRsAbs6Ms)
- Flat picture backgrounds (simple, not busy) + cut-out illustrated objects + a character, thick black outlines, TV-cartoon look.
- **Snappy, NOT slow motion.** Pop-ins 0.25–0.4 s (scale 0.8→1.05→1 spring). A new visual element at least every 1.5–2.5 s. Nothing fully static for >3 s (use breathing/bounce micro-motion).
- Transition between scenes: crossfade 0.4 s with ~3% zoom. The only other motion transition allowed is the triple-panel entry (section 6, Hook C02).
- Text style: Poppins Bold (Google Fonts). Banner = coral `#F47264` box, white text, 8 px ink border, wipe-in left→right. Pill = white or mustard `#F2B705`, 7 px ink border. Ink = `#14141E`. Money amounts are shown as **tags/pills with a small pointer tail** attached to the thing they belong to — never as loose floating bill images.
- Channel logo: `profile_pic.png`, 72 px circle, bottom-left (28,28 margin), always on.
- No real photos, no real brand logos. Sources are shown with building illustrations: `bld_nilson_transparent.png` (Nilson Report), `bld_stlouisfed_transparent.png` (St. Louis Fed) plus a pill "Source: …".
- Subtitles: sentence captions from `timing/captions_voicestudio.json` (use those exact strings), bottom band only, max 2 lines, white text on `rgba(20,20,30,.82)` rounded box, 42 px.

## 2. CAMERA RULES (important — previous attempt failed here)
- Camera = a transform on the *world layer only*. Text, banners, pills, captions, logo live in a separate fixed UI layer that never moves.
- Allowed: slow zoom-in (≤ 1.00→1.08 per scene), or **zoom toward ONE object then drift slowly sideways** (≤ 60 px total) *only while no explanatory text is changing*.
- While a banner/number/pill is on screen or being read: camera is still or zooms ≤ 2%. **No sideways pan while text is on screen.**
- Parallax: background moves at 0.35× of the object layer. Never reveal the edge of a background (keep scale ≥ 1.04 when panning; bg image is 1376×768, display it covered at 1920×1080).
- Safe area under zoom: keep important content inside x 130–1790, y 80–1000.

## 3. LAYOUT SYSTEM (previous attempt failed here too: things overlapped and floated)
Canvas 1920×1080. Bands:
| Band | y range | Contents |
|---|---|---|
| TOP | 60–210 | banners, big tags (INTERCHANGE, SWIPE FEE, "3 companies just got paid") — nothing else |
| CONTENT | 230–930 | characters, objects, stat cards |
| CAPTION | 945–1035 | subtitles only |
Rules:
1. **No unintended overlap.** A tag/banner may never cover an object, face, number or another tag. If it would, move the object or the tag. Overlap is allowed only for: a pointer tail touching its target, a cup in Leo's hand, a coin in a hand, a character in front of a background, and a building sticker clipped to a card's corner (≤ 20 % of the card).
2. **Everything stands on something.** Each scene has a ground line (floor/counter/sidewalk). Object bottom edge = ground line (±10 px) + contact shadow (ellipse, rgba(0,0,0,.22), blur 12). Objects may be off the ground only if (a) pinned to a wall with a pin/frame, (b) inside a tag, (c) in motion for ≤ 0.8 s (a flying coin/card).
3. **Scale table** (heights on 1920×1080; Leo standing = 800 px): coffee cup 300–360, card terminal 330 tall (≈420 wide), bank 400 wide, coin stack 180–220 tall, credit card 300 wide, single coin 90, hand 700 wide. Objects of the same kind keep the same size in all scenes.
4. Do not stack objects on the lamp/laptop of `bg_office`; use the empty stage backgrounds for explanation scenes.
5. Contrast: text pills must be readable; check at 50 % size.

## 4. ASSETS
Root on the PC: `E:\Faiz Projects\Channel\` (also uploaded to Google Drive). Copy what you need into the Remotion `public/` folder.
- Backgrounds (`Backgrounds/`): `bg_cafe` (counter top y≈703, floor starts y≈963, menu board x 935–1717 / y 145–586, espresso machine x 420–750), `bg_street` (sidewalk ground ≈ y 820), `bg_office`, `bg_bank`, `bg_cream.png`, `bg_mint.png`. NOTE: files named `.jpeg` are PNG data — rename to `.png`.
- **New (reviewer will deliver):** `bg_stage_indigo.png` (empty room: wall `#25305A`, panel `#2F3B6B`, baseboard `#F2EDE9`, floor `#D8A66B`, wall/floor line at 70 % height = y 756) and `bg_stage_cream.png`. Until they exist, draw the same thing in code with those hex values.
- Objects (`Objects/`, `*_transparent.png`): coffee, coinstack, bank, bill, card, terminal, coin_dollar, hands (suit/coral/mustard; pinch point at (69,211) of the 700 px wide image). Buildings (`Buildings/`): nilson, stlouisfed.
- **Leo rig** (in `leo_rig/`): `leo_body.png` + `head_<expr>.png` (happy, calm, shocked, thinking, suspicious, tired, proud), all 790×1539, same canvas; head pivot (395,385). Idle = breathing (scaleY ±0.8 %), head rotation ±1.6°, expression swap with small pop (0.93→1). Leo holds a cup in his right hand in the body image — do not add a second cup. Expression swaps follow the narration.
- `mira_neutral.png` is only 228×740 — too low-res, don't use it yet.
- Audio (voice "Andy", FINAL): `Audio/Andy/Hook.wav` (23.32 s), `Audio/Andy/Trick 1.wav` (56.63 s). Ignore `Audio/Josh/` (old voice, different timing). Timing: `timing/captions_voicestudio.json` (sentence level, authoritative) and `timing/word_timing_approx.json` (per word, ±0.2 s, text of words is noisy — use only the times).
- `reference_code/` = a previous attempt. Reuse the helper ideas (Pop, Banner, TriPanel, HandCoin, CamScene) if useful, but its layouts were rejected.

## 5. SELF-CHECK BEFORE SHOWING ANYTHING
Write a small script that, for each rendered still, lists the bounding boxes (x,y,w,h) of every text/UI element and every object, and prints any pair that overlaps (except the allowed cases in 3.1). Save as `review/overlap_report.txt` ("0 overlaps" or the list). Also check: nothing outside the safe area, every object has its shadow/ground, caption band empty of content, captions match the audio second.

## 6. STORYBOARD (times = seconds in the Andy audio file; for Trick 1 add +2.2 s in video time)
Times come from word-level analysis (±0.2 s; the words in `word_timing_approx.json` are noisy, the times are reliable). Anchor every visual to the spoken key word, not to a guessed second. If a beat feels off when you listen, trust the audio.
### HOOK (Andy/Hook.wav, 23.32 s) — 3 scenes
**C01 café, 0–8.6.** bg_cafe. Leo (happy) stands on the floor at left (feet y≈1040, height 800), cup in hand. Terminal sits ON the counter at right (bottom on y≈703).
- 1.1–2.2 "five-dollar coffee": tag "$5 coffee" with tail to the cup (between Leo and menu board, not over his face).
- 2.58–3.7 "tapped your card": card pops near Leo's hand, flies in an arc to the terminal (arrives ≈3.3), terminal squashes, ripple rings.
- 3.74–4.7 "got your points" (points at 4.17): pill "points ✓" in TOP band + green check beside the terminal.
- 4.93–6.6 "walked away feeling smart": 3 small coins rise from the terminal; Leo → proud at 5.3.
- Camera: slow zoom-in; zoom toward the terminal 2.4–3.8 and hold; drift only after 6.6 when no text.
**C02 three panels, 7.5–13.2.** Three vertical panels (640 px each) slide in from top, bottom, top, 0.6 s apart: panel 1 at 8.0 (coffee shop: cup), panel 2 at 9.0 (card network: terminal; word "machine" 9.3), panel 3 at 10.5 (bank). Panel backgrounds `#CDEBE6`, `#F9D5DA`, `#FBE7A8`, 8 px ink dividers. Each panel: number badge (1/2/3) top-left, white pill label ABOVE the object (y≈250), object in the middle (y 340–760), nothing under y 780 except a coin. Banner "3 companies just got paid" in TOP band at 11.2 (word "companies" 11.52). Hands (suit/coral/mustard) take a coin from each panel at 11.9, 12.3, 12.7 ("got paid") and leave to the right (clipped by the panel).
**C03 "they profit either way", 13.1–23.32.** bg_stage_indigo. Leo (suspicious) stands on the floor at left.
- 13.37–14.9 "here's the strange part": pill "Education only, not financial advice" in TOP band (13.5–16.5).
- 15.46–19.5 "card company makes money from you, whether you pay your bill on time or not": banner "They profit either way" in TOP band at 15.5. Two white boards pinned to the wall: "Pays on time" (card icon, "bank earns: swipe fees", green ✓ at 18.2) and "Pays late" (card icon, "bank earns: interest + fees", red ✗ at 18.7). Boards ≥ 40 px from each other and from Leo.
- 20.16–23.3 "opening up the machine" (opening 20.79, machine 21.38): boards pop out at 20.0, banner out; terminal stands on a low pedestal (drawn rounded box, same outline style) on the floor at centre-right; Leo → thinking at 20.5; pill "Inside the machine…" in TOP band; slow zoom toward the terminal then very slow drift. Hold the last 0.3 s.

### TRICK 1 (Andy/Trick 1.wav, 56.63 s; video = 2.2 s title + audio)
**C04 title card, video 0–2.6.** bg_cream. Paper label "TRICK 1" (coral) / "THE SWIPE" (ink) drops in with a bounce, tilted −3°; a card swipes across below it quickly. Narration starts at video 2.2.
**C05 follow the money, audio 0–16.2.** bg_street, ground line y≈820. Three stations standing on the sidewalk at x≈400 (coffee cup, 340 tall), x≈960 (terminal), x≈1520 (bank, 400 wide), each with a white pill label BELOW the object (y≈845), nothing else below.
- 0.19–1.6 "follow that $5": tag "$5.00" with tail attached to the cup.
- 2.61–3.3 "you tap": dashed arrow draws from cup to terminal; the "$5.00" tag travels along it.
- 3.41–5.2 "coffee shop doesn't receive $5": a ✗ stamps over the cup's tag; tag fades.
- 6.04–7.3 "receives a little less": smaller tag "less than $5" attaches to the cup.
- 8.29–9.9 "swipe fee" (swipe 9.05): coin pops out of the terminal; tag "SWIPE FEE" (mustard) in TOP band above the terminal.
- 10.17–12.9 "biggest piece … interchange" (interchange ≈12.1): SWIPE FEE tag leaves first; tag "INTERCHANGE" (coral) in TOP band (never two big tags at once).
- 13.66–16.2 "goes to the bank that issued your card" (bank 14.77): second arrow terminal→bank draws at 14.3, coin travels along it, bank bounces at 15.0 with ✓.
- Camera: slow zoom on the whole street; no pan while tags are up.
**C06 numbers, audio 16.7–46.3.** bg_stage_indigo, ground line y≈756. Objects stand on the floor with shadows.
- 16.77–20.9 "On a credit card … two to three percent of the purchase": credit card stands (leaning on a small stand) at left; white "2–3%" card pinned to the wall appears at 18.98 ("two"); pill "of the purchase" at 20.0.
- 21.29–24.9 "On a $5 coffee, that's 10 or 15 cents": previous items pop out at 21.2; cup stands on the floor at right (same size as elsewhere) with tag "$5" at 21.4; tag "10–15¢" at 23.43 ("ten").
- 25.32–26.3 "Tiny, right?": small pill only.
- 26.68–30.2 "multiply": three groups of coin stacks standing on the floor appear at 27.6 ("every card"), 28.29 ("every purchase"), 29.24 ("every day"), each with a pill in TOP band ("× every card", "× every purchase", "× every day"). Stacks stand on the floor, sized per table 3.3.
- 30.71–36.6 "$198 billion": stacks leave at 30.7; white stat card pinned to the wall at 31.0: label "U.S. merchants paid in card swipe fees (2025)", number counts up 0→$198B between 33.39 ("one hundred") and 35.1 ("dollars"). Nilson building sticker clipped to the card's top-right corner at 35.5 + pill "Source: Nilson Report" (TOP band).
- 36.93–42.4 "$66 billion": the $198B card slides left and shrinks at 36.9; second card at 37.3: "Banks collected in interchange (2025)", counts 0→$66B between 39.8 ("sixty") and 41.0 ("dollars"); St. Louis Fed building sticker at 41.4 + pill "Source: St. Louis Fed". Cards ≥ 60 px apart, inside the safe area.
- 43.16–46.2 "about 11% … non-interest income": sources fade at 43.0; banner "≈ 11% of banks' non-interest income" in TOP band at 43.5 (eleven 43.51).
**C07 who pays, audio 46.9–56.63.** bg_cafe (menu board visible), Leo (thinking) on the floor at left.
- 46.9–48.5 "who really pays for it?": pill "Who pays?" in TOP band.
- 49.27–51.9 "coffee shop builds that cost into its prices": small price tags with tails attached to the menu board lines tick up ("$5.00 → $5.10"), one by one at 49.9, 50.4, 51.0; readable; not covering the board title.
- 52.18–54.1 "even people paying with cash": a cash bill slides along the counter top (it lies ON the counter), tag "cash" at 53.6.
- 54.35–56.5 "quietly helping fund the system": coins pop from the bill and rise toward a tag "the system"; hold ≤ 0.3 s at the end.
