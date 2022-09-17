<template>
  <div >
      <!-- my scene -->
    <!-- <div @click="setRenderer">
      butn
    </div> -->
    <canvas ref="canvas" class="w-100 pos-fixed">
    </canvas>
  </div>
</template>
<script>
import * as THREE from "three";
import { OBJLoader } from "../loaders/OBJLoader.js";

import { getInitialState } from "../../res/js/get_initial_state.js";
import { loadStar } from "../../res/js/load_stars.js";
import { newtorus, newring } from "../../res/js/load_space_objects.js";

import scrollmixin from "./scroll_mixin.js";
import raycastmixin from "./raycast_mixin.js";
import animationmixin from "./animation_mixin.js";
import connectOrb from "./connect-orb.js";
import levelOne from "./level-one.js";
import texts from "./texts.js";

//No se si es necesario
import { MTLLoader } from "../../res/loaders/MTLLoader.js";
// const textloader = new THREE.FontLoader();

const BASE_URL = "http://localhost:3000/";
// const BASE_ASSET_URL = "./dist/res"
const BASE_ASSET_URL = "./res";
export default {
  name: 'my-scene',    
  mixins: [scrollmixin, raycastmixin, animationmixin, connectOrb, levelOne, texts],
  data()
  {
    return {
      // scene: null,
      // camera: null,
      // scrollPosition: null,
      
      // sceneBreakpoints: {
      //   default: [],
      //   mobile: [1900, 4500, 8500, 9000, 16500],
      //   desktop: [2400, 3500, 7500, 11000, 14000],
      // },
      // sceneVariables: {
      //   camera: {
      //     pos: [0, 0, 9],
      //     rot: [0.5, 0, 0],
      //     fov: 75,
      //     fovSettings: {
      //       mobile: 120,
      //       desktop: 75,
      //     },
      //     minReach: 0.1,
      //     maxReach: 1000,
      //   },
      // },
      // renderer: null,
      // DOM: {
      //   ratio: null,
      //   height: null,
      // },
    };
  },
        computed: {
            LANG()                  { return this.$store.getters.LANG },
            accs_length()           { return this.$store.getters.accs_length },
            first_acc()             { return this.$store.getters.first_acc },
            dark_mode()             { return this.$store.getters.dark_mode },
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
  methods: {
    _animate() {
      // this.scrollPosition = window.scrollY;
      // console.log("qwe")
      this.raycaster.setFromCamera( this.pointer, this.camera );
      this.updateAnimations()
      this.updateRaycaster()
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this._animate);
    },
    init() {

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
          pos: [0, -1, 9],
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

      this.loadSkeletonObjects();
      this.loadWireframeObjects();

      Array(200)
        .fill()
        .forEach(() => {
          this.loadAStar();
        });
      // this.loadTexts();
      this.loadSpaceObjects();

      this.setRenderer();
      this.setRaycaster();
        

      // this._animate()
      // this.renderer.render(this.scene, this.camera);
      this.updateScrollPosition()
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
      console.log("full height",this.DOM.height)
    },
    setScene()
    {
      this.scene = new THREE.Scene();

      // const spaceTexture = new THREE.TextureLoader().load("res/img/bg.jpg");
      // this.scene.background = spaceTexture;

      let camera = new THREE.PerspectiveCamera(
        this.sceneVariables.camera.fov,
        this.DOM.ratio,
        this.sceneVariables.camera.minReach,
        this.sceneVariables.camera.maxReach
      );
      this.camera = camera;
      this.camera.position.set(...this.sceneVariables.camera.pos);
      this.camera.rotation.set(...this.sceneVariables.camera.rot);


        this.light4 = new THREE.PointLight( 0xFFB442, 2, 8 );
        // light4.castShadow= true
        // light4.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xffaa00 } ) ) );
        this.light4.position.set(-1,-1.5,6)
        this.scene.add( this.light4 );

        //Create a DirectionalLight and turn on shadows for the light
    let light = new THREE.DirectionalLight( 0xffffff, 0.2 );
    // const light = new THREE.DirectionalLight( 0xffffff, 1 );
    light.position.set( 3,5,3 ); //default; light shining from top
    light.castShadow = true; // default false

    // let ambientintensity = 0x404040
    let ambientintensity = this.dark_mode ? 0x404040 : 0x909090
    let sunintensity = this.dark_mode ? 1.6 : 2

    this.sunlight = new THREE.DirectionalLight( 0xFFA859, sunintensity );
    this.sunlight.position.set( 10,2,6 ); //default; light shining from top
    this.sunlight.castShadow = true; // default false
    this.sunlight.shadow.camera.near = 0.5; // default
    this.sunlight.shadow.camera.far = 500; // default
    // this.scene.add( light );
    this.scene.add( this.sunlight );

    //Set up shadow properties for the light
    light.shadow.mapSize.width = 512; // default
    light.shadow.mapSize.height = 512; // default
    light.shadow.camera.near = 0.5; // default
    light.shadow.camera.far = 500; // default
      // this.scene.add(new THREE.CameraHelper(light.shadow.camera)) 

const amlight = new THREE.AmbientLight( ambientintensity ); // soft white light
this.scene.add( amlight );

    },
    // orbit controls
    // controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    //     controls.dampingFactor = 0.05;
    //     controls.screenSpacePanning = true;
    //     controls.minDistance = 100;
    //     controls.maxDistance = 500;
    //     controls.maxPolarAngle = Math.PI / 1.5;
    //     controls.target.set( 0, 100, 0 );
    loadSkeletonObjects()
    {

    },
    loadWireframeObjects()
    {
//       var planeGeometry = new THREE.PlaneGeometry(60,20); 
// var planeMaterial = new THREE.MeshLambertMaterial({color: 
//    0xffffff}); 
// var plane = new THREE.Mesh(planeGeometry, planeMaterial); 
// var cubeGeometry = new THREE.BoxGeometry(4,4,4); 
// var cubeMaterial = new THREE.MeshLambertMaterial({color: 
//    0xff0000}); 
// var cube = new THREE.Mesh(cubeGeometry, cubeMaterial); 
// var sphereGeometry = new THREE.SphereGeometry(2,8,8); 
// var sphereMaterial = new THREE.MeshLambertMaterial({color: 
//    0x7777ff}); 
// var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial); 

//       this.scene.add(plane);
//       this.scene.add(cube);
      // this.scene.add(sphere);

      //Create a sphere that cast shadows (but does not receive them)
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
// this.scene.add( plane );

// return
//       // this.rocketpivot = new THREE.Group();
//       const rocketgeometry = new THREE.BoxGeometry(1,1,1);
//       this.rocketMesh = new THREE.Mesh(
//         rocketgeometry,
//         new THREE.MeshStandardMaterial({ color: 0x777777 })
//       );
//       this.rocketMesh.castshadow = true
//       this.rocketMesh.receiveshadow = true

//       // rocketgeometry.castshadow = true
//       // rocketgeometry.receiveshadow = true
//       this.rocketMesh.position.set(0, 2, 4)
//       this.rocketMesh.rotation.set(0.25, -0.4, 0)
//       this.scene.add(this.rocketMesh);

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
          // if( child.material ) {
          //         child.material.side = THREE.DoubleSide;
          //     }

         } );

          object.castshadow = true
          object.receiveShadow = true
          // object.traverse(function (child) {
          //   if (child.isMesh) {
          //     child.castshadow = true
          //     child.receiveshadow = true
          //     child.material = new THREE.MeshStandardMaterial({
          //       color: 0xffffff,
          //       // wireframe: true,
          //       // castshadow: 3,
          //       // receiveShadow: 3,
          //       // linewidth: 3,
          //     });
          //   }
          // });
          object.position.set(0, -2, 0);
          // object.scale.set(15, 15, 15);
          // object.scale.set(3, 3, 3);
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

      return

      new OBJLoader()
        // .setMaterials( materials )
        .setPath(BASE_ASSET_URL + "/models/")
        .load(
          "ready land.obj",
          (object) => {
            object.traverse(function (child) {
              if (child.isMesh) {
                child.material = new THREE.MeshBasicMaterial({ color: 0x000000 });
              }
            });

            // object.castshadow = - 1;
            object.position.set(0, -0.85 - 0.025, -35);
            // object.position.x = - 3;
            object.scale.set(15, 15, 15);
            this.scene.add(object);
          },
          this.onLoadProgress
        );
    },
    loadAStar()
    {

    },
    // loadTexts()
    // {

    // },
    loadSpaceObjects()
    {

    },
    setRenderer()
    {
      // let canvasElement = document.querySelector("#canvas")
      // if (!canvasElement) return
      // console.log(canvasElement)
      this.renderer = new THREE.WebGLRenderer({
        // antialias: true,
        alpha: true,
        canvas: this.$refs.canvas,
        // canvas: canvasElement,
      });

      // this.renderer.shadowMapEnabled = true;
      // this.renderer.shadowMap.Enabled = true; 
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMapSoft = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    },
  },
};
export class MyScene {
  constructor(
    _initialState = {
      DEBUG: false,
      DOM: {},
      Objects: {},
      sceneBreakpoints: {},
      sceneVariables: {},
    }
  ) {
    const initialState = getInitialState();

    this.DEBUG = _initialState.DEBUG;
    this.DOM =                { ...initialState.DOM, ..._initialState.DOM, };
    this.Objects =            { ...initialState.Objects, ..._initialState.Objects, };
    this.sceneBreakpoints =   { ...initialState.sceneBreakpoints, ..._initialState.sceneBreakpoints, };
    this.sceneVariables =     { ...initialState.sceneVariables, ..._initialState.sceneVariables, };

    this.init();
  }

