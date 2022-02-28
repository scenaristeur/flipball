import { Project, Scene3D, PhysicsLoader, THREE, ExtendedObject3D, ExtendedMesh } from 'enable3d'
import { Keyboard } from '@yandeu/keyboard'
const keyboard = new Keyboard()
let actions = {l: 0, r: 0, u: 0, d: 0 }
let tube_ext, tube_int
// let flipL
// let right_pivot, axeL, flip, sphere2, pivot, pale

class MainScene extends Scene3D {
  box!: ExtendedObject3D

  constructor() {
    super({ key: 'MainScene' })
    keyboard.watch.down(keyCode => {
      console.log('down', keyCode)
    })
  }

  init() {
    console.log('init')
    this.renderer.setPixelRatio(1)
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  preload() {
    console.log('preload')
  }

  create() {
    console.log('create')
    // set up scene (light, ground, grid, sky, orbitControls)
    this.warpSpeed()
    // enable physics debug
    this.physics.debug?.enable()
    // position camera
    this.camera.position.set(0, 15, 25)


    let mat1 = this.add.material({ lambert: { color: 'yellow', transparent: true, opacity: 0.5 } })
    let mat2 = this.add.material({ lambert: { color: 'blue', transparent: true, opacity: 0.5 } })
    let mat3 = this.add.material({ lambert: { color: 'green', transparent: true, opacity: 0.5 } })

    const slider = x => {
      tube_ext = this.physics.add.cylinder(
        { height: 6, y: 2, x: x, radiusTop: 0.6, radiusBottom: 0.6, collisionFlags: 6, mass: 100 },
        { custom: mat1 }
      )

      tube_ext.rotation.z += Math.PI /2
      tube_ext.body.needUpdate = true

      tube_int = this.physics.add.cylinder(
        { height: 4, y: 2, x: x, radiusTop: 0.4, radiusBottom: 0.4, collisionFlags: 4, mass: 1 },
        { custom: mat2 }
      )
      this.physics.add.constraints.slider(tube_ext.body, tube_int.body, {
        frameA: { x: Math.PI / 2, y: 0, z: 0 },
        frameB: { x: Math.PI / 2, y: 0, z: 0 },
        linearLowerLimit: -5,
        linearUpperLimit: 5
      })

      let plot = this.physics.add.cylinder(
        { height: 4, y: 2, x: x-6,
          radiusTop: 0.4, radiusBottom: 0.4,
          collisionFlags: 4, mass: 0 },
          { custom: mat3 }
        )

        const linearLowerLimit = { x: -100, y: -100, z: -100 }
        const linearUpperLimit = { x: 100, y: 100, z: 100 }
        this.physics.add.constraints.spring(tube_int.body, plot.body, {
          damping: 20,
          linearLowerLimit,
          linearUpperLimit
        })



        //this.tube_ext = box1 // we rotate this box in update()
      }

      slider(-3)
    }


    update() {

      if (actions.l == 1){

      }
      if (actions.r == 1){
      }
      if (actions.u == 1){
        flip(tube_int)
      }
      if (actions.d == 1){
      }
    }



  }


  function flip(f){
    f.body.applyImpulse({x:100, y: 0, z: 0}, {x:0, y:0, z: 0})

    // console.log(f.body.angularVelocity)
    // //f.body.setAngularVelocityZ(2)
    // f.body.applyImpulse({x:0, y: 0, z: -20}, {x:f.body.position.x, y:f.body.position.y, z: f.body.position.z})
    // console.log(f.body.angularVelocity)
    // f.body.applyCentralImpulse({x:0.2, y: 0, z: -0.2})

  }

  function back(f){

    //  f.body.applyImpulse({x:0, y: 0, z: 20}, {x:0, y:0, z: 0})

  }

  keyboard.watch.down( keyCode => {
    switch (keyCode) {
      case 'ArrowLeft':
      actions.l = 1
      //flip(flipL)
      break;
      case 'ArrowRight':
      actions.r = 1
      break;
      case 'ArrowUp':
      actions.u = 1
      flip(tube_int)
      break;
      case 'ArrowDown':
      actions.d = 1

      break;
    }
    //  console.log(actions)
  })
  keyboard.watch.up( keyCode => {
    switch (keyCode) {
      case 'ArrowLeft':
      actions.l = 0
      //  back(flipL)
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
    //  console.log(actions)
  })



  PhysicsLoader('/ammo', () => new Project({ scenes: [MainScene], antialias: true }))
