import { beforeAll, beforeEach, describe, expect, it } from 'vitest'
import type { Payload } from 'payload'

import type { Lead } from '@/payload-types'
import type { LeadNotifier } from '@/lead/notifier'
import { buatPembatasMemori } from '@/lead/pembatas'
import { submitLead } from '@/lead/submitLead'
import { getTestPayload, kosongkanLead, kosongkanPengguna } from '../helpers/payload'

let payload: Payload

const INPUT_VALID = {
  nama: 'Sari Wulandari',
  perusahaan: 'PT Contoh Sejahtera',
  jabatan: 'HR Manager',
  email: 'sari@contoh.co.id',
  telepon: '0812 3456 7890',
  layanan: 'psikologi-industri-organisasi',
  pesan: 'Kami ingin menyusun ulang proses rekrutmen untuk posisi supervisor.',
  persetujuan: 'on',
}

function notifierPalsu(gagal = false) {
  const terkirim: Lead[] = []
  const notifier: LeadNotifier = {
    kirim: async (lead) => {
      if (gagal) throw new Error('SMTP tidak bisa dihubungi')
      terkirim.push(lead)
    },
  }
  return { notifier, terkirim }
}

const kirim = (input: Record<string, unknown>, notifier: LeadNotifier, ip = '10.0.0.1', pembatas = buatPembatasMemori()) =>
  submitLead(input, { payload, notifier, pembatas, ip })

const semuaLead = async () => (await payload.find({ collection: 'leads', limit: 100 })).docs

describe('Kiriman Lead', () => {
  beforeAll(async () => {
    payload = await getTestPayload()
  })

  beforeEach(async () => {
    await kosongkanLead(payload)
  })

  it('kiriman yang valid tersimpan dan notifikasinya terkirim', async () => {
    const { notifier, terkirim } = notifierPalsu()

    const hasil = await kirim(INPUT_VALID, notifier)

    expect(hasil.ok).toBe(true)
    const [lead] = await semuaLead()
    expect(lead.nama).toBe('Sari Wulandari')
    expect(lead.layanan).toBe('psikologi-industri-organisasi')
    expect(lead.persetujuanPdp).toBe(true)
    expect(lead.waktuPersetujuan).toBeTruthy()
    expect(lead.statusNotifikasi).toBe('terkirim')
    expect(terkirim.map((l) => l.email)).toEqual(['sari@contoh.co.id'])
  })

  it('tanpa persetujuan data pribadi kiriman ditolak dan tidak disimpan', async () => {
    const { notifier, terkirim } = notifierPalsu()

    const hasil = await kirim({ ...INPUT_VALID, persetujuan: undefined }, notifier)

    expect(hasil).toMatchObject({
      ok: false,
      errors: { persetujuan: 'Untuk melanjutkan, mohon centang persetujuan pemrosesan data.' },
    })
    expect(await semuaLead()).toHaveLength(0)
    expect(terkirim).toHaveLength(0)
  })

  it('isian wajib yang kosong mendapat pesan error masing-masing', async () => {
    const { notifier } = notifierPalsu()

    const hasil = await kirim({ persetujuan: 'on' }, notifier)

    expect(hasil.ok).toBe(false)
    if (hasil.ok) return
    expect(Object.keys(hasil.errors).sort()).toEqual(['email', 'jabatan', 'layanan', 'nama', 'perusahaan', 'pesan'])
    expect(hasil.errors.nama).toBe('Mohon isi nama Anda.')
  })

  it('email dan telepon dengan format salah ditolak', async () => {
    const { notifier } = notifierPalsu()

    const hasil = await kirim({ ...INPUT_VALID, email: 'sari@contoh', telepon: 'nomor saya' }, notifier)

    expect(hasil).toMatchObject({
      ok: false,
      errors: {
        email: 'Alamat email belum sesuai. Contoh yang benar: nama@perusahaan.com.',
        telepon: 'Nomor telepon belum sesuai. Gunakan angka saja, misalnya 081234567890 atau +6281234567890.',
      },
    })
  })

  it('pilihan "Belum yakin / perlu diskusi" diterima', async () => {
    const { notifier } = notifierPalsu()

    const hasil = await kirim({ ...INPUT_VALID, layanan: 'belum-yakin' }, notifier)

    expect(hasil.ok).toBe(true)
    const [lead] = await semuaLead()
    expect(lead.layanan).toBe('belum-yakin')
  })

  it('kiriman bot lewat honeypot dibuang diam-diam', async () => {
    const { notifier, terkirim } = notifierPalsu()

    const hasil = await kirim({ ...INPUT_VALID, situs: 'https://spam.example' }, notifier)

    expect(hasil.ok).toBe(true)
    expect(await semuaLead()).toHaveLength(0)
    expect(terkirim).toHaveLength(0)
  })

  it('kiriman berlebih dari alamat IP yang sama ditolak sementara', async () => {
    const { notifier } = notifierPalsu()
    const pembatas = buatPembatasMemori()

    for (let i = 0; i < 5; i++) {
      expect((await kirim(INPUT_VALID, notifier, '10.0.0.9', pembatas)).ok).toBe(true)
    }
    const keenam = await kirim(INPUT_VALID, notifier, '10.0.0.9', pembatas)
    const ipLain = await kirim(INPUT_VALID, notifier, '10.0.0.10', pembatas)

    expect(keenam).toMatchObject({
      ok: false,
      pesan: 'Anda sudah mengirim beberapa kali dalam waktu singkat. Mohon tunggu beberapa menit, lalu coba lagi.',
    })
    expect(ipLain.ok).toBe(true)
    expect(await semuaLead()).toHaveLength(6)
  })

  it('kiriman yang gagal validasi tidak menghabiskan kuota rate limit', async () => {
    const { notifier } = notifierPalsu()
    const pembatas = buatPembatasMemori()

    for (let i = 0; i < 6; i++) {
      expect((await kirim({ ...INPUT_VALID, email: 'salah' }, notifier, '10.0.0.7', pembatas)).ok).toBe(false)
    }
    const valid = await kirim(INPUT_VALID, notifier, '10.0.0.7', pembatas)

    expect(valid.ok).toBe(true)
  })

  it('bila notifikasi gagal, Lead tetap tersimpan dengan status gagal', async () => {
    const { notifier } = notifierPalsu(true)

    const hasil = await kirim(INPUT_VALID, notifier)

    expect(hasil.ok).toBe(true)
    const [lead] = await semuaLead()
    expect(lead.statusNotifikasi).toBe('gagal')
  })
})

