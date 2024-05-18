<script>
  import { page } from '$app/stores'
  import '../app.pcss'

  const title = $page.data?.title
</script>

<svelte:head>
  <title>Deep Trading{title ? ` • ${title}` : ''}</title>
</svelte:head>

<slot />