import { myHeaders } from '$lib/alpacaClient'
import { fail, message, superValidate } from 'sveltekit-superforms'
import type { Actions, PageServerLoad } from './$types'
import { zod } from 'sveltekit-superforms/adapters'
import { achSchema } from './ACHShema'
import { transferSchema } from './transferSchema'

export const load: PageServerLoad = async (event) => {
  const { session, profile } = await event.parent()

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
  }

  const response = await fetch(
    `https://broker-api.sandbox.alpaca.markets/v1/accounts/${profile?.alpaca_account_id}`,
    requestOptions
  )
    .then((response) => response.json())
    .catch((error) => console.error(error))

  const ach_relationships = await fetch(
    `https://broker-api.sandbox.alpaca.markets/v1/accounts/${profile?.alpaca_account_id}/ach_relationships`,
    requestOptions
  )
    .then((response) => response.json())
    .catch((error) => console.error(error))

  const achData = {
    account_owner_name: profile?.full_name ?? 'Ok depart',
    bank_account_type: 'CHECKING',
    bank_account_number: '32131231abc',
    bank_routing_number: '123103716',
    nickname: 'Bank of America Checking',
  }

  const fundData = {
    transfer_type: 'ach',
    relationship_id: ach_relationships[0].id || '123',
    amount: 1000,
    direction: 'INCOMING',
  }

  return {
    session,
    profile,
    alpaca_account: response,
    alpaca_ach_relationships: ach_relationships,
    achForm: await superValidate(achData, zod(achSchema)),
    fundForm: await superValidate(fundData, zod(transferSchema)),
  }
}

export const actions: Actions = {
  async ach({ request, locals: { supabase, safeGetSession } }) {
    const data = await request.formData()
    console.log(data)

    const form = await superValidate(data, zod(achSchema))

    if (!form.valid) {
      return fail(400, {
        form,
      })
    }

    const { session } = await safeGetSession()

    if (!session) {
      return fail(401, { form, message: 'No session' })
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select(`username, full_name, website, avatar_url, role, alpaca_account_id`)
      .eq('id', session.user.id)
      .single()

    if (!profile?.alpaca_account_id) {
      return fail(400, {
        form,
        message: 'No Alpaca account found',
      })
    }
    console.log(form.data)

    // Request
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({
        account_owner_name: form.data.account_owner_name,
        bank_account_type: form.data.bank_account_type || 'CHECKING',
        bank_account_number: form.data.bank_account_number || '32131231abc',
        bank_routing_number: form.data.bank_routing_number || '123103716',
        nickname: form.data.nickname || 'Bank of America Checking',
      }),
    }

    const ach_relationships = await fetch(
      `https://broker-api.sandbox.alpaca.markets/v1/accounts/${profile?.alpaca_account_id}/ach_relationships`,
      requestOptions
    )
      .then((response) => response.json())
      .catch((error) => console.error(error))

    return message(form, ach_relationships)
  },
  async fund({ request, locals: { supabase, safeGetSession } }) {
    const data = await request.formData()
    console.log(data)

    const form = await superValidate(data, zod(transferSchema))

    if (!form.valid) {
      return fail(400, {
        form,
      })
    }

    const { session } = await safeGetSession()

    if (!session) {
      return fail(401, { form, message: 'No session' })
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select(`username, full_name, website, avatar_url, role, alpaca_account_id`)
      .eq('id', session.user.id)
      .single()

    if (!profile?.alpaca_account_id) {
      return fail(400, {
        form,
        message: 'No Alpaca account found',
      })
    }
    console.log(form.data)

    // Request
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({
        transfer_type: form.data.transfer_type || 'ach',
        relationship_id: form.data.relationship_id,
        amount: form.data.amount,
        direction: form.data.direction || 'INCOMING',
      }),
    }

    const transfer = await fetch(
      `https://broker-api.sandbox.alpaca.markets/v1/accounts/${profile?.alpaca_account_id}/transfers`,
      requestOptions
    )
      .then((response) => response.json())
      .catch((error) => console.error(error))

    return message(form, transfer)
  },
}
