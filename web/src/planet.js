import * as BABYLON from 'babylonjs';

export class Planet {
    constructor(scene, {
        camera: camera,
        light: light,
        x: x,
        y: y,
        z: z,
        radius: radius,
        biome: biome,
    }) {
        var options = {
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

        var terrain = new BABYLON.DynamicTexture("random", 512, scene, false, BABYLON.Texture.NEAREST_SAMPLINGMODE);
        var clouds = new BABYLON.DynamicTexture("random", 512, scene, false, BABYLON.Texture.NEAREST_SAMPLINGMODE);

        var updateRandomSurface = function (random) {
            var context = random.getContext();
            var data = context.getImageData(0, 0, 512, 512);
            for (var i = 0; i < 512 * 512 * 4; i++) {
                data.data[i] = Math.random() * 256 | 0
            }
            context.putImageData(data, 0, 0);
            random.update()
        };

        var noiseTexture;
        var cloudTexture;

        var diameter = radius * 2;

        var planetShell = BABYLON.Mesh.CreateSphere("planet", 64, diameter, scene);
        planetShell.position.x = x;
        planetShell.position.y = y;
        planetShell.position.z = z;

        // the diameter should be 2 less than the shell 
        var planetBody = BABYLON.Mesh.CreateSphere("planetBody", 16, diameter - 3, scene);
        planetBody.material = new BABYLON.StandardMaterial("impostor", scene);
        planetBody.checkCollisions = true;
        planetBody.isBlocker = true;
        planetBody.position.x = x;
        planetBody.position.y = y;
        planetBody.position.z = z;

        var shaderMaterial = new BABYLON.ShaderMaterial("shader", scene, {
            vertex: "./space/planet",
            fragment: "./space/planet"
        }, {
            attributes: ["position", "normal", "uv"],
            uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"],
            needAlphaBlending: true
        });
        shaderMaterial.setVector3("cameraPosition", camera.position);
        shaderMaterial.setVector3("lightPosition", light.position);
        planetShell.material = shaderMaterial;

        var shadowGenerator = new BABYLON.ShadowGenerator(2048, light);
        shadowGenerator.getShadowMap().renderList.push(planetBody);
        shadowGenerator.setDarkness(.3);
        shadowGenerator.usePoissonSampling = true;
        var angle = 0;

        scene.registerBeforeRender(function () {
            var ratio = scene.getAnimationRatio();
            planetShell.rotation.y += .001 * ratio;
            shaderMaterial.setMatrix("rotation", BABYLON.Matrix.RotationY(angle));
            angle -= 4e-4 * ratio;
            shaderMaterial.setVector3("options", new BABYLON.Vector3(options.clouds, options.groundAlbedo, options.cloudAlbedo))
        });

        var generateBiome = function (biome) {

            switch (biome) {
                case "earth":
                    //earthSetup();
                    break;
                case "volcanic":
                    options.upperColor = new BABYLON.Color3(.9, .45, .45);
                    options.lowerColor = new BABYLON.Color3(1, 0, 0);
                    options.haloColor = new BABYLON.Color3(1, 0, .3);
                    options.seed = .3;
                    options.cloudSeed = .6;
                    options.clouds = false;
                    options.lowerClamp = new BABYLON.Vector2(0, 1);
                    options.maxResolution = 256;
                    options.cloudAlbedo = 0;
                    options.groundAlbedo = 1;
                    options.rings = false;
                    options.directNoise = false;
                    options.lowerClip = new BABYLON.Vector2(0, 0);
                    options.range = new BABYLON.Vector2(.3, .4);
                    break;
                case "jungle":
                    options.upperColor = new BABYLON.Color3(.1, .6, .4);
                    options.lowerColor = new BABYLON.Color3(0, 1, .1);
                    options.haloColor = new BABYLON.Color3(.5, 1, .5);
                    options.seed = .4;
                    options.cloudSeed = .7;
                    options.clouds = true;
                    options.lowerClamp = new BABYLON.Vector2(0, 1);
                    options.maxResolution = 512;
                    options.cloudAlbedo = 1;
                    options.groundAlbedo = 1.1;
                    options.rings = false;
                    options.directNoise = false;
                    options.lowerClip = new BABYLON.Vector2(0, 0);
                    options.range = new BABYLON.Vector2(.2, .4);
                    break;
                case "icy":
                    options.upperColor = new BABYLON.Color3(1, 1, 1);
                    options.lowerColor = new BABYLON.Color3(.7, .7, .9);
                    options.haloColor = new BABYLON.Color3(1, 1, 1);
                    options.seed = .8;
                    options.cloudSeed = .4;
                    options.clouds = true;
                    options.lowerClamp = new BABYLON.Vector2(0, 1);
                    options.maxResolution = 256;
                    options.cloudAlbedo = 1;
                    options.groundAlbedo = 1.1;
                    options.rings = true;
                    options.ringsColor = new BABYLON.Color3(.6, .6, .6);
                    options.directNoise = false;
                    options.lowerClip = new BABYLON.Vector2(0, 0);
                    options.range = new BABYLON.Vector2(.3, .4);
                    break;
                case "desert":
                    options.upperColor = new BABYLON.Color3(.9, .3, 0);
                    options.lowerColor = new BABYLON.Color3(1, .5, .1);
                    options.haloColor = new BABYLON.Color3(1, .5, .1);
                    options.seed = .18;
                    options.cloudSeed = .6;
                    options.clouds = false;
                    options.lowerClamp = new BABYLON.Vector2(.3, 1);
                    options.maxResolution = 512;
                    options.cloudAlbedo = 1;
                    options.groundAlbedo = 1;
                    options.rings = false;
                    options.directNoise = false;
                    options.lowerClip = new BABYLON.Vector2(0, 0);
                    options.range = new BABYLON.Vector2(.3, .4);
                    break;
                case "islands":
                    options.upperColor = new BABYLON.Color3(.4, 2, .4);
                    options.lowerColor = new BABYLON.Color3(0, .2, 2);
                    options.haloColor = new BABYLON.Color3(0, .2, 2);
                    options.seed = .15;
                    options.cloudSeed = .6;
                    options.clouds = true;
                    options.lowerClamp = new BABYLON.Vector2(.6, 1);
                    options.maxResolution = 512;
                    options.cloudAlbedo = 1;
                    options.groundAlbedo = 1.2;
                    options.rings = false;
                    options.directNoise = false;
                    options.lowerClip = new BABYLON.Vector2(0, 0);
                    options.range = new BABYLON.Vector2(.2, .3);
                    break;
                case "moon":
                    options.haloColor = new BABYLON.Color3(0, 0, 0);
                    options.seed = .5;
                    options.clouds = false;
                    options.maxResolution = 256;
                    options.groundAlbedo = .7;
                    options.rings = false;
                    options.directNoise = true;
                    options.lowerClip = new BABYLON.Vector2(.5, .9);
                    break
            }

            updateRandomSurface(terrain);
            updateRandomSurface(clouds);
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

        generateBiome(biome);
    }
}