import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_leads_status_tindak_lanjut" AS ENUM('baru', 'dihubungi', 'selesai');
  ALTER TABLE "leads" ADD COLUMN "status_tindak_lanjut" "enum_leads_status_tindak_lanjut" DEFAULT 'baru' NOT NULL;
  CREATE INDEX "leads_status_tindak_lanjut_idx" ON "leads" USING btree ("status_tindak_lanjut");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "leads_status_tindak_lanjut_idx";
  ALTER TABLE "leads" DROP COLUMN "status_tindak_lanjut";
  DROP TYPE "public"."enum_leads_status_tindak_lanjut";`)
}
