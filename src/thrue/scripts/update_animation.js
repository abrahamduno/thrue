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
	      this.updateAnimations()
	      this.updateRaycaster()

	      // render
	      if (this.current_sub_page == "bloom") 
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

			if (this.$parent.$refs.dom && this.$parent.$refs.dom.$refs.lotto && this.$parent.$refs.dom.$refs.lotto.textsignup) 
			{
				let atext = this.$parent.$refs.dom.$refs.lotto.textsignup
				atext.rotation.y = this.lerp(atext.rotation.y,-this.pointer.x,0.07)

	        	if (this.valuesBlock  && this.valuesBlock.dai_dao_allowance)
	        	{
		        	atext.position.z = this.lerp(atext.position.z,25,0.05)
	        	}

			}
			if (this.$parent.$refs.dom && this.$parent.$refs.dom.$refs.lotto && this.$parent.$refs.dom.$refs.lotto.textwelcome) 
			{
				let atext = this.$parent.$refs.dom.$refs.lotto.textwelcome
				atext.rotation.y = this.lerp(atext.rotation.y,this.pointer.x*0.5+1,0.07)
			}
			

			this.animate_levelone()
			this.animate_ticketer()
	    },
	}
}