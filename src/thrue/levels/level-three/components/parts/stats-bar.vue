<template>
    <div class="flex-column flex-align-start   py-2 n-inset border-r-15 mb-1" v-if="player.stats">
      <span class=" px-3 flex  pb-2" 
        :class="[[player.stats.protein > 250 ? 'tx-success':''],[player.stats.protein < 33 ? 'tx-error':'']]"
      >
        <span title="Protein"  class=" ">
          <i class="mr-1 fas fa-hamburger"></i>
          <small class="show-md_x" > Protein</small>
          <!-- <i class="fas fa-solid fa-burger"></i>  -->
        </span>
        <span class="pr-1">:</span>
        <div > {{player.stats.protein}}</div>
      </span>
      <span class=" px-3 flex " 
        :class="[[player.stats.hygene > 250 ? 'tx-success':''],[player.stats.hygene < 33 ? 'tx-error':'']]"
      >
        <span title="Hygene"  class="flex- ">
          <i class="mr-2 fas fa-shower"></i>
          <small class="show-md_x">Hygene</small>
          <!-- <i class="fas fa-solid fa-soap"></i>  -->
        </span>
        <span class="pr-1">:</span>
        <div>{{player.stats.hygene}}</div>
      </span>
    </div>

    <div class="flex-column flex-align-start py-2 n-inset border-r-15 " v-if="player.stats">
      <span class=" px-3 flex  pb-2" 
        :class="[[player.stats.fun > 250 ? 'tx-success':''],[player.stats.fun < 33 ? 'tx-error':'']]"
      >
        <span title="Fun"  class=" ">
          <i class="mr-2 fas fa-smile-beam"></i>
          <small class="show-md_x">Fun</small>
          <!-- <i class="fas fa-solid fa-pool-8-ball"></i>  -->
        </span>
        <span class="pr-1">:</span>
        <div>{{player.stats.fun}}</div>
      </span>
      <span class=" px-3 flex "
        :class="[[player.stats.energy > 250 ? 'tx-success':''],[player.stats.energy < 33 ? 'tx-error':'']]"
      >
        <span title="Energy"  class="flex- ">
          <i class="mr-3 fas fa-bolt"></i>
          <small class="show-md_x">Energy</small>
          <!-- <i class="fas fa-solid fa-bolt-lightning"></i> -->
        </span>
        <span class="pr-1">:</span>
        <div>{{player.stats.energy}}</div>
      </span>
      <!-- <span class="flex mr-3" > <span title="Rotation">Ro:</span> <small>{{player.rot}}</small> </span> -->
      <!-- <span class="flex mr-3" > <span title="Rotation">R:</span> <small>{{__player_rot_y}}</small> </span> -->
      <!-- <span class="flex mr-3" > <span title="Rotation">P:</span> <small>{{__player_pos_z}}</small> </span> -->
    </div>
</template>
<script>

export default {
    props: ["player"],
    data()
    {
        return {
        };
    },
}
</script>
