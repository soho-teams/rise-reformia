const hanyaAngka = (nomor: string) => nomor.replace(/\D/g, '')

/** Nomor Indonesia dalam bentuk internasional tanpa tanda plus, misalnya "628123456789". */
export function nomorInternasional(nomor: string): string {
  const angka = hanyaAngka(nomor)
  return angka.startsWith('0') ? `62${angka.slice(1)}` : angka
}

/** Nomor ponsel Indonesia (08…, 628…, atau +628…), boleh memakai spasi dan tanda hubung. */
export const nomorPonselValid = (nomor: string): boolean =>
  /^[\d\s+-]+$/.test(nomor) && /^628\d{7,12}$/.test(nomorInternasional(nomor))

/** Nomor telepon kantor, misalnya "021 7362 639" atau "+62 21 7362 639". */
export const nomorTeleponValid = (nomor: string): boolean =>
  /^\+?[\d\s()-]+$/.test(nomor) && hanyaAngka(nomor).length >= 6

/** Format E.164, misalnya "+62217362639", untuk tautan tel: dan data terstruktur. */
export const nomorE164 = (nomor: string) => `+${nomorInternasional(nomor)}`

export const hrefTelepon = (nomor: string) => `tel:${nomorE164(nomor)}`

/** Nomor ponsel "628123456789" menjadi "+62 812-3456-789" untuk ditampilkan. */
export function tampilNomorPonsel(nomor: string): string {
  const lokal = nomorInternasional(nomor).slice(2)
  return `+62 ${lokal.slice(0, 3)}-${lokal.slice(3, 7)}-${lokal.slice(7)}`.replace(/-$/, '')
}

/** Tautan chat WhatsApp dengan pesan pembuka yang sudah ter-encode. */
export function tautanWhatsapp(nomor: string, pesan?: string | null): string {
  const url = `https://wa.me/${nomorInternasional(nomor)}`
  return pesan ? `${url}?text=${encodeURIComponent(pesan)}` : url
}
