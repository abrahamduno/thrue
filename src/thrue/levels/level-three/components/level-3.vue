<!--
  _$ -> from system
  l_$ -> from localScene
  p_$ -> from player
  a_$ -> from animation

  __ -> only used inside same file
-->
<template>

    <div  class=" pos-fixed z-999 pa-2  bottom-0 right-0  border-r-15 flex-align-start flex-column  " v-if="accs_length || is_playing_test" >

        <!-- <div>PlayerStats</div> -->
            <!-- :class="[[__player.stats.hunger > 8 ? 'tx-success':''],[__player.stats.hunger < 4 ? 'tx-error':'']]" -->
        <div class="flex-wrap pa-1 n-flat border-r-15" v-if="__player.q">
          <span class="flex-column " 
          >
            
            <div v-for="(qItem, index) in __player.q" 
              class="clickable block pa-3 tx-sm flex-column"  style="width: 70px !important" 
                :class="[index == 0 ? 'n-flat pulse-npulse':' opacity-hover-50']"
            >
                <i v-if="index == 0" class="fas fa-circle-notch spin-nback"></i>
                {{index > 0 ? p_$statToAction(qItem.action) : p_$parseStatActionLIVE(qItem.action)}}
            </div>
          </span>
        </div>
      </div>


    <canvas ref="canvas" id="canvas" class="w-100 pos-fixed main-wrap"> </canvas>

    <!-- <div  v-if="!pro_mode && (accs_length || is_playing_test)"  class="tutorial-theme-wrapper pos-fixed  h-100 top-0 block flex-center flex-align-center"
    >
    </div> -->

        <!-- @click="enable_help++; clickedLevelHelp()"  -->
         <!-- v-if="enable_help == 1 && show_help" -->



