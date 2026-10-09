import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "konsultan" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"foto_id" integer,
  	"nama" varchar NOT NULL,
  	"jabatan" varchar NOT NULL,
  	"keahlian" varchar,
  	"latar_belakang" varchar,
  	"kredensial" varchar,
  	"urutan" numeric DEFAULT 1 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "klien" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"nama" varchar NOT NULL,
  	"logo_id" integer,
  	"urutan" numeric DEFAULT 1 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "testimoni" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"kutipan" varchar NOT NULL,
  	"nama" varchar NOT NULL,
  	"jabatan" varchar NOT NULL,
  	"perusahaan" varchar NOT NULL,
  	"urutan" numeric DEFAULT 1 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "bagian_opsional" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tampil_konsultan" boolean DEFAULT false,
  	"tampil_klien" boolean DEFAULT false,
  	"tampil_testimoni" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "konsultan_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "klien_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "testimoni_id" integer;
  ALTER TABLE "konsultan" ADD CONSTRAINT "konsultan_foto_id_media_id_fk" FOREIGN KEY ("foto_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "klien" ADD CONSTRAINT "klien_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "konsultan_foto_idx" ON "konsultan" USING btree ("foto_id");
  CREATE INDEX "konsultan_updated_at_idx" ON "konsultan" USING btree ("updated_at");
  CREATE INDEX "konsultan_created_at_idx" ON "konsultan" USING btree ("created_at");
  CREATE INDEX "klien_logo_idx" ON "klien" USING btree ("logo_id");
  CREATE INDEX "klien_updated_at_idx" ON "klien" USING btree ("updated_at");
  CREATE INDEX "klien_created_at_idx" ON "klien" USING btree ("created_at");
  CREATE INDEX "testimoni_updated_at_idx" ON "testimoni" USING btree ("updated_at");
  CREATE INDEX "testimoni_created_at_idx" ON "testimoni" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_konsultan_fk" FOREIGN KEY ("konsultan_id") REFERENCES "public"."konsultan"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_klien_fk" FOREIGN KEY ("klien_id") REFERENCES "public"."klien"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_testimoni_fk" FOREIGN KEY ("testimoni_id") REFERENCES "public"."testimoni"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_konsultan_id_idx" ON "payload_locked_documents_rels" USING btree ("konsultan_id");
  CREATE INDEX "payload_locked_documents_rels_klien_id_idx" ON "payload_locked_documents_rels" USING btree ("klien_id");
  CREATE INDEX "payload_locked_documents_rels_testimoni_id_idx" ON "payload_locked_documents_rels" USING btree ("testimoni_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "konsultan" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "klien" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "testimoni" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "bagian_opsional" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "konsultan" CASCADE;
  DROP TABLE "klien" CASCADE;
  DROP TABLE "testimoni" CASCADE;
  DROP TABLE "bagian_opsional" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_konsultan_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_klien_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_testimoni_fk";
  
  DROP INDEX "payload_locked_documents_rels_konsultan_id_idx";
  DROP INDEX "payload_locked_documents_rels_klien_id_idx";
  DROP INDEX "payload_locked_documents_rels_testimoni_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "konsultan_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "klien_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "testimoni_id";`)
}
