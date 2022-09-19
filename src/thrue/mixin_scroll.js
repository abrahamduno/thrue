const X = 0, Y = 1, Z = 2
export default {
created: function () {
},
methods: {

    updateScrollPosition(e) {
        this.scrollPosition = window.scrollY;
  
        const t = document.body.getBoundingClientRect().top;
        if (this.DEBUG) { console.log(t) }

        if (t < -this.sceneBreakpoints.default[0]) {
          // EXCEPT SCENE 1
          this.camera.position.z = this.sceneVariables.camera.pos[Z] + -this.sceneBreakpoints.default[0] * 0.015;
        } else {
          // ONLY SCENE 1
          this.camera.position.z = this.sceneVariables.camera.pos[Z] + t * 0.015;
        }
        
  
        if (t < -this.sceneBreakpoints.default[4]) {
        } else {
  
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
          } else {
          }
        }
      },
}
}