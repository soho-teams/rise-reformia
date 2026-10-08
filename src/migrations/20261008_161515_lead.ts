import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_leads_layanan" AS ENUM('konsultasi-manajemen', 'psikologi-industri-organisasi', 'konsultasi-bisnis', 'training-pengembangan', 'belum-yakin');
  CREATE TYPE "public"."enum_leads_status_notifikasi" AS ENUM('terkirim', 'gagal');
  CREATE TABLE "leads" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"nama" varchar NOT NULL,
  	"perusahaan" varchar NOT NULL,
  	"jabatan" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"telepon" varchar,
  	"layanan" "enum_leads_layanan" NOT NULL,
  	"pesan" varchar NOT NULL,
  	"persetujuan_pdp" boolean DEFAULT false NOT NULL,
  	"waktu_persetujuan" timestamp(3) with time zone NOT NULL,
  	"status_notifikasi" "enum_leads_status_notifikasi" DEFAULT 'gagal' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "leads_id" integer;
  CREATE INDEX "leads_updated_at_idx" ON "leads" USING btree ("updated_at");
  CREATE INDEX "leads_created_at_idx" ON "leads" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_leads_fk" FOREIGN KEY ("leads_id") REFERENCES "public"."leads"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_leads_id_idx" ON "payload_locked_documents_rels" USING btree ("leads_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "leads" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "leads" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_leads_fk";
  
  DROP INDEX "payload_locked_documents_rels_leads_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "leads_id";
  DROP TYPE "public"."enum_leads_layanan";
  DROP TYPE "public"."enum_leads_status_notifikasi";`)
}
