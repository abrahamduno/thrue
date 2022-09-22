import * as THREE from "three";
import { OBJLoader } from "../../scripts/loaders/OBJLoader.js";

import npcContainer from "../scripts/npc-container.js";

import ticketer from "../models/ticketer.obj.js";
import farm from "../models/farm.obj.js";
import staticBox from "../models/static-box.js";

const BASE_URL = "http://localhost:3000/";
const BASE_ASSET_URL = "./res";

export default {
  mixins: [
    npcContainer,

    staticBox,
    ticketer,
    farm,
  ],
  methods:
  {
    initLevelOne(  ) {
      this.goals = {
        tickets: 0,
        eggs: 0,
      }
    },
    animate_levelone(  ) {
      if (this.accs_length)
      {
        if (this.mylevelone)
        {
          this.mylevelone.position.y = this.lerp(this.mylevelone.position.y,-2,0.1)
        }
      }
    },
    addLevelOne(  ) {
      this.initLevelOne()

      new OBJLoader().setPath(BASE_ASSET_URL + "/models/").load(
        "levelone.obj",
        (object) => {
          object.traverse( function ( child ) {
            if ( child instanceof THREE.Mesh ) {
              child.material = new THREE.MeshStandardMaterial( { color: 0xaaaaaa } );
              child.castShadow = true;
              child.receiveShadow = true;
            }
         } );

        object.castshadow = true
        object.receiveShadow = true
        object.position.set(0, -50, 0);
        this.mylevelone = object
        this.scene.add(this.mylevelone);

        this.addLevelMesh()
      }, this.onLoadProgress );
    },
    checkClick_levelOne()
    {
      if(this.ticketer && this.INTERSECTED && this.INTERSECTED == this.ticketer.children[0])
      {
        this.goals.tickets++
        this.clickTicketer()
      }

      if(this.myfarm && this.INTERSECTED && this.INTERSECTED == this.myfarm.children[0])
      {
        this.goals.eggs++
        this.clickFarm()
      }
    },
    addLevelMesh()
    {
      this.addStaticBox();
      this.addFarm();

      this.initNpcs()
      this.addNpc({pos: [0,-2,-40], BoxGeometry: [0.5,0.5,0.5], color: 0xaaaaaa});

      // center
      {
        const boxGeometry = new THREE.BoxGeometry(1.6, 0.05, 33);
        const boxMaterial = new THREE.MeshStandardMaterial( { wireframe: false,color: 0xaaaaaa } );
        let boxx =  new THREE.Mesh( boxGeometry, boxMaterial );
        boxx.castShadow = true; //default is false
        boxx.receiveShadow = true; //default
        boxx.position.set(0,-0.05,-8)
        this.mylevelone.add( boxx );
      }

      // right
      {
        const boxGeometry = new THREE.BoxGeometry(0.69, 0.05, 33);
        const boxMaterial = new THREE.MeshStandardMaterial( { wireframe: false,color: 0xaaaaaa } );
        let boxx =  new THREE.Mesh( boxGeometry, boxMaterial );
        boxx.castShadow = true; //default is false
        boxx.receiveShadow = true; //default
        boxx.position.set(4.2,-0.05,-8)
        this.mylevelone.add( boxx );
      }

      // left
      {
        const boxGeometry = new THREE.BoxGeometry(0.69, 0.05, 42);
        const boxMaterial = new THREE.MeshStandardMaterial( { wireframe: false,color: 0xaaaaaa } );
        let boxx =  new THREE.Mesh( boxGeometry, boxMaterial );
        boxx.castShadow = true; //default is false
        boxx.receiveShadow = true; //default
        boxx.position.set(-4.2,-0.05,-12.5)
        this.mylevelone.add( boxx );
      }
    },
  }
}