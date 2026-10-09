import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

const nextConfig: NextConfig = {
  // Dibutuhkan Dockerfile produksi (image berisi server.js mandiri); Vercel membangun dengan caranya sendiri.
  output: process.env.VERCEL ? undefined : 'standalone',
  // Domain utama tanpa www; www.rise-reformia.id diarahkan permanen ke sana.
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.rise-reformia.id' }],
        destination: 'https://rise-reformia.id/:path*',
        permanent: true,
      },
    ]
  },
  images: {
    localPatterns: [
      // Unggahan Media dari CMS dan foto statis situs di public/foto.
      { pathname: '/api/media/file/**' },
      { pathname: '/foto/**' },
    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  turbopack: {
    root: path.resolve(dirname),
  },
}

const konfigPayload = withPayload(nextConfig, { devBundleServerPackages: false })
const headersPayload = konfigPayload.headers

/**
 * Payload memasang Accept-CH/Critical-CH (tema gelap admin) di semua rute. Critical-CH membuat
 * browser mengulang permintaan halaman pertama, jadi halaman publik terasa seperti di-redirect.
 * Header itu cukup berlaku di panel admin.
 */
const konfig: NextConfig = {
  ...konfigPayload,
  async headers() {
    const daftar = (await headersPayload?.()) ?? []
    return daftar.map((aturan) =>
      aturan.source === '/:path*' && aturan.headers.some((h) => h.key === 'Critical-CH')
        ? { ...aturan, source: '/admin/:path*' }
        : aturan,
    )
  },
}

export default konfig
