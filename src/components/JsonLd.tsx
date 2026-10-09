/** Structured data untuk mesin pencari. `<` di-escape agar isi CMS tidak bisa menutup tag script. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />
  )
}
