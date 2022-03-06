# flipball

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

# necessary change

error with WebXR change ./node_modules/@enable3d/three-graphics/jsm/plugins/index.js

```

INFO  Starting development server...
98% after emitting CopyPlugin

ERROR  Failed to compile with 1 error                                                                                                                                                        13:10:32

error  in ./node_modules/three/examples/jsm/webxr/VRButton.js

Module parse failed: Unexpected token (173:27)
You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
| 	}
|
> 	static xrSessionIsGranted = false;
|
| 	static registerSessionGrantedListener() {

@ ./node_modules/@enable3d/three-graphics/jsm/plugins/webxr.js 7:0-61 25:25-33
@ ./node_modules/@enable3d/three-graphics/jsm/plugins/index.js
@ ./node_modules/enable3d/dist/scene3d.js
@ ./node_modules/enable3d/dist/index.js
@ ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/Flipball.vue?vue&type=script&lang=js&
@ ./src/views/Flipball.vue?vue&type=script&lang=js&
@ ./src/views/Flipball.vue
@ ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/Home.vue?vue&type=script&lang=js&
@ ./src/views/Home.vue?vue&type=script&lang=js&
@ ./src/views/Home.vue
@ ./src/router/index.js
@ ./src/main.js
@ multi (webpack)-dev-server/client?http://192.168.1.22:8080&sockPath=/sockjs-node (webpack)/hot/dev-server.js ./src/main.js


```



```
/**
 * These Plugins are not included in the Core three-graphics package
 */
import Loaders from './loaders';
import Lights from './lights';
import Factories from '@enable3d/common/dist/factories';
import HeightMap from './heightmap';
import WarpSpeed from './warpSpeed';
import Mixers from './mixers';
import Misc, { TextureCube } from './misc';
import Transform from './transform';
//import WebXR from './webxr';
import HaveSomeFun from './haveSomeFun';
import Cameras from './cameras';
export { Loaders, Lights, Factories, HeightMap, WarpSpeed, Mixers, Misc, TextureCube, Transform/*, WebXR*/, HaveSomeFun, Cameras };
//# sourceMappingURL=index.js.map

```
# freesound bank
- https://freesound.org/people/michorvath/sounds/269718/
- sound packs https://freesound.org/browse/packs/?order=-num_sounds&page=2#pack
- notes https://tonejs.github.io/audio/salamander/A3.mp3
