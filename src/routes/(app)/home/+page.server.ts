import { myHeaders } from '$lib/alpacaClient'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async (event) => {
  const { profile } = await event.parent()

  // Get alpaca account portfolio
  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
  }

  const history = await fetch(
    `https://broker-api.sandbox.alpaca.markets/v1/trading/accounts/${profile?.alpaca_account_id}/account/portfolio/history`,
    requestOptions
  )
    .then((response) => {
      const res = response.json()
      console.log('res', response)
      return res
    })
    .catch((error) => console.error(error))

  return {
    history,
  }
}
