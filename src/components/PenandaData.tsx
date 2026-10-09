import { situsTerindeks } from '@/situs/url'

/**
 * Penanda data yang belum dikirim RISE, misalnya "[PERLU DATA RISE: ...]". Hanya tampil di
 * staging (SITE_NOINDEX=true) supaya tim RISE melihat apa yang masih kurang; produksi menyembunyikannya.
 */
export function PenandaData({ children }: { children?: string }) {
  if (!children || situsTerindeks()) return null
  return <p className="penanda-data">[{children}]</p>
}
