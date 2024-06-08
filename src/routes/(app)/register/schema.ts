import { z } from 'zod'

export const formSchema = z.object({
  // Contact
  contact: z.object({
    email_address: z.string().email(),
    phone_number: z.string(),
    street_address: z.array(z.string()),
    city: z.string(),
    state: z.string(),
    postal_code: z.string().regex(/^\d{5}$/),
  }),
  // Identity
  identity: z.object({
    given_name: z.string(),
    family_name: z.string(),
    date_of_birth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    tax_id: z.string().regex(/^\d{3}-\d{2}-\d{4}$/),
    tax_id_type: z.string(),
    country_of_citizenship: z.string(),
    country_of_birth: z.string(),
    country_of_tax_residence: z.string(),
    funding_source: z.array(z.string()),
    visa_type: z.string().nullable(),
    visa_expiration_date: z.string().nullable(),
    date_of_departure_from_usa: z.string().nullable(),
    permanent_resident: z.string().nullable(),
    investment_experience_with_stocks: z.string().nullable(),
    investment_experience_with_options: z.string().nullable(),
    investment_time_horizon: z.string().nullable(),
  }),
  // Disclosures
  disclosures: z.object({
    is_control_person: z.boolean(),
    is_affiliated_exchange_or_finra: z.boolean(),
    is_affiliated_exchange_or_iiroc: z.boolean(),
    is_politically_exposed: z.boolean(),
    immediate_family_exposed: z.boolean(),
    is_discretionary: z.boolean().nullable(),
  }),
  // Agreements
  agreements: z.array(
    z.object({
      agreement: z.string(),
      signed_at: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{9}Z$/),
      ip_address: z.string(),
      revision: z.string().nullable(),
    })
  ),
  // Documents
  documents: z.array(
    z.object({
      document_type: z.string(),
      document_sub_type: z.string(),
      content: z.string(),
      mime_type: z.string(),
    })
  ),
  // Trusted contact
  trusted_contact: z.object({
    given_name: z.string().nullable(),
    family_name: z.string().nullable(),
    email_address: z.string().nullable(),
  }),
  // The rest
  minor_identity: z.string().nullable(),
  entity_id: z.string().nullable(),
  additional_information: z.string().default(''),
  account_type: z.string().default(''),
  account_sub_type: z.string().nullable(),
  auto_approve: z.string().nullable(),
  beneficiaries: z.string().nullable(),
  trading_configurations: z.string().nullable(),
  currency: z.string().nullable(),
  enabled_assets: z.string().nullable(),
  instant: z.string().nullable(),
  entity_identity: z.string().nullable(),
  entity_contact: z.string().nullable(),
  authorized_individuals: z.string().nullable(),
  ultimate_beneficial_owners: z.string().nullable(),
  sub_correspondent: z.string().nullable(),
})

export type FormSchema = typeof formSchema
