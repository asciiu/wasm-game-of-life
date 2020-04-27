import * as BABYLON from 'babylonjs';

export class Sun {
    constructor(scene, {
        x: x,
        y: y,
        z: z,
    }) {
        var sun = new BABYLON.PointLight("sun", new BABYLON.Vector3(x, y, z), scene);
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
        this.light = sun;
    }
}