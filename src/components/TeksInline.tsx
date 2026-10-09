import { Fragment } from 'react'

/**
 * Teks dengan format sebaris dari copy markdown: **tebal** dan `[PERLU DATA RISE: ...]`.
 * Penanda dirender sebagai <mark> supaya terlihat jelas sebagai bagian yang belum lengkap.
 */
export function TeksInline({ teks }: { teks: string }) {
  return (
    <>
      {teks.split(/(\*\*[^*]+\*\*|`\[[^\]]+\]`)/).map((bagian, i) => {
        if (bagian.startsWith('**')) return <strong key={i}>{bagian.slice(2, -2)}</strong>
        if (bagian.startsWith('`[')) return <mark key={i} className="penanda-sebaris">{bagian.slice(1, -1)}</mark>
        return <Fragment key={i}>{bagian}</Fragment>
      })}
    </>
  )
}
