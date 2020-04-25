import * as BABYLON from 'babylonjs';
import { Planet } from './planet.js';
import { Background } from './background.js';
import { Sun } from './sun.js';
import { NPC } from './npc.js';

if (BABYLON.Engine.isSupported()) {
  var canvas = document.getElementById("renderCanvas");
  var engine = new BABYLON.Engine(canvas, true);
  var scene = new BABYLON.Scene(engine);
  var camera = new BABYLON.UniversalCamera("universalCamera", new BABYLON.Vector3(0, 0, 150), scene);

  camera.setTarget(BABYLON.Vector3.Zero());
  camera.attachControl(canvas, false);

  camera.ellipsoid = new BABYLON.Vector3(300, 300, 300);
  scene.collisionsEnabled = true;
  camera.checkCollisions = true;

  var sun = new Sun(scene);
  var planet = new Planet(scene, camera, sun.light);
  var background = new Background(scene);
  var npc = new NPC(scene);

  var myBox = BABYLON.MeshBuilder.CreateBox("player", {height: 3, width: 3, depth: 3}, scene);
  myBox.position.z = 30;
  myBox.position.y = -10;
  myBox.parent = camera;




  window.addEventListener("resize", function() {
    engine.resize()
  });
  engine.runRenderLoop(function() {
      scene.render()
  });
}
