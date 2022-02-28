
import config from '../tables/test/config.json'

// import { CustomCurveObstacle } from './customCurveObstacle'

export class Obstacles  {
  constructor( scene ) {
    console.log("obstacles")
    this.buildObstacles(scene)
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
            console.log("collision", otherObject)
            // score+=1
            // loadText("Score : "+score)
            // audio.play();
          }
        }
      })
    }
      }
}
