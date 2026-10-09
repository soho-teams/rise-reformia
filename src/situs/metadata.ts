import type { Metadata } from 'next'

import { getMessages } from '@/i18n'

type Gambar = { url: string; width?: number; height?: number; alt?: string }

/** Gambar OG bermerek RISE (sumber: docs/brand/og-bawaan.html) untuk halaman tanpa gambar sendiri. */
export const GAMBAR_OG_BAWAAN: Gambar = {
  url: '/brand/og-rise.png',
  width: 1200,
  height: 630,
  alt: getMessages().site.altGambarOg,
}

/**
 * Metadata satu halaman publik: judul, deskripsi, URL kanonis, Open Graph, dan Twitter Card.
 * Tanpa `gambar`, halaman memakai GAMBAR_OG_BAWAAN. Gambar ditulis eksplisit karena objek
 * openGraph halaman menggantikan milik layout seluruhnya, termasuk gambarnya.
 */
export function metadataHalaman({
  title,
  description,
  path,
  gambar,
  tipe = 'website',
}: {
  title: string
  description: string
  path: string
  gambar?: Gambar
  tipe?: 'website' | 'article'
}): Metadata {
  const images = [gambar ?? GAMBAR_OG_BAWAAN]
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: getMessages().site.name,
      locale: 'id_ID',
      type: tipe,
      images,
    },
    twitter: { card: 'summary_large_image', title, description, images },
  }
}
