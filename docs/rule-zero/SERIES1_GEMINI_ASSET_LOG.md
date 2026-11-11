# Rule Zero, Series 1 "Level 3": Gemini asset log (updated 12 Nov 2026)

Account: g.shinpact7 (via MattJr's Chrome). Style reference frame attached on first turn of every new chat. Full-size originals are 1536x2752 (9:16) PNG, downloaded into the Mac folder below. Gemini chats still hold the sources.

## Files on the Mac: `Assets/rule-zero/Series 1 - Level 3/`
| File | What | Source chat |
|---|---|---|
| Characters/operator_sheet_nomic.png | Operator character sheet, no mic (approved) | Character Reference Sheet Generation (/u/1/app/4609fb757346fcb9) |
| Props/car31_lights_off.png | Car 31, headlights off, plain background (clean, regenerated) | Sedan Prop Illustration Request (/u/1/app/6bb461d5f203d40b) |
| Props/car31_lights_on.png | Car 31, headlights on amber | same chat |
| Backgrounds/booth_clean.png | Control booth, blank monitors, empty (7 monitors) | Night Shift Security Booth Illustration (/u/1/app/faeebf1bd8370ca4) |
| Backgrounds/level3_wide_car.png | Level 3 wide with Car 31 | Empty Parking Garage Art Generation (/u/1/app/1793c6f169328d5f) |
| Backgrounds/level3_wide_empty.png | Level 3 wide, NO car (animation plate) | same chat |
| Backgrounds/stairwell_door.png | Stairwell fire door, amber light | same chat |
| Scenes/approach_shot2_mid_car31.png | Camera 8 m toward the car, same bay | Cinematic Parking Garage Continuation (/u/1/app/d7a99237ad9bca17) |
| Scenes/approach_shot3_driver_window.png | 1.5 m from driver window, empty seat | same chat |
| Scenes/operator_garage_facing_car31.png | Operator, from behind, facing Car 31 in Level 3 | same chat |
| Scenes/operator_booth_seated.png | Operator seated from behind, booth | Security Booth Operator Scene Creation (/u/1/app/d548f745f3a3172c) MASTER booth chat |
| Scenes/operator_booth_suspicious_v2.jpeg | Operator leaning, suspicious (JPEG) | same chat |
| Scenes/operator_booth_startled_v2.png | Operator standing, startled, front | same chat |
| Scenes/operator_booth_shocked_closeup.png | NEW 12 Nov, Part 1 shot 17: Operator medium close-up, shocked (O mouth, sweat drop, hand raised), blank large monitor behind for the Driver reflection added in Remotion; booth identical; no text | Security Booth Operator Scene Creation (MASTER booth chat) |
| Scenes/driver_stairwell_glass_dale.png | NEW 12 Nov, Part 1 shot 16: Dale (blank white head, cap, flashlight, plain grey jacket) from behind at the CLOSED stairwell door; The Driver visible only in the wired-glass window, black silhouette, two amber dots. | Empty Parking Garage Art Generation (same chat as the stairwell plate) |
| Scenes/driver_stairwell_open_door_dale.png | NEW 12 Nov, Part 1 shot 16 alternate (tall Driver): door leaf opened inward, normal single fire door with wired-glass window and push bar on the leaf; Driver full height on the stairwell landing, amber dots; Dale from behind with flashlight; no text. Revised from a first version whose door was malformed and whose jacket had the baked text "SECURITY" (not used) | same chat, attached the bad version + stairwell plate |
| Brand/style_reference_refb.jpg | Style reference frame attached to every Gemini chat | - |
| _contact_sheet.jpg, _contact_cars.jpg | Contact sheets for quick review | - |

Deleted 12 Nov: Props/_REJECTED_car31_duffel_contaminated.png and temp check images. Not downloaded (rejected or superseded): driver seat v1/v2, Operator startled v1, Operator suspicious v1, rule sheet on bezel (draw as Remotion RuleSheetCard).
Downloads cleaned 12 Nov: all Gemini originals that have a copy here were deleted from ~/Downloads (one unrelated jpeg, an old unused Level 3 car render, remains). Every new asset: copy to Assets, verify by md5, then delete the Downloads copy.

## Lessons
- Mobil terlihat melayang kalau kamera terlalu dekat dan lantai/ban/bayangan tidak masuk frame. Selalu minta: ban menyentuh lantai, cast shadow, pilar atau plafon di background.
- Follow-up turns in an existing chat sometimes vanish silently. A reload shows whether it landed.
- Satu lokasi = satu chat Gemini. Semua pose karakter di lokasi itu dibuat sebagai lanjutan di chat yang sama, dan prompt mengulang "exactly identical to the first image". Chat baru membuat environment berubah.
- Prompt yang hanya melampirkan character sheet tanpa scene macet. Selalu beri scene/lokasi.
- Gemini menebalkan karakter di scene detail; ekspresi tetap terbaca.
- Style reference bisa "bocor" ke gambar prop. Untuk prop standalone tulis "no bed, no bags, no money, no clothing, no text".
- Pintu yang dibuat Gemini bisa tidak masuk akal (daun dan kusen ganda). Lampirkan plate pintu asli dan tulis geometrinya: satu daun, engsel di sisi tertentu, terbuka sekian derajat, jendela dan push bar menempel di daun (12 Nov).
- Gemini suka menambah teks di pakaian (jaket "SECURITY"). Tulis eksplisit "jacket plain, no letters" sejak prompt pertama.
- Karakter baru (The Driver, Dale) dibuat langsung di scene lokasi dengan plate lokasi + style ref terlampir (12 Nov): render sekali jalan, tidak hang.
- DOWNLOAD: hover gambar, klik "Download full size image". File masuk ~/Downloads di Mac setelah 30-40 s (PNG 1536x2752 ~7 MB). Verifikasi isi sebelum diberi nama; jangan chain klik.

## Prompt skeleton that works
"Generate one image in exactly the same art style as the attached reference frame: richly painted, textured background with dramatic coloured light, thick clean ink outlines, flat colour. Scene: <scene>. No text, no letters, no numbers, no logos, no watermark. Vertical 9:16."

## Still to make (Part 1, new ending)
- Dale standalone sheet (optional; Dale already exists in driver_stairwell_glass_dale)
- Operator in-scene fork frame: radio in hand + monitor (shot 19)
- Optional: Operator lit by headlights, booth with 8 monitors

## Continuity rule
Never generate a close-up of a prop as a standalone image. Build every shot as the next step of a camera move from the previous approved image; restate that the object stays in the same place with the same landmarks. Sequence for Part 1: wide (level3_wide_car) -> mid (shot 2) -> driver window (shot 3).
