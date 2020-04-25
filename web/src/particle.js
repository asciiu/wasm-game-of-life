import * as PIXI from 'pixi.js'

export class Particle {
    constructor({
        x: x,
        y: y,
        velocityX: vx, 
        velocityY: vy,
        width: w,
        height: h,
        projectile: isProjectile,
    }) {
        this.velocity = new PIXI.Point(vx, vy);
        this.sprite = new PIXI.Sprite(PIXI.Texture.WHITE);

        this.sprite.width = w;
        this.sprite.height = h;
        this.sprite.x = x;
        this.sprite.y = y;
        this.sprite.anchor.set(0.5);
        this.sprite.alpha = 0.9;
        this.projectile = isProjectile;
    }

    offScreen(screenWidth, screenHeight) {
        if (this.sprite.x > screenWidth || 
            this.sprite.y > screenHeight || 
            this.sprite.x < 0 || 
            this.sprite.y < 0) {
            return true;
        } 
        return false;
    }

    render() {
        this.sprite.x += this.velocity.x;
        this.sprite.y += this.velocity.y;

        if (!this.projectile) {
            this.sprite.alpha -= 0.03;
        }
    }

    finished() {
        return this.sprite.alpha < 0;
    }
}