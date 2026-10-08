import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { KartuInsight, type UkuranKartuInsight } from '@/components/Kartu'
import { getMessages } from '@/i18n'
import { daftarInsightTerbit } from '@/insight/data'
import { barisMeta, gambar, namaKategori, tanggalTerbit } from '@/insight/tampilan'
import { RUTE } from '@/situs/rute'

const t = getMessages().insight

export const metadata: Metadata = t.meta

const hrefHalaman = (n: number) => (n <= 1 ? RUTE.insight : `${RUTE.insight}?halaman=${n}`)

export default async function DaftarInsight({ searchParams }: { searchParams: Promise<{ halaman?: string }> }) {
  const { halaman: param } = await searchParams
  const halaman = param === undefined ? 1 : Number(param)
  if (!Number.isInteger(halaman) || halaman < 1) notFound()

  const hasil = await daftarInsightTerbit(halaman)
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
      href={`${RUTE.insight}/${insight.slug}`}
      sampul={gambar(insight.sampul, ukuran === 'utama' ? 'sampul' : 'kartu')}
    />
  )

  return (
    <div className="wadah halaman-insight">
      <header className="halaman-insight__kepala">
        <h1 className="judul-1">{t.judul}</h1>
        <p className="teks-redup">{t.subjudul}</p>
      </header>

      {hasil.totalDocs === 0 ? (
        <p className="halaman-insight__kosong">{t.kosong}</p>
      ) : (
        <>
          {utama && kartu(utama, 'utama')}
          {lainnya.length > 0 && <div className="grid-insight">{lainnya.map((i) => i && kartu(i, 'biasa'))}</div>}
        </>
      )}

      {hasil.totalPages > 1 && (
        <nav aria-label={t.navigasiHalaman} className="paginasi">
          {hasil.hasPrevPage && (
            <Link href={hrefHalaman(halaman - 1)} rel="prev">
              {t.sebelumnya}
            </Link>
          )}
          <span>{t.halamanKe(halaman, hasil.totalPages)}</span>
          {hasil.hasNextPage && (
            <Link href={hrefHalaman(halaman + 1)} rel="next">
              {t.berikutnya}
            </Link>
          )}
        </nav>
      )}
    </div>
  )
}
