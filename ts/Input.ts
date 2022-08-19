import { Game } from "./Game.js";
import { Vector2 } from "./Vector2.js";

export class Input {
    keys: Set<string> = new Set();
    constructor(private readonly game: Game) {
        document.onkeydown = (e) => {
            this.keys.add(e.key);
        }
        document.onkeyup = (e) => {
            this.keys.delete(e.key);
        }

        //if it has a touch screen, add touch events
        if (('ontouchstart' in window) || (navigator.maxTouchPoints > 0)) {
            let started = false;
            let started_touch = new Vector2(0, 0);
            this.game.ctx.canvas.ontouchstart = (e) => {
                started = true;
                started_touch = new Vector2(e.touches[0].clientX, e.touches[0].clientY);
                if (['paused', 'game over'].includes(game.state)) {
                    this.keys.add(' ');
                } else {
                    const canvas_top = this.game.ctx.canvas.getBoundingClientRect().top;
                    const canvas_left = this.game.ctx.canvas.getBoundingClientRect().left;

                    if (
                        e.touches[0].clientY - canvas_top >= 10 &&
                        e.touches[0].clientY - canvas_top <= 16 + 16 &&
                        e.touches[0].clientX - canvas_left >= 10 &&
                        e.touches[0].clientX - canvas_left <= 10 + 'Pause'.length * 16
                    ) {
                        this.keys.add(' ');
                    }
                }
            }
            this.game.ctx.canvas.ontouchmove = (e) => {
                if (started) {
                    //up
                    if (e.touches[0].clientY < started_touch.y && Math.abs(started_touch.x - e.touches[0].clientX) < 50) {
                        this.keys.add('ArrowUp');
                    }
                    // right
                    else if (e.touches[0].clientX > started_touch.x && Math.abs(started_touch.y - e.touches[0].clientY) < 50) {
                        this.keys.add('ArrowRight');
                    }
                    // down
                    else if (e.touches[0].clientY > started_touch.y && Math.abs(started_touch.x - e.touches[0].clientX) < 50) {
                        this.keys.add('ArrowDown');
                    }
                    // left
                    else if (e.touches[0].clientX < started_touch.x && Math.abs(started_touch.y - e.touches[0].clientY) < 50) {
                        this.keys.add('ArrowLeft');
                    }
                }
            }
            this.game.ctx.canvas.ontouchend = (e) => {
                started = false;
            }
        }
    }

}