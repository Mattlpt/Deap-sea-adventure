import { z } from 'zod'

export const transferSchema = z.object({
  transfer_type: z.string(),
  relationship_id: z.string(),
  amount: z.number(),
  direction: z.string(),
})

export type TransferSchema = typeof transferSchema
