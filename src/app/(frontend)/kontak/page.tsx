import type { Metadata } from 'next'

import { getMessages } from '@/i18n'
import { FormLead } from './FormLead'

const t = getMessages().lead

export const metadata: Metadata = t.meta

// Tampilan sementara; desain final mengikuti mockup Kontak (SOH-153).
export default function KontakPage() {
  return (
    <div className="halaman-kontak">
      <h1>{t.judul}</h1>
      <p className="subjudul">{t.subjudul}</p>
      <FormLead />
    </div>
  )
}
