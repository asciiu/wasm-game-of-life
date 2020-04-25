
import * as BABYLON from 'babylonjs';

export class Background {
    constructor(scene) {
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
    }
}