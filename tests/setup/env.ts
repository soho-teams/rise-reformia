// Tes tidak pernah memakai DATABASE_URL dev; selalu database uji yang terisolasi.
export const TEST_DATABASE_URL =
  process.env.TEST_DATABASE_URL ?? 'postgres://rise:rise@localhost:5432/rise_test'

export const TEST_PAYLOAD_SECRET = 'rahasia-khusus-tes'
