import type { Metadata } from 'next'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import React from 'react'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { TombolWhatsapp } from '@/components/TombolWhatsapp'
import { defaultLocale, getMessages } from '@/i18n'
import './styles.css'

const t = getMessages()

// Font di-host sendiri saat build; nama variabelnya dipakai token --font-heading dan --font-body.
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['600', '700', '800'], variable: '--font-jakarta' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: `${t.site.name} | ${t.site.legalName}`,
  description: t.site.description,
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
