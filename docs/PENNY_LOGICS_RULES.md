# Penny Logics: KETENTUAN PEMBUATAN VIDEO (dokumen induk)

Dokumen ini adalah SATU-SATUNYA tempat aturan produksi. Berlaku untuk SETIAP video (Video 01, 02, 03, dst.).
- Setiap ketentuan, catatan gaya, atau keputusan baru DITAMBAHKAN ke dokumen ini, tidak dibuat sebagai .md baru.
- Dokumen yang khusus milik satu video (naskah, publish pack, brief Antigravity, daftar aset) tetap terpisah per video.
- Kalau ada aturan yang bertentangan, yang berlaku adalah yang paling baru (tanggal di bagian 0).
- Salinan di repo: `docs/PENNY_LOGICS_RULES.md` (isinya sama; perbarui keduanya bersamaan).

Menggabungkan (31 Okt 2026): component_registry, hyperframes_onetake_plan, video01_v2_revisions, video02_style_fusion, video02_style_guide, character_palette, leo_expression_map, reference_karhutla_paper_cutout_analysis.

## 0. Riwayat keputusan
- 31 Okt (6): musik latar dikeraskan sedikit; opening (sting) memakai audio `funky_video_intro.mp3` dengan crossfade halus ke musik latar (aturan 1.16-1.17). Diterapkan di kit dan Video 01 (render 31 Okt sore).
- 31 Okt (5): ATURAN OUTRO: di akhir setiap video JANGAN menyebut topik video berikutnya. Cukup ajak subscribe dan tutup dengan "see you next time" (aturan 1.15).
- 25 Okt: palet karakter dari leo.png/mira.png; Gemini untuk semua gambar.
- 29 Okt: latar WAJIB cerah, teks kontras tinggi; tempo lambat 0.62; komponen reusable; watermark logo kiri bawah di semua video; aturan anti-tabrakan; registry komponen.
- 30 Okt: Video 01 dibangun ulang memakai kit V2; SFX minimal; musik free-to-use dengan kredit; subtitle .srt terpisah.
- 31 Okt (4): gaya KERTAS tidak dipakai lagi; kembali ke gaya sebelumnya (flat cartoon bergaris, grade lembut ala Kok Bisa). Kit: tekstur kertas mati secara default, hiasan kertas mati, transisi antar-bab default `whip`.
- 31 Okt (3): kebijakan latar direvisi: setiap scene punya gambar latar ilustrasi (panorama per bab, bagian 2). Kit mendukung `bg.images`.
- 31 Okt (2): kit reusable `src/kit/` (P1 selesai), bab sebagai data (ChapterSpec), satu alat `scripts/video.mjs` untuk semua video (skrip v1-/v2- dihapus).
- 31 Okt: (a) sting "Penny Logics" setelah Hook; (b) TIDAK ADA kartu judul per bagian, video mengalir terus dari Hook sampai Outro; (c) satu kamera tanpa cut + objek terbawa antar-scene (ide onetake, ditulis sendiri); (d) komponen HyperFrames yang belum kita punya dibuat versi Remotion; (e) kebijakan latar (bagian 2, direvisi di 31 Okt (3)); (f) semua ketentuan digabung di dokumen ini.

