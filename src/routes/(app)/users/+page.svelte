<script lang="ts">
  import { createTable, Subscribe, Render, createRender } from 'svelte-headless-table'
  import { addPagination, addSelectedRows } from 'svelte-headless-table/plugins'
  import { readable } from 'svelte/store'
  import * as Table from '$lib/components/ui/table'
  import DataTableActions from './data-table-actions.svelte'
  import { Button } from '$lib/components/ui/button'
  import DataTableCheckbox from './data-table-checkbox.svelte'
  import DataTableWebsiteCell from './data-table-website-cell.svelte'
  import DataTableAvatarCell from './data-table-avatar-cell.svelte'

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
    select: addSelectedRows(),
  })

  const columns = table.createColumns([
    table.column({
      accessor: 'id',
      header: (_, { pluginStates }) => {
        const { allPageRowsSelected } = pluginStates.select
        return createRender(DataTableCheckbox, {
          checked: allPageRowsSelected,
        })
      },
      cell: ({ row }, { pluginStates }) => {
        const { getRowState } = pluginStates.select
        const { isSelected } = getRowState(row)

        return createRender(DataTableCheckbox, {
          checked: isSelected,
        })
      },
    }),
    table.column({
      accessor: (item) => item,
      header: '',
      id: 'avatar',
      cell: ({ value: { full_name, avatar_url } }) => {
        return createRender(DataTableAvatarCell, { avatar_url, full_name })
      },
    }),
    table.column({
      accessor: 'username',
      header: 'Username',
    }),
    table.column({
      accessor: 'full_name',
      header: 'Name',
    }),
    table.column({
      accessor: 'website',
      header: 'Website',

      cell: ({ value }) => {
        return createRender(DataTableWebsiteCell, { website: value })
      },
    }),
    table.column({
      accessor: ({ id }) => id,
      header: '',
      cell: ({ value }) => {
        return createRender(DataTableActions, { id: value })
      },
    }),
  ])

  const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates, rows } = table.createViewModel(columns)

  const { hasNextPage, hasPreviousPage, pageIndex } = pluginStates.page
  const { selectedDataIds } = pluginStates.select
</script>

<div class="p-5">
  <div class="border rounded-md">
    <Table.Root {...$tableAttrs}>
      <Table.Header>
        {#each $headerRows as headerRow}
          <Subscribe rowAttrs={headerRow.attrs()}>
            <Table.Row>
              {#each headerRow.cells as cell (cell.id)}
                <Subscribe attrs={cell.attrs()} let:attrs props={cell.props()}>
                  <Table.Head {...attrs} class="[&:has([role=checkbox])]:pl-4">
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
            <Table.Row {...rowAttrs} data-state={$selectedDataIds[row.id] && 'selected'}>
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
    <div class="flex-1 text-sm text-muted-foreground">
      {Object.keys($selectedDataIds).length} of{' '}
      {$rows.length} row(s) selected.
    </div>
    <Button variant="outline" size="sm" on:click={() => ($pageIndex = $pageIndex - 1)} disabled={!$hasPreviousPage}>
      Previous
    </Button>
    <Button variant="outline" size="sm" disabled={!$hasNextPage} on:click={() => ($pageIndex = $pageIndex + 1)}>
      Next
    </Button>
  </div>
</div>
