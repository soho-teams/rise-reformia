import type { GlobalConfig, Payload } from 'payload'

import { minimal, punyaPeran } from '@/access/peran'
import { revalidasiSitus } from '@/situs/revalidasi'
import { nomorInternasional, nomorPonselValid, nomorTeleponValid } from '@/situs/telepon'

export const EMAIL_RESMI = 'business@rise-reformia.id'

const DOMAIN_MEDIA_SOSIAL = {
  LinkedIn: ['linkedin.com'],
  Instagram: ['instagram.com'],
  Facebook: ['facebook.com', 'fb.com'],
  YouTube: ['youtube.com', 'youtu.be'],
  TikTok: ['tiktok.com'],
  X: ['x.com', 'twitter.com'],
} as const
type MediaSosial = keyof typeof DOMAIN_MEDIA_SOSIAL

function urlMediaSosialValid(url: string | null | undefined, nama: MediaSosial | undefined): true | string {
  const domain = nama ? DOMAIN_MEDIA_SOSIAL[nama] : []
  try {
    const { protocol, hostname } = new URL(url ?? '')
    if (protocol === 'https:' && domain.some((d) => hostname === d || hostname.endsWith(`.${d}`))) return true
  } catch {
    // URL tidak bisa diurai; jatuh ke pesan error di bawah.
  }
  return `URL ${nama ?? 'media sosial'} harus diawali https:// dan mengarah ke ${domain.join(' atau ') || 'situs platformnya'}.`
}

/**
 * Informasi operasional situs yang diubah Admin tanpa developer: kontak, WhatsApp, media sosial,
 * dan email tujuan notifikasi Lead. Situs publik membacanya di server lewat `ambilPengaturanSitus`,
 * jadi akses REST dan GraphQL cukup untuk Admin.
 */
export const PengaturanSitus: GlobalConfig = {
  slug: 'pengaturan-situs',
  label: 'Pengaturan Situs',
  access: {
    read: minimal('admin'),
    update: minimal('admin'),
  },
  admin: { hidden: ({ user }) => !punyaPeran(user, 'admin') },
  hooks: { afterChange: [() => revalidasiSitus()] },
  fields: [
    {
      type: 'collapsible',
      label: 'WhatsApp',
      fields: [
        {
          name: 'whatsapp',
          label: 'Nomor WhatsApp Business',
          type: 'text',
          admin: { description: 'Contoh: 0812 3456 7890. Kosongkan untuk menyembunyikan tombol WhatsApp.' },
          // Dinormalisasi sebelum validasi hanya bila formatnya benar; input yang salah dibiarkan
          // apa adanya agar validasi menolaknya dengan pesan, bukan dikosongkan diam-diam.
          hooks: {
            beforeValidate: [
              ({ value }) => (!value ? null : nomorPonselValid(value) ? nomorInternasional(value) : value),
            ],
          },
          validate: (value: string | null | undefined) =>
            !value || nomorPonselValid(value) || 'Masukkan nomor ponsel Indonesia, misalnya 0812 3456 7890.',
        },
        {
          name: 'pesanWhatsapp',
          label: 'Pesan pembuka',
          type: 'textarea',
          // Dari docs/copy/kontak.md, bagian Tombol WhatsApp.
          defaultValue: 'Halo RISE, saya ingin berdiskusi tentang kebutuhan organisasi/usaha saya. Mohon informasinya.',
          admin: { description: 'Teks yang sudah terisi saat pengunjung membuka chat.' },
        },
      ],
    },
    {
      name: 'emailNotifikasiLead',
      label: 'Email tujuan notifikasi Lead',
      type: 'array',
      minRows: 1,
      defaultValue: [{ email: EMAIL_RESMI }],
      labels: { singular: 'Email', plural: 'Email' },
      fields: [{ name: 'email', type: 'email', required: true }],
    },
    {
      type: 'collapsible',
      label: 'Kontak di situs',
      fields: [
        { name: 'emailKontak', label: 'Email kontak', type: 'email', required: true, defaultValue: EMAIL_RESMI },
        {
          name: 'telepon',
          label: 'Telepon kantor',
          type: 'text',
          required: true,
          defaultValue: '021 7362 639',
          validate: (value: string | null | undefined) =>
            (!!value && nomorTeleponValid(value)) || 'Masukkan nomor telepon, misalnya 021 7362 639.',
        },
        {
          name: 'alamat',
          label: 'Alamat kantor',
          type: 'textarea',
          admin: { description: 'Opsional. Setiap baris tampil sebagai baris baru di footer.' },
          defaultValue: [
            'Ged. Bintaro Business Center',
            'Jl. RC Veteran No. 1-i, RT 001/RW 003',
            'Kel. Bintaro, Kec. Pesanggrahan',
            'Jakarta Selatan 12330',
          ].join('\n'),
        },
        { name: 'jamLayanan', label: 'Jam layanan', type: 'text', defaultValue: 'Senin–Jumat, 08.00–17.00 WIB' },
      ],
    },
    {
      name: 'mediaSosial',
      label: 'Media sosial',
      type: 'array',
      labels: { singular: 'Akun', plural: 'Akun' },
      fields: [
        {
          name: 'nama',
          type: 'select',
          required: true,
          options: Object.keys(DOMAIN_MEDIA_SOSIAL),
        },
        {
          name: 'url',
          label: 'URL',
          type: 'text',
          required: true,
          validate: (value: string | null | undefined, { siblingData }: { siblingData: { nama?: MediaSosial } }) =>
            urlMediaSosialValid(value, siblingData.nama),
        },
      ],
    },
  ],
}

/** Menyimpan nilai bawaan (data kontak resmi) bila Pengaturan Situs belum pernah disimpan. */
export async function pastikanPengaturanSitus(payload: Payload): Promise<void> {
  const ada = await payload.findGlobal({ slug: 'pengaturan-situs', depth: 0 })
  if (!ada.createdAt) await payload.updateGlobal({ slug: 'pengaturan-situs', data: {} })
}
