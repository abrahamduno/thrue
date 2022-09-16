<template>
    <div>
        <div class="py-4 my-4 show-xs_lg"></div>
        <footer class="flex-between ">
            <div></div>
            <div class="flex-column" style="z-index: 99" >
                <div class="n-inset w-100 tx-center py-2 border-r-t-15 tx-ls-3" style="transform: translateY(5px);">arteesan</div>
                <div class="flex-row"> <social-media  /> </div>
            </div>
            <div></div>
        </footer>
        <div class="py-4"></div>
    </div>
</template>
<script>
    import socialMedia from './social-media.vue';

    export default {
        name: 'custom-footer',    
        components: {
            socialMedia,
        },
    }
</script>
