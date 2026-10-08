import { getMessages } from '@/i18n'
import { SLUG_LAYANAN } from '@/layanan'

const t = getMessages().lead

export const LAYANAN_LEAD = [...SLUG_LAYANAN, 'belum-yakin'] as const
export type LayananLead = (typeof LAYANAN_LEAD)[number]

export const PILIHAN_LAYANAN = LAYANAN_LEAD.map((value) => ({ value, label: t.layanan[value] }))

/** Field tersembunyi yang hanya diisi bot. */
export const FIELD_HONEYPOT = 'situs'

/** Batas panjang isian; teks error di src/i18n menyebut angka yang sama. */
export const BATAS_LEAD = { nama: 100, pesanMin: 20, pesanMaks: 2000 } as const

export type FieldLead = 'nama' | 'perusahaan' | 'jabatan' | 'email' | 'telepon' | 'layanan' | 'pesan' | 'persetujuan'
export type ErrorLead = Partial<Record<FieldLead, string>>

export type DataLead = {
  nama: string
  perusahaan: string
  jabatan: string
  email: string
  telepon?: string
  layanan: LayananLead
  pesan: string
}

const teks = (nilai: unknown): string => (typeof nilai === 'string' ? nilai.trim() : '')

/** Memeriksa kiriman form; pesan error mengikuti copy halaman Kontak. */
export function periksaLead(input: Record<string, unknown>): { data: DataLead } | { errors: ErrorLead } {
  const errors: ErrorLead = {}
  const nama = teks(input.nama)
  const perusahaan = teks(input.perusahaan)
  const jabatan = teks(input.jabatan)
  const email = teks(input.email)
  const telepon = teks(input.telepon)
  const layanan = teks(input.layanan)
  const pesan = teks(input.pesan)

  if (!nama) errors.nama = t.error.namaKosong
  else if (nama.length > BATAS_LEAD.nama) errors.nama = t.error.namaPanjang
  if (!perusahaan) errors.perusahaan = t.error.perusahaanKosong
  if (!jabatan) errors.jabatan = t.error.jabatanKosong
  if (!email) errors.email = t.error.emailKosong
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = t.error.emailFormat
  if (telepon && !/^\+?[0-9][0-9\s-]{7,16}$/.test(telepon)) errors.telepon = t.error.teleponFormat
  if (!(LAYANAN_LEAD as readonly string[]).includes(layanan)) errors.layanan = t.error.layananKosong
  if (!pesan) errors.pesan = t.error.pesanKosong
  else if (pesan.length < BATAS_LEAD.pesanMin) errors.pesan = t.error.pesanPendek
  else if (pesan.length > BATAS_LEAD.pesanMaks) errors.pesan = t.error.pesanPanjang
  if (!input.persetujuan) errors.persetujuan = t.error.persetujuan

  if (Object.keys(errors).length > 0) return { errors }
  return { data: { nama, perusahaan, jabatan, email, telepon: telepon || undefined, layanan: layanan as LayananLead, pesan } }
}
