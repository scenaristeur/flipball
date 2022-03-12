let debug = false
let statistiques = true


import {  Scene3D, THREE,  ExtendedObject3D,  ExtendedMesh,/* CatmullRomCurve3*/   } from 'enable3d'
import Stats from 'three/examples/jsm/libs/stats.module'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


// import { TableSelector } from './components/tableSelector.ts'
import { Walls } from './components/walls.ts'
import { Launcher } from './components/launcher.ts'
import { Obstacles } from './components/obstacles.ts'
import { Tubes } from './components/tubes.ts'
import { Panels } from './components/panels.ts'
import { Colors } from './components/colors.ts'
import { Play } from './components/play.ts'
import { Ball } from './components/ball.ts'

// import * as Tone from 'tone'


const stats = Stats()
let play = new Play()
let ready = false
let base_url = process.env.BASE_URL
const rotationSpeed= .2
const loader = new STLLoader()

let text = 'three.js',
font = undefined,
fontName = 'optimer', // helvetiker, optimer, gentilis, droid sans, droid serif
fontWeight = 'bold'; // normal bold
let group, textMesh1, textMesh2, textGeo, materials;
group = new THREE.Group();
group.position.y = -2;
group.position.z = -10;

// let audios = {}
// const loader2 = new GLTFLoader();

//create a synth and connect it to the main output (your speakers)
// const synth = new Tone.Synth().toDestination();


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




    if (statistiques){
      document.body.appendChild(stats.dom)
    }
    this.colors = new Colors(this)
    this.ball = null
    this.score = 0
  }

  async preload() {
    console.log('preload')
    // for (let i = 0; i < 500; i++){
    //   let name = 28811+i
    //   console.log(name)
    //   let audio = new Audio('./ambiant_buttons/'+name+'.wav');
    //   // audios.push(audio)
    //   audios[i] = audio
    //
    // }
    // console.log("audios",audios)
    //  console.log("audio", audio)
    // loadParts(this, flipper_parts)
  }

  create() {

    console.log('create')

    // set up scene (light, ground, grid, sky, orbitControls)
    //this.warpSpeed()

    this.debug = debug
    if (debug == true ){
      this.physics.debug?.enable()     // enable physics debug
    }
    this.camera.position.set(0, 14, 30)
    let panels = new Panels(this)
    console.log(panels)

    this.scene.add (group)

    this.loadFont();

    let scene = this

    window.addEventListener('tableChanged', async function (e) {
      scene.tablename = e.detail

      // console.log(this.table)
      // let tableSelector = new TableSelector(this)
      // console.log(tableSelector)
      try{
        scene.warpSpeed()
        scene.config = await import('@/tables/'+scene.tablename+'/config.json');
        console.log(scene.config)


        if (scene.config.walls != undefined){
          let walls = new Walls(scene)
          console.log(walls)
        }
        if (scene.config.launcher != undefined){
          scene.launcher = new Launcher(scene)

        }
        if (scene.config.obstacles != undefined){
          let obstacles = new Obstacles(scene)
          console.log(obstacles)
        }
        if (scene.config.tubes != undefined){
          let tubes = new Tubes(scene)
          console.log(tubes)
        }
        if(scene.config.flipper_parts != undefined){
          await scene.loadParts(scene, scene.config.flipper_parts)
        }

        if (scene.config.type == "marble"){
          let audio_num = 0

          for (let x = "-10"; x < 11; x++){
            // time ++
            audio_num ++
            for (let z = "-10"; z < 11; z++){
              // time ++
              audio_num ++
              let col = Math.random() * 0xffffff
              let capteur =  scene.physics.add.box({x: x, y: 1, z:z, collisionFlags: 1
              }
              , { lambert: { color: col, transparent: true, opacity: 0.5 }
            })
            capteur.type = "capteur"
            let num = 28811+audio_num
            capteur.audio  = new Audio('./ambiant_buttons/'+num+'.wav')
            // let random = Math.floor(Math.random()*(325-1+1)+1)
            // console.log(random)
            // let zeroFilled = ('000' + x).substr(-3)
            // let num = 28811+cpt
            // let file = +'__junggle__btn'+zeroFilled+'.wav'
            // console.log(file )
            // let audio = new Audio('./ambiant_buttons/'+file);


            capteur.body.on.collision((otherObject, event) => {

              if (otherObject.name !== 'ground' && otherObject.type != "capteur") {
                // console.log('blueBox collided with another object than the ground')
                // console.log(otherObject, event)
                if (event == "start"){
                  console.log("collision", otherObject.name)
                  // const now = Tone.now()

                  //play a middle 'C' for the duration of an 8th note

                  //  synth.triggerAttackRelease("C4", "8n", now)
                  //   if(o.onCollision != undefined){
                  //   ctx.score += o.onCollision.score
                  //   console.log(ctx.score)
                  // }
                  // score+=1
                  // loadText("Score : "+score)
                  // console.log("a", audio_num)
                  // let audio = audios[audio_num]
                  // console.log(audio)
                  capteur.audio.play();
                }
              }
            })

          }
        }
      }

      if(scene.config.ball_number != undefined){
        for (let i=0; i < scene.config.ball_number; i++){
          let b = new Ball(scene)
          b.name = 'ball_'+i
        }
        ready = true
      }



    }catch(e){
      console.log(e)
      alert( "I can't open '"+scene.tablename+"/config.json' in the tables folder !")
    }
  }, false);



}

loadFont() {
  let ms = this
  const loader = new FontLoader();
  loader.load( 'fonts/' + fontName + '_' + fontWeight + '.typeface.json', function ( response ) {
    font = response;
    ms.refreshText();
  } );
}

refreshText(){

  group.remove( textMesh1 );


  if ( ! text ) return;

  this.createText();
}
update() {
  let actions = play.actions

  if(text != " "+this.score ){
    text = " "+this.score
    this.refreshText()
    console.log("text", text)
  }


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

createText() {
  //https://threejs.org/examples/#webgl_geometry_text
  let hover = 0
  let mirror = false
  let height = 1
  textGeo = new TextGeometry( text, {

    font: font,

    size: 2,
    height: height,
    curveSegments: 4,

    bevelThickness: .5,
    bevelSize: .5,
    bevelEnabled: true

  } );

  materials = [
    new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true } ), // front
    new THREE.MeshPhongMaterial( { color: 0x000000 } ) // side
  ];

  textGeo.computeBoundingBox();

  const centerOffset = - 0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );

  textMesh1 = new THREE.Mesh( textGeo, materials );

  textMesh1.position.x = centerOffset;
  textMesh1.position.y = hover;
  textMesh1.position.z = -10;

  textMesh1.rotation.x = 0;
  textMesh1.rotation.y = Math.PI * 2;

  group.add( textMesh1 );

  if ( mirror ) {

    textMesh2 = new THREE.Mesh( textGeo, materials );

    textMesh2.position.x = centerOffset;
    textMesh2.position.y = - hover;
    textMesh2.position.z = height;

    textMesh2.rotation.x = Math.PI;
    textMesh2.rotation.y = Math.PI * 2;

    group.add( textMesh2 );

  }

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
