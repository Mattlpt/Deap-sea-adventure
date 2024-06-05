import { z } from 'zod'

export const formSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.string().email().optional(),
  website: z.string().url().optional(),
  avatar_url: z.string().optional(),
  full_name: z.string().min(2).max(50),
})

export type FormSchema = typeof formSchema
