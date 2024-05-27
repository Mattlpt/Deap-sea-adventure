<script lang="ts">
  import type { Session } from '@auth/core/types'
  import type { PageData } from './$types'
  import { P } from '$lib/components/ui/typography'

  export let data: PageData

  const session = data.session as Session | null
</script>

<P>{session?.user?.name}</P>
<P>{session?.user?.email}</P>
<img alt="" class="h-20 w-20" src={session?.user?.image} />
