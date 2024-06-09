<script lang="ts">
  import { symbol } from 'zod'
  import type { PageData } from './$types'
  import Asset from './Asset.svelte'

  export let data: PageData

  const { assets } = data

  // take only the first 10 assets
  const displayedAssets = assets.slice(0, 10)
</script>

<h1>Trading page find all assets</h1>

{#each displayedAssets as asset}
  <a href="/trade/{asset.symbol}">
    <Asset {asset} />
  </a>
{/each}
