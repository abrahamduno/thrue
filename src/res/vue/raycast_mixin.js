import * as THREE from "three";

export default {
data () {
  return {

  }
},
methods: {

    
    onPointerClick(e)
    {
        const intersects = this.raycaster.intersectObjects( this.scene.children, true ); // 2nd arg recursive?
        if ( intersects.length > 0 ) {
          // console.log(intersects[ 0 ])
          // if (this.$parent.$refs.thrue && this.$parent.$refs.thrue.$refs.lotto) { console.log(intersects[ 0 ].object) }
          // if (this.$parent.$refs.thrue && this.$parent.$refs.thrue.$refs.lotto) { console.log(this.$parent.$refs.thrue.$refs.lotto.textsignup) }
          // if (this.$parent.$refs.thrue && this.$parent.$refs.thrue.$refs.lotto) { console.log(this.$parent.$refs.thrue.$refs.lotto.textsignup.children) }
          if (this.$parent.$refs.thrue && this.$parent.$refs.thrue.$refs.lotto &&  this.$parent.$refs.thrue.$refs.lotto.textsignup &&
            ( intersects[ 0 ].object == this.$parent.$refs.thrue.$refs.lotto.textsignup || 
              intersects[ 0 ].object == this.$parent.$refs.thrue.$refs.lotto.textsignup.children[0])
            )
          {
            // alert()
            this.$parent.$refs.thrue.$refs.lotto.execute_addFullTargetAllowance();
          }
        }
      // console.log(this.INTERSECTED)
      // if (this.$parent.$refs.thrue.$refs.lotto)
      //   { console.log("this.$parent.$refs.thrue.$refs.lotto.textsignup", this.$parent.$refs.thrue.$refs.lotto.textsignup) }
      // if(this.INTERSECTED && this.$parent.$refs.thrue.$refs.lotto && this.INTERSECTED == this.$parent.$refs.thrue.$refs.lotto.textsignup)
      // {
      //   alert()
      //   this.$parent.$refs.thrue.$refs.lotto.execute_addFullTargetAllowance();
      //   // this.l
      // }
      if(this.INTERSECTED && this.INTERSECTED == this.rocketMesh)
      {
        this.connectWalletOrb()
        // alert("scroll down")
        // console.log(intersects.length,intersects)
      }
    },
    updateRaycaster()
    {

        const intersects = this.raycaster.intersectObjects( this.scene.children, true ); // 2nd arg recursive?

        if ( intersects.length > 0 ) {

          if ( this.INTERSECTED != intersects[ 0 ].object )
          {
            // if ( this.INTERSECTED != intersects[ 0 ].object )
            {
                this.INTERSECTED = intersects[ 0 ].object
            }
          }
        } else {
          this.INTERSECTED = null
        }

    },
    setRaycaster()
    {
      this.INTERSECTED = null
      this.pointer = {x:null,y:null}
      this.raycaster = new THREE.Raycaster();
    },
    onPointerMove( event ) {

        this.pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        this.pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
        // console.log(this.pointer)

      }
}
}