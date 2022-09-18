import * as THREE from "three";

export default {
        computed: {
            LANG()                  { return this.$store.getters.LANG },
            accs_length()           { return this.$store.getters.accs_length },
            first_acc()             { return this.$store.getters.first_acc },
            dark_mode()             { return this.$store.getters.dark_mode },
        },
  methods: {
    
    loadTexts() {
    let bgintensity = this.dark_mode ? 0x603923 : 0x603923
    let textintensity = this.dark_mode ? 0xFFDEBA : 0xFFA859
      const textloader = new THREE.FontLoader();
      const qqq = [
        new THREE.MeshLambertMaterial({ color: textintensity }), // front
        new THREE.MeshStandardMaterial({ color: bgintensity }), // side
      ];
      textloader.load(
        "./res/style/fonts/gentilis_bold.typeface.json",
        (font) => {
          {
            const geometry = new THREE.TextGeometry("Buy Here", {
              font: font,
              size: 0.35,
              height: 0.1,
            });
            this.textabraham = new THREE.Mesh(geometry, qqq);
            this.textabraham.rotation.set(0, -0.8, 0);
            this.textabraham.position.set(5, 50, 4);
            this.textabraham.castShadow = true
            this.textabraham.visible = true
            this.textabraham.receiveShadow = true
            this.scene.add(this.textabraham);
          }
        }
      );
    }
    
  }
}