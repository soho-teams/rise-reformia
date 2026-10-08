import { expect, test } from '@playwright/test'

test.describe('Form permintaan konsultasi', () => {
  test('kiriman kosong menampilkan error per isian tanpa menghapus isian yang sudah diketik', async ({ page }) => {
    await page.goto('/kontak')
    await page.getByRole('button', { name: 'Kirim permintaan konsultasi' }).click()

    await expect(page.getByRole('alert').filter({ hasText: 'isian yang perlu diperbaiki' })).toContainText('Ada 7 isian yang perlu diperbaiki')
    await expect(page.getByText('Mohon isi nama Anda.')).toBeVisible()
    await expect(page.getByLabel('Nama lengkap')).toHaveAttribute('aria-invalid', 'true')

    await page.getByLabel('Nama lengkap').fill('Sari Wulandari')
    await page.getByLabel('Email').fill('sari@contoh.co.id')
    await page.getByRole('button', { name: 'Kirim permintaan konsultasi' }).click()

    await expect(page.getByRole('alert').filter({ hasText: 'isian yang perlu diperbaiki' })).toContainText('Ada 5 isian yang perlu diperbaiki')
    await expect(page.getByLabel('Nama lengkap')).toHaveValue('Sari Wulandari')
    await expect(page.getByLabel('Email')).toHaveValue('sari@contoh.co.id')
  })

  test('kiriman lengkap menampilkan konfirmasi', async ({ page }) => {
    await page.goto('/kontak')
    await page.getByLabel('Nama lengkap').fill('Sari Wulandari')
    await page.getByLabel('Perusahaan / organisasi').fill('PT Contoh Sejahtera')
    await page.getByLabel('Jabatan').fill('HR Manager')
    await page.getByLabel('Email').fill('sari@contoh.co.id')
    await page.getByLabel('Layanan diminati').selectOption('belum-yakin')
    await page.getByLabel('Ceritakan kebutuhan Anda').fill('Kami ingin menata ulang proses rekrutmen untuk posisi supervisor.')
    await page.getByLabel(/Saya menyetujui RISE memproses data pribadi/).check()
    await page.getByRole('button', { name: 'Kirim permintaan konsultasi' }).click()

    await expect(page.getByRole('status')).toContainText('Terima kasih, permintaan Anda sudah kami terima.')
  })
})
