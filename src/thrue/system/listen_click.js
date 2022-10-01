import * as THREE from "three";
const x = 0, y = 1, z = 2

export default {
  methods:
  {
    _$listen_click(e)
    {
      if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch)
      { 
        let lastIntersected = this.INTERSECTED
        this._$mobile_raycaster()
        this._$mobile_touch_raycaster(true,lastIntersected)
        return
        // if ( this.INTERSECTED ) this.INTERSECTED.material.emissive.setHex( 0x000000 );
        // Touch events are supported
      }


      if (this.INTERSECTED && this.$parent.$refs.dom && this.$parent.$refs.dom.$refs.lotto &&  this.$parent.$refs.dom.$refs.lotto.textsignup &&
        ( this.INTERSECTED == this.$parent.$refs.dom.$refs.lotto.textsignup || 
          this.INTERSECTED == this.$parent.$refs.dom.$refs.lotto.textsignup.children[0])
        )
      {
        this.$parent.$refs.dom.$refs.lotto.execute_addFullTargetAllowance();
      }

      this._$click_currentLevel()
      this._$click_npcContainer()
    },
  }
}