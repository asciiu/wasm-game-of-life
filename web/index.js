import * as BABYLON from 'babylonjs';
import { Planet } from './planet.js';
import { Background } from './background.js';
import { Sun } from './sun.js';

if (BABYLON.Engine.isSupported()) {
  var canvas = document.getElementById("renderCanvas");
  var engine = new BABYLON.Engine(canvas, true);
  var scene = new BABYLON.Scene(engine);
  var camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(0, 5, 150), scene);

  camera.setTarget(BABYLON.Vector3.Zero());
  camera.attachControl(canvas, false);

  var sun = new Sun(scene);
  var planet = new Planet(scene, camera, sun.light);
  var background = new Background(scene);

  window.addEventListener("resize", function() {
    engine.resize()
  });
  engine.runRenderLoop(function() {
      scene.render()
  });
}
