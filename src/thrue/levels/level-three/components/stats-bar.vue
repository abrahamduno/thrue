<template>
    <div class="flex-wrap pa-2 n-flat " v-if="player.stats" style="border-radius: 15px 15px 0 0">
      <span class="flex px-3 pr-4" style="border-right: 2px solid #777777;"
        :class="[[player.stats.hunger > 9 ? 'tx-success':''],[player.stats.hunger < 4 ? 'tx-error':'']]"
      >
        <span title="Hunger" >
          <i class="mr-1 fas fa-hamburger"></i>
          <!-- <i class="fas fa-solid fa-burger"></i>  --></span>
        <small
          
        > {{player.stats.hunger}}</small>
      </span>
      <span class="flex px-3 pr-2" 
        :class="[[player.stats.hygene > 9 ? 'tx-success':''],[player.stats.hygene < 4 ? 'tx-error':'']]"
      >
        <span title="Hygene">
          <i class="mr-1 fas fa-shower"></i>
          <!-- <i class="fas fa-solid fa-soap"></i>  --></span>
        <small>{{player.stats.hygene}}</small>
      </span>
    </div>

    <div class="flex-wrap pa-2 n-flat " v-if="player.stats" style="border-radius: 0 0 15px 15px">
      <span class="flex px-3" style="border-right: 2px solid #777777;"
        :class="[[player.stats.fun > 9 ? 'tx-success':''],[player.stats.fun < 4 ? 'tx-error':'']]"
      >
        <span title="Fun">
          <i class="mr-2 fas fa-smile-beam"></i>
          <!-- <i class="fas fa-solid fa-pool-8-ball"></i>  --></span>
        <small>{{player.stats.fun}}</small>
      </span>
      <span class="flex px-3"
        :class="[[player.stats.energy > 9 ? 'tx-success':''],[player.stats.energy < 4 ? 'tx-error':'']]"
      >
        <span title="Energy">
          <i class="mr-2 fas fa-bolt"></i>
          <!-- <i class="fas fa-solid fa-bolt-lightning"></i> --></span>
        <small>{{player.stats.energy}}</small>
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
