<template>
<div>

    <div class="flex-column flex-lg_x-row">
        <div class="flex-column mt-8 pt-8" v-if="!accs_length">
            <div class="flex-center flex-1 my-8" style="min-width: 300px; " >
                <span @click="connectWallet"
                     class="clickable opacity-hover-75 mx-2 pa-6 border-r-15 n-conve tx-xl mt-8 letter-s-15 tx-center"
                >
                    {{LANG.connect}} <br> {{LANG.wallet}}
                </span>
            </div>
        </div>
        <div v-if="accs_length && current_page == 'lottery'" class="py-8 w-100">
            <lotto v-if="accs_length" />
        </div>
    </div>

    <div v-if="accs_length" class="py-5"> </div>
    <div class="w-100 flex-center" v-if="loading"> <infispinner /> </div>
    <div class="show-lg_x py-8"> </div>
    
    <custom-footer />
    
</div>
</template>
<script>
    import { ethers, Contract }  from 'ethers';
    import { ABIS, CURRENT_NETWORK } from '../store/constants';

    import lotto from "./lotto.vue";
    
    import infispinner from "../components/infispinner.vue";
    import txCard from "../components/tx-card.vue";
    import customFooter from '../components/custom-footer.vue';

    export default {
        name: 'home-page',     
        components: {
            lotto,

            infispinner, 
            customFooter,
            txCard,
        },
        data() {
            return {
                CURRENT_NETWORK,
                ABIS,
                loading: false,
            };
        }, 
        computed: {
            LANG()                  { return this.$store.getters.LANG },
            accs_length()           { return this.$store.getters.accs_length },
            current_page()         { return this.$store.getters.current_page },
        },
        mounted()
        {
            document.addEventListener("keydown", (e) => {
                if (e.keyCode == 13 && this.accs_length == 0)
                {
                    console.log("connecting wallet")
                    this.connectWallet()
                }
            })
        },
        methods: {
            async connectWallet() {
                this.loading = true
                await this.$store.dispatch("connectWallet")
                this.loading = false
            },
        },
    }
</script>
