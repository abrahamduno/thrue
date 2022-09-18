<template>
<div>

    <div class="flex-column n-flat border-r-15 mx-2 pa-5 px-3 pos-relative " style="z-index: 2" >  <!-- Prize Pool -->
        <div class="show-lg_x  tx-primary n-tx-s tx-xl" style="position: absolute; top: -100px; z-index: 999">
            <i class="fa fa-2x fa-award"></i>
        </div>

        <h3 class="tx-ls-5 my-2   tx-center">{{LANG.prizePool}} </h3>

        <div v-if="_loadings.daiBalanceOfAndAllowance" class="flex-column opacity-75">
            <i class="fas fa-circle-notch spin-nback"></i>
            <span class="opacity-75 tx-xs tx-center mt-1">{{LANG.loading}} <br> {{LANG.walletInfo}}</span>
        </div>
        <div v-else v-if="_loadings.currentRoundAndLastTicket || loadings.currentRoundAndLastTicket" class="flex-column opacity-75">
            <i class="fas fa-circle-notch spin-nback"></i>
            <span class="opacity-75 tx-xs tx-center mt-1">{{LANG.loading}} <br> {{LANG.roundInfo}}</span>
        </div>

        <h1  class=" flex-column tx-xxl tx-error" style="z-index: 88" v-if="values.current_round == 0">
            ?
        </h1>
        <h1  class=" flex-column tx-xxl mb-0 tx-success" style="z-index: 88" v-if="values.prize_pool">
            ${{parseDecimals(values.prize_pool * 0.8)}} 
        </h1>

        <div class="flex-column " v-show="togglers.round_advanced">

            <h6  class="ma-0 flex-column  tx-xs" style="z-index: 88" v-if="values.prize_pool">
                MAX SINGLE PRIZE: ${{parseDecimals(values.prize_pool * 0.2)}} 
            </h6>
            <div class="tx-xs opacity-50 w-100 flex-column my-3" >
                <span v-if="values.deadline" >{{values.deadline}}</span>
                
            </div>
            <tx-card v-show="false"  ref="ref_amountOfTokensRequired" :props="forms.form_getProposalamountOfTokensRequired" />
            <tx-card v-show="false"  ref="ref_amountOfTokens" :props="forms.form_getProposalamountOfTokens" />
            <tx-card v-show="false"   class=" flex-column  mt-3" :props="forms.balanceOfDAO" />
            <tx-card v-show="false" ref="prizePool" :props="forms.amountOfTokensRequired" />
            <hr class="w-50 opacity-10">
            <div class="flex flex-align-start">

                <div  class=" flex-column tx-sm  " >
                    <span class="tx-xs">{{LANG.currentRound}}</span>
                    <span  class="tx-xl" v-if="values.current_round">{{values.current_round - 1}}</span>
                </div>

                <div v-show="pro_mode" v-if="dark_mode" style="height: 70px; width: 2px; background: white; display: block;" class="mx-3 mb-3 opacity-10"></div>
                <div v-show="pro_mode" v-if="!dark_mode" style="height: 70px; width: 2px; background: black; display: block;" class="mx-3 mb-3 opacity-10"></div>

                <tx-card v-show="pro_mode" class=" flex-column  mb-5" ref="lastTicketNumber" :props="forms.amountOfVotes" />
            </div>
        </div>
        <a  href="#store" class="n-flat pos-relative  n-tx px-4 py-2 border-r-15 flex-column tx-sm nodeco"  style="z-index: 2000">
            <i class="fa fa-store"></i>
            <small class="pt-1 tx-xs nodeco">{{LANG.buyTicket}}</small>
        </a>

        <div class="w-100 flex-between tx-lg   " >
            <div></div>
            <div @click="togglers.round_advanced = !togglers.round_advanced"
            :class="[togglers.round_advanced ? 'n-inset' : 'n-flat']"
                class=" clickable  opacity-hover-50 border-r-50 py-2 px-3"
            >
                <i :class="[togglers.round_advanced ? 'fa-minus' : 'fa-plus']" class="fa"></i>
            </div>
        </div>
    </div>
    <tx-card v-show="false" ref="currentRound" :props="forms.currentRound" />
    <tx-card v-show="false" ref="deadline" :props="forms.getProposalPropertyDeadline" />
    <tx-card v-show="false" ref="ref_randomResultBlock" :props="forms.form_getProposalPropertyResultBlock" />
    

