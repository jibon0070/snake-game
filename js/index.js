import {Game} from "./Game.js";

const canvas = document.querySelector('#game-screen');
const ctx = canvas.getContext('2d');
const game = new Game(ctx, canvas);
let lastTime = 0;

function gameLoop(time) {
    //delta time
    const deltaTime = time - lastTime;
    lastTime = time;
    game.update(deltaTime);
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
