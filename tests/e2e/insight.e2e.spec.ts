import { expect, test } from '@playwright/test'

import { buatInsight } from './insight'

test.describe('Insight publik', () => {
  test('Insight terbit muncul di daftar dan detail', async ({ page, request }) => {
    const { slug } = await buatInsight(request, 'Menata Alur Persetujuan Pembelian', 'published')

    await page.goto('/insight')
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Insight')
    const tautan = page.getByRole('link', { name: 'Menata Alur Persetujuan Pembelian' })
    await expect(tautan).toBeVisible()
    await expect(page.getByRole('main')).toContainText('Konsultasi Bisnis')

    await tautan.click()
    await expect(page).toHaveURL(`/insight/${slug}`)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Menata Alur Persetujuan Pembelian')
    await expect(page.getByRole('main')).toContainText('1 menit baca')
    await expect(page.getByRole('main')).toContainText('Satu paragraf isi Insight untuk smoke test.')
    await expect(page).toHaveTitle('Menata Alur Persetujuan Pembelian | Insight RISE')
  })

  test('draf mengembalikan 404 di URL publik', async ({ page, request }) => {
    const { slug } = await buatInsight(request, 'Draf yang Belum Ditinjau', 'draft')

    const res = await page.goto(`/insight/${slug}`)
    expect(res?.status()).toBe(404)
    await page.goto('/insight')
    await expect(page.getByRole('link', { name: 'Draf yang Belum Ditinjau' })).toHaveCount(0)
  })

  test('Insight yang ditarik hilang dari halaman yang sudah di-cache tanpa deploy ulang', async ({ page, request }) => {
    const { id, slug, token } = await buatInsight(request, 'Insight yang Akan Ditarik', 'published')
    expect((await page.goto(`/insight/${slug}`))?.status()).toBe(200)

    const tarik = await request.patch(`/api/insight/${id}`, {
      headers: { Authorization: `JWT ${token}` },
      data: { _status: 'draft' },
    })
    expect(tarik.ok()).toBe(true)

    expect((await page.goto(`/insight/${slug}`))?.status()).toBe(404)
  })

  test('pratinjau draf hanya untuk pengguna yang login', async ({ page, playwright, baseURL }) => {
    const { slug } = await buatInsight(page.request, 'Draf untuk Pratinjau', 'draft')

    const anonim = await playwright.request.newContext({ baseURL })
    expect((await anonim.get(`/next/pratinjau?slug=${slug}`, { maxRedirects: 0 })).status()).toBe(403)
    await anonim.dispose()

    // page.request berbagi cookie sesi dengan halaman, jadi halaman ikut login.
    await page.goto(`/next/pratinjau?slug=${slug}`)
    await expect(page).toHaveURL(`/insight/${slug}`)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Draf untuk Pratinjau')
    await expect(page.getByRole('status')).toContainText('pratinjau draf')

    await page.getByRole('link', { name: 'Keluar dari pratinjau' }).click()
    await expect(page).toHaveURL('/insight')
    expect((await page.goto(`/insight/${slug}`))?.status()).toBe(404)

    // Cookie pratinjau saja tidak cukup: setelah sesi CMS hilang (logout), draf tertutup lagi.
    await page.goto(`/next/pratinjau?slug=${slug}`)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Draf untuk Pratinjau')
    await page.context().clearCookies({ name: 'payload-token' })
    expect((await page.goto(`/insight/${slug}`))?.status()).toBe(404)
  })
})
