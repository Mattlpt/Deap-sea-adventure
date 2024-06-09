<script lang="ts">
  import { Button } from '$lib/components/ui/button'
  import type { PageData } from './$types'

  export let data: PageData
  const { asset } = data
</script>

<h1>single asset</h1>
<pre>{JSON.stringify(asset, null, 2)}</pre>

<Button>Buy</Button>
<Button variant="secondary">Sell</Button>
