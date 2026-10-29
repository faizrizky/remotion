# Video 02 - Style Guide (Antidote + Kok Bisa? techniques, original characters)
Sumber analisis (29 Okt): ~14 frame Antidote "Atomic Habits" (30:16) dan ~7 frame Kok Bisa? "Black Market" (4:09) dari browser. Frame sampling, bukan tonton penuh: tiap pola di bawah terlihat di >= 2 frame.
Aturan hak: pakai TEKNIK (palet, ritme, gerak, transisi, tata letak). JANGAN pakai karakter, logo, maskot, aset, atau nama mereka. Leo + Penny Logics tetap original.

## A. Antidote (ringkasan buku animasi, gelap + warna neon)
- Latar: ungu-hitam gelap dengan bintang kecil berkedip, atau satu warna penuh (teal, pink-rose, indigo) per bab. Film grain + vignette tipis.
- Aksen vivid: pink/magenta, kuning, ungu biru; teks putih. Judul tulisan tangan (handwritten, mis. Caveat) dengan garis bawah menggambar sendiri.
- Karakter: vektor flat berkontur, proporsi realistis-cartoon, ekspresi jelas; sering 2 sisi kiri-kanan dengan thought bubble (kiri/kanan) yang bertanya ("Am I seeing results yet?").
- Layout: 2 panel hitam berborder di tengah dengan ikon/grafik + label di bawah (Visible Results vs Direction); diagram berlapis (kue: Outcomes di atas, Process di bawah) dengan ikon 3D-flat; grafik garis digambar bertahap (plateau + kurva); otak besar sebagai metafora, ikon kecil muncul satu per satu.
- Transisi: ink-splat / blob mask reveal (lingkaran organik tumbuh dari beberapa titik); pop-in objek; zoom perlahan.
- Subtitle kecil di bawah kiri-tengah, CTA "SUBSCRIBE" miring di pojok kanan, logo channel bulat di kiri bawah.
- Struktur: Intro -> ACT 1..5 (bab bernama, tiap bab ada judul + lencana), kata kunci dibuat besar di layar saat disebut.

