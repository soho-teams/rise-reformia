import { JsonLd } from '@/components/JsonLd'
import { PenandaData } from '@/components/PenandaData'
import { getMessages } from '@/i18n'
import { LAYANAN_LEAD } from '@/lead/periksa'
import { jsonLdRemah } from '@/situs/jsonLd'
import { metadataHalaman } from '@/situs/metadata'
import { pengaturanSitusHalaman } from '@/situs/pengaturan'
import { RUTE } from '@/situs/rute'
import { hrefTelepon, tampilNomorPonsel, tautanWhatsapp } from '@/situs/telepon'
import { situsTerindeks } from '@/situs/url'
import { FormLead } from './FormLead'

const pesan = getMessages()
const t = pesan.lead
const k = t.kontakLangsung

// Satu URL kanonis walaupun CTA Layanan menambahkan ?layanan=.
export const metadata = metadataHalaman({ ...t.meta, path: RUTE.kontak })

export default async function KontakPage({ searchParams }: { searchParams: Promise<{ layanan?: string }> }) {
  const { layanan } = await searchParams
  const kontak = await pengaturanSitusHalaman()
  const alamat = kontak.alamat?.split('\n').map((b) => b.trim()).filter(Boolean) ?? []
  const wa = kontak.whatsapp ? tautanWhatsapp(kontak.whatsapp, kontak.pesanWhatsapp) : undefined

  return (
    <div className="wadah halaman-kontak">
      <JsonLd
        data={jsonLdRemah([
          { nama: pesan.layout.nav.beranda, path: RUTE.beranda },
          { nama: pesan.layout.nav.kontak, path: RUTE.kontak },
        ])}
      />
      <div className="halaman-kontak__kepala">
        <h1 className="halaman-kontak__judul">{t.judul}</h1>
        <p className="pembuka__pengantar">{t.subjudul}</p>
      </div>

      <div className="halaman-kontak__isi">
        <div className="halaman-kontak__form">
          <FormLead
            layananAwal={(LAYANAN_LEAD as readonly string[]).includes(layanan ?? '') ? layanan : undefined}
            tautanWhatsapp={wa}
            tampilkanPenanda={!situsTerindeks()}
          />
        </div>

        <aside aria-labelledby="judul-langsung" className="kontak-langsung">
          <h2 id="judul-langsung">{k.judul}</h2>
          <dl>
            {kontak.whatsapp ? (
              <div>
                <dt>{k.whatsapp}</dt>
                <dd>
                  <a href={wa} rel="noopener" target="_blank">
                    {tampilNomorPonsel(kontak.whatsapp)}
                  </a>
                </dd>
              </div>
            ) : (
              <PenandaData>{k.penandaWhatsapp}</PenandaData>
            )}
            <div>
              <dt>{k.email}</dt>
              <dd>
                <a href={`mailto:${kontak.emailKontak}`}>{kontak.emailKontak}</a>
              </dd>
            </div>
            <div>
              <dt>{k.telepon}</dt>
              <dd>
                <a href={hrefTelepon(kontak.telepon)}>{kontak.telepon}</a>
              </dd>
            </div>
            {alamat.length > 0 && (
              <div>
                <dt>{k.alamat}</dt>
                <dd className="kontak-langsung__alamat">
                  {alamat.map((baris, i) => (
                    <span key={i}>{baris}</span>
                  ))}
                </dd>
              </div>
            )}
            {kontak.jamLayanan && (
              <div>
                <dt>{k.jam}</dt>
                <dd>{kontak.jamLayanan}</dd>
              </div>
            )}
          </dl>
        </aside>
      </div>
    </div>
  )
}
