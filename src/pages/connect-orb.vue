<template>


    <div class="flex-column flex-lg_x-row">
        <!-- <div class="flex-column mt-8 pt-8" v-if="!accs_length">
            <div class="flex-center flex-1 my-8" style="min-width: 300px; " >
                <span @click="connectWallet"
                     class="clickable opacity-hover-75 mx-2 pa-6 border-r-15 n-conve tx-xl mt-8 letter-s-15 tx-center"
                >
                    {{LANG.connect}} <br> {{LANG.wallet}}
                </span>
            </div>
        </div> -->
    </div>
</template>

                        

<script>


    export default {
        name: 'connect',     
        components: {

            // lottoResults,
            // lottoSettings,
            // lottoBottomMenu,
            // lottoMyAccount,
            // lottoCurrentRound,
            // lottoCurrentTicket,
        },
        data() {
            return {
                loading: false,
                hasStarted: false,
                selectedKey: null,
            };
        }, 
        computed: {
            LANG()                  { return this.$store.getters.LANG },
            // accs_length()           { return this.$store.getters.accs_length },
            // first_acc()             { return this.$store.getters.first_acc },
            // dark_mode()             { return this.$store.getters.dark_mode },
            // pro_mode()              { return this.$store.getters.pro_mode },
            // current_sub_page()      { return this.$store.getters.current_sub_page },

        },
        async mounted()
        {
            // var url_string = window.location.href
            // var url = new URL(url_string);
            // console.log(url_string, url);
            // var c = url.searchParams.get("round");
            // console.log(c);
        },
        methods: {
            async connectWallet() {
                this.loading = true
                // this.$store.dispatch("setNewBlock", {key:"values",...newnew})
                await this.$store.dispatch("connectWallet")
                this.loading = false
                // let newnew = {signup:true}
            },
            start()
            {
                this.$emit('animate')
                this.hasStarted = true
            },
            setKey(newKey)
            {
                this.selectedKey = newKey
            },
        },
    }
</script>


