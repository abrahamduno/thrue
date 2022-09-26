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
        let r = this.refreshRate

        if(!this.NPCContainer) return
        let thekeys = Object.keys(this.NPCContainer)
        for (var i = 0; i < thekeys.length; i++)
        {            
          // console.log("1", this.NPCContainer[thekeys[i]], "2", this.INTERSECTED)
          if(this.NPCAnimationContainer[thekeys[i]])
          {
            let speed = this.NPCAnimationContainer[thekeys[i]].speed ? this.NPCAnimationContainer[thekeys[i]].speed : 0.01
            if(this.NPCAnimationContainer[thekeys[i]].type == "constant")
            {
              this.NPCContainer[thekeys[i]].position[this.NPCAnimationContainer[thekeys[i]].path[0]] += this.NPCAnimationContainer[thekeys[i]].value*r

              // if (this.NPCAnimationContainer[thekeys[i]].add[0].rot == "y")
              // {
              //   this.NPCContainer[thekeys[i]].rotation["y"] = -(tcounter*r*speed)
              // }
            }
            if(this.NPCAnimationContainer[thekeys[i]].type == "sin" || this.NPCAnimationContainer[thekeys[i]].type == "cos")
            {
              this.NPCContainer[thekeys[i]].position[this.NPCAnimationContainer[thekeys[i]].path[0]] =  
                Math[this.NPCAnimationContainer[thekeys[i]].type](tcounter*r*speed)*this.NPCAnimationContainer[thekeys[i]].value + this.NPCBaseContainer[thekeys[i]].pos[{"x":0,"y":1,"z":2}[this.NPCAnimationContainer[thekeys[i]].path[0]]]
              if (this.NPCAnimationContainer[thekeys[i]].add)
              {
                // console.log(this.NPCAnimationContainer[thekeys[i]].add)
                // if (this.NPCAnimationContainer[thekeys[i]].add[0].rot == "y")
                // {
                //   this.NPCContainer[thekeys[i]].rotation["y"] = -(tcounter*r*speed)
                // }
                if (this.NPCAnimationContainer[thekeys[i]].add[0].rot == "z")
                {
                  this.NPCContainer[thekeys[i]].rotation["z"] = -Math.sin(tcounter*r*speed)*0.001
                }
              }
            }
            if(this.NPCAnimationContainer[thekeys[i]].type == "circle")
            {
              this.NPCContainer[thekeys[i]].position[this.NPCAnimationContainer[thekeys[i]].path[0]] =  
                Math.sin(tcounter*r*speed)*this.NPCAnimationContainer[thekeys[i]].value + this.NPCBaseContainer[thekeys[i]].pos[{"x":0,"y":1,"z":2}[this.NPCAnimationContainer[thekeys[i]].path[0]]]

              this.NPCContainer[thekeys[i]].position[this.NPCAnimationContainer[thekeys[i]].path[1]] =  
                Math.cos(tcounter*r*speed)*this.NPCAnimationContainer[thekeys[i]].value + this.NPCBaseContainer[thekeys[i]].pos[{"x":0,"y":1,"z":2}[this.NPCAnimationContainer[thekeys[i]].path[1]]]
              if (this.NPCAnimationContainer[thekeys[i]].add[0].rot == "y")
              {
                if (this.NPCAnimationContainer[thekeys[i]].path[0] == "z")
                {
                  this.NPCContainer[thekeys[i]].rotation["y"] = -(tcounter*r*speed)
                } else {
                  this.NPCContainer[thekeys[i]].rotation["y"] = (tcounter*r*speed)+Math.PI/2

                }
              }



            }
            // alert("npc clicked")

            if (this.NPCAnimationContainer[thekeys[i]].add)
            {
              for (var j = 0; j < this.NPCAnimationContainer[thekeys[i]].add.length; j++)
              {
                const transformationList = Object.keys(this.NPCAnimationContainer[thekeys[i]].add[j])
                for (var k = 0; k < transformationList.length; k++)
                {
                  // console.log(transformationList[j])
                  if(this.NPCAnimationContainer[thekeys[i]].type == "circle")
                  {
                    continue
                    // this.NPCContainer[thekeys[i]].rotation[this.NPCAnimationContainer[thekeys[i]].add[j][transformationList[j]]] = -(tcounter*r*speed)
                  } else {
                    this.NPCContainer[thekeys[i]].rotation[this.NPCAnimationContainer[thekeys[i]].add[j][transformationList[j]]] = -(tcounter*r*speed)
                  }
                  // {"x":0,"y":1,"z":2}[transformationList[i]]
                }
              }
            }
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
          // console.log(this.NPCContainer)
          for (var i = 0; i < thekeys.length; i++)
          {            
            // console.log("1", this.NPCContainer[thekeys[i]], "2", this.INTERSECTED)
            if(this.INTERSECTED == this.NPCContainer[thekeys[i]] ||
              (this.NPCContainer[thekeys[i]].children && this.INTERSECTED == this.NPCContainer[thekeys[i]].children[0])
              )
            {
              this.NPCClickCounter[thekeys[i]] ++
              // alert("You Found: "+thekeys[i])
              // console.log(this.NPCContainer[thekeys[i]])
              if (this.NPCBaseContainer[thekeys[i]].click)
              {
                this.NPCBaseContainer[thekeys[i]].click(thekeys[i])
              }
            }
          }
        }
      },
      initNpcs()
      {
        this.NPCClickCounter = {}
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
          this.NPCClickCounter[params.name] = 0
          
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
            if (_params.scale) object.scale.set(..._params.scale);

            this.NPCContainer[_params.name] = object
            this.NPCAnimationContainer[_params.name] = _params.animation
            this.NPCBaseContainer[_params.name] = _params
            this.NPCClickCounter[_params.name] = 0
            

            this.scene.add(this.NPCContainer[_params.name]);
        }, this.onLoadProgress );
      },
  }
}