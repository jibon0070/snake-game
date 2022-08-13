import {Snake} from "./Snake.js";
import {Vector2} from "./Vector2.js";
import {Input} from "./Input.js";
import {Food} from "./Food.js";

export class Game {
    game_tick = 250;
    state = 'paused';
    score = 0;

    constructor() {
        this.canvas = document.querySelector('#game-screen');
        this.canvas.width = window.innerWidth - 5;
        this.canvas.height = window.innerHeight - 5;
        this.ctx = this.canvas.getContext('2d');
        this.gridSize = Math.floor(this.canvas.width / 40);
        this.game_over_screen = document.querySelector('#game_over');
        this.paused_screen = document.querySelector('#paused');
        this.score_screen = document.querySelector('#score-value');
        this.init();
    }

    update(deltaTime) {
        this.score_screen.innerHTML = this.score.toString();
        this.draw();
        if (this.state === 'paused') {
            this.game_over_screen.style.display = 'none';
            this.paused_screen.style.display = 'flex';
        }else if (this.state === 'game over') {
            this.paused_screen.style.display = 'none';
            this.game_over_screen.style.display = 'flex';
        }else {
            this.paused_screen.style.display = 'none';
            this.game_over_screen.style.display = 'none';
        }

        if(this.state !== 'playing') return;

        if (this.snake.position.x === this.food.position.x && this.snake.position.y === this.food.position.y) {
            this.eat();
        }

        //check for collision with self
        for (let i = 1; i < this.snake.bodys.length; i++) {
            if (this.snake.position.x === this.snake.bodys[i].x && this.snake.position.y === this.snake.bodys[i].y) {
                this.state = 'game over';
            }
        }

        for (let entity of this.entities) {
            entity.update(deltaTime);
        }
    }

    draw() {
        //draw black background
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        for (let entity of this.entities) {
            entity.draw();
        }
    }

    init() {
        this.snake = new Snake(this.gridSize, this.gridSize, 'green', this.ctx, this.game_tick);
        this.food = new Food(new Vector2(0, 0), this.gridSize, this.gridSize, 'red', this.ctx, this, this.game_tick);
        this.entities = [this.snake, this.food];
        new Input(this);
    }

    eat() {
        this.snake.bodys.push(new Vector2(this.snake.bodys[this.snake.bodys.length - 1].x, this.snake.bodys[this.snake.bodys.length - 1].y));
        this.food.go_to_random_position();
        this.update_score();
    }

    update_score() {
        this.score++;
    }
}