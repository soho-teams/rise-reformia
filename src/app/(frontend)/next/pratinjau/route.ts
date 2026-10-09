import config from '@payload-config'
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'

import { getMessages } from '@/i18n'
import { buatSlug } from '@/insight/slug'
import { ruteInsight } from '@/situs/rute'

const t = getMessages().insight.rutePratinjau

/** Mengaktifkan pratinjau draf Insight. Hanya untuk pengguna CMS yang sedang login. */
export async function GET(request: Request) {
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: request.headers })
  if (!user) return new Response(t.perluMasuk, { status: 403 })

  const slug = new URL(request.url).searchParams.get('slug') ?? ''
  // Slug dibersihkan supaya parameter ini tidak bisa dipakai sebagai open redirect.
  if (!slug || buatSlug(slug) !== slug) return new Response(t.slugTidakValid, { status: 400 })

  ;(await draftMode()).enable()
  redirect(ruteInsight(slug))
}
