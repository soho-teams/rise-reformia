import { barisMeta, gambar, namaKategori, tanggalTerbit } from '@/insight/tampilan'
import type { Insight } from '@/payload-types'
import { ruteInsight } from '@/situs/rute'
import { KartuInsight, type UkuranKartuInsight } from './Kartu'

/** KartuInsight dari dokumen Insight Payload (depth 1), dipakai daftar, Beranda, dan halaman Layanan. */
export function KartuInsightDoc({ insight, ukuran = 'biasa' }: { insight: Insight; ukuran?: UkuranKartuInsight }) {
  return (
    <KartuInsight
      ukuran={ukuran}
      judul={insight.judul}
      ringkasan={insight.ringkasan}
      kategori={namaKategori(insight.kategori)}
      meta={barisMeta(tanggalTerbit(insight.tanggalTerbit))}
      href={ruteInsight(insight.slug ?? '')}
      sampul={gambar(insight.sampul, ukuran === 'utama' ? 'sampul' : 'kartu')}
    />
  )
}
