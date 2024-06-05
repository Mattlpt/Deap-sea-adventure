<script lang="ts">
  import { Button } from '$lib/components/ui/button/index'
  // noinspection ES6UnusedImports
  import * as Card from '$lib/components/ui/card'
  import { Muted } from '$lib/components/ui/typography'
  import { Euro } from 'lucide-svelte'

  let sumOfBots = 54321
  let pinnedBots = [
    { name: 'Bot1', amount: 45231.89, variation: 13.9 },
    { name: 'Bot2', amount: 30221.54, variation: 20.1 },
    { name: 'Bot3', amount: 4231.62, variation: 2.0 },
    { name: 'Bot4', amount: 5231.95, variation: -0.1 },
  ]
</script>

<div class="flex flex-col items-center justify-center flex-1 gap-6">
  <Card.Root>
    <Card.Header class="flex flex-row items-center justify-between pb-2 space-y-0">
      <Card.Title class="font-medium text-md">Overview of your totals</Card.Title>
    </Card.Header>
    <Card.Content>
      <div class="text-2xl font-bold">{sumOfBots.toLocaleString('fr')}€</div>
      <Muted class={sumOfBots <= 0 ? 'text-red-700' : 'text-green-600'}>+20.1% from last month</Muted>
    </Card.Content>
  </Card.Root>
  <div class="flex flex-row gap-5 w-fit">
    {#each pinnedBots as bot}
      <Card.Root>
        <Card.Header class="flex flex-row items-center justify-between pb-2 space-y-0">
          <Card.Title class="font-medium text-md">{bot.name}</Card.Title>
          <Euro class="w-4 h-4 text-muted-foreground" />
        </Card.Header>
        <Card.Content>
          <div class="text-2xl font-bold">{bot.amount.toLocaleString('fr')}€</div>
          <Muted class={bot.variation <= 0 ? 'text-red-700' : 'text-green-600'}>
            {bot.variation <= 0 ? '' : '+'}{bot.variation}% from last month
          </Muted>
        </Card.Content>
      </Card.Root>
    {/each}
  </div>
  <Button href="/trades">See all my bots ></Button>
</div>
