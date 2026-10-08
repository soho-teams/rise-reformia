---
halaman: Kontak
url: /kontak
status: menunggu persetujuan RISE
meta_title: "Jadwalkan Konsultasi dengan RISE | Kontak"
meta_description: "Ceritakan kebutuhan organisasi atau usaha Anda lewat form atau WhatsApp. Tim RISE akan menanggapi dan membantu menentukan langkah awal."
---

# Kontak

## Hero

**Headline:** Jadwalkan konsultasi.
**Subheadline:** Ceritakan kebutuhan organisasi atau usaha Anda. Kami akan menanggapi dan membantu menentukan langkah awal yang tepat.

## Pengantar form

Isi form di bawah ini. Cukup informasi dasar, tidak perlu sempurna. Detailnya bisa kita bahas saat berdiskusi.

## Form: label, placeholder, bantuan, dan pesan error

| Field | Label | Placeholder | Teks bantuan | Wajib |
|---|---|---|---|---|
| nama | Nama lengkap | Nama Anda | | Ya |
| perusahaan | Perusahaan / organisasi | Nama perusahaan atau usaha | | Ya |
| jabatan | Jabatan | Contoh: HR Manager, Direktur, Owner | | Ya |
| email | Email | nama@perusahaan.com | Kami membalas ke alamat ini. | Ya |
| telepon | Nomor telepon / WhatsApp | 0812 3456 7890 | Opsional. Isi bila Anda lebih nyaman dihubungi lewat telepon atau WhatsApp. | Tidak |
| layanan | Layanan diminati | Pilih Layanan | | Ya |
| pesan | Ceritakan kebutuhan Anda | Contoh: kami sedang menata ulang struktur organisasi dan ingin berdiskusi tentang langkah awalnya. | Beberapa kalimat sudah cukup. | Ya |
| persetujuan | (checkbox, lihat di bawah) | | | Ya |

*Catatan: telepon dibuat opsional agar hambatan mengisi form lebih rendah. Bila RISE ingin telepon wajib, ubah di sini dan di pesan error.*

### Opsi dropdown "Layanan diminati"
1. Konsultasi Manajemen
2. Psikologi Industri & Organisasi
3. Konsultasi Bisnis
4. Training & Pengembangan
5. Belum yakin / perlu diskusi

*Developer: jika form dibuka dari halaman Layanan tertentu (`?layanan=...`), pilih opsi yang sesuai secara otomatis.*

### Checkbox persetujuan PDP (wajib dicentang)
Saya menyetujui RISE memproses data pribadi yang saya isi pada form ini untuk menanggapi permintaan konsultasi saya, sesuai [Kebijakan Privasi](/kebijakan-privasi).

### Pesan error per field

| Field | Kondisi | Pesan |
|---|---|---|
| nama | kosong | Mohon isi nama Anda. |
| nama | terlalu panjang | Nama terlalu panjang. Mohon singkat hingga 100 karakter. |
| perusahaan | kosong | Mohon isi nama perusahaan atau organisasi Anda. |
| jabatan | kosong | Mohon isi jabatan Anda. |
| email | kosong | Mohon isi alamat email Anda. |
| email | format salah | Alamat email belum sesuai. Contoh yang benar: nama@perusahaan.com. |
| telepon | format salah | Nomor telepon belum sesuai. Gunakan angka saja, misalnya 081234567890 atau +6281234567890. |
| layanan | belum dipilih | Mohon pilih satu Layanan. Bila belum yakin, pilih "Belum yakin / perlu diskusi". |
| pesan | kosong | Mohon ceritakan kebutuhan Anda secara singkat. |
| pesan | terlalu pendek | Pesan terlalu singkat. Tambahkan beberapa kata agar kami memahami kebutuhan Anda. |
| pesan | terlalu panjang | Pesan terlalu panjang. Mohon ringkas hingga 2.000 karakter. |
| persetujuan | tidak dicentang | Untuk melanjutkan, mohon centang persetujuan pemrosesan data. |

*Batas karakter (100, 2.000, minimal pesan) adalah usulan; developer boleh menyesuaikan, dan teks pesan harus ikut diubah.*

### Pesan error umum (tingkat form)
- Gagal mengirim (server): Maaf, pesan Anda belum terkirim. Silakan coba lagi sebentar lagi, atau hubungi kami lewat WhatsApp.
- Tidak ada koneksi: Koneksi internet Anda tampaknya terputus. Periksa koneksi, lalu coba kirim lagi.
- Terlalu banyak percobaan: Anda sudah mengirim beberapa kali dalam waktu singkat. Mohon tunggu beberapa menit, lalu coba lagi.
- Ringkasan di atas form (aksesibilitas): Ada {n} isian yang perlu diperbaiki. Periksa kolom yang ditandai.

### Tombol
- Default: Kirim permintaan konsultasi
- Sedang mengirim: Mengirim...

## Pesan konfirmasi terkirim

**Judul:** Terima kasih, permintaan Anda sudah kami terima.
**Isi:** Kami akan menghubungi Anda melalui email `[PERLU DATA RISE: waktu respons, usulan: dalam 1 hari kerja]`. Kami juga mengirim salinan konfirmasi ke email Anda.
**Penutup:** Butuh jawaban lebih cepat? Anda dapat langsung menghubungi kami lewat WhatsApp.
**Tombol:** Chat via WhatsApp
**Tautan sekunder:** Kembali ke Beranda

*Catatan: "salinan konfirmasi ke email" hanya berlaku bila sistem mengirim email otomatis. Hapus kalimat itu bila tidak ada.*

### Email konfirmasi otomatis ke Lead (opsional)
**Subjek:** Permintaan konsultasi Anda sudah kami terima
**Isi:**
Selamat pagi/siang/sore, {nama},

Terima kasih sudah menghubungi RISE. Permintaan konsultasi Anda untuk {layanan} sudah kami terima.

Tim kami akan menanggapi `[PERLU DATA RISE: waktu respons]`. Bila ada hal mendesak, balas email ini atau hubungi kami lewat WhatsApp di `[PERLU DATA RISE: nomor WhatsApp]`.

Salam hangat,
Tim RISE

## Kontak langsung

**Judul section:** Atau hubungi kami langsung
- WhatsApp: `[PERLU DATA RISE: nomor WhatsApp bisnis]`
- Email: `[PERLU DATA RISE: alamat email resmi]`
- Telepon: `[PERLU DATA RISE: nomor telepon kantor, jika ada]`
- Alamat: `[PERLU DATA RISE: alamat kantor, jika menerima kunjungan]`
- Jam layanan: `[PERLU DATA RISE: hari dan jam kerja, termasuk zona waktu]`

## Tombol WhatsApp

**Label tombol:** Chat via WhatsApp

**Pesan pembuka bawaan (default, dari halaman mana pun tanpa konteks Layanan):**
Halo RISE, saya ingin berdiskusi tentang kebutuhan organisasi/usaha saya. Mohon informasinya.

**Pesan bawaan per halaman Layanan:** lihat bagian akhir setiap halaman Layanan. Polanya:
Halo RISE, saya tertarik dengan Layanan {nama Layanan} dan ingin berdiskusi lebih lanjut.

*Developer: pesan di atas di-URL-encode pada tautan `https://wa.me/{nomor}?text=...`. Nomor memakai format internasional tanpa tanda plus.*

## Catatan privasi di bawah form
Data Anda hanya kami gunakan untuk menanggapi permintaan ini. Baca selengkapnya di [Kebijakan Privasi](/kebijakan-privasi).
