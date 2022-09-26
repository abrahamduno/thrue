import * as THREE from "three";
const x = 0, y = 1, z = 2

export default {
  methods:
  {
    _$animate_main()
    {
      this.$animate_startLevelBlob()

      // TRANSITION TO LEVEL ! WHEN CONNECTED
      if (this.accs_length || this.is_playing_test)
      {
        this.sunlight.position.z = this.__scroll * 0.01 -3
        this.sunlighTarget.position.z = this.__scroll * 0.01 
        this.sunlight.target  = this.sunlighTarget

        this.myobject.position.z = this._$lerp(this.myobject.position.z,-20,0.07)
        this.myobject.position.y = this._$lerp(this.myobject.position.y,this.MIN.y,0.07)
        // this.myobject.rotation.y = this._$lerp(this.myobject.rotation.y,Math.PI/12,0.07)
        if (this.mysign)
        {
          this.mysign.position.z = this._$lerp(this.mysign.position.z,-19.6,0.07)
          this.mysign.position.y = this._$lerp(this.mysign.position.y,this.MIN.y+1.1,0.07)
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

        // PLAYER CAMERA
      if (this.camera && this.pro_mode &&
        (this.__pointer.x < -0.2 || this.__pointer.x > 0.2)
        )
      {
        this.camera.rotation.y =
          this._$lerp(this.camera.rotation.y,-this.__pointer.x*(Math.PI*0.6)+(this.__pointer.x < -0.2 ? -0.2 : +0.2),0.07)
      } else {
        this.camera.rotation.y = this._$lerp(this.camera.rotation.y,0,0.07)
      }
      
      this.animate_ticketer()
    },
    $listen_scrollPosition(e)
    {
      this.__scroll = window.scrollY;

      const t = document.body.getBoundingClientRect().top;
      this.__scroll = t
      // this.__scroll = window.scrollY;
      if (this.DEBUG) { console.log(t) }
      let currentScene = 1
      // currentScene = 
      // FLY THRU CITY
      if (t < -this.sceneBreakpoints.default[currentScene]) {
        // EXCEPT SCENE 1
        this.camera.position.z = this.sceneVariables.camera.pos[z] + -this.sceneBreakpoints.default[currentScene] * 0.015;
      } else {
        // ONLY SCENE 1
        // this.camera.position.y = -this.sceneVariables.camera.pos[y] + t * 0.001;
        this.camera.position.z = this.sceneVariables.camera.pos[z] + t * 0.015;
      }

      // // currentScene++
      // // ROTATION UP
      // if (t < -this.sceneBreakpoints.default[0]) {
      //   this.camera.rotation.x = this.sceneVariables.camera.rot[x] + (-this.sceneBreakpoints.default[0]* 0.0003) - (-t * 0.0003);
      //   // EXCEPT SCENE 2
      // } else {
      //   // ONLY SCENE 2
      //   this.camera.rotation.x = this.sceneVariables.camera.rot[x] ;
      // }
    },
  }
}