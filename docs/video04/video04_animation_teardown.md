# Bedah animasi: "How Are Americans Buying $80,000 Trucks on a $70,000 Salary?" (The Infographics Show, 17:30)

Dibuat 7 Nov 2026 dari mp4 yang diunggah owner. Tujuan: mencatat CARA animasinya (penjelasan, transisi, gerak kamera, animasi objek/orang) per menit, lalu memetakannya ke kit Penny Logics. Yang diambil hanya teknik; gambar, karakter, dan teks mereka tidak dipakai ulang (aturan 1.37).

## Cara analisis
- **Gerak kamera diukur otomatis:** video diturunkan ke 8 fps, lalu dihitung pergeseran dan zoom global antar-frame (optical flow + affine). Persen "dx/dy" = seberapa jauh layar bergeser relatif lebar/tinggi layar.
- **Potongan scene:** deteksi perubahan frame (ambang 0,25).
- **Isi visual:** contact sheet tiap 2 detik untuk semua menit, ditambah close-up 5 fps pada 12 transisi.
- **Batasan:** pengukuran gerak ikut terpengaruh objek yang bergerak, jadi angkanya perkiraan.

## Ringkasan besar (angka)
| Hal | Nilai | Arti |
|---|---|---|
| Hard cut | hanya 12 dalam 17,5 menit | Hampir semua pergantian lewat wipe atau gerak kamera, bukan potong langsung |
| Kamera diam | sekitar 9% waktu | Kamera hampir selalu bergerak |
| Zoom-out pelan (Ken Burns) | sekitar 43% waktu, median ±5,5% per detik | Gerak dasar saat narasi "menahan" satu gambar |
| Zoom-in (push-in) | sekitar 26% waktu, median ±7% per detik | Dipakai untuk menekankan angka, papan, wajah |
| Geser kiri/kanan | sekitar 37% waktu, median ±94 px/detik (di 1080p) | Jauh lebih cepat dari batas kita sekarang (15 px/detik, aturan 1.18) |
| Geser atas/bawah | sekitar 30% waktu | Pola khas: buka dari langit lalu turun ke adegan |
| Tempo narasi | sekitar 160 kata/menit | Satu angka baru tiap 10–15 detik |

## Katalog teknik (dipakai berulang)
### A. Gerak kamera
1. **Zoom-out pelan saat menahan gambar** (Ken Burns), sekitar 5% per detik, tidak berhenti selama narasi.
2. **Push-in ke teks/angka** (papan reklame, papan tulis, koran): zoom 1,3x–2,6x dalam 2–5 detik.
3. **Buka dari langit, turun ke adegan** (tilt-down, sekitar 1–1,5 detik): 0:16, 1:02, 9:18, 16:54. Langit kosong dipakai sebagai "jeda napas" antar-bagian.
4. **Pull-back reveal:** mulai dari wajah close-up, lalu mundur dan bergeser untuk memperlihatkan karakter itu sedang menunjuk papan grafik (0:10–0:15) atau sedang menyetir ke tepi jurang (8:12–8:20).
5. **Tracking dengan kendaraan:** kamera ikut mobil yang berjalan, latar bukit bergeser (parallax), angka muncul di samping mobil (2:02, 4:10, 9:20).
6. **Pan panjang menyusuri jalan/kantor** (sampai 7 detik, 15:26) untuk memperlihatkan "banyak" (deret mobil dijual, lantai kantor penuh trader).
7. **Tilt ke atas dari orang ke benda** (dari karakter ke layar laptop 4:54; ke grafik raksasa di dinding 10:28).

### B. Transisi (hampir tanpa hard cut)
| Nama (versi kita) | Contoh | Durasi | Bentuk |
|---|---|---|---|
| Splatter dissolve | 0:10, 2:12 | 0,4–0,8 dtk | Gambar pecah jadi bercak/partikel cat lalu adegan baru muncul dari bercak |
| Swirl / vortex | 3:42, 14:01 | sekitar 1 dtk | Pusaran dari satu titik (tangan karakter) menelan layar, lalu adegan baru keluar dari pusaran |
| Sapuan kuas | 4:28, 14:01 | 0,5 dtk | Goresan kuas melengkung menyapu layar |
| Shatter (kaca pecah) | 0:24, 5:06, 9:48 | 0,5 dtk | Layar retak jadi beling bergerigi, terlempar |
| Puff awan | 5:48, 13:46 | 0,4 dtk | Awan putih meletup menutup, lalu terbuka |
| Iris lingkaran | 13:42 | 0,6 dtk | Lingkaran hitam membesar dari tengah |
| Benda menyapu layar | 15:22 | 0,5 dtk | Papan "SALE" atau mobil melesat menutupi layar |
| Daun/partikel terbang | 6:44 | 0,6 dtk | Partikel tertiup lalu grafik muncul |

