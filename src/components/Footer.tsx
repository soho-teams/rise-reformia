import Image from 'next/image'
import Link from 'next/link'

import { getMessages } from '@/i18n'
import { SLUG_LAYANAN } from '@/layanan'
import logoPutih from '../../docs/brand/logo/rise-logo-mono-white.svg'
import { KONTAK_RISE } from '@/situs/kontak'
import { RUTE, ruteLayanan } from '@/situs/rute'

const t = getMessages()
const f = t.layout.footer

export function Footer() {
  return (
    <footer className="footer">
      <div className="wadah footer__isi">
        <div className="footer__kolom-utama">
          <div className="footer__identitas">
            <Image src={logoPutih} alt={t.site.name} height={32} />
            <p className="footer__tagline">{f.tagline}</p>
            <p className="footer__deskripsi">{f.deskripsi}</p>
          </div>

          <nav aria-labelledby="footer-layanan" className="footer__grup">
            <h2 id="footer-layanan" className="footer__judul">
              {f.judulLayanan}
            </h2>
            <ul>
              {SLUG_LAYANAN.map((slug) => (
                <li key={slug}>
                  <Link href={ruteLayanan(slug)}>{t.layanan[slug]}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-perusahaan" className="footer__grup">
            <h2 id="footer-perusahaan" className="footer__judul">
              {f.judulPerusahaan}
            </h2>
            <ul>
              <li>
                <Link href={RUTE.tentangKami}>{t.layout.nav.tentangKami}</Link>
              </li>
              <li>
                <Link href={RUTE.insight}>{t.layout.nav.insight}</Link>
              </li>
              <li>
                <Link href={RUTE.kontak}>{t.layout.nav.kontak}</Link>
              </li>
            </ul>
          </nav>

          <div className="footer__grup footer__kontak">
            <h2 className="footer__judul">{f.judulKontak}</h2>
            <address>
              {t.kontakRise.alamat.map((baris) => (
                <span key={baris}>{baris}</span>
              ))}
            </address>
            <a href={KONTAK_RISE.telepon.href}>
              {f.telepon} {KONTAK_RISE.telepon.tampil}
            </a>
            <a href={`mailto:${KONTAK_RISE.email}`}>{KONTAK_RISE.email}</a>
            {KONTAK_RISE.whatsapp && (
              <a href={KONTAK_RISE.whatsapp.href}>
                {f.whatsapp} {KONTAK_RISE.whatsapp.tampil}
              </a>
            )}
            <span>{t.kontakRise.jamLayanan}</span>
            {KONTAK_RISE.mediaSosial.length > 0 && (
              <ul aria-label={f.mediaSosial} className="footer__sosmed">
                {KONTAK_RISE.mediaSosial.map(({ nama, href }) => (
                  <li key={href}>
                    <a href={href} rel="noopener" target="_blank">
                      {nama}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="footer__legal">
          <span>{f.hakCipta(new Date().getFullYear())}</span>
          <Link href={RUTE.kebijakanPrivasi}>{f.kebijakanPrivasi}</Link>
        </div>
      </div>
    </footer>
  )
}
