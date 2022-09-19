import * as THREE from "three";
import { OBJLoader } from "../../res/loaders/OBJLoader.js";

const BASE_URL = "http://localhost:3000/";
const BASE_ASSET_URL = "./res";

export default {
  data ()
  {
    return {

    }
  },
  methods:
  {

    checkLevelOneClickers()
    {
      if(this.INTERSECTED && this.mysign && this.INTERSECTED == this.mysign.children[0])
      {
        this.checkLevelOne()
        // alert("scroll down")
        // console.log(intersects.length,intersects)
      }

      if(this.ticketer && this.INTERSECTED && this.INTERSECTED == this.ticketer.children[0])
      {
        // alert("scroll down")
        this.clickTicketer()
        this.goals.tickets++
        // console.log(intersects.length,intersects)
      }
    },
    checkLevelOne(  ) {
      if (this.goals.tickets < 1)
      {
        return alert("Failed")
      }
      alert("You Win!")
    },
    initLevelOne(  ) {
      this.goals = {
        tickets: 0,
      }
    },
    animate_levelone(  ) {
      if (this.accs_length)
      {
            // this.myobject.position.z = this.lerp(this.myobject.position.z,-50,0.02)
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
      },
        this.onLoadProgress
      );
    },
    addLevelMesh()
    {
      {
        const boxGeometry = new THREE.BoxGeometry(0.5, 0.05, 60);
        const boxMaterial = new THREE.MeshStandardMaterial( { wireframe: false,color: 0xaaaaaa } );
        let boxx =  new THREE.Mesh( boxGeometry, boxMaterial );
        boxx.castShadow = true; //default is false
        boxx.receiveShadow = true; //default
        boxx.position.set(0,0,-20)
        this.mylevelone.add( boxx );
      }

      {
        const boxGeometry = new THREE.BoxGeometry(0.5, 0.05, 60);
        const boxMaterial = new THREE.MeshStandardMaterial( { wireframe: false,color: 0xaaaaaa } );
        let boxx =  new THREE.Mesh( boxGeometry, boxMaterial );
        boxx.castShadow = true; //default is false
        boxx.receiveShadow = true; //default
        boxx.position.set(4,0,-20)
        this.mylevelone.add( boxx );
      }

      {
        const boxGeometry = new THREE.BoxGeometry(0.5, 0.05, 60);
        const boxMaterial = new THREE.MeshStandardMaterial( { wireframe: false,color: 0xaaaaaa } );
        let boxx =  new THREE.Mesh( boxGeometry, boxMaterial );
        boxx.castShadow = true; //default is false
        boxx.receiveShadow = true; //default
        boxx.position.set(-4,0,-20)
        this.mylevelone.add( boxx );
      }
    },
  }
}