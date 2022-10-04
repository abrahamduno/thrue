<template>
    <div class="flex " v-if="player.wishs">
      <!-- <span class="flex pa-3 tx-xs n-conve border-r-15 flex-column tx-center"  style="max-width: 80px" 
      v-if="player.wishs.length"
        :class="[[player.wishs.length ? '':'']]"
      >
        <b class="tx-ls-1">GOAL</b>
        <i class="mb-1 fas fa-hamburger tx-xl"></i> 
        {{player.wishs[0].name}}
      </span> -->

      <details class="flex-column n-inset pa-2 border-r-15 " v-if="player.wishs.length > 1">
        <summary>
          <b class="tx-ls-1 mb-3 opacity-50 tx-sm clickable">WISHES
            <span v-if="player.wishs.length > 2">
              ({{player.wishs.length - 1}})
            </span>
          </b>
        </summary>
        <div>
          <template v-for="(wish, index) in player.wishs" >
            <!-- <span title="Hunger" >
              <i class="mr-2 fas fa-hamburger"></i>
            </span> -->
            <!-- <b class="tx-ls-1">LIFE GOAL</b> -->
            <!-- <i class="mb-1 fas fa-hamburger tx-xl"></i>  -->
            <div  v-if="index >= 1"
              class="flex pa-3 tx-xs n-flat border-r-15 clickable flex-column tx-center opacity-hover-50 "  style="max-width: 80px" 
            >
              {{wish.name}}
            </div>
          </template>
          </div>
      </details>

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
