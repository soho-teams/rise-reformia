import { beforeAll, beforeEach, describe, expect, it } from 'vitest'
import type { Payload } from 'payload'

import { bagianOpsionalPublik } from '@/situs/bagianOpsional'
import type { User } from '@/payload-types'
import { getTestPayload, kosongkanPengguna } from '../helpers/payload'

let payload: Payload
let admin: User

const SANDI = 'rahasia-panjang-123'
const buatAkun = (email: string, peran: User['peran']) =>
  payload.create({ collection: 'users', data: { email, password: SANDI, nama: email, peran } })

const aturToggle = (data: { tampilKonsultan?: boolean; tampilKlien?: boolean; tampilTestimoni?: boolean }) =>
  payload.updateGlobal({ slug: 'bagian-opsional', data, user: admin, overrideAccess: false })

describe('Bagian Opsional: Konsultan, Klien, dan testimoni', () => {
  beforeAll(async () => {
    payload = await getTestPayload()
  })

  beforeEach(async () => {
    await kosongkanPengguna(payload)
    for (const collection of ['konsultan', 'klien', 'testimoni'] as const) {
      await payload.delete({ collection, where: { id: { exists: true } } })
    }
    admin = await buatAkun('admin@rise-reformia.id', 'admin')
    await aturToggle({ tampilKonsultan: false, tampilKlien: false, tampilTestimoni: false })
  })

  it('semua bagian tersembunyi secara bawaan, walaupun datanya ada', async () => {
    await payload.create({ collection: 'konsultan', data: { nama: 'Ayu Lestari', jabatan: 'Konsultan Senior', urutan: 1 } })
    await payload.create({ collection: 'klien', data: { nama: 'PT Contoh', urutan: 1 } })
    await payload.create({
      collection: 'testimoni',
      data: { kutipan: 'Pendampingannya membantu.', nama: 'Budi', jabatan: 'Direktur', perusahaan: 'PT Contoh', urutan: 1 },
    })

    const publik = await bagianOpsionalPublik(payload)

    expect(publik).toEqual({ konsultan: [], klien: [], testimoni: [] })
    await expect(payload.find({ collection: 'konsultan', overrideAccess: false })).rejects.toThrow()
  })

  it('toggle aktif menampilkan data sesuai urutan, hanya untuk bagian yang dinyalakan', async () => {
    await payload.create({ collection: 'konsultan', data: { nama: 'Kedua', jabatan: 'Konsultan', urutan: 2 } })
    await payload.create({ collection: 'konsultan', data: { nama: 'Pertama', jabatan: 'Partner', urutan: 1 } })
    await payload.create({ collection: 'klien', data: { nama: 'PT Contoh', urutan: 1 } })
    await aturToggle({ tampilKonsultan: true })

    const publik = await bagianOpsionalPublik(payload)

    expect(publik.konsultan.map((k) => k.nama)).toEqual(['Pertama', 'Kedua'])
    expect(publik.klien).toEqual([])
    const lewatApi = await payload.find({ collection: 'konsultan', overrideAccess: false })
    expect(lewatApi.totalDocs).toBe(2)
  })

  it('Editor dan Penulis tidak bisa mengubah Bagian Opsional, Konsultan, Klien, dan testimoni', async () => {
    const konsultan = await payload.create({ collection: 'konsultan', data: { nama: 'Ayu', jabatan: 'Konsultan', urutan: 1 } })
    for (const user of [await buatAkun('editor@rise-reformia.id', 'editor'), await buatAkun('penulis@rise-reformia.id', 'penulis')]) {
      await expect(
        payload.updateGlobal({ slug: 'bagian-opsional', data: { tampilKonsultan: true }, user, overrideAccess: false }),
      ).rejects.toThrow()
      await expect(
        payload.create({ collection: 'klien', data: { nama: 'PT Baru', urutan: 2 }, user, overrideAccess: false }),
      ).rejects.toThrow()
      await expect(
        payload.update({ collection: 'konsultan', id: konsultan.id, data: { nama: 'Diubah' }, user, overrideAccess: false }),
      ).rejects.toThrow()
      await expect(
        payload.create({
          collection: 'testimoni',
          data: { kutipan: 'x', nama: 'x', jabatan: 'x', perusahaan: 'x', urutan: 1 },
          user,
          overrideAccess: false,
        }),
      ).rejects.toThrow()
    }
  })
})
