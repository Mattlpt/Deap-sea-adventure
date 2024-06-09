<script lang="ts">
   import type { PageData } from './$types';

   export let data: PageData;
   
  let { session, profile, alpaca_account } = data
  $: ({ session, profile, alpaca_account } = data)

</script>

<h1>Alpaca Account</h1>

{#if profile?.alpaca_account_id}
  <pre>{JSON.stringify(alpaca_account, null, 2)}</pre>
{:else}
  <p>Alpaca account not found</p>
{/if}
