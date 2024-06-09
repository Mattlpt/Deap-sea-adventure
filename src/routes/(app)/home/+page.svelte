<script lang="ts">
  import { VisLine, VisXYContainer } from '@unovis/svelte'
  import type { PageData } from './$types'
  import Bots from './Bots.svelte'

  export let data: PageData

  console.log(data)

  // get from data.history.timestamp and data.history.equity
  const chartData = data.history.timestamp.map((timestamp, index) => ({
    id: timestamp,
    value: data.history.equity[index],
  }))

  const x = (d: { value: number; id: number }) => d.id
  const y = (d: { value: number; id: number }) => d.value
</script>

<h1>Voir mon portefeuille</h1>

<VisXYContainer data={chartData} height="80">
  <VisLine {x} {y} />
</VisXYContainer>

<pre>{JSON.stringify(data.history, null, 2)}</pre>

<Bots />
