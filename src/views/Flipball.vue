<template>
  <div class="home">
  </div>
</template>

<script>
// @ is an alias to /src
import { Project,  PhysicsLoader, /*  ExtendedObject3D, ExtendedMesh, CatmullRomCurve3*/ } from 'enable3d'
import { MainScene } from '@/helpers/enable3d/MainScene.js'


export default {
  name: 'Flipball',
  components: {
  },
  created(){
    PhysicsLoader('lib/ammo', () => new Project(
      {
        scenes: [MainScene],
        gravity: { x: 0, y: -9.81, z: 4},
        antialias: true,
        maxSubSteps: 20, //10
        fixedTimeStep: 1 / 360, // 1/240        
      }
    ))
  }
}
</script>
