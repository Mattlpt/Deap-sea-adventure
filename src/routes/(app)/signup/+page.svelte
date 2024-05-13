<script lang="ts">
  import { Input } from "$lib/components/ui/input";
  let iconPath = '../../src/lib/images/github.svg';


</script>

<div class="flex h-screen w-screen items-center justify-center">
  <div class="flex flex-col items-center w-3/5 gap-2 rounded-md">
    <h1 class="text-3xl font-bold mb-1">Create an account</h1>
    <h2 class="text-gray-500">Enter your email</h2>
    <Input />
    <button class="h-10 rounded-md bg-black text-white w-full">
      Sign up with email
    </button>

    <div class="flex flex-row justify-between items-center w-full mt-5 mb-5">
      <div class="border-t border-black w-full"></div>
      <span class="w-fit min-w-[150px] text-center">OR CONTINUE WITH</span>
      <div class="border-t border-black w-full"></div>
    </div>

    <div class="w-full flex flex-row gap-1 p-2 rounded-md border-2 border-gray-200 items-center justify-center">
      <img src={iconPath} alt="GI" width="20px" height="20px"/>
      <span class="">Continue with GitHub</span>
    </div>

  </div>


</div>