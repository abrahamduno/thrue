import * as THREE from "three";
import { OBJLoader } from "../../../scripts/loaders/OBJLoader.js";

const BASE_ASSET_URL = "./res";

export default {
  computed:
  {
    // getPlayer()                  { return this.$store.getters.getPlayer },
  },
  // setPlayerStats
  methods: {
    $init_player()
    {
      let ms = Date.now();
      // this.$store.dispatch("setPlayerStats",{id:"test"})
      // this.$nextTick(() => {
        // console.log("321",this.$player.target)
        // console.log("321",this.$player.stats)
        // console.log("321",Object.keys(this.$player[0]))
        // console.log("321",this.$player.target)
      // })

      // if (this.$player.stats && this.$player.stats.energy == -1)
      {
        // unsigned
        this.$store.dispatch("setPlayer",
          {
            id:"0",
            obj: null,
            pos: [0,0,0],
            rot: [0,0,0],
            scale: [1,1,1],
            stats: {
              hunger: 3,
              hygene: 8,
              energy: 9,
              fun: 5,
            },
          }
        )
      }
      this.$player = this.$store.getters.getPlayers[0]
      // this.$player = {
      //   obj: null,
      //   pos: [0,0,0],
      //   rot: [0,0,0],
      //   scale: [1,1,1],
      //   stats: {
      //     hunger: 0,
      //     hygene: 0,
      //     energy: 0,
      //     fun: 0,
      //   },
      // }
    },
    llladd_bubbleHead()
    {
      this.mysign_base = {
        pos: [0, 0.05, 6],
        rot: [1.6,0,0],
      }
      // this.OFFSET.mysign = {
      //   y:2.1,
      // }
      this.LIVE_OFFSET.mysign = {
        pos:[],
        x:9,
        y:2.15,
        z:-28,
      }
      this.myobject_base = {
        pos: [0, -2.1, 6],
        rot: [0,0,0],
      }
      this.LIVE_OFFSET.myobject = {
        x:9,
        y:0.05,
        z:-28,
      }
      new OBJLoader().setPath(BASE_ASSET_URL + "/models/").load(
        "sign3.obj",
        (object) => {
          object.traverse( this.baseStandardMaterial() );
          object.position.set(...this.mysign_base.pos);
          object.rotation.set(...this.mysign_base.rot);
          this.mysign = object
          this.scene.add(this.mysign);
        },
        this.onLoadProgress
      );
      new OBJLoader().setPath(BASE_ASSET_URL + "/models/").load(
        "test3.obj",
        (object) => {
          object.traverse( this.baseStandardMaterial() );
          object.position.set(...this.myobject_base.pos);
          this.myobject = object
          this.scene.add(this.myobject);
        },
        this.onLoadProgress
      );
      // return
      // {
      //   const x = 0, y = 0;


      //   var coordinatesList = [
      //     // new THREE.Vector3(-0.5, 0, 0),
      //     new THREE.Vector3(0.6, 0.45, 0),
      //     new THREE.Vector3(0.57, 0.38, 0),
      //     new THREE.Vector3(0, 0.77, 0), // bottomtop
      //     // new THREE.Vector3(-0.4, 0.5, 0),
      //     // new THREE.Vector3(-0.5, 0.4, 0),
      //     new THREE.Vector3(-0.57, 0.38, 0),
      //     new THREE.Vector3(-0.6, 0.45, 0),
      //     new THREE.Vector3(0, 0.845, 0), // top
      //     // new THREE.Vector3(0.4, 0.5, 0),
      //     // new THREE.Vector3(0.5, 0.4, 0),
      //     // new THREE.Vector3(0.5, 0, 0),
      //   ];
      //   const heartShape = new THREE.Shape(coordinatesList);
      //   const extrudeSettings = {
      //     // steps: 2,
      //     depth: 1.7,
      //     bevelEnabled: false,
      //     // bevelThickness: 1,
      //     // bevelSize: 1,
      //     // bevelOffset: 0,
      //     // bevelSegments: 1
      //   };
      //   const geometry = new THREE.ExtrudeBufferGeometry(heartShape, extrudeSettings);
      //   const material = new THREE.MeshStandardMaterial( { wireframe:false,color: 0xCD4B54, } );
      //   const mesh = new THREE.Mesh( geometry, material ) ;
      //   mesh.position.set(0, -1, 5);
      //   mesh.castShadow = true;
      //   mesh.receiveShadow = true;
      //   this.scene.add(mesh);
      // }
      // return

      // {
      //   const radius = 2;
      //   const geometry = new THREE.BoxGeometry(0.85,0.45,0.02);
      //   const material = new THREE.MeshStandardMaterial( { color: 0xaaaaaa, } );
      //   const mesh = new THREE.Mesh( geometry, material ) ;
      //   mesh.position.set(0, -0.85, 6.5);
      //   mesh.castShadow = true;
      //   mesh.receiveShadow = true;
      //   this.scene.add(mesh);
      // }
      // {
      //   const orbGeometry = new THREE.SphereGeometry(0.5, 6,6 );
      //   const orbMaterial = new THREE.MeshStandardMaterial( { wireframe:false,flatShading: true,color: 0xaaaaaa } );
      //   let startLevelBlob = new THREE.Mesh( orbGeometry, orbMaterial );
      //   startLevelBlob.castShadow = true; //default is false
      //   startLevelBlob.receiveShadow = true; //default
      //   startLevelBlob.position.set(0,-0.1,6.1)
      //   startLevelBlob.scale.set(0.65,0.69,1)
      //   this.scene.add( startLevelBlob );
      // }
      // {
      //   const x = 0, y = 0;


      //   var coordinatesList = [
      //     new THREE.Vector3(-0.5, 0, 0),
      //     new THREE.Vector3(-0.5, 0.4, 0),
      //     new THREE.Vector3(-0.6, 0.4, 0),
      //     new THREE.Vector3(-0.6, 0.45, 0),
      //     new THREE.Vector3(0, 0.8, 0), // top
      //     new THREE.Vector3(0.6, 0.45, 0),
      //     new THREE.Vector3(0.6, 0.4, 0),
      //     new THREE.Vector3(0.5, 0.4, 0),
      //     new THREE.Vector3(0.5, 0, 0),
      //   ];
      //   const heartShape = new THREE.Shape(coordinatesList);
      //   const extrudeSettings = {
      //     // steps: 2,
      //     depth: 2,
      //     bevelEnabled: false,
      //     // bevelThickness: 1,
      //     // bevelSize: 1,
      //     // bevelOffset: 0,
      //     // bevelSegments: 1
      //   };
      //   const geometry = new THREE.ExtrudeBufferGeometry(heartShape, extrudeSettings);
      //   const material = new THREE.MeshStandardMaterial( { wireframe:false,color: 0xaaaaaa, } );
      //   const mesh = new THREE.Mesh( geometry, material ) ;
      //   mesh.position.set(0, -0.9, 4.5);
      //   mesh.castShadow = true;
      //   mesh.receiveShadow = true;
      //   this.scene.add(mesh);
      // }
    }
  }
}