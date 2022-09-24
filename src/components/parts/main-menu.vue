<template>
    <div  class="w-100 pos-fixed z-999">

        <div class="flex-between flex-align-start show-md_x"> 



            <div class="flex-start show-md_x" >
                <a class="nodeco letter-s-3 noborder n-tx tx-md n-flat clickable flex-column"
                    href="https://gamearteesan.gitbook.io/arteesan/"  target="_blank"
                    style="border-radius: 0 30px 30px 0"
                >
                    <span class="px-5 pb-4 pt-3 opacity-hover-50">
                        <i class="mr-2 fas fa-external-link-alt"></i> Docs
                    </span>
                </a>

                <div class="flex-row ma-2" >
                    <button class="noborder n-tx ma-2 tx-sm  clickable flex-center border-r-15 show-md_x"
                            :class="[!pro_mode ? 'n-conca' : 'n-inset']"
                        @click="changeProMode"
                        style=""
                    >
                            <!-- v-show="pro_mode" -->
                        <span class="pa-2 py-4  opacity-hover-50">
                            <i class="fas tx-sm" v-if="pro_mode" > <span> <i class="fas fa-times-circle"></i> PRO</span></i>
                            <i class="fas tx-sm"  v-else > <span> PRO</span></i>
                        </span>
                    </button>
                </div>
            </div>



            <div v-show="!pro_mode"> </div>




            <div class="flex-column-r flex-md_x-row flex-align-start" >


                <div class="flex-row ma-2" >
                    <!-- <button class="noborder n-tx ma-2 tx-sm  clickable flex-center border-r-15 show-md_x"
                            :class="[!pro_mode ? 'n-conca' : 'n-inset']"
                            v-show="!pro_mode"
                        @click="changeProMode"
                        style=""
                    >
                        <span class="pa-2 py-4  opacity-hover-50">
                            <i class="fas tx-sm" v-if="pro_mode" > <span> PRO</span></i>
                            <i class="fas tx-sm"  v-else > <span> PRO</span></i>
                        </span>
                    </button> -->

                    <button class="noborder n-tx ma-2 tx-sm  clickable flex-center border-r-15 show-md_x"
                            :class="[!auto_mode ? 'n-conca' : 'n-inset']"
                        @click="changeAutoMode"
                        style=""
                    >
                        <span class="pa-2 py-3  opacity-hover-50">
                            <i class="fas tx-sm" v-if="auto_mode" > <small> <i class="fas fa-times-circle"></i> auto</small></i>
                            <i class="fas tx-sm"  v-else > <small> auto</small></i>
                        </span>
                    </button>
                </div>

                <button class="noborder n-tx tx-sm n-conca clickable flex-center border-r-15 mt-3 mr-3"
                    @click="changeNightMode"
                >
                    <span class="pa-3 opacity-hover-50">
                        <i class="fas fa-moon icon-moon" v-if="dark_mode" ></i>
                        <i class="fas fa-sun icon-sun" v-else ></i>
                    </span>
                </button>
                <button class="noborder n-tx tx-md n-conca clickable flex-center"
                    @click="changeEnglishMode"
                    style="border-radius: 0 0 0 40px"
                >
                    <span class="pa-2 py-4  opacity-hover-50">
                        <i class="fas fa-globe" v-if="english_mode" > <span> EN</span></i>
                        <i class="fas fa-globe-americas" v-else > <span> ES</span></i>
                    </span>
                </button>
            </div>
        </div>



        <div @click="toggleMenu"
            style=""
            class="show-xs_md flex-between flex-align-start clickable b-flat"
            :class="[togglers.menu ? 'n-conca' : 'n-conve']"
        >  
            <div class="px-5 pb-4 pt-3 flex-center">
                <i class="mr-2 fas tx-lg" :class="[!togglers.menu ? 'fa-bars' : 'fa-times']"></i>
                <span class="tx-ls-3 pl-1"></span>
            </div>
        </div>


        <div class="flex-between flex-align-start n-inset py-2 px-2 show-xs_md " v-show="togglers.menu"> 
            <div class="flex-column tx-xs" >
                <div class="flex mb-4">
                    <social-media />
                </div>
                <div>
                    <a class="nodeco letter-s-3 noborder n-tx tx-md n-flat clickable flex-column"
                        href="https://gamearteesan.gitbook.io/arteesan/"  target="_blank"
                        style="border-radius: 0 30px 30px 0"
                    >

                        <span class="px-5 pb-4 pt-3 opacity-hover-50 tx-sm">
                            <i class="mr-2 fas fa-external-link-alt tx-lg"></i> Docs
                        </span>
                    </a>
                </div>
            </div>
            <button class="noborder n-tx tx-md n-conca clickable flex-center border-r-15 show-xs_md tx-sm"
                @click="changeProMode"
                :class="[!pro_mode ? 'n-conca' : 'n-inset']"

                style=""
            >
                <small class="pa-2 py-3  opacity-hover-50">
                    <i class="fas tx-sm" v-if="pro_mode" > <small> PRO</small></i>
                    <i class="fas tx-sm" v-else > <small> PRO</small></i>
                </small>
            </button>
            <button class="noborder n-tx tx-md n-conca clickable flex-center border-r-15 show-xs_md tx-sm"
                v-if="pro_mode"
                        :class="[!auto_mode ? 'n-conca' : 'n-inset']"
                @click="changeAutoMode"
                style=""
            >
                <small class="pa-2 py-3  opacity-hover-50">
                    <i class="fas tx-sm" v-if="auto_mode" > <small> auto</small></i>
                    <i class="fas tx-sm" v-else > <small> auto</small></i>
                </small>
            </button>
            <div class="flex-column-r flex-md_x-row flex-align-start">
                <button class="noborder n-tx tx-sm n-conca clickable flex-center border-r-15 mt-3 mr-3"
                    @click="changeNightMode"
                >
                    <span class="pa-3 opacity-hover-50">
                        <i class="fas fa-moon icon-moon" v-if="dark_mode" ></i>
                        <i class="fas fa-sun icon-sun" v-else ></i>
                    </span>
                </button>
                <button class="noborder n-tx tx-md n-conca clickable flex-center"
                    @click="changeEnglishMode"
                    style="border-radius: 0 0 0 40px"
                >
                    <span class="pa-2 py-4  opacity-hover-50">
                        <i class="fas fa-globe" v-if="english_mode" > <span> EN</span></i>
                        <i class="fas fa-globe-americas" v-else > <span> ES</span></i>
                    </span>
                </button>
            </div>
        </div>

        <div class="flex-between flex-align-start n-flat py-2 show-xs_md" v-show="togglers.menu"> 
        </div>



    </div>
