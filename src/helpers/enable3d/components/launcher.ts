export class Launcher  {
  // launcher_interior
  constructor( scene ) {
  console.log("launcher")
  this.buildLauncher(scene)
  this.scene = scene
  }

  buildLauncher(ctx){
    let l = ctx.config.launcher
    let x = l.position.x, y= l.position.y, z = l.position.z

    let launcher_exterior = ctx.physics.add.cylinder(
      { height: 3, y: y, x: x, z: z, radiusTop: 0.3, radiusBottom: 0.3, collisionFlags: 2, mass: 100 },
      { custom: ctx.colors["mat1"] }
    )
    let launcher_interior = this.launcher_interior = ctx.physics.add.cylinder(
      { height: 2, y: y, x: x, z: z, radiusTop: 0.2, radiusBottom: 0.2,  mass: 1 },
      { custom: ctx.colors["mat2"] }
    )
    // let launcher_top = ctx.physics.add.cylinder(
    //   { height: 0.2, y: y, x: x, z: z+2, radiusTop: 0.15, radiusBottom: 0.15, collisionFlags: 2, mass: 0.01 },
    //   { custom: ctx.colors["mat5"] }
    // )
    // ctx.physics.add.constraints.lock( launcher_interior.body, launcher_top.body)

    // const linearLowerLimit = { x: -100, y: -100, z: -100 }
    //       const linearUpperLimit = { x: 100, y: 100, z: 100 }
    //       ctx.physics.add.constraints.spring(launcher_interior.body, launcher_interior.body, {
    //         damping: 250,
    //         linearLowerLimit,
    //         linearUpperLimit
    //       })

    ctx.physics.add.constraints.slider(launcher_exterior.body, launcher_interior.body, {
      frameA: { x: Math.PI / 2, y: 0, z: 0 },
      frameB: { x: Math.PI / 2, y: 0, z: 0 },
      linearLowerLimit: -2,
      linearUpperLimit: 2
    })
    launcher_exterior.rotation.x += Math.PI/2
    launcher_exterior.body.needUpdate = true
    // launcher_top.rotation.x += Math.PI/2
    // launcher_top.body.needUpdate = true
    // launcher_interior.add(launcher_top)
    // console.log(box1,box2)


    // const launcher_bottom_wall =
     ctx.physics.add.box(
      {x: x, y: y-.3, z: z-5, width: 0.5, depth: 7, height: 0.1, collisionFlags: 2}
      , { lambert: { color: 'green', transparent: true, opacity: 0.5 } }
    )
    const launcher_right_wall = ctx.physics.add.box(
      {x: x+.35, y: y, z: z-5, width: 7, depth: 0.1, height: 0.5, collisionFlags: 2}
      , { lambert: { color: 'green', transparent: true, opacity: 0.5 } }
    )
    const launcher_left_wall = ctx.physics.add.box(
      {x: x-.35, y: y, z: z-5, width: 7, depth: 0.1, height: 0.5, collisionFlags: 2}
      , { lambert: { color: 'green', transparent: true, opacity: 0.5 } }
    )

    launcher_right_wall.rotation.y = Math.PI /2
    launcher_right_wall.body.needUpdate = true
    // box1.add(launcher_right_wall)

    launcher_left_wall.rotation.y = Math.PI /2
    launcher_left_wall.body.needUpdate = true

  }

  launch(){
    let force = this.scene.config.launcher.force || 5
    force = force*Math.random()
    this.launcher_interior.body.applyForceZ(-force)
  }

}
