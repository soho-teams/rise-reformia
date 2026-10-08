import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Pengguna yang sudah ada sebelum peran diperkenalkan dijadikan Admin, dengan nama dari email.
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_peran" AS ENUM('penulis', 'editor', 'admin');
  ALTER TABLE "users" ADD COLUMN "nama" varchar;
  ALTER TABLE "users" ADD COLUMN "peran" "enum_users_peran";
  UPDATE "users" SET "nama" = "email" WHERE "nama" IS NULL;
  UPDATE "users" SET "peran" = 'admin' WHERE "peran" IS NULL;
  ALTER TABLE "users" ALTER COLUMN "nama" SET NOT NULL;
  ALTER TABLE "users" ALTER COLUMN "peran" SET NOT NULL;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "users" DROP COLUMN "nama";
  ALTER TABLE "users" DROP COLUMN "peran";
  DROP TYPE "public"."enum_users_peran";`)
}
