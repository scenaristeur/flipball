export { Flipo }
import { THREE, ExtendedMesh, ExtendedObject3D } from 'enable3d'
class Flipo extends ExtendedObject3D{

  constructor(config) {
    super(config)
    let scene = config.scene
    let sens = config.direction ==  "right" ? 1 : -1
    // let box1 = config.scene.add.box({ x: 0, y: 2 })
    // let group = new THREE.Group()
    // const body = scene.add.box({ height: 0.8, y: 1, width: 0.4, depth: 0.4 }, { lambert: { color: 0xffff00 } })
    // const head = scene.add.sphere({ radius: 0.25, y: 1.7, z: 0.05 }, { lambert: { color: 0xffff00 } })
    // group.add(body, head)
    // group.position.setX(-3)
    // scene.add.existing(group)
    // scene.physics.add.existing(group)

    let colider = new THREE.Group()
    // let socle = scene.add.box({
    //   name: "socle",
    //   //height: 1,
    //   //  width: 3,
    //   mass: 1000
    // })
    this.tube_ext = scene.physics.add.cylinder(
      {name: "tube_ext",
      height: 0.01,
      x: config.position.x,
      y: config.position.y,
      z: config.position.z,
      radiusTop: 0.5,
      radiusBottom: 0.5,
      collisionFlags: 6,
      mass: 100
    },
    { custom: config.colors.mat1 }
  )

  this.tube_int = scene.physics.add.cylinder(
    {
      name: "tube_int",
      height: 0.1,
      x: config.position.x,
      y: config.position.y,
      z: config.position.z,
      radiusTop: 0.2,
      radiusBottom: 0.2,
      collisionFlags: 4,
      mass: 1
    },
    { custom: config.colors.mat2 }
  )

  this.tube_ext.rotation.x -= Math.PI /2
  this.tube_ext.body.needUpdate = true



  scene.physics.add.constraints.slider(this.tube_ext.body, this.tube_int.body, {
    frameA: { x: Math.PI / 2, y: 0, z: 0 },
    frameB: { x: Math.PI / 2, y: 0, z: 0 },
    linearLowerLimit: 1,
    linearUpperLimit: 2
  })


  const linearLowerLimit = { x: -100, y: -100, z: -100 }
  const linearUpperLimit = { x: 100, y: 100, z: 100 }
  scene.physics.add.constraints.spring(
    this.tube_int.body, this.tube_ext.body, {
      damping: 250,
      linearLowerLimit,
      linearUpperLimit
    })




    let plot = scene.physics.add.sphere(
      {
        radius: 0.1,
        x: config.position.x+sens,
        y: config.position.y,
        z: config.position.z-3.2,
        mass: 0 },
        { custom: config.colors.mat1 }
      )

      let flip = scene.physics.add.box(
        {
          depth: 0.25,
          height: 1,
          width: 2,
          x: config.position.x+sens,
          y: config.position.y,
          z: config.position.z-3,
        },
        { custom: config.colors.mat2 }
      )
      scene.physics.add.constraints.hinge(plot.body, flip.body, {
        pivotA: { x: 0 },
        pivotB: { x: 1 },
        axisA: { y: 1 },
        axisB: { y: 1 }
      })


      let joint = scene.physics.add.box(
        {
          depth: 0.25,
          height: 0.25,
          width: 1,
          // x: config.position.x,
          // y: config.position.y,
          // z: config.position.z-2,
        },
        { custom: config.colors.mat1 }
      )

      scene.physics.add.constraints.hinge(this.tube_int.body, joint.body, {
        pivotA: { y: .1 },
        pivotB: { x: .75 },
        axisA: { z: 1 },
        axisB: { y: 1 }
      })

      scene.physics.add.constraints.hinge(flip.body, joint.body, {
        pivotA: { x: -1, z: sens/2 },
        pivotB: { x: -0 },
        axisA: { y: 1 },
        axisB: { y: 1 }
      })

      // tube_ext.position.set(10, 10, 0)
      // tube_ext.rotation.set( Math.PI / 2, 0, 0)


      //  tube_ext.rotation.x += Math.PI /2
      //  tube_ext.body.needUpdate = true

       // colider.add( this.tube_ext, this.tube_int, plot, flip, joint)
      // colider.position.setX(config.position.x)
      // colider.position.setY(config.position.y)
      // colider.position.setZ(config.position.z)
       // colider.rotation.set( 0, sens* Math.PI / 4, 0)
       // colider.needUpdate = true
      //
      //
      // scene.add.existing(colider)
      // scene.physics.add.existing(colider)

      // extend object : https://enable3d.io/docs.html#extended-threejs-objects
      // this.physics = this.config.physics

      // Object.assign(this, config)
      // this.colider = colider
      // console.log(this)
    }
    flip(){
      // console.log("colider", this.colider)
      // console.log(this.colider.getObjectByName("tube_int"))
      // this.colider.getObjectByName("tube_int").body.applyImpulse({x:0, y: 0, z: -100}, {x:0, y:0, z: 0})
      this.tube_int.body.applyImpulse({x:0, y: 0, z: -100}, {x:0, y:0, z: 0})
    }
  }
