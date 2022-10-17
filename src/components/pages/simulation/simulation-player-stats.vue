<template>
<div> 

    <!-- getters -->
    <tx-card v-show="false" ref="DAIBalanceOf" :props="forms.DAIBalanceOf" />
    <tx-card v-show="false" ref="targetAllowance" :props="forms.targetAllowance" />
    <!-- methods -->
    <tx-card v-show="false" :props="forms.addTargetAllowance" class="flex-column mt-3" />


    <div v-show="togglers.showMore" class="flex-column n-inset border-r-50 mx-2 pa-6" style="transform: translateY(-15px);">

        <div class="flex-column tx-xs px-2" >
            <div class="tx-sm" style="min-width: 170px">
                <a :href="'http://polygonscan.com/address/'+first_acc.address" target="_blank"
                    class="tx-lg py-2 n-tx flex-between w-100 opacity-hover-50"
                >
                    <i class="fa fa-file "></i>
                    <!-- Transaction history -->
                    {{LANG.amenu_txs}}
                </a>
            </div>
            <div class="tx-sm" style="min-width: 170px">
                <a :href="'http://polygonscan.com/address/'+first_acc.address" target="_blank"
                    class="tx-lg py-2 n-tx flex-between w-100 opacity-hover-50"
                >
                    <i class="fa fa-book "></i>
                    <!-- Rules of the game -->
                    {{LANG.amenu_rules}}
                </a>
            </div>
            <div class="tx-sm" style="min-width: 170px">
                <a :href="'http://polygonscan.com/address/'+first_acc.address" target="_blank"
                    class="tx-lg py-2 n-tx flex-between w-100 opacity-hover-50"
                >
                    <i class="fas fa-headset "></i>
                    <!-- Contact us -->
                    {{LANG.amenu_contactUs}}
                </a>
            </div>

        </div>
    </div>

    <div class="pos-relative flex-column n-flat border-r-15 mx-2 pa-4" >
        <div class="show-lg_x  tx-secondary n-tx-s tx-xl" style="position: absolute; top: -55px;"><i class="fa fa-user"></i></div>

        <div class="  flex-column tx-sm w-100" style="position: absolute; top: -25px;">
            <div class="w-100 flex-between tx-sm">
                <div @click="trigger_daiBalanceOfAndAllowance"
                    class=" clickable pa-2 border-r-50 n-flat" 
                >
                    <i :class="[loadings.daiBalanceOfAndAllowance ? 'spin-nback' : 'fa-redo']" class="fas fa-circle-notch"></i>
                </div>
                <div @click="togglers.showMore = !togglers.showMore"
                :class="[togglers.showMore ? 'n-inset' : 'n-flat']"
                    class=" clickable pa-2 border-r-50"
                >
                    <i :class="[togglers.showMore ? 'fa-minus' : 'fa-plus']" class="fa"></i>
                </div>
            </div>
            <div class="flex-column " v-show="togglers.showMore">
                <div class="flex-column " v-show="pro_mode">
                </div>
            </div>
        </div>

        <!-- <hr class="w-100 opacity-10"> -->

        <h6 class="tx-ls-1 opacity-50  my-0 tx-center">ADDRESS </h6> 
        <h4 class="tx-ls-3 my-2 tx-center">{{shortAddress(first_acc.address)}} </h4>

        <div v-if="loadings.daiBalanceOfAndAllowance" class="flex-column opacity-75">
            <i class="fas fa-circle-notch spin-nback"></i>
            <span class="opacity-75 tx-xs tx-center mt-1">{{LANG.loading}} <br> {{LANG.walletInfo}}</span>
        </div>

        <span v-if="!loadings.daiBalanceOfAndAllowance">{{values.dai_balance_of}} DAI</span>

    </div>


</div>
</template>

