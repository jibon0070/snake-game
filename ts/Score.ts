import Config from "./Config.js";
import { Entity } from "./Entity.js";
import { Vector2 } from "./Vector2.js";

export default class Score {
    score: number = 0;
    high_score: number = parseInt(localStorage.getItem(Config.high_score_key) || '0');

    add(amount: number) {
        this.score += amount;
        if (this.score > this.high_score) {
            this.high_score = this.score;
            localStorage.setItem(Config.high_score_key, this.high_score.toString());
        }
    }
}