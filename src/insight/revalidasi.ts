import { revalidatePath } from 'next/cache'

/**
 * Membuang cache halaman publik setelah Insight berubah. Insight tampil di daftar, detail,
 * Beranda, dan halaman Layanan, jadi seluruh layout situs direvalidasi sekaligus.
 */
export function revalidasiSitus(): void {
  try {
    revalidatePath('/', 'layout')
  } catch {
    // Di luar runtime Next.js (tes Local API, skrip seed) tidak ada cache halaman untuk dibuang.
  }
}
