import { RUTE } from '@/situs/rute'
import { Tombol } from '@/components/Tombol'
import { getMessages } from '@/i18n'

const t = getMessages().halaman404

export default function TidakDitemukan() {
  return (
    <div className="wadah halaman-404">
      <h1 className="judul-1">{t.judul}</h1>
      <p>{t.isi}</p>
      <Tombol href={RUTE.beranda}>{t.beranda}</Tombol>
      <div className="halaman-404__tautan">
        <Tombol href={RUTE.layanan} varian="teks">
          {t.layanan}
        </Tombol>
        <Tombol href={RUTE.kontak} varian="teks">
          {t.kontak}
        </Tombol>
      </div>
    </div>
  )
}
