<template>
<div>

    <div class="flex-column ">
        <tx-card ref="addTargetAllowance" :props="forms.addTargetAllowance" />
    </div>


    <div class="flex-column " v-if='current_sub_page == "owner"'>
        <tx-card :props="forms.createProposal" />
        <hr class="w-50 opacity-10">
        <tx-card :props="forms.executeProposal" />
        <tx-card :props="forms.requestResolveRound" />
        <tx-card :props="forms.resolveBet" />
        <tx-card :props="forms.withdrawFromProposal" />
        <tx-card :props="forms.withdrawBalance" />
        <hr class="w-50 opacity-10">
        <tx-card :props="forms.transferOwnership"/>
        <tx-card :props="forms.setRequester" />
        <tx-card :props="forms.setLotto" />
    </div>

</div>
</template>
<script>
    import { ABIS, CURRENT_NETWORK } from '../../store/constants';
    import { parseDecimals, ERROR_HELPER, shortAddress, shortAddressSpaced } from '../../store/helpers';

    import txCard from "../../components/tx-card.vue";

    export default {
        name: 'lotto-settings',   
        components: {
            txCard,
        },
        data() {
            return {
                CURRENT_NETWORK,
                ABIS,

                loading: false,
                loadings: {
                },
                togglers: {
                },
                forms: {
                    transferOwnership: {
                        title: 'transferOwnership to dao',
                        abi: ABIS.LOTTO,
                        address: CURRENT_NETWORK.LOTTO_ADDRESS,
                        function: 'transferOwnership',
                        res_type: 'uint256',
                        form_args: {                        
                            "0": {
                                placeholder:"",label:`value: CURRENT_NETWORK.DAO_ADDRESS`,
                                value: CURRENT_NETWORK.DAO_ADDRESS, type: "address"
                            },
                        },
                    },
                    addTargetAllowance: {
                        title: 'Sign DAO Contract',
                        abi: ABIS.ERC20,
                        address: CURRENT_NETWORK.BASE_USD_ADDRESS,
                        function: 'approve',
                        res_type: 'uint256',
                        form_args:  {
                            "0": {placeholder:"",label:`value: CURRENT_NETWORK.DAO_ADDRESS`,value: CURRENT_NETWORK.DAO_ADDRESS, type: "address" },
                            
                            "1": {placeholder:"amount",label:`value: '',`,value: '', type: "uint256" },
                        },
                    },
                    createProposal: {
                        title: 'Make a proposal',
                        abi: ABIS.DAO,
                        address: CURRENT_NETWORK.DAO_ADDRESS,
                        function: 'createProposal',
                        form_args: {
                            "0": { placeholder: "Votes", value: "", type: "uint" },
                            "1": { placeholder: "Deadline", value: "", type: "uint" },
                        },
                    },

                    executeProposal: {
                        title: 'execute proposal',
                        abi: ABIS.DAO,
                        address: CURRENT_NETWORK.DAO_ADDRESS,
                        function: 'executeProposal',
                        form_args: {
                            "0": {placeholder:"",label:`value: "",`,value: "", type: "uint" },
                        },
                    },
                    resolveBet: {
                        title: 'resolveBet',
                        abi: ABIS.LOTTO,
                        address: CURRENT_NETWORK.LOTTO_ADDRESS,
                        function: 'resolveBet',
                        form_args: {
                            "0": {placeholder:"",label:`value: "",`,value: "", type: "uint" },
                        },
                    },
                    requestResolveRound: {
                        title: 'requestResolveRound',
                        abi: ABIS.LOTTO,
                        address: CURRENT_NETWORK.LOTTO_ADDRESS,
                        function: 'requestResolveRound',
                        form_args: {
                            "0": {placeholder:"",label:`value: "",`,value: "", type: "uint" },
                        },
                    },
                    withdrawFromProposal: {
                        title: 'Withdraw from failed Proposal',
                        abi: ABIS.DAO,
                        address: CURRENT_NETWORK.DAO_ADDRESS,
                        function: 'withdrawFromFailedProposal',
                        form_args: {
                            "0": {placeholder:"",label:`value: "",`,value: "", type: "uint" },
                        },
                    },
                    withdrawBalance: {
                        title: 'Withdraw all erc20 balance',
                        abi: ABIS.DAO,
                        address: CURRENT_NETWORK.DAO_ADDRESS,
                        function: 'withdrawBalance',
                        form_args: {
                        },
                    },
                    setRequester: {            
                        title: 'set Requester',
                        abi: ABIS.RESOLVER,
                        address: CURRENT_NETWORK.RESOLVER_ADDRESS,
                        function: 'setRequester',            
                        form_args: {
                            "0": {placeholder:"",label:`value: `,value: CURRENT_NETWORK.LOTTO_ADDRESS, type: "address" },
                        },
                    },
                    setLotto: {    
                        title: 'set Lotto',
                        abi: ABIS.DAO,
                        address: CURRENT_NETWORK.DAO_ADDRESS,
                        function: 'setLotto',                    
                        form_args: {
                            "0": {placeholder:"",label:`value:.LOTTO_ADDRESS`,value: CURRENT_NETWORK.LOTTO_ADDRESS, type: "address" },
                        },
                    },
                },  
                values: {
                },  
            }
        },
        computed: {
            LANG()                  { return this.$store.getters.LANG },
            first_acc()             { return this.$store.getters.first_acc },
            pro_mode()              { return this.$store.getters.pro_mode },
            dark_mode()             { return this.$store.getters.dark_mode },
            current_sub_page()      { return this.$store.getters.current_sub_page },
        },
        async mounted()
        {
        },
        methods: {
            parseDecimals,
            shortAddress,
        },
    }
</script>
