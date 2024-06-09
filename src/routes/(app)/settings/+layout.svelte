<script lang="ts">
  import SidebarNav from './SidebarNav.svelte'
  import { Separator } from '$lib/components/ui/separator'

  const sidebarNavItems = [
    {
      title: 'Profile',
      href: '/settings',
    },
    {
      title: 'Alpaca Account',
      href: '/settings/alpaca',
    },
  ]
</script>

<div class="p-10 pb-16 space-y-6">
  <div class="space-y-0.5">
    <h2 class="text-2xl font-bold tracking-tight">Settings</h2>
    <p class="text-muted-foreground">Manage your account settings and set e-mail preferences.</p>
  </div>
  <Separator class="my-6" />
  <div class="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
    <aside class="-mx-4 lg:w-1/5">
      <SidebarNav items={sidebarNavItems} />
    </aside>
    <div class="flex-1 lg:max-w-2xl">
      <slot />
    </div>
  </div>
</div>
