import type { CollectionConfig, Payload } from 'payload'

import { minimal } from '@/access/peran'
import { getMessages } from '@/i18n'
import { revalidasiSitus } from '@/insight/revalidasi'
import { SLUG_LAYANAN } from '@/layanan'

/**
 * Empat Layanan RISE, sekaligus pilihan Kategori Insight. Entrinya tetap: dibuat oleh
 * `pastikanLayanan` saat Payload mulai, tidak bisa ditambah atau dihapus lewat admin.
 */
export const Layanan: CollectionConfig = {
  slug: 'layanan',
  labels: { singular: 'Layanan', plural: 'Layanan' },
  admin: {
    useAsTitle: 'nama',
    defaultColumns: ['nama', 'slug'],
  },
  defaultSort: 'urutan',
  // Nama Layanan tampil sebagai Kategori Insight di halaman yang di-cache.
  hooks: { afterChange: [() => revalidasiSitus()] },
  access: {
    read: () => true,
    create: () => false,
    update: minimal('editor'),
    delete: () => false,
  },
  fields: [
    { name: 'nama', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      // Slug dipakai URL halaman Layanan dan isian form Lead; tidak boleh berubah.
      access: { update: () => false },
      admin: { readOnly: true },
    },
    { name: 'urutan', type: 'number', required: true, admin: { hidden: true } },
  ],
}

/** Membuat entri Layanan yang belum ada. Aman dijalankan berulang. */
export async function pastikanLayanan(payload: Payload): Promise<void> {
  const nama = getMessages().layanan
  const { docs } = await payload.find({ collection: 'layanan', limit: SLUG_LAYANAN.length, pagination: false })
  const ada = new Set(docs.map((d) => d.slug))
  for (const [urutan, slug] of SLUG_LAYANAN.entries()) {
    if (!ada.has(slug)) await payload.create({ collection: 'layanan', data: { slug, nama: nama[slug], urutan } })
  }
}
