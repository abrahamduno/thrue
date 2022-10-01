import * as THREE from "three";
import { OBJLoader } from "../../../../scripts/loaders/OBJLoader.js";

const BASE_ASSET_URL = "./res";

export default {
  methods: {
    add_personBubbleHead()
    {
      this.mysign_base = {
        pos: [0, 0.05, 6],
        rot: [1.6,0,0],
      }
      this.LIVE_OFFSET.mysign = {
        pos:[],
        x:15,
        y:2.15,
        z:-40,
      }
      this.myobject_base = {
        pos: [0, -2.1, 6],
        rot: [0,0,0],
      }
      this.LIVE_OFFSET.myobject = {
        x:15,
        y:0.05,
        z:-40,
      }
      new OBJLoader().setPath(BASE_ASSET_URL + "/models/").load(
        "sign3.obj",
        (object) => {
          object.traverse( this.baseStandardMaterial() );
          object.position.set(...this.mysign_base.pos);
          object.rotation.set(...this.mysign_base.rot);
          this.mysign = object
          this.mysign.name = "personhead"
          this.scene.add(this.mysign);
        },
        this.onLoadProgress
      );
      new OBJLoader().setPath(BASE_ASSET_URL + "/models/").load(
        "test3.obj",
        (object) => {
          object.traverse( this.baseStandardMaterial() );
          object.position.set(...this.myobject_base.pos);
          this.myobject = object
          this.myobject.name = "personbody"
          this.scene.add(this.myobject);
        },
        this.onLoadProgress
      );
    }
  }
}