import { Forbidden, type CollectionConfig, type Where } from 'payload'

import { fieldMinimal, minimal, punyaPeran } from '@/access/peran'
import { revalidasiSitus } from '@/insight/revalidasi'
import { buatSlug } from '@/insight/slug'

/**
 * Tulisan tim RISE. Penulis menyusun draf miliknya sendiri; Editor ke atas meninjau,
 * menerbitkan, menarik, dan menyunting Insight siapa pun. Publik hanya melihat yang terbit.
 */
export const Insight: CollectionConfig = {
  slug: 'insight',
  labels: { singular: 'Insight', plural: 'Insight' },
  admin: {
    useAsTitle: 'judul',
    defaultColumns: ['judul', 'kategori', '_status', 'tanggalTerbit'],
    preview: (doc) => (doc?.slug ? `/next/pratinjau?slug=${encodeURIComponent(String(doc.slug))}` : null),
  },
  versions: { drafts: true, maxPerDoc: 25 },
  defaultSort: '-tanggalTerbit',
  access: {
    read: ({ req: { user } }) => (user ? true : { _status: { equals: 'published' } }),
    create: minimal('penulis'),
    update: ({ req: { user } }) => {
      if (punyaPeran(user, 'editor')) return true
      if (!user) return false
      // Penulis hanya menyunting draf miliknya sendiri; Insight yang sudah terbit dikelola Editor.
      const drafMilikSendiri: Where = { and: [{ penulis: { equals: user.id } }, { _status: { not_equals: 'published' } }] }
      return drafMilikSendiri
    },
    delete: minimal('editor'),
  },
  hooks: {
    beforeChange: [
      ({ data, req }) => {
        if (data._status === 'published') {
          if (req.user && !punyaPeran(req.user, 'editor')) throw new Forbidden(req.t)
          data.tanggalTerbit ??= new Date().toISOString()
        }
        return data
      },
    ],
    // Simpan draf yang belum pernah terbit tidak mengubah halaman publik, jadi cache dibiarkan.
    afterChange: [
      ({ doc, previousDoc }) => {
        if (doc._status === 'published' || previousDoc?._status === 'published') revalidasiSitus()
      },
    ],
    afterDelete: [() => revalidasiSitus()],
  },
  fields: [
    { name: 'judul', type: 'text', required: true, maxLength: 120 },
    {
      name: 'slug',
      type: 'text',
      // Tidak `required` agar tipe data tidak mewajibkannya; hook selalu mengisinya dari judul.
      validate: (value: string | null | undefined) => Boolean(value) || 'Slug wajib diisi.',
      unique: true,
      index: true,
      admin: { position: 'sidebar', description: 'Dibuat otomatis dari judul; boleh diubah.' },
      hooks: {
        beforeValidate: [({ value, data }) => buatSlug(value || data?.judul || '') || value],
      },
    },
    { name: 'ringkasan', type: 'textarea', required: true, maxLength: 300 },
    { name: 'sampul', label: 'Gambar sampul', type: 'upload', relationTo: 'media' },
    { name: 'isi', type: 'richText', required: true },
    {
      name: 'kategori',
      label: 'Kategori Insight',
      type: 'relationship',
      relationTo: 'layanan',
      hasMany: false,
      required: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'penulis',
      type: 'relationship',
      relationTo: 'users',
      // Tidak wajib: bila akun penulis dihapus, Insight tetap ada dan penulisnya dikosongkan
      // (FK ON DELETE SET NULL). Situs publik selalu menampilkan "Tim RISE" sebagai penulis.
      defaultValue: ({ user }) => user?.id,
      access: { create: fieldMinimal('editor'), update: fieldMinimal('editor') },
      admin: { position: 'sidebar' },
    },
    {
      name: 'tanggalTerbit',
      label: 'Tanggal terbit',
      type: 'date',
      index: true,
      access: { create: fieldMinimal('editor'), update: fieldMinimal('editor') },
      admin: { position: 'sidebar', description: 'Terisi otomatis saat pertama kali diterbitkan.' },
    },
    {
      name: 'seo',
      label: 'SEO',
      type: 'group',
      fields: [
        {
          name: 'judul',
          label: 'Judul SEO',
          type: 'text',
          maxLength: 60,
          admin: { description: 'Dipakai utuh sebagai judul tab dan hasil pencarian. Kosongkan untuk memakai "{judul Insight} | Insight RISE".' },
        },
        {
          name: 'deskripsi',
          label: 'Deskripsi SEO',
          type: 'textarea',
          maxLength: 160,
          admin: { description: 'Kosongkan untuk memakai ringkasan.' },
        },
      ],
    },
  ],
}
