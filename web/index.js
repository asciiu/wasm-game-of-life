import * as PIXI from 'pixi.js'
import * as Keyboard from 'pixi.js-keyboard'
import * as Mouse from 'pixi.js-mouse'
import { Ship } from './ship.js'

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container.
const app = new PIXI.Application({
  width: 800, 
  height: 600, 
  backgroundColor: 0x061639, 
  resolution: window.devicePixelRatio || 1,
});
document.body.appendChild(app.view);

const player = new Ship({
  clientID: 1,
  app: app,
  image: "images/rocket.png", 
  x: app.screen.width / 2,
  y: app.screen.height / 2,
})
setup();

function setup() {
  app.stage.addChild(player.container);

  //Start the game loop 
  app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta){
  input(delta);
  player.render(delta);
}

function input(delta) {
  // Keyboard
  if (Keyboard.isKeyDown('ArrowLeft', 'KeyA')) {
    player.setRotation(-0.05 * delta);
  }
  if (Keyboard.isKeyDown('ArrowRight', 'KeyD')) {
    player.setRotation(0.05 * delta);
  }
  if (Keyboard.isKeyDown('ArrowUp', 'KeyW')) {
    player.thrust();
  }

  Keyboard.update();
}
