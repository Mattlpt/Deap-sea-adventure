import { PrismaClient } from '@prisma/client'
import { SvelteKitAuth } from '@auth/sveltekit'
import { PrismaAdapter } from '@auth/prisma-adapter'
import GitHub from '@auth/sveltekit/providers/github'
import Credentials from '@auth/sveltekit/providers/credentials'
import Nodemailer from '@auth/sveltekit/providers/nodemailer'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export const { handle, signIn, signOut } = SvelteKitAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub,
    Credentials({
      credentials: {
        email: { type: 'email', label: 'Email' },
        password: { type: 'password', label: 'Password' },
      },
      async authorize(credentials) {
        const { email, password } = credentials as { email: string; password: string }
        const user = await prisma.user.findUnique({ where: { email } })
        return user?.passwordHash && (await bcrypt.compare(password, user.passwordHash)) ? user : null
      },
    }),
    Nodemailer({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
  // pages: {
  //   signIn: '/login',
  //   signOut: '/signout',
  // },
})

export default prisma
