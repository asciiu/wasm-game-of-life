import * as PIXI from 'pixi.js'

export class Particle {
    constructor({
        x: x,
        y: y,
        radius: radius, 
        velocityX: vx, 
        velocityY: vy,
        color: c = {r: 255, g: 30, b: 30}
    }) {
        this.x = 0;
        this.y = 0;
        this.vx = vx;
        this.vy = vy;
        this.color = c;
        this.radius = radius;
        this.alpha = 0.9;
        this.sprite = new PIXI.Sprite(PIXI.Texture.WHITE);
        this.sprite.width = 1;
        this.sprite.height = 1;
        this.sprite.x = x;
        this.sprite.y = y;
        this.sprite.anchor.set(0.5);
        //this.graphics = new PIXI.Graphics();
    }

    update() {
        //this.graphics.x += this.vx;
        //this.graphics.y += this.vy;
        this.sprite.x += this.vx;
        this.sprite.y += this.vy;
        this.sprite.alpha -= 0.03;
    }

    finished() {
        return this.sprite.alpha < 0;
    }

    show() {
        //const alpha = this.p5.random(1, this.alpha);
        //this.p5.fill(this.color.r, this.color.g, this.color.b, alpha);
        //this.graphics.beginFill(0xFFFF0B, this.alpha);
        //this.graphics.drawCircle(this.vx, this.vy, this.radius);
        //new PIXI.Sprite(PIXI.Texture.WHITE)
    }
}