## B. Kok Bisa? (sains/ekonomi, hangat + sinematik)
- Latar berbasis adegan ilustrasi (rumah sakit hijau-mint, malam pasar dengan bokeh kuning, kapal kontainer di laut malam, ruang gelap dengan poster), warna lembut desaturasi, cahaya kuat dari satu sumber, vignette untuk flashback.
- Karakter: gaya chibi (kepala besar, mata titik hitam, kulit krem), siluet berkontur tipis, tampil kecil di frame; maskot-tipe "dokter berkacamata" dengan speech bubble krem besar bergaya tebal.
- Speech bubble: krem (#F7EFE2) tebal, teks bold singkat ("Itu mah pasar malem", "Cari aja lagi!"), ekor mengarah ke pembicara.
- Montase 3 panel vertikal (rantai | karakter | pasien) untuk membandingkan 3 sisi; garis diagonal sebagai pembatas/wipe.
- Sticker lower-third dua warna: label kecil kuning ("Lagi cari") + kata kunci besar merah ("GINJAL") + sub kecil ("dibeli mahal (banget)").
- Props kontekstual: papan harga "SEMUA HABIS" (flashback sejarah, gelap), grid ukuran tinggi (data), rak kontainer.
- Watermark kecil kanan-bawah; ritme potong 3-6 detik; camera: zoom lambat konstan.

## C. Aturan gabungan untuk Penny Logics Video 02 (BNPL)
1. Tiap scene = 1 palet berbeda dari PALETTES (space, teal, rose, indigo, mint, sunrise, night); jangan ulang palet scene sebelumnya.
2. Tiap objek muncul dengan PopIn; semua scene punya Camera zoom pelan (1.00->1.06) + Idle bob; tak ada elemen diam.
3. Transisi antar scene bergiliran: InkReveal (pindah topik), DiagonalWipe (A vs B), ZoomThrough (masuk ke objek), Flashback (mengingat/contoh masa lalu). Maks 1 transisi per ~6 detik, durasi 10-18 frame.
4. Judul bab: HandTitle + Sticker kata kunci; tiap angka penting = CountUp yang berhenti TEPAT di angka.
5. Leo: <= 25% durasi; muncul di pembuka dan penutup; di scene lain pakai objek+ikon+bubble. Speech Bubble dipakai untuk dialog pendek Leo.
6. Aturan lama tetap: alignment visible-bbox <= 2 px, gap >= 24 px, subtitle bottom-center <= 2 baris, tanpa pedestal, SFX hanya pop/whoosh/kaching/card_tap, musik ditambah di akhir (duck tajam di awal tiap bab).
7. Frame budget: 24 fps 1920x1080; verifikasi tiap scene dengan `remotion still` sebelum render penuh.

## D. Cara pakai kit (untuk Antigravity)
- Salin style_kit.tsx ke src/style_kit.tsx; `npm i @remotion/google-fonts`.
- Contoh scene:
```tsx
<Scene palette="space" dur={150} stars subtitle="Pay in four sounds free.">
  <HandTitle text="Pay in 4?" at={4} />
  <PopIn at={10} style={{left: 760, top: 300}}><Img src={staticFile('obj_card_transparent.png')} style={{height: 360}} /></PopIn>
  <Bubble text="It's free, right?" at={24} tail="left" style={{left: 1100, top: 260}} />
</Scene>
```
- Transisi: scene B dibungkus `<Sequence from={A_END-14}><InkReveal dur={18} seed="s2"><SceneB/></InkReveal></Sequence>`.

---
# ROUND 2 - Daftar kebiasaan (habit) tambahan dari penyisiran lebih rapat
Cakupan: Antidote ~30 frame (menit 0:30-18:20, termasuk deret transisi 177-182 s); Kok Bisa? ~16 frame (0:03-3:55, termasuk deret transisi 113.6-115.4 s). Masih sampling, bukan nonton penuh; pola di bawah terlihat >= 2x.

## Antidote - kebiasaan
1. Bab = kartu penuh satu warna (pink, ungu, dst.): dip ke hitam ~0.3 s -> "ACT N" raksasa tulisan tangan + subjudul 2 baris + garis-garis coretan; titik progres bab di pojok kanan atas. Subtitle tetap jalan di bawah. (ChapterCard)
2. Konsep ditunjukkan dengan DIAGRAM, bukan karakter saja: sumbu Reward vs Cost dengan dua garis (BAD habits turun, GOOD habits naik), emoji kotak ekspresi di ujung; "Plateau of Latent Potential"; kue berlapis Outcomes/Process; jalan berkelok dengan angka 30; panel Visible Results vs Direction. (DrawCurve, LayerCake, Panels)
3. Metafora visual konkret: otak besar, cermin, burger vs sehat (Present You vs Future You), tumpukan uang/koin, ruang isometrik kecil (One Space One Use), laptop/kamar.
4. Kartu persegi bertepi putih berisi ilustrasi + label tebal bawah ("Habit Stacking", "One Space, One Use"); kartu daftar bergaya checklist ✔ berlatar ungu ("When something is visible, it gets done"). (CheckCard)
5. Alur bernomor "Cue 1 -> Cue 2" dengan panah dan ikon kecil; label bab merah ("BAD HABITS"). (StepFlow)
6. Cutout orang nyata (penulis) dengan outline putih tebal di atas ungu, kutipan tulisan tangan redup di atasnya. (OutlinedCutout)
7. Karakter berdiri di panggung elips pink di atas latar bintang hitam saat dialog sosial. (Stage)
8. Latar berganti per beat: langit biru+uang (kontras terang), hitam berbintang, teal, oranye, ungu, pink. Warna kontras berpasangan dengan konten, bukan acak.
9. Subtitle kecil bawah-tengah dengan kotak gelap semi transparan; logo channel bulat kiri bawah; "SUBSCRIBE" miring kuning di kanan bawah sepanjang video. (CornerCTA)
10. Kata kunci di layar = highlight tulisan tangan; dialog internal = thought bubble putih bergaya komik.

## Kok Bisa? - kebiasaan
1. Pembuka: light-leak/cahaya hangat menyapu dari kanan; adegan pembuka seperti film (rumah sakit, tokoh bernama). (LightLeak)
2. Transisi inti = WHIP/SMEAR horizontal: adegan lama diregangkan & di-blur ke samping (~7 frame), adegan baru menyusul; bukan fade. Juga cross-dissolve lembut di momen suram (frame 70 s). (WhipOut/WhipIn, CrossDissolve)
3. Pencahayaan sinematik: kerucut spotlight dari atas di ruang gelap, vignette berat, warna tenang tidak jenuh; flashback gelap + grain. (Spotlight, Flashback)
4. Karakter chibi kecil dengan mata titik; dokter berkacamata di panel diagonal; montase 2-3 panel (rantai | joker | anak) sebagai potongan metafora. (Panels, diagonal)
5. Speech bubble krem tebal dengan dialog pendek bahasa percakapan. (Bubble)
6. Data = grid/grafis sederhana: deretan siluet (1 dari 10 ditandai), kardus berisi organ, kapal kontainer malam; kartu koleksi item melayang mengelilingi bola dunia berwarna ungu-pink. (CrowdRow, OrbitCards/TradingCard)
7. Sticker lower-third dua warna untuk keyword baru ("Lagi cari / GINJAL / dibeli mahal (banget)"). (Sticker)
8. Props kontekstual bertuliskan ("SEMUA HABIS", papan harga) saat flashback sejarah; latar gelap + noise.
9. Subtitle muncul kata-demi-kata (typewriter) + baris kecil sumber (WHO/UNODC) di bawah. (TypeSubtitle, SourceLine)
10. Letterbox hitam atas-bawah pada adegan sinematik. (Letterbox)
11. Watermark logo kecil kanan-bawah; ritme potong 3-6 s; kamera zoom lambat.

## Yang BELUM terpetakan (jujur)
- Gerak per-frame di antara frame sampel (mis. berapa frame durasi bounce, easing tepat tiap objek), karena yang kudapat hanya potongan statis. Nilai di kit (spring damping 11-15, stiffness 110-180, whip 7 frame, ink 18 frame) adalah estimasi yang masuk akal, bukan salinan tepat.
- Audio (musik, SFX, gaya narator): tidak bisa kutangkap dari browser ini.
- Karakter mereka sengaja tidak disalin.
- Jika mau lebih rapat lagi: kirim daftar timestamp momen favoritmu, aku ambil deret frame 0.3 s di sana.

---
# ROUND 3 - Analisis dari file video asli (5 video, ffmpeg)
Video: Antidote "Atomic Habits" (30:16), Antidote "Psychology of Money" (33:15), Kok Bisa? "How Rich Are the Richest" (15:58), "Caffeine" (4:03), "Black Market" (4:09). Semua 1280x720, 30 fps. CATATAN: file unduhan TIDAK punya jalur audio, jadi musik/SFX/gaya narator tidak dianalisis.
Metode: deteksi cut (scene score), contact sheet seluruh durasi (ratusan frame), deret frame 10-30 fps di transisi, sampling piksel untuk palet. Semua frame sheet dibaca satu per satu untuk 5 video (sheet ringkas, bukan setiap frame 30 fps).

## 1. Ritme (terukur)
- Antidote: hampir TANPA potongan keras. Atomic Habits 9 cut keras / 30 menit; Psychology of Money 31 cut / 33 menit (median ~60 s). Perubahan terjadi lewat objek yang masuk/keluar di latar yang sama, zoom/pan kamera, dan kartu bab. Ritme = "elemen baru tiap 2-4 detik", bukan potongan scene.
- Kok Bisa?: potongan jelas, median 3.2 s (Caffeine), 6.6 s (Rich), 8.0 s (Black Market); shot terpendek 0.6-1.9 s untuk efek komedi/kejut. Kamera selalu bergerak di dalam shot (drift/zoom/parallax).
- Implikasi Video 02: pakai gaya Antidote untuk penjelasan konsep (satu latar, banyak elemen muncul bertahap) dan gaya Kok Bisa untuk beat cerita/kejut (potong cepat 3-6 s).

## 2. Transisi (terukur dari frame 30 fps)
- Kok Bisa WHIP: ~5 frame scene lama menyapu & blur horizontal, ~6 frame scene baru de-blur dari kanan; total ~12 frame @30fps (~0.4 s) = 4+5 frame @24fps. Dipakai antar-beat cerita. (WhipOut/WhipIn, default sudah disesuaikan)
- Kok Bisa LOGO STING: scene -> lingkaran merah brand muncul dari banyak titik, tumbuh menutup layar dalam ~6 frame @10fps (~0.6 s) -> kartu merah polos -> logo "kok-bisa?" digambar outline ~1.2 s lalu terisi. Letak: setelah cold-open ~18-24 s. (CircleBurstWipe + StrokeLogo)
- Kok Bisa: blank color flash (kuning, biru muda, coklat, ungu) antar-bagian sebagai "napas" ~0.3-0.5 s; fade-through-black antar-segmen besar; dissolve di momen suram; flash putih 1-2 frame di benturan/kejut (karakter berubah putih).
- Antidote: kartu bab = dip hitam ~0.3 s -> warna penuh. Perpindahan beat = objek lama keluar pop/slide, objek baru masuk; "pull-back reveal": objek dalam frame hitam mengecil sementara dinding galeri berisi salinannya terungkap (2.5 s, easing out). (PullBackReveal)
- Kamera: zoom sangat pelan konstan (Antidote), drift + parallax (Kok Bisa).

## 3. Palet (sampling piksel)
- Kok Bisa brand merah #FC4045 (kartu logo, label, tombol); latar adegan pastel desaturasi (mint rumah sakit #778781, krem kulit #E3BBA7), malam navy-ungu; seri uang: hijau gelap #0F2A2D + hijau neon #2FB432/#9BF05A, emas koin #E9B93A.
- Antidote: hitam #101010 (33% frame, berbintang) sebagai dasar, aksen kuning #F0D070/#F5C842, teal #50D0D0, plum #160032-#301050, pink #B73058/#F09090, krem #EBD8C8 (Psychology of Money 21% frame). Satu bab = satu warna dominan.
- Aturan: 1 warna dominan per scene + 1 aksen kontras + putih/hitam teks; jangan >4 warna jenuh sekaligus.

## 4. Tipografi
- Antidote: tulisan tangan (Kalam/Patrick Hand style) untuk narasi/diagram/kutipan; judul display tebal huruf kapital (LOOK RICH); kapur putih pada papan hitam; keyword di strip kuning/pink bertulisan tangan.
- Kok Bisa: sans geometris tebal (Poppins/Inter Bold) untuk angka, label, lower-third; angka besar di atas ("$1.000.000.000") dengan konversi lokal kecil di bawah ("Rp 17,8 triliun").

## 5. Pola grafis tambahan (semua sudah jadi komponen di kit)
- Antidote: kutipan bubble putih di atas cutout tokoh bergaya sticker-outline + nama pink script (OutlinedCutout+Bubble); papan kapur hitam dengan diagram Venn/garis; sticky note kuning ("I am a writer", StickyNote); KeyTag kuning; kuadran cue/craving/reward/response (Quadrant); timbangan choice vs identity (Scale); platform bulat pink 3D (Stage); mockup UI YouTube/Instagram; BREAKING NEWS koran; bidak catur sebagai metafora; kolase halftone hitam-putih dengan bingkai krem; grafik garis digambar sambil muncul + anotasi kecil; isometric room (One space one use); icon bergaya stiker.
- Kok Bisa: blok hijau isometrik untuk perbandingan skala uang (IsoBlock) + angka di atas; grid 4x2 medali tokoh dengan nama+perusahaan (MedalGrid); kartu koleksi melayang di sekitar globe (OrbitCards); deretan siluet 1-ditandai (CrowdRow); crowd cangkir kopi membangun dari bawah sambil latar menghangat (CrowdBuildUp); sunburst di balik karakter (Sunburst); PiP dengan meter (PipMeter); name tag merah + sublabel hitam (NameTag); sticker lower-third; baris "Sumber:" di kiri bawah (SourceCaption); props berlabel ("SEMUA HABIS"); tombol merah besar berlabel untuk pilihan "A atau B".
- Karakter Kok Bisa: chibi, mata titik, skala bervariasi, squash/stretch; Antidote: vektor stok proporsional, tidak satu karakter tetap. Leo kita = chibi ala Kok Bisa, tapi Leo tetap original.

## 6. Pop-in & gerak (terbaca dari burst)
- Objek dalam Kok Bisa: masuk dengan sedikit overshoot ~6-8 frame, lalu "idle" (bob/napas); karakter selalu ada gerak kecil (kepala miring, kedip) sebelum ada dialog.
- Antidote: elemen diagram muncul berurutan 8-14 frame sekali, garis digambar 14-36 frame, teks muncul dengan pop kecil; bintang latar berkedip konstan.
- Nilai kit (spring damping 11-15) tetap estimasi; untuk presisi per objek perlu burst di titik tertentu.

## 7. Aturan untuk Video 02 (turunan)
1. Cold open 15-20 s -> CircleBurstWipe + StrokeLogo "Penny Logics" 1.5 s (brand sting).
2. Beat penjelasan = Scene gaya Antidote (latar hitam berbintang / krem / plum, elemen bertahap, HandTitle, KeyTag, Quadrant, Scale, LayerCake, DrawCurve).
3. Beat cerita/kejut = gaya Kok Bisa (shot 3-6 s, Whip, Sunburst, PipMeter, Bubble, NameTag).
4. Bab: ChapterCard dengan warna berbeda tiap bab + titik progres.
5. Angka besar: CountUp + SourceCaption; perbandingan skala: IsoBlock atau dua panel.
6. Tidak lebih dari 1 transisi per 6 s; whip di antara beat cerita, dissolve di momen berat, dip-hitam di antara bab.
7. Aturan lama (alignment, gap, SFX hanya pop/whoosh/kaching/card_tap, musik di akhir) tetap.

## 8. Yang masih tidak terukur (jujur)
- Audio (tidak ada jalur audio di file). Kalau mau, unduh ulang dengan audio untuk analisis loudness dan kapan SFX berbunyi.
- Easing tepat tiap objek: butuh burst per objek; nilai kit adalah estimasi.
- Font persis: dicocokkan secara visual (Kalam/Patrick Hand ~ tulisan tangan, Poppins ~ sans Kok Bisa).
