<script lang="ts">
  import * as Avatar from '$lib/components/ui/avatar'
  import supabase from '$lib/supabaseClient'

  export let avatar_url: string | undefined = undefined
  export let full_name: string | undefined = undefined

  let avatarUrl: string | null = null

  const downloadImage = async (path: string) => {
    try {
      const { data, error } = await supabase.storage.from('avatars').download(path)

      if (error) {
        throw error
      }

      const url = URL.createObjectURL(data)
      avatarUrl = url
    } catch (error) {
      if (error instanceof Error) {
        console.log('Error downloading image: ', error.message)
      }
    }
  }

  const initials = full_name
    ? ((fullname) =>
        fullname
          .map((n, i) => (i == 0 || i == fullname.length - 1) && n[0])
          .filter((n) => n)
          .join(''))(full_name.split(' '))
    : ''

  $: if (avatar_url && avatar_url !== 'undefined') downloadImage(avatar_url)
</script>

<Avatar.Root>
  <Avatar.Image src={avatarUrl} alt="" />
  <Avatar.Fallback>{initials}</Avatar.Fallback>
</Avatar.Root>
