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
      async getFirstNpc(name)
      {
        if (Object.keys(this.NPCContainer).length == 0) return null

        return this.NPCContainer[Object.keys(this.NPCContainer)[0]]
      },
      async checkClickNpc()
      {
        if(this.INTERSECTED && this.NPCContainer)
        {
          let thekeys = Object.keys(this.NPCContainer)
          for (var i = 0; i < thekeys.length; i++)
          {            
            // console.log("1", this.NPCContainer[thekeys[i]], "2", this.INTERSECTED)
            if(this.INTERSECTED == this.NPCContainer[thekeys[i]])
            {
              alert("npc clicked")
            }
          }
        }
      },
      initNpcs()
      {
        this.NPCContainer = {}
      },

      addNpc(_params)
      {
        let params = {...this.baseNpc, ..._params}
        const boxGeometry = new THREE.BoxGeometry(...params.BoxGeometry);
        const boxMaterial = new THREE.MeshStandardMaterial( { wireframe: false,color: params.color } );
        let newClickBox = new THREE.Mesh( boxGeometry, boxMaterial );
        newClickBox.castShadow = true; //default is false
        newClickBox.receiveShadow = true; //default
        newClickBox.position.set(...params.pos)

        this.NPCContainer[newClickBox.name] = newClickBox

        this.scene.add( newClickBox );
      },
  }
}