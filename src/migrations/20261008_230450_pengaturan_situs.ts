import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pengaturan_situs_media_sosial_nama" AS ENUM('LinkedIn', 'Instagram', 'Facebook', 'YouTube', 'TikTok', 'X');
  CREATE TABLE "pengaturan_situs_email_notifikasi_lead" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL
  );
  
  CREATE TABLE "pengaturan_situs_media_sosial" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"nama" "enum_pengaturan_situs_media_sosial_nama" NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "pengaturan_situs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"whatsapp" varchar,
  	"pesan_whatsapp" varchar DEFAULT 'Halo RISE, saya ingin berdiskusi tentang kebutuhan organisasi kami.',
  	"email_kontak" varchar DEFAULT 'business@rise-reformia.id' NOT NULL,
  	"telepon" varchar DEFAULT '021 7362 639' NOT NULL,
  	"alamat" varchar DEFAULT 'Ged. Bintaro Business Center
Jl. RC Veteran No. 1-i, RT 001/RW 003
Kel. Bintaro, Kec. Pesanggrahan
Jakarta Selatan 12330',
  	"jam_layanan" varchar DEFAULT 'Senin–Jumat, 08.00–17.00 WIB',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "pengaturan_situs_email_notifikasi_lead" ADD CONSTRAINT "pengaturan_situs_email_notifikasi_lead_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pengaturan_situs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pengaturan_situs_media_sosial" ADD CONSTRAINT "pengaturan_situs_media_sosial_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pengaturan_situs"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pengaturan_situs_email_notifikasi_lead_order_idx" ON "pengaturan_situs_email_notifikasi_lead" USING btree ("_order");
  CREATE INDEX "pengaturan_situs_email_notifikasi_lead_parent_id_idx" ON "pengaturan_situs_email_notifikasi_lead" USING btree ("_parent_id");
  CREATE INDEX "pengaturan_situs_media_sosial_order_idx" ON "pengaturan_situs_media_sosial" USING btree ("_order");
  CREATE INDEX "pengaturan_situs_media_sosial_parent_id_idx" ON "pengaturan_situs_media_sosial" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pengaturan_situs_email_notifikasi_lead" CASCADE;
  DROP TABLE "pengaturan_situs_media_sosial" CASCADE;
  DROP TABLE "pengaturan_situs" CASCADE;
  DROP TYPE "public"."enum_pengaturan_situs_media_sosial_nama";`)
}
