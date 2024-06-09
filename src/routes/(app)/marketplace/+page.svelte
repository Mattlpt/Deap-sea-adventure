<script lang="ts">
  import { H2 } from '$lib/components/ui/typography'
  // noinspection ES6UnusedImports
  import * as Card from '$lib/components/ui/card'
  import { Button } from '$lib/components/ui/button'

  export let data;
  let supabase = data.supabase;

  interface MarketBot {
    id: string
    name: string
    price: number
  }

  let botsToPurchase: MarketBot[] = []

  async function fetchMarketplaceBots() {
    const { data, error } = await supabase
      .from('marketplace')
      .select('id, name, price');

    if (error) {
      console.error('Error fetching marketplace bots:', error)
      return
    }

    botsToPurchase = data.map((bot: MarketBot) => ({
      id: bot.id,
      name: bot.name,
      price: bot.price,
    }))

  }

  async function buyBotFromMarketplace(bot: MarketBot) {
    supabase.from('purchased_bots').insert({
      bot_model: bot.id,
      owner: data.session.user.id
    }).then(() => {
      console.log("Bot purchased successfully")
    });
  }

  fetchMarketplaceBots();

</script>

<div class="flex flex-1 flex-col items-center justify-center gap-6">
  <H2>Marketplace</H2>

  <div class="flex w-1/2 flex-col gap-5">
    {#each botsToPurchase as bot}
      <Card.Root class="flex flex-row place-content-between">
        <Card.Header class="flex flex-col items-center justify-between space-y-0 pb-2">
          <Card.Title class="text-2xl font-medium">{bot.name}</Card.Title>
          <div class="text-xl">Price: {bot.price.toLocaleString('fr')}€</div>
        </Card.Header>
        <Card.Content class="flex flex-row items-center gap-3 p-3">
          <Button href="/details/{bot.id}"> Details</Button>
          <Button on:click={() => buyBotFromMarketplace(bot)}> Buy bot</Button>
        </Card.Content>
      </Card.Root>
    {/each}
  </div>

</div>
