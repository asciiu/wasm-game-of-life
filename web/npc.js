import * as BABYLON from 'babylonjs';

export class NPC {
    constructor(scene) {
        var npc = BABYLON.MeshBuilder.CreateBox("npc", { height: 3, width: 3, depth: 3 }, scene);
        npc.position.y = -5;
        npc.position.x = -5;
        npc.position.z = 100;

        // Set a direction flag for the animation
        var direction = true;

        // Code in this function will run ~60 times per second
        scene.registerBeforeRender(function () {
            // Check if box is moving right
            if (npc.position.x < 2 && direction) {
                // Increment box position to the right
                npc.position.x += 0.05;
                npc.position.y += 0.1;
                npc.position.z -= 0.1;
                npc.rotation.z += Math.random() / 100;
                npc.rotation.x += Math.random() / 100;
                npc.rotation.y += Math.random() / 100;
            }
            else {
                // Swap directions to move left
                direction = false;
            }

            // Check if box is moving left
            if (npc.position.x > -2 && !direction) {
                // Decrement box position to the left
                npc.rotation.z -= Math.random() / 100;
                npc.rotation.x -= Math.random() / 100;
                npc.rotation.y -= Math.random() / 100;

                npc.position.x -= 0.05;
                npc.position.y -= 0.1;
                npc.position.z += 0.1;
            }
            else {
                // Swap directions to move right
                direction = true;
            }
        });

    }

}