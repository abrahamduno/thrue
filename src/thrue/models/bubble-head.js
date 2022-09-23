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
          object.position.set(0, 0.05, 6.45);
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
      return

      {
        const radius = 2;
        const geometry = new THREE.BoxGeometry(0.85,0.45,0.02);
        const material = new THREE.MeshStandardMaterial( { color: 0xaaaaaa, } );
        const mesh = new THREE.Mesh( geometry, material ) ;
        mesh.position.set(0, -0.85, 6.5);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        this.scene.add(mesh);
      }
      {
        const orbGeometry = new THREE.SphereGeometry(0.5, 6,6 );
        const orbMaterial = new THREE.MeshStandardMaterial( { wireframe:false,flatShading: true,color: 0xaaaaaa } );
        let connectOrb = new THREE.Mesh( orbGeometry, orbMaterial );
        connectOrb.castShadow = true; //default is false
        connectOrb.receiveShadow = true; //default
        connectOrb.position.set(0,-0.1,6.1)
        connectOrb.scale.set(0.65,0.69,1)
        this.scene.add( connectOrb );
      }
      {
        const x = 0, y = 0;


        var coordinatesList = [
          new THREE.Vector3(-0.5, 0, 0),
          new THREE.Vector3(-0.5, 0.4, 0),
          new THREE.Vector3(-0.6, 0.4, 0),
          new THREE.Vector3(-0.6, 0.45, 0),
          new THREE.Vector3(0, 0.8, 0), // top
          new THREE.Vector3(0.6, 0.45, 0),
          new THREE.Vector3(0.6, 0.4, 0),
          new THREE.Vector3(0.5, 0.4, 0),
          new THREE.Vector3(0.5, 0, 0),
        ];
        const heartShape = new THREE.Shape(coordinatesList);
        const extrudeSettings = {
          // steps: 2,
          depth: 2,
          bevelEnabled: false,
          // bevelThickness: 1,
          // bevelSize: 1,
          // bevelOffset: 0,
          // bevelSegments: 1
        };
        const geometry = new THREE.ExtrudeBufferGeometry(heartShape, extrudeSettings);
        const material = new THREE.MeshStandardMaterial( { wireframe:false,color: 0xaaaaaa, } );
        const mesh = new THREE.Mesh( geometry, material ) ;
        mesh.position.set(0, -1.1, 4.5);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        this.scene.add(mesh);
      }
    }
  }
}