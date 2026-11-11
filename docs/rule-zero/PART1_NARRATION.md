# Rule Zero, Series 1 Part 1 "Space 31": narration take sheet

Source of truth for wording: `RULE_ZERO_SERIES_BIBLE.md` section 5 (188 spoken words). This file is only the recording copy for Voice Studio.

## Voice direction
- Calm, low, slightly conspiratorial. Never shout, never hype. About 120 words per minute (a little slower than natural).
- Different voice from Penny Logics (Andy is taken). Pick one clearly different: older or deeper, dry, American English.
- Short sentences stay short. Fragments ("Alone." "No driver.") are said flat, then a beat of silence.
- Pause marks: `/` = 0.3 s, `//` = 0.8 s (a rule just landed, let it sit), `///` = 1.5 s (card-only stretch, no voice).
- Dry joke ("First night. Great start.") is deadpan, no smile in the voice.

## Record as separate lines (one file per paragraph is fine, or one take with the pauses)
Paragraph A (hook, 0:00-0:07)
You just took the night shift at a parking garage. / Alone. / Eight screens. / One rule: watch Level three. ///

Paragraph B (0:10-0:43, rules)
Problem one. The only other person here is a guard who walks the lot by himself. /
Before she quit, the last operator taped a sheet to the monitor. /
Rule one: at the top of every hour, check Level three. One car will have moved. Log it. Don't touch it. //
You almost smile. Cars don't move. /
Rule two: never send security to Level three. //
Rule three? Scratched out. Pen pressed through the paper. ///

Paragraph C (0:43-1:05, the car)
Problem two. Eleven o'clock. You check Level three. /
A grey sedan. Bay thirty-one. /
You rewind. An hour ago, bay twelve. No brake lights. No driver. //
You log it. Rule one, followed. //
Then the headlights come on. Slowly. Aimed at the camera. //

Paragraph D (1:05-1:30, the threat and the fork)
On the other screen, Dale scans in at Level three. Rule two, broken. He doesn't know. Nobody told him. //
Past the open door, something tall is standing. //
Dale doesn't lift his flashlight. //
First night. Great start. //
You can warn him. Or you can watch what it does next. ///

Paragraph E (end card, 1:30-1:33)
Part 2 tomorrow. The majority writes Part 2.

## Delivery checklist
- Export WAV (mono or stereo, 44.1/48 kHz), one file per paragraph named `p1_A.wav` ... `p1_E.wav`, or one file `p1_full.wav`.
- Also export the sentence-level captions file if Voice Studio gives one (same as Penny Logics `captions_voicestudio.json`).
- Drop into `Assets/rule-zero/Series 1 - Level 3/Audio/Voice/`. Claude then builds word timing for the karaoke captions and checks the length (target 85-95 s total).
