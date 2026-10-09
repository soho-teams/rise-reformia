import Image from 'next/image'
import Link from 'next/link'

import { getMessages } from '@/i18n'
import { SLUG_LAYANAN } from '@/layanan'
import logoPutih from '../../docs/brand/logo/rise-logo-mono-white.svg'
import { pengaturanSitusHalaman } from '@/situs/pengaturan'
import { RUTE, ruteLayanan } from '@/situs/rute'
import { hrefTelepon, tampilNomorPonsel, tautanWhatsapp } from '@/situs/telepon'

const t = getMessages()
const f = t.layout.footer

export async function Footer() {
  const kontak = await pengaturanSitusHalaman()
  const alamat = kontak.alamat?.split('\n').map((baris) => baris.trim()).filter(Boolean) ?? []
  return (
    <footer className="footer">
      <div className="wadah footer__isi">
        <div className="footer__kolom-utama">
          <div className="footer__identitas">
            <Image src={logoPutih} alt={t.site.name} height={25} />
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
            {alamat.length > 0 && (
              <address>
                {alamat.map((baris, i) => (
                  <span key={i}>{baris}</span>
                ))}
              </address>
            )}
            <a href={hrefTelepon(kontak.telepon)}>
              {f.telepon} {kontak.telepon}
            </a>
            <a href={`mailto:${kontak.emailKontak}`}>{kontak.emailKontak}</a>
            {kontak.whatsapp && (
              <a href={tautanWhatsapp(kontak.whatsapp, kontak.pesanWhatsapp)} rel="noopener" target="_blank">
                {f.whatsapp} {tampilNomorPonsel(kontak.whatsapp)}
              </a>
            )}
            {kontak.jamLayanan && <span>{kontak.jamLayanan}</span>}
            {kontak.mediaSosial && kontak.mediaSosial.length > 0 && (
              <ul aria-label={f.mediaSosial} className="footer__sosmed">
                {kontak.mediaSosial.map(({ id, nama, url }) => (
                  <li key={id ?? url}>
                    <a href={url} rel="noopener" target="_blank">
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
