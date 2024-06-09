import { redirect } from '@sveltejs/kit'

export const load = async ({ locals: { supabase, safeGetSession } }) => {
  const { session } = await safeGetSession()

  if (!session) {
    redirect(303, '/')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select(`username, full_name, website, avatar_url, role, alpaca_account_id`)
    .eq('id', session.user.id)
    .single()

  return {
    session,
    profile,
  }
}
