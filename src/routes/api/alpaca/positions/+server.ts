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
  const alpaca_response = await alpaca.getPositions().then((portfolio: any) => {
    // Print the quantity of shares for each position.
    portfolio.forEach(function (position: any) {
      console.log(`${position.qty} shares of ${position.symbol}`);
    });
  });

  return new Response(JSON.stringify(alpaca_response))
}
