import * as THREE from "three";
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

export default {
  methods:
  {
    $set_bloomRenderer()
    {
      // this.renderer.toneMapping = THREE.ReinhardToneMapping;
      this.renderer.setClearColor(0xff0000, 0);
      let params = {}
      if (this.dark_mode)
      {
        params = {
          exposure: 0.05, bloomStrength: 0.22, bloomThreshold: 0, bloomRadius: 0
        };
      } else {
        params = {
          exposure: 0.02, bloomStrength: 0.08, bloomThreshold: 0, bloomRadius: 0
        };
      }

      let bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
      bloomPass.threshold = params.bloomThreshold;
      bloomPass.strength = params.bloomStrength;
      bloomPass.radius = params.bloomRadius;

      const renderScene = new RenderPass( this.scene, this.camera );
      this.composer = new EffectComposer( this.renderer );
      this.composer.addPass( renderScene );
      this.composer.addPass( bloomPass );
    },
  }
}