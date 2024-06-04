// import { signIn } from '$lib/auth'
// import type { Actions } from './$types'
import type { PageServerLoad } from './$types'
import { superValidate } from 'sveltekit-superforms'
import { emailSchema } from '$lib/form-schema'
import { zod } from 'sveltekit-superforms/adapters'
import { type Actions, fail } from '@sveltejs/kit'

export const load: PageServerLoad = async () => {
  return {
    form: await superValidate(zod(emailSchema)),
  }
}

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, zod(emailSchema))
    if (!form.valid) {
      return fail(400, { form })
    }
    console.log('form.data:', form.data)
    // await signIn('credentials', { email: form.data.email, password: 'admin' })
  },
}
// export const actions: Actions = { default: signIn }
