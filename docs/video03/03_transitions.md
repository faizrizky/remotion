# Video 03 - Transition plan
Written 1 Nov 2026, before any code. Follows rules 1.18 (few, slow pans; left/right only for long scenes; pans connect like one take), 1.19 (nothing rushed: each content at least ~3.5 s) and 1.21 (new worlds only).

## The toolbox (what the Video 02 kit already has)
| Transition | What it is | Use in Video 03 |
|---|---|---|
| **carry** | One-camera pan to the next world with an OBJECT carried across (coin or a PNG prop; optional handoff so it vanishes exactly where the same object is already drawn). | Only at chapter boundaries (6 of them). Never mid-chapter. |
| **swap** | The background stays; only the content changes (pop out / pop in). | The default INSIDE a chapter, for every shot under 6 s. Camera stays still. |
| **ink** | Ink-splat reveal. | At most 2 times in the whole video, for a mood change ("here's the honest part"). |
| **wipe** | Diagonal wipe. | At most 2 times, for a clean switch between two parallel things (France vs South Korea). |
| **drift** | Slow camera glide inside one scene. | Only scenes of 6 s or more, max 15 px per second. |
| **Penny sting** | Circle burst, logo, dive into the "o". | Once, right after the cold open. Fixed. |
Not used: whip, zoom-through, spin or any fast move (rejected earlier as dizzying).

## Chapter boundaries (the 7 joins), with the carried object
Directions alternate (right, left, right, left, right, left) so the camera does not only travel one way. The kit supports left/right only; up/down would need new code and is not needed here.
| # | Join | Pan | Carried object | Why it connects |
|---|---|---|---|---|
| 0 | Cold open -> sting | burst | none | Standard (Penny sting). Last shot holds, no exit animation, then the circle bursts. |
| 1 | Sting -> Ch1 (pantry) | dive | none | Standard (dive into the "o" and the pantry appears inside it). |
| 2 | Ch1 -> Ch2 (freezer aisle) | right | the **price tag** "$4" | Ch1 ends on "same price, less product"; the tag follows to the tub, where Ch2 starts on "you check prices, not weights". |
| 3 | Ch2 -> Ch3 (household aisle) | left | the **net-weight number** on a box (handoff: vanishes into the same number drawn on the first pack) | Ch2 ends on "the only thing that changes is one small number"; Ch3 opens on a wall of packs with that number. |
| 4 | Ch3 -> Ch4 (research library) | right | the **paper towel pack** (handoff to the one on the report table) | Ch3 ends with household goods; Ch4's biggest number is about paper towels. |
| 5 | Ch4 -> Ch5 (hypermarket) | left | the **cereal box** (handoff: it is already on the shelf wearing the French sticker) | Ch4 ends on "it hits what people buy most" (cereal); Ch5 opens on supermarket shelves. |
| 6 | Ch5 -> Ch6 (shelf edge + checkout) | right | the **shelf sticker / unit-price strip** (handoff to the big tag) | Ch5 ends "you're on your own... almost"; Ch6 opens on the unit price tag. |
| 7 | Ch6 -> Outro (apartment) | left | the **shopping basket** (handoff into Leo's hand) | Leo carries the habits home; the outro challenge is "check one thing you buy every week". |

## Inside each chapter (swap by default, nothing under ~3.5 s)
- **Cold open (about 30 s):** 4 shots, all swap on the grocery aisle. No drift, no pan.
- **Ch1 (36 s):** swap between the cereal box (same box, less inside), the two chocolate bars (full vs gappy), and the "option one / option two" split. One drift on the longest hold.
- **Ch2 (42 s):** swap; the 4x bar chart builds on screen. One **ink** reveal on "the bug in your brain" (mood change).
- **Ch3 (45 s):** the rapid size list is the risky part (5 pairs in about 20 s). One pair per shot of about 4 s, all swap, each pair sized with the `shrink` sound; no pan or wipe here. Skimpflation tray closes the chapter.
- **Ch4 (51 s):** swap between the GAO bars; the honest twist ("but zoom in on your cart") uses the second **ink** reveal. One drift on the longest hold.
- **Ch5 (34 s):** France then South Korea with one **wipe**; the "NOT PASSED" stamp (stamp.wav) is a swap. No pan.
- **Ch6 (48 s):** swap; three habits one per shot (about 5 s each). One **wipe** into the habits list is optional.
- **Outro (28 s):** swap; Leo, the challenge text, subscribe pill. End screen area (x 1100-1790, y 230-930) stays empty.

## Budget check against the rules
- Pans: 6 in about 5:15, all at chapter boundaries, never in the middle of a chapter. In Video 02 there were 13 carries; this video has fewer than half.
- Ink 2, wipe 2: the rest are swaps.
- The shortest planned content is about 3.5 s; the Ch3 size list runs at about 4 s per pair.
- After the voice is aligned, I will list every shot with its length and flag any under 3.5 s before rendering, and check stills at every join.
