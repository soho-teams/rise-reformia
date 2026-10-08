import { getPayload, type Payload } from 'payload'

import { LEWATI_PENGAMAN_ADMIN } from '@/collections/Users'
import config from '@/payload.config'

/**
 * Seam 1: Payload Local API di atas database PostgreSQL uji.
 * Database direset sekali per run oleh `tests/setup/global.ts`.
 */
export const getTestPayload = (): Promise<Payload> => getPayload({ config })

// Setiap tes yang bergantung pada "pengguna pertama" butuh koleksi pengguna yang kosong.
export const kosongkanPengguna = async (payload: Payload): Promise<void> => {
  await payload.delete({
    collection: 'users',
    where: { id: { exists: true } },
    context: { [LEWATI_PENGAMAN_ADMIN]: true },
  })
}

export const kosongkanLead = async (payload: Payload): Promise<void> => {
  await payload.delete({ collection: 'leads', where: { id: { exists: true } } })
}
