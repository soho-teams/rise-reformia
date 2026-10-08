# Copy Website RISE (SOH-142)

**Status: menunggu persetujuan RISE.** Seluruh naskah adalah draf dari Soho Digital. Belum ada yang disetujui RISE. Naskah belum boleh dianggap final sampai RISE menyetujui dan semua `[PERLU DATA RISE]` terisi.

Bahasa: Indonesia, register persuasif-semiformal, sapaan "Anda". Istilah mengikuti `CONTEXT.md` (Klien, Lead, Layanan, Insight, Konsultan, dst.).

## Indeks file

| File | Halaman | URL | Catatan |
|---|---|---|---|
| `beranda.md` | Beranda | `/` | Hero dengan 3 opsi headline |
| `tentang-kami.md` | Tentang Kami | `/tentang-kami` | Visi, misi, nilai berstatus usulan |
| `layanan-konsultasi-manajemen.md` | Konsultasi Manajemen | `/layanan/konsultasi-manajemen` | |
| `layanan-psikologi-industri-organisasi.md` | Psikologi Industri & Organisasi | `/layanan/psikologi-industri-organisasi` | |
| `layanan-konsultasi-bisnis.md` | Konsultasi Bisnis | `/layanan/konsultasi-bisnis` | |
| `layanan-training-pengembangan.md` | Training & Pengembangan | `/layanan/training-pengembangan` | |
| `kontak.md` | Kontak | `/kontak` | Form, error, konfirmasi, pesan WhatsApp |
| `kebijakan-privasi.md` | Kebijakan Privasi | `/kebijakan-privasi` | **DRAF, perlu ditinjau RISE dan penasihat hukum** |
| `global.md` | Navigasi, footer, 404, tombol CTA, halaman Insight | komponen bersama | |

Setiap file diawali front matter (`meta_title` ≤ 60 karakter, `meta_description` ≤ 155 karakter, sudah diperiksa), lalu heading `##` per section yang bisa dipetakan ke komponen.

## Konvensi

- Teks dalam `` `[PERLU DATA RISE: ...]` `` adalah placeholder fakta. Developer: jangan tampilkan di produksi; sembunyikan section atau isi setelah data masuk.
- Teks berlabel "Usulan draf" atau "Alternatif" adalah pilihan untuk RISE; yang bertanda "rekomendasi" adalah pilihan Soho.
- "Catatan developer" hanya untuk tim teknis, bukan untuk ditayangkan.
- Tidak ada nama Klien, angka, sertifikasi, tahun berdiri, atau klaim faktual tentang RISE yang dikarang. Pernyataan pendekatan dan alur kerja bersifat usulan dan perlu dikonfirmasi RISE sesuai praktik sebenarnya.

## Daftar placeholder `[PERLU DATA RISE]`

### Identitas dan kontak (dipakai di banyak halaman)
- Nomor WhatsApp bisnis (kontak, global, pesan konfirmasi)
- Alamat email resmi
- Nomor telepon kantor, jika ada
- Alamat kantor dan apakah menerima kunjungan
- Jam layanan dan zona waktu
- Akun media sosial resmi
- Waktu respons form (usulan: 1 hari kerja)

### Beranda
- Konsultasi awal gratis atau berbayar
- Keunggulan RISE yang dapat dibuktikan (pengalaman, jumlah Klien, sertifikasi, metodologi)
- Konfirmasi alur kerja tiga langkah
- Daftar Klien yang boleh dipublikasikan dan/atau testimoni beserta izin

### Tentang Kami
- Cerita pendirian (tahun berdiri, latar pendiri, alasan RISE dibentuk)
- Konfirmasi makna nama Reformia Inspirasi Semesta
- Profil Konsultan (nama, foto, jabatan, keahlian, latar belakang, sertifikasi)
- Persetujuan atas visi, misi, dan nilai (usulan draf)

### Halaman Layanan
- Konsultasi Manajemen: konfirmasi tahapan kerja dan daftar cakupan
- Psikologi Industri & Organisasi: metode dan alat asesmen, status keprofesian psikolog (mis. HIMPSI/SIPP), apakah ada pencarian kandidat, ketentuan minimum peserta
- Konsultasi Bisnis: konfirmasi pendekatan dan format pendampingan, batas cakupan (pemasaran, keuangan, pembiayaan)
- Training & Pengembangan: alur dan evaluasi dampak, daftar tema pelatihan, format penyampaian (tatap muka/daring), kapasitas peserta

### Kebijakan Privasi
- Tanggal berlaku dan tanggal pembaruan
- Nama badan hukum pengendali data dan alamat terdaftar
- Email privasi dan/atau petugas pelindungan data pribadi
- Data teknis yang dikumpulkan, cookie, dan alat analitik
- Apakah data dipakai untuk newsletter atau Insight (butuh persetujuan terpisah)
- Dasar pemrosesan per tujuan (tinjauan penasihat hukum)
- Penyedia layanan teknologi dan lokasi penyimpanan data (di dalam/luar Indonesia)
- Masa simpan data Lead
- Prosedur dan tenggat pemberitahuan kegagalan pelindungan data (tinjauan penasihat hukum)
- Jangka waktu menanggapi permintaan hak subjek data

### Global
- Keputusan banner cookie, bergantung pada alat analitik

## Keputusan yang dibutuhkan dari RISE

1. Pilih headline Beranda (A direkomendasikan, B atau C alternatif) dan headline tiap Layanan.
2. Setujui, ubah, atau tolak visi, misi, dan nilai.
3. Konfirmasi telepon pada form berstatus opsional.
4. Tinjau seluruh klaim pendekatan agar sesuai praktik nyata RISE.
5. Teruskan Kebijakan Privasi ke penasihat hukum.

## Catatan untuk developer

- Pesan error form memuat batas karakter usulan (nama 100, pesan 2.000). Ubah teks bila batas diubah.
- Sapaan di email konfirmasi memakai variabel `{nama}` dan `{layanan}`.
- Section Insight, Konsultan, dan Klien bersifat dinamis atau kondisional; lihat keadaan kosong di masing-masing file.
