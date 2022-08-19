import {Vector2} from "./Vector2.js";

export interface Entity {
    position: Vector2;
    velocity: Vector2;
    width: number;
    height: number;


    draw(): void;

    update(deltaTime: number): void;

}