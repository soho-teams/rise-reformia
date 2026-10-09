import Link from 'next/link'
import type { ReactNode } from 'react'

type Varian = 'utama' | 'garis' | 'teks' | 'terang' | 'whatsapp'

/** Kelas tombol untuk elemen selain tautan, misalnya `<button type="submit">`. */
export const kelasTombol = (varian: Varian = 'utama', besar = false) =>
  `tombol tombol--${varian}${besar ? ' tombol--besar' : ''}`

/**
 * Tautan bergaya tombol. `utama` untuk satu aksi terpenting di sebuah bagian,
 * `garis` untuk aksi pendamping, `teks` untuk tautan aksi bergaris bawah,
 * `terang` untuk aksi utama di atas latar navy.
 */
export function Tombol({
  href,
  varian = 'utama',
  besar,
  children,
}: {
  href: string
  varian?: Varian
  /** Ukuran CTA utama di hero dan penutup halaman. */
  besar?: boolean
  children: ReactNode
}) {
  return (
    <Link href={href} className={kelasTombol(varian, besar)}>
      {children}
    </Link>
  )
}
