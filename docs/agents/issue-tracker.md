# Issue Tracker: Linear

Issues untuk repo ini dilacak di Linear (workspace Soho Digital) lewat konektor MCP `mcp__claude_ai_Linear__*`.

- **Team**: `SOH` (Sohodigital)
- **Project**: `Rise Reformia` (dibuat saat issue pertama jika belum ada)

## Operasi

- Buat issue: `save_issue` (title, description markdown, team `SOH`, project, labels)
- Baca issue: `get_issue` / `list_issues` (filter team + project)
- Komentar: `list_comments` / `save_comment`
- Label: `list_issue_labels` / `save_issue_label`; terapkan/ubah label dan status lewat `save_issue`
- Tutup issue: ubah status lewat `save_issue` (cari status dengan `list_issue_statuses`)

Gunakan deskripsi markdown dengan newline asli, bukan `\n` literal.

## PRs as a request surface

**Off.** Pull request tidak masuk antrian triage.
