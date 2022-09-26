import * as THREE from "three";
const x = 0, y = 1, z = 2

export default {
  methods:
  {
    _$update_raycaster()
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
    _$set_raycaster()
    {
      this.INTERSECTED = null
      this.__pointer = {x:null,y:null}
      this.raycaster = new THREE.Raycaster();
    },
    _$listen_pointerPos( event )
    {
      this.__pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
      this.__pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    },
  }
}