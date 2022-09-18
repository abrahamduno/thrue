<template>
<div>

    <div class="flex-column  n-flat border-r-25 mx-8 pa-2 pos-relative" style="z-index: 2" > <!-- Buy Ticket -->

        <!-- <h5 class="tx-ls-5 my-2 tx-center opacity-50">OPEN LOTTO </h5>
        <hr class="w-100 opacity-10 "> -->
        <div class="show-lg_x  n-tx-s tx-xl tx-secondary"  style="position: absolute; top: -55px;"><i class="fa fa-store"></i></div>

        <h5 class="tx-ls-5 my-2 tx-center opacity-50"> {{LANG.myTicket.toUpperCase() }} </h5>

        <hr class="w-100 opacity-10 ">

        <div @click="$emit('signup')"  v-if="_values.dai_dao_allowance < 999999999"  
            class="n-flat pa-2 clickable opacity-hover-50 mb-5 mt-3 border-r-25"
        >
            <div v-if="_loadings.signup" class="flex-column opacity-75">
                <i class="fas fa-circle-notch spin-nback"></i>
                <span class="opacity-75 tx-xs tx-center mt-1">{{LANG.loading}} <br> {{LANG.tx}}</span>
            </div>
            {{LANG.signup}} 
        </div>

        <div v-if="_loadings.daiBalanceOfAndAllowance" class="flex-column opacity-75">
            <i class="fas fa-circle-notch spin-nback"></i>
            <span class="opacity-75 tx-xs tx-center mt-1">{{LANG.loading}} <br> {{LANG.walletInfo}}</span>
        </div>

        <div v-if="_loadings.currentRoundAndLastTicket" class="flex-column opacity-75">
            <i class="fas fa-circle-notch spin-nback"></i>
            <span class="opacity-75 tx-xs tx-center mt-1">{{LANG.loading}} <br> {{LANG.roundInfo}}</span>
        </div>

        <div v-if="!!values.accountVoteIndex" class="flex-column">
            <div class="flex">
                <div v-if="values.accountVoteIndex == 1" class="flex-column">
                    <span class="tx-xs">Ticket Number: </span>
                    <span class="tx-xl">1</span>
                </div>
                <div v-if="values.accountVoteIndex > 1" class="flex-column">
                    <span class="tx-xs">Ticket Pack Number: </span>
                    <span class="tx-xl">{{values.accountVoteIndex}}</span>
                </div>

                <div v-if="dark_mode" style="height: 70px; width: 2px; background: white; display: block;" class="mx-3 mb-3 opacity-10"></div>
                <div v-if="!dark_mode" style="height: 70px; width: 2px; background: black; display: block;" class="mx-3 mb-3 opacity-10"></div>

                <div v-if="values.accountVoteLength > 0" class="flex-column">
                    <span class="tx-xs">Ticket Length: </span>
                    <span class="tx-xl">{{values.accountVoteLength}}</span>
                </div>
            </div>
        </div>


        <template v-if="_values.dai_dao_allowance > 0 && !_loadings.daiBalanceOfAndAllowance && !_loadings.currentRoundAndLastTicket" >

            <div v-if="!values.accountVoteIndex" class="  flex-column tx-sm w-100" > <!-- user hasnt voted -->
                <div class="" v-if="!values.val_randomResultBlock" > <!-- round hasnt finished -->

                    <div class="flex-row n-inset border-r-25 " v-if="!togglers.buy_advanced3">
                        <div @click="togglers.buy_advanced3 = true"  
                            class="pt- pa-3 px-1 clickable opacity-hover-75 border-r-15    mb-6 mx-5"
                        >
                            <div v-if="loadings.buyTicket" class="flex-column opacity-75 mb-1">
                                <i class="fas fa-circle-notch spin-nback"></i>
                                <span class="opacity-75  tx-center mt-1">{{LANG.loading}} <br> {{LANG.tx}}</span>
                            </div>
                            <div class="flex-row tx-xl flex-column ">
                                <div class="pr-1 tx-lg n-tx-3d tx-ls-3">{{LANG.buy}}</div>
                                <!-- <div v-if="!!forms.form_buyTicketAmount" class="mx-2 tx-lg">{{forms.form_buyTicketAmount}}</div> -->
                                <div class="n-tx-3d tx-ls-">Ticket 
                                    <!-- <span v-if="forms.form_buyTicketAmount > 1">(s)</span> -->
                                </div>
                                <div class="n-tx-3d hover-hover"><i class=" fa fa-hand-pointer"></i></div>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="opacity-50 tx-xs my-5" v-if="!!values.val_randomResultBlock"> <!-- round has finished -->
                    Round Done
                </div>



            </div>
        </template>
        <div class="  flex-column tx-sm w-100" >
            <div class="flex-column " v-show="togglers.buy_advanced3">

                <div class="flex-column my-2">
                    <div class="flex-between">
                        <div @click="forms.form_buyTicketAmount = forms.form_buyTicketAmount <= 1 ? 1 : parseInt(forms.form_buyTicketAmount)-1" class=" clickable pa-2 opacity-hover-50 n-border-primary-1 n-flat border-r-50 " >  <i class="fa fa-minus"></i> </div>
                        <div class="ml-1  flex-column mb-3">
                            <span class="tx-xs tx-ls-3">{{LANG.amount.toUpperCase()}}</span>
                            <input type="number" name="" min="0" v-model="forms.form_buyTicketAmount" class="n-inset tx-primary noborder pa-2 ma-1 border-r-10 n-tx tx-bold tx-lg" style="width: 100px">
                        </div>
                        <div @click="forms.form_buyTicketAmount = parseInt(forms.form_buyTicketAmount)+1" class=" clickable pa-2 opacity-hover-50 n-border-primary-1 n-flat border-r-50 " >  <i class="fa fa-plus"></i> </div>
                    </div>
                    <div class="flex-between">
                        <button @click="forms.form_buyTicketAmount = parseInt(forms.form_buyTicketAmount) + 1" class="n-btn pa-2 ma-1 border-r-10 tx-secondary n-border-secondary-1 n-flat">+1</button>

                        <button @click="forms.form_buyTicketAmount = parseInt(forms.form_buyTicketAmount) + 10" class="n-btn pa-2 ma-1 border-r-10 tx-secondary n-border-secondary-1 n-flat">+10</button>

                        <button @click="forms.form_buyTicketAmount = parseInt(forms.form_buyTicketAmount) + 50" class="n-btn pa-2 ma-1 border-r-10 tx-secondary n-border-secondary-1 n-flat">+50</button>

                        <button @click="forms.form_buyTicketAmount = parseInt(forms.form_buyTicketAmount) + 100" class="n-btn pa-2 ma-1 border-r-10 tx-secondary n-border-secondary-1 n-flat">+100</button>
                    </div>

                    <div class="flex-row mt-2 n-flat px-2 border-r-15">
                        <div @click="execute_buyTicket"  style="color: white" 
                            class="n-flat pa-3  clickable bg-secondary opacity-hover-75 border-r-15    my-2"
                        >
                            <div v-if="loadings.buyTicket" class="flex-column opacity-75 mb-1">
                                <i class="fas fa-circle-notch spin-nback"></i>
                                <span class="opacity-75  tx-center mt-1">{{LANG.loading}} <br> {{LANG.tx}}</span>
                            </div>
                            <div class="flex-row">
                                <div class="pr-1">{{LANG.buybuy}}</div>
                                <div v-if= "!!forms.form_buyTicketAmount" class="mx-2 tx-lg">{{forms.form_buyTicketAmount}}</div>
                                <div>TICKET <span v-if="forms.form_buyTicketAmount > 1">(s)</span></div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div class="flex-column " v-show="togglers.buy_advanced2 && togglers.buy_advanced3">

                <div class="flex-column mt-2">
                    <div class="flex">
                        <span class="pr-1">Ref:</span>
                        <span>{{shortAddress(forms.form_buyTicketRef)}}</span>
                    </div>
                    <input type="text" name="" v-model="forms.form_buyTicketRef" style="width: 260px" class="n-inset noborder pa-2 my-2 border-r-5 tx-xs n-tx" >
                </div>

            </div>
            <div class="w-100 flex-between tx-sm" v-if="_values.dai_dao_allowance > 0 && togglers.buy_advanced3">
                <div></div>
                <div @click="togglers.buy_advanced2 = !togglers.buy_advanced2"
                :class="[togglers.buy_advanced2 ? 'n-inset' : 'n-flat']"
                    class=" clickable pa-2 opacity-hover-50 border-r-50"
                >
                    <i :class="[togglers.buy_advanced2 ? 'fa-minus' : 'fa-plus']" class="fa"></i>
                </div>
            </div>
        </div>
        <tx-card v-show="false" ref="accountVoteIndex" :props="forms.getVoterVoteIndex" />
        <tx-card v-show="false" ref="ticketLength" :props="forms.getVoterAmountOfVotes" />
        <tx-card v-show="false" ref="ref_buyTicket"  class=" flex-column tx-xl  px-8 py-2" :props="forms.voteOnProposal" />
    </div>

