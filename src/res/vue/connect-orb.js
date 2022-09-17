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
      this.addSignOrb()
    },
    addConnectOrb(  ) {

      const boxGeometry = new THREE.SphereGeometry(1, 4,4 );
      const boxMaterial = new THREE.MeshStandardMaterial( { wireframe: false,color: 0xFFA859 } );
      this.rocketMesh = new THREE.Mesh( boxGeometry, boxMaterial );
      this.rocketMesh.castShadow = true; //default is false
      this.rocketMesh.receiveShadow = true; //default
      this.rocketMesh.position.y = 4
      this.rocketMesh.position.x = 2
      this.rocketMesh.position.z = 5
      this.scene.add( this.rocketMesh );

      },
    addSignOrb(  ) {

      const boxGeometry = new THREE.SphereGeometry(1, 3,3);
      const boxMaterial = new THREE.MeshStandardMaterial( { wireframe: false,color: 0xFFA859 } );
      this.signMesh = new THREE.Mesh( boxGeometry, boxMaterial );
      this.signMesh.castShadow = true; //default is false
      this.signMesh.receiveShadow = true; //default
      this.signMesh.position.y = 4
      this.signMesh.position.x = -8
      this.signMesh.position.z = 15
      this.scene.add( this.signMesh );

      },
}


}