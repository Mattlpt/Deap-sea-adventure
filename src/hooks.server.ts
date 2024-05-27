import { type Handle, type MaybePromise, redirect, type RequestEvent } from '@sveltejs/kit'
import { handle as authHandle } from '$lib/auth'
import { sequence } from '@sveltejs/kit/hooks'

async function authorizationHandle({
  event,
  resolve,
}: {
  event: RequestEvent
  resolve: (event: RequestEvent) => MaybePromise<Response>
}) {
  // Protect any routes under /authenticated
  if (event.url.pathname.startsWith('/profile')) {
    const session = await event.locals.auth()
    if (!session) {
      // Redirect to the login page
      throw redirect(303, '/login')
    }
  }

  // If the request is still here, just proceed as normally
  return resolve(event)
}

// First handle authentication, then authorization
// Each function acts as a middleware, receiving the request handle
// And returning a handle which gets passed to the next function
export const handle: Handle = sequence(authHandle, authorizationHandle)
