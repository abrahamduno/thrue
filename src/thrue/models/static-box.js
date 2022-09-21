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
      // checkConnectWallet()
      // {
      //   if(this.INTERSECTED && this.INTERSECTED == this.rocketMesh)
      //   {
      //     this.connectWalletOrb()
      //   }
      // },
      async clickEvent()
      {
      //   // this.loading = true
      //   await this.$store.dispatch("connectWallet")
      //   // this.rocketMesh.visible = false
      //   // this.addSignOrb()
      //   if (!this.mylevelone)
      //   {
      //     this.addLevelOne()
      //   }
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