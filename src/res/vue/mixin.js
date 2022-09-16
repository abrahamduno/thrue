export default {
created: function () {
    this.hello()
},
methods: {
    hello: function () {
    console.log('hello from mixin!')
    },

    updateScrollPosition(e) {
        this.scrollPosition = window.scrollY;
  
  
        // console.log("update scene args",scene)
        // console.log("update scene",this.scene)
        // const this.scene = this.scene == undefined ? scene : this.scene
        // console.log("update scene")
        // if (!this.scene) this.scene = this.scene
        const t = document.body.getBoundingClientRect().top;
        if (this.DEBUG) { console.log(t) }
  
        if (t < -this.sceneBreakpoints.default[4]) {
          this.camera.rotation.set(...this.sceneVariables.camera.rot)
  
          this.camera.position.z = -this.sceneVariables.camera.pos[2] + 45;
          this.camera.position.y = this.sceneVariables.camera.pos[1] + 1;
        } else {
          this.camera.position.z = this.sceneVariables.camera.pos[2] + t * -0.01;
  
          // ROTATE UP | SCREEN 1
          if (t < -this.sceneBreakpoints.default[0]) {
            this.camera.rotation.x = this.sceneVariables.camera.rot[0];
          } else {
            this.camera.rotation.x =
              this.sceneVariables.camera.rot[0] -
              (t + this.sceneBreakpoints.default[0]) * 0.00005;
          }
  
          // ELEVATE UP | SCREEN 2
          if (t < -this.sceneBreakpoints.default[0]) {
            if (t > -this.sceneBreakpoints.default[2]) {
              this.camera.position.y =
                this.sceneVariables.camera.pos[1] -
                (t + this.sceneBreakpoints.default[0]) * 0.0065;
            } else {
              this.camera.position.y =
                this.sceneVariables.camera.pos[1] -
                (-this.sceneBreakpoints.default[2] +
                  this.sceneBreakpoints.default[0]) *
                  0.0065;
            }
          } else {
            this.camera.position.y = this.sceneVariables.camera.pos[1];
          }
  
          if (t < -this.sceneBreakpoints.default[1]) {
            this.camera.position.x =
              -this.sceneVariables.camera.pos[0] -
              (t + this.sceneBreakpoints.default[1]) * 0.03;
          } else {
            this.camera.position.x = -this.sceneVariables.camera.pos[0];
          }
  
          if (t < -this.sceneBreakpoints.default[2]) {
            this.camera.position.x =
              -this.sceneVariables.camera.pos[0] -
              (t + this.sceneBreakpoints.default[2]) * 0.25 -
              (t + this.sceneBreakpoints.default[1]) * 0.03;
            if (t > -this.sceneBreakpoints.default[3]) {
              this.camera.rotation.y =
                this.sceneVariables.camera.rot[1] +
                (t + this.sceneBreakpoints.default[2]) * 0.0002;
            } else {
              this.camera.rotation.y =
                this.sceneVariables.camera.rot[1] +
                (-this.sceneBreakpoints.default[3] +
                  this.sceneBreakpoints.default[2]) *
                  0.0002;
            }
          } else {
            // this.camera.position.x = -this.sceneVariables.camera.pos[0]
            this.camera.rotation.y = this.sceneVariables.camera.rot[1];
          }
        }
      },
}
}