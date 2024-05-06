<script lang="ts">
  import { VisLine, VisScatter, VisXYContainer } from '@unovis/svelte'
  import { color, scatterPointColors, scatterPointStrokeColors } from './helpers.js'

  const data = [
    { id: 1, revenue: 10400 },
    { id: 2, revenue: 14405 },
    { id: 3, revenue: 9400 },
    { id: 4, revenue: 8200 },
    { id: 5, revenue: 7000 },
    { id: 6, revenue: 9600 },
    { id: 7, revenue: 11244 },
    { id: 8, revenue: 26475 },
  ]
  const x = (d: { revenue: number; id: number }) => d.id
  const y = (d: { revenue: number; id: number }) => d.revenue
</script>

<VisXYContainer {data} height="80">
  <VisLine color={color()} {x} {y} />
  <VisScatter color={scatterPointColors} size={6} strokeColor={scatterPointStrokeColors} strokeWidth={2} {x} {y} />
</VisXYContainer>
