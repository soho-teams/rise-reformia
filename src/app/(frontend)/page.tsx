import Image from 'next/image'
import Link from 'next/link'

import { JsonLd } from '@/components/JsonLd'
import { KartuInsight, KartuLayanan } from '@/components/Kartu'
import { PenandaData } from '@/components/PenandaData'
import { Tombol } from '@/components/Tombol'
import { getMessages } from '@/i18n'
import { insightTerbaru } from '@/insight/data'
import { barisMeta, gambar, namaKategori, tanggalTerbit } from '@/insight/tampilan'
import { SLUG_LAYANAN } from '@/layanan'
import { bagianOpsionalHalaman } from '@/situs/bagianOpsional'
import { jsonLdOrganisasi } from '@/situs/jsonLd'
import { metadataHalaman } from '@/situs/metadata'
import { pengaturanSitusHalaman } from '@/situs/pengaturan'
import { RUTE, ruteInsight, ruteLayanan } from '@/situs/rute'

const pesan = getMessages()
const t = pesan.beranda

export const metadata = metadataHalaman({ ...t.meta, path: RUTE.beranda })

export default async function Beranda() {
  const [kontak, insight, { klien, testimoni }] = await Promise.all([
    pengaturanSitusHalaman(),
    insightTerbaru(3),
    bagianOpsionalHalaman(),
  ])

  return (
    <>
      <JsonLd data={jsonLdOrganisasi(kontak)} />

      <section className="wadah hero-beranda">
        <div className="hero-beranda__teks">
          <h1 className="judul-1">{t.hero.judul}</h1>
          <p className="hero__pengantar">{t.hero.pengantar}</p>
          <div className="hero__aksi">
            <Tombol href={RUTE.kontak} besar>
              {pesan.layout.cta}
            </Tombol>
            <Tombol href="#layanan" varian="teks">
              {t.hero.ctaKedua}
            </Tombol>
          </div>
        </div>
        <div className="hero-beranda__foto">
          <Image src={t.hero.foto.src} alt={t.hero.foto.alt} fill sizes="(min-width: 960px) 520px, 100vw" priority />
        </div>
      </section>

      <div className="wadah">
        <ul className="sorotan">
          {t.sorotan.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <PenandaData>{t.penandaSorotan}</PenandaData>
      </div>

      <section id="layanan" aria-labelledby="judul-layanan" className="wadah ringkasan-layanan">
        <div className="ringkasan-layanan__kepala">
          <h2 id="judul-layanan" className="judul-2">
            {t.layanan.judul}
          </h2>
          <p className="teks-redup">{t.layanan.pengantar}</p>
        </div>
        <ul className="ringkasan-layanan__daftar">
          {SLUG_LAYANAN.map((slug) => (
            <KartuLayanan key={slug} judul={pesan.layanan[slug]} ringkasan={t.layanan.ringkasan[slug]} href={ruteLayanan(slug)} />
          ))}
        </ul>
      </section>

      <section className="bagian--navy">
        <div className="wadah persoalan">
          <h2 className="judul-2">{t.persoalan.judul}</h2>
          <div className="persoalan__kutipan">
            {t.persoalan.kutipan.map((k) => (
              <p key={k}>“{k}”</p>
            ))}
          </div>
          <div className="persoalan__penutup">
            <p>{t.persoalan.penutup}</p>
            <Tombol href={RUTE.kontak} varian="terang">
              {pesan.layout.cta}
            </Tombol>
          </div>
        </div>
      </section>

      <section className="wadah alasan">
        <div className="alasan__kepala">
          <h2 className="judul-2">{t.alasan.judul}</h2>
          <p className="teks-redup">{t.alasan.pengantar}</p>
        </div>
        <div className="alasan__daftar">
          {t.alasan.butir.map(({ judul, isi }) => (
            <div key={judul}>
              <h3>{judul}</h3>
              <p className="teks-redup">{isi}</p>
            </div>
          ))}
          <PenandaData>{t.alasan.penanda}</PenandaData>
        </div>
      </section>

      <section className="bagian--pasir">
        <div className="wadah pendekatan">
          <div className="pendekatan__kepala">
            <h2 className="judul-2">{t.memulai.judul}</h2>
            <PenandaData>{t.memulai.penanda}</PenandaData>
          </div>
          <div aria-hidden="true" className="pendekatan__garis" />
          <ol className="pendekatan__langkah">
            {t.memulai.langkah.map((l, i) => (
              <li key={l.judul}>
                <span aria-hidden="true" className="pendekatan__nomor">
                  {i + 1}
                </span>
                <h3>{l.judul}</h3>
                <p>{l.isi}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="judul-insight" className="wadah insight-beranda">
        <div className="insight-beranda__kepala">
          <h2 id="judul-insight" className="judul-2">
            {t.insight.judul}
          </h2>
          <p className="teks-redup">{t.insight.pengantar}</p>
          {insight.length > 0 && (
            <Tombol href={RUTE.insight} varian="teks">
              {pesan.halamanLayananUmum.bacaSemuaInsight}
            </Tombol>
          )}
        </div>
        {insight.length > 0 ? (
          <div className="insight-beranda__daftar">
            {insight.map((i) => (
              <KartuInsight
                key={i.id}
                judul={i.judul}
                ringkasan={i.ringkasan}
                kategori={namaKategori(i.kategori)}
                meta={barisMeta(tanggalTerbit(i.tanggalTerbit))}
                href={ruteInsight(i.slug ?? '')}
                sampul={gambar(i.sampul, 'kartu')}
              />
            ))}
          </div>
        ) : (
          <div className="insight-beranda__kosong">
            <p>{t.insight.kosong}</p>
            <Link href={RUTE.kontak}>{t.insight.kosongTautan}</Link>
          </div>
        )}
      </section>

      {klien.length > 0 && (
        <section aria-labelledby="judul-klien" className="wadah klien">
          <h2 id="judul-klien" className="judul-3">
            {t.klien.judul}
          </h2>
          <ul className="klien__daftar">
            {klien.map((k) => {
              const logo = gambar(k.logo, 'kartu')
              return (
                <li key={k.id}>
                  {logo ? <Image src={logo.src} alt={k.nama} width={160} height={64} /> : <span>{k.nama}</span>}
                </li>
              )
            })}
          </ul>
        </section>
      )}

      {testimoni.length > 0 && (
        <section aria-labelledby="judul-testimoni" className="bagian--pasir">
          <div className="wadah testimoni">
            <h2 id="judul-testimoni" className="judul-3">
              {t.testimoni.judul}
            </h2>
            <div className="testimoni__daftar">
              {testimoni.map((x) => (
                <figure key={x.id}>
                  <blockquote>“{x.kutipan}”</blockquote>
                  <figcaption>
                    <strong>{x.nama}</strong>, {x.jabatan}, {x.perusahaan}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="wadah penutup penutup--bergaris">
        <div className="penutup__teks">
          <h2 className="penutup__judul">{t.penutup.judul}</h2>
          <p className="teks-redup">{t.penutup.isi}</p>
        </div>
        <Tombol href={RUTE.kontak} besar>
          {pesan.layout.cta}
        </Tombol>
      </section>
    </>
  )
}
