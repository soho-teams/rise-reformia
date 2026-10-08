import type { ReactNode } from 'react'

/** Tipografi untuk teks panjang, misalnya isi Insight dan Kebijakan Privasi. */
export function Prosa({ children }: { children: ReactNode }) {
  return <div className="prosa">{children}</div>
}
