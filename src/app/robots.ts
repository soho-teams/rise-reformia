import type { MetadataRoute } from 'next'

import { situsTerindeks, urlAbsolut } from '@/situs/url'

export const dynamic = 'force-dynamic'

export default function robots(): MetadataRoute.Robots {
  if (!situsTerindeks()) return { rules: { userAgent: '*', disallow: '/' } }
  return {
    // Gambar Media (sampul Insight untuk Open Graph dan Article) disajikan lewat /api, jadi dibuka.
    rules: { userAgent: '*', allow: ['/', '/api/media/file/'], disallow: ['/admin', '/api', '/next'] },
    sitemap: urlAbsolut('/sitemap.xml'),
  }
}
