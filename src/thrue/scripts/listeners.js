import * as THREE from "three";
const x = 0, y = 1, z = 2

export default {
  methods:
  {
    
    onPointerClick(e)
    {

      if (this.INTERSECTED && this.$parent.$refs.dom && this.$parent.$refs.dom.$refs.lotto &&  this.$parent.$refs.dom.$refs.lotto.textsignup &&
        ( this.INTERSECTED == this.$parent.$refs.dom.$refs.lotto.textsignup || 
          this.INTERSECTED == this.$parent.$refs.dom.$refs.lotto.textsignup.children[0])
        )
      {
        this.$parent.$refs.dom.$refs.lotto.execute_addFullTargetAllowance();
      }

      this.checkConnectWallet()
      this.checkLevelOneClickers()
      this.checkClickNpc()
    },
    updateRaycaster()
    {
      const intersects = this.raycaster.intersectObjects( this.scene.children, true ); // 2nd arg recursive?
      if ( intersects.length > 0 )
      {
        if ( this.INTERSECTED != intersects[ 0 ].object )
        {
          this.INTERSECTED = intersects[ 0 ].object
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
    onPointerMove( event )
    {
      this.pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
      this.pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    },
  }
}