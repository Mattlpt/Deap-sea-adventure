<script>
import { Input } from '$lib/components/ui/input/index'
import { Label } from '$lib/components/ui/label/index'
import { LoaderCircle } from 'lucide-svelte'
import { Button } from '$lib/components/ui/button/index'

let isLoading = false

async function onSubmit() {
  isLoading = true

  setTimeout(() => {
    isLoading = false
  }, 3000)
}
</script>

<div class="grid gap-6 px-2 lg:w-1/2 xl:w-2/5 2xl:w-1/3">
  <h1 class="px-2 text-3xl font-bold w-full text-center">Change your password</h1>
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