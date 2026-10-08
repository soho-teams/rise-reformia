import type { CollectionConfig } from 'payload'

import { minimal, punyaPeran } from '@/access/peran'
import { BATAS_LEAD, PILIHAN_LAYANAN } from '@/lead/periksa'

/** Permintaan konsultasi dari website. Berisi data pribadi (UU PDP): hanya Admin yang mengakses. */
export const Leads: CollectionConfig = {
  slug: 'leads',
  labels: { singular: 'Lead', plural: 'Lead' },
  admin: {
    useAsTitle: 'nama',
    defaultColumns: ['nama', 'perusahaan', 'layanan', 'statusNotifikasi', 'createdAt'],
    hidden: ({ user }) => !punyaPeran(user, 'admin'),
  },
  access: {
    read: minimal('admin'),
    update: minimal('admin'),
    delete: minimal('admin'),
    // Lead hanya dibuat lewat submitLead (server), tidak lewat REST atau GraphQL.
    create: () => false,
  },
  fields: [
    { name: 'nama', type: 'text', required: true, maxLength: BATAS_LEAD.nama },
    { name: 'perusahaan', type: 'text', required: true },
    { name: 'jabatan', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'telepon', type: 'text' },
    { name: 'layanan', label: 'Layanan diminati', type: 'select', required: true, options: PILIHAN_LAYANAN },
    { name: 'pesan', type: 'textarea', required: true, maxLength: BATAS_LEAD.pesanMaks },
    {
      type: 'row',
      fields: [
        // Bukti persetujuan (UU PDP): ditulis sekali oleh submitLead, tidak bisa diubah siapa pun.
        {
          name: 'persetujuanPdp',
          label: 'Persetujuan data pribadi',
          type: 'checkbox',
          required: true,
          access: { update: () => false },
        },
        {
          name: 'waktuPersetujuan',
          type: 'date',
          required: true,
          access: { update: () => false },
          admin: { date: { pickerAppearance: 'dayAndTime' } },
        },
      ],
    },
    {
      name: 'statusNotifikasi',
      type: 'select',
      required: true,
      defaultValue: 'gagal',
      options: [
        { label: 'Terkirim', value: 'terkirim' },
        { label: 'Gagal', value: 'gagal' },
      ],
      admin: { position: 'sidebar' },
    },
  ],
}
