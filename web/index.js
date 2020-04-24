import * as BABYLON from 'babylonjs';

if (BABYLON.Engine.isSupported()) {
  var canvas = document.getElementById("renderCanvas");
  var engine = new BABYLON.Engine(canvas, true);
  var scene = new BABYLON.Scene(engine);
  var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, new BABYLON.Vector3(0, 0, 0), scene);

  camera.setPosition(new BABYLON.Vector3(0, 5, 150));
  camera.attachControl(canvas, false);

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

  var terrain = new BABYLON.DynamicTexture("random", 512, scene, false, BABYLON.Texture.NEAREST_SAMPLINGMODE);
  var clouds = new BABYLON.DynamicTexture("random", 512, scene, false, BABYLON.Texture.NEAREST_SAMPLINGMODE);
  
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
  var files = [
    "./space/space_left.jpg", 
    "./space/space_up.jpg", 
    "./space/space_front.jpg", 
    "./space/space_right.jpg", 
    "./space/space_down.jpg", 
    "./space/space_back.jpg"];

  skyboxMaterial.reflectionTexture = BABYLON.CubeTexture.CreateFromImages(files, scene);
  skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
  skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
  skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
  skyboxMaterial.disableLighting = true;
  skybox.material = skyboxMaterial;

  var lensFlareSystem = new BABYLON.LensFlareSystem("lensFlareSystem", sun, scene);
  new BABYLON.LensFlare(.1, 0, new BABYLON.Color3(1, 1, 1), "space/Flare3.png", lensFlareSystem);
  new BABYLON.LensFlare(.4, .1, new BABYLON.Color3(1, 1, 1), "space/Flare.png", lensFlareSystem);
  new BABYLON.LensFlare(.2, .2, new BABYLON.Color3(1, 1, 1), "space/Flare.png", lensFlareSystem);
  new BABYLON.LensFlare(.1, .3, new BABYLON.Color3(1, 1, 1), "space/Flare3.png", lensFlareSystem);
  new BABYLON.LensFlare(.3, .4, new BABYLON.Color3(.5, .5, 1), "space/Flare.png", lensFlareSystem);
  new BABYLON.LensFlare(.8, 1, new BABYLON.Color3(1, 1, 1), "space/Flare2.png", lensFlareSystem);
  new BABYLON.LensFlare(.8, 1, new BABYLON.Color3(1, 1, 1), "space/Flare.png", lensFlareSystem);
  new BABYLON.LensFlare(.1, 1.3, new BABYLON.Color3(1, 1, 1), "space/Flare.png", lensFlareSystem);
  new BABYLON.LensFlare(.15, 1.4, new BABYLON.Color3(.5, .5, 1), "space/Flare.png", lensFlareSystem);
  new BABYLON.LensFlare(.05, 1.5, new BABYLON.Color3(1, 1, 1), "space/Flare3.png", lensFlareSystem);

  var noiseTexture;
  var cloudTexture;

  var planet = BABYLON.Mesh.CreateSphere("planet", 64, 30, scene);
  var planetImpostor = BABYLON.Mesh.CreateSphere("planetImpostor", 16, 28, scene);
  planetImpostor.isBlocker = true;
  planetImpostor.material = new BABYLON.StandardMaterial("impostor", scene);
  var shaderMaterial = new BABYLON.ShaderMaterial("shader", scene, {
      vertex: "./space/planet",
      fragment: "./space/planet"
  }, {
      attributes: ["position", "normal", "uv"],
      uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"],
      needAlphaBlending: true
  });
  shaderMaterial.setVector3("cameraPosition", camera.position);
  shaderMaterial.setVector3("lightPosition", sun.position);
  planet.material = shaderMaterial;

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

  var generateBiome = function() {
      updateRandom(terrain);
      updateRandom(clouds);
      noiseTexture = new BABYLON.ProceduralTexture("noise", options.mapSize, "./space/noise", scene, null, true, true);
      noiseTexture.setColor3("upperColor", options.upperColor);
      noiseTexture.setColor3("lowerColor", options.lowerColor);
      noiseTexture.setFloat("mapSize", options.mapSize);
      noiseTexture.setFloat("maxResolution", options.maxResolution);
      noiseTexture.setFloat("seed", options.seed);
      noiseTexture.setVector2("lowerClamp", options.lowerClamp);
      noiseTexture.setTexture("randomSampler", terrain);
      noiseTexture.setVector2("range", options.range);
      noiseTexture.setVector3("options", new BABYLON.Vector3(options.directNoise ? 1 : 0, options.lowerClip.x, options.lowerClip.y));
      noiseTexture.refreshRate = 0;
      shaderMaterial.setTexture("textureSampler", noiseTexture);
      cloudTexture = new BABYLON.ProceduralTexture("cloud", options.mapSize, "./space/noise", scene, null, true, true);
      cloudTexture.setTexture("randomSampler", clouds);
      cloudTexture.setFloat("mapSize", options.mapSize);
      cloudTexture.setFloat("maxResolution", 256);
      cloudTexture.setFloat("seed", options.cloudSeed);
      cloudTexture.setVector3("options", new BABYLON.Vector3(1, 0, 1));
      cloudTexture.refreshRate = 0;
      shaderMaterial.setTexture("cloudSampler", cloudTexture);
      shaderMaterial.setColor3("haloColor", options.haloColor);
  };

  earthSetup();
  generateBiome();
}
