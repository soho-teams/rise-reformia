import type { SlugLayanan } from '@/layanan'

export const RUTE = {
  beranda: '/',
  // Indeks Layanan berupa bagian di Beranda sampai SOH-151 memutuskan halaman indeksnya.
  layanan: '/#layanan',
  insight: '/insight',
  tentangKami: '/tentang-kami',
  kontak: '/kontak',
  kebijakanPrivasi: '/kebijakan-privasi',
} as const

export const ruteLayanan = (slug: SlugLayanan) => `/layanan/${slug}`

/** Form Kontak dengan Layanan diminati sudah terpilih. */
export const ruteKontakLayanan = (slug: SlugLayanan) => `${RUTE.kontak}?layanan=${slug}`

export const ruteInsight = (slug: string) => `${RUTE.insight}/${slug}`
