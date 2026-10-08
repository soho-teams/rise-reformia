import { beforeAll, beforeEach, describe, expect, it } from 'vitest'
import type { Payload, RequiredDataFromCollectionSlug } from 'payload'

import type { Layanan, User } from '@/payload-types'
import { isiTeks } from '../helpers/lexical'
import { getTestPayload, kosongkanInsight, kosongkanPengguna } from '../helpers/payload'

let payload: Payload
let kategori: Layanan

const SANDI = 'rahasia-panjang-123'

async function buatAkun(email: string, peran: User['peran']): Promise<User> {
  return payload.create({ collection: 'users', data: { email, password: SANDI, nama: email, peran } })
}

const draf = (judul: string, kategoriId = kategori.id) => ({
  judul,
  ringkasan: 'Ringkasan singkat untuk daftar Insight.',
  isi: isiTeks('Isi Insight untuk pengujian.'),
  kategori: kategoriId,
})

describe('Insight', () => {
  beforeAll(async () => {
    payload = await getTestPayload()
  })

  beforeEach(async () => {
    await kosongkanInsight(payload)
    await kosongkanPengguna(payload)
    // Akun pertama selalu Admin; buat dulu supaya peran akun uji sesuai yang diminta.
    await buatAkun('admin@rise-reformia.id', 'admin')
    const { docs } = await payload.find({ collection: 'layanan', where: { slug: { equals: 'konsultasi-manajemen' } } })
    kategori = docs[0]
  })

  it('empat Layanan tersedia dengan slug yang sama seperti form Lead', async () => {
    const { docs } = await payload.find({ collection: 'layanan', sort: 'urutan' })

    expect(docs.map((l) => l.slug)).toEqual([
      'konsultasi-manajemen',
      'psikologi-industri-organisasi',
      'konsultasi-bisnis',
      'training-pengembangan',
    ])
    expect(docs[1].nama).toBe('Psikologi Industri & Organisasi')
  })

  it('Editor menerbitkan Insight lalu Insight tampil untuk publik', async () => {
    const editor = await buatAkun('editor@rise-reformia.id', 'editor')

    const insight = await payload.create({
      collection: 'insight',
      data: { ...draf('Peta Keputusan Organisasi'), _status: 'published' as const },
      user: editor,
      overrideAccess: false,
    })

    expect(insight.slug).toBe('peta-keputusan-organisasi')
    expect(insight.tanggalTerbit).toBeTruthy()
    const publik = await payload.find({ collection: 'insight', overrideAccess: false })
    expect(publik.docs.map((d) => d.id)).toEqual([insight.id])
  })

  it('Penulis menyimpan draf tetapi gagal menerbitkan', async () => {
    const penulis = await buatAkun('penulis@rise-reformia.id', 'penulis')

    const simpan = await payload.create({
      collection: 'insight',
      data: draf('Draf Penulis'),
      draft: true,
      user: penulis,
      overrideAccess: false,
    })
    expect(simpan._status).toBe('draft')
    expect(typeof simpan.penulis === 'object' ? simpan.penulis?.id : simpan.penulis).toBe(penulis.id)

    await expect(
      payload.create({
        collection: 'insight',
        data: { ...draf('Terbit oleh Penulis'), _status: 'published' as const },
        user: penulis,
        overrideAccess: false,
      }),
    ).rejects.toThrow()
    await expect(
      payload.update({
        collection: 'insight',
        id: simpan.id,
        data: { _status: 'published' as const },
        user: penulis,
        overrideAccess: false,
      }),
    ).rejects.toThrow()

    const publik = await payload.find({ collection: 'insight', overrideAccess: false })
    expect(publik.totalDocs).toBe(0)
  })

  it('Penulis tidak bisa menetapkan orang lain sebagai penulis', async () => {
    const penulis = await buatAkun('penulis@rise-reformia.id', 'penulis')
    const lain = await buatAkun('lain@rise-reformia.id', 'penulis')

    const simpan = await payload.create({
      collection: 'insight',
      data: { ...draf('Atas Nama Orang Lain'), penulis: lain.id },
      draft: true,
      user: penulis,
      overrideAccess: false,
      depth: 0,
    })

    expect(simpan.penulis).toBe(penulis.id)
  })

  it('Editor menarik Insight sehingga hilang dari publik', async () => {
    const editor = await buatAkun('editor@rise-reformia.id', 'editor')
    const insight = await payload.create({
      collection: 'insight',
      data: { ...draf('Akan Ditarik'), _status: 'published' as const },
      user: editor,
      overrideAccess: false,
    })

    await payload.update({
      collection: 'insight',
      id: insight.id,
      data: { _status: 'draft' },
      user: editor,
      overrideAccess: false,
    })

    const publik = await payload.find({ collection: 'insight', overrideAccess: false })
    expect(publik.totalDocs).toBe(0)
  })

  it('Insight tanpa Kategori Insight ditolak', async () => {
    const editor = await buatAkun('editor@rise-reformia.id', 'editor')
    const { kategori: _dibuang, ...tanpaKategori } = draf('Tanpa Kategori')

    await expect(
      payload.create({
        collection: 'insight',
        // Sengaja tanpa kategori: menguji validasi field wajib.
        data: { ...tanpaKategori, _status: 'published' as const } as unknown as RequiredDataFromCollectionSlug<'insight'>,
        user: editor,
        overrideAccess: false,
      }),
    ).rejects.toThrow(/Kategori Insight/)
  })

  it('Penulis tidak bisa menyunting draf milik Penulis lain, Editor bisa', async () => {
    const pemilik = await buatAkun('pemilik@rise-reformia.id', 'penulis')
    const lain = await buatAkun('lain@rise-reformia.id', 'penulis')
    const editor = await buatAkun('editor@rise-reformia.id', 'editor')
    const milik = await payload.create({
      collection: 'insight',
      data: draf('Draf Milik Pemilik'),
      draft: true,
      user: pemilik,
      overrideAccess: false,
    })

    await expect(
      payload.update({
        collection: 'insight',
        id: milik.id,
        data: { judul: 'Diubah orang lain' },
        draft: true,
        user: lain,
        overrideAccess: false,
      }),
    ).rejects.toThrow()

    const diubah = await payload.update({
      collection: 'insight',
      id: milik.id,
      data: { judul: 'Disunting Editor' },
      draft: true,
      user: editor,
      overrideAccess: false,
    })
    expect(diubah.judul).toBe('Disunting Editor')
  })

  it('Layanan tidak bisa ditambah atau dihapus lewat admin', async () => {
    const admin = (await payload.find({ collection: 'users', where: { peran: { equals: 'admin' } } })).docs[0]

    await expect(
      payload.delete({ collection: 'layanan', id: kategori.id, user: admin, overrideAccess: false }),
    ).rejects.toThrow()
    await expect(
      payload.create({
        collection: 'layanan',
        data: { nama: 'Layanan Baru', slug: 'layanan-baru', urutan: 9 },
        user: admin,
        overrideAccess: false,
      }),
    ).rejects.toThrow()
  })

  it('Penulis tidak bisa menerbitkan dengan memulihkan versi terbit', async () => {
    const pemilik = await buatAkun('pemilik@rise-reformia.id', 'penulis')
    const editor = await buatAkun('editor@rise-reformia.id', 'editor')
    const insight = await payload.create({
      collection: 'insight',
      data: draf('Pernah Terbit'),
      draft: true,
      user: pemilik,
      overrideAccess: false,
    })
    await payload.update({ collection: 'insight', id: insight.id, data: { _status: 'published' }, user: editor, overrideAccess: false })
    await payload.update({ collection: 'insight', id: insight.id, data: { _status: 'draft' }, user: editor, overrideAccess: false })
    const { docs: versi } = await payload.findVersions({
      collection: 'insight',
      where: { and: [{ parent: { equals: insight.id } }, { 'version._status': { equals: 'published' } }] },
    })

    await expect(
      payload.restoreVersion({ collection: 'insight', id: versi[0].id, user: pemilik, overrideAccess: false }),
    ).rejects.toThrow()

    const publik = await payload.find({ collection: 'insight', overrideAccess: false })
    expect(publik.totalDocs).toBe(0)
  })

  it('Penulis tidak bisa menentukan tanggal terbit', async () => {
    const penulis = await buatAkun('penulis@rise-reformia.id', 'penulis')

    const simpan = await payload.create({
      collection: 'insight',
      data: { ...draf('Tanggal Mundur'), tanggalTerbit: '2020-01-01T00:00:00.000Z' },
      draft: true,
      user: penulis,
      overrideAccess: false,
    })

    expect(simpan.tanggalTerbit).toBeFalsy()
  })
})
