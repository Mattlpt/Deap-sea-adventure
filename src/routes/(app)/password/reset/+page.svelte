<script>
  import { Input } from '$lib/components/ui/input'
  import { Label } from '$lib/components/ui/label'
  import { LoaderCircle } from 'lucide-svelte'
  import { Button } from '$lib/components/ui/button'
  import { H2 } from '$lib/components/ui/typography'

  let isLoading = false

  async function onSubmit() {
    isLoading = true

    setTimeout(() => {
      isLoading = false
    }, 3000)
  }
</script>

<div class="grid w-full gap-6 px-2 sm:w-2/3 lg:w-1/2 xl:w-2/5 2xl:w-1/3">
  <H2 class="text-center">Change your password</H2>
  <form on:submit|preventDefault={onSubmit}>
    <div class="grid gap-2">
      <Label class="sr-only" for="email">Enter your email</Label>
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
        Continue
      </Button>
    </div>
  </form>
</div>
