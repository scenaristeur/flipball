import { Project, Scene3D, PhysicsLoader, THREE, /*Loaders,*/
  ExtendedObject3D, ExtendedMesh } from 'enable3d'
  import { TextTexture, TextSprite } from '@enable3d/three-graphics/jsm/flat'

  console.log(Scene3D)
  import { Keyboard } from '@yandeu/keyboard'

  import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
  import { Launcher } from './launcher'
  // import { Ball } from './ball'
  import { Bats } from './bats'
  import { Walls } from './walls'
  import { Ramps } from './ramps'
  import { Obstacles } from './obstacles'
  import { Holes } from './holes'
  import { Play } from './play'


  let launcher = new Launcher()
  console.log(launcher)
  // let ball = new Ball()
  // console.log(ball)
  let bats = new Bats()
  console.log(bats)
  let walls = new Walls()
  console.log(walls)
  let ramps = new Ramps()
  console.log(ramps)
  let obstacles = new Obstacles()
  console.log(obstacles)
  let holes = new Holes()
  console.log(holes)
  let play = new Play()
  console.log(play)

  // import Stats from 'three/examples/jsm/libs/stats.module'
  const loader = new STLLoader()
  const rotationSpeed= .3
  const keyboard = new Keyboard()
  let camera

  var audio = new Audio('https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3');

  let actions = {l: 0, r: 0, u: 0, d: 0 }
  let ready = false
  // let ccd_threshold_ball = Math.pow(10, -2)
  // let ccd_radius_ball = 0.15
  // let ccd_threshold_bat = Math.pow(10, -57)
  // let ccd_radius_bat = 3
  let table
  let launcher_interior = null
  let score = 0
  let ball = null
  let gameState = "init"
  let flipper_parts = [
    {
      file: 'rubber',
      name: "bat_left",
      shape: "concave",
      position: {x:-1.75, y:0.1, z:9.05},
      scale: {x: .5, y: 1, z: .5}
    },
    {
      file: 'rubber',
      name: "bat_right",
      shape: "concave",
      position: {x:1.75, y: 0.55, z:9.05},
      rotation: {x: 0, y: 0, z: Math.PI},
      scale: {x: .5, y: 1, z: .5}
    },
  ]

  let width, height

  class MainScene extends Scene3D {
    constructor() {
      super({ key: 'MainScene' })
    }

    init() {
      console.log('init')
      width = window.innerWidth
      height = window.innerHeight
      this.renderer.setPixelRatio(1)
      this.renderer.setSize(window.innerWidth, window.innerHeight)
    }

    preload() {
      //console.log('preload')
    }

    async create() {
      this.warpSpeed()
      // enable physics debug
      // this.physics.debug?.enable()
      this.camera.position.set(0, 14, 20)//(0, 30, 0)//(0, 15, 25)
      camera = this.camera

      this.colors = {
        mat1 : this.add.material({ lambert: { color: 'yellow', transparent: true, opacity: 0.5 } }),
        mat2: this.add.material({ lambert: { color: 'blue', transparent: true, opacity: 0.5 } }),
        mat3: this.add.material({ lambert: { color: 'green', transparent: true, opacity: 0.5 } }),
        mat4:  new THREE.MeshLambertMaterial({ color: 'green', transparent: true, opacity: 0.5 }),
        mat5: this.add.material({ lambert: { color: 'red', transparent: true, opacity: 0.5 } }),
        //
        // mat5: new THREE.MeshPhysicalMaterial({
        //   color: 0xb2ffc8, //colors.mat1, //
        //   //  envMap: envTexture,
        //   metalness: 0.25,
        //   roughness: 0.1,
        //   opacity: 1.0,
        //   transparent: true,
        //   transmission: 0.99,
        //   clearcoat: 1.0,
        //   clearcoatRoughness: 0.25
        // })
      }
      await buildWalls(this)
      await loadParts(this, flipper_parts)
      await buildLauncher(this)
      // await loadText("Flip Ball, use left and right arow for flip, down arrow for new ball")
    }

    update() {
      if (ball != null){
        if (ball.position.y < 0){
          ball = null
        }
      }


      if(ready){
        let batL = this.scene.getObjectByName("bat_left")
        let batR = this.scene.getObjectByName("bat_right")

        if(batL != undefined){
          if (actions.l == 1){

            if(batL.rotation.y <= Math.PI/6){
              batL.rotation.y += rotationSpeed
              batL.body.needUpdate = true
            }
          }else{
            if(batL.rotation.y >= -Math.PI/6){
              batL.rotation.y -= rotationSpeed
              batL.body.needUpdate = true
            }
          }
        }

        if(batR != undefined){
          if (actions.r == 1){
            if(batR.rotation.y >= -Math.PI/6){
              batR.rotation.y -= rotationSpeed
              batR.body.needUpdate = true
            }
          }else{
            if(batR.rotation.y <= Math.PI/6){
              batR.rotation.y += rotationSpeed
              batR.body.needUpdate = true
            }
          }
        }
        if( actions.u == 1){
          newBall(this)
        }
        if( actions.d == 1){
          launch(this)
        }
      }
    }
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
      case 'Space':
      console.log(camera)
      break;
    }
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
  })


  function launch(ctx){
    //  console.log(launcher_interior)
    let force = 5*Math.random()
    console.log(force)
    launcher_interior.body.applyForceZ(-force)
    ball.body.applyForceZ(-2)
  }


  function newBall(ctx){
    if (ball == null){
      ball = ctx.physics.add.sphere(
        {
          x: 7,//-1.7,
          radius : 0.3,
          z: -4,//-8,
          y: 1,
          mass: .3,  //0.3,
          name: ball
          // collisionFlags: 0
        },
        { standard: { emissive: 0x11BCDA, roughness: 0.4, metalness: 1 }
        // { lambert: { color: 0x00ff00 }
      }
    )
    // motion clamping https://enable3d.io/docs.html#collisions
    // ball.body.setCcdMotionThreshold(ccd_threshold_ball)
    // ball.body.setCcdSweptSphereRadius(ccd_radius_ball)
    // ball.body.setBounciness(.1)
    console.log("newBall", ball)
  }
}

