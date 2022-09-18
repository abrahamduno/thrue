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
    
    loadTextPrize() {
    let bgintensity = this.dark_mode ? 0xB49B85 : 0x909090
      const textloader = new THREE.FontLoader();
      const textmaterialsr = [
        new THREE.MeshStandardMaterial({ color: 0xaaaaaa }), // front
        new THREE.MeshStandardMaterial({ color: bgintensity }), // side
      ];
      const textmaterials = [
        new THREE.MeshStandardMaterial({ color: bgintensity }), // front
        new THREE.MeshStandardMaterial({ color: 0xaaaaaa }), // side
      ];
      textloader.load(
        "./res/style/fonts/gentilis_bold.typeface.json",
        (font) => {
          {
            const geometry = new THREE.TextGeometry("$"+this.valuesBlock.prize_pool*0.8, {
              font: font,
              size: 3,
              height: 1,
            });
            this.textprize = new THREE.Mesh(geometry, textmaterialsr);
            this.textprize.rotation.set(0, 0.8, 0);
            this.textprize.position.set(-8, -2, -7);
            this.textprize.castShadow = true
            this.textprize.receiveShadow = true
            // this.$parent.$parent.$refs.scene.add(this.textprize);
            // console.log(this.$parent.$parent.$refs.scene)
            console.log("valuesBlock", this.valuesBlock)
            this.$parent.$parent.$refs.scene.addToScene(this.textprize);
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