import type { Insight } from '@/payload-types'

/** Isi rich text Lexical minimal: satu paragraf berisi teks biasa. */
export const isiTeks = (teks: string): Insight['isi'] => ({
  root: {
    type: 'root',
    format: '' as const,
    indent: 0,
    version: 1,
    direction: 'ltr' as const,
    children: [
      {
        type: 'paragraph',
        format: '' as const,
        indent: 0,
        version: 1,
        direction: 'ltr' as const,
        textFormat: 0,
        textStyle: '',
        children: [{ type: 'text', text: teks, format: 0, style: '', mode: 'normal' as const, detail: 0, version: 1 }],
      },
    ],
  },
})
