import { Vector2 } from "./Vector2.js";
import { Game } from "./Game.js";
import { Entity } from "./Entity.js";

export class Snake implements Entity {
    position = new Vector2(4, 0);
    velocity: Vector2 = new Vector2(1, 0);
    readonly width: number;
    readonly height: number;
    readonly color: string;
    readonly ctx: CanvasRenderingContext2D;
    movement_queue: Vector2[] = [];

    constructor(private readonly game: Game) {
        this.width = game.gridSize;
        this.height = game.gridSize;
        this.color = 'green';
        this.ctx = game.ctx;
    }

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
            //circle

            //5px solid gray border
            this.ctx.strokeStyle = 'black';
            this.ctx.lineWidth = 2;
            this.ctx.strokeRect(this.bodys[i].x * this.width, this.bodys[i].y * this.width, this.width, this.height);
        }
    }

    update(deltaTime: number) {
        //every frame
        this.enqueue_movement()

        this.lastUpdate += deltaTime;
        if (this.lastUpdate < this.game.game_tick) return;
        this.lastUpdate = 0;

        //every game speed
        this.move();
        //move body
        for (let i = this.bodys.length - 1; i > 0; i--) {
            this.bodys[i].x = this.bodys[i - 1].x;
            this.bodys[i].y = this.bodys[i - 1].y;
        }

        //move head
        this.position.add(this.velocity);
        this.bodys[0] = this.position;

        if (this.position.x < 0) {
            this.position.x = this.game.rows - 1;
        } else if (this.position.x > this.game.rows - 1) {
            this.position.x = 0;
        } else if (this.position.y < 0) {
            this.position.y = this.game.rows - 1;
        } else if (this.position.y > this.game.rows - 1) {
            this.position.y = 0;
        }
    }
    move() {
        if (!this.movement_queue.length) return;
        if ((this.velocity.x !== 0 && this.movement_queue[0].x !== 0) || (this.velocity.y !== 0 && this.movement_queue[0].y !== 0)) {
            this.movement_queue.splice(0, 1);
            this.move();
            return;
        }
        if (this.game.ui.show_hint) {
            setTimeout(() => {
                this.game.ui.show_hint = false;
            }, 2000);
        }
        this.velocity = this.movement_queue[0];
        this.movement_queue.splice(0, 1);
    }
    enqueue_movement() {
        //up
        if (this.game.input.keys.has('ArrowUp')) {
            this.game.input.keys.delete('ArrowUp');
            this.movement_queue.push(new Vector2(0, -1));
        }
        //right
        else if (this.game.input.keys.has('ArrowRight')) {
            this.game.input.keys.delete('ArrowRight');
            this.movement_queue.push(new Vector2(1, 0));
        }
        //bottom
        else if (this.game.input.keys.has('ArrowDown')) {
            this.game.input.keys.delete('ArrowDown');
            this.movement_queue.push(new Vector2(0, 1));
        }
        //left
        else if (this.game.input.keys.has('ArrowLeft')) {
            this.game.input.keys.delete('ArrowLeft');
            this.movement_queue.push(new Vector2(-1, 0));
        }
    }
}