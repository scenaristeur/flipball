// three.js
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// physics
import { AmmoPhysics, ExtendedMesh, PhysicsLoader } from '@enable3d/ammo-physics'

// CSG
import { CSG } from '@enable3d/three-graphics/jsm/csg'

// Flat
import { TextTexture, TextSprite } from '@enable3d/three-graphics/jsm/flat'

console.log('Three.js version r' + THREE.REVISION)

const MainScene = () => {
  // sizes
  const width = window.innerWidth
  const height = window.innerHeight

  // scene
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0xf0f0f0)

  // camera
  const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000)
  camera.position.set(14,6,16) //(21.5,4,3) //(0, 9.5, 20) //
  camera.lookAt(0, 0, 0)

  // you can access Ammo directly if you want
  // new Ammo.btVector3(1, 2, 3).y()

  // 2d camera/2d scene
  const scene2d = new THREE.Scene()
  const camera2d = new THREE.OrthographicCamera(0, width, height, 0, 1, 1000)
  camera2d.position.setZ(10)

  // renderer
  const renderer = new THREE.WebGLRenderer()
  renderer.setSize(width, height)
  renderer.autoClear = false
  document.body.appendChild(renderer.domElement)

  // csg
  const mat = new THREE.MeshNormalMaterial()
  const meshA = new THREE.Mesh(new THREE.BoxBufferGeometry(1, 1, 1))
  const meshB = new THREE.Mesh(new THREE.SphereBufferGeometry(0.5, 16, 16))
  meshA.position.set(3, 3, 0)
  meshB.position.set(3.25, 3.1, 0.4)
  const meshC_0 = CSG.intersect(meshA, meshB)
  const meshC_1 = CSG.subtract(meshA, meshB)
  const meshC_2 = CSG.union(meshA, meshB)
  meshC_0.material = mat
  meshC_1.material = mat
  meshC_2.material = mat
  meshC_0.position.setX(3)
  meshC_1.position.setX(5)
  meshC_2.position.setX(7)
  scene.add(meshC_0, meshC_1, meshC_2)

  // add 2d text
  const text = new TextTexture('Flip Ball, use left and right arow for flip ', { fontWeight: 'bold', fontSize: 48 })
  const sprite = new TextSprite(text)
  const scale = 0.5
  sprite.setScale(scale)
  sprite.setPosition(0 + (text.width * scale) / 2 + 12, height - (text.height * scale) / 2 - 12)
  scene2d.add(sprite)

  // dpr
  const DPR = window.devicePixelRatio
  renderer.setPixelRatio(Math.min(2, DPR))

  // orbit controls
  new OrbitControls(camera, renderer.domElement)

  // light
  scene.add(new THREE.HemisphereLight(0xffffbb, 0x080820, 1))
  scene.add(new THREE.AmbientLight(0x666666))
  const light = new THREE.DirectionalLight(0xdfebff, 1)
  light.position.set(50, 200, 100)
  light.position.multiplyScalar(1.3)

  // physics
  const physics = new AmmoPhysics(scene as any)
  physics.debug?.enable()

  // extract the object factory from physics
  // the factory will make/add object without physics
  const { factory } = physics

  let box, box1, box2, box3
  // hinge

  const hinge = x => {
    box1 = physics.add.box({ depth: 0.25, y: 2, z: 0, x: x, mass: 0 }, { custom: mat })
    box2 = physics.add.box({ depth: 0.25, y: 2, z: 0.5, x: x + 1.25 }, { custom: mat })
    box3 = physics.add.box({ depth: 0.25, y: 2, z: 1, x: x + 1.25 }, { custom: mat })

    physics.add.constraints.hinge(box1.body, box2.body, {
      pivotA: { y: -2 }, //-0.65
      pivotB: { y: 2 }, //0.65
      axisA: { x: 1 },
      axisB: { x: 1 }
    })
    physics.add.constraints.hinge(box2.body, box3.body, {
      pivotA: { y: -0.65 },
      pivotB: { y: 0.65 },
      axisA: { x: 1 },
      axisB: { x: 1 }
    })
  }
  // blue box
  physics.add.box({ x: 2, y: 10 }, { lambert: { color: 0x2194ce } })

  // static ground
  //  physics.add.ground({ width: 20, height: 20 })

  // add a normal sphere using the object factory
  // (NOTE: This will be factory.add.sphere() in the future)
  // first parameter is the config for the geometry
  // second parameter is for the material
  // you could also add a custom material like so { custom: new THREE.MeshLambertMaterial({ color: 0x00ff00 }) }
  const greenSphere = factory.add.sphere({ x: -2, y: 2, z: 5 }, { lambert: { color: 0x00ff00 } })
  // once the object is created, you can add physics to it
  physics.add.existing(greenSphere)

  // green box
  const geometry = new THREE.BoxBufferGeometry()
  const material = new THREE.MeshLambertMaterial({ color: 0x00ff00 })
  const cube = new ExtendedMesh(geometry, material)
  cube.position.set(0, 5, 0)
  scene.add(cube)
  physics.add.existing(cube as any)
  cube.body.setCollisionFlags(2) // make it kinematic


  const geometryTable = new THREE.BoxGeometry(8,16,1);
  const materialTable = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  const table = new ExtendedMesh( geometryTable, materialTable );
  table.rotation.x = -1 //-1
  scene.add( table );
  physics.add.existing(table as any)
  table.body.setCollisionFlags(2) // make it kinematic


  //Makes a new cylinder with
  // - a circle of radius 5 on top (1st parameter)
  // - a circle of radius 5 on the bottom (2nd parameter)
  // - a height of 20 (3rd parameter)
  // - 32 segments around its circumference (4th parameter)
  var geometryCyl = new THREE.CylinderGeometry( .1, .1, 1, 8 );
  //Yellow
  var materialCyl = new THREE.MeshBasicMaterial( {color: 0xffff00} );
  var cylinderL = new ExtendedMesh( geometryCyl, materialCyl );
  var cylinderR = new ExtendedMesh( geometryCyl, materialCyl );
  table.add( cylinderL );
  table.add( cylinderR );
  // physics.add.existing(cylinderL as any)
  // cylinderL.body.setCollisionFlags(2) // make it kinematic
  // physics.add.existing(cylinderR as any)
  // cylinderR.body.setCollisionFlags(2) // make it kinematic
  cylinderL.position.x = -3
  cylinderL.position.y = -7
  cylinderL.position.z = 1
  cylinderL.rotation.x = (<any>THREE).Math.degToRad(90)
  // cylinderR.position = new THREE.Vector3(-1, -5, 1)
  cylinderR.position.x = 3
  cylinderR.position.y = -7
  cylinderR.position.z = 1
  cylinderR.rotation.x = (<any>THREE).Math.degToRad(90)

  const geometryFlip = new THREE.BoxGeometry(3,.5,.5);
  const materialFlip = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
  const flipL = new ExtendedMesh( geometryFlip, materialFlip );
  const flipR = new ExtendedMesh( geometryFlip, materialFlip );
  cylinderL.add( flipL )
  cylinderR.add( flipR )
  physics.add.existing(flipL as any)
  flipL.body.setCollisionFlags(1) // make it kinematic
  physics.add.existing(flipR as any)
  flipR.body.setCollisionFlags(2) // make it kinematic

  flipL.position.x = .6
  // flipL.position.y = -5
  // flipL.position.z = 1

  flipR.position.x = -.6
  // flipR.position.y = -5
  // flipR.position.z = 1



  // merge children to compound shape
  const exclamationMark = () => {
    const material = new THREE.MeshLambertMaterial({ color: 0xffff00 })

    const sphere = new THREE.Mesh(new THREE.SphereBufferGeometry(0.25), material)
    sphere.position.set(0, -0.8, 0)

    const cube = new THREE.Mesh(new THREE.BoxBufferGeometry(0.4, 0.8, 0.4), material)
    cube.position.set(5, 2, 5)

    cube.add(sphere)
    scene.add(cube)

    cube.position.set(5, 5, 5)
    cube.rotation.set(0, 0.4, 0.2)

    physics.add.existing(cube as any)
  }
  exclamationMark()
  hinge(7)

  function handleKeyDown(event) {
    console.log(event.keyCode)

    if(event.keyCode == 32){
      // console.log(flipL)
      // console.log(camera)
      console.log(physics)
      console.log(physics)
    }

    if (event.keyCode === 37) { //87 is "w", 161 is !, 37 is leftArrow and 39 RightArrow
    //window.isBDown = true;
    console.log("left flip")
    console.log("rotation https://stackoverflow.com/questions/42812861/three-js-pivot-point/42866733#42866733")
    rotateAboutPoint(flipL, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 1, 0), (<any>THREE).Math.degToRad(30))
  }
  if (event.keyCode === 39) {
    //window.isBDown = false;
    console.log("right flip")
    rotateAboutPoint(flipR, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 1, 0), (<any>THREE).Math.degToRad(-30))
  }
}

