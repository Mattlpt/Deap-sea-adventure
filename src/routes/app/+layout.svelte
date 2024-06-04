<script lang="ts">
  import { Button } from '$lib/components/ui/button/index.js'
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js'
  import { Input } from '$lib/components/ui/input/index.js'
  import * as Sheet from '$lib/components/ui/sheet/index.js'
  import CircleUser from 'lucide-svelte/icons/circle-user'
  import Home from 'lucide-svelte/icons/home'
  import Menu from 'lucide-svelte/icons/menu'
  import Package from 'lucide-svelte/icons/package'
  import Package2 from 'lucide-svelte/icons/package-2'
  import Search from 'lucide-svelte/icons/search'
  import ShoppingCart from 'lucide-svelte/icons/shopping-cart'
</script>

<div class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
  <div class="hidden border-r bg-muted/40 md:block">
    <div class="flex flex-col h-full max-h-screen gap-2">
      <div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <a href="/" class="flex items-center gap-2 font-semibold">
          <Package2 class="w-6 h-6" />
          <span class="">Deep Trading</span>
        </a>
      </div>
      <div class="flex-1">
        <nav class="grid items-start px-2 text-sm font-medium lg:px-4">
          <a
            href="##"
            class="flex items-center gap-3 px-3 py-2 transition-all rounded-lg text-muted-foreground hover:text-primary"
          >
            <Home class="w-4 h-4" />
            Dashboard
          </a>
          <a
            href="##"
            class="flex items-center gap-3 px-3 py-2 transition-all rounded-lg text-muted-foreground hover:text-primary"
          >
            <ShoppingCart class="w-4 h-4" />
            Marketplace
          </a>
          <a
            href="##"
            class="flex items-center gap-3 px-3 py-2 transition-all rounded-lg bg-muted text-primary hover:text-primary"
          >
            <Package class="w-4 h-4" />
            Products
          </a>
        </nav>
      </div>
      <!-- <div class="p-4 mt-auto">
        <Card.Root data-x-chunk-name="dashboard-02-chunk-0" data-x-chunk-description="A card with a call to action">
          <Card.Header class="p-2 pt-0 md:p-4">
            <Card.Title>Upgrade to Pro</Card.Title>
            <Card.Description>Unlock all features and get unlimited access to our support team.</Card.Description>
          </Card.Header>
          <Card.Content class="p-2 pt-0 md:p-4 md:pt-0">
            <Button size="sm" class="w-full">Upgrade</Button>
          </Card.Content>
        </Card.Root>
      </div> -->
    </div>
  </div>
  <div class="flex flex-col">
    <header class="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet.Root>
        <Sheet.Trigger asChild let:builder>
          <Button variant="outline" size="icon" class="shrink-0 md:hidden" builders={[builder]}>
            <Menu class="w-5 h-5" />
            <span class="sr-only">Toggle navigation menu</span>
          </Button>
        </Sheet.Trigger>
        <Sheet.Content side="left" class="flex flex-col">
          <nav class="grid gap-2 text-lg font-medium">
            <a href="##" class="flex items-center gap-2 text-lg font-semibold">
              <Package2 class="w-6 h-6" />
              <span class="sr-only">Deep Trading</span>
            </a>
            <a
              href="##"
              class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <Home class="w-5 h-5" />
              Dashboard
            </a>
            <a
              href="##"
              class="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
            >
              <ShoppingCart class="w-5 h-5" />
              Orders
            </a>
            <a
              href="##"
              class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <Package class="w-5 h-5" />
              Products
            </a>
          </nav>
          <!-- <div class="mt-auto">
            <Card.Root>
              <Card.Header>
                <Card.Title>Upgrade to Pro</Card.Title>
                <Card.Description>Unlock all features and get unlimited access to our support team.</Card.Description>
              </Card.Header>
              <Card.Content>
                <Button size="sm" class="w-full">Upgrade</Button>
              </Card.Content>
            </Card.Root>
          </div> -->
        </Sheet.Content>
      </Sheet.Root>
      <div class="flex-1 w-full">
        <form>
          <div class="relative">
            <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              class="w-full pl-8 shadow-none appearance-none bg-background md:w-2/3 lg:w-1/3"
            />
          </div>
        </form>
      </div>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild let:builder>
          <Button builders={[builder]} variant="secondary" size="icon" class="rounded-full">
            <CircleUser class="w-5 h-5" />
            <span class="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align="end">
          <DropdownMenu.Label>My Account</DropdownMenu.Label>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>Settings</DropdownMenu.Item>
          <DropdownMenu.Item>Support</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>Logout</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </header>
    <main class="flex flex-col justify-center flex-1 h-screen gap-4 p-4 lg:gap-6 lg:p-6">
      <slot />
    </main>
  </div>
</div>
