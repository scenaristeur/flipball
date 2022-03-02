import { Keyboard } from '@yandeu/keyboard'
const keyboard = new Keyboard()


export class Play  {
  // actions
  constructor( ) {
    console.log("play")
    this.actions = {l: 0, r: 0, u: 0, d: 0 }
    keyboard.watch.down( keyCode => {
      switch (keyCode) {
        case 'ArrowLeft':
        this.actions.l = 1
        break;
        case 'ArrowRight':
        this.actions.r = 1
        break;
        case 'ArrowUp':
        this.actions.u = 1
        break;
        case 'ArrowDown':
        this.actions.d = 1
        break;
        case 'Space':
        // console.log(camera)
        break;
      }
    })

    keyboard.watch.up( keyCode => {
      switch (keyCode) {
        case 'ArrowLeft':
        this.actions.l = 0
        break;
        case 'ArrowRight':
        this.actions.r = 0
        break;
        case 'ArrowUp':
        this.actions.u = 0
        break;
        case 'ArrowDown':
        this.actions.d = 0
        break;
      }
    })
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
