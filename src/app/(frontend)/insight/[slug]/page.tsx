import { RichText } from '@payloadcms/richtext-lexical/react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Prosa } from '@/components/Prosa'
import { Tombol } from '@/components/Tombol'
import { getMessages } from '@/i18n'
import { insightMenurutSlug } from '@/insight/data'
import { barisMeta, gambar, namaKategori, tanggalTerbit, waktuBaca } from '@/insight/tampilan'
import { JsonLd } from '@/components/JsonLd'
import { jsonLdArtikel, jsonLdRemah } from '@/situs/jsonLd'
import { metadataHalaman } from '@/situs/metadata'
import { RUTE, ruteInsight } from '@/situs/rute'

const t = getMessages()

type Props = { params: Promise<{ slug: string }> }

const MAKS_JUDUL_META = 60 - t.insight.metaDetail('').length
const potongJudul = (judul: string) =>
  judul.length > MAKS_JUDUL_META ? `${judul.slice(0, MAKS_JUDUL_META - 1).trimEnd()}…` : judul

const deskripsiSeo = (insight: { seo?: { deskripsi?: string | null } | null; ringkasan: string }) =>
  insight.seo?.deskripsi || insight.ringkasan

// Detail dirender saat pertama diminta lalu di-cache sampai Insight berubah (revalidasiSitus).
export const generateStaticParams = async () => []

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const { insight } = await insightMenurutSlug(slug)
  if (!insight) return {}
  const og = gambar(insight.sampul, 'og')
  return metadataHalaman({
    // Judul SEO dari Editor dipakai utuh. Tanpa itu, pola copy "{Judul} | Insight RISE"
    // dengan judul dipotong agar total maksimal 60 karakter.
    title: insight.seo?.judul || t.insight.metaDetail(potongJudul(insight.judul)),
    description: deskripsiSeo(insight),
    path: ruteInsight(slug),
    tipe: 'article',
    gambar: og && { url: og.src, width: og.width, height: og.height, alt: og.alt },
  })
}

export default async function DetailInsight({ params }: Props) {
  const { slug } = await params
  const { insight, pratinjau } = await insightMenurutSlug(slug)
  if (!insight) notFound()

  const sampul = gambar(insight.sampul, 'sampul')

  return (
    <article className="wadah detail-insight">
      <JsonLd
        data={jsonLdArtikel({
          judul: insight.judul,
          deskripsi: deskripsiSeo(insight),
          path: ruteInsight(slug),
          gambar: sampul?.src,
          terbit: insight.tanggalTerbit,
          diubah: insight.updatedAt,
        })}
      />
      <JsonLd
        data={jsonLdRemah([
          { nama: t.layout.nav.beranda, path: RUTE.beranda },
          { nama: t.insight.judul, path: RUTE.insight },
          { nama: insight.judul, path: ruteInsight(slug) },
        ])}
      />
      {pratinjau && (
        <p role="status" className="detail-insight__pratinjau">
          {t.insight.pratinjau} {/* Route handler, bukan halaman: navigasi penuh agar cookie pratinjau dihapus sebelum render. */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href="/next/keluar-pratinjau">{t.insight.keluarPratinjau}</a>
        </p>
      )}
      <header className="detail-insight__kepala">
        <Link href={RUTE.insight} className="detail-insight__kembali">
          {t.insight.kembali}
        </Link>
        <span className="detail-insight__kategori">{namaKategori(insight.kategori)}</span>
        <h1 className="judul-2">{insight.judul}</h1>
        <p className="detail-insight__ringkasan">{insight.ringkasan}</p>
        <p className="detail-insight__meta">
          {barisMeta(tanggalTerbit(insight.tanggalTerbit), t.insight.waktuBaca(waktuBaca(insight.isi)))}
        </p>
      </header>

      {sampul && (
        <figure className="detail-insight__sampul">
          <Image src={sampul.src} alt={sampul.alt} width={sampul.width} height={sampul.height} sizes="(min-width: 1200px) 1072px, 100vw" priority />
        </figure>
      )}

      <Prosa>
        <RichText data={insight.isi} disableContainer />
      </Prosa>

      <aside className="detail-insight__cta">
        <p>{t.insight.ctaAkhir}</p>
        <Tombol href={RUTE.kontak} varian="terang">
          {t.layout.cta}
        </Tombol>
      </aside>
    </article>
  )
}
