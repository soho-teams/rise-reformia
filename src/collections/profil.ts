import type { Access, CollectionConfig, Field } from 'payload'

import { minimal, punyaPeran } from '@/access/peran'
import type { BagianOpsional } from '@/payload-types'
import { revalidasiSitus } from '@/situs/revalidasi'

type Toggle = keyof Pick<BagianOpsional, 'tampilKonsultan' | 'tampilKlien' | 'tampilTestimoni'>

/** Publik hanya bisa membaca selama toggle-nya di Bagian Opsional menyala; Admin selalu bisa. */
const bacaBilaDitampilkan =
  (toggle: Toggle): Access =>
  async ({ req }) => {
    if (punyaPeran(req.user, 'admin')) return true
    const bagian = await req.payload.findGlobal({ slug: 'bagian-opsional', depth: 0, req })
    return Boolean(bagian[toggle])
  }

const urutan: Field = {
  name: 'urutan',
  label: 'Urutan tampil',
  type: 'number',
  required: true,
  defaultValue: 1,
  admin: { position: 'sidebar', description: 'Angka kecil tampil lebih dulu.' },
}

/** Koleksi profil yang dikelola Admin dan tampil di situs publik lewat Bagian Opsional. */
function koleksiProfil(
  config: Pick<CollectionConfig, 'slug' | 'labels' | 'fields'> & { toggle: Toggle; judul: string; kolom: string[] },
): CollectionConfig {
  return {
    slug: config.slug,
    labels: config.labels,
    admin: {
      useAsTitle: config.judul,
      defaultColumns: [...config.kolom, 'urutan'],
      group: 'Profil RISE',
      hidden: ({ user }) => !punyaPeran(user, 'admin'),
    },
    defaultSort: 'urutan',
    access: {
      read: bacaBilaDitampilkan(config.toggle),
      create: minimal('admin'),
      update: minimal('admin'),
      delete: minimal('admin'),
    },
    hooks: { afterChange: [() => revalidasiSitus()], afterDelete: [() => revalidasiSitus()] },
    fields: [...config.fields, urutan],
  }
}

export const Konsultan = koleksiProfil({
  slug: 'konsultan',
  labels: { singular: 'Konsultan', plural: 'Konsultan' },
  toggle: 'tampilKonsultan',
  judul: 'nama',
  kolom: ['nama', 'jabatan'],
  fields: [
    { name: 'foto', type: 'upload', relationTo: 'media' },
    { name: 'nama', type: 'text', required: true },
    { name: 'jabatan', type: 'text', required: true },
    { name: 'keahlian', label: 'Bidang keahlian', type: 'text' },
    { name: 'latarBelakang', label: 'Latar belakang', type: 'textarea' },
    {
      name: 'kredensial',
      type: 'textarea',
      admin: { description: 'Pendidikan dan sertifikasi yang boleh dipublikasikan, satu per baris.' },
    },
  ],
})

export const Klien = koleksiProfil({
  slug: 'klien',
  labels: { singular: 'Klien', plural: 'Klien' },
  toggle: 'tampilKlien',
  judul: 'nama',
  kolom: ['nama'],
  fields: [
    { name: 'nama', type: 'text', required: true },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Pastikan Klien sudah mengizinkan logonya ditampilkan.' },
    },
  ],
})

export const Testimoni = koleksiProfil({
  slug: 'testimoni',
  labels: { singular: 'Testimoni', plural: 'Testimoni' },
  toggle: 'tampilTestimoni',
  judul: 'nama',
  kolom: ['nama', 'perusahaan'],
  fields: [
    {
      name: 'kutipan',
      type: 'textarea',
      required: true,
      admin: { description: 'Kutipan asli dari Klien, dengan izin tertulis untuk dipublikasikan.' },
    },
    { name: 'nama', type: 'text', required: true },
    { name: 'jabatan', type: 'text', required: true },
    { name: 'perusahaan', type: 'text', required: true },
  ],
})
