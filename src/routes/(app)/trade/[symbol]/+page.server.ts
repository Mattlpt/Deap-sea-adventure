import { myHeaders } from '$lib/alpacaClient'
import type { Actions, PageServerLoad } from './$types'

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

export const actions: Actions = {
  async buy({}) {
    const options = {
      method: 'POST',
      headers: {accept: 'application/json', 'content-type': 'application/json'},
      body: JSON.stringify({
        side: 'buy',
        type: 'market',
        time_in_force: 'day',
        symbol: 'MSFT',
        qty: '1',
        commission: '1.0',
        commission_bps: '10'
      })
    };
    
    fetch('https://broker-api.sandbox.alpaca.markets/v1/trading/accounts/account_id/orders', options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));
  },
  async sell({}) {
    const options = {
      method: 'POST',
      headers: {accept: 'application/json', 'content-type': 'application/json'},
      body: JSON.stringify({
        side: 'sell',
        type: 'market',
        time_in_force: 'day',
        symbol: 'MSFT',
        qty: '1',
        commission: '1.0',
        commission_bps: '10'
      })
    };
    
    fetch('https://broker-api.sandbox.alpaca.markets/v1/trading/accounts/account_id/orders', options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));
  },
}
