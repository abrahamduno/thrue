import * as THREE from "three";
const x = 0, y = 1, z = 2

export default {
  methods:
  {

    __clickedGhost(_npcName)
    {
      console.log(this.NPCClickCounter[_npcName])
      alert("you've found "+_npcName)
    },
    __staticNPCClickFunction (_npcName)
    {
      // console.log(_npcName)
      if ( this.INTERSECTED ) this.INTERSECTED.material.emissive.setHex( 0x000000 );
      // console.log(_npcName,this.INTERSECTED)

      this.p_$localQactions = []
      this.p_$localQ = null
    },
    __defaultNPCClickFunction (_npcName)
    {
      // alert("You've Clicked "+`${_npcName}`)
      // console.log(`${_npcName} (${this.NPCClickCounter[_npcName]})`)
      // console.log(`${_npcName} (${this.NPCClickCounter[_npcName]})`)
      // console.log(this.p_$localQ,_npcName)
      if (this.p_$localQ != null)
      {
        if (_npcName == this.p_$localQ.npcRef)
        {
          // this.p_$localQactions = []
          // this.p_$localQ = null
          // this.$store.dispatch("clearPreQ",{
          //     id:this.selectedPlayer,
          //   },
          // )
        } else {
          this.p_$localQactions = []
          this.p_$localQ = null
        }
      } else {
        console.log("clicked", this.NPCClickCounter[_npcName], this.NPCBaseContainer[_npcName].npcStat)
        if (this.NPCClickCounter[_npcName] == 1 && this.NPCBaseContainer[_npcName].npcStat)
        {
          {
            let theStat = this.NPCBaseContainer[_npcName].npcStat

              // if (this.p_$localQ)
              {
                this.p_$localQ = {
                  id:this.selectedPlayer,
                  stat: theStat,
                  npcRef:_npcName,
                }
                this.p_$localQactions = this.p_$availableActions(_npcName)

                // this.$store.dispatch("addToPlayerPreQ",{
                //     preQ: {
                //       id:this.selectedPlayer,
                //       stat: theStat,
                //       npcRef:_npcName,
                //     },
                //     preQaction: "yes",
                //     preQactions: this.p_$availableActions(_npcName),
                //   },
                // )

                // this.$store.dispatch("addToPlayerY",{
                //     id:this.selectedPlayer,
                //     t: 0,
                //     preQ: {
                //       id:this.selectedPlayer,
                //       stat: theStat,
                //       npcRef:_npcName,
                //     },
                //     preQaction: "yes",
                //     y: this.p_$availableActions(_npcName),
                //   },
                // )
                
                // console.log(this.p_$localQ)
              }
              this.NPCContainer[_npcName].rotation.y = 0.5

          }
          
        }
      }
      this.NPCClickCounter[_npcName]--

      // this.NPCContainer[_npcName].position.y = 50;
      // this.NPCContainer[_npcName].visible = false
    },


    
    l_$checkGoals()
    {
      // let input = prompt("Amount",1)
      // let input = prompt("Amount",1)
      console.log("this.enable_help",this.enable_help)

      if (!this.goals)
      {
        alert("please wait for game to load")
        return
        // this.__YOU_LOSE()
      }
      // ... (next scene) | implement go to town ? 
      this.__YOU_WIN()
    },
    __YOU_WIN()
    {
      alert("Hello World!")
    },
    __YOU_LOSE()
    {
      alert("Failed")
    },



    clickedLevelHelp()
    {
      // this.enable_help++
      this.show_help = false
      // alert("clickHelp: "+this.enable_help)
    },
    _$click_currentLevel()
    {
      // this.checkNavigationClick()
      // this.__orbitcontrols.update();

      this.$click_startLevelBlob()

      // INTERSECTED = MOUSE POINTER HOVERING OVER OBJECT from raycaster
      if(this.INTERSECTED && this.mysign && this.INTERSECTED == this.mysign.children[0])
      {
        this.clickedBubbleHeadHead()
      }
      

      if(this.myfarm && this.INTERSECTED && this.INTERSECTED == this.myfarm.children[0])
      {
        this.goals.hay++
        this.clickFarm()
      }

            // if ( this.INTERSECTED ) this.INTERSECTED.material.emissive.setHex( 0x000000 );

    },

    clickedBubbleHeadHead(  ) {
      alert("Click Green to Start")
      return
      console.log("clickk")
      if (!this.mycurrentlevel)
      {
        this.$click_startLevelBlob()
      }
      this.l_$checkGoals() // base-level js
      // alert("test")
    },
    _$animate_main()
    {
      this.__orbitcontrols.update()
      // let ms = Date.now();
      

      // if ()
      const nowT = parseInt(Date.now()/1000)
      this.UNIX = nowT
      // console.log(nowT)
      if (this.__player && this.__player.q.length)
      {

        let theNpc = this.__player.q[0].npcRef
        if (this.NPCBaseContainer[theNpc].playerpos &&
            (this.NPCBaseContainer[theNpc].playerpos[0] != this.__player.pos[0]
            || this.NPCBaseContainer[theNpc].playerpos[2] != this.__player.pos[2]))
        {
          // console.log(this.NPCBaseContainer[theNpc])
          if (this.NPCBaseContainer[theNpc].playerpos)
          {
            this.$store.dispatch("setPlayerPosition",{
              id:this.selectedPlayer,
              pos:[
                this.NPCBaseContainer[theNpc].playerpos[0],
                this.__player.pos[1],
                this.NPCBaseContainer[theNpc].playerpos[2]
              ]
            })
          }
        }
        if (this.NPCBaseContainer[theNpc].playerrot && this.NPCBaseContainer[theNpc].playerrot[1])
        {
          // console.log(this.NPCBaseContainer[theNpc])
          if (this.NPCBaseContainer[theNpc].playerrot)
          {
            this.$store.dispatch("setPlayerRotation",{
              id:this.selectedPlayer,
              pos:[
                this.__player.pos[0],
                this.NPCBaseContainer[theNpc].playerrot[1],
                this.__player.pos[2],
              ]
            })
          }
        }
        //   if (this.NPCBaseContainer[theNpc].playerrot)
        //   {
        //     this.$store.dispatch("setPlayerRotation",{
        //       id:this.selectedPlayer,
        //       rot:[ 
        //         this.__player.rot[0],
        //         this.NPCBaseContainer[theNpc].playerrot[1],
        //         this.__player.rot[2],
        //       ]
        //     })
        //   }
        // }
        if (nowT > this.__player.q[0].t+this.__player.q[0].d)
        {
          // alert("action finished")
          let theStat = this.__player.q[0].stat
          // let theNpc = this.__player.q[0].npcRef

          if (theStat == "energy")
          {
            this.$store.dispatch("fillPlayerGoals", {
              id: "0",
            })
          }

          // console.log(this.__player.q[0])


          let newValue = parseFloat(this.__player.stats[theStat])+this.__player.q[0].value
          if (newValue <= 255)
          {
            this.$store.dispatch("setPlayerStats",{
              id:this.selectedPlayer,
              stats:{
                [theStat]: parseFloat(this.__player.stats[theStat])+this.__player.q[0].value,
              },
            })
          } else {

            if (newValue > 255)
            {
              this.$store.dispatch("setPlayerStats",{
                id:this.selectedPlayer,
                stats:{
                  [theStat]: 255,
                },
              })
            } 
            
            alert("You are sinnin "+theStat)
          }
          this.$store.dispatch("clearFirstInQ",{
            id:this.selectedPlayer,
          })
        }
      }
      // console.log(ms);

      this.$animate_startLevelBlob()

      // TRANSITION TO LEVEL ! WHEN CONNECTED
      if (this.accs_length || this.is_playing_test)
      {
        // this.sunlight.position.z = this.__scroll * 0.01 +15
        // this.sunlighTarget.position.z = this.__scroll * 0.01 -15
        this.sunlight.position.z = this.__player.pos[2] +15
        this.sunlighTarget.position.z = this.__player.pos[2] -15
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
      if (this.amlight)
      {
        if (!this.pause_mode)
        {
          this.amlight.intensity = this._$lerp(this.amlight.intensity,this._sunintensity*0.7,0.03)
          this.roomlight.intensity = this._$lerp(this.roomlight.intensity,0.42,0.03)
        } else {
          this.amlight.intensity = this._$lerp(this.amlight.intensity,this._sunintensity,0.03)
          this.roomlight.intensity = this._$lerp(this.roomlight.intensity,0,0.03)
        }
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

          if (this.__orbitcontrols && this.NPCBaseContainer[theNpc].playerpos)
          {

            this.__orbitcontrols.target.set(
              this._$lerp(this.__orbitcontrols.target.x,this.NPCBaseContainer[theNpc].playerpos[0],0.1),
              this._$lerp(this.__orbitcontrols.target.y,this.NPCBaseContainer[theNpc].playerpos[1]+1.5,0.1),
              this._$lerp(this.__orbitcontrols.target.z,this.NPCBaseContainer[theNpc].playerpos[2],0.1))
          }
        }
      }
      if (this.animate_ticketer)
      {
        this.animate_ticketer()
      }
    },
    l_$listen_scrollPosition(e)
    {
      this.__scroll = window.scrollY;

      const t = document.body.getBoundingClientRect().top;
      this.__scroll = t
      // console.log(this.__scroll)
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
    //     id:this.selectedPlayer,
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
    //     id:this.selectedPlayer,
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
    //     //       id:this.selectedPlayer,
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
    //           id:this.selectedPlayer,
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
    //           id:this.selectedPlayer,
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