## 1. Aturan wajib (setiap video)
1. **Latar cerah.** Dilarang palet gelap (space, night, indigo, hitam berbintang) dan ilustrasi malam. Palet yang dipakai: sunrise, mint, teal, rose, lilac, sky, peri. Ilustrasi lokasi harus versi siang dan tanpa karakter.
2. **Teks kontras tinggi.** Ink gelap (#191411) di atas pastel, atau teks di chip/pill berlatar solid. Cek di still sebelum render.
3. **Struktur:** Hook → sting "Penny Logics" (PennySting gaya Kok Bisa, sekitar 4.8 dtk, lihat 7a) → isi → Outro. Isi mengalir terus TANPA kartu judul per bagian (tanpa "TRICK n"/"PART n" dan tanpa klip suara judul). Chapter YouTube cukup lewat timestamp di deskripsi.
4. **Satu kamera, tanpa cut** (bagian 3). Setiap pergantian beat membawa minimal 1 elemen dari scene sebelumnya.
5. **Tempo:** PopSpeed 0.62 untuk semua video. Elemen baru muncul tiap 2–4 dtk; satu pusat perhatian per beat; maksimal 3 elemen info baru per beat.
6. **Watermark:** logo Penny Logics (`public/profile_pic.png`) berupa lingkaran 72 px di kiri bawah, margin 28 px, sepanjang video. Zona x 28–100, y 980–1052 selalu kosong; Src dimulai di x ≥ 124.
7. **Anti-tabrakan** (bagian 6) dicek dengan still di setiap beat sebelum render.
8. **Audio:** narasi per bagian (WAV); SFX hanya pop, whoosh, kaching, card_tap; musik latar free-to-use (contoh freetouse.com) di volume 0.08 flat (aturan 16), diam saat opening sting (aturan 17), fade-out 3 dtk di akhir; kredit musik ditulis persis di deskripsi.
9. **Subtitle:** file .srt terpisah (tidak dibakar ke video), dibuat dari captions.json + timing.json.
10. **Angka/riset:** setiap angka di layar disertai `Src` (sumber). Angka dihitung dengan kode (CountUp/CountMoney), bukan ditulis tangan.
11. **Karakter & aset:** Leo (dan Mira, arketipe) original. Dilarang memakai karakter, logo, maskot, atau UI merek lain (ChatGPT, Apple, Spotify, iPhone, X, TikTok, dst.); pakai versi generik. Gambar dibuat dengan Gemini mengikuti palet di bagian 8.
12. **Teknis:** Remotion 4, 1920x1080, 24 fps. Antigravity yang merender di Mac (`/Users/faiz/Faiz Things/Project/YT`); Claude tidak merender video penuh, hanya still untuk QA. Audio, SFX, dan musik tidak masuk git; disalin ke `public/<video>/audio`, `public/sfx`, `public/music`.
13. **Kerapian:** tidak ada file duplikat. Setiap video mencatat komponen yang dipakainya di bagian 7. Commit dan push atas nama faizrizky.
14. **Disclaimer** "Education only, not financial advice" tampil di bagian penutup/saran.
16. **Volume musik latar: 0.08 FLAT (keputusan 31 Okt).** Sekitar 14 dB di bawah narasi (narasi sekitar -19 LUFS, musik Monday Routine sekitar -11.5 LUFS sebelum diturunkan). Tidak ada ducking di bawah narasi dan tidak naik-turun; satu-satunya perbedaan volume terjadi di sting (aturan 17). Jangan di atas 0.10 supaya tidak bersaing dengan narasi. Berlaku untuk semua video; menggantikan 0.07 + duck di aturan 8.
17. **Opening memakai audio khusus (`public/music/funky_video_intro.mp3`, 4.0 dtk, stereo 48 kHz, tidak masuk git; dari Suno, salin ke Mac bersama musik lain).** Audio ini diputar pada sting/opening Penny Logics. Volume opening: 0.7 (sekitar -18.8 LUFS, hampir sama keras dengan narasi). Urutan audio: musik latar turun (fade-out halus) → opening berbunyi → saat opening selesai, musik latar masuk lagi dengan fade-in dari volume nol, dan sambungannya di-crossfade tumpang tindih sehingga tidak terdengar terpotong. **Titik mulai:** audio opening langsung mulai saat transisi menuju sting dimulai (frame 0 PennySting, saat lingkaran meletup menutup Hook), tidak menunggu huruf muncul. **Panjang:** audio opening (4.0 dtk) HARUS menutupi seluruh sting (sekitar 4.3 dtk); musik opening tidak boleh selesai lebih dulu daripada animasinya. Cara: sesuaikan panjang audio ke sting (perpanjang ekor dengan loop bagian akhir/reverb + fade-out halus, atau time-stretch tipis sampai pas), bukan sebaliknya, dan musik latar baru masuk (fade-in ke 0.08) setelah sting selesai, tepat saat bab berikutnya terlihat di dalam lubang "o". Implementasi (SUDAH): `makeVideo({music: {file, vol: 0.08}, intro: {file: 'music/funky_intro_sting.mp3', vol: 0.7}})`. `funky_intro_sting.mp3` = versi audio asli yang diperlambat 0.85x + ekor gema, 4.94 dtk, loudness disamakan (-16 LUFS), supaya menutupi sting 114 frame (4.75 dtk). Musik latar turun ke 0 dalam 10 frame saat sting mulai, lalu naik lagi ke 0.08 dari 10 frame sebelum sting selesai sampai 36 frame sesudahnya (tumpang tindih dengan ekor opening). Untuk video lain cukup tambahkan opsi `intro` yang sama. Catatan: SFX whoosh/pop sting dimatikan saat audio opening dipakai supaya tidak bertabrakan.
15. **Outro tanpa teaser topik berikutnya (catatan 31 Okt).** Penutup setiap video hanya: ajakan subscribe + "see you next time" (contoh: "Subscribe so you don't miss the next one. This is Penny Logics. See you next time."). Jangan menyebut judul/topik video selanjutnya, baik di narasi maupun di layar. Konsekuensi: tidak ada placeholder NEXT_TOPIC di naskah; chapter terakhir di deskripsi diberi nama "Outro" (bukan "Next: ..."); end screen tidak perlu teaser, cukup Subscribe + video terkait setelah tayang.

## 2. Kebijakan latar: SETIAP scene punya gambar latar (direvisi 31 Okt)
Mengikuti referensi: Kok Bisa? dan reel kertas hampir selalu memakai latar adegan ilustrasi. Latar polos ala Antidote (hitam) tidak dipakai.
- **Setiap bab = satu panorama ilustrasi panjang** yang disusun dari 2–3 potongan gambar 21:9 (2520x1080) bersambung. Kamera berjalan menyusurinya (aturan satu kamera), misalnya kafe → jalan pertokoan → gedung bank. Ini juga membuat gerak kamera terasa.
- **Gaya gambar:** gaya sebelumnya (seperti `bg_cafe.jpg`/`bg_street.jpg` dan karakter): flat cartoon dengan garis tipis gelap dan palet pastel siang yang cerah. BUKAN gaya kertas/paper-cutout. Sederhana, detail rendah. TANPA orang, hewan, tulisan, angka, atau logo merek. Seperempat bawah kosong (lantai/tanah) dan bagian tengah lapang, karena objek dan teks diletakkan di atasnya. Ujung kiri/kanan memudar ke krem polos supaya bisa disambung.
- **Di kit:** `bg.images` di ChapterSpec (`{src, x, w}` dalam koordinat dunia). Potongan saling tumpang 100–150 px, sambungan memudar otomatis, wash terang 22%, blur 1.6 px. Ada vignette lembut (grade ala Kok Bisa). Kalau file belum ada, kit memakai gradasi palet (`stops`) sebagai cadangan.
- **Teks dan angka di atas gambar:** selalu di atas panel krem (`card`), chip, atau pill, tidak langsung di atas gambar. Area teks pada gambar harus lapang.
- **Latar polos (gradasi palet) hanya untuk jeda pendek:** sting, atau satu angka besar yang butuh fokus penuh.
- **Dilarang:** latar gelap/malam, gambar ramai di belakang teks, tulisan atau logo di latar.
- **Gambar dibuat dengan Gemini** memakai prompt gaya baku. Daftar per video ada di bagian 10.

## 3. Satu kamera tanpa cut + objek terbawa (ide onetake, implementasi sendiri)
onetake berlisensi PolyForm Noncommercial: kode dan hasilnya TIDAK dipakai. Kita hanya mengambil prinsipnya.
1. Satu "dunia" (kanvas besar) per bab. Setiap scene adalah stasiun di koordinat x,y; kamera bergerak terus antar-stasiun (pan, zoom, push-in, pull-back) dengan easing halus dan shake kecil.
2. Gerak kamera ditentukan beat di timing.json.
3. Setiap batas beat membawa minimal 1 elemen. Contohnya: kartu yang di-tap menjadi kartu di diagram, koin terbang ke stasiun berikutnya, angka berubah menjadi bar, atau layar ponsel ditembus kamera.
4. Cek otomatis `scripts/carry-check.mjs`: setiap stasiun mendaftarkan id elemen yang dibawa, dan script gagal kalau ada batas beat tanpa elemen bersama.
5. **Variasikan arah kamera (catatan 31 Okt, berlaku mulai Video 03).** Jangan geser ke kanan terus. Susun stasiun di dunia 2D (grid/zig-zag) supaya kamera bergantian turun, naik, ke kiri, dan ke kanan; contoh satu bab: kanan, turun, kiri, naik/kanan. `world.h` dibuat lebih dari 1080 dan latar panorama boleh diletakkan di beberapa baris (BgImage punya `y`). Dalam satu bab maksimal 2 gerakan berturut-turut ke arah yang sama.
6. Komponen yang dibutuhkan (P1): World + Station, WorldBg, CameraPath, Carry (shared element), MatchCut/TextMatchCut, PathTraveler, MotionBlur/EchoTrail, PhoneDive, ParallaxZoom, FocusRack, FocusZoom, CameraShake.

## 4. Alur produksi per video (pakai kit, hemat token)
Satu video = 4 file kecil di `src/videoNN/`. Tidak perlu menulis JSX per scene.
1. `timing.json`: `{fps: 24, chapters: [{id, title, audio, pre: 0, audioDur, post, beats: {nama: detik}}]}`. Beat diambil dari jangkar kata narasi. `pre` selalu 0 (tanpa kartu judul). Pengecualian: bab sesudah Hook memakai `pre` 4.35 untuk sting (`stingIn`), bab dengan intro pertanyaan memakai `pre` >= 2. `post` Hook minimal 0.6 (lingkaran sting meletup di atasnya), bab lain 0.4–0.8.
2. `captions.json`: `{idBab: [[mulai, selesai, "kalimat"], ...]}` untuk .srt.
3. `specs.tsx`: `export const SPECS: ChapterSpec[]`, satu per bab (format di bagian 7a). Import hanya dari `../kit/core` (helper) dan `import type` dari `../kit/spec`.
4. `VideoNN.tsx`:
```tsx
import timing from './timing.json';
import {makeVideo} from '../kit';
import {SPECS} from './specs';
export const VideoNN = makeVideo({prefix: 'VNN', timing, chapters: SPECS.map((spec, i) => ({spec, name: ['Hook', 'Swipe'][i]})), music: {file: 'music/<lagu>.mp3'}});
```
Lalu daftarkan `<VideoNN.Compositions />` di `src/Root.tsx`.
5. QA (satu alat untuk semua video):
   - `node scripts/video.mjs check videoNN`: timing, durasi WAV, file yang hilang, waktu chapter YouTube.
   - `node scripts/video.mjs carry videoNN`: aturan satu kamera; setiap gerak kamera dan setiap masuk bab harus membawa objek.
   - `node scripts/video.mjs stills VNN [detik...]`: still QA untuk cek tabrakan.
   - `node scripts/video.mjs srt videoNN`: menghasilkan `out/videoNN.srt`.
6. Commit + push, salin audio/SFX/musik ke Mac, lalu Antigravity: `npm install`, `node scripts/video.mjs check videoNN`, `npx remotion render src/index.ts VNN-Full out/VideoNN.mp4`, `node scripts/video.mjs srt videoNN`.
7. Perbarui bagian 7 (pemakaian) dan publish pack video tersebut.

## 5. Pelajaran gaya dari referensi (yang masih berlaku)
- **Antidote:** penjelasan lewat diagram dan elemen yang muncul bertahap di latar yang sama (hampir tanpa cut); judul tulisan tangan + garis bawah yang menggambar sendiri; kartu ilustrasi bertepi putih + label tebal; checklist; alur bernomor dengan panah; grafik garis digambar bertahap. (Latar hitam/berbintang mereka TIDAK dipakai.)
- **Kok Bisa?:** kamera selalu bergerak (drift/zoom/parallax); balon bicara krem tebal (#F7EFE2) dengan teks pendek; sticker lower-third dua warna (label kecil + kata kunci besar + sub); IsoBlock untuk skala uang; deretan siluet 1-ditandai; flash/whip untuk kejut. Angka besar di atas, konversi kecil di bawah.
- **Reel paper-cutout (Karhutla):** (tekstur/gaya kertas TIDAK dipakai sejak 31 Okt; yang diambil hanya teknik geraknya) parallax; maskot penanya di pojok; chip warna konsisten (kuning = waktu/angka, merah = peringatan, krem = label); kinetic type kata-per-kata yang lalu menyatu; timeline penggaris dengan panah menyapu; lensa zoom lingkaran; cutaway pan vertikal; before/after crossfade + shake; partikel kecil.
- **Gerak mikro:** pop-in dengan overshoot ringan 6–8 frame lalu idle (bob/napas); garis digambar 14–36 frame; transisi whip sekitar 9 frame, ink 30, wipe 22, zoom 24 (@24 fps). Nilai ini estimasi, bukan ukuran presisi.
- **Palet per scene:** 1 warna dominan + 1 aksen kontras + ink; jangan lebih dari 4 warna jenuh sekaligus.
- **Leo:** maksimal sekitar 25% durasi; muncul di pembuka dan penutup; di bagian lain cukup objek, ikon, dan bubble.

## 6. Aturan anti-tabrakan (WAJIB sebelum render)
1. Zona layar 1920x1080: judul/banner y 60–210; konten utama y 230–930; area aman x 130–1790. Karakter berdiri di lantai boleh sampai y 1050.
2. Hitung ukuran akhir (skala maksimum + titik tumpu), bukan ukuran awal.
3. Jarak minimal 40 px antar elemen berbeda; teks tidak boleh menimpa ilustrasi.
4. "Kotak wajah" karakter (sepertiga atas) tidak boleh tertutup chip/tempelan.
5. Urutan lapisan (bawah ke atas): latar → objek besar → karakter → panah/garis → StatCard/Chip/StickyNote → Punch/WordPop → Src. HighlightSwipe tepat di bawah teks yang disorot.
6. Elemen dekoratif (Embers, MascotCorner) tidak menyentuh area teks; MascotCorner hanya di pojok bawah (x < 300 atau x > 1500, y > 700) dan di luar zona logo.
7. Outro: area x 1100–1790, y 230–930 dikosongkan untuk end screen YouTube.
8. Cek dengan still di setiap beat (zoom). Rencana: bounding-box checker otomatis per Shot/Station.

## 7. Kit komponen dan pemakaian per video
| Kit | Lokasi | Dipakai oleh |
|---|---|---|
| **Penny kit** (Video 01 versi lama, diganti rebuild V2 per 2026-10-30) | `src/Penny/kit.tsx`, `constants.ts`, `layoutMetadata.ts`, `checkOverlaps.ts` (repo Remotion lama, backup di `_old_remotion_backup`; Trick 2-4 ada di PC) | Hook, Trick 1 (dan Trick 2-4 di PC) |
| **Style kit + V2 kit** (Video 02+) | `src/style/style_kit.tsx`, `src/video02/{v2kit,paper,fx,title}.tsx` | Video 02, dan seterusnya |
| **Kit umum (baru)** | `src/kit/` (komponen dari backlog bagian 9: kamera, carry, transisi, anotasi, chart) | semua video berikutnya |

Video 03 dst: pakai Style kit + V2 kit (salin pola `src/video02/`: `timing.json`, `ChapterShell`, `chapters/*`).


### 7a. Kit umum `src/kit/` (dipakai semua video mulai sekarang)
Contoh lengkap: `src/kitdemo/specs.tsx` (komposisi `KD-Full`).
**ChapterSpec** (satu bab):
- `id`
- `world: {w, h}`: ukuran kanvas, misalnya 6000x1080 untuk 4 stasiun.
- `bg: {images: [{src, x, w}], stops: [{x, c: 'sky'|hex}], decor, ground?}`: `images` = panorama ilustrasi (WAJIB, bagian 2); `stops`/`decor` = cadangan dan latar untuk jeda.
- `cam: [[waktu, x, y, zoom?, {dur, ease: 'ext', rot}?]]`: x,y adalah titik dunia di tengah layar. Helper `frameCam(waktu, box)` untuk fokus ke kotak, `diveCam(waktu, box)` untuk masuk ke layar ponsel atau pintu.
- `shakes: [[waktu, amp?, dur?]]`, `sfx: [[waktu, 'kaching']]`.
- `enter: {kind: 'whip'|'iris'|'slide'|'rip'|'none', carry: 'id', cx?, cy?}`: cara bab masuk menimpa bab sebelumnya (tanpa cut), plus objek yang dibawa. Default `whip` (gaya Kok Bisa); `rip` (kertas robek) hanya jika diminta.
- `paper: true`: tekstur kertas (default MATI, gaya kanal = flat cartoon).
- `stingIn: true` + `enter: {kind: 'sting', carry}` pada bab SESUDAH Hook (pre 4.35): **PennySting** (`src/kit/sting.tsx`), sting merek meniru sting Kok Bisa (digambar ulang, tanpa aset mereka): lingkaran teal meletup menutup scene → titik dan garis bantu teknik bertitik muncul → garis tepi huruf "penny- / logics" tergambar → huruf terisi putih transparan lalu penuh dari kiri → garis bantu terlempar keluar → teks diam sambil kamera maju pelan → kamera menyelam ke lubang huruf "o" dan bab berikutnya sudah terlihat di dalamnya. Warna latar teal #1E8C86 (kontras dengan teks putih; mustard terlalu pucat untuk teks putih), bisa diganti lewat prop `color`. Posisi huruf diambil dari ukuran glyph Poppins Black. `sting: true` (versi di ekor bab, tanpa menyelam) masih ada untuk kasus khusus.
- `autoPop` / `autoWhoosh` (default true): pop otomatis saat item muncul, whoosh otomatis pada gerak kamera jauh.

**Waktu (At):**
- angka = frame dari awal suara;
- `'tap'` = beat;
- `'tap+6'` / `'tap-4'` = beat ± frame;
- `'2.5s'` = detik;
- `'end'` / `'end-10'` = akhir bab.

**Item:** `{t, x, y, at?, out?, ...}`
Properti umum:
- `id`;
- `move: [[waktu, x, y, skala?, rot?]]`: CARRY, objek pindah antar-stasiun dengan lengkung;
- `trail: n`: bayangan gerak (motion blur);
- `screen: true`: tetap di layar, tidak ikut kamera;
- `exit: 'fade'|'toss'|'drop'`, `enter: 'pop'|'fade'|'left'|'right'|'up'|'none'`;
- `blur: [[waktu, px]]`: focus rack;
- `hang`: tergantung dan berayun;
- `boil`: garis bergetar seperti gambar tangan;
- `stop: 2`: stop-motion;
- `sfx: 'kaching'|false`;
- `kids: Item[]`: isi card/phone, posisi relatif;
- `z`, `opacity`, `ox`, `oy`.

Jenis `t`:
| t | isi utama |
|---|---|
| prop | `src` (png di public), `h` atau `w`, `flip` |
| leo | `heads: [[waktu, 'head_proud.png']]`, `h` (Leo badan penuh, kepala ganti) |
| badge / person | kepala Leo dalam lingkaran / ikon orang generik |
| text / punch | teks bebas (`hand`, `size`, `w`, `align`) / judul tangan di tengah layar (`screen`) |
| chip / pill / tag / bubble / sticker / note | label: chip `kind` time/warn/label |
| stat / pct / gauge / money / wheel | kartu angka count-up / grid persen / gauge / uang count-up / odometer |
| price / pay / strike / match | label harga / lingkaran cicilan / coret lalu ganti ($5.00 → $4.85) / teks A berubah jadi B |
| bar / bars / line | satu bar / bar chart / line chart (`series`, `labels`, `prefix`, `suffix`) |
| mark | coretan spidol: `kind` circle/underline/strike/box/arrow (`dx`, `dy`) |
| arrow / coins / path / ripple / shadow | panah putus-putus ke `x2,y2` / aliran koin / objek mengikuti kurva `pts` / riak tap / bayangan lantai |
| card / phone / notif | panel krem (+kids) / ponsel generik (+kids) / tumpukan notifikasi |
| ruler / words / embers | timeline penggaris / kinetic word pop / partikel |
| src / disclaimer | sumber angka (kiri bawah, x ≥ 124) / disclaimer (layar) |
| custom | `render: (rel) => JSX` untuk kebutuhan khusus |

Komponen kit juga bisa dipakai langsung di JSX:
- **Kamera dan dunia:** World, Depth, WorldBg, camAt.
- **Gerak:** StopMotion, Boil, Hang, PathTraveler, pathAt.
- **Anotasi dan teks:** HandMark, StrikeReplace, TextMatchCut.
- **Angka dan UI:** NumberWheel, LineChart, BarChart, NotifStack.
- **Transisi:** RipReveal, IrisReveal, SlideOver, WhipEnter.
- **Bagian kecil:** LeoFull, Fly, Ripple, Shadow, Tag, Bar, CountMoney, Win.
- **Rangka video:** BrandSting, ChapterShellK, makeVideo.

### Pemakaian per video
#### Video 01 (Penny kit, versi lama)
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

#### Video 01 (V2 rebuild, 2026-10-30: Style kit + V2 kit)
Kode: `src/video01/` (timing.json, captions.json, v1kit.tsx, Video01.tsx, chapters/{Hook,T1,T2,T3,T4,Customers,Meaning,Outro}). Komposisi: `V1-Full` dan `V1-00-Hook` ... `V1-07-Outro`. Tempo 0.62 (PopSpeed), Watermark otomatis, musik "Aventure - Monday Routine" (freetouse.com, volume 0.07, ducking di kartu judul, fade-out 3 dtk), SFX hanya pop/whoosh/kaching/card_tap. Kartu judul "TRICK n" (versi 30 Okt; akan dihapus sesuai aturan 1.3).
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
Cek: `node scripts/video.mjs check|srt video01`, `node scripts/video.mjs stills V1 <detik...>` (subtitle .srt, tidak dibakar ke video).
Audio, musik, SFX tidak ada di git (`.gitignore`); salin ke `public/v1/audio`, `public/music`, `public/sfx`.

#### Video 02 (Style kit + V2 kit)
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

### Animasi yang WAJIB dipertahankan (catatan 31 Okt)
- **Masuk bergantian atas/bawah untuk 3 objek** (Kok Bisa tri-panel montage, `Panels` di `style_kit.tsx`): saat menjelaskan 3 hal sejajar, objek/panel pertama masuk dari atas, kedua dari bawah, ketiga dari atas lagi (selang ~8 frame, pegas sedikit memantul). Jangan diganti dengan pop biasa. Kalau dipakai di specs, gunakan `enter: 'up'` / `enter: 'down'` bergantian atau `Panels` lewat item `custom`.

### Katalog singkat: mau efek apa, pakai apa
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

## 8. Karakter & palet (Gemini wajib menyebut hex ini; setelah generate, warna diratakan ke nilai ini)
**Leo:** kulit #F7A770, rambut #4A2E1A, hoodie mustard #E8A520 (lipatan #BA8116), kaos #F2EDE9, jeans navy #293253 (bayangan #202536), sepatu #F2EDE9 (bayangan #D3D0CC), garis #191411, cup kopi #D3D0CC/#595756 dengan sleeve hijau gelap.
**Mira:** kulit #F4A36B, rambut #241F25, cardigan #EF4762 (bayangan #B83348), kaos #F3EBE1, celana #252A49, sepatu #F3EBE1 dengan aksen #6BB0E4, jepit #6BB0E4, kacamata #241F25, garis #0F0E14. Pose: mira_explain, mira_neutral, mira_coins.
**Banker (arketipe):** jas #292E46, kulit #EEC19E, topi #1C181A, kemeja #F7F4F1, dasi #E17C62, kotak hadiah #E0A81F. Pose: banker_smug, banker_nervous.
**Marketer (arketipe):** jaket #EA6E5C, celana #E4AF07, kaos #F4F0ED, kulit #E0A575, rambut #2A1618, megafon #80B7E0 (#6399C6). Pose: marketer_shout, marketer_grin.
**Umum:** ink #191411 (kit) / #14141E (gambar); palet brand: gold, mustard, navy, teal, coral pink, cream.

**Ekspresi Leo** (kepala: happy, proud, suspicious, thinking, shocked, tired, calm; kanvas 790x1539 sama dengan leo_body, pivot leher sekitar 395,385):
- Ekspresi berganti saat narasi pindah poin, bukan tiap kalimat. Pergantian = tukar kepala dengan pop kecil (0.93/0.96 → 1.0, sekitar 0.15 dtk). Warna tidak berubah antar ekspresi.
- Pemetaan umum: pembuka santai = calm/happy; "merasa pintar" = proud; fakta mengejutkan/angka besar = shocked; curiga pada sistem = suspicious; menjelaskan aliran uang = thinking; beban utang = tired; penutup = proud → happy.

## 9. Backlog komponen dari HyperFrames (ditulis ulang di Remotion)
HyperFrames (heygen-com/hyperframes) berlisensi Apache 2.0. Idenya ditulis ulang sebagai React/Remotion di `src/kit/` (interpolate/spring, bukan GSAP); kalau ada kode yang disalin, cantumkan header kredit + NOTICE Apache 2.0. Katalog yang dicek: 456 item per 31 Okt 2026. Setiap komponen yang jadi dipindahkan ke bagian 7.
- **P1: SELESAI (31 Okt, `src/kit/`).** Pemetaan backlog ke kode:
  - World + stasiun: koordinat dunia. CameraPath: `cam`/camAt. CameraShake: `shakes`. FocusZoom/ParallaxZoom: `frameCam` + Depth. PhoneDive: `diveCam`.
  - Carry: `move`. MotionBlur/EchoTrail: `trail`. PathTraveler: `path`. MatchCut/TextMatchCut: carry + `match`. FocusRack: `blur`.
  - TornPaperRip: `enter` rip (plus iris/slide/whip). StopMotion+Boil: `stop` / `boil`. HangingSign: `hang`.
  - HandAnnotate: `mark`. StrikeReplace: `strike`. NumberWheel: `wheel`. LineChart: `line`. BarChart: `bars`. NotifStack: `notif`.
  - Ditambah carry-check (`node scripts/video.mjs carry`).
- **P2:** PaperCollageReveal, ScribbleWipe, IrisReveal, PushSlide, VelocityCut, FreezeFrame, ScrollStory, PhysicalExit, ExtendedEase, CharacterWalk (butuh Leo per sendi), HeadlineSlam, KineticSwap, Typewriter, HandWrite, GlossSweep, BarRace, ProgressRing/ProgressStat, SplitFlap, Flowchart, HubSpoke, Checklist, StaggerGrid, SplitCompare, Overwhelm, SuccessCheck, CardShuffle, Confetti, EndCard.
- **P3:** CurtainReveal, HalftoneDissolve, GridPixelWipe, ShutterWipe, DollyZoom, DepthStack, DriftHold, KineticBuild, WordRise, HandBubble, BgWord, TickerLock, USMap/WorldMap, StepRail, StarRating, ExplodedStack, ChatThread+TypingDots, BottomSheet, Toggle, SplitCards, CardRail, BeatAccent, MeshGradientBg (terang), GridBg/HalftoneBg, LogoSlam, ChannelIntro, CommentCard.
- **Asal ide (HF):** torn-paper-rip, paper-collage-reveal, hw-* (scribble, arrow, underline, callout-circle, box-label, boil, write-title, text-cloud), vox-annotate, strikethrough-replace, number-wheel/slot-machine-roll, data-chart/mk-line-graph/chart-story/decline-chart, animated-bar-chart, bar-chart-race, conic-progress-ring/mk-usage-arc/mk-progress-stat, split-flap-board, flowchart/decision-tree, radial-surround/constellation-hub, marker-checklist-card, grid-card-assemble/stagger-*, comparison-split, notification-stack/pileup, overwhelm-surround, spring-stack-shuffle, match-cut/text-match-cut/type-match-cut, cut-the-curve, modal-morph/morph-swap, offset-path-traveler/arc-motion-path, motion-blur/echo-trail, parallax-device-dive, parallax-zoom, focus-rack, ui-focus-zoom, camera-shake, pan-stations, caption-camera-follow, pendulum-swing, stop-motion-cadence, physical-exit, freeze-frame-dressing, confetti, cta-lockup, logo-sting, yt-logo-intro, yt-comment-card.
- **TIDAK diambil:** tiruan merek (chatgpt/claude-exchange, apple-money-count, spotify, instagram/tiktok/x/reddit, slack, macos/ios26, vfx-iphone, heygen/blue-sweater, vpn-youtube-spot, store-badge, nyc-paris-flight); shader WebGPU berlatar hitam dan transisi glitch; komponen kode/kursor/UI SaaS; lower third untuk footage; caption gaya TikTok; karusel 3D/Three.js/vfx/partikel berat; peta spesifik negara lain. Alasan: bertentangan dengan latar cerah, tidak relevan untuk channel finance, atau berisiko merek.

## 10. Status per video
**Video 01** (How Credit Card Companies Make Money Off You): kode `src/video01/` = timing.json + captions.json + specs.tsx + Video01.tsx (makeVideo). Disusun ulang dengan kit 31 Okt: tanpa kartu judul (pre = 0, klip judul dihapus), sting Penny Logics setelah Hook (post hook 1.6), satu kamera per bab di atas panorama `public/v1/bg`, transisi antar-bab whip, kartu kredit Leo (`card`) dibawa di setiap gerak kamera dan setiap pergantian bab; di Three Customers pintunya sendiri yang dibawa (d1/d2/d3). Total 4:52. Chapter YouTube: 0:00 hook, 0:24 swipe, 1:21 interest, 2:09 rewards, 2:52 keep paying, 3:35 three customers, 4:16 what this means, 4:37 outro. Render: `npx remotion render src/index.ts V1-Full out/Video01.mp4`, subtitle `node scripts/video.mjs srt video01`.
- Revisi 31 Okt (2): ceklis/silang diletakkan di luar kartu (kartu memotong isinya); sting Penny Logics diperpanjang (STING_FRAMES 66 = 2,75 dtk, post hook 2.9); kamera tidak lagi menyelam ke gambar EDC (raster pecah kalau diperbesar >1,3x), diganti zoom 1,15 + roda gigi + tap kartu; What This Means diberi intro pertanyaan (pre 2.8). Total 4:56; chapter: 0:00, 0:25, 1:22, 2:10, 2:53, 3:36, 4:18, 4:41.
- Revisi 31 Okt (3): sting diganti PennySting gaya Kok Bisa (dipasang di awal Trick 1, pre 4.35, post Hook 0.6). Total 4:58; chapter: 0:00, 0:23, 1:24, 2:12, 2:55, 3:38, 4:20, 4:43.
- Aturan baru: jangan zoom kamera lebih dari ~1,3x ke gambar raster (prop PNG); untuk masuk ke objek pakai zoom kecil + elemen tambahan, atau gambar resolusi tinggi.
- Komponen baru `intro` (src/kit/intro.tsx, QuestionIntro): adegan pertanyaan ala reel Karhutla di `pre` bab: kata muncul satu per satu sebagai chip, lalu tanda "?" besar memantul, maskot Leo berpikir di pojok, "?" kecil melayang. Pakai: `intro: {words: [...], highlight: [i], image: 'v1/bg/....jpg'}` + `pre` >= 2 dtk di timing.json.
- Kit diperbaiki saat menyusun Video 01: punch/src/disclaimer/embers dirender dalam bingkai layar penuh (sebelumnya terlipat sempit dan label "Source:" tidak tampil); bubble dan sticker punya lebar `w` (default 760 / 900).

**Video 01: latar panorama (16 potongan, SUDAH digenerate 31 Okt, ada di `public/v1/bg/`).** Dibuat di Gemini (akun genshin impacto) dengan prompt di bawah; hasil diubah ke 2520x1080 dengan tepi kiri/kanan memudar ke krem. Catatan: t2_c, t3_a, t4_c sudah diulang (tengah dikosongkan; t3_a lantainya masih sedikit berperspektif, belum bisa diulang karena batas harian Gemini); t2_a dan t4_a sengaja kosong di kiri; papan menu hook_a sudah dikosongkan.
Cara pakai di kit: `bg: {stops: [...], images: [{src: 'v1/bg/t1_a.jpg', x: 0, w: 2600}, {src: 'v1/bg/t1_b.jpg', x: 2500, w: 2600}, ...]}`. Potongan bersebelahan saling tumpang 100–150 px dan ujungnya menyatu otomatis (fade). Kit memberi wash terang 22% + blur 1.6 px. Simpan file di `public/v1/bg/`.

**Gaya untuk SEMUA potongan (tempel di awal setiap prompt Gemini; lampirkan `public/v1/bg_cafe.jpg` sebagai referensi gaya):**
> Wide background illustration for an animated finance explainer, same style as the attached reference: flat cartoon shapes with thin dark outlines (#191411), clean flat colours (no paper texture, no cut-paper look), bright daylight pastel palette (cream #FFF4E0, mint #BDEBD3, sky #D4EDFF, peach #FFD9A0, mustard accents #E8A520). Simple and calm, low detail, large clean surfaces. NO people, NO animals, NO text, NO letters or numbers, NO logos or brand signs. Keep the lower 25% as an empty floor/ground band and the middle area uncluttered (objects and captions will be placed on top). The left and right edges fade into plain cream so pieces can be joined side by side. Aspect ratio 21:9 (2520x1080).

| File | Bab / stasiun | Isi (tambahkan ke prompt) |
|---|---|---|
| hook_a.jpg | Hook: kafe | Inside a cosy coffee shop: long wooden counter on the right half, espresso machine, shelves with cups, big window with daylight on the left. |
| hook_b.jpg | Hook: "3 perusahaan dibayar" + "untung dua arah" | Continuation of the same coffee shop: plain warm wall with three empty framed panels, a few plants, soft window light. |
| t1_a.jpg | Trick 1: ikuti $5 (kafe → terminal) | Coffee shop counter seen closer, payment area with an empty space on the counter, menu board without any writing. |
| t1_b.jpg | Trick 1: biaya swipe → bank penerbit | Daytime shopping street: small shop fronts with blank awnings, sidewalk, at the far right a classic bank building with columns (no name). |
| t1_c.jpg | Trick 1: angka miliaran | Business district plaza: tall simple office towers, open paved square, clear sky with a few soft clouds. |
| t2_a.jpg | Trick 2: jatuh tempo, bunga | Home desk corner: wooden desk, wall calendar (blank), lamp, mug, window; desk top left empty. |
| t2_b.jpg | Trick 2: 22% / kartu toko | City street with a shopping mall entrance (no signs) and a government-style building with columns in the distance. |
| t2_c.jpg | Trick 2: $5,000 Leo, kran bocor, mesin | Small living room / kitchen: sink with a tap on the right, cupboard, warm daylight; open floor in the middle. |
| t3_a.jpg | Trick 3: cashback & poin | Bright airport departure hall: big windows with a plane outside, rows of seats, empty floor. |
| t3_b.jpg | Trick 3: CFPB / dua dompet | Calm office with a long table, bookshelf, large window; simple and tidy. |
| t4_a.jpg | Trick 4: statement & minimum | Home office desk with paper trays and a laptop closed, window, plant. |
| t4_b.jpg | Trick 4: treadmill / bunga | Bright simple gym corner with large windows (no people, no equipment in the middle). |
| t4_c.jpg | Trick 4: 4 biaya | Bank lobby: counters with blank screens, potted plants, polished floor. |
| cust_a.jpg | Three Customers | Long bright hallway with soft pastel walls and three empty door-shaped spaces evenly spaced (no doors drawn), skylight. |
| mean_a.jpg | What This Means: alat | Tidy workshop/garage: pegboard wall with tool silhouettes, workbench on the left, open floor. |
| mean_b.jpg | What This Means: pilih pintu | Sunny park crossroads with three paths leading away, trees, a bench, blank signpost. |
| outro_a.jpg | Outro | Reuse hook_a.jpg (back to the coffee shop) + a plain bright wall for the next-video teaser (right side kept very empty for the end screen). |

Catatan: periksa setiap hasil. Jika ada tulisan/logo/orang, minta Gemini menghapusnya atau generate ulang. Ratakan warna mendekati palet. Ukuran akhir 2520x1080 JPG kualitas ~85.

**Video 02** (BNPL): kode `src/video02/`. Masih kurang 8 WAV narasi (v2_00_cold ... v2_07_outro), musik, dan thumbnail. Outro TANPA topik berikutnya (aturan 1.15), jadi NEXT_TOPIC tidak diperlukan.
- Catatan 31 Okt: animasi Video 02 sudah disukai, JANGAN diubah isinya. Yang dikerjakan nanti hanya: (1) hapus kartu judul bab ("Part 1, 2, ..."), (2) ganti perpindahan antar-scene dengan metode terbaru kit (transisi whip/iris/slide dari `transitions.tsx` + satu objek yang dibawa antar-scene, sting Penny Logics setelah cold open). Tidak perlu dipindah ke specs kalau itu mengubah animasinya; cukup bungkus scene lama dengan transisi baru.
