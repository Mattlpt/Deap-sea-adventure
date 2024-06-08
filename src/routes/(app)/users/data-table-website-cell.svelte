<!-- TableEmailLinkCell -->
<script lang="ts">
  export let website: string | undefined = undefined;
</script>

{#if website === undefined}
  <span>No website</span>
{:else}
  <a class="underline" href="{website}" rel="noreferrer noopener" target="_blank">{website}</a>
{/if}