import { getMessages } from '@/i18n'
import type { PengaturanSitus } from '@/payload-types'
import { nomorE164 } from './telepon'
import { URL_SITUS, urlAbsolut } from './url'

const t = getMessages()

const organisasi = () => ({
  '@type': 'Organization',
  name: t.site.name,
  legalName: t.site.legalName,
  url: URL_SITUS,
  logo: urlAbsolut('/brand/rise-logo.png'),
})

/** Organization untuk Beranda, dengan kontak dari Pengaturan Situs. */
export function jsonLdOrganisasi(kontak: Pick<PengaturanSitus, 'emailKontak' | 'telepon' | 'alamat' | 'mediaSosial'>) {
  return {
    '@context': 'https://schema.org',
    ...organisasi(),
    description: t.site.description,
    email: kontak.emailKontak,
    telephone: nomorE164(kontak.telepon),
    address: kontak.alamat
      ? { '@type': 'PostalAddress', streetAddress: kontak.alamat.replace(/\s*\n\s*/g, ', '), addressCountry: 'ID' }
      : undefined,
    sameAs: kontak.mediaSosial?.map((akun) => akun.url),
  }
}

export function jsonLdArtikel(insight: {
  judul: string
  deskripsi: string
  path: string
  gambar?: string
  terbit?: string | null
  diubah: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: insight.judul,
    description: insight.deskripsi,
    mainEntityOfPage: urlAbsolut(insight.path),
    image: insight.gambar ? [new URL(insight.gambar, URL_SITUS).toString()] : undefined,
    datePublished: insight.terbit ?? undefined,
    dateModified: insight.diubah,
    inLanguage: 'id-ID',
    author: organisasi(),
    publisher: organisasi(),
  }
}

/** Jejak navigasi dari Beranda; elemen terakhir adalah halaman yang sedang dibuka. */
export function jsonLdRemah(remah: { nama: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: remah.map(({ nama, path }, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: nama,
      item: urlAbsolut(path),
    })),
  }
}
