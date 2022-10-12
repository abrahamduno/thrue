import * as THREE from "three";
import { OBJLoader } from "../../../../scripts/loaders/OBJLoader.js";
import { OrbitControls } from "../../../../scripts/loaders/OrbitControls.js";
import baseStandardMaterial from "../../../../scripts/constants/baseStandardMaterial.js";

  // _$ -> from system
  // l_$ -> from localScene
  // p_$ -> from player
  // a_$ -> from animation

  // __ -> only used inside same file

  
const BASE_URL = "http://localhost:3000/";
const BASE_ASSET_URL = "./res";
export default {
  data()
  {
    return {
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
      this.camera.position.set(5,3,-2)
      this.p_$init_player({pos:[-8.5,0,-13]})
      this.p_$setOrbitToPlayerPos(-1.5)
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
      npcName = "House-Bush"
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