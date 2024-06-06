<script lang="ts">
  import { createTable, Subscribe, Render, createRender } from 'svelte-headless-table'
  import { addPagination } from 'svelte-headless-table/plugins'
  import { readable } from 'svelte/store'
  import * as Table from '$lib/components/ui/table'
  import DataTableActions from './data-table-actions.svelte'
  import { Button } from '$lib/components/ui/button'

  export let data

  type User = {
    id: string
    username: string
    full_name: string
    website: string
    avatar_url: string
    role: string
  }

  const table = createTable(readable(data.users ?? []), {
    page: addPagination(),
  })

  const columns = table.createColumns([
    table.column({
      accessor: 'id',
      header: 'ID',
      cell: ({ value }) => {
        const formatted = value.split('-')[0]
        return formatted
      },
    }),
    table.column({
      accessor: 'username',
      header: 'Username',
    }),
    table.column({
      accessor: ({ id }) => id,
      header: '',
      cell: ({ value }) => {
        return createRender(DataTableActions, { id: value })
      },
    }),
  ])

  const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } = table.createViewModel(columns)

  const { hasNextPage, hasPreviousPage, pageIndex } = pluginStates.page
</script>

<div>
  <div class="border rounded-md">
    <Table.Root {...$tableAttrs}>
      <Table.Header>
        {#each $headerRows as headerRow}
          <Subscribe rowAttrs={headerRow.attrs()}>
            <Table.Row>
              {#each headerRow.cells as cell (cell.id)}
                <Subscribe attrs={cell.attrs()} let:attrs props={cell.props()}>
                  <Table.Head {...attrs}>
                    <Render of={cell.render()} />
                  </Table.Head>
                </Subscribe>
              {/each}
            </Table.Row>
          </Subscribe>
        {/each}
      </Table.Header>
      <Table.Body {...$tableBodyAttrs}>
        {#each $pageRows as row (row.id)}
          <Subscribe rowAttrs={row.attrs()} let:rowAttrs>
            <Table.Row {...rowAttrs}>
              {#each row.cells as cell (cell.id)}
                <Subscribe attrs={cell.attrs()} let:attrs>
                  <Table.Cell {...attrs}>
                    <Render of={cell.render()} />
                  </Table.Cell>
                </Subscribe>
              {/each}
            </Table.Row>
          </Subscribe>
        {/each}
      </Table.Body>
    </Table.Root>
  </div>
  <div class="flex items-center justify-end py-4 space-x-4">
    <Button variant="outline" size="sm" on:click={() => ($pageIndex = $pageIndex - 1)} disabled={!$hasPreviousPage}>
      Previous
    </Button>
    <Button variant="outline" size="sm" disabled={!$hasNextPage} on:click={() => ($pageIndex = $pageIndex + 1)}>
      Next
    </Button>
  </div>
</div>
