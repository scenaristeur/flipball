export { Flip }

class Flip {

  constructor(config) {
    // extend object : https://enable3d.io/docs.html#extended-threejs-objects
    // this.physics = this.config.physics

    Object.assign(this, config)

    // const fliper = config => {
    this.tube_ext = this.physics.add.cylinder(
      { height: 6,
        y: config.position.y,
        x: config.position.x,
        z: config.position.z,
        radiusTop: 0.6,
        radiusBottom: 0.6,
        collisionFlags: 6,
        mass: 100 },
        { custom: config.colors.mat1 }
      )

      this.tube_ext.rotation.x += Math.PI /2
      this.tube_ext.body.needUpdate = true

      this.tube_int = this.physics.add.cylinder(
        { height: 18,
          y: config.position.y,
          x: config.position.x,
          z: config.position.z,
          radiusTop: 0.4,
          radiusBottom: 0.4, collisionFlags: 4, mass: 1 },
          { custom: config.colors.mat2 }
        )
        this.physics.add.constraints.slider(this.tube_ext.body, this.tube_int.body, {
          frameA: { x: Math.PI / 2, y: 0, z: 0 },
          frameB: { x: Math.PI / 2, y: 0, z: 0 },
          linearLowerLimit: 3,
          linearUpperLimit: 5

        })

        let plot_ressort = this.physics.add.cylinder(
          { height: 3,
            y: config.position.y,
            x: config.position.x,
            z: config.position.z+6,
            radiusTop: 0.4, radiusBottom: 0.4,
            collisionFlags: 4, mass: 0 },
            { custom: config.colors.mat3 }
          )



          const linearLowerLimit = { x: -100, y: -100, z: -100 }
          const linearUpperLimit = { x: 100, y: 100, z: 100 }
          this.physics.add.constraints.spring(
            this.tube_int.body, plot_ressort.body, {
              damping: 250,
              linearLowerLimit,
              linearUpperLimit
            })

            let sens = config.direction ==  "right" ? 1 : -1
            console.log(sens)

            let plot = this.physics.add.box(
              { depth: 0.25,
                y: 2,
                z: config.position.z-5,
                x: config.position.x+sens*3,
                mass: 0 },
                { custom: config.colors.mat1 }
              )


              let flip = this.physics.add.box(
                { depth: 0.25, width: 5,
                  y: config.position.y,
                  z: config.position.z-5,
                  x: config.position.x+sens*6.25 },
                  { custom: config.colors.mat2 }
                )
                this.physics.add.constraints.hinge(plot.body, flip.body, {
                  pivotA: { x: 0 },
                  pivotB: { x: sens*3 },
                  axisA: { y: 1 },
                  axisB: { y: 1 }
                })


                // let flop = this.physics.add.box(
                //   { depth: 0.25, width: 2,
                //     y: config.position.y,
                //     z: config.position.z-5,
                //     x: config.position.x+sens*6.25 },
                //     { custom: config.colors.mat2 }
                //   )
                //
                //
                //   this.physics.add.constraints.hinge(flop.body, flip.body, {
                //     pivotA: { y: -2 },
                //     pivotB: { y: 2 },
                //     axisA: { x: 1 },
                //     axisB: { y: 1 }
                //   })
                //
                //
                // this.physics.add.constraints.hinge(this.tube_int.body, flip.body, {
                //   pivotA: { y: 0 },
                //   pivotB: { y: 0 },
                //   axisA: { x: 1 },
                //   axisB: { y: sens*1 }
                // })


                this.physics.add.constraints.hinge(this.tube_int.body, flip.body, {
                  pivotA: { x: 0, y:-10 },
                  pivotB: { y: 0 },
                  axisA: { x: 1 },
                  axisB: { y: sens*1 }
                })


                let sphere3 = this.physics.add.sphere(
                  {name: "sphere3",
                  radius: 2,
                  x: config.position.x,
                  y: 0.5,
                  z: config.position.z-9}) // relative position to plot

                }

                flip(){
                  // console.log("flip", this)
                  this.tube_int.body.applyImpulse({x:0, y: 0, z: -100}, {x:0, y:0, z: 0})
                }

              }
