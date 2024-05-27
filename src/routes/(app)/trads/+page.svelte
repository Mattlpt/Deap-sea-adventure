<script>
  let myBots = [
    { id: 1, name: 'Bot1' },
    { id: 2, name: 'Bot2' },
    { id: 3, name: 'Bot3' },
    { id: 4, name: 'Bot4' },
    { id: 5, name: 'Bot5' },
    { id: 6, name: 'Bot6' },
    { id: 7, name: 'Bot7' },
    { id: 8, name: 'Bot8' },
    { id: 9, name: 'Bot9' },
    { id: 10, name: 'Bot10' },
  ]

  function handleBotClick(id) {
    window.location.href = `/trads/${id}`
  }
</script>

<div class="flex w-full flex-col items-center">
  <div class="flex w-3/4 flex-wrap items-center justify-center gap-2">
    {#each myBots as bot}
      <button class="flex w-1/5 flex-col rounded-md border-2 px-4 py-3" on:click={() => handleBotClick(bot.id)}>
        <div>
          {bot.name}
        </div>
        <div class="text-l font-bold">Money gen. €</div>
        <div>% with last month</div>
      </button>
    {/each}
  </div>
</div>
