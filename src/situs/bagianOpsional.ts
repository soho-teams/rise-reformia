import config from '@payload-config'
import { getPayload, type Payload } from 'payload'
import { cache } from 'react'

/**
 * Data Konsultan, Klien, dan testimoni untuk halaman publik. Bagian yang toggle-nya mati
 * selalu kosong, sehingga halaman cukup menyembunyikan bagian dengan daftar kosong.
 */
export async function bagianOpsionalPublik(payload: Payload) {
  const toggle = await payload.findGlobal({ slug: 'bagian-opsional', depth: 0 })
  const ambil = async <S extends 'konsultan' | 'klien' | 'testimoni'>(collection: S, tampil: boolean | null | undefined) =>
    tampil ? (await payload.find({ collection, depth: 1, pagination: false, sort: 'urutan', overrideAccess: false })).docs : []
  const [konsultan, klien, testimoni] = await Promise.all([
    ambil('konsultan', toggle.tampilKonsultan),
    ambil('klien', toggle.tampilKlien),
    ambil('testimoni', toggle.tampilTestimoni),
  ])
  return { konsultan, klien, testimoni }
}

export const bagianOpsionalHalaman = cache(async () => bagianOpsionalPublik(await getPayload({ config })))
