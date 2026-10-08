import { beforeAll, beforeEach, describe, expect, it } from 'vitest'
import type { Payload } from 'payload'

import { EMAIL_RESMI } from '@/globals/PengaturanSitus'
import { buatNotifierEmail, type PengirimEmail } from '@/lead/notifier'
import { buatPembatasMemori } from '@/lead/pembatas'
import { submitLead } from '@/lead/submitLead'
import type { User } from '@/payload-types'
import { ambilPengaturanSitus, tujuanNotifikasiLead } from '@/situs/pengaturan'
import { getTestPayload, kosongkanLead, kosongkanPengguna } from '../helpers/payload'

let payload: Payload

const SANDI = 'rahasia-panjang-123'

async function buatAkun(email: string, peran: User['peran']): Promise<User> {
  return payload.create({ collection: 'users', data: { email, password: SANDI, nama: email, peran } })
}

describe('Pengaturan Situs', () => {
  beforeAll(async () => {
    payload = await getTestPayload()
  })

  beforeEach(async () => {
    await kosongkanPengguna(payload)
    await kosongkanLead(payload)
  })

  it('berisi data kontak resmi RISE sebelum pernah diubah', async () => {
    const pengaturan = await ambilPengaturanSitus(payload)

    expect(pengaturan.emailKontak).toBe(EMAIL_RESMI)
    expect(pengaturan.telepon).toBe('021 7362 639')
    expect(pengaturan.whatsapp).toBeFalsy()
  })

  it('notifikasi Lead dikirim ke semua email tujuan yang diatur', async () => {
    const admin = await buatAkun('admin@rise-reformia.id', 'admin')
    await payload.updateGlobal({
      slug: 'pengaturan-situs',
      data: { emailNotifikasiLead: [{ email: 'direksi@rise-reformia.id' }, { email: 'tim@rise-reformia.id' }] },
      user: admin,
      overrideAccess: false,
    })
    const surat: Parameters<PengirimEmail['sendMail']>[0][] = []
    const notifier = buatNotifierEmail({
      pengirim: { sendMail: async (pesan) => void surat.push(pesan) },
      dari: 'RISE <noreply@rise-reformia.id>',
      ambilTujuan: () => tujuanNotifikasiLead(payload),
    })

    const hasil = await submitLead(
      {
        nama: 'Sari Wulandari',
        perusahaan: 'PT Contoh Sejahtera',
        jabatan: 'HR Manager',
        email: 'sari@contoh.co.id',
        layanan: 'konsultasi-bisnis',
        pesan: 'Kami ingin menata ulang alur persetujuan pembelian di kantor cabang.',
        persetujuan: 'on',
      },
      { payload, notifier, pembatas: buatPembatasMemori(), ip: '10.0.0.9' },
    )

    expect(hasil.ok).toBe(true)
    expect(surat).toHaveLength(1)
    expect(surat[0].to).toEqual(['direksi@rise-reformia.id', 'tim@rise-reformia.id'])
    expect(surat[0].replyTo).toBe('sari@contoh.co.id')
  })

  it('hanya Admin yang bisa membaca dan mengubah Pengaturan Situs', async () => {
    // Akun pertama selalu Admin; buat dulu supaya dua akun berikutnya benar-benar Editor dan Penulis.
    await buatAkun('admin@rise-reformia.id', 'admin')
    const editor = await buatAkun('editor@rise-reformia.id', 'editor')
    const penulis = await buatAkun('penulis@rise-reformia.id', 'penulis')

    for (const user of [editor, penulis]) {
      await expect(
        payload.updateGlobal({ slug: 'pengaturan-situs', data: { telepon: '021 000' }, user, overrideAccess: false }),
      ).rejects.toThrow()
      await expect(payload.findGlobal({ slug: 'pengaturan-situs', user, overrideAccess: false })).rejects.toThrow()
    }
    await expect(payload.findGlobal({ slug: 'pengaturan-situs', overrideAccess: false })).rejects.toThrow()
  })

  it('nomor WhatsApp disimpan dalam format internasional dan input yang salah ditolak', async () => {
    const admin = await buatAkun('admin@rise-reformia.id', 'admin')
    const ubah = (whatsapp: string) =>
      payload.updateGlobal({ slug: 'pengaturan-situs', data: { whatsapp }, user: admin, overrideAccess: false })

    expect((await ubah('0812-3456-7890')).whatsapp).toBe('6281234567890')
    await expect(ubah('abc')).rejects.toThrow(/WhatsApp/)
    await expect(ubah('021 7362 639')).rejects.toThrow(/WhatsApp/)
    await expect(
      payload.updateGlobal({
        slug: 'pengaturan-situs',
        data: { mediaSosial: [{ nama: 'LinkedIn', url: 'https://contoh-palsu.com/rise' }] },
        user: admin,
        overrideAccess: false,
      }),
    ).rejects.toThrow(/URL/)
    const sah = await payload.updateGlobal({
      slug: 'pengaturan-situs',
      data: { mediaSosial: [{ nama: 'LinkedIn', url: 'https://www.linkedin.com/company/rise-reformia' }] },
      user: admin,
      overrideAccess: false,
    })
    expect(sah.mediaSosial).toHaveLength(1)
    await expect(
      payload.updateGlobal({ slug: 'pengaturan-situs', data: { telepon: 'hubungi kami' }, user: admin, overrideAccess: false }),
    ).rejects.toThrow(/Telepon/)

    await payload.updateGlobal({ slug: 'pengaturan-situs', data: { whatsapp: '', mediaSosial: [] } })
  })
})
