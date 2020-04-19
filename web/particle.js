import * as PIXI from 'pixi.js'

export class Particle {
    constructor({
        x: x,
        y: y,
        velocityX: vx, 
        velocityY: vy,
    }) {
        this.velocity = new PIXI.Point(vx, vy);
        this.sprite = new PIXI.Sprite(PIXI.Texture.WHITE);

        this.sprite.width = 1;
        this.sprite.height = 1;
        this.sprite.x = x;
        this.sprite.y = y;
        this.sprite.anchor.set(0.5);
        this.sprite.alpha = 0.9;
    }

    update() {
        this.sprite.x += this.velocity.x;
        this.sprite.y += this.velocity.y;
        this.sprite.alpha -= 0.03;
    }

    finished() {
        return this.sprite.alpha < 0;
    }
}