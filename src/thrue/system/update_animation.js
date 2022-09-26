const x = 0, y = 1, z = 2

export default {
	data ()
	{
		return {
			tcounter: 0,
		}
	},
	methods: {
		lerp(min, max, value) {
		  return (max - min) * value + min;
		},
	    _animate()
	    {
	      requestAnimationFrame(this._animate);
	      // animations and mouse position
	      this.raycaster.setFromCamera( this.pointer, this.camera );
	      this.updateRaycaster()
	      this.updateAnimations()

	      // render
	      if (this.current_filter == "bloom") 
	      {
	        this.composer.render();
	      } else {
	        this.renderer.render(this.scene, this.camera);
	      }
	    },
	    updateAnimations(e) {
        	const t = document.body.getBoundingClientRect().top;
        	
			this.tcounter++
			if (this.camera && this.auto_mode)
			{
				window.scrollTo(0,window.scrollY+1)
			}

			this.mainAnimation()
			this.animate_connectOrb()
			this.animate_npcs(this.tcounter)
			this.animate_levelone()
			this.animate_ticketer()

			if (!this.$parent.$parent.$refs.dom) return
			let _lotto = this.$parent.$parent.$refs.dom.$refs.lotto
			let atext
			if (_lotto && (atext = _lotto.textsignup)) 
			{
				atext.rotation.y = this.lerp(atext.rotation.y,-this.pointer.x,0.07)
	        	if (this.valuesBlock  && this.valuesBlock.dai_dao_allowance)
	        	{
		        	atext.position.z = this.lerp(atext.position.z,25,0.05)
				}
			}
	    },
	}
}