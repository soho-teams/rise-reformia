import type { ReactNode } from 'react'

type Nada = 'terang' | 'pasir' | 'navy'

/** Satu bagian halaman selebar layar dengan isi di dalam wadah 1200 px. */
export function Bagian({
  nada = 'terang',
  id,
  labelledBy,
  children,
}: {
  nada?: Nada
  id?: string
  labelledBy?: string
  children: ReactNode
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`bagian bagian--${nada}`}>
      <div className="wadah bagian__isi">{children}</div>
    </section>
  )
}

/** Pembuka halaman: judul H1, pengantar, aksi, dan media opsional di sisi kanan. */
export function Hero({
  judul,
  pengantar,
  aksi,
  media,
}: {
  judul: ReactNode
  pengantar?: ReactNode
  aksi?: ReactNode
  media?: ReactNode
}) {
  return (
    <section className="hero">
      <div className="wadah hero__isi">
        <div className="hero__teks">
          <h1 className="judul-1">{judul}</h1>
          {pengantar && <p className="hero__pengantar">{pengantar}</p>}
          {aksi && <div className="hero__aksi">{aksi}</div>}
        </div>
        {media && <div className="hero__media">{media}</div>}
      </div>
    </section>
  )
}
