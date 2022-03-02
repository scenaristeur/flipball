export class Walls  {
  // table
  // walls
  constructor( scene ) {
    //this.buildTable(scene,config)
    this.buildWalls(scene)
  }

  // buildTable(ctx, config){
  //   let t = config.table
  //   this.table = ctx.add.plane(
  //     {
  //       width: t.width,
  //       height: t.height,
  //       mass: t.mass,
  //       collisionFlags: t.collisionFlags
  //     }
  //     , { lambert: { color: t.color, transparent: true, opacity: 0.5 } }
  //   )
  //   this.table.rotation.set(t.rotation.x, t.rotation.y, t.rotation.z)
  // }

  buildWalls(ctx){
    ctx.config.walls.forEach(w => {

      let wall = ctx.physics.add.box(
        {
          name: w.name,
          x: w.position.x,
          y: w.position.y,
          z: w.position.z,
          width: w.width,
          depth: w.depth,
          height: w.height,
          collisionFlags: w.collisionFlags
        }
        , { lambert: { color: w.color, transparent: true, opacity: 0.9 } }
      )
      wall.rotation.set(w.rotation.x, w.rotation.y, w.rotation.z)
      wall.body.needUpdate = true
      if(ctx.debug) console.log(w,wall)

    });

  }



}
