<script lang="ts">
  import { page } from '$app/stores'

  export let href: string
  export let label: string
  export let icon: any

  // match begining of of pathname
  $: active = $page.url.pathname.match(`^${href}`)

</script>

<a
  class="flex items-center gap-3 px-3 py-2 transition-all rounded-lg hover:text-primary"
  class:bg-muted={active}
  class:text-muted-foreground={!active}
  class:text-primary={active}
  {href}
>
  {#if icon}
    <svelte:component this={icon} class="w-4 h-4" />
  {/if}
  {label}
</a>
