import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { getMessages } from '@/i18n'
import type { Layanan, Media } from '@/payload-types'

export type UkuranGambar = 'kartu' | 'sampul' | 'og'

const KATA_PER_MENIT = 200

/** Perkiraan waktu baca dalam menit (minimal 1), dihitung dari semua teks di isi rich text. */
export function waktuBaca(isi: SerializedEditorState | null | undefined): number {
  let kata = 0
  const jelajah = (node: unknown) => {
    if (!node || typeof node !== 'object') return
    const n = node as { text?: unknown; children?: unknown[] }
    if (typeof n.text === 'string') kata += n.text.split(/\s+/).filter(Boolean).length
    n.children?.forEach(jelajah)
  }
  jelajah(isi?.root)
  return Math.max(1, Math.ceil(kata / KATA_PER_MENIT))
}

const formatTanggal = new Intl.DateTimeFormat('id-ID', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'Asia/Jakarta',
})

export const tanggalTerbit = (iso: string | null | undefined): string => (iso ? formatTanggal.format(new Date(iso)) : '')

/** Baris keterangan di bawah judul: penulis, tanggal terbit, dan keterangan lain bila ada. */
export const barisMeta = (...bagian: (string | false | null | undefined)[]): string =>
  [getMessages().insight.penulis, ...bagian].filter(Boolean).join(' · ')

export const namaKategori = (kategori: number | Layanan | null | undefined): string =>
  typeof kategori === 'object' && kategori ? kategori.nama : ''

/** Gambar dari relasi upload (butuh depth >= 1); `ukuran` memilih turunan yang dibuat saat unggah. */
export function gambar(media: number | Media | null | undefined, ukuran: UkuranGambar) {
  if (typeof media !== 'object' || !media?.url) return undefined
  const turunan = media.sizes?.[ukuran]
  return {
    src: turunan?.url ?? media.url,
    alt: media.alt,
    width: turunan?.width ?? media.width ?? undefined,
    height: turunan?.height ?? media.height ?? undefined,
  }
}
