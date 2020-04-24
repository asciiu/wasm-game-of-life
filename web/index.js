import * as BABYLON from 'babylonjs';
import { Planet } from './planet.js';
import { Background } from './background.js';
import { Sun } from './sun.js';

if (BABYLON.Engine.isSupported()) {
  var canvas = document.getElementById("renderCanvas");
  var engine = new BABYLON.Engine(canvas, true);
  var scene = new BABYLON.Scene(engine);
  var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, new BABYLON.Vector3(0, 0, 0), scene);

  camera.setPosition(new BABYLON.Vector3(0, 5, 150));
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
