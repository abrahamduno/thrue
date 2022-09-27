import * as THREE from "three";

export default {
  methods:
  {
    baseStandardMaterial(color = 0xaaaaaa)
    {
      return (child) => {
          if ( child instanceof THREE.Mesh )
          {
            child.material = new THREE.MeshStandardMaterial( { color, } );
            child.castShadow = true;
            child.receiveShadow = true;
          }
        }
    },
  	wireframeMaterial(color = 0xaaaaaa)
  	{
  		return (child) => {
	      	if ( child instanceof THREE.Mesh )
	      	{
		        child.material = new THREE.MeshStandardMaterial( { wireframe:true,color, } );
		        // child.castShadow = true;
		        // child.receiveShadow = true;
	      	}
        }
  	},
  }
}