describe('Akses data Lead', () => {
  beforeAll(async () => {
    payload = await getTestPayload()
  })

  it('hanya Admin yang bisa membaca dan mengubah Lead; bukti persetujuan terkunci; Lead tidak bisa dibuat lewat API publik', async () => {
    await kosongkanLead(payload)
    await kosongkanPengguna(payload)
    const sandi = 'rahasia-panjang-123'
    const admin = await payload.create({ collection: 'users', data: { email: 'admin@rise-reformia.id', password: sandi, nama: 'Admin', peran: 'admin' } })
    const editor = await payload.create({ collection: 'users', data: { email: 'editor@rise-reformia.id', password: sandi, nama: 'Editor', peran: 'editor' } })
    const penulis = await payload.create({ collection: 'users', data: { email: 'penulis@rise-reformia.id', password: sandi, nama: 'Penulis', peran: 'penulis' } })
    await kirim(INPUT_VALID, notifierPalsu().notifier)

    const dilihatAdmin = await payload.find({ collection: 'leads', user: admin, overrideAccess: false })
    expect(dilihatAdmin.totalDocs).toBe(1)
    for (const pelaku of [editor, penulis]) {
      await expect(payload.find({ collection: 'leads', user: pelaku, overrideAccess: false })).rejects.toThrow()
    }

    const [lead] = (await payload.find({ collection: 'leads' })).docs
    for (const pelaku of [editor, penulis]) {
      await expect(
        payload.update({ collection: 'leads', id: lead.id, data: { nama: 'Diubah' }, user: pelaku, overrideAccess: false }),
      ).rejects.toThrow()
      await expect(payload.delete({ collection: 'leads', id: lead.id, user: pelaku, overrideAccess: false })).rejects.toThrow()
    }

    // Bukti persetujuan data pribadi tidak bisa diubah, termasuk oleh Admin.
    await payload.update({
      collection: 'leads',
      id: lead.id,
      data: { persetujuanPdp: false, waktuPersetujuan: '2000-01-01T00:00:00.000Z' },
      user: admin,
      overrideAccess: false,
    })
    const sesudah = await payload.findByID({ collection: 'leads', id: lead.id })
    expect(sesudah.persetujuanPdp).toBe(true)
    expect(sesudah.waktuPersetujuan).toBe(lead.waktuPersetujuan)

    await expect(
      payload.create({
        collection: 'leads',
        data: { nama: 'X', perusahaan: 'X', jabatan: 'X', email: 'x@x.id', layanan: 'konsultasi-bisnis', pesan: 'Pesan yang cukup panjang.', persetujuanPdp: true, waktuPersetujuan: new Date().toISOString(), statusNotifikasi: 'gagal' },
        overrideAccess: false,
      }),
    ).rejects.toThrow()
  })
})
