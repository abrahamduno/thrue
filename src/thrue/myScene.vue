<template>
  <div >
    <canvas ref="canvas" class="w-100 pos-fixed"> </canvas>
  </div>
</template>
<script>
import * as THREE from "three";
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OBJLoader } from "../res/loaders/OBJLoader.js";

import scrollmixin from "./scroll_mixin.js";
import raycastmixin from "./raycast_mixin.js";
import animationmixin from "./animation_mixin.js";

import levelOne from "./levels/level-one.js";
import ticketer from "./models/ticketer.obj.js";

import connectOrb from "./models/connect-orb.js";
import texts from "./models/texts.js";

const BASE_URL = "http://localhost:3000/";
const BASE_ASSET_URL = "./res";
export default {
  name: 'my-scene',    
  mixins: [
    scrollmixin,
    raycastmixin,
    animationmixin,

    connectOrb,
    levelOne,
    texts,
    ticketer,
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
      current_sub_page()      { return this.$store.getters.current_sub_page },
  },
  mounted()
  {
    this.init()

    window.addEventListener("scroll", this.updateScrollPosition);
    document.addEventListener( 'mousemove', this.onPointerMove );
    document.addEventListener( 'click', this.onPointerClick );
  },
  beforeDestroy() {
    // remove listener again
    window.removeEventListener("scroll", this.updateScrollPosition);
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
          maxReach: 1000,
        },
      }
      this.renderer = null
      this.DOM = {
        ratio: null,
        height: null,
      }
        
      this.setWindowRatio();
      this.setWindowSettings();
      this.setScene();
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
      // this.composer.render(this.scene, this.camera);

    },
    setWindowRatio()
    {
      this.DOM.ratio = window.innerWidth / window.innerHeight;
      let platformKey = this.DOM.ratio > 1 ? "desktop" : "mobile";
      this.sceneBreakpoints.default = this.sceneBreakpoints[platformKey];
      this.sceneVariables.camera.fov =
        this.sceneVariables.camera.fovSettings[platformKey];
    },
    setWindowSettings()
    {
      this.DOM.height = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
    },
    setScene()
    {
      this.scene = new THREE.Scene();

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
      let sunintensity = this.dark_mode ? 1.6 : 2

      // this.light4 = new THREE.PointLight( 0xffffff, 0.5, 8 );
      // this.light4.position.set(-1,2.5,6)
      // this.scene.add( this.light4 );

      this.sunlight = new THREE.SpotLight( suncolor );
      // this.sunlight = new THREE.DirectionalLight( 0xFFA859, sunintensity );
      this.sunlight.position.set( 10,6,20 ); //default; light shining from top
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
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    },
    setBloomRenderer()
    {
      // this.renderer.toneMapping = THREE.ReinhardToneMapping;
      
        this.renderer.setClearColor(0xff0000, 0);
      let params = {}
      if (this.dark_mode)
      {
        params = {
          exposure: 0.05,
          bloomStrength: 0.35,
          bloomThreshold: 0,
          bloomRadius: 0
        };
      } else {
        params = {
          exposure: 0.05,
          bloomStrength: 0.2,
          bloomThreshold: 0,
          bloomRadius: 0
        };
      }

      let bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
      bloomPass.threshold = params.bloomThreshold;
      bloomPass.strength = params.bloomStrength;
      bloomPass.radius = params.bloomRadius;

      const renderScene = new RenderPass( this.scene, this.camera );
      this.composer = new EffectComposer( this.renderer );
      this.composer.addPass( renderScene );
      this.composer.addPass( bloomPass );
    },
  },
};
</script>
