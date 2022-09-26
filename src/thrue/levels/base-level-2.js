import * as THREE from "three";
import { OBJLoader } from "../../scripts/loaders/OBJLoader.js";

import npcContainer from "../system/npc-container.js";

import ticketer from "../models/ticketer.obj.js";
import farm from "../models/farm.obj.js";

const BASE_URL = "http://localhost:3000/";
const BASE_ASSET_URL = "./res";

export default {
  mixins: [
    npcContainer,

    ticketer,
    farm,
  ],
  methods:
  {
    clickedLevelHelp()
    {
      // this.enable_help++
      this.show_help = false
      // alert("clickHelp: "+this.enable_help)
    },
    checkGoals()
    {
      // let input = prompt("Amount",1)
      // let input = prompt("Amount",1)
      console.log("this.enable_help",this.enable_help)

      if (!this.goals)
      {
        alert("please reload game")
        this.YOU_LOSE()
        return
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
    initLevelOne()
    {
      this.goals = {
        tickets: 0,
        hay: 0,
      }
    },
    animate_levelone()
    {
      if (this.accs_length)
      {
      }
      if (this.mycurrentlevel && this.mycurrentlevel.position.y != -2)
      {
        this.mycurrentlevel.position.y = -2
        // this.mycurrentlevel.position.y = this.lerp(this.mycurrentlevel.position.y,-2,0.1)
      }
    },
    addLevelOne(  ) {
      this.initLevelOne()

      new OBJLoader().setPath(BASE_ASSET_URL + "/models/").load(
        "levelone.obj",
        (object) => {
          object.traverse( this.objStandardMaterial );
          object.traverse( (child) => {
          if ( child instanceof THREE.Mesh )
          {
            child.material = new THREE.MeshStandardMaterial( { color: 0xaaaaaa, } );
            child.castShadow = true;
            child.receiveShadow = true;
          }
        } );
          object.position.set(0, -50, 0);
          this.mycurrentlevel = object
          this.scene.add(this.mycurrentlevel);

          this.addLevelMesh()
      }, this.onLoadProgress );
      new OBJLoader().setPath(BASE_ASSET_URL + "/models/").load(
        "path.obj",
        (object) => {
          object.traverse( (child) => {
          if ( child instanceof THREE.Mesh )
          {
            child.material = new THREE.MeshStandardMaterial( { color: 0xffffff, } );
            child.castShadow = true;
            child.receiveShadow = true;
          }
        } );
          object.position.set(0, -2, 0);
          this.scene.add(object);

      }, this.onLoadProgress );
    },
    checkClick_levelOne()
    {
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
    addLevelMesh()
    {
      this.addFarm();
      let npcName = ""
      this.initNpcs()
      let foundFunction = (_npcName) => {
        alert("You've found "+`${_npcName}`)
        this.NPCContainer[_npcName].position.y = 50;
        this.NPCContainer[_npcName].visible = false
      }

      npcName = "Lucy"
      this.addNpc({name:npcName,obj:"achiken.obj",
        pos: [-2,-2.1,-1.15], color: 0xFFD8BA,
        animation:{type:"circle",path:["z","x"],value:1,add:[{rot:"y"}]},
        click: foundFunction,
      });

      npcName = "Molly"
      this.addNpc({name:npcName,obj:"achiken.obj",
        pos: [0,-2,-40],rot: [-0.5,0.2,0.4], color: 0xFFD8BA,
        animation:{type:"constant",path:["y"],value:0.01,add:[{rot:"y"}]},
        click: foundFunction,
      });
      npcName = "Mia"
      this.addNpc({name:npcName,obj:"achiken.obj",
        pos: [8,-2.1,-23.5], scale: [1.6,1.6,1.6], color: 0xFFC88A,
        animation:{type:"circle",path:["x","z"],value:1.3,speed:0.005,add:[{rot:"y"}]},
        click: foundFunction,
      });
      npcName = "Amy"
      this.addNpc({name:npcName,obj:"achiken.obj",
        pos: [9,-2.22,-45],scale:[2,2,2], color: 0xF3D7FF,
        animation:{type:"sin",path:["y"],value:0.02,add:[{rot:"y"}]},
        click: foundFunction,
      });

      npcName = "Water"
      this.addNpc({name:npcName,BoxGeometry: [3.6*2,0.1,8.6*2],
        pos: [8.6,-2.22,-42.7], rot:[0,-0.3,0], color: 0x3CA7DE,
        animation:{type:"sin",path:["y"],value:0.02},
      });
      npcName = "Stor"
      this.addNpc({name:npcName,obj:"stor.obj",
        pos: [5.5,-2.22,-46], rot:[0,-0.3,0], color: 0x9f9f9f,
      });


      // this.addNpc({name:"mia",obj:"achiken.obj",
      // pos: [-4,-2,-30], BoxGeometry: [0.25,0.25,0.25], color: 0xFFC88A, animation:{type:"cos",path:["z"],value:1,add:[{rot:"y"}]}});

      // // center
      // {
      //   const boxGeometry = new THREE.BoxGeometry(1.6, 0.05, 33);
      //   const boxMaterial = new THREE.MeshStandardMaterial( { wireframe: false,color: 0xaaaaaa } );
      //   let boxx =  new THREE.Mesh( boxGeometry, boxMaterial );
      //   boxx.castShadow = true; //default is false
      //   boxx.receiveShadow = true; //default
      //   boxx.position.set(0,-0.05,-8)
      //   this.mycurrentlevel.add( boxx );
      // }

      // // right
      // {
      //   const boxGeometry = new THREE.BoxGeometry(0.69, 0.05, 33);
      //   const boxMaterial = new THREE.MeshStandardMaterial( { wireframe: false,color: 0xaaaaaa } );
      //   let boxx =  new THREE.Mesh( boxGeometry, boxMaterial );
      //   boxx.castShadow = true; //default is false
      //   boxx.receiveShadow = true; //default
      //   boxx.position.set(4.2,-0.05,-8)
      //   this.mycurrentlevel.add( boxx );
      // }

      // left
      // {
      //   const boxGeometry = new THREE.BoxGeometry(0.69, 0.05, 42);
      //   const boxMaterial = new THREE.MeshStandardMaterial( { wireframe: false,color: 0xaaaaaa } );
      //   let boxx =  new THREE.Mesh( boxGeometry, boxMaterial );
      //   boxx.castShadow = true; //default is false
      //   boxx.receiveShadow = true; //default
      //   boxx.position.set(-4.2,-0.05,-12.5)
      //   this.mycurrentlevel.add( boxx );
      // }
    },
  }
}