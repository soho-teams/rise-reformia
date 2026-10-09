import { expect, test } from '@playwright/test'

import { buatInsight } from './insight'

const LAYANAN = {
  'konsultasi-manajemen': 'Konsultasi Manajemen',
  'psikologi-industri-organisasi': 'Psikologi Industri & Organisasi',
  'konsultasi-bisnis': 'Konsultasi Bisnis',
  'training-pengembangan': 'Training & Pengembangan',
} as const

test.describe('Halaman Layanan', () => {
  test('keempat halaman Layanan merespons 200 dan CTA-nya mengisi Layanan di form Kontak', async ({ page }) => {
    for (const [slug, nama] of Object.entries(LAYANAN)) {
      const res = await page.goto(`/layanan/${slug}`)
      expect(res?.status()).toBe(200)
      await expect(page.getByRole('navigation', { name: 'Lokasi halaman' })).toContainText(nama)
      await expect(page.getByRole('main').getByRole('link', { name: 'Jadwalkan konsultasi' }).first()).toHaveAttribute(
        'href',
        `/kontak?layanan=${slug}`,
      )
      await expect(page.getByRole('main')).not.toContainText('PERLU DATA')
    }
    expect((await page.goto('/layanan/tidak-ada'))?.status()).toBe(404)
  })

  test('Insight terbit muncul di Layanan sesuai kategorinya saja, dan bisa disaring di daftar Insight', async ({
    page,
    request,
  }) => {
    // buatInsight memakai Kategori Insight Konsultasi Bisnis.
    await buatInsight(request, 'Mendelegasikan Keputusan Tanpa Kehilangan Kendali', 'published')
    const judul = page.getByRole('link', { name: 'Mendelegasikan Keputusan Tanpa Kehilangan Kendali' })

    await page.goto('/layanan/konsultasi-bisnis')
    await expect(page.getByRole('heading', { name: 'Insight terkait' })).toBeVisible()
    await expect(judul).toBeVisible()

    await page.goto('/layanan/konsultasi-manajemen')
    await expect(judul).toHaveCount(0)

    await page.goto('/insight?kategori=konsultasi-manajemen')
    await expect(judul).toHaveCount(0)
    const filter = page.getByRole('navigation', { name: 'Saring menurut Kategori Insight' })
    await expect(filter.getByRole('link', { name: 'Konsultasi Manajemen' })).toHaveAttribute('aria-current', 'page')

    await filter.getByRole('link', { name: 'Konsultasi Bisnis' }).click()
    await expect(page).toHaveURL('/insight?kategori=konsultasi-bisnis')
    await expect(judul).toBeVisible()
    expect((await page.goto('/insight?kategori=bukan-layanan'))?.status()).toBe(404)
  })
})
