import { beforeAll, beforeEach, describe, expect, it } from 'vitest'
import type { Payload } from 'payload'

import { eksporLeadCsv } from '@/lead/ekspor'
import type { Lead, User } from '@/payload-types'
import { getTestPayload, kosongkanLead, kosongkanPengguna } from '../helpers/payload'

let payload: Payload
let admin: User

const SANDI = 'rahasia-panjang-123'

const buatAkun = (email: string, peran: User['peran']) =>
  payload.create({ collection: 'users', data: { email, password: SANDI, nama: email, peran } })

const buatLead = (data: Partial<Lead> = {}) =>
  payload.create({
    collection: 'leads',
    data: {
      nama: 'Sari Wulandari',
      perusahaan: 'PT Contoh Sejahtera',
      jabatan: 'HR Manager',
      email: 'sari@contoh.co.id',
      layanan: 'konsultasi-bisnis',
      pesan: 'Kami ingin menata ulang alur persetujuan pembelian.',
      persetujuanPdp: true,
      waktuPersetujuan: '2026-10-08T03:00:00.000Z',
      statusNotifikasi: 'terkirim',
      statusTindakLanjut: 'baru',
      ...data,
    },
  })

const barisCsv = (csv: string) => csv.replace(/^﻿/, '').trimEnd().split('\r\n')

describe('Pengelolaan Lead', () => {
  beforeAll(async () => {
    payload = await getTestPayload()
  })

  beforeEach(async () => {
    await kosongkanLead(payload)
    await kosongkanPengguna(payload)
    admin = await buatAkun('admin@rise-reformia.id', 'admin')
  })

  it('Lead baru berstatus tindak lanjut "baru" dan Admin bisa mengubahnya', async () => {
    const lead = await buatLead()
    expect(lead.statusTindakLanjut).toBe('baru')

    const diubah = await payload.update({
      collection: 'leads',
      id: lead.id,
      data: { statusTindakLanjut: 'dihubungi' },
      user: admin,
      overrideAccess: false,
    })

    expect(diubah.statusTindakLanjut).toBe('dihubungi')
  })

  it('Admin mengekspor Lead ke CSV dengan kolom yang benar, semua atau hasil saringan', async () => {
    await buatLead({ nama: 'Budi, "Pak" Santoso', statusTindakLanjut: 'selesai' })
    await buatLead({ nama: '=HYPERLINK("http://jahat")', telepon: '+62 812 3456 7890' })
    await buatLead({ nama: ' @SUM(A1)', perusahaan: "PT Maju d'Arc" })

    const semua = barisCsv(await eksporLeadCsv(payload, { user: admin }))
    expect(semua[0]).toBe(
      'Tanggal masuk,Nama,Perusahaan,Jabatan,Email,Telepon,Layanan diminati,Pesan,Status tindak lanjut,Status notifikasi,Waktu persetujuan data pribadi',
    )
    expect(semua).toHaveLength(4)
    // Koma dan tanda kutip di-escape; nilai yang bisa dibaca sebagai rumus spreadsheet dinetralkan.
    expect(semua.join('\n')).toContain('"Budi, ""Pak"" Santoso"')
    expect(semua.join('\n')).toContain(`"'=HYPERLINK(""http://jahat"")"`)
    expect(semua.join('\n')).toContain(",' @SUM(A1),")
    // Nomor telepon berawalan + tetap utuh, dan tanda kutip tunggal biasa tidak perlu di-escape.
    expect(semua.join('\n')).toContain(',+62 812 3456 7890,')
    expect(semua.join('\n')).toContain(",PT Maju d'Arc,")
    expect(semua.join('\n')).toContain('Konsultasi Bisnis')

    const saringan = barisCsv(
      await eksporLeadCsv(payload, { user: admin, where: { statusTindakLanjut: { equals: 'selesai' } } }),
    )
    expect(saringan).toHaveLength(2)
    expect(saringan[1]).toContain('Selesai')

    const dicari = barisCsv(await eksporLeadCsv(payload, { user: admin, cari: 'santoso' }))
    expect(dicari).toHaveLength(2)
    expect(dicari[1]).toContain('Santoso')
  })

  it('Admin menghapus Lead secara permanen', async () => {
    const lead = await buatLead()

    await payload.delete({ collection: 'leads', id: lead.id, user: admin, overrideAccess: false })

    const sisa = await payload.find({ collection: 'leads', where: { id: { equals: lead.id } } })
    expect(sisa.totalDocs).toBe(0)
  })

  it('Editor dan Penulis tidak bisa mengubah status, mengekspor, atau menghapus Lead', async () => {
    const lead = await buatLead()
    for (const user of [await buatAkun('editor@rise-reformia.id', 'editor'), await buatAkun('penulis@rise-reformia.id', 'penulis')]) {
      await expect(
        payload.update({ collection: 'leads', id: lead.id, data: { statusTindakLanjut: 'selesai' }, user, overrideAccess: false }),
      ).rejects.toThrow()
      await expect(eksporLeadCsv(payload, { user })).rejects.toThrow()
      await expect(payload.delete({ collection: 'leads', id: lead.id, user, overrideAccess: false })).rejects.toThrow()
    }
    const tetap = await payload.findByID({ collection: 'leads', id: lead.id })
    expect(tetap.statusTindakLanjut).toBe('baru')
  })
})
