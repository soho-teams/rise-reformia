/**
 * URL utama situs tanpa garis miring akhir, untuk URL kanonis, Open Graph, sitemap, dan JSON-LD.
 * Staging mengisi SITE_URL dengan domainnya sendiri (dibaca saat build dan saat server berjalan).
 */
export const URL_SITUS = (process.env.SITE_URL || 'https://rise-reformia.id').replace(/\/+$/, '')

export const urlAbsolut = (path: string) => (path === '/' ? URL_SITUS : `${URL_SITUS}${path}`)

/** Staging dan pratinjau mengisi SITE_NOINDEX=true supaya tidak terindeks mesin pencari. */
export const situsTerindeks = () => process.env.SITE_NOINDEX !== 'true'
