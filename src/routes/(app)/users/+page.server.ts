import { goto } from '$app/navigation'
import type { PageServerLoad } from './$types'
import { redirect } from '@sveltejs/kit'

export const load = (async ({ locals: { safeGetSession, supabase } }) => {
  const { session } = await safeGetSession()

  if (!session) {
    redirect(300, '/')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select(`username, full_name, website, avatar_url, role`)
    .eq('id', session.user.id)
    .single()

  if (profile?.role !== 'admin') {
    redirect(300, '/home')
  }

  const { data: users } = await supabase.from('profiles').select(`
      id,
      username,
      full_name,
      website,
      avatar_url,
      role
    `)

  return { session, profile, users }
}) satisfies PageServerLoad
