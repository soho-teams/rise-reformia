/** Membatasi jumlah kiriman per alamat IP dalam satu jendela waktu. */
export interface PembatasKiriman {
  izinkan(ip: string): boolean
}

/**
 * Pembatas di memori proses. Cukup untuk satu VPS dengan satu proses aplikasi (ADR-0001);
 * perlu penyimpanan bersama bila aplikasi dijalankan lebih dari satu instance.
 */
export function buatPembatasMemori({
  batas = 5,
  jendelaMs = 10 * 60 * 1000,
  sekarang = () => Date.now(),
}: { batas?: number; jendelaMs?: number; sekarang?: () => number } = {}): PembatasKiriman {
  const riwayat = new Map<string, number[]>()
  return {
    izinkan(ip) {
      const waktu = sekarang()
      const terbaru = (riwayat.get(ip) ?? []).filter((t) => waktu - t < jendelaMs)
      if (terbaru.length >= batas) {
        riwayat.set(ip, terbaru)
        return false
      }
      riwayat.set(ip, [...terbaru, waktu])
      return true
    },
  }
}
