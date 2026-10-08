/** Empat Layanan RISE. Slug dipakai di URL halaman Layanan dan di isian Layanan diminati pada form Lead. */
export const SLUG_LAYANAN = [
  'konsultasi-manajemen',
  'psikologi-industri-organisasi',
  'konsultasi-bisnis',
  'training-pengembangan',
] as const
export type SlugLayanan = (typeof SLUG_LAYANAN)[number]
