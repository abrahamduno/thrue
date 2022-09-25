<template>
  <div >
    <component ref="level" :is="getterLevel" v-bind="levelOne"></component>
  </div>
</template>
<script>
import levelOne from "./levels/level-one.vue"
import levelTwo from "./levels/level-two.vue"

const BASE_URL = "http://localhost:3000/";
const BASE_ASSET_URL = "./res";
export default {
  name: 'main-scene',  
  components: {
  	levelOne,
  	levelTwo,
  },
  computed: {
	  getterLevel () {
	      return this.$store.getters.current_level
	  },
  },
  data()
  {
    return {
      currentLevel: "levelOne",
    };
  },
};
</script>
