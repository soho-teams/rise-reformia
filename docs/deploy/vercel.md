# Demo staging di Vercel

Dipakai sementara untuk menunjukkan website ke tim RISE sebelum produksi di VPS (SOH-146). Konfigurasi
kode sudah siap: `vercel.json` (migrasi lalu build, region Singapura), penyimpanan Media di S3 (Supabase Storage),
dan `output: 'standalone'` yang dimatikan otomatis di Vercel.

## Yang perlu disiapkan

1. **Repo GitHub** berisi kode ini (Vercel men-deploy ulang setiap push ke branch `main`).
2. **Akun Vercel.** Paket Hobby hanya untuk pemakaian non-komersial; untuk demo klien, paket Pro yang sesuai ketentuan.

## Langkah

1. Di Vercel: **Add New → Project**, impor repo GitHub. Framework terdeteksi sebagai Next.js; build
   command dan install command diambil dari `vercel.json`.
2. **Database (Supabase).** Di Supabase: project region Singapore, lalu **Connect → Connection String →
   Method: Session pooler** (Vercel butuh IPv4; koneksi langsung Supabase hanya IPv6). Ganti
   `[YOUR-PASSWORD]`, lalu tambahkan `?sslmode=no-verify` di ujung (driver `pg` menolak rantai sertifikat
   Supabase dengan `sslmode=require`). Pakai password tanpa karakter khusus.
3. **Penyimpanan Media (Supabase Storage).** Vercel tidak punya disk yang menetap.
   - **Storage → New bucket** bernama `media` (boleh private; file disajikan lewat website).
   - **Project Settings → Storage → S3 Connection**: catat Endpoint dan Region, lalu **New access key**.
4. **Settings → Environment Variables** (Production dan Preview):

   | Variabel | Nilai |
   |---|---|
   | `DATABASE_URL` | connection string dari langkah 2 |
   | `PAYLOAD_SECRET` | string acak panjang, misalnya hasil `openssl rand -hex 32` |
   | `SITE_URL` | URL demo, misalnya `https://rise-reformia.vercel.app` |
   | `SITE_NOINDEX` | `true` (demo tidak diindeks Google, penanda `[PERLU DATA RISE]` tampil) |
   | `ENABLE_EXPERIMENTAL_COREPACK` | `1` (agar Vercel memakai versi pnpm dari `packageManager`) |
   | `S3_BUCKET` | `media` |
   | `S3_ENDPOINT` | Endpoint dari langkah 3, mis. `https://<project-ref>.supabase.co/storage/v1/s3` |
   | `S3_REGION` | Region dari langkah 3, mis. `ap-southeast-1` |
   | `S3_ACCESS_KEY_ID` / `S3_SECRET_ACCESS_KEY` | access key dari langkah 3 |
   | `DATABASE_POOL_MAX` | `2` (batas koneksi per proses; Session pooler Supabase gratis hanya sekitar 15 koneksi) |
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
