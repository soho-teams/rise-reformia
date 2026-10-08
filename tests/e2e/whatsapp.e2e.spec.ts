import { expect, test } from '@playwright/test'

import { masukAdmin } from './akun'

type Request = Parameters<typeof masukAdmin>[0]

const ubahPengaturan = async (request: Request, data: Record<string, unknown>) => {
  const token = await masukAdmin(request)
  const res = await request.post('/api/globals/pengaturan-situs', { headers: { Authorization: `JWT ${token}` }, data })
  expect(res.ok()).toBe(true)
}

test.describe('Tombol WhatsApp mengambang', () => {
  let semula: Record<string, unknown> = {}

  test.beforeAll(async ({ request }) => {
    const token = await masukAdmin(request)
    const { whatsapp, pesanWhatsapp } = await (
      await request.get('/api/globals/pengaturan-situs', { headers: { Authorization: `JWT ${token}` } })
    ).json()
    semula = { whatsapp, pesanWhatsapp }
    // Mulai dari keadaan tanpa nomor, apa pun isi database uji sebelumnya.
    await ubahPengaturan(request, { whatsapp: null })
  })

  test.afterAll(async ({ request }) => {
    await ubahPengaturan(request, semula)
  })

  test('tidak tampil selama nomor WhatsApp kosong', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('link', { name: 'Hubungi RISE lewat WhatsApp' })).toHaveCount(0)
  })

  test('tampil di halaman publik dengan tautan wa.me dan pesan pembuka setelah Admin mengisi nomor', async ({
    page,
    request,
  }) => {
    await ubahPengaturan(request, {
      whatsapp: '0812 3456 7890',
      pesanWhatsapp: 'Halo RISE, saya ingin konsultasi & bertanya.',
    })

    for (const url of ['/', '/kontak', '/halaman-yang-tidak-ada']) {
      await page.goto(url)
      const tombol = page.getByRole('link', { name: 'Hubungi RISE lewat WhatsApp' })
      await expect(tombol).toBeVisible()
      await expect(tombol).toHaveAttribute(
        'href',
        'https://wa.me/6281234567890?text=Halo%20RISE%2C%20saya%20ingin%20konsultasi%20%26%20bertanya.',
      )
    }
    await expect(page.getByRole('contentinfo')).toContainText('WhatsApp +62 812-3456-7890')

    // Bisa dijangkau keyboard: tautan biasa tanpa tabindex negatif.
    await page.getByRole('link', { name: 'Hubungi RISE lewat WhatsApp' }).focus()
    await expect(page.getByRole('link', { name: 'Hubungi RISE lewat WhatsApp' })).toBeFocused()

    await page.goto('/admin')
    await expect(page.getByRole('link', { name: 'Hubungi RISE lewat WhatsApp' })).toHaveCount(0)
  })
})
