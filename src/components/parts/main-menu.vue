<template>
    <div  class="w-100 pos-fixed  " style="z-index: 1">

        <div class="flex-between flex-align-start show-md_x"> 



            <div class="flex-start show-md_x" >
                <a class="nodeco letter-s-3 noborder n-tx tx-md n-flat clickable flex-column"
                    href="https://thrue.gitbook.io/thrue/tutorials/examples"  target="_blank"
                    style="border-radius: 0 30px 30px 0"
                >
                    <span class="pa-2 opacity-hover-50">
                        <i class="mr-2 fas fa-external-link-alt"></i> Docs
                    </span>
                </a>
                <!-- 
                v-if="(current_sub_page != 'test' && !is_playing_test) || (current_sub_page == 'test' && !accs_length && !is_playing_test)"
                 -->
                 <!-- {{is_playing_test}} -->
                <!-- <a v-if="!accs_length && (current_sub_page != 'test' && !is_playing_test)"
                    @click="changeCurrentSubPage('test')"
                    class="nodeco  noborder n-tx tx-md n-flat  clickable flex-column"
                    style="border-radius: 0 30px 30px 0"
                >
                    <span class="pa-2 opacity-hover-50 tx-center tx-xs">
                        <i class="fas fa-toggle-on tx-xxl"></i>
                        <br>
                        <small class="">Play On-Chain </small>
                    </span>
                </a> -->
                <!-- !accs_length -->
                <a v-if="!is_playing_test && !accs_length"
                    @click="changeCurrentSubPage(current_sub_page == 'test' ? '' : 'test')"
                    class="nodeco  noborder n-tx tx-md n-flat clickable flex-column mt-3"
                    style="border-radius: 0 30px 30px 0"
                >
                    <span class=" pa-2 flex-center opacity-hover-50 tx-center flex-column tx-xs">
                        <i :class="current_sub_page != 'test' ? 'fa-toggle-on tx-success' : 'fa-toggle-off'" class="fas  tx-xxl"></i>
                        <br>
                        <small class="">{{current_sub_page != 'test' ? 'Play On-Chain' : 'Play Off-Chain' }}</small>
                    </span>
                </a>
