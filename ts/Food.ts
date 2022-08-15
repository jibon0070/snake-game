import {Entity} from "./Entity.js";
import {Game} from "./Game.js";
import {Vector2} from "./Vector2.js";

export class Food implements Entity {
    constructor(public game: Game) {
        this.go_to_random_position();
    }

    go_to_random_position() {
        this.position.x =  Math.floor(Math.random() * this.game.rows);
        this.position.y =  Math.floor(Math.random() * this.game.rows);
        console.log(this.position);
        for (let body of this.game.snake.bodys) {
            if (body.x === this.position.x && body.y === this.position.y) {
                this.go_to_random_position();
            }
        }
    }

    color: string = 'red';
    height: number = this.game.gridSize;
    lastUpdate: number = 0;
    position: Vector2 = new Vector2(0, 0);
    velocity!: Vector2;
    width: number = this.game.gridSize;

    draw(): void {
        this.game.ctx.fillStyle = this.color;
        this.game.ctx.fillRect(this.position.x * this.width, this.position.y * this.height, this.width, this.height);
        //5px solid gray border
        this.game.ctx.strokeStyle = 'gray';
        this.game.ctx.lineWidth = 2;
        this.game.ctx.strokeRect(this.position.x * this.width, this.position.y * this.height, this.width, this.height);
    }

    update(deltaTime: number): void {
    }
}