### C. Teks dan angka
1. **Pill putih tebal** (teks hitam kapital di kotak putih bersudut bulat) yang pop di tengah, sering ditumpuk dua baris: baris kedua muncul setelah baris pertama (0:42–0:45).
2. **Huruf memantul satu per satu** ("NEW CAR", 2:13): tiap huruf jatuh dan memantul, total sekitar 0,6 detik.
3. **Teks bergelombang/terbang masuk** ("THEY WANT...", 3:44).
4. **Kartu pertanyaan** besar penuh layar ("So how did so many Americans...?") sebagai jembatan antar-bagian, di latar berpola.
5. **Chip konteks di kiri atas:** "LOCATION: Texas", "DATE: 2024" dengan ikon kecil.
6. **Label sumber di tengah bawah** ("FACT SOURCE: ...") di setiap angka.
7. **Baris angka yang dibangun** di samping objek: "$40,000 LOAN / 60 MONTHS / $7,500+ INTEREST", lalu baris diganti ("84 MONTHS / $10,700+") tanpa menghapus seluruh layar (4:14–4:27).
8. **Penghitung ganda berjalan:** "MILEAGE" naik sementara "VALUE" turun selagi truk melaju (9:27–9:33). Sangat jelas untuk menjelaskan depresiasi.

### D. Grafik dan alat bantu
1. **Bar horizontal tumbuh + label** (TEXAS 320,000, FLORIDA 222,000) dan **pill kuartal Q1–Q4 terisi satu per satu** (0:48–0:57).
2. **Pai di papan tulis** yang tergambar dari 0 (7:38, 12:28, 16:13); papan dihapus lalu pai baru digambar.
3. **Grafik garis** dengan cahaya merah (6:46).
4. **Bar 7 blok = 7 tahun:** 2 hijau "with warranty", 5 merah "without warranty" (4:40–4:45).
5. **Timbangan:** "CAR VALUE" (truk) vs "LOAN BALANCE" (tumpukan uang) dengan meteran jarum (5:08–5:15).
6. **Bar perbandingan merah vs hijau** dengan angka kelipatan (1.88x, 2.65x, 16.6x) yang berganti (12:46–12:58).
7. **Kalender** dengan tanda X merah muncul satu per satu (14:26).
8. **Meja tampak atas:** papan klip masuk, formulir terisi, tanda tangan tergambar sendiri (3:00–3:08, 10:04–10:12); stempel "DENIED" menghantam dengan sedikit getar (7:18).
9. **Struk/tagihan panjang** yang terurai sampai lantai (1:56, 5:56, 17:14).
10. **Notifikasi ponsel** ("Your payment is past due", "credit score lowered from 720 to 610").
11. **Koran berputar masuk** + kolase koran (13:06).
12. **Layar terbagi:** telepon dua orang (9:50), dua bank (13:48).

### E. Animasi karakter dan objek
- Karakter bicara dengan mulut bergerak dan sedikit goyang badan; ganti pose saat poin berubah (berdiri → kaget memegang kepala → menunduk).
- Pose kunci yang berulang: kaget (tangan di kepala), menunjuk papan dengan tongkat, duduk lemas di trotoar, membaca koran dari belakang bahu, menelepon.
- Kendaraan: ban berputar dan bodi sedikit naik-turun; truk derek mengangkat mobil.
- Efek emosi: tanduk dan api di CEO (0:29), dentuman/bintang benturan di kepala (5:44), api di sekitar karakter terantai (3:28).
- Metafora visual: kuburan (mobil sitaan), jebakan beruang di sekitar truk (1:08), bola rantai "7" (7 tahun cicilan), tepi jurang, ATM/piggy bank kosong, kerumunan demo.
- **Callback di akhir:** adegan pembuka (truk di jalan, bank, truk derek) dipakai lagi di menit 16:54–17:20, jadi cerita terasa menutup lingkaran.

