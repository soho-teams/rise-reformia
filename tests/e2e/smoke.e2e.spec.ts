import { expect, test } from '@playwright/test'

test.describe('Smoke', () => {
  test('Beranda tampil dalam Bahasa Indonesia dengan nama RISE', async ({ page }) => {
    const response = await page.goto('/')

    expect(response?.status()).toBe(200)
    await expect(page.locator('html')).toHaveAttribute('lang', 'id')
    await expect(page).toHaveTitle(/RISE/)
    await expect(page.getByRole('heading', { level: 1 })).toContainText('RISE')
  })

  test('pengguna pertama dibuat di /admin lalu masuk ke dashboard', async ({ page }) => {
    // Database uji selalu kosong, jadi /admin mengarah ke alur pengguna pertama.
    await page.goto('/admin')
    await expect(page).toHaveURL(/\/admin\/create-first-user/)

    await page.fill('#field-email', 'admin@rise-reformia.id')
    await page.fill('#field-password', 'rahasia-panjang-123')
    await page.fill('#field-confirm-password', 'rahasia-panjang-123')
    await page.click('button[type="submit"]')

    await expect(page).toHaveURL(/\/admin$/)
    await expect(page.locator('span[title="Dashboard"]').first()).toBeVisible()
  })
})
