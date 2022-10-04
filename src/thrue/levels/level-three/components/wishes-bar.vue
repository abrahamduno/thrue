<template>
    <div class="flex-wrap " v-if="player.wishs">
      <span class="flex pa-3 tx-xs n-conve border-r-15 flex-column tx-center"  style="max-width: 80px" 
      v-if="player.wishs.length"
        :class="[[player.wishs.length ? '':'']]"
      >
        <!-- <span title="Hunger" >
          <i class="mr-2 fas fa-hamburger"></i>
        </span> -->
        <b class="tx-ls-1">LIFE GOAL</b>
        <i class="mb-1 fas fa-hamburger tx-xl"></i> 
        {{player.wishs[0].name}}
      </span>
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
