import Link from 'next/link'
import { notFound } from 'next/navigation'

import { KartuInsight, type UkuranKartuInsight } from '@/components/Kartu'
import { getMessages } from '@/i18n'
import { daftarInsightTerbit } from '@/insight/data'
import { barisMeta, gambar, namaKategori, tanggalTerbit } from '@/insight/tampilan'
import { JsonLd } from '@/components/JsonLd'
import { SLUG_LAYANAN, slugLayananValid, type SlugLayanan } from '@/layanan'
import { jsonLdRemah } from '@/situs/jsonLd'
import { metadataHalaman } from '@/situs/metadata'
import { RUTE, ruteInsight } from '@/situs/rute'

const pesan = getMessages()
const t = pesan.insight

/** URL daftar yang bisa dibagikan: `?kategori=` untuk saringan, `?halaman=` untuk paginasi. */
function hrefDaftar(kategori?: SlugLayanan, halaman = 1) {
  const q = new URLSearchParams()
  if (kategori) q.set('kategori', kategori)
  if (halaman > 1) q.set('halaman', String(halaman))
  const s = q.toString()
  return s ? `${RUTE.insight}?${s}` : RUTE.insight
}

type Props = { searchParams: Promise<{ halaman?: string; kategori?: string }> }

async function bacaParameter(searchParams: Props['searchParams']) {
  const { halaman: h, kategori: k } = await searchParams
  const halaman = h === undefined ? 1 : Number(h)
  const kategori = k === undefined ? undefined : slugLayananValid(k) ? k : null
  return { halaman, kategori }
}

// Setiap saringan dan halaman paginasi kanonis ke URL-nya sendiri, karena isinya berbeda.
export async function generateMetadata({ searchParams }: Props) {
  const { halaman, kategori } = await bacaParameter(searchParams)
  return metadataHalaman({
    ...t.meta,
    path: hrefDaftar(kategori ?? undefined, Number.isInteger(halaman) && halaman > 0 ? halaman : 1),
  })
}

export default async function DaftarInsight({ searchParams }: Props) {
  const { halaman, kategori: saringan } = await bacaParameter(searchParams)
  if (!Number.isInteger(halaman) || halaman < 1 || saringan === null) notFound()
  const kategori = saringan ?? undefined

  const hasil = await daftarInsightTerbit(halaman, kategori)
  if (halaman > 1 && hasil.docs.length === 0) notFound()

  // Di halaman pertama, Insight terbaru ditampilkan lebih besar dari yang lain.
  const [utama, ...lainnya] = halaman === 1 ? hasil.docs : [undefined, ...hasil.docs]
  const kartu = (insight: (typeof hasil.docs)[number], ukuran: UkuranKartuInsight) => (
    <KartuInsight
      key={insight.id}
      ukuran={ukuran}
      judul={insight.judul}
      ringkasan={insight.ringkasan}
      kategori={namaKategori(insight.kategori)}
      meta={barisMeta(tanggalTerbit(insight.tanggalTerbit))}
      href={ruteInsight(insight.slug ?? '')}
      sampul={gambar(insight.sampul, ukuran === 'utama' ? 'sampul' : 'kartu')}
    />
  )

  return (
    <div className="wadah halaman-insight">
      <JsonLd
        data={jsonLdRemah([
          { nama: pesan.layout.nav.beranda, path: RUTE.beranda },
          { nama: t.judul, path: RUTE.insight },
        ])}
      />
      <header className="halaman-insight__kepala">
        <h1 className="judul-1">{t.judul}</h1>
        <p className="teks-redup">{t.subjudul}</p>
      </header>

      <nav aria-label={t.filterLabel} className="filter-kategori">
        <ul>
          {[undefined, ...SLUG_LAYANAN].map((slug) => (
            <li key={slug ?? 'semua'}>
              <Link href={hrefDaftar(slug)} aria-current={slug === kategori ? 'page' : undefined}>
                {slug ? pesan.layanan[slug] : t.filterSemua}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {hasil.totalDocs === 0 ? (
        <p className="halaman-insight__kosong">{kategori ? t.kosongFilter : t.kosong}</p>
      ) : (
        <>
          {utama && kartu(utama, 'utama')}
          {lainnya.length > 0 && <div className="grid-insight">{lainnya.map((i) => i && kartu(i, 'biasa'))}</div>}
        </>
      )}

      {hasil.totalPages > 1 && (
        <nav aria-label={t.navigasiHalaman} className="paginasi">
          {hasil.hasPrevPage && (
            <Link href={hrefDaftar(kategori, halaman - 1)} rel="prev">
              {t.sebelumnya}
            </Link>
          )}
          <span>{t.halamanKe(halaman, hasil.totalPages)}</span>
          {hasil.hasNextPage && (
            <Link href={hrefDaftar(kategori, halaman + 1)} rel="next">
              {t.berikutnya}
            </Link>
          )}
        </nav>
      )}
    </div>
  )
}
