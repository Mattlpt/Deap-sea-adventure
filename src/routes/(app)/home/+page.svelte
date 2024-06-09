<script lang="ts">
  import { VisLine, VisXYContainer } from '@unovis/svelte'
  import type { PageData } from './$types'
  import Bots from './Bots.svelte'
  import * as Card from '$lib/components/ui/card'

  export let data: PageData

  console.log(data)

  // get from data.history.timestamp and data.history.equity
  const chartData = data.history.timestamp.map((timestamp, index) => ({
    id: timestamp,
    value: data.history.equity[index],
  }))

  const x = (d: { value: number; id: number }) => d.id
  const y = (d: { value: number; id: number }) => d.value

  const profit = data.history.profit_loss_pct.slice(-1)[0] * 100
</script>

<h1>Voir mon portefeuille</h1>

<Card.Root class="w-96">
  <Card.Header class="flex flex-row items-center justify-between pb-2 space-y-0">
    <Card.Title class="text-xl font-bold">${data.history.equity.slice(-1)[0]}</Card.Title>
    <p class="{profit > 0 ? 'text-green-600' : 'text-red-500'}">{profit > 0 ? '+' : '-'}{profit}%</p>
  </Card.Header>
  <Card.Content>
    <VisXYContainer data={chartData} height="80">
      <VisLine {x} {y} />
    </VisXYContainer>
  </Card.Content>
</Card.Root>

<pre>{JSON.stringify(data.history, null, 2)}</pre>

<Bots />
