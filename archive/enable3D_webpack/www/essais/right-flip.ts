import { Project, Scene3D, PhysicsLoader, THREE, ExtendedObject3D, ExtendedMesh } from 'enable3d'
import { Keyboard } from '@yandeu/keyboard'
const keyboard = new Keyboard()
let actions = {l: 0, r: 0, u: 0, d: 0 }
// let sphere2, axe, flip, const1
// let boxT, axeL, flipLBis
//let table = {}, flipL = {}, flipR = {}, sphere2 = {}
// let touches_actions =
// let axeL, flip, flipL, cylinderL,
let box1, box2, box3
let axeR, boxR
let table, axeL

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

    //  this.pinball()
    //  this.experiments()




    table = this.add.box({name: "table",width: 10, depth: 20, mass: 0, collisionFlags: 1})

    axeL = this.add.cylinder({x: -5,y:3, height: .3, mass:0, collisionFlags: 1})
    let flip = this.add.box({y:3, z:5, depth:10})
    // axeL.add(flip)
    table.add(axeL)
    this.physics.add.existing(table)
    this.physics.add.existing(axeL)
    // this.physics.add.constraints.fixed(ground.body, table.body)


    let ball1 = this.physics.add.sphere({name:"ball1", x:3,y:8, z: -3})
    let ball2 = this.physics.add.sphere({name: "ball2", x: -3, y:5, z: -3})

    let mat1 = this.add.material({ lambert: { color: 'yellow', transparent: true, opacity: 0.5 } })
    let mat2 = this.add.material({ lambert: { color: 'blue', transparent: true, opacity: 0.5 } })
    let mat3 = this.add.material({ lambert: { color: 'green', transparent: true, opacity: 0.5 } })

    const hinge = x => {
      box1 = this.physics.add.box({ depth: 0.25, y: 5, z: 0, x: x, mass: 0 }, { custom: mat1 })
      box2 = this.physics.add.box({ depth: 0.25, y: 5, z: 0, x: x + 1.25 }, { custom: mat2 })
      box3 = this.physics.add.box({ depth: 0.25, y: 5, z: 0, x: x + 1.25 }, { custom: mat3 })

      // box2 = this.physics.add.box({ depth: 0.25, y: 5, z: 0.5, x: x + 1.25 }, { custom: mat2 })
      // box3 = this.physics.add.box({ depth: 0.25, y: 5, z: 1, x: x + 1.25 }, { custom: mat3 })

      this.physics.add.constraints.hinge(box1.body, box2.body, {
        pivotA: { y: -0.65 },
        pivotB: { y: 0.65 },
        axisA: { x: 1 },
        axisB: { x: 1 }
      })
      this.physics.add.constraints.hinge(box2.body, box3.body, {
        pivotA: { y: -0.65 },
        pivotB: { y: 0.65 },
        axisA: { x: 1 },
        axisB: { x: 1 }
      })

      axeR = this.add.cylinder({name: "cylindreR", mass: 2,/* radius:4,*/ height: 3}, { custom: mat1 })

      this.physics.add.existing(axeR)
      // axeR.body.setCollisionFlags(3)
      console.log(axeR)
      //this.box = box2 // we rotate this box in update()
    }

    hinge(-2)

  }


  update() {
    // box2.rotation.x += 0.1
    // box2.body.needUpdate = true
    // console.log(actions)
    // console.log(box2)
    if (actions.l == 1){
      // console.log(axeR.position.y)
      // this.axe.body.applyForceY(1)
      //this.axe.body.needUpdate = true
    }
    if (actions.r == 1){

    }
    if (actions.u == 1){
      console.log("up")
      //direction , contact point
      axeR.body.applyImpulse({x:0, y: 0, z: 1}, {x:0, y:-10, z: -10})
    }
    if (actions.d == 1){
    }
  }



}

function rotateAboutPoint(obj, point, axis, theta, pointIsWorld = false){
  pointIsWorld = (pointIsWorld === undefined)? false : pointIsWorld;

  if(pointIsWorld){
    obj.parent.localToWorld(obj.position); // compensate for world coordinate
  }

  obj.position.sub(point); // remove the offset
  obj.position.applyAxisAngle(axis, theta); // rotate the POSITION
  obj.position.add(point); // re-add the offset

  if(pointIsWorld){
    obj.parent.worldToLocal(obj.position); // undo world coordinates compensation
  }
  obj.rotateOnAxis(axis, theta); // rotate the OBJECT
  console.log(obj)
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
