# Penny Logics: registry komponen reusable

Tujuan: tinggal comot gaya/animasi yang mau dipakai per video, dan tidak ada elemen yang bertabrakan.
Dokumen ini ditulis tangan; daftar pemakaian per video di bagian 2 diambil dari impor di kode (per 2026-10-29).

## 1. Dua kit
| Kit | Lokasi | Dipakai oleh |
|---|---|---|
| **Penny kit** (Video 01 versi lama, diganti rebuild V2 per 2026-10-30) | `src/Penny/kit.tsx`, `constants.ts`, `layoutMetadata.ts`, `checkOverlaps.ts` (repo Remotion lama, backup di `_old_remotion_backup`; Trick 2-4 ada di PC) | Hook, Trick 1 (dan Trick 2-4 di PC) |
| **Style kit + V2 kit** (Video 02+) | `src/style/style_kit.tsx`, `src/video02/{v2kit,paper,fx,title}.tsx` | Video 02, dan seterusnya |

Video 03 dst: pakai Style kit + V2 kit (salin pola `src/video02/`: `timing.json`, `ChapterShell`, `chapters/*`).

## 2. Pemakaian per video
### Video 01 (Penny kit, versi lama)
| Scene | Komponen yang dipakai |
|---|---|
| Hook C01 Cafe | BgImage, CamScene, Layer, Leo, Pic x2, Pop x2, Pill, TagWithTail, Check, Coin, Shadow x2 |
| Hook C02 ThreePanels | CamScene, Banner, TriPanel, HandCoin, Coin, Pic, Pop x4, Pill, Shadow |
| Hook C03 ProfitEitherWay | BgStageIndigo, CamScene, Layer, Leo, Banner, Pic x2, Pop x5, Pill x3, Check, Cross, Shadow x2 |
| Hook / Trick1 (induk) | Caption, Logo |
| Trick1 C04 TitleCard | BgStageCream, CamScene, Layer, Pic |
| Trick1 C05 FollowMoney | BgImage, CamScene, Layer, Pic x3, Pop x6, Pill x3, Tag x3, TagWithTail x3, Coin x2, FlowArrow x2, Check, Cross, Shadow x3 |
| Trick1 C06 Numbers | BgStageIndigo, CamScene, Layer, Banner, CountNum x2, Pic x7, Pop x15, Pill x7, TagWithTail x2, Shadow x5 |
| Trick1 C07 WhoPays | BgImage, CamScene, Layer, Leo, MenuBoard, Pic, Pop x5, Pill, Tag, TagWithTail x4, Coin, Shadow x2 |
Gaya Video 01: panggung/kafe, Leo besar (800 px), Pop = pop-in cepat, captions bawah. Trick 2-4: isi dari PC (belum tercatat di sini).

### Video 01 (V2 rebuild, 2026-10-30: Style kit + V2 kit)
Kode: `src/video01/` (timing.json, captions.json, v1kit.tsx, Video01.tsx, chapters/{Hook,T1,T2,T3,T4,Customers,Meaning,Outro}). Komposisi: `V1-Full` dan `V1-00-Hook` ... `V1-07-Outro`. Tempo 0.62 (PopSpeed), Watermark otomatis, musik "Aventure - Monday Routine" (freetouse.com, volume 0.07, ducking di kartu judul, fade-out 3 dtk), SFX hanya pop/whoosh/kaching/card_tap. Kartu judul: "TRICK n" (tanpa label untuk Customers dan Meaning).
Komponen baru khusus Video 01 (`src/video01/v1kit.tsx`, bisa dipakai ulang): ChapterShell1, LeoFull (badan + ganti kepala), Fly, Ripple, Shadow, Tag, Win, Bar, CountMoney.
| Komponen | Dipakai di (chapter) |
|---|---|
| Prop | Customers, Hook, Meaning, Outro, T1, T2, T3, T4 |
| Shadow | Customers, Hook, Outro, T1, T2 |
| Tag | Customers, Hook, T1, T2 |
| Chip | Customers, Hook, Meaning, Outro, T1, T2, T3, T4 |
| Pill | Customers, Hook, Outro, T4 |
| Punch | Customers, Hook, Outro, T1, T2, T4 |
| Person | Customers |
| SlideIn | Hook |
| Bg | Hook, Outro, T1, T2 |
| LeoFull | Hook, Outro, T1, T2 |
| Fly | Hook, Outro, T1 |
| Ripple | Hook, Outro, T1 |
| Win | Hook |
| PaperCard | Hook, T4 |
| Bubble | Hook, Meaning, T1, T3 |
| LeoBadge | Meaning, T1, T3 |
| MascotCorner | Meaning |
| Disclaimer | Meaning, Outro |
| PayCircle | Outro |
| StatCard | T1, T2, T3, T4 |
| Src | T1, T2, T3, T4 |
| PriceTag | T1 |
| PercentGrid | T1, T4 |
| CoinFly | T1, T2, T3, T4 |
| DashArrow | T1, T2, T3, T4 |
| Bar | T2 |
| CountMoney | T2 |
| Embers | T2 |
| Sticker | T2, T3, T4 |
| HighlightSwipe | T4 |
Shot, Scene, PopIn, Sfx: semua chapter. TitleCard, PaperTexture, ExitOut, Watermark, PopSpeed: otomatis dari ChapterShell1/Shot.
Cek: `node scripts/v1-check.mjs`, `node scripts/v1-stills.mjs <comp> <detik...>`, `node scripts/v1-srt.mjs` (subtitle .srt, tidak dibakar ke video).
Audio, musik, SFX tidak ada di git (`.gitignore`); salin ke `public/v1/audio`, `public/music`, `public/sfx`.

