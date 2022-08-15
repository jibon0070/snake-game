import {Game} from "./Game.js";

export class Input {
    constructor(public game: Game) {
        document.onkeydown = this.event.bind(this);
    }

    private event(event: KeyboardEvent) {
        event.preventDefault();
        switch (event.key) {
            case 'ArrowUp':
            case 'w':
                //up
                this.game.snake.move('up');
                break;
            case 'ArrowDown':
            case 's':
                //down
                this.game.snake.move('down');
                break;
            case 'ArrowLeft':
            case 'a':
                //left
                this.game.snake.move('left');
                break;
            case 'ArrowRight':
            case 'd':
                //right
                this.game.snake.move('right');
                break;
            case ' ':
                if (this.game.state === 'paused')
                    this.game.state = 'playing';
                else if (this.game.state === 'game over') {
                    this.game.state = 'playing';
                    this.game.init();
                } else if (this.game.state === 'playing')
                    this.game.state = 'paused';
                break;
        }
    }
}