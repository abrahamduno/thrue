<template>
    <!-- <div :class="!!dark_mode ? 'dark-theme' : 'light-theme'" class="main-body n-bg n-tx w-100">
        <waves-frame />
        <main-menu />
        
        <div class="block py-8"></div>

        <home-page v-if="is_metaMask" />
        <div v-else> <h1>Please, install or login Metamask.</h1> </div>

        <div class="show-xs_md block py-8"></div>
    </div> -->
    <div>
        <thrue @animate="animate" />
        <my-scene ref="scene" />
    </div>
</template>
<script>
    import thrue from "./pages/thrue.vue";
    import MyScene from "./res/js/myScene.vue";
    // import homePage from "./pages/home-page.vue";
    
    // import mainMenu from "./components/main-menu.vue";
    // import wavesFrame from './components/waves-frame.vue';

    export default {
        name: 'App',    
        components: {
            // homePage,
            // homePage,

            // mainMenu,
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