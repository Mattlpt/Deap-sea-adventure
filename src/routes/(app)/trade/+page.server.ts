import { myHeaders } from '$lib/alpacaClient'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ parent }) => {
  const options = { method: 'GET', headers: myHeaders }

  const response = await fetch(
    'https://broker-api.sandbox.alpaca.markets/v1/assets?status=active&asset_class=us_equity&attributes=',
    options
  )
    .then((response) => response.json())
    .catch((err) => console.error(err))

  return {
    assets: response,
  }
}
