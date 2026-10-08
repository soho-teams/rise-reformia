## Pengembangan

- Perintah, setup, dan seam pengujian: lihat `README.md`.
- Tes hanya ditulis di dua seam yang disepakati: Seam 1 (`tests/int`, Payload Local API) dan Seam 2 (`tests/e2e`, smoke Playwright pada build produksi).
- Setiap perubahan koleksi atau global Payload wajib disertai migrasi baru (`pnpm migrate:create <nama>`).
- String UI publik lewat `src/i18n`, jangan di-hardcode di komponen.

## Agent skills

### Issue tracker

Issues dilacak di Linear (workspace Soho Digital, team SOH). Lihat `docs/agents/issue-tracker.md`.

### Triage labels

Label default: needs-triage, needs-info, ready-for-agent, ready-for-human, wontfix. Lihat `docs/agents/triage-labels.md`.

### Domain docs

Single-context (satu `CONTEXT.md` + `docs/adr/` di root). Lihat `docs/agents/domain.md`.
