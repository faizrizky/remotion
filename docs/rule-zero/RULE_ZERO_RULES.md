# RULE ZERO - Master Rules (v1, provisional)

Single master rules doc for the Rule Zero channel (kept inside this channel's folder). Sections A-G come from decisions made on 11 Nov 2026 and from the reference teardown. Section H lists Penny Logics standing rules carried over until MattJr says otherwise. Add new rules here, do not create separate rule files.

Related docs in this folder: `RULE_ZERO_SERIES_BIBLE.md` (concept, Series 1, Part 1 script), `STORY_SERIES_REFERENCE_TEARDOWN.md` (reference analysis). Shared: `../shared/SCENE_PROMPT_LIBRARY.md`.

---

## A. Identity and market
1. Channel name: **Rule Zero**. Not finance. Genre: rules-horror, second person, serialized, fiction.
2. Audience: US. Language: English (narration, captions, titles, descriptions).
3. Everything is original. We reuse the machine (structure, pacing, visual system) of the references, never their story, characters, names, rule texts or catchphrases.
4. Handle claimed on YouTube, TikTok and Instagram must be identical (availability to be verified on a laptop).

## B. Format
5. One series = one closed location overnight = 8 parts. Locations change per series (Series 1: Harbor Street parking garage, "Level 3").
6. Part length 85-95 s, vertical 1080x1920, 24 fps. 20 s teasers may be cut from the body, never from the hook.
7. Every part follows the template: hook (0-7 s) -> series title card -> Problem 1 -> rule/card -> Problem 2 -> escalation -> dry joke -> fork -> "Part N+1 tomorrow".
8. Every part triggers exactly one posted rule, reveals one new fact about the building, drops the NERVE meter once, and ends on a fork.
9. Fork = one word, two verbs, both tempting, neither safe. The winning word opens the next part within the first 10 s.
10. End card always: "PART N+1 TOMORROW / The majority writes Part N+1." Do not promise "tomorrow" unless the part already exists.
11. YouTube long video = the 8 parts compiled (13-15 min) with a recap card at each seam and a new intro.

## C. Narration
12. Second person, present tense, no narrator opinions, no backstory.
13. Hook = irreversible situation + concrete detail + challenge line. Maximum 19-22 words in the first 7 s.
14. Pace: about 2.2 words/s on average (about 2.7 in the hook). Leave silent beats before rules, numbers and scares. Every card animation must finish before the next cut.
15. Short sentences, fragments under tension. Numbers read one by one.
16. Devices to reuse: "Problem one/two", pivot line, false relief then reversal, planted rule then triggered rule, rising meter, one deadpan line right before the fork.
17. Banned lines (too close to references): "never board", "What would you do?" as the only closer, "footsteps behind you", "no passengers".
18. Voice: calm, slightly conspiratorial, clear; distinct from the Penny Logics narrator.

## D. Visual system
19. Two scene families, alternating: (1) story shots = 2D inked illustration with cold fluorescent light and sodium-amber spill; (2) cards = flat designs, one idea per card.
20. Palette: night-ink #0C1311, fluorescent #D9F2E6, laminate #E8EEEA (cool grey-white, not cream), signal-yellow #FFD23F (accent), alarm-red #E5484D (broken rule), sodium-amber #F2A33A.
21. Type: heavy sans for captions and card headlines, typewriter mono for posted rule sheets, mono caps for HUD labels.
22. Lead: generic Operator (round head, dot eyes, headset with signal-yellow band, grey hoodie, blank badge). Threat: Car 31 (plain grey sedan, no driver ever seen) and The Driver, only as a reflection or silhouette, never face-on, no gore.
23. HUD (story shots only), top-left about 14% from the top: pills CLOCK / NERVE / LOG; yellow chip under it names the beat ("PROBLEM 1", "RULE 1"). Values change on beat, with rolling digits.
24. Captions: burned-in karaoke, sentence case, bold white, grey for not-yet-spoken words, about 73% of frame height, 2-4 words per chunk, no caption during cards. A separate .srt is always produced as well.
25. Transitions: hard cuts only. About 30-35 cuts per 90 s. Camera moves inside shots (pan, tilt, push), starting on a detail then revealing.
26. Annotation overlays: yellow ring, label tag with leader line, highlight box on a rule.
27. No text baked into Gemini images. All text is composed in Remotion.
28. Every story shot has an illustrated background; no empty or plain grounds.

## E. Audio
29. Continuous bed (ambience or music) under the voice; no dead silence longer than 0.25 s. Level may rise toward the fork.
30. Sound must be authentic recordings (no code-synthesized sounds). Candidate sounds are auditioned by MattJr before any download. The Rule Zero sting and SFX set are separate from Penny Logics.
31. Sting fades out at its end, never a hard cut. No audio fade-out at the end of Shorts/parts.

## F. Content boundaries
32. Fiction only, labelled as fiction in the description. No real people, real tragedies, or "true story" claims.
33. PG-13: suspense, not gore. No harm to children. Nothing that can be mistaken for a real emergency or copied as self-harm.
34. Keep each episode and series visibly original in story, voice and visuals (platform policy on repetitive/inauthentic content).

## G. QA checklist (every part)
- Hook within 7 s and under 22 words; title card present; one rule triggered; fork present with two verbs.
- Cut rhythm 2-3 s; each card finishes before the cut; no overlapping elements; captions and HUD readable on every shot.
- Karaoke timing matches the voice; HUD numbers consistent with the story clock.
- No baked text in images; text safe zone respected (keep readable text above y 1536 of 1920).
- Audio levels checked by ear; no abrupt cuts; sting fades.
- Files stored under `Final/` per the channel structure; assets under `Assets/rule-zero/`.

## H. Carried over from Penny Logics (confirm or drop)
- An animation must finish and be readable before the transition starts (hold the voice slightly if needed).
- No fading when an element changes shape or position; use motion (move, shrink, grow).
- Elements never overlap or cover each other; text always contrasts clearly with its background.
- Camera pans: few and not fast; pans in any direction must connect like one take; scene changes never feel rushed.
- Never reuse a background (world) from one series in another.
- Gemini images: gshinpact account, one single chat column, always attach a reference image.
- Used downloaded files are moved (not copied) to their destination folder.
- Deviations on purpose for Rule Zero: burned-in captions are required (rule 24) and parts run 85-95 s (rule 6).

## I. Art style lock (approved by MattJr 11 Nov 2026)
34. **Style = REF-B look**: lead is a blank white round-ball head with two small black dot eyes and one angled brow, very thin black stick arms and legs, loose baggy clothes, thick clean ink outline on characters, flat colour. Backgrounds are richly painted, detailed and textured with dramatic coloured light (cold fluorescent green-white vs sodium amber), characters sit in them without painterly shading.
35. Every Gemini image attaches the style reference frame (a REF-B frame, kept in `Assets/rule-zero/Brand/`) and, once approved, the Operator character sheet. One Gemini chat column, gshinpact account (g.shinpact7), via MattJr's Chrome.
36. Approved test: booth wide shot (Operator from behind at the monitor wall) matched the style. Known tweaks: limbs thinner than the test, monitor screens left blank/static so Remotion fills them, no baked text.
