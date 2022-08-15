import {Vector2} from "./Vector2.js";
import {Game} from "./Game.js";
import {Entity} from "./Entity.js";

export class Snake implements Entity{
    position = new Vector2(4, 0);
    velocity: Vector2 = new Vector2(1, 0);
    readonly width: number;
    readonly height: number;
    readonly color: string;
    readonly ctx: CanvasRenderingContext2D;
    readonly tick: number;

    constructor(game: Game) {
        this.width = game.gridSize;
        this.height = game.gridSize;
        this.color = 'green';
        this.ctx = game.ctx;
        this.tick = game.game_tick;
    }

    directions: Vector2[] = []
    lastUpdate = 0;

    bodys: Vector2[] = [
        new Vector2(4, 0),
        new Vector2(3, 0),
        new Vector2(2, 0),
        new Vector2(1, 0)
    ];

    draw(): void {
        for (let i = 0; i < this.bodys.length; i++) {
            if (i !== 0) {
                this.ctx.fillStyle = this.color;
            } else {
                this.ctx.fillStyle = 'white';
            }
            this.ctx.fillRect(this.bodys[i].x * this.width, this.bodys[i].y * this.width, this.width, this.height);
            //5px solid gray border
            this.ctx.strokeStyle = 'gray';
            this.ctx.lineWidth = 2;
            this.ctx.strokeRect(this.bodys[i].x * this.width, this.bodys[i].y * this.width, this.width, this.height);
        }
    }

    move(direction: 'up' | 'down' | 'left' | 'right') {
        switch (direction) {
            case 'up':
                //up
                this.directions.push(new Vector2(0, -1));
                break;
            case 'down':
                //down
                this.directions.push(new Vector2(0, 1));
                break;
            case 'left':
                //left
                this.directions.push(new Vector2(-1, 0));
                break;
            case 'right':
                //right
                this.directions.push(new Vector2(1, 0));
                break;
        }
    }

    // update(deltaTime: number): void {
    // }

    update(deltaTime: number) {
        this.lastUpdate += deltaTime;
        if (this.lastUpdate < this.tick) return;
        this.lastUpdate = 0;

        if (this.directions.length) {
            if ((this.velocity.x !== 0 && this.directions[0].x === 0) || (this.velocity.y !== 0 && this.directions[0].y === 0)) {
                this.velocity = this.directions.shift()!;
            } else {
                this.directions.shift();
            }
        }

        //move body
        for (let i = this.bodys.length - 1; i > 0; i--) {
            this.bodys[i].x = this.bodys[i - 1].x;
            this.bodys[i].y = this.bodys[i - 1].y;
        }

        //move head
        this.position.add(this.velocity);
        this.bodys[0] = this.position;

        if (this.position.x < 0) {
            this.position.x = this.ctx.canvas.width / this.width - 1;
        } else if (this.position.x > this.ctx.canvas.width / this.width - 1) {
            this.position.x = 0;
        } else if (this.position.y < 0) {
            this.position.y = this.ctx.canvas.height / this.height - 1;
        } else if (this.position.y > this.ctx.canvas.height / this.height - 1) {
            this.position.y = 0;
        }
    }
}