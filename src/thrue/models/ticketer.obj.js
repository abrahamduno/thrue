import * as THREE from "three";
import { OBJLoader } from "../../scripts/loaders/OBJLoader.js";

const BASE_URL = "http://localhost:3000/";
const BASE_ASSET_URL = "./res";

export default {
  methods:
  {
    animate_ticketer() {
      if (this.accs_length)
      {
        if (this.ticketer && this.valuesBlock  && this.valuesBlock.prize_pool)
        {
          this.ticketer.position.y = this._$lerp(this.ticketer.position.y,-2,0.1)
        }
      }
    },
    clickTicketer() {
      let input = prompt("Amount",1)

      if (this.$parent.$refs.dom && this.$parent.$refs.dom.$refs.lotto && input) 
      {
        this.$parent.$refs.dom.$refs.lotto.$refs.currentTicket.forms.form_buyTicketAmount = input
        this.$parent.$refs.dom.$refs.lotto.$refs.currentTicket.execute_buyTicket()

      }
    },
    addTicketer()
    {
      new OBJLoader().setPath(BASE_ASSET_URL + "/models/").load(
        "ticketer.obj",
        (object) => {
          object.traverse( this.baseStandardMaterial(0xaaaaaa) );
          object.position.set(0, 50, 0);
          this.ticketer = object
          this.scene.add(this.ticketer);
      }, this.onLoadProgress );
    },
  }
}