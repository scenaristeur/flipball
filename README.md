# flipball

nodejs 16

```nvm use 16```
# WebXRplugin bug
there is a bug, see "necessary change" below to resolve it

# create your table
in "table" folder, create a new 'my-table' folder and copy /tables/flipball/config.json to it
then customize it
then add it to /views/TableSelector.vue options with value "my-table"

```
      options: [
        // { value: null, text: 'Please select a table' },
        { value: 'flipball', text: 'Flipball' },
    --> { value: 'my-table', text: 'My Table' },
        { value: 'marble', text: 'Marble' , disabled:true},
        { value: 'modele', text: 'Modele' , disabled:true},
        { value: 'd', text: 'Create your own', disabled: true }
      ]
```

```json
{
  "table": {
    "width": 20,
    "height": 20,
    "mass": 100,
    "collisionFlags": 1,
    "rotation":  {
      "x": "-1.5",
      "y": 0,
      "z": 0
    },
    "color": "#ff96fc"
  },
  "flipper_parts": [
    {
      "file": "rubber",
      "name": "bat_left",
      "shape": "concave",
      "position": {"x":"-1.75", "y":0.1, "z":9.05},
      "scale": {"x": ".5", "y": 1.5, "z": ".5"}
    },
    {
      "file": "rubber",
      "name": "bat_right",
      "shape": "concave",
      "position": {"x":1.75, "y": 0.55, "z":9.05},
      "rotation": {"x": 0, "y": 0, "z": 3.14},
      "scale": {"x": 0.5, "y": 1.5, "z": 0.5}
    }
  ],
  "walls": [
    {
      "name": "bottom_left_wall",
      "type": "box",
      "position": {
        "x": -5.2,
        "y": 0.5,
        "z": 5.9
      },
      "rotation": {
        "x": 0,
        "y": -0.7,
        "z": 0
      },
      "width": 8.5,
      "height": 0.5,
      "depth": 0.1,
      "collisionFlags": 2,
      "color": "#ff96fc"
    },
    {
      "name": "bottom_right_wall",
      "type": "box",
      "position": {
        "x": 5.2,
        "y": 0.5,
        "z": 5.9
      },
      "rotation": {
        "x": 0,
        "y": 0.7,
        "z": 0
      },
      "width": 8.5,
      "height": 0.5,
      "depth": 0.1,
      "collisionFlags": 2,
      "color": "red"
    },
    {
      "name": "side_left_wall",
      "type": "box",
      "position": {
        "x": -8.3,
        "y": 0.5,
        "z": 0
      },
      "rotation": {
        "x": 0,
        "y": "-1.57",
        "z": 0
      },
      "width": 7,
      "height": 0.5,
      "depth": 0.1,
      "collisionFlags": 2,
      "color": "pink"
    },
    {
      "name": "side_right_wall",
      "type": "box",
      "position": {
        "x": 8.7,
        "y": 0.5,
        "z": "-2"
      },
      "rotation": {
        "x": 0,
        "y": "-1.06",
        "z": 0
      },
      "width": 4,
      "height": 0.5,
      "depth": 0.1,
      "collisionFlags": 2,
      "color": "red"
    },
    {
      "name": "top_left_wall",
      "type": "box",
      "position": {
        "x": "-5.2",
        "y": 0.5,
        "z": "-5.9"
      },
      "rotation": {
        "x": 0,
        "y": 0.7,
        "z": 0
      },
      "width": 8,
      "height": 0.5,
      "depth": 0.1,
      "collisionFlags": 2,
      "color": "red"
    },
    {
      "name": "top_right_wall",
      "type": "box",
      "position": {
        "x": 5.2,
        "y": 0.5,
        "z": "-5.9"
      },
      "rotation": {
        "x": 0,
        "y": "-0.7",
        "z": 0
      },
      "width": 8,
      "height": 0.5,
      "depth": 0.1,
      "collisionFlags": 2,
      "color": "red"
    },
    {
      "name": "top_wall",
      "type": "box",
      "position": {
        "x": 0,
        "y": 0.5,
        "z": "-8.5"
      },
      "rotation": {
        "x": 0,
        "y": 0,
        "z": 0
      },
      "width": 6,
      "height": 0.5,
      "depth": 0.1,
      "collisionFlags": 2,
      "color": "pink"
    },
    {
      "name": "middle_wall",
      "type": "box",
      "position": {
        "x": "-5",
        "y": 0.5,
        "z": "-0.5"
      },
      "rotation": {
        "x": 0.2,
        "y": 0.6,
        "z": 1
      },
      "width": 6,
      "height": 0.5,
      "depth": 0.1,
      "collisionFlags": 2,
      "color": "purple"
    }
  ],
  "launcher": {
    "position": {
      "x": 9,
      "y": ".2",
      "z": 8
    },
    "force" : 5
  },
  "obstacles": [
    {
      "name" :  "cube_meuh_milou",
      "actif" : true,
      "type": "box",
      "position": {
        "x": "-3",
        "y": 0.5,
        "z": 4
      },
      "rotation": {
        "x": 0,
        "y": 1.05,
        "z": 0
      },
      "width": 1,
      "height": 1,
      "depth":  1,
      "collisionFlags": 2,
      "color": "red",
      "onCollision": {
        "score" : 10,
        "sound" : "t-rex-roar.mp3"
      }
    },
    {
      "name" :  "cube_vert",
      "actif" : true,
      "type": "box",
      "position": {
        "x": 3,
        "y": 0.5,
        "z": -5.5
      },
      "rotation": {
        "x": 0,
        "y": 1.05,
        "z": 0
      },
      "width": 1,
      "height": 1,
      "depth":  1,
      "collisionFlags": 2,
      "color": "green",
      "onCollision": {
        "score" : 10,
        "sound" : "t-rex-roar.mp3"
      }
    },
    {
      "name" :  "carre_plat_rouge",
      "actif" : true,
      "type": "box",
      "position": {
        "x": 0,
        "y": 0.5,
        "z": -4
      },
      "rotation": {
        "x": 0,
        "y": 1.05,
        "z": 0
      },
      "width": 3,
      "height": 0.5,
      "depth":  3,
      "collisionFlags": 2,
      "color": "red",
      "opacity": 0.5,
      "onCollision": {
        "score" : 100,
        "sound" : "t-rex-roar.mp3"
      }
    },
    {
      "name" :  "custom_sin_curve",
      "actif" : true,
      "type": "custom_sin_curve",
      "position": {
        "x": 0,
        "y": 0.5,
        "z": -4
      },
      "rotation": {
        "x": 0,
        "y": 1.05,
        "z": 0
      },
      "width": 3,
      "height": 0.5,
      "depth":  3,
      "collisionFlags": 2,
      "color": "red",
      "opacity": 0.5,
      "onCollision": {
        "score" : 100,
        "sound" : "t-rex-roar.mp3"
      }
    }
  ],
  "tubes" : [
    {"name": "premier_tube",
      "segments" : 20,
      "radius": 0.05,
      "radialSegments": 8,
      "positions" : [
        {"x": "3", "y": 0.5, "z": "-4" },
        {"x": 4, "y": 0.5, "z": "-1" },
        {"x": 4, "y": ".5", "z": "2" },
        {"x": 3, "y": ".5", "z": "5" }
      ]
    },
    {"name": "deuxime_tube",
      "segments" : 20,
      "radius": 0.05,
      "radialSegments": 8,
      "positions" : [

        {"x": "-4", "y": 0.5, "z":5 },
        {"x": "-5.5", "y": 0.5, "z": 3 },
        {"x": "-6.5", "y": ".5", "z": "1.5" },
        {"x": "-7", "y": ".5", "z": "-1" }
      ]
    }
  ]
}



```






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
--> comment webXR plugin ligne 12 & 15

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
