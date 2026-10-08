'use server'

import config from '@payload-config'
import { headers } from 'next/headers'
import { getPayload } from 'payload'

import { getMessages } from '@/i18n'
import { buatNotifierSmtp } from '@/lead/notifier'
import { buatPembatasMemori } from '@/lead/pembatas'
import type { ErrorLead } from '@/lead/periksa'
import { submitLead } from '@/lead/submitLead'
import { tujuanNotifikasiLead } from '@/situs/pengaturan'

export type StateFormLead = {
  status: 'awal' | 'gagal' | 'sukses'
  errors: ErrorLead
  pesan?: string
  /** Isian terakhir, supaya form tidak kosong lagi setelah error. */
  nilai: Record<string, string>
  percobaan: number
}

const pembatas = buatPembatasMemori()
const notifier = buatNotifierSmtp(async () => tujuanNotifikasiLead(await getPayload({ config })))

export async function kirimLead(sebelumnya: StateFormLead, formData: FormData): Promise<StateFormLead> {
  const nilai: Record<string, string> = {}
  formData.forEach((v, k) => {
    if (typeof v === 'string') nilai[k] = v
  })
  const percobaan = sebelumnya.percobaan + 1
  // X-Real-IP diisi reverse proxy kita (SOH-146); X-Forwarded-For dari klien bisa dipalsukan.
  const h = await headers()
  const ip = h.get('x-real-ip') ?? h.get('x-forwarded-for')?.split(',').at(-1)?.trim() ?? 'tanpa-ip'

  try {
    const payload = await getPayload({ config })
    const hasil = await submitLead(nilai, { payload, notifier, pembatas, ip })
    if (hasil.ok) return { status: 'sukses', errors: {}, nilai: {}, percobaan }
    return { status: 'gagal', errors: hasil.errors, pesan: hasil.pesan, nilai, percobaan }
  } catch (err) {
    // Hanya nama error: detail error bisa memuat isian pengunjung (data pribadi).
    console.error('Kiriman Lead gagal diproses:', err instanceof Error ? err.name : 'unknown')
    return { status: 'gagal', errors: {}, pesan: getMessages().lead.error.server, nilai, percobaan }
  }
}
