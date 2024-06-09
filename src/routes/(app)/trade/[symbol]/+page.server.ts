import { myHeaders } from '$lib/alpacaClient'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params }) => {
  const { symbol } = params

  const url = `https://broker-api.sandbox.alpaca.markets/v1/assets/${symbol}`

  const options = { method: 'GET', headers: myHeaders }

  const response = await fetch(url, options)
    .then((response) => response.json())
    .catch((err) => console.error(err))

  return {
    asset: response,
  }
}