  init() {
    this.setWindowRatio();
    this.setWindowSettings();
    this.setScene();

    this.loadSkeletonObjects();
    this.loadWireframeObjects();

    Array(200)
      .fill()
      .forEach(() => {
        this.loadAStar();
      });
    this.loadTexts();
    this.loadSpaceObjects();

    this.setRenderer();
    this.renderer.render(this.scene, this.camera);
  }

  setWindowRatio() {
    this.DOM.ratio = window.innerWidth / window.innerHeight;
    let platformKey = this.DOM.ratio > 1 ? "desktop" : "mobile";
    this.sceneBreakpoints.default = this.sceneBreakpoints[platformKey];
    this.sceneVariables.camera.fov =
      this.sceneVariables.camera.fovSettings[platformKey];
  }

  setWindowSettings() {
    this.DOM.height = Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    );
    console.log("full height",this.DOM.height)
  }
  OnWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
  setScene() {
    this.scene = new THREE.Scene();

    const spaceTexture = new THREE.TextureLoader().load("res/img/bg.jpg");
    this.scene.background = spaceTexture;

    let camera = new THREE.PerspectiveCamera(
      this.sceneVariables.camera.fov,
      this.DOM.ratio,
      this.sceneVariables.camera.minReach,
      this.sceneVariables.camera.maxReach
    );
    camera.position.set(...this.sceneVariables.camera.pos);
    camera.rotation.set(...this.sceneVariables.camera.rot);
    this.camera = camera;
  }
  setRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      // antialias: true,
      canvas: document.querySelector("#bg"),
    });

    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    // console.log(window.innerWidth, window.innerHeight)
  }
  onLoadProgress(xhr) {
    if (xhr.lengthComputable) {
      const percentComplete = (xhr.loaded / xhr.total) * 100;

      if (this.DEBUG) {
        console.log("loading objects...");
        let loadTarget = xhr.currentTarget.responseURL.replace(BASE_URL, "");
        console.log(
          loadTarget,
          Math.round(percentComplete, 2) + "% downloaded"
        );
      }
    }
  }
  loadSkeletonObjects() {
    for (const property in this.Objects) {
      // console.log(`${property}: ${object[property]}`);
      new OBJLoader().setPath(this.Objects[property].path).load(
        this.Objects[property].file,
        (object) => {
          if (
            this.Objects[property].wireframe ||
            this.Objects[property].wiremat
          ) {
            object.traverse(function (child) {
              if (child.isMesh) {
                child.material = new THREE.MeshBasicMaterial({
                  color: 0xffffff,
                  wireframe: true,
                });
              }
            });
          }
          object.position.set(
            this.Objects[property].pos[0],
            this.Objects[property].pos[1],
            this.Objects[property].pos[2]
          );
          object.rotation.set(
            this.Objects[property].rot[0],
            this.Objects[property].rot[1],
            this.Objects[property].rot[2]
          );
          object.scale.set(
            this.Objects[property].scale[0],
            this.Objects[property].scale[1],
            this.Objects[property].scale[2]
          );

          this.scene.add(object);

          if (this.Objects[property].wiremat) {
            new OBJLoader().setPath(this.Objects[property].path).load(
              this.Objects[property].file,
              (object) => {
                object.position.set(...this.Objects[property].pos);
                object.rotation.set(...this.Objects[property].rot);
                object.scale.set(...this.Objects[property].scale);
                this.scene.add(object);
              },
              this.onLoadProgress
            );
          }
        },
        this.onLoadProgress
      );
    }
  }

  loadWireframeObjects() {
    new OBJLoader().setPath(BASE_ASSET_URL + "/models/").load(
      "ready land.obj",
      (object) => {
        object.traverse(function (child) {
          if (child.isMesh) {
            child.material = new THREE.MeshBasicMaterial({
              color: 0xffffff,
              wireframe: true,
              linewidth: 3,
            });
          }
        });
        object.position.set(0, -0.85, -35);
        object.scale.set(15, 15, 15);
        this.scene.add(object);
      },
      this.onLoadProgress
    );

    new OBJLoader()
      // .setMaterials( materials )
      .setPath(BASE_ASSET_URL + "/models/")
      .load(
        "ready land.obj",
        (object) => {
          object.traverse(function (child) {
            if (child.isMesh) {
              child.material = new THREE.MeshBasicMaterial({ color: 0x000000 });
            }
          });

          // object.castshadow = - 1;
          object.position.set(0, -0.85 - 0.025, -35);
          // object.position.x = - 3;
          object.scale.set(15, 15, 15);
          this.scene.add(object);
        },
        this.onLoadProgress
      );
  }
  loadSpaceObjects() {
    // ## planet ##
    let thePlanet = {
      pos: [-200, 120, -300],
      rot: [0, 0, 0],
      sphere: [32, 48, 48],
    };
    const planetTexture = new THREE.TextureLoader().load("res/img/DEGRADE-PLANETA.jpg");
    this.myPlanet = new THREE.Mesh(
      new THREE.SphereGeometry(...thePlanet.sphere),
      new THREE.MeshBasicMaterial({ map: planetTexture })
    );
    this.myPlanet.position.set(...thePlanet.pos);
    this.myPlanet.rotation.set(...thePlanet.rot);
    this.scene.add(this.myPlanet);
    // ## end planet ##

    // ## ring ##
    // let theRing = {
    //   pos: [...thePlanet.pos],
    //   // pos: [-200, 120, -300],
    //   rot: [2.4, 0, 3],
    //   torus: [45, 8, 12, 64],
    //   scale: [1, 1, 0.02],
    // };
    // const geometry = new THREE.TorusGeometry(...theRing.torus);
    // const ringTexture = new THREE.TextureLoader().load("res/img/998.jpg");
    // this.myRing = new THREE.Mesh(
    //   geometry,
    //   new THREE.MeshBasicMaterial({ map: ringTexture })
    // );

    let addring = newring();
    this.myRing = addring;

    // this.myRing.position.set(...theRing.pos);
    // this.myRing.rotation.set(...theRing.rot);
    // this.myRing.scale.set(...theRing.scale);
    this.scene.add(this.myRing);
    // ## end ring ##

    // ## rocket ##
    let theRocketRef = { ...this.Objects.rocket };
    let theRocketCenter = {
      pos: [theRocketRef.pos[0] - 20, theRocketRef.pos[1], theRocketRef.pos[2]],
      rot: [0, 0.5, 1],
      box: [35, 35, 35],
    };

    this.rocketpivot = new THREE.Group();
    const rocketgeometry = new THREE.BoxGeometry(...theRocketCenter.box);
    let rocketMesh = new THREE.Mesh(
      rocketgeometry,
      new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true })
    );
    let rocketSolid = new THREE.Mesh(
      rocketgeometry,
      new THREE.MeshBasicMaterial({ color: 0x000000 })
    );
    this.rocketpivot.add(rocketMesh);
    this.rocketpivot.add(rocketSolid);
    this.rocketpivot.position.set(...theRocketCenter.pos);
    this.scene.add(this.rocketpivot);
    // ## end rocket ##

    //Torus
    let addtorus = newtorus();
    this.torus = addtorus;
    this.scene.add(this.torus);
  }
  loadTexts() {
    const textloader = new THREE.FontLoader();
    const textmaterials = [
      new THREE.MeshBasicMaterial({ color: 0xffffff }), // front
      new THREE.MeshBasicMaterial({ color: 0x020226 }), // side
    ];
    textloader.load(
      "./res/style/fonts/Montserrat ExtraBold_Regular.json",
      (font) => {
        {
          const geometry = new THREE.TextGeometry("SOMOS UN ", {
            font: font,
            size: 1,
            height: 1,
          });
          const textMesh1 = new THREE.Mesh(geometry, textmaterials);
          textMesh1.position.set(-4, 1.5, 10);
          this.scene.add(textMesh1);
        }
        {
          const geometry = new THREE.TextGeometry("UNIVERSO CREATIVO", {
            font: font,
            size: 2,
            height: 1,
          });
          const textMesh1 = new THREE.Mesh(geometry, textmaterials);
          textMesh1.position.set(-16, -0.7, 9);
          this.scene.add(textMesh1);
        }
        {
          const geometry = new THREE.TextGeometry("¿Qué hacemos por ti?", {
            font: font,
            size: 12,
            height: 1,
          });
          const textMesh1 = new THREE.Mesh(geometry, textmaterials);
          textMesh1.rotation.x = 0.6;
          textMesh1.position.set(180, 80, 30);
          this.scene.add(textMesh1);
        }
        {
          const geometry = new THREE.TextGeometry("Archenautas", {
            font: font,
            size: 22,
            height: 5,
          });
          const textMesh1 = new THREE.Mesh(geometry, textmaterials);
          textMesh1.rotation.x = 0.5;
          textMesh1.position.set(1200, 67, 55);
          this.scene.add(textMesh1);
        }
      }
    );
  }
  loadAStar() {
    let newStars = loadStar();
    // let stars = this.scene.add(newStars);
    this.scene.add(newStars);
  }
}

</script>
