<template>
    <div class="flex-column pa-1 n-inset border-r-5">
      <span class="flex px-1 tx-sm flex-center" 
      >
        <!-- <span title="Hunger" >
          <i class="mr-2 fas fa-hamburger"></i>
        </span> -->
        <!-- <div class="px-1">|</div> -->
        <small > {{minutesSinceLastHour}}</small>
        <div class="mb-1" style="padding: 0 3px">:</div>
        <small > {{secondsSinceLastHour}}</small>
      </span>
      <i  class="opacity-75 tx-ls-2 tx-xs"> {{hoursSince2020}}</i>
    </div>
    </div>
</template>
<script>

export default {
    props: ["player","UNIX"],
    data()
    {
        return {
          fivedecades: 1577880000,
        };
    },
    computed:
    {
      secondsSinceLastHour()
      {
        return parseInt(this.UNIX - this.fivedecades) - (this.hoursSince2020*60*60) - (this.minutesSinceLastHour*60) 
      },
      minutesSinceLastHour()
      {
        return parseInt(((this.UNIX - this.fivedecades) - (this.hoursSince2020*60*60) ) / 60)
      },
      hoursSince2020()
      {
        return parseInt((this.UNIX - this.fivedecades) / 60 / 60)
      },
    },
}
</script>
