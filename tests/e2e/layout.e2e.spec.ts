import { expect, type Page, test } from '@playwright/test'

const LAYANAN = ['Konsultasi Manajemen', 'Psikologi Industri & Organisasi', 'Konsultasi Bisnis', 'Training & Pengembangan']

const tidakAdaScrollHorizontal = async (page: Page) =>
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
    await page.evaluate(() => window.innerWidth),
  )

test.describe('Layout publik', () => {
  test('header menampilkan logo, navigasi, dropdown Layanan, dan CTA', async ({ page }) => {
    await page.goto('/kontak')
    const header = page.getByRole('banner')

    await expect(header.getByRole('link', { name: 'RISE, Beranda' })).toHaveAttribute('href', '/')
    const nav = header.getByRole('navigation', { name: 'Navigasi utama' })
    for (const label of ['Beranda', 'Insight', 'Tentang Kami', 'Kontak']) {
      await expect(nav.getByRole('link', { name: label, exact: true })).toBeVisible()
    }
    await expect(nav.getByRole('link', { name: 'Kontak', exact: true })).toHaveAttribute('aria-current', 'page')
    await expect(header.getByRole('link', { name: 'Jadwalkan konsultasi' })).toHaveAttribute('href', '/kontak')

    const tombolLayanan = nav.getByRole('button', { name: 'Layanan' })
    await expect(tombolLayanan).toHaveAttribute('aria-expanded', 'false')
    await tombolLayanan.click()
    await expect(tombolLayanan).toHaveAttribute('aria-expanded', 'true')
    for (const nama of LAYANAN) await expect(nav.getByRole('link', { name: nama })).toBeVisible()

    await page.keyboard.press('Escape')
    await expect(tombolLayanan).toHaveAttribute('aria-expanded', 'false')
    await expect(tombolLayanan).toBeFocused()

    // Dropdown juga tertutup saat fokus keyboard keluar dari daftar Layanan.
    await page.keyboard.press('Enter')
    await expect(tombolLayanan).toHaveAttribute('aria-expanded', 'true')
    for (let i = 0; i <= LAYANAN.length; i++) await page.keyboard.press('Tab')
    await expect(nav.getByRole('link', { name: 'Insight', exact: true })).toBeFocused()
    await expect(tombolLayanan).toHaveAttribute('aria-expanded', 'false')
  })

  test('tautan lompat membawa fokus ke konten utama', async ({ page }) => {
    await page.goto('/kontak')
    await page.keyboard.press('Tab')
    const lompat = page.getByRole('link', { name: 'Lewati ke konten utama' })
    await expect(lompat).toBeFocused()
    await expect(lompat).toBeVisible()
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL(/#konten$/)
  })

  test('footer menampilkan kontak resmi dan tautan Kebijakan Privasi', async ({ page }) => {
    await page.goto('/')
    const footer = page.getByRole('contentinfo')

    await expect(footer).toContainText('Ged. Bintaro Business Center')
    await expect(footer.getByRole('link', { name: /021 7362 639/ })).toHaveAttribute('href', 'tel:+62217362639')
    await expect(footer.getByRole('link', { name: 'business@rise-reformia.id' })).toHaveAttribute(
      'href',
      'mailto:business@rise-reformia.id',
    )
    await expect(footer).toContainText('Senin–Jumat, 08.00–17.00 WIB')
    await expect(footer.getByRole('link', { name: 'Kebijakan Privasi' })).toHaveAttribute('href', '/kebijakan-privasi')
    await expect(footer).toContainText(`© ${new Date().getFullYear()} Reformia Inspirasi Semesta`)
    // Data yang belum dikirim RISE tidak boleh tampil sebagai placeholder di situs publik.
    await expect(footer).not.toContainText('PERLU DATA')
  })

  test('halaman tidak dikenal menampilkan 404 dengan tautan ke Layanan dan Kontak', async ({ page }) => {
    const response = await page.goto('/halaman-yang-tidak-ada')

    expect(response?.status()).toBe(404)
    await expect(page).toHaveTitle('Halaman tidak ditemukan | RISE')
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Halaman ini tidak ditemukan.')
    const main = page.getByRole('main')
    await expect(main.getByRole('link', { name: 'Kembali ke Beranda' })).toHaveAttribute('href', '/')
    await expect(main.getByRole('link', { name: 'Lihat Layanan kami' })).toHaveAttribute('href', '/#layanan')
    await expect(main.getByRole('link', { name: 'Hubungi kami' })).toHaveAttribute('href', '/kontak')
    await expect(page.getByRole('banner')).toBeVisible()
    await expect(page.getByRole('contentinfo')).toBeVisible()
  })

  test('favicon dan app icon terpasang', async ({ page, request }) => {
    await page.goto('/')
    const ikon = page.locator('link[rel="icon"]').first()
    const href = await ikon.getAttribute('href')
    expect(href).toBeTruthy()
    expect((await request.get(href!)).ok()).toBe(true)

    const apple = await page.locator('link[rel="apple-touch-icon"]').getAttribute('href')
    expect((await request.get(apple!)).ok()).toBe(true)
  })
})

test.describe('Layout publik di ponsel 360 px', () => {
  test.use({ viewport: { width: 360, height: 740 } })

  test('menu mobile bisa dibuka dan ditutup dengan keyboard', async ({ page }) => {
    await page.goto('/')
    const header = page.getByRole('banner')
    const tombol = header.getByRole('button', { name: 'Menu' })
    const nav = header.getByRole('navigation', { name: 'Navigasi utama' })

    // CTA tetap terlihat di header ponsel tanpa membuka menu.
    await expect(header.getByRole('link', { name: 'Konsultasi' })).toHaveAttribute('href', '/kontak')
    await expect(tombol).toHaveAttribute('aria-expanded', 'false')
    await expect(nav.getByRole('link', { name: 'Insight' })).toBeHidden()

    await tombol.focus()
    await page.keyboard.press('Enter')
    await expect(tombol).toHaveAttribute('aria-expanded', 'true')
    await expect(nav.getByRole('link', { name: 'Insight' })).toBeVisible()
    await expect(nav.getByRole('list', { name: 'Layanan' })).toBeVisible()
    for (const nama of LAYANAN) await expect(nav.getByRole('link', { name: nama })).toBeVisible()
    await tidakAdaScrollHorizontal(page)

    await page.keyboard.press('Escape')
    await expect(tombol).toBeFocused()
    await expect(tombol).toHaveAttribute('aria-expanded', 'false')
    await expect(nav.getByRole('link', { name: 'Insight' })).toBeHidden()
  })

  for (const url of ['/', '/kontak', '/halaman-yang-tidak-ada']) {
    test(`tidak ada scroll horizontal di ${url}`, async ({ page }) => {
      await page.goto(url)
      await tidakAdaScrollHorizontal(page)
    })
  }
})
