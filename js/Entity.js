import {Vector2} from "./Vector2.js";

export class Entity {
    position = new Vector2(0, 0);
    velocity = new Vector2(0, 0);
    width = 0;
    height = 0;
    color = "black";
    lastUpdate = 0;

    constructor(position, velocity, width, height, color, ctx, tick = 1000) {
        this.position = position;
        this.velocity = velocity;
        this.width = width;
        this.height = height;
        this.color = color;
        this.ctx = ctx;
        this.tick = tick;
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.position.x * this.width, this.position.y * this.height, this.width, this.height);
    }

    update(deltaTime) {
        //update once per second
        this.lastUpdate += deltaTime;
        if (this.lastUpdate < this.tick) return;
        this.lastUpdate = 0;
        this.position.x += this.velocity.x * this.width;
        this.position.y += this.velocity.y * this.height;
    }
}