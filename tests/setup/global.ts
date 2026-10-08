import pg from 'pg'

import { TEST_DATABASE_URL } from './env'

// Kosongkan database uji; Payload lalu membangun schema terbaru saat init.
export default async function resetTestDatabase() {
  const client = new pg.Client({ connectionString: TEST_DATABASE_URL })
  await client.connect()
  try {
    await client.query('DROP SCHEMA IF EXISTS public CASCADE')
    await client.query('CREATE SCHEMA public')
  } finally {
    await client.end()
  }
}
