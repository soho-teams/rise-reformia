import { JsonLd } from '@/components/JsonLd'
import { getMessages } from '@/i18n'
import { jsonLdRemah } from '@/situs/jsonLd'
import { metadataHalaman } from '@/situs/metadata'
import { RUTE } from '@/situs/rute'
import { FormLead } from './FormLead'

const t = getMessages().lead

export const metadata = metadataHalaman({ ...t.meta, path: RUTE.kontak })

// Tampilan sementara; desain final mengikuti mockup Kontak (SOH-153).
export default function KontakPage() {
  return (
    <div className="halaman-kontak">
      <JsonLd
        data={jsonLdRemah([
          { nama: getMessages().layout.nav.beranda, path: RUTE.beranda },
          { nama: getMessages().layout.nav.kontak, path: RUTE.kontak },
        ])}
      />
      <h1>{t.judul}</h1>
      <p className="subjudul">{t.subjudul}</p>
      <FormLead />
    </div>
  )
}