### Video 02 (Style kit + V2 kit)
| Komponen | Dipakai di |
|---|---|
| Shot, Scene, PopIn, Sfx | semua bab |
| Bg (latar ilustrasi siang) | Cold, Ch1, Ch2, Ch5 |
| Char (karakter Leo/Mira-style) | Cold, Ch1, Ch2, Ch4 |
| LeoBadge | Cold, Ch6, Outro |
| MascotCorner | Cold, Ch1-Ch5 |
| Chip (time/warn/label) | Cold, Ch2-Ch5 |
| Pill, KeyTag, StickyNote | Pill: semua; KeyTag: Cold, Ch1-3, Ch5, Outro; StickyNote: Cold, Ch1, Ch3 |
| Punch (judul tangan) | Cold, Ch2, Ch3, Ch4, Ch6, Outro |
| WordPop | Ch6 |
| StatCard, Src | Ch1-Ch5 |
| PayCircle, PriceTag, PercentGrid | Ch1, Ch3, Ch4 (PercentGrid: Ch1, Ch3) |
| RulerTimeline | Ch1 |
| BeforeAfter | Ch1 |
| CoinFly, DashArrow | Cold, Ch1, Ch2, Ch5 |
| CoinWipe (transisi uang) | Ch2 |
| CircleBurstWipe, StrokeLogo (sting merek) | Cold |
| LensZoom | Ch5 |
| BranchFork | Ch5 |
| CutawayPan | Ch3 |
| HighlightSwipe | Ch2, Ch3 |
| Embers | Cold, Ch1, Ch3, Ch4, Ch5 |
| Gauge, DrawCurve, IsoBlock, NameTag, Person, Phone, CheckoutScreen | Ch5, Ch3, Ch4, Ch4, Ch4, Cold/Ch4/Ch5, Cold |
| Sunburst, Bubble, Sticker | Ch2, Cold/Ch2, Cold |
| TitleCard (kartu judul bab) | ChapterShell (otomatis tiap bab) |
| PaperTexture, ExitOut | Shot (otomatis di semua scene) |
| PopSpeed (tempo 0.62) | ChapterShell (otomatis) |
Belum terpakai: Quadrant, Scale, OrbitCards, CrowdRow, Letterbox, LayerCake, PullBackReveal, MedalGrid, PipMeter, ParallaxLayer, PaperCard.

