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

			this.mainAnimation()
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
	    mainAnimation()
	    {
	      // TRANSITION TO LEVEL ! WHEN CONNECTED
	      if (this.accs_length || this.is_playing_test)
	      {
	        this.sunlight.position.z = this.__scroll * 0.01 +10
	        this.sunlighTarget.position.z = this.__scroll * 0.01 -10
	        this.sunlight.target  = this.sunlighTarget

	        this.myobject.position.z = this.lerp(this.myobject.position.z,-50,0.07)
	        this.myobject.position.y = this.lerp(this.myobject.position.y,this.MIN.y,0.07)
	        // this.myobject.rotation.y = this.lerp(this.myobject.rotation.y,Math.PI/12,0.07)
	        if (this.mysign)
	        {
	          this.mysign.position.z = this.lerp(this.mysign.position.z,-49.6,0.07)
	          this.mysign.position.y = this.lerp(this.mysign.position.y,-0.9,0.07)
	        }
	      }

	      // LIVE ANIMAL LOOKING TO POINTER
	      if (this.mysign)
	      {
	        // console.log(this.__pointer)
	        if (this.__pointer.x == null && this.__pointer.y == null)
	        {
	          // console.log("asd")
	          this.mysign.rotation.y = this.lerp(this.mysign.rotation.y,-0.6,0.01)
	          this.mysign.rotation.x = this.lerp(this.mysign.rotation.x,-0.2,0.03)
	          // this.mysign.rotation.y = this.lerp(this.mysign.rotation.y,this.__pointer.x,0.07)
	        } else {
	          this.mysign.rotation.y = this.lerp(this.mysign.rotation.y,this.__pointer.x,0.07)
	          this.mysign.rotation.x = this.lerp(this.mysign.rotation.x,-this.__pointer.y+0.4,0.07)
	        }
	      }

	    },
	}
}