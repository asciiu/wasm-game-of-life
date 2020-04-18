import * as PIXI from 'pixi.js'

export class Ship {
  constructor({
    clientID: id, 
    image: img,
    width: w,
    height: h,
    x: x, 
    y: y, 
    velocityX: vx = 0,
    velocityY: vy = 0,
    radius: rad = 6,
    rotation: radian = 0,
    heading: heading = 0,
    active = false
  }) {
    this.clientID = id;
    this.radius = rad;
    this.heading = heading;
    this.rotation = radian;
    this.active = active;
    this.isBoosting = false;
    this.isDestroyed = false;

    const sprite = PIXI.Sprite.from(img);

    // set the anchor point so the texture is centerd on the sprite
    sprite.anchor.set(0.5);
    sprite.x = x;
    sprite.y = y;
    sprite.scale.set(0.02);

    this.sprite = sprite;

    //this.color = {
    //  red: 0,
    //  green: 200,
    //  blue: 0,
    //  alpha: 200,
    //}
    this.particles = [];
  }

  update() {
  //   if (this.isBoosting) {
  //     this.boost();
  //   } 
  //   this.pos.add(this.vel);
  //   this.vel.mult(0.99);
  // }
  
  // // boost is true or false
  // boosting = (boost) => {
  //   this.isBoosting = boost;
  }

  // boost = () => {
  //     let force = p5.Vector.fromAngle(this.heading);
  //     force.mult(0.1);
  //     this.vel.add(force);

  //     for (let i = 0; i < 5; ++i) {
  //       this.particles.push(new Particle({
  //         p6: this.p5, 
  //         radius: 3, 
  //         velocityX: this.p5.random(-0.2, 0.2), 
  //         velocityY: 1 
  //       }));
  //     }
  // }
  
  render() {
      //this.p5.push();
      //this.p5.translate(this.pos.x, this.pos.y);
      //this.p5.rotate(this.heading + this.p5.PI / 2);

      //for (let i = this.particles.length-1; i > 0; --i) {
      //  this.particles[i].update();
      //  this.particles[i].show();
      //  if (this.particles[i].finished()) {
      //    this.particles.splice(i, 1);
      //  }
      //}

      //this.p5.image(this.rocket.image, 
      //  -this.rocket.width/2, 
      //  -this.rocket.height/2, 
      //  this.rocket.width, 
      //  this.rocket.height);

      //this.p5.pop();
    //} 
  }
  
  // edges = () => {
  //   if (this.pos.x > this.p5.width + this.radius) {
  //     this.pos.x = -this.radius;
  //   } else if (this.pos.x < -this.radius) {
  //     this.pos.x = this.p5.width + this.radius;
  //   }
  //   if (this.pos.y > this.p5.height + this.radius) {
  //     this.pos.y = -this.radius;
  //   } else if (this.pos.y < -this.radius) {
  //     this.pos.y = this.p5.height + this.radius;
  //   }
  // }
  
  // setPosition = (x, y) => {
  //   this.pos.x = x;
  //   this.pos.y = y;
  // }

  // setRotation = (radian) => {
  //   this.rotation = radian;
  // }
  
  turn() {
    this.heading += this.rotation;
  }
}