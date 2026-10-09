'use client'

import { useEffect, useRef } from 'react'

/**
 * Menandai header induknya dengan data-digulir="true" setelah halaman digulir sedikit,
 * supaya CSS bisa mengecilkan header dan logo. Tidak merender apa pun yang terlihat.
 */
export function PemantauGulir() {
  const penanda = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const header = penanda.current?.closest('header')
    if (!header) return
    let menunggu = false
    const periksa = () => {
      menunggu = false
      header.dataset.digulir = String(window.scrollY > 16)
    }
    const saatGulir = () => {
      if (menunggu) return
      menunggu = true
      requestAnimationFrame(periksa)
    }
    periksa()
    window.addEventListener('scroll', saatGulir, { passive: true })
    return () => window.removeEventListener('scroll', saatGulir)
  }, [])

  return <span ref={penanda} hidden />
}
