<template>
  <div >
  	<!-- asdasdasqwe
  	{{currentLevel}} -->

    <component ref="level" :is="currentLevel" v-bind="levelOne"></component>
  </div>
</template>
<script>
//Vue 3 is having a special function to define these async functions
import {defineAsyncComponent} from "vue"
// import {defineAsyncComponent} from "vue";
import levelOne from "./levels/level-one.vue"
import levelTwo from "./levels/level-two.vue"

const BASE_URL = "http://localhost:3000/";
const BASE_ASSET_URL = "./res";
export default {
  name: 'main-scene',  
  components: {
  	levelOne,
  	levelTwo,
  //   'level-one': () => import('./levels/level-one.vue'),
  },
  // computed: {
	 //  comp () {
	 //      return defineAsyncComponent(() => import(`./levels/level-one.vue`))
	 //  },
  // },
  data()
  {
    return {
      currentLevel: "levelOne",
    };
  },
};
</script>
