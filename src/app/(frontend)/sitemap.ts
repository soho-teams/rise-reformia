import config from '@payload-config'
import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'

import { RUTE, ruteInsight } from '@/situs/rute'
import { urlAbsolut } from '@/situs/url'

// Dibuat per permintaan supaya Insight yang baru terbit langsung masuk tanpa deploy ulang.
export const dynamic = 'force-dynamic'

// Halaman publik yang sudah ada. Tambahkan Layanan dan Kebijakan Privasi begitu halamannya
// dibuat (SOH-151, SOH-153).
const HALAMAN_STATIS = [RUTE.beranda, RUTE.tentangKami, RUTE.insight, RUTE.kontak]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'insight',
    overrideAccess: false,
    pagination: false,
    depth: 0,
    select: { slug: true, updatedAt: true },
    sort: '-tanggalTerbit',
  })
  return [
    ...HALAMAN_STATIS.map((path) => ({ url: urlAbsolut(path) })),
    ...docs.flatMap(({ slug, updatedAt }) => (slug ? [{ url: urlAbsolut(ruteInsight(slug)), lastModified: updatedAt }] : [])),
  ]
}