<!-- tutorial-theme-bg  -->
    <div v-if="pause_mode && (accs_length || is_playing_test)" class="pos-fixed w-100 flex-center"
      >
      <h1  style="z-index: 999999; background: #222222; transform: translateY(140px);" 
        v-if="!pro_mode"
          class="tx-center n-flat tx-lg mt-0 pa-5 border-r-50  "
      >
          <!-- <span class="nopointer show-xs_md block " style="height: 100px"></span> -->
          <span class="nopointer opacity-75 tx-ls-8">How to Play</span>
          <!-- <br> -->
          <hr class="w-100 opacity-25 pa-0 my-2">
          <div class="opacity-25 nopointer  tx-xs tx-ls-2 w-100 tx-left"><i class="fas fa-arrow-down pl-4 pr-5 "></i>NEEDS</div>
          <div class="flex-column flex-align-start">
            <details class=" tx-xs  opacity-75 w-100">
              <summary class="clickable w-100 flex tx-ls-5 pa-3">
                <i class="tx-primary fas tx-lg fa-hamburger pr-1"></i> 
                <span class="n-tx-3d">Hunger</span>
              </summary>
              <div class="n-inset py-2 border-r-15">
                You can check <br> the fridge <br> when hungry
                <!-- <hr class="w-100 opacity-25 pa-0 my-2"> -->
              </div>
            </details>
            <details class=" tx-xs  opacity-75 w-100">
              <summary class="clickable w-100 flex tx-ls-5 pa-3">
                <i class="tx-primary fas tx-lg fa-shower pr-1"></i> 
                <span class="n-tx-3d">Hygene</span>
              </summary>
              <div class="n-inset py-2 border-r-15">
                You can take <br> a shower <br> when smelly
                <!-- <hr class="w-100 opacity-25 pa-0 my-2"> -->
              </div>
            </details>
            <details class=" tx-xs  opacity-75 w-100">
              <summary class="clickable w-100 flex tx-ls-5 pa-3">
                <i class="tx-primary fas tx-lg fa-smile-beam pr-1"></i> 
                <span class="n-tx-3d">Fun</span>
              </summary>
              <div class="n-inset py-2 border-r-15">
                You can check <br> the mailbox <br> when bored
                <!-- <hr class="w-100 opacity-25 pa-0 my-2"> -->
              </div>
            </details>
            <details class=" tx-xs  opacity-75 w-100">
              <summary class="clickable w-100 flex tx-ls-5 pa-3">
                <i class="tx-primary fas tx-lg fa-bolt pr-2"></i> 
                <span class="n-tx-3d">Energy</span>
              </summary>
              <div class="n-inset py-2 border-r-15">
                You can rest <br> in bed <br> when sleepy
                <!-- <hr class="w-100 opacity-25 pa-0 my-2"> -->
              </div>
            </details>
          </div>
          <!-- fas fa-hamburger
          fas fa-shower
          fas fa-smile-beam
          fas fa-bolt -->
          <!-- <span class="nopointer show-md_x tx-xs  opacity-75 tx-ls-5">Drag the screen <br> to Rotate</span> -->
          <!-- <span class="nopointer show-xs_md tx-xs  opacity-75 tx-ls-5">Swipe to Rotate</span> -->
          <!-- <br> -->
          <!-- <i class="fas rock-nroll fa-hand-point-up"></i> -->
          <!-- <span class="nopointer show-xs_md tx-xs opacity-75  tx-ls-5">Swipe to Move</span>
          <hr class="nopointer w-100 opacity- pa-0 my-2">
          <small class="nopointer  tx-sm flex-column show-md_x">
              <span class="tx-ls-3 mx-2" style="color:#3311ff">Forward</span>
              <div class="flex">
                <span class="tx-ls-3 ma-2" style="color:#ff3311">Turn <br> Left</span>
                <span class="tx-ls-3 ma-2" style="color:#ff9911">Turn <br> Right</span>
              </div>
              <span class="tx-ls-3 mx-2" style="color:#33ff11">Backward</span>
          </small>
          <small class="nopointer  tx-sm flex-column show-xs_md">
              <span class="tx-ls-3 mx-2" style="color:#3311ff">Forward <br> ↑</span>
              <div class="flex">
                <span class="tx-ls-3 ma-2" style="color:#ff3311">Turn <br> ← <br> Left</span>
                <span class="tx-ls-3 ma-2" style="color:#ff9911">Turn <br> → <br> Right</span>
              </div>
              <span class="tx-ls-3 mx-2" style="color:#33ff11">↓ <br> Backward</span>
          </small> -->
          <!-- <hr class="w-100 opacity-25 pa-0 my-2">
          <small class="opacity-hover-50 tx-xs">Click <i class="fas fa-cogs tx-lg"></i> to hide this</small> -->
          <!-- <br> -->
          <!-- <small class="opacity-hover-50 tx-xs">Check Personality in "Profile"</small> -->
          <!-- <small class="opacity-hover-50 tx-xs">Check Personality in "Profile"</small> -->
      </h1>

      <div  style="z-index: 999999; background: #222222; transform: translateY(140px);" 
        v-if="pro_mode"
          class="tx-center n-flat tx-lg  pa-5 border-r-50  "
      >
          <!-- <span class="nopointer show-xs_md block " style="height: 100px"></span> -->
          <span class="nopointer opacity-75 tx-ls-5">Person Profile</span>
          <!-- <br> -->
          <hr class="w-100 opacity-25 pa-0 my-2">
          <div class="opacity-25 nopointer  tx-xs tx-ls-2 w-100 tx-left"><i class="fas fa-arrow-down pl-4 pr-5 "></i>MEMORIES</div>
          <div class="flex-column flex-align-start" >
            <template v-for="(memoryList, category) in __player.mmrs">
              <details class=" tx-xs  opacity-75 w-100" v-if="memoryList.length">
                <summary class="clickable w-100 flex tx-ls-5 pa-2" 
                  
                >
                  <i class=" fas tx-lg  " :class="p_$parseMemoryCategoryIcon(category)"></i> 
                  <span class="n-tx-3d">{{category}}</span>
                </summary>
                <ol class=" border-r-15"
                >
                  <li v-for="(memory, index) in memoryList" class="tx-start" >
                    <div>
                      {{memory.name}}
                    </div>
                  </li>
                  <!-- You can check <br> the fridge <br> when hungry -->
                  <!-- <hr class="w-100 opacity-25 pa-0 my-2"> -->
                </ol>
              </details>
            </template>
          </div>
          <!-- fas fa-hamburger
          fas fa-shower
          fas fa-smile-beam
          fas fa-bolt -->
          <!-- <span class="nopointer show-md_x tx-xs  opacity-75 tx-ls-5">Drag the screen <br> to Rotate</span> -->
          <!-- <span class="nopointer show-xs_md tx-xs  opacity-75 tx-ls-5">Swipe to Rotate</span> -->
          <!-- <br> -->
          <!-- <i class="fas rock-nroll fa-hand-point-up"></i> -->
          <!-- <span class="nopointer show-xs_md tx-xs opacity-75  tx-ls-5">Swipe to Move</span>
          <hr class="nopointer w-100 opacity- pa-0 my-2">
          <small class="nopointer  tx-sm flex-column show-md_x">
              <span class="tx-ls-3 mx-2" style="color:#3311ff">Forward</span>
              <div class="flex">
                <span class="tx-ls-3 ma-2" style="color:#ff3311">Turn <br> Left</span>
                <span class="tx-ls-3 ma-2" style="color:#ff9911">Turn <br> Right</span>
              </div>
              <span class="tx-ls-3 mx-2" style="color:#33ff11">Backward</span>
          </small>
          <small class="nopointer  tx-sm flex-column show-xs_md">
              <span class="tx-ls-3 mx-2" style="color:#3311ff">Forward <br> ↑</span>
              <div class="flex">
                <span class="tx-ls-3 ma-2" style="color:#ff3311">Turn <br> ← <br> Left</span>
                <span class="tx-ls-3 ma-2" style="color:#ff9911">Turn <br> → <br> Right</span>
              </div>
              <span class="tx-ls-3 mx-2" style="color:#33ff11">↓ <br> Backward</span>
          </small> -->
          <!-- <hr class="w-100 opacity-25 pa-0 my-2">
          <small class="opacity-hover-50 tx-xs">Click <i class="fas fa-cogs tx-lg"></i> to hide this</small> -->
      </div>
    </div>




    <h1 v-if="enable_help == 3 && show_help" style="z-index: 999999; background: #77777744" 
      @click="clickedLevelHelp" 
        class="tx-center clickable opacity-hover-75 tx-xl top-50p pos-fixed pa-5 border-r-50"
    >
        Congratulations!
        <!-- <br> -->
        <!-- <small class="opacity-50">(Scroll Down)</small> -->
    </h1>



    <div v-if="(accs_length || is_playing_test) && p_$localQ" style="z-index: 999999;" 
        class="    top-50p left-50p pos-fixed pa-3 ma-2 border-r-25 flex-align-start flex-column n-flat "
    >
      <div class="flex-column mb-3" v-if="p_$localQ && p_$localQ.id">
        <div class=" mb-2 " >
          <span class="tx-xs opacity-50">Actions:</span>
          <div v-if="p_$localQactions.length">
            <div v-for="statAction in p_$localQactions" @click="p_$commitStatAction(statAction,p_$localQ)">
              <small class="tx-xs py-1 pa-2 clickable show-md_x opacity-hover-75 tx-secondary">{{statAction.action}}</small>
              <small class="tx-xs pa-1 clickable show-xs_md opacity-hover-75 tx-secondary">{{statAction.action}}</small>
            </div>
          </div>
        </div>
        <div class="opacity-50 mb-2" v-if="!p_$localQactions.length">no action</div>
      </div>
  </div>

    <div v-if="accs_length || is_playing_test" style="z-index: 999999;" 
        class="    top-0 right-0  pos-fixed pa-3 border-r-25 flex-align-start flex-column "
    >
        <wishes-bar    :player="__player" />

  </div>


    <div v-if="accs_length || is_playing_test" style="z-index: 999999;" 
        class="    bottom-0 pos-fixed pa-3 border-r-25 flex-align-start flex-column "
    >

        <time-bar ref="timebar"  :player="__player" :UNIX="UNIX"/>
        <div class="opacity-50 mt-2">
          <stats-bar   :player="__player" />
        </div>
    </div>
