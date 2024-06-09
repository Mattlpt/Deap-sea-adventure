import { superValidate } from 'sveltekit-superforms'
import { zod } from 'sveltekit-superforms/adapters'
import { type Actions, fail, redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types.js'
import { formSchema } from './schema.js'

export const load: PageServerLoad = async ({ locals: { supabase, safeGetSession } }) => {
  const { session } = await safeGetSession()

  if (!session) {
    redirect(303, '/')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select(`username, full_name, website, avatar_url, role`)
    .eq('id', session.user.id)
    .single()

  return { session, profile, form: await superValidate(profile, zod(formSchema)) }
}

export const actions: Actions = {
  update: async ({ request, locals: { supabase, safeGetSession } }) => {
    
    const data = await request.formData()
    console.log(data)

    const form = await superValidate(data, zod(formSchema))
    console.log(form)

    if (!form.valid) {
      return fail(400, {
        form,
      })
    }

    const { session } = await safeGetSession()

    const { error } = await supabase.from('profiles').upsert({
      id: session?.user.id,
      full_name: form.data.full_name,
      username: form.data.username,
      website: form.data.website,
      avatar_url: form.data.avatar_url,
      updated_at: new Date(),
    })

    if (error) {
      return fail(500, {
        form,
      })
    }

    return {
      form,
    }
  },

  signout: async ({ locals: { supabase, safeGetSession } }) => {
    const { session } = await safeGetSession()
    if (session) {
      await supabase.auth.signOut()
      redirect(303, '/')
    }
  },
}
