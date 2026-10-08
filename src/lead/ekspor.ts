import { Forbidden, type Payload, type Where } from 'payload'

import { punyaPeran } from '@/access/peran'
import type { Lead, User } from '@/payload-types'
import { PILIHAN_LAYANAN } from './periksa'
import { KOLOM_PENCARIAN_LEAD, PILIHAN_STATUS_NOTIFIKASI, PILIHAN_STATUS_TINDAK_LANJUT } from './daftarAdmin'

// Format "2026-10-08 10:00" (WIB) supaya spreadsheet bisa mengurutkannya sebagai tanggal.
const formatWaktu = new Intl.DateTimeFormat('sv-SE', {
  timeZone: 'Asia/Jakarta',
  dateStyle: 'short',
  timeStyle: 'short',
})
const waktu = (iso: string | null | undefined) => (iso ? formatWaktu.format(new Date(iso)) : '')
const labelPilihan = (pilihan: readonly { value: string; label: string }[], value: string | null | undefined) =>
  pilihan.find((p) => p.value === value)?.label ?? value ?? ''

const KOLOM: [string, (lead: Lead) => string | null | undefined][] = [
  ['Tanggal masuk', (l) => waktu(l.createdAt)],
  ['Nama', (l) => l.nama],
  ['Perusahaan', (l) => l.perusahaan],
  ['Jabatan', (l) => l.jabatan],
  ['Email', (l) => l.email],
  ['Telepon', (l) => l.telepon],
  ['Layanan diminati', (l) => labelPilihan(PILIHAN_LAYANAN, l.layanan)],
  ['Pesan', (l) => l.pesan],
  ['Status tindak lanjut', (l) => labelPilihan(PILIHAN_STATUS_TINDAK_LANJUT, l.statusTindakLanjut)],
  ['Status notifikasi', (l) => labelPilihan(PILIHAN_STATUS_NOTIFIKASI, l.statusNotifikasi)],
  ['Waktu persetujuan data pribadi', (l) => waktu(l.waktuPersetujuan)],
]

// Nomor telepon seperti "+62 812 3456 7890" diawali + tetapi bukan rumus, jadi dibiarkan utuh.
const NOMOR_TELEPON = /^\+?[\d\s()-]+$/
// Spreadsheet menjalankan sel yang diawali = + - @ (juga setelah spasi) sebagai rumus.
const AWAL_RUMUS = /^[\s]*[=+\-@]|^[\t\r]/

/**
 * Satu sel CSV (RFC 4180). Isian pengunjung yang bisa dibaca sebagai rumus diberi tanda kutip
 * tunggal di depannya supaya tidak dijalankan saat dibuka di spreadsheet (CSV injection).
 */
function selCsv(nilai: string | null | undefined): string {
  let teks = nilai ?? ''
  if (AWAL_RUMUS.test(teks) && !NOMOR_TELEPON.test(teks)) teks = `'${teks}`
  return /[",\r\n]/.test(teks) ? `"${teks.replace(/"/g, '""')}"` : teks
}

/**
 * Lead dalam format CSV untuk spreadsheet, terbaru dulu. `where` dan `cari` sama dengan saringan
 * dan kotak pencarian daftar Lead di panel admin. Hanya Admin; peran lain mendapat Forbidden.
 */
export async function eksporLeadCsv(
  payload: Payload,
  { user, where, cari }: { user: User | null | undefined; where?: Where; cari?: string },
): Promise<string> {
  if (!punyaPeran(user, 'admin')) throw new Forbidden()
  const pencarian: Where | undefined = cari?.trim()
    ? { or: KOLOM_PENCARIAN_LEAD.map((kolom) => ({ [kolom]: { like: cari.trim() } })) }
    : undefined
  const { docs } = await payload.find({
    collection: 'leads',
    where: where && pencarian ? { and: [where, pencarian] } : (where ?? pencarian),
    sort: '-createdAt',
    pagination: false,
    depth: 0,
    user,
    overrideAccess: false,
  })
  const baris = [KOLOM.map(([judul]) => judul), ...docs.map((lead) => KOLOM.map(([, ambil]) => ambil(lead)))]
  // BOM agar Excel membaca UTF-8 dengan benar (nama berhuruf non-ASCII, tanda pisah).
  return '﻿' + baris.map((b) => b.map(selCsv).join(',')).join('\r\n') + '\r\n'
}
