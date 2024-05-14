<script lang="ts">
  import { Input } from '$lib/components/ui/input'
  import { Button } from '$lib/components/ui/button'
  import { Label } from '$lib/components/ui/label'
  import { LoaderCircle } from 'lucide-svelte'

  import github from '$lib/images/github.svg'

  let isLoading = false

  async function onSubmit() {
    isLoading = true

    setTimeout(() => {
      isLoading = false
    }, 3000)
  }
</script>

<div class="grid gap-6 px-2 lg:w-1/2 xl:w-2/5 2xl:w-1/3">
  <h1 class="px-2 text-3xl font-bold">Create an account</h1>
  <form on:submit|preventDefault={onSubmit}>
    <div class="grid gap-2">
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
  <Button class="w-full" disabled={isLoading} variant="outline">
    {#if isLoading}
      <LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
    {:else}
      <img alt="GI" height="20px" src={github} width="20px" class="mr-1" />
    {/if}
    GitHub
  </Button>

  <div class="px-8 text-center text-sm text-muted-foreground">
    By clicking continue, you agree to our
    <a class="underline underline-offset-4 hover:text-primary" href="/tos">Terms of Service</a>.
  </div>
</div>
