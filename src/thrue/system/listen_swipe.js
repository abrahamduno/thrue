import * as THREE from "three";
const x = 0, y = 1, z = 2

export default {
  methods:
  {
    _$set_swipe(e)
    {
      this.__swipe = {
        x:null,
        y:null,
        x2:0,
        y2:0,
        diffx:0,
        diffy:0,
      }
      // Swipe Up / Down / Left / Right
      // this.__swipe.x = null;
      // this.__swipe.y = null;
    },
    _$startTouch(e) {
      this.__swipe.x = e.touches[0].clientX;
      this.__swipe.y = e.touches[0].clientY;
    },

    _$moveTouch(e) {
      if (this.__swipe.x === null) {
        return;
      }

      if (this.__swipe.y === null) {
        return;
      }

      this.__swipe.x2 = e.touches[0].clientX;
      this.__swipe.y2 = e.touches[0].clientY;

      this.__swipe.diffx = this.__swipe.x - this.__swipe.x2;
      this.__swipe.diffy = this.__swipe.y - this.__swipe.y2;
      console.log(this.__swipe)
      console.log(Math.abs(this.__swipe.diffx) > Math.abs(this.__swipe.diffy))

      if (Math.abs(this.__swipe.diffx) > Math.abs(this.__swipe.diffy)) {
        // sliding horizontally
        if (this.__swipe.diffx > 0) {
          // swiped left
          // console.log("swiped left");
          if (this._$swipe_left) { this._$swipe_left() }
        } else {
          // swiped right
          // console.log("swiped right");
          if (this._$swipe_right) { this._$swipe_right() }
        }  
      } else {
        // sliding vertically
        if (this.__swipe.diffy > 0) {
          // swiped up
          // console.log("swiped up");
          if (this._$swipe_up) { this._$swipe_up() }
        } else {
          // swiped down
          // console.log("swiped down");
          if (this._$swipe_down) { this._$swipe_down() }
        }  
      }

      this.__swipe.x = null;
      this.__swipe.y = null;

      // e.preventDefault();
    },
  }
}