export class Ball  {
  constructor( ctx ) {
    console.log("ball")
    let ccd_threshold_ball = 1
    let ccd_radius_ball = 0.2

    if (ctx.ball == null || ctx.config.ball_number != undefined){
    //  console.log(ctx.config.launcher)
      ctx.ball = ctx.physics.add.sphere(
        {
          x: Number(ctx.config.launcher.position.x),//9,//7,//-1.7,
          y: Number(ctx.config.launcher.position.y)+.05,
          z: Number(ctx.config.launcher.position.z)-2,//-8,
          radius : 0.3,
          mass: 0.4,  //0.3,
          name: "ball"
          // collisionFlags: 0
        },
        { standard: { emissive: 0x11BCDA, roughness: 0.4, metalness: 1 }
        // { lambert: { color: 0x00ff00 }
      }
    )
    // motion clamping https://enable3d.io/docs.html#collisions
    ctx.ball.body.setCcdMotionThreshold(ccd_threshold_ball)
    ctx.ball.body.setCcdSweptSphereRadius(ccd_radius_ball)
    // ctx.ball.body.setBounciness(1)
  //  console.log("new Ball", ctx.ball)
  }
}

}
