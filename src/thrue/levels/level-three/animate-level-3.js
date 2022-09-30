import * as THREE from "three";
const x = 0, y = 1, z = 2

export default {
  methods:
  {
    _player_moveBackward()
    {
      let newPosX = 0
      let newPosZ = 0
      // console.log(this.__player.rot[y])
      let currentRotY = this.__player.rot[y]
      console.log(currentRotY)
      if (currentRotY == 0) // north
      {
        newPosZ = -4
      }
      if (currentRotY == Math.PI || currentRotY == -Math.PI ) // south
      {
        newPosZ = 4
      }
      if (currentRotY > 0)
      {
        if (Math.abs(currentRotY) == Math.PI/2) // west
        {
          newPosX = -4
        }
        if (Math.abs(currentRotY) == Math.PI/4) // north west
        {
          newPosX = -4
          newPosZ = -4
        }
        if (Math.abs(currentRotY) == Math.PI/4*3) // south west
        {
          newPosX = -4
          newPosZ = 4
        }
      }
      if (currentRotY < 0)
      {
        if (Math.abs(currentRotY) == Math.PI/2) // west
        {
          newPosX = 4
        }
        if (Math.abs(currentRotY) == Math.PI/4) // north west
        {
          newPosX = 4
          newPosZ = -4
        }
        if (Math.abs(currentRotY) == Math.PI/4*3) // south west
        {
          newPosX = 4
          newPosZ = 4
        }
      }
      // console.table({newPosX,newPosZ})
      this.$store.dispatch("setPlayerPosition",{
        id:"0",
        pos:[
          this.__player.pos[x]+(newPosX*-1),
          this.__player.pos[y],
          this.__player.pos[z]+(newPosZ*-1),
        ]
      })
    },
    _player_moveForward()
    {
      let newPosX = 0
      let newPosZ = 0
      // console.log(this.__player.rot[y])
      let currentRotY = this.__player.rot[y]
      console.log(currentRotY)
      if (currentRotY == 0) // north
      {
        newPosZ = -4
      }
      if (currentRotY == Math.PI || currentRotY == -Math.PI ) // south
      {
        newPosZ = 4
      }
      if (currentRotY > 0)
      {
        if (Math.abs(currentRotY) == Math.PI/2) // west
        {
          newPosX = -4
        }
        if (Math.abs(currentRotY) == Math.PI/4) // north west
        {
          newPosX = -4
          newPosZ = -4
        }
        if (Math.abs(currentRotY) == Math.PI/4*3) // south west
        {
          newPosX = -4
          newPosZ = 4
        }
      }
      if (currentRotY < 0)
      {
        if (Math.abs(currentRotY) == Math.PI/2) // west
        {
          newPosX = 4
        }
        if (Math.abs(currentRotY) == Math.PI/4) // north west
        {
          newPosX = 4
          newPosZ = -4
        }
        if (Math.abs(currentRotY) == Math.PI/4*3) // south west
        {
          newPosX = 4
          newPosZ = 4
        }
      }
      // console.table({newPosX,newPosZ})
      this.$store.dispatch("setPlayerPosition",{
        id:"0",
        pos:[
          this.__player.pos[x]+newPosX,
          this.__player.pos[y],
          this.__player.pos[z]+newPosZ,
        ]
      })
    },
    checkNavigationClick()
    {
      if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch)
      { 
        // Touch events are supported
      } else {

        if (this.__pointer.y < -0.6)  
        // if (this.__pointer.y > -0.3 && this.__pointer.y < 0.3)  
        {
          if (this.__player &&this.__pointer.x > -0.3 && this.__pointer.x < 0.3)
          {
            this._player_moveBackward()
          }
        }
        if (this.__pointer.y > 0.6)  
        // if (this.__pointer.y > -0.3 && this.__pointer.y < 0.3)  
        {
          if (this.__player &&this.__pointer.x > -0.3 && this.__pointer.x < 0.3)
          {
            this._player_moveForward()
          }
        }

        // if (this.__pointer.y < -0.6)  
        // {
        //   if (this.__player && this.__pointer.x > -0.6 && this.__pointer.x < 0.6)
        //   {
        //     this.$store.dispatch("setPlayerPosition",{
        //       id:"0",
        //       pos:[
        //         this.__player.pos[x],
        //         this.__player.pos[y],
        //         this.__player_pos_z+4,
        //       ]
        //     })
        //   }
        // }

        if (this.__pointer.x < -0.6)  
        {
          if (this.__player && this.__pointer.y > -0.6 && this.__pointer.y < 0.6)
          {
            let newRotY = this.__player.rot[y]+Math.PI/4
            if (newRotY >= Math.PI)
            {
              newRotY = -Math.PI
              this.camera.rotation.y = -Math.PI - ((Math.PI - this.camera.rotation.y))
            }
            this.$store.dispatch("setPlayerRotation",{
              id:"0",
              rot:[
                this.__player.rot[x],
                newRotY,
                this.__player.rot[z],
              ],
            })
          }
        }
        if (this.__pointer.x > 0.6)  
        {
          if (this.__player && this.__pointer.y > -0.6 && this.__pointer.y < 0.6)
          {
            let newRotY = this.__player.rot[y]-Math.PI/4
            if (newRotY <= -Math.PI)
            {
              newRotY = Math.PI
              this.camera.rotation.y = Math.PI + ((Math.PI + this.camera.rotation.y))
            }
            console.log("newRotY2",newRotY)
            this.$store.dispatch("setPlayerRotation",{
              id:"0",
              rot:[
                this.__player.rot[x],
                newRotY,
                this.__player.rot[z],
              ],
            })
          }
        }


      }
    },
    _$swipe_left()
    {
        let r = this.refreshAccelerator
      if (this.__player)
      {
        this.$store.dispatch("setPlayerRotation",{
          id:"0",
          rot:[
            this.__player.rot[x],
            this.__player_rot_y+Math.PI/4,
            this.__player.rot[z],
          ],
        })
      }
    },

    _$swipe_right()
    {
        let r = this.refreshAccelerator
      if (this.__player)
      {
        this.$store.dispatch("setPlayerRotation",{
          id:"0",
          rot:[
            this.__player.rot[x],
            this.__player_rot_y-Math.PI/4,
            this.__player.rot[z],
          ],
        })
      }
    },
    _$swipe_up()
    {
      let r = this.refreshAccelerator
      if (this.__player)
      {
        this._player_moveForward()
        // this.$store.dispatch("setPlayerPosition",{
        //   id:"0",
        //   pos:[
        //     this.__player.pos[x],
        //     this.__player.pos[y],
        //     this.__player_pos_z-this.__swipe.diffy*0.1*r,
        //   ],
        // })
      }
    },
    _$swipe_down()
    {
      let r = this.refreshAccelerator
      if (this.__player)
      {
            this._player_moveBackward()
      //   this.$store.dispatch("setPlayerPosition",{
      //     id:"0",
      //     pos:[
      //       this.__player.pos[x],
      //       this.__player.pos[y],
      //       this.__player_pos_z-this.__swipe.diffy*0.1*r,
      //     ],
      //   })
      }

    },
    _$animate_main()
    {
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
      if (this.mycurrentlevel && this.mycurrentlevel.position.y != this.MIN.y)
      {
        this.mycurrentlevel.position.y = this.MIN.y
      }

      // if (this._player)
      {
        // console.log("player")
          const statList = ["energy","hunger","hygene","fun"]
        if (this.NPCContainer)
        {
          for (var i = 0; i < statList.length; i++)
          {
            const theStat = statList[i]
            if (!this.NPCContainer[theStat]) continue
            this.NPCContainer[theStat].rotation.x = this._$lerp(this.NPCContainer[theStat].rotation.x,0,0.1)
            this.NPCContainer[theStat].rotation.y = this._$lerp(this.NPCContainer[theStat].rotation.y,0,0.1)
            this.NPCContainer[theStat].rotation.z = this._$lerp(this.NPCContainer[theStat].rotation.z,0,0.1)
          }
        }
      }

      //   // PLAYER CAMERA
      // if (this.camera && this.pro_mode &&
      //   (this.__pointer.x < -0.2 || this.__pointer.x > 0.2)
      //   )
      // {
      //   this.camera.rotation.y =
      //     this._$lerp(this.camera.rotation.y,-this.__pointer.x*(Math.PI*0.6)+(this.__pointer.x < -0.2 ? -0.2 : +0.2),0.07)
      // } else {
      //   this.camera.rotation.y = this._$lerp(this.camera.rotation.y,0,0.07)
      // }

        // PLAYER CAMERA
      // if (this.camera && this.pro_mode)
      // {
        // if (this.__pointer.x < -0.75 || this.__pointer.x > 0.75)
        // {
        //   if (this.__pointer.y > -0.25 && this.__pointer.y < 0.25)
        //   {
        //     this.camera.rotation.y -= (this.__pointer.x)*0.01
        //   }
        // }
        // //   this._$lerp(this.camera.rotation.y,-this.__pointer.x*(Math.PI*0.6)+(this.__pointer.x < -0.2 ? -0.2 : +0.2),0.07)
      // } else {
        // this.camera.rotation.y = this._$lerp(this.camera.rotation.y,0,0.07)
      // }
      if (this.accs_length || this.is_playing_test)
      {
        // console.log(this.__player_rot_y)
        this.camera.position.x = this._$lerp(this.camera.position.x,this.__player.pos[x],0.05)
        this.camera.rotation.y = this._$lerp(this.camera.rotation.y,this.__player.rot[y],0.05)
        this.camera.position.z = this._$lerp(this.camera.position.z,this.__player.pos[z],0.05)
        // if (this.__pointer.x < -0.75 || this.__pointer.x > 0.75)
        // {
        //   if (this.__pointer.y > -0.25 && this.__pointer.y < 0.25)
        //   {
        //     // const newRot = this.camera.rotation.y - (this.__pointer.x)*0.01
        //     this.camera.rotation.y = this._$lerp(this.camera.rotation.y,this.$player.rot[y],0.0005)
        //   }
        // }
        // if (this.$player.rot[y] != this.camera.rotation.y)
        // {
        //   const newRot = this._$lerp(this.$player.rot[y],this.camera.rotation.y,0.0005)
        //   this.$store.dispatch("setPlayerStats",{
        //     id:"0",
        //     rot:[
        //       this.$player.rot[x],
        //       newRot,
        //       this.$player.rot[z],
        //     ]
        //   })
        //   this.$player.rot[y] = newRot
        // }
      }
      
      this.animate_ticketer()
    },
    $listen_scrollPosition(e)
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




      // // currentScene++
      // // ROTATION UP
      // if (t < -this.sceneBreakpoints.default[0]) {
      //   this.camera.rotation.x = this.sceneVariables.camera.rot[x] - (-this.sceneBreakpoints.default[0]* 0.0003) - (-t * 0.0003);
      //   // EXCEPT SCENE 2
      // } else {
      //   // ONLY SCENE 2
      //   this.camera.rotation.x = this.sceneVariables.camera.rot[x] ;
      // }
    },
  }
}
              // if (Math.abs(currentRotY) == Math.PI/4) // north west
              // {
              //   newPosX = -4
              //   newPosZ = -4
              // }
            //   if (Math.abs(currentRotY) == Math.PI/4*3) // south west
            //   {
            //     newPosX = -4
            //     newPosZ = 4
            //   }
            //   if (Math.abs(currentRotY) == Math.PI) // south
            //   {
            //     newPosZ = 4
            //     // newPosZ = -4
            //   }
            // } else {
            //   if (Math.abs(currentRotY) == Math.PI/4) // north east
            //   {
            //     newPosX = 4
            //     newPosZ = -4
            //   }
            //   if (Math.abs(currentRotY) == Math.PI/4*3) // south east
            //   {
            //     newPosX = 4
            //     newPosZ = 4
            //   }
            //   // if (Math.abs(currentRotY) == Math.PI/4*3) 
            //   // {
            //   //   newPosX = 4
            //   //   newPosZ = 4

            //   // }
            //   if (Math.abs(currentRotY) == Math.PI/2) // east
            //   {
            //     newPosX = 4
            //     // newPosZ = -4
            //   }
            //   // if (Math.abs(currentRotY) == 0)
            //   // {
            //   //   console.log("Math.abs(currentRotY")
            //   //   newPosZ = 4
            //   // }
            //   if (Math.abs(currentRotY) == -Math.PI) // extra north
            //   {
            //     // newPosX = 4
            //     newPosZ = -4
            //   }