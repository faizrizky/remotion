# Video 04 - Gemini prompt pack (Style 2: latar + properti)
Gemini: **Images**, model **Argon High**, rasio 16:9 (latar panorama 21:9 dipotong/disambung dengan `scripts/stitch.py`). Setiap prompt WAJIB melampirkan gambar referensi (preferensi owner). Unduhan langsung dipindah ke `Assets/Video 04 Assets/Raw Gemini/` (aturan 1.23).
Latar mengikuti Style 2 (aturan 1.43): datar, gradasi lembut, TANPA garis tepi, warna sedikit kusam, boleh gelap. Properti dan karakter tetap gaya Penny Logics (bergaris #191411). Jangan lampirkan frame dari video referensi; latar pertama memakai deskripsi saja, latar berikutnya melampirkan latar V4 pertama yang sudah jadi sebagai referensi gaya.
Kalau gambar akan di-push-in di atas 1,3x dan terlihat blur, tajamkan dengan `python3 scripts/upscale.py in.png out_x2.png 2`.

## A. Latar (simpan ke `public/v4/bg/`)
**Kalimat gaya latar (tempel di awal setiap prompt latar):**
> Wide background for an animated finance explainer. Flat vector illustration with soft gradients and NO outlines, clean simple shapes, medium detail, gentle depth with 2-3 layers (far layers paler), soft window light and soft shadows. Slightly muted palette so cartoon characters placed on top stand out. NO people, NO animals, NO text, NO letters or numbers, NO logos or brand signs (all signs and labels blank). Leave the lower area and the center open for characters and captions.

| File | Dipakai di | Isi (tambahkan setelah kalimat gaya) | Catatan |
|---|---|---|---|
| `v4/bg/sky_strip.jpg` | Cold, Bab 5, Outro | A soft daytime sky only: light blue gradient turning slightly pink-lilac near large puffy white clouds, nothing else. 21:9. | Ditaruh di atas panorama untuk "buka dari langit"; tepi bawah harus menyatu dengan langit lapangan trade-in |
| `v4/bg/lot_a.jpg`, `lot_b.jpg` | Cold, Outro | A used-car trade-in lot seen from the side: rows of parked cars of different colors with blank price cards on the windshields, small flags on a string overhead, a small sales cabin with a blank sign, low hills far away. Bright afternoon. | 2 potongan sambung (21:9); mobil di tengah dibiarkan renggang untuk mobil Leo |
| `v4/bg/card_navy.jpg` | kartu teks | Solid deep navy (#0E2244) background with very large diagonal rounded shapes in a slightly lighter navy (about 10% contrast). Nothing else. 16:9. | juga varian marun #4A0E1E, hijau tua #12301C, ungu #2C1A4A (4 file `card_*.jpg`) |
| `v4/bg/closeup_soft.jpg` | Bab 1 | A soft plain warm background with two very large blurred light shapes, for a character close-up. 16:9. | |
| `v4/bg/road_far.png`, `road_mid.png`, `road_near.png` | Bab 2, 3 | Three separate layers for parallax, each 3x wide (about 5760x1080), transparent where empty: FAR = pale distant mountains and sky haze; MID = rolling yellow-green hills with a few small houses and power poles; NEAR = an asphalt road with a grass verge along the bottom. | generate 1 gambar lalu potong jadi 3 lapis bila Gemini tidak bisa transparan |
| `v4/bg/paper_hall.jpg` | Bab 1, 2, 4, 5 | A huge beige office hall filled with tall stacks of paper and cardboard boxes with small colored tabs, ceiling lights in a row in one-point perspective, a free-standing whiteboard on legs in the center (blank). | papan tulis kosong untuk grafik |
| `v4/bg/desk_top.jpg` | Bab 1, 3, 4, 6 | A desk seen from directly above: grey wooden planks, around the edges a coffee cup, glasses, binder clips, a small plant, a pen and a few loose papers; the center is completely empty. | tengah kosong untuk papan klip/kontrak |
| `v4/bg/desk_typewriter.jpg` | Bab 4 | The same top-down desk but with a vintage typewriter in the upper right and a stack of folders; center empty. | lampirkan `desk_top.jpg` |
| `v4/bg/news_collage.jpg` | Bab 5 | Many overlapping newspapers at different angles in grey and white, filling the whole frame, with large blank headline bars (no readable words). | judul ditambah di kode, generik |
| `v4/bg/bank_hall.jpg` | Bab 2 | A bright bank interior in one-point perspective: tall windows with a city outside, teller desks, ceiling lights, plants, polished floor. | |
| `v4/bg/showroom.jpg` | Bab 3 | A car showroom with glass walls and a city outside, a few shiny cars on the floor with blank price stands, open space center-left. | |
| `v4/bg/suburb_grey.jpg` | Bab 1, 2, 4 | A suburban street seen from the side: houses with garages, lawns, a picket fence, a driveway; overcast muted colors. Second version sunny (`suburb_sun.jpg`). | |
| `v4/bg/living_room.jpg` | Bab 1 | A calm living room: sofa, bookshelf, window with daylight, a side table. | |
| `v4/bg/stage_spot.jpg` | Bab 3 | A dark maroon stage with two spotlight beams crossing from above onto an empty floor. | |
| `v4/bg/chart_grid.jpg` | Bab 4 | A dark green background with a faint thin grid like a chart screen. Nothing else. | garis grafik digambar di kode |

## B. Properti (gaya Penny Logics, simpan ke `public/v4/`)
**Kalimat gaya properti (sama seperti V2/V3):**
> Flat 2D cartoon prop for an animated finance YouTube channel. Thick clean dark outline #191411, flat colors with one soft cel-shade tone, no gradients, NO text, NO letters, NO numbers, NO logos, NO brand marks, no real-product design. Single object, centered, plain pure white background, generous empty margin. Palette: mustard #E8A520, coral #EA6E5C, navy #293253, teal #4FB7C0, cream #F2EDE9, gold #F5C842, mint #BDEBD3.
Lampirkan `public/v2/obj_cart_full.png` sebagai referensi gaya. Hapus latar (PNG transparan), trim, minimal 2000 px sisi panjang (untuk push-in).

| File | Dipakai di | Isi |
|---|---|---|
| `v4/obj_car_leo_side.png` | Cold, Bab 2, Outro | A mid-size sedan seen exactly from the side, mustard paint, navy windows, cream wheels; generic shape, no badges. |
| `v4/obj_car_new_side.png` | Bab 3 | A newer shiny SUV seen exactly from the side, teal paint, generic shape, no badges. |
| `v4/obj_car_smoke.png` | Bab 2 | The mustard sedan from the side with the hood slightly open and a small cartoon puff of smoke. |
| `v4/obj_tow_truck.png` | Bab 4 | A tow truck seen from the side with an empty lifting arm, orange and navy, generic. |
| `v4/obj_cash_stack_s.png`, `_l.png` | Bab 2, 3 | A small and a large stack of green paper money bundles with paper bands (no numbers, no faces). |
| `v4/obj_contract_clipboard.png` | Bab 3, 6 | A clipboard seen from directly above holding a blank form with empty lines and an empty signature line. |
| `v4/obj_phone_hand.png` | Bab 4, 6 | A hand holding a generic smartphone, seen over the shoulder, blank screen. |
| `v4/obj_laptop_open.png` | Bab 6 | An open laptop seen slightly from behind, blank screen. |
| `v4/obj_keys.png` | Bab 1, 3 | A car key fob with a ring, navy and gold. |
| `v4/obj_debt_box.png` | Bab 3 | A heavy coral crate tied with rope, to be strapped on a car roof (blank sides). |
| `v4/obj_whiteboard_stand.png` | cadangan | A free-standing whiteboard on legs, blank. (hanya bila `paper_hall.jpg` tanpa papan) |
| `v4/obj_banker_desk.png` | Bab 2 | A bank officer desk with a monitor, generic. |

## C. Karakter
- Leo (gaya lama, badan + ganti kepala): pose baru yang dibutuhkan: `leo_drive_window.png` (kepala dan bahu di jendela mobil), `leo_sit_curb.png`, `leo_hold_receipt.png`, `leo_walk.png` (4 fase). Prompt: lampirkan `public/v1/leo_body.png` + kepala, "same character, same outline and colors, new pose: ...".
- Petugas bank, sales showroom, sopir truk derek: karakter generik arketipe (gaya Mira/Banker di bagian 8 aturan), BUKAN orang nyata.

## D. Dibuat di kode (tanpa Gemini)
Pill, chip DATE/LOCATION, kartu pertanyaan + huruf memantul, angka count-up, bar 7 blok, grafik dua garis, pai di papan, stempel, struk terurai, kalender, notifikasi ponsel, layar laptop dengan dua angka, checklist + tanda tangan, label VALUE/LOAN, ikon mobil kecil.
