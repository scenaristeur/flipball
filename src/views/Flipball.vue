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
   PhysicsLoader('lib/ammo', () => new Project({ scenes: [MainScene], antialias: true }))
  }
}
</script>