## Per menit
| Menit | Isi dan cara menjelaskan | Kamera | Transisi | Animasi objek/orang |
|---|---|---|---|---|
| 0:00–1:00 | Kuburan → lapangan truk; grafik utang mobil 2008–2026; dealer "only $699/month"; dewan bank; keluarga kehilangan mobil; data repo per negara bagian; ditutup kartu pertanyaan | drift turun; pull-back dari wajah ke papan grafik (0:11–0:15); tilt dari langit ke dealer (0:16); push-in 1,8x ke papan reklame (0:19–0:23); pan kanan ke CEO; zoom-out sambil pan kiri ke truk derek (0:35–0:41) | splatter (0:10); shatter (0:24); hard cut ke kartu TEXAS (0:46) | papan reklame meluncur dari kanan; tanduk + api; pill bertumpuk; bar tumbuh + pill kuartal terisi |
| 1:00–2:00 | Mobil dijual; jebakan beruang; uang $1,7 triliun vs PDB Turki; 2x 2010; pendapatan pemakai jasa konseling utang $50k → $75k; "middle class drowning"; harga mobil +35% | tilt dari langit (1:02); push-in 1,9x–2,5x ke papan tulis (1:26–1:33); pan kanan 76% di jalan (1:47) | percikan air dari tangan (1:24) | tumpukan uang tumbuh; tumpukan kertas; angka ditulis di papan; struk panjang terurai |
| 2:00–3:00 | Pasangan menyetir truk $65k; cicilan mobil baru $761 vs bekas $570, +$300; koran "1 in 5 loans > $1,000"; truk populer; celengan "NEW CAR" | tracking dengan truk; pan kanan + turun menyusuri kota (2:40–2:48) | partikel (2:12) | huruf memantul; dua kolom bergeser ke kiri-kanan; angka hijau +$300; sinar panggung di belakang truk; koin masuk celengan |
| 3:00–4:00 | Kontrak 84 bulan ditandatangani; bank menyetujui pinjaman $44k; "rantai 7 tahun"; dealer licik; 27,5% pinjaman 72+ bulan; "drag them under" | push-in panjang 2,6x ke meja bank (3:12–3:17); zoom-out di showroom | swirl dari tangan (3:42); asap (3:30) | formulir terisi + tanda tangan; bubble chat; api; pai 27,5% tumbuh; huruf terbang |
| 4:00–5:00 | Pakar bicara di depan mikrofon (orang nyata digambar, tidak boleh kita tiru); $50k→$60k; contoh $40k 60 vs 84 bulan; "where did all my money go"; garansi 2–3 tahun vs pinjaman 7 tahun; berita depresiasi | tracking mobil merah (4:10–4:14); tilt atas ke laptop (4:54) | sapuan kuas (4:28); puff asap (4:36) | mikrofon pop dari bawah; baris angka diganti; bar 7 blok terisi hijau/merah |
| 5:00–6:00 | Nilai turun 30% dalam 2 tahun; timbangan nilai vs pinjaman; kutipan media sebagai bubble karakter; telat bayar; "at least the bank takes it back, right?"; struk sisa utang | pan kiri 81% di timbangan (5:09); zoom-out | shatter (5:06); puff awan (5:48) | jarum meteran; celengan dikocok; pill merah "MISSED PAYMENT"; bintang benturan |
| 6:00–7:00 | Sisa utang rata-rata $11k; biaya derek $200–$1,000+; bank sebagai karakter bola; tukang tagih berjas hitam; repo naik 2022–2024 | zoom-out reveal papan; tilt turun (6:18); pan kiri-kanan di rumah | daun/partikel (6:44) | lengan "BANK" mengambil mobil; grafik garis merah; notifikasi ponsel |
| 7:00–8:00 | Skor kredit turun; asuransi ditolak; negative equity $8,000 dicontohkan; pai 23,9% (2024) → 2023; POV dalam mobil; "financially vulnerable" | zoom-out sangat panjang 0,38x menyusuri gudang kertas (7:44–7:51); tilt atas/bawah di dalam mobil | papan tulis dihapus dan digambar ulang | stempel DENIED; map terbuka; label nilai/pinjaman ditulis |
| 8:00–9:00 | Rata-rata $7,200, truk $10,000+; karakter menyetir ke tepi jurang; kutipan analis Edmunds dengan foto asli; "is it only the consumer's fault?"; masuk ke ABS | zoom-out + pan kanan 113% dari wajah ke jurang (8:13–8:18); tilt atas (8:52) | kartu berpola | kutipan diketik baris demi baris (gaya mesin tik); map ABS, kotak pinjaman |
| 9:00–10:00 | Demo "banks are the problem"; "fatal flaw"; penghitung jarak naik + nilai turun; sisa utang setelah dijual; telepon penagih | tilt turun 108% (9:04); dari langit ke truk (9:18); tilt naik 94% (9:35) | shatter (9:48) | kerumunan dengan papan; penghitung ganda; layar terbagi telepon |
| 10:00–11:00 | Opsi bangkrut (checklist); eksekutif santai; obligasi "Drive 2019-3"; bunga 22,05% vs 6,55% | push-in 2,15x ke checklist (10:08); pan kanan 90% lantai trading; tilt naik 123% ke grafik raksasa (10:28) | swirl | checklist + tanda tangan; kertas bunga dipegang dua karakter |
| 11:00–12:00 | Meja rapat tampak atas; sidang; CEO pemberi pinjaman subprime digambar (tidak boleh kita tiru); dokumen 18/22/25%; ABS $37 miliar 2022 vs 2012 | tilt turun 78%; pan kanan 51% | kartu pertanyaan berpola | tumpukan dokumen; panah merah turun; tagihan panjang di dapur |
| 12:00–13:00 | Dealer "buy here pay here"; nasabah ditolak; pai 78% vs 27% subprime; bar kelipatan 1.88x/2.65x/16.6x | tilt turun + zoom-out ke toko (12:12–12:18); pan kanan 93% | huruf memantul | mobil masuk parkiran; bar merah tumbuh dan angka berganti |
| 13:00–14:00 | 5% saldo; kebangkrutan dan tuduhan SEC (koran, berkas); brankas kosong; dua bank | push-in 2,2x sambil pan kanan (13:10–13:14) | iris hitam (13:42); puff (13:46) | koran berputar masuk; teks tuduhan diketik; layar terbagi + simbol $ |
| 14:00–15:00 | Dampak ke konsumen; ibu dan anak; brankas kosong; "roll rates"; kalender X; tunggakan 60 dan 90 hari | push-in 2x–3,4x beruntun | vortex + kuas (14:01) | kalender X; ponsel "overdue 90 days"; huruf memantul |
| 15:00–16:00 | Tunggakan 90+ sekitar 2%; peta AS dengan hujan simbol; $1,66 triliun; deret mobil dijual; harga mobil bekas bisa turun 4% | pan kanan panjang 154% selama 7 detik (15:26) | mobil "SALE" melesat (15:22) | hujan simbol $ dan %; kolase koran |
| 16:00–17:00 | Pensiunan khawatir; pai dana pensiun publik (kredit swasta); koran keuangan; "do you know where our pension is invested?" | zoom-out; kembali ke truk dari langit (16:54) | percikan hijau (16:44) | bubble chat; pai tumbuh |
| 17:00–17:30 | "They're not"; callback bank dan truk derek; layar akhir "Watch this" | zoom-out + pan kiri | - | struk panjang; truk derek |

