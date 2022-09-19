import * as THREE from "three";

export default {
        computed: {
            LANG()                  { return this.$store.getters.LANG },
            accs_length()           { return this.$store.getters.accs_length },
            first_acc()             { return this.$store.getters.first_acc },
            dark_mode()             { return this.$store.getters.dark_mode },
            valuesBlock()             { return this.$store.getters.getBlock("values") },
        },
  methods: {
    
    // clickTextSignup() {
    //   alert()
    // },
    loadTextWelcome() {
    let bgintensity = this.dark_mode ? 0xFF8D31 : 0xD17929
    let textintensity = this.dark_mode ? 0xE7A356 : 0xFFA859
      const textloader = new THREE.FontLoader();
      const textmaterialsr = [
        new THREE.MeshStandardMaterial({ color: bgintensity }), // side
        new THREE.MeshLambertMaterial({ color: textintensity }), // front
      ];
      textloader.load(
        "./res/style/fonts/gentilis_bold.typeface.json",
        (font) => {
          {
            const geometry = new THREE.TextGeometry("hello!", {
              font: font,
              size: 0.9,
              height: 0.15,
            });



            // this.textwelcome = new THREE.Group();
            // console.log("1")
            let textmesh = new THREE.Mesh(geometry, textmaterialsr)
            // console.log("2")
            var cubeGeometry = new THREE.BoxGeometry(3.6,1.8,0.2) 
            var cubeGeometry2 = new THREE.BoxGeometry(0.1,4,0.1) 
            var cubeMaterial = new THREE.MeshStandardMaterial({color: 0xFFDEBA ,wireframe:false})
            let boxmesh = new THREE.Mesh(cubeGeometry, cubeMaterial) 
            let boxmesh2 = new THREE.Mesh(cubeGeometry2, cubeMaterial) 
            boxmesh.castShadow = true
            boxmesh.receiveShadow = true



            boxmesh2.position.set(-0.01,-1,-0.05)
            boxmesh.position.set(1.6, 0.35, -0.05)
            boxmesh2.castShadow = true
            boxmesh2.receiveShadow = true
            // boxmesh.position.set(0, 0.33, -3.05)

            // textmesh.rotation.set(0, 0.8, 0);
            textmesh.position.set(-4, 0, -2.33);
            textmesh.castShadow = true
            textmesh.receiveShadow = true

            this.textwelcome = textmesh
            // this.textwelcome.add(textmesh)
            this.textwelcome.add(boxmesh2)
            this.textwelcome.add(boxmesh)




            // this.textwelcome = new THREE.Mesh(geometry, textmaterialsr);
            // this.textwelcome.position.set(-2, 0, -3);
            // this.textwelcome.castShadow = true
            // this.textwelcome.receiveShadow = true


            // this.$parent.$parent.$refs.scene.add(this.textwelcome);
            // console.log(this.$parent.$parent.$refs.scene)
            // console.log("valuesBlock", this.valuesBlock)


            this.$parent.$parent.$refs.scene.scene.add(this.textwelcome);
          }
          // {
          //   const geometry = new THREE.TextGeometry("DUNO", {
          //     font: font,
          //     size: 2,
          //     height: 1,
          //   });
          //   this.textduno = new THREE.Mesh(geometry, textmaterialsr);
          //   this.textduno.rotation.set(0, 1.6, 0);
          //   this.textduno.position.set(-5, -2, -24);
          //   this.textduno.castShadow = true
          //   this.textduno.receiveShadow = true
          //   this.scene.add(this.textduno);
          // }
          // {
          //   const geometry = new THREE.TextGeometry("¿Qué hacemos por ti?", {
          //     font: font,
          //     size: 12,
          //     height: 1,
          //   });
          //   const textMesh1 = new THREE.Mesh(geometry, textmaterials);
          //   textMesh1.rotation.x = 0.6;
          //   textMesh1.position.set(180, 80, 30);
          //   this.scene.add(textMesh1);
          // }
          // {
          //   const geometry = new THREE.TextGeometry("Archenautas", {
          //     font: font,
          //     size: 22,
          //     height: 5,
          //   });
          //   const textMesh1 = new THREE.Mesh(geometry, textmaterials);
          //   textMesh1.rotation.x = 0.5;
          //   textMesh1.position.set(1200, 67, 55);
          //   this.scene.add(textMesh1);
          // }
        }
      );
    }
    
  }
}