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
			if (this.mysign)
			{
				// console.log(this.pointer)
				if (this.pointer.x == null && this.pointer.y == null)
				{
					// console.log("asd")
					this.mysign.rotation.y = this.lerp(this.mysign.rotation.y,-0.6,0.01)
					this.mysign.rotation.x = this.lerp(this.mysign.rotation.x,-0.2,0.03)
					// this.mysign.rotation.y = this.lerp(this.mysign.rotation.y,this.pointer.x,0.07)
				} else {
					this.mysign.rotation.y = this.lerp(this.mysign.rotation.y,this.pointer.x,0.07)
					this.mysign.rotation.x = this.lerp(this.mysign.rotation.x,-this.pointer.y+0.4,0.07)
					// if (-this.pointer.y+0.4 > 1)
					// {
					// 	// this.mysign.rotation.x = this.lerp(this.mysign.rotation.x,0.5,0.07)
					// 	// this.mysign.rotation.x = this.lerp(this.mysign.rotation.x,0.75+0.4,0.07)
					// } else {
					// }
				}
				// if (this.pointer.y < 0.6)
				// {
				// 	if (this.pointer.y < 0)
				// 	{
				// 		this.mysign.rotation.x = this.lerp(this.mysign.rotation.x,-this.pointer.y+0.2,0.07)
				// 	} else {
				// 	}
				// } else {
				// 	this.mysign.rotation.x = this.lerp(this.mysign.rotation.x,-0.7,0.07)
				// }
			}
			if (this.camera && this.pro_mode &&
				(this.pointer.x < -0.2 || this.pointer.x > 0.2)
				)
			{
				this.camera.rotation.y = this.lerp(this.camera.rotation.y,-this.pointer.x*1.2+(
					this.pointer.x < -0.2 ? -0.2 : +0.2),0.07)

			} else {
				this.camera.rotation.y = this.lerp(this.camera.rotation.y,0,0.07)

		        if (t < -this.sceneBreakpoints.default[0]) {
		        	// this.camera.rotation.y = this.lerp(this.camera.rotation.y,t * 0.001,0.07)
		          // this.camera.rotation.y = this.sceneVariables.camera.rot[y] + t * 0.0001;
		        } else {
		        	// this.camera.rotation.y = this.lerp(this.camera.rotation.y,0,0.07)
		        }

			}
			this.rocketMesh.position.y = this.lerp(this.rocketMesh.position.y,Math.sin(this.tcounter*0.03)*0.15+(this.accs_length ? 25 : +0.6),0.02)
			this.rocketMesh.rotation.z = -Math.sin(this.tcounter*0.02)*0.35
			this.rocketMesh.rotation.x = Math.sin(this.tcounter*0.05)*0.15
			this.rocketMesh.rotation.y += 0.006-this.pointer.x*0.01

	      	if (this.accs_length)
	      	{
		        this.myobject.position.z = this.lerp(this.myobject.position.z,-50,0.07)
		        this.myobject.position.y = this.lerp(this.myobject.position.y,-2,0.07)
				if (this.mysign)
				{
		        	this.mysign.position.z = this.lerp(this.mysign.position.z,-49.6,0.07)
		        	this.mysign.position.y = this.lerp(this.mysign.position.y,-0.9,0.07)
		        }
	        	if (this.textabraham && this.ticketer && this.valuesBlock  && this.valuesBlock.prize_pool)
	        	{
		        	this.textabraham.position.y = this.lerp(this.textabraham.position.y,-1.5,0.05)
	        	}
	        }

			this.animate_levelone()
			this.animate_ticketer()
	    },
	}
}