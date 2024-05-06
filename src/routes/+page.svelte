<script>
  import * as Card from '$lib/components/ui/card/index'
  import Revenue from '$lib/components/Revenue.svelte'
</script>

<div class="flex flex-col items-center gap-4">
  <h1 class="text-4xl font-bold">Deep Trading</h1>
  <p>coming soon...</p>
  <Card.Root>
    <Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
      <Card.Title class="text-base font-normal">Total Revenue</Card.Title>
    </Card.Header>
    <Card.Content>
      <div class="text-2xl font-bold">$15,231.89</div>
      <p class="text-xs text-muted-foreground">+20.1% from last month</p>
      <div class="h-[80px]">
        <Revenue />
      </div>
    </Card.Content>
  </Card.Root>
</div>
