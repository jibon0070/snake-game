export class Vector2 {
    constructor(public x: number, public y: number) {
    }

    add(vector: Vector2) {
        this.x += vector.x;
        this.y += vector.y;
    }

    clone() {
        return new Vector2(this.x, this.y);
    }
}