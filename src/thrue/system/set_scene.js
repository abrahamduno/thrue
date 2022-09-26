import * as THREE from "three";

export default {
  methods:
  {
    setSceneAndCamera()
    {
      this.refreshRate = !window.chrome ? 1 : 3
      this.scene = new THREE.Scene();

      this.sceneVariables.camera.fov = this.sceneVariables.camera.fovSettings[this.DOM.screenType];
      let camera = new THREE.PerspectiveCamera(
        this.sceneVariables.camera.fov,
        this.DOM.ratio,
        this.sceneVariables.camera.minReach,
        this.sceneVariables.camera.maxReach
      );
      this.camera = camera;
      this.camera.position.set(...this.sceneVariables.camera.pos);
      this.camera.rotation.set(...this.sceneVariables.camera.rot);
    },
    setCameraRenderSize()
    {
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix(window.devicePixelRatio);
    },
    setRenderer()
    {
      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        canvas: this.$refs.canvas,
        // canvas: canvasElement,
      });

      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMapSoft = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
      this.setCameraRenderSize() // set_scene_function
    },
    setWindowRatio()
    {
      this.DOM.ratio = window.innerWidth / window.innerHeight;
      this.DOM.screenType = this.DOM.ratio > 1 ? "desktop" : "mobile";
      this.sceneBreakpoints.default = this.sceneBreakpoints[this.DOM.screenType];
    },
    setDOMHeight()
    {
      this.DOM.height = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
    },
  }
}