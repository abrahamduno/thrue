import * as THREE from "three";
import { OBJLoader } from "../../../scripts/loaders/OBJLoader.js";

import npcContainer from "../../system/npc-container.js";
import player from "./player.js";

import animateLevelThree from "./animate-level-3.js";
import startLevelBlob from "./models/start-game.js";
import startPersonHead from "./models/start-person-bubblehead.js";

import ticketer from "../../models/ticketer.obj.js";
import farm from "../../models/farm.obj.js";

const BASE_URL = "http://localhost:3000/";
const BASE_ASSET_URL = "./res";
export default {
  mixins: [
    npcContainer,

    animateLevelThree,
    startLevelBlob,
    startPersonHead,
    ticketer,
    farm,

    player,
  ],
  data()
  {
    return {
      l_$npcList:[ "bed", "shower", "fridge", "mailbox", ],
    }
  },
  methods:
  {
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
      this.p_$init_player({pos:[-13,0.25,-4]})
      this.p_$setOrbitToPlayerPos()
    },
    l_$checkGoals()
    {
      // let input = prompt("Amount",1)
      // let input = prompt("Amount",1)
      console.log("this.enable_help",this.enable_help)

      if (!this.goals)
      {
        alert("please wait for game to load")
        return
        this.__YOU_LOSE()
      }
      // ... (next scene) | implement go to town ? 
      this.__YOU_WIN()
    },
    __YOU_WIN()
    {
      alert("Hello World!")
    },
    __YOU_LOSE()
    {
      alert("Failed")
    },



    clickedLevelHelp()
    {
      // this.enable_help++
      this.show_help = false
      // alert("clickHelp: "+this.enable_help)
    },
    _$click_currentLevel()
    {
      // this.checkNavigationClick()
      // this.__orbitcontrols.update();

      this.$click_startLevelBlob()

      // INTERSECTED = MOUSE POINTER HOVERING OVER OBJECT from raycaster
      if(this.INTERSECTED && this.mysign && this.INTERSECTED == this.mysign.children[0])
      {
        this.clickedBubbleHeadHead()
      }
      
      if(this.ticketer && this.INTERSECTED && this.INTERSECTED == this.ticketer.children[0])
      {
        this.goals.tickets++
        this.clickTicketer()
      }

      if(this.myfarm && this.INTERSECTED && this.INTERSECTED == this.myfarm.children[0])
      {
        this.goals.hay++
        this.clickFarm()
      }
    },

    l_$addLight()
    {
      let suncolor = this.dark_mode ? 0xF9B871 : 0xF7E0B0
      let sunintensity = this.dark_mode ? 1.2 : 0.9
      let ambientintensity = this.dark_mode ? 0x404040 : 0x909090

      // this.sunlight.position.lookAt( 0,0,0 ); //default; light shining from top
      // this.sunlight = new THREE.SpotLight( suncolor );
      this.sunlight = new THREE.DirectionalLight( suncolor, sunintensity );
      this.sunlight.position.set( -15,9,10 ); //default; light shining from top
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

      const amlight = new THREE.AmbientLight( ambientintensity ); // soft white light
      this.scene.add( amlight );
      

      const roomPositiong = [-16,5,-12]
      const targetroomPositiong = [roomPositiong[0],roomPositiong[1]-5,roomPositiong[2]]
      // color, intensity, distance = 0, angle = Math.PI / 3, penumbra = 0, decay = 1
      this.roomlight = new THREE.SpotLight( 0xffdd77, 0.5 );
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
          object.traverse( this.baseStandardMaterial(0xaaaaaa) );
          object.position.set(0, -50, 0);
          this.mycurrentlevel = object
          this.scene.add(this.mycurrentlevel);

          this.__addLevelMesh()
      }, this.onLoadProgress );
    },
    __addLevelMesh()
    {
      new OBJLoader().setPath(BASE_ASSET_URL + "/models/").load(
        "path3.obj",
        (object) => {
          object.traverse( this.baseStandardMaterial(0xffffff) );
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

      let defaultNPCClickFunction = (_npcName) => {
        // alert("You've Clicked "+`${_npcName}`)
        // console.log(`${_npcName} (${this.NPCClickCounter[_npcName]})`)
        if (this.p_$localQ && _npcName == this.p_$localQ.npcRef)
        {
          this.p_$localQ = null
        } else {
          if (this.NPCClickCounter[_npcName] == 1 && this.NPCBaseContainer[_npcName].npcStat)
          {
            {
              let theStat = this.NPCBaseContainer[_npcName].npcStat

                // if (this.p_$localQ)
                {
                  this.p_$localQ = {
                    id:"0",
                    stat: theStat,
                    npcRef:_npcName,
                  }
                  this.p_$localQ.actions = this.p_$availableActions(_npcName)
                  // console.log(this.p_$localQ)
                }
                this.NPCContainer[_npcName].rotation.y = 0.5

            }
            
          }
        }
        this.NPCClickCounter[_npcName]--

        // this.NPCContainer[_npcName].position.y = 50;
        // this.NPCContainer[_npcName].visible = false
      }


      npcName = "1car"
      this._$add_npc({name:npcName,obj:"standardcar.obj",
        pos: [-80,this.MIN.y,-72],rot: [0,Math.PI/2,0], color: 0xFFD8BA,
        animation:{type:"constant",path:["x"],value:0.3,add:[{loop:80}]},
      });


      npcName = "bed"
      npcStat = "energy"
      this._$add_npc({name:npcName,obj:"bed.obj",
        pos: [-19.7,this.MIN.y+0.25,-10.9], color: 0xaaaaaa,
        click: defaultNPCClickFunction,
        npcStat:npcStat,
      });
      npcName = "shower"
      npcStat = "hygene"
      this._$add_npc({name:npcName,obj:"shower.obj",
        pos: [-20.5,this.MIN.y+0.25,-15.9], color: 0xaaaaaa,
        click: defaultNPCClickFunction,
        npcStat:npcStat,
      });
      npcName = "fridge"
      npcStat = "hunger"
      this._$add_npc({name:npcName,obj:"fridge.obj",
        pos: [-17,this.MIN.y+0.25,-15.9], playerpos: [-17,this.MIN.y+0.25,-14], color: 0xaaaaaa,
        playerrot:[0,Math.PI,0],
        click: defaultNPCClickFunction,
        npcStat:npcStat,
      });
      npcName = "mailbox"
      npcStat = "fun"
      this._$add_npc({name:npcName,obj:"mailbox.obj",
        pos: [-13,this.MIN.y+0.25,-1.5], color: 0xaaaaaa,
        click: defaultNPCClickFunction,
        npcStat:npcStat,
      });

      npcName = "floorhouse"
      this._$add_npc({name:npcName,BoxGeometry: [9.1,0.1,8.9],
        pos: [-16.3,this.MIN.y+0.25,-12], rot:[0,0,0], color: 0x999999,
      //   animation:{type:"sin",path:["y"],value:0.02},
      });
    },
  }
}


















              // this.$store.dispatch("setPlayerStats",{
              //   id:"0",
              //   stats:{
              //     [theStat]: parseFloat(this.__player.stats[theStat])+1,
              //   },
              // })
              // this.$store.dispatch("addToPlayerQ",{
              //     id:"0",
              //     q: [
              //       { stat:theStat, t:Date.now(), d:7500 }
              //     ]
              //   },
              // )

              // this.NPCContainer[_npcName].rotation.x = 0.2
              // this.__orbitcontrols.target.set(this.NPCContainer[_npcName].position.x,this.NPCContainer[_npcName].position.y,this.NPCContainer[_npcName].position.z)

              // console.table({newPosX,newPosZ})
              // this.NPCBaseContainer[_npcName].playerpos
              // this.NPCBaseContainer[_npcName].playerrot











              // if (this.NPCBaseContainer[_npcName].playerpos)
              // {
              //   this.$store.dispatch("setPlayerPosition",{
              //     id:"0",
              //     pos:[
              //       this.NPCBaseContainer[_npcName].playerpos[0],
              //       this.__player.pos[1],
              //       this.NPCBaseContainer[_npcName].playerpos[2]
              //     ]
              //   })
              //   this.__orbitcontrols.target.set(...this.NPCBaseContainer[_npcName].playerpos)
              // }
              // if (this.NPCBaseContainer[_npcName].playerrot)
              // {
              //   this.$store.dispatch("setPlayerRotation",{
              //     id:"0",
              //     pos:[ 
              //       this.__player.pos[0],
              //       this.NPCBaseContainer[_npcName].playerrot[1],
              //       this.__player.pos[2],
              //     ]
              //   })
              // }











              // this.NPCContainer[_npcName].rotation.z = 0.2
            // if (this.__player.stats[theStat] < 10)
            // {
            // } else {
            //   alert("You are sinnin "+theStat)
            // }