async function buildWalls(ctx){
  table = ctx.add.plane({ width: 20, height: 20,  mass: 100, collisionFlags: 1 })
  table.rotation.x = -Math.PI/2

  const bottom_left_wall = ctx.physics.add.box(
    {x: -5.2, z:5.9, y: .5, width: 8.5, depth: 0.1, height: .5, collisionFlags: 2}
    , { lambert: { color: 'blue', transparent: true, opacity: 0.5 } }
  )
  bottom_left_wall.rotation.y = - 0.7
  bottom_left_wall.body.needUpdate = true

  const bottom_right_wall = ctx.physics.add.box(
    {x: 5.2, z:5.9, y: .5, width: 8.5, depth: 0.1, height: 0.5, collisionFlags: 2}
    , { lambert: { color: 'blue', transparent: true, opacity: 0.5 } }
  )
  bottom_right_wall.rotation.y = 0.7
  bottom_right_wall.body.needUpdate = true


  const side_left_wall = ctx.physics.add.box(
    {x: -8.3, z:0, y: .5, width: 7, depth: 0.1, height: 0.5, collisionFlags: 2}
    , { lambert: { color: 'green', transparent: true, opacity: 0.5 } }
  )
  side_left_wall.rotation.y = Math.PI/2
  side_left_wall.body.needUpdate = true

  const side_right_wall = ctx.physics.add.box(
    {x: 8.5, z:-2, y: .5, width: 4, depth: 0.1, height: 0.5, collisionFlags: 2}
    , { lambert: { color: 'green', transparent: true, opacity: 0.5 } }
  )
  side_right_wall.rotation.y = - Math.PI /3
  side_right_wall.body.needUpdate = true


  const top_left_wall = ctx.physics.add.box(
    {x: -5.2, z:-5.9, y: .5, width: 8, depth: 0.1, height: 0.5, collisionFlags: 2}
    , { lambert: { color: 'blue', transparent: true, opacity: 0.5 } }
  )
  top_left_wall.rotation.y = 0.7
  top_left_wall.body.needUpdate = true

  const top_right_wall = ctx.physics.add.box(
    {x: 5.2, z:-5.9, y: .5,width: 8, depth: 0.1, height: 0.5, collisionFlags: 2}
    , { lambert: { color: 'blue', transparent: true, opacity: 0.5 } }
  )
  top_right_wall.rotation.y = -0.7
  top_right_wall.body.needUpdate = true


  const top_wall = ctx.physics.add.box(
    {x: 0, z:-8.5, y: .5, width: 6, depth: 0.1, height: 0.5, collisionFlags: 2}
    , { lambert: { color: 'yellow', transparent: true, opacity: 0.5 } }
  )
  // top_right_wall.rotation.y = -0.7
  top_right_wall.body.needUpdate = true

  const obstacle_milou = ctx.physics.add.box(
    {x: -3, z: 4, y:.5,  width: 1, depth: 1, height: 1, collisionFlags: 2}
    , { lambert: { color: 'orange', transparent: true, opacity: 1 } }
  )

  obstacle_milou.rotation.y = Math.PI/3
  obstacle_milou.body.needUpdate = true

  obstacle_milou.body.on.collision((otherObject, event) => {

    if (otherObject.name !== 'ground') {
      // console.log('blueBox collided with another object than the ground')
      // console.log(otherObject, event)
      if (event == "start"){
        score+=1
        loadText("Score : "+score)
        audio.play();
      }
    }
  })


  const obstacle_milou_2 = ctx.physics.add.box(
    {x: 2, z: 6, y:.5,  width: 1, depth: 1, height: 1, collisionFlags: 2}
    , { lambert: { color: 'green', transparent: true, opacity: 1 } }
  )

  obstacle_milou_2.rotation.y = Math.PI/6
  obstacle_milou_2.body.needUpdate = true


  const carre_rouge= ctx.physics.add.box(
    {x: 0, z: -4,  width: 3, depth: 3, height: 0.5, collisionFlags: 2}
    , { lambert: { color: 'red', transparent: true, opacity: 0.5 } }
  )
  carre_rouge.rotation.y = Math.PI/4
  carre_rouge.body.needUpdate = true
  carre_rouge.body.on.collision((otherObject, event) => {

    if (otherObject.name !== 'ground') {
      // console.log('blueBox collided with another object than the ground')
      // console.log(otherObject, event)
      if (event == "start"){
        score+=100
        loadText("Score : "+score)
      }
    }
  })


  class CustomSinCurve extends THREE.Curve {
    constructor( scale = 1 ) {
      super();
      this.scale = scale;
    }

    getPoint( t, optionalTarget = new THREE.Vector3() ) {

      const tx = t * 3 - 1.5;
      const ty = Math.sin( 2 * Math.PI * t );
      const tz = 0;

      return optionalTarget.set( tx, ty, tz ).multiplyScalar( this.scale );

    }

  }

  const path = new CustomSinCurve( 10 );
  const geometry = new THREE.TubeGeometry( path, 20, 2, 8, false );
  const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  const tube = new ExtendedMesh( geometry, material );
  let object = new ExtendedObject3D()
  object.scale.set(.1,.1,.1)
  object.position.set(-5, .2,0)
  object.rotation.set(Math.PI/2,0,Math.PI/2)
  object.add(tube)
  ctx.scene.add(object)
  ctx.physics.add.existing(object, {shape: "concave"})
  object.body.setCollisionFlags(2)
  object.name = "tube"
  object.mass = 2



  const path2 = new CustomSinCurve(   );
  const geometry2 = new THREE.TubeGeometry( path2, 20, 1, 8, false );
  // const material2 = new THREE.MeshBasicMaterial( { lambert: { color: 'green', transparent: true, opacity: 0.5 } );
  const tube2 = new ExtendedMesh( geometry2, ctx.colors["mat1"] );
  let object2 = new ExtendedObject3D()
  // object2.scale.set(.1,.1,.1)
  object2.position.set(4,0.5,2)
  object2.rotation.set(Math.PI/2,0,Math.PI/2)
  object2.add(tube2)
  ctx.scene.add(object2)
  ctx.physics.add.existing(object2, {shape: "concave"})
  object2.body.setCollisionFlags(2)
  object2.name = "tube2"
  object2.mass = 2


  var tpath = [ new THREE.Vector3(-4, 0, -7),
    // new THREE.Vector3(-1, 1.2, 0),
    new THREE.Vector3(2, 0, -2),
    // new THREE.Vector3(1, 1.2, 0),
    new THREE.Vector3(3, 0, 5)
  ]
  var pathBase = new THREE.CatmullRomCurve3(tpath);


  // var tgeometry = new THREE.TubeGeometry(pathBase, 20, 2, 8, false );
  // var tmaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  // var tmesh = new THREE.Mesh( tgeometry, tmaterial );
  // ctx.scene.add(tmesh);

  const geometry3 = new THREE.TubeGeometry( pathBase, 20, .5, 8, false )
  // // const material2 = new THREE.MeshBasicMaterial( { lambert: { color: 'green', transparent: true, opacity: 0.5 } );
  const tube3 = new ExtendedMesh( geometry3, ctx.colors["mat2"] );
  let object3 = new ExtendedObject3D()
  object3.scale.set(.5,.5,.5)
  object3.position.set(0,.5,2)
  // object3.rotation.set(Math.PI/2,0,Math.PI/2)
  object3.add(tube3)
  ctx.scene.add(object3)
  ctx.physics.add.existing(object3, {shape: "concave"})
  object3.body.setCollisionFlags(2)
  object3.name = "tube3"
  object3.mass = 2



}


