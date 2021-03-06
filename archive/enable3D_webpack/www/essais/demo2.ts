import { Project, Scene3D, PhysicsLoader, THREE, ExtendedObject3D, ExtendedMesh } from 'enable3d'
import { Keyboard } from '@yandeu/keyboard'

import { Flip } from './flip'
import { Flipo } from './flipo'
const keyboard = new Keyboard()
let actions = {l: 0, r: 0, u: 0, d: 0 }
let tube_ext, tube_int, axe
let camera
let fliperL, fliperR, flipoL, flipoR
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
    this.camera.position.set(0, 30, 0)//(0, 15, 25)
    // this.camera.rotation.set(-1.5, 0, -2.3)
    camera = this.camera

    let colors = {
      mat1 : this.add.material({ lambert: { color: 'yellow', transparent: true, opacity: 0.5 } }),
      mat2: this.add.material({ lambert: { color: 'blue', transparent: true, opacity: 0.5 } }),
      mat3: this.add.material({ lambert: { color: 'green', transparent: true, opacity: 0.5 } }),
    }

    fliperL = new Flip(
      {
        physics: this.physics,
        position: {x: -5, y: 2, z: 10},
        direction: "left",
        colors: colors,
        scene: this
      })

      fliperR = new Flip(
        {
          physics: this.physics,
          position: {x: 8, y: 2, z: 1},
          direction: "right",
          colors: colors,
          scene: this
        }
      )

      flipoL = new Flipo(
        {
          physics: this.physics,
          position: {x: -3, y: 1, z: 0},
          direction: "left",
          colors: colors,
          scene: this
        }
      )

    //  flipoL.rotation.set( 0, Math.PI / 4, 0)


      flipoR = new Flipo(
        {
          physics: this.physics,
          position: {x: 3, y: 1, z: 0},
          direction: "right",
          colors: colors,
          scene: this
        }
      )

      // flipoL.position.set(10, 10, 0)
      // flipoL.rotation.set(0, Math.PI / 2, 0)

    }


    update() {

      if (actions.l == 1){
        fliperL.flip()
      //
      }
      if (actions.r == 1){
        fliperR.flip()
      }
      if (actions.u == 1){
        //  flip(tube_int)
      }
      if (actions.d == 1){
      }
    }



  }


  keyboard.watch.down( keyCode => {

    switch (keyCode) {
      case 'ArrowLeft':
      actions.l = 1
      fliperL.flip()
       flipoL.flip()
      //flip(flipL)
      break;
      case 'ArrowRight':
      actions.r = 1
      fliperR.flip()
      flipoR.flip()
      break;
      case 'ArrowUp':
      actions.u = 1
      //  flip(tube_int)
      break;
      case 'ArrowDown':
      actions.d = 1
      break;
      case 'Space':
      console.log(camera)

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
