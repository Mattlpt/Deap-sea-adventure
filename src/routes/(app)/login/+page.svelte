<script lang="ts">
  import { Button } from '$lib/components/ui/button'
  import { Input } from '$lib/components/ui/input'
  import { Label } from '$lib/components/ui/label'
  import github from '$lib/images/github.svg'
  import { LoaderCircle } from 'lucide-svelte'
  import { H2 } from '$lib/components/ui/typography'
  import { signIn } from '@auth/sveltekit/client'
  import { type Infer, superForm, type SuperValidated } from 'sveltekit-superforms'
  import { emailSchema } from '$lib/form-schema'
  import { zodClient } from 'sveltekit-superforms/adapters'
  import type { PageData } from './$types'
  // noinspection ES6UnusedImports
  import * as Form from '$lib/components/ui/form'

  let isLoading = false
  export let data: PageData

  const dataform = data.form as SuperValidated<Infer<typeof emailSchema>>

  const form = superForm(dataform, {
    validators: zodClient(emailSchema),
  })

  const { form: formData, enhance } = form
</script>

<div class="flex flex-1 flex-col items-center justify-center">
  <div class="grid w-full gap-6 px-2 sm:w-2/3 lg:w-1/2 xl:w-2/5 2xl:w-1/3">
    <H2 class="text-center">Connection</H2>
    <form method="POST" use:enhance>
      <div class="grid gap-4">
        <Form.Field {form} name="email">
          <Form.Control let:attrs>
            <Form.Label>Email</Form.Label>
            <Input {...attrs} bind:value={$formData.email} />
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>
        <div class="grid gap-2">
          <div class="flex items-center">
            <Label for="password">Password</Label>
            <a class="ml-auto inline-block text-sm underline" href="/password/reset">Forgot your password?</a>
          </div>
          <Input id="password" required type="password" />
        </div>
        <Button class="w-full" type="submit">Login</Button>
      </div>
    </form>

    <div class="relative">
      <div class="absolute inset-0 flex items-center">
        <span class="w-full border-t" />
      </div>
      <div class="relative flex justify-center text-xs uppercase">
        <span class="bg-background px-2 text-muted-foreground"> or continue with </span>
      </div>
    </div>
    <Button
      class="w-full"
      disabled={isLoading}
      on:click={() => signIn('github', { callbackUrl: '/profile' })}
      variant="outline"
    >
      {#if isLoading}
        <LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
      {:else}
        <img alt="GI" height="20px" src={github} width="20px" class="mr-1" />
      {/if}
      GitHub
    </Button>

    <div class="mt-4 text-center text-sm">
      Don&apos;t have an account?
      <a class="underline" href="/signup">Sign up</a>
    </div>
  </div>
</div>
