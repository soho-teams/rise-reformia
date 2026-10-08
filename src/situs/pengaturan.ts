import config from '@payload-config'
import { getPayload, type Payload } from 'payload'
import { cache } from 'react'

/** Pengaturan Situs dibaca di server (tanpa batas akses), karena REST-nya hanya untuk Admin. */
export const ambilPengaturanSitus = (payload: Payload) =>
  payload.findGlobal({ slug: 'pengaturan-situs', depth: 0, overrideAccess: true })

/** Untuk server component: satu kali baca per render halaman, dipakai bersama footer dan tombol WhatsApp. */
export const pengaturanSitusHalaman = cache(async () => ambilPengaturanSitus(await getPayload({ config })))

export async function tujuanNotifikasiLead(payload: Payload): Promise<string[]> {
  const { emailNotifikasiLead } = await ambilPengaturanSitus(payload)
  return (emailNotifikasiLead ?? []).map((baris) => baris.email)
}
