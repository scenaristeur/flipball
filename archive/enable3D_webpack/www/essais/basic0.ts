import { Project, Scene3D, PhysicsLoader, THREE, ExtendedObject3D, ExtendedMesh } from 'enable3d'
import { Keyboard } from '@yandeu/keyboard'
const keyboard = new Keyboard()
let actions = {l: 0, r: 0, u: 0, d: 0 }
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

    // let table = this.physics.add.box({name: "table",width: 21, depth: 21, mass: 0,})
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
    }
    if (actions.r == 1){
    }
    if (actions.u == 1){
    }
    if (actions.d == 1){
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
  }
  //  console.log(actions)
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
  //  console.log(actions)
})



PhysicsLoader('/ammo', () => new Project({ scenes: [MainScene], antialias: true }))
