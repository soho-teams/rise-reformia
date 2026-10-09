import { postgresAdapter } from '@payloadcms/db-postgres'
import { s3Storage } from '@payloadcms/storage-s3'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Insight } from './collections/Insight'
import { Layanan, pastikanLayanan } from './collections/Layanan'
import { Leads } from './collections/Leads'
import { Media } from './collections/Media'
import { Klien, Konsultan, Testimoni } from './collections/profil'
import { Users } from './collections/Users'
import { BagianOpsional } from './globals/BagianOpsional'
import { PengaturanSitus, pastikanPengaturanSitus } from './globals/PengaturanSitus'
import { migrations } from './migrations'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Insight, Layanan, Media, Konsultan, Klien, Testimoni, Users, Leads],
  globals: [PengaturanSitus, BagianOpsional],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    // Dev dan tes memakai push schema; produksi menjalankan migrasi saat Payload pertama diinisialisasi.
    prodMigrations: migrations,
  }),
  sharp,
  onInit: async (payload) => {
    await pastikanLayanan(payload)
    await pastikanPengaturanSitus(payload)
  },
  plugins: [
    // Hosting tanpa disk menetap (demo Vercel) menyimpan unggahan Media di storage S3, misalnya
    // Supabase Storage, bila S3_BUCKET diisi. Tanpa itu (VPS), Media tersimpan di folder media/.
    // File tetap disajikan lewat /api/media/file/..., jadi bucket boleh private.
    s3Storage({
      enabled: Boolean(process.env.S3_BUCKET),
      collections: { media: true },
      bucket: process.env.S3_BUCKET ?? '',
      config: {
        endpoint: process.env.S3_ENDPOINT,
        region: process.env.S3_REGION,
        // Supabase Storage (dan kebanyakan layanan S3 non-AWS) memakai alamat bergaya path.
        forcePathStyle: true,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID ?? '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY ?? '',
        },
      },
    }),
  ],
})
