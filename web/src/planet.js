import * as BABYLON from 'babylonjs';

export class Planet {
    constructor(scene, {
        camera: camera,
        light: light,
        x: x,
        y: y,
        z: z,
        ox: ox,
        oy: oy,
        oz: oz,
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
            maxResolution: 64,
            seed: .3,
            cloudSeed: .55,
            lowerClamp: new BABYLON.Vector2(.6, 1),
            groundAlbedo: 1.1,
            cloudAlbedo: .9,
            directNoise: false,
            lowerClip: new BABYLON.Vector2(0, 0),
            range: new BABYLON.Vector2(.3, .35)
        }

        var terrain = new BABYLON.DynamicTexture("random", 128, scene, false, BABYLON.Texture.NEAREST_SAMPLINGMODE);
        var clouds = new BABYLON.DynamicTexture("random", 128, scene, false, BABYLON.Texture.NEAREST_SAMPLINGMODE);

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
        var cx =  (ox > 0) ? ox * Math.cos(0): x;
        var cy =  (oy > 0) ? oy * Math.cos(0): y;
        var cz =  (oz > 0) ? oz * Math.sin(0): z;

        var planetShell = BABYLON.Mesh.CreateSphere("planet", 64, diameter, scene, false, BABYLON.Mesh.FRONTSIDE);
        planetShell.position.x = cx;
        planetShell.position.y = cy;
        planetShell.position.z = cz;
        planetShell.receiveShadows = true;
        planetShell.checkCollisions = true;

        // the diameter should be 3 less than the shell 
        //var planetBody = BABYLON.Mesh.CreateSphere("planetBody", 32, diameter-3, scene);
        //planetBody.isBlocker = true;
        //planetBody.checkCollisions = true;
        //planetBody.position.x = cx;
        //planetBody.position.y = cy;
        //planetBody.position.z = cz;

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
        
        var angle = 0;
        scene.registerBeforeRender(function () {
            var ratio = scene.getAnimationRatio();
            planetShell.rotation.y += .001 * ratio;
            shaderMaterial.setMatrix("rotation", BABYLON.Matrix.RotationY(angle));
            angle -= 4e-4 * ratio;
            shaderMaterial.setVector3("options", new BABYLON.Vector3(options.clouds, options.groundAlbedo, options.cloudAlbedo))
        });

        var generateBiome = function(biome) {
            switch (biome) {
                case "earth":
                    //earthSetup();
                    break;
                case "volcanic":
                    options.upperColor = new BABYLON.Color3(.9, .45, .45);
                    options.lowerColor = new BABYLON.Color3(.6, 0, 0);
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

            if (noiseTexture) {
                noiseTexture.dispose();
                cloudTexture.dispose()
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
            shaderMaterial.setTexture("textureSampler", noiseTexture);
            cloudTexture = new BABYLON.ProceduralTexture("cloud", options.mapSize, "./space/noise", scene, null, true, true);
            cloudTexture.setTexture("randomSampler", clouds);
            cloudTexture.setFloat("mapSize", options.mapSize);
            cloudTexture.setFloat("maxResolution", 256);
            cloudTexture.setFloat("seed", options.cloudSeed);
            cloudTexture.setVector3("options", new BABYLON.Vector3(1, 0, 1));
            shaderMaterial.setTexture("cloudSampler", cloudTexture);
            shaderMaterial.setColor3("haloColor", options.haloColor);
        };

        generateBiome(biome);

        var cx =  ox * Math.cos(0);
        var cy =  oy * Math.cos(0);
        var cz =  oz * Math.sin(0);
        this.orbitCenter = new BABYLON.Vector3(ox, oy, oz);
        this.planetShell = planetShell;
        //this.planetBody = planetBody;
        this.scene = scene;
        this.planetShell.animations = [];
        //this.planetBody.animations = [];
        this.radian = 0;
    }

    moveX(x) {
        var animationX = new BABYLON.Animation(
            "myAnimation",
            "position.x",
            30,
            BABYLON.Animation.ANIMATIONTYPE_FLOAT,
            BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

        var keys = [];
        keys.push({
            frame: 0,
            value: this.planetShell.position.x
        });

        keys.push({
            frame: 100,
            value: x
        });

        animationX.setKeys(keys);
        this.planetShell.animations.push(animationX);
        //this.planetBody.animations.push(animationX);
    }

    moveY(y) {
        var animationY = new BABYLON.Animation(
            "myAnimation",
            "position.y",
            30,
            BABYLON.Animation.ANIMATIONTYPE_FLOAT,
            BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

        var keys = [];
        keys.push({
            frame: 0,
            value: this.planetShell.position.y 
        });

        keys.push({
            frame: 100,
            value: y
        });

        animationY.setKeys(keys);
        this.planetShell.animations.push(animationY);
        //this.planetBody.animations.push(animationY);
    }

    moveZ(z) {
        var animationZ = new BABYLON.Animation(
            "myAnimation",
            "position.z",
            30,
            BABYLON.Animation.ANIMATIONTYPE_FLOAT,
            BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

        var keys = [];
        keys.push({
            frame: 0,
            value: this.planetShell.position.z
        });

        keys.push({
            frame: 100,
            value: z
        });

        animationZ.setKeys(keys);
        this.planetShell.animations.push(animationZ);
        //this.planetBody.animations.push(animationZ);
    }

    move(dx, dy, dz) {
        this.moveX(dx);
        this.moveY(dy);
        this.moveZ(dz);

        var me = this;
        this.scene.beginAnimation(this.mesh, 0, 100, false, 1, function() {
            me.move(1, 0, 1);
        });
    }

    rotateX(radian) {
        var animation = new BABYLON.Animation(
            "myAnimation",
            "rotation.x",
            30,
            BABYLON.Animation.ANIMATIONTYPE_FLOAT,
            BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

        var keys = [];
        keys.push({
            frame: 0,
            value: this.planetShell.rotation.x
        });

        keys.push({
            frame: 100,
            value: -radian 
        });

        animation.setKeys(keys);
        this.planetShell.animations.push(animation);
        //this.planetBody.animations.push(animationX);
    }

    rotateY(radian) {
        var animation = new BABYLON.Animation(
            "myAnimation",
            "rotation.y",
            30,
            BABYLON.Animation.ANIMATIONTYPE_FLOAT,
            BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

        var keys = [];
        keys.push({
            frame: 0,
            value: this.planetShell.rotation.y
        });

        keys.push({
            frame: 100,
            value: -radian 
        });

        animation.setKeys(keys);
        this.planetShell.animations.push(animation);
        //this.planetBody.animations.push(animationX);
    }

    rotateZ(radian) {
        var animation = new BABYLON.Animation(
            "myAnimation",
            "rotation.z",
            30,
            BABYLON.Animation.ANIMATIONTYPE_FLOAT,
            BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

        var keys = [];
        keys.push({
            frame: 0,
            value: this.planetShell.rotation.z
        });

        keys.push({
            frame: 100,
            value: -radian 
        });

        animation.setKeys(keys);
        this.planetShell.animations.push(animation);
        //this.planetBody.animations.push(animationX);
    }

    orbit(radius, radian) {
        this.radian -= radian;
        var x = this.orbitCenter.x + radius * Math.cos(this.radian);
        var y = this.orbitCenter.y + radius * Math.cos(this.radian);
        var z = this.orbitCenter.z + radius * Math.sin(this.radian);
        this.moveX(x);
        this.moveY(y);
        this.moveZ(z);
        //this.rotateX(-this.radian);
        //this.rotateY(this.radian);
        //this.rotateZ(-this.radian);

        var me = this;
        this.scene.beginAnimation(this.planetShell, 0, 100, false, 3, function() {
             me.orbit(radius, radian);
        });
        // this.scene.beginAnimation(this.planetBody, 0, 100, false, 3, function() {
        // //     me.orbit(radius);
        // });
    }
}