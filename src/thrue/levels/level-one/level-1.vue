<template>
  <div >
    <canvas ref="canvas" class="w-100 pos-fixed"> </canvas>
    <h1 v-if="enable_help == 1 && show_help" style="z-index: 999999" 
      @click="enable_help++; clickedLevelHelp()"
        class="tx-center clickable opacity-hover-50 tx-xl mt-100 pos-absolute w-100 "
    >
        Pick Up all the Chiks
        <br>
        <small class="opacity-50">(Scroll Down)</small>
    </h1>
    <h1 v-if="enable_help == 3 && show_help" style="z-index: 999999" 
      @click="clickedLevelHelp"
        class="tx-center clickable opacity-hover-50 tx-xl mt-100 pos-fixed w-100 "
    >
        Congratulations!
        <!-- <br> -->
        <!-- <small class="opacity-50">(Scroll Down)</small> -->
    </h1>
  </div>
</template>
<script>
import * as THREE from "three";
import { OBJLoader } from "../../../scripts/loaders/OBJLoader.js";

import set_scene from "../../system/set_scene.js";
import animateLevelOne from "./animate-level-1.js";
import listen_mouse from "../../system/listen_mouse.js";
import listen_click from "../../system/listen_click.js";
import updateanimation from "../../system/update_animation.js";
import bloommixin from "../../system/mixin_bloom.js";

import levelOne from "./base-level-1.js";
import startLevelBlob from "../../models/start-level-blob.js";
import baseStandardMaterial from "../../../scripts/constants/baseStandardMaterial.js";
import bubbleHead from "../../models/bubble-head.js";

const BASE_URL = "http://localhost:3000/";
const BASE_ASSET_URL = "./res";
export default {
  name: 'level-one',    
  mixins: [
    set_scene,
    listen_click,
    animateLevelOne,
    listen_mouse,
    updateanimation,
    bloommixin,

    baseStandardMaterial,
    startLevelBlob,
    bubbleHead,
    levelOne,
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
        y:-2,
      }
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
          shadowDistance: 42,
        },
      }
      this.renderer = null
      this.DOM = {
        ratio: null,
        height: null,
      }

      this.setScene();
      this.$animate_scrollPosition()
      // this._animate()
    },
    setScene()
    {
      this.setWindowRatio();
      this.setDOMHeight();
      this.setSceneAndCamera();
      this.addLight()

      this.add_startLevelBlob()
      this.add_bubbleHead()

      this.setRenderer();
      if (this.current_filter == "bloom") { this.setBloomRenderer() }

      this.setRaycaster();
    },
    clickedBubbleHeadHead(  ) {
      console.log("clickk")
      if (!this.mycurrentlevel)
      {
        this.clicked_startBlob()
      }
      this.checkGoals() // base-level js
      // alert("test")
    },
  },
  beforeDestroy() {
    // remove listener again
    window.removeEventListener("scroll", this.$animate_scrollPosition);
    window.removeEventListener( 'resize', this.setCameraRenderSize );
    document.removeEventListener("mousemove", this.onPointerMove);
    document.removeEventListener("click", this.onPointerClick);
  },
  mounted()
  {
    this.initLevel()

    window.addEventListener("scroll", this.$animate_scrollPosition);
    window.addEventListener( 'resize', this.setCameraRenderSize );
    document.addEventListener( 'mousemove', this.onPointerMove );
    document.addEventListener( 'click', this.onPointerClick );
  },
};
</script>
