import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_insight_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__insight_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "insight" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"judul" varchar,
  	"slug" varchar,
  	"ringkasan" varchar,
  	"sampul_id" integer,
  	"isi" jsonb,
  	"kategori_id" integer,
  	"penulis_id" integer,
  	"tanggal_terbit" timestamp(3) with time zone,
  	"seo_judul" varchar,
  	"seo_deskripsi" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_insight_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_insight_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_judul" varchar,
  	"version_slug" varchar,
  	"version_ringkasan" varchar,
  	"version_sampul_id" integer,
  	"version_isi" jsonb,
  	"version_kategori_id" integer,
  	"version_penulis_id" integer,
  	"version_tanggal_terbit" timestamp(3) with time zone,
  	"version_seo_judul" varchar,
  	"version_seo_deskripsi" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__insight_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "layanan" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"nama" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"urutan" numeric NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "media" ADD COLUMN "sizes_kartu_url" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_kartu_width" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_kartu_height" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_kartu_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_kartu_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_kartu_filename" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_sampul_url" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_sampul_width" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_sampul_height" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_sampul_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_sampul_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_sampul_filename" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_og_url" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_og_width" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_og_height" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_og_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_og_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_og_filename" varchar;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "insight_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "layanan_id" integer;
  ALTER TABLE "insight" ADD CONSTRAINT "insight_sampul_id_media_id_fk" FOREIGN KEY ("sampul_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "insight" ADD CONSTRAINT "insight_kategori_id_layanan_id_fk" FOREIGN KEY ("kategori_id") REFERENCES "public"."layanan"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "insight" ADD CONSTRAINT "insight_penulis_id_users_id_fk" FOREIGN KEY ("penulis_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_insight_v" ADD CONSTRAINT "_insight_v_parent_id_insight_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."insight"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_insight_v" ADD CONSTRAINT "_insight_v_version_sampul_id_media_id_fk" FOREIGN KEY ("version_sampul_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_insight_v" ADD CONSTRAINT "_insight_v_version_kategori_id_layanan_id_fk" FOREIGN KEY ("version_kategori_id") REFERENCES "public"."layanan"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_insight_v" ADD CONSTRAINT "_insight_v_version_penulis_id_users_id_fk" FOREIGN KEY ("version_penulis_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  CREATE UNIQUE INDEX "insight_slug_idx" ON "insight" USING btree ("slug");
  CREATE INDEX "insight_sampul_idx" ON "insight" USING btree ("sampul_id");
  CREATE INDEX "insight_kategori_idx" ON "insight" USING btree ("kategori_id");
  CREATE INDEX "insight_penulis_idx" ON "insight" USING btree ("penulis_id");
  CREATE INDEX "insight_tanggal_terbit_idx" ON "insight" USING btree ("tanggal_terbit");
  CREATE INDEX "insight_updated_at_idx" ON "insight" USING btree ("updated_at");
  CREATE INDEX "insight_created_at_idx" ON "insight" USING btree ("created_at");
  CREATE INDEX "insight__status_idx" ON "insight" USING btree ("_status");
  CREATE INDEX "_insight_v_parent_idx" ON "_insight_v" USING btree ("parent_id");
  CREATE INDEX "_insight_v_version_version_slug_idx" ON "_insight_v" USING btree ("version_slug");
  CREATE INDEX "_insight_v_version_version_sampul_idx" ON "_insight_v" USING btree ("version_sampul_id");
  CREATE INDEX "_insight_v_version_version_kategori_idx" ON "_insight_v" USING btree ("version_kategori_id");
  CREATE INDEX "_insight_v_version_version_penulis_idx" ON "_insight_v" USING btree ("version_penulis_id");
  CREATE INDEX "_insight_v_version_version_tanggal_terbit_idx" ON "_insight_v" USING btree ("version_tanggal_terbit");
  CREATE INDEX "_insight_v_version_version_updated_at_idx" ON "_insight_v" USING btree ("version_updated_at");
  CREATE INDEX "_insight_v_version_version_created_at_idx" ON "_insight_v" USING btree ("version_created_at");
  CREATE INDEX "_insight_v_version_version__status_idx" ON "_insight_v" USING btree ("version__status");
  CREATE INDEX "_insight_v_created_at_idx" ON "_insight_v" USING btree ("created_at");
  CREATE INDEX "_insight_v_updated_at_idx" ON "_insight_v" USING btree ("updated_at");
  CREATE INDEX "_insight_v_latest_idx" ON "_insight_v" USING btree ("latest");
  CREATE UNIQUE INDEX "layanan_slug_idx" ON "layanan" USING btree ("slug");
  CREATE INDEX "layanan_updated_at_idx" ON "layanan" USING btree ("updated_at");
  CREATE INDEX "layanan_created_at_idx" ON "layanan" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_insight_fk" FOREIGN KEY ("insight_id") REFERENCES "public"."insight"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_layanan_fk" FOREIGN KEY ("layanan_id") REFERENCES "public"."layanan"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "media_sizes_kartu_sizes_kartu_filename_idx" ON "media" USING btree ("sizes_kartu_filename");
  CREATE INDEX "media_sizes_sampul_sizes_sampul_filename_idx" ON "media" USING btree ("sizes_sampul_filename");
  CREATE INDEX "media_sizes_og_sizes_og_filename_idx" ON "media" USING btree ("sizes_og_filename");
  CREATE INDEX "payload_locked_documents_rels_insight_id_idx" ON "payload_locked_documents_rels" USING btree ("insight_id");
  CREATE INDEX "payload_locked_documents_rels_layanan_id_idx" ON "payload_locked_documents_rels" USING btree ("layanan_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "insight" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_insight_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "layanan" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "insight" CASCADE;
  DROP TABLE "_insight_v" CASCADE;
  DROP TABLE "layanan" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_insight_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_layanan_fk";
  
  DROP INDEX "media_sizes_kartu_sizes_kartu_filename_idx";
  DROP INDEX "media_sizes_sampul_sizes_sampul_filename_idx";
  DROP INDEX "media_sizes_og_sizes_og_filename_idx";
  DROP INDEX "payload_locked_documents_rels_insight_id_idx";
  DROP INDEX "payload_locked_documents_rels_layanan_id_idx";
  ALTER TABLE "media" DROP COLUMN "sizes_kartu_url";
  ALTER TABLE "media" DROP COLUMN "sizes_kartu_width";
  ALTER TABLE "media" DROP COLUMN "sizes_kartu_height";
  ALTER TABLE "media" DROP COLUMN "sizes_kartu_mime_type";
  ALTER TABLE "media" DROP COLUMN "sizes_kartu_filesize";
  ALTER TABLE "media" DROP COLUMN "sizes_kartu_filename";
  ALTER TABLE "media" DROP COLUMN "sizes_sampul_url";
  ALTER TABLE "media" DROP COLUMN "sizes_sampul_width";
  ALTER TABLE "media" DROP COLUMN "sizes_sampul_height";
  ALTER TABLE "media" DROP COLUMN "sizes_sampul_mime_type";
  ALTER TABLE "media" DROP COLUMN "sizes_sampul_filesize";
  ALTER TABLE "media" DROP COLUMN "sizes_sampul_filename";
  ALTER TABLE "media" DROP COLUMN "sizes_og_url";
  ALTER TABLE "media" DROP COLUMN "sizes_og_width";
  ALTER TABLE "media" DROP COLUMN "sizes_og_height";
  ALTER TABLE "media" DROP COLUMN "sizes_og_mime_type";
  ALTER TABLE "media" DROP COLUMN "sizes_og_filesize";
  ALTER TABLE "media" DROP COLUMN "sizes_og_filename";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "insight_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "layanan_id";
  DROP TYPE "public"."enum_insight_status";
  DROP TYPE "public"."enum__insight_v_version_status";`)
}
