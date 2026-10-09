import { expect, test } from '@playwright/test'

import { masukAdmin } from './akun'

test.describe('Tentang Kami', () => {
  test('tampil tanpa kartu Konsultan selama bagian Konsultan mati, lalu tampil setelah dinyalakan', async ({
    page,
    request,
  }) => {
    const res = await page.goto('/tentang-kami')
    expect(res?.status()).toBe(200)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Menata organisasi dengan cara yang manusiawi.')
    for (const judul of ['Makna nama', 'Cerita RISE', 'Visi', 'Misi', 'Nilai yang kami pegang']) {
      await expect(page.getByRole('heading', { name: judul, exact: true })).toBeVisible()
    }
    // Tanpa profil yang ditampilkan, seluruh bagian Konsultan tidak tampil di produksi.
    const bagianKonsultan = page.getByRole('region', { name: 'Orang-orang di balik RISE' })
    await expect(bagianKonsultan).toHaveCount(0)
    // Build produksi (tanpa SITE_NOINDEX) tidak menampilkan penanda data yang belum ada.
    await expect(page.getByRole('main')).not.toContainText('PERLU DATA')

    const token = await masukAdmin(request)
    const headers = { Authorization: `JWT ${token}` }
    const dibuat = await request.post('/api/konsultan', { headers, data: { nama: 'Ayu Lestari', jabatan: 'Partner', urutan: 1 } })
    expect(dibuat.ok()).toBe(true)
    try {
      expect((await request.post('/api/globals/bagian-opsional', { headers, data: { tampilKonsultan: true } })).ok()).toBe(true)
      await page.reload()
      await expect(bagianKonsultan.getByRole('listitem')).toHaveCount(1)
      await expect(bagianKonsultan).toContainText('Ayu Lestari')
    } finally {
      await request.post('/api/globals/bagian-opsional', { headers, data: { tampilKonsultan: false } })
      await request.delete(`/api/konsultan/${(await dibuat.json()).doc.id}`, { headers })
    }
  })
})
