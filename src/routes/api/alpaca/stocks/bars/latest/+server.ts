import Alpaca from '@alpacahq/alpaca-trade-api'
import type { RequestHandler } from '@sveltejs/kit'
import { APCA_API_KEY_ID, APCA_API_SECRET_KEY } from '$env/static/private'
import type { AlpacaBar } from '@alpacahq/alpaca-trade-api/dist/resources/datav2/entityv2'

const alpaca = new Alpaca({
  keyId: APCA_API_KEY_ID,
  secretKey: APCA_API_SECRET_KEY,
  paper: true,
})

export const GET: RequestHandler = async ({ url }) => {
  const symbol = url.searchParams.get('symbols')

  const bars = alpaca.getBarsV2(symbol, {
    start: '2024-06-05',
    end: '2024-06-08',
    timeframe: alpaca.newTimeframe(30, alpaca.timeframeUnit.MIN),
    limit: 100,
  })
  const got: any[] = []
  for await (let b of bars) {
    got.push(b)
  }
  console.log(got)
  return new Response(JSON.stringify(got))
}
