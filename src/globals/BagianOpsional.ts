import type { GlobalConfig } from 'payload'

import { minimal, punyaPeran } from '@/access/peran'
import { revalidasiSitus } from '@/situs/revalidasi'

/**
 * Tampil atau sembunyikan bagian yang datanya belum tentu ada. Semua mati secara bawaan;
 * Admin menyalakannya setelah profil Konsultan, logo Klien, atau testimoni siap dipublikasikan.
 */
export const BagianOpsional: GlobalConfig = {
  slug: 'bagian-opsional',
  label: 'Bagian Opsional',
  access: { read: () => true, update: minimal('admin') },
  admin: { hidden: ({ user }) => !punyaPeran(user, 'admin'), group: 'Profil RISE' },
  hooks: { afterChange: [() => revalidasiSitus()] },
  fields: [
    {
      name: 'tampilKonsultan',
      label: 'Tampilkan profil Konsultan di Tentang Kami',
      type: 'checkbox',
      defaultValue: false,
    },
    { name: 'tampilKlien', label: 'Tampilkan Klien di Beranda', type: 'checkbox', defaultValue: false },
    { name: 'tampilTestimoni', label: 'Tampilkan testimoni di Beranda', type: 'checkbox', defaultValue: false },
  ],
}
