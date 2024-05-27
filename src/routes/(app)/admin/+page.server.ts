import prisma from '$lib/auth'
import type { PageServerLoad } from './$types'
import type { User } from '@prisma/client'

// can't use for user because of omitted password
// import type { User } from '@prisma/client'

export const load: PageServerLoad = async () => {
  // https://github.com/prisma/prisma/issues/5042 adds omit as preview feature
  // with the future goal to add global exclude fields in the schema
  const users: Omit<User, 'passwordHash'>[] = await prisma.user.findMany({
    where: { name: 'admin' },
    omit: { passwordHash: true },
  })
  console.log(users)

  return { users, title: 'Admin' }
}
