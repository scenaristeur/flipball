import { Project, Scene3D, PhysicsLoader, THREE, ExtendedObject3D, ExtendedMesh } from 'enable3d'
import { Keyboard } from '@yandeu/keyboard'

import { Flipo } from './flipo'
const keyboard = new Keyboard()
let flipoL, flipoR

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

  create() {
    this.warpSpeed()
    // enable physics debug
    this.physics.debug?.enable()
    this.camera.position.set(0, 30, 0)//(0, 15, 25)

    let colors = {
      mat1 : this.add.material({ lambert: { color: 'yellow', transparent: true, opacity: 0.5 } }),
      mat2: this.add.material({ lambert: { color: 'blue', transparent: true, opacity: 0.5 } }),
      mat3: this.add.material({ lambert: { color: 'green', transparent: true, opacity: 0.5 } }),
    }

      flipoL = new Flipo(
        {
          physics: this.physics,
          position: {x: -2, y: 1, z: 10},
          direction: "left",
          colors: colors,
          scene: this
        }
      )

      flipoR = new Flipo(
        {
          physics: this.physics,
          position: {x: 2, y: 1, z: 10},
          direction: "right",
          colors: colors,
          scene: this
        }
      )
    }

    update() {
  }
}

  keyboard.watch.down( keyCode => {
    switch (keyCode) {
      case 'ArrowLeft':
     flipoL.flip()
      break;
      case 'ArrowRight':
      flipoR.flip()
      break;
    }
  })

  PhysicsLoader('/ammo', () => new Project({ scenes: [MainScene], antialias: true }))
