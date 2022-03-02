import { Keyboard } from '@yandeu/keyboard'
const keyboard = new Keyboard()
import { Tap } from '@yandeu/tap'
const el = document.getElementById('myCanvas')
const tap = new Tap(el)

export class Play  {
  // actions
  constructor( ) {
    console.log("play")
    this.actions = {l: 0, r: 0, u: 0, d: 0 }



    tap.on.down(({ position }) => {
      //console.log('down', position, event)


      if (position.y < window.innerHeight/2){
        this.actions.tapeUp = 1
      }else if(position.y > window.innerHeight/2){
        if(position.x < window.innerWidth /2){
          this.actions.tapeLeft = 1
        }else{
          this.actions.tapeRight = 1
        }
      }

    })

    tap.on.up(() => {
      //  console.log('up:', position, event)
      this.actions.tapeRight = 0
      this.actions.tapeLeft = 0

    })


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
