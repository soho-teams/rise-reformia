import { beranda } from './halaman/beranda'
import { kebijakanPrivasi } from './halaman/kebijakanPrivasi'
import { halamanLayanan } from './halaman/layanan'
import { tentangKami } from './halaman/tentangKami'
import { umum } from './umum'

/** Kamus lengkap bahasa Indonesia: teks umum ditambah copy per halaman (hanya untuk server). */
export const id = {
  ...umum,
  beranda,
  tentangKami,
  kebijakanPrivasi,
  halamanLayanan,
}
