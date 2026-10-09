# Demo staging di Vercel

Dipakai sementara untuk menunjukkan website ke tim RISE sebelum produksi di VPS (SOH-146). Konfigurasi
kode sudah siap: `vercel.json` (migrasi lalu build, region Singapura), adapter Vercel Blob untuk Media,
dan `output: 'standalone'` yang dimatikan otomatis di Vercel.

## Yang perlu disiapkan

1. **Repo GitHub** berisi kode ini (Vercel men-deploy ulang setiap push ke branch `main`).
2. **Akun Vercel.** Paket Hobby hanya untuk pemakaian non-komersial; untuk demo klien, paket Pro yang sesuai ketentuan.

## Langkah

1. Di Vercel: **Add New → Project**, impor repo GitHub. Framework terdeteksi sebagai Next.js; build
   command dan install command diambil dari `vercel.json`.
2. **Storage → Create Database → Neon (Postgres)**, region Singapura, lalu hubungkan ke project.
   Vercel mengisi `DATABASE_URL` otomatis. Pakai connection string yang *pooled*.
3. **Storage → Create → Blob**, hubungkan ke project. Vercel mengisi `BLOB_READ_WRITE_TOKEN`.
4. **Settings → Environment Variables**, tambahkan:

   | Variabel | Nilai |
   |---|---|
   | `PAYLOAD_SECRET` | string acak panjang, misalnya hasil `openssl rand -hex 32` |
   | `SITE_URL` | URL demo, misalnya `https://rise-reformia.vercel.app` |
   | `SITE_NOINDEX` | `true` (demo tidak diindeks Google, penanda `[PERLU DATA RISE]` tampil) |
   | `ENABLE_EXPERIMENTAL_COREPACK` | `1` (agar Vercel memakai versi pnpm dari `packageManager`) |
   | `SMTP_*` | opsional; tanpa SMTP, Lead tetap tersimpan dengan status notifikasi gagal |

5. **Deploy.** Build menjalankan `payload migrate` ke database Neon, lalu `next build`.
6. Buka `/admin` di URL demo dan buat Admin pertama. Empat Layanan dan Pengaturan Situs terisi otomatis.
7. Opsional: isi nomor WhatsApp di **Pengaturan Situs**.
8. Isi tujuh Insight contoh dari mockup (judul, isi, sampul) dengan akun Editor atau Admin:
   `SITUS=https://rise-reformia.vercel.app EMAIL=... SANDI=... pnpm tsx scripts/isi-insight-demo.ts`
   Insight yang judulnya sudah ada dilewati, jadi aman dijalankan ulang.

## Catatan

- `SITE_URL` dan `SITE_NOINDEX` dibaca saat build. Setelah mengubahnya, deploy ulang.
- Rate limit form Kontak tersimpan di memori fungsi serverless, jadi di Vercel tidak berlaku ketat.
  Cukup untuk demo; di VPS berjalan normal.
- Saat pindah ke VPS, data demo (Lead, Insight) tidak ikut otomatis. Ekspor dulu bila perlu.
