import {Game} from "./Game.js";

const game = new Game();
let lastTime = 0;

function gameLoop(time: number) {
    //delta time
    const deltaTime = time - lastTime;
    lastTime = time;
    game.update(deltaTime);
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
