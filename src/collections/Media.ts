import type { CollectionConfig } from 'payload'

import { minimal } from '@/access/peran'

/** Gambar untuk Insight dan halaman situs. Ukuran turunan dibuat otomatis saat unggah. */
export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
    create: minimal('penulis'),
    // Gambar bisa dipakai Insight milik orang lain, jadi mengubah dan menghapus butuh Editor.
    update: minimal('editor'),
    delete: minimal('editor'),
  },
  fields: [
    {
      name: 'alt',
      label: 'Teks alternatif',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    mimeTypes: ['image/*'],
    focalPoint: true,
    imageSizes: [
      { name: 'kartu', width: 720 },
      { name: 'sampul', width: 1440 },
      { name: 'og', width: 1200, height: 630, position: 'centre' },
    ],
    adminThumbnail: 'kartu',
  },
}
