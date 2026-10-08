import { expect, test } from '@playwright/test'

import { masukAdmin } from './akun'

test.describe('Ekspor Lead ke CSV', () => {
  test('pengunjung tanpa login ditolak', async ({ playwright, baseURL }) => {
    const anonim = await playwright.request.newContext({ baseURL })
    expect((await anonim.get('/api/leads/ekspor-csv')).status()).toBe(403)
    await anonim.dispose()
  })

  test('Editor ditolak, dan saringan yang salah bentuk dijawab 400', async ({ playwright, baseURL, request }) => {
    const token = await masukAdmin(request)
    const akun = { email: 'editor-ekspor@rise-reformia.id', password: 'rahasia-panjang-123' }
    const dibuat = await request.post('/api/users', {
      headers: { Authorization: `JWT ${token}` },
      data: { ...akun, nama: 'Editor RISE', peran: 'editor' },
    })
    expect(dibuat.ok()).toBe(true)

    const editor = await playwright.request.newContext({ baseURL })
    expect((await editor.post('/api/users/login', { data: akun })).ok()).toBe(true)
    expect((await editor.get('/api/leads/ekspor-csv')).status()).toBe(403)
    await editor.dispose()

    const salah = await request.get('/api/leads/ekspor-csv?where[kolomTidakAda][equals]=x', {
      headers: { Authorization: `JWT ${token}` },
    })
    expect(salah.status()).toBe(400)
  })

  test('Admin melihat tombol ekspor di daftar Lead dan mengunduh CSV', async ({ page }) => {
    // page.request berbagi cookie sesi dengan halaman admin.
    await masukAdmin(page.request)

    await page.goto('/admin/collections/leads')
    const tombol = page.getByRole('link', { name: 'Ekspor semua Lead ke CSV' })
    await expect(tombol).toBeVisible()

    const res = await page.request.get((await tombol.getAttribute('href'))!)
    expect(res.status()).toBe(200)
    expect(res.headers()['content-type']).toContain('text/csv')
    expect(res.headers()['content-disposition']).toMatch(/attachment; filename="lead-rise-\d{4}-\d{2}-\d{2}\.csv"/)
    expect(await res.text()).toContain('Tanggal masuk,Nama,Perusahaan')
  })
})
