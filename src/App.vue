<template>
    <div :class="!!dark_mode ? 'dark-theme' : 'light-theme'" class="main-body n-bg n-tx w-100">
        <main-menu  style="z-index: 99999" />
        <main-scene ref="scene" />
        <main-dom ref="dom" @animate="animate" />
    </div>
</template>
<script>
    import MainMenu from "./components/parts/main-menu.vue";
    import MainDom from "./components/pages/MainDOM.vue";
    import MainScene from "./thrue/MainScene.vue";
    
    export default {
        name: 'App',    
        components: {
            MainMenu,
            MainDom,
            MainScene,
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