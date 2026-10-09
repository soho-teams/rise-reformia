import { expect, test, type Page } from '@playwright/test'

import { buatInsight } from './insight'

// Sama dengan bawaan SITE_URL di src/situs/url.ts; CI yang mengisi SITE_URL ikut terbaca di sini.
const SITUS = (process.env.SITE_URL || 'https://rise-reformia.id').replace(/\/+$/, '')

const meta = (page: Page, selektor: string) =>
  page.locator(selektor).first().getAttribute('content')

test.describe('SEO teknis', () => {
  test('sitemap memuat halaman publik dan Insight terbit, tanpa draf', async ({ request }) => {
    const terbit = await buatInsight(request, 'Insight untuk Sitemap', 'published')
    const draf = await buatInsight(request, 'Draf Tidak Masuk Sitemap', 'draft')

    const res = await request.get('/sitemap.xml')
    expect(res.ok()).toBe(true)
    const xml = await res.text()
    expect(xml).toContain(`<loc>${SITUS}</loc>`)
    expect(xml).toContain(`<loc>${SITUS}/insight</loc>`)
    expect(xml).toContain(`<loc>${SITUS}/kontak</loc>`)
    expect(xml).toContain(`<loc>${SITUS}/insight/${terbit.slug}</loc>`)
    expect(xml).not.toContain(draf.slug)
  })

  test('robots.txt mengizinkan situs publik, memblokir admin, dan merujuk sitemap', async ({ request }) => {
    const robots = await (await request.get('/robots.txt')).text()
    expect(robots).toMatch(/Allow: \/\n/)
    expect(robots).toContain('Disallow: /admin')
    // Gambar Media (sampul Insight) disajikan lewat /api, jadi harus tetap bisa diambil crawler.
    expect(robots).toContain('Allow: /api/media/file/')
    expect(robots).toContain(`Sitemap: ${SITUS}/sitemap.xml`)
  })

  for (const [url, kanonis] of [
    ['/', SITUS],
    ['/kontak', `${SITUS}/kontak`],
    ['/insight', `${SITUS}/insight`],
  ] as const) {
    test(`${url} punya URL kanonis, Open Graph, dan Twitter Card`, async ({ page }) => {
      await page.goto(url)
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', kanonis)
      expect(await meta(page, 'meta[property="og:title"]')).toBeTruthy()
      expect(await meta(page, 'meta[property="og:description"]')).toBeTruthy()
      expect(await meta(page, 'meta[property="og:url"]')).toBe(kanonis)
      expect(await meta(page, 'meta[property="og:image"]')).toMatch(/^https:\/\/rise-reformia\.id\/.+/)
      expect(await meta(page, 'meta[name="twitter:card"]')).toBe('summary_large_image')
    })
  }

  for (const [url, nama] of [
    ['/kontak', 'Kontak'],
    ['/insight', 'Insight'],
  ] as const) {
    test(`${url} memuat JSON-LD BreadcrumbList`, async ({ page }) => {
      await page.goto(url)
      const data = (await page.locator('script[type="application/ld+json"]').allTextContents()).map((d) => JSON.parse(d))
      const remah = data.find((d) => d['@type'] === 'BreadcrumbList')
      expect(remah.itemListElement.map((i: { name: string; item: string }) => [i.name, i.item])).toEqual([
        ['Beranda', SITUS],
        [nama, `${SITUS}${url}`],
      ])
    })
  }

  test('gambar OG bawaan bisa diunduh', async ({ page, request }) => {
    await page.goto('/kontak')
    const og = new URL((await meta(page, 'meta[property="og:image"]'))!)
    const res = await request.get(og.pathname + og.search)
    expect(res.ok()).toBe(true)
    expect(res.headers()['content-type']).toContain('image/')
  })

  test('Beranda memuat JSON-LD Organization dengan kontak resmi', async ({ page }) => {
    await page.goto('/')
    const data = await page.locator('script[type="application/ld+json"]').allTextContents()
    const org = data.map((d) => JSON.parse(d)).find((d) => d['@type'] === 'Organization')
    expect(org).toMatchObject({
      name: 'RISE',
      legalName: 'Reformia Inspirasi Semesta',
      url: SITUS,
      email: 'business@rise-reformia.id',
    })
  })

  test('detail Insight memakai field SEO, kanonis, JSON-LD Article dan BreadcrumbList', async ({ page, request }) => {
    const { slug } = await buatInsight(request, 'Insight dengan Data Terstruktur', 'published', {
      seo: { deskripsi: 'Deskripsi SEO khusus untuk Insight ini.' },
    })

    await page.goto(`/insight/${slug}`)
    const kanonis = `${SITUS}/insight/${slug}`
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', kanonis)
    expect(await meta(page, 'meta[name="description"]')).toBe('Deskripsi SEO khusus untuk Insight ini.')
    expect(await meta(page, 'meta[property="og:type"]')).toBe('article')
    expect(await meta(page, 'meta[property="og:image"]')).toBeTruthy()

    const data = (await page.locator('script[type="application/ld+json"]').allTextContents()).map((d) => JSON.parse(d))
    expect(data.find((d) => d['@type'] === 'Article')).toMatchObject({
      headline: 'Insight dengan Data Terstruktur',
      mainEntityOfPage: kanonis,
      publisher: { name: 'RISE' },
    })
    const remah = data.find((d) => d['@type'] === 'BreadcrumbList')
    expect(remah.itemListElement.map((i: { name: string }) => i.name)).toEqual([
      'Beranda',
      'Insight',
      'Insight dengan Data Terstruktur',
    ])
  })

  test('host www diarahkan permanen ke domain utama', async ({ request }) => {
    const res = await request.get('/kontak?a=1', { headers: { host: 'www.rise-reformia.id' }, maxRedirects: 0 })
    expect([301, 308]).toContain(res.status())
    expect(res.headers()['location']).toBe(`${SITUS}/kontak?a=1`)
  })
})
