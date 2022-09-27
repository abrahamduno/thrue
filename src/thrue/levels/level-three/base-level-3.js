import * as THREE from "three";
import { OBJLoader } from "../../../scripts/loaders/OBJLoader.js";

import npcContainer from "../../system/npc-container.js";
import player from "./player.js";

import animateLevelThree from "./animate-level-3.js";
import startLevelBlob from "./start-game.js";
import bubbleHead from "./bubble-head.js";

import ticketer from "../../models/ticketer.obj.js";
import farm from "../../models/farm.obj.js";

const BASE_URL = "http://localhost:3000/";
const BASE_ASSET_URL = "./res";
export default {
  mixins: [
    npcContainer,

    animateLevelThree,
    startLevelBlob,
    bubbleHead,
    ticketer,
    farm,

    player,
  ],
  methods:
  {
    initLevelOne()
    {
      this.goals = {
        tickets: 0,
        hay: 0,
        hunger: 0,
        hygene: 0,
        energy: 0,
        fun: 0,
      }
      this.$init_player()
    },
    checkGoals()
    {
      // let input = prompt("Amount",1)
      // let input = prompt("Amount",1)
      console.log("this.enable_help",this.enable_help)

      if (!this.goals)
      {
        alert("please wait for game to load")
        return
        this.YOU_LOSE()
      }
      if (this.goals.hay < 3)
      {
        alert("hay")
        this.YOU_LOSE()
        return
      }
      if ( !this.NPCClickCounter.Molly
        || !this.NPCClickCounter.Lucy
        || !this.NPCClickCounter.Amy
        || !this.NPCClickCounter.Mia)
      {
        alert("Molly Lucy Amy Mia")
        this.YOU_LOSE()
        return
      }
      if (this.enable_help < 2)
      {
        alert("enable_help")
        this.YOU_LOSE()
        return
      }

      this.enable_help++
      this.show_help = true
      this.YOU_WIN()
      setTimeout(() => {
        localStorage.setItem("currentLevel", JSON.stringify("levelTwo"));
        this.$store.dispatch("setCurrentLevel", "levelTwo")
        this.$nextTick(() => {
          window.location.reload()
        })
        // let newMode = !this.auto_mode
        // this.$store.dispatch("setAutoMode", newMode)
        
      },1000)
    },
    YOU_WIN()
    {
      alert("you win")
    },
    YOU_LOSE()
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
      this.checkNavigationClick()

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



    addLight()
    {
      let suncolor = this.dark_mode ? 0xF9B871 : 0xF7E0B0
      let sunintensity = this.dark_mode ? 1.2 : 0.9
      let ambientintensity = this.dark_mode ? 0x404040 : 0x909090

      // this.light4 = new THREE.PointLight( 0xffffff, 0.5, 8 );
      // this.light4.position.set(-1,2.5,6)
      // this.scene.add( this.light4 );

      // this.sunlight = new THREE.SpotLight( suncolor );
      this.sunlight = new THREE.DirectionalLight( suncolor, sunintensity );
      this.sunlight.position.set( -15,9,10 ); //default; light shining from top
      // this.sunlight.position.lookAt( 0,0,0 ); //default; light shining from top
      this.sunlight.castShadow = true; // default false
      this.sunlight.distance = this.sceneVariables.camera.shadowDistance; // default false
      this.sunlight.shadow.camera.far = this.sceneVariables.camera.shadowDistance; // default false
      this.sunlight.shadow.camera.left = -this.sceneVariables.camera.shadowDistance; // default false
      this.sunlight.shadow.camera.right = this.sceneVariables.camera.shadowDistance; // default false
      this.sunlight.shadow.camera.bottom = -this.sceneVariables.camera.shadowDistance; // default false
      this.sunlight.shadow.camera.top = this.sceneVariables.camera.shadowDistance; // default false
      // this.sunlight.penumbra = 0.9 // default false
      // this.sunlight.penumbra = 0.9 // default false
      // this.sunlight.shadow.camera.near = 0.5; // default
      // this.sunlight.shadow.camera.far = 500; // default
      if (!window.chrome)
      {
        this.sunlight.shadow.mapSize.width = 2048; // default
        this.sunlight.shadow.mapSize.height = 2048; // default
      }
      this.scene.add( this.sunlight );
      this.sunlighTarget = new THREE.Object3D();
      this.scene.add( this.sunlighTarget );
      // this.sunlighTarget.position.z = -30
      // this.sunlight.target = this.sunlighTarget

      // this.scene.add(new THREE.CameraHelper(this.sunlight.shadow.camera)) 

      const amlight = new THREE.AmbientLight( ambientintensity ); // soft white light
      this.scene.add( amlight );
    },
    addCurrentLevel(  ) {
      this.initLevelOne()

      new OBJLoader().setPath(BASE_ASSET_URL + "/models/").load(
        "levelthree.obj",
        (object) => {
          object.traverse( this.baseStandardMaterial(0xaaaaaa) );
          object.position.set(0, -50, 0);
          this.mycurrentlevel = object
          this.scene.add(this.mycurrentlevel);

          this.addLevelMesh()
      }, this.onLoadProgress );
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
    },
    addLevelMesh()
    {
      // this.addFarm();
      let npcName = ""
      this.$init_npcContainer()
      let defaultNPCFoundFunction = (_npcName) => {
        alert("You've found "+`${_npcName}`)
        this.NPCContainer[_npcName].position.y = 50;
        this.NPCContainer[_npcName].visible = false
      }

      let defaultNPCClickFunction = (_npcName) => {
        // alert("You've Clicked "+`${_npcName}`)
        console.log(`${_npcName} (${this.NPCClickCounter[_npcName]})`)
        if (this.NPCClickCounter[_npcName] == 1)
        {
          // console.log(this.$player.stats.energy)
          // const statList = ["energy","hunger","hygene","fun"]
          // for (var i = 0; i < statList.length; i++)
          {
            let theStat = _npcName
            if (this.__player.stats[theStat] < 10)
            {
              this.$store.dispatch("setPlayerStats",{
                id:"0",
                stats:{
                  [theStat]: parseFloat(this.__player.stats[theStat])+1,
                },
              })
            } else {
              alert("You can't action with full "+theStat)
            }
          }
          
          this.NPCClickCounter[_npcName]--
        }
        // this.NPCContainer[_npcName].position.y = 50;
        // this.NPCContainer[_npcName].visible = false
      }

      // npcName = "Lucy"
      // this.$add_npc({name:npcName,obj:"achiken.obj",
      //   pos: [-2,this.MIN.y,-1.15], color: 0xFFD8BA,
      //   animation:{type:"circle",path:["z","x"],value:1,add:[{rot:"y"}]},
      //   click: defaultNPCFoundFunction,
      // });

      npcName = "1car"
      this.$add_npc({name:npcName,obj:"standardcar.obj",
        pos: [-80,this.MIN.y,-72],rot: [0,Math.PI/2,0], color: 0xFFD8BA,
        animation:{type:"constant",path:["x"],value:0.3,add:[{loop:80}]},
        // click: defaultNPCFoundFunction,
      });

      npcName = "Mia"
      this.$add_npc({name:npcName,obj:"achiken.obj",
        pos: [6.5,this.MIN.y+.2,-23.5], scale: [1.6,1.6,1.6], color: 0xFFC88A,
        animation:{type:"circle",path:["x","z"],value:1.3,speed:0.005,add:[{rot:"y"}]},
        click: defaultNPCFoundFunction,
      });
      npcName = "Amy"
      this.$add_npc({name:npcName,obj:"achiken.obj",
        pos: [9,this.MIN.y-0.25,-45],scale:[2,2,2], color: 0xFFC88A,
        animation:{type:"sin",path:["y"],value:0.02,add:[{rot:"y"}]},
        click: defaultNPCFoundFunction,
      });



      npcName = "energy"
      this.$add_npc({name:npcName,obj:"bed.obj",
        pos: [-19.7,this.MIN.y+0.25,-10.9], color: 0xaaaaaa,
        // animation:{type:"sin",path:["y"],value:0.02,add:[{rot:"y"}]},
        click: defaultNPCClickFunction,
      });
      npcName = "hygene"
      this.$add_npc({name:npcName,obj:"shower.obj",
        pos: [-20.5,this.MIN.y+0.25,-15.9], color: 0xaaaaaa,
        // animation:{type:"sin",path:["y"],value:0.02,add:[{rot:"y"}]},
        click: defaultNPCClickFunction,
      });
      npcName = "hunger"
      this.$add_npc({name:npcName,obj:"fridge.obj",
        pos: [-17,this.MIN.y+0.25,-15.9], color: 0xaaaaaa,
        // animation:{type:"sin",path:["y"],value:0.02,add:[{rot:"y"}]},
        click: defaultNPCClickFunction,
      });
      npcName = "fun"
      this.$add_npc({name:npcName,obj:"mailbox.obj",
        pos: [-13,this.MIN.y+0.25,-1.5], color: 0xaaaaaa,
        // animation:{type:"sin",path:["y"],value:0.02,add:[{rot:"y"}]},
        click: defaultNPCClickFunction,
      });




      // npcName = "Molly"
      // this.$add_npc({name:npcName,obj:"achiken.obj",
      //   pos: [0,this.MIN.y,-40],rot: [-0.5,0.2,0.4], color: 0xFFD8BA,
      //   animation:{type:"constant",path:["y"],value:0.01,add:[{rot:"y"}]},
      //   click: defaultNPCFoundFunction,
      // });

      // npcName = "Water"
      // this.$add_npc({name:npcName,BoxGeometry: [3.6*2,0.1,8.6*2],
      //   pos: [8.6,this.MIN.y-0.22,-42.7], rot:[0,-0.3,0], color: 0x3CA7DE,
      //   animation:{type:"sin",path:["y"],value:0.02},
      // });
      // npcName = "Stor"
      // this.$add_npc({name:npcName,obj:"stor.obj",
      //   pos: [5.5,this.MIN.y-0.22,-46], rot:[0,-0.3,0], color: 0x9f9f9f,
      // });
    },
  }
}