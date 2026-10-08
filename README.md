# RISE — Website Korporat

Website korporat RISE (Reformia Inspirasi Semesta) di `rise-reformia.id`: Next.js + Payload CMS + PostgreSQL ([ADR-0001](docs/adr/0001-nextjs-payload-cms-di-satu-vps.md)). Istilah domain ada di [CONTEXT.md](CONTEXT.md). Pekerjaan dilacak di Linear, project **Rise Reformia** (team SOH).

## Menjalankan secara lokal

Dengan Docker:

```bash
docker compose up
```

`.env` opsional untuk mode Docker; tanpa file itu dipakai nilai dev bawaan.

Tanpa Docker (butuh PostgreSQL 16 dan pnpm):

```bash
cp .env.example .env   # sesuaikan DATABASE_URL
pnpm install
pnpm dev
```

Buka http://localhost:3000 untuk website dan http://localhost:3000/admin untuk panel admin. Pada database kosong, panel admin meminta pembuatan pengguna pertama, yang otomatis menjadi Admin.

Untuk akun contoh setiap peran, jalankan `pnpm seed`. Skrip ini membuat `admin@rise.local`, `editor@rise.local`, dan `penulis@rise.local` dengan kata sandi `rahasia-dev-123` (ubah lewat `SEED_PASSWORD`). Skrip menolak berjalan di produksi dan melewati akun yang sudah ada.

## Peran pengguna CMS

Peran bertingkat: Admin ⊃ Editor ⊃ Penulis. Gunakan helper di `src/access/peran.ts` (`minimal('editor')`, `fieldMinimal('admin')`, `punyaPeran(user, 'admin')`) untuk aturan akses koleksi dan global baru, jangan menulis ulang pengecekan peran.

Pengaman di koleksi Pengguna: pengguna pertama otomatis Admin, Admin terakhir tidak bisa diturunkan atau dihapus, dan Admin tidak bisa menghapus akunnya sendiri. Tes yang perlu mengosongkan koleksi memakai `kosongkanPengguna()` di `tests/helpers/payload.ts`.

## Tes

| Perintah | Isi |
|---|---|
| `pnpm test:int` | Seam 1: Payload Local API di atas database uji |
| `pnpm test:e2e` | Seam 2: smoke Playwright terhadap build produksi |
| `pnpm lint`, `pnpm typecheck` | Pemeriksaan statis |

Di Seam 2, project `setup` (`tests/e2e/pengguna-pertama.setup.ts`) membuat Admin lewat alur pengguna pertama sebelum tes lain berjalan. Tes yang butuh login memakai `masukAdmin()` dari `tests/e2e/akun.ts`.

Kedua seam memakai `TEST_DATABASE_URL` (bawaan: `postgres://rise:rise@localhost:5432/rise_test`). **Isi database ini dihapus setiap kali tes berjalan**, jadi jangan arahkan ke database dev atau produksi. Sekali saja sebelum `test:e2e` pertama, jalankan `pnpm exec playwright install chromium`.

## Lead (permintaan konsultasi)

Form di `/kontak` mengirim lewat server action ke `submitLead` (`src/lead/submitLead.ts`), satu-satunya pintu masuk Lead: validasi, honeypot, rate limit 5 kiriman per IP per 10 menit, simpan, lalu notifikasi lewat `LeadNotifier`. Notifikasi memakai SMTP dari variabel `SMTP_*` (lihat `.env.example`) dan dikirim ke email tujuan yang diatur Admin di global **Pengaturan Situs**. Bila SMTP belum diatur atau gagal, Lead tetap tersimpan dengan status notifikasi `gagal`. Hanya Admin yang bisa melihat Lead. Rate limit membaca IP dari header `X-Real-IP`, jadi reverse proxy produksi wajib mengisinya dengan IP asli pengunjung (SOH-146); tanpa itu semua kiriman dianggap dari satu IP.

Di panel admin, Admin menandai status tindak lanjut Lead (`baru`, `dihubungi`, `selesai`), menyaring dan mencari Lead, lalu mengekspor hasilnya lewat tombol di atas daftar (`GET /api/leads/ekspor-csv`, memakai parameter `where` dan `search` yang sama dengan daftar). CSV memakai pemisah koma dengan BOM UTF-8, dan isian yang bisa dibaca sebagai rumus spreadsheet dinetralkan. Menghapus Lead bersifat permanen (tidak ada versi atau tempat sampah), sesuai hak subjek data UU PDP.

## Insight

Koleksi `insight` memakai drafts. Penulis menyusun draf miliknya sendiri. Editor ke atas menerbitkan, menarik, dan menyunting Insight siapa pun. Publik hanya melihat Insight yang terbit (`/insight`, `/insight/[slug]`). Setiap perubahan Insight memanggil `revalidasiSitus()` (`src/insight/revalidasi.ts`), jadi halaman yang sudah di-cache diperbarui tanpa deploy ulang.

Kategori Insight adalah relasi ke koleksi `layanan`. Empat entrinya dibuat otomatis saat Payload mulai (`pastikanLayanan` di `onInit`), memakai slug yang sama dengan isian Layanan di form Lead (`src/layanan.ts`), dan tidak bisa ditambah atau dihapus dari admin.

Penulis Insight terisi otomatis dari pengguna yang login dan hanya dipakai di CMS; situs publik selalu menampilkan "Tim RISE". Bila akun penulis dihapus, Insight-nya tetap ada dan isian penulisnya dikosongkan (FK `ON DELETE SET NULL`).

Tombol Pratinjau di admin membuka `/next/pratinjau?slug=...`. Rute ini hanya mengaktifkan draft mode bila pengguna sedang login ke CMS, dan draf hanya terbaca selama sesi itu masih aktif. `/next/keluar-pratinjau` mematikannya kembali.

## Database dan migrasi

- Dev dan tes: Payload melakukan push schema secara otomatis.
- Produksi: migrasi di `src/migrations/` dijalankan otomatis saat Payload pertama diinisialisasi (request pertama setelah start).
- Setiap mengubah koleksi atau global, buat migrasi baru dengan `pnpm migrate:create <nama>` dan commit bersama perubahannya.

## Produksi

`Dockerfile` membangun image Next.js standalone (`node server.js`). Variabel wajib: `DATABASE_URL` dan `PAYLOAD_SECRET`. Folder `media/` berisi unggahan dan perlu dipasang sebagai volume.
