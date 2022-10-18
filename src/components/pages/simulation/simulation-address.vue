<template>
<div> 

    <!-- getters -->
    <tx-card v-show="false" ref="DAIBalanceOf" :props="forms.DAIBalanceOf" />
    <tx-card v-show="false" ref="targetAllowance" :props="forms.targetAllowance" />
    <tx-card v-show="false" ref="getPlayer_birthunix" :props="forms.getPlayer_birthunix" />
    <!-- methods -->
    <tx-card v-show="false" ref="createPlayer" :props="forms.createPlayer" class="flex-column mt-3" />


    <div v-show="pro_mode" class="flex-column n-inset border-r-50 mx-2 pa-6" style="transform: translateY(-15px);">

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
            <!-- <div class="tx-sm" style="min-width: 170px">
                <a :href="'http://polygonscan.com/address/'+first_acc.address" target="_blank"
                    class="tx-lg py-2 n-tx flex-between w-100 opacity-hover-50"
                >
                    <i class="fas fa-headset "></i>
                    {{LANG.amenu_contactUs}}
                </a>
            </div> -->


            <hr class="w-100 opacity-10" v-if="values.player_birthunix" >

            <span v-if="values.player_birthunix"  class="my-2">
                <span class="flex-column">
                    <span class="opacity-50 tx-ls-3 pb-2">
                        Player Since:
                    </span>
                    <b>
                        {{values._parsed_player_birthunix}}
                    </b>
                </span>
            </span>

        </div>
    </div>

            <!-- @click="togglers.showMore = !togglers.showMore"  -->
            <!-- :class="[togglers.showMore ? 'tx-success' : 'tx-secondary']" -->
    <div class="pos-relative flex-column n-flat border-r-15 mx-2 pa-4" >
        <div class="show-lg_x  n-tx-s tx-xl clickable"
            @click="changeProMode"
            :class="[pro_mode ? 'tx-success' : 'tx-secondary']"
            style="position: absolute; top: -55px; z-index: 3">
            <i class="fa fa-user"></i>
        </div>

        <div class="  flex-column tx-sm w-100" style="position: absolute; top: -25px;">
            <div class="w-100 flex-between tx-sm">
                <div @click="trigger_daiBalanceOfAndAllowance" 
                    class=" clickable pa-2  border-r-50 n-flat" 
                >
                    <i :class="[loadings.daiBalanceOfAndAllowance ? 'spin-nback' : 'fa-redo']" class="fas fa-circle-notch"></i>
                </div>
                <div @click="changePauseMode"
                    class=" clickable py-1 pa-2 border-r-50 n-flat" 
                >
                    <i class="fa fa-times"></i>
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
        <span v-if="!loadings.daiBalanceOfAndAllowance && !values.player_birthunix" 
            @click="triggerCreatePlayer"
            class="mt-3 n-flat px-2 py-1 border-r-10 clickable opacity-hover-50"
                >
            Create Player
        </span>

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
        props: ["_loadings", "_values"],
        data() {
            return {
                CURRENT_NETWORK,
                ABIS,

                values: {
                    dai_balance_of: null,
                    dai_dao_allowance: null,
                    player_birthunix: null,
                    _parsed_player_birthunix: null,
                }, 

                loading: false,
                loadings: {
                    daiBalanceOfAndAllowance: false,
                    createPlayer: false,
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
                    getPlayer_birthunix: {
                        title: 'getDeadline ',
                        abi: ABIS.SIMULATION,
                        address: CURRENT_NETWORK.SIMULATION_ADDRESS,
                        function: 'players',
                        res_type: 'struct.birthunix.timestamp',
                        call_only: true,                        
                        form_args: {
                            "0": {placeholder:"",label:`value: "",`,value: "", type: "address" },
                        },
                    },
                    createPlayer: {
                        title: 'createPlayer',
                        abi: ABIS.SIMULATION,
                        address: CURRENT_NETWORK.SIMULATION_ADDRESS,
                        function: 'createPlayer',
                        form_args: {
                            "0": {placeholder:"",label:`value: CURRENT_NETWORK.DAO_ADDRESS`,value: CURRENT_NETWORK.SIMULATION_ADDRESS, type: "address" },
                            "1": {placeholder:"amount",label:`value: '',`,value: '', type: "string" },
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
            pause_mode()             { return this.$store.getters.pause_mode },
        },
        async mounted()
        {
            this.forms.DAIBalanceOf.form_args["0"].value = this.first_acc.address
            this.forms.targetAllowance.form_args["0"].value = this.first_acc.address
            this.forms.getPlayer_birthunix.form_args["0"].value = this.first_acc.address

            await this.trigger_daiBalanceOfAndAllowance()
        },
        methods: {
            parseDecimals,
            shortAddress,

            changePauseMode() {
                let newMode = !this.pause_mode
                localStorage.setItem("pauseMode", JSON.stringify(newMode));
                this.$store.dispatch("setPauseMode", newMode)
                // console.log("asd", newMode)
            },
            changeProMode() {
                let newMode = !this.pro_mode
                localStorage.setItem("proMode", JSON.stringify(newMode));
                this.$store.dispatch("setProMode", newMode)
            },
            async triggerCreatePlayer()
            {
                await this.execute_createPlayer()
            },
            async trigger_daiBalanceOfAndAllowance()
            {
                await this.execute_daiBalanceOfAndAllowance()

                this.$emit("update_values", { data: {
                    dai_balance_of: this.values.dai_balance_of,
                    dai_dao_allowance: this.values.dai_dao_allowance,
                    player_birthunix: this.values.player_birthunix,
                    _parsed_player_birthunix: this.values._parsed_player_birthunix,
                }})      
            },
            async execute_createPlayer()
            {
                if (this.loadings.daiBalanceOfAndAllowance) return
                if (this.loadings.createPlayer) return

                this.loadings.createPlayer = true
                this.$emit("update_loading", {key: "createPlayer", value: this.loadings.createPlayer, })

                this.forms.createPlayer.form_args["1"].value = "test"
                await this.$refs.createPlayer.execute()
                await this.$refs.getPlayer_birthunix.execute()
                this.values.player_birthunix = parseInt(this.$refs.getPlayer_birthunix.theResult.birthunix.toString())

                this.loadings.createPlayer = false
                this.$emit("update_loading", {key: "createPlayer", value: this.loadings.createPlayer, })
            },
            async execute_daiBalanceOfAndAllowance()
            {
                if (this.loadings.daiBalanceOfAndAllowance) return

                this.loadings.daiBalanceOfAndAllowance = true
                this.$emit("update_loading", {key: "daiBalanceOfAndAllowance", value: this.loadings.daiBalanceOfAndAllowance, })

                // calling getters
                await this.$refs.DAIBalanceOf.execute()
                this.values.dai_balance_of = this.$refs.DAIBalanceOf._parsedResult
                await this.$refs.targetAllowance.execute()
                this.values.dai_dao_allowance = this.$refs.targetAllowance._parsedResult
                await this.$refs.getPlayer_birthunix.execute()
                console.log("this.$refs.getPlayer_birthunix.theResult", this.$refs.getPlayer_birthunix.theResult)
                this.values.player_birthunix = parseInt(this.$refs.getPlayer_birthunix.theResult.birthunix.toString())
                this.values._parsed_player_birthunix = this.$refs.getPlayer_birthunix._parsedResult

                this.loadings.daiBalanceOfAndAllowance = false
                this.$emit("update_loading", {key: "daiBalanceOfAndAllowance", value: this.loadings.daiBalanceOfAndAllowance, })
            },

        },
    }
</script>
