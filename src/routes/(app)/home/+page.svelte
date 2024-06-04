<script lang="ts">
  import { Button } from '$lib/components/ui/button/index'

  let sumOfBots = 54321
  let pinnedBots = ['Bot1', 'Bot2', 'Bot3', 'Bot4']
</script>

<div class="flex flex-col items-center w-full gap-6">
  <div class="items-center p-6 border-2 rounded-md w-fit">
    <div>
      <h4 class="text-center">Overview of your totals</h4>
      <h3 class="text-xl font-bold text-center">
        ${sumOfBots}
      </h3>
    </div>
  </div>
  <div class="flex flex-row gap-5 w-fit">
    {#each pinnedBots as bot}
      <div class="flex flex-col w-full px-4 py-3 border-2 rounded-md">
        <div>
          {bot}
        </div>
        <div class="font-bold text-l">
          Money gen. €
        </div>
        <div>% with last month</div>
      </div>
    {/each}
  </div>
  <Button href="/trads">
    See all my bots
  </Button>
</div>