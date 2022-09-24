import * as THREE from "three";
import { OBJLoader } from "../../scripts/loaders/OBJLoader.js";

const BASE_URL = "http://localhost:3000/";
const BASE_ASSET_URL = "./res";

export default {
  data () {
    return {
      baseNpc: {
        BoxGeometry: [1, 1, 1],
        pos: [1, 1, 1],
        color: 0xFF59A8,
      },
    }
  },
  methods: {
      animate_npcs(tcounter)
      {
        if(!this.NPCContainer) return
        let thekeys = Object.keys(this.NPCContainer)
        for (var i = 0; i < thekeys.length; i++)
        {            
          // console.log("1", this.NPCContainer[thekeys[i]], "2", this.INTERSECTED)
          if(this.NPCAnimationContainer[thekeys[i]])
          {
            if(this.NPCAnimationContainer[thekeys[i]].type == "constant")
            {
              this.NPCContainer[thekeys[i]].position[this.NPCAnimationContainer[thekeys[i]].path[0]] += this.NPCAnimationContainer[thekeys[i]].value
            }
            if(this.NPCAnimationContainer[thekeys[i]].type == "sin" || this.NPCAnimationContainer[thekeys[i]].type == "cos")
            {
              this.NPCContainer[thekeys[i]].position[this.NPCAnimationContainer[thekeys[i]].path[0]] =  
                Math[this.NPCAnimationContainer[thekeys[i]].type](tcounter*0.01)*this.NPCAnimationContainer[thekeys[i]].value + this.NPCBaseContainer[thekeys[i]].pos[{"x":0,"y":1,"z":2}[this.NPCAnimationContainer[thekeys[i]].path[0]]]
              if (this.NPCAnimationContainer[thekeys[i]].add)
              {
                // console.log(this.NPCAnimationContainer[thekeys[i]].add)
                if (this.NPCAnimationContainer[thekeys[i]].add[0].rot == "y")
                {
                  this.NPCContainer[thekeys[i]].rotation["y"] = -(tcounter*0.01)
                }
              }
            }
            if(this.NPCAnimationContainer[thekeys[i]].type == "circle")
            {
              this.NPCContainer[thekeys[i]].position[this.NPCAnimationContainer[thekeys[i]].path[0]] =  
                Math.sin(tcounter*0.01)*this.NPCAnimationContainer[thekeys[i]].value + this.NPCBaseContainer[thekeys[i]].pos[{"x":0,"y":1,"z":2}[this.NPCAnimationContainer[thekeys[i]].path[0]]]

              this.NPCContainer[thekeys[i]].position[this.NPCAnimationContainer[thekeys[i]].path[1]] =  
                Math.cos(tcounter*0.01)*this.NPCAnimationContainer[thekeys[i]].value + this.NPCBaseContainer[thekeys[i]].pos[{"x":0,"y":1,"z":2}[this.NPCAnimationContainer[thekeys[i]].path[1]]]

              this.NPCContainer[thekeys[i]].rotation["y"] = -(tcounter*0.01)


            }
            // alert("npc clicked")
          }
        }
      },
      async getFirstNpc(name)
      {
        if (Object.keys(this.NPCContainer).length == 0) return null

        return this.NPCContainer[Object.keys(this.NPCContainer)[0]]
      },
      async checkClick_npc()
      {
        if(this.INTERSECTED && this.NPCContainer)
        {
          let thekeys = Object.keys(this.NPCContainer)
          console.log(this.NPCContainer)
          for (var i = 0; i < thekeys.length; i++)
          {            
            // console.log("1", this.NPCContainer[thekeys[i]], "2", this.INTERSECTED)
            if(this.INTERSECTED == this.NPCContainer[thekeys[i]] ||
              (this.NPCContainer[thekeys[i]].children && this.INTERSECTED == this.NPCContainer[thekeys[i]].children[0])
              )
            {
              alert("npc clicked: "+thekeys[i])
            }
          }
        }
      },
      initNpcs()
      {
        this.NPCContainer = {}
        this.NPCBaseContainer = {}
        this.NPCAnimationContainer = {}
        this.NPCObjectContainer = {}
      },

      addNpc(_params)
      {
        if (!_params.name) return
        let params = {...this.baseNpc, ..._params}
        if(params.obj)
        {
          this.addObject(params)
        } else {
          const boxGeometry = new THREE.BoxGeometry(...params.BoxGeometry);
          const boxMaterial = new THREE.MeshStandardMaterial( { wireframe: false,color: params.color } );
          let newClickBox = new THREE.Mesh( boxGeometry, boxMaterial );
          newClickBox.castShadow = true; //default is false
          newClickBox.receiveShadow = true; //default
          newClickBox.position.set(...params.pos)
          if (params.rot) newClickBox.rotation.set(...params.rot)
          newClickBox.name = params.name

          this.NPCContainer[params.name] = newClickBox
          this.NPCAnimationContainer[params.name] = params.animation
          this.NPCBaseContainer[params.name] = params
          this.scene.add( newClickBox );
        }
      },
      addObject( _params )
      {
        console.log(_params)
        new OBJLoader().setPath(BASE_ASSET_URL + "/models/").load(
          _params.obj,
          (object) => {
            object.traverse( function ( child )
            {
              if ( child instanceof THREE.Mesh )
              {
                child.material = new THREE.MeshStandardMaterial( { color: _params.color } );
                child.castShadow = true;
                child.receiveShadow = true;
              }
              // if( child.material ) {
              //   child.material.side = THREE.BackSide;
              // }
           } );
            object.position.set(..._params.pos);
            if (_params.rot) object.rotation.set(..._params.rot);

            this.NPCContainer[_params.name] = object
            this.NPCAnimationContainer[_params.name] = _params.animation
            this.NPCBaseContainer[_params.name] = _params

            this.scene.add(this.NPCContainer[_params.name]);
        }, this.onLoadProgress );
      },
  }
}