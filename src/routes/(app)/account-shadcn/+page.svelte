<script lang="ts">
  import SuperDebug, { type Infer, type SuperValidated, superForm } from 'sveltekit-superforms'
  import { zodClient } from 'sveltekit-superforms/adapters'
  import { toast } from 'svelte-sonner'
  import { browser } from '$app/environment'
  import * as Form from '$lib/components/ui/form/index.js'
  import { Input } from '$lib/components/ui/input/index.js'
  import { formSchema, type FormSchema } from './schema'
  import type { PageData } from './$types'

  export let data: PageData

  const super_form = superForm(data.form, {
    validators: zodClient(formSchema),
    onUpdated: ({ form: f }) => {
      if (f.valid) {
        toast.success(`You submitted ${JSON.stringify(f.data, null, 2)}`)
      } else {
        toast.error('Please fix the errors in the form.')
      }
    },
  })

  const { form: formData, enhance } = super_form
</script>

<SuperDebug data={formData} />

<form action="?/update" method="POST" class="w-2/3 space-y-6" use:enhance>
  <Form.Field form={super_form} name="username">
    <Form.Control let:attrs>
      <Form.Label>Username</Form.Label>
      <Input {...attrs} bind:value={$formData.username} />
    </Form.Control>
    <Form.Description>This is your public display name.</Form.Description>
    <Form.FieldErrors />
  </Form.Field>
  <Form.Button>Submit</Form.Button>
</form>
