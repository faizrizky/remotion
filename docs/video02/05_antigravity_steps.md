# Video 02 - Steps for Antigravity (assemble, check, render)

The scenes are already coded. Do not redesign them; only follow these steps. Do not poll or loop; run each command once and report.

## 0. Setup (once per computer)
```console
git pull
npm install
```
Needs Node 20.19+ and ffmpeg/ffprobe on PATH.

## 1. Put the files in place
- Voice: `public/v2/audio/v2_00_cold.wav` ... `v2_07_outro.wav` (names in `04_assets_props_audio.md`).
- SFX: `public/sfx/pop.wav`, `whoosh.wav`, `kaching.wav`, `card_tap.wav`.
- Music: `public/v2/audio/music.mp3`.
- New props: `public/v2/obj_*.png` (10 files).
Then run `npm run v2:check`. Section 3 must show no missing files.

## 2. Lock the timing to the real voice
1. Section 2 of `npm run v2:check` prints each WAV length. Put that number into `audioDur` for each chapter in `src/video02/timing.json`.
2. Get word timestamps for each WAV (same tool as Video 01 captions, e.g. Whisper word-level timestamps).
3. For every beat in `timing.json`, set the value to the start time (seconds, from the start of that WAV) of the word written in the table below. Beats must stay in increasing order.
4. Run `npm run v2:check` again until it says "All good."

| Chapter | Beat -> first word of |
|---|---|
| cold | p1 "Four", p2 "payments", p3 "of", p4 "thirty", noInterest "No interest", tap "tap", ship "ship", thirty "thirty bucks", billions "billions", whoPays "who is", stores "stores", button "Pay in 4", knowWhat "By the end", itsYou "it's you", oneNumber "one number" |
| ch1 | split "split", every2wk "two weeks", dueToday "due today", noInterest "no interest", everywhere "everywhere", fed16 "sixteen", survey47 "In a March", popular "popular", hold "Hold" |
| ch2 | storePays "the store pays", cfpb "The Consumer", why "Why would", klarna "Klarna tells", s20 "twenty", s40 "forty percent bigger", s46 "forty-six", vary "Those are", readAgain "read that again", notButton "isn't paying", cart "And the bigger cart", yours "is yours" |
| ch3 | brain "your brain", sees30 "It sees thirty", lunch "Thirty feels", decision "A hundred and twenty feels", hoodie "hoodie", cap "cap", smallPay "another small", research "Harvard", upNotMove "goes up", survey68 "sixty-eight", regret "regretted", notTrap "But overspending", stacking "stacking" |
| ch4 | openFive "Now open five", cfpb "The CFPB", s63 "sixty-three", oneInThree "one in three", ownLoans "Each app", wholePile "whole pile", fico "That's starting", groceries "not just sneakers", s29 "Twenty-nine", s14 "fourteen", food "When you're splitting", warning "warning light" |
| ch5 | autoPull "Most plans", notThere "If the money", lateFee "a late fee", overdraft "overdraft", klarna7 "Klarna's late fee", afterpay8 "Afterpay's", small "Sounds small", aLot "it happens a lot", s47 "Forty-seven", fed21 "The Federal Reserve", grocery43 "groceries, forty-three", notFree "Not every plan", apr36 "thirty-six", sameApp "Same app" |
| ch6 | onPurpose "Used on purpose", rule1 "Rule one", rule2 "Rule two", rule3 "Rule three", rule4 "Rule four" |
| outro | hereItIs "Here it is", sum "every installment", realBill "That's your real bill", addUp "Go add it up", system "the system", next "Next time", subscribe "Subscribe" |

## 3. Check frames before the full render
```console
npm run v2:stills
```
Writes 3 stills per chapter to `out/qa/`. For a specific moment: `node scripts/v2-stills.mjs V2-03-Illusion 12.5 30`.
Check: nothing overlaps, no "missing:" boxes, every number has a "Source:" line, text is inside the frame, outro right side (x 1100-1790, y 230-930) is empty.
If a prop looks too big or too small, change only its `h` (or `w`) value in that chapter file.

## 4. Render
```console
npm run v2:render
```
Output: `out/Video02.mp4`. Individual chapters: `npx remotion render src/index.ts V2-03-Illusion out/V2-03.mp4`.

## 5. Loudness (-14 LUFS, true peak <= -1 dBTP), two-pass
```console
ffmpeg -i out/Video02.mp4 -af loudnorm=I=-14:TP=-1:LRA=11:print_format=json -f null -
```
Copy measured_I, measured_TP, measured_LRA, measured_thresh, target_offset into:
```console
ffmpeg -i out/Video02.mp4 -c:v copy -af loudnorm=I=-14:TP=-1:LRA=11:measured_I=X:measured_TP=X:measured_LRA=X:measured_thresh=X:offset=X:linear=true -ar 48000 out/Video02_final.mp4
```

## 6. Captions and chapters
- `npm run v2:check` section 4 prints each chapter's start time (use for the YouTube chapters) and the voice offset in seconds.
- Build `out/v2_captions.srt` from the word timestamps: add each chapter's voice offset to its words, max 2 lines, max ~42 characters per line, 1-6 s per caption.

## 7. Back up
Copy `out/Video02_final.mp4`, `out/v2_captions.srt` and the thumbnail to Drive (Channel / Video 02 / Final). Renders are not committed to git.
