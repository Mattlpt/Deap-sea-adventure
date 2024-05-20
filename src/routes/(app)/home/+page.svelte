<script lang="ts">
  import { Button } from '$lib/components/ui/button/index'

  let sumOfBots = 54321
  let pinnedBots = ['Bot1', 'Bot2', 'Bot3', 'Bot4']
</script>

<div class="w-full items-center flex flex-col gap-6">
  <div class="p-6 rounded-md border-2 w-fit items-center">
    <div>
      <h4 class="text-center">Overview of your totals</h4>
      <h3 class="text-center text-xl font-bold">
        ${sumOfBots}
      </h3>
    </div>
  </div>
  <div class="flex flex-row gap-5 w-fit">
    {#each pinnedBots as bot}
      <div class="px-4 py-3 border-2 w-full flex flex-col rounded-md">
        <div>
          {bot}
        </div>
        <div class="text-l font-bold">
          Money gen. €
        </div>
        <div>% with last month</div>
      </div>
    {/each}
  </div>
  <Button href="/trads">
    See all my bots >
  </Button>
</div>