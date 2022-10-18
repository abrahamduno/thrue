<template>

    <details class="flex-column  n-flat pa-2 border-r-15 " v-if="player.wishs && player.wishs.length >= 1">
      <summary>
        <b class="tx-ls-1 mb-3 opacity-50 tx-sm clickable">
          WISHES
          <span v-if="player.wishs.length >= 2">
            ({{player.wishs.length - 1}})
          </span>
        </b>
      </summary>
      <div>
        <template v-for="(wish, index) in player.wishs" >
          <!-- <b class="tx-ls-1">LIFE GOAL</b> -->
          <!-- <i class="mb-1 fas fa-hamburger tx-xl"></i>  -->
          <div 
            class="flex-center my-1 pa-3 tx-xs n-flat border-r-15 clickable tx-center opacity-hover-75 "  style="max-width: 80px" 
          >
            <i class="fas mr-2" :class="[wish.icon ? wish.icon : '']"></i>
            <span>{{wish.name}}</span>
            <span>{{wish.title}}</span>
            <span>{{wish.thoughtCat}}</span>
            <span class="pa-1">|</span>
            <span>{{wish.thoughtIndex}}</span>
            <span class="pa-1">|</span>
            <span>{{wish.isStatusStateDependant}}</span>

          </div>
        </template>
        </div>
    </details>
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