<script>
    import { ABIS, CURRENT_NETWORK } from '../../../scripts/constants/index';
    import { parseDecimals, ERROR_HELPER, shortAddress, shortAddressSpaced } from '../../../scripts/helpers';

    import txCard from "../../parts/tx-card.vue";

    export default {
        name: 'lotto-my-account',   
        components: {
            txCard,
        },
        data() {
            return {
                CURRENT_NETWORK,
                ABIS,

                values: {
                    dai_balance_of: null,
                    dai_dao_allowance: null,
                }, 

                loading: false,
                loadings: {
                    daiBalanceOfAndAllowance: false,
                },
                togglers: {
                    showMore: false,
                },
                forms: {
                    DAIBalanceOf: {
                        title: 'DAI',
                        abi: ABIS.ERC20,
                        address: CURRENT_NETWORK.BASE_USD_ADDRESS,
                        function: 'balanceOf',
                        res_type: 'uint256',
                        button_only: true,
                        call_only: true,
                        form_args: {
                            "0": {placeholder:"",label:`value: "",`,value: "", type: "address" },
                        },
                    },
                    targetAllowance: {  
                        title: 'DAI Allowance to TargetContract',
                        abi: ABIS.ERC20,
                        address: CURRENT_NETWORK.BASE_USD_ADDRESS,
                        function: 'allowance',
                        res_type: 'uint256',
                        button_only: true,
                        call_only: true,                      
                        form_args: {
                            "0": {placeholder:"",label:`value: "",`,value: "", type: "address" },
                            "1": {placeholder:"",label:`value: CURRENT_NETWORK.DAO_ADDRESS`,value: CURRENT_NETWORK.DAO_ADDRESS, type: "address" },
                        },
                    },
                    addTargetAllowance: {
                        title: 'Sign Smart Contract',
                        abi: ABIS.ERC20,
                        address: CURRENT_NETWORK.BASE_USD_ADDRESS,
                        function: 'approve',
                        res_type: 'uint256',
                        form_args: {
                            "0": {placeholder:"",label:`value: CURRENT_NETWORK.DAO_ADDRESS`,value: CURRENT_NETWORK.DAO_ADDRESS, type: "address" },
                            "1": {placeholder:"amount",label:`value: '',`,value: '', type: "uint256" },
                        },
                    },
                },   
            }
        },
        computed: {
            LANG()                  { return this.$store.getters.LANG },
            first_acc()             { return this.$store.getters.first_acc },
            pro_mode()              { return this.$store.getters.pro_mode },
            dark_mode()             { return this.$store.getters.dark_mode },
        },
        async mounted()
        {
            this.forms.DAIBalanceOf.form_args["0"].value = this.first_acc.address
            this.forms.targetAllowance.form_args["0"].value = this.first_acc.address

            await this.triggersend_daiBalanceOfAndAllowance()
        },
        methods: {
            parseDecimals,
            shortAddress,
            triggersend_daiBalanceOfAndAllowance()
            {
                return new Promise(async (resolve,reject) =>
                {
                    await this.trigger_daiBalanceOfAndAllowance()

                    this.$emit("update_values", { data: {
                        dai_balance_of: this.values.dai_balance_of,
                        dai_dao_allowance: this.values.dai_dao_allowance,
                    }})      
                    
                    resolve(true)
                })
            },
            trigger_daiBalanceOfAndAllowance()
            {
                if (this.loadings.daiBalanceOfAndAllowance) return

                return new Promise(async (resolve,reject) =>
                {
                    this.loadings.daiBalanceOfAndAllowance = true
                    this.$emit("update_loading", {key: "daiBalanceOfAndAllowance", value: true, })

                    // calling getters
                    await this.$refs.DAIBalanceOf.execute()
                    this.values.dai_balance_of = this.$refs.DAIBalanceOf._parsedResult
                    await this.$refs.targetAllowance.execute()
                    this.values.dai_dao_allowance = this.$refs.targetAllowance._parsedResult

                    this.loadings.daiBalanceOfAndAllowance = false
                    this.$emit("update_loading", {key: "daiBalanceOfAndAllowance", value: false, })

                    resolve(true)
                })
            },
        },
    }
</script>
