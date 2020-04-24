import * as BABYLON from 'babylonjs';
import * as dat from './dat.js';

// var canvas = document.getElementById('renderCanvas');
// // Load the 3D engine
// var engine = new BABYLON.Engine(canvas, true, {preserveDrawingBuffer: true, stencil: true});
// // CreateScene function that creates and return the scene
// var createScene = function(){
//     // Create a basic BJS Scene object
//     var scene = new BABYLON.Scene(engine);
//     // Create a FreeCamera, and set its position to {x: 0, y: 5, z: -10}
//     //var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -20), scene);
//     //var camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(0, 0, -10), scene);
//     var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, new BABYLON.Vector3(0, 0, 0), scene);
//     camera.setPosition(new BABYLON.Vector3(0, 0, 20));
//     // Target the camera to scene origin
//     //camera.setTarget(BABYLON.Vector3.Zero());
//     // Attach the camera to the canvas

//     camera.attachControl(canvas, true);
//     // Create a basic light, aiming 0, 1, 0 - meaning, to the sky
//     var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(1, 0, -1), scene);
//     // Create a built-in "sphere" shape; its constructor takes 6 params: name, segment, diameter, scene, updatable, sideOrientation
//     //var sphere = BABYLON.Mesh.CreateSphere('sphere1', 16, 2, scene, false, BABYLON.Mesh.FRONTSIDE);
//     var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {segments: 32, diameterY: 3, diameterX: 3, diameterZ: 3, sideOrienation: BABYLON.Mesh.BACKSIDE}, scene);

//     // Move the sphere upward 1/2 of its height
//     sphere.position.y = 1;
//     // Create a built-in "ground" shape; its constructor takes 6 params : name, width, height, subdivision, scene, updatable
//     //var myPlane = BABYLON.MeshBuilder.CreatePlane("myPlane", {width: 5, height: 2}, scene);

//     //var myGround = BABYLON.MeshBuilder.CreateGround("myGround", {width: 6, height: 4, subdivisions: 4}, scene);
//     // Return the created scene
//     return scene;
// }
// // call the createScene function
// var scene = createScene();
// // run the render loop
// engine.runRenderLoop(function(){
//     scene.render();
// });
// // the canvas/window resize event handler
// window.addEventListener('resize', function(){
//     engine.resize();
// });

