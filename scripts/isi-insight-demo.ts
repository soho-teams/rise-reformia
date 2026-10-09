/**
 * Mengisi tujuh Insight contoh (scripts/data/insight-demo.ts) ke website yang sedang berjalan,
 * lewat REST API dengan akun Editor atau Admin. Insight yang judulnya sudah ada dilewati,
 * jadi aman dijalankan ulang.
 *
 *   SITUS=https://rise-reformia.vercel.app EMAIL=... SANDI=... pnpm tsx scripts/isi-insight-demo.ts
 */
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { INSIGHT_DEMO } from './data/insight-demo'

const SITUS = (process.env.SITUS ?? 'http://localhost:3000').replace(/\/+$/, '')
const { EMAIL, SANDI } = process.env
const FOLDER_SAMPUL = path.join(path.dirname(fileURLToPath(import.meta.url)), 'data', 'sampul')

type Node = Record<string, unknown>

const teks = (isi: string): Node => ({ type: 'text', text: isi, format: 0, style: '', mode: 'normal', detail: 0, version: 1 })
const blok = (type: string, children: Node[], tambahan: Node = {}): Node => ({
  type,
  children,
  direction: 'ltr',
  format: '',
  indent: 0,
  version: 1,
  ...tambahan,
})

/** Format sederhana di data Insight menjadi state editor Lexical (paragraf, subjudul, daftar, kutipan). */
function keLexical(isi: string) {
  const children = isi
    .trim()
    .split(/\n\s*\n/)
    .map((bagian): Node => {
      const baris = bagian.split('\n').map((b) => b.trim())
      if (baris[0].startsWith('## ')) return blok('heading', [teks(baris[0].slice(3))], { tag: 'h2' })
      if (baris[0].startsWith('> ')) return blok('quote', [teks(baris.map((b) => b.replace(/^> /, '')).join(' '))])
      const bernomor = /^\d+\. /.test(baris[0])
      if (bernomor || baris[0].startsWith('- ')) {
        return blok(
          'list',
          baris.map((b, i) => blok('listitem', [teks(b.replace(/^(\d+\. |- )/, ''))], { value: i + 1 })),
          { listType: bernomor ? 'number' : 'bullet', tag: bernomor ? 'ol' : 'ul', start: 1 },
        )
      }
      return blok('paragraph', [teks(baris.join(' '))], { textFormat: 0, textStyle: '' })
    })
  return { root: blok('root', children) }
}

async function api<T>(jalur: string, init: RequestInit & { token?: string } = {}): Promise<T> {
  const headers = new Headers(init.headers)
  if (init.token) headers.set('Authorization', `JWT ${init.token}`)
  const res = await fetch(`${SITUS}${jalur}`, { ...init, headers })
  if (!res.ok) throw new Error(`${init.method ?? 'GET'} ${jalur} gagal (${res.status}): ${await res.text()}`)
  return res.json() as Promise<T>
}

async function main() {
  if (!EMAIL || !SANDI) throw new Error('Isi EMAIL dan SANDI akun Editor atau Admin di website tujuan.')
  const { token } = await api<{ token: string }>('/api/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: EMAIL, password: SANDI }),
  })
  const { docs: layanan } = await api<{ docs: { id: number; slug: string }[] }>('/api/layanan?limit=10', { token })
  const idLayanan = new Map(layanan.map((l) => [l.slug, l.id]))

  // Urutan data = urutan tampil; Insight pertama paling baru, sisanya mundur satu minggu.
  for (const [urutan, insight] of INSIGHT_DEMO.entries()) {
    const sudahAda = await api<{ totalDocs: number }>(
      `/api/insight?where[judul][equals]=${encodeURIComponent(insight.judul)}&draft=true&limit=1`,
      { token },
    )
    if (sudahAda.totalDocs > 0) {
      console.log(`Lewati (sudah ada): ${insight.judul}`)
      continue
    }

    const form = new FormData()
    const berkas = await readFile(path.join(FOLDER_SAMPUL, insight.sampul.berkas))
    form.append('file', new Blob([berkas], { type: 'image/jpeg' }), insight.sampul.berkas)
    form.append('_payload', JSON.stringify({ alt: insight.sampul.alt }))
    const { doc: media } = await api<{ doc: { id: number } }>('/api/media', { method: 'POST', body: form, token })

    const terbit = new Date(Date.now() - urutan * 7 * 24 * 60 * 60 * 1000).toISOString()
    await api('/api/insight', {
      method: 'POST',
      token,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        judul: insight.judul,
        ringkasan: insight.ringkasan,
        kategori: idLayanan.get(insight.kategori),
        sampul: media.id,
        isi: keLexical(insight.isi),
        tanggalTerbit: terbit,
        _status: 'published',
      }),
    })
    console.log(`Terbit: ${insight.judul}`)
  }
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err)
  process.exit(1)
})
