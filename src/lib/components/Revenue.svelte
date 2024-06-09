<script lang="ts">
  import { VisLine, VisScatter, VisXYContainer } from '@unovis/svelte'
  import { color, scatterPointColors, scatterPointStrokeColors } from './helpers.js'

  export let data;

  console.log(data)

  const x = (d: { value: number; id: number }) => d.id
  const y = (d: { value: number; id: number }) => d.value
</script>

<VisXYContainer {data} height="80">
  <VisLine color={color()} {x} {y} />
</VisXYContainer>
