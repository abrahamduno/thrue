<template>
<div class="flex-column w-100" >

    <tx-card v-show="false" ref="addFullTargetAllowance" :props="form.addFullTargetAllowance" />


    <div class="py-8" > </div>

    <div class="flex-column flex-lg_x-row pt-8 flex-1 w-100 ">
        <simulation-player-stats ref="currentRound" @update_loading="update_loading" class="z-50 "
            @update_currentRound="update_currentRound" :_loadings="loadings" :_values="values"
        />

        <div id="user"></div>

        <div v-if="dark_mode" style="width: 2px; background: white;" class="py-100 block opacity-10 show-xs_md" > </div>
        <div v-if="!dark_mode" style="width: 2px; background: black;" class="py-100 block opacity-10 show-xs_md" > </div>

        <div style="height: 80px" class="show-md_lg"> </div>

        <!-- <lotto-my-account ref="myAccount" @update_myAccount="update_myAccount" 
            class="flex-column" @update_loading="update_loading"
        /> -->
    </div>

</div>
</template>

                        

<script>
    import {
      Multicall,
    } from 'ethereum-multicall';
    import { ethers } from 'ethers';

    import { ABIS, CURRENT_NETWORK } from '../../scripts/constants/index';
    import { parseDecimals, ERROR_HELPER, shortAddress, shortAddressSpaced } from '../../scripts/helpers';
    
    import txCard from "../parts/tx-card.vue";
    import simulationPlayerStats from "./simulation/simulation-player-stats.vue";

    import loadTextWithValue from "../../thrue/models/text-value.js";
    import loadTextSignup from "../../thrue/models/text-signup.js";

    export default {
        name: 'simulation',     
        mixins: [loadTextWithValue, loadTextSignup],
        components: {
            txCard,

            simulationPlayerStats,
        },
        data() {
            return {
                CURRENT_NETWORK,
                ABIS,

                values: {
                    loadings: null,
                    dai_balance_of: null,
                    dai_dao_allowance: null,
                    current_round: null,
                    prize_pool: null,
                    accountVoteIndex: null,
                    deadline: null,
                    accountVoteLength: null,
                    val_getVoterRefAmount: null,
                    val_randomResultBlock: null,

                    val_results: {},
                },

                loading: false,
                loadings: {
                    resultsMulticall: false,
                    daiBalanceOfAndAllowance: false,
                    currentRoundAndLastTicket: false,
                    withdrawBonus: false,
                    currentTicket: false,
                    buyTicket: false,
                },
                togglers: {
                    results_advanced: false,
                    buy_advanced1: false,
                    buy_advanced2: false,
                    buy_advanced3: false,
                },
                form: {
                    form_buyTicketRef: "",
                    form_buyTicketAmount: 0,
                    form_multiCallResults: "",
                    form_multiCallResultsStart: "",
                    form_multiCallResultsEnd: "",
                    proposalIndexAct: "",
                    proposalIndexRead: "",
                    votePos: "",

                    createProposal: {
                        "0": { placeholder: "Votes", value: "", type: "uint" },
                        "1": { placeholder: "Deadline", value: "", type: "uint" },
                    },

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

        },
        async mounted()
        {
        },
        methods: {
            parseDecimals,
            shortAddress,
            update_loading(msg)
            {
                this.loadings[msg.key] = msg.value
            },
            async update_results(msg)
            {
                this.values.val_results = msg.data.val_results
            },
            async update_myAccount(msg)
            {
                this.values.dai_balance_of = msg.data.dai_balance_of
                this.values.dai_dao_allowance = msg.data.dai_dao_allowance
                this.$store.dispatch("setNewBlock", {key:"values",...this.values,...this.loadings})
                // if (this.values.dai_dao_allowance == 0)
                // {
                //     this.loadTextSignup()
                // } else {
                //     this.$parent.$parent.$refs.scene.$refs.level.addTicketer();
                // }
            },
            async update_currentRound(msg)
            {
                this.values.current_round = msg.data.current_round
                this.values.prize_pool = msg.data.prize_pool
                this.values.val_randomResultBlock = msg.data.val_randomResultBlock
                this.values.deadline = msg.data.deadline

                // console.log(this.$parent.$parent.$refs.scene.$refs.level)
                this.$store.dispatch("setNewBlock", {key:"values",...this.values,...this.loadings})
                this.loadTextWithValue()

            },
            async update_currentTicket(msg)
            {
                this.values.accountVoteIndex = msg.data.accountVoteIndex
                this.values.accountVoteLength = msg.data.accountVoteLength

                this.form.form_multiCallResultsStart = msg.data.accountVoteIndex
                this.form.form_multiCallResultsEnd = msg.data.accountVoteIndex+msg.data.accountVoteLength
                this.$refs.lottoResults.forms.form_multiCallResultsStart = this.form.form_multiCallResultsStart
                this.$refs.lottoResults.forms.form_multiCallResultsEnd =    this.form.form_multiCallResultsEnd
            },
            // sign up
            async execute_addFullTargetAllowance()
            {
                if (this.loadings.signup) return
                this.loadings.signup = true
                this.$store.dispatch("setNewBlock", {key:"values",...this.values,...this.loadings})

                try {
                    let tx = await this.$refs.addFullTargetAllowance.execute()
                    let updatetx = await this.$refs.myAccount.triggersend_daiBalanceOfAndAllowance()
                } catch (error) {
                    console.log("failed call", error)
                    window.location.reload()
                }

                this.loadings.signup = false
                this.$store.dispatch("setNewBlock", {key:"values",...this.values,...this.loadings})
            },

        },
    }
</script>


