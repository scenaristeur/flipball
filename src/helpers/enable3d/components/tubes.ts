//https://threejs.org/docs/#api/en/geometries/TubeGeometry
  import { THREE, ExtendedMesh, ExtendedObject3D } from 'enable3d'
export class Tubes  {
  constructor( scene ) {
    console.log("tubes", )
    console.log(scene.config.tubes)
    this.buildTubes(scene)
  }
  buildTubes(ctx){
    ctx.config.tubes.forEach(t => {
      console.log(t)
      // var positions: THREE.Vector3[] = [];
      var positions = [];
      t.positions.forEach(p => {
        console.log(p)
        const point = new THREE.Vector3( Number(p.x), Number(p.y), Number(p.z))
        positions.push( point)

      });
      console.log(positions)
      var curve = new THREE.CatmullRomCurve3(positions);
      // curve.curveType = 'catmullrom'

      var tgeometry = new THREE.TubeGeometry( /*vec["_" + 7 + "_"]*/curve, t.segments, t.radius, t.radialSegments, false );
      var tmaterial = new THREE.MeshStandardMaterial( { emissive: 0x999999, roughness: 0.4, metalness: 1  });
      var tmesh = new ExtendedMesh( tgeometry, tmaterial ) //THREE.Mesh( tgeometry, tmaterial );
      let object = new ExtendedObject3D()
      object.add(tmesh)
      ctx.scene.add(object)

      ctx.physics.add.existing(object, {shape: "concave"});
      object.body.setCollisionFlags(2)


    })
  }


}
