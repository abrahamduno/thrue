import * as THREE from "three";
import { OBJLoader } from "../../scripts/loaders/OBJLoader.js";

const BASE_URL = "http://localhost:3000/";
const BASE_ASSET_URL = "./res";

export default {
  methods:
  {
    clickFarm() {
      // let input = prompt("Amount",1)

      alert("hay: "+this.goals.hay)

      if (this.is_playing_test) return

      // save game
      // if (this.$parent.$refs.dom && this.$parent.$refs.dom.$refs.lotto) 
      {
        // this.$parent.$refs.dom.$refs.lotto.$refs.currentTicket.forms.form_buyTicketAmount = input
        // this.$parent.$refs.dom.$refs.lotto.$refs.currentTicket.execute_buyTicket()
        // this.goals.hay++
        // alert("hay: "+this.goals.hay)
      }
    },
    addFarm(  ) {
      new OBJLoader().setPath(BASE_ASSET_URL + "/models/").load(
        "farm.obj",
        (object2) => {
          object2.traverse( function ( child2 ) {
            // console.log(object2,child2)
            if ( child2 instanceof THREE.Mesh ) {
              child2.material = new THREE.MeshStandardMaterial( { color: 0xaaaaaa } );
              child2.castShadow = true;
              child2.receiveShadow = true;
            }
            // if ( child2.children[0] instanceof THREE.Mesh ) {
            //   child2.children[0] = new THREE.MeshStandardMaterial( { color: 0xaaaaaa } );
            // }
         } );
        object2.rotation.set(0, -0.8, 0);
        object2.position.set(6, -2, -30);
        this.myfarm = object2
        this.scene.add(this.myfarm);
      }, this.onLoadProgress );
    },
  }
}