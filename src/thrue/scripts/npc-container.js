import * as THREE from "three";

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
            }
            if(this.NPCAnimationContainer[thekeys[i]].type == "circle")
            {
              this.NPCContainer[thekeys[i]].position[this.NPCAnimationContainer[thekeys[i]].path[0]] =  
                Math.sin(tcounter*0.01)*this.NPCAnimationContainer[thekeys[i]].value + this.NPCBaseContainer[thekeys[i]].pos[{"x":0,"y":1,"z":2}[this.NPCAnimationContainer[thekeys[i]].path[0]]]

              this.NPCContainer[thekeys[i]].position[this.NPCAnimationContainer[thekeys[i]].path[1]] =  
                Math.cos(tcounter*0.01)*this.NPCAnimationContainer[thekeys[i]].value + this.NPCBaseContainer[thekeys[i]].pos[{"x":0,"y":1,"z":2}[this.NPCAnimationContainer[thekeys[i]].path[1]]]
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
            if(this.INTERSECTED == this.NPCContainer[thekeys[i]])
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
      },

      addNpc(_params)
      {
        if (!_params.name) return
        let params = {...this.baseNpc, ..._params}
        const boxGeometry = new THREE.BoxGeometry(...params.BoxGeometry);
        const boxMaterial = new THREE.MeshStandardMaterial( { wireframe: false,color: params.color } );
        let newClickBox = new THREE.Mesh( boxGeometry, boxMaterial );
        newClickBox.castShadow = true; //default is false
        newClickBox.receiveShadow = true; //default
        newClickBox.position.set(...params.pos)
        newClickBox.name = params.name

        this.NPCContainer[params.name] = newClickBox
        this.NPCAnimationContainer[params.name] = params.animation
        this.NPCBaseContainer[params.name] = params
          console.log(this.NPCContainer)

        this.scene.add( newClickBox );
      },
  }
}