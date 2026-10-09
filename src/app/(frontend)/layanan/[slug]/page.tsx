import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { JsonLd } from '@/components/JsonLd'
import { KartuInsightDoc } from '@/components/KartuInsightDoc'
import { PenandaData } from '@/components/PenandaData'
import { Tombol } from '@/components/Tombol'
import { TombolChatWhatsapp } from '@/components/TombolChatWhatsapp'
import { getMessages } from '@/i18n'
import { insightTerkait } from '@/insight/data'
import { SLUG_LAYANAN, slugLayananValid } from '@/layanan'
import { jsonLdLayanan, jsonLdRemah } from '@/situs/jsonLd'
import { metadataHalaman } from '@/situs/metadata'
import { pengaturanSitusHalaman } from '@/situs/pengaturan'
import { RUTE, ruteInsightKategori, ruteKontakLayanan, ruteLayanan } from '@/situs/rute'
import { situsTerindeks } from '@/situs/url'

const pesan = getMessages()
const umum = pesan.halamanLayananUmum

type Props = { params: Promise<{ slug: string }> }

export const generateStaticParams = () => SLUG_LAYANAN.map((slug) => ({ slug }))

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  if (!slugLayananValid(slug)) return {}
  return metadataHalaman({ ...pesan.halamanLayanan[slug].meta, path: ruteLayanan(slug) })
}

export default async function HalamanLayanan({ params }: Props) {
  const { slug } = await params
  if (!slugLayananValid(slug)) notFound()
  const t = pesan.halamanLayanan[slug]
  const nama = pesan.layanan[slug]
  const [insight, kontak] = await Promise.all([insightTerkait(slug), pengaturanSitusHalaman()])
  const tampilkanPenanda = !situsTerindeks()
  const faq = t.faq.filter((f) => 'jawab' in f || tampilkanPenanda)

  const aksi = (
    <div className="hero-layanan__aksi">
      <Tombol href={ruteKontakLayanan(slug)} besar>
        {pesan.layout.cta}
      </Tombol>
      <TombolChatWhatsapp nomor={kontak.whatsapp} pesan={t.pesanWhatsapp} varian="garis" besar />
    </div>
  )

  return (
    <>
      <JsonLd data={jsonLdLayanan({ nama, deskripsi: t.meta.description, path: ruteLayanan(slug) })} />
      <JsonLd
        data={jsonLdRemah([
          { nama: pesan.layout.nav.beranda, path: RUTE.beranda },
          { nama: pesan.layout.nav.layanan, path: RUTE.layanan },
          { nama, path: ruteLayanan(slug) },
        ])}
      />

      <section className="wadah hero-layanan">
        <nav aria-label={umum.lokasiHalaman} className="remah">
          <Link href={RUTE.beranda}>{pesan.layout.nav.beranda}</Link>
          <span aria-hidden="true">/</span>
          <Link href={RUTE.layanan}>{pesan.layout.nav.layanan}</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{nama}</span>
        </nav>
        <div className="hero-layanan__isi">
          <div className="hero-layanan__teks">
            <p className="pembuka__label">{nama}</p>
            <h1 className="hero-layanan__judul">{t.judul}</h1>
            <p className="pembuka__pengantar">{t.pengantar}</p>
            {aksi}
          </div>
          <div className="hero-layanan__foto">
            <Image src={t.foto.src} alt={t.foto.alt} fill sizes="(min-width: 960px) 520px, 100vw" priority />
          </div>
        </div>
      </section>

      <section className="bagian--navy">
        <div className="wadah dua-kolom masalah">
          <h2 className="judul-2 dua-kolom__judul">{t.masalah.judul}</h2>
          <ul className="dua-kolom__isi masalah__daftar">
            {t.masalah.butir.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="wadah pendekatan">
        <div className="pendekatan__kepala">
          <h2 className="judul-2">{t.pendekatan.judul}</h2>
          <PenandaData>{t.pendekatan.penanda}</PenandaData>
        </div>
        <div aria-hidden="true" className="pendekatan__garis" />
        <ol className="pendekatan__langkah">
          {t.pendekatan.langkah.map((l, i) => (
            <li key={l.judul}>
              <span aria-hidden="true" className="pendekatan__nomor">
                {i + 1}
              </span>
              <h3>{l.judul}</h3>
              <p className="teks-redup">{l.isi}</p>
            </li>
          ))}
        </ol>
        {t.pendekatan.catatan && <p className="pendekatan__catatan">{t.pendekatan.catatan}</p>}
      </section>

      <section className="bagian--pasir">
        <div className="wadah cakupan">
          <div className="cakupan__kolom">
            <h2 className="judul-3">{t.cakupan.judul}</h2>
            <ul className="daftar-garis">
              {t.cakupan.butir.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <PenandaData>{t.cakupan.penanda}</PenandaData>
          </div>
          <div className="cakupan__kolom">
            <h2 className="judul-3">{umum.hasil}</h2>
            <p>{t.hasil.pengantar}:</p>
            <ul className="daftar-garis">
              {t.hasil.butir.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            {t.hasil.catatan && <p className="cakupan__catatan">{t.hasil.catatan}</p>}
          </div>
        </div>
      </section>

      {insight.length > 0 && (
        <section className="wadah insight-terkait" aria-labelledby="insight-terkait">
          <div className="insight-terkait__kepala">
            <h2 id="insight-terkait" className="judul-3">
              {umum.insightTerkait}
            </h2>
            <Link href={ruteInsightKategori(slug)}>{umum.bacaSemuaInsight}</Link>
          </div>
          <div className="grid-insight">
            {insight.map((doc) => (
              <KartuInsightDoc key={doc.id} insight={doc} />
            ))}
          </div>
        </section>
      )}

      {faq.length > 0 && (
        <section className="wadah dua-kolom faq">
          <h2 className="judul-3 dua-kolom__judul">{umum.pertanyaanUmum}</h2>
          <div className="dua-kolom__isi faq__daftar">
            {faq.map((f) => (
              <details key={f.tanya}>
                <summary>{f.tanya}</summary>
                {'jawab' in f ? <p className="teks-redup">{f.jawab}</p> : <PenandaData>{f.penanda}</PenandaData>}
              </details>
            ))}
          </div>
        </section>
      )}

      <section className="bagian--pasir">
        <div className="wadah penutup">
          <div className="penutup__teks">
            <h2 className="penutup__judul">{t.penutup.judul}</h2>
            <p>{t.penutup.isi}</p>
          </div>
          {aksi}
        </div>
      </section>
    </>
  )
}
