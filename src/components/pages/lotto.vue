<template>

    <!-- 
        minwiw 500vh
        blok when loading
        add more button when already bought ticket
        add time of round to my ticket
        add reactivity
        enahnce conditionals component s
        putt my account on menu
     -->
<div class="flex-column w-100" >

    <tx-card v-show="false" ref="ref_getVoteScratchedNumberMulticall" :props="form.form_getVoteScratchedNumberMulticall" />
    <tx-card v-show="false" ref="ref_withdrawBonus" :props="form.withdrawRefBonus" />
    <tx-card v-show="false" ref="addFullTargetAllowance" :props="form.addFullTargetAllowance" />


    <div class="flex-column" style="z-index: 2" > <!-- Buy Ticket -->
        <div v-if="!loadings.daiBalanceOfAndAllowance " class="show-xs_lg tx-xl">
            <div @click="execute_addFullTargetAllowance"  v-if="values.dai_dao_allowance < 999999999"  
                class="n-flat pa-2 clickable opacity-hover-50 mb-5 mt-3 border-r-25"
            >
                <div v-if="loadings.signup" class="flex-column opacity-75">
                    <i class="fas fa-circle-notch spin-nback"></i>
                    <span class="opacity-75 tx-xs tx-center mt-1">{{LANG.loading}} <br> {{LANG.tx}}</span>
                </div>
                {{LANG.signup}} 
            </div>
        </div>

        <template v-if="values.dai_dao_allowance > 0 && !!values.accountVoteIndex" >
            <div class="flex-column" v-show="togglers.buy_advanced2 ">
                <div class="flex-column  n-conve my-2 border-r-25 mx-8 pa-2 px-5 " > <!-- Results -->
                    <div class="flex-column " >
                        <div class="tx-xs">
                            Referral Bonus:
                        </div>
                        <div class="tx-secondary">
                            ${{values.val_getVoterRefAmount}}
                        </div>

                        <div @click="execute_withdrawBonus"  v-if="values.val_getVoterRefAmount > 0"
                            class="n-flat pa-2 clickable opacity-hover-75 border-r-25   tx-xs mt-2"
                        >
                            <div v-if="loadings.withdrawBonus" class="flex-column opacity-75 mb-1">
                                <i class="fas fa-circle-notch spin-nback"></i>
                                <span class="opacity-75  tx-center mt-1">{{LANG.loading}} <br> {{LANG.tx}}</span>
                            </div>
                            Withdraw Bonus
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </div>

    <div id="award" style=""></div>
    <div class="py-8" > </div>

    

    <div class="flex-column flex-lg_x-row pt-8 flex-1 w-100 ">
        <lotto-current-round ref="currentRound" @update_loading="update_loading" class="z-50 "
            @update_currentRound="update_currentRound" :_loadings="loadings" :_values="values"
        />

        <div class="flex-column flex-md_x-row" >
            <div id="store"></div>


            <div v-if="dark_mode" style="height: 200px; width: 2px; background: white; display: block;" class="opacity-10 show-xs_md" > </div>
            <div v-if="!dark_mode" style="height: 200px; width: 2px; background: black; display: block;" class="opacity-10 show-xs_md" > </div>

            <div class="flex-column " >
                <lotto-current-ticket ref="currentTicket" v-if="values.current_round > 0" @signup="execute_addFullTargetAllowance"
                    @update_currentTicket="update_currentTicket" :_loadings="loadings" :_values="values" @update_loading="update_loading"
                />
                <lotto-results class="" ref="lottoResults"
                    :_loadings="loadings" :_values="values" :_forms="{
                        form_multiCallResultsStart: form.form_multiCallResultsStart,
                        form_multiCallResultsEnd: form.form_multiCallResultsEnd}"
                    @update_results="update_results"  @update_loading="update_loading"
                />
            </div>
        </div>

        <div id="user"></div>

        <div v-if="dark_mode" style="width: 2px; background: white;" class="py-100 block opacity-10 show-xs_md" > </div>
        <div v-if="!dark_mode" style="width: 2px; background: black;" class="py-100 block opacity-10 show-xs_md" > </div>

        <div style="height: 80px" class="show-md_lg"> </div>

        <lotto-my-account ref="myAccount" @update_myAccount="update_myAccount" 
            class="flex-column" @update_loading="update_loading"
        />

        <lotto-bottom-menu  class="flex-column w-100 pos-fixed bottom-0 show-xs_md"
            style="z-index: 1999; background: linear-gradient(180deg, #00000000 0%, #00000033 80%, #00000000 100%)"
        />

    </div>










    <div class="flex-around flex-wrap w-100 my-4 mt-8">
        <lotto-settings v-show="pro_mode" class="z-10 n-flat pa-2  border-r-15" />
        <div v-if="values.dai_dao_allowance > 0" class="z-10">
        </div>
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
    import lottoResults from "./lotto/lotto-results.vue";
    import lottoSettings from "./lotto/lotto-settings.vue";
    import lottoBottomMenu from "./lotto/lotto-bottom-menu.vue";
    import lottoMyAccount from "./lotto/lotto-my-account.vue";
    import lottoCurrentTicket from "./lotto/lotto-current-ticket.vue";
    import lottoCurrentRound from "./lotto/lotto-current-round.vue";
    
    import loadTextWithValue from "../../thrue/models/text-value.js";
    import loadTextSignup from "../../thrue/models/text-signup.js";

    export default {
        name: 'lotto',     
        mixins: [loadTextWithValue, loadTextSignup],
        components: {
            txCard,

            lottoResults,
            lottoSettings,
            lottoBottomMenu,
            lottoMyAccount,
            lottoCurrentRound,
            lottoCurrentTicket,
        },
        data() {
            return {
                CURRENT_NETWORK,
                ABIS,

                loading: false,
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

                    withdrawRefBonus: {
                        title: 'withdrawrefbonus',
                        abi: ABIS.DAO,
                        address: CURRENT_NETWORK.DAO_ADDRESS,
                        function: 'withdrawRefBonus',
                        DEBUG: true,
                        res_type: 'uint',
                        form_args: {
                            "0": {placeholder:"",label:`value: "",`,value: "", type: "uint" },
                        },
                    },
                    form_getVoteScratchedNumberMulticall: {    
                        title: 'form_getVoteScratchedNumberMulticall',
                        abi: ABIS.LOTTO,
                        address: CURRENT_NETWORK.LOTTO_ADDRESS,
                        function: 'getWonAmount',
                        DEBUG: true,
                        res_type: 'uint256',
                        call_only: true,
                        make_multicall: true,                    
                        form_args: {
                            "0": {placeholder:"",label:`value: "",`,value: "", type: "uint" },
                            "1": {placeholder:"vote number",label:`value: "",`,value: "", type: "range:uint" },
                        },
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
            // var url_string = window.location.href
            // var url = new URL(url_string);
            // console.log(url_string, url);
            // var c = url.searchParams.get("round");
            // console.log(c);
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
                if (this.values.dai_dao_allowance == 0)
                {
                    this.loadTextSignup()
                } else {
                    this.$parent.$parent.$refs.scene.$refs.level.addTicketer();
                }
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

            async makeMultiCall()
            {
                let provider = ethers.getDefaultProvider();

                // you can use any ethers provider context here this example is
                // just shows passing in a default provider, ethers hold providers in
                // other context like wallet, signer etc all can be passed in as well.
                const multicall = new Multicall({ ethersProvider: provider, tryAggregate: true });

                const contractCallContext = [
                    {
                        reference: 'testContract',
                        contractAddress: '0x6795b15f3b16Cf8fB3E56499bbC07F6261e9b0C3',
                        abi: [ { name: 'foo', type: 'function', inputs: [ { name: 'example', type: 'uint256' } ], outputs: [ { name: 'amounts', type: 'uint256' }] } ],
                        calls: [{ reference: 'fooCall', methodName: 'foo', methodParameters: [42] }]
                    },
                    {
                        reference: 'testContract2',
                        contractAddress: '0x66BF8e2E890eA0392e158e77C6381b34E0771318',
                        abi: [ { name: 'fooTwo', type: 'function', inputs: [ { name: 'example', type: 'uint256' } ], outputs: [ { name: 'amounts', type: 'uint256', name: "path", "type": "address[]" }] } ],
                        calls: [{ reference: 'fooTwoCall', methodName: 'fooTwo', methodParameters: [42] }]
                    }
                ];

                const results = await multicall.call(contractCallContext);
                console.log(results);

                // results:
                // {
                //   results: {
                //       testContract: {
                //           originalContractCallContext:  {
                //             reference: 'testContract',
                //             contractAddress: '0x6795b15f3b16Cf8fB3E56499bbC07F6261e9b0C3',
                //             abi: [ { name: 'foo', type: 'function', inputs: [ { name: 'example', type: 'uint256' } ], outputs: [ { name: 'amounts', type: 'uint256' }] } ],
                //             calls: [{ reference: 'fooCall', methodName: 'foo', methodParameters: [42] }]
                //           },
                //           callsReturnContext: [{
                //               returnValues: [{ amounts: BigNumber }],
                //               decoded: true,
                //               reference: 'fooCall',
                //               methodName: 'foo',
                //               methodParameters: [42],
                //               success: true
                //           }]
                //       },
                //       testContract2: {
                //           originalContractCallContext:  {
                //             reference: 'testContract2',
                //             contractAddress: '0x66BF8e2E890eA0392e158e77C6381b34E0771318',
                //             abi: [ { name: 'fooTwo', type: 'function', inputs: [ { name: 'example', type: 'uint256' } ], outputs: [ { name: 'amounts', type: 'uint256[]' ] } ],
                //             calls: [{ reference: 'fooTwoCall', methodName: 'fooTwo', methodParameters: [42] }]
                //           },
                //           callsReturnContext: [{
                //               returnValues: [{ amounts: [BigNumber, BigNumber, BigNumber] }],
                //               decoded: true,
                //               reference: 'fooCall',
                //               methodName: 'foo',
                //               methodParameters: [42],
                //               success: true
                //           }]
                //       }
                //   },
                //   blockNumber: 10994677
                // }

            },
            async connectWallet() {
                await this.$store.dispatch("connectWallet")
            },
            
            async getResultsMulticall()
            {
                if (this.loadings.resultsMulticall) return
                this.loadings.resultsMulticall = true

                try {
                    // this.form.form_multiCallResultsStart = this.values.accountVoteIndex
                    this.form.form_getVoteScratchedNumberMulticall.form_args["0"].value = (parseInt(this.values.current_round) - 1)+""
                    this.form.form_getVoteScratchedNumberMulticall.form_args["1"].value =
                        `${this.form.form_multiCallResultsStart},${this.form.form_multiCallResultsEnd}`

                    console.log("this.form.form_getVoteScratchedNumberMulticall", this.form.form_getVoteScratchedNumberMulticall)
                    let asd = await this.$refs.ref_getVoteScratchedNumberMulticall.execute()
                    // console.log("asd", asd)
                    console.log("this.$refs.targetAllowance.theResult.filter((o) => o != 0)")
                    // console.log(asd.filter((o) => o != 0))
                    console.log("resultsss won amount",asd)

                    this.values.val_results = {...this.$refs.ref_getVoteScratchedNumberMulticall.theResult}
                    console.log("this.values.val_results",this.values.val_results)
                    // this.values.val_results = asd.filter((i, o) => o != 0).reduce((o, key) => Object.assign(o, {[key]: "whatever"}), {})
                    // console.log("asd", this.$refs.ref_getVoteScratchedNumberMulticall)
                    // console.log("asd", this.$refs.ref_getVoteScratchedNumberMulticall.theResult)

                    // yourArray.reduce((o, key) => Object.assign(o, {[key]: whatever}), {})
                    // console.log("this.$refs.targetAllowance.theResult.filter((o) => o != 0)")
                    // console.log(this.$refs.ref_getVoteScratchedNumberMulticall)
                    // console.log(asd.filter((o) => o != 0))
                    // this.values.val_results = this.$refs.ref_getVoteScratchedNumberMulticall.theResult.filter((o) => o != 0).reduce((o, key) => Object.assign(o, {[key]: "whatever"}), {})


                    // await this.$refs.targetAllowance.execute()
                } catch (error) {
                    console.log("failed call")
                }

                this.loadings.resultsMulticall = false
            },
            async execute_withdrawBonus()
            {
                if (this.loadings.withdrawBonus) return
                this.loadings.withdrawBonus = true

                try {
                    await this.$refs.ref_withdrawBonus.execute()
                } catch (error) {
                    console.log("failed call")
                }

                    console.log("withdrawBonus")
                this.loadings.withdrawBonus = false
            },
        },
    }
</script>


