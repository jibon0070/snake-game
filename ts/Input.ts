import {Game} from "./Game.js";

export class Input {
    constructor(game: Game) {
        addEventListener('keydown', (event) => {
            switch (event.key) {
                case 'ArrowUp':
                case 'w':
                    //up
                    game.snake.move('up');
                    break;
                case 'ArrowDown':
                case 's':
                    //down
                    game.snake.move('down');
                    break;
                case 'ArrowLeft':
                case 'a':
                    //left
                    game.snake.move('left');
                    break;
                case 'ArrowRight':
                case 'd':
                    //right
                    game.snake.move('right');
                    break;
                case ' ':
                    if (game.state === 'paused')
                        game.state = 'playing';
                    else if (game.state === 'game over') {
                        game.state = 'playing';
                        game.init();
                    }
            }
        });
    }

}