function handleKeyUp(event) {
  console.log(event.keyCode)
  if (event.keyCode === 37) {
    //window.isBDown = false;
    console.log("left back")
    rotateAboutPoint(flipL, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 1, 0), (<any>THREE).Math.degToRad(-30))
  }
  if (event.keyCode === 39) {
    //window.isBDown = false;
    console.log("right back")
    rotateAboutPoint(flipR, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 1, 0), (<any>THREE).Math.degToRad(30))
  }
}


// obj - your object (THREE.Object3D or derived)
// point - the point of rotation (THREE.Vector3)
// axis - the axis of rotation (normalized THREE.Vector3)
// theta - radian value of rotation
// pointIsWorld - boolean indicating the point is in world coordinates (default = false)
function rotateAboutPoint(obj, point, axis, theta, pointIsWorld = false){
  pointIsWorld = (pointIsWorld === undefined)? false : pointIsWorld;

  if(pointIsWorld){
    obj.parent.localToWorld(obj.position); // compensate for world coordinate
  }

  obj.position.sub(point); // remove the offset
  obj.position.applyAxisAngle(axis, theta); // rotate the POSITION
  obj.position.add(point); // re-add the offset

  if(pointIsWorld){
    obj.parent.worldToLocal(obj.position); // undo world coordinates compensation
  }

  obj.rotateOnAxis(axis, theta); // rotate the OBJECT
}

window.addEventListener('keydown', handleKeyDown, false);
window.addEventListener('keyup', handleKeyUp, false);

const update = () => {
  // box.rotation.x += 0.01
  // box.body.needUpdate = true
  box2.rotation.x += 0.01
  box2.body.needUpdate = true
}

// clock
const clock = new THREE.Clock()

// loop
const animate = () => {
  cube.rotation.x += 0.01
  cube.rotation.y += 0.01
  cube.body.needUpdate = true // this is how you update kinematic bodies
  update()

  physics.update(clock.getDelta() * 1000)
  physics.updateDebugger()

  // you have to clear and call render twice because there are 2 scenes
  // one 3d scene and one 2d scene
  renderer.clear()
  renderer.render(scene, camera)
  renderer.clearDepth()
  renderer.render(scene2d, camera2d)

  requestAnimationFrame(animate)
}
requestAnimationFrame(animate)
}

// '/ammo' is the folder where all ammo file are
PhysicsLoader('/ammo', () => MainScene())
