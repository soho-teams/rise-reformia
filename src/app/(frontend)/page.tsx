import { JsonLd } from '@/components/JsonLd'
import { getMessages } from '@/i18n'
import { jsonLdOrganisasi } from '@/situs/jsonLd'
import { metadataHalaman } from '@/situs/metadata'
import { pengaturanSitusHalaman } from '@/situs/pengaturan'
import { RUTE } from '@/situs/rute'

const t = getMessages()

export const metadata = metadataHalaman({ ...t.home.meta, path: RUTE.beranda })

export default async function BerandaPage() {
  const kontak = await pengaturanSitusHalaman()
  return (
    <div className="placeholder">
      <JsonLd data={jsonLdOrganisasi(kontak)} />
      <h1>{t.home.placeholderTitle}</h1>
      <p>{t.home.placeholderBody}</p>
    </div>
  )
}
