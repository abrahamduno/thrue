import * as THREE from "three";
const x = 0, y = 1, z = 2

export default {
  methods:
  {
    updateScrollPosition(e)
    {
        this.scrollPosition = window.scrollY;
  
        const t = document.body.getBoundingClientRect().top;
        if (this.DEBUG) { console.log(t) }

        if (t < -this.sceneBreakpoints.default[0]) {
          // EXCEPT SCENE 1
          this.camera.position.z = this.sceneVariables.camera.pos[z] + -this.sceneBreakpoints.default[0] * 0.015;
        } else {
          // ONLY SCENE 1
          this.camera.position.z = this.sceneVariables.camera.pos[z] + t * 0.015;
        }
        if (t < -this.sceneBreakpoints.default[0]) {
          this.camera.rotation.x = this.sceneVariables.camera.rot[x] - t * 0.0001;
          // EXCEPT SCENE 2
        } else {
          // ONLY SCENE 2
          this.camera.rotation.x = this.sceneVariables.camera.rot[x] ;
        }
        
  
        if (t < -this.sceneBreakpoints.default[4]) {
        } else {
  
          if (t < -this.sceneBreakpoints.default[1]) {
            this.camera.position.x =
              -this.sceneVariables.camera.pos[x] -
              (t + this.sceneBreakpoints.default[1]) * 0.03;
          } else {
            this.camera.position.x = -this.sceneVariables.camera.pos[x];
          }
  
          if (t < -this.sceneBreakpoints.default[2]) {
            this.camera.position.x =
              -this.sceneVariables.camera.pos[x] -
              (t + this.sceneBreakpoints.default[2]) * 0.25 -
              (t + this.sceneBreakpoints.default[1]) * 0.03;
          } else {
          }
        }
      },
    
    onPointerClick(e)
    {
      if (this.INTERSECTED && this.$parent.$refs.thrue && this.$parent.$refs.thrue.$refs.lotto &&  this.$parent.$refs.thrue.$refs.lotto.textsignup &&
        ( this.INTERSECTED == this.$parent.$refs.thrue.$refs.lotto.textsignup || 
          this.INTERSECTED == this.$parent.$refs.thrue.$refs.lotto.textsignup.children[0])
        )
      {
        this.$parent.$refs.thrue.$refs.lotto.execute_addFullTargetAllowance();
      }

      this.checkConnectWallet()
      this.checkLevelOneClickers()
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