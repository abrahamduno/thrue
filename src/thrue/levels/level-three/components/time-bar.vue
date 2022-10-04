<template>
    <div class="flex-wrap pa-1 n-inset border-r-5">
      <span class="flex px-1 tx-xs flex-center" 
      >
        <!-- <span title="Hunger" >
          <i class="mr-2 fas fa-hamburger"></i>
        </span> -->
        <small > h:{{hoursSince2020}}</small>
        <div class="px-1">|</div>
        <small > m:{{minutesSinceLastHour}}</small>
        <div class="px-1">|</div>
        <small > s:{{secondsSinceLastHour}}</small>
      </span>
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
