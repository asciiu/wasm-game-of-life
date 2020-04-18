import * as PIXI from 'pixi.js'

const RADIAN_OFFSET = Math.PI/2;

export class Ship {
  constructor({
    clientID: id, 
    image: img,
    width: w,
    height: h,
    x: x, 
    y: y, 
    velocityX: vx = 0,
    velocityX: vy = 0,
    radius: rad = 6,
    rotation: radian = 0,
    heading: heading = 0,
    active = false
  }) {
    this.clientID = id;
    this.radius = rad;
    this.rotation = radian;
    this.active = active;
    this.isBoosting = false;
    this.isDestroyed = false;
    this.particles = [];
    this.heading = new PIXI.Point(0, 0);
    this.velocity = new PIXI.Point(vx, vy);

    const sprite = PIXI.Sprite.from(img);
    // set the anchor point so the texture is centerd on the sprite
    sprite.x = 0;
    sprite.y = 0;
    sprite.anchor.set(0.5);
    sprite.scale.set(0.02);
    this.sprite = sprite;

    // the parent container for this asset
    const container = new PIXI.Container();
    container.acceleration = new PIXI.Point(0, 0);
    container.pivot.x = container.width / 2;
    container.pivot.y = container.height / 2;
    container.x = x;
    container.y = y;
    container.addChild(this.sprite);
    this.container = container;

    this.heading.x = Math.cos(this.container.rotation - RADIAN_OFFSET);
    this.heading.y = Math.sin(this.container.rotation - RADIAN_OFFSET);
  }
  
  render(delta) {
    this.container.x += this.velocity.x;
    this.container.y += this.velocity.y;
    this.velocity.x *= 0.99;
    this.velocity.y *= 0.99;
  }
  
  thrust() {
    this.velocity.x += this.heading.x * 0.1;
    this.velocity.y += this.heading.y * 0.1;
  }

  setRotation(radian) {
    // rotate the parent container
    this.container.rotation += radian;
    // set heading vector
    this.heading.x = Math.cos(this.container.rotation - RADIAN_OFFSET);
    this.heading.y = Math.sin(this.container.rotation - RADIAN_OFFSET);
  }
}