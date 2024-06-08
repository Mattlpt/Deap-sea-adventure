<!-- src/routes/+page.svelte -->
<script lang="ts">
  import { Auth } from '@supabase/auth-ui-svelte'
  import { ThemeSupa } from '@supabase/auth-ui-shared'
  import * as Card from '$lib/components/ui/card'

  export let data
</script>

<svelte:head>
  <title>Login</title>
</svelte:head>

<div class="flex items-center justify-center w-screen h-screen">
  <Card.Root class="w-full max-w-sm">
		<Card.Header>
			<Card.Title class="flex items-center gap-2 text-2xl">
				<img src="logoDeepTrading.svg" class="w-12 h-12" alt="Logo">
				Deep Trading
			</Card.Title>
			<Card.Description>Enter your email below to login to your account.</Card.Description>
		</Card.Header>
		<Card.Content class="grid gap-4">
			<Auth
      supabaseClient={data.supabase}
      view="magic_link"
      redirectTo={`${data.url}/auth/callback`}
      showLinks={false}
      appearance={{
        theme: ThemeSupa,
      }}
    />
		</Card.Content>
	</Card.Root>
</div>
