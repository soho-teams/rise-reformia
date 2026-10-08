/**
 * Data kontak resmi RISE (dikonfirmasi 8 Oktober 2026). Pindah ke global Pengaturan Situs di SOH-150.
 * Teks alamat dan jam layanan ada di src/i18n (`kontakRise`). Isian yang masih null atau kosong
 * belum dikirim RISE dan tidak ditampilkan.
 */
export const KONTAK_RISE = {
  email: 'business@rise-reformia.id',
  telepon: { tampil: '021 7362 639', href: 'tel:+62217362639' },
  whatsapp: null as { tampil: string; href: string } | null,
  mediaSosial: [] as { nama: string; href: string }[],
}
