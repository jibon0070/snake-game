import { Entity } from "./Entity.js";
import { Game } from "./Game.js";
import { Vector2 } from "./Vector2.js";

export default class UI implements Entity {
    position!: Vector2;
    velocity!: Vector2;
    width!: number;
    height!: number;
    touch_screen: boolean = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    draw(): void {
        this.draw_score();

        this.draw_state();
        //pause icon
        this.draw_pause_button(10, 10, 'Pause');



    }
    draw_pause_button(x: number, y: number, text: string) {
        if(this.game.state === 'playing' && this.touch_screen){
        this.game.ctx.fillStyle = 'white';
        this.game.ctx.fillRect(x, y, text.length * 16, 16 + 16);
        this.game.ctx.fillStyle = 'black';
        //align: center
        this.game.ctx.textAlign = 'center';
        //fz16
        this.game.ctx.font = '16px Arial';
        this.game.ctx.fillText(text, (x + text.length * 16) / 2, y + 8);
        }
    }
    draw_state() {
        if (this.game.state !== 'playing') {
            this.game.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            this.game.ctx.fillRect(0, 0, this.game.ctx.canvas.width, this.game.ctx.canvas.height);
            this.game.ctx.fillStyle = 'white';
            //fz28
            this.game.ctx.font = '28px Arial';
            //text-align: center
            this.game.ctx.textAlign = 'center';

            if (this.game.state == 'paused') {
                this.game.ctx.fillText(`Paused, ${this.touch_screen ? `'Tap'` : `press 'Space'`} to play.`, this.game.ctx.canvas.width / 2, this.game.ctx.canvas.height / 2);
            } else {
                this.game.ctx.fillText(`Game Over, press 'Space' to play again.`, this.game.ctx.canvas.width / 2, this.game.ctx.canvas.height / 2);
            }
        }
    }
    draw_score() {
        //color white
        this.game.ctx.fillStyle = 'white';
        //fz16
        this.game.ctx.font = '16px Arial';
        //text-align: right
        this.game.ctx.textAlign = 'right';
        //text-baseline: top
        this.game.ctx.textBaseline = 'top';
        this.game.ctx.fillText(`Score: ${this.game.score.score}`, this.game.ctx.canvas.width - 10, 10);
        this.game.ctx.fillText(`High Score: ${this.game.score.high_score}`, this.game.ctx.canvas.width - 10, 32);
    }
    update(deltaTime: number): void {
    }

    constructor(private readonly game: Game) { }
}