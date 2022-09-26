import * as THREE from "three";

export default {
  methods: {
    $animate_startLevelBlob()
    {
      this.startLevelBlob.position.y =
        this.$lerp(this.startLevelBlob.position.y,Math.sin(this.__timer*0.03)*0.15+(
        (this.accs_length ||this.is_playing_test ) ? 25 : +0.6
         ),0.02)
      this.startLevelBlob.rotation.z = -Math.sin(this.__timer*0.02)*0.35
      this.startLevelBlob.rotation.x = Math.sin(this.__timer*0.05)*0.15
      this.startLevelBlob.rotation.y += 0.006-this.__pointer.x*0.01
    },
    $click_startLevelBlob()
    {
      if(this.INTERSECTED && this.INTERSECTED == this.startLevelBlob)
      {
        this.clicked_startLevelBlob()
      }
    },
    async clicked_startLevelBlob()
    {
      await this.$store.dispatch("connectWallet")
      if (!this.mycurrentlevel)
      {
        this.addCurrentLevel()
        this.enable_help++
        this.show_help = true
      }
    },
    add_startLevelBlob()
    {
      const orbGeometry = new THREE.SphereGeometry(0.25, 3,4 );
      const orbMaterial = new THREE.MeshStandardMaterial( { wireframe: false,color: 0xFFA859 } );
      this.startLevelBlob = new THREE.Mesh( orbGeometry, orbMaterial );
      this.startLevelBlob.castShadow = true; //default is false
      this.startLevelBlob.receiveShadow = true; //default
      this.startLevelBlob.position.set(-0.25,0,7.3)
      this.scene.add( this.startLevelBlob );
    },
  }
}