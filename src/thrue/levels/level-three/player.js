import * as THREE from "three";
import { OrbitControls } from "../../../scripts/loaders/OrbitControls.js";
import { OBJLoader } from "../../../scripts/loaders/OBJLoader.js";
import { memoryCategories, getRandom } from "../../../scripts/helpers";

const BASE_ASSET_URL = "./res";

export default {
  data()
  {
    return {
      p_$localQ: null,
      p_$localQactions: [],
      l_$npcList:[ "bed", "shower", "fridge", "mailbox", "mailboxneigh", "housebush", "closecornerbush","tunnelbush","closecementerybush"],
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
            dur: 4,
            stat:{
              [theStat]: 1,
            },
          },
          {
            action:"Devour cake",
            dur: 8,
            stat:{
              [theStat]: 3,
            },
          },
        ]
        case "shower":
        return [
          {
            action:"Shower with soap",
            dur: 12,
            stat:{
              [theStat]: 4,
            },
          },
          {
            action:"Quick shower",
            dur: 8,
            stat:{
              [theStat]: 2,
            },
          },
        ]
        case "bed":
        return [
          {
            action:"Take a nap",
            dur: 9,
            stat:{
              [theStat]: 1,
            },
          },
          {
            action:"Deep Sleep",
            dur: 42,
            stat:{
              [theStat]:5,
            },
          },
        ]
        case "mailbox":
        return [
          {
            action:"Read newspaper",
            dur: 6,
            stat:{
              [theStat]: 2,
            },
          },
        ]
        case "mailboxneigh":
        return [
          {
            action:"Peek neighboors mailbox",
            dur: 4,
            stat:{
              [theStat]: 2,
            },
          },
          {
            action:"Steal neighboors mail",
            dur: 2,
            stat:{
              [theStat]: 1,
            },
          },
        ]
        case "housebush":
        return [
          {
            action:"Eat energy",
            dur: 5,
            stat:{
              [theStat]: 1,
            },
          },
          {
            action:"Walk to bush",
            dur: 1,
            stat:{
              [theStat]: 0,
            },
          },
        ]
        case "closecementerybush":
        case "tunnelbush":
        case "closecornerbush":
        return [
          {
            action:"Walk to bush",
            dur: 1,
            stat:{
              [theStat]: 0,
            },
          },
          {
            action:"Inspect",
            dur: 6,
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
              t:parseInt(Date.now()/1000),
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
    p_$parseMemoryCategoryIcon(category)
    {
      switch(category)
      {
        case "ambition": return "fa-pen pr-3 tx-secondary"
        case "art": return "fa-book pr-3 tx-success"
        case "hazards": return "fa-school pr-1 tx-primary"
        case "logic": return "fa-tree pr-3 tx-tertiary"
        case "pets": return "fa-cat pr-2 tx-special"
        case "social": return "fa-bolt pr-4 tx-error"
        case "sports": return "fa-baseball-ball tx-secondary pr-2"
        case "supernatural": return "fa-ghost pr-3"
      }
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
      let ms = parseInt(Date.now()/1000);
      {
        // unsigned
        let _mmrs = this.__getRandomMemories()
        let _wishs = [this.__getLifeGoalWish(_mmrs)]
        this.$store.dispatch("setPlayer",
          {...{
            id:"0",
            // preQaction: "",
            // preQactions: [],
            // preQ: null,
            wishs: _wishs,
            mmrs: {
              ...{
                "ambition": [],
                "art": [],
                "hazards": [],
                "logic": [],
                "pets": [],
                "social": [],
                "sports": [],
                "supernatural": [],
              },
              ..._mmrs},
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
          object.traverse( this.baseStandardMaterial(0xffffff) );
          this.myplayer = object
          this.scene.add(this.myplayer);
        },
        this.onLoadProgress
      );
    },
    __getLifeGoalWish()
    {
      return {
        name: "Become a Celebrity Lawer",
      }
    },
    __getRandomMemories()
    {
      
      const memoryList = {
        "ambition": [{name:"Read a full book"}],
        "art": [{name:"Danced in a play"}],
        "hazards": [{name:"Was present in storm"}],
        "logic": [{name:"Learned to play chess"}],
        "pets": [{name:"Received wished pet"}],
        "social": [{name:"Had memorable birthday"},{name:"Was bullied"}],
        "sports": [{name:"Became cheerleader"}],
        "supernatural": [{name:"Saw an UFO"}],
      }
      const randomNumberAmount = 3
      const randomCategories = getRandom(memoryCategories,randomNumberAmount)
      console.log(randomCategories)
      // for (var i = 0; i < randomNumberAmount; i++)
      // {
      //   // const aRandomNumber = Math.random()*randomNumberAmount.length
      //   while (aRandomNumber = Math.random()*randomNumberAmount.length)
      //   {

      //   }
      //   // randomNumbers.push()
      // }
      // const shuffledMemory = memoryCategories.sort(() => 0.5 - Math.random());
      // console.log("shuffledMemory",shuffledMemory)
      // const therandommemories = randomCategories.map((item) => {
      //   // console.log(item)
      //   return memoryList[item][0]
      // })
      let newMemories = {}
      for (var i = 0; i < randomCategories.length; i++)
      {
        const item = randomCategories[i]
        const randomIndex = Math.floor(Math.random() * memoryList[item].length)
        newMemories[item] = [memoryList[item][randomIndex]]
      }

      // console.log(newMemories)
      return newMemories
    },
  }
}