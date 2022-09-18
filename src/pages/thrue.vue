<template>
    <div class=" w-100 " style="min-height: 100vh">

        <h1 @click="start" v-if="!hasStarted"
            class="tx-center clickable opacity-hover-50 tx-xl mt-100 pos-absolute w-100"
        >
            Start ({{timelefttostart}})
        </h1>

        <div v-if="hasStarted ">
            <div v-if="valuesBlock">
                <div v-if="valuesBlock.signup">
                    <h1
                        class="tx-center clickable opacity-hover-50 tx-xl mt-100  w-100 tx-ls-5"
                    >
                        l<i class="tx-xs fas fa-circle-notch spin-nback"></i>ading...
                    </h1>
                </div>
                <div v-if="valuesBlock.buyTicket">
                    <h1
                        class="tx-center clickable opacity-hover-50 tx-xl mt-100  w-100 tx-ls-5"
                    >
                        l<i class="tx-xs fas fa-circle-notch spin-nback"></i>ading...
                    </h1>
                </div>
            </div>
            <theblock h="1" v-if="accs_length" class="show-xs_sm"/>
            <theblock v-if="accs_length"  h="20" />
            <div v-if="hasStarted && accs_length">
                <theblock h="10" />

                <ourTeam />

            </div>

            <whereAreWe />
            <lotto ref="lotto" v-if="accs_length" />

            <theblock h="1" />
        </div>

    </div>
</template>

                        

<script>
    import lotto from "./lotto.vue";
    import theblock from "../components/block.vue";
    
    import ourTeam from "../res/vue/our-team.vue";
    import whereAreWe from "../res/vue/where-are-we.vue";


    export default {
        name: 'thrue',     
        components: {
            lotto,
            theblock,

            ourTeam,
            whereAreWe,
        },
        data() {
            return {
                timelefttostart: 2,
                hasStarted: false,
                selectedKey: null,
            };
        }, 
        computed: {
            LANG()                  { return this.$store.getters.LANG },
            accs_length()           { return this.$store.getters.accs_length },
            first_acc()             { return this.$store.getters.first_acc },
            dark_mode()             { return this.$store.getters.dark_mode },
            pro_mode()              { return this.$store.getters.pro_mode },
            current_sub_page()      { return this.$store.getters.current_sub_page },

            valuesBlock()             { return this.$store.getters.getBlock("values") },
        },
        async mounted()
        {
            setTimeout(() => {
                this.timelefttostart--
                setTimeout(() => {
                    this.timelefttostart--
                    if (!this.hasStarted)
                    { this.start() }
                },500)
            },500)
        },
        methods: {
            start()
            {
                this.$emit('animate')
                this.hasStarted = true
            },
        },
    }
</script>


