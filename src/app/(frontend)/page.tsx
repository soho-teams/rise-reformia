import { getMessages } from '@/i18n'

const t = getMessages()

export default function BerandaPage() {
  return (
    <div className="placeholder">
      <h1>{t.home.placeholderTitle}</h1>
      <p>{t.home.placeholderBody}</p>
    </div>
  )
}