async function loadText(text){
  // add 2d text
  // const text = new TextTexture('Flip Ball, use left and right arow for flip, down arrow for new ball ', { fontWeight: 'bold', fontSize: 48 })
  // const sprite = new TextSprite(text)
  // const scale = 0.01
  // sprite.setScale(scale)
  // sprite.setPosition(0, 5, -10)//0 + (text.width * scale) / 2 , height - (text.height * scale) / 2 - 12*/)
  // ctx.scene.add(sprite)
  // sprite.name = "sprite_text"
  // console.log(sprite)
  // const sprite3d = new FLAT.TextSprite(texture)
  //       ctx.scene.add(sprite3d)
  //       sprite3d.position.set(0, 1, 5)
  //       sprite3d.setScale(0.01)
  document.getElementById('info-text').innerHTML = text
}
async function buildLauncher(ctx){
  let x = 9, y= .3, z = 8

  let launcher_exterior = ctx.physics.add.cylinder(
    { height: 3, y: y, x: x, z: z, radiusTop: 0.3, radiusBottom: 0.3, collisionFlags: 2, mass: 100 },
    { custom: ctx.colors["mat1"] }
  )
  launcher_interior = ctx.physics.add.cylinder(
    { height: 2, y: y, x: x, z: z, radiusTop: 0.2, radiusBottom: 0.2, collisionFlags: 4, mass: 1 },
    { custom: ctx.colors["mat2"] }
  )
  let launcher_top = ctx.physics.add.cylinder(
    { height: 0.2, y: y, x: x, z: z+2, radiusTop: 0.15, radiusBottom: 0.15, collisionFlags: 2, mass: 0.01 },
    { custom: ctx.colors["mat5"] }
  )
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
  launcher_top.rotation.x += Math.PI/2
  launcher_top.body.needUpdate = true
  launcher_interior.add(launcher_top)
  // console.log(box1,box2)

  const launcher_right_wall = ctx.physics.add.box(
    {x: x+.25, y: y, z: z-5, width: 7, depth: 0.1, height: 0.5, collisionFlags: 2}
    , { lambert: { color: 'green', transparent: true, opacity: 0.5 } }
  )
  const launcher_left_wall = ctx.physics.add.box(
    {x: x-.25, y: y, z: z-5, width: 7, depth: 0.1, height: 0.5, collisionFlags: 2}
    , { lambert: { color: 'green', transparent: true, opacity: 0.5 } }
  )

  launcher_right_wall.rotation.y = Math.PI /2
  launcher_right_wall.body.needUpdate = true
  // box1.add(launcher_right_wall)



  launcher_left_wall.rotation.y = Math.PI /2
  launcher_left_wall.body.needUpdate = true





}

