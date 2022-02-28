

## Install & Run

```console
# download this repo
npx gitget enable3d/threejs-ammojs-webpack-example enable3d-webpack

# navigate into the directory
cd enable3d-webpack

# install
npm install

# start
npm start
```





https://threejs-university.com/2021/08/17/comprendre-et-utiliser-la-physique-dans-three-js-avec-ammo-js/

1 see experiments

2 cd enable3D_webpack
'npm run start'

tuto - https://www.youtube.com/watch?v=j6nv3JIAFLk
see enable3D_webpack/scripts/index.ts

- mise en place rapide https://enable3d.io/docs.html
warpspeed()
" Warp Speed

When building your projects, you need to set up the third-dimension most of the time. For instance, you need a basic setup with at least one camera, lights, orbit controls, and so on. To design all these things takes a long time.

You can shorten that time by using Enable3d warpSpeed() function. The function supports the following features:
"

# body types
https://github.com/bulletphysics/bullet3/blob/aae8048722f2596f7e2bdd52d2a1dcb52a218f2b/src/BulletCollision/CollisionDispatch/btCollisionObject.h#L128
    0 - Dynamic
    1 - Static
    2 - Kinematic
    4 - Ghost (aka Sensor or NO_CONTACT_RESPONSE).

# hinge doc on babylon
https://doc.babylonjs.com/divingDeeper/physics/joints#hinge-joint
with body.applyImpulse https://github.com/enable3d/enable3d/blob/af247fe4bb8de2d1ac4265162cc4abb57cf71dea/packages/common/src/physicsBody.ts#L270

# parts
- https://pinballmakers.com/wiki/index.php?title=Files_Section
- concertisseur sldrt https://anyconv.com/fr/sldprt-convertisseur/ en stl
- autre convertisseurs https://jedok.com/converter/sldasm
- import stl https://github.com/mrdoob/three.js/blob/master/examples/webgl_loader_stl.html

# convertisseur solidworks to stl
- https://anyconv.com/fr/sldprt-convertisseur/
- convertisseur multi
- https://miconv.com/fr/convertir-sldprt-en-stl/
- test playground
- https://threejs.org/editor/
- demo code
- https://jsfiddle.net/5gLeb5vk/4/

# blender decrease vertex number
- https://blender.stackexchange.com/questions/31467/how-to-reduce-vertex-count-on-a-mesh
reduire le nombre de vertice / faces : Edit mode , X, Limited dissolve
