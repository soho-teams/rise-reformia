import { getPayload, type Payload } from 'payload'

import config from '@/payload.config'

/**
 * Seam 1: Payload Local API di atas database PostgreSQL uji.
 * Database direset sekali per run oleh `tests/setup/global.ts`.
 */
export const getTestPayload = (): Promise<Payload> => getPayload({ config })
