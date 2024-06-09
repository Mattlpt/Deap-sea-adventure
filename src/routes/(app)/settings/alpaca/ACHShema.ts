import { z } from 'zod'

export const achSchema = z.object({
  account_owner_name: z.string(),
  bank_account_type: z.string(),
  bank_account_number: z.string(),
  bank_routing_number: z.string(),
  nickname: z.string(),
})

export type ACHSchema = typeof achSchema
