<template>
  <div class="home" id="myCanvas">
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
    console.log(process.env.BASE_URL)
    // let app = this
    this.load()

    window.addEventListener('tableChanged', async function (e) {
      try{
        let config = await import('@/tables/'+e.detail+'/config.json');
        console.log(config)
        //app.load()
      }catch(e){
        console.log(e)
      }

    })
  },
  methods:{
    load(){
      PhysicsLoader('lib/ammo', () => new Project(
        {
          scenes: [MainScene],
          gravity: { x: 0, y: -9.81, z: 5}, //4
          antialias: true,
          maxSubSteps: 10, //20, //10
          fixedTimeStep: 1/240//400, //1 / 360, // 1/240
        }
      ))
    }
  }
}
</script>
