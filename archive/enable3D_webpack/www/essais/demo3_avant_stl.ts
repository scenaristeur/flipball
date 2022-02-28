import { Project, Scene3D, PhysicsLoader, THREE, ExtendedObject3D, ExtendedMesh } from 'enable3d'
import { Keyboard } from '@yandeu/keyboard'

import { Flipo } from './flipo'
const keyboard = new Keyboard()
let camera
let flipoL, flipoR, wallrescueRight, wallrescueLeft, ball, sphere2
let actions = {l: 0, r: 0, u: 0, d: 0 }

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
    // this.physics.debug?.enable()
    this.camera.position.set(-0, 10, 14)//(0, 30, 0)//(0, 15, 25)
    camera = this.camera


    let colors = {
      mat1 : this.add.material({ lambert: { color: 'yellow', transparent: true, opacity: 0.5 } }),
      mat2: this.add.material({ lambert: { color: 'blue', transparent: true, opacity: 0.5 } }),
      mat3: this.add.material({ lambert: { color: 'green', transparent: true, opacity: 0.5 } }),
    }

    flipoL = new Flipo(
      {
        physics: this.physics,
        position: {x: -2, y: 0.5, z: 10},
        direction: "left",
        colors: colors,
        scene: this
      }
    )

    flipoR = new Flipo(
      {
        physics: this.physics,
        position: {x: 2, y: 0.5, z: 10},
        direction: "right",
        colors: colors,
        scene: this
      }
    )

    ball = this.physics.add.sphere({
      //x: 1,
      // y: 1,
      x:-5,
      y:1,
      z:-4,

      radius: 0.5
    })

    sphere2 = this.physics.add.sphere(
      {name:"sphere2", x: 5, z: -6, y: 2, mass: 1 },
      {lambert: {color: 'red'}}
      //{ lambert: { color: 'red',  emissive: 0x888888, roughness: 0.4, metalness: 1 } }
    )
    sphere2.body.setBounciness(.2)

    let wallLeft = this.physics.add.box(
      { x: -10, y: 2, width: 1, height: 4, depth: 21, mass: 0, collisionFlags: 2 },
      { lambert: { color: 'red', transparent: true, opacity: 0.2 } }
    )
    let wallRight = this.physics.add.box(
      { x: 10, y: 2, width: 1, height: 4, depth: 21, mass: 0, collisionFlags: 2 },
      { lambert: { color: 'red', transparent: true, opacity: 0.2 }}
    )
    let wallTop = this.physics.add.box(
      { z: -10, y: 3, width: 19, height: 6, depth: 1, mass: 0, collisionFlags: 2 },
      { lambert: { color: 'red', transparent: true, opacity: 0.2 }}
    )
    let wallBottom = this.physics.add.box(
      { z: 10, y: .5, width: 19, height: 3, depth: 1, mass: 0, collisionFlags: 2 },
      { lambert: { color: 'red', transparent: true, opacity: 0.2 }}
    )

    wallLeft.body.setBounciness(1)
    wallTop.body.setBounciness(1)
    wallRight.body.setBounciness(1)
    wallBottom.body.setBounciness(1)


    wallrescueLeft = this.physics.add.box(
      {x: -6.5,
        z: 5,
        y: .5,
        width: 7,
        height: 1,
        depth: 0.25,
        mass: 0,
        collisionFlags: 2
      },
      { lambert: { color: 'green', transparent: true, opacity: 0.2 }}
    )
    wallrescueRight = this.physics.add.box(
      {x: 6.5,
        z: 5,
        y: .5,
        width: 7,
        height: 1,
        depth: 0.25,
        mass: 0,
        collisionFlags: 2
      },
      { lambert: { color: 'green', transparent: true, opacity: 0.2 }}
    )

    wallrescueRight.rotation.y = 0.4
    wallrescueRight.body.needUpdate = true

    wallrescueLeft.rotation.y = -0.4
    wallrescueLeft.body.needUpdate = true
    // wallrescueRight.rotation.set( 0, Math.PI / 2, 0
    // wallrescueRight.body.needUpdate = true

  }

  update() {

    if (actions.l == 1){
      flipoL.flip()
    }
    if (actions.r == 1){
      flipoR.flip()
    }
    // wallrescueRight.rotation.set( 0, Math.PI / 2, 0
    if (ball.position.z > 8){
      ball.body.applyImpulse({x:1, y: 1, z: -20}, {x:0, y:0, z: 0})
    }
    if (sphere2.position.z > 8){
      sphere2.body.applyImpulse({x:-1, y: 1, z: -20}, {x:0, y:0, z: 0})
    }
  }
}

keyboard.watch.down( keyCode => {
  switch (keyCode) {
    case 'ArrowLeft':
    flipoL.flip()
    actions.l = 1
    break;
    case 'ArrowRight':
    flipoR.flip()
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

PhysicsLoader('/ammo', () => new Project({ gravity: { x: 0, y: -9.81, z: 5}, scenes: [MainScene], antialias: true }))
