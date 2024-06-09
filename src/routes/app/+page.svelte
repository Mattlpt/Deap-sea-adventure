<script lang="ts">
  // noinspection ES6UnusedImports
  import * as Card from '$lib/components/ui/card'
  import Revenue from '$lib/components/Revenue.svelte'
  import { H1, H3, Muted, P } from '$lib/components/ui/typography'
</script>

<div class="flex flex-col items-center justify-center flex-1 gap-4 overflow-scroll">
  <H1>Deep Trading</H1>
  <P>coming soon...</P>
  <Card.Root>
    <Card.Header class="flex flex-row items-center justify-between pb-2 space-y-0">
      <Card.Title class="text-base font-normal">Total Revenue</Card.Title>
    </Card.Header>
    <Card.Content>
      <H3>$15,231.89</H3>
      <Muted>+20.1% from last month</Muted>
      <div class="h-[80px]">
        <!-- <Revenue /> -->
      </div>
    </Card.Content>
  </Card.Root>
</div>
