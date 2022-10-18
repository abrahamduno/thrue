<template>
<div class="flex-column w-100" >

    <div class="py-8" > </div>
    
    <div class="flex-column flex-lg_x-row pt-8 flex-1 w-100 "
        v-show="pause_mode && (accs_length || is_playing_test)">
        <simulation-address 
            ref="simulationAddress" @update_loading="update_loading" class="z-50 "
            @update_values="update_values" :_loadings="loadings" :_values="values"
        />

        <div id="user"></div>

        <div v-if="dark_mode" style="width: 2px; background: white;" class="py-100 block opacity-10 show-xs_md" > </div>
        <div v-if="!dark_mode" style="width: 2px; background: black;" class="py-100 block opacity-10 show-xs_md" > </div>

        <div style="height: 80px" class="show-md_lg"> </div>

        <simulation-player-stats v-if="values.player_birthunix"
            ref="playerStats" @update_loading="update_loading" class="z-50 "
            @update_values="update_values" :_loadings="loadings" :_values="values"
        />

    </div>

</div>
</template>

                        

<script>
    import {
      Multicall,
    } from 'ethereum-multicall';
    import { ethers } from 'ethers';

    import { ABIS, CURRENT_NETWORK } from '../../scripts/constants/index';
    import simulationAddress from "./simulation/simulation-address.vue";
    import simulationPlayerStats from "./simulation/simulation-player-stats.vue";

    import loadTextWithValue from "../../thrue/models/text-value.js";
    import loadTextSignup from "../../thrue/models/text-signup.js";

    export default {
        name: 'simulation',     
        mixins: [loadTextWithValue, loadTextSignup],
        components: {
            simulationAddress,
            simulationPlayerStats,
        },
        data() {
            return {
                CURRENT_NETWORK,
                ABIS,

                values: {
                    dai_balance_of: null,
                    dai_dao_allowance: null,
                    player_birthunix: null,
                    _parsed_player_birthunix: null,
                    memories: null,
                    globalState: null,
                    status: null,
                },

                loading: false,
                loadings: {
                    daiBalanceOfAndAllowance: false,
                    statsStateStatus: false,
                    createPlayer: false,
                    addEnergy: false,
                },

                form: {

                    addFullTargetAllowance: {
                        title: 'Add FULL DAI Allowance to target',
                        abi: ABIS.ERC20,
                        address: CURRENT_NETWORK.BASE_USD_ADDRESS,
                        function: 'approve',
                        res_type: 'uint256',
                        button_only: true,
                        form_args: {
                            "0": {placeholder:"",label:`value: CURRENT_NETWORK.DAO_ADDRESS`,value: CURRENT_NETWORK.DAO_ADDRESS, type: "address" },
                            "1": {placeholder:"amount",label:`value: '',`,value: '9999999999', type: "uint256" },
                        },
                    },
                },
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
            pause_mode()             { return this.$store.getters.pause_mode },
        },
        async mounted()
        {
        },
        methods: {
            changeProMode() {
                let newMode = !this.pro_mode
                localStorage.setItem("proMode", JSON.stringify(newMode));
                this.$store.dispatch("setProMode", newMode)
            },
            update_loading(msg)
            {
                this.loadings[msg.key] = msg.value
            },
            async update_values(msg)
            {
                if (msg.data.dai_balance_of)
                { this.values.dai_balance_of = msg.data.dai_balance_of }

                if (msg.data.dai_dao_allowance)
                { this.values.dai_dao_allowance = msg.data.dai_dao_allowance }

                if (msg.data.player_birthunix)
                { this.values.player_birthunix = msg.data.player_birthunix }

                if (msg.data._parsed_player_birthunix)
                { this.values._parsed_player_birthunix = msg.data._parsed_player_birthunix }

                if (msg.data.memories)
                { this.values.memories = msg.data.memories }

                if (msg.data.status)
                { this.values.status = msg.data.status }

                if (msg.data.globalState)
                { this.values.globalState = msg.data.globalState }

                // this.$store.dispatch("setNewBlock", {key:"values",...this.values,...this.loadings})

                // console.log("wishes", this.values.memories ? this.values.memories.filter(item => item.isWish) : [])
                if (!!this.values.player_birthunix)
                {
                    this.$store.dispatch("setPlayer",
                      {
                        id:this.first_acc.address,
                        // preQaction: "",
                        // preQactions: [],
                        // preQ: null,
                        wishs: this.values.memories ? this.values.memories.filter(item => item.isWish) : [],
                        mmrs: {
                            "ambition": [],
                            "art": [],
                            "hazards": [],
                            "logic": [],
                            "pets": [],
                            "social": [],
                            "sports": [],
                            "supernatural": [],
                        },
                        q: [],
                        obj: null,
                        pos: [0,0,0],
                        rot: [0,0,0],
                        scale: [1,1,1],
                        stats: this.values.globalState,
                      }
                    )
                    this.$nextTick(() => {
                        this.$parent.$parent.$refs.scene.$refs.level.selectedPlayer = this.first_acc.address
                    })
                }

            },

        },
    }
</script>


