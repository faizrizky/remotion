# Video 01 — Tambahan Props & Aturan Leo (27 Okt 2026, permintaan owner)

## A. Aturan baru
1. Leo TIDAK ada di semua scene. Trick 3 sampai Outro = penjelasan fokus (gaya Kok Bisa Trick 1): objek/ikon berlabel pill, panah putus-putus, koin bergerak, kartu stat, counter angka, bar/donut animasi. Tanpa karakter.
2. Leo hanya CAMEO: maksimal 1 scene per part (<=30% durasi part), hanya saat narasi menyebut dia / reaksi emosional / disclaimer / salam penutup.
3. Pengganti Leo untuk "pelaku": ikon orang generik flat (3 persona, lihat C) — bukan Leo.
4. Gerak: objek masuk spring/slide 0.4s sesuai kata kunci, label pill pop, panah digambar (stroke-dashoffset), koin terbang mengikuti arah uang, angka count-up. Kamera statis atau zoom pelan 1.00→1.04.
5. Semua prop baru: PNG transparan, outline #191411, palet channel, disimpan di Channel/Objects (master) lalu salin ke remotion/public/obj_*.png.

## B. Rencana scene & Leo per part
| Part | Scene (kata kunci narasi) | Leo |
|---|---|---|
| Trick 2 (50s) | 0-12: kartu→kalender jatuh tempo→koin bunga mengalir ke bank ("bunga atas sisa") | -- |
| | 12-19: Fed building + speedometer APR ~22% | -- |
| | 19-26: kartu toko + "up to 30%" | -- |
| | 26-33: "$5,000 sepanjang tahun" | CAMEO (1 scene): Leo pegang kartu + counter bunga $1,100 + "buys nothing" |
| | 33-47: bar chart $105B→$160B + mesin/gear ("the engine") | -- |
| Trick 3 (46s) | 0-4.8: "cashback dan poin... uang kembali?" | CAMEO (1 scene) |
| | 4.8-22: dokumen studi CFPB, donut 94%/27% (carry balance) | -- |
| | 22-35: donut 6%/73% (bayar penuh) | -- |
| | 35-46: dompet A -> dompet B, koin mengalir (poin dibayar bunga) | -- |
| Trick 4 (46s) | 0-12: statement, minimum payment menyala, treadmill (balance tetap hidup) | -- |
| | 12-31: donut/bar 15% minimum only (CFPB 2024) | -- |
| | 31-42: 4 tag fee (late, cash advance, transfer, annual) masuk ke bank, "tens of billions" | -- |
| Customers (43s) | Pintu 1/2/3 + persona ikon + koin; seesaw penutup | TIDAK ADA Leo |
| What This Means (23s) | 0-13: tool/workbench + kartu, persimpangan 3 pintu | -- |
| | 13.7-20.5: disclaimer / advisor | CAMEO (1 scene) |
| Outro (13.5s) | 0-6: tap kartu → terminal → mesin besar | -- |
| | 6-11: teaser BNPL (HP + 4 cicilan), area end screen x1100-1790,y230-930 kosong | -- |
| | 12-13.5: "See you there" | CAMEO Leo wave |

