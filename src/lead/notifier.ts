import nodemailer, { type Transporter } from 'nodemailer'

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

/** Bagian transport nodemailer yang dipakai notifier; tes memakai pengirim palsu yang mencatat surat. */
export type PengirimEmail = Pick<Transporter, 'sendMail'>

/** Notifier email: tujuan dibaca saat Lead masuk, jadi perubahan di Pengaturan Situs langsung berlaku. */
export function buatNotifierEmail({
  pengirim,
  dari,
  ambilTujuan,
}: {
  pengirim: PengirimEmail
  dari: string
  ambilTujuan: () => Promise<string[]>
}): LeadNotifier {
  return {
    async kirim(lead) {
      const tujuan = await ambilTujuan()
      if (tujuan.length === 0) throw new Error('Email tujuan notifikasi Lead belum diatur di Pengaturan Situs')
      await pengirim.sendMail({ from: dari, to: tujuan, replyTo: lead.email, ...isiEmailLead(lead) })
    },
  }
}

/**
 * Notifier SMTP. Kredensial lewat environment variable: SMTP_HOST, SMTP_PORT, SMTP_USER,
 * SMTP_PASS, SMTP_FROM (bawaan: RISE <noreply@rise-reformia.id>), dibaca setiap kali Lead masuk.
 * Email tujuan berasal dari `ambilTujuan` (Pengaturan Situs). Bila SMTP belum dikonfigurasi,
 * kirim() gagal sehingga Lead tersimpan dengan status notifikasi "gagal".
 */
export function buatNotifierSmtp(ambilTujuan: () => Promise<string[]>, env: NodeJS.ProcessEnv = process.env): LeadNotifier {
  return {
    async kirim(lead) {
      const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = env
      if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) throw new Error('SMTP untuk notifikasi Lead belum dikonfigurasi')
      const port = Number(SMTP_PORT ?? 465)
      const notifier = buatNotifierEmail({
        pengirim: nodemailer.createTransport({
          host: SMTP_HOST,
          port,
          secure: port === 465,
          auth: { user: SMTP_USER, pass: SMTP_PASS },
          // Form menunggu notifikasi; jangan biarkan SMTP yang lambat menahan pengunjung bermenit-menit.
          connectionTimeout: 10_000,
          greetingTimeout: 10_000,
          socketTimeout: 15_000,
        }),
        dari: env.SMTP_FROM ?? 'RISE <noreply@rise-reformia.id>',
        ambilTujuan,
      })
      await notifier.kirim(lead)
    },
  }
}
