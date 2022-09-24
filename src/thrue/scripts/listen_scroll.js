import * as THREE from "three";
const x = 0, y = 1, z = 2

export default {
  methods:
  {
    updateScrollPosition(e)
    {
      this.scrollPosition = window.scrollY;

      const t = document.body.getBoundingClientRect().top;
      this.scrollPosition = t
      // this.scrollPosition = window.scrollY;
      if (this.DEBUG) { console.log(t) }
      let currentScene = 1
      // currentScene = 
      // FLY THRU CITY
      if (t < -this.sceneBreakpoints.default[currentScene]) {
        // EXCEPT SCENE 1
        this.camera.position.z = this.sceneVariables.camera.pos[z] + -this.sceneBreakpoints.default[currentScene] * 0.015;
      } else {
        // ONLY SCENE 1
        this.camera.position.z = this.sceneVariables.camera.pos[z] + t * 0.015;
      }

      // currentScene++
      // ROTATION UP
      if (t < -this.sceneBreakpoints.default[0]) {
        this.camera.rotation.x = this.sceneVariables.camera.rot[x] - (-this.sceneBreakpoints.default[0]* 0.0003) - (-t * 0.0003);
        // EXCEPT SCENE 2
      } else {
        // ONLY SCENE 2
        this.camera.rotation.x = this.sceneVariables.camera.rot[x] ;
      }
    },
  }
}