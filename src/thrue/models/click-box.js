import * as THREE from "three";

export default {
  data () {
    return {
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
      addConnectOrb()
      {
        const boxGeometry = new THREE.SphereGeometry(1, 1,1 );
        const boxMaterial = new THREE.MeshStandardMaterial( { wireframe: false,color: 0xA8FF59 } );
        this.clickBox = new THREE.Mesh( boxGeometry, boxMaterial );
        this.clickBox.castShadow = true; //default is false
        this.clickBox.receiveShadow = true; //default
        this.clickBox.position.set(-0.5,0,5)
        this.scene.add( this.clickBox );
      },
  }
}