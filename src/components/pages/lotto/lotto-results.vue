<template>
<div>

    <div class="flex-column"  v-if="_values && !!_values.val_randomResultBlock">
        <div class="flex-column z-10  n-conve my-2 border-r-25 mx-8 pa-2 mb-0 pb-0 px-5 " > <!-- Results -->
            Results:

            
            <div class="opacity-50 tx-xs my-2" v-if="_values && !!_values.val_randomResultBlock" >
                <!-- <span class="tx-sm mb-2 flex-row">Block: {{_values.val_randomResultBlock}}</span> -->

                <div v-if="_loadings.resultsMulticall" class="flex-column opacity-75 tx-lg">
                    <i class="fas fa-circle-notch spin-nback"></i>
                    <span class="opacity-75 tx-xs tx-center mt-1">{{LANG.loading}} <br> Winning Tickets</span>
                </div>
                <div class="tx-center">
                    Scratch:
                    <input type="text" name="" v-model="forms.form_multiCallResultsStart" class="n-flat noborder px-2 py-1 tx-right n-tx" style="width: 30px">
                    <!-- {{forms.form_multiCallResultsStart}} -->
                    ,
                    {{forms.form_multiCallResultsEnd}}
                </div>

                <div v-if="loadings.resultsMulticall" class="flex-column opacity-75 tx-lg">
                    <i class="fas fa-circle-notch spin-nback"></i>
                    <span class="opacity-75 tx-xs tx-center mt-1">{{LANG.loading}} <br> Winning Tickets</span>
                </div>

                <div class="flex-row nowrap" >
                    
                    <input type="range" name="" :max="_values.accountVoteIndex + _values.accountVoteLength" 
                    :min="forms.form_multiCallResultsStart"
                     v-model="forms.form_multiCallResultsEnd" class="n-flat noborder pa-2 n-tx" style="width: 60px">

                    <div class="clickable n-flat pa-2"
                        @click="getResultsMulticall"
                    >
                        Get Results
                    </div>
                </div>
                <template v-if="values.val_results != null">
                    <div>
                        <div v-if="Object.keys(values.val_results) == 0" >
                            <div class="py-4 tx-center opacity-50">
                                No Winning Tickets Yet
                            </div>
                        </div>
                        <div v-if="Object.keys(values.val_results) != 0" >
                            <div style="max-height: 100px; overflow-y: scroll;" class="py-2 n-inset">
                                <!-- {{values.val_results}} -->
                                <div v-for="(item,index) in values.val_results" class="flex-column w-100">
                                    <!-- {{item}} -->
                                    <!-- {{index}} -->
                                    <div class="flex-row py-1" v-if="item != 0">
                                        <div class="pr-2">
                                            <!-- {{index}} -->
                                            Ticket #{{parseInt(index)+parseInt(_values.accountVoteIndex)}}
                                        </div>
                                        <div class="tx-success">
                                            ${{item}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </div>

            <div class="opacity-50 tx-xs my-5" v-if="!_values.val_randomResultBlock">
                Not Done
            </div>
        </div>

    </div>

    <tx-card v-show="false" ref="ref_getVoteScratchedNumberMulticall" :props="forms.form_getVoteScratchedNumberMulticall"/> <!-- yes -->
    <div class="flex-column " v-if="pro_mode">
        <div class="flex-column " >
            <tx-card v-show="false" :props="forms.getVoteScratchedNumber" />
            <tx-card v-show="false" :props="forms.wonAmount" />
            <tx-card v-show="false" :props="forms.getWinner" />
            <tx-card v-show="false" :props="forms.getWonAmountMulticall"/>
            <tx-card ref="ref_getVoteScratchedNumberMulticall" :props="forms.form_getVoteScratchedNumberMulticall"/> <!-- yes -->
        </div>

        <!-- <hr class="w-50 opacity-10"> -->

        <div class="flex-column ">
            <tx-card v-show="false" :props="forms.withdrawAmount" />
            <tx-card :props="forms.withdrawAll" />
        </div>
    </div>

</div>
</template>
<script>
    import { ABIS, CURRENT_NETWORK } from '../../../scripts/constants/index';
    import { parseDecimals, ERROR_HELPER, shortAddress, shortAddressSpaced } from '../../../scripts/helpers';

    import txCard from "../../parts/tx-card.vue";

    export default {
        name: 'lotto-settings',   
        props: ["_loadings", "_values", "_forms"],
        components: {
            txCard,
        },
        data() {
            return {
                CURRENT_NETWORK,
                ABIS,

                loading: false,
                loadings: {
                    resultsMulticall: false,
                },
                togglers: {
                },
                forms: {
                    form_multiCallResultsStart: null,
                    form_multiCallResultsEnd: null,

                    form_getVoteScratchedNumberMulticall: {    
                        title: 'Get Results',
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
                    getVoteScratchedNumber: {                        
                        title: 'getVoteScratchedNumber',
                        abi: ABIS.LOTTO,
                        address: CURRENT_NETWORK.LOTTO_ADDRESS,
                        function: 'getVoteScratchedNumber',
                        DEBUG: true,
                        res_type: 'uint',
                        call_only: true,
                        form_args: {
                            "0": {placeholder:"",label:`value: "",`,value: "", type: "uint" },
                            "1": {placeholder:"vote number",label:`value: "",`,value: "", type: "uint" },
                        },
                    },
                    wonAmount: {      
                        title: 'wonAmount',
                        abi: ABIS.LOTTO,
                        address: CURRENT_NETWORK.LOTTO_ADDRESS,
                        function: 'getWonAmount',
                        DEBUG: true,
                        res_type: 'uint256',
                        call_only: true,                  
                        form_args: {
                            "0": {placeholder:"",label:`value: "",`,value: "", type: "uint" },
                            "1": {placeholder:"vote number",label:`value: "",`,value: "", type: "uint" },
                        },
                    },
                    getWinner: {    
                        title: 'getWinner',
                        abi: ABIS.LOTTO,
                        address: CURRENT_NETWORK.LOTTO_ADDRESS,
                        function: 'getWinner',
                        DEBUG: true,
                        res_type: 'uint',
                        call_only: true,                    
                        form_args: {
                            "0": {placeholder:"",label:`value: "",`,value: "", type: "uint" },
                            "1": {placeholder:"vote number",label:`value: "",`,value: "", type: "uint" },
                        },
                    },
                    getWonAmountMulticall: {   
                        title: 'getWonAmountMulticall',
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
                    withdrawAmount: {     
                        title: 'withdrawAmount',
                        abi: ABIS.LOTTO,
                        address: CURRENT_NETWORK.LOTTO_ADDRESS,
                        function: 'withdrawAmount',
                        DEBUG: true,
                        res_type: 'uint256',                   
                        form_args: {
                            "0": {placeholder:"",label:`value: "",`,value: "", type: "uint" },
                            "1": {placeholder:"vote number",label:`value: "",`,value: "", type: "uint" },
                            "2": {placeholder:"voter address",label:`value: "",`,value: "", type: "address" },
                        },
                    },
                    withdrawAll: {                        
                        title: 'Withdraw All Prizes',
                        abi: ABIS.LOTTO,
                        address: CURRENT_NETWORK.LOTTO_ADDRESS,
                        function: 'withdrawAll',
                        DEBUG: true,
                        res_type: 'uint',
                        form_args: {
                            "0": {placeholder:"",label:`value: "",`,value: "", type: "uint" },
                            
                            "1": {placeholder:"vote number",label:`value: "",`,value: "", type: "uint" },
                            
                            "2": {placeholder:"",label:`value: "",`,value: "", type: "address" },
                            "3": {placeholder:"vote distance",label:`value: "",`,value: "", type: "uint" },
                        },
                    },
                },  
                values: {
                    val_results: null,
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
        },
        methods: {
            parseDecimals,
            shortAddress,
            async getResultsMulticall()
            {
                if (this.loadings.resultsMulticall) return
                console.log("loadings.resultsMulticall", this.loadings.resultsMulticall)
                this.loadings.resultsMulticall = true
                console.log("loadings.resultsMulticall", this.loadings.resultsMulticall)

                try {
                    // this.form.form_multiCallResultsStart = this.values.accountVoteIndex
                    this.forms.form_getVoteScratchedNumberMulticall.form_args["0"].value = (parseInt(this._values.current_round) - 1)+""
                    this.forms.form_getVoteScratchedNumberMulticall.form_args["1"].value =
                        `${this.forms.form_multiCallResultsStart},${this.forms.form_multiCallResultsEnd}`

                    console.log("this.form.form_getVoteScratchedNumberMulticall", this.forms.form_getVoteScratchedNumberMulticall)
                    let asd = await this.$refs.ref_getVoteScratchedNumberMulticall.execute()
                    // console.log("asd", asd)
                    console.log("this.$refs.targetAllowance.theResult.filter((o) => o != 0)")
                    // console.log(asd.filter((o) => o != 0))
                    console.log("resultsss won amount",asd)

                    this.values.val_results = {...this.$refs.ref_getVoteScratchedNumberMulticall.theResult}
                    console.log("this.values.val_results",this.values.val_results.length)
                    alert(`multicall ready | ${Object.keys(this.values.val_results).length} tickets read`)
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
                    console.log("failed call", error)
                this.loadings.resultsMulticall = false
                }

                this.loadings.resultsMulticall = false
            },
        },
    }
</script>
