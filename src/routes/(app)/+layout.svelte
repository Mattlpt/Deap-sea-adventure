<script lang="ts">
  import {
    Building2,
    BuildingIcon,
    CircleUser,
    DoorOpen,
    Home,
    LogIn,
    Menu,
    Moon,
    Sun,
    User2,
    UserPlus2,
    Users,
  } from 'lucide-svelte'

  import { Button } from '$lib/components/ui/button'
  import { resetMode, setMode, toggleMode } from 'mode-watcher'
  // noinspection ES6UnusedImports
  import * as Dropdown from '$lib/components/ui/dropdown-menu'
  // noinspection ES6UnusedImports
  import * as Sheet from '$lib/components/ui/sheet'

  import { goto } from '$app/navigation'
  import { navigating } from '$app/stores'
  import { NavBarItem } from '$lib/components/nav-bar-item'
  import { SearchBar } from '$lib/components/search'
  import DataTableAvatarCell from './users/data-table-avatar-cell.svelte'
  import Label from '$lib/components/ui/label/label.svelte'

  export let data

  let { supabase } = data
  $: ({ supabase } = data)

  // const session = data.session as Session | null
  const session = true

  const navItems = session
    ? [
        { href: '/home', icon: Home, label: 'Home' },
        { href: '/account', icon: User2, label: 'Account' },
        { href: '/marketplace', icon: BuildingIcon, label: 'Marketplace' },
        { href: '/trades', icon: DoorOpen, label: 'Trades' },
        { href: '/users', icon: Users, label: 'Users' },
      ]
    : [
        { href: '/login', icon: LogIn, label: 'Login' },
        { href: '/signup', icon: UserPlus2, label: 'Signup' },
      ]

  let open = false

  $: if ($navigating) open = false
</script>

<div class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
  <div class="hidden border-r bg-muted/40 md:block">
    <div class="flex flex-col h-full max-h-screen gap-2">
      <div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <a class="flex items-center gap-2 text-xl font-semibold" href="/">
          <img src="logoDeepTrading.svg" class="w-8 h-8" alt="Logo">
          Deep Trading
        </a>
      </div>
      <div class="flex-1">
        <nav class="grid items-start px-2 text-sm font-medium lg:px-4">
          {#each navItems as item (item.href)}
            <NavBarItem {...item} />
          {/each}
        </nav>
      </div>
    </div>
  </div>
  <div class="flex flex-col h-screen">
    <header class="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet.Root bind:open>
        <Sheet.Trigger asChild let:builder>
          <Button builders={[builder]} class="shrink-0 md:hidden" size="icon" variant="outline">
            <Menu class="w-5 h-5" />
            <span class="sr-only">Afficher/cacher le menu de navigation</span>
          </Button>
        </Sheet.Trigger>
        <Sheet.Content class="flex flex-col" side="left">
          <nav class="grid gap-2 text-lg font-medium">
            <div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <a class="flex items-center gap-2 text-xl font-semibold" href="/">
                <Building2 class="w-6 h-6" />
                Deep Trading
              </a>
            </div>
            {#each navItems as item (item.href)}
              <NavBarItem href={item.href} icon={item.icon} label={item.label} />
            {/each}
          </nav>
        </Sheet.Content>
      </Sheet.Root>
      <div class="flex-1 w-full">
        <SearchBar className="md:w-2/3 lg:w-1/2 xl:w-1/3"></SearchBar>
      </div>
      <Dropdown.Root>
        <Dropdown.Trigger asChild let:builder>
          <Button builders={[builder]} size="icon" variant="outline">
            <Sun class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon
              class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
            />
            <span class="sr-only">Toggle theme</span>
          </Button>
        </Dropdown.Trigger>
        <Dropdown.Content align="end">
          <Dropdown.Item on:click={() => setMode('light')}>Light</Dropdown.Item>
          <Dropdown.Item on:click={() => setMode('dark')}>Dark</Dropdown.Item>
          <Dropdown.Item on:click={() => resetMode()}>System</Dropdown.Item>
        </Dropdown.Content>
      </Dropdown.Root>

      <Dropdown.Root>
        <Dropdown.Trigger asChild let:builder>
          <Button builders={[builder]} class="rounded-full" size="icon" variant="secondary">
            <DataTableAvatarCell avatar_url={data.profile?.avatar_url} full_name={data.profile?.full_name} />
            <span class="sr-only">Afficher/cacher le menu utilisateur</span>
          </Button>
        </Dropdown.Trigger>
        <Dropdown.Content align="end" class="w-full max-w-[229px]">
          <Dropdown.Label>{data.profile?.full_name}</Dropdown.Label>
          <Dropdown.Label class="-mt-3 text-muted-foreground">#{data.profile?.username}</Dropdown.Label>
          <Dropdown.Label>Mon Compte</Dropdown.Label>
          <Dropdown.Separator />
          <Dropdown.Item class="hover:cursor-pointer" on:click={toggleMode}>
            Mode&nbsp;
            <span class="hidden dark:inline">clair</span>
            <span class="dark:hidden">sombre</span>
          </Dropdown.Item>
          <Dropdown.Item class="hover:cursor-pointer" href="/account">Paramètres</Dropdown.Item>
          <Dropdown.Item class="hover:cursor-pointer">Support</Dropdown.Item>
          <Dropdown.Separator />
          <Dropdown.Item
            class="hover:cursor-pointer"
            on:click={async () => {
              await supabase.auth.signOut()
              goto('/')
            }}>Déconnexion</Dropdown.Item
          >
        </Dropdown.Content>
      </Dropdown.Root>
    </header>
    <div class="flex-1 overflow-y-auto">
      <slot />
    </div>
  </div>
</div>
