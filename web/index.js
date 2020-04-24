import * as BABYLON from 'babylonjs';
import { Planet } from './planet.js';
import { Background } from './background.js';
import { Sun } from './sun.js';

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

  var myBox = BABYLON.MeshBuilder.CreateBox("player", {height: 3, width: 3, depth: 3}, scene);
  //myBox.position.x = 0;
  myBox.position.z = 30;
  myBox.position.y = -10;
  myBox.parent = camera;


  var npc = BABYLON.MeshBuilder.CreateBox("npc", {height: 3, width: 3, depth: 3}, scene);
  npc.position.y = -5;
  npc.position.x = -5;
  npc.position.z = 100;
  var animationBox = new BABYLON.Animation("myAnimation", "position.x", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
  // An array with all animation keys
  var keys = []; 
  
  //At the animation key 0, the value of position"
  keys.push({
    frame: 0,
    value: 5  
  });

  //At the animation key 20"
  keys.push({
    frame: 20,
    value: -20, 
  });

  //At the animation key 100"
  keys.push({
    frame: 100,
    value: 5 
  });

  animationBox.setKeys(keys);
  npc.animations = [];
  npc.animations.push(animationBox);
  scene.beginAnimation(npc, 0, 100, true);


  window.addEventListener("resize", function() {
    engine.resize()
  });
  engine.runRenderLoop(function() {
      scene.render()
  });
}