## Bedah ulang frame demi frame (7 Nov malam, setelah koreksi owner)
Koreksi: bedah pertama hanya melihat 1 frame per 2 detik + 12 transisi, jadi banyak animasi terlewat. Bedah ulang: SELURUH video 2 frame per detik (2.100 frame, 18 lembar per menit) + 6 frame per detik di titik yang owner sebut. Semua pola di bawah tercatat dengan contoh waktunya.

### Titik dari owner (dicek 6 fps)
| Waktu | Yang terjadi (urutan frame) | Nama di kit |
|---|---|---|
| 0:07.3–0:09.5 | Truk berbaris lewat; latar **digelapkan sekitar 50% dalam 0,2 dtk**; pill putih "$80,000 TRUCKS" pop dari kecil ke penuh; pill diam di atas latar gelap; dari sudut pill keluar cairan biru yang menyapu layar | `DimPill` |
| 0:10.0–0:15.6 | Wajah close-up meluncur masuk dari kiri (sedikit memantul) → kamera mundur pelan; di belakangnya papan tulis besar muncul: grid dulu, lalu garis grafik tergambar kiri→kanan, judul dan tahun diketik huruf per huruf; kamera terus mundur sampai papan, tiang, dan ruangan terlihat; ditutup sinar putih pecah | `PullBackBoard` |
| 1:09.3–1:14.0 | Ledakan tinta hitam dari tengah → latar marun; **tumpukan uang dibangun bertahap**: 2 ikat muncul, lalu lapisan demi lapisan jatuh dan memantul kecil sampai jadi piramida (sekitar 1,4 dtk); kamera mundur sedikit; teks "$1.7 TRILLION" diketik bergelombang; label sumber; lalu kamera whip ke kanan ke adegan berikutnya | `MoneyPile` |
| 6:51.5–6:52.6 | Asap knalpot kecil di belakang truk → **awan asap putih besar mengembang** menutupi truk, truk melaju keluar di balik asap, asap pecah jadi gumpalan kecil lalu hilang; orang tertinggal sendirian | `SmokeOut` |
| 6:53.1–6:54.0 | **Kepulan asap kecil muncul di lantai**, karakter BANK keluar dari asap sambil membawa kertas "CREDIT DEBT"; sisa asap pecah ke luar | `SmokeIn` |
| 7:04.6–7:08.5 | Layar pecah jadi partikel → meja tampak atas; **kamera terus geser ke kiri** (tanaman, kacamata keluar ke kanan), buku catatan masuk dari kiri atas, lalu **papan klip naik dari bawah** ke tengah dengan pantulan dan sedikit rotasi; judul diketik bergelombang | `SlideRise` |
| 14:25.0–14:30.3 | Kamera geser menjauh dari pembaca koran ke latar tosca kosong; **kalender jatuh-terbalik masuk** (berputar dari bawah seperti halaman dibalik, lalu memantul); tanda X merah muncul satu per satu sekitar 0,3 dtk sekali (1 → 7); kamera mundur pelan; ditutup ledakan sinar | `CalendarX` |

