<template>
  <div >
    <canvas ref="canvas" class="w-100 pos-fixed"> </canvas>
  </div>
</template>
<script>
import * as THREE from "three";
import { OBJLoader } from "../res/loaders/OBJLoader.js";

import listeners from "./mixins/listeners.js";
import animationmixin from "./mixins/mixin_animation.js";
import bloommixin from "./mixins/mixin_bloom.js";

import levelOne from "./levels/level-one.js";

import connectOrb from "./models/connect-orb.js";
import texts from "./models/texts.js";

const BASE_URL = "http://localhost:3000/";
const BASE_ASSET_URL = "./res";
export default {
  name: 'main-scene',    
  mixins: [
    listeners,
    animationmixin,
    bloommixin,

    connectOrb,
    levelOne,
    texts,
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
  beforeDestroy() {
    // remove listener again
    window.removeEventListener("scroll", this.updateScrollPosition);
    window.removeEventListener( 'resize', this.setCameraRenderSize );
    document.removeEventListener("mousemove", this.onPointerMove);
    document.removeEventListener("click", this.onPointerClick);
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
          fov: 75,
          fovSettings: {
            mobile: 120,
            desktop: 75,
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

      this.loadObjects();

      // Array(200).fill().forEach(() => {
      //   this.loadAStar();
      // });
      // this.loadTexts();

      this.setRenderer();
      if (this.current_sub_page == "bloom")
      {
        this.setBloomRenderer()
      }
      this.setRaycaster();

      // this._animate()
      // this.renderer.render(this.scene, this.camera);
      this.updateScrollPosition()
    },
    _animate()
    {
      requestAnimationFrame(this._animate);
      this.raycaster.setFromCamera( this.pointer, this.camera );
      this.updateAnimations()
      this.updateRaycaster()
      if (this.current_sub_page != "bloom") 
      {
        this.renderer.render(this.scene, this.camera);
      } else {
        this.composer.render();
      }
    },
    setWindowRatio()
    {
      this.DOM.ratio = window.innerWidth / window.innerHeight;
      this.DOM.screenType = this.DOM.ratio > 1 ? "desktop" : "mobile";
      this.sceneBreakpoints.default = this.sceneBreakpoints[this.DOM.screenType];
    },
    setDOMHeight()
    {
      this.DOM.height = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
    },
    setSceneAndCamera()
    {
      this.scene = new THREE.Scene();

      this.sceneVariables.camera.fov = this.sceneVariables.camera.fovSettings[this.DOM.screenType];
      let camera = new THREE.PerspectiveCamera(
        this.sceneVariables.camera.fov,
        this.DOM.ratio,
        this.sceneVariables.camera.minReach,
        this.sceneVariables.camera.maxReach
      );
      this.camera = camera;
      this.camera.position.set(...this.sceneVariables.camera.pos);
      this.camera.rotation.set(...this.sceneVariables.camera.rot);
    },
    addLight()
    {
      let suncolor = this.dark_mode ? 0xFFA859 : 0xFFCB91
      let ambientintensity = this.dark_mode ? 0x404040 : 0x909090
      let sunintensity = this.dark_mode ? 3 : 2

      // this.light4 = new THREE.PointLight( 0xffffff, 0.5, 8 );
      // this.light4.position.set(-1,2.5,6)
      // this.scene.add( this.light4 );

      this.sunlight = new THREE.SpotLight( suncolor );
      // this.sunlight = new THREE.DirectionalLight( 0xFFA859, sunintensity );
      this.sunlight.position.set( -10,6,15 ); //default; light shining from top
      this.sunlight.castShadow = true; // default false
      // this.sunlight.shadow.camera.near = 0.5; // default
      this.sunlight.shadow.camera.far = 100; // default
      this.sunlight.shadow.mapSize.width = 2048; // default
      this.sunlight.shadow.mapSize.height = 2048; // default
      this.scene.add( this.sunlight );

      // this.scene.add(new THREE.CameraHelper(light.shadow.camera)) 

      const amlight = new THREE.AmbientLight( ambientintensity ); // soft white light
      this.scene.add( amlight );
    },
    loadSkeletonObjects()
    {

    },
    loadObjects()
    {

      new OBJLoader().setPath(BASE_ASSET_URL + "/models/").load(
        "sign.obj",
        (object) => {

          object.traverse( function ( child ) {
             if ( child instanceof THREE.Mesh ) {
                 child.material = new THREE.MeshStandardMaterial( { color: 0xaaaaaa,
                  // side:THREE.DoubleSide 
                } );
                child.castShadow = true;
                child.castShadow = true;
                child.receiveShadow = true;

            }
         } );

          object.position.set(0, -2, 0);
          this.mysign = object
          this.scene.add(this.mysign);
        },
        this.onLoadProgress
      );

      const sphereGeometry = new THREE.SphereGeometry(1, 32, 32 );
      const sphereMaterial = new THREE.MeshStandardMaterial( { color: 0xff9000 } );
      const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
      sphere.castShadow = true; //default is false
      sphere.receiveShadow = true; //default
      sphere.position.x = -2.4
      sphere.position.z = 2
      // this.scene.add( sphere );

      //Create a sphere that cast shadows (but does not receive them)
      this.addConnectOrb()

      //Create a plane that receives shadows (but does not cast them)
      const planeGeometry = new THREE.PlaneGeometry( 20, 20, 32, 32 );
      const planeMaterial = new THREE.MeshStandardMaterial( { color: 0x00ff00 } )
      const plane = new THREE.Mesh( planeGeometry, planeMaterial );
      plane.receiveShadow = true;

      new OBJLoader().setPath(BASE_ASSET_URL + "/models/").load(
        "test.obj",
        (object) => {

          object.traverse( function ( child ) {
             if ( child instanceof THREE.Mesh ) {

                 child.material = new THREE.MeshStandardMaterial( { color: 0xaaaaaa,
                  // side:THREE.DoubleSide 
                } );
                child.castShadow = true;
                child.castShadow = true;
                child.receiveShadow = true;

            }
         } );

          object.castshadow = true
          object.receiveShadow = true
          object.position.set(0, -2, 0);
          this.myobject = object
          this.scene.add(this.myobject);
        },
        this.onLoadProgress
      );


    },
    loadAStar()
    {

    },
    setRenderer()
    {
      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        canvas: this.$refs.canvas,
        // canvas: canvasElement,
      });

      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMapSoft = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
      this.setCameraRenderSize()
    },
    setCameraRenderSize()
    {
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix(window.devicePixelRatio);
    },
  },
};
</script>
