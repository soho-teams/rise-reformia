# Brand RISE: Logo, Palet, Tipografi, dan Token

Tiket: SOH-140 (induk SOH-139). Dikerjakan oleh `brand-designer`.

**Status: Konsep A (Fajar) dipilih pada 8 Oktober 2026, lalu direvisi di hari yang sama** (lihat bagian 2a). Aset di `logo/` dan nilai di `tokens.*` adalah versi resmi. Sebelum dipakai di materi cetak, bentuk huruf wordmark masih perlu dirapikan (lihat bagian 7).

Cakupan: identitas minimal untuk dasar desain website. Brand guideline lengkap di luar scope.

## 1. Karakter: modern-hangat

Profesional untuk audiens B2B (HR, direksi, owner bisnis), tetapi humanis. Itu sebabnya bukan navy-abu kaku ala Big 4 dan bukan warna neon ala startup. Dasarnya biru laut yang tenang dan tepercaya, dihangatkan oleh amber (matahari terbit) dan latar krem, bukan putih dingin. Huruf wordmark berujung bulat agar terasa ramah.

## 2. Tiga konsep logo

Pratinjau ada di `concepts/`. Ketiganya memakai wordmark RISE yang sama (huruf geometris buatan tangan, ujung bulat). Yang berbeda adalah simbolnya.

| Konsep | File | Rasional |
|---|---|---|
| **A. Fajar (dipilih)** | `concepts/konsep-a-fajar.svg` | Matahari separuh terbit di atas dua garis cakrawala. Langsung menerjemahkan nama "RISE" dan "Inspirasi". Garis bertumpuk juga bisa dibaca sebagai lapisan, yaitu beberapa Layanan yang saling menopang. Bentuk datar dan sederhana. |
| B. Tunas Insan | `concepts/konsep-b-tunas-insan.svg` | Sosok manusia dengan lengan terangkat (titik amber di atas sudut teal). Menonjolkan sisi humanis dan Psikologi Industri & Organisasi. Risiko: bisa terbaca sebagai ikon panah atau "orang" generik, dan kurang membawa makna "terbit". |
| C. Monogram R | `concepts/konsep-c-monogram-r.svg` | Huruf R dari batang dan setengah lingkaran amber. Tegas dan mudah diingat, tetapi lebih korporat-generik dan berdekatan dengan banyak monogram huruf. |

**Alasan memilih A:**
1. Menceritakan nama merek tanpa klise (bukan globe, swoosh, atau panah naik).
2. Tetap terbaca di 16 px dan dalam satu warna, karena hanya terdiri dari tiga bentuk solid.
3. Amber dan biru laut langsung menjadi sistem warna situs, jadi logo dan UI terasa satu keluarga.

### 2a. Revisi konsep A (8 Oktober 2026)

Atas masukan RISE, konsep A diubah. File di `concepts/` tetap versi awal sebagai arsip eksplorasi.

- Garis cakrawala dan tulisan RISE berwarna **biru laut #1F6FB2** (sebelumnya teal #0E5A5C), supaya terasa seperti matahari terbit di atas laut.
- Matahari **amber #FFA500** (sebelumnya #E8A33D), diperbesar sekitar 13% (jari-jari 22 menjadi 25) dan sedikit terangkat dari garis cakrawala.
- Garis atas lebih panjang dan melebar melewati kedua sisi matahari. Garis bawah lebih pendek, kurang dari separuh garis atas.
- Di atas latar biru atau gelap, logo **putih seluruhnya**, termasuk matahari.

## 3. Aset logo (konsep A)

Semua di `logo/`. Wordmark digambar sebagai path, jadi tidak bergantung pada font.

