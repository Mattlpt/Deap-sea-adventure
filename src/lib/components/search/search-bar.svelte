<script lang="ts">
  import Search from 'lucide-svelte/icons/search'
  import { Input } from '../ui/input'
  import { goto } from '$app/navigation'

  let search = ''

  export let className: string = ''
</script>

<form on:submit|preventDefault={() => goto(`/search?q=${search}`)}>
  <div class="relative w-full {className}">
    <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
    <Input
      bind:value={search}
      class="w-full appearance-none bg-background pl-8 shadow-none"
      placeholder="Search ..."
      type="search"
    />
  </div>
  <slot />
</form>
