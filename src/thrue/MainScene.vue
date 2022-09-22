<template>
  <div >
    <canvas ref="canvas" class="w-100 pos-fixed"> </canvas>
  </div>
</template>
<script>
import * as THREE from "three";
import { OBJLoader } from "../scripts/loaders/OBJLoader.js";

import set_scene from "./scripts/set_scene.js";
import listen_scroll from "./scripts/listen_scroll.js";
import listen_mouse from "./scripts/listen_mouse.js";
import listen_click from "./scripts/listen_click.js";
import updateanimation from "./scripts/update_animation.js";
import bloommixin from "./scripts/mixin_bloom.js";

import levelOne from "./levels/level-one.js";
import connectOrb from "./models/connect-orb.js";
import bubbleHead from "./models/bubble-head.js";

const BASE_URL = "http://localhost:3000/";
const BASE_ASSET_URL = "./res";
export default {
  name: 'main-scene',    
  mixins: [
    set_scene,
    listen_click,
    listen_scroll,
    listen_mouse,
    updateanimation,
    bloommixin,

    connectOrb,
    bubbleHead,
    levelOne,
  ],
  data()
  {
    return {
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

    current_sub_page()      { return this.$store.getters.current_sub_page },
    valuesBlock()             { return this.$store.getters.getBlock("values") },
  },
  mounted()
  {
    this.init()

    window.addEventListener("scroll", this.updateScrollPosition);
    window.addEventListener( 'resize', this.setCameraRenderSize );
    document.addEventListener( 'mousemove', this.onPointerMove );
    document.addEventListener( 'click', this.onPointerClick );
  },
  methods:
  {
    init()
    {
      this.scene = null
      this.camera = null
      this.scrollPosition = null
      
      this.sceneBreakpoints = {
        default: [],
        mobile: [3000, 8500, 9900, 13100, 14400],
        desktop: [3000, 8500, 12900, 16100, 18400],
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
        },
      }
      this.renderer = null
      this.DOM = {
        ratio: null,
        height: null,
      }
        
      this.setWindowRatio();
      this.setDOMHeight();
      this.setSceneAndCamera();
      this.addLight()

      this.loadMainObjects();

      this.setRenderer();
      if (this.current_sub_page == "bloom") { this.setBloomRenderer() }

      this.setRaycaster();
      this.updateScrollPosition()
      // this._animate()
    },
    loadMainObjects()
    {
      this.add_connectOrb()
      this.add_bubbleHead()
    },
    mainCheckClick()
    {
      // INTERSECTED = MOUSE POINTER HOVERING OVER OBJECT from raycaster
      if(this.INTERSECTED && this.mysign && this.INTERSECTED == this.mysign.children[0])
      {
        this.clickedBubbleHeadHead()
      }
    },
    clickedBubbleHeadHead(  ) {
      if (!this.mylevelone)
      {
        this.clicked_connectOrb()
      }
      if (this.goals && this.goals.tickets < 1)
      {
        alert("Failed")
        return
      }
      // alert("You Win!")
    },
    mainAnimation()
    {

      // TRANSITION TO LEVEL ! WHEN CONNECTED
      if (this.accs_length)
      {
        this.myobject.position.z = this.lerp(this.myobject.position.z,-50,0.07)
        this.myobject.position.y = this.lerp(this.myobject.position.y,-2,0.07)
        if (this.mysign)
        {
          this.mysign.position.z = this.lerp(this.mysign.position.z,-49.6,0.07)
          this.mysign.position.y = this.lerp(this.mysign.position.y,-0.9,0.07)
        }
      }

      // LIVE ANIMAL LOOKING TO POINTER
      if (this.mysign)
      {
        // console.log(this.pointer)
        if (this.pointer.x == null && this.pointer.y == null)
        {
          // console.log("asd")
          this.mysign.rotation.y = this.lerp(this.mysign.rotation.y,-0.6,0.01)
          this.mysign.rotation.x = this.lerp(this.mysign.rotation.x,-0.2,0.03)
          // this.mysign.rotation.y = this.lerp(this.mysign.rotation.y,this.pointer.x,0.07)
        } else {
          this.mysign.rotation.y = this.lerp(this.mysign.rotation.y,this.pointer.x,0.07)
          this.mysign.rotation.x = this.lerp(this.mysign.rotation.x,-this.pointer.y+0.4,0.07)
        }
      }

      // PLAYER CAMERA
      if (this.camera && this.pro_mode &&
        (this.pointer.x < -0.2 || this.pointer.x > 0.2)
        )
      {
        this.camera.rotation.y =
          this.lerp(this.camera.rotation.y,-this.pointer.x*1.2+(this.pointer.x < -0.2 ? -0.2 : +0.2),0.07)
      } else {
        this.camera.rotation.y = this.lerp(this.camera.rotation.y,0,0.07)

      }
    },
    beforeDestroy() {
      // remove listener again
      window.removeEventListener("scroll", this.updateScrollPosition);
      window.removeEventListener( 'resize', this.setCameraRenderSize );
      document.removeEventListener("mousemove", this.onPointerMove);
      document.removeEventListener("click", this.onPointerClick);
    },
  },
};
</script>
