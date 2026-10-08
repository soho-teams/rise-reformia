import { beforeAll, describe, expect, it } from 'vitest'
import type { Payload } from 'payload'

import { getTestPayload, kosongkanPengguna } from '../helpers/payload'

let payload: Payload

const kredensial = { email: 'pengguna@rise-reformia.id', password: 'rahasia-panjang-123' }

describe('Pengguna CMS', () => {
  beforeAll(async () => {
    payload = await getTestPayload()
    await kosongkanPengguna(payload)
  })

  it('pengguna yang dibuat bisa login dengan email dan kata sandinya', async () => {
    await payload.create({ collection: 'users', data: { ...kredensial, nama: 'Pengguna', peran: 'admin' } })

    const result = await payload.login({ collection: 'users', data: kredensial })

    expect(result.user?.email).toBe('pengguna@rise-reformia.id')
    expect(result.token).toBeTruthy()
  })
})
