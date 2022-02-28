import { Project, Scene3D, PhysicsLoader, THREE, Loaders,
  ExtendedObject3D, ExtendedMesh } from 'enable3d'
  import { Keyboard } from '@yandeu/keyboard'

  import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
  // import Stats from 'three/examples/jsm/libs/stats.module'
  const loader = new STLLoader()
  const rotationSpeed= .3
  const keyboard = new Keyboard()
  let camera

  let actions = {l: 0, r: 0, u: 0, d: 0 }
  let state = "init"
  let flipper_parts = [
    // {file: 'bat_3inch_lite',
    // name: "bat_left",
    // position: {x:-3, y:.5, z:5},
    // rotation: {x: 0, y: 0, z: 0},
    // modifier:{x: 1,  y: 1, z: 1},
    // shape: 'convex' },
    {file: 'rubber',
    name: "bat_left",
    // parent: "bat_left",
    position: {x:-3,y:.5,z:5},
    shape: 'concave'},
    {file: 'rubber',
    name: "bat_right",
    shape: "convex",
    position: {x:3, y:.5, z:5},
    rotation: {x: 0, y: Math.PI, z: 0},
    modifier:{x: -1,  y: 1, z: 1} },

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
      this.physics.debug?.enable()
      this.camera.position.set(-0, 10, 14)//(0, 30, 0)//(0, 15, 25)
      camera = this.camera

      this.colors = {
        mat1 : this.add.material({ lambert: { color: 'yellow', transparent: true, opacity: 0.5 } }),
        mat2: this.add.material({ lambert: { color: 'blue', transparent: true, opacity: 0.5 } }),
        mat3: this.add.material({ lambert: { color: 'green', transparent: true, opacity: 0.5 } }),
      }
      // this.material = new THREE.MeshLambertMaterial({ color: 'green', transparent: true, opacity: 0.5 })

      // let material1 = new THREE.MeshPhysicalMaterial({
      //   color: colors.mat1, //0xb2ffc8,
      //   //  envMap: envTexture,
      //   metalness: 0.25,
      //   roughness: 0.1,
      //   opacity: 1.0,
      //   transparent: true,
      //   transmission: 0.99,
      //   clearcoat: 1.0,
      //   clearcoatRoughness: 0.25
      // })

      await loadParts(this, flipper_parts)



      // const box = this.add.box({ x: 9 })
      // const compound = [
      //   { shape: 'box', width: 0.5, height: 1, depth: 0.4, y: -0.5, z: 0.5 },
      //   { shape: 'box', width: 2.4, height: 0.6, depth: 0.4, z: -0.4, y: 0.2 },
      //   { shape: 'sphere', radius: 0.65, z: -0.25, y: 0.35 },
      //   { shape: 'box', width: 1.5, height: 0.8, depth: 1, y: 0.2, z: 0.2 }
      // ]
      // this.physics.add.existing(box, { compound })


      // let box2 = this.physics.add.box({x:-3, z: -6})
      // box2.body.applyForceZ(15)
    }

    update() {



      if(state == "loaded"){
        let batL = this.scene.getObjectByName("rubber")
        //  let batR = this.scene.getObjectByName("bat_right")
        if (actions.l == 1){
          // console.log(batL)
          //  let old = batL.rotation.y
          if(batL.rotation.y < Math.PI/6){
            batL.rotation.y += rotationSpeed //THREE.Math.degToRad(30)
            batL.body.needUpdate = true //old != batL.rotation.y
            console.log(batL.rotation.y)
          }
        }else{
          //let old = batL.rotation.y
          if(batL.rotation.y > -Math.PI/6){
            batL.rotation.y -= rotationSpeed //THREE.Math.degToRad(-30)
            batL.body.needUpdate = true // old != batL.rotation.y
            console.log(batL.rotation.y)
          }


        }
        if( actions.d == 1){
          let ball = this.physics.add.sphere(
            {name: "sphere2",
            x:-2.7, y: 4, radius : 0.5,
            mass: 1,
            collisionFlags: 0
          },
          { lambert: { color: 0xff0000 }} )
          ball.body.setBounciness(.75)
        }
        // if (actions.r == 1){
        //   // let old = batR.rotation.y
        //   batR.rotation.y = Math.PI - THREE.Math.degToRad(30)
        //   batR.body.needUpdate = true //= old != batR.rotation.y
        // }else{
        //   // let old = batR.rotation.y
        //   batR.rotation.y = Math.PI - THREE.Math.degToRad(-30)
        //   batR.body.needUpdate = true //= old != batR.rotation.y
        //   //  console.log(batR.rotation.y)
        // }
      }
    }



  }

  keyboard.watch.down( keyCode => {
    switch (keyCode) {
      case 'ArrowLeft':
      // flipoL.flip()
      actions.l = 1
      break;
      case 'ArrowRight':
      // flipoR.flip()
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

  async function loadParts(ctx, parts){
    let count = parts.length
    for (let p of parts){
      console.log("loading", p.name)

      loader.load(
        '../stl/'+p.file+'.stl',
        function (geometry) {
          const part = new ExtendedMesh(geometry, ctx.colors["mat1"])
          //part.position.y -= 1
          console.log(part)
          let object = new ExtendedObject3D()
          object.add(part)

          p.position != undefined ? object.position.set(p.position.x, p.position.y, p.position.z) : ""
          //  p.rotation != undefined ? object.rotation.set(p.rotation.x, p.rotation.y, p.rotation.z) : ""
          ctx.scene.add(object)
          ctx.physics.add.existing(object, {shape: p.shape})
          object.body.setCollisionFlags(2)

          object.name = p.name
          object.mass = 100
          object.body.setBounciness(.75)

        },
        (xhr) => {
          let progress = xhr.loaded / xhr.total
          console.log(progress * 100 + '% loaded')
          if(progress == 1){

            if (count == 1){
              console.log("Parts are loaded")
              state = "loaded"
              // ctx.physics.add.sphere(
              //   {x:-2.7,
              //      radius : 0.5/*, mass: 10*/
              //    }, { lambert: { color: 0x00ff00 }} )
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
