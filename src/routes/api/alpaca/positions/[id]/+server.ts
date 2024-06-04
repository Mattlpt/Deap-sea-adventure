import Alpaca from '@alpacahq/alpaca-trade-api'
import type { RequestHandler } from '@sveltejs/kit'
import { APCA_API_KEY_ID, APCA_API_SECRET_KEY } from '$env/static/private'

const alpaca = new Alpaca({
  keyId: APCA_API_KEY_ID,
  secretKey: APCA_API_SECRET_KEY,
  paper: true,
})

export const GET: RequestHandler = async ({ params }) => {

  const code = params.id;
  console.log(`Checking if we can trade ${code}...`);

  const alpaca_response = await alpaca.getAsset(code).then((asset: any) => {
    console.log(asset);
    return asset;
  }).catch((err: any) => {
    console.log(err.error);
    return err.error;
  });

  return new Response(JSON.stringify(alpaca_response))
}