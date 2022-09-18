import * as THREE from "three";

export default {


data () {
  return {

  }
},
methods: {

    async connectWalletOrb()
    {
      // this.loading = true
      await this.$store.dispatch("connectWallet")
      // this.rocketMesh.visible = false
      // this.addSignOrb()
      if (!this.mylevelone)
      { this.addLevelOne() }
    },
    addConnectOrb(  ) {

      const boxGeometry = new THREE.SphereGeometry(1, 3,4 );
      const boxMaterial = new THREE.MeshStandardMaterial( { wireframe: false,color: 0xFFA859 } );
      this.rocketMesh = new THREE.Mesh( boxGeometry, boxMaterial );
      this.rocketMesh.castShadow = true; //default is false
      this.rocketMesh.receiveShadow = true; //default
      this.rocketMesh.position.set(-1,0,5)
      this.scene.add( this.rocketMesh );

      },
    // addSignOrb(  ) {

    //   const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
    //   const boxMaterial = new THREE.MeshStandardMaterial( { wireframe: false,color: 0xFFA859 } );
    //   this.signMesh = new THREE.Mesh( boxGeometry, boxMaterial );
    //   this.signMesh.castShadow = true; //default is false
    //   this.signMesh.receiveShadow = true; //default
    //   this.signMesh.position.x = -4
    //   this.signMesh.position.y = 0
    //   this.signMesh.position.z = 5
    //   this.scene.add( this.signMesh );

    //   },
}


}