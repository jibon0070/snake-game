import {Entity} from "./Entity.js";
import {Vector2} from "./Vector2.js";

export class Food extends Entity {
    constructor(velocity, width, height, color, ctx, game, tick = 1000) {
        super(new Vector2(0, 0), velocity, width, height, color, ctx, tick);
        this.game = game;
        this.go_to_random_position();
    }

    go_to_random_position() {
        this.position.x =  Math.floor(Math.random() * this.ctx.canvas.width / this.width);
        this.position.y =  Math.floor(Math.random() * this.ctx.canvas.height / this.height);
        for (let body of this.game.snake.bodys) {
            if (body.x === this.position.x && body.y === this.position.y) {
                this.go_to_random_position();
            }
        }
    }
}