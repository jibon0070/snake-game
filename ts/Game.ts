import {Snake} from "./Snake.js";
import {Food} from "./Food.js";
import {Input} from "./Input.js";

export class Game {
    readonly game_tick = 250;
    state = 'paused';
    private score = 0;
    private canvas: HTMLCanvasElement;
    readonly ctx: CanvasRenderingContext2D;
    readonly gridSize: number;
    private game_over_screen: HTMLDivElement;
    private paused_screen: HTMLDivElement;
    private score_screen: HTMLSpanElement;
    snake!: Snake;
    private food!: Food;
    private entities!: (Snake | Food)[];

    constructor() {
        this.canvas = document.querySelector<HTMLCanvasElement>('#game-screen')!;
        this.canvas.width = window.innerWidth - 5;
        this.canvas.height = window.innerHeight - 5;
        this.ctx = this.canvas.getContext('2d')!;
        this.gridSize = Math.floor(this.canvas.width / 40);
        this.game_over_screen = document.querySelector<HTMLDivElement>('#game_over')!;
        this.paused_screen = document.querySelector<HTMLDivElement>('#paused')!;
        this.score_screen = document.querySelector<HTMLSpanElement>('#score-value')!;
        this.init();
    }

    update(deltaTime: number) {
        this.score_screen.innerHTML = this.score.toString();
        this.draw();
        if (this.state === 'paused') {
            this.game_over_screen.style.display = 'none';
            this.paused_screen.style.display = 'flex';
        } else if (this.state === 'game over') {
            this.paused_screen.style.display = 'none';
            this.game_over_screen.style.display = 'flex';
        } else {
            this.paused_screen.style.display = 'none';
            this.game_over_screen.style.display = 'none';
        }

        if (this.state !== 'playing') return;

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
        this.snake = new Snake(this);
        this.food = new Food(this);
        this.entities = [this.snake, this.food];
        new Input(this);
    }

    eat() {
        this.snake.bodys.push(this.snake.bodys[this.snake.bodys.length - 1].clone());
        this.food.go_to_random_position();
        this.update_score();
    }

    update_score() {
        this.score++;
    }
}