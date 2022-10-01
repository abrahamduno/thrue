import * as THREE from "three";
const x = 0, y = 1, z = 2

export default {
  methods:
  {
    _$animate_main()
    {
      this.__orbitcontrols.update()
      // let ms = Date.now();

      // if ()
      const nowT = Date.now()
      // console.log(nowT)
      if (this.__player && this.__player.q.length)
      {
        if (nowT > this.__player.q[0].t+this.__player.q[0].d)
        {
          // alert("action finished")
          let theStat = this.__player.q[0].stat

          if (this.__player.stats[theStat] < 10)
          {
            this.$store.dispatch("setPlayerStats",{
              id:"0",
              stats:{
                [theStat]: parseFloat(this.__player.stats[theStat])+1,
              },
            })
          } else {
            alert("You are sinnin "+theStat)
          }
          this.$store.dispatch("clearFirstInQ",{
            id:"0",
          })
        }
      }
      // console.log(ms);

      this.$animate_startLevelBlob()

      // TRANSITION TO LEVEL ! WHEN CONNECTED
      if (this.accs_length || this.is_playing_test)
      {
        this.sunlight.position.z = this.__scroll * 0.01 +15
        this.sunlighTarget.position.z = this.__scroll * 0.01 -15
        this.sunlight.target  = this.sunlighTarget

        this.myobject.position.z = this._$lerp(this.myobject.position.z,this.LIVE_OFFSET.myobject.z,0.07)
        this.myobject.position.x = this._$lerp(this.myobject.position.x,this.LIVE_OFFSET.myobject.x,0.07)
        this.myobject.position.y = this._$lerp(this.myobject.position.y,this.MIN.y+this.LIVE_OFFSET.myobject.y,0.07)
        // this.myobject.rotation.y = this._$lerp(this.myobject.rotation.y,Math.PI/12,0.07)
        if (this.mysign)
        {
          this.mysign.position.z = this._$lerp(this.mysign.position.z,this.LIVE_OFFSET.mysign.z,0.07)
          this.mysign.position.x = this._$lerp(this.mysign.position.x,this.LIVE_OFFSET.mysign.x,0.07)
          this.mysign.position.y = this._$lerp(this.mysign.position.y,this.MIN.y+this.LIVE_OFFSET.mysign.y,0.07)
        }
      }

      // LIVE ANIMAL LOOKING TO POINTER
      if (this.mysign)
      {
        // console.log(this.__pointer)
        if (this.__pointer.x == null && this.__pointer.y == null)
        {
          // console.log("asd")
          this.mysign.rotation.y = this._$lerp(this.mysign.rotation.y,-0.6,0.01)
          this.mysign.rotation.x = this._$lerp(this.mysign.rotation.x,-0.2,0.03)
          // this.mysign.rotation.y = this._$lerp(this.mysign.rotation.y,this.__pointer.x,0.07)
        } else {
          this.mysign.rotation.y = this._$lerp(this.mysign.rotation.y,this.__pointer.x,0.07)
          this.mysign.rotation.x = this._$lerp(this.mysign.rotation.x,-this.__pointer.y+0.4,0.07)
        }
      }

    },
    _$animate_currentLevel()
    {
      let r = this.refreshAccelerator
      if (this.mycurrentlevel && this.mycurrentlevel.position.y != this.MIN.y)
      {
        this.mycurrentlevel.position.y = this.MIN.y
      }

      if (this.NPCContainer)
      {
        for (var i = 0; i < this.l_$npcList.length; i++)
        {
          const theNpc = this.l_$npcList[i]
          if (!this.NPCContainer[theNpc]) continue
            // console.log(theNpc)
          this.NPCContainer[theNpc].rotation.x = this._$lerp(this.NPCContainer[theNpc].rotation.x,0,0.1)
          this.NPCContainer[theNpc].rotation.y = this._$lerp(this.NPCContainer[theNpc].rotation.y,0,0.1)
          this.NPCContainer[theNpc].rotation.z = this._$lerp(this.NPCContainer[theNpc].rotation.z,0,0.1)
        }
      }

      if ((this.accs_length || this.is_playing_test) && this.myplayer && this.__player)
      {
        // console.log(this.__player_rot_y)
        this.myplayer.position.set(
          this._$lerp(this.myplayer.position.x,this.__player.pos[x],0.05*r),
          this._$lerp(this.myplayer.position.y,this.__player.pos[y]+this.MIN.y,0.05*r),
          this._$lerp(this.myplayer.position.z,this.__player.pos[z],0.05*r),
        )
        if (this.__player.q.length)
        {
          let theNpc = this.__player.q[0].npcRef
          if (this.NPCBaseContainer[theNpc].playerrot)
          {
            this.myplayer.rotation.set(
              this._$lerp(this.myplayer.rotation.x,this.NPCBaseContainer[theNpc].playerrot[x],0.05*r),
              this._$lerp(this.myplayer.rotation.y,this.NPCBaseContainer[theNpc].playerrot[y],0.05*r),
              this._$lerp(this.myplayer.rotation.z,this.NPCBaseContainer[theNpc].playerrot[z],0.05*r),
            )
          }

          if (this.__orbitcontrols)
          {
            this.__orbitcontrols.target.set(
              this._$lerp(this.__orbitcontrols.target.x,this.NPCBaseContainer[theNpc].playerpos[0],0.1),
              this._$lerp(this.__orbitcontrols.target.y,this.NPCBaseContainer[theNpc].playerpos[1],0.1),
              this._$lerp(this.__orbitcontrols.target.z,this.NPCBaseContainer[theNpc].playerpos[2],0.1))
          }
        }
      }
      
      this.animate_ticketer()
    },
    l_$listen_scrollPosition(e)
    {
      this.__scroll = window.scrollY;

      const t = document.body.getBoundingClientRect().top;
      this.__scroll = t
      console.log(this.__scroll)
      // this.__scroll = window.scrollY;
      // if (this.DEBUG) { console.log(t) }
      // let currentScene = 1
      // // currentScene = 
      // // FLY THRU CITY
      // if (t < -this.sceneBreakpoints.default[currentScene]) {
      //   // EXCEPT SCENE 1
      //   this.camera.position.z = this.sceneVariables.camera.pos[z] + -this.sceneBreakpoints.default[currentScene] * 0.015;
      // } else {
      //   // ONLY SCENE 1
      //   this.camera.position.z = this.sceneVariables.camera.pos[z] + t * 0.015;
      // }
    },
    
    _$swipe_left()
    {
    },

    _$swipe_right()
    {
    },
    _$swipe_up()
    {
    },
    _$swipe_down()
    {
    },
  }
}



    // _player_moveBackward()
    // {
    //   let newPosX = 0
    //   let newPosZ = 0
    //   // console.log(this.__player.rot[y])
    //   let currentRotY = this.__player.rot[y]
    //   console.log(currentRotY)
    //   if (currentRotY == 0) // north
    //   {
    //     newPosZ = -4
    //   }
    //   if (currentRotY == Math.PI || currentRotY == -Math.PI ) // south
    //   {
    //     newPosZ = 4
    //   }
    //   if (currentRotY > 0)
    //   {
    //     if (Math.abs(currentRotY) == Math.PI/2) // west
    //     {
    //       newPosX = -4
    //     }
    //     if (Math.abs(currentRotY) == Math.PI/4) // north west
    //     {
    //       newPosX = -4
    //       newPosZ = -4
    //     }
    //     if (Math.abs(currentRotY) == Math.PI/4*3) // south west
    //     {
    //       newPosX = -4
    //       newPosZ = 4
    //     }
    //   }
    //   if (currentRotY < 0)
    //   {
    //     if (Math.abs(currentRotY) == Math.PI/2) // west
    //     {
    //       newPosX = 4
    //     }
    //     if (Math.abs(currentRotY) == Math.PI/4) // north west
    //     {
    //       newPosX = 4
    //       newPosZ = -4
    //     }
    //     if (Math.abs(currentRotY) == Math.PI/4*3) // south west
    //     {
    //       newPosX = 4
    //       newPosZ = 4
    //     }
    //   }
    //   // console.table({newPosX,newPosZ})
    //   this.$store.dispatch("setPlayerPosition",{
    //     id:"0",
    //     pos:[
    //       this.__player.pos[x]+(newPosX*-1),
    //       this.__player.pos[y],
    //       this.__player.pos[z]+(newPosZ*-1),
    //     ]
    //   })
    // },
    // _player_moveForward()
    // {
    //   let newPosX = 0
    //   let newPosZ = 0
    //   // console.log(this.__player.rot[y])
    //   let currentRotY = this.__player.rot[y]
    //   console.log(currentRotY)
    //   if (currentRotY == 0) // north
    //   {
    //     newPosZ = -4
    //   }
    //   if (currentRotY == Math.PI || currentRotY == -Math.PI ) // south
    //   {
    //     newPosZ = 4
    //   }
    //   if (currentRotY > 0)
    //   {
    //     if (Math.abs(currentRotY) == Math.PI/2) // west
    //     {
    //       newPosX = -4
    //     }
    //     if (Math.abs(currentRotY) == Math.PI/4) // north west
    //     {
    //       newPosX = -4
    //       newPosZ = -4
    //     }
    //     if (Math.abs(currentRotY) == Math.PI/4*3) // south west
    //     {
    //       newPosX = -4
    //       newPosZ = 4
    //     }
    //   }
    //   if (currentRotY < 0)
    //   {
    //     if (Math.abs(currentRotY) == Math.PI/2) // west
    //     {
    //       newPosX = 4
    //     }
    //     if (Math.abs(currentRotY) == Math.PI/4) // north west
    //     {
    //       newPosX = 4
    //       newPosZ = -4
    //     }
    //     if (Math.abs(currentRotY) == Math.PI/4*3) // south west
    //     {
    //       newPosX = 4
    //       newPosZ = 4
    //     }
    //   }
    //   // console.table({newPosX,newPosZ})
    //   this.$store.dispatch("setPlayerPosition",{
    //     id:"0",
    //     pos:[
    //       this.__player.pos[x]+newPosX,
    //       this.__player.pos[y],
    //       this.__player.pos[z]+newPosZ,
    //     ]
    //   })
    // },
    // checkNavigationClick()
    // {
    //   if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch)
    //   { 
    //     // Touch events are supported
    //   } else {

    //     if (this.__pointer.y < -0.6)  
    //     // if (this.__pointer.y > -0.3 && this.__pointer.y < 0.3)  
    //     {
    //       if (this.__player &&this.__pointer.x > -0.3 && this.__pointer.x < 0.3)
    //       {
    //         this._player_moveBackward()
    //       }
    //     }
    //     if (this.__pointer.y > 0.6)  
    //     // if (this.__pointer.y > -0.3 && this.__pointer.y < 0.3)  
    //     {
    //       if (this.__player &&this.__pointer.x > -0.3 && this.__pointer.x < 0.3)
    //       {
    //         this._player_moveForward()
    //       }
    //     }

    //     // if (this.__pointer.y < -0.6)  
    //     // {
    //     //   if (this.__player && this.__pointer.x > -0.6 && this.__pointer.x < 0.6)
    //     //   {
    //     //     this.$store.dispatch("setPlayerPosition",{
    //     //       id:"0",
    //     //       pos:[
    //     //         this.__player.pos[x],
    //     //         this.__player.pos[y],
    //     //         this.__player_pos_z+4,
    //     //       ]
    //     //     })
    //     //   }
    //     // }

    //     if (this.__pointer.x < -0.6)  
    //     {
    //       if (this.__player && this.__pointer.y > -0.6 && this.__pointer.y < 0.6)
    //       {
    //         let newRotY = this.__player.rot[y]+Math.PI/4
    //         if (newRotY >= Math.PI)
    //         {
    //           newRotY = -Math.PI
    //           this.camera.rotation.y = -Math.PI - ((Math.PI - this.camera.rotation.y))
    //         }
    //         this.$store.dispatch("setPlayerRotation",{
    //           id:"0",
    //           rot:[
    //             this.__player.rot[x],
    //             newRotY,
    //             this.__player.rot[z],
    //           ],
    //         })
    //       }
    //     }
    //     if (this.__pointer.x > 0.6)  
    //     {
    //       if (this.__player && this.__pointer.y > -0.6 && this.__pointer.y < 0.6)
    //       {
    //         let newRotY = this.__player.rot[y]-Math.PI/4
    //         if (newRotY <= -Math.PI)
    //         {
    //           newRotY = Math.PI
    //           this.camera.rotation.y = Math.PI + ((Math.PI + this.camera.rotation.y))
    //         }
    //         console.log("newRotY2",newRotY)
    //         this.$store.dispatch("setPlayerRotation",{
    //           id:"0",
    //           rot:[
    //             this.__player.rot[x],
    //             newRotY,
    //             this.__player.rot[z],
    //           ],
    //         })
    //       }
    //     }


    //   }
    // },