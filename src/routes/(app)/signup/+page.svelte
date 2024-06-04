<script lang="ts">
  // noinspection ES6UnusedImports
  import * as Form from '$lib/components/ui/form'
  import { Input } from '$lib/components/ui/input'
  import { Button } from '$lib/components/ui/button'
  import { Label } from '$lib/components/ui/label'
  import { LoaderCircle } from 'lucide-svelte'

  import github from '$lib/images/github.svg'
  import { H2 } from '$lib/components/ui/typography'
  // import type { PageData } from './$types'
  import { signIn } from '@auth/sveltekit/client'

  let isLoading = false

  // export let data: PageData

  // const dataform = data.form as SuperValidated<Infer<typeof emailSchema>>

  // const form = superForm(dataform, {
  //   validators: zodClient(emailSchema),
  // })

  // const { form: formData, enhance } = form
  async function onSubmit() {
    isLoading = true

    setTimeout(() => {
      isLoading = false
    }, 3000)
  }
</script>

<div class="flex flex-1 flex-col items-center justify-center">
  <div class="grid w-full gap-6 px-2 sm:w-2/3 lg:w-1/2 xl:w-2/5 2xl:w-1/3">
    <H2 class="text-center">Create an account</H2>
    <!--      method="POST" use:enhance-->
    <form on:submit|preventDefault={onSubmit}>
      <div class="grid gap-2">
        <!--        <Form.Field {form} name="email">-->
        <!--          <Form.Control let:attrs>-->
        <!--            <Form.Label>Email</Form.Label>-->
        <!--            <Input {...attrs} bind:value={$formData.email} />-->
        <!--          </Form.Control>-->
        <!--          <Form.FieldErrors />-->
        <!--        </Form.Field>-->
        <Label class="sr-only" for="email">Email</Label>
        <Input
          autocapitalize="none"
          autocomplete="email"
          autocorrect="off"
          id="email"
          placeholder="name@example.com"
          type="email"
        />
        <Button class="w-full" type="submit">
          {#if isLoading}
            <LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
          {/if}
          Sign up with email
        </Button>
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
    <Button class="w-full" disabled={isLoading} on:click={() => signIn('github', {callbackUrl: '/profile'})} variant="outline">
      {#if isLoading}
        <LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
      {:else}
        <img alt="GI" height="20px" src={github} width="20px" class="mr-1" />
      {/if}
      GitHub
    </Button>

    <div class="px-8 text-center text-sm text-muted-foreground">
      By creating an account, you agree to our
      <a class="underline underline-offset-4 hover:text-primary" href="/tos">Terms of Service</a>.
    </div>
    <div class="text-center text-sm">
      Already have an account?
      <a class="underline" href="/login">Login</a>
    </div>
  </div>
</div>
