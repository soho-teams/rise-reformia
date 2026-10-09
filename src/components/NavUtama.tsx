'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import { getMessagesUmum } from '@/i18n/klien'
import { SLUG_LAYANAN } from '@/layanan'
import { RUTE, ruteLayanan } from '@/situs/rute'

const t = getMessagesUmum()
const TAUTAN = [
  { href: RUTE.insight, label: t.layout.nav.insight },
  { href: RUTE.tentangKami, label: t.layout.nav.tentangKami },
  { href: RUTE.kontak, label: t.layout.nav.kontak },
]

/**
 * Navigasi utama. Di layar lebar Layanan berupa dropdown; di ponsel seluruh menu
 * dilipat di balik tombol Menu dan daftar Layanan selalu terbuka di dalamnya.
 */
export function NavUtama() {
  const pathname = usePathname()
  const [menuTerbuka, setMenuTerbuka] = useState(false)
  const [layananTerbuka, setLayananTerbuka] = useState(false)
  const wadah = useRef<HTMLDivElement>(null)
  const tombolMenu = useRef<HTMLButtonElement>(null)
  const tombolLayanan = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!menuTerbuka && !layananTerbuka) return
    const tekanTombol = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      // Escape menutup lapisan paling dalam dulu, lalu fokus kembali ke tombol pembukanya.
      if (layananTerbuka) {
        setLayananTerbuka(false)
        tombolLayanan.current?.focus()
      } else {
        setMenuTerbuka(false)
        tombolMenu.current?.focus()
      }
    }
    const klikDiLuar = (e: PointerEvent) => {
      if (!wadah.current?.contains(e.target as Node)) {
        setLayananTerbuka(false)
        setMenuTerbuka(false)
      }
    }
    document.addEventListener('keydown', tekanTombol)
    document.addEventListener('pointerdown', klikDiLuar)
    return () => {
      document.removeEventListener('keydown', tekanTombol)
      document.removeEventListener('pointerdown', klikDiLuar)
    }
  }, [menuTerbuka, layananTerbuka])

  const tutupSetelahPindah = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('a')) {
      setMenuTerbuka(false)
      setLayananTerbuka(false)
    }
  }

  const halamanIni = (href: string) => (pathname === href ? 'page' : undefined)

  return (
    <div ref={wadah} className="nav-utama">
      <button
        ref={tombolMenu}
        type="button"
        className="nav-utama__toggle"
        aria-expanded={menuTerbuka}
        aria-controls="menu-utama"
        aria-label={t.layout.menu}
        onClick={() => setMenuTerbuka(!menuTerbuka)}
      >
        {/* Tiga garis hamburger; berubah menjadi tanda silang saat aria-expanded="true" (lihat CSS). */}
        <span aria-hidden="true" className="nav-utama__ikon">
          <span />
          <span />
          <span />
        </span>
      </button>

      <nav id="menu-utama" aria-label={t.layout.navLabel} className="nav-utama__menu" data-terbuka={menuTerbuka} onClick={tutupSetelahPindah}>
        <ul className="nav-utama__daftar">
          <li>
            <Link href={RUTE.beranda} aria-current={halamanIni(RUTE.beranda)} className="nav-utama__tautan">
              {t.layout.nav.beranda}
            </Link>
          </li>
          <li
            className="nav-utama__grup"
            onBlur={(e) => {
              // Dropdown tertutup saat fokus keyboard keluar dari grup Layanan.
              if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setLayananTerbuka(false)
            }}
          >
            <button
              ref={tombolLayanan}
              type="button"
              className="nav-utama__tautan nav-utama__pemicu"
              aria-expanded={layananTerbuka}
              aria-controls="submenu-layanan"
              onClick={() => setLayananTerbuka(!layananTerbuka)}
            >
              {t.layout.nav.layanan}
              <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                <path d="M2 4.5 6 8.5l4-4" fill="none" stroke="currentColor" strokeWidth="1.75" />
              </svg>
            </button>
            <span id="label-layanan" className="nav-utama__label-grup">
              {t.layout.nav.layanan}
            </span>
            <ul id="submenu-layanan" aria-labelledby="label-layanan" className="nav-utama__sub" data-terbuka={layananTerbuka}>
              {SLUG_LAYANAN.map((slug) => (
                <li key={slug}>
                  <Link href={ruteLayanan(slug)} aria-current={halamanIni(ruteLayanan(slug))} className="nav-utama__subtautan">
                    {t.layanan[slug]}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          {TAUTAN.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} aria-current={halamanIni(href)} className="nav-utama__tautan">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
