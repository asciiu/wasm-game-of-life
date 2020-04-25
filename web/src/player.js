import * as BABYLON from 'babylonjs';

export class Player {
    constructor(scene, {
        camera: camera,
        x: x,
        y: y,
        z: z,
    }) {
        var myBox = BABYLON.MeshBuilder.CreateBox("player", {height: 3, width: 3, depth: 3}, scene);
        myBox.position.x = x;
        myBox.position.y = y;
        myBox.position.z = z;
        myBox.parent = camera;
    }
}