import { redirect, type Actions } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { fail, message, superValidate } from 'sveltekit-superforms'
import { zod } from 'sveltekit-superforms/adapters'
import { formSchema } from './schema'
import Alpaca from '@alpacahq/alpaca-trade-api'
import { APCA_BROKER_API_KEY_ID, APCA_BROKER_API_SECRET_KEY } from '$env/static/private'

export const load: PageServerLoad = async ({ parent }) => {
  const { session, profile } = await parent()

  if (!session) {
    return redirect(300, '/')
  }

  if (profile?.alpaca_account_id) {
    return redirect(300, '/settings/alpaca')
  }

  const form_data = {
    contact: {
      email_address: 'laughing_thompson@example.com',
      phone_number: '640-555-6415',
      street_address: ['20 N San Mateo Dr'],
      city: 'San Mateo',
      state: 'CA',
      postal_code: '94401',
    },
    identity: {
      given_name: 'Laughing',
      family_name: 'Thompson',
      date_of_birth: '1970-01-01',
      tax_id: '444-55-4321',
      tax_id_type: 'USA_SSN',
      country_of_citizenship: 'USA',
      country_of_birth: 'USA',
      country_of_tax_residence: 'USA',
      funding_source: ['employment_income'],
      visa_type: null,
      visa_expiration_date: null,
      date_of_departure_from_usa: null,
      permanent_resident: null,
      investment_experience_with_stocks: null,
      investment_experience_with_options: null,
      investment_time_horizon: null,
    },
    disclosures: {
      is_control_person: false,
      is_affiliated_exchange_or_finra: false,
      is_affiliated_exchange_or_iiroc: false,
      is_politically_exposed: false,
      immediate_family_exposed: false,
      is_discretionary: null,
    },
    agreements: [
      {
        agreement: 'customer_agreement',
        signed_at: '2024-06-08T18:28:08.707582833Z',
        ip_address: '127.0.0.1',
        revision: null,
      },
    ],
    documents: [
      {
        document_type: 'identity_verification',
        document_sub_type: 'passport',
        content:
          '/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD3+iiigD//2Q==',
        content_data: null,
        mime_type: 'image/jpeg',
      },
    ],
    trusted_contact: {
      given_name: 'Jane',
      family_name: 'Doe',
      email_address: 'laughing_thompson_55042597@example.com',
    },
    minor_identity: null,
    entity_id: null,
    additional_information: '',
    account_type: '',
    account_sub_type: null,
    auto_approve: null,
    beneficiaries: null,
    trading_configurations: null,
    currency: null,
    enabled_assets: null,
    instant: null,
    entity_identity: null,
    entity_contact: null,
    authorized_individuals: null,
    ultimate_beneficial_owners: null,
    sub_correspondent: null,
  }

  return {
    session,
    profile,
    form: await superValidate(form_data, zod(formSchema)),
  }
}

export const actions: Actions = {
  register: async ({ locals, request }) => {
    const formData = await request.formData()

    const form = await superValidate(formData, zod(formSchema))

    if (!form.valid) {
      return fail(400, {
        form,
      })
    }

    const merged_keys = `${APCA_BROKER_API_KEY_ID}:${APCA_BROKER_API_SECRET_KEY}`

    const auth = Buffer.from(merged_keys).toString('base64')

    const myHeaders = new Headers()
    myHeaders.append('Accept', 'application/json')
    myHeaders.append('Authorization', `Basic ${auth}`)

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(form.data),
    }

    const response = await fetch('https://broker-api.sandbox.alpaca.markets/v1/accounts', requestOptions)
      .then((response) => response.text())
      .then((result) => JSON.parse(result))
      .catch((error) => console.error(error))

    console.log(response)

    const { session } = await locals.safeGetSession()
    // Add this to user profile in supabase

    console.log(session?.user.id, response.id)

    const { data, error } = await locals.supabase
      .from('profiles')
      .upsert({
        id: session?.user.id,
        alpaca_account_id: response?.id ?? 'okdepart',
        updated_at: new Date(),
      })
      .select()

    console.log(data, error)

    return message(form, response)
  },
}
