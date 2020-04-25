import * as BABYLON from 'babylonjs';
import { Planet } from './src/planet.js';
import { Background } from './src/background.js';
import { Sun } from './src/sun.js';
import { NPC } from './src/npc.js';
import { Player } from './src/player.js';

if (BABYLON.Engine.isSupported()) {
  var canvas = document.getElementById("renderCanvas");
  var engine = new BABYLON.Engine(canvas, true);
  var scene = new BABYLON.Scene(engine);
  var camera = new BABYLON.UniversalCamera("universalCamera", new BABYLON.Vector3(0, 0, 170), scene);

  camera.setTarget(BABYLON.Vector3.Zero());
  camera.attachControl(canvas, false);

  camera.ellipsoid = new BABYLON.Vector3(300, 300, 300);
  scene.collisionsEnabled = true;
  camera.checkCollisions = true;

  var background = new Background(scene);
  var sun = new Sun(scene, {x: 50, y: 50, z: 30});
  var planet = new Planet(scene, {camera: camera, light: sun.light, x: -40, y: -20, z: -100, radius: 30, biome: "earth"});
  var moon1 = new Planet(scene, {camera: camera, light: sun.light, x: -60, y: -10, z: -10, ox: -40, oy: -20, oz: -100, radius: 5, biome: "moon"});
  var moon2 = new Planet(scene, {camera: camera, light: sun.light, x: -60, y: -10, z: -20, ox: -30, oy: -10, oz: -60, radius: 2, biome: "volcanic"});
  //var npc = new NPC(scene);
  //npc.orbit(30);
  moon1.orbit(50, Math.PI/40);
  moon2.orbit(70, Math.PI/160);

  new Player(scene, {camera: camera, x: 0, y: -10, z: 30})

  window.addEventListener("resize", function() {
    engine.resize()
  });
  engine.runRenderLoop(function() {
      scene.render()
  });
}
