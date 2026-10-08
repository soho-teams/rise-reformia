import { APIError, type CollectionConfig, type PayloadRequest } from 'payload'

import { adminAtauDiriSendiri, DAFTAR_PERAN, fieldMinimal, minimal, punyaPeran } from '@/access/peran'

/** Konteks untuk pembersihan data di tes: melewati pengaman Admin terakhir. */
export const LEWATI_PENGAMAN_ADMIN = 'lewatiPengamanAdmin'

const jumlahAdmin = async (req: PayloadRequest): Promise<number> => {
  const { totalDocs } = await req.payload.count({ collection: 'users', where: { peran: { equals: 'admin' } }, req })
  return totalDocs
}

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Pengguna', plural: 'Pengguna' },
  admin: {
    useAsTitle: 'nama',
    defaultColumns: ['nama', 'email', 'peran'],
    hidden: ({ user }) => !punyaPeran(user, 'admin'),
  },
  auth: true,
  access: {
    // Semua staf perlu membaca nama rekan (misalnya penulis Insight); pengunjung anonim tidak.
    read: minimal('penulis'),
    create: minimal('admin'),
    update: adminAtauDiriSendiri,
    delete: minimal('admin'),
  },
  hooks: {
    beforeValidate: [
      // Pengguna pertama selalu Admin, supaya tidak ada yang terkunci di luar panel.
      async ({ data, operation, req }) => {
        if (operation !== 'create' || !data) return data
        const { totalDocs } = await req.payload.count({ collection: 'users', req })
        return totalDocs === 0 ? { ...data, peran: 'admin' } : data
      },
    ],
    beforeChange: [
      async ({ data, operation, originalDoc, req }) => {
        const diturunkan = operation === 'update' && originalDoc?.peran === 'admin' && data.peran && data.peran !== 'admin'
        if (diturunkan && (await jumlahAdmin(req)) <= 1) {
          throw new APIError('Admin terakhir tidak bisa diturunkan. Tetapkan Admin lain lebih dulu.', 400, null, true)
        }
        return data
      },
    ],
    beforeDelete: [
      async ({ id, req }) => {
        if (req.context[LEWATI_PENGAMAN_ADMIN]) return
        if (req.user && String(req.user.id) === String(id)) {
          throw new APIError('Admin tidak bisa menghapus akunnya sendiri.', 400, null, true)
        }
        const akun = await req.payload.findByID({ collection: 'users', id, req, depth: 0 })
        if (akun.peran === 'admin' && (await jumlahAdmin(req)) <= 1) {
          throw new APIError('Admin terakhir tidak bisa dihapus.', 400, null, true)
        }
      },
    ],
  },
  fields: [
    { name: 'nama', type: 'text', required: true, maxLength: 100 },
    {
      name: 'peran',
      type: 'select',
      required: true,
      options: DAFTAR_PERAN,
      access: {
        create: fieldMinimal('admin'),
        update: fieldMinimal('admin'),
      },
      admin: { position: 'sidebar' },
    },
  ],
}
