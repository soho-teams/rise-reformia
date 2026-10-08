/** Pilihan dan kolom daftar Lead di panel admin, dipakai bersama oleh koleksi dan ekspor CSV. */

export const PILIHAN_STATUS_TINDAK_LANJUT = [
  { label: 'Baru', value: 'baru' },
  { label: 'Dihubungi', value: 'dihubungi' },
  { label: 'Selesai', value: 'selesai' },
] as const

export const PILIHAN_STATUS_NOTIFIKASI = [
  { label: 'Terkirim', value: 'terkirim' },
  { label: 'Gagal', value: 'gagal' },
] as const

/** Kolom yang dicari kotak pencarian daftar Lead; ekspor memakai daftar yang sama. */
export const KOLOM_PENCARIAN_LEAD = ['nama', 'perusahaan', 'email'] as const
