import * as THREE from "three";
const x = 0, y = 1, z = 2

export default {
  methods:
  {

    _$check_clicks(_intersects,_last_intersected=null)
    {
      if ( _intersects.length == 0 ) return
      if (this.l_$npcList.indexOf(_intersects[0].object.parent.name) != -1)
      {
        if ( this.INTERSECTED != _intersects[ 0 ].object )
        {
        // console.log("mobile clicked a new registered npc")
          this.INTERSECTED.material.emissive.setHex( 0x00000 );
          this.INTERSECTED = _intersects[ 0 ].object
        } else {
          // this.INTERSECTED = _intersects[ 0 ].object
          // console.log("mobile clicked a new thing",this.INTERSECTED)
        }
      } else {
        // console.log("mobile clicked static object",this.INTERSECTED,_last_intersected)
        // this.INTERSECTED.currentHex = this.INTERSECTED.material.emissive.getHex();
        if (_last_intersected)
        {
          _last_intersected.material.emissive.setHex( 0x00000 );
        }
        this.INTERSECTED = null
        this.p_$localQactions = []
        this.p_$localQ = null
      }
        // console.log(_intersects)
      if ( this.INTERSECTED != _intersects[ 0 ].object )
      {
        this.INTERSECTED = _intersects[ 0 ].object
      } else {
        // this.INTERSECTED = _intersects[ 0 ].object
        // console.log("mobile clicked a new thing",this.INTERSECTED)
      }
    },
    _$mobile_touch_raycaster(reTrace = true,_last_intersected=null) // dont retrace when called from raytracer
    {
      requestAnimationFrame(() => {
        let _intersects
        if (reTrace)
        {
          _intersects = this.raycaster.intersectObjects( this.scene.children, true ); // 2nd arg recursive?
          // console.log("retraced", _intersects)
        } else {
          _intersects = this.INTERSECTED ? [this.INTERSECTED] : []
        }
        // console.log("_intersects", _intersects)
        if (  _intersects.length == 0) return
        // console.log("***",intersects[0])
        // if(this.mycurrentlevel && this.INTERSECTED && this.INTERSECTED == this.mycurrentlevel.children[0])
        // {
        // console.log("this.INTERSECTED.name")

        //     this.p_$localQactions = []
        //     this.p_$localQ = null
        // }

        if ( _intersects.length > 0 )
        {
          if ( this.INTERSECTED)
          {
            this._$check_clicks(_intersects,_last_intersected)
          } else {

            // this.INTERSECTED = _intersects[ 0 ].object
          }


          if (this.INTERSECTED && this.$parent.$refs.dom && this.$parent.$refs.dom.$refs.lotto &&  this.$parent.$refs.dom.$refs.lotto.textsignup &&
            ( this.INTERSECTED == this.$parent.$refs.dom.$refs.lotto.textsignup || 
              this.INTERSECTED == this.$parent.$refs.dom.$refs.lotto.textsignup.children[0])
            )
          {
            this.$parent.$refs.dom.$refs.lotto.execute_addFullTargetAllowance();
          }
        }
        if(this.INTERSECTED)
        {
          // console.log("INTERSECTED mobile touch",this.INTERSECTED.name)
        }
        this._$click_currentLevel()
        this._$click_npcContainer()
      })
    },
    _$mobile_raycaster()
    {

      const intersects = this.raycaster.intersectObjects( this.scene.children, true ); // 2nd arg recursive?
      // Touch events are supported

      if ( intersects.length > 0 )
      {

        if ( this.INTERSECTED)
        {
          if (this.l_$npcList.indexOf(intersects[ 0 ].object.parent.name) != -1)
          {
            // console.log("raycasted a new registered npc")
            if ( this.INTERSECTED ) this.INTERSECTED.material.emissive.setHex( this.INTERSECTED.currentHex );

            this.INTERSECTED = intersects[ 0 ].object;
            this.INTERSECTED.currentHex = this.INTERSECTED.material.emissive.getHex();
            this.INTERSECTED.material.emissive.setHex( 0xff0000 );
          } else {
            // console.log("raycasted a new static object")
            // console.log(this.INTERSECTED)
          }
            // console.log(intersects)
          if ( this.INTERSECTED != intersects[ 0 ].object )
          {
            if (this.l_$npcList.indexOf(this.INTERSECTED.parent.name) != -1)
            {
              // console.log("replaced  with registered npc")
              // if ( this.INTERSECTED ) this.INTERSECTED.material.emissive.setHex( this.INTERSECTED.currentHex );

              // this.INTERSECTED = intersects[ 0 ].object;
              // this.INTERSECTED.currentHex = this.INTERSECTED.material.emissive.getHex();
              // this.INTERSECTED.material.emissive.setHex( 0xff0000 );

              // this._$mobile_touch_raycaster(false)
            } else {
              // console.log("replaced with static object")
              // console.log(this.INTERSECTED)

              // if (this.NPCContainer)
              // {
              //   for (var i = 0; i < this.l_$npcList.length; i++)
              //   {
              //     const theNpc = this.l_$npcList[i]
              //     if (!this.NPCContainer[theNpc]) continue
              //       // console.log(theNpc)
              //     this.NPCContainer[theNpc].rotation.x = this._$lerp(this.NPCContainer[theNpc].rotation.x,0,0.1)
              //     this.NPCContainer[theNpc].rotation.y = this._$lerp(this.NPCContainer[theNpc].rotation.y,0,0.1)
              //     this.NPCContainer[theNpc].rotation.z = this._$lerp(this.NPCContainer[theNpc].rotation.z,0,0.1)
              //   }
              // }
            }
            this.INTERSECTED = intersects[ 0 ].object
          } else {
              // console.log("raycasted same intersected npc")
          }
        } else {
            // console.log("intersects", intersects)
            this.INTERSECTED = intersects[ 0 ].object

        }
      } else {
        this.INTERSECTED = null
      }
    },
    _$update_raycaster()
    {
      if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch)
      {
        this._$mobile_raycaster()  // post click event
        return
      }
      const intersects = this.raycaster.intersectObjects( this.scene.children, true ); // 2nd arg recursive?
      if ( intersects.length > 0 )
      {
        // if ( this.INTERSECTED != intersects[ 0 ].object )
        {
          // if (this.INTERSECTED) console.log(this.l_$npcList.indexOf(this.INTERSECTED.parent.name) )

          let lastIntersected = this.INTERSECTED
          this.INTERSECTED = intersects[ 0 ].object
          if (lastIntersected)
          {
            if (this.l_$npcList.indexOf(lastIntersected.parent.name) != -1)
            {
              // console.log(lastIntersected.parent.name)

              if (this.l_$npcList.indexOf(this.INTERSECTED.parent.name) != -1)
              {
                for (var i = 0; i < this.l_$npcList.length; i++)
                {
                  const theNpc = this.l_$npcList[i]
                  if (!this.NPCContainer[theNpc]) continue
                  // console.log(this.NPCContainer[theNpc].name , this.INTERSECTED.parent.name)
                  if (this.NPCContainer[theNpc].name == this.INTERSECTED.parent.name) continue
                  // console.log(this.NPCContainer[theNpc],this.NPCContainer[theNpc].children[0],theNpc)
                  this.NPCContainer[theNpc].children[0].material.emissive.setHex( 0x000000 );
                }
                // console.log(this.l_$npcList.indexOf(lastIntersected.parent.name))
                // if (this.INTERSECTED != lastIntersected)
                {
                  // lastIntersected.material.emissive.setHex( 0x000000 );
                }
              }
            } else {
              // console.log(this.l_$npcList.indexOf(lastIntersected.parent.name))
            }
          }
          if (this.INTERSECTED)
          {

            if (this.l_$npcList.indexOf(this.INTERSECTED.parent.name) != -1)
            {
              // console.log(this.INTERSECTED)
              if ( this.INTERSECTED ) this.INTERSECTED.material.emissive.setHex( this.INTERSECTED.currentHex );

              this.INTERSECTED = intersects[ 0 ].object;
              this.INTERSECTED.currentHex = this.INTERSECTED.material.emissive.getHex();
              this.INTERSECTED.material.emissive.setHex( 0xff0000 );
            }
          }
        } 
      } else {
        this.INTERSECTED = null
      }
      return intersects
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