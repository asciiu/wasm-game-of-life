import * as PIXI from 'pixi.js'
import * as Keyboard from 'pixi.js-keyboard'
import * as Mouse from 'pixi.js-mouse'
import { Ship } from './ship.js'

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container.
const app = new PIXI.Application({
  width: 800, height: 600, backgroundColor: 0x1099bb, resolution: window.devicePixelRatio || 1,
});
document.body.appendChild(app.view);
app.renderer.backgroundColor = 0x061639;
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true

const container = new PIXI.Container();
container.pivot.x = container.width / 2;
container.pivot.y = container.height / 2;
container.x = app.screen.width / 2;
container.y = app.screen.height / 2;
container.acceleration = new PIXI.Point(0, 0);

const player = new Ship({
  clientID: 1,
  image: "images/rocket.png", 
  width: 15,
  height: 20,
  x: 0,
  y: 0,
})
setup();


function setup() {
  player.sprite.acceleration = new PIXI.Point(player.x,player.y);
  container.addChild(player.sprite);
  app.stage.addChild(container);

  //Start the game loop 
  app.ticker.add(delta => gameLoop(delta));
  
  Mouse.events.on('released', null, (buttonCode, event, mouseX, mouseY, mouseOriginX, mouseOriginY, mouseMoveX, mouseMoveY) => {
    console.log(buttonCode, mouseOriginX, mouseOriginY, mouseX, mouseY, mouseMoveX, mouseMoveY);
  });
}

function gameLoop(delta){
  //Update the current game state:
  input(delta);

  //var sprite = player.sprite;
  //sprite.acceleration.set(sprite.acceleration.x * 0.99, sprite.acceleration.y * 0.99);
  //sprite.x += sprite.acceleration.x * delta;
  //sprite.y += sprite.acceleration.y * delta;

  container.acceleration.set(container.acceleration.x * 0.99, container.acceleration.y * 0.99);
  container.x += container.acceleration.x * delta;
  container.y += container.acceleration.y * delta;
}

function input(delta) {
  // Keyboard
  if (Keyboard.isKeyDown('ArrowLeft', 'KeyA')) {
    //player.sprite.rotation -= 0.05 * delta;
    container.rotation -= 0.05 * delta;
  }
  if (Keyboard.isKeyDown('ArrowRight', 'KeyD')) {
    //player.sprite.rotation += 0.05 * delta;
    container.rotation += 0.05 * delta;
  }
  if (Keyboard.isKeyDown('ArrowUp', 'KeyW')) {
    //var sprite = player.sprite;
    //sprite.acceleration.set(0, -1);

    container.acceleration.set(0, -1);

    console.log("up");
    //cat.y -= speed;
  }

  //if (Keyboard.isKeyDown('ArrowDown', 'KeyS')) {
  //  console.log("down");
  //  //cat.y += speed;
  //}
  Keyboard.update();
}

// holder to store the aliens
//const aliens = [];
//
//const totalDudes = 20;
//
//for (let i = 0; i < totalDudes; i++) {
//    // create a new Sprite that uses the image name that we just generated as its source
//    const dude = PIXI.Sprite.from('images/doge.png');
//
//    // set the anchor point so the texture is centerd on the sprite
//    dude.anchor.set(0.5);
//
//    // set a random scale for the dude - no point them all being the same size!
//    dude.scale.set(0.1 + Math.random() * 0.3);
//
//    // finally lets set the dude to be at a random position..
//    dude.x = Math.random() * app.screen.width;
//    dude.y = Math.random() * app.screen.height;
//
//    dude.tint = Math.random() * 0xFFFFFF;
//
//    // create some extra properties that will control movement :
//    // create a random direction in radians. This is a number between 0 and PI*2 which is the equivalent of 0 - 360 degrees
//    dude.direction = Math.random() * Math.PI * 2;
//
//    // this number will be used to modify the direction of the dude over time
//    dude.turningSpeed = Math.random() - 0.8;
//
//    // create a random speed for the dude between 2 - 4
//    dude.speed = 2 + Math.random() * 2;
//
//    // finally we push the dude into the aliens array so it it can be easily accessed later
//    aliens.push(dude);
//
//    app.stage.addChild(dude);
//}

// create a bounding box for the little dudes
//const dudeBoundsPadding = 100;
//const dudeBounds = new PIXI.Rectangle(-dudeBoundsPadding,
//    -dudeBoundsPadding,
//    app.screen.width + dudeBoundsPadding * 2,
//    app.screen.height + dudeBoundsPadding * 2);
//
//app.ticker.add(() => {
//    // iterate through the dudes and update their position
//    for (let i = 0; i < aliens.length; i++) {
//        const dude = aliens[i];
//        dude.direction += dude.turningSpeed * 0.01;
//        dude.x += Math.sin(dude.direction) * dude.speed;
//        dude.y += Math.cos(dude.direction) * dude.speed;
//        dude.rotation = -dude.direction - Math.PI / 2;
//
//        // wrap the dudes by testing their bounds...
//        if (dude.x < dudeBounds.x) {
//            dude.x += dudeBounds.width;
//        } else if (dude.x > dudeBounds.x + dudeBounds.width) {
//            dude.x -= dudeBounds.width;
//        }
//
//        if (dude.y < dudeBounds.y) {
//            dude.y += dudeBounds.height;
//        } else if (dude.y > dudeBounds.y + dudeBounds.height) {
//            dude.y -= dudeBounds.height;
//        }
//    }
//}); 