import { THREE } from 'enable3d'

export class Colors  {
  // mat1
  // mat2
  // mat3
  // mat4
  // mat5
  constructor(scene ) {


    console.log("colors")
    this.mat1= scene.add.material({ lambert: { color: 'yellow', transparent: true, opacity: 0.5 } })
    this.mat2= scene.add.material({ lambert: { color: 'blue', transparent: true, opacity: 0.5 } })
    this.mat3= scene.add.material({ lambert: { color: 'green', transparent: true, opacity: 0.5 } })
    this.mat4=  new THREE.MeshLambertMaterial({ color: 'green', transparent: true, opacity: 0.5 })
    this.mat5= scene.add.material({ lambert: { color: 'red', transparent: true, opacity: 0.5 } })
    //
    // mat5: new THREE.MeshPhysicalMaterial({
    //   color: 0xb2ffc8, //colors.mat1, //
    //   //  envMap: envTexture,
    //   metalness: 0.25,
    //   roughness: 0.1,
    //   opacity: 1.0,
    //   transparent: true,
    //   transmission: 0.99,
    //   clearcoat: 1.0,
    //   clearcoatRoughness: 0.25
    // })
  }
}
