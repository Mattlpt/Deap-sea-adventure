<script lang="ts">
  // noinspection ES6UnusedImports
  import * as Table from '$lib/components/ui/table'
  import type { PageData } from './$types'
  import { H1 } from '$lib/components/ui/typography'

  export let data: PageData
</script>

<div class="flex flex-col items-center gap-4">
  <H1 class="text-4xl font-bold">Deep Trading</H1>
  <Table.Root>
    <Table.Caption>List of users</Table.Caption>
    <Table.Header>
      <Table.Row>
        <Table.Head>Id</Table.Head>
        <Table.Head>Name</Table.Head>
        <Table.Head>Email</Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {#each data.users as user (user.id)}
        <Table.Row>
          <Table.Cell>{user.id}</Table.Cell>
          <Table.Cell>{user.name}</Table.Cell>
          <Table.Cell>{user.email}</Table.Cell>
        </Table.Row>
      {/each}
    </Table.Body>
  </Table.Root>
</div>