### Pola yang berulang di seluruh video
**1. Latar digelapkan + pill (DimPill).** Terjadi sekitar 14 kali: 0:07, 3:07, 3:58, 8:36, 9:16, 9:47, 10:22, 14:00, 14:04, 15:05, 15:13, 15:18, 17:02. Adegan tetap terlihat tapi gelap sekitar 50%, pill putih di tengah. Inilah satu-satunya cara teks boleh menimpa gambar.
**2. Cara benda masuk (hampir tidak pernah muncul begitu saja):**
- pop dengan pantulan (skala 0 → 1,1 → 1) untuk ikon kecil
- meluncur dari tepi layar dengan pantulan (karakter, papan, map, mobil, papan reklame)
- naik dari bawah (papan klip, mikrofon satu per satu, laptop, tiga karakter berjejer)
- jatuh dari atas dan memantul (papan SALE, pill MISSED PAYMENT)
- keluar dari kepulan asap (BANK)
- keluar dari tanah dengan cipratan (truk dari kuburan, 0:05)
- tumbuh dari satu titik (pai dari titik putih, pill merah dari kecil)
- dibalik masuk seperti halaman (kalender)
- dibangun bertahap (tumpukan uang, tumpukan koran yang beterbangan lalu menumpuk 13:05 dan 15:33)
- papan bergeser keluar lalu papan berikutnya masuk seperti karosel (1:35)
- layar terbagi dua yang meluncur (13:48)
**3. Cara benda keluar:** melaju pergi di balik asap; meluncur keluar layar; mengecil ke titik; kamera meninggalkannya (whip/pan).
**4. Teks:** diketik huruf per huruf dengan huruf bergoyang seperti ombak (hampir semua judul); huruf memantul; baris angka meluncur dari kanan; angka berputar 50K → 60K → 70K; baris dihapus lalu diketik ulang (60 MONTHS → 84 MONTHS); teks kertas muncul baris demi baris seperti mesin tik.
**5. Grafik:** bar tumbuh + angka naik; pill kuartal terisi berurutan; pai tumbuh dari titik, irisan menyapu, garis penunjuk tergambar, label diketik, irisan menyala; grafik garis tergambar dengan cahaya; bar menyusut lalu tumbuh lagi untuk metrik berikutnya (12:46–12:58); bar 7 blok menyala satu per satu lalu terisi hijau/merah.
**6. Kamera:** whip pan dari satu subjek ke subjek berikutnya (1:14); turun dari langit; geser di atas meja sambil benda lewat; tracking kendaraan; push-in; pull-back; geser antar dua tokoh yang bercakap (12:22, 9:50); tilt di dalam mobil (dasbor → spion → kursi belakang, 7:52); zoom-out sangat panjang (gudang kertas, 7:44).
**7. Karakter:** jalan masuk; isyarat (memegang kepala, menepuk dahi, menunjuk papan dengan tongkat); bicara; mengusap muka; memegang ponsel; duduk di jendela mobil; bintang benturan di kepala; tanduk tumbuh; api di sekeliling; kerumunan memegang papan yang naik-turun.
**8. Efek:** api, bara, asap kartun putih, cipratan air, tinta, sinar, hujan simbol $ dan %, cahaya pada grafik.
**9. Transisi tambahan** (selain yang di atas): cairan keluar dari benda (0:09); sinar putih pecah (0:15); garis silang seperti gunting (0:46); tangan raksasa menepuk (1:24); ledakan tinta gelap (1:09); siluet daun menyapu (6:02); paku/duri putih (6:21); partikel berhamburan (7:04); zoom tembus putih (7:21); tetesan meleleh (11:09); tirai panggung menutup (11:22); riak lingkaran (15:58); retakan garis di layar (17:23); mobil melintas sebagai wipe (12:44, 15:22); gumpalan kertas sobek (9:04); serpihan merah (9:33).

