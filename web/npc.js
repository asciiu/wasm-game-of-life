import * as BABYLON from 'babylonjs';

export class NPC {
    constructor(scene) {
        var mesh = BABYLON.MeshBuilder.CreateBox("npc", { height: 3, width: 3, depth: 3 }, scene);
        mesh.position.y = 0;
        mesh.position.x = -5;
        mesh.position.z = 100;
        this.mesh = mesh;
        this.scene = scene;
        this.mesh.animations = [];
        this.radian = 0;
    }

    moveX(dx) {
        var animationX = new BABYLON.Animation(
            "myAnimation",
            "position.x",
            30,
            BABYLON.Animation.ANIMATIONTYPE_FLOAT,
            BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

        var keys = [];
        keys.push({
            frame: 0,
            value: this.mesh.position.x
        });

        keys.push({
            frame: 100,
            value: dx
        });

        animationX.setKeys(keys);
        this.mesh.animations.push(animationX);
    }

    moveY(dy) {
        var animationY = new BABYLON.Animation(
            "myAnimation",
            "position.y",
            30,
            BABYLON.Animation.ANIMATIONTYPE_FLOAT,
            BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

        var keys = [];
        keys.push({
            frame: 0,
            value: this.mesh.position.y 
        });

        keys.push({
            frame: 100,
            value: this.mesh.position.y + dy
        });

        animationY.setKeys(keys);
        this.mesh.animations.push(animationY);
    }

    moveZ(dz) {
        var animationZ = new BABYLON.Animation(
            "myAnimation",
            "position.z",
            30,
            BABYLON.Animation.ANIMATIONTYPE_FLOAT,
            BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

        var keys = [];
        keys.push({
            frame: 0,
            value: this.mesh.position.z
        });

        keys.push({
            frame: 100,
            value: dz
        });

        animationZ.setKeys(keys);
        this.mesh.animations.push(animationZ);
    }

    move(dx, dy, dz) {
        this.moveX(dx);
        this.moveY(dy);
        this.moveZ(dz);

        var me = this;
        this.scene.beginAnimation(this.mesh, 0, 100, false, 1, function() {
            console.log("here");
            me.move(1, 0, 1);
        });
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
            value: this.mesh.rotation.y
        });

        keys.push({
            frame: 100,
            value: -radian 
        });

        animation.setKeys(keys);
        this.mesh.animations.push(animation);
    }


    orbit(radius) {
        this.radian -= Math.PI/15;
        var x = radius * Math.cos(this.radian);
        var z = radius * Math.sin(this.radian);
        this.moveX(x);
        this.moveZ(z);
        this.rotateY(this.radian);

        var me = this;
        this.scene.beginAnimation(this.mesh, 0, 100, false, 1, function() {
            me.orbit(radius);
        });
    }
}