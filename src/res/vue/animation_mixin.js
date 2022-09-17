export default {


data () {
	return {
		counter: 0,
	}
},
        computed: {
            accs_length()           { return this.$store.getters.accs_length },
        },
methods: {
	lerp(min, max, value) {
	  return (max - min) * value + min;
	},
    updateAnimations(e) {
		this.counter++
		// console.log(this.pointer)
		// this.rocketMesh.position.x = this.pointer.x
		// if (this.sunlight) { this.sunlight.position.x = this.pointer.x * 10 + 10 }
		this.mysign.rotation.y = this.lerp(this.mysign.rotation.y,this.pointer.x*3.1,0.07)
		this.light4.position.x = this.lerp(this.light4.position.x,this.pointer.x*3.1,0.07)
		// if (this.camera && (this.pointer.x < -0.75 || this.pointer.x > 0.75))
		if (this.camera &&
			(this.pointer.y > 0.75) && 
			(this.pointer.x < -0.75 || this.pointer.x > 0.75)
			)
		{
			this.camera.rotation.y = this.lerp(this.camera.rotation.y,-this.pointer.x*1.1,0.07)
			// this.camera.rotation.x = this.lerp(this.camera.rotation.y,-1-this.pointer.x,0.07)
			// if (this.camera.rotation.y)

		} else {
			this.camera.rotation.y = this.lerp(this.camera.rotation.y,0,0.07)

		}
		// this.sunlight.position.x = Math.cos(this.counter*0.001)*3
		// this.sunlight.position.z = Math.sin(this.counter*0.001)*15

		this.rocketMesh.position.y = Math.sin(this.counter*0.03)*0.15+1
		this.rocketMesh.rotation.z = -Math.sin(this.counter*0.02)*0.35
		this.rocketMesh.rotation.x = Math.sin(this.counter*0.05)*0.15
		this.rocketMesh.rotation.y += 0.006

      	if (this.accs_length)
      	{
	        this.myobject.position.z = this.lerp(this.myobject.position.z,-50,0.02)
	        this.mysign.position.z = this.lerp(this.mysign.position.z,-50,0.02)
        }

		this.animate_levelone()
    },
}


}