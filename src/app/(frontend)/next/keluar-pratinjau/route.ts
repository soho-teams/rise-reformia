import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

import { RUTE } from '@/situs/rute'

export async function GET() {
  ;(await draftMode()).disable()
  redirect(RUTE.insight)
}
