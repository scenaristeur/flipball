import { Project, PhysicsLoader} from 'enable3d'
import { MainScene } from './scene'


PhysicsLoader('/ammo', () => new Project(
  { gravity: { x: 0, y: -9.81, z: 4},
  scenes: [MainScene],
  antialias: true,
  maxSubSteps: 20, //10
  fixedTimeStep: 1 / 360, // 1/240
}))
