import resetTestDatabase from './global'

// Dipanggil webServer Playwright sebelum build (webServer jalan sebelum globalSetup).
await resetTestDatabase()
