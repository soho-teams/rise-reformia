# Next.js + Payload CMS di satu VPS

Tim RISE (non-teknis) harus bisa menerbitkan Insight sendiri, dan Lead dari form harus tersimpan, sementara Soho Digital yang merawat website. Karena itu kami memilih Next.js + Payload CMS (self-hosted, satu codebase TypeScript) dengan PostgreSQL, dijalankan dengan Docker di satu VPS yang dikelola Soho.

## Considered Options

- **WordPress**: editornya paling familiar, tetapi ditolak karena beban keamanan dan perawatan plugin.
- **Next.js + headless SaaS (Sanity/Contentful)**: ditolak karena ketergantungan vendor, biaya per kursi, dan Lead tetap butuh database terpisah.
