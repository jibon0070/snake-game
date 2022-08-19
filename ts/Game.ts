import { Snake } from "./Snake.js";
import { Food } from "./Food.js";
import { Input } from "./Input.js";
import UI from "./UI.js";
import { Entity } from "./Entity.js";
import Score from "./Score.js";

export class Game {
    game_tick = 200; //getters and setters
    state = 'paused';
    private canvas: HTMLCanvasElement;
    readonly ctx: CanvasRenderingContext2D;
    gridSize!: number;
    snake!: Snake;
    private food!: Food;
    private entities!: Entity[];
    rows: number = 20;
    ui!: UI;
    input!: Input;
    score!: Score;

    constructor() {
        this.canvas = document.querySelector<HTMLCanvasElement>('#game-screen')!;

        this.ctx = this.canvas.getContext('2d')!;
        this.resize_canvas();
        window.addEventListener('resize', this.resize_canvas.bind(this));
        this.init();
    }

    update(deltaTime: number) {
        this.menu_input();
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
    menu_input() {
        if (this.input.keys.has(' ')) {
            this.input.keys.delete(' ');
            if (this.state == 'playing') {
                this.state = 'paused';
            } else if(this.state == 'paused') {
                this.state = 'playing';
            } else{
                this.state = 'playing';
                this.init();
            }
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
        this.score = new Score();
        this.ui = new UI(this);
        this.entities = [this.snake, this.food, this.ui];
        this.input = new Input(this);
    }

    eat() {
        this.snake.bodys.push(this.snake.bodys[this.snake.bodys.length - 1].clone());
        this.food.go_to_random_position();
        this.game_tick--;
        this.update_score();
    }

    update_score() {
        this.score.add(1);
    }

    private resize_canvas() {
        const sr = innerWidth / innerHeight;

        if (1 < sr)
            this.gridSize = Math.floor(innerHeight / this.rows);
        else
            this.gridSize = Math.floor(innerWidth / this.rows);
        this.canvas.width = this.gridSize * this.rows;
        this.canvas.height = this.gridSize * this.rows;
        this.init();
    }
}