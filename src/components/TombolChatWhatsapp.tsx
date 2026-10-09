import { getMessages } from '@/i18n'
import { tautanWhatsapp } from '@/situs/telepon'
import { kelasTombol } from './Tombol'

/** Tombol berteks "Chat via WhatsApp" dengan pesan pembuka; tidak dirender bila nomor kosong. */
export function TombolChatWhatsapp({
  nomor,
  pesan,
  varian = 'whatsapp',
  besar,
}: {
  nomor: string | null | undefined
  pesan?: string | null
  varian?: 'whatsapp' | 'garis'
  besar?: boolean
}) {
  if (!nomor) return null
  return (
    <a href={tautanWhatsapp(nomor, pesan)} className={kelasTombol(varian, besar)} rel="noopener" target="_blank">
      {getMessages().halamanLayananUmum.chatWhatsapp}
    </a>
  )
}
