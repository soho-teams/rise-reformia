/** Slug URL dari judul: huruf kecil tanpa aksen, kata dipisah tanda hubung. */
export const buatSlug = (teks: string): string =>
  teks
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
    .replace(/-+$/, '')
