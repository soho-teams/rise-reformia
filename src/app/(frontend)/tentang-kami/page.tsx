import { JsonLd } from '@/components/JsonLd'
import { KartuKonsultan } from '@/components/Kartu'
import { PenandaData } from '@/components/PenandaData'
import { Tombol } from '@/components/Tombol'
import { getMessages } from '@/i18n'
import { gambar } from '@/insight/tampilan'
import { bagianOpsionalHalaman } from '@/situs/bagianOpsional'
import { jsonLdRemah } from '@/situs/jsonLd'
import { metadataHalaman } from '@/situs/metadata'
import { RUTE } from '@/situs/rute'
import { situsTerindeks } from '@/situs/url'

const pesan = getMessages()
const t = pesan.tentangKami

export const metadata = metadataHalaman({ ...t.meta, path: RUTE.tentangKami })

export default async function TentangKami() {
  const { konsultan } = await bagianOpsionalHalaman()

  return (
    <>
      <JsonLd
        data={jsonLdRemah([
          { nama: pesan.layout.nav.beranda, path: RUTE.beranda },
          { nama: pesan.layout.nav.tentangKami, path: RUTE.tentangKami },
        ])}
      />

      <section className="wadah pembuka">
        <p className="pembuka__label">{t.label}</p>
        <h1 className="pembuka__judul">{t.judul}</h1>
        <p className="pembuka__pengantar">{t.pengantar}</p>
      </section>

      <section aria-labelledby="makna-nama" className="wadah makna-nama">
        <div className="makna-nama__kepala">
          <h2 id="makna-nama">{t.maknaNama.judul}</h2>
          <PenandaData>{t.maknaNama.penanda}</PenandaData>
        </div>
        <div className="makna-nama__kata">
          {t.maknaNama.kata.map(({ awal, sisa, arti }) => (
            <div key={awal}>
              <p className="makna-nama__nama">
                <span>{awal}</span>
                {sisa}
              </p>
              <p className="teks-redup">{arti}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="wadah dua-kolom">
        <h2 className="judul-2 dua-kolom__judul">{t.cerita.judul}</h2>
        <div className="dua-kolom__isi teks-panjang">
          {t.cerita.paragraf.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <PenandaData>{t.cerita.penanda}</PenandaData>
        </div>
      </section>

      <section className="bagian--navy">
        <div className="wadah visi-misi">
          <div>
            <h2 className="visi-misi__label">{t.visi.judul}</h2>
            <p className="visi-misi__visi">{t.visi.isi}</p>
            <PenandaData>{t.penandaDraf}</PenandaData>
          </div>
          <div>
            <h2 className="visi-misi__label">{t.misi.judul}</h2>
            <ol className="visi-misi__misi">
              {t.misi.butir.map((butir) => (
                <li key={butir}>{butir}</li>
              ))}
            </ol>
            <PenandaData>{t.penandaDraf}</PenandaData>
          </div>
        </div>
      </section>

      <section className="wadah nilai">
        <div className="nilai__kepala">
          <h2 className="judul-2">{t.nilai.judul}</h2>
          <PenandaData>{t.penandaDraf}</PenandaData>
        </div>
        <dl className="nilai__daftar">
          {t.nilai.butir.map(({ nama, isi }) => (
            <div key={nama}>
              <dt>{nama}</dt>
              <dd>{isi}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Tanpa profil yang ditampilkan, bagian ini hilang di produksi; staging menampilkan penandanya. */}
      {(konsultan.length > 0 || !situsTerindeks()) && (
        <section className="bagian--pasir" aria-labelledby="konsultan">
          <div className="wadah konsultan">
            <div className="konsultan__kepala">
              <h2 id="konsultan" className="judul-2">
                {t.konsultan.judul}
              </h2>
              <p>{t.konsultan.pengantar}</p>
            </div>
            {konsultan.length > 0 ? (
              <ul className="konsultan__grid">
                {konsultan.map((k) => (
                  <KartuKonsultan
                    key={k.id}
                    nama={k.nama}
                    jabatan={[k.jabatan, k.keahlian].filter(Boolean).join(' · ')}
                    foto={gambar(k.foto, 'kartu')}
                  />
                ))}
              </ul>
            ) : (
              <PenandaData>{t.konsultan.penanda}</PenandaData>
            )}
          </div>
        </section>
      )}

      <section className="wadah penutup">
        <div className="penutup__teks">
          <h2 className="penutup__judul">{t.penutup.judul}</h2>
          <p className="teks-redup">{t.penutup.isi}</p>
        </div>
        <div className="penutup__aksi">
          <Tombol href={RUTE.kontak} besar>
            {pesan.layout.cta}
          </Tombol>
          <Tombol href={RUTE.layanan} varian="teks">
            {t.penutup.tombolKedua}
          </Tombol>
        </div>
      </section>
    </>
  )
}