</template>
<script>
import * as THREE from "three";
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

import set_scene from "../../../system/set_scene.js";
import bloommixin from "../../../system/mixin_bloom.js";
import listen_mouse from "../../../system/listen_mouse.js";
import listen_click from "../../../system/listen_click.js";
import listen_swipe from "../../../system/listen_swipe.js";
import update_animation from "../../../system/update_animation.js";
import npcContainer from "../../../system/npc-container.js";

import createLevel from "../scene/level-create.js";

import statsBar from "./parts/stats-bar.vue";
import wishesBar from "./parts/wishes-bar.vue";
import timeBar from "./parts/time-bar.vue";

const BASE_URL = "http://localhost:3000/";
const BASE_ASSET_URL = "./res";
export default {
  name: 'level-three',     
  components: {
    statsBar,
    timeBar,
    wishesBar,
  },
  mixins: [
    
    set_scene,
    bloommixin,
    listen_swipe,
    listen_mouse,
    listen_click,
    update_animation,
    npcContainer,

    createLevel,
  ],
  data()
  {
    return {
      enable_help: 0,
      show_help: false,
      UNIX: 0,
    };
  },
  computed:
  {
    LANG()                  { return this.$store.getters.LANG },
    accs_length()           { return this.$store.getters.accs_length },
    first_acc()             { return this.$store.getters.first_acc },
    is_playing_test()      { return this.$store.getters.is_playing_test },

    dark_mode()             { return this.$store.getters.dark_mode },
    pro_mode()             { return this.$store.getters.pro_mode },
    auto_mode()             { return this.$store.getters.auto_mode },
    pause_mode()             { return this.$store.getters.pause_mode },

    current_sub_page()      { return this.$store.getters.current_sub_page },
    current_filter()      { return this.$store.getters.current_filter },
    valuesBlock()             { return this.$store.getters.getBlock("values") },

    __player()      { return this.$store.getters.getPlayers[0] },
    __player_rot_y()      { return !this.__player || !this.__player.rot ? 0 : parseFloat(this.__player.rot[1].toFixed(2)) },
    __player_pos_z()      { return !this.__player || !this.__player.pos ? 0 : parseFloat(this.__player.pos[2].toFixed(2)) },

  },
  methods:
  {
    __initLevel()
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
          fov: 45,
          fovSettings: {
            mobile: 60,
            desktop: 45,
          },
          minReach: 0.1,
          maxReach: 120,
          shadowDistance: 85,
        },
      }
      this.renderer = null
      this.DOM = {
        ratio: null,
        height: null,
      }

      this.__setScene();
      this.l_$listen_scrollPosition()
      // this.$animate()
    },
    __setScene()
    {
      this._$set_sceneAndCamera();
      this.l_$addLight()

      this._$set_renderer();
      if (this.current_filter == "bloom") { this._$set_bloomRenderer() }

      this.p_$set_playerOrbitControl();
      // D5EAF9 // D88223
      this.scene.fog = new THREE.FogExp2( this.dark_mode ? 0xA5631B : 0xD5EAF9, 0.015  );


      this.add_startLevelBlob()
      this.add_personBubbleHead()


      this._$set_raycaster();
      this._$set_swipe()
    },
    clickedBubbleHeadHead(  ) {
      console.log("clickk")
      if (!this.mycurrentlevel)
      {
        this.$click_startLevelBlob()
      }
      this.l_$checkGoals() // base-level js
      // alert("test")
    },
  },
  beforeDestroy() {
    // remove listener again
    window.removeEventListener( 'resize', this._$set_cameraRenderSize );
    window.removeEventListener("scroll", this.l_$listen_scrollPosition);

    document.removeEventListener("mousemove", this._$listen_pointerPos);
    document.removeEventListener("click", this._$listen_click);
  },
  mounted()
  {
    this.__initLevel()

    window.addEventListener( 'resize', this._$set_cameraRenderSize );
    window.addEventListener("scroll", this.l_$listen_scrollPosition);

    document.addEventListener( 'mousemove', this._$listen_pointerPos );
    document.addEventListener( 'click', this._$listen_click );

    document.addEventListener("touchstart", this._$startTouch, false);
    document.addEventListener("touchmove", this._$moveTouch, false);
  },
};
</script>
