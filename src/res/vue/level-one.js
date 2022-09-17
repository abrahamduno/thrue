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

      // const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
      // const boxMaterial = new THREE.MeshStandardMaterial( { wireframe: false,color: 0xFFA859 } );
      // this.levelOne = new THREE.Mesh( boxGeometry, boxMaterial );
      // this.levelOne.castShadow = true; //default is false
      // this.levelOne.receiveShadow = true; //default
      // this.levelOne.position.x = -4
      // this.levelOne.position.y = 0
      // this.levelOne.position.z = 5
      // this.scene.add( this.levelOne );


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
          this.scene.add(this.mylevelone);
        },
        this.onLoadProgress
      );


      },
}


}