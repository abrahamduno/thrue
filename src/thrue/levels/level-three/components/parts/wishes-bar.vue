<template>

    <details class="flex-column  n-flat pa-2 border-r-15 " v-if="player.wishs && player.wishs.length >= 1">
      <summary>
        <b class="tx-ls-1 mb-3 opacity-50 tx-sm clickable">
          WISHES
          <span v-if="player.wishs.length >= 2">
            ({{player.wishs.length }})
          </span>
        </b>
      </summary>
      <div>
        <template v-for="(wish, index) in player.wishs" >
          <!-- <b class="tx-ls-1">LIFE GOAL</b> -->
          <!-- <i class="mb-1 fas fa-hamburger tx-xl"></i>  -->
          <div 
            class="flex-column-r my-1 pa-3 tx-xs n-flat border-r-15 clickable tx-center opacity-hover-75 "  style="max-width: 80px" 
          >
            <span>
              {{MEMORY_CATEGORY_LIST[wish.thoughtCat]}}

              <!-- <i class="fas mr-2" :class="[wish.icon ? wish.icon : '']"></i> -->
              <!-- <span>{{wish.name}}</span> -->
              <!-- <span>{{wish.title}}</span> -->
              <!-- <span class="pa-1">|</span> -->
              <br>
              <b class="pa-1">{{wish.thoughtIndex}}</b>
              <span>{{wish.isStatusStateDependant}}</span>
              <!-- <span class="pa-1">|</span> -->
            </span>
            <div class="flex-column pa-1">
              <i v-if="wish.isStatusStateDependant < 100">status</i>
              <small v-if="wish.isStatusStateDependant >= 100 && wish.isStatusStateDependant < 200 ">state</small>
              <b v-if="wish.isStatusStateDependant >= 200 ">both</b>
            </div>

          </div>
        </template>
        </div>
    </details>
</template>
<script>
import { MEMORY_CATEGORY_LIST } from '../../../../../scripts/constants/index';

export default {
    props: ["player"],
    data()
    {
        return {
          MEMORY_CATEGORY_LIST,
        };
    },
}
</script>