### Aturan tata letak yang terlihat di referensi
- Teks dan pill tidak pernah menimpa benda penting kecuali latar digelapkan (pola 1).
- Benda fokus (yang sedang dibicarakan) selalu utuh di dalam layar saat kamera berhenti; hanya pemandangan latar yang terpotong tepi layar.
- Penanda (label, papan nama, gelembung bicara) selalu di depan benda, tidak tertutup.

## Yang TIDAK kita tiru (bertentangan dengan aturan kita)
- **Orang nyata digambar sebagai karakter** (pakar di 4:02, CEO di 11:22) dan **foto orang nyata** (8:22). Kita hanya kartu nama + kutipan + sumber, tanpa menggambar orangnya (aturan 1.36).
- **Logo merek** (logo biro kredit di koran, nama koran besar, merek truk). Kita pakai versi generik (aturan 1.11).
- **Bingkai krisis/kemarahan** (tanduk iblis, api, "banks are the problem"). Nada kita tenang dan bersumber.

## Pemetaan ke kit Penny Logics
| Teknik referensi | Sudah ada di kit | Perlu dibuat |
|---|---|---|
| Zoom-out pelan saat menahan gambar | belum (zoom per shot dimatikan karena "lompat" saat swap, aturan 1.31) | `Drift` zoom yang berjalan terus melewati swap tanpa reset (1,00 → 1,06 sepanjang beat) |
| Push-in ke angka/papan | `frameCam(waktu, box)` | - |
| Pull-back dari wajah ke adegan | `cam` keyframe + `frameCam` | - |
| Buka dari langit lalu turun | `cam` y + `world.h` > 1080 | preset `skyOpen` (latar langit di atas panorama) |
| Tracking kendaraan + parallax | `Depth`, `move`, `trail` | latar bukit 2–3 lapis |
| Pan panjang "banyak" | World + panorama | - (dibatasi aturan 1.18) |
| Splatter / swirl / shatter / puff | ada: whip, iris, slide, rip, ink, CoinWipe | `SplatWipe`, `SwirlWipe`, `ShatterWipe`, `PuffWipe` (semua tanpa fade, sesuai aturan 1.29) |
| Pill putih bertumpuk | `Pill` | opsi `stack` (baris kedua turun di bawah baris pertama) |
| Huruf memantul / terbang | `WordPop` (per kata) | `LetterBounce` (per huruf) |
| Chip "DATE" / "LOCATION" kiri atas | `Chip kind=time` | ikon kalender/pin |
| Label sumber | `Src` | - |
| Baris angka diganti | `strike`, `match`, `BeforeAfter` | - |
| Penghitung ganda berjalan | `CountMoney`, `NumberWheel` | layout dua counter yang menempel di mobil |
| Bar tumbuh + pill kuartal | `bars`, `Bar` | `PipMeter` (sudah di backlog) |
| Pai di papan tulis | `Gauge` (setengah lingkaran) | `PieBoard` (pai yang tergambar + papan dihapus) |
| Bar 7 blok hijau/merah | - | `PipMeter` / `StepRail` (backlog) |
| Timbangan nilai vs pinjaman | `Scale` (ada di style kit, belum dipakai) | jarum meteran |
| Kalender tanda X | - | `CalendarMarks` |
| Meja tampak atas + formulir + tanda tangan | `card`, `mark`, `HandWrite` (backlog) | latar meja tampak atas (Gemini) |
| Stempel DENIED | - | `Stamp` (hantam + getar kecil, tanpa SFX ganda) |
| Struk panjang terurai | - | `ReceiptUnroll` |
| Notifikasi ponsel | `phone`, `notif` | - |
| Koran berputar masuk | - | `NewsSpin` (judul generik, tanpa logo koran) |
| Layar terbagi | `SplitCompare` (backlog) | - |
| Callback adegan pembuka di akhir | aturan satu kamera + `carry` | rencana di naskah |

