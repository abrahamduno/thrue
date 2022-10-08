import * as THREE from "three";
import { OBJLoader } from "../../scripts/loaders/OBJLoader.js";

const BASE_URL = "http://localhost:3000/";
const BASE_ASSET_URL = "./res";
export default {
  data () {
    return {
      baseNpcActionList: {
        "fridge":[
          {action:"Eat apple", dur: 4, stat:{hunger: 1, }, },
          {action:"Devour cake", dur: 8, stat:{hunger: 3, }, },
        ],
        "shower":[
          {action:"Shower with soap", dur: 12, stat:{hygene: 4, }, },
          {action:"Quick shower", dur: 8, stat:{hygene: 2, }, },
        ],
        "bed":[
          {action:"Take a nap", dur: 9, stat:{energy: 1, }, },
          {action:"Deep Sleep", dur: 42, stat:{energy:5, }, },
        ],
        "mailbox":[
          {action:"Read newspaper", dur: 6, stat:{fun: 2, }, },
        ],
        "mailboxneigh":[
          {action:"Peek neighboors mailbox", dur: 4, stat:{fun: 2, }, },
          {action:"Steal neighboors mail", dur: 2, stat:{fun: 1, }, },
        ],
        "housebush":[
          {action:"Eat energy", dur: 5, stat:{energy: 1, }, },
          {action:"Walk to bush", dur: 1, stat:{fun: 0, }, },
        ],
        "closecementerybush":[
          {action:"Walk to bush", dur: 1, stat:{fun: 0, }, },
        ],
        "tunnelbush":[
          {action:"Walk to bush", dur: 1, stat:{fun: 0, }, },
          {action:"Inspect", dur: 6, stat:{fun: 1, }, },
        ],
        "closecornerbush":[
          {action:"Walk to bush", dur: 1, stat:{fun: 0, }, },
          {action:"Inspect", dur: 6, stat:{fun: 1, }, },
        ],
      },
      baseNpc: {
        BoxGeometry: [1, 1, 1],
        pos: [1, 1, 1],
        color: 0xFF59A8,
      },
    }
  },
  methods: {
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
      _$init_npcContainer()
      {
        this.NPCClickCounter = {}
        this.NPCContainer = {}
        this.NPCBaseContainer = {}
        this.NPCAnimationContainer = {}
        this.NPCObjectContainer = {}
      },
      _$add_npc(_params)
      {
        if (!_params.name) return
        let params = {...this.baseNpc, ..._params}
        if(params.obj)
        {
          this.addNpcLinkedObject(params)
        } else {
          const boxGeometry = new THREE.BoxGeometry(...params.BoxGeometry);
          const boxMaterial = new THREE.MeshStandardMaterial( { wireframe: false,color: params.color } );
          let newClickBox = new THREE.Mesh( boxGeometry, boxMaterial );
          if (params.light === true)
          {
          } else {
            newClickBox.castShadow = params.shadow; //default is false
            newClickBox.receiveShadow = params.shadow; //default
          }
          newClickBox.position.set(...params.pos)
          if (params.rot) newClickBox.rotation.set(...params.rot)
          // newClickBox.name = params.name

          this.NPCContainer[params.name] = newClickBox
          this.NPCAnimationContainer[params.name] = params.animation
          this.NPCBaseContainer[params.name] = params
          this.NPCClickCounter[params.name] = 0
          
          this.scene.add( this.NPCContainer[params.name] );
          this.NPCContainer[params.name].name = params.name
        }
      },
      async _$click_npcContainer()
      {
        if(this.INTERSECTED && this.NPCContainer)
        {
          let thekeys = Object.keys(this.NPCContainer)
          for (var i = 0; i < thekeys.length; i++)
          {            
            if(this.INTERSECTED == this.NPCContainer[thekeys[i]] ||
              (this.NPCContainer[thekeys[i]].children && this.INTERSECTED == this.NPCContainer[thekeys[i]].children[0])
              )
            {
              this.NPCClickCounter[thekeys[i]] ++
              if (this.NPCBaseContainer[thekeys[i]].click)
              {
                this.NPCBaseContainer[thekeys[i]].click(thekeys[i])
              }
            }
          }
        }
      },
      _$animate_npcContainer(__timer)
      {
        let r = this.refreshAccelerator

        if(!this.NPCContainer) return
        let thekeys = Object.keys(this.NPCContainer)
        for (var i = 0; i < thekeys.length; i++)
        {     
          let element = this.NPCAnimationContainer[thekeys[i]]
          // console.log(thekeys[i],element)
          if(!element) continue

          let speed = element.speed ? element.speed : 0.01
          if(element.type == "constant")
          {
            this.NPCContainer[thekeys[i]].position[element.path[0]] += element.value*r
            if (element.add)
            {
              if (element.add[0].loop)
              {
                if (this.NPCContainer[thekeys[i]].position[element.path[0]] > element.add[0].loop)
                {
                   this.NPCContainer[thekeys[i]].position[element.path[0]] = this.NPCBaseContainer[thekeys[i]].pos[{"x":0,"y":1,"z":2}[element.path[0]]] 
                }
              }
            }
          }
          if(element.type == "-constant")
          {
            this.NPCContainer[thekeys[i]].position[element.path[0]] -= element.value*r
            if (element.add)
            {
              if (element.add[0].loop)
              {
                if (this.NPCContainer[thekeys[i]].position[element.path[0]] < element.add[0].loop)
                {
                   this.NPCContainer[thekeys[i]].position[element.path[0]] = this.NPCBaseContainer[thekeys[i]].pos[{"x":0,"y":1,"z":2}[element.path[0]]] 
                }
              }
            }
          }
          if(element.type == "sin" || element.type == "cos")
          {
            this.NPCContainer[thekeys[i]].position[element.path[0]] =  
              Math[element.type](__timer*r*speed)*element.value + this.NPCBaseContainer[thekeys[i]].pos[{"x":0,"y":1,"z":2}[element.path[0]]]
            if (element.add)
            {
              if (element.add[0].rot == "z")
              {
                this.NPCContainer[thekeys[i]].rotation["z"] = -Math.sin(__timer*r*speed)*0.001
              }
            }
          }
          if(element.type == "circle")
          {
            this.NPCContainer[thekeys[i]].position[element.path[0]] =  
              Math.sin(__timer*r*speed)*element.value + this.NPCBaseContainer[thekeys[i]].pos[{"x":0,"y":1,"z":2}[element.path[0]]]

            this.NPCContainer[thekeys[i]].position[element.path[1]] =  
              Math.cos(__timer*r*speed)*element.value + this.NPCBaseContainer[thekeys[i]].pos[{"x":0,"y":1,"z":2}[element.path[1]]]
            if (element.add[0].rot == "y")
            {
              if (element.path[0] == "z")
              {
                this.NPCContainer[thekeys[i]].rotation["y"] = -(__timer*r*speed)
              } else {
                this.NPCContainer[thekeys[i]].rotation["y"] = (__timer*r*speed)+Math.PI/2
              }
            }
          }
          if (element.add)
          {
            for (var j = 0; j < element.add.length; j++)
            {
              const transformationList = Object.keys(element.add[j])
              for (var k = 0; k < transformationList.length; k++)
              {
                if(element.type == "circle") { continue }
                this.NPCContainer[thekeys[i]].rotation[element.add[j][transformationList[j]]] = -(__timer*r*speed)
              }
            }
          }
        }
      },

/* //-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-  */

      async getFirstNpc(name)
      {
        if (Object.keys(this.NPCContainer).length == 0) return null

        return this.NPCContainer[Object.keys(this.NPCContainer)[0]]
      },
      addNpcLinkedObject( _params )
      {
        // console.log(_params)
        new OBJLoader().setPath(BASE_ASSET_URL + "/models/").load(
          _params.obj,
          (object) => {
            if (_params.light === true)
            {
              object.traverse( this.baseLightMaterial(_params.color) );
              // object.castShadow = _params.shadow; //default is false
              // object.receiveShadow = _params.shadow; //default
            } else {
              object.traverse( this.baseStandardMaterial(_params.color) );
              object.castShadow = true; //default is false
              object.receiveShadow = true; //default
            }
            
            object.position.set(..._params.pos);
            object.name = _params.name
            if (_params.rot) object.rotation.set(..._params.rot);
            if (_params.scale) object.scale.set(..._params.scale);

            this.NPCContainer[_params.name] = object
            this.NPCAnimationContainer[_params.name] = _params.animation
            this.NPCBaseContainer[_params.name] = _params
            this.NPCClickCounter[_params.name] = 0
            

            this.scene.add(this.NPCContainer[_params.name]);
            this.NPCContainer[_params.name].name = _params.name
            // console.log(this.NPCContainer[_params.name])
            // console.log(`added npc: ${_params.name}`)
        }, this.onLoadProgress );
      },
  }
}