<script lang="ts">
  import Loading from '$lib/components/Loading.svelte'
  import Revenue from '$lib/components/Revenue.svelte'
  import * as Card from '$lib/components/ui/card'

  export let asset: {
    id: string
    symbol: string
    exchange: string
  }

  async function getBars() {
    const res = await fetch('/api/alpaca/stocks/bars/latest')
    const bars = await res.json()

    const values = bars.map((bar: any, index: number) => ({
      id: index,
      value: bar.ClosePrice,
    }))

    return values
  }

  // NOTE await not used here!
  let barsPromise = getBars()
</script>

<Card.Root class="w-96">
  <Card.Header class="flex flex-row items-center justify-between pb-2 space-y-0">
    <Card.Title class="text-sm font-medium">{asset.symbol}</Card.Title>
    <p>{asset.exchange}</p>
  </Card.Header>
  <Card.Content>
    {#await barsPromise}
      <Loading />
    {:then bars}
      <Revenue data={bars} />
    {/await}
  </Card.Content>
</Card.Root>

<pre>{JSON.stringify(asset, null, 2)}</pre>
