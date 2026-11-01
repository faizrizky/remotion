# Hook Video 01 — restyle "scifi-toon" (draft, 27 Okt)
**ARSIP:** eksperimen ini dibatalkan (gaya lemo-opuscar tidak dipakai). Disimpan hanya sebagai catatan.

Sumber gaya: lemo-opuscar `styles/scifi-toon/STYLE.md` (MIT). Plugin lemo-opuscar@lemolab terpasang di container cloud sesi Claude (bukan di PC owner).
Naskah/timing TIDAK berubah: Andy/Hook.wav 23.32 s, 3 scene (C01 café 0–8.6, C02 tiga panel 7.5–13.2, C03 "they profit either way" 13.1–23.32). Anchor kata dari timing, bukan tebakan.

## Yang diambil dari STYLE.md
- Garis: ~7 px karakter/prop, 4–6 px background, near-black sedikit ungu (#1A1420 mis.), konstan di screen space; BOIL: outline bergetar ~1.7 px, 3 gambar bergantian @12 fps (termasuk pose diam & background).
- Warna flat saja, bayangan hard-edge, TANPA gradient; glow = flat translucent ring dan hanya untuk satu elemen "device" (usul: kartu yang di-tap / terminal).
- Satu palette 3–5 warna per "world": C01 café = beige/coklat bland (suspiciously normal); C02 panel = mint/pink/kuning channel (tetap) ; C03 = ungu-biru + emas.
- Karakter animasi on twos (12 fps), kamera/properti terbang on ones (24 fps). Setiap gerak ada anticipation. Setelah gambar absurd -> reaction close-up. Transisi: swirl wipe atau hard cut, TIDAK dissolve.
- Subtitle bawah-tengah, rounded heavy sans putih outline hitam (aturan channel tetap: Poppins), min hold 1.8 s; wajah di luar 170 px bawah.
- Sound: skor sintetis (theremin lead, bass analog, arpeggio square), diam sebagai punchline, master -14 LUFS, musik duck -7 dB di bawah dialog.

## Batasan (jangan dilanggar)
- Jangan meniru show/karakter/siluet/catchphrase yang ada; jangan sebut nama show sumber. Leo/Mira tetap karakter asli channel; tidak ada lab coat putih + rambut spiky, tidak ada sparkly eyes/gradient.
- Konten finansial tetap: disclaimer "Education only, not financial advice" di C03; angka tidak berubah.
- Aturan layout channel tetap menang: TOP 60–210, CONTENT 230–930, CAPTION 945–1035, overlap 0, gap >=24 px, tanpa pedestal / garis putih di bawah objek.

## Adaptasi per scene (usul)
- C01: mulai "mid-disaster"/mundane: Leo + kopi $5, kartu di-tap -> terminal squash + ring glow tunggal (satu-satunya glow). Reaction close-up wajah Leo "proud" setelah poin muncul.
- C02: 3 panel masuk dengan swirl wipe tipis, tiap panel boil; tangan mengambil koin; banner "3 companies just got paid".
- C03: "They profit either way" papan A/B; terminal membuka jadi mesin (portal-style overshoot 12% hanya untuk terminal); tutup dengan callback ke kalimat pertama bila cocok.

## Status
Belum dirender. Perlu PC owner tersambung (Remotion project di E:\Faiz Projects\Channel\remotion) + persetujuan owner untuk perubahan gaya sebelum Antigravity mengerjakan.
