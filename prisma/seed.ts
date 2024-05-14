import { PrismaClient } from '@prisma/client'
import userData from '$lib/data.json' assert { type: 'json' }
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

// Add data.json data to the database on initialisation/very first connection (aka: seeding)
async function main() {
  console.log(`Start seeding ...`)

  for (const u of userData.users) {
    const user = await prisma.user.create({
      data: {
        name: u.name,
        email: u.email,
        password: await bcrypt.hash(u.password, 12),
      },
    })
    console.log(`Created user ${user.name} with id: ${user.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
