import { Project, Scene3D, PhysicsLoader, THREE, ExtendedObject3D, ExtendedMesh } from 'enable3d'
import { Keyboard } from '@yandeu/keyboard'
// instantiate
const keyboard = new Keyboard()
let actions = {l: 0, r: 0, u: 0, d: 0 }
let sphere2, axe, flip, const1
let boxT, cylinderL, flipLBis
//let table = {}, flipL = {}, flipR = {}, sphere2 = {}
// let touches_actions =

class MainScene extends Scene3D {
  box!: ExtendedObject3D

  constructor() {
    super({ key: 'MainScene' })
  }

  init() {
    console.log('init')

    this.renderer.setPixelRatio(1)
    this.renderer.setSize(window.innerWidth, window.innerHeight)


  }

  preload() {
    console.log('preload')
  }

  experiments(){
    // blue box
    this.box = this.add.box({ y: 2 }, { lambert: { color: 'deepskyblue' } })

    // pink box
    this.physics.add.box({ y: 10 }, { lambert: { color: 'hotpink' } })

    // green sphere
    const geometry = new THREE.SphereGeometry(0.8, 16, 16)
    const material = new THREE.MeshLambertMaterial({ color: 0x00ff00 })
    const cube = new THREE.Mesh(geometry, material)
    cube.position.set(0, 30, 0)
    this.scene.add(cube)
    // add physics to an existing object
    this.physics.add.existing(cube as any)

    boxT = this.add.box({ x: 0, y: 2 })
    let sphere3 = this.add.sphere({ radius: 0.5, x: 5, y: 0.5 }) // relative position to box1
    boxT.add(sphere3)
    this.physics.add.existing(boxT)

    let box1 = this.physics.add.box({y:1}, {phong: {color: 'green'}})
    let sphere1 = this.physics.add.sphere({y: 5}, {lambert: {color: 'yellow'}})
    // pink box (with physics)
    this.physics.add.box({ y: 10 }, { lambert: { color: 'hotpink' } })







  }

  pinball(){
    let table = this.physics.add.box({name: "table", y: 0, width: 19, depth: 19, mass:0}, {lambert: {color: 'deepskyblue'}})
    // table.rotation.set(0, 10, 0)
    // let table = this.physics.add.box({y:0, width: 19, depth: 19, , mass: 0, collisionFlags: 2 }, { lambert: { color: 'deepskyblue' } } )

    console.log(table)
    sphere2 = this.physics.add.sphere({name:"sphere2", x: -5.5, z: 5.5, y: 2, mass: 1 }, {lambert: {color: 'red'}})
sphere2.body.setBounciness(.75)
    let wallLeft = this.physics.add.box(
      { x: -10, y: 2, width: 1, height: 4, depth: 21, mass: 0, collisionFlags: 2 },
      { lambert: { color: 'red', transparent: true, opacity: 0.2 } })
      let wallRight = this.physics.add.box(
        { x: 10, y: 2, width: 1, height: 4, depth: 21, mass: 0, collisionFlags: 2 },
        { lambert: { color: 'red', transparent: true, opacity: 0.2 }})
        let wallTop = this.physics.add.box(
          { z: -10, y: 3, width: 19, height: 6, depth: 1, mass: 0, collisionFlags: 2 },
          { lambert: { color: 'red', transparent: true, opacity: 0.2 }})
          let wallBottom = this.physics.add.box(
            { z: 10, y: .5, width: 19, height: 1, depth: 1, mass: 0, collisionFlags: 2 },
            { lambert: { color: 'red', transparent: true, opacity: 0.2 }})


            //  //
            //  //
            // let flipL = this.physics.add.box({name: "flipL",x: -6, z: 8, y: 3, width: 5, mass:0}, {phong: {color: 'green'}})
            // console.log(table, flipL)
            // console.log(this.flipL)
            // this.flipR = this.physics.add.box({x: 6, z: 8, y: 1, width: 5, mass:0}, {phong: {color: 'green'}})
            // console.log(this.flipR)
            //
            // this.physics.add.constraints.hinge(table.body, flipL.body, {
            //   pivotA: { x: -6 }, //-0.65
            //   pivotB: { x: -6 }, //0.65
            //   axisA: { y: 1 },
            //   axisB: { y: 1 }
            // })


            var geometryCyl = new THREE.CylinderGeometry( .1, .1, 1, 8 );
            //Yellow
            var materialCyl = new THREE.MeshBasicMaterial( {color: 0xffff00} );
            cylinderL = new ExtendedMesh( geometryCyl, materialCyl );
            // var cylinderR = new ExtendedMesh( geometryCyl, materialCyl );
            table.add( cylinderL );
            // table.add( cylinderR );
            this.physics.add.existing(cylinderL as any)
            cylinderL.body.setCollisionFlags(1) // make it kinematic
            // physics.add.existing(cylinderR as any)
            // cylinderR.body.setCollisionFlags(2) // make it kinematic
            cylinderL.position.x = -6
            cylinderL.position.y = 1
            cylinderL.position.z = 6
            // cylinderL.rotation.x = (<any>THREE).Math.degToRad(90)

            const geometryFlip = new THREE.BoxGeometry(3,.5,.5);
            const materialFlip = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
            flipLBis = new ExtendedMesh( geometryFlip, materialFlip );
            flipLBis.position.x = 1
// flipLBis.body.setCollisionFlags(2)
            // const flipR = new ExtendedMesh( geometryFlip, materialFlip );
            cylinderL.add( flipLBis )
            cylinderL.body.setBounciness(.75)
                    this.physics.add.existing(cylinderL as any)
            // cylinderR.add( flipR )
            // this.physics.add.existing(flipLBis as any)


            let x = -2
            axe = this.physics.add.box({name: "axe", depth: 0.25, width: 0.25, y: 2, z: 0, x: x, mass: 0 })
            flip = this.physics.add.box({name: "flip", depth: 0.25, width: 4, y: 3, z: 0.5, x: x + 1.25 })
            //
            //
            const1 =   this.physics.add.constraints.hinge(axe.body, flip.body, {
              // pivotA: { x: -0.65 },
              pivotB: { x: 0.65 },
              axisA: { y: 1 },
              axisB: { y: 1 }
            })


          }


