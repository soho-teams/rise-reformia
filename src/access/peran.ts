import type { Access, FieldAccess, PayloadRequest } from 'payload'

import type { User } from '@/payload-types'

export type Peran = NonNullable<User['peran']>

// Urutan dari tingkat terendah: Admin ⊃ Editor ⊃ Penulis.
export const DAFTAR_PERAN: { label: string; value: Peran }[] = [
  { label: 'Penulis', value: 'penulis' },
  { label: 'Editor', value: 'editor' },
  { label: 'Admin', value: 'admin' },
]

const TINGKAT = Object.fromEntries(DAFTAR_PERAN.map((p, i) => [p.value, i + 1])) as Record<Peran, number>

// Menerima User dari server maupun ClientUser di panel admin; yang dibaca hanya peran.
export const punyaPeran = (user: object | null | undefined, minimal: Peran): boolean => {
  const peran = (user as { peran?: Peran } | null | undefined)?.peran
  return !!peran && peran in TINGKAT && TINGKAT[peran] >= TINGKAT[minimal]
}

const cekPeran =
  (peran: Peran) =>
  ({ req }: { req: PayloadRequest }) =>
    punyaPeran(req.user, peran)

/** Akses koleksi atau global untuk pengguna dengan peran minimal tertentu. */
export const minimal: (peran: Peran) => Access = cekPeran

/** Akses field untuk pengguna dengan peran minimal tertentu. */
export const fieldMinimal: (peran: Peran) => FieldAccess = cekPeran

/** Admin mengakses semua dokumen; pengguna lain hanya akunnya sendiri. */
export const adminAtauDiriSendiri: Access = ({ req: { user } }) => {
  if (punyaPeran(user, 'admin')) return true
  return user ? { id: { equals: user.id } } : false
}
