import {Vector2} from "./Vector2.js";

export class Snake {
    position = new Vector2(4, 0);

    constructor(width, height, color, ctx, tick = 1000) {
        this.velocity = new Vector2(1, 0);
        this.width = width;
        this.height = height;
        this.color = color;
        this.ctx = ctx;
        this.tick = tick;
    }

    directions = []
    lastUpdate = 0;

    bodys = [
        new Vector2(4, 0),
        new Vector2(3, 0),
        new Vector2(2, 0),
        new Vector2(1, 0)
    ];

    draw() {
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

    move(direction) {
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

    update(deltaTime) {
        this.lastUpdate += deltaTime;
        if (this.lastUpdate < this.tick) return;
        this.lastUpdate = 0;

        if (this.directions.length) {
            if ((this.velocity.x !== 0 && this.directions[0].x === 0) || (this.velocity.y !== 0 && this.directions[0].y === 0)) {
                this.velocity = this.directions.shift();
            }else {
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