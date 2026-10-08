import { beforeAll, beforeEach, describe, expect, it } from 'vitest'
import type { Payload, RequiredDataFromCollectionSlug } from 'payload'

import type { User } from '@/payload-types'
import { getTestPayload, kosongkanPengguna } from '../helpers/payload'

let payload: Payload

const SANDI = 'rahasia-panjang-123'

// Sengaja tanpa peran: menguji hook pengguna pertama dan validasi peran wajib.
const tanpaPeran = (email: string, nama: string) =>
  ({ email, password: SANDI, nama }) as RequiredDataFromCollectionSlug<'users'>

async function buatAkun(email: string, peran: User['peran']): Promise<User> {
  return payload.create({ collection: 'users', data: { email, password: SANDI, nama: email, peran } })
}

describe('Peran pengguna CMS', () => {
  beforeAll(async () => {
    payload = await getTestPayload()
  })

  beforeEach(async () => {
    await kosongkanPengguna(payload)
  })

  it('pengguna pertama otomatis menjadi Admin', async () => {
    const pertama = await payload.create({
      collection: 'users',
      data: tanpaPeran('pertama@rise-reformia.id', 'Pengguna Pertama'),
    })

    expect(pertama.peran).toBe('admin')
  })

  it('akun berikutnya wajib punya peran', async () => {
    await buatAkun('admin@rise-reformia.id', 'admin')

    await expect(
      payload.create({
        collection: 'users',
        data: tanpaPeran('tanpa-peran@rise-reformia.id', 'Tanpa Peran'),
      }),
    ).rejects.toThrow()
  })

  it('Admin bisa membuat akun Editor', async () => {
    const admin = await buatAkun('admin@rise-reformia.id', 'admin')

    const editor = await payload.create({
      collection: 'users',
      data: { email: 'editor@rise-reformia.id', password: SANDI, nama: 'Editor', peran: 'editor' },
      user: admin,
      overrideAccess: false,
    })

    expect(editor.peran).toBe('editor')
  })

  it('Editor dan Penulis tidak bisa membuat akun', async () => {
    await buatAkun('admin@rise-reformia.id', 'admin')
    const editor = await buatAkun('editor@rise-reformia.id', 'editor')
    const penulis = await buatAkun('penulis@rise-reformia.id', 'penulis')

    for (const pelaku of [editor, penulis]) {
      await expect(
        payload.create({
          collection: 'users',
          data: { email: `baru-${pelaku.peran}@rise-reformia.id`, password: SANDI, nama: 'Baru', peran: 'penulis' },
          user: pelaku,
          overrideAccess: false,
        }),
      ).rejects.toThrow()
    }
  })

  it('Penulis bisa mengubah namanya sendiri tetapi tidak bisa menaikkan perannya', async () => {
    await buatAkun('admin@rise-reformia.id', 'admin')
    const penulis = await buatAkun('penulis@rise-reformia.id', 'penulis')

    await payload.update({
      collection: 'users',
      id: penulis.id,
      data: { nama: 'Nama Baru', peran: 'admin' },
      user: penulis,
      overrideAccess: false,
    })

    const sesudah = await payload.findByID({ collection: 'users', id: penulis.id })
    expect(sesudah.nama).toBe('Nama Baru')
    expect(sesudah.peran).toBe('penulis')
  })

  it('Editor tidak bisa mengubah atau menghapus akun orang lain', async () => {
    await buatAkun('admin@rise-reformia.id', 'admin')
    const editor = await buatAkun('editor@rise-reformia.id', 'editor')
    const penulis = await buatAkun('penulis@rise-reformia.id', 'penulis')

    await expect(
      payload.update({ collection: 'users', id: penulis.id, data: { nama: 'Diubah' }, user: editor, overrideAccess: false }),
    ).rejects.toThrow()
    await expect(
      payload.delete({ collection: 'users', id: penulis.id, user: editor, overrideAccess: false }),
    ).rejects.toThrow()
  })

  it('Admin bisa mengubah peran dan menghapus akun lain', async () => {
    const admin = await buatAkun('admin@rise-reformia.id', 'admin')
    const penulis = await buatAkun('penulis@rise-reformia.id', 'penulis')

    const naik = await payload.update({
      collection: 'users',
      id: penulis.id,
      data: { peran: 'editor' },
      user: admin,
      overrideAccess: false,
    })
    expect(naik.peran).toBe('editor')

    await payload.delete({ collection: 'users', id: penulis.id, user: admin, overrideAccess: false })
    const sisa = await payload.find({ collection: 'users', where: { id: { equals: penulis.id } } })
    expect(sisa.totalDocs).toBe(0)
  })

  it('staf yang login bisa melihat daftar pengguna, pengunjung anonim tidak', async () => {
    await buatAkun('admin@rise-reformia.id', 'admin')
    const penulis = await buatAkun('penulis@rise-reformia.id', 'penulis')

    const dilihatPenulis = await payload.find({ collection: 'users', user: penulis, overrideAccess: false })
    expect(dilihatPenulis.totalDocs).toBe(2)

    await expect(payload.find({ collection: 'users', overrideAccess: false })).rejects.toThrow()
  })

  it('Admin terakhir tidak bisa menurunkan perannya sendiri', async () => {
    const admin = await buatAkun('admin@rise-reformia.id', 'admin')

    await expect(
      payload.update({ collection: 'users', id: admin.id, data: { peran: 'editor' }, user: admin, overrideAccess: false }),
    ).rejects.toThrow()

    const sesudah = await payload.findByID({ collection: 'users', id: admin.id })
    expect(sesudah.peran).toBe('admin')
  })

  it('Admin bisa menurunkan peran Admin lain selama masih ada Admin tersisa', async () => {
    const admin = await buatAkun('admin@rise-reformia.id', 'admin')
    const adminKedua = await buatAkun('admin2@rise-reformia.id', 'admin')

    const turun = await payload.update({
      collection: 'users',
      id: adminKedua.id,
      data: { peran: 'editor' },
      user: admin,
      overrideAccess: false,
    })
    expect(turun.peran).toBe('editor')
  })

  it('Admin tidak bisa menghapus akunnya sendiri', async () => {
    const admin = await buatAkun('admin@rise-reformia.id', 'admin')
    await buatAkun('admin2@rise-reformia.id', 'admin')

    await expect(
      payload.delete({ collection: 'users', id: admin.id, user: admin, overrideAccess: false }),
    ).rejects.toThrow()
  })

  it('Admin terakhir tidak bisa dihapus', async () => {
    const admin = await buatAkun('admin@rise-reformia.id', 'admin')

    await expect(payload.delete({ collection: 'users', id: admin.id })).rejects.toThrow()
  })
})
