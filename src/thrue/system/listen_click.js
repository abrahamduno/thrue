import * as THREE from "three";
const x = 0, y = 1, z = 2

export default {
  methods:
  {
    onPointerClick(e)
    {
      this.mainCheckClick()

      if (this.INTERSECTED && this.$parent.$refs.dom && this.$parent.$refs.dom.$refs.lotto &&  this.$parent.$refs.dom.$refs.lotto.textsignup &&
        ( this.INTERSECTED == this.$parent.$refs.dom.$refs.lotto.textsignup || 
          this.INTERSECTED == this.$parent.$refs.dom.$refs.lotto.textsignup.children[0])
        )
      {
        this.$parent.$refs.dom.$refs.lotto.execute_addFullTargetAllowance();
      }

      this.checkClick_connectOrb()
      this.checkClick_levelOne()
      this.checkClick_npc()
    },
  }
}