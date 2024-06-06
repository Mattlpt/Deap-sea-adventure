// src/routes/+layout.server.ts
import type { LayoutServerLoad } from './$types'

export const load = (async ({ locals: { safeGetSession } }) => {
  const { session } = await safeGetSession()

  return {
    session,
  }
}) satisfies LayoutServerLoad