</div>
</template>

<script>
    import { ABIS, CURRENT_NETWORK } from '../../store/constants';
    import { parseDecimals, ERROR_HELPER, shortAddress, shortAddressSpaced } from '../../store/helpers';

    import txCard from "../../components/tx-card.vue";

    export default {
        name: 'lotto-current-round',   
        props: ["_loadings", "_values"],
        components: {
            txCard,
        },
        data() {
            return {
                CURRENT_NETWORK,
                ABIS,

                loading: false,
                loadings: {
                    currentRoundAndLastTicket: false,
                },

                togglers: {
                    round_advanced: false,
                },
                forms: {
                    currentRound: {
                        title: "current round",
                        form_args: {},
                        abi: ABIS.DAO,
                        address: CURRENT_NETWORK.DAO_ADDRESS,
                        function: 'numProposals',
                        res_type: 'uint',
                        button_only: true,
                        call_only: true,
                    },
                    amountOfVotes: { 
                        title: "LANG.lastTicketBought",
                        abi: ABIS.DAO,
                        address: CURRENT_NETWORK.DAO_ADDRESS,
                        function: 'proposals',
                        res_type: 'struct.amountOfVotes.uint',
                        button_only: true,
                        call_only: true,                       
                        form_args: {
                            "0": {placeholder:"",label:`value: '',`,value: '', type: "uint" },
                        },
                    },
                    amountOfTokensRequired: {
                        title: 'tokens required',
                        abi: ABIS.DAO,
                        address: CURRENT_NETWORK.DAO_ADDRESS,
                        function: 'proposals',
                        res_type: 'struct.amountOfTokensRequired.uint256',
                        call_only: true,
                        form_args: {
                            "0": {placeholder:"",label:`value: '',`,value: '', type: "uint" },
                        },
                    },
                    getProposalPropertyAmount: {                        
                        "0": {placeholder:"",label:`value: '',`,value: '', type: "uint" },
                    },
                    getProposalPropertyAmountRequired: {                        
                        "0": {placeholder:"",label:`value: '',`,value: '', type: "uint" },
                    },
                    getProposalPropertyDeadline: {
                        title: 'getDeadline ',
                        abi: ABIS.DAO,
                        address: CURRENT_NETWORK.DAO_ADDRESS,
                        function: 'proposals',
                        res_type: 'struct.deadline.timestamp',
                        call_only: true,                        
                        form_args: {
                            "0": {placeholder:"",label:`value: '',`,value: '', type: "uint" },
                        },
                    },
                    form_getProposalPropertyResultBlock: {                        
                        title: 'getDeadline ',
                        abi: ABIS.LOTTO,
                        address: CURRENT_NETWORK.LOTTO_ADDRESS,
                        function: 'gameRounds',
                        res_type: 'struct.randomResultBlock.uint',
                        call_only: true,
                        form_args: {
                            "0": {placeholder:"",label:`value: '',`,value: '', type: "uint" },
                        },
                    },
                    form_getProposalamountOfTokens: {                        
                        title: 'amountOfTokens ',
                        abi: ABIS.DAO,
                        address: CURRENT_NETWORK.DAO_ADDRESS,
                        function: 'proposals',
                        res_type: 'struct.amountOfTokens.uint256',
                        call_only: true,
                        form_args: {
                            "0": {placeholder:"",label:`value: '',`,value: '', type: "uint" },
                        },
                    },
                    form_getProposalamountOfTokensRequired: {                        
                        title: 'amountOfTokensRequired',
                        abi: ABIS.DAO,
                        address: CURRENT_NETWORK.DAO_ADDRESS,
                        function: 'proposals',
                        res_type: 'struct.amountOfTokensRequired.uint256',
                        call_only: true,
                        form_args: {
                            "0": {placeholder:"",label:`value: '',`,value: '', type: "uint" },
                        },
                    },
                    balanceOfDAO: {
                        title: 'balanceOfDAO',
                        abi: ABIS.ERC20,
                        address: CURRENT_NETWORK.BASE_USD_ADDRESS,
                        function: 'balanceOf',
                        res_type: 'uint256',
                        call_only: true,
                        form_args: {
                            "0": {placeholder:"",label:`value: CURRENT_NETWORK.DAO_ADDRESS`,value: CURRENT_NETWORK.DAO_ADDRESS, type: "address" },
                        },
                    },
                },  
                values: {
                    prize_pool: null,
                    deadline: null,
                    current_round: null,
                    val_randomResultBlock: null,
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
            // this.forms.DAIBalanceOf["0"].value = this.first_acc.address

            await this.trigger_currentRoundAndLastTicket()

            this.$nextTick(() => {
                // console.log("update_currentRound")
                this.$emit("update_currentRound", { data: {
                    current_round: this.values.current_round,
                    prize_pool: this.values.prize_pool,
                    val_randomResultBlock: this.values.val_randomResultBlock,
                    deadline: this.values.deadline,
                }})
            })
        },
        methods: {
            parseDecimals,
            shortAddress,
            trigger_currentRoundAndLastTicket()
            {
                if (this.loadings.currentRoundAndLastTicket) return

                return new Promise(async (resolve,reject) =>
                {
                    this.loadings.currentRoundAndLastTicket = true
                    this.$emit("update_loading", {key: "currentRoundAndLastTicket", value: true, })

                    await this.$refs.currentRound.execute()
                    // console.log("this.values.current_round",this.$refs.currentRound._parsedResult)
                    this.values.current_round = this.$refs.currentRound._parsedResult

                    if (this.values.current_round == 0) 
                    {
                        this.loadings.currentRoundAndLastTicket = false
                        this.$emit("update_loading", {key: "currentRoundAndLastTicket", value: false, })
                        return resolve(true)
                    }

                    this.forms.amountOfVotes.form_args["0"].value = (parseInt(this.values.current_round) - 1)+""
                    await this.$refs.lastTicketNumber.execute()

                    this.forms.amountOfTokensRequired.form_args["0"].value = (parseInt(this.values.current_round) - 1)+""
                    this.forms.getProposalPropertyAmount["0"].value = (parseInt(this.values.current_round) - 1)+""
                    await this.$refs.prizePool.execute()
                    this.values.prize_pool = parseDecimals(parseFloat(this.$refs.prizePool._parsedResult))

                    this.forms.getProposalPropertyDeadline.form_args["0"].value = (parseInt(this.values.current_round) - 1)+""

                    await this.$refs.deadline.execute()
                    this.values.deadline = this.$refs.deadline._parsedResult

                    this.forms.form_getProposalamountOfTokensRequired.form_args["0"].value = (parseInt(this.values.current_round) - 1)+""
                    this.forms.form_getProposalamountOfTokens.form_args["0"].value = (parseInt(this.values.current_round) - 1)+""

                    this.forms.form_getProposalPropertyResultBlock.form_args["0"].value = (parseInt(this.values.current_round) - 1)+""
                    await this.$refs.ref_randomResultBlock.execute()
                    this.values.val_randomResultBlock = this.$refs.ref_randomResultBlock._parsedResult
                    // randomResultBlock
                    
                    this.loadings.currentRoundAndLastTicket = false
                    this.$emit("update_loading", {key: "currentRoundAndLastTicket", value: false, })
                    // this.forms.voteOnProposal["0"].value = (parseInt(this.values.current_round) - 1)+""
                    resolve(true)
                })
            },
        },
    }
</script>
