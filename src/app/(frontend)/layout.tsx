import type { Metadata } from 'next'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import React from 'react'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { TombolWhatsapp } from '@/components/TombolWhatsapp'
import { defaultLocale, getMessages } from '@/i18n'
import { GAMBAR_OG_BAWAAN } from '@/situs/metadata'
import { situsTerindeks, URL_SITUS } from '@/situs/url'
import './styles.css'

const t = getMessages()

// Font di-host sendiri saat build; nama variabelnya dipakai token --font-heading dan --font-body.
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['600', '700', '800'], variable: '--font-jakarta' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

// Bawaan untuk semua halaman publik; setiap halaman menimpanya lewat metadataHalaman().
export const metadata: Metadata = {
  metadataBase: new URL(URL_SITUS),
  title: t.site.title,
  description: t.site.description,
  openGraph: { siteName: t.site.name, locale: 'id_ID', type: 'website', images: [GAMBAR_OG_BAWAAN] },
  twitter: { card: 'summary_large_image', images: [GAMBAR_OG_BAWAAN] },
  robots: situsTerindeks() ? undefined : { index: false, follow: false },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={defaultLocale} className={`${jakarta.variable} ${inter.variable}`}>
      <body>
        <a href="#konten" className="lompat">
          {t.layout.lompat}
        </a>
        <Header />
        <main id="konten" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <TombolWhatsapp />
      </body>
    </html>
  )
}
