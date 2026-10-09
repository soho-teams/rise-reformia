import { expect, test } from '@playwright/test'

test.describe('Beranda, Kontak, dan Kebijakan Privasi', () => {
  test('Beranda menampilkan bagian utama dan menautkan keempat Layanan', async ({ page }) => {
    expect((await page.goto('/'))?.status()).toBe(200)
    const main = page.getByRole('main')
    for (const judul of [
      'Empat Layanan untuk persoalan yang berbeda',
      'Mungkin ini terdengar akrab',
      'Mengapa organisasi bekerja sama dengan RISE',
      'Bagaimana kita memulai',
      'Insight dari tim RISE',
      'Siap membicarakan kebutuhan organisasi Anda?',
    ]) {
      await expect(main.getByRole('heading', { name: judul })).toBeVisible()
    }
    const layanan = main.getByRole('region', { name: 'Empat Layanan untuk persoalan yang berbeda' })
    await expect(layanan.getByRole('link', { name: /Lihat Layanan/ })).toHaveCount(4)
    await expect(layanan.getByRole('link', { name: 'Lihat Layanan: Konsultasi Bisnis' })).toHaveAttribute(
      'href',
      '/layanan/konsultasi-bisnis',
    )
    // Klien dan testimoni mengikuti Bagian Opsional, yang mati secara bawaan.
    await expect(main.getByRole('heading', { name: 'Kata Klien kami' })).toHaveCount(0)
    await expect(main).not.toContainText('PERLU DATA')

    // Semua CTA "Jadwalkan konsultasi" di halaman mengarah ke form Kontak.
    for (const cta of await page.getByRole('link', { name: 'Jadwalkan konsultasi' }).all()) {
      expect(await cta.getAttribute('href')).toBe('/kontak')
    }
  })

  test('dari CTA Beranda ke form Kontak hingga konfirmasi', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('main').getByRole('link', { name: 'Jadwalkan konsultasi' }).first().click()
    await expect(page).toHaveURL('/kontak')

    await page.getByLabel('Nama lengkap').fill('Budi Santoso')
    await page.getByLabel('Perusahaan / organisasi').fill('CV Maju Bersama')
    await page.getByLabel('Jabatan').fill('Owner')
    await page.getByLabel('Email').fill('budi@majubersama.co.id')
    await page.getByLabel('Layanan diminati').selectOption('konsultasi-bisnis')
    await page.getByLabel('Ceritakan kebutuhan Anda').fill('Kami ingin mulai mendelegasikan keputusan harian ke kepala toko.')
    await page.getByLabel(/Saya menyetujui RISE memproses data pribadi/).check()
    await page.getByRole('button', { name: 'Kirim permintaan konsultasi' }).click()

    const sukses = page.getByRole('status').filter({ hasText: 'Terima kasih' })
    await expect(sukses).toContainText('Terima kasih, permintaan Anda sudah kami terima.')
    await expect(sukses.getByRole('link', { name: 'Kembali ke Beranda' })).toHaveAttribute('href', '/')
  })

  test('form Kontak menerima Layanan dari CTA, menampilkan kontak langsung, dan menautkan Kebijakan Privasi', async ({
    page,
  }) => {
    await page.goto('/kontak?layanan=psikologi-industri-organisasi')
    await expect(page.getByLabel('Layanan diminati')).toHaveValue('psikologi-industri-organisasi')
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /\/kontak$/)

    const langsung = page.getByRole('complementary', { name: 'Atau hubungi kami langsung' })
    await expect(langsung).toContainText('business@rise-reformia.id')
    await expect(langsung).toContainText('021 7362 639')

    await page.getByRole('form', { name: 'Form permintaan konsultasi' }).getByRole('link', { name: 'Kebijakan Privasi' }).first().click()
    await expect(page).toHaveURL('/kebijakan-privasi')
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Kebijakan Privasi')
    // Selama teksnya draf, halaman diberi catatan draf dan tidak boleh diindeks.
    await expect(page.getByRole('note')).toContainText('DRAF')
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/)
  })

  test('Kebijakan Privasi merespons 200 dan ditautkan dari footer', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('contentinfo').getByRole('link', { name: 'Kebijakan Privasi' }).click()
    await expect(page).toHaveURL('/kebijakan-privasi')
    expect((await page.goto('/kebijakan-privasi'))?.status()).toBe(200)
  })
})
