import * as THREE from "three";
import { OBJLoader } from "../../scripts/loaders/OBJLoader.js";

const BASE_ASSET_URL = "./res";

export default {
  methods: {
    add_bubbleHead()
    {
      new OBJLoader().setPath(BASE_ASSET_URL + "/models/").load(
        "sign.obj",
        (object) => {
          object.traverse( function ( child ) {
             if ( child instanceof THREE.Mesh ) {
                child.material = new THREE.MeshStandardMaterial( { color: 0xaaaaaa, } );
                child.castShadow = true;
                child.receiveShadow = true;
            }
         } );
          object.position.set(0, 0.1, 6.4);
          object.rotation.set(1.6,0,0);
          this.mysign = object
          this.scene.add(this.mysign);
        },
        this.onLoadProgress
      );

      new OBJLoader().setPath(BASE_ASSET_URL + "/models/").load(
        "test.obj",
        (object) => {
          object.traverse( function ( child ) {
             if ( child instanceof THREE.Mesh ) {
              child.material = new THREE.MeshStandardMaterial( { color: 0xaaaaaa, } );
              child.castShadow = true;
              child.receiveShadow = true;
            }
         } );
          object.position.set(0, -1, 6);
          this.myobject = object
          this.scene.add(this.myobject);
        },
        this.onLoadProgress
      );
    }
  }
}