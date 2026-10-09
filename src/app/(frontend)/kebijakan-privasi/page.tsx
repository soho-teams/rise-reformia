import { JsonLd } from '@/components/JsonLd'
import { Prosa } from '@/components/Prosa'
import { TeksInline } from '@/components/TeksInline'
import { getMessages } from '@/i18n'
import { jsonLdRemah } from '@/situs/jsonLd'
import { metadataHalaman } from '@/situs/metadata'
import { RUTE } from '@/situs/rute'

const pesan = getMessages()
const t = pesan.kebijakanPrivasi

export const metadata = {
  ...metadataHalaman({ ...t.meta, path: RUTE.kebijakanPrivasi }),
  // Selama masih draf, halaman ini tidak boleh terindeks walaupun situsnya produksi.
  ...(t.draf ? { robots: { index: false, follow: true } } : {}),
}

export default function KebijakanPrivasi() {
  return (
    <article className="wadah halaman-teks">
      <JsonLd
        data={jsonLdRemah([
          { nama: pesan.layout.nav.beranda, path: RUTE.beranda },
          { nama: t.judul, path: RUTE.kebijakanPrivasi },
        ])}
      />
      {t.draf && (
        <p role="note" className="halaman-teks__draf">
          {t.draf}
        </p>
      )}
      <header className="halaman-teks__kepala">
        <h1 className="judul-1">{t.judul}</h1>
        <dl className="halaman-teks__info">
          {t.info.map(({ label, isi }) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>
                <TeksInline teks={isi} />
              </dd>
            </div>
          ))}
        </dl>
      </header>
      <Prosa>
        {t.blok.map((b, i) => {
          if (b.jenis === 'h2') return <h2 key={i}>{b.teks}</h2>
          if (b.jenis === 'p')
            return (
              <p key={i}>
                <TeksInline teks={b.teks} />
              </p>
            )
          const Daftar = b.jenis
          return (
            <Daftar key={i}>
              {b.butir.map((butir) => (
                <li key={butir}>
                  <TeksInline teks={butir} />
                </li>
              ))}
            </Daftar>
          )
        })}
      </Prosa>
    </article>
  )
}
