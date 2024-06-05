import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
  // retrieve users from database

  return { users: [], title: 'Admin' }
}
