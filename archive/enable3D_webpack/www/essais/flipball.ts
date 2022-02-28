import { Project, Scene3D, PhysicsLoader, THREE, ExtendedObject3D, ExtendedMesh } from 'enable3d'
import { Keyboard } from '@yandeu/keyboard'
const keyboard = new Keyboard()
let actions = {l: 0, r: 0, u: 0, d: 0 }
// let sphere2, axe, flip, const1
// let boxT, axeL, flipLBis
//let table = {}, flipL = {}, flipR = {}, sphere2 = {}
// let touches_actions =
let axeL, flip, flipL, cylinderL, box2

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




    let table = this.add.box({name: "table",width: 10, depth: 20, mass: 0, collisionFlags: 1})

    // axeL = this.add.cylinder({x: -5,y:1, height: .3, mass:0, collisionFlags: 1})
    // let flip = this.add.box({y:1, z:5, depth:10})
    // axeL.add(flip)
    // table.add(axeL)
    this.physics.add.existing(table)
    // this.physics.add.existing(axeL)
    // this.physics.add.constraints.fixed(ground.body, table.body)


    let ball1 = this.physics.add.sphere({name:"ball1",y:4})
    let ball2 = this.physics.add.sphere({name: "ball2",y:5})

    let box1 = this.add.box({name:"box1_composee_sphere3", x: 0, y: 2 })
    let sphere3 = this.add.sphere({name: "sphere3 dans box1", radius: 0.5, x: 0.25, y: 0.5 }) // relative position to box1
    box1.add(sphere3)
    this.physics.add.existing(box1)

    axeL = this.add.cylinder({name: "axelL_gros_bas",x: -3, z: 6, y:2})
    table.add(axeL)
    this.physics.add.existing(axeL)
    axeL.body.setCollisionFlags(2)
    // this.physics.add.constraints.fixed(table.body, axeL.body)
    //console.log(axeL)

    flip = this.add.box({name: "flip_fin_enab", depth: 0.25, width:4 , /*, z: 1, x: x + 1.25*/ })
    axeL.add(flip)
    this.physics.add.existing(flip)


    this.physics.add.constraints.hinge(axeL.body, flip.body, {
      pivotA: { y:1 },
     pivotB: { x: 1,  y: 1 },
      axisA: { y: 1 },
      axisB: { y: 1 }
    })


    var geometryCyl = new THREE.CylinderGeometry( .1, .1, 1, 8 );
    //Yellow
    var materialCyl = new THREE.MeshBasicMaterial( {color: 0xffff00} );
    cylinderL = new ExtendedMesh( geometryCyl, materialCyl );
    // var cylinderR = new ExtendedMesh( geometryCyl, materialCyl );
    table.add( cylinderL );
cylinderL.name = "cylindreL_jaune"
    cylinderL.position.x = -3
   cylinderL.position.y = 1
    // cylinderL.position.z = 1
    // cylinderL.rotation.x = (<any>THREE).Math.degToRad(90)

    const geometryFlip = new THREE.BoxGeometry(3,.5,.5);
    const materialFlip = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    flipL = new ExtendedMesh( geometryFlip, materialFlip );
    flipL.name = "flipL_vert"
    // const flipR = new ExtendedMesh( geometryFlip, materialFlip );
    //cylinderL.add( flipL )


    flipL.position.x = .6
    // cylinderR.add( flipR )
    this.physics.add.existing(cylinderL)
    this.physics.add.existing(flipL)
//  cylinderL.body.setCollisionFlags(2)
    this.physics.add.constraints.fixed(table.body, cylinderL.body)

    // flipL.body.setCollisionFlags(1) // make it kinematic
    // physics.add.existing(flipR as any)
    // flipR.body.setCollisionFlags(2) // make it kinematic
    this.physics.add.constraints.hinge(cylinderL.body, flipL.body, {
      pivotA: { y:1 },
     pivotB: { x: 1,  y: 1 },
      axisA: { y: 1 },
      axisB: { y: 1 }
    })

    // flipL.position.y = -5
    // flipL.position.z = 1
    let mat1 = this.add.material({ lambert: { color: 'yellow', transparent: true, opacity: 0.5 } })
       let mat2 = this.add.material({ lambert: { color: 'blue', transparent: true, opacity: 0.5 } })
       let mat3 = this.add.material({ lambert: { color: 'green', transparent: true, opacity: 0.5 } })

    const hinge = x => {
          let box1 = this.physics.add.box({ depth: 0.25, y: 5, z: 0, x: x, mass: 0 }, { custom: mat1 })
          box2 = this.physics.add.box({ depth: 0.25, y: 5, z: 0.5, x: x + 1.25 }, { custom: mat2 })
          let box3 = this.physics.add.box({ depth: 0.25, y: 5, z: 1, x: x + 1.25 }, { custom: mat3 })

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

               //this.box = box2 // we rotate this box in update()
        }

     hinge(-2)

  }


  update() {
    // flip.rotation.y += 0.02
    // flip.body.needUpdate = true
    //
    // cylinderL.rotation.y += 0.01
    // cylinderL.needUpdate = true
    box2.rotation.x += 0.1
      box2.body.needUpdate = true

    if (actions.l == 1){

      box2.rotation.x += 0.1
        box2.body.needUpdate = true
    //  console.log(this)
      //console.log(flip.body)
      //flip.body.rotation.z(2)//
      // flip.body.applyForceX(10)

    //  cylinderL.rotation.y += 0.1
      //cylinderL.needUpdate = true
      // rotateAboutPoint(flip, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 1, 0), (<any>THREE).Math.degToRad(30))

      //console.log(flipL)
      //rotateAboutPoint(flipL, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 1, 0), (<any>THREE).Math.degToRad(30))
      //flipL.needUpdate = true
      //rotateAboutPoint(flipL, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 1, 0), (<any>THREE).Math.degToRad(30))

      // flip.rotation.x += 0.01
      //        flip.body.needUpdate = true

      //flip.body.setAngularVelocityZ(-2)

    }
    if (actions.r == 1){
      //console.log(axeL.body.rotation)
      // rotateAboutPoint(flip, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 1, 0), (<any>THREE).Math.degToRad(-30))

      //  rotateAboutPoint(flip, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 1, 0), (<any>THREE).Math.degToRad(-30))
    //  rotateAboutPoint(flipL, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 1, 0), (<any>THREE).Math.degToRad(-30))
    //  flipL.needUpdate = true
      //flip.body.rotation.z(-2)
      // flip.body.applyForceX(-10)
      //cylinderL.rotation.y -= 0.1
      //cylinderL.needUpdate = true
      // axeL.rotation.x += 0.03
      // axeL.needUpdate = true
    }
    if (actions.u == 1){
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
     rotateAboutPoint(flipL, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 1, 0), (<any>THREE).Math.degToRad(30))

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
    rotateAboutPoint(flipL, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 1, 0), (<any>THREE).Math.degToRad(-30))
flipL.needUpdate = true
    //rotateAboutPoint(flipLBis, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 1, 0), (<any>THREE).Math.degToRad(-30))
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
