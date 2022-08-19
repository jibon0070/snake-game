import { Game } from "./Game.js";

export class Input {
    keys: Set<string> = new Set();
    constructor(private readonly game: Game) {
        document.onkeydown = (e) => {
            this.keys.add(e.key);
        }
        document.onkeyup = (e) => {
            this.keys.delete(e.key);
        }
    }

}