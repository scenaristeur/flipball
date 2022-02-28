import { Project, Scene3D, PhysicsLoader, THREE, /*Loaders,*/
  ExtendedObject3D, ExtendedMesh } from 'enable3d'
  import { Keyboard } from '@yandeu/keyboard'

  import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
  // import Stats from 'three/examples/jsm/libs/stats.module'
  const loader = new STLLoader()
  const rotationSpeed= .8
  const keyboard = new Keyboard()
  let camera

  let actions = {l: 0, r: 0, u: 0, d: 0 }
  let ready = false
  let flipper_parts = [
    {
      file: 'rubber',
      name: "bat_left",
      shape: "concave",
      position: {x:-2, y:.2, z:9},
      scale: {x: .5, y: .5, z: .5}
    },
    {
      file: 'rubber',
      name: "bat_right",
      shape: "concave",
      position: {x:2, y: .4, z:9},
      rotation: {x: 0, y: 0, z: Math.PI},
      scale: {x: .5, y: .5, z: .5}
    },
  ]

  class MainScene extends Scene3D {
    constructor() {
      super({ key: 'MainScene' })
    }

    init() {
      console.log('init')
      this.renderer.setPixelRatio(1)
      this.renderer.setSize(window.innerWidth, window.innerHeight)
    }

    preload() {
      //console.log('preload')
    }

    async create() {
      this.warpSpeed()
      // enable physics debug
      // this.physics.debug?.enable()
      this.camera.position.set(0, 14, 20)//(0, 30, 0)//(0, 15, 25)
      camera = this.camera

      this.colors = {
        mat1 : this.add.material({ lambert: { color: 'yellow', transparent: true, opacity: 0.5 } }),
        // mat2: this.add.material({ lambert: { color: 'blue', transparent: true, opacity: 0.5 } }),
        // mat3: this.add.material({ lambert: { color: 'green', transparent: true, opacity: 0.5 } }),
        // mat4:  new THREE.MeshLambertMaterial({ color: 'green', transparent: true, opacity: 0.5 }),
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

      await loadParts(this, flipper_parts)
    }

    update() {
      if(ready){
        let batL = this.scene.getObjectByName("bat_left")
        let batR = this.scene.getObjectByName("bat_right")
        if (actions.l == 1){
          if(batL.rotation.y <= Math.PI/6){
            batL.rotation.y += rotationSpeed
            batL.body.needUpdate = true
          }
        }else{
          if(batL.rotation.y >= -Math.PI/6){
            batL.rotation.y -= rotationSpeed
            batL.body.needUpdate = true
          }
        }
        if (actions.r == 1){
          if(batR.rotation.y >= -Math.PI/6){
            batR.rotation.y -= rotationSpeed
            batR.body.needUpdate = true
          }
        }else{
          if(batR.rotation.y <= Math.PI/6){
            batR.rotation.y += rotationSpeed
            batR.body.needUpdate = true
          }
        }
        if( actions.d == 1){
          newBall(this)
        }
      }
    }
  }

  keyboard.watch.down( keyCode => {
    switch (keyCode) {
      case 'ArrowLeft':
      actions.l = 1
      break;
      case 'ArrowRight':
      actions.r = 1
      break;
      case 'ArrowUp':
      actions.u = 1
      break;
      case 'ArrowDown':
      actions.d = 1
      break;
      case 'Space':
      console.log(camera)
      break;
    }
  })

  keyboard.watch.up( keyCode => {
    switch (keyCode) {
      case 'ArrowLeft':
      actions.l = 0
      break;
      case 'ArrowRight':
      actions.r = 0
      break;
      case 'ArrowUp':
      actions.u = 0
      break;
      case 'ArrowDown':
      actions.d = 0
      break;
    }
  })

  function newBall(ctx){
    let ball = ctx.physics.add.sphere(
      {
        x:-1.7,
        radius : 0.2,
        z: -5,
        y: 4,
        mass: 0.4,
        // collisionFlags: 0
      },
      { standard: { emissive: 0x888888, roughness: 0.4, metalness: 1 }
      // { lambert: { color: 0x00ff00 }
    }
  )
  ball.body.setBounciness(.1)

}
async function loadParts(ctx, parts){
  let count = parts.length
  for (let p of parts){
    console.log("loading", p.name)

    loader.load(
      '../stl/'+p.file+'.stl',
      function (geometry) {
        const part = new ExtendedMesh(geometry, ctx.colors["mat1"])
        console.log(part)
        let object = new ExtendedObject3D()
        object.add(part)
        p.scale != undefined ? object.scale.set(p.scale.x, p.scale.y, p.scale.z) : ""
        p.position != undefined ? object.position.set(p.position.x, p.position.y, p.position.z) : ""
        p.rotation != undefined ? object.rotation.set(p.rotation.x, p.rotation.y, p.rotation.z) : ""


        ctx.scene.add(object)
        ctx.physics.add.existing(object, {shape: p.shape})
        object.body.setCollisionFlags(2)
        object.body.setBounciness(.1)
        object.name = p.name
        object.mass = 2
        // motion clamping https://enable3d.io/docs.html#collisions
        object.body.setCcdMotionThreshold(1)
        object.body.setCcdSweptSphereRadius(0.2)
        console.log(object)
      },
      (xhr) => {
        let progress = xhr.loaded / xhr.total
        console.log(progress * 100 + '% loaded')
        if(progress == 1){

          if (count == 1){
            console.log("Parts are loaded")
            ready = true
            newBall(ctx)
          }else{
            console.log(count+"/"+parts.length)
          }
          count --
        }

      },
      (error) => {
        console.log(error)
        alert ('error loading'+p.name+" : "+error)
      }
    )
  }
}

PhysicsLoader('/ammo', () => new Project({ gravity: { x: 0, y: -9.81, z: 3}, scenes: [MainScene], antialias: true }))