          create() {
            console.log('create')

            // set up scene (light, ground, grid, sky, orbitControls)
            this.warpSpeed()

            // enable physics debug
            this.physics.debug?.enable()

            // position camera
            this.camera.position.set(0, 15, 25)

            this.pinball()
            //  this.experiments()

          }


          update() {


            //const vtx = boxT.body.velocity.x
            //const vtz = boxT.body.velocity.z
            //  this.box.rotation.x += 0.01
            //  this.box.rotation.y += 0.01
            if (actions.l == 1){
              console.log(axe, flip)
              //this.box.rotation.y += 1
              cylinderL.rotation.y += 1
              //console.log(this.physics)
              //  this.rotateAboutPoint(flipLBis, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 1, 0), (<any>THREE).Math.degToRad(30))
              // sphere2.body.setVelocityX(vx - 1)
              //boxT.body.setVelocityX(vtx - 1)
              // console.log("flip",flip.body.velocity)
              // flip.body.velocity.x +=1
              //  this.table.rotation.y += 0.01
              // this.box.position.y += 1
            }
            if (actions.r == 1){
              console.log(axe,flip)
              //this.box.rotation.y -= 1
              cylinderL.rotation.y -= 1
              //  this.rotateAboutPoint(flipLBis, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 1, 0), (<any>THREE).Math.degToRad(-30))
              // boxT.body.rotation.y -= 1
              // console.log(this.physics)
              //  sphere2.body.setVelocityX(vx + 1)
              // boxT.body.setVelocityX(vtx + 1)
              // flip.body.velocity.x -=1
              //this.table.rotation.y -= 0.01
              // this.box.position.z += 1
            }
            if (actions.u == 1){
              // this.box.rotation.y -= 1
              // this.box.position.z += 1
              //  sphere2.body.setVelocityZ(vz - 1)
            }
            if (actions.d == 1){
              // this.box.rotation.y -= 1
              // this.box.position.z -= 1
              // sphere2.body.setVelocityZ(vz + 1)
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
        }

        keyboard.watch.down( keyCode => {
          const vx = sphere2.body.velocity.x
          const vy = sphere2.body.velocity.y
          const vz = sphere2.body.velocity.z
          console.log(keyCode)
          switch (keyCode) {
            case 'ArrowLeft':
            actions.l = 1
            //rotateAboutPoint(flipLBis, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 1, 0), (<any>THREE).Math.degToRad(30))
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
            case 'KeyQ':
            sphere2.body.setVelocityX(vx - 1)
            break;
            case 'KeyS':
            sphere2.body.setVelocityX(vx + 1)
            break;
            case 'KeyW':
            sphere2.body.setVelocityX(vz - 1)
            break;
            case 'KeyA':
            sphere2.body.setVelocityZ(vz + 1)
            break;
          }
          //  console.log(actions)
        })
        keyboard.watch.up( keyCode => {
          switch (keyCode) {
            case 'ArrowLeft':
            actions.l = 0
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
