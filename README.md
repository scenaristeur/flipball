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
