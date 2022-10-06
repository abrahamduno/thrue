import * as THREE from "three";
import { OBJLoader } from "../../../../scripts/loaders/OBJLoader.js";
import { OrbitControls } from "../../../../scripts/loaders/OrbitControls.js";
import baseStandardMaterial from "../../../../scripts/constants/baseStandardMaterial.js";

import initLevelScene from "./level-scene.js";
import animateLevel from "./level-update.js";
import player from "./player.js";

import startLevelBlob from "../models/start-game.js";
import startPersonHead from "../models/start-person-bubblehead.js";


  // _$ -> from system
  // l_$ -> from localScene
  // p_$ -> from player
  // a_$ -> from animation

  // __ -> only used inside same file


const BASE_URL = "http://localhost:3000/";
const BASE_ASSET_URL = "./res";
export default {
  mixins: [
    baseStandardMaterial,

    initLevelScene,
    animateLevel,
    player,

    startLevelBlob,
    startPersonHead,
  ],
  data()
  {
    return {
    }
  },
  methods:
  {
    l_$createLevel()
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

      this.__createScene();
      this.l_$listen_scrollPosition()
      // this.$animate()
    },
    __createScene()
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
    p_$set_playerOrbitControl()
    {
      this.__orbitcontrols = new OrbitControls( this.camera, this.renderer.domElement );
      this.__orbitcontrols.listenToKeyEvents( window ); // optional

      this.__orbitcontrols.enablePan = false
      this.__orbitcontrols.screenSpacePanning = false;

      this.__orbitcontrols.minDistance = 5;
      this.__orbitcontrols.maxDistance = 40;

      this.__orbitcontrols.maxPolarAngle = Math.PI / 2;
      this.__orbitcontrols.target.set(0,0,5) // init screen (connect / login)
    },

    l_$addLight()
    {
      let suncolor = this.dark_mode ? 0xF9B871 : 0xF7E0B0
      this._sunintensity = this.dark_mode ? 1.2 : 0.9
      let ambientintensity = this.dark_mode ? 0x404040 : 0x909090

      // this.sunlight.position.lookAt( 0,0,0 ); //default; light shining from top
      // this.sunlight = new THREE.SpotLight( suncolor );
      this.sunlight = new THREE.DirectionalLight( suncolor, this._sunintensity );
      this.sunlight.position.set( -15,14,10 ); //default; light shining from top
      this.sunlight.castShadow = true; // default false
      this.sunlight.distance = this.sceneVariables.camera.shadowDistance; // default false
      this.sunlight.shadow.camera.far = this.sceneVariables.camera.shadowDistance; // default false
      this.sunlight.shadow.camera.left = -this.sceneVariables.camera.shadowDistance; // default false
      this.sunlight.shadow.camera.right = this.sceneVariables.camera.shadowDistance; // default false
      this.sunlight.shadow.camera.bottom = -this.sceneVariables.camera.shadowDistance; // default false
      this.sunlight.shadow.camera.top = this.sceneVariables.camera.shadowDistance; // default false
      if (!window.chrome)
      {
        this.sunlight.shadow.mapSize.width = 2048; // default
        this.sunlight.shadow.mapSize.height = 2048; // default
      }
      this.scene.add( this.sunlight );
      this.sunlighTarget = new THREE.Object3D();
      this.scene.add( this.sunlighTarget );
      // this.scene.add(new THREE.CameraHelper(this.sunlight.shadow.camera)) 

      this.amlight = new THREE.AmbientLight( ambientintensity ); // soft white light
      this.scene.add( this.amlight );
      

      const roomPositiong = [-16,5,-12]
      const targetroomPositiong = [roomPositiong[0],roomPositiong[1]-5,roomPositiong[2]]
      // color, intensity, distance = 0, angle = Math.PI / 3, penumbra = 0, decay = 1
      this.roomlight = new THREE.SpotLight( 0xffdd77, 0 );
      this.roomlight.position.set( ...roomPositiong ); //default; light shining from top
      this.roomlight.castShadow = true; // default false
      this.roomlight.penumbra = 0.9 // default false
      this.roomlight.angle = Math.PI/4 // default false
      this.scene.add( this.roomlight );
      this.roomlightTarget = new THREE.Object3D();
      this.roomlightTarget.position.set( ...targetroomPositiong )
      this.scene.add( this.roomlightTarget );
      this.roomlight.target = this.roomlightTarget
    },
  }
}