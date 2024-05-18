<script>

  import { Button } from '$lib/components/ui/button/index'

  export let data;
  //Check if id is an integer
  console.log(`Is ${data.botId} an integer ?`);

  let botInfos = [
    { id: 1, name: "Revenue", value: "+12345 €"},
    { id: 2, name: "Subscriptions", value: "+2350" },
    { id: 3, name: "Sales", value: "+12234" },
    { id: 4, name: "Active now", value: "+573" },
  ];

  let recentSales = [
    { id: 1, name: "Action", value: "+1.56"},
    { id: 2, name: "Action", value: "-46.89" },
    { id: 3, name: "Action", value: "+34.01" },
    { id: 4, name: "Action", value: "+18.00" },
  ];

</script>

<div class="w-full h-full flex flex-col p-10 gap-5">
  <div class="w-full h-3/4 border-b-2 flex flex-row">
    <div class="w-3/4 border-2 border-gray-400 rounded-xl p-5">
      <img class="object-cover" alt="graph" src="https://img.freepik.com/free-vector/gradient-stock-market-concept_23-2149166910.jpg">
    </div>
    <div class="w-1/4 flex flex-col gap-3 p-5">
      <div class="h-5/6">
        <p class="text-xl">Recent sales of bot {data.botId}</p>
        <p class="text-s">You made {recentSales.length} sales this month</p>
        <div class="pl-5">
          {#each recentSales as action}
            <div class="px-2 py-1 border-2 w-full flex flex-row rounded-md items-center place-content-between">
              <div class="w-1/2">
                {action.name}
                <div class="text-gray-500">
                  Details of action
                </div>
              </div>
              <div class="text-l font-bold">
                {action.value} €
              </div>
            </div>
          {/each}
        </div>


      </div>
      <div class="h-1/6 justify-end bottom-0">
        <Button class="w-[32%] bg-red-500">Stop</Button>
        <Button class="w-[32%]">Settings</Button>
        <Button class="w-[32%] bg-gray-300">More</Button>
      </div>

    </div>
  </div>
  <div class="w-full flex flex-row gap-5">
    {#each botInfos as infos}
      <div class="px-4 py-3 border-2 w-1/5 flex flex-col rounded-md">
        <div>
          {infos.name}
        </div>
        <div class="text-xl font-bold">
          {infos.value}
        </div>
        <div>% difference</div>
      </div>
    {/each}
  </div>


</div>