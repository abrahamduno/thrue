<template>
  <div >
    <canvas ref="canvas" id="canvas" class="w-100 pos-fixed main-wrap"> </canvas>

    <div  v-if="enable_help == 1 && show_help" class="tutorial-theme-wrapper pos-fixed  h-100 top-0 block flex-center flex-align-center"
    style="left: 20%; width: 60vw">
    </div>

    <div  v-if="enable_help == 1 && show_help" class="tutorial-theme-bg pos-fixed w-100 flex-center"
      style="top: 20%; height: 60vh">
      <h1  style="z-index: 999999; background: #222222" 
        @click="enable_help++; clickedLevelHelp()" 
          class="tx-center clickable opacity-hover-75 tx-lg  pa-5 border-r-50 n-tx-3d"
      >
          <span class="nopointer show-md_x tx-sm">Click the Edges</span>
          <span class="nopointer show-xs_md">Swipe!</span>
          <hr class="nopointer w-100 opacity- pa-0 my-2">
          <!-- <br> -->
          <small class="nopointer ">(Up/Down=move) <br> (Left/Right=rotate)</small>
          <hr class="w-100 opacity-25 pa-0 my-2">
          <span class="opacity-hover-50 tx-lg">OK</span>
      </h1>
    </div>
    <h1 v-if="enable_help == 3 && show_help" style="z-index: 999999; background: #77777744" 
      @click="clickedLevelHelp" 
        class="tx-center clickable opacity-hover-75 tx-xl top-50p pos-fixed pa-5 border-r-50"
    >
        Congratulations!
        <!-- <br> -->
        <!-- <small class="opacity-50">(Scroll Down)</small> -->
    </h1>
    <h1 v-if="accs_length || is_playing_test" style="z-index: 999999;" 
        class="  opacity-75 tx-lg bottom-0 pos-fixed pa-5 border-r-50 flex-align-start flex-column n-flat noclick"
    >
        <!-- <div>PlayerStats</div> -->
        <div class="flex-wrap ">
          <span class="flex px-3" style="border-right: 2px solid #777777">
            <span title="Hunger">
              <i class="mr-2 fas fa-hamburger"></i>
              <!-- <i class="fas fa-solid fa-burger"></i>  --></span>
            <small>{{__player.stats.hunger}}</small>
          </span>
          <span class="flex px-3" style="border-right: 2px solid #777777">
            <span title="Hygene">
              <i class="mr-2 fas fa-shower"></i>
              <!-- <i class="fas fa-solid fa-soap"></i>  --></span>
            <small>{{__player.stats.hygene}}</small>
          </span>
          <span class="flex px-3" style="border-right: 2px solid #777777">
            <span title="Fun">
              <i class="mr-2 fas fa-smile-beam"></i>
              <!-- <i class="fas fa-solid fa-pool-8-ball"></i>  --></span>
            <small>{{__player.stats.fun}}</small>
          </span>
          <span class="flex px-3">
            <span title="Energy">
              <i class="mr-2 fas fa-bolt"></i>
              <!-- <i class="fas fa-solid fa-bolt-lightning"></i> --></span>
            <small>{{__player.stats.energy}}</small>
          </span>
          <!-- <span class="flex mr-3" > <span title="Rotation">Ro:</span> <small>{{__player.rot}}</small> </span> -->
          <!-- <span class="flex mr-3" > <span title="Rotation">R:</span> <small>{{__player_rot_y}}</small> </span> -->
          <!-- <span class="flex mr-3" > <span title="Rotation">P:</span> <small>{{__player_pos_z}}</small> </span> -->
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
            mobile: 80,
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
