
// import config from '../tables/test/config.json'

// import { CustomCurveObstacle } from './customCurveObstacle'

export class Obstacles  {
  constructor( scene ) {
    console.log("obstacles")
    this.buildObstacles(scene)
    this.buildHinge(scene)
  }

  buildObstacles(ctx){
    ctx.config.obstacles.forEach(o => {
      console.log(o)
      if (o.actif != true) return
      switch (o.type) {
        case "box":
        this.buildBoxObstable(ctx, o)
        break;
        // case "custom_sin_curve":
        // console.log("CCC")
        // new CustomCurveObstacle({ctx: ctx, o: o})
        // break;

        default:
        break;
      }
    })


  }

  buildHinge(ctx){

    const hinge = (x, y) => {
         let box1 = ctx.physics.add.box({ depth: 0.25, y: y, z: 0, x: x, mass: 0,  }, { custom: ctx.colors.mat1 })
         let box2 = ctx.physics.add.box({ depth: 0.25,  }, { custom: ctx.colors.mat2 })
         let box3 = ctx.physics.add.box({ depth: 0.25, width: 3, mass: 2,  collisionFlags: 0 }, { custom: ctx.colors.mat3 })



         ctx.physics.add.constraints.hinge(box1.body, box2.body, {
           pivotA: { y: -1 }, // -0.65
           pivotB: { y: 0.3 }, //0.65
           axisA: { x: 1 },
           axisB: { x: 1 }
         })
         ctx.physics.add.constraints.hinge(box2.body, box3.body, {
           pivotA: { y: -1.3 }, //-0.65
           pivotB: { y: 0 }, //0.65
           axisA: { x: 1 },
           axisB: { x: 1 }
         })



           box3.body.on.collision((otherObject, event) => {
console.log(otherObject, event)
             // if (otherObject.name !== 'ground') {
             //   // console.log('blueBox collided with another object than the ground')
             //   // console.log(otherObject, event)
             //   if (event == "start"){
             //     console.log("collision", otherObject.uuid)
             //
             //     ctx.score += o.onCollision.score
             //     console.log(ctx.score)
             //
             //     // score+=1
             //     // loadText("Score : "+score)
             //     // audio.play();
             //   }
             // }
           })


       }

        hinge(-2, 3.5)
  }

  buildBoxObstable(ctx,o){

    let obstacle = ctx.physics.add.box(
      {
        name: o.name,
        x: o.position.x,
        y: o.position.y,
        z: o.position.z,
        width: o.width,
        depth: o.depth,
        height: o.height,
        collisionFlags: o.collisionFlags
      }
      , { lambert: { color: o.color, transparent: true, opacity: o.opacity || 0.9 } }
    )
    obstacle.rotation.set(o.rotation.x, o.rotation.y, o.rotation.z)
    obstacle.body.needUpdate = true
    if(ctx.debug) console.log(o, obstacle)

    if (o.onCollision != undefined){

      obstacle.body.on.collision((otherObject, event) => {

        if (otherObject.name !== 'ground') {
          // console.log('blueBox collided with another object than the ground')
          // console.log(otherObject, event)
          if (event == "start"){
            console.log("collision", otherObject.uuid)
            if(o.onCollision != undefined){
            ctx.score += o.onCollision.score
            console.log(ctx.score)
          }
            // score+=1
            // loadText("Score : "+score)
            // audio.play();
          }
        }
      })
    }
  }
}
