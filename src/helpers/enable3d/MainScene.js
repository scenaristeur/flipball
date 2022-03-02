let debug = true
let statistiques = true


import {  Scene3D, THREE,/*  ExtendedObject3D, ExtendedMesh, CatmullRomCurve3*/ } from 'enable3d'
import Stats from 'three/examples/jsm/libs/stats.module'

import { TableSelector } from './components/tableSelector.ts'

  const stats = Stats()

export class MainScene extends Scene3D {
  constructor() {
    super('MainScene')
  }

  init() {
    console.log('init')
    // width = window.innerWidth
    // height = window.innerHeight
    this.renderer.setPixelRatio(1)
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    let tableSelector = new TableSelector(this)
    console.log(tableSelector)
  }

  async preload() {
    console.log('preload')
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
  }

  create() {
    console.log('create')

    // set up scene (light, ground, grid, sky, orbitControls)
    this.warpSpeed()

    this.debug = debug
    if (debug == true ){
      this.physics.debug?.enable()     // enable physics debug
    }
    this.camera.position.set(0, 14, 20)

    // blue box
    this.box = this.add.box({ y: 2 }, { lambert: { color: 'deepskyblue' } })

    // pink box
    this.physics.add.box({ y: 10 }, { lambert: { color: 'hotpink' } })

    // green sphere
    const geometry = new THREE.SphereGeometry(0.8, 16, 16)
    const material = new THREE.MeshLambertMaterial({ color: 0x00ff00 })
    const cube = new THREE.Mesh(geometry, material)
    cube.position.set(0.2, 3, 0)
    this.scene.add(cube)
    // add physics to an existing object
    this.physics.add.existing(cube)
  }

  update() {
    this.box.rotation.x += 0.01
    this.box.rotation.y += 0.01

    if (statistiques){
      stats.update()
    }
  }
}
