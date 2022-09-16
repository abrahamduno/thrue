<template>
<div>

    <div class="flex-center tx-lg" >
        <a  href="#award" class="n-flat pos-relative  n-tx px-4 py-2 border-r-l-15 flex-column tx-sm nodeco"  style="z-index: 2000">
            <i class="fa fa-award"></i>
            <small class="pt-1 tx-xs nodeco">{{LANG.prizePool}}</small>
        </a>
        <a  href="#store" class="n-flat pos-relative  n-tx px-4 py-2  flex-column tx-sm nodeco"  style="z-index: 2000">
            <i class="fa fa-store"></i>
            <small class="pt-1 tx-xs nodeco">{{LANG.buyTicket}}</small>
        </a>
        <a  href="#user" class="n-flat  pos-relative n-tx px-4 py-2 border-r-r-15 flex-column tx-sm nodeco"  style="z-index: 2000">
            <i class="fa fa-user"></i>
            <small class="pt-1 tx-xs nodeco">{{LANG.myAccount}}</small>
        </a>
    </div>
    
</div>
</template>

<script>
    export default {
        name: 'lotto-bottom-menu',     
        computed: {
            LANG() { return this.$store.getters.LANG },
        },
    }
</script>
