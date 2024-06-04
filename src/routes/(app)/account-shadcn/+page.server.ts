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
    .select(`username, full_name, website, avatar_url`)
    .eq('id', session.user.id)
    .single()

  return { session, profile, form: await superValidate(profile, zod(formSchema)) }
}

export const actions: Actions = {
  update: async (event) => {
    const {
      request,
      locals: { supabase, safeGetSession },
    } = event

    const form = await superValidate(event, zod(formSchema))
    console.log('form', form)

    if (!form.valid) {
      return fail(400, {
        form,
      })
    }

    const { session } = await safeGetSession()

    const { error } = await supabase.from('profiles').upsert({
      id: session?.user.id,
      // full_name: fullName,
      username: form.data.username,
      // website,
      // avatar_url: avatarUrl,
      updated_at: new Date(),
    })

    if (error) {
      return fail(500, {
        // fullName,
        form,
        // website,
        // avatarUrl,
      })
    }

    console.log("sent back", form)
    return {
      // fullName,
      form,
      // website,
      // avatarUrl,
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
