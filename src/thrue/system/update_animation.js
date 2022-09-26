const x = 0, y = 1, z = 2

export default {
	data ()
	{
		return {
			__timer: 0,
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
	      this.raycaster.setFromCamera( this.__pointer, this.camera );
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
        	
			this.__timer++
			if (this.camera && this.auto_mode)
			{
				window.scrollTo(0,window.scrollY+1)
			}

			this.$animate_main()
			this.$animate_startLevelBlob()
			this.$animate_npcContainer(this.__timer)
			this.$animate_currentLevel()
			this.animate_ticketer()

			// ANIMATE PRIZE TEXT WAITING FOR BLOCKCHAIN
			if (!this.$parent.$parent.$refs.dom) return
			let _lotto = this.$parent.$parent.$refs.dom.$refs.lotto
			let atext
			if (_lotto && (atext = _lotto.textsignup)) 
			{
				atext.rotation.y = this.lerp(atext.rotation.y,-this.__pointer.x,0.07)
	        	if (this.valuesBlock  && this.valuesBlock.dai_dao_allowance)
	        	{
		        	atext.position.z = this.lerp(atext.position.z,25,0.05)
				}
			}
	    },
	}
}