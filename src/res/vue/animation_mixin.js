export default {


data () {
	return {
		counter: 0,
	}
},
methods: {
    updateAnimations(e) {
		this.counter++
		// console.log(this.pointer)
		// this.rocketMesh.position.x = this.pointer.x
		// if (this.sunlight) { this.sunlight.position.x = this.pointer.x * 10 + 10 }
		if (this.myobject) { this.myobject.rotation.y = this.pointer.x  }
		// this.sunlight.position.x = Math.cos(this.counter*0.001)*3
		// this.sunlight.position.z = Math.sin(this.counter*0.001)*15

		this.rocketMesh.position.y = Math.sin(this.counter*0.03)*0.15+3
		this.rocketMesh.rotation.z = -Math.sin(this.counter*0.02)*0.35
		this.rocketMesh.rotation.x = Math.sin(this.counter*0.05)*0.15
		this.rocketMesh.rotation.y += 0.006
    },
}


}