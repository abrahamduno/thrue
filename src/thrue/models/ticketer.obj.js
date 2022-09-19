import * as THREE from "three";
import { OBJLoader } from "../../res/loaders/OBJLoader.js";

const BASE_URL = "http://localhost:3000/";
// const BASE_ASSET_URL = "./dist/res"
const BASE_ASSET_URL = "./res";
export default {


data () {
  return {

  }
},
computed: {
            valuesBlock()             { return this.$store.getters.getBlock("values") },
},
methods: {

    animate_ticketer(  ) {
      if (this.accs_length)
      {
            // this.myobject.position.z = this.lerp(this.myobject.position.z,-50,0.02)
        if (this.ticketer && this.valuesBlock  && this.valuesBlock.prize_pool)
        {
              this.ticketer.position.y = this.lerp(this.ticketer.position.y,-2,0.1)
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
    clickTicketer(  ) {
      // alert()
      let input = prompt("Amount",1)

      // window.scrollTo(0,document.body.scrollHeight*0.9);
      if (this.$parent.$refs.thrue && this.$parent.$refs.thrue.$refs.lotto && input) 
      {
        this.$parent.$refs.thrue.$refs.lotto.$refs.currentTicket.forms.form_buyTicketAmount = input
        
        // currentTicket
        this.$parent.$refs.thrue.$refs.lotto.$refs.currentTicket.execute_buyTicket()

      }
    },
    addTicketer(  ) {

      // const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
      // const boxMaterial = new THREE.MeshStandardMaterial( { wireframe: false,color: 0xFFA859 } );
      // this.levelOne = new THREE.Mesh( boxGeometry, boxMaterial );
      // this.levelOne.castShadow = true; //default is false
      // this.levelOne.receiveShadow = true; //default
      // this.levelOne.position.x = -4
      // this.levelOne.position.y = 0
      // this.levelOne.position.z = 5
      // this.scene.add( this.levelOne );
      console.log("ticketer")


      new OBJLoader().setPath(BASE_ASSET_URL + "/models/").load(
        "ticketer.obj",
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
          object.position.set(0, 50, 0);
          // object.scale.set(15, 15, 15);
          // object.scale.set(3, 3, 3);
          this.ticketer = object
          this.scene.add(this.ticketer);
        },
        this.onLoadProgress
      );


      },
}


}