<!-- 
                <div class="flex-row ma-2" >
                    <button class="noborder n-tx ma-2 tx-sm  clickable flex-center border-r-15 show-md_x"
                            :class="[!pro_mode ? 'n-conca' : 'n-inset']"
                            v-if="is_playing_test || accs_length"
                        @click="changeProMode"
                        style=""
                    >
                        <span class="pa-2 py-4  opacity-hover-50">
                            <i class="fas tx-sm" v-if="pro_mode" > <span> <i class="fas fa-times-circle"></i> PRO</span></i>
                            <i class="fas tx-sm"  v-else > <span> PRO</span></i>
                        </span>
                    </button>
                </div> -->

                <div class="flex-row flex-justify-start ma-2" >
                    <button class="noborder n-tx mr-2 tx-sm mb-0  clickable flex-center border-r-15 show-md_x"
                            :class="[!pause_mode ? 'n-conca' : 'n-inset']"
                            v-if="is_playing_test || accs_length"
                        @click="changePauseMode"
                        style=""
                    >
                        <span class="pa-2 py-4  opacity-hover-50">
                            <i class="fas tx-sm" v-if="pause_mode" >
                                <span>
                                    <!-- HELP -->
                                    <i class="fas tx-lg fa-cogs"></i>
                                </span>
                            </i>
                            <i class="fas px-1 tx-sm"  v-else > <span> <i class="fas fa-cog"></i></span></i>
                        </span>
                    </button>
                    <button class="noborder n-tx   tx-sm  clickable flex-center border-r-15 show-md_x"
                            :class="[!pro_mode ? 'n-conve' : 'n-inset']"
                            v-if="(is_playing_test || accs_length) && pause_mode"
                        @click="changeProMode" 
                        style=""
                    >
                        <span class="pa-2 py-4  opacity-hover-50">
                            <i class="fas tx-sm" v-if="pro_mode" >
                                <span class="flex-center">
                                    <i class="fas px-1 tx-lg fa-times-circle"></i><br>
                                    <span> Profile</span>
                                </span>
                            </i>
                            <i class="fas tx-sm"  v-else > <span> Profile</span></i>
                        </span>
                    </button>
                </div>
            </div>



            <div v-show="!pro_mode"> </div>




            <div class="flex-column-r flex-md_x-row flex-align-start" v-if="!accs_length && !is_playing_test">


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
                <!-- <div class="flex-row ma-2" >

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
                </div> -->

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
                        href="https://thrue.gitbook.io/thrue/tutorials/examples"  target="_blank"
                        style="border-radius: 0 30px 30px 0"
                    >

                        <span class="pa-2 opacity-hover-50 tx-sm">
                            <i class="mr-2 fas fa-external-link-alt tx-lg"></i> Docs
                        </span>
                    </a>
                </div>
            </div>
            <!-- <button class="noborder n-tx tx-md n-conca clickable flex-center border-r-15 show-xs_md tx-sm"
                @click="changeProMode"
                :class="[!pro_mode ? 'n-conca' : 'n-inset']"

                style=""
            >
                <small class="pa-2 py-3  opacity-hover-50">
                    <i class="fas tx-sm" v-if="pro_mode" > <small> PRO</small></i>
                    <i class="fas tx-sm" v-else > <small> PRO</small></i>
                </small>
            </button> -->
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
        <div class="flex-between flex-align-start n-flat  show-xs_md " v-show="togglers.menu"> 

                <a v-if="!is_playing_test && !accs_length"
                    @click="changeCurrentSubPage(current_sub_page == 'test' ? '' : 'test')"
                    class="nodeco  noborder n-tx tx-md n-flat clickable flex-column "
                    style="border-radius: 0 30px 30px 0"
                >
                    <span class=" pa-2 flex-center opacity-hover-50 tx-center flex-column tx-xs">
                        <i :class="current_sub_page != 'test' ? 'fa-toggle-on' : 'fa-toggle-off'" class="fas  tx-xxl"></i>
                        <br>
                        <small class="">{{current_sub_page != 'test' ? 'Play On-Chain' : 'Play Off-Chain' }}</small>
                    </span>
                </a>
        </div>

        <div class="flex-row flex-justify-end ma-2" >
            <button class="noborder n-tx ma-2 tx-sm  clickable flex-center border-r-15 show-xs_md"
                    :class="[!pro_mode ? 'n-conve' : 'n-inset underline']"
                    v-if="pause_mode && (is_playing_test || accs_length)"
                @click="changeProMode"
                style=""
            >
                    <!-- v-show="pro_mode" -->
                <span class="pa-2 py-4  opacity-hover-50">
                    <i class="fas tx-sm" v-if="pro_mode" > <span> <i class="fas fa-times-circle"></i> Close Profile</span></i>
                    <i class="fas tx-sm"  v-else > <span> Profile</span></i>
                </span>
            </button>
            <button class="noborder n-tx ma-2 tx-sm  clickable flex-center border-r-15 show-xs_md"
                    :class="[!pause_mode ? '' : 'n-inset']"
                    v-if="is_playing_test || accs_length"
                @click="changePauseMode"
                style=""
            >
                    <!-- v-show="pause_mode" -->
                <span class="pa-2 py-3  opacity-hover-50">
                    <i class="fas tx-sm" v-if="pause_mode" > <span> <i class="fas fa-times"></i> </span></i>
                    <i class="fas tx-sm"  v-else > <span> <i class="fas fa-cog"></i> </span></i>
                </span>
            </button>
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
            pause_mode()           { return this.$store.getters.pause_mode },
            pro_mode()             { return this.$store.getters.pro_mode },
            dark_mode()            { return this.$store.getters.dark_mode },
            auto_mode()            { return this.$store.getters.auto_mode },
            current_level()        { return this.$store.getters.current_level },
	        current_sub_page()     { return this.$store.getters.current_sub_page },
	        english_mode()         { return this.$store.getters.english_mode },
	        LANG()                 { return this.$store.getters.LANG },
	        first_acc()            { return this.$store.getters.first_acc },
	        accs_length()          { return this.$store.getters.accs_length },
            is_playing_test()      { return this.$store.getters.is_playing_test },
        },
        created() {
            let darkMode = JSON.parse(localStorage.getItem("darkMode"))
            let englishMode = JSON.parse(localStorage.getItem("englishMode"))
            let autoMode = JSON.parse(localStorage.getItem("autoMode"))
            let proMode = JSON.parse(localStorage.getItem("proMode"))
            let pauseMode = JSON.parse(localStorage.getItem("pauseMode"))
            let currentLevel = JSON.parse(localStorage.getItem("currentLevel"))
            let currentSubPage = JSON.parse(localStorage.getItem("currentSubPage"))

            if (darkMode != null) { this.$store.dispatch("setDarkMode", darkMode) }
            if (englishMode != null) { this.$store.dispatch("setEnglishMode", englishMode) }
            if (autoMode != null) { this.$store.dispatch("setAutoMode", autoMode) }
            if (proMode != null) { this.$store.dispatch("setProMode", proMode) }
            if (pauseMode != null) { this.$store.dispatch("setPauseMode", pauseMode) }
            if (currentLevel != null) { this.$store.dispatch("setCurrentLevel", currentLevel) }
            if (currentSubPage != null) { this.$store.dispatch("setCurrentSubPage", currentSubPage) }

            console.table({englishMode,darkMode,autoMode,proMode,pauseMode,currentLevel,currentSubPage})
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
            // changeCurrentLevel() {
            //     let newMode = this.current_level
            //     localStorage.setItem("currentLevel", JSON.stringify(newMode));
            //     this.$store.dispatch("setCurrentLevel", newMode)
            // },
            changeCurrentSubPage(_page) {
                localStorage.setItem("currentSubPage", JSON.stringify(_page));
                this.$store.dispatch("setCurrentSubPage", _page)
            },
            changePauseMode() {
                let newMode = !this.pause_mode
                localStorage.setItem("pauseMode", JSON.stringify(newMode));
                this.$store.dispatch("setPauseMode", newMode)
                // console.log("asd", newMode)
            },
        },
    }
</script>
