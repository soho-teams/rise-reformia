// Seed lokal: satu akun untuk setiap peran CMS. Jalankan dengan `pnpm seed`.
import { getPayload } from 'payload'

import config from '../src/payload.config'
import type { Peran } from '../src/access/peran'

if (process.env.NODE_ENV === 'production') {
  throw new Error('Seed hanya untuk lingkungan lokal, bukan produksi.')
}

const SANDI = process.env.SEED_PASSWORD ?? 'rahasia-dev-123'

const AKUN: { email: string; nama: string; peran: Peran }[] = [
  { email: 'admin@rise.local', nama: 'Admin Lokal', peran: 'admin' },
  { email: 'editor@rise.local', nama: 'Editor Lokal', peran: 'editor' },
  { email: 'penulis@rise.local', nama: 'Penulis Lokal', peran: 'penulis' },
]

const payload = await getPayload({ config })

for (const akun of AKUN) {
  const ada = await payload.find({ collection: 'users', where: { email: { equals: akun.email } }, limit: 1 })
  if (ada.totalDocs > 0) {
    payload.logger.info(`Lewati ${akun.email}: sudah ada`)
    continue
  }
  await payload.create({ collection: 'users', data: { ...akun, password: SANDI } })
  payload.logger.info(`Dibuat ${akun.email} (${akun.peran})`)
}

process.exit(0)
