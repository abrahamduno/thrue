import * as THREE from "three";
import { OrbitControls } from "../../../scripts/loaders/OrbitControls.js";
import { OBJLoader } from "../../../scripts/loaders/OBJLoader.js";

const BASE_ASSET_URL = "./res";

export default {
  data()
  {
    return {
      p_$localQ: null,
      p_$statList: ["energy","hunger","hygene","fun"]
    }
  },
  computed:
  {
  },
  methods: {
    p_$availableActions(npc)
    {
      let theStat = this.NPCBaseContainer[npc].npcStat
      switch(npc)
      {
        case "fridge":
        return [
          {
            action:"apple",
            stat:{
              [theStat]: 1,
            },
          },
          {
            action:"cake",
            stat:{
              [theStat]: 2,
            },
          },
        ]
      }
      return []
    },
    p_$commitStatAction(statAction,stat)
    {
      alert(`you want to fix ${stat.stat} ${statAction.action}`)
      this.$store.dispatch("addToPlayerQ",{
          id:"0",
          
          q: [
            { npcRef: stat.npcRef, stat:stat.stat, action:statAction.action, t:Date.now(), d:7500 }
          ]
        },
      )

      if (this.NPCBaseContainer[stat.npcRef].playerpos)
      {
        this.$store.dispatch("setPlayerPosition",{
          id:"0",
          pos:[
            this.NPCBaseContainer[stat.npcRef].playerpos[0],
            this.__player.pos[1],
            this.NPCBaseContainer[stat.npcRef].playerpos[2]
          ]
        })
      }
      if (this.NPCBaseContainer[stat.npcRef].playerrot)
      {
        this.$store.dispatch("setPlayerRotation",{
          id:"0",
          pos:[ 
            this.__player.pos[0],
            this.NPCBaseContainer[stat.npcRef].playerrot[1],
            this.__player.pos[2],
          ]
        })
      }
      this.p_$localQ = null
    },
    p_$statToAction(stat)
    {
      switch(stat)
      {
        case "apple": return "Eat Apple"
        case "cake": return "Eat Cake"
      }
    },
    p_$parseStatActionLIVE(stat)
    {
      switch(stat)
      {
        case "apple": return "Eating Apple"
        case "cake": return "Eating Cake"
      }
    },
    p_$setOrbitToPlayerPos()
    {
      this.__orbitcontrols.target.set(
        this.__player.pos[0],
        this.__player.pos[1]-1.5,
        this.__player.pos[2])
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
      this.__orbitcontrols.target.set(0,0,5)
    },
    p_$init_player(_player)
    {
      let ms = Date.now();
      {
        // unsigned
        this.$store.dispatch("setPlayer",
          {...{
            id:"0",
            q: [],
            obj: null,
            pos: [0,0,0],
            rot: [0,0,0],
            scale: [1,1,1],
            stats: {
              hunger: 3,
              hygene: 8,
              energy: 9,
              fun: 5,
            },
          },..._player}
        )
      }
      new OBJLoader().setPath(BASE_ASSET_URL + "/models/").load(
        "aplayer.obj",
        (object) => {
          object.traverse( this.baseStandardMaterial() );
          this.myplayer = object
          this.scene.add(this.myplayer);
        },
        this.onLoadProgress
      );
    },
  }
}