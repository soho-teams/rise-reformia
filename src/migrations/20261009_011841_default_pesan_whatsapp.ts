// Nilai bawaan pesan pembuka WhatsApp disamakan dengan docs/copy/kontak.md; baris yang masih memakai
// teks bawaan lama ikut diperbarui, isian yang sudah diubah Admin dibiarkan.
import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pengaturan_situs" ALTER COLUMN "pesan_whatsapp" SET DEFAULT 'Halo RISE, saya ingin berdiskusi tentang kebutuhan organisasi/usaha saya. Mohon informasinya.';
   UPDATE "pengaturan_situs" SET "pesan_whatsapp" = 'Halo RISE, saya ingin berdiskusi tentang kebutuhan organisasi/usaha saya. Mohon informasinya.'
     WHERE "pesan_whatsapp" = 'Halo RISE, saya ingin berdiskusi tentang kebutuhan organisasi kami.';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pengaturan_situs" ALTER COLUMN "pesan_whatsapp" SET DEFAULT 'Halo RISE, saya ingin berdiskusi tentang kebutuhan organisasi kami.';`)
}