## 3. Katalog singkat: mau efek apa, pakai apa
| Mau... | Pakai | Catatan |
|---|---|---|
| Objek muncul | `PopIn at=` | spring lembut (tempo global) |
| Judul besar tulisan tangan | `Punch` (INK default) | taruh di y 60-230, jangan di area objek |
| Teks muncul kata per kata | `WordPop` | gap 5-6 frame; kata terakhir highlight |
| Judul bab | `TitleCard` (otomatis di ChapterShell) | font Fredoka, bar menyapu kanan ke kiri |
| Label berwarna | `Chip kind=time/warn/label` | kuning=waktu/angka, merah=peringatan, krem=label |
| Jadwal/timeline | `RulerTimeline` | tiang dan label sejajar objek di atasnya |
| Ganti nilai (sebelum/sesudah) | `BeforeAfter swapAt=` | crossfade + shake |
| Zoom ke detail | `LensZoom` | lingkaran; jangan menutup objek lain |
| Cabang skenario | `BranchFork` | + dua kartu hasil |
| Kamera mengikuti tumpukan | `CutawayPan dy=` | bungkus objek yang tumbuh |
| Sorot frasa | `HighlightSwipe` | taruh di BELAKANG teks (z-order lebih rendah) |
| Transisi uang | `CoinWipe` | di awal scene baru |
| Suasana hidup | `Embers`, `MascotCorner` | jangan menutupi teks/objek utama |
| Karakter cerita | `Char` + `Bg` | Bg siang cerah saja |
| Hasil riset/angka | `StatCard`, `PercentGrid`, `Gauge`, `Src` | `Src` wajib kalau ada angka |

## 4a. Watermark logo (WAJIB di setiap video)
- Logo Penny Logics (`public/profile_pic.png`, koin bermahkota) muncul sebagai lingkaran 72 px di **kiri bawah**, margin 28 px dari tepi, border INK 4 px, di lapisan paling atas selama seluruh video (termasuk kartu judul).
- Video 01: komponen `Logo` di `src/Penny/kit.tsx` (dipanggil di Hook.tsx / Trick*.tsx). Video 02 dst: komponen `Watermark` di `src/video02/v2kit.tsx`, sudah otomatis di `ChapterShell`. Video baru wajib memanggilnya juga.
- Zona 28-100 px dari kiri dan 28-100 px dari bawah (kira-kira x 28-100, y 980-1052) SELALU kosong: jangan taruh karakter, chip, Src, subtitle, atau MascotCorner di sana. Beri jarak minimal 40 px.
- `Src` (sumber data) di kiri bawah harus digeser ke kanan logo (sudah diterapkan: Src mulai di x = 124) atau dipindah ke bawah-tengah.

## 4. Aturan anti-tabrakan (WAJIB sebelum render)
Contoh yang salah: "...is yours." menimpa keranjang yang membesar; "Hold that thought..." menutupi wajah karakter.
1. **Zona layar 1920x1080** (dari Video 01): judul/banner di y 60-210; konten utama y 230-930; area aman x 130-1790. Elemen tidak boleh melewati batas ini kecuali karakter berdiri di lantai (maks y 1050).
2. **Hitung ukuran akhir, bukan awal.** Objek yang membesar (GrowingCart, scale, ExitOut) dihitung dengan skala maksimum dan titik tumpunya. Contoh: tinggi 520, origin bawah, scale 1.15 naik 78 px ke atas.
3. **Jarak minimal 40 px** antar elemen berbeda; teks tidak boleh menimpa objek ilustrasi.
4. **Karakter punya "kotak wajah".** Tempel/chip/StickyNote tidak boleh menutupi kepala (sepertiga atas karakter). Letakkan di sisi karakter, bukan di atasnya.
5. **Urutan lapisan (bawah ke atas):** Bg -> objek besar -> karakter -> panah/garis -> StatCard/Chip/StickyNote -> Punch/WordPop -> Src. HighlightSwipe selalu tepat di bawah teks yang disorot.
6. **Satu pusat perhatian per beat.** Maks 3 elemen informasi baru per beat (angka, chip, ikon).
7. **Elemen dekoratif** (Embers, MascotCorner) tidak boleh menyentuh area teks; MascotCorner hanya di pojok bawah (x < 300 atau x > 1500, y > 700) dan tidak boleh masuk zona logo (bagian 4a).
8. **Latar cerah + teks kontras** (lihat aturan di `video02_style_fusion.md`).
9. **Cek**: render still di tiap beat (`node scripts/v2-stills.mjs <comp> <detik...>`) dan lihat dengan zoom; Video 01 punya `checkOverlaps.ts` berbasis `layoutMetadata.ts` (bounding box per elemen).
10. **Rencana:** porting `checkOverlaps` ke Video 02: tiap Shot mendaftarkan bounding box elemennya, dan script `v2:overlap` memberi error untuk tabrakan yang tidak diizinkan.

## 5. Cara menambah video baru
1. Salin pola `src/video02/` (timing.json, ChapterShell, chapters/).
2. Pilih gaya dari tabel bagian 3; catat komponen yang dipakai di bagian 2 dokumen ini.
3. Jalankan checklist anti-tabrakan (bagian 4) pada still tiap beat.