async function loadParts(ctx, parts){
  let count = parts.length
  for (let p of parts){
    console.log("loading", p.name)

    loader.load(
      '../stl/'+p.file+'.stl',
      function (geometry) {
        const part = new ExtendedMesh(geometry, ctx.colors["mat1"])

        let object = new ExtendedObject3D()
        object.add(part)
        p.scale != undefined ? object.scale.set(p.scale.x, p.scale.y, p.scale.z) : ""
        p.position != undefined ? object.position.set(p.position.x, p.position.y, p.position.z) : ""
        p.rotation != undefined ? object.rotation.set(p.rotation.x, p.rotation.y, p.rotation.z) : ""


        ctx.scene.add(object)
        ctx.physics.add.existing(object, {shape: p.shape})
        object.body.setCollisionFlags(2)
        // object.body.setBounciness(.1)
        object.name = p.name
        object.mass = 2

        // motion clamping https://enable3d.io/docs.html#collisions
        // object.body.setCcdMotionThreshold(ccd_threshold_bat)
        // object.body.setCcdSweptSphereRadius(ccd_radius_bat)
        // object.body.setBounciness(.1)
        // console.log(object)
      },
      (xhr) => {
        let progress = xhr.loaded / xhr.total
        console.log(progress * 100 + '% loaded')
        if(progress == 1){

          if (count == 1){
            console.log("Parts are loaded")
            ready = true
            newBall(ctx)
          }else{
            console.log(count+"/"+parts.length)
          }
          count --
        }

      },
      (error) => {
        console.log(error)
        alert ('error loading'+p.name+" : "+error)
      }
    )
  }
}

PhysicsLoader('/ammo', () => new Project(
  { gravity: { x: 0, y: -9.81, z: 4},
  scenes: [MainScene],
  antialias: true,
  maxSubSteps: 20, //10
  fixedTimeStep: 1 / 360, // 1/240
}))
