import * as THREE from "three";

export default {
  methods: {
    
    loadTexts() {
      const textloader = new THREE.FontLoader();
      const textmaterialsr = [
        new THREE.MeshStandardMaterial({ color: 0xaaaaaa }), // front
        new THREE.MeshStandardMaterial({ color: 0x222222 }), // side
      ];
      const textmaterials = [
        new THREE.MeshStandardMaterial({ color: 0x222222 }), // front
        new THREE.MeshStandardMaterial({ color: 0xaaaaaa }), // side
      ];
      textloader.load(
        "./res/style/fonts/gentilis_bold.typeface.json",
        (font) => {
          {
            const geometry = new THREE.TextGeometry("ABRAHAM ", {
              font: font,
              size: 1,
              height: 1,
            });
            this.textabraham = new THREE.Mesh(geometry, textmaterialsr);
            this.textabraham.position.set(-4, 2, -25);
            this.textabraham.castShadow = true
            this.textabraham.receiveShadow = true
            this.scene.add(this.textabraham);
          }
          {
            const geometry = new THREE.TextGeometry("DUNO", {
              font: font,
              size: 2,
              height: 1,
            });
            this.textduno = new THREE.Mesh(geometry, textmaterialsr);
            this.textduno.position.set(-2, -2, -24);
            this.textduno.castShadow = true
            this.textduno.receiveShadow = true
            this.scene.add(this.textduno);
          }
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