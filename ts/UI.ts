import { Entity } from "./Entity.js";
import { Game } from "./Game.js";
import { Vector2 } from "./Vector2.js";

export default class UI implements Entity {
    position!: Vector2;
    velocity!: Vector2;
    width!: number;
    height!: number;
    draw(): void {
        this.game.ctx.fillStyle = 'white';
        //font size 16px
        this.game.ctx.font = '16px Arial';
        //text align right
        this.game.ctx.textAlign = 'right';
        //text baseline top
        this.game.ctx.textBaseline = 'top';
        this.game.ctx.fillText(`Score: ${this.game.score.score}`, this.game.ctx.canvas.width - 10, 10);
        this.game.ctx.fillText(`High Score: ${this.game.score.high_score}`, this.game.ctx.canvas.width - 10, 32);
        if (this.game.state !== 'playing') {
            this.game.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            this.game.ctx.fillRect(0, 0, this.game.ctx.canvas.width, this.game.ctx.canvas.height);
            this.game.ctx.fillStyle = 'white';
            //fz28
            this.game.ctx.font = '28px Arial';
            //text-align: center
            this.game.ctx.textAlign = 'center';

            if (this.game.state == 'paused') {
                this.game.ctx.fillText(`Paused, press 'Space' to play.`, this.game.ctx.canvas.width / 2, this.game.ctx.canvas.height / 2);
            } else {
                this.game.ctx.fillText(`Game Over, press 'Space' to play again.`, this.game.ctx.canvas.width / 2, this.game.ctx.canvas.height / 2);
            }

        }
    }
    update(deltaTime: number): void {
    }

    constructor(private readonly game: Game) { }
}