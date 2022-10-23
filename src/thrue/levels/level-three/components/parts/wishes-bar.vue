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
            class="flex-column-r my-1 tx-xs  border-r-15  tx-center opacity-hover-75 "  style="max-width: 80px" 
          >

            <details class="flex-column  n-flat pa-2 border-r-15 w-100" v-if="player.wishs && player.wishs.length >= 1 && MEMORY_CATEGORY_CONSTANTS[MEMORY_CATEGORY_LIST[wish.thoughtCat]]">
              <summary>
                {{MEMORY_CATEGORY_CONSTANTS[MEMORY_CATEGORY_LIST[wish.thoughtCat]].memories[wish.thoughtIndex].title}}
              </summary>

              <div class="flex-column pa-1 ">
                <hr class="w-100 opacity-10">
                <i class=""  v-if="wish.isStatusStateDependant < 100">status</i>
                <small class=""  v-if="wish.isStatusStateDependant >= 100 && wish.isStatusStateDependant < 200 ">state</small>
                <b class=""  v-if="wish.isStatusStateDependant >= 200 ">both</b>

                <span v-if="MEMORY_CATEGORY_CONSTANTS[MEMORY_CATEGORY_LIST[wish.thoughtCat]]">

                  <span >{{MEMORY_CATEGORY_LIST[wish.thoughtCat]}}</span>
                  <br>
                  {{MEMORY_CATEGORY_CONSTANTS[MEMORY_CATEGORY_LIST[wish.thoughtCat]].memories[wish.thoughtIndex].title}}

                  <!-- <i class="fas mr-2" :class="[wish.icon ? wish.icon : '']"></i> -->
                  <!-- <span>{{wish.name}}</span> -->
                  <!-- <span>{{wish.title}}</span> -->
                  <!-- <span class="pa-1">|</span> -->
                  <br>
                  <b class="pa-1">{{wish.thoughtIndex}}</b>
                  <span>{{wish.isStatusStateDependant}}</span>
                  <!-- <span class="pa-1">|</span> -->
                </span>

              </div>
            </details>

          </div>
        </template>
        </div>
    </details>
</template>
<script>
import { MEMORY_CATEGORY_LIST, MEMORY_CATEGORY_CONSTANTS } from '../../../../../scripts/constants/index';

export default {
    props: ["player"],
    data()
    {
        return {
          MEMORY_CATEGORY_LIST,
          MEMORY_CATEGORY_CONSTANTS,
        };
    },
}
</script>
