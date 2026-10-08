'use client'

import { Button } from '@payloadcms/ui'
import { useSearchParams } from 'next/navigation'

/**
 * Tombol di atas daftar Lead. Mengunduh CSV dengan saringan yang sedang aktif
 * (parameter `where` dan `search` dari URL daftar) atau semua Lead bila tidak ada saringan.
 */
export function TombolEksporLead() {
  const params = useSearchParams()
  const saringan = new URLSearchParams()
  params.forEach((nilai, kunci) => {
    if (kunci.startsWith('where') || kunci === 'search') saringan.append(kunci, nilai)
  })
  const query = saringan.toString()
  return (
    <div style={{ marginBottom: 'var(--base)' }}>
      <Button el="anchor" url={`/api/leads/ekspor-csv${query ? `?${query}` : ''}`} buttonStyle="secondary" size="small">
        {query ? 'Ekspor hasil saringan ke CSV' : 'Ekspor semua Lead ke CSV'}
      </Button>
    </div>
  )
}
