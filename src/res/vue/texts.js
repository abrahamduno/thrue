import * as THREE from "three";

export default {
  methods: {
    
    loadTexts() {
      const textloader = new THREE.FontLoader();
      const textmaterials = [
        new THREE.MeshBasicMaterial({ color: 0xffffff }), // front
        new THREE.MeshBasicMaterial({ color: 0x020226 }), // side
      ];
      textloader.load(
        "./res/style/fonts/Montserrat ExtraBold_Regular.json",
        (font) => {
          {
            const geometry = new THREE.TextGeometry("Abraham ", {
              font: font,
              size: 1,
              height: 1,
            });
            const textMesh1 = new THREE.Mesh(geometry, textmaterials);
            textMesh1.position.set(-4, 1.5, 8);
            this.scene.add(textMesh1);
          }
          {
            const geometry = new THREE.TextGeometry("Duno", {
              font: font,
              size: 2,
              height: 1,
            });
            const textMesh1 = new THREE.Mesh(geometry, textmaterials);
            textMesh1.position.set(-2, -0.7, 9);
            this.scene.add(textMesh1);
          }
          {
            const geometry = new THREE.TextGeometry("¿Qué hacemos por ti?", {
              font: font,
              size: 12,
              height: 1,
            });
            const textMesh1 = new THREE.Mesh(geometry, textmaterials);
            textMesh1.rotation.x = 0.6;
            textMesh1.position.set(180, 80, 30);
            this.scene.add(textMesh1);
          }
          {
            const geometry = new THREE.TextGeometry("Archenautas", {
              font: font,
              size: 22,
              height: 5,
            });
            const textMesh1 = new THREE.Mesh(geometry, textmaterials);
            textMesh1.rotation.x = 0.5;
            textMesh1.position.set(1200, 67, 55);
            this.scene.add(textMesh1);
          }
        }
      );
    }
    
  }
}