import { Project, Scene3D, PhysicsLoader, THREE, ExtendedObject3D, ExtendedMesh } from 'enable3d'
import { Keyboard } from '@yandeu/keyboard'
const keyboard = new Keyboard()
let actions = {l: 0, r: 0, u: 0, d: 0 }
let flipL
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

    let table = this.physics.add.box(
      {name: "table",width: 21, depth: 21, mass: 0,}
    )


    // let cale_g = this.physics.add.cylinder(
    //   {x: -10, y: -1,height: 5, radiusBottom: 0.4, radiusTop: 0.4,
    //     collisionFlags: 1}
    //   )
    //   table.add(cale_g)

    let pivot = this.physics.add.cylinder(
      {y: 3,height: 5, radiusBottom: 0.4, radiusTop: 0.4,
        collisionFlags: 1}
      )
      table.add(pivot)
      // table.rotation.x =0.3
      // table.body.needUpdate = true


      let blockerL1 = this.physics.add.cylinder(
        {
          x:1, y: 4, z:1, height: 3, radiusBottom: 0.2, radiusTop: 0.2,
          collisionFlags: 1
        }
      )
      pivot.add(blockerL1)


      let blockerL2 = this.physics.add.cylinder(
        {
          x:.5, y: 4, z:-1, height: 3, radiusBottom: 0.2, radiusTop: 0.2,
          collisionFlags: 1
        }
      )
      pivot.add(blockerL2)


      flipL = this.physics.add.box({x:2, y:2, width:5, mass:2})
      // flipL.body.setFriction(30)
      this.physics.add.constraints.hinge(pivot.body, flipL.body, {
        pivotA: {x:0, y:2 },
        pivotB: {x: -2.5, y:2 },
        axisA: { y: 1 },
        axisB: { y: 1 }
      })


      // this.physics.add.existing(table)
      //
      //
      // let wallLeft = this.physics.add.box(
      //   { x: -10, y: 2, width: 1, height: 4, depth: 21, mass: 0, collisionFlags: 2 },
      //   { lambert: { color: 'red', transparent: true, opacity: 0.2 } })
      //   let wallRight = this.physics.add.box(
      //     { x: 10, y: 2, width: 1, height: 4, depth: 21, mass: 0, collisionFlags: 2 },
      //     { lambert: { color: 'red', transparent: true, opacity: 0.2 }})
      //     let wallTop = this.physics.add.box(
      //       { z: -10, y: 3, width: 19, height: 6, depth: 1, mass: 0, collisionFlags: 2 },
      //       { lambert: { color: 'red', transparent: true, opacity: 0.2 }})
      //       let wallBottom = this.physics.add.box(
      //         { z: 10, y: .5, width: 19, height: 1, depth: 1, mass: 0, collisionFlags: 2 },
      //         { lambert: { color: 'red', transparent: true, opacity: 0.2 }})
      //
      //         sphere2 = this.physics.add.sphere({name:"sphere2", x: -5.5, z: 5.5, y: 2, mass: 1 }, {lambert: {color: 'red'}})


    }


    update() {

      if (actions.l == 1){
        flip(flipL)
      }else{
        back(flipL)
      }
      if (actions.r == 1){
      }
      if (actions.u == 1){
      }
      if (actions.d == 1){
      }
    }



  }


  function flip(f){
    console.log(f.body.angularVelocity)
    //f.body.setAngularVelocityZ(2)
    f.body.applyImpulse({x:0, y: 0, z: -20}, {x:f.body.position.x, y:f.body.position.y, z: f.body.position.z})
    console.log(f.body.angularVelocity)
    // f.body.applyCentralImpulse({x:0.2, y: 0, z: -0.2})

  }

  function back(f){
    //  console.log(f.body)
// console.log("---",f.body.position)
// if (f.body.position.x != 0 && f.body.position.y != -0.5 && f.body.position.z != 0){
//   console.log(f.body.position)
  f.body.applyImpulse({x:0, y: 0, z: 20}, {x:0, y:0, z: 0})
// }

    //console.log(f.body)
  }

  keyboard.watch.down( keyCode => {
    switch (keyCode) {
      case 'ArrowLeft':
      actions.l = 1
      flip(flipL)
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
    }
    //  console.log(actions)
  })
  keyboard.watch.up( keyCode => {
    switch (keyCode) {
      case 'ArrowLeft':
      actions.l = 0
      back(flipL)
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
