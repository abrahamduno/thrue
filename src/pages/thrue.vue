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
    <div class="pos-absolute" style="color: white; z-index: 999;">

        <div class="hidden block grid-column-12" style="height: 3800px;"> . </div>

        <aboutUs />

        <liftOff />

        <ourCeo />

        <ourTeam />

        <ourWork />

        <whereAreWe />
        
        <h1>
            Test
        </h1>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Harum modi consectetur animi hic dolore officiis ea nostrum
            exercitationem perferendis minima, consequatur fuga praesentium
            veritatis deserunt et suscipit incidunt nam error.
        </p>

        <h1>
            Test 2
        </h1>

        <h1 style="height: 900px">
            Test 2
        </h1>
        <ol>
            <li class="pa-4 clickable" @click="setKey(1)">one</li>
            <li class="pa-4 clickable" @click="setKey(2)">two</li>
            <li class="pa-4 clickable" @click="setKey(3)">thre</li>
            <li class="pa-4 clickable" @click="setKey(4)">four</li>
        </ol>
        <h1>
            {{selectedKey}}
        </h1>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Harum modi consectetur animi hic dolore officiis ea nostrum
            exercitationem perferendis minima, consequatur fuga praesentium
            veritatis deserunt et suscipit incidunt nam error.
        </p>


    </div>
</template>

                        

<script>
    // import {
    //   Multicall,
    // } from 'ethereum-multicall';
    // import { ethers } from 'ethers';

    // import { ABIS, CURRENT_NETWORK } from '../store/constants';
    // import { parseDecimals, ERROR_HELPER, shortAddress, shortAddressSpaced } from '../store/helpers';
    
    // import txCard from "../components/tx-card.vue";
    // import lottoResults from "./lotto/lotto-results.vue";
    // import lottoSettings from "./lotto/lotto-settings.vue";
    // import lottoBottomMenu from "./lotto/lotto-bottom-menu.vue";
    // import lottoMyAccount from "./lotto/lotto-my-account.vue";
    // import lottoCurrentTicket from "./lotto/lotto-current-ticket.vue";
    
    import aboutUs from "../res/vue/about-us.vue";
    import liftOff from "../res/vue/lift-off.vue";
    import ourCeo from "../res/vue/our-ceo.vue";
    import ourTeam from "../res/vue/our-team.vue";
    import ourWork from "../res/vue/our-work.vue";
    import whereAreWe from "../res/vue/where-are-we.vue";


    export default {
        name: 'lotto',     
        components: {
            aboutUs,
            liftOff,
            ourCeo,
            ourTeam,
            ourWork,
            whereAreWe,

            // lottoResults,
            // lottoSettings,
            // lottoBottomMenu,
            // lottoMyAccount,
            // lottoCurrentRound,
            // lottoCurrentTicket,
        },
        data() {
            return {
                selectedKey: null,
            };
        }, 
        computed: {
            // LANG()                  { return this.$store.getters.LANG },
            // accs_length()           { return this.$store.getters.accs_length },
            // first_acc()             { return this.$store.getters.first_acc },
            // dark_mode()             { return this.$store.getters.dark_mode },
            // pro_mode()              { return this.$store.getters.pro_mode },
            // current_sub_page()      { return this.$store.getters.current_sub_page },

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
            setKey(newKey)
            {
                this.selectedKey = newKey
            },
        },
    }
</script>


