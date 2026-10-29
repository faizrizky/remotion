# Video 02 - Scene Brief (already coded)

All scenes below are **already implemented** in `src/video02/chapters/*.tsx`. Antigravity does not need to build scenes from scratch: it only (1) drops in audio and props, (2) updates `src/video02/timing.json` from the real word timestamps, (3) checks stills, (4) renders.

Global rules (unchanged from Video 01): 24 fps, 1920x1080. Visible-bbox alignment <= 2 px, gaps >= 24 px, no pedestals, keep the bottom 140 px free for captions, every number shows a "Source:" line, SFX only pop / whoosh / kaching / card_tap. Leo appears only as a round reaction badge (head only), ~15% of runtime.

Style: one palette per shot, never the same palette twice in a row; slow camera push on every shot; every object pops in; transitions rotate between whip, diagonal wipe, ink reveal and zoom-through; chapter cards with a dip to black and progress dots.

Beat names in `[brackets]` are keys in `timing.json` (seconds from the start of that chapter's WAV).

## Cold open - `V2-00-Cold` (voice `v2_00_cold.wav` + 1.6 s brand sting)
| Shot | From -> to | Palette / transition | What happens |
|---|---|---|---|
| S1 | 0 -> [billions] | sunrise / - | Code phone with checkout, "Pay in 4" pulses at [tap] (card_tap). Four $30 circles pop at [p1]-[p4] (Today, 2/4/6 wks). Tag "0% interest. No fees." at [noInterest]. Sneakers box at [ship]. Sticker "You paid $30" at [thirty]. |
| S2 | [billions] -> [whoPays] | night + stars / whip | Coin stack + sticker "Companies worth BILLIONS" (kaching). |
| S3 | [whoPays] -> [stores] | indigo / wipe | Leo badge (suspicious) + bubble "So... who pays?". |
| S4 | [stores] -> [knowWhat] | mint / ink | Store -> dashed arrow -> lender (bank); three "%" coins fly. Pill "a cut of every sale"; at [button] pill 'just to show "Pay in 4"'. |
| S5 | [knowWhat] -> end | space / whip | Spotlight on a generic shopper. "It's you." at [itsYou]; sticky note "the ONE number: ???" at [oneNumber]. |
| Sting | after voice | - | Mustard circle burst + "Penny Logics" stroke logo (1.6 s, whoosh). |

## Part 1 - "The Free Lunch" - `V2-01-FreeLunch`
| Shot | Range | Palette / trans | Content |
|---|---|---|---|
| A | 0 -> [everywhere] | mint | $120 price tag -> arrow at [split] -> four $30 circles ([split], [every2wk]); "due today" at [dueToday]; pill "0% interest" at [noInterest]. |
| B | [everywhere] -> [survey47] | teal / ink | Fed building + stat card 16% at [fed16]. Source: Federal Reserve. |
| C | [survey47] -> [popular] | indigo / wipe | 100-dot grid fills 47 + stat card 47%. Source: LendingTree March 2026. |
| D | [popular] -> end | sunrise / whip | Pills Popular / Free / Smart? (1.2 s apart); sticky note "Hold that thought..." at [hold]. |

## Part 2 - "Who Really Pays" - `V2-02-WhoPays`
| Shot | Range | Palette / trans | Content |
|---|---|---|---|
| A | 0 -> [why] | indigo | Shopper -> store -> bank; arrow + % coins at [storePays] (kaching); pill "2-4% fee" at [cfpb]. Source: CFPB 2022. |
| B | [why] -> [klarna] | rose / whip | Store + bubble "Why pay a fee?". |
| C | [klarna] -> [readAgain] | space / ink | Three stat cards +20% / +40% / +46% at [s20] [s40] [s46]; pill "Klarna's own numbers. Results vary." at [vary]. |
| D | [readAgain] -> [cart] | sunrise / zoom | "+40% bigger orders"; crossed-out "a payment button" at [notButton]; tag "a BIGGER cart". |
| E | [cart] -> end | mint / whip | Full cart grows; arrow to shopper + "...is yours." at [yours]. |

## Part 3 - "The $30 Illusion" - `V2-03-Illusion`
| Shot | Range | Palette / trans | Content |
|---|---|---|---|
| A | 0 -> [lunch] | rose | $120 tag; "your brain sees" at [brain]; green $30 tag at [sees30]. |
| B | [lunch] -> [hoodie] | teal / wipe | Lunch prop + "$30 = lunch"; scale prop + "$120 = a decision" at [decision]. |
| C | [hoodie] -> [research] | mint / whip | Empty cart; hoodie + "+$30 / 2 wks"; cap at [cap]; headline "just another small payment" at [smallPay]. |
| D | [research] -> [survey68] | night / ink | Research paper + line chart drawing upward; tag "total spending goes UP" at [upNotMove]. Source: NBER WP 30508. |
| E | [survey68] -> [notTrap] | indigo / wipe | Dot grid 68 + stat card 68%; sticky "54% regretted a purchase" at [regret]. |
| F | [notTrap] -> end | space / whip | "The real trap?"; four payment circles stack into a tower at [stacking]. |

## Part 4 - "The Stack" - `V2-04-Stack`
| Shot | Range | Palette / trans | Content |
|---|---|---|---|
| A | 0 -> [cfpb] | night | One loan phone, then four more fan out at [openFive]. |
| B | [cfpb] -> [ownLoans] | teal / ink | CFPB building + stat 63% at [s63]; three people, one highlighted + "1 in 3: 2+ companies" at [oneInThree]. |
| C | [ownLoans] -> [fico] | space / whip | Three phones "each app sees only its own"; spotlight on shopper with the whole pile at [wholePile]. |
| D | [fico] -> [groceries] | indigo / wipe | Code credit report with "Pay in 4 (new)" row + name tag "FICO Score 10 BNPL / announced June 2025". |
| E | [groceries] -> [warning] | sunrise / ink | Grocery bag; iso blocks 29% "now" at [s29] and 14% "2 years earlier" at [s14]; pill "your food, in 4 payments" at [food]. |
| F | [warning] -> end | night / whip | Pulsing red warning triangle + "That's a warning light." |

## Part 5 - "When It Bites" - `V2-05-Bites`
| Shot | Range | Palette / trans | Content |
|---|---|---|---|
| A | 0 -> [lateFee] | teal | Checking $12.40 -> arrow at [autoPull] (card_tap) -> phone "Autopay $30" turns red "Payment failed" at [notThere]. |
| B | [lateFee] -> [klarna7] | sunrise / wipe | Pill "Late fee (lender)"; pill "Overdraft fee (bank)" at [overdraft]; tag "hit twice". |
| C | [klarna7] -> [aLot] | rose / ink | Fee cards "Klarna (US) up to $7", "Afterpay (US) up to $8, max 25% of the order" at [afterpay8]; pill "...on a $30 payment" at [small]. |
| D | [aLot] -> [notFree] | night / whip | Stat cards 47% [s47], 21% [fed21], 43% grocery users [grocery43]. |
| E | [notFree] -> [sameApp] | mint / wipe | Gauge sweeps to "up to 36%" APR at [apr36]. |
| F | [sameApp] -> end | indigo / whip | Two cards: "Pay in 4 0%" vs "Pay monthly up to ~36%". |

## Part 6 - "Use It Without Getting Used" - `V2-06-Rules`
| Shot | Range | Palette / trans | Content |
|---|---|---|---|
| A | 0 -> [rule1] | sunrise | Leo badge (thinking) + "Is it evil?"; "No. Use it on purpose." at [onPurpose]. |
| B | [rule1] -> end | mint / ink | Leo badge (proud) left; four numbered rule rows at [rule1]-[rule4]; disclaimer top-left. |

## Outro - `V2-07-Outro`
| Shot | Range | Palette / trans | Content |
|---|---|---|---|
| A | 0 -> [next] | space | "The ONE number"; receipt "Due in the next 6 weeks" lists 5 installments at [hereItIs]; total counts to $198 at [realBill] (kaching) + pill "your real bill"; tag "add it up today" at [addUp]; Leo suspicious at [system]. |
| B | [next] -> end | indigo / whip | Leo happy; pill with `NEXT_TOPIC` (edit in `Outro.tsx`); "Subscribe. See you there!" at [subscribe]. **x 1100-1790, y 230-930 stays empty for the YouTube end screen.** |

## Music (whole video only, `V2-Full`)
`public/v2/audio/music.mp3` loops at 0.07, dips to 0.015 around every chapter card, fades out in the last 3 s. Change `MUSIC_VOL` in `Video02.tsx` if it fights the voice.