| Kebutuhan | File |
|---|---|
| Horizontal, warna penuh (latar terang) | `rise-logo-horizontal.svg` |
| Latar biru atau gelap: putih seluruhnya (mis. di atas `--color-primary` atau `--color-dark-bg` #123A66) | `rise-logo-horizontal-dark.svg` |
| Monokrom tinta #1F2A2B | `rise-logo-mono.svg` |
| Monokrom putih (di atas foto atau warna gelap) | `rise-logo-mono-white.svg` |
| Ikon/simbol saja (penuh, mono, gelap) | `rise-symbol.svg`, `rise-symbol-mono.svg`, `rise-symbol-dark.svg` |
| Favicon | `favicon.svg` (kotak biru laut, simbol putih, disederhanakan agar terbaca di 16 px) |
| App icon | `app-icon.svg` (512, latar biru laut, simbol putih; tanpa sudut membulat, biarkan OS yang memotong) |
| PNG | `png/`: favicon 16/32/48/64, app icon 192/512, apple-touch-icon 180, logo horizontal 1200 px, simbol 512 px |

Catatan pakai:
- Ruang bebas minimum di sekeliling logo: setinggi huruf "I" pada wordmark.
- Ukuran minimum: logo horizontal 96 px lebar, simbol 16 px.
- Jangan ubah proporsi, urutan warna, atau tambahkan efek bayangan.
- Di latar biru (primer maupun gelap) logo selalu putih seluruhnya; versi warna penuh hanya untuk latar terang.
- Warna amber tidak dipakai sebagai warna teks di latar terang (lihat kontras).
- Favicon di Next.js: letakkan `favicon.svg` sebagai `app/icon.svg` dan `apple-touch-icon-180.png` sebagai `app/apple-icon.png`. Tambahkan `favicon.ico` bila dibutuhkan peramban lama (belum dibuat; konversi dari `favicon-32.png`).

## 4. Palet warna dan kontras WCAG AA

Rasio dihitung dengan rumus luminans relatif WCAG 2.x. Target AA: 4,5:1 untuk teks biasa, 3:1 untuk teks besar (18,66 px tebal atau 24 px) dan komponen UI.

**Primer: biru laut**

| Token | Hex | Pasangan | Rasio |
|---|---|---|---|
| `--color-primary` | #1F6FB2 | teks putih di atasnya (tombol) | 5,28 |
| | | sebagai teks/tautan di `--color-bg` #FBF8F3 | 4,99 |
| | | sebagai teks di putih | 5,28 |
| | | sebagai teks di `--color-primary-soft` #E7F0F8 | 4,58 |
| `--color-primary-hover` | #185A91 | teks putih | 7,22 |
| `--color-dark-bg` | #123A66 (navy) | teks `--color-text-inverse` #FBF8F3 | 10,88 |
| | | teks putih | 11,52 |
| `--color-text-muted-on-dark` | #D3DEEC | teks sekunder di `--color-dark-bg` (footer, seksi navy) | 8,46 |
| `--color-line-on-dark` | #4A6890 | hanya garis pemisah dekoratif di `--color-dark-bg` | 2,02 (tidak untuk teks atau batas komponen) |
| `--color-whatsapp` | #128C7E | ikon putih tombol WhatsApp mengambang, dengan border putih 2 px | 4,14 (lolos 3:1 untuk ikon/komponen UI; jangan untuk teks kecil) |

**Sekunder: amber** (matahari terbit; aksen, bukan teks di latar terang)

| Token | Hex | Pasangan | Rasio | Catatan |
|---|---|---|---|---|
| `--color-secondary` | #FFA500 | teks `--color-on-secondary` #1F2A2B di atasnya | 7,47 | tombol sekunder: lolos AA |
| | | di atas putih | 1,97 | **gagal**, jangan dipakai sebagai teks atau ikon penting di latar terang |
| | | di atas `--color-bg` | 1,86 | **gagal**, sama seperti di atas |
| | | di atas `--color-dark-bg` | 5,83 | lolos AA, aman untuk teks/ikon di latar gelap |
| | | di atas `--color-primary` | 2,68 | **gagal**, hanya untuk elemen dekoratif |

`--color-accent` terakota #B4531F: teks di putih 5,00 dan di `--color-bg` 4,72 (lolos). Di `--color-surface-alt` hanya 4,22, jadi **jangan dipakai sebagai teks di sana**. Pakai hemat (sorotan, angka statistik).

**Netral (hangat)**

| Token | Hex | Pasangan | Rasio |
|---|---|---|---|
| `--color-text` | #1F2A2B | di `--color-bg` #FBF8F3 | 13,92 |
| | | di putih | 14,74 |
| `--color-text-muted` | #5B6665 | di `--color-bg` | 5,61 |
| | | di putih | 5,94 |
| | | di `--color-surface-alt` #F1EBE0 | 5,01 |
| `--color-border-strong` | #8C8578 | batas input/komponen di `--color-bg` | 3,45 (lolos 3:1 untuk UI) |
| `--color-border` | #D9D1C3 | hanya pemisah dekoratif | 1,43 (tidak untuk batas komponen) |

Tokens lain: `--color-bg` #FBF8F3 (latar halaman), `--color-surface` #FFFFFF (kartu), `--color-surface-alt` #F1EBE0 (seksi selang-seling).

**Status** (warna teks di atas latar tint-nya)

| Status | Teks | Latar | Rasio teks/latar | Teks/putih |
|---|---|---|---|---|
| Sukses | #27704A | #EAF4EE | 5,33 | 6,00 |
| Peringatan | #8A5A00 | #FFF4DC | 5,43 | 5,93 |
| Galat | #B3261E | #FDECEA | 5,72 | 6,54 |
| Info | #1F5F9E | #E8F1FA | 5,77 | 6,59 |

Semua pasangan yang dipakai sebagai teks di atas lolos AA, kecuali yang ditandai gagal (amber di latar terang), yang memang tidak diperuntukkan sebagai teks. Fokus keyboard: cincin 2 px `--color-focus-ring` (biru laut) dengan offset 2 px; di latar gelap pakai `--color-focus-ring-on-dark` (amber).

## 5. Tipografi

- **Heading: Plus Jakarta Sans** (600/700/800). Geometris-humanis, ramah, dan berasal dari desainer Indonesia.
- **Body: Inter** (400/500/600). Sangat terbaca untuk paragraf panjang dan UI.

Keduanya Google Fonts, gratis, dan mendukung seluruh karakter Bahasa Indonesia (alfabet Latin dasar, termasuk tanda baca dan angka). Pakai `next/font/google` agar di-host sendiri dan tidak memblokir render:

```ts
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
const heading = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["600","700","800"], variable: "--font-plus-jakarta" });
const body = Inter({ subsets: ["latin"], weight: ["400","500","600"], variable: "--font-inter" });
```

Tambahkan kedua `variable` itu ke `className` pada `<html>`. Lalu, bila memakai `next/font`, timpa token di CSS global agar nama font cocok:
`:root { --font-heading: var(--font-plus-jakarta), system-ui, sans-serif; --font-body: var(--font-inter), system-ui, sans-serif; }`
(Tanpa `next/font`, tautkan Google Fonts biasa; token sudah memakai nama font langsung.)

Skala ukuran, tinggi baris, dan tracking ada di token (`--text-*`, `--leading-*`, `--tracking-heading` -0,02em untuk heading).

## 6. Design token

| File | Isi |
|---|---|
| `tokens.json` | Sumber utama, format mirip Design Tokens (`$value`): warna, tipografi, radius, spacing, shadow, layout |
| `tokens.css` | Custom properties di `:root`, siap diimpor |

Cara pakai (Next.js): `import "../docs/brand/tokens.css"` di layout akar, atau salin ke `app/` sesuai konvensi tim. Contoh:

```css
body { background: var(--color-bg); color: var(--color-text); font-family: var(--font-body); line-height: var(--leading-normal); }
h1, h2, h3 { font-family: var(--font-heading); letter-spacing: var(--tracking-heading); line-height: var(--leading-tight); }
.btn-primary { background: var(--color-primary); color: var(--color-on-primary); border-radius: var(--radius-md); padding: var(--space-3) var(--space-5); }
.btn-primary:hover { background: var(--color-primary-hover); }
:focus-visible { outline: 2px solid var(--color-focus-ring); outline-offset: 2px; }
```

Konvensi nama: `--color-<peran>`, `--font-*`, `--text-<ukuran>`, `--radius-<ukuran>`, `--space-<n>` (basis 4 px: 1=4, 2=8, 3=12, 4=16, 5=24, 6=32, 7=48, 8=64, 9=96, 10=128), `--shadow-*`. Selalu pakai token peran (bukan hex) di komponen. Jika `tokens.json` diubah, sesuaikan `tokens.css` agar tetap sinkron.

## 7. Yang belum / catatan

- Konsep A dipilih pada 8 Oktober 2026, lalu direvisi ke biru laut (bagian 2a).
- Bentuk dan kerning wordmark, terutama huruf "S", dirapikan oleh desainer sebelum dipakai di materi cetak.
- Versi vertikal (simbol di atas tulisan) dan `favicon.ico` belum dibuat.
- Wordmark digambar tangan sebagai path. Kerning dan bentuk "S" sebaiknya ditinjau mata desainer saat finalisasi.
- `favicon.ico` dan versi vertikal/stacked belum dibuat (di luar kebutuhan tiket).
- Kontras dihitung dengan skrip; pengecekan visual di peramban tetap disarankan saat implementasi.
