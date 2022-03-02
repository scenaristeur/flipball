let debug = true
let statistiques = true


import {  Scene3D, /*THREE,*/  ExtendedObject3D,  ExtendedMesh,/* CatmullRomCurve3*/ } from 'enable3d'
import Stats from 'three/examples/jsm/libs/stats.module'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import { FLAT } from 'enable3d'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


import { TableSelector } from './components/tableSelector.ts'
import { Walls } from './components/walls.ts'
import { Launcher } from './components/launcher.ts'
import { Obstacles } from './components/obstacles.ts'
import { Tubes } from './components/tubes.ts'
import { Panels } from './components/panels.ts'
import { Colors } from './components/colors.ts'
import { Play } from './components/play.ts'
import { Ball } from './components/ball.ts'


const stats = Stats()
let play = new Play()
let ready = false
let base_url = process.env.BASE_URL
const rotationSpeed= .4
const loader = new STLLoader()

// const loader2 = new GLTFLoader();


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

export class MainScene extends Scene3D {
  constructor() {
    super('MainScene')

  }

  async init() {
    console.log('init')
    // width = window.innerWidth
    // height = window.innerHeight
    this.renderer.setPixelRatio(1)
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    let tableSelector = new TableSelector(this)
    console.log(tableSelector)
    try{
      this.config = await import('@/tables/'+this.tablename+'/config.json');
      console.log(this.config)
    }catch(e){
      console.log(e)
      alert( "I can't open '"+this.tablename+"/config.json' in the tables folder !")
    }
    if (statistiques){
      document.body.appendChild(stats.dom)
    }
    this.colors = new Colors(this)
    this.ball = null
  }

  async preload() {
    console.log('preload')
    let walls = new Walls(this)
    this.launcher = new Launcher(this)
    let obstacles = new Obstacles(this)
    let tubes = new Tubes(this)

    console.log(walls, obstacles, tubes)
    await this.loadParts(this, flipper_parts)
    // loadParts(this, flipper_parts)
  }

  async create() {
    console.log('create')

    // set up scene (light, ground, grid, sky, orbitControls)
    this.warpSpeed()

    this.debug = debug
    if (debug == true ){
      this.physics.debug?.enable()     // enable physics debug
    }
    this.camera.position.set(0, 14, 20)
    let panels = new Panels(this)
    console.log(panels)



    // panels
    const { orbitControls } = await this.warpSpeed()

    // const width = window.innerWidth
    // const height = window.innerHeight

    // Initialize the flat elements
    this.ui = FLAT.init(this.renderer)

    // Use this if you need events on the 2D elements.
    // If you are using orbitControls, pass it to initEvents().
    // This makes sure orbitControls is not messing with the mouse move.
    FLAT.initEvents({ canvas: this.renderer.domElement, orbitControls })

    // Call Flat.destroy() on scene restart or stop
    // or simply add FLAT to the deconstructor
    this.deconstructor.add(FLAT /* same effect as FLAT.destroy */, orbitControls)

    // create text texture
    const texture = new FLAT.TextTexture('Some Text')

    // // texture in 2d space
    // const sprite2d = new FLAT.TextSprite(texture)
    // this.ui.scene.add(sprite2d)
    // sprite2d.setPosition(sprite2d.width / 2 + 40, height - sprite2d.height / 2 - 40)

    // texture in 3d space
    let sprite3d = new FLAT.TextSprite(texture)
    this.scene.add(sprite3d)
    sprite3d.position.set(0, 2, -10)
    sprite3d.setScale(0.05)

        const texture2 = new FLAT.TextTexture('Blop blap')
        sprite3d = new FLAT.TextSprite(texture2)
        sprite3d.material.map.needsUpdate = true;

    // texture on a plane
    // const geometry = new THREE.PlaneGeometry(texture.width / 100, texture.height / 100)
    // const material = new THREE.MeshLambertMaterial({
    //   map: texture.clone(),
    //   transparent: false,
    //   side: THREE.DoubleSide
    // })
    // const plane = new THREE.Mesh(geometry, material)
    // plane.position.set(0, 5, 0)
    // plane.rotateX(-0.01)
    // this.scene.add(plane)
    // this.physics.add.existing(plane)
    //
    // // texture on a plane (with rainbow color background)
    // const bitmap = await createImageBitmap(texture.image)
    // const planeTexture = new FLAT.DrawTexture(texture.width, texture.height, ctx => {
    //   // create rainbow gradient
    //   const gradient = ctx.createLinearGradient(0, 0, 200, 200)
    //   gradient.addColorStop(0, 'yellow')
    //   gradient.addColorStop(0.5, 'red')
    //   gradient.addColorStop(1, 'blue')
    //   // fill with gradient
    //   ctx.fillStyle = gradient
    //   // draw the bitmap on top of the rainbow
    //   ctx.fillRect(0, 0, texture.width, texture.height)
    //   ctx.drawImage(bitmap, 0, 0)
    // })
    // const geo = new THREE.PlaneGeometry(texture.width / 100, texture.height / 100)
    // const mat = new THREE.MeshLambertMaterial({
    //   map: planeTexture,
    //   transparent: false,
    //   side: THREE.DoubleSide
    // })
    // const mesh = new THREE.Mesh(geo, mat)
    // mesh.position.set(0, 10, 2)
    // mesh.rotateX(-0.01)
    // this.scene.add(mesh)
    // this.physics.add.existing(mesh)







  }

  update() {
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
        if (actions.l == 1  || actions.tapeLeft == 1){

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
        if (actions.r == 1 || actions.tapeRight == 1){
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

      if (actions.tapeUp == 1){
        this.launcher.launch()
        setTimeout(() => {  actions.tapeUp = 0; }, 1000);
      }
    }
    if (statistiques){
      stats.update()
    }
  }


  preRender() {
    FLAT.preRender(this.renderer)
  }

  postRender() {
    FLAT.postRender(this.renderer, this.ui)
  }


  async  loadText(text){
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

  async loadParts(ctx, parts){
    let count = parts.length

    // const helmet = new ExtendedObject3D()
    // const pos = { x: 0, y: 2, z: -5 }
    //
    // loader2.load( './components/gltf/DamagedHelmet.gltf', function ( gltf ) {
    //
    //   // let helmet = ctx.scene.add( gltf.scene );
    //   helmet.add(gltf.scene)
    //
    //   helmet.scale.set(2, 2, 2)
    //   helmet.position.set(pos.x, pos.y, pos.z)
    //
    //   ctx.add.existing(helmet)
    // } );

    for (let p of parts){
      console.log("loading", p.name)
      let path = base_url+"stl/"+p.file+'.stl'
      // console.log(path)
      loader.load(
        path,
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
}
