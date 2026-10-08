import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

import { TEST_DATABASE_URL, TEST_PAYLOAD_SECRET } from './tests/setup/env'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: 'node',
    globalSetup: ['./tests/setup/global.ts'],
    include: ['tests/int/**/*.int.spec.ts'],
    // Satu database uji bersama: file tes dijalankan berurutan.
    fileParallelism: false,
    testTimeout: 30_000,
    hookTimeout: 60_000,
    env: {
      DATABASE_URL: TEST_DATABASE_URL,
      PAYLOAD_SECRET: TEST_PAYLOAD_SECRET,
    },
  },
})
