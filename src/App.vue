<template>
    <!-- <div :class="!!dark_mode ? 'dark-theme' : 'light-theme'" class="main-body n-bg n-tx w-100">
        <waves-frame />
        <main-menu />
        
        <div class="block py-8"></div>

        <home-page v-if="is_metaMask" />
        <div v-else> <h1>Please, install or login Metamask.</h1> </div>

        <div class="show-xs_md block py-8"></div>
    </div> -->
    <div :class="!!dark_mode ? 'dark-theme' : 'light-theme'" class="main-body n-bg n-tx w-100">
        <main-menu  style="z-index: 99999" />
        <my-scene ref="scene" />
        <connect />
        <thrue ref="thrue" @animate="animate" />
    </div>
</template>
<script>
    import thrue from "./pages/thrue.vue";
    import connect from "./pages/connect-orb.vue";
    import MyScene from "./res/vue/myScene.vue";
    // import homePage from "./pages/home-page.vue";
    
    import mainMenu from "./components/main-menu.vue";
    // import wavesFrame from './components/waves-frame.vue';

    export default {
        name: 'App',    
        components: {
            connect,
            // homePage,

            mainMenu,
            // wavesFrame,

            thrue,
            MyScene,
        },
        computed: {
            dark_mode()     { return this.$store.getters.dark_mode },
            is_metaMask()   { return this.$store.getters.is_metaMask },
        }, 
        methods: {
            animate()
            {
                this.$refs.scene._animate()
            },
        }, 
    }
</script>

<style>
</style>