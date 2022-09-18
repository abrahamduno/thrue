import * as THREE from "three";
import { OBJLoader } from "../loaders/OBJLoader.js";

const BASE_URL = "http://localhost:3000/";
// const BASE_ASSET_URL = "./dist/res"
const BASE_ASSET_URL = "./res";
export default {


data () {
  return {

  }
},
methods: {

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
    // async connectWalletOrb()
    // {
    //   // this.loading = true
    //   await this.$store.dispatch("connectWallet")
    //   // this.rocketMesh.visible = false
    //   // this.addSignOrb()
    // },
    addLevelOne(  ) {

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
          // object.traverse(function (child) {
          //   if (child.isMesh) {
          //     child.castshadow = true
          //     child.receiveshadow = true
          //     child.material = new THREE.MeshStandardMaterial({
          //       color: 0xffffff,
          //       // wireframe: true,
          //       // castshadow: 3,
          //       // receiveShadow: 3,
          //       // linewidth: 3,
          //     });
          //   }
          // });
          object.position.set(0, -50, 0);
          // object.scale.set(15, 15, 15);
          // object.scale.set(3, 3, 3);
          this.mylevelone = object

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


          this.scene.add(this.mylevelone);
        },
        this.onLoadProgress
      );


      },
}


}