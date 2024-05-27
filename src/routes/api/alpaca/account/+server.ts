import Alpaca from '@alpacahq/alpaca-trade-api'
import type { RequestHandler } from '@sveltejs/kit'
import { APCA_API_KEY_ID, APCA_API_SECRET_KEY } from '$env/static/private'

const alpaca = new Alpaca({
  keyId: APCA_API_KEY_ID,
  secretKey: APCA_API_SECRET_KEY,
  paper: true,
})

export const GET: RequestHandler = async ({ url }) => {
  // Get our account information.
  const alpaca_response = await alpaca.getAccount().then((account: any) => {
    // Check if our account is restricted from trading.
    if (account.trading_blocked) {
      console.log('Account is currently restricted from trading.')
    }

    // Check how much money we can use to open new positions.
    console.log(`$${account.buying_power} is available as buying power.`)
  })

  return new Response(JSON.stringify(alpaca_response))
}
