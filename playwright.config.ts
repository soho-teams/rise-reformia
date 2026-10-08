import { defineConfig, devices } from '@playwright/test'

import { TEST_DATABASE_URL, TEST_PAYLOAD_SECRET } from './tests/setup/env'

const PORT = 3100

/**
 * Seam 2: smoke E2E terhadap build produksi (`next build` + `next start`)
 * yang memakai database uji, bukan database dev.
 */
export default defineConfig({
  testDir: './tests/e2e',
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'setup', testMatch: /.*\.setup\.ts/, use: { ...devices['Desktop Chrome'] } },
    {
      name: 'chromium',
      testMatch: /.*\.e2e\.spec\.ts/,
      dependencies: ['setup'],
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    // Database uji dikosongkan dulu (webServer jalan sebelum globalSetup Playwright),
    // lalu build produksi membangun schema lewat migrasi saat Payload pertama diinisialisasi.
    command: `tsx tests/setup/reset-db.ts && pnpm build && pnpm start --port ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: false,
    timeout: 300_000,
    env: {
      DATABASE_URL: TEST_DATABASE_URL,
      PAYLOAD_SECRET: TEST_PAYLOAD_SECRET,
    },
  },
})
