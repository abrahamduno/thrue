<template>
    <div class="">
        {{props.advanced ? "*" : ""}}
        <span v-if="!props.call_only" >
            <span v-if="!props.button_only" @click="toggleShowLess"
                :class="[!_valid ? 'opacity-75 tx-error' : 'n-tx-s tx-success']" class="clickable flex-row nowrap"
            >
                <div v-if="!!props.title" class="tx-xs "> {{props.title}} </div>
                <i v-if="loading"  class="tx-xs fa fa-file-signature shake-shake"></i>

            </span>
        </span>

        <div v-if="togglers.show_more" >

            <div v-if="togglers.advanced" class=" pa-2 mt-1 border-r-5">
                <div v-if="!props.abi"> Contract abi: </div>

                <div v-if="props.abi"  class="tx-sm">
                    <span>ABI functions: {{props.abi.length}}</span>
                </div>
                <div v-if="props.address" style="max-width: 200px;" class="tx-sm">
                    <span>Contract Address:</span>
                    <div class="py-2" style="overflow-x: scroll;"> <small class="tx-xs">{{props.address}}</small> </div>
                </div>
                <div v-if="props.function" class="tx-xs my-2">
                    <span>method:</span>
                    <small class="ml-2">{{props.function}}</small>
                </div>
            </div>

            <div v-if="!props.abi || !props.address || !props.function" class="flex-wrap mt-3  pa-2 mt-1 border-r-5">
                <div class="flex-center">
                    <input v-if="!props.abi" type="text" v-model="form.contractAbi"       
                        class=" tx-primary n-inset noborder pa-1 ma-3" placeholder="abi" style="max-width: 40px;"
                    >
                    <input v-if="!props.address" type="text" v-model="form.contractAddress"   
                        class=" tx-primary n-inset noborder pa-1 " placeholder="address" style="width: 120px"
                    >
                </div>
                <input v-if="!props.function" type="text" v-model="form.functionName"      
                    class=" tx-primary n-inset noborder pa-1 " placeholder="function" style="width: 80px"
                >
            </div>

        </div>
        
        <span v-if="props.call_only" class=" flex-column" >
            <div class="flex-row">
                <div v-if="!!props.title"  @click="toggleShowLess"
                    :class="[!_valid ? 'opacity-75 tx-error' : 'n-tx-s tx-success']" class="tx-xs clickable "
                >
                    {{props.title}}
                </div>
                <i v-if="loading" :class="[!_valid ? 'opacity-75 tx-error' : 'n-tx-s tx-success']"
                    class="fas fa-cloud-download-alt tx-xs hover-hover" ></i>
            </div>
            <div v-if="!props.title"> Response </div>
            <span v-if="!props.make_multicall && theResult" class="mx-2">{{_parsedResult}}</span>
            
            
        </span>

        <div v-if="togglers.show_more" >
            <div v-if="_formArgKeys.length && !props.button_only" class="flex-column n-flat pa-2 mt-1 border-r-5">
                <template v-for="arg in _formArgKeys">
                    
                    <div v-if="props.form_args[arg].type == 'address'" class="tx-xs ">
                        {{shortAddressSpaced(props.form_args[arg].value)}}
                    </div>
                    <div class="flex" v-if="true">
                        <b v-if="props.form_args[arg].type.substr(0,5) == 'range'" class="tx-xs "> R: </b>
                        <div v-if="togglers.advanced && props.form_args[arg].label" class="tx-xs "> {{props.form_args[arg].label}} </div>
                        <input type="text" v-model="props.form_args[arg].value"
                            style="width: 80px" 
                            :placeholder="props.form_args[arg].placeholder"
                            :class="[props.form_args[arg].type == 'address' ? 'tx-xs mb-2' : '']"
                            class=" tx-primary n-inset noborder pa-1 flex-1" 
                        >
                    </div>
                </template>
            </div>
        </div>

        <div v-if="togglers.show_more || !props.advanced && !togglers.show_more && props.button_only && !props.call_only " class=" pa-2 mt-1 border-r-5">

            <div class="pa-2 ma-2 mb-0 tx-sm flex" :class="[_valid ? 'n-flat opacity-hover-75 clickable border-r-15' : 'border-r-5 noclick nocursor n-flat-disabled']" @click="execute">
                <div v-if="loading">
                    <div v-if="props.call_only">
                        <i class="fas fa-cloud-download-alt hover-hover " :class="[!_valid ? 'opacity-75 tx-error' : 'n-tx-s tx-success']"></i>
                    </div>
                    <div v-if="!props.call_only" class="flex-column">
                        <i class="fas fa-file-signature shake-shake tx-secondary"></i>
                        <span v-if="!props.advanced && !togglers.show_more && props.button_only" class="tx-xs">
                            {{props.title}}
                        </span>
                    </div>
                </div>
                <div v-if="!loading">
                    <span v-if="props.call_only">
                        <span v-if="!props.button_only">get</span>
                        <span v-if="props.button_only"><i class="fa fa-redo"></i></span>
                    </span>
                    <span v-if="!props.call_only">
                        <span v-if="props.button_only"
                            :class="[!_valid ? 'opacity-75 tx-error' : 'n-tx-s tx-success']"
                            class=" flex nowrap"
                        >
                            <div v-if="!!props.title" class="tx-xs" >
                                {{props.title}}
                            </div>
                            <i v-if="loading">loading adv show args</i>
                        </span>
                        <span v-if="!props.button_only">
                            <div v-if="!!props.title" class="tx-xs"> send </div>
                        </span>
                    </span>
                </div>
            </div>

            <div  v-if="props.advanced" class="flex-center">
                <span @click="toggleAdvanced" class=" clickable letter-s-3  opacity-hover-50 tx-center pa-2 flex tx-xs">
                    <span v-if="!togglers.advanced" class="tx-tertiary">Show more</span>
                    <span v-if="togglers.advanced" class="tx-sm opacity-50">Show less</span>
                </span>
            </div>

        </div>
    </div>