</template>
<script>
    import socialMedia from './social-media.vue';
    export default {
        name: 'main-menu',    
        components: {
            socialMedia, 
        },
        data()
        {
            return {
                togglers: {
                    menu: false,
                },
            }
        },
        computed: {
            pro_mode()             { return this.$store.getters.pro_mode },
            dark_mode()            { return this.$store.getters.dark_mode },
	        auto_mode()            { return this.$store.getters.auto_mode },
	        english_mode()         { return this.$store.getters.english_mode },
	        LANG()                 { return this.$store.getters.LANG },
	        first_acc()            { return this.$store.getters.first_acc },
	        accs_length()          { return this.$store.getters.accs_length },
            is_playing_test()          { return this.$store.getters.is_playing_test },
        },
        created() {
            let autoMode = JSON.parse(localStorage.getItem("autoMode"))
            let proMode = JSON.parse(localStorage.getItem("proMode"))
            // console.log(proMode)
            let darkMode = JSON.parse(localStorage.getItem("darkMode"))
            // console.log(darkMode)
            let englishMode = JSON.parse(localStorage.getItem("englishMode"))
            // console.log(englishMode)
            if (autoMode != null) { this.$store.dispatch("setAutoMode", autoMode) }
            if (proMode != null) { this.$store.dispatch("setProMode", proMode) }
            if (darkMode != null) { this.$store.dispatch("setDarkMode", darkMode) }
            if (englishMode != null) { this.$store.dispatch("setEnglishMode", englishMode) }
            console.table({englishMode,proMode,darkMode})
        },
        methods: {
            toggleMenu() {
                this.togglers.menu = !this.togglers.menu
            },
            changeAutoMode() {
                let newMode = !this.auto_mode
                localStorage.setItem("autoMode", JSON.stringify(newMode));
                this.$store.dispatch("setAutoMode", newMode)
            },
            changeProMode() {
                let newMode = !this.pro_mode
                localStorage.setItem("proMode", JSON.stringify(newMode));
                this.$store.dispatch("setProMode", newMode)
            },
            changeNightMode() {
                let newMode = !this.dark_mode
                localStorage.setItem("darkMode", JSON.stringify(newMode));
                this.$store.dispatch("setDarkMode", newMode)
            },
            changeEnglishMode() {
                let newMode = !this.english_mode
                localStorage.setItem("englishMode", JSON.stringify(newMode));
                this.$store.dispatch("setEnglishMode", newMode)
            },
        },
    }
</script>