## C. Daftar penambahan props (belum ada; yang sudah ada: card, coffee, coin, coin_dollar, coinstack, bank, bill, bridge, doors, giftbox, 4 hand, monster, seesaw, snowball, statement, terminal, wallets, bld_cfpb/fed/nilson/stlouisfed)
### Umum (dipakai banyak part)
- kartu kredit varian warna: kartu toko (coral), kartu travel (biru), kartu cashback (mustard), kartu "minimum" (abu); kartu belakang/stack of cards
- ikon persentase / badge "%" ; tanda panah besar; tanda silang & centang; tanda peringatan segitiga
- ikon orang generik flat x3 (persona: tenang/bayar penuh = biru, menimbang/revolver = kuning, terdesak = coral) + variasi pose duduk
### Trick 2
- kalender "Due date" (lingkaran merah) + strip kalender 12 bulan
- speedometer/APR gauge
- kartu toko + shopping bag + label toko
- bank/vault dengan pipa koin masuk (interest pipe)
- kran bocor/pipa koin (uang menguap "buys nothing")
- bar chart 2 batang ($105B, $160B) — dibuat dengan kode
- mesin/gear besar dengan corong koin ("the engine")
- bendera/peta AS kecil
### Trick 3
- boarding pass + ikon pesawat; kursi lounge
- ikon cashback (koin berputar balik) ; bintang poin
- clipboard/dokumen studi + kaca pembesar
- donut chart 94/6 & 27/73 — dibuat dengan kode
- dompet A (stres/merah) dan dompet B (premium/emas) varian dari obj_wallets
- pipa/aliran koin antar dompet
### Trick 4
- statement dengan highlight "Minimum payment"
- treadmill (lari di tempat)
- timbangan balance / bar saldo yang menyusut pelan vs bunga naik
- jam/amplop "late fee"; mesin ATM "cash advance"; dua kartu + panah "balance transfer"; tiket "annual fee"
- tumpukan koin besar "tens of billions"
### The Three Customers
- 3 pintu individual (biru/kuning/coral) yang bisa dibuka + isi balik pintu
- 3 persona ikon (lihat umum); label "Nickname: DEADBEATS"
- kalender loop "interest every month, for years"
- ikon rantai putus / bendera merah "default"
- seesaw (ada) + 3 ikon di atasnya
### What This Means
- toolbox: palu, kunci inggris, obeng; workbench
- tanda arah/persimpangan 3 jalan
- ikon "licensed professional" (orang berkacamata + sertifikat) + badge "Education only, not financial advice"
### Outro
- HP dengan layar "Pay in 4" + 4 lingkaran cicilan (teaser BNPL)
- gelombang tap (NFC waves) pada terminal
- frame end-screen placeholder (hanya kotak area kosong, tidak dirender)

## D. Catatan produksi
- Prop baru digenerate Gemini (Nano Banana) per sheet 3x3, transparan lewat pemrosesan, disimpan di Channel/Objects. Chart/donut/bar/gauge sebaiknya dikode di Remotion (SVG) agar angka akurat.
- Scene tanpa Leo harus tetap penuh: komposisi tengah, objek utama >= 35% lebar frame, 1 ide per scene.

## E. Toolkit animasi (kombinasi gaya Trick 1 + Hook) — tambahan 27 Okt
Dari Hook (dipertahankan): panel split vertikal yang masuk satu-satu dari atas/bawah (sesuai kata), banner pill besar di atas ("3 companies just got paid"), warna panel berbeda per item, ikon+label pill di tiap panel, koin kecil di bawah tiap panel, zoom pelan pada objek yang dibahas.
Dari Trick 1: objek berlabel pill + panah putus-putus yang digambar, koin terbang mengikuti aliran uang, kartu stat dengan count-up, label berubah (strikethrough/harga naik).
Aturan kombinasi: 1 teknik utama per scene (jangan ditumpuk); teks penjelas tetap diam saat kamera bergerak; zoom ke 1 objek boleh lalu pan pelan setelahnya; tidak ada overlap; subtitle tetap tengah bawah.

Pemetaan:
| Part | Scene | Teknik |
|---|---|---|
| Trick 2 | bunga atas sisa tagihan | Trick 1: kartu->kalender->panah->koin ke bank |
| Trick 2 | 22% APR / store card 30% | Hook: 2 panel (Fed vs toko) masuk dari atas/bawah + gauge |
| Trick 2 | $105B -> $160B | stat card + bar count-up + engine |
| Trick 3 | studi CFPB 94%/27% vs 6%/73% | Hook: 2 panel split (carry balance vs pay in full) + donut count-up |
| Trick 3 | dompet A -> B | Trick 1: aliran koin berlabel |
| Trick 4 | 4 jenis fee | Hook: 4 panel vertikal masuk satu-satu (late, cash advance, transfer, annual) + banner "Together: tens of billions" |
| Trick 4 | minimum payment | Trick 1: statement + sorot angka + treadmill |
| Customers | 3 jenis customer | Hook: 3 panel vertikal (pintu 1/2/3 + persona ikon), panel aktif menyala, lainnya redup |
| What This Means | 3 pintu / alat | Hook: banner + 3 panel; workbench zoom pelan |
| Outro | tap -> mesin -> BNPL | Trick 1: aliran + zoom ke terminal; teaser HP "Pay in 4" 4 panel cicilan |
