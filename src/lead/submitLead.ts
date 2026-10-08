import type { Payload } from 'payload'

import { getMessages } from '@/i18n'
import type { LeadNotifier } from './notifier'
import type { PembatasKiriman } from './pembatas'
import { FIELD_HONEYPOT, periksaLead, type ErrorLead } from './periksa'

export type HasilLead = { ok: true } | { ok: false; errors: ErrorLead; pesan?: string }

export type KebutuhanLead = {
  payload: Payload
  notifier: LeadNotifier
  pembatas: PembatasKiriman
  ip: string
}

/**
 * Satu-satunya pintu masuk Lead: memeriksa kiriman, menyimpannya, lalu mengabari tim.
 * Kegagalan notifikasi tidak membatalkan penyimpanan; Lead ditandai statusNotifikasi "gagal".
 */
export async function submitLead(input: Record<string, unknown>, kebutuhan: KebutuhanLead): Promise<HasilLead> {
  const honeypot = input[FIELD_HONEYPOT]
  if (typeof honeypot === 'string' && honeypot.trim() !== '') return { ok: true }

  const hasil = periksaLead(input)
  if ('errors' in hasil) return { ok: false, errors: hasil.errors }

  // Dihitung setelah validasi, supaya pengunjung yang salah isi tidak ikut terblokir.
  if (!kebutuhan.pembatas.izinkan(kebutuhan.ip)) {
    return { ok: false, errors: {}, pesan: getMessages().lead.error.terlaluSering }
  }

  const lead = await kebutuhan.payload.create({
    collection: 'leads',
    data: {
      ...hasil.data,
      persetujuanPdp: true,
      waktuPersetujuan: new Date().toISOString(),
      statusNotifikasi: 'gagal',
      statusTindakLanjut: 'baru',
    },
  })

  try {
    await kebutuhan.notifier.kirim(lead)
    await kebutuhan.payload.update({ collection: 'leads', id: lead.id, data: { statusNotifikasi: 'terkirim' } })
  } catch (err) {
    kebutuhan.payload.logger.error({ err, leadId: lead.id }, 'Notifikasi Lead gagal dikirim')
  }

  return { ok: true }
}
