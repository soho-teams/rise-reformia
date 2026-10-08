import type { APIRequestContext } from '@playwright/test'

/** Admin yang dibuat lewat UI oleh pengguna-pertama.setup.ts sebelum tes lain berjalan. */
export const ADMIN = { email: 'admin@rise-reformia.id', sandi: 'rahasia-panjang-123' }

/** Login sebagai Admin. Selain mengembalikan token, cookie sesi ikut tersimpan di konteks request. */
export async function masukAdmin(request: APIRequestContext): Promise<string> {
  const res = await request.post('/api/users/login', { data: { email: ADMIN.email, password: ADMIN.sandi } })
  if (!res.ok()) throw new Error(`Login Admin gagal: ${res.status()}`)
  return (await res.json()).token
}
