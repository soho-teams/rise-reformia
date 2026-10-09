import { expect, type APIRequestContext } from '@playwright/test'

import { isiTeks } from '../helpers/lexical'
import { masukAdmin } from './akun'

/** Membuat Insight lewat REST API sebagai Admin. `tambahan` menimpa isian bawaan. */
export async function buatInsight(
  request: APIRequestContext,
  judul: string,
  status: 'published' | 'draft',
  tambahan: Record<string, unknown> = {},
) {
  const token = await masukAdmin(request)
  const layanan = await (await request.get('/api/layanan?where[slug][equals]=konsultasi-bisnis')).json()
  const res = await request.post(`/api/insight${status === 'draft' ? '?draft=true' : ''}`, {
    headers: { Authorization: `JWT ${token}` },
    data: {
      judul,
      ringkasan: `Ringkasan untuk ${judul}.`,
      isi: isiTeks('Satu paragraf isi Insight untuk smoke test.'),
      kategori: layanan.docs[0].id,
      _status: status,
      ...tambahan,
    },
  })
  expect(res.ok()).toBe(true)
  return { ...(await res.json()).doc, token } as { id: number; slug: string; token: string }
}