if (BABYLON.Engine.isSupported()) {
  var canvas = document.getElementById("renderCanvas");
  var engine = new BABYLON.Engine(canvas, true);
  var scene = new BABYLON.Scene(engine);
  var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, new BABYLON.Vector3(0, 0, 0), scene);
  camera.setPosition(new BABYLON.Vector3(0, 5, 100));
  camera.attachControl(canvas, false);
  camera.lowerRadiusLimit = 50;
  camera.upperRadiusLimit = 500;
  var sun = new BABYLON.PointLight("sun", new BABYLON.Vector3(50, 50, 30), scene);
  scene.clearColor = new BABYLON.Color3(0, 0, 0);
  window.addEventListener("resize", function() {
      engine.resize()
  });
  engine.runRenderLoop(function() {
      scene.render()
  });
  var options;
  var earthSetup = function() {
      options = {
          biomes: "earth",
          clouds: true,
          mapSize: 1024,
          upperColor: new BABYLON.Color3(2, 1, 0),
          lowerColor: new BABYLON.Color3(0, .2, 1),
          haloColor: new BABYLON.Color3(0, .2, 1),
          maxResolution: 128,
          seed: .3,
          cloudSeed: .55,
          lowerClamp: new BABYLON.Vector2(.6, 1),
          groundAlbedo: 1.2,
          cloudAlbedo: 1,
          rings: false,
          ringsColor: new BABYLON.Color3(.6, .6, .6),
          directNoise: false,
          lowerClip: new BABYLON.Vector2(0, 0),
          range: new BABYLON.Vector2(.3, .35)
      }
  };
  earthSetup();
  var random = new BABYLON.DynamicTexture("random", 512, scene, false, BABYLON.Texture.NEAREST_SAMPLINGMODE);
  var random2 = new BABYLON.DynamicTexture("random", 512, scene, false, BABYLON.Texture.NEAREST_SAMPLINGMODE);
  var updateRandom = function(random) {
      var context = random.getContext();
      var data = context.getImageData(0, 0, 512, 512);
      for (var i = 0; i < 512 * 512 * 4; i++) {
          data.data[i] = Math.random() * 256 | 0
      }
      context.putImageData(data, 0, 0);
      random.update()
  };
  var skybox = BABYLON.Mesh.CreateBox("skyBox", 1e4, scene);
  var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
  skyboxMaterial.backFaceCulling = false;
  var files = ["./Space/space_left.jpg", "./Space/space_up.jpg", "./Space/space_front.jpg", "./Space/space_right.jpg", "./Space/space_down.jpg", "./Space/space_back.jpg"];
  skyboxMaterial.reflectionTexture = BABYLON.CubeTexture.CreateFromImages(files, scene);
  skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
  skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
  skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
  skyboxMaterial.disableLighting = true;
  skybox.material = skyboxMaterial;
  BABYLON.Engine.ShadersRepository = "/src/shaders/";
  var lensFlareSystem = new BABYLON.LensFlareSystem("lensFlareSystem", sun, scene);
  var flare00 = new BABYLON.LensFlare(.1, 0, new BABYLON.Color3(1, 1, 1), "space/Flare3.png", lensFlareSystem);
  var flare01 = new BABYLON.LensFlare(.4, .1, new BABYLON.Color3(1, 1, 1), "space/Flare.png", lensFlareSystem);
  var flare02 = new BABYLON.LensFlare(.2, .2, new BABYLON.Color3(1, 1, 1), "space/Flare.png", lensFlareSystem);
  var flare02 = new BABYLON.LensFlare(.1, .3, new BABYLON.Color3(1, 1, 1), "space/Flare3.png", lensFlareSystem);
  var flare03 = new BABYLON.LensFlare(.3, .4, new BABYLON.Color3(.5, .5, 1), "space/Flare.png", lensFlareSystem);
  var flare05 = new BABYLON.LensFlare(.8, 1, new BABYLON.Color3(1, 1, 1), "space/Flare2.png", lensFlareSystem);
  var flare05 = new BABYLON.LensFlare(.8, 1, new BABYLON.Color3(1, 1, 1), "space/Flare.png", lensFlareSystem);
  var flare02 = new BABYLON.LensFlare(.1, 1.3, new BABYLON.Color3(1, 1, 1), "space/Flare.png", lensFlareSystem);
  var flare03 = new BABYLON.LensFlare(.15, 1.4, new BABYLON.Color3(.5, .5, 1), "space/Flare.png", lensFlareSystem);
  var flare04 = new BABYLON.LensFlare(.05, 1.5, new BABYLON.Color3(1, 1, 1), "space/Flare3.png", lensFlareSystem);
  var noiseTexture;
  var cloudTexture;
  var planet = BABYLON.Mesh.CreateSphere("planet", 64, 30, scene);
  var planetImpostor = BABYLON.Mesh.CreateSphere("planetImpostor", 16, 28, scene);
  planetImpostor.isBlocker = true;
  planetImpostor.material = new BABYLON.StandardMaterial("impostor", scene);
  var shaderMaterial = new BABYLON.ShaderMaterial("shader", scene, {
      vertex: "./planet",
      fragment: "./planet"
  }, {
      attributes: ["position", "normal", "uv"],
      uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"],
      needAlphaBlending: true
  });
  shaderMaterial.setVector3("cameraPosition", camera.position);
  shaderMaterial.setVector3("lightPosition", sun.position);
  planet.material = shaderMaterial;
  var rings = BABYLON.Mesh.CreateGround("rings", 60, 60, 1, scene);
  rings.parent = planet;
  var ringsMaterial = new BABYLON.StandardMaterial("ringsMaterial", scene);
  ringsMaterial.diffuseTexture = new BABYLON.Texture("space/rings.png", scene);
  ringsMaterial.diffuseTexture.hasAlpha = true;
  ringsMaterial.backFaceCulling = false;
  rings.material = ringsMaterial;
  rings.receiveShadows = true;
  var shadowGenerator = new BABYLON.ShadowGenerator(2048, sun);
  shadowGenerator.getShadowMap().renderList.push(planetImpostor);
  shadowGenerator.setDarkness(.3);
  shadowGenerator.usePoissonSampling = true;
  var angle = 0;
  scene.registerBeforeRender(function() {
      var ratio = scene.getAnimationRatio();
      planet.rotation.y += .001 * ratio;
      shaderMaterial.setMatrix("rotation", BABYLON.Matrix.RotationY(angle));
      angle -= 4e-4 * ratio;
      shaderMaterial.setVector3("options", new BABYLON.Vector3(options.clouds, options.groundAlbedo, options.cloudAlbedo))
  });
  var engageRings = function() {
      rings.setEnabled(options.rings);
      ringsMaterial.diffuseColor = options.ringsColor;
      scene.shadowsEnabled = options.rings
  };
  var generateBiome = function() {
      if (noiseTexture) {
          noiseTexture.dispose();
          cloudTexture.dispose()
      }
      updateRandom(random);
      updateRandom(random2);
      noiseTexture = new BABYLON.ProceduralTexture("noise", options.mapSize, "./noise", scene, null, true, true);
      noiseTexture.setColor3("upperColor", options.upperColor);
      noiseTexture.setColor3("lowerColor", options.lowerColor);
      noiseTexture.setFloat("mapSize", options.mapSize);
      noiseTexture.setFloat("maxResolution", options.maxResolution);
      noiseTexture.setFloat("seed", options.seed);
      noiseTexture.setVector2("lowerClamp", options.lowerClamp);
      noiseTexture.setTexture("randomSampler", random);
      noiseTexture.setVector2("range", options.range);
      noiseTexture.setVector3("options", new BABYLON.Vector3(options.directNoise ? 1 : 0, options.lowerClip.x, options.lowerClip.y));
      noiseTexture.refreshRate = 0;
      shaderMaterial.setTexture("textureSampler", noiseTexture);
      cloudTexture = new BABYLON.ProceduralTexture("cloud", options.mapSize, "./noise", scene, null, true, true);
      cloudTexture.setTexture("randomSampler", random2);
      cloudTexture.setFloat("mapSize", options.mapSize);
      cloudTexture.setFloat("maxResolution", 256);
      cloudTexture.setFloat("seed", options.cloudSeed);
      cloudTexture.setVector3("options", new BABYLON.Vector3(1, 0, 1));
      cloudTexture.refreshRate = 0;
      shaderMaterial.setTexture("cloudSampler", cloudTexture);
      shaderMaterial.setColor3("haloColor", options.haloColor);
      engageRings()
  };
