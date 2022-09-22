import * as THREE from "three";

export default {
  data () {
    return {
      baseParams: {
        BoxGeometry: [1, 1, 1],
      },
    }
  },
  methods: {
      async clickEvent()
      {
      },
      addStaticBox(_params)
      {
        let params = {...this.baseParams, ..._params}
        const boxGeometry = new THREE.BoxGeometry(...params.BoxGeometry);
        const boxMaterial = new THREE.MeshStandardMaterial( { wireframe: false,color: 0xA8FF59 } );
        let newClickBox = new THREE.Mesh( boxGeometry, boxMaterial );
        newClickBox.castShadow = true; //default is false
        newClickBox.receiveShadow = true; //default
        newClickBox.position.set(6,-2,6)
        this.scene.add( newClickBox );
      },
  }
}