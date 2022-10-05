import * as THREE from "three";
import { OBJLoader } from "../../../../scripts/loaders/OBJLoader.js";
import baseStandardMaterial from "../../../../scripts/constants/baseStandardMaterial.js";

import animateLevel from "./level-update.js";
import player from "./player.js";

import startLevelBlob from "../models/start-game.js";
import startPersonHead from "../models/start-person-bubblehead.js";

const BASE_URL = "http://localhost:3000/";
const BASE_ASSET_URL = "./res";
export default {
  mixins: [
    baseStandardMaterial,

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
    l_$initLevel()
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
    __initLevelScene()
    {
      this.goals = {
        tickets: 0,
        hay: 0,
        hunger: 0,
        hygene: 0,
        energy: 0,
        fun: 0,
      }
      this.camera.position.set(5,3,-2)
      this.p_$init_player({pos:[-8.5,0,-13]})
      this.p_$setOrbitToPlayerPos(-1.5)
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
    l_$addCurrentLevelScene()
    {
      this.__initLevelScene()

      new OBJLoader().setPath(BASE_ASSET_URL + "/models/").load(
        "levelthree.obj",
        (object) => {
          object.traverse( this.baseStandardMaterial(0xd4cac7) );
          object.position.set(0, -50, 0);
          this.mycurrentlevel = object
          this.scene.add(this.mycurrentlevel);
          this.mycurrentlevel.name = "mycurrentlevel"

          this.__addLevelMesh()
      }, this.onLoadProgress );
    },
    __addLevelMesh()
    {
      new OBJLoader().setPath(BASE_ASSET_URL + "/models/").load(
        "path3.obj",
        (object) => {
          object.traverse( this.baseStandardMaterial(0xaaaaaa) );
          object.position.set(0, this.MIN.y, 0);
          this.scene.add(object);

      }, this.onLoadProgress );
      new OBJLoader().setPath(BASE_ASSET_URL + "/models/").load(
        "levelthreeg.obj",
        (object) => {
          object.traverse( this.baseStandardMaterial(0x51BE48) );
          object.position.set(0, this.MIN.y, 0);
          this.scene.add(object);

      }, this.onLoadProgress );
      new OBJLoader().setPath(BASE_ASSET_URL + "/models/").load(
        "levelthreen.obj",
        (object) => {
          object.traverse( this.baseStandardMaterial(0x95875D) );
          object.position.set(0, this.MIN.y, 0);
          this.scene.add(object);

      }, this.onLoadProgress );
      new OBJLoader().setPath(BASE_ASSET_URL + "/models/").load(
        "levelthreew.obj",
        (object) => {
          object.traverse( this.wireframeMaterial(0xffffff) );
          object.position.set(0, this.MIN.y, 0);
          this.scene.add(object);

      }, this.onLoadProgress );
      
      // this.addFarm();
      let npcStat = ""
      let npcName = ""
      this._$init_npcContainer()


      npcName = "ghost1"
      this._$add_npc({name:npcName,obj:"aplayer.obj",
        pos: [-30,this.MIN.y,-144], color: 0x777777,
        animation:{type:"circle",path:["z","x"],value:8,speed:0.005,add:[{rot:"y"}]},
        click: this.__clickedGhost,
      });
      npcName = "storm"
      this._$add_npc({name:npcName,obj:"lightning.obj",
        pos: [18,this.MIN.y+5000,-65], color: 0xffffff, scale:[1,1,1], light: true,
        animation:{type:"-constant",path:["y"],value:3,add:[{loop:-5}]},
        click: this.__clickedGhost,
      });

      npcName = "1car"
      this._$add_npc({name:npcName,obj:"standardcar.obj",
        pos: [-6.4,this.MIN.y,-158], color: 0xFFD8BA,
        animation:{type:"constant",path:["z"],value:0.3,add:[{loop:27}]},
      });


      npcName = "3car"
      this._$add_npc({name:npcName,obj:"standardcar.obj",
        pos: [-0.75,this.MIN.y,27], color: 0xD8BAFF  ,
        animation:{type:"-constant",path:["z"],value:0.4,add:[{loop:-158}]},
      });

      npcName = "4car"
      this._$add_npc({name:npcName,obj:"standardcar.obj",
        pos: [-140,this.MIN.y,-44.5], rot:[0,Math.PI/2,0],color: 0xD8FFBA,
        animation:{type:"constant",path:["x"],value:0.15,add:[{loop:25}]},
      });

      npcName = "bed"
      npcStat = "energy"
      this._$add_npc({name:npcName,obj:"bed.obj",
        pos: [-19.5,this.MIN.y,-11.6],
        playerpos: [-18.2,this.MIN.y,-11.6],color: 0xdddddd,
        playerrot:[0,-Math.PI/3,0],
        click: this.__defaultNPCClickFunction,
        npcStat:npcStat,
      });
      npcName = "shower"
      npcStat = "hygene"
      this._$add_npc({name:npcName,obj:"shower.obj",
        pos: [-15.7,this.MIN.y,-8.15],
        playerpos: [-15.4,this.MIN.y,-8.2], color: 0xbbbbbb,
        playerrot:[0,-Math.PI/1.7,0],
        click: this.__defaultNPCClickFunction,
        npcStat:npcStat,
      });
      npcName = "fridge"
      npcStat = "hunger"
      this._$add_npc({name:npcName,obj:"fridge.obj",
        pos: [-12.2,this.MIN.y,-15.9],
        playerpos: [-12.5,this.MIN.y,-14.6], color: 0xe7e7e7,
        playerrot:[0,Math.PI*0.9,0],
        click: this.__defaultNPCClickFunction,
        npcStat:npcStat,
      });
      npcName = "mailbox"
      npcStat = "fun"
      this._$add_npc({name:npcName,obj:"mailbox.obj",
        pos: [-10.5,this.MIN.y,-9], color: 0xeeeeee,
        playerpos: [-9,this.MIN.y,-9.5],
        playerrot:[0,-Math.PI/3,0],
        click: this.__defaultNPCClickFunction,
        npcStat:npcStat,
      });

      npcName = "floorhouse"
      this._$add_npc({name:npcName,BoxGeometry: [9.25,0.1,8.9],
        pos: [-16.35,this.MIN.y,-12], rot:[0,0,0], color: 0x84A1AA,
        click: this.__staticNPCClickFunction,
      //   animation:{type:"sin",path:["y"],value:0.02},
      });
      npcName = "housebush"
      npcStat = "energy"
      this._$add_npc({name:npcName,obj:"bush.obj",
        pos: [-11,this.MIN.y,-18], color: 0x64B650, scale:[1,0.65,1],
        playerpos: [-10.5,this.MIN.y,-16.5],
        playerrot:[0,-Math.PI/1.2,0],
        click: this.__defaultNPCClickFunction,
        npcStat:npcStat,
      });


      npcName = "closecornerbush"
      npcStat = "fun"
      this._$add_npc({name:npcName,obj:"bush.obj",
        pos: [-21,this.MIN.y,-38], color: 0x64B650,
        playerpos: [-19.5,this.MIN.y,-37.5],
        playerrot:[0,-Math.PI/1.8,0],
        click: this.__defaultNPCClickFunction,
        npcStat:npcStat,
      });
      npcName = "tunnelbush"
      npcStat = "fun"
      this._$add_npc({name:npcName,obj:"bush.obj",
        pos: [6,this.MIN.y-0.1,-55], color: 0x64B650, scale:[0.6,1.5,0.75],
        playerpos: [4.5,this.MIN.y,-55],
        playerrot:[0,Math.PI/2,0],
        click: this.__defaultNPCClickFunction,
        npcStat:npcStat,
      });

      npcName = "mailboxneigh"
      npcStat = "fun"
      this._$add_npc({name:npcName,obj:"mailbox.obj",
        pos: [-49,this.MIN.y,-54], color: 0xaaaaaa,
        playerpos: [-49,this.MIN.y,-53.5],
        playerrot:[0,-Math.PI,0],
        click: this.__defaultNPCClickFunction,
        npcStat:npcStat,
      });



      npcName = "closecementerybush"
      npcStat = "fun"
      this._$add_npc({name:npcName,obj:"bush.obj",
        pos: [7,this.MIN.y-1,-95], color: 0x64B650, scale:[1,1.65,2.1],
        playerpos: [4.5,this.MIN.y,-95],
        playerrot:[0,Math.PI/3,0],
        click: this.__defaultNPCClickFunction,
        npcStat:npcStat,
      });
    },
  }
}