<template>
    <div class=" w-100 main-wrap">

        <h1 @click="start" v-if="!hasStarted"
            class="tx-center clickable opacity-hover-50 tx-xl mt-100 pos-absolute w-100"
        >
            Start ({{timelefttostart}})
        </h1>

        <div v-if="hasStarted ">
            <div v-if="valuesBlock">
                <div v-if="valuesBlock.signup" class="pos-absolute bottom-50p">
                    <h1
                        class="tx-center  opacity-hover-50 tx-xl mt-100  w-100 tx-ls-5"
                    >
                        l<i class="tx-xs fas fa-circle-notch spin-nback"></i>ading...
                    </h1>
                </div>
                <div v-if="valuesBlock.buyTicket">
                    <h1
                        class="tx-center  opacity-hover-50 tx-xl mt-100  w-100 tx-ls-5"
                    >
                        l<i class="tx-xs fas fa-circle-notch spin-nback"></i>ading...
                    </h1>
                </div>
            </div>

            <simulation ref="simulation" v-if="accs_length" />
            <!-- <lotto ref="lotto" v-if="accs_length" /> -->

        </div>

    </div>
</template>

                        

<script>
    import lotto from "./lotto.vue";
    import simulation from "./simulation.vue";
    import theblock from "../parts/block.vue";


    export default {
        name: 'main-dom',     
        components: {
            lotto,
            simulation,
            theblock,

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
            is_playing_test()      { return this.$store.getters.is_playing_test },

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


