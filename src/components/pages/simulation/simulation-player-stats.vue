<template>
<div> 

    <!-- getters -->
     <tx-card v-show="false" ref="getPlayer_energy" :props="forms.getPlayer_energy" />
    <!-- methods -->
    <tx-card v-show="false" ref="createPlayer" :props="forms.createPlayer" class="flex-column mt-3" />


    <div v-show="pro_mode" class="flex-column n-inset border-r-50 mx-2 pa-6" style="transform: translateY(-15px);">

        <div class="flex-column tx-xs px-2" >

    
            <div class="tx-sm" style="min-width: 170px">
                <a href="https://thrue.gitbook.io/thrue/" target="_blank"
                    class="tx-lg py-2 n-tx flex-between w-100 opacity-hover-50"
                >
                    <i class="fa fa-book "></i>
                    <!-- Rules of the game -->
                    {{LANG.amenu_rules}}
                </a>
            </div>

            <!-- <hr class="w-100 opacity-10" > -->

            <span v-if="values.globalState"  class="my-2 w-100">
                <span class="flex-column ">
                    <span v-for="state in STATE_LIST" class="flex-between w-100">
                        <div class="">{{STATE_CONSTANTS[state].title}}</div>
                        <div class="tx-lg">{{values.globalState[state]}}</div>
                    </span>
                </span>
            </span>
            <span v-if="values.wishes"  class="my-2">
                <span class="flex-column">
                    wishes
                </span>
            </span>
            <span v-if="values.wishes"  class="my-2">
                <span class="flex-column">
                    wishes
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
            <i class="fa fa-file"></i>
        </div>

        <div class="  flex-column tx-sm w-100" style="position: absolute; top: -25px;">
            <div class="w-100 flex-between tx-sm">
                <div @click="trigger_statsStateStatus" 
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

        <h6 class="tx-ls-1 opacity-50  my-0 tx-center">STATS </h6> 
        <h4 class="tx-ls-3 my-2 tx-center">{{shortAddress(first_acc.address)}} </h4>


    </div>


</div>
</template>

<script>
    import { ABIS, CURRENT_NETWORK, STATE_LIST, STATE_CONSTANTS } from '../../../scripts/constants/index';
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
                STATE_LIST,
                STATE_CONSTANTS,

                values: {
                    wishes: null,
                    globalState: null,
                    status: null,
                }, 

                loading: false,
                loadings: {
                    addPlayerEnergy: false,
                    statsStateStatus: false,
                },
                togglers: {
                    showMore: false,
                },
                forms: {
                    addPlayerEnergy: {  
                        title: 'addPlayerEnergy',
                        abi: ABIS.SIMULATION,
                        address: CURRENT_NETWORK.SIMULATION_ADDRESS,
                        function: 'addPlayerEnergy',
                        form_args: {
                            "0": {placeholder:"",label:`value: "",`,value: "", type: "uin256" },
                            "1": {placeholder:"",label:`value: "",`,value: "", type: "uin256" },
                            "2": {placeholder:"",label:`value: "",`,value: "", type: "uin256" },
                            "3": {placeholder:"",label:`value: "",`,value: "", type: "uin256" },
                        },
                    },
                    getPlayer_energy: {
                        title: 'get state energy ',
                        abi: ABIS.SIMULATION,
                        address: CURRENT_NETWORK.SIMULATION_ADDRESS,
                        function: 'players',
                        res_type: 'struct.state.struct',
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
            // this.forms.DAIBalanceOf.form_args["0"].value = this.first_acc.address
            // this.forms.targetAllowance.form_args["0"].value = this.first_acc.address
            this.forms.getPlayer_energy.form_args["0"].value = this.first_acc.address

            await this.trigger_statsStateStatus()
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
            async trigger_statsStateStatus()
            {
                await this.execute_statsStateStatus()

                this.$emit("update_values", { data: {
                    dai_balance_of: this.values.dai_balance_of,
                    dai_dao_allowance: this.values.dai_dao_allowance,
                }})      
            },
            async execute_statsStateStatus()
            {
                if (this.loadings.statsStateStatus) return

                this.loadings.statsStateStatus = true
                this.$emit("update_loading", {key: "statsStateStatus", value: this.loadings.statsStateStatus, })

                // calling getters
                await this.$refs.getPlayer_energy.execute()
                console.log("_energy.theResult status", this.$refs.getPlayer_energy.theResult.status)
                this.values.status = this.$refs.getPlayer_energy.theResult.status
                console.log("_energy.theResult state", this.$refs.getPlayer_energy.theResult.globalState)
                this.values.globalState = {
                    energy: this.$refs.getPlayer_energy.theResult.globalState.energy,
                    fun: this.$refs.getPlayer_energy.theResult.globalState.fun,
                    hygene: this.$refs.getPlayer_energy.theResult.globalState.hygene,
                    protein: this.$refs.getPlayer_energy.theResult.globalState.protein,
                }

                this.loadings.statsStateStatus = false
                this.$emit("update_loading", {key: "statsStateStatus", value: this.loadings.statsStateStatus, })
            },

        },
    }
</script>
