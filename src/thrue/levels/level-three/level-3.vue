<template>
  <div >
    <canvas ref="canvas" id="canvas" class="w-100 pos-fixed main-wrap"> </canvas>
    <h1 v-if="enable_help == 1 && show_help" style="z-index: 999999; background: #ffffff44" 
      @click="enable_help++; clickedLevelHelp()" 
        class="tx-center clickable opacity-hover-50 tx-xl top-50p pos-fixed pa-5 border-r-50"
    >
        Survive!
        <!-- <br>
        <small class="opacity-50">(Scroll Down)</small> -->
    </h1>
    <h1 v-if="enable_help == 3 && show_help" style="z-index: 999999; background: #ffffff44" 
      @click="clickedLevelHelp" 
        class="tx-center clickable opacity-hover-50 tx-xl top-50p pos-fixed pa-5 border-r-50"
    >
        Congratulations!
        <!-- <br> -->
        <!-- <small class="opacity-50">(Scroll Down)</small> -->
    </h1>
    <h1 v-if="accs_length || is_playing_test" style="z-index: 999999; background: #ffffff44" 
        class="  opacity-75 tx-lg bottom-0 pos-fixed pa-5 border-r-50 flex-align-start flex-column"
    >
        <!-- <div>PlayerStats</div> -->
        <div class="flex-wrap ">
          <span class="flex mr-3" > <span title="Hunger">Hu:</span> <small>{{__player.stats.hunger}}</small> </span>
          <span class="flex mr-3" > <span title="Hygene">Hy:</span> <small>{{__player.stats.hygene}}</small> </span>
          <span class="flex mr-3" > <span title="Fun">F:</span> <small>{{__player.stats.fun}}</small> </span>
          <span class="flex mr-3" > <span title="Energy">E:</span> <small>{{__player.stats.energy}}</small> </span>
          <!-- <span class="flex mr-3" > <span title="Rotation">Ro:</span> <small>{{__player.rot}}</small> </span> -->
          <span class="flex mr-3" > <span title="Rotation">R:</span> <small>{{__player_rot_y}}</small> </span>
          <span class="flex mr-3" > <span title="Rotation">P:</span> <small>{{__player_pos_z}}</small> </span>
        </div>
        <!-- <br> -->
        <!-- <small class="opacity-50">(Scroll Down)</small> -->
    </h1>
  </div>
</template>
<script>
import * as THREE from "three";
import { OBJLoader } from "../../../scripts/loaders/OBJLoader.js";
import baseStandardMaterial from "../../../scripts/constants/baseStandardMaterial.js";

import set_scene from "../../system/set_scene.js";
import bloommixin from "../../system/mixin_bloom.js";
import listen_mouse from "../../system/listen_mouse.js";
import listen_click from "../../system/listen_click.js";
import listen_swipe from "../../system/listen_swipe.js";
import update_animation from "../../system/update_animation.js";

import levelThree from "./base-level-3.js";

const BASE_URL = "http://localhost:3000/";
const BASE_ASSET_URL = "./res";
export default {
  name: 'level-three',    
  mixins: [
    baseStandardMaterial,
    
    set_scene,
    bloommixin,
    listen_swipe,
    listen_mouse,
    listen_click,
    update_animation,

    levelThree,
  ],
  data()
  {
    return {
      enable_help: 0,
      show_help: false,
    };
  },
  computed:
  {
    LANG()                  { return this.$store.getters.LANG },
    accs_length()           { return this.$store.getters.accs_length },
    first_acc()             { return this.$store.getters.first_acc },

    dark_mode()             { return this.$store.getters.dark_mode },
    pro_mode()             { return this.$store.getters.pro_mode },
    auto_mode()             { return this.$store.getters.auto_mode },

    is_playing_test()      { return this.$store.getters.is_playing_test },
    current_sub_page()      { return this.$store.getters.current_sub_page },
    current_filter()      { return this.$store.getters.current_filter },
    valuesBlock()             { return this.$store.getters.getBlock("values") },

    __player()      { return this.$store.getters.getPlayers[0] },
    __player_rot_y()      { return !this.__player || !this.__player.rot ? 0 : parseFloat(this.__player.rot[1].toFixed(2)) },
    __player_pos_z()      { return !this.__player || !this.__player.pos ? 0 : parseFloat(this.__player.pos[2].toFixed(2)) },

  },
  methods:
  {
    initLevel()
    {
      this.scene = null
      this.camera = null
      this.__scroll = null
      
      this.sceneBreakpoints = {
        default: [],
        mobile: [3000, 8500, 9900, 13100, 14400],
        desktop: [2400, 4200, 12900, 16100, 18400],
      }
      this.MIN = {
        y:-4,
      }
      this.LIVE_OFFSET = {}
      this.OFFSET = {}
      this.sceneVariables = {
        camera: {
          pos: [0, 0, 9],
          rot: [0, 0, 0],
          fov: 50,
          fovSettings: {
            mobile: 70,
            desktop: 50,
          },
          minReach: 0.1,
          maxReach: 100,
          shadowDistance: 85,
        },
      }
      this.renderer = null
      this.DOM = {
        ratio: null,
        height: null,
      }

      this.setScene();
      this.$listen_scrollPosition()
      // this.$animate()
    },
    setScene()
    {
      this._$set_sceneAndCamera();
      this.addLight()

      this.add_startLevelBlob()
      this.add_bubbleHead()

      this._$set_renderer();
      if (this.current_filter == "bloom") { this._$set_bloomRenderer() }

      this._$set_raycaster();
      this._$set_swipe()
    },
    clickedBubbleHeadHead(  ) {
      console.log("clickk")
      if (!this.mycurrentlevel)
      {
        this.$click_startLevelBlob()
      }
      this.checkGoals() // base-level js
      // alert("test")
    },
  },
  beforeDestroy() {
    // remove listener again
    window.removeEventListener( 'resize', this._$set_cameraRenderSize );
    window.removeEventListener("scroll", this.$listen_scrollPosition);

    document.removeEventListener("mousemove", this._$listen_pointerPos);
    document.removeEventListener("click", this._$listen_click);
  },
  mounted()
  {
    this.initLevel()

    window.addEventListener( 'resize', this._$set_cameraRenderSize );
    window.addEventListener("scroll", this.$listen_scrollPosition);

    document.addEventListener( 'mousemove', this._$listen_pointerPos );
    document.addEventListener( 'click', this._$listen_click );

    document.addEventListener("touchstart", this._$startTouch, false);
    document.addEventListener("touchmove", this._$moveTouch, false);
  },
};
</script>
