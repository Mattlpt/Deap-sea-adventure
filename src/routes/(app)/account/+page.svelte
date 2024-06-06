<script lang="ts">
  import * as Form from '$lib/components/ui/form/index.js'
  import { Input } from '$lib/components/ui/input/index.js'
  import { Label } from '$lib/components/ui/label'
  import { toast } from 'svelte-sonner'
  import SuperDebug, { superForm } from 'sveltekit-superforms'
  import { zodClient } from 'sveltekit-superforms/adapters'
  import type { PageData } from './$types'
  import Avatar from './Avatar.svelte'
  import { formSchema } from './schema'

  export let data: PageData

  let profileForm: HTMLFormElement
  let { session, supabase, profile } = data
  $: ({ session, supabase, profile } = data)

  const super_form = superForm(data.form, {
    validators: zodClient(formSchema),
    onUpdated: ({ form: f }) => {
      if (f.valid) {
        toast.success(`You submitted ${JSON.stringify(f.data, null, 2)}`)
      } else {
        toast.error('Please fix the errors in the form.')
      }
    },
    delayMs: 200,
    timeoutMs: 5000,
    resetForm: false,
  })

  const { form: formData, enhance, delayed, timeout } = super_form
</script>

<div class="p-5">

  <p>Role: <strong>{profile?.role}</strong></p>

  <form action="?/update" method="POST" class="w-2/3 space-y-6" use:enhance bind:this={profileForm}>
    <Avatar
      {supabase}
      bind:url={$formData.avatar_url}
      size={10}
      on:upload={() => {
        profileForm.requestSubmit()
      }}
    />

    <div class="space-y-2">
      <Label>Email</Label>
      <Input type="email" value={data.session.user.email} disabled />
    </div>

    <Form.Field form={super_form} name="username">
      <Form.Control let:attrs>
        <Form.Label>Username</Form.Label>
        <Input {...attrs} bind:value={$formData.username} />
      </Form.Control>
      <Form.Description>This is your public display name.</Form.Description>
      <Form.FieldErrors />
    </Form.Field>

    <Form.Field form={super_form} name="full_name">
      <Form.Control let:attrs>
        <Form.Label>Full Name</Form.Label>
        <Input {...attrs} type="text" bind:value={$formData.full_name} />
      </Form.Control>
      <Form.Description>Your name is not visible to others</Form.Description>
      <Form.FieldErrors />
    </Form.Field>

    <Form.Field form={super_form} name="website">
      <Form.Control let:attrs>
        <Form.Label>Website</Form.Label>
        <Input {...attrs} type="url" bind:value={$formData.website} />
      </Form.Control>
      <Form.Description>Your personal website, blog, or portfolio</Form.Description>
      <Form.FieldErrors />
    </Form.Field>

    <Form.Button>
      {#if $delayed}
        <svg
          class="w-5 h-5 mr-3 -ml-1 text-dark animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      {/if}
      Submit
    </Form.Button>
  </form>
</div>
