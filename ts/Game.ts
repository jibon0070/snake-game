import {Snake} from "./Snake.js";
import {Food} from "./Food.js";
import {Input} from "./Input.js";

export class Game {
    readonly game_tick = 200; //getters and setters
    state = 'paused';
    private score = 0;
    private canvas: HTMLCanvasElement;
    readonly ctx: CanvasRenderingContext2D;
    gridSize!: number;
    private game_over_screen: HTMLDivElement;
    private paused_screen: HTMLDivElement;
    private score_screen: HTMLSpanElement;
    snake!: Snake;
    private food!: Food;
    private entities!: (Snake | Food)[];
    private overlay: HTMLDivElement;
    rows: number = 20;

    constructor() {
        this.canvas = document.querySelector<HTMLCanvasElement>('#game-screen')!;

        this.ctx = this.canvas.getContext('2d')!;
        this.game_over_screen = document.querySelector<HTMLDivElement>('#game_over')!;
        this.paused_screen = document.querySelector<HTMLDivElement>('#paused')!;
        this.score_screen = document.querySelector<HTMLSpanElement>('#score-value')!;
        this.overlay = document.querySelector<HTMLDivElement>('#overlay')!;
        this.resize_canvas();
        window.addEventListener('resize', this.resize_canvas.bind(this));
        this.init();
    }

    update(deltaTime: number) {
        this.score_screen.innerHTML = this.score.toString();
        this.draw();
        // show  overlay screens
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
        // console.log(this.snake.position, this.food.position);
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
        this.score = 0;
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

    private resize_canvas() {
        const innerWidth = window.innerWidth;
        const innerHeight = window.innerHeight;
        const canvasWidth = innerWidth > innerHeight ? innerHeight : innerWidth;
        const canvasHeight = canvasWidth;
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;
        this.overlay.style.width = canvasWidth + 'px';
        this.gridSize = Math.floor(this.canvas.width / this.rows);
        this.init();
    }
}