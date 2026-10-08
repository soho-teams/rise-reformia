import config from '@payload-config'
import { draftMode, headers } from 'next/headers'
import { getPayload } from 'payload'

export const INSIGHT_PER_HALAMAN = 9

/** Insight terbit untuk publik, terbaru dulu. Akses publik diterapkan (overrideAccess: false). */
export async function daftarInsightTerbit(halaman: number) {
  const payload = await getPayload({ config })
  return payload.find({
    collection: 'insight',
    overrideAccess: false,
    sort: '-tanggalTerbit',
    limit: INSIGHT_PER_HALAMAN,
    page: halaman,
    depth: 1,
  })
}

/**
 * Satu Insight menurut slug. Dalam mode pratinjau (diaktifkan lewat /next/pratinjau) versi draf
 * terbaru ikut terbaca, tetapi hanya selama sesi CMS masih aktif: akses dicek dengan pengguna
 * yang login, bukan dengan cookie pratinjau saja.
 */
export async function insightMenurutSlug(slug: string) {
  const payload = await getPayload({ config })
  const user = (await draftMode()).isEnabled ? (await payload.auth({ headers: await headers() })).user : null
  const pratinjau = Boolean(user)
  const { docs } = await payload.find({
    collection: 'insight',
    where: { slug: { equals: slug } },
    draft: pratinjau,
    user,
    overrideAccess: false,
    limit: 1,
    depth: 1,
  })
  return { insight: docs[0], pratinjau }
}
