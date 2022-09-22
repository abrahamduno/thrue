import * as THREE from "three";

export default {


data () {
  return {
    // loading: false,
    // hasStarted: false,
    // selectedKey: null,

  }
},
methods: {
    animate_connectOrb()
    {
      this.rocketMesh.position.y =
        this.lerp(this.rocketMesh.position.y,Math.sin(this.tcounter*0.03)*0.15+(this.accs_length ? 25 : +0.6),0.02)
      this.rocketMesh.rotation.z = -Math.sin(this.tcounter*0.02)*0.35
      this.rocketMesh.rotation.x = Math.sin(this.tcounter*0.05)*0.15
      this.rocketMesh.rotation.y += 0.006-this.pointer.x*0.01
    },
    checkConnectWallet()
    {
      if(this.INTERSECTED && this.INTERSECTED == this.rocketMesh)
      {
        this.connectWalletOrb()
      }
    },
    // async connectWallet() {
        // this.loading = true
        // this.$store.dispatch("setNewBlock", {key:"values",...newnew})
        // await this.$store.dispatch("connectWallet")
        // this.loading = false
        // let newnew = {signup:true}
    // },
    // start()
    // {
    //     this.$emit('animate')
    //     // this.hasStarted = true
    // },
    // setKey(newKey)
    // {
    //     this.selectedKey = newKey
    // },
    async connectWalletOrb()
    {
      // this.loading = true
      await this.$store.dispatch("connectWallet")
      // this.rocketMesh.visible = false
      // this.addSignOrb()
      if (!this.mylevelone)
      {
        this.addLevelOne()
      }
    },
    addConnectOrb(  ) {

      const boxGeometry = new THREE.SphereGeometry(0.25, 3,4 );
      const boxMaterial = new THREE.MeshStandardMaterial( { wireframe: false,color: 0xFFA859 } );
      this.rocketMesh = new THREE.Mesh( boxGeometry, boxMaterial );
      this.rocketMesh.castShadow = true; //default is false
      this.rocketMesh.receiveShadow = true; //default
      this.rocketMesh.position.set(-0.25,0,7.3)
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