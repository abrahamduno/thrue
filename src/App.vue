<template>
    <div :class="!!dark_mode ? 'dark-theme' : 'light-theme'" class="main-body n-bg n-tx w-100">
        <main-menu  style="z-index: 99999" />
        <my-scene ref="scene" />
        <thrue ref="thrue" @animate="animate" />
    </div>
</template>
<script>
    import thrue from "./pages/thrue.vue";
    import MyScene from "./thrue/myScene.vue";
    
    import mainMenu from "./components/main-menu.vue";

    export default {
        name: 'App',    
        components: {
            mainMenu,
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