//   var gui = new dat.GUI;
//   var updateUI = function() {
//       for (var i in gui.__controllers) {
//           gui.__controllers[i].updateDisplay()
//       }
//   };
//   gui.add(options, "biomes", ["earth", "volcanic", "jungle", "icy", "desert", "islands", "moon"]).onFinishChange(function(biome) {
//       switch (biome) {
//           case "earth":
//               earthSetup();
//               break;
//           case "volcanic":
//               options.upperColor = new BABYLON.Color3(.9, .45, .45);
//               options.lowerColor = new BABYLON.Color3(1, 0, 0);
//               options.haloColor = new BABYLON.Color3(1, 0, .3);
//               options.seed = .3;
//               options.cloudSeed = .6;
//               options.clouds = false;
//               options.lowerClamp = new BABYLON.Vector2(0, 1);
//               options.maxResolution = 256;
//               options.cloudAlbedo = 0;
//               options.groundAlbedo = 1;
//               options.rings = false;
//               options.directNoise = false;
//               options.lowerClip = new BABYLON.Vector2(0, 0);
//               options.range = new BABYLON.Vector2(.3, .4);
//               break;
//           case "jungle":
//               options.upperColor = new BABYLON.Color3(.1, .6, .4);
//               options.lowerColor = new BABYLON.Color3(0, 1, .1);
//               options.haloColor = new BABYLON.Color3(.5, 1, .5);
//               options.seed = .4;
//               options.cloudSeed = .7;
//               options.clouds = true;
//               options.lowerClamp = new BABYLON.Vector2(0, 1);
//               options.maxResolution = 512;
//               options.cloudAlbedo = 1;
//               options.groundAlbedo = 1.1;
//               options.rings = false;
//               options.directNoise = false;
//               options.lowerClip = new BABYLON.Vector2(0, 0);
//               options.range = new BABYLON.Vector2(.2, .4);
//               break;
//           case "icy":
//               options.upperColor = new BABYLON.Color3(1, 1, 1);
//               options.lowerColor = new BABYLON.Color3(.7, .7, .9);
//               options.haloColor = new BABYLON.Color3(1, 1, 1);
//               options.seed = .8;
//               options.cloudSeed = .4;
//               options.clouds = true;
//               options.lowerClamp = new BABYLON.Vector2(0, 1);
//               options.maxResolution = 256;
//               options.cloudAlbedo = 1;
//               options.groundAlbedo = 1.1;
//               options.rings = true;
//               options.ringsColor = new BABYLON.Color3(.6, .6, .6);
//               options.directNoise = false;
//               options.lowerClip = new BABYLON.Vector2(0, 0);
//               options.range = new BABYLON.Vector2(.3, .4);
//               break;
//           case "desert":
//               options.upperColor = new BABYLON.Color3(.9, .3, 0);
//               options.lowerColor = new BABYLON.Color3(1, .5, .1);
//               options.haloColor = new BABYLON.Color3(1, .5, .1);
//               options.seed = .18;
//               options.cloudSeed = .6;
//               options.clouds = false;
//               options.lowerClamp = new BABYLON.Vector2(.3, 1);
//               options.maxResolution = 512;
//               options.cloudAlbedo = 1;
//               options.groundAlbedo = 1;
//               options.rings = false;
//               options.directNoise = false;
//               options.lowerClip = new BABYLON.Vector2(0, 0);
//               options.range = new BABYLON.Vector2(.3, .4);
//               break;
//           case "islands":
//               options.upperColor = new BABYLON.Color3(.4, 2, .4);
//               options.lowerColor = new BABYLON.Color3(0, .2, 2);
//               options.haloColor = new BABYLON.Color3(0, .2, 2);
//               options.seed = .15;
//               options.cloudSeed = .6;
//               options.clouds = true;
//               options.lowerClamp = new BABYLON.Vector2(.6, 1);
//               options.maxResolution = 512;
//               options.cloudAlbedo = 1;
//               options.groundAlbedo = 1.2;
//               options.rings = false;
//               options.directNoise = false;
//               options.lowerClip = new BABYLON.Vector2(0, 0);
//               options.range = new BABYLON.Vector2(.2, .3);
//               break;
//           case "moon":
//               options.haloColor = new BABYLON.Color3(0, 0, 0);
//               options.seed = .5;
//               options.clouds = false;
//               options.maxResolution = 256;
//               options.groundAlbedo = .7;
//               options.rings = false;
//               options.directNoise = true;
//               options.lowerClip = new BABYLON.Vector2(.5, .9);
//               break
//       }
//       generateBiome();
//       updateUI()
//   });
//   gui.add(options, "maxResolution", [128, 256, 512]).onChange(function() {
//       generateBiome()
//   });
//   gui.add(options, "clouds").onChange(function(value) {
//       options.clouds = value
//   });
//   gui.add(options, "rings").onChange(function(value) {
//       options.rings = value;
//       engageRings()
//   });
//   gui.add(options, "seed", .1, 1).onFinishChange(function() {
//       generateBiome()
//   });
//   gui.add(options, "cloudSeed", .1, 1).onFinishChange(function() {
//       generateBiome()
//   });
generateBiome();
}
