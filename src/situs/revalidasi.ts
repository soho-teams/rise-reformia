import { revalidatePath } from 'next/cache'

/**
 * Membuang cache halaman publik setelah konten berubah (Insight, Layanan, Pengaturan Situs).
 * Konten ini tampil di banyak halaman sekaligus, jadi seluruh layout situs direvalidasi.
 */
export function revalidasiSitus(): void {
  try {
    revalidatePath('/', 'layout')
  } catch {
    // Di luar runtime Next.js (tes Local API, skrip seed) tidak ada cache halaman untuk dibuang.
  }
}
