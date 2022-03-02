import { FLAT } from 'enable3d'

export class Panels  {
  constructor( scene ) {
    console.log("panels", scene)
    this.buildPanels(scene)
    // create text texture

    // scene.panel.rect = scene.add.rectangle(0, 0, 50, 50, 0xff00ff)
  }
  buildPanels(ctx){
    // Initialize the flat elements
  //  const width = window.innerWidth
         // const height = window.innerHeight
          ctx.ui = FLAT.init(ctx.renderer)
          ctx.deconstructor.add(FLAT /* same effect as FLAT.destroy */)
    const texture = new FLAT.TextTexture('Some Text')
    const sprite2d = new FLAT.TextSprite(texture)
            ctx.ui.scene.add(sprite2d)
            sprite2d.setPosition(0,4,0)
            // sprite2d.setPosition(sprite2d.width / 2 + 40, height - sprite2d.height / 2 - 40)

    // texture in 3d space
    // const sprite3d = new FLAT.TextSprite(texture)
    // ctx.add(sprite3d)
    // sprite3d.position.set(0, 1, 5)
    // sprite3d.setScale(0.01)
    // ctx.add.box()
  }

  // getPoint( t, optionalTarget = new THREE.Vector3() ) {
  //
  //   const tx = t * 3 - 1.5;
  //   const ty = Math.sin( 2 * Math.PI * t );
  //   const tz = 0;
  //
  //   return optionalTarget.set( tx, ty, tz ).multiplyScalar( this.scale );
  //
  // }

}
