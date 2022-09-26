import * as THREE from "three";
const x = 0, y = 1, z = 2

export default {
  methods:
  {
    _$listen_click(e)
    {
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