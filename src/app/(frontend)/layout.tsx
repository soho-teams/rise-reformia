import type { Metadata } from 'next'
import React from 'react'

import { defaultLocale, getMessages } from '@/i18n'
import './styles.css'

const t = getMessages()

export const metadata: Metadata = {
  title: `${t.site.name} — ${t.site.legalName}`,
  description: t.site.description,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={defaultLocale}>
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
