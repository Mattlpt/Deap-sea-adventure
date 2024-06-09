<script lang="ts">

  export let data;
  let supabase = data.supabase;

  interface MyBot {
    id: string
    name?: string
    value?: number
    difference?: number
  }



  async function getMyBots(){
    const { data: botData, error } = await supabase
      .from('purchased_bots')
      .select('id')
      .eq("owner", data.session.user.id);

    if (error) {
      console.error('Error fetching marketplace bots:', error)
      return
    }

    myBots = botData.map((bot: MyBot) => ({
      id: bot.id,
    }))
  }

  let myBots: MyBot[] = [];
  getMyBots();

  function handleBotClick(id) {
    window.location.href = `/trades/${id}`
  }


</script>

<div class="flex w-full flex-col items-center">
  <div class="flex w-3/4 flex-wrap items-center justify-center gap-2">
    {#each myBots as bot}
      <button class="flex w-1/5 flex-col rounded-md border-2 px-4 py-3" on:click={() => handleBotClick(bot.id)}>
        <div>
          {bot.id}
        </div>
        <div class="text-l font-bold">Money gen. €</div>
        <div>% with last month</div>
      </button>
    {/each}
  </div>
</div>
