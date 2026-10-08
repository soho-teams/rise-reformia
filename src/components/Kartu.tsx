import Image from 'next/image'
import Link from 'next/link'

import { getMessages } from '@/i18n'

const t = getMessages().layout.kartu

type Gambar = { src: string; alt: string }

/** Satu baris di daftar Layanan: nama, ringkasan, dan tautan ke halamannya. */
export function KartuLayanan({ judul, ringkasan, href }: { judul: string; ringkasan: string; href: string }) {
  return (
    <li className="kartu-layanan">
      <h3 className="kartu-layanan__judul">{judul}</h3>
      <p className="kartu-layanan__ringkasan">{ringkasan}</p>
      <Link href={href} className="kartu-layanan__tautan" aria-label={`${t.lihatLayanan}: ${judul}`}>
        {t.lihatLayanan}
      </Link>
    </li>
  )
}

/** Kartu Insight di daftar dan di halaman Layanan. Judul menjadi tautan ke Insight. */
export function KartuInsight({
  judul,
  ringkasan,
  kategori,
  meta,
  href,
  sampul,
}: {
  judul: string
  ringkasan: string
  kategori: string
  meta: string
  href: string
  sampul?: Gambar
}) {
  return (
    <article className="kartu-insight">
      {sampul && (
        <div className="kartu-insight__sampul">
          <Image src={sampul.src} alt={sampul.alt} fill sizes="(min-width: 960px) 360px, 100vw" />
        </div>
      )}
      <span className="kartu-insight__kategori">{kategori}</span>
      <h3 className="kartu-insight__judul">
        <Link href={href}>{judul}</Link>
      </h3>
      <p className="kartu-insight__ringkasan">{ringkasan}</p>
      <p className="kartu-insight__meta">{meta}</p>
    </article>
  )
}

/** Profil singkat Konsultan di halaman Tentang Kami. */
export function KartuKonsultan({ nama, jabatan, foto }: { nama: string; jabatan: string; foto?: Gambar }) {
  return (
    <li className="kartu-konsultan">
      <div className="kartu-konsultan__foto">{foto && <Image src={foto.src} alt={foto.alt} fill sizes="(min-width: 960px) 280px, 100vw" />}</div>
      <p className="kartu-konsultan__nama">{nama}</p>
      <p className="kartu-konsultan__jabatan">{jabatan}</p>
    </li>
  )
}
