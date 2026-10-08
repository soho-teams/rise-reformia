import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getMessages } from '@/i18n'

// Ada dua root layout (situs publik dan Payload), jadi URL yang tidak cocok tidak otomatis
// memakai not-found milik situs. Rute penampung ini mengarahkannya ke sana. Metadata ditaruh
// di sini karena Next.js tidak membaca export metadata dari not-found.tsx.
export const metadata: Metadata = getMessages().halaman404.meta

export default function TidakAda() {
  notFound()
}
