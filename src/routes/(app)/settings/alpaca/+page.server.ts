import { myHeaders } from '$lib/alpacaClient';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {

  const { session, profile } = await event.parent();

  const requestOptions = {
    method: 'GET',
    headers: myHeaders
  }

  const response = await fetch(`https://broker-api.sandbox.alpaca.markets/v1/accounts/${profile?.alpaca_account_id}`, requestOptions)
    .then((response) => response.text())
    .then((result) => JSON.parse(result))
    .catch((error) => console.error(error))

   return {
     session, profile, alpaca_account: response
   };
};