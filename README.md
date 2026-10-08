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

Kedua seam memakai `TEST_DATABASE_URL` (bawaan: `postgres://rise:rise@localhost:5432/rise_test`). **Isi database ini dihapus setiap kali tes berjalan**, jadi jangan arahkan ke database dev atau produksi. Sekali saja sebelum `test:e2e` pertama, jalankan `pnpm exec playwright install chromium`.

## Lead (permintaan konsultasi)

Form di `/kontak` mengirim lewat server action ke `submitLead` (`src/lead/submitLead.ts`), satu-satunya pintu masuk Lead: validasi, honeypot, rate limit 5 kiriman per IP per 10 menit, simpan, lalu notifikasi lewat `LeadNotifier`. Notifikasi memakai SMTP dari variabel `SMTP_*` dan `LEAD_NOTIFY_TO` (lihat `.env.example`). Bila SMTP belum diatur atau gagal, Lead tetap tersimpan dengan status notifikasi `gagal`. Hanya Admin yang bisa melihat Lead. Rate limit membaca IP dari header `X-Real-IP`, jadi reverse proxy produksi wajib mengisinya dengan IP asli pengunjung (SOH-146); tanpa itu semua kiriman dianggap dari satu IP.

## Database dan migrasi

- Dev dan tes: Payload melakukan push schema secara otomatis.
- Produksi: migrasi di `src/migrations/` dijalankan otomatis saat Payload pertama diinisialisasi (request pertama setelah start).
- Setiap mengubah koleksi atau global, buat migrasi baru dengan `pnpm migrate:create <nama>` dan commit bersama perubahannya.

## Produksi

`Dockerfile` membangun image Next.js standalone (`node server.js`). Variabel wajib: `DATABASE_URL` dan `PAYLOAD_SECRET`. Folder `media/` berisi unggahan dan perlu dipasang sebagai volume.
