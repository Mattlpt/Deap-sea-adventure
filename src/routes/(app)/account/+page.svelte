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
  import { Button } from '$lib/components/ui/button'
  import Loading from '$lib/components/Loading.svelte'

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

  <Button href="/account/alpaca">Voir mon compte alpaca</Button>

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
        <Loading />
      {/if}
      Submit
    </Form.Button>
  </form>
</div>
