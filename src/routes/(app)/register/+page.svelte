<script lang="ts">
  import SuperDebug, { superForm } from 'sveltekit-superforms'
  import { zodClient } from 'sveltekit-superforms/adapters'
  import { formSchema } from './schema'
  import * as Form from '$lib/components/ui/form'
  import { Input } from '$lib/components/ui/input'
  import type { SubmitFunction } from '@sveltejs/kit'

  export let data

  const form = superForm(data.form, {
    validators: zodClient(formSchema),
    resetForm: false,
    dataType: 'json',
  })

  const { form: formData, enhance, message } = form

</script>

<h1>Experiment registering to alpaca broker api</h1>

<pre>{JSON.stringify(data.profile, null, 2)}</pre>

<form method="POST" action="?/register" use:enhance>
  <Form.Field {form} name="identity.given_name">
    <Form.Control let:attrs>
      <Form.Label>FirstName</Form.Label>
      <Input {...attrs} bind:value={$formData.identity.given_name} />
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>
  <Form.Field {form} name="identity.family_name">
    <Form.Control let:attrs>
      <Form.Label>Last Name</Form.Label>
      <Input {...attrs} bind:value={$formData.identity.family_name} />
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>
  <Form.Button>Submit</Form.Button>
</form>

{#if message}
  <pre>{JSON.stringify($message, null, 2)}</pre>
{/if}

<SuperDebug data={formData} />
