import Image from 'next/image'
import Link from 'next/link'

import { getMessages } from '@/i18n'
import logo from '../../docs/brand/logo/rise-logo-horizontal.svg'
import simbol from '../../docs/brand/logo/rise-symbol.svg'
import { RUTE } from '@/situs/rute'
import { NavUtama } from './NavUtama'
import { PemantauGulir } from './PemantauGulir'
import { kelasTombol } from './Tombol'

const t = getMessages().layout

export function Header() {
  return (
    <header className="header">
      <PemantauGulir />
      <div className="wadah header__isi">
        <Link href={RUTE.beranda} aria-label={t.logoLabel} className="header__logo">
          {/* Layar lebar memakai logo lengkap; ponsel cukup simbol matahari agar header lega. */}
          <Image src={logo} alt="" height={25} priority className="header__logo-lengkap" />
          <Image src={simbol} alt="" height={28} priority className="header__logo-simbol" />
        </Link>
        <NavUtama />
        {/* CTA selalu terlihat di semua lebar layar; di ponsel memakai label pendek. */}
        <Link href={RUTE.kontak} className={`${kelasTombol('utama')} header__cta`}>
          <span className="header__cta-panjang">{t.cta}</span>
          <span className="header__cta-pendek">{t.ctaPendek}</span>
        </Link>
      </div>
    </header>
  )
}
