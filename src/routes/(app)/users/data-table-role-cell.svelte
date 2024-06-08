<script lang="ts">
  import { Badge } from '$lib/components/ui/badge'

  export let role: string | undefined = undefined
</script>

{#if role === undefined}
  <p>n/a</p>
{:else if role === 'admin'}
  <Badge>{role}</Badge>
{:else}
  <Badge variant="secondary">{role}</Badge>
{/if}
