<script lang="ts">
  import { Button } from '$lib/components/ui/button'
  import { superForm } from 'sveltekit-superforms'
  import type { PageData } from './$types'
  import { zodClient } from 'sveltekit-superforms/adapters'
  import { achSchema } from './ACHShema'
  import * as Form from '$lib/components/ui/form'
  import { Input } from '$lib/components/ui/input'
  import { transferSchema } from './transferSchema'

  export let data: PageData

  let { session, profile, alpaca_account, alpaca_ach_relationships } = data
  $: ({ session, profile, alpaca_account, alpaca_ach_relationships } = data)

  const form = superForm(data.achForm, {
    validators: zodClient(achSchema),
  })

  const { form: formData, enhance, message } = form

  const fundForm = superForm(data.fundForm, {
    validators: zodClient(transferSchema),
  })

  const { form: fundData, enhance: fundEnhance, message: fundMessage } = fundForm
</script>

<h1>Alpaca Account</h1>

<form method="POST" action="?/ach" use:enhance>
  <Form.Field {form} name="account_owner_name">
    <Form.Control let:attrs>
      <Form.Label>Username</Form.Label>
      <Input {...attrs} bind:value={$formData.account_owner_name} />
    </Form.Control>
    <Form.Description>This is your public display name.</Form.Description>
    <Form.FieldErrors />
  </Form.Field>
  <Form.Button>Submit</Form.Button>
</form>
{#if $message}
  <pre>{JSON.stringify($message, null, 2)}</pre>
{/if}

<form method="POST" action="?/fund" use:fundEnhance>
  <Form.Field form={fundForm} name="amount">
    <Form.Control let:attrs>
      <Form.Label>Amount</Form.Label>
      <Input {...attrs} bind:value={$fundData.amount} />
    </Form.Control>
    <Form.Description>The amount for funding.</Form.Description>
    <Form.FieldErrors />
  </Form.Field>
  <Form.Field form={fundForm} name="relationship_id">
    <Form.Control let:attrs>
      <Form.Label>relationship_id</Form.Label>
      <Input {...attrs} bind:value={$fundData.relationship_id} />
    </Form.Control>
    <Form.Description>The relationship_id for funding.</Form.Description>
    <Form.FieldErrors />
  </Form.Field>
  <Form.Button>Submit</Form.Button>
</form>
{#if $fundMessage}
  <pre>{JSON.stringify($fundMessage, null, 2)}</pre>
{/if}

{#if profile?.alpaca_account_id}
  <h2>ACH Relationships</h2>
  <pre>{JSON.stringify(alpaca_ach_relationships, null, 2)}</pre>
  <pre>{JSON.stringify(alpaca_account, null, 2)}</pre>
{:else}
  <p>Alpaca account not found</p>
{/if}
