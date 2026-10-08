import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Insight } from './collections/Insight'
import { Layanan, pastikanLayanan } from './collections/Layanan'
import { Leads } from './collections/Leads'
import { Media } from './collections/Media'
import { Users } from './collections/Users'
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
  collections: [Insight, Layanan, Media, Users, Leads],
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
  onInit: pastikanLayanan,
  plugins: [],
})
