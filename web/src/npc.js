import * as BABYLON from 'babylonjs';

export class NPC {
    constructor(scene) {
        var mesh = BABYLON.MeshBuilder.CreateBox("npc", { height: 3, width: 3, depth: 3 }, scene);
        mesh.position.x = 30 * Math.cos(0);
        mesh.position.y = 30 * Math.cos(0);
        mesh.position.z = 30 * Math.sin(0);
        this.mesh = mesh;
        this.scene = scene;
        this.mesh.animations = [];
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
            value: this.mesh.position.x
        });

        keys.push({
            frame: 100,
            value: x
        });

        animationX.setKeys(keys);
        this.mesh.animations.push(animationX);
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
            value: this.mesh.position.y 
        });

        keys.push({
            frame: 100,
            value: y
        });

        animationY.setKeys(keys);
        this.mesh.animations.push(animationY);
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
            value: this.mesh.position.z
        });

        keys.push({
            frame: 100,
            value: z
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
            value: this.mesh.rotation.x
        });

        keys.push({
            frame: 100,
            value: -radian 
        });

        animation.setKeys(keys);
        this.mesh.animations.push(animation);
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
            value: this.mesh.rotation.z
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
        var y = radius * Math.cos(this.radian);
        var z = radius * Math.sin(this.radian);
        this.moveX(x);
        this.moveY(y);
        this.moveZ(z);
        //this.rotateX(-this.radian);
        this.rotateY(this.radian);
        this.rotateZ(-this.radian);

        var me = this;
        this.scene.beginAnimation(this.mesh, 0, 100, false, 3, function() {
            me.orbit(radius);
        });
    }
}