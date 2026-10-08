import { expect, test as setup } from '@playwright/test'

import { ADMIN } from './akun'

// Database uji selalu kosong saat run dimulai, jadi /admin mengarah ke alur pengguna pertama.
// Tes lain bergantung pada Admin yang dibuat di sini (lihat `dependencies` di playwright.config.ts).
setup('pengguna pertama dibuat di /admin lalu masuk ke dashboard sebagai Admin', async ({ page }) => {
  await page.goto('/admin')
  await expect(page).toHaveURL(/\/admin\/create-first-user/)

  await page.fill('#field-email', ADMIN.email)
  await page.fill('#field-password', ADMIN.sandi)
  await page.fill('#field-confirm-password', ADMIN.sandi)
  await page.fill('#field-nama', 'Admin RISE')
  await page.click('button[type="submit"]')

  await expect(page).toHaveURL(/\/admin$/)
  await expect(page.locator('span[title="Dashboard"]').first()).toBeVisible()
  await expect(page.getByRole('link', { name: 'Pengguna' }).first()).toBeVisible()
})
