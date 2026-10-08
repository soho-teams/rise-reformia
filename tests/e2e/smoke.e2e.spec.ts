import { expect, test } from '@playwright/test'

import { masukAdmin } from './akun'

const SANDI = 'rahasia-panjang-123'

test.describe('Smoke', () => {
  test('Beranda tampil dalam Bahasa Indonesia dengan nama RISE', async ({ page }) => {
    const response = await page.goto('/')

    expect(response?.status()).toBe(200)
    await expect(page.locator('html')).toHaveAttribute('lang', 'id')
    await expect(page).toHaveTitle(/RISE/)
    await expect(page.getByRole('heading', { level: 1 })).toContainText('RISE')
  })

  test('menu Pengguna tidak tampil untuk Penulis', async ({ page, request }) => {
    // Admin dari project setup membuat akun Penulis lewat REST API.
    const token = await masukAdmin(request)
    const dibuat = await request.post('/api/users', {
      headers: { Authorization: `JWT ${token}` },
      data: { email: 'penulis@rise-reformia.id', password: SANDI, nama: 'Penulis RISE', peran: 'penulis' },
    })
    expect(dibuat.ok()).toBe(true)

    await page.goto('/admin/login')
    await page.fill('#field-email', 'penulis@rise-reformia.id')
    await page.fill('#field-password', SANDI)
    await page.click('button[type="submit"]')

    await expect(page).toHaveURL(/\/admin$/)
    await expect(page.locator('span[title="Dashboard"]').first()).toBeVisible()
    await expect(page.getByRole('link', { name: 'Pengguna' })).toHaveCount(0)

    // Menu disembunyikan, tetapi halaman akun sendiri tetap bisa dibuka untuk mengubah profil.
    await page.goto('/admin/account')
    await expect(page.locator('#field-nama')).toHaveValue('Penulis RISE')
  })
})
