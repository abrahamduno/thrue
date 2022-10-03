import * as THREE from "three";
import { OrbitControls } from "../../../scripts/loaders/OrbitControls.js";
import { OBJLoader } from "../../../scripts/loaders/OBJLoader.js";

const BASE_ASSET_URL = "./res";

export default {
  data()
  {
    return {
      p_$localQ: null,
      p_$localQactions: [],
      l_$npcList:[ "bed", "shower", "fridge", "mailbox", "mailboxneigh", "housebush", "closecornerbush","tunnelbush"],
      p_$statList: ["energy","hunger","hygene","fun"],
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
            action:"Eat apple",
            dur: 3500,
            stat:{
              [theStat]: 1,
            },
          },
          {
            action:"Devour cake",
            dur: 7500,
            stat:{
              [theStat]: 3,
            },
          },
        ]
        case "shower":
        return [
          {
            action:"Shower with soap",
            dur: 11000,
            stat:{
              [theStat]: 4,
            },
          },
          {
            action:"Quick shower",
            dur: 7500,
            stat:{
              [theStat]: 2,
            },
          },
        ]
        case "bed":
        return [
          {
            action:"Take a nap",
            dur: 9000,
            stat:{
              [theStat]: 1,
            },
          },
          {
            action:"Deep Sleep",
            dur: 42000,
            stat:{
              [theStat]:5,
            },
          },
        ]
        case "mailbox":
        return [
          {
            action:"Read newspaper",
            dur: 6000,
            stat:{
              [theStat]: 2,
            },
          },
        ]
        case "mailboxneigh":
        return [
          {
            action:"Peek neighboors mailbox",
            dur: 3000,
            stat:{
              [theStat]: 3,
            },
          },
        ]
        case "housebush":
        return [
          {
            action:"Eat energy",
            dur: 5000,
            stat:{
              [theStat]: 1,
            },
          },
          {
            action:"Walk to bush",
            dur: 1000,
            stat:{
              [theStat]: 0,
            },
          },
        ]
        case "tunnelbush":
        case "closecornerbush":
        return [
          {
            action:"Walk to bush",
            dur: 1000,
            stat:{
              [theStat]: 0,
            },
          },
          {
            action:"Inspect",
            dur: 6000,
            stat:{
              [theStat]: 1,
            },
          },
        ]
      }
      return []
    },
    p_$commitStatAction(statAction,stat)
    {
      // alert(`you want to fix ${stat.stat} ${statAction.action}`)
      // console.log(statAction,stat)
      this.$store.dispatch("addToPlayerQ",{
          id:"0",
          
          q: [
            {
              npcRef: stat.npcRef,
              stat:stat.stat,
              value:statAction.stat[stat.stat],
              action:statAction.action,
              t:Date.now(),
              d:statAction.dur,
            }
          ]
        },
      )

      this.p_$localQactions = []
      this.p_$localQ = null

      // this.$store.dispatch("clearPreQ",{
      //     id:"0",
      //   },
      // )
      // this.$store.dispatch("clearPreQ",{
      //     id:"0",
      //   },
      // )

      // this.$store.dispatch("clearFirstInY",{
      //   id:"0",
      // })
      // console.log("im",this.p_$localQ)
      // console.log("im",this.p_$localQ, this.$store.getters.getPlayers[0].preQactions)
    },
    p_$statToAction(stat)
    {
      return stat
    },
    p_$parseStatActionLIVE(stat)
    {
      switch(stat)
      {
        case "Eat apple": return "Eating Apple"
        case "Devour cake": return "Devouring cake"
        case "Shower with soap": return "Soaping"
        case "Quick shower": return "Showering"
        case "Take a nap": return "Sleeping"
        case "Deep Sleep": return "Dreaming"
        case "Read newspaper": return "Reading newspaper"
        case "Peek neighboors mailbox": return "Peeking neighboors"
        case "Inspect": return "Checking bush"
        case "Walk to bush": return "Walking"
        case "Eat energy": return "Eating light"
      }
    },
    p_$setOrbitToPlayerPos(yFix = 0)
    {
      this.__orbitcontrols.target.set(
        this.__player.pos[0],
        this.__player.pos[1]+yFix,
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
      this.__orbitcontrols.target.set(0,0,5) // init screen (connect / login)
    },
    p_$init_player(_player)
    {
      let ms = Date.now();
      {
        // unsigned
        this.$store.dispatch("setPlayer",
          {...{
            id:"0",
            // preQaction: "",
            // preQactions: [],
            // preQ: null,
            q: [],
            y: [],
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
          object.traverse( this.baseStandardMaterial(0xffffff) );
          this.myplayer = object
          this.scene.add(this.myplayer);
        },
        this.onLoadProgress
      );
    },
  }
}