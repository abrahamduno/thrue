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
	    updateAnimations(e) {
        	const t = document.body.getBoundingClientRect().top;
        	
			this.tcounter++
			if (this.camera && this.auto_mode)
			{
				window.scrollTo(0,window.scrollY+1)
			}
			if (this.$parent.$refs.thrue && this.$parent.$refs.thrue.$refs.lotto && this.$parent.$refs.thrue.$refs.lotto.textsignup) 
			{
				let atext = this.$parent.$refs.thrue.$refs.lotto.textsignup
				atext.rotation.y = this.lerp(atext.rotation.y,-this.pointer.x,0.07)

	        	if (this.valuesBlock  && this.valuesBlock.dai_dao_allowance)
	        	{
		        	atext.position.z = this.lerp(atext.position.z,25,0.05)
	        	}

			}
			if (this.$parent.$refs.thrue && this.$parent.$refs.thrue.$refs.lotto && this.$parent.$refs.thrue.$refs.lotto.textwelcome) 
			{
				let atext = this.$parent.$refs.thrue.$refs.lotto.textwelcome
				atext.rotation.y = this.lerp(atext.rotation.y,this.pointer.x*0.5+1,0.07)
			}
			if (this.mysign)
			{
				this.mysign.rotation.y = this.lerp(this.mysign.rotation.y,this.pointer.x*3.1,0.07)
			}
			if (this.camera && this.pro_mode &&
				(this.pointer.x < -0.15 || this.pointer.x > 0.15)
				)
			{
				this.camera.rotation.y = this.lerp(this.camera.rotation.y,-this.pointer.x*1.3,0.07)

			} else {
				this.camera.rotation.y = this.lerp(this.camera.rotation.y,0,0.07)

		        if (t < -this.sceneBreakpoints.default[0]) {
		        	// this.camera.rotation.y = this.lerp(this.camera.rotation.y,t * 0.001,0.07)
		          // this.camera.rotation.y = this.sceneVariables.camera.rot[y] + t * 0.0001;
		        } else {
		        	// this.camera.rotation.y = this.lerp(this.camera.rotation.y,0,0.07)
		        }

			}
			this.rocketMesh.position.y = this.lerp(this.rocketMesh.position.y,Math.sin(this.tcounter*0.03)*0.15+(this.accs_length ? 25 : 2),0.01)
			this.rocketMesh.rotation.z = -Math.sin(this.tcounter*0.02)*0.35
			this.rocketMesh.rotation.x = Math.sin(this.tcounter*0.05)*0.15
			this.rocketMesh.rotation.y += 0.006-this.pointer.x*0.01

	      	if (this.accs_length)
	      	{
		        this.myobject.position.z = this.lerp(this.myobject.position.z,-50,0.07)
				if (this.mysign)
				{
		        	this.mysign.position.z = this.lerp(this.mysign.position.z,-50,0.07)
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