</template>
<script>
    import { ethers, Contract }  from 'ethers';
    import { ABIS, CURRENT_NETWORK } from '../store/constants/index';
    import { parseDecimals, ERROR_HELPER, shortAddress, shortAddressSpaced } from '../store/helpers';

    import {
      Multicall,
    } from 'ethereum-multicall';

	export default {   
        name: 'tx-maker',     
        props: ["props"],
        data()
        {
            return {
                ABIS,
                CURRENT_NETWORK,

                loading: false,
                loadings: {},

                theResult: null,

                togglers: {
                    advanced: false,
                    contractAbiAdvanced: false,
                    hideFilledArgs: false,
                    show_more: false,
                },
                theAllowanceNumber: "",
                form: {
                    tokenOfallowance: "",
                    allowanceAddress: "",
                    poolLpInputs: {},
                    newFarm: "",
                    newFarmAlloc: "",

                    contractAbi: "",
                    contractAddress: "",
                    functionName: "",

                    arg1: "",
                    arg2: "",
                    arg3: "",

                    args: {},
                },
            }
        },
	    computed: {
            LANG()                  { return this.$store.getters.LANG },
            first_acc()             { return this.$store.getters.first_acc },

            _formArgKeys()          { return Object.keys(this.form.args) },
            _valid()
            {
                if (this.loading) return false
                for (var i = 0; i < this._formArgKeys.length; i++) {
                    if (!this.form.args[i].value || this.form.args[i].value == "") return false
                }
                return true
            },
            _parsedArgs()
            {
                let args = []
                for (var i = 0; i < this._formArgKeys.length; i++) {
                    if (this.form.args[i].type == "uint256")
                    {
                        args.push(ethers.utils.parseEther(parseFloat(this.form.args[i].value).toFixed(17)))
                    } else {
                        args.push(this.form.args[i].value)
                    }
                }
                return args
            },
            _parsedResult()
            {
                if (this.props.make_multicall) return {}
                    
                let altResult = { ...this.theResult }
                let altResType = this.props.res_type

                if (this.props.res_type.indexOf("struct") >= 0)
                {
                    if (this.props.DEBUG) { console.log(`found a struct`, altResult) }
                    altResult = {...this.theResult[this.props.res_type.split(".")[1]]}
                    altResType = this.props.res_type.split(".")[2]
                    if (this.props.DEBUG)
                    {
                        console.log(`getting ${this.props.res_type.split(".")[1]} | type ${altResType}`)
                    }
                }
                if (altResType == "uint256")
                {
                    return parseDecimals(parseFloat(ethers.utils.formatEther(altResult)))
                }
                if (altResType == "uint")
                {
                    // console.log("typeoffffff altResult", typeof altResult, altResult)
                    if (altResult._isBigNumber)
                    {
                        return parseInt(10**18*parseFloat(ethers.utils.formatEther(altResult).toString()))
                    } else {
                        return parseInt(10**18*parseFloat(ethers.utils.formatEther(altResult[0]).toString()))
                    }
                }
                if (altResType == "address")
                {
                    // if (this.props.DEBUG) { console.log(`found an address`, altResult) }
                    return this.theResult
                }
                if (altResType == "word")
                {
                    // if (this.props.DEBUG) { console.log(`found an address`, altResult) }
                    console.log(altResult, "ethers.utils.formatEther(altResult) % 1443", parseFloat(ethers.utils.formatEther(altResult)) % 1443)
                    console.log(ethers.utils.parseEther(ethers.utils.formatEther(altResult).toString()).mod(1443).toString())
                    console.log(ethers.utils.parseEther(ethers.utils.formatEther(altResult).toString()).mod(1443).toString())
                    return ethers.utils.formatEther(altResult) % 1443
                }
                if (altResType == "timestamp")
                {
                    if (this.props.DEBUG)
                    {
                        console.table(
                            {
                                timestamp: ethers.utils.formatEther(altResult),
                                int: parseInt(10**18*parseFloat(ethers.utils.formatEther(altResult).toString())),

                                res: this.formatDate(new Date(1000*parseInt(10**18*parseFloat(ethers.utils.formatEther(altResult).toString())))),
                                // res: new Date(1000*parseInt(10**18*parseFloat(ethers.utils.formatEther(altResult).toString()))).toLocaleString("en-US"),
                            }
                        )
                    }
                    let resssult = this.formatDate(new Date(1000*parseInt(10**18*parseFloat(ethers.utils.formatEther(altResult).toString()))))
                    return `${resssult[5]} ${resssult[2]}, ${resssult[3]}:${resssult[4]} - ${resssult[6]} ${resssult[0]}`
                }

                return altResult
            },
		},
        mounted()
        {
            this.form.contractAbi = this.props.abi ? this.props.abi : [this.form.contractAbi]
            this.form.contractAddress = this.props.address ? this.props.address : ""
            this.form.functionName = this.props.function ? this.props.function : ""
            this.form.args = {...this.props.form_args}
        },
		methods: {
            shortAddress,
            shortAddressSpaced,
            parseDecimals,

            formatDate(date = new Date()) {
              return [
                date.getFullYear(),
                this.padTo2Digits(date.getMonth() + 1),
                this.padTo2Digits(date.getDate()),
                this.padTo2Digits(date.getHours()),
                this.padTo2Digits(date.getMinutes()),
                ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()],
                ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][date.getMonth()],
              ];
            },
            padTo2Digits(num) {
              return num.toString().padStart(2, '0');
            },

            parseMultiArg(_arg, _index, _ref = [])
            {
                console.log("parseMultiArg",_arg, _index, )
                let newArgs = []

                if (_arg.type.split(":")[1] == "uint")
                {
                    let initIndex = parseInt(_arg.value.split(",")[0])
                    let maxIndex = parseInt(_arg.value.split(",")[1])
                    for (var i = initIndex - 1; i < maxIndex; i++)
                    {
                        console.log("initIndex", initIndex, i)
                        newArgs.push(i + 1)
                    }
                }

                return newArgs
            },

            toggleShowLess()
            {
                // console.log("this.togglers.show_more", this.togglers.show_more)
                this.togglers.show_more = !this.togglers.show_more
                // console.log("this.togglers.show_more", this.togglers.show_more)
                if (this.togglers.show_more)
                {
                    if (this._valid) this.execute()
                }
            },

            toggleAdvanced()
            {
                this.togglers.advanced = !this.togglers.advanced
                // if (this.togglers.advanced)
                // {
                //     this.getFarmsData()
                // }
            },
            toggleAbiAdvanced()
            {
                this.togglers.contractAbiAdvanced = !this.togglers.contractAbiAdvanced
            },
            async execute()
            {
                let txArgs = this._parsedArgs
                if (this.props.make_multicall) return this.executeMulticall(txArgs)

                if (this.loading) return
                this.loading = true

                let result = await new Promise(async (resolve, reject) => {
                    try
                    {
                        if (this.props.call_only)
                        {
                            this.theResult = await this.call(txArgs)
                        } else {
                            this.theResult = await this.tx(txArgs)
                        }
                        resolve(this.theResult)
                    } catch (error)
                    {
                        console.log("catched executing (error)")
                        if (this.props.DEBUG) { console.log(error) }
                            reject(error)
                    }
                })

                this.loading = false

                return result
            },
            async executeMulticall(_args)
            {
                console.log("executeMulticall")

                if (this.loading) return
                this.loading = true

                // this._formArgKeys
                let result = await new Promise(async (resolve, reject) => {

                    let rangeVariable = 0
                    // let newArgs = [...this._parsedArgs]

                    for (var i = 0; i < this._formArgKeys.length; i++)
                    {
                        console.log("looking for  range")
                        if (this.form.args[i].type.substr(0,5) == "range")
                        {
                            console.log("found range")
                            // rangeVariable = i
                            let argList = this.parseMultiArg(this.form.args[i], i)
                            console.log("argList")
                            console.log(argList)
                            this.loading = false
                            // newArgs[i] = theNewArg

                            try
                            {
                                if (this.props.call_only)
                                {
                                    this.theResult = await this.multiTx(_args, i, argList)
                                    // this.theResult = await this.call(newArgs)
                                } else {
                                    this.theResult = await this.multiTx(_args, i, argList)

                                }
                                // console.log("theResult", this.theResult)
                                resolve(this.theResult)
                            } catch (error)
                            {
                                console.log("catched executing (error)")
                                if (this.props.DEBUG) { console.log(error) }
                            }
                        }
                    }
                })

                this.loading = false

                return result
            },
            async tx(_args)
            {
                if (!this.first_acc) return

                let firstAddress = this.first_acc.address
                const BLOCKCHAIN = this.$store.getters.newProvider
                const USER_WALLET = await BLOCKCHAIN.getSigner()
                // console.log("contractAddress",  this.form.contractAddress)
                const theContract = new Contract(this.form.contractAddress, this.form.contractAbi, USER_WALLET)

                return new Promise(async (resolve, reject) => {
                    try {
                        let response = {}

                        // console.log ("this._parsedArgs")
                        // console.log (this._parsedArgs)
                        let aTx = await theContract[this.form.functionName].apply(this, _args)
                        let aResult = await aTx.wait()
                        resolve(aResult)
                    } catch (error)
                    {
                        reject(error)
                    }
                })
            },
            async multiTx(_args, index, _ref = [])
            {
                if (!this.first_acc) return
                return new Promise(async (resolve, reject) => {

                    let firstAddress = this.first_acc.address
                    const BLOCKCHAIN = this.$store.getters.newProvider
                    const USER_WALLET = await BLOCKCHAIN.getSigner()
                    // console.log("contractAddress",  this.form.contractAddress)
                    const theContract = new Contract(this.form.contractAddress, this.form.contractAbi, USER_WALLET)


                    const multicall = new Multicall({
                        multicallCustomContractAddress: CURRENT_NETWORK.MULTICALL_ADDRESS, 
                        ethersProvider: BLOCKCHAIN,
                        tryAggregate: true
                    });
                    let contractCallContext = [
                        {
                            reference: 'testContract',
                            contractAddress: this.form.contractAddress,
                            abi: this.form.contractAbi,
                            calls: []
                        }
                    ]

                    // console.log("args", _args);
                    for (var i = 0; i < _ref.length; i++)
                    {
                        let newArgs = [..._args]
                        newArgs[index] = _ref[i]
                        contractCallContext[0].calls.push(
                            {
                                reference: 'fooCall',
                                methodName: this.form.functionName,
                                methodParameters: newArgs ,
                            }
                        )
                    }

                    // console.log("multiTx args", _args, contractCallContext);
                    // return

                    console.log("await multicall.call(contractCallContext", contractCallContext);
                    const results = await multicall.call(contractCallContext);
                    console.log("results", results);
                    console.log("results.testContract", results.results["testContract"]);
                    let mappedResult = results.results["testContract"].callsReturnContext.map(item => {
                        let altResType = this.props.res_type
                        // console.log("altResType", altResType)
                        if (altResType == "uint256")
                        {
                            return parseDecimals(parseFloat(ethers.utils.formatEther(item.returnValues[0])))
                        }
                        if (altResType == "uint")
                        {
                            // console.log("************* ", item.returnValues[0], ethers.utils.formatEther(item.returnValues[0]))
                            return parseInt(10**18*parseFloat(ethers.utils.formatEther(item.returnValues[0]).toString()))
                        }
                        if (altResType == "address")
                        {
                            return item.returnValues[0]
                        }
                        return item.returnValues[0]
                    })
                    console.log("mapped results", mappedResult)
                    resolve(mappedResult)
                    return mappedResult
                })

                // return new Promise(async (resolve, reject) => {
                //     try {
                //         let response = {}

                //         let aTx = await theContract[this.form.functionName].apply(this, _args)
                //         let aResult = await aTx.wait()
                //         resolve(aResult)
                //     } catch (error)
                //     {
                //         reject(error)
                //     }
                // })
            },
            async call(_args)
            {
                if (!this.first_acc) return

                let firstAddress = this.first_acc.address
                const BLOCKCHAIN = this.$store.getters.newProvider
                // console.log(this.form.functionName, this.form.contractAddress, this.form.contractAbi, BLOCKCHAIN)

                const theContract = new Contract(this.form.contractAddress, this.form.contractAbi, BLOCKCHAIN)
                // if (this.props.DEBUG) { console.table(this.form.contractAbi) }

                return new Promise(async (resolve, reject) => {
                    try {
                        if (this.props.DEBUG) { console.log(`calling ${this.form.functionName} | args:`, _args) }
                        let aTx = await theContract[this.form.functionName].apply(this, _args)
                        resolve(aTx)
                    } catch (error)
                    {
                        reject(error)
                    }
                })
            },
            
		},
	}
</script>
