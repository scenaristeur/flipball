const debug = false
const statistiques = true

/*
PI/2 : 1.57
PI/3 : 1.05
PI/4 : 0.785
PI/6 : 0.52

*/

import { TableSelector } from './tableSelector'
import { Project, Scene3D, PhysicsLoader, THREE, /*Loaders,*/
  ExtendedObject3D, ExtendedMesh, CatmullRomCurve3 } from 'enable3d'
  import Stats from 'three/examples/jsm/libs/stats.module'
  import { TextTexture, TextSprite } from '@enable3d/three-graphics/jsm/flat'
  import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
  import { Colors } from './colors'
  import { Launcher } from './launcher'
  import { Ball } from './ball'
  import { Bats } from './bats'
  import { Walls } from './walls'
  import { Ramps } from './ramps'
  import { Tubes } from './tubes'
  import { Lights } from './lights'
  import { Obstacles } from './obstacles'
  import { Holes } from './holes'
  import { Panels } from './panels'
  import { Play } from './play'

  let bats = new Bats()
  let ramps = new Ramps()
  let holes = new Holes()
  let play = new Play()

  let lights = new Lights()

  const loader = new STLLoader()

  const loader2 = new GLTFLoader();

  const rotationSpeed= .2

  let colors

  var audio = new Audio('https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3');

  let ready = false
  // let ccd_threshold_ball = Math.pow(10, -2)
  // let ccd_radius_ball = 0.15
  // let ccd_threshold_bat = Math.pow(10, -57)
  // let ccd_radius_bat = 3
  let launcher_interior = null
  let score = 0
  //let
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
  const stats = Stats()


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
      let tableSelector = new TableSelector(this)
      this.ball = null
    }

    async preload() {
      try{
        this.config = await import('../tables/'+this.tablename+'/config.json');
        console.log(this.config)
      }catch(e){
        console.log(e)
        alert( "I can't open '"+this.tablename+"/config.json' in the tables folder !")
      }

      //console.log('preload')
      colors = new Colors(this)
      this.colors = colors
      if (statistiques){
        document.body.appendChild(stats.dom)
      }
    }

    async create() {
      this.warpSpeed(/*'-light',*/)
      this.debug = debug
      if (debug == true ){
        this.physics.debug?.enable()     // enable physics debug
      }
      this.camera.position.set(0, 14, 20)



      let walls = new Walls(this)
      this.launcher = new Launcher(this)
      let obstacles = new Obstacles(this)
      let tubes = new Tubes(this)
      let panels = new Panels(this)

      await loadParts(this, flipper_parts)

      // await loadText("Flip Ball, use left and right arow for flip, down arrow for new ball")
    }

    update(time) {
      let actions = play.actions

      if (this.ball != null){
        if (this.ball.position.y < 0){
          this.ball = null
          new Ball(this)
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
          new Ball(this)
        }
        if( actions.d == 1){
          this.launcher.launch()
        }
      }
      if (statistiques){
        stats.update()
      }
    }
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


  async function loadParts(ctx, parts){
    let count = parts.length

    const helmet = new ExtendedObject3D()
    const pos = { x: 0, y: 2, z: -5 }

    loader2.load( '../gltf/DamagedHelmet.gltf', function ( gltf ) {

      // let helmet = ctx.scene.add( gltf.scene );
      helmet.add(gltf.scene)

      helmet.scale.set(2, 2, 2)
      helmet.position.set(pos.x, pos.y, pos.z)

      ctx.add.existing(helmet)

    } );

    for (let p of parts){
      console.log("loading", p.name)

      loader.load(
        '../stl/'+p.file+'.stl',
        function (geometry) {
          const part = new ExtendedMesh(geometry, colors["mat1"])

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
              new Ball(ctx)
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