</div>
</template>

<script>
    import { ABIS, CURRENT_NETWORK } from '../../store/constants';
    import { parseDecimals, ERROR_HELPER, shortAddress, shortAddressSpaced } from '../../store/helpers';

    import txCard from "../../components/tx-card.vue";

    export default {
        name: 'lotto-current-ticket',   
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
                    buyTicket: false,
                    currentTicket: false,
                },

                togglers: {
                    buy_advanced2: false,
                    buy_advanced3: false,
                },
                forms: {
                    form_buyTicketRef: "",
                    form_buyTicketAmount: 0,

                    getVoterVoteIndex: {        
                        title: 'user vote index',
                        abi: ABIS.DAO,
                        address: CURRENT_NETWORK.DAO_ADDRESS,
                        function: 'getVoterVoteIndex',
                        call_only: true,
                        res_type: 'uint',
                        advanced: true,                
                        form_args: {
                            "0": {placeholder:"",label:`value: "",`,value: "", type: "uint" },
                            "1": {placeholder:"",label:`value: "",`,value: "", type: "address" },
                        },
                    },
                    voteOnProposal: {
                        title: "buyticket",
                        abi: ABIS.DAO,
                        address: CURRENT_NETWORK.DAO_ADDRESS,
                        function: 'voteOnProposal',
                        DEBUG: true,
                        form_args: {
                            "0": {placeholder:"Round",label:`value: "",`,value: "", type: "uint" },
                            
                            "1": {placeholder:"Amount of Votes",label:`value: '',`,value: '', type: "uint" },
                            "2": {placeholder:"Refferal",label:`value: "",`,value: "", type: "address" },
                        },
                    },
                    getVoterAmountOfVotes: {       
                        title: 'user votes',
                        abi: ABIS.DAO,
                        address: CURRENT_NETWORK.DAO_ADDRESS,
                        function: 'getVoterAmountOfVotes',
                        DEBUG: true,
                        res_type: 'uint',
                        call_only: true,                 
                        form_args: {
                            "0": {placeholder:"",label:`value: "",`,value: "", type: "uint" },
                            "1": {placeholder:"",label:`value: "",`,value: "", type: "address" },
                        },  
                    },
                },  
                values: {
                    accountVoteIndex: null,
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
            this.forms.getVoterVoteIndex.form_args["1"].value = this.first_acc.address
            this.forms.getVoterAmountOfVotes.form_args["1"].value = this.first_acc.address
            this.forms.voteOnProposal.form_args["2"].value = this.first_acc.address
            this.forms.form_buyTicketRef = this.first_acc.address

            await this.trigger_currentTicket()

            this.$emit("update_currentTicket", { data: {
                accountVoteIndex: this.values.accountVoteIndex,
                accountVoteLength: this.values.accountVoteLength,
                // prize_pool: this.values.prize_pool,
            }})
        },
        methods: {
            parseDecimals,
            shortAddress,
            async execute_buyTicket()
            {
                if (this.loadings.buyTicket) return
                this.loadings.buyTicket = true
                this.$store.dispatch("setNewBlock", {key:"values",...this.values,...this.loadings})

                try {
                    console.log("this.forms.form_buyTicketAmount, this.forms.form_buyTicketRef")
                    console.log(this.forms.form_buyTicketAmount.toString(), this.forms.form_buyTicketRef)
                    this.forms.voteOnProposal.form_args ["1"].value = this.forms.form_buyTicketAmount+""
                    if (this.first_acc.address != this.forms.form_buyTicketRef)
                    {
                        this.forms.voteOnProposal.form_args["2"].value = this.forms.form_buyTicketRef
                    }

                    await this.$refs.ref_buyTicket.execute()
                    // await this.$refs.targetAllowance.execute()
                    // this.values.dai_dao_allowance = this.$refs.targetAllowance._parsedResult
                } catch (error) {
                    this.$refs.ref_buyTicket.loading = false
                    console.log("failed call")
                }

                    console.log("buyTicket")
                this.loadings.buyTicket = false
            },
            trigger_currentTicket()
            {
                if (this.loadings.currentTicket) return

                return new Promise(async (resolve,reject) =>
                {
                    this.loadings.currentTicket = true
                    this.$emit("update_loading", {key: "currentTicket", value: true, })

                    try {
                        this.forms.getVoterVoteIndex.form_args["0"].value = (parseInt(this._values.current_round) - 1)+""
                        await this.$refs.accountVoteIndex.execute()
                        this.values.accountVoteIndex = this.$refs.accountVoteIndex._parsedResult

                        this.forms.getVoterAmountOfVotes.form_args["0"].value = (parseInt(this._values.current_round) - 1)+""
                        await this.$refs.ticketLength.execute()
                        this.values.accountVoteLength = this.$refs.ticketLength._parsedResult

                        // this.forms.form_multiCallResultsStart = this.$refs.accountVoteIndex._parsedResult
                        // this.forms.form_multiCallResultsEnd = this.$refs.accountVoteIndex._parsedResult+this.values.accountVoteLength
                        // console.log("form_multiCallResults Start-end", this.forms.form_multiCallResultsStart, this.forms.form_multiCallResultsEnd)

                        // try {
                        //     this.forms.form_getVoterRefAmount["0"].value = (parseInt(this.values.current_round) - 1)+""
                        //     await this.$refs.ref_getVoterRefAmount.execute()
                        //     this.values.val_getVoterRefAmount = this.$refs.ref_getVoterRefAmount._parsedResult

                        //     this.forms.withdrawRefBonus["0"].value = (parseInt(this.values.current_round) - 1)+""
                        // } catch (error) {
                        // }

                        // this.forms.form_getProposalPropertyResultBlock["0"].value = (parseInt(this.values.current_round) - 1)+""
                        // await this.$refs.ref_randomResultBlock.execute()
                        // this.values.val_randomResultBlock = this.$refs.ref_randomResultBlock._parsedResult
                        // // randomResultBlock

                        // this.forms.form_getVoteScratchedNumberMulticall["0"].value = (parseInt(this.values.current_round) - 1)+""
                        resolve(true)
                    } catch (error) {
                        // console.log("no vote found")
                        this.values.accountVoteIndex = 0
                    }

                    this.forms.voteOnProposal.form_args["0"].value = (parseInt(this._values.current_round) - 1)+""
                    
                    this.loadings.currentTicket = false
                    this.$emit("update_loading", {key: "currentTicket", value: false, })
                })
            },
        },
    }
</script>