## Usulan pemakaian di V4 (naskah `video04_car_script.md`)
- **Hook:** buka dari langit, turun ke lapangan trade-in. Pull-back dari wajah Leo yang kaget ke papan "Value $15,000 / Loan $22,000". Lalu dua pill bertumpuk "29.1%" dan "$7,107" plus `Src` Edmunds.
- **Bab 1:** timbangan nilai vs pinjaman dengan jarum meteran, lalu grafik dua garis (nilai turun cepat, saldo turun lambat).
- **Bab 2:** tracking mobil berjalan sambil baris angka dibangun: "$40,000 / 60 months / $813". Baris lalu diganti jadi "84 months / $625", dan bunga $8,778 → $12,537. Bar 7 blok untuk garansi.
- **Bab 3:** meja tampak atas: kontrak baru, selisih $7,107 "ditumpuk" ke pinjaman baru. Angka $57,235 / $952 / $16,610 masuk satu per satu. Callback: selisih "ikut" ke mobil berikutnya (objek terbawa).
- **Bab 4:** notifikasi ponsel, kalender X, truk derek, struk sisa utang terurai. Chip "DATE: Q2 2026".
- **Bab 5:** kartu pertanyaan berpola pastel. Pai 71% vs 29% di papan tulis.
- **Bab 6:** checklist di meja tampak atas dengan tanda tangan tergambar. Penghitung ganda "payoff" vs "value" untuk satu angka yang harus dicek.
- **Outro:** callback ke adegan pembuka (lapangan trade-in), kali ini Leo di atas garis.

## Keputusan owner (7 Nov malam)
Style 2 = 100% referensi untuk kamera, transisi, animasi, tempo, dan LATAR (termasuk latar gelap). Yang tetap gaya Penny Logics: gaya gambar karakter dan properti, watermark, sting, efek suara. Push-in sampai 2,6x; gambar yang blur ditajamkan dengan `scripts/upscale.py`. Lihat aturan 1.43.

## Latar (Style 2): katalog dari referensi
Dibaca dari contact sheet semua menit dan 12 frame penuh. Pola latar kartu teks diukur statis (tidak bergerak sendiri); gerak berasal dari kamera.

### Sifat umum semua latar
1. Datar (flat vector) dengan gradasi lembut, **tanpa garis tepi**, detail sedang. Karakter dan properti di depannya lebih jenuh warnanya, jadi selalu menonjol. (Karakter Penny Logics tetap bergaris; kombinasi karakter bergaris di atas latar tanpa garis justru membuat karakter lebih menonjol.)
2. Kedalaman lewat 2–3 lapis: lapis jauh lebih pucat (perspektif udara), lapis dekat lebih gelap/jenuh.
3. Cahaya: jendela besar, berkas cahaya miring, lampu langit-langit berderet. Bayangan lembut, tanpa tekstur kertas.
4. **Latar ikut bercerita**: tumpukan kertas = utang menumpuk, kuburan = mobil sitaan, jurang = risiko, deret mobil "SALE" = pasar jenuh.
5. Partikel atmosfer kadang dipakai: debu, salju abu, bara merah (kartu peringatan), daun.
6. Ruang kosong di tengah atau di lantai selalu disisakan untuk teks/karakter.

