import * as THREE from "three";
import { OBJLoader } from "../../../../scripts/loaders/OBJLoader.js";
import { memoryCategories, getRandom } from "../../../../scripts/helpers";

const BASE_ASSET_URL = "./res";

export default {
  data()
  {
    return {
      p_$localQ: null,
      p_$localQactions: [],
      l_$npcList:[ "bed", "shower", "fridge", "mailbox", "mailboxneigh", "House-Bush", "closecornerbush","tunnelbush","closecementerybush"],
      p_$statList: ["energy","protein","hygene","fun"],
    }
  },
  computed:
  {
  },
  methods: {
    p_$availableActions(npc)
    {
      let theStat = this.NPCBaseContainer[npc].npcStat
      if (this.baseNpcActionList[npc] && this.baseNpcActionList[npc].length)
      {
        return this.baseNpcActionList[npc]
      }
      
      return []
    },
    p_$commitStatAction(statAction,stat)
    {
      // alert(`you want to fix ${stat.stat} ${statAction.action}`)
      // console.log(statAction,stat)
      this.$store.dispatch("addToPlayerQ",{
          id:this.selectedPlayer,
          
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
      //     id:this.selectedPlayer,
      //   },
      // )
      // this.$store.dispatch("clearPreQ",{
      //     id:this.selectedPlayer,
      //   },
      // )

      // this.$store.dispatch("clearFirstInY",{
      //   id:this.selectedPlayer,
      // })
      // console.log("im",this.p_$localQ)
      // console.log("im",this.p_$localQ, this.$store.getters.getPlayers[0].preQactions)
    },
    p_$statToAction(stat)
    {
      return stat
    },
    p_$setOrbitToPlayerPos(yFix = 0)
    {
      this.__orbitcontrols.target.set(
        this.__player.pos[0],
        this.__player.pos[1]+yFix,
        this.__player.pos[2])
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
            id:this.selectedPlayer,
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
              protein: parseInt(Math.random()*255),
              hygene: parseInt(Math.random()*255),
              energy: parseInt(Math.random()*255),
              fun: parseInt(Math.random()*255),
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
      // console.log(randomCategories)
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