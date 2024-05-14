import prisma from '$lib/prisma'
import type { PageServerLoad } from './$types'

// can't use for user because of omitted password
// import type { User } from '@prisma/client'

interface User {
  id: string
  name: string
  email: string
}

export const load: PageServerLoad = async () => {
  // https://github.com/prisma/prisma/issues/5042 adds omit as preview feature
  // with the future goal to add global exclude fields in the schema
  const users: User[] = await prisma.user.findMany({
    where: { name: 'admin' },
    omit: { password: true },
  })
  console.log(users)

  return { users, title: 'Admin' }
}