### 12 jenis latar
| # | Jenis | Contoh di referensi | Ciri | Pakai untuk |
|---|---|---|---|---|
| 1 | Langit + lanskap (pembuka) | 0:00, 0:16, 9:18 | Gradasi langit biru muda → pink/ungu dekat awan, awan putih tebal, bukit 2–3 lapis, tanah hijau | "buka dari langit", awal bagian |
| 2 | Jalan kota / pinggiran (tampak samping) | 0:32, 2:40, 15:24 | Deret rumah/toko datar, trotoar, pagar kayu, pohon bulat; varian kusam kelabu dengan partikel untuk suasana suram | mobil lewat, pan panjang |
| 3 | Jalan raya berlapis (parallax) | 2:02, 4:10, 9:20 | Bukit kuning-hijau, gunung jauh, tiang listrik, jalan aspal di bawah | ikut kendaraan |
| 4 | Interior perspektif satu titik | bank 3:10, showroom 3:32, lantai trading 10:16 | Dinding pucat, jendela besar berisi kota, lampu langit-langit berderet, lantai polos | adegan percakapan, dolly |
| 5 | Gudang kertas | 1:26 (krem), 7:38 (hijau tosca) | Ruang luas penuh tumpukan kertas dan kotak dengan tab warna, papan tulis di tengah | angka utang, pai di papan |
| 6 | Meja tampak atas | 3:00, 7:04, 8:22, 10:04, 13:26 | Papan kayu abu/krem; kopi, kacamata, klip, tanaman, pena, mesin tik, palu di tepi; tengah kosong | kontrak, formulir, kutipan diketik, checklist |
| 7 | Kolase koran | 13:06, 15:34 | Koran abu-putih bertumpuk miring, kata besar "NEWS/EXTRA", satu koran fokus di tengah | berita/fakta terkini (judul generik) |
| 8 | Kartu teks berpola gelap | biru dongker 2:14, hijau tua 1:44, marun 8:02, ungu 4:36 | Bentuk diagonal besar tone-on-tone (kontras sekitar 10%), statis; teks putih kapital tebal + bayangan; kadang bara | angka besar, kartu pertanyaan |
| 9 | Panggung sorot | 2:48 | Latar marun/gelap dengan sinar lampu sorot | memperkenalkan benda |
| 10 | Close-up / over-the-shoulder | 0:10, 2:28, 5:00 | Warna polos lembut + bentuk cahaya besar; dari belakang bahu ke koran/laptop dengan jendela terang | reaksi, membaca data |
| 11 | POV dalam mobil | 7:52 | Dasbor, spion, jok | "kamu di dalam pinjaman ini" |
| 12 | Ruang khusus | pengadilan 11:10, brankas 13:38, dapur 11:54, ruang tamu 5:16 | Suasana sesuai cerita, palet terbatas 3–4 warna | metafora bab |
Grafik: grid tipis hijau di latar hijau gelap (6:46), bar di latar biru dongker (12:46), peta AS kelabu dengan hujan simbol (15:16).

### Template prompt Gemini (Style 2, latar)
Pakai Images, model Argon High (preferensi owner). Lampirkan latar Style 2 kita yang sudah jadi sebagai referensi (jangan lampirkan frame video referensi supaya tidak menyalin gambarnya). Untuk latar pertama, cukup deskripsi di bawah.
> Wide background for an animated finance explainer. Flat vector illustration with soft gradients and NO outlines, clean shapes, medium detail, gentle depth with 2–3 layers (far layers paler), soft window light and soft shadows. Muted palette so characters placed on top stand out. NO people, NO animals, NO text, NO letters or numbers, NO logos or brand signs. Leave the lower area and the center open for characters and captions. Size 2520x1080 (21:9). Scene: <isi adegan>.
Varian kartu teks: "Solid deep navy (#0E2244) background with very large diagonal rounded shapes in a slightly lighter navy (about 10% contrast), no other elements, 1920x1080." (ganti warna: marun #4A0E1E, hijau tua #12301C, ungu #2C1A4A).
Varian langit untuk "buka dari langit": panorama diberi pita langit setinggi 1080 px di atasnya (gradasi + awan), menyambung tanpa sambungan.

### Daftar latar V4 (usulan)
| Bab | Latar |
|---|---|
| Hook | 1 langit → lapangan trade-in (deret mobil dengan label harga kosong); 8 kartu angka biru dongker |
| 1. The Gap | 10 close-up Leo; 6 meja tampak atas (grafik dua garis di kertas); 12 ruang tamu |
| 2. The Long Loan | 3 jalan raya berlapis (ikut mobil); 8 kartu ungu (bar 7 blok) |
| 3. Rolled Over | 4 showroom kaca; 6 meja tampak atas (kontrak baru); 8 marun ($57,235) |
| 4. When Payments Stop | 2 pinggiran kelabu (truk derek); 10 over-the-shoulder ponsel; 5 gudang kertas ($1.7 triliun); grafik di grid hijau gelap |
| 5. The Honest Part | 8 kartu pertanyaan hijau tua; 5 papan tulis (pai 71% / 29%) |
| 6. What You Can Do | 6 meja tampak atas (checklist); 1 langit di akhir |
| Outro | callback ke lapangan trade-in (latar Hook) |

