import nodemailer from 'nodemailer'

import { getMessages } from '@/i18n'
import type { Lead } from '@/payload-types'

/** Mengabari tim RISE tentang Lead baru. Implementasi bisa diganti (SMTP cPanel, layanan transaksional, palsu untuk tes). */
export interface LeadNotifier {
  kirim(lead: Lead): Promise<void>
}

const t = getMessages().lead

export function isiEmailLead(lead: Lead): { subject: string; text: string } {
  const baris: [string, string | null | undefined][] = [
    ['Nama', lead.nama],
    ['Perusahaan', lead.perusahaan],
    ['Jabatan', lead.jabatan],
    ['Email', lead.email],
    ['Telepon', lead.telepon],
    ['Layanan diminati', t.layanan[lead.layanan]],
    ['Persetujuan data pribadi', lead.waktuPersetujuan ?? undefined],
  ]
  return {
    subject: `Permintaan konsultasi baru: ${lead.nama} (${lead.perusahaan})`,
    text: [...baris.map(([k, v]) => `${k}: ${v || '-'}`), '', 'Pesan:', lead.pesan].join('\n'),
  }
}

/**
 * Notifier SMTP. Konfigurasi lewat environment variable: SMTP_HOST, SMTP_PORT, SMTP_USER,
 * SMTP_PASS, SMTP_FROM (bawaan: RISE <noreply@rise-reformia.id>), LEAD_NOTIFY_TO.
 * Bila belum dikonfigurasi, kirim() gagal sehingga Lead tersimpan dengan status notifikasi "gagal".
 */
export function buatNotifierSmtp(env: NodeJS.ProcessEnv = process.env): LeadNotifier {
  return {
    async kirim(lead) {
      const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, LEAD_NOTIFY_TO } = env
      if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !LEAD_NOTIFY_TO) {
        throw new Error('SMTP untuk notifikasi Lead belum dikonfigurasi')
      }
      const port = Number(SMTP_PORT ?? 465)
      const transport = nodemailer.createTransport({
        host: SMTP_HOST,
        port,
        secure: port === 465,
        auth: { user: SMTP_USER, pass: SMTP_PASS },
        // Form menunggu notifikasi; jangan biarkan SMTP yang lambat menahan pengunjung bermenit-menit.
        connectionTimeout: 10_000,
        greetingTimeout: 10_000,
        socketTimeout: 15_000,
      })
      await transport.sendMail({
        from: env.SMTP_FROM ?? 'RISE <noreply@rise-reformia.id>',
        to: LEAD_NOTIFY_TO,
        replyTo: lead.email,
        ...isiEmailLead(lead),
      })